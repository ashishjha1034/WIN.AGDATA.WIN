import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';

// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

// Register ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

import { ProductsService } from '../../../services/products.service';
import { Product, ProductKPI, ProductFilter, ProductCategory, CreateProductRequest } from '../../../models/product.models';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

// Low stock product interface for chart
interface LowStockChartProduct {
  name: string;
  stock: number;
  category: string;
  isLowStock: boolean;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective],
  providers: [
    provideEchartsCore({ echarts })
  ]
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
  showFilters = false;
  showAddProductModal = false;
  activeDropdown: string | null = null;
  isSubmitting = false;
  
  // Messages
  errorMessage: string | null = null;
  successMessage: string | null = null;
  hasLoadError = false;

  // Chart state
  selectedChartCategory = 'all';
  lowStockThreshold = 10;
  topNProducts = 4;
  chartOption: EChartsOption = {};
  
  // Products signal for chart
  private productsSignal = signal<Product[]>([]);
  private selectedCategorySignal = signal<string>('all');

  // Computed low stock products for chart - reads both signals for reactivity
  lowStockProducts = computed(() => {
    const products = this.productsSignal();
    const selectedCategory = this.selectedCategorySignal();
    let filtered = [...products];
    
    // Filter by category if selected
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }
    
    // Filter out unlimited stock products
    filtered = filtered.filter(p => p.stockLevel !== 999999);
    
    // Sort by stock level ascending
    filtered.sort((a, b) => a.stockLevel - b.stockLevel);
    
    // Take only the available products (up to topN, but show all if less)
    const available = filtered.slice(0, this.topNProducts);
    return available.map(p => ({
      name: p.name,
      stock: p.stockLevel,
      category: p.categoryName,
      isLowStock: p.stockLevel < this.lowStockThreshold
    }));
  });

  // Check if chart has no data for current category
  get chartHasNoData(): boolean {
    return this.lowStockProducts().length === 0;
  }

  // Filter state for inline filters
  selectedCategoryFilter = '';
  maxPointsLimit = 50000;

  // New Product Form
  newProduct: CreateProductRequest = {
    name: '',
    description: '',
    categoryId: '',
    pointsCost: 0,
    imageUrl: '',
    initialStock: 0
  };

  // New Category Form
  newCategoryName = '';
  newCategoryDescription = '';
  isCreatingCategory = false;
  showCategoryForm = false;

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
  private searchSubject = new Subject<string>();

  @ViewChild('productsTable') productsTable!: ElementRef;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Bind the click handler in constructor to maintain reference
    this.documentClickHandler = this.onDocumentClick.bind(this);
    
    // Debounce search
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchText = query;
      this.currentPage = 1;
      this.applyFiltersAndPagination();
      this.cdr.markForCheck();
    });
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
    if (!target.closest('.action-menu')) {
      this.activeDropdown = null;
      this.cdr.detectChanges();
    }
  }

  /**
   * Get paginated products
   */
  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Get total pages
   */
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  /**
   * Handle search input with debounce
   */
  onSearchInput(): void {
    this.searchSubject.next(this.searchText);
  }

  /**
   * Toggle filters panel
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Handle range slider change
   */
  onRangeChange(): void {
    // Ensure min doesn't exceed max
    if (this.activeFilter.minPoints! > this.activeFilter.maxPoints!) {
      const temp = this.activeFilter.minPoints;
      this.activeFilter.minPoints = this.activeFilter.maxPoints;
      this.activeFilter.maxPoints = temp;
    }
    this.applyFilters();
  }

  /**
   * Update chart on category change
   */
  onChartCategoryChange(): void {
    // Update the signal to trigger computed recalculation
    this.selectedCategorySignal.set(this.selectedChartCategory);
    this.updateChart();
  }

  /**
   * Update inventory risk chart
   */
  private updateChart(): void {
    const lowStock = this.lowStockProducts();
    
    if (lowStock.length === 0) {
      this.chartOption = {
        graphic: {
          elements: [{
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: 'Not enough data for this category',
              fontSize: 14,
              fill: '#6b7280'
            }
          }]
        }
      };
      this.cdr.detectChanges();
      return;
    }

    // Reverse for horizontal bar (lowest stock at top)
    const reversedProducts = [...lowStock].reverse();

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const data = params[0];
          const product = reversedProducts[data.dataIndex];
          const status = product.isLowStock ? '⚠️ Low Stock' : '✓ Healthy';
          return `<strong>${data.name}</strong><br/>
                  Stock: ${data.value} units<br/>
                  Category: ${product.category}<br/>
                  Status: ${status}`;
        }
      },
      grid: {
        left: '3%',
        right: '15%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => value.toString()
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: { color: '#e5e7eb' }
        }
      },
      yAxis: {
        type: 'category',
        data: reversedProducts.map(p => p.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#374151',
          fontSize: 12,
          width: 120,
          overflow: 'truncate'
        }
      },
      series: [
        {
          name: 'Stock',
          type: 'bar',
          data: reversedProducts.map(p => ({
            value: p.stock,
            itemStyle: {
              color: p.isLowStock ? '#dc2626' : '#2c5f3f',
              borderRadius: [0, 4, 4, 0]
            }
          })),
          barWidth: '60%',
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            color: '#6b7280',
            fontSize: 11
          }
        }
      ]
    };
    
    this.cdr.detectChanges();
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
    this.errorMessage = null;

    console.log('[ProductMgmt] Loading products...');

    this.productsService.getAllProductsAdmin()
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
          this.productsSignal.set(this.products);
          this.hasLoadError = false;
          
          // Calculate KPIs
          this.kpi = this.productsService.calculateKPIs(this.products);
          console.log('[ProductMgmt] KPI computed:', this.kpi);
          
          // Apply filters and pagination
          this.applyFiltersAndPagination();
          
          // Update chart
          this.updateChart();
          
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[ProductMgmt] Error loading products:', error);
          this.products = [];
          this.filteredProducts = [];
          this.hasLoadError = true;
          this.errorMessage = `Failed to load products: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
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

    // Apply category filter from dropdown
    if (this.selectedCategoryFilter) {
      this.activeFilter.categoryIds = [this.selectedCategoryFilter];
    } else {
      this.activeFilter.categoryIds = [];
    }

    filtered = this.productsService.filterProducts(filtered, this.activeFilter);
    
    this.filteredProducts = filtered;
    
    console.log('[ProductMgmt] Filtered products:', this.filteredProducts.length, 'of', this.products.length);
  }

  /**
   * Handle search input (legacy method)
   */
  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  /**
   * Apply filters from inline panel
   */
  applyFilters(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
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
      maxPoints: this.maxPointsLimit
    };
    this.searchText = '';
    this.selectedCategoryFilter = '';
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
    this.resetCategoryForm();
  }

  /**
   * Reset category creation form
   */
  resetCategoryForm(): void {
    this.newCategoryName = '';
    this.newCategoryDescription = '';
    this.isCreatingCategory = false;
  }

  /**
   * Create new category
   */
  createNewCategory(): void {
    if (!this.newCategoryName?.trim()) {
      this.errorMessage = 'Category name is required';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    this.isCreatingCategory = true;

    const request = {
      name: this.newCategoryName.trim(),
      description: this.newCategoryDescription?.trim() || undefined,
      displayOrder: this.categories.length
    };

    this.productsService.createCategory(request)
      .pipe(
        finalize(() => {
          this.isCreatingCategory = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (newCategory) => {
          console.log('[ProductMgmt] Category created successfully:', newCategory);
          // Refresh categories list
          this.loadCategories();
          // Set the new category as selected
          this.newProduct.categoryId = newCategory.id;
          // Hide and reset category form
          this.showCategoryForm = false;
          this.resetCategoryForm();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[ProductMgmt] Error creating category:', error);
          this.errorMessage = error?.error?.message || 'Failed to create category';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
  }

  /**
   * Toggle category creation form visibility
   */
  toggleCategoryForm(): void {
    this.showCategoryForm = !this.showCategoryForm;
    if (!this.showCategoryForm) {
      this.resetCategoryForm();
    }
  }

  /**
   * Cancel category creation
   */
  cancelCategoryCreation(): void {
    this.showCategoryForm = false;
    this.resetCategoryForm();
  }

  /**
   * Submit new product
   */
  submitNewProduct(): void {
    // Validation
    if (!this.newProduct.name || !this.newProduct.categoryId || this.newProduct.pointsCost <= 0) {
      this.errorMessage = 'Please fill in all required fields';
      setTimeout(() => this.errorMessage = null, 5000);
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
          this.showSuccess(`Product "${newProduct.name}" created successfully!`);
        },
        error: (error) => {
          console.error('[ProductMgmt] Error creating product:', error);
          this.errorMessage = `Failed to create product: ${error?.error?.message || error?.message || 'Unknown error'}`;
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
  }

  /**
   * Show success message
   */
  private showSuccess(message: string): void {
    this.successMessage = message;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.successMessage = null;
      this.cdr.markForCheck();
    }, 3000);
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
  deactivateProduct(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to deactivate "${product.name}"?`)) {
      this.isLoading = true;
      this.productsService.deactivateProduct(productId).subscribe({
        next: (response) => {
          console.log('Product deactivated successfully:', response);
          this.loadProducts(); // Reload products to reflect changes
        },
        error: (error) => {
          console.error('Error deactivating product:', error);
          this.isLoading = false;
          // Handle error appropriately
          alert('Failed to deactivate product. Please try again.');
        }
      });
    }
  }

  /**
   * Activate product
   */
  activateProduct(productId: string, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.activeDropdown = null;
    
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to activate "${product.name}"?`)) {
      this.isLoading = true;
      this.productsService.activateProduct(productId).subscribe({
        next: (response) => {
          console.log('Product activated successfully:', response);
          this.loadProducts(); // Reload products to reflect changes
        },
        error: (error) => {
          console.error('Error activating product:', error);
          this.isLoading = false;
          // Handle error appropriately
          alert('Failed to activate product. Please try again.');
        }
      });
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
    if (!product.isActive) return 'inactive';
    if (product.stockLevel === 0) return 'out-of-stock';
    if (product.stockLevel < 10) return 'low-stock';
    return 'active';
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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
