import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../shared/components/form-errors-summary.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../services/validation.service";
import * as i3 from "@angular/common";
function ProductFormModalComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵlistener("click", function ProductFormModalComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeModal()); });
    i0.ɵɵelementEnd();
} }
function ProductFormModalComponent_option_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r3.name);
} }
function ProductFormModalComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 5)(2, "label", 42);
    i0.ɵɵtext(3, "New Category Name ");
    i0.ɵɵelementStart(4, "span", 7);
    i0.ɵɵtext(5, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 8);
    i0.ɵɵelement(7, "input", 43);
    i0.ɵɵelementStart(8, "button", 10);
    i0.ɵɵlistener("click", function ProductFormModalComponent_div_40_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.checkCategoryNameNow()); });
    i0.ɵɵtext(9, " Check ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(10, "app-validation-hint", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 45);
    i0.ɵɵlistener("click", function ProductFormModalComponent_div_40_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createCategory()); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("newCategoryName") || ctx_r1.categoryNameResult && !ctx_r1.categoryNameResult.isValid)("valid", ctx_r1.isFieldValid("newCategoryName") && (ctx_r1.categoryNameResult == null ? null : ctx_r1.categoryNameResult.isValid));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.checkingCategoryName || !((tmp_3_0 = ctx_r1.form.get("newCategoryName")) == null ? null : tmp_3_0.value) || ((tmp_3_0 = ctx_r1.form.get("newCategoryName")) == null ? null : tmp_3_0.invalid));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("control", ctx_r1.form.get("newCategoryName"))("minLength", 2)("maxLength", 50)("checking", ctx_r1.checkingCategoryName)("uniquenessResult", ctx_r1.categoryNameResult);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isCreatingCategory || !ctx_r1.canCreateCategory);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isCreatingCategory ? "Creating..." : "Create Category", " ");
} }
function ProductFormModalComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function ProductFormModalComponent_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵelement(1, "div", 48);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.editMode ? "Updating..." : "Creating product...");
} }
export class ProductFormModalComponent {
    constructor(fb, validationService, cdr) {
        this.fb = fb;
        this.validationService = validationService;
        this.cdr = cdr;
        this.isOpen = false;
        this.editMode = false;
        this.categories = [];
        this.productSaved = new EventEmitter();
        this.categoryCreated = new EventEmitter();
        this.closed = new EventEmitter();
        this.isSubmitting = false;
        this.error = null;
        this.showCategoryForm = false;
        this.isCreatingCategory = false;
        // Category uniqueness check
        this.checkingCategoryName = false;
        this.categoryNameResult = null;
        // Product name uniqueness check
        this.checkingProductName = false;
        this.productNameResult = null;
        // Field labels for error summary
        this.formFieldLabels = {
            name: 'Product Name',
            description: 'Description',
            categoryId: 'Category',
            pointsCost: 'Points Cost',
            initialStock: 'Initial Stock',
            imageUrl: 'Image URL',
            newCategoryName: 'New Category Name'
        };
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.initForm();
        this.setupCategoryNameCheck();
        this.setupProductNameCheck();
    }
    initForm() {
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
    setupProductNameCheck() {
        this.form.get('name')?.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(ValidationConstants.DEBOUNCE_TIME_MS), distinctUntilChanged())
            .subscribe(name => {
            if (name && this.form.get('name')?.valid) {
                this.checkProductName(name);
            }
            else {
                this.productNameResult = null;
            }
        });
    }
    checkProductName(name) {
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
    checkProductNameNow() {
        const name = this.form.get('name')?.value;
        if (name) {
            this.checkProductName(name);
        }
    }
    setupCategoryNameCheck() {
        this.form.get('newCategoryName')?.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(ValidationConstants.DEBOUNCE_TIME_MS), distinctUntilChanged())
            .subscribe(name => {
            if (name && this.form.get('newCategoryName')?.valid) {
                this.checkCategoryName(name);
            }
            else {
                this.categoryNameResult = null;
            }
        });
    }
    checkCategoryName(name) {
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
    checkCategoryNameNow() {
        const name = this.form.get('newCategoryName')?.value;
        if (name) {
            this.checkCategoryName(name);
        }
    }
    isFieldInvalid(fieldName) {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
    isFieldValid(fieldName) {
        const field = this.form.get(fieldName);
        return !!(field && field.valid && field.dirty);
    }
    getWordCount(fieldName) {
        const value = this.form.get(fieldName)?.value || '';
        return value.split(/\s+/).filter((w) => w.length > 0).length;
    }
    get canCreateCategory() {
        const nameControl = this.form.get('newCategoryName');
        if (!nameControl?.valid || !nameControl?.value)
            return false;
        if (this.checkingCategoryName)
            return false;
        if (this.categoryNameResult && !this.categoryNameResult.isValid)
            return false;
        return true;
    }
    get canSubmit() {
        // Check main form fields (including initialStock which is now required)
        const mainFields = ['name', 'description', 'categoryId', 'pointsCost', 'initialStock'];
        for (const field of mainFields) {
            if (this.form.get(field)?.invalid)
                return false;
        }
        // Check optional fields if they have values
        const imageControl = this.form.get('imageUrl');
        if (imageControl?.value && imageControl?.invalid)
            return false;
        // Check product name uniqueness
        if (this.checkingProductName)
            return false;
        if (this.productNameResult && !this.productNameResult.isValid)
            return false;
        if (this.isSubmitting)
            return false;
        return true;
    }
    createCategory() {
        if (!this.canCreateCategory)
            return;
        const name = this.form.get('newCategoryName')?.value?.trim();
        this.categoryCreated.emit({ name });
        // Reset category form
        this.form.get('newCategoryName')?.reset();
        this.categoryNameResult = null;
        this.showCategoryForm = false;
    }
    closeModal() {
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
    setError(message) {
        this.error = message;
        this.isSubmitting = false;
    }
    setSubmitting(submitting) {
        this.isSubmitting = submitting;
    }
    onSubmit() {
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
        const request = {
            name: formValue.name.trim(),
            description: formValue.description.trim(),
            categoryId: formValue.categoryId,
            pointsCost: Math.floor(Number(formValue.pointsCost)),
            imageUrl: formValue.imageUrl?.trim() || undefined,
            initialStock: formValue.initialStock ? Math.floor(Number(formValue.initialStock)) : undefined
        };
        this.productSaved.emit(request);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function ProductFormModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductFormModalComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ValidationService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductFormModalComponent, selectors: [["app-product-form-modal"]], inputs: { isOpen: "isOpen", editMode: "editMode", categories: "categories", initialData: "initialData" }, outputs: { productSaved: "productSaved", categoryCreated: "categoryCreated", closed: "closed" }, decls: 68, vars: 56, consts: [["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "modal"], [1, "modal-header"], ["aria-label", "Close", 1, "close-btn", 3, "click"], [1, "modal-content", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], [1, "required"], [1, "input-with-action"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "e.g., Gift Card 50", "maxlength", "50", "aria-describedby", "name-hint", 1, "form-input"], ["type", "button", 1, "check-btn", 3, "click", "disabled"], ["id", "name-hint", "fieldName", "Product name", "fieldType", "productName", "helperText", "1-4 words, alphanumeric only, 2-50 characters", 3, "control", "minLength", "maxLength", "checking", "uniquenessResult"], ["for", "description"], ["id", "description", "formControlName", "description", "placeholder", "Describe the product (20-500 characters, 3-100 words)...", "rows", "4", "maxlength", "500", "aria-describedby", "description-hint", 1, "form-textarea"], [1, "char-count"], ["id", "description-hint", "fieldName", "Description", "fieldType", "description", "helperText", "20-500 characters, 3-100 words", 3, "control", "minLength", "maxLength"], ["for", "categoryId"], [1, "category-row"], ["id", "categoryId", "formControlName", "categoryId", 1, "form-input"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn-new-category", 3, "click"], ["fieldName", "Category", 3, "control"], ["class", "new-category-form", 4, "ngIf"], ["for", "pointsCost"], ["id", "pointsCost", "type", "number", "formControlName", "pointsCost", "placeholder", "e.g., 1000", "min", "1", "max", "10000000", "aria-describedby", "pointsCost-hint", 1, "form-input"], ["id", "pointsCost-hint", "fieldName", "Points cost", "fieldType", "number", "helperText", "Whole number from 1 to 10,000,000 (must be positive)", 3, "control", "minValue", "maxValue"], ["for", "initialStock"], ["id", "initialStock", "type", "number", "formControlName", "initialStock", "placeholder", "e.g., 100", "min", "1", "max", "1000000", "aria-describedby", "initialStock-hint", 1, "form-input"], ["id", "initialStock-hint", "fieldName", "Initial stock", "fieldType", "number", "helperText", "Whole number from 1 to 1,000,000", 3, "control", "minValue", "maxValue"], ["for", "imageUrl"], ["id", "imageUrl", "type", "url", "formControlName", "imageUrl", "placeholder", "https://example.com/image.jpg", "maxlength", "1000", "aria-describedby", "imageUrl-hint", 1, "form-input"], ["id", "imageUrl-hint", "fieldName", "Image URL", "fieldType", "url", "helperText", "HTTPS URL only, max 1000 characters (optional)", 3, "control"], ["class", "error-banner", "role", "alert", 4, "ngIf"], [3, "form", "fieldLabels"], ["class", "loading-banner", "role", "status", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-create", 3, "click", "disabled"], [1, "modal-overlay", 3, "click"], [3, "value"], [1, "new-category-form"], ["for", "newCategoryName"], ["id", "newCategoryName", "type", "text", "formControlName", "newCategoryName", "placeholder", "e.g., Electronics", "maxlength", "50", 1, "form-input"], ["fieldName", "Category name", "fieldType", "productName", "helperText", "1-4 words, alphanumeric only (must be unique)", 3, "control", "minLength", "maxLength", "checking", "uniquenessResult"], ["type", "button", 1, "btn-create-category", 3, "click", "disabled"], ["role", "alert", 1, "error-banner"], ["role", "status", 1, "loading-banner"], [1, "spinner"]], template: function ProductFormModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ProductFormModalComponent_div_0_Template, 1, 0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "h2");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 3);
            i0.ɵɵlistener("click", function ProductFormModalComponent_Template_button_click_5_listener() { return ctx.closeModal(); });
            i0.ɵɵtext(6, "\u2715");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "form", 4);
            i0.ɵɵlistener("ngSubmit", function ProductFormModalComponent_Template_form_ngSubmit_7_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(8, "div", 5)(9, "label", 6);
            i0.ɵɵtext(10, "Product Name ");
            i0.ɵɵelementStart(11, "span", 7);
            i0.ɵɵtext(12, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 8);
            i0.ɵɵelement(14, "input", 9);
            i0.ɵɵelementStart(15, "button", 10);
            i0.ɵɵlistener("click", function ProductFormModalComponent_Template_button_click_15_listener() { return ctx.checkProductNameNow(); });
            i0.ɵɵtext(16, " Check ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(17, "app-validation-hint", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 5)(19, "label", 12);
            i0.ɵɵtext(20, "Description ");
            i0.ɵɵelementStart(21, "span", 7);
            i0.ɵɵtext(22, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(23, "textarea", 13);
            i0.ɵɵelementStart(24, "div", 14);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "app-validation-hint", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 5)(28, "label", 16);
            i0.ɵɵtext(29, "Category ");
            i0.ɵɵelementStart(30, "span", 7);
            i0.ɵɵtext(31, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 17)(33, "select", 18)(34, "option", 19);
            i0.ɵɵtext(35, "Select a category...");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, ProductFormModalComponent_option_36_Template, 2, 2, "option", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 21);
            i0.ɵɵlistener("click", function ProductFormModalComponent_Template_button_click_37_listener() { return ctx.showCategoryForm = !ctx.showCategoryForm; });
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(39, "app-validation-hint", 22);
            i0.ɵɵtemplate(40, ProductFormModalComponent_div_40_Template, 13, 12, "div", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 5)(42, "label", 24);
            i0.ɵɵtext(43, "Points Cost ");
            i0.ɵɵelementStart(44, "span", 7);
            i0.ɵɵtext(45, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(46, "input", 25)(47, "app-validation-hint", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 5)(49, "label", 27);
            i0.ɵɵtext(50, "Initial Stock ");
            i0.ɵɵelementStart(51, "span", 7);
            i0.ɵɵtext(52, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(53, "input", 28)(54, "app-validation-hint", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 5)(56, "label", 30);
            i0.ɵɵtext(57, "Image URL");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(58, "input", 31)(59, "app-validation-hint", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(60, ProductFormModalComponent_div_60_Template, 3, 1, "div", 33);
            i0.ɵɵelement(61, "app-form-errors-summary", 34);
            i0.ɵɵtemplate(62, ProductFormModalComponent_div_62_Template, 4, 1, "div", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 36)(64, "button", 37);
            i0.ɵɵlistener("click", function ProductFormModalComponent_Template_button_click_64_listener() { return ctx.closeModal(); });
            i0.ɵɵtext(65, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "button", 38);
            i0.ɵɵlistener("click", function ProductFormModalComponent_Template_button_click_66_listener() { return ctx.onSubmit(); });
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_6_0;
            let tmp_14_0;
            i0.ɵɵproperty("ngIf", ctx.isOpen);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isOpen);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.editMode ? "Edit Product" : "Add New Product");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("name") || ctx.productNameResult && !ctx.productNameResult.isValid)("valid", ctx.isFieldValid("name") && (!ctx.productNameResult || ctx.productNameResult.isValid));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.checkingProductName || !((tmp_6_0 = ctx.form.get("name")) == null ? null : tmp_6_0.value) || ((tmp_6_0 = ctx.form.get("name")) == null ? null : tmp_6_0.invalid));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("control", ctx.form.get("name"))("minLength", 2)("maxLength", 50)("checking", ctx.checkingProductName)("uniquenessResult", ctx.productNameResult);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("description"))("valid", ctx.isFieldValid("description"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2(" ", ((tmp_14_0 = ctx.form.get("description")) == null ? null : tmp_14_0.value == null ? null : (tmp_14_0 = tmp_14_0.value.trim()) == null ? null : tmp_14_0.length) || 0, " / 500 characters | ", ctx.getWordCount("description"), " words ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("description"))("minLength", 20)("maxLength", 500);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("categoryId"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.showCategoryForm ? "Cancel" : "+ New", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("categoryId"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCategoryForm);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("pointsCost"))("valid", ctx.isFieldValid("pointsCost"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("pointsCost"))("minValue", 1)("maxValue", 10000000);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("initialStock"))("valid", ctx.isFieldValid("initialStock"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("initialStock"))("minValue", 1)("maxValue", 1000000);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("imageUrl"))("valid", ctx.isFieldValid("imageUrl"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("imageUrl"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("form", ctx.form)("fieldLabels", ctx.formFieldLabels);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSubmitting);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSubmitting);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canSubmit);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Saving..." : ctx.editMode ? "Update Product" : "Create Product", " ");
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, ValidationHintComponent, FormErrorsSummaryComponent], styles: [".modal-overlay[_ngcontent-%COMP%] {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n    }\n\n    .modal[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) scale(0.95);\n      width: 90%;\n      max-width: 550px;\n      max-height: 90vh;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      opacity: 0;\n      pointer-events: none;\n      transition: all 0.3s ease;\n    }\n\n    .modal.open[_ngcontent-%COMP%] {\n      opacity: 1;\n      pointer-events: auto;\n      transform: translate(-50%, -50%) scale(1);\n    }\n\n    .modal-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn[_ngcontent-%COMP%] {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n    }\n\n    .modal-content[_ngcontent-%COMP%] {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n      margin-bottom: 16px;\n    }\n\n    label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 13px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 6px;\n    }\n\n    .required[_ngcontent-%COMP%] { color: #dc2626; }\n\n    .form-input[_ngcontent-%COMP%], .form-textarea[_ngcontent-%COMP%] {\n      width: 100%;\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      transition: all 0.2s ease;\n      box-sizing: border-box;\n    }\n\n    .form-input[_ngcontent-%COMP%]:focus, .form-textarea[_ngcontent-%COMP%]:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input.error[_ngcontent-%COMP%], .form-textarea.error[_ngcontent-%COMP%] {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid[_ngcontent-%COMP%], .form-textarea.valid[_ngcontent-%COMP%] {\n      border-color: #16a34a;\n    }\n\n    .form-textarea[_ngcontent-%COMP%] {\n      resize: vertical;\n      min-height: 80px;\n    }\n\n    .char-count[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: #9ca3af;\n      text-align: right;\n      margin-top: 4px;\n    }\n\n    .category-row[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 8px;\n    }\n\n    .category-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n      flex: 1;\n    }\n\n    .btn-new-category[_ngcontent-%COMP%] {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      cursor: pointer;\n      white-space: nowrap;\n    }\n\n    .btn-new-category[_ngcontent-%COMP%]:hover {\n      background: #e5e7eb;\n    }\n\n    .new-category-form[_ngcontent-%COMP%] {\n      margin-top: 12px;\n      padding: 12px;\n      background: #f9fafb;\n      border-radius: 6px;\n      border: 1px solid #e5e7eb;\n    }\n\n    .input-with-action[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 8px;\n    }\n\n    .input-with-action[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n      flex: 1;\n    }\n\n    .check-btn[_ngcontent-%COMP%] {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      cursor: pointer;\n    }\n\n    .check-btn[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .btn-create-category[_ngcontent-%COMP%] {\n      margin-top: 12px;\n      width: 100%;\n      padding: 10px;\n      background: #4b5563;\n      color: white;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      cursor: pointer;\n    }\n\n    .btn-create-category[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .error-banner[_ngcontent-%COMP%], .loading-banner[_ngcontent-%COMP%] {\n      margin: 16px 0;\n      padding: 12px 16px;\n      border-radius: 6px;\n      font-size: 13px;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .error-banner[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .loading-banner[_ngcontent-%COMP%] {\n      background: #dbeafe;\n      color: #1e40af;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .modal-footer[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%], .btn-create[_ngcontent-%COMP%] {\n      padding: 10px 20px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%] {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-create[_ngcontent-%COMP%] {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%]:disabled, .btn-create[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductFormModalComponent, [{
        type: Component,
        args: [{ selector: 'app-product-form-modal', standalone: true, imports: [CommonModule, ReactiveFormsModule, ValidationHintComponent, FormErrorsSummaryComponent], template: `
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
  `, styles: ["\n    .modal-overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n    }\n\n    .modal {\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) scale(0.95);\n      width: 90%;\n      max-width: 550px;\n      max-height: 90vh;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      opacity: 0;\n      pointer-events: none;\n      transition: all 0.3s ease;\n    }\n\n    .modal.open {\n      opacity: 1;\n      pointer-events: auto;\n      transform: translate(-50%, -50%) scale(1);\n    }\n\n    .modal-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .modal-header h2 {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n    }\n\n    .modal-content {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .form-group {\n      margin-bottom: 16px;\n    }\n\n    label {\n      display: block;\n      font-size: 13px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 6px;\n    }\n\n    .required { color: #dc2626; }\n\n    .form-input, .form-textarea {\n      width: 100%;\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      transition: all 0.2s ease;\n      box-sizing: border-box;\n    }\n\n    .form-input:focus, .form-textarea:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input.error, .form-textarea.error {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid, .form-textarea.valid {\n      border-color: #16a34a;\n    }\n\n    .form-textarea {\n      resize: vertical;\n      min-height: 80px;\n    }\n\n    .char-count {\n      font-size: 11px;\n      color: #9ca3af;\n      text-align: right;\n      margin-top: 4px;\n    }\n\n    .category-row {\n      display: flex;\n      gap: 8px;\n    }\n\n    .category-row select {\n      flex: 1;\n    }\n\n    .btn-new-category {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      cursor: pointer;\n      white-space: nowrap;\n    }\n\n    .btn-new-category:hover {\n      background: #e5e7eb;\n    }\n\n    .new-category-form {\n      margin-top: 12px;\n      padding: 12px;\n      background: #f9fafb;\n      border-radius: 6px;\n      border: 1px solid #e5e7eb;\n    }\n\n    .input-with-action {\n      display: flex;\n      gap: 8px;\n    }\n\n    .input-with-action .form-input {\n      flex: 1;\n    }\n\n    .check-btn {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      cursor: pointer;\n    }\n\n    .check-btn:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .btn-create-category {\n      margin-top: 12px;\n      width: 100%;\n      padding: 10px;\n      background: #4b5563;\n      color: white;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      cursor: pointer;\n    }\n\n    .btn-create-category:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .error-banner, .loading-banner {\n      margin: 16px 0;\n      padding: 12px 16px;\n      border-radius: 6px;\n      font-size: 13px;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .error-banner {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .loading-banner {\n      background: #dbeafe;\n      color: #1e40af;\n    }\n\n    .spinner {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: spin 0.6s linear infinite;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .modal-footer {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn-cancel, .btn-create {\n      padding: 10px 20px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n\n    .btn-cancel {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-create {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-cancel:disabled, .btn-create:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ValidationService }, { type: i0.ChangeDetectorRef }], { isOpen: [{
            type: Input
        }], editMode: [{
            type: Input
        }], categories: [{
            type: Input
        }], initialData: [{
            type: Input
        }], productSaved: [{
            type: Output
        }], categoryCreated: [{
            type: Output
        }], closed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductFormModalComponent, { className: "ProductFormModalComponent", filePath: "src/app/pages/admin/products/product-form-modal.component.ts", lineNumber: 520 }); })();
//# sourceMappingURL=product-form-modal.component.js.map