import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductCategory, CreateProductRequest } from '../../../models/product.models';
import { ProductsService } from '../../../services/products.service';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../shared/components/form-errors-summary.component';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationHintComponent, FormErrorsSummaryComponent],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()"></div>
    <div class="modal" [class.open]="isOpen">
      <div class="modal-header">
        <h2>{{ editMode ? 'Edit Product' : 'Add New Product' }}</h2>
        <button class="close-btn" (click)="closeModal()" aria-label="Close">✕</button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="modal-content">
        <!-- Product Name -->
        <div class="form-group">
          <label for="name">Product Name <span class="required">*</span></label>
          <div class="input-with-action">
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="e.g., Gift Card 50"
              class="form-input"
              [class.error]="isFieldInvalid('name') || (productNameResult && !productNameResult.isValid)"
              [class.valid]="isFieldValid('name') && (!productNameResult || productNameResult.isValid)"
              maxlength="50"
              aria-describedby="name-hint"
            />
            <button 
              type="button" 
              class="check-btn" 
              (click)="checkProductNameNow()"
              [disabled]="checkingProductName || !form.get('name')?.value || form.get('name')?.invalid">
              Check
            </button>
          </div>
          <app-validation-hint
            id="name-hint"
            [control]="form.get('name')!"
            fieldName="Product name"
            fieldType="productName"
            [minLength]="2"
            [maxLength]="50"
            helperText="1-4 words, alphanumeric only, 2-50 characters"
            [checking]="checkingProductName"
            [uniquenessResult]="productNameResult">
          </app-validation-hint>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Description <span class="required">*</span></label>
          <textarea
            id="description"
            formControlName="description"
            placeholder="Describe the product (20-500 characters, 3-100 words)..."
            class="form-textarea"
            [class.error]="isFieldInvalid('description')"
            [class.valid]="isFieldValid('description')"
            rows="4"
            maxlength="500"
            aria-describedby="description-hint"
          ></textarea>
          <div class="char-count">
            {{ form.get('description')?.value?.trim()?.length || 0 }} / 500 characters
            | {{ getWordCount('description') }} words
          </div>
          <app-validation-hint
            id="description-hint"
            [control]="form.get('description')!"
            fieldName="Description"
            fieldType="description"
            [minLength]="20"
            [maxLength]="500"
            helperText="20-500 characters, 3-100 words">
          </app-validation-hint>
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="categoryId">Category <span class="required">*</span></label>
          <div class="category-row">
            <select
              id="categoryId"
              formControlName="categoryId"
              class="form-input"
              [class.error]="isFieldInvalid('categoryId')"
            >
              <option value="">Select a category...</option>
              <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
            </select>
            <button 
              type="button" 
              class="btn-new-category" 
              (click)="showCategoryForm = !showCategoryForm">
              {{ showCategoryForm ? 'Cancel' : '+ New' }}
            </button>
          </div>
          <app-validation-hint
            [control]="form.get('categoryId')!"
            fieldName="Category">
          </app-validation-hint>

          <!-- New Category Form -->
          <div class="new-category-form" *ngIf="showCategoryForm">
            <div class="form-group">
              <label for="newCategoryName">New Category Name <span class="required">*</span></label>
              <div class="input-with-action">
                <input
                  id="newCategoryName"
                  type="text"
                  formControlName="newCategoryName"
                  placeholder="e.g., Electronics"
                  class="form-input"
                  [class.error]="isFieldInvalid('newCategoryName') || (categoryNameResult && !categoryNameResult.isValid)"
                  [class.valid]="isFieldValid('newCategoryName') && categoryNameResult?.isValid"
                  maxlength="50"
                />
                <button 
                  type="button" 
                  class="check-btn" 
                  (click)="checkCategoryNameNow()"
                  [disabled]="checkingCategoryName || !form.get('newCategoryName')?.value || form.get('newCategoryName')?.invalid">
                  Check
                </button>
              </div>
              <app-validation-hint
                [control]="form.get('newCategoryName')!"
                fieldName="Category name"
                fieldType="productName"
                [minLength]="2"
                [maxLength]="50"
                helperText="1-4 words, alphanumeric only (must be unique)"
                [checking]="checkingCategoryName"
                [uniquenessResult]="categoryNameResult">
              </app-validation-hint>
            </div>
            <button 
              type="button" 
              class="btn-create-category"
              (click)="createCategory()"
              [disabled]="isCreatingCategory || !canCreateCategory">
              {{ isCreatingCategory ? 'Creating...' : 'Create Category' }}
            </button>
          </div>
        </div>

        <!-- Points Cost -->
        <div class="form-group">
          <label for="pointsCost">Points Cost <span class="required">*</span></label>
          <input
            id="pointsCost"
            type="number"
            formControlName="pointsCost"
            placeholder="e.g., 1000"
            class="form-input"
            [class.error]="isFieldInvalid('pointsCost')"
            [class.valid]="isFieldValid('pointsCost')"
            min="1"
            max="10000000"
            aria-describedby="pointsCost-hint"
          />
          <app-validation-hint
            id="pointsCost-hint"
            [control]="form.get('pointsCost')!"
            fieldName="Points cost"
            fieldType="number"
            [minValue]="1"
            [maxValue]="10000000"
            helperText="Whole number from 1 to 10,000,000 (must be positive)">
          </app-validation-hint>
        </div>

        <!-- Initial Stock -->
        <div class="form-group">
          <label for="initialStock">Initial Stock <span class="required">*</span></label>
          <input
            id="initialStock"
            type="number"
            formControlName="initialStock"
            placeholder="e.g., 100"
            class="form-input"
            [class.error]="isFieldInvalid('initialStock')"
            [class.valid]="isFieldValid('initialStock')"
            min="1"
            max="1000000"
            aria-describedby="initialStock-hint"
          />
          <app-validation-hint
            id="initialStock-hint"
            [control]="form.get('initialStock')!"
            fieldName="Initial stock"
            fieldType="number"
            [minValue]="1"
            [maxValue]="1000000"
            helperText="Whole number from 1 to 1,000,000">
          </app-validation-hint>
        </div>

        <!-- Image URL -->
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            formControlName="imageUrl"
            placeholder="https://example.com/image.jpg"
            class="form-input"
            [class.error]="isFieldInvalid('imageUrl')"
            [class.valid]="isFieldValid('imageUrl')"
            maxlength="1000"
            aria-describedby="imageUrl-hint"
          />
          <app-validation-hint
            id="imageUrl-hint"
            [control]="form.get('imageUrl')!"
            fieldName="Image URL"
            fieldType="url"
            helperText="HTTPS URL only, max 1000 characters (optional)">
          </app-validation-hint>
        </div>

        <!-- Error Message -->
        <div class="error-banner" *ngIf="error" role="alert">
          <p>{{ error }}</p>
        </div>

        <!-- Form Errors Summary - Toggle to show all errors -->
        <app-form-errors-summary
          [form]="form"
          [fieldLabels]="formFieldLabels">
        </app-form-errors-summary>

        <!-- Loading State -->
        <div class="loading-banner" *ngIf="isSubmitting" role="status">
          <div class="spinner"></div>
          <p>{{ editMode ? 'Updating...' : 'Creating product...' }}</p>
        </div>
      </form>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn-cancel" (click)="closeModal()" [disabled]="isSubmitting">
          Cancel
        </button>
        <button
          type="submit"
          class="btn-create"
          (click)="onSubmit()"
          [disabled]="!canSubmit">
          {{ isSubmitting ? 'Saving...' : (editMode ? 'Update Product' : 'Create Product') }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 550px;
      max-height: 90vh;
      background: white;
      border-radius: 8px;
      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
      z-index: 100;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    .modal.open {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 18px;
      color: #1f2937;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
    }

    .modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }

    .required { color: #dc2626; }

    .form-input, .form-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .form-input.error, .form-textarea.error {
      border-color: #dc2626;
    }

    .form-input.valid, .form-textarea.valid {
      border-color: #16a34a;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .char-count {
      font-size: 11px;
      color: #9ca3af;
      text-align: right;
      margin-top: 4px;
    }

    .category-row {
      display: flex;
      gap: 8px;
    }

    .category-row select {
      flex: 1;
    }

    .btn-new-category {
      padding: 10px 16px;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-new-category:hover {
      background: #e5e7eb;
    }

    .new-category-form {
      margin-top: 12px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }

    .input-with-action {
      display: flex;
      gap: 8px;
    }

    .input-with-action .form-input {
      flex: 1;
    }

    .check-btn {
      padding: 10px 16px;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }

    .check-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-create-category {
      margin-top: 12px;
      width: 100%;
      padding: 10px;
      background: #4b5563;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn-create-category:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error-banner, .loading-banner {
      margin: 16px 0;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .error-banner {
      background: #fee2e2;
      color: #dc2626;
    }

    .loading-banner {
      background: #dbeafe;
      color: #1e40af;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #1e40af;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .btn-cancel, .btn-create {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancel {
      background: white;
      border: 1px solid #e5e7eb;
      color: #374151;
    }

    .btn-create {
      background: #4b5563;
      color: white;
    }

    .btn-cancel:disabled, .btn-create:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ProductFormModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() categories: ProductCategory[] = [];
  @Input() initialData?: Partial<CreateProductRequest>;
  @Output() productSaved = new EventEmitter<CreateProductRequest>();
  @Output() categoryCreated = new EventEmitter<{ name: string; description?: string }>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  showCategoryForm = false;
  isCreatingCategory = false;

  // Category uniqueness check
  checkingCategoryName = false;
  categoryNameResult: ValidationResult | null = null;

  // Product name uniqueness check
  checkingProductName = false;
  productNameResult: ValidationResult | null = null;

  // Field labels for error summary
  formFieldLabels: { [key: string]: string } = {
    name: 'Product Name',
    description: 'Description',
    categoryId: 'Category',
    pointsCost: 'Points Cost',
    initialStock: 'Initial Stock',
    imageUrl: 'Image URL',
    newCategoryName: 'New Category Name'
  };

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupCategoryNameCheck();
    this.setupProductNameCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
        CustomValidators.productNameFormat()
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(ValidationConstants.DESCRIPTION_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.DESCRIPTION_MAX_LENGTH),
        CustomValidators.wordCount(ValidationConstants.DESCRIPTION_MIN_WORDS, ValidationConstants.DESCRIPTION_MAX_WORDS)
      ]],
      categoryId: ['', Validators.required],
      pointsCost: [1, [
        Validators.required,
        Validators.min(ValidationConstants.POINTS_COST_MIN),
        Validators.max(ValidationConstants.POINTS_COST_MAX),
        CustomValidators.integer()
      ]],
      initialStock: [ValidationConstants.STOCK_MIN, [
        Validators.required,
        Validators.min(ValidationConstants.STOCK_MIN),
        Validators.max(ValidationConstants.STOCK_MAX),
        CustomValidators.integer()
      ]],
      imageUrl: ['', [
        Validators.maxLength(ValidationConstants.IMAGE_URL_MAX_LENGTH),
        CustomValidators.httpsUrl()
      ]],
      newCategoryName: ['', [
        Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
        CustomValidators.productNameFormat()
      ]]
    });

    // Apply initial data if in edit mode
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  private setupProductNameCheck(): void {
    this.form.get('name')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(ValidationConstants.DEBOUNCE_TIME_MS),
        distinctUntilChanged()
      )
      .subscribe(name => {
        if (name && this.form.get('name')?.valid) {
          this.checkProductName(name);
        } else {
          this.productNameResult = null;
        }
      });
  }

  private checkProductName(name: string): void {
    this.checkingProductName = true;
    this.productNameResult = null;
    this.cdr.markForCheck();

    this.validationService.checkProductNameAvailability(name)
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
    const name = this.form.get('name')?.value;
    if (name) {
      this.checkProductName(name);
    }
  }

  private setupCategoryNameCheck(): void {
    this.form.get('newCategoryName')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(ValidationConstants.DEBOUNCE_TIME_MS),
        distinctUntilChanged()
      )
      .subscribe(name => {
        if (name && this.form.get('newCategoryName')?.valid) {
          this.checkCategoryName(name);
        } else {
          this.categoryNameResult = null;
        }
      });
  }

  private checkCategoryName(name: string): void {
    this.checkingCategoryName = true;
    this.categoryNameResult = null;
    this.cdr.markForCheck();

    this.validationService.checkCategoryNameAvailability(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.categoryNameResult = result;
          this.checkingCategoryName = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.checkingCategoryName = false;
          this.cdr.markForCheck();
        }
      });
  }

  checkCategoryNameNow(): void {
    const name = this.form.get('newCategoryName')?.value;
    if (name) {
      this.checkCategoryName(name);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.valid && field.dirty);
  }

  getWordCount(fieldName: string): number {
    const value = this.form.get(fieldName)?.value || '';
    return value.split(/\s+/).filter((w: string) => w.length > 0).length;
  }

  get canCreateCategory(): boolean {
    const nameControl = this.form.get('newCategoryName');
    if (!nameControl?.valid || !nameControl?.value) return false;
    if (this.checkingCategoryName) return false;
    if (this.categoryNameResult && !this.categoryNameResult.isValid) return false;
    return true;
  }

  get canSubmit(): boolean {
    // Check main form fields (including initialStock which is now required)
    const mainFields = ['name', 'description', 'categoryId', 'pointsCost', 'initialStock'];
    for (const field of mainFields) {
      if (this.form.get(field)?.invalid) return false;
    }
    
    // Check optional fields if they have values
    const imageControl = this.form.get('imageUrl');
    if (imageControl?.value && imageControl?.invalid) return false;

    // Check product name uniqueness
    if (this.checkingProductName) return false;
    if (this.productNameResult && !this.productNameResult.isValid) return false;

    if (this.isSubmitting) return false;

    return true;
  }

  createCategory(): void {
    if (!this.canCreateCategory) return;

    const name = this.form.get('newCategoryName')?.value?.trim();
    this.categoryCreated.emit({ name });
    
    // Reset category form
    this.form.get('newCategoryName')?.reset();
    this.categoryNameResult = null;
    this.showCategoryForm = false;
  }

  closeModal(): void {
    this.form.reset({
      pointsCost: 1,
      initialStock: 1
    });
    this.error = null;
    this.isSubmitting = false;
    this.showCategoryForm = false;
    this.categoryNameResult = null;
    this.productNameResult = null;
    this.closed.emit();
  }

  setError(message: string): void {
    this.error = message;
    this.isSubmitting = false;
  }

  setSubmitting(submitting: boolean): void {
    this.isSubmitting = submitting;
  }

  onSubmit(): void {
    // Mark all fields as touched
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (!this.canSubmit) {
      this.error = 'Please fix all validation errors before submitting.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formValue = this.form.value;
    
    const request: CreateProductRequest = {
      name: formValue.name.trim(),
      description: formValue.description.trim(),
      categoryId: formValue.categoryId,
      pointsCost: Math.floor(Number(formValue.pointsCost)),
      imageUrl: formValue.imageUrl?.trim() || undefined,
      initialStock: formValue.initialStock ? Math.floor(Number(formValue.initialStock)) : undefined
    };

    this.productSaved.emit(request);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
