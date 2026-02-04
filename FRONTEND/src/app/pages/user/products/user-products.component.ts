import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserProduct, ProductCategory } from '../../../services/user-dashboard.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { UserPageHeaderComponent } from '../../../components/user-page-header/user-page-header.component';

interface ProductWithState extends UserProduct {
  canRedeem: boolean;
  hasPendingRedemption: boolean;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockLabel: string;
  redemptionCount: number;
}

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, PaginationComponent, UserPageHeaderComponent]
})
export class UserProductsComponent implements OnInit, OnDestroy {
  Math = Math;
  currentUser: any;
  products: ProductWithState[] = [];
  filteredProducts: ProductWithState[] = [];
  categories: ProductCategory[] = [];
  isLoading = true;
  searchQuery = '';
  selectedCategory = '';
  sortField: 'points' | 'name' = 'points';
  sortOrder: 'asc' | 'desc' = 'asc';
  userPoints = 0;

  // Filter options
  showFilters = false;
  selectedStatus = '';
  showOnlyRedeemable = false;
  minPointsFilter = 0;
  maxPointsFilter = 10000;
  maxPointsLimit = 10000;

  // Pagination
  currentPage = 1;
  pageSize = 8;
  totalProducts = 0;

  // Modal
  showModal = false;
  selectedProduct: ProductWithState | null = null;
  readonly selectedQuantity = 1; // Fixed to 1 - users can only redeem 1 quantity per request
  isRedeeming = false;

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // Track products with pending redemptions
  pendingProductIds: Set<string> = new Set();

  // Product redemption counts
  productRedemptionCounts: Map<string, number> = new Map();

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadData();
        }
      });
  }

  loadData(): void {
    this.isLoading = true;
    
    // Load products, categories, user points, pending product IDs, and redemption counts in parallel
    forkJoin({
      products: this.userDashboardService.getProducts(),
      pendingProductIds: this.userDashboardService.getPendingRedemptionProductIds(),
      redemptionCounts: this.userDashboardService.getProductRedemptionCounts()
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ products, pendingProductIds, redemptionCounts }) => {
          this.pendingProductIds = new Set(pendingProductIds);
          this.productRedemptionCounts = new Map(Object.entries(redemptionCounts));
          this.processProducts(products);
          this.calculateMaxPointsLimit();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });

    this.userDashboardService.getProductCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error loading categories:', error)
      });

    this.loadUserPoints();
  }

  calculateMaxPointsLimit(): void {
    if (this.products.length > 0) {
      const maxPoints = Math.max(...this.products.map(p => p.pointsCost));
      // Round up to nearest 1000
      this.maxPointsLimit = Math.ceil(maxPoints / 1000) * 1000;
      this.maxPointsFilter = this.maxPointsLimit;
    }
  }

  loadUserPoints(): void {
    this.userDashboardService.getUserPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (points) => {
          this.userPoints = points;
          this.updateProductStates();
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error loading user points:', error)
      });
  }

  processProducts(products: UserProduct[]): void {
    this.products = products.map(product => this.enrichProduct(product));
    this.applyFilters();
  }

  enrichProduct(product: UserProduct): ProductWithState {
    const stockStatus = this.getStockStatus(product.currentStock);
    const hasPendingRedemption = this.pendingProductIds.has(product.id);
    const canRedeem = this.userPoints >= product.pointsCost && product.currentStock > 0 && !hasPendingRedemption;
    const redemptionCount = this.productRedemptionCounts.get(product.id) || 0;
    
    return {
      ...product,
      canRedeem,
      hasPendingRedemption,
      stockStatus,
      stockLabel: this.getStockLabel(stockStatus),
      redemptionCount
    };
  }

  getStockStatus(stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  getStockLabel(status: string): string {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return '';
    }
  }

  updateProductStates(): void {
    this.products = this.products.map(product => ({
      ...product,
      hasPendingRedemption: this.pendingProductIds.has(product.id),
      canRedeem: this.userPoints >= product.pointsCost && product.currentStock > 0 && !this.pendingProductIds.has(product.id),
      redemptionCount: this.productRedemptionCounts.get(product.id) || 0
    }));
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === this.selectedCategory);
    }

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Points range filter
    filtered = filtered.filter(p => 
      p.pointsCost >= this.minPointsFilter && p.pointsCost <= this.maxPointsFilter
    );

    // Status filter
    if (this.selectedStatus) {
      switch (this.selectedStatus) {
        case 'in-stock':
          filtered = filtered.filter(p => p.currentStock > 0);
          break;
        case 'out-of-stock':
          filtered = filtered.filter(p => p.currentStock === 0);
          break;
        case 'redemption-pending':
          filtered = filtered.filter(p => p.hasPendingRedemption);
          break;
        case 'out-of-budget':
          filtered = filtered.filter(p => this.userPoints < p.pointsCost);
          break;
      }
    }

    // Show only redeemable filter
    if (this.showOnlyRedeemable) {
      filtered = filtered.filter(p => p.canRedeem);
    }

    // Sorting
    const multiplier = this.sortOrder === 'asc' ? 1 : -1;
    switch (this.sortField) {
      case 'points':
        filtered.sort((a, b) => multiplier * (a.pointsCost - b.pointsCost));
        break;
      case 'name':
        filtered.sort((a, b) => multiplier * a.name.localeCompare(b.name));
        break;
    }

    this.totalProducts = filtered.length;
    this.filteredProducts = filtered;
    this.currentPage = 1;
  }

  get paginatedProducts(): ProductWithState[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.applyFilters();
  }

  onRangeChange(): void {
    // Ensure min doesn't exceed max
    if (this.minPointsFilter > this.maxPointsFilter) {
      const temp = this.minPointsFilter;
      this.minPointsFilter = this.maxPointsFilter;
      this.maxPointsFilter = temp;
    }
    this.applyFilters();
  }

  toggleShowOnlyRedeemable(): void {
    this.showOnlyRedeemable = !this.showOnlyRedeemable;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.sortField = 'points';
    this.sortOrder = 'asc';
    this.minPointsFilter = 0;
    this.maxPointsFilter = this.maxPointsLimit;
    this.showOnlyRedeemable = false;
    this.applyFilters();
  }

  // Modal functions
  openProductModal(product: ProductWithState): void {
    this.selectedProduct = product;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  // Quantity is fixed to 1 - users can only redeem 1 quantity per request
  // If they want more, they must wait for current redemption to be delivered

  get totalPointsCost(): number {
    return this.selectedProduct ? this.selectedProduct.pointsCost * this.selectedQuantity : 0;
  }

  get canRedeemSelected(): boolean {
    if (!this.selectedProduct) return false;
    return this.userPoints >= this.totalPointsCost && 
           this.selectedProduct.currentStock >= this.selectedQuantity &&
           !this.selectedProduct.hasPendingRedemption;
  }

  redeemProduct(): void {
    if (!this.selectedProduct || this.isRedeeming || !this.canRedeemSelected) return;

    this.isRedeeming = true;
    
    this.userDashboardService.createRedemption(this.selectedProduct.id, this.selectedQuantity)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isRedeeming = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.showToastMessage('Redemption request submitted successfully!', 'success');
          this.closeModal();
          this.loadUserPoints();
          // Reload pending products and refresh data
          this.userDashboardService.getPendingRedemptionProductIds()
            .pipe(takeUntil(this.destroy$))
            .subscribe(productIds => {
              this.pendingProductIds = new Set(productIds);
              this.loadData();
            });
        },
        error: (error) => {
          const message = error.error?.message || 'Failed to submit redemption request. Please try again.';
          this.showToastMessage(message, 'error');
        }
      });
  }

  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 4000);
  }

  goToMyRedemptions(): void {
    this.router.navigate(['/user/redemptions']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = '';
  }
}
