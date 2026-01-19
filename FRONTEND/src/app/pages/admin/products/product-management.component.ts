import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { Product, ProductKPI, ProductFilter, ProductCategory, CreateProductRequest } from '../../../models/product.models';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent]
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  // Expose Math for templates
  public Math = Math;

  // Data
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: ProductCategory[] = [];
  kpi: ProductKPI | null = null;
  currentUser: any;

  // UI State
  isLoading = false;
  selectedRows = new Set<string>();
  searchText = '';
  currentPage = 1;
  pageSize = 10;
  showFilterDrawer = false;
  showAddProductModal = false;
  activeDropdown: string | null = null;
  isSubmitting = false;
  
  // Error & Empty States
  errorMessage = '';
  showErrorAlert = false;
  hasLoadError = false;

  // New Product Form
  newProduct: CreateProductRequest = {
    name: '',
    description: '',
    categoryId: '',
    pointsCost: 0,
    imageUrl: '',
    initialStock: 0
  };

  // Filter State
  activeFilter: ProductFilter = {
    status: 'all',
    stockLevel: 'all',
    categoryIds: [],
    minPoints: 0,
    maxPoints: 50000
  };

  private destroy$ = new Subject<void>();
  private documentClickHandler: (event: MouseEvent) => void;

  @ViewChild('productsTable') productsTable!: ElementRef;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Bind the click handler in constructor to maintain reference
    this.documentClickHandler = this.onDocumentClick.bind(this);
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCategories();
    this.loadProducts();
    
    // Close dropdown on outside click
    document.addEventListener('click', this.documentClickHandler);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.documentClickHandler);
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-actions')) {
      this.activeDropdown = null;
      this.cdr.detectChanges();
    }
  }

  /**
   * Load current user info
   */
  loadCurrentUser(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  /**
   * Load categories for filter
   */
  loadCategories(): void {
    this.productsService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log('[ProductMgmt] Categories loaded:', categories);
        },
        error: (error) => {
          console.error('[ProductMgmt] Error loading categories:', error);
        }
      });
  }

  /**
   * Load products with current filters
   */
  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    console.log('[ProductMgmt] Loading products...');

    this.productsService.getProducts()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('[ProductMgmt] Loading finished');
            try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
          }, 0);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[ProductMgmt] Products loaded successfully:', data);
          this.products = Array.isArray(data) ? data : [];
          this.hasLoadError = false;
          
          // Calculate KPIs
          this.kpi = this.productsService.calculateKPIs(this.products);
          console.log('[ProductMgmt] KPI computed:', this.kpi);
          
          // Apply filters and pagination
          this.applyFiltersAndPagination();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[ProductMgmt] Error loading products:', error);
          this.products = [];
          this.filteredProducts = [];
          this.hasLoadError = true;
          this.errorMessage = `Failed to load products: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
          this.showErrorAlert = true;
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Apply filters and pagination
   */
  applyFiltersAndPagination(): void {
    // Apply search filter
    let filtered = [...this.products];
    
    if (this.searchText) {
      this.activeFilter.searchText = this.searchText;
    } else {
      delete this.activeFilter.searchText;
    }

    filtered = this.productsService.filterProducts(filtered, this.activeFilter);
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredProducts = filtered.slice(startIndex, endIndex);
    
    console.log('[ProductMgmt] Filtered products:', this.filteredProducts.length, 'of', filtered.length);
  }

  /**
   * Handle search input
   */
  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  /**
   * Open filter drawer
   */
  openFilterDrawer(): void {
    this.showFilterDrawer = true;
  }

  /**
   * Close filter drawer
   */
  closeFilterDrawer(): void {
    this.showFilterDrawer = false;
  }

  /**
   * Handle category filter change
   */
  onCategoryFilterChange(categoryId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (!this.activeFilter.categoryIds) {
      this.activeFilter.categoryIds = [];
    }
    if (checked) {
      if (!this.activeFilter.categoryIds.includes(categoryId)) {
        this.activeFilter.categoryIds.push(categoryId);
      }
    } else {
      this.activeFilter.categoryIds = this.activeFilter.categoryIds.filter(id => id !== categoryId);
    }
  }

  /**
   * Apply filters from drawer
   */
  applyFilters(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
    this.closeFilterDrawer();
  }

  /**
   * Reset filters
   */
  resetFilters(): void {
    this.activeFilter = {
      status: 'all',
      stockLevel: 'all',
      categoryIds: [],
      minPoints: 0,
      maxPoints: 50000
    };
    this.searchText = '';
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  /**
   * Open add product modal
   */
  openAddProductModal(): void {
    this.resetNewProductForm();
    this.showAddProductModal = true;
  }

  /**
   * Close add product modal
   */
  closeAddProductModal(): void {
    this.showAddProductModal = false;
    this.resetNewProductForm();
  }

  /**
   * Reset new product form
   */
  resetNewProductForm(): void {
    this.newProduct = {
      name: '',
      description: '',
      categoryId: '',
      pointsCost: 0,
      imageUrl: '',
      initialStock: 0
    };
    this.isSubmitting = false;
  }

  /**
   * Submit new product
   */
  submitNewProduct(): void {
    // Validation
    if (!this.newProduct.name || !this.newProduct.categoryId || this.newProduct.pointsCost <= 0) {
      this.errorMessage = 'Please fill in all required fields';
      this.showErrorAlert = true;
      setTimeout(() => this.showErrorAlert = false, 5000);
      return;
    }

    this.isSubmitting = true;

    this.productsService.createProduct(this.newProduct)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (newProduct) => {
          console.log('[ProductMgmt] Product created successfully:', newProduct);
          this.closeAddProductModal();
          this.loadProducts();
          this.errorMessage = `Product "${newProduct.name}" created successfully!`;
          this.showErrorAlert = true;
          setTimeout(() => this.showErrorAlert = false, 5000);
        },
        error: (error) => {
          console.error('[ProductMgmt] Error creating product:', error);
          this.errorMessage = `Failed to create product: ${error?.error?.message || error?.message || 'Unknown error'}`;
          this.showErrorAlert = true;
          setTimeout(() => this.showErrorAlert = false, 5000);
        }
      });
  }

  /**
   * Handle product created
   */
  onProductCreated(): void {
    this.closeAddProductModal();
    this.loadProducts();
  }

  /**
   * Navigate to product detail page
   */
  openProductDetail(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.router.navigate(['/admin/products', productId]);
  }

  /**
   * Edit product (navigate to detail page)
   */
  editProduct(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.router.navigate(['/admin/products', productId]);
  }

  /**
   * Adjust stock - navigate to detail page stock tab
   */
  adjustStock(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    this.router.navigate(['/admin/products', productId], { fragment: 'stock' });
  }

  /**
   * Deactivate product
   */
  deactivateProduct(product: Product, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    if (confirm(`Are you sure you want to deactivate "${product.name}"?`)) {
      // TODO: Implement deactivate logic
      console.log('Deactivate product:', product.id);
    }
  }

  /**
   * View redemptions for product
   */
  viewRedemptions(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    this.router.navigate(['/admin/products', productId], { fragment: 'redemptions' });
  }

  /**
   * View audit trail for product
   */
  viewAuditTrail(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    // TODO: Navigate to audit trail or show modal
    console.log('View audit trail for product:', productId);
  }

  /**
   * Toggle row selection
   */
  toggleRowSelection(productId: string, product: Product): void {
    if (this.selectedRows.has(productId)) {
      this.selectedRows.delete(productId);
    } else {
      this.selectedRows.add(productId);
    }
  }

  /**
   * Toggle dropdown menu
   */
  toggleDropdown(productId: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === productId ? null : productId;
    this.cdr.detectChanges();
  }

  /**
   * Check if dropdown is active
   */
  isDropdownActive(productId: string): boolean {
    return this.activeDropdown === productId;
  }

  /**
   * Toggle all rows
   */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.filteredProducts.forEach(p => this.selectedRows.add(p.id));
    }
  }

  /**
   * Check if all rows selected
   */
  isAllSelected(): boolean {
    return this.filteredProducts.length > 0 && 
           this.filteredProducts.every(p => this.selectedRows.has(p.id));
  }

  /**
   * Get status badge class
   */
  getStatusClass(product: Product): string {
    if (!product.isActive) return 'badge-inactive';
    if (product.stockLevel === 0) return 'badge-out-of-stock';
    if (product.stockLevel < 10) return 'badge-low-stock';
    return 'badge-active';
  }

  /**
   * Get status text
   */
  getStatusText(product: Product): string {
    if (!product.isActive) return 'Inactive';
    if (product.stockLevel === 0) return 'Out of Stock';
    if (product.stockLevel < 10) return 'Low Stock';
    return 'Active';
  }

  /**
   * Close error alert
   */
  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }

  /**
   * Page navigation
   */
  get totalPages(): number {
    const filteredCount = this.productsService.filterProducts(this.products, this.activeFilter).length;
    return Math.ceil(filteredCount / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFiltersAndPagination();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
