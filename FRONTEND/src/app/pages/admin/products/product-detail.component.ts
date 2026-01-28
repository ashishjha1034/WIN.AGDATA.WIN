import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { ProductDetail, ProductCategory, UpdateProductRequest, UpdateStockRequest, ProductRedemption, RedemptionStatus } from '../../../models/product.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // Expose Math and RedemptionStatus for template usage
  public Math = Math;
  public RedemptionStatus = RedemptionStatus;
  
  product: ProductDetail | null = null;
  categories: ProductCategory[] = [];
  isLoading = false;
  hasError = false;
  errorMessage = '';
  activeTab: 'info' | 'stock' | 'redemptions' = 'info';
  
  // Redemptions data
  redemptions: ProductRedemption[] = [];
  filteredRedemptions: ProductRedemption[] = [];
  redemptionsLoading = false;
  activeRedemptionFilter: RedemptionStatus | 'all' = 'all';

  // Computed property for total redemptions count
  get totalRedemptions(): number {
    return this.redemptions.length;
  }
  
  // Edit form data
  editForm: UpdateProductRequest = {};
  stockAdjustment: UpdateStockRequest = {
    amount: 0,
    operation: 'adjust',
    reason: ''
  };

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Load categories for dropdown
    this.loadCategories();
    
    // Subscribe to route params changes to reload on navigation
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          this.loadProduct(productId);
        }
        return [];
      })
    ).subscribe();

    // Check for fragment (tab selection)
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe(fragment => {
      if (fragment === 'stock' || fragment === 'redemptions' || fragment === 'info') {
        this.activeTab = fragment;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProduct(productId: string): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';
    
    console.log('[ProductDetail] Loading product:', productId);
    
    this.productsService.getProductById(productId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Defer clearing loading state to ensure UI updates
          setTimeout(() => {
            this.isLoading = false;
            console.log('[ProductDetail] Loading finished, product:', this.product);
            this.cdr.detectChanges();
          }, 0);
        })
      )
      .subscribe({
        next: (product) => {
          console.log('[ProductDetail] Product loaded successfully:', product);
          this.product = product;
          this.hasError = false;
          this.initEditForm();
          // Load redemptions immediately to show accurate count in header
          this.loadRedemptions();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[ProductDetail] Error loading product:', error);
          this.hasError = true;
          this.errorMessage = `Failed to load product: ${error?.message || 'Unknown error'}`;
          this.product = null;
          this.cdr.detectChanges();
        }
      });
  }

  loadCategories(): void {
    this.productsService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log('[ProductDetail] Categories loaded:', categories);
        },
        error: (error) => {
          console.error('[ProductDetail] Error loading categories:', error);
        }
      });
  }

  initEditForm(): void {
    if (this.product) {
      this.editForm = {
        name: this.product.name,
        description: this.product.description,
        categoryId: this.product.categoryId,
        pointsCost: this.product.pointsCost,
        imageUrl: this.product.imageUrl
      };
    }
  }

  switchTab(tab: 'info' | 'stock' | 'redemptions'): void {
    this.activeTab = tab;
    
    // Load redemptions data when switching to redemptions tab
    if (tab === 'redemptions' && this.product && this.redemptions.length === 0) {
      this.loadRedemptions();
    }
    
    this.cdr.detectChanges();
  }

  loadRedemptions(): void {
    if (!this.product) return;
    
    this.redemptionsLoading = true;
    this.productsService.getProductRedemptions(this.product.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.redemptionsLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (redemptions) => {
          console.log('[ProductDetail] Redemptions loaded:', redemptions);
          this.redemptions = redemptions;
          this.filterRedemptions();
        },
        error: (error) => {
          console.error('[ProductDetail] Error loading redemptions:', error);
          this.redemptions = [];
          this.filteredRedemptions = [];
        }
      });
  }

  filterRedemptions(): void {
    if (this.activeRedemptionFilter === 'all') {
      this.filteredRedemptions = [...this.redemptions];
    } else {
      // Filter by numeric status (enum value IS the numeric value)
      this.filteredRedemptions = this.redemptions.filter(
        r => r.status === this.activeRedemptionFilter
      );
    }
    console.log('[ProductDetail] Filtered redemptions:', this.filteredRedemptions.length, 'filter:', this.activeRedemptionFilter);
  }

  setRedemptionFilter(status: RedemptionStatus | 'all'): void {
    this.activeRedemptionFilter = status;
    this.filterRedemptions();
  }

  getRedemptionCount(status: RedemptionStatus | 'all'): number {
    if (status === 'all') {
      return this.redemptions.length;
    }
    // Enum value IS the numeric value
    return this.redemptions.filter(r => r.status === status).length;
  }

  exportRedemptions(): void {
    if (this.filteredRedemptions.length === 0) return;

    // Create CSV content
    const headers = ['User', 'Email', 'Quantity', 'Points Spent', 'Status', 'Request Date'];
    const rows = this.filteredRedemptions.map(r => [
      r.userName,
      r.userEmail,
      r.quantity.toString(),
      r.pointsSpent.toString(),
      r.statusText,
      new Date(r.requestDate).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.product?.name || 'product'}-redemptions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  saveChanges(): void {
    if (this.product) {
      this.isLoading = true;
      this.productsService.updateProduct(this.product.id, this.editForm)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }, 0);
          })
        )
        .subscribe({
          next: () => {
            alert('Product updated successfully');
            this.loadProduct(this.product!.id);
          },
          error: (error) => {
            console.error('Error updating product:', error);
            alert('Failed to update product');
          }
        });
    }
  }

  adjustStock(): void {
    if (this.product) {
      this.isLoading = true;
      this.productsService.adjustStock(this.product.id, this.stockAdjustment)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }, 0);
          })
        )
        .subscribe({
          next: () => {
            alert('Stock adjusted successfully');
            this.loadProduct(this.product!.id);
            this.stockAdjustment = { amount: 0, operation: 'adjust' };
          },
          error: (error) => {
            console.error('Error adjusting stock:', error);
            alert('Failed to adjust stock');
          }
        });
    }
  }

  deactivateProduct(): void {
    if (this.product && confirm(`Are you sure you want to deactivate "${this.product.name}"?`)) {
      this.isLoading = true;
      this.productsService.deactivateProduct(this.product.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }, 0);
          })
        )
        .subscribe({
          next: () => {
            // Update the product status locally to reflect the change
            if (this.product) {
              this.product.isActive = false;
            }
            alert('Product deactivated successfully');
          },
          error: (error) => {
            console.error('Error deactivating product:', error);
            alert('Failed to deactivate product: ' + (error?.error?.message || 'Unknown error'));
          }
        });
    }
  }

  activateProduct(): void {
    if (this.product && confirm(`Are you sure you want to activate "${this.product.name}"?`)) {
      this.isLoading = true;
      this.productsService.activateProduct(this.product.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }, 0);
          })
        )
        .subscribe({
          next: () => {
            // Update the product status locally to reflect the change
            if (this.product) {
              this.product.isActive = true;
            }
            alert('Product activated successfully');
          },
          error: (error) => {
            console.error('Error activating product:', error);
            alert('Failed to activate product: ' + (error?.error?.message || 'Unknown error'));
          }
        });
    }
  }

  deleteProduct(): void {
    if (this.product && confirm(`Are you sure you want to DELETE "${this.product.name}"? This cannot be undone.`)) {
      this.isLoading = true;
      this.productsService.deleteProduct(this.product.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }, 0);
          })
        )
        .subscribe({
          next: () => {
            alert('Product deleted successfully');
            this.goBack(); // Return to products list
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            alert('Failed to delete product: ' + (error?.error?.message || 'Unknown error'));
          }
        });
    }
  }
}
