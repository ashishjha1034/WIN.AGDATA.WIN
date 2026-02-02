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

interface ProductWithState extends UserProduct {
  canRedeem: boolean;
  hasPendingRedemption: boolean;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockLabel: string;
}

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, PaginationComponent]
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
  sortBy = 'points-low';
  userPoints = 0;

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
    
    // Load products, categories, user points, and pending product IDs in parallel
    forkJoin({
      products: this.userDashboardService.getProducts(),
      pendingProductIds: this.userDashboardService.getPendingRedemptionProductIds()
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ products, pendingProductIds }) => {
          this.pendingProductIds = new Set(pendingProductIds);
          this.processProducts(products);
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
    
    return {
      ...product,
      canRedeem,
      hasPendingRedemption,
      stockStatus,
      stockLabel: this.getStockLabel(stockStatus)
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
      canRedeem: this.userPoints >= product.pointsCost && product.currentStock > 0 && !this.pendingProductIds.has(product.id)
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

    // Sorting
    switch (this.sortBy) {
      case 'points-low':
        filtered.sort((a, b) => a.pointsCost - b.pointsCost);
        break;
      case 'points-high':
        filtered.sort((a, b) => b.pointsCost - a.pointsCost);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
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
