import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { ProductDetail, ProductCategory, UpdateProductRequest, UpdateStockRequest, ProductRedemption, RedemptionStatus, DeactivateProductWarnings, DeactivateProductBlocked, CreateProductRequest } from '../../../models/product.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { DialogService } from '../../../services/dialog.service';
import { ToastService } from '../../../services/toast.service';
import { ProductFormModalComponent } from './product-form-modal.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidebarComponent, ProductFormModalComponent]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // Expose Math and RedemptionStatus for template usage
  public Math = Math;
  public RedemptionStatus = RedemptionStatus;
  
  // Expose ValidationConstants for template
  public ValidationConstants = ValidationConstants;
  
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
  
  // Reactive edit form
  editForm!: FormGroup;
  originalName: string = '';
  
  // Product name uniqueness check
  checkingProductName = false;
  productNameResult: ValidationResult | null = null;
  
  // Stock adjustment form
  stockForm!: FormGroup;
  
  // Stock validation error message
  stockValidationError: string | null = null;
  
  // Deactivation dialog state
  showDeactivateDialog = false;
  deactivateWarningData: DeactivateProductWarnings | null = null;
  deactivationBlockedMessage: string | null = null;
  pendingDeactivationProductId: string | null = null;
  
  // Edit modal state
  showEditModal = false;
  editModalInitialData: Partial<CreateProductRequest> | undefined;
  
  editFormFieldLabels: { [key: string]: string } = {
    name: 'Product Name',
    description: 'Description',
    categoryId: 'Category',
    pointsCost: 'Points Cost',
    imageUrl: 'Image URL'
  };
  
  // Legacy plain object for stock (keep for backward compat)
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
    private validationService: ValidationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    // Initialize forms
    this.initForms();
    
    // Load categories for dropdown
    this.loadCategories();
    
    // Setup product name uniqueness check
    this.setupProductNameCheck();
    
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

  private initForms(): void {
    // Initialize reactive edit form with validators matching create form
    this.editForm = this.fb.group({
      name: ['', [
        Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
        CustomValidators.productNameFormat()
      ]],
      description: ['', [
        Validators.minLength(ValidationConstants.DESCRIPTION_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.DESCRIPTION_MAX_LENGTH),
        CustomValidators.wordCount(ValidationConstants.DESCRIPTION_MIN_WORDS, ValidationConstants.DESCRIPTION_MAX_WORDS)
      ]],
      categoryId: [''],
      pointsCost: [null, [
        Validators.min(ValidationConstants.POINTS_COST_MIN),
        Validators.max(ValidationConstants.POINTS_COST_MAX),
        CustomValidators.integer()
      ]],
      imageUrl: ['', [
        Validators.maxLength(ValidationConstants.IMAGE_URL_MAX_LENGTH),
        CustomValidators.httpsUrl()
      ]]
    });
    
    // Initialize stock adjustment form
    this.stockForm = this.fb.group({
      amount: [0, [
        Validators.required,
        CustomValidators.integer()
      ]],
      reason: ['']
    });
  }
  
  private setupProductNameCheck(): void {
    this.editForm.get('name')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(ValidationConstants.DEBOUNCE_TIME_MS),
        distinctUntilChanged()
      )
      .subscribe(name => {
        // Only check if name is valid and changed from original
        if (name && 
            this.editForm.get('name')?.valid && 
            name.trim() !== this.originalName.trim()) {
          this.checkProductName(name);
        } else {
          this.productNameResult = null;
          this.checkingProductName = false;
        }
      });
  }
  
  private checkProductName(name: string): void {
    this.checkingProductName = true;
    this.productNameResult = null;
    this.cdr.markForCheck();

    // Exclude current product from uniqueness check
    this.validationService.checkProductNameAvailability(name, this.product?.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.productNameResult = result;
          this.checkingProductName = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.checkingProductName = false;
          this.cdr.markForCheck();
        }
      });
  }
  
  checkProductNameNow(): void {
    const name = this.editForm.get('name')?.value;
    if (name && name.trim() !== this.originalName.trim()) {
      this.checkProductName(name);
    }
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
      // Store original name for uniqueness comparison
      this.originalName = this.product.name || '';
      
      // Patch reactive form with product data
      this.editForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        categoryId: this.product.categoryId,
        pointsCost: this.product.pointsCost,
        imageUrl: this.product.imageUrl
      });
      
      // Mark form as pristine after initial load
      this.editForm.markAsPristine();
      this.editForm.markAsUntouched();
      
      // Reset uniqueness check
      this.productNameResult = null;
      this.checkingProductName = false;
    }
  }
  
  // Helper methods for form validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);
    return !!(field && field.valid && field.dirty);
  }
  
  // Get trimmed character count for display
  getTrimmedLength(fieldName: string): number {
    const value = this.editForm.get(fieldName)?.value || '';
    return value.trim().length;
  }
  
  // Get word count for description
  getWordCount(fieldName: string): number {
    const value = this.editForm.get(fieldName)?.value || '';
    return value.split(/\s+/).filter((w: string) => w.length > 0).length;
  }
  
  // Check if form has valid changes
  get hasValidChanges(): boolean {
    if (!this.product) return false;
    
    const formValue = this.editForm.value;
    const hasChanges = 
      (formValue.name?.trim() !== this.product.name) ||
      (formValue.description?.trim() !== this.product.description) ||
      (formValue.categoryId !== this.product.categoryId) ||
      (formValue.pointsCost !== this.product.pointsCost) ||
      ((formValue.imageUrl?.trim() || '') !== (this.product.imageUrl || ''));
    
    return hasChanges && this.editForm.valid;
  }
  
  // Check if save button should be enabled
  get canSave(): boolean {
    if (!this.hasValidChanges) return false;
    if (this.checkingProductName) return false;
    if (this.productNameResult && !this.productNameResult.isValid) return false;
    return true;
  }
  
  // Check if stock adjustment can be submitted and validate limits
  get canAdjustStock(): boolean {
    if (this.stockAdjustment.amount === 0) {
      this.stockValidationError = null;
      return false;
    }
    
    if (!this.product) {
      this.stockValidationError = null;
      return false;
    }
    
    const newStock = this.product.stockLevel + this.stockAdjustment.amount;
    
    // Check if new stock would be negative
    if (newStock < 0) {
      this.stockValidationError = `Cannot reduce stock below 0. Maximum reduction is ${this.product.stockLevel}.`;
      return false;
    }
    
    // Check if new stock exceeds max limit
    if (newStock > ValidationConstants.STOCK_MAX) {
      this.stockValidationError = `Stock cannot exceed ${ValidationConstants.STOCK_MAX.toLocaleString()}. Maximum increase is ${(ValidationConstants.STOCK_MAX - this.product.stockLevel).toLocaleString()}.`;
      return false;
    }
    
    // Check if amount is a valid integer
    if (!Number.isInteger(this.stockAdjustment.amount)) {
      this.stockValidationError = 'Stock adjustment must be a whole number.';
      return false;
    }
    
    this.stockValidationError = null;
    return true;
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
    if (this.product && this.canSave) {
      // Mark all fields as touched to show any validation errors
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.get(key)?.markAsTouched();
      });
      
      if (!this.editForm.valid) {
        return;
      }
      
      this.isLoading = true;
      
      // Build request with only changed, valid fields (trimmed values)
      const formValue = this.editForm.value;
      const request: UpdateProductRequest = {};
      
      if (formValue.name?.trim() !== this.product.name) {
        request.name = formValue.name.trim();
      }
      if (formValue.description?.trim() !== this.product.description) {
        request.description = formValue.description.trim();
      }
      if (formValue.categoryId !== this.product.categoryId) {
        request.categoryId = formValue.categoryId;
      }
      if (formValue.pointsCost !== this.product.pointsCost) {
        request.pointsCost = Math.floor(Number(formValue.pointsCost));
      }
      if ((formValue.imageUrl?.trim() || '') !== (this.product.imageUrl || '')) {
        request.imageUrl = formValue.imageUrl?.trim() || undefined;
      }
      
      this.productsService.updateProduct(this.product.id, request)
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
            this.toastService.success('Product updated successfully');
            this.loadProduct(this.product!.id);
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.toastService.error('Failed to update product', error?.error?.message || 'Unknown error');
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
            this.toastService.success('Stock adjusted successfully');
            this.loadProduct(this.product!.id);
            this.stockAdjustment = { amount: 0, operation: 'adjust' };
          },
          error: (error) => {
            console.error('Error adjusting stock:', error);
            this.toastService.error('Failed to adjust stock', error?.error?.message);
          }
        });
    }
  }

  deactivateProduct(): void {
    if (!this.product) return;

    // First attempt without force
    this.isLoading = true;
    this.pendingDeactivationProductId = this.product.id;
    
    this.productsService.deactivateProduct(this.product.id, false)
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
          // Success - product deactivated
          if (this.product) {
            this.product.isActive = false;
          }
          this.toastService.success('Product deactivated successfully');
          this.pendingDeactivationProductId = null;
        },
        error: (error) => {
          console.error('Error deactivating product:', error);
          
          // Check for warnings (409 Conflict)
          if (error?.status === 409 && error?.error?.code === 'DEACTIVATE_WARNINGS') {
            this.deactivateWarningData = error.error;
            this.showDeactivateDialog = true;
            this.deactivationBlockedMessage = null;
          }
          // Check for hard blocks (400 Bad Request)
          else if (error?.status === 400 && error?.error?.code === 'DEACTIVATE_BLOCKED') {
            const blocked: DeactivateProductBlocked = error.error;
            const message = `Cannot deactivate: ${blocked.pending || 0} pending and ${blocked.approved || 0} approved redemptions must be resolved first.`;
            this.deactivationBlockedMessage = message;
            this.showDeactivateDialog = false;
            this.toastService.error('Cannot Deactivate Product', message);
            this.pendingDeactivationProductId = null;
          }
          // Other error
          else {
            this.toastService.error('Failed to deactivate product', error?.error?.message || 'Unknown error');
            this.pendingDeactivationProductId = null;
          }
        }
      });
  }

  onDeactivateConfirmed(): void {
    if (!this.pendingDeactivationProductId) return;

    this.showDeactivateDialog = false;
    this.isLoading = true;

    // Retry with force=true
    this.productsService.deactivateProduct(this.pendingDeactivationProductId, true)
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
          if (this.product) {
            this.product.isActive = false;
          }
          this.toastService.success('Product deactivated successfully');
          this.pendingDeactivationProductId = null;
          this.deactivateWarningData = null;
        },
        error: (error) => {
          console.error('Error deactivating product with force:', error);
          
          // Check for hard blocks (even with force=true)
          if (error?.status === 400 && error?.error?.code === 'DEACTIVATE_BLOCKED') {
            const blocked: DeactivateProductBlocked = error.error;
            const message = `Cannot deactivate: ${blocked.pending || 0} pending and ${blocked.approved || 0} approved redemptions must be resolved first.`;
            this.toastService.error('Cannot Deactivate Product', message);
          } else {
            this.toastService.error('Failed to deactivate product', error?.error?.message || 'Unknown error');
          }
          this.pendingDeactivationProductId = null;
          this.deactivateWarningData = null;
        }
      });
  }

  onDeactivateCancelled(): void {
    this.showDeactivateDialog = false;
    this.pendingDeactivationProductId = null;
    this.deactivateWarningData = null;
  }

  activateProduct(): void {
    if (!this.product) return;
    
    this.dialogService.confirm(
      `Are you sure you want to activate "${this.product.name}"?`,
      'Activate Product',
      'Activate',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed && this.product) {
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
              this.toastService.success('Product activated successfully');
            },
            error: (error) => {
              console.error('Error activating product:', error);
              this.toastService.error('Failed to activate product', error?.error?.message || 'Unknown error');
            }
          });
      }
    });
  }

  deleteProduct(): void {
    if (!this.product) return;
    
    this.dialogService.confirm(
      `Are you sure you want to DELETE "${this.product.name}"? This cannot be undone.`,
      'Delete Product',
      'Delete',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed && this.product) {
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
              this.toastService.success('Product deleted successfully');
              this.goBack(); // Return to products list
            },
            error: (error) => {
              console.error('Error deleting product:', error);
              this.toastService.error('Failed to delete product', error?.error?.message || 'Unknown error');
            }
          });
      }
    });
  }

  // ===== Edit Modal Methods =====
  openEditModal(): void {
    if (!this.product) return;
    
    // Prepare initial data from current product
    this.editModalInitialData = {
      name: this.product.name,
      description: this.product.description,
      categoryId: this.product.categoryId,
      pointsCost: this.product.pointsCost,
      imageUrl: this.product.imageUrl || ''
    };
    
    this.showEditModal = true;
    this.cdr.detectChanges();
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalInitialData = undefined;
    this.cdr.detectChanges();
  }

  onProductUpdated(data: CreateProductRequest): void {
    if (!this.product) return;
    
    // Build update request from form data
    const request: UpdateProductRequest = {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      pointsCost: data.pointsCost,
      imageUrl: data.imageUrl || undefined
    };
    
    this.isLoading = true;
    this.showEditModal = false;
    
    this.productsService.updateProduct(this.product.id, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.toastService.success('Product updated successfully');
          this.loadProduct(this.product!.id); // Reload to get fresh data
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.toastService.error('Failed to update product', error?.error?.message || 'Unknown error');
        }
      });
  }
}
