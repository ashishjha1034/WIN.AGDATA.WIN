import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ValidationHintComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "span", 5);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Checking availability...");
    i0.ɵɵelementEnd()();
} }
function ValidationHintComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 7);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("available", ctx_r0.uniquenessResult.isValid)("taken", !ctx_r0.uniquenessResult.isValid);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.uniquenessResult.isValid ? "\u2713" : "\u2717");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.uniquenessResult.message);
} }
function ValidationHintComponent_div_2_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "\u2717");
    i0.ɵɵelementEnd();
} }
function ValidationHintComponent_div_2_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "\u2713");
    i0.ɵɵelementEnd();
} }
function ValidationHintComponent_div_2_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "\u26A0");
    i0.ɵɵelementEnd();
} }
function ValidationHintComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, ValidationHintComponent_div_2_span_1_Template, 2, 0, "span", 9)(2, ValidationHintComponent_div_2_span_2_Template, 2, 0, "span", 9)(3, ValidationHintComponent_div_2_span_3_Template, 2, 0, "span", 9);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("error", ctx_r0.control.invalid && (ctx_r0.control.dirty || ctx_r0.showImmediately && ctx_r0.control.value))("success", ctx_r0.control.valid && ctx_r0.control.dirty)("warning", ctx_r0.isWarning);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.control.invalid && (ctx_r0.control.dirty || ctx_r0.showImmediately && ctx_r0.control.value));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.control.valid && ctx_r0.control.dirty && !ctx_r0.isWarning);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isWarning);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.smartMessage);
} }
function ValidationHintComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", ctx_r0.helperText);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.helperText, " ");
} }
/**
 * Component for displaying inline validation hints
 * Shows real-time intelligent feedback as users type
 */
export class ValidationHintComponent {
    constructor() {
        this.checking = false;
        this.showErrors = true;
        /** Show errors immediately as user types, without waiting for blur/touch */
        this.showImmediately = true;
        this.smartMessage = null;
        this.isWarning = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (this.control) {
            this.control.valueChanges
                .pipe(takeUntil(this.destroy$), debounceTime(100))
                .subscribe(() => {
                this.updateSmartMessage();
            });
        }
    }
    ngOnChanges(changes) {
        this.updateSmartMessage();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateSmartMessage() {
        if (!this.control) {
            this.smartMessage = null;
            return;
        }
        const value = this.control.value;
        const errors = this.control.errors;
        const isDirty = this.control.dirty;
        const isTouched = this.control.touched;
        this.isWarning = false;
        // Determine if we should show validation based on showImmediately flag
        // If showImmediately is true, show errors as soon as there's a value (dirty)
        // Otherwise, wait for touch/blur
        const shouldShowValidation = this.showImmediately ? (isDirty || isTouched) : (isDirty || isTouched);
        // If field is empty
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            if (isTouched && errors?.['required']) {
                this.smartMessage = `${this.fieldName || 'This field'} is required`;
            }
            else {
                this.smartMessage = null;
            }
            return;
        }
        // Field has value - analyze it
        const strValue = String(value);
        // Determine field type from context if not specified
        const type = this.fieldType || this.inferFieldType();
        switch (type) {
            case 'name':
                this.smartMessage = this.getNameValidationMessage(strValue, errors);
                break;
            case 'employeeId':
                this.smartMessage = this.getEmployeeIdValidationMessage(strValue, errors);
                break;
            case 'email':
                this.smartMessage = this.getEmailValidationMessage(strValue, errors);
                break;
            case 'productName':
                this.smartMessage = this.getProductNameValidationMessage(strValue, errors);
                break;
            case 'description':
                this.smartMessage = this.getDescriptionValidationMessage(strValue, errors);
                break;
            case 'number':
                this.smartMessage = this.getNumberValidationMessage(value, errors);
                break;
            case 'url':
                this.smartMessage = this.getUrlValidationMessage(strValue, errors);
                break;
            default:
                this.smartMessage = this.getGenericValidationMessage(strValue, errors);
        }
    }
    inferFieldType() {
        const name = this.fieldName?.toLowerCase() || '';
        if (name.includes('first') || name.includes('last') || name === 'name')
            return 'name';
        if (name.includes('employee'))
            return 'employeeId';
        if (name.includes('email'))
            return 'email';
        if (name.includes('product') && name.includes('name'))
            return 'productName';
        if (name.includes('description'))
            return 'description';
        if (name.includes('point') || name.includes('stock') || name.includes('cost'))
            return 'number';
        if (name.includes('url') || name.includes('image'))
            return 'url';
        return 'generic';
    }
    /**
     * Get name validation message - shows single, highest-priority message.
     * Priority order: space > digit > symbol > min-length > max-length
     * Works with liveNameValidation() errors from CustomValidators.
     */
    getNameValidationMessage(value, errors) {
        const minLen = this.minLength || 2;
        const maxLen = this.maxLength || 50;
        // Check for errors from liveNameValidation() in priority order
        if (errors?.['nameHasSpace']) {
            return errors['nameHasSpace'].message || 'No spaces allowed';
        }
        if (errors?.['nameHasDigit']) {
            return errors['nameHasDigit'].message || 'Numbers are not allowed';
        }
        if (errors?.['nameHasSymbol']) {
            return errors['nameHasSymbol'].message || 'Symbols are not allowed';
        }
        if (errors?.['nameMinLength']) {
            return errors['nameMinLength'].message || `At least ${minLen} characters required`;
        }
        if (errors?.['nameMaxLength']) {
            return errors['nameMaxLength'].message || `Maximum ${maxLen} characters allowed`;
        }
        // Legacy error keys for backwards compatibility
        if (errors?.['nonAlphabet']) {
            // Determine specific issue for legacy validator
            if (/\s/.test(value)) {
                return 'No spaces allowed';
            }
            if (/\d/.test(value)) {
                return 'Numbers are not allowed';
            }
            return 'Symbols are not allowed';
        }
        if (errors?.['alphabetOnly']) {
            if (/\s/.test(value)) {
                return 'No spaces allowed';
            }
            if (/\d/.test(value)) {
                return 'Numbers are not allowed';
            }
            return 'Symbols are not allowed';
        }
        // Standard Angular validators
        if (errors?.['minlength']) {
            const needed = minLen - value.length;
            if (needed === 1) {
                return 'Enter 1 more character';
            }
            return `At least ${minLen} characters required`;
        }
        if (errors?.['maxlength']) {
            return `Maximum ${maxLen} characters allowed`;
        }
        // Valid - show success message
        if (!errors) {
            return 'Looks good!';
        }
        return null;
    }
    getEmployeeIdValidationMessage(value, errors) {
        const requiredLen = 9;
        // Check for special characters
        if (/[^a-zA-Z0-9]/.test(value)) {
            return 'Only letters and numbers allowed (no spaces or symbols)';
        }
        // Check length
        if (value.length < requiredLen) {
            const needed = requiredLen - value.length;
            return `Type ${needed} more character${needed > 1 ? 's' : ''} (exactly ${requiredLen} required)`;
        }
        if (value.length > requiredLen) {
            return `Too long! Exactly ${requiredLen} characters required.`;
        }
        // Valid format
        if (!errors) {
            return 'Format is correct! Click "Check" to verify availability.';
        }
        return errors?.['employeeIdFormat']?.message || null;
    }
    getEmailValidationMessage(value, errors) {
        // Check basic email format
        if (!value.includes('@')) {
            return 'Enter a complete email address (e.g., john.doe@agdata.com)';
        }
        const [localPart, domain] = value.split('@');
        // Check corporate domain
        if (domain && !domain.toLowerCase().includes('agdata.com')) {
            return 'Must use @agdata.com email domain';
        }
        // Check local part length
        if (localPart.length < 5) {
            const needed = 5 - localPart.length;
            return `Username too short. Type ${needed} more character${needed > 1 ? 's' : ''} before @`;
        }
        // Check for valid email format
        if (errors?.['email']) {
            return 'Invalid email format. Check for typos.';
        }
        // Valid format
        if (!errors) {
            return 'Email format is correct! Click "Check" to verify availability.';
        }
        return errors?.['corporateEmail']?.message || errors?.['corporateEmailLocalPart']?.message || null;
    }
    getProductNameValidationMessage(value, errors) {
        const minLen = this.minLength || 2;
        const maxLen = this.maxLength || 50;
        const maxWords = 4;
        // Use trimmed value for length calculations to match backend behavior
        const trimmedValue = value.trim();
        // Priority 1: Check for consecutive spaces (highest priority)
        if (value.includes('  ')) {
            return 'Only single spaces between words allowed';
        }
        // Priority 2: Check for leading/trailing spaces
        if (value !== trimmedValue && trimmedValue.length > 0) {
            this.isWarning = true;
            return 'Leading or trailing spaces will be removed on save';
        }
        const words = trimmedValue.split(' ').filter(w => w.length > 0);
        // Priority 3: Check word count
        if (words.length > maxWords) {
            return `Too many words! Maximum ${maxWords} words allowed (currently ${words.length})`;
        }
        // Priority 4: Check each word for valid characters
        for (const word of words) {
            if (/[^a-zA-Z0-9]/.test(word)) {
                return 'Each word must contain only letters and numbers';
            }
        }
        // Priority 5: Check total length (using trimmed value)
        if (trimmedValue.length < minLen) {
            const needed = minLen - trimmedValue.length;
            return `Type ${needed} more character${needed > 1 ? 's' : ''} (minimum ${minLen})`;
        }
        if (trimmedValue.length > maxLen) {
            return `Too long! Maximum ${maxLen} characters allowed.`;
        }
        // Valid!
        if (!errors) {
            return 'Product name looks good!';
        }
        return errors?.['productNameFormat']?.message || null;
    }
    getDescriptionValidationMessage(value, errors) {
        const minLen = this.minLength || 20;
        const maxLen = this.maxLength || 500;
        const minWords = 3;
        const maxWords = 100;
        // Use trimmed value for calculations to match backend behavior
        const trimmedValue = value.trim();
        // Check for consecutive spaces
        if (value.includes('  ')) {
            this.isWarning = true;
            return 'Consecutive spaces will be normalized on save';
        }
        const words = trimmedValue.split(/\s+/).filter(w => w.length > 0);
        // Priority 1: Check word count (before character length for descriptions)
        if (words.length < minWords) {
            const needed = minWords - words.length;
            this.isWarning = true;
            return `Add ${needed} more word${needed > 1 ? 's' : ''} (minimum ${minWords} words)`;
        }
        if (words.length > maxWords) {
            return `Too many words! Maximum ${maxWords} words allowed.`;
        }
        // Priority 2: Check character length (using trimmed value)
        if (trimmedValue.length < minLen) {
            const needed = minLen - trimmedValue.length;
            this.isWarning = true;
            return `Type ${needed} more character${needed > 1 ? 's' : ''} (minimum ${minLen})`;
        }
        if (trimmedValue.length > maxLen) {
            return `Too long! Maximum ${maxLen} characters allowed.`;
        }
        // Valid!
        if (!errors) {
            return `Good description! (${words.length} words, ${trimmedValue.length} characters)`;
        }
        return errors?.['wordCount']?.message || null;
    }
    getNumberValidationMessage(value, errors) {
        const numValue = Number(value);
        const min = this.minValue ?? 1;
        const max = this.maxValue ?? 10000000;
        // Check if it's a valid number
        if (isNaN(numValue)) {
            return 'Please enter a valid number';
        }
        // Check if it's a whole number
        if (!Number.isInteger(numValue)) {
            return 'Please enter a whole number (no decimals)';
        }
        // Check minimum
        if (numValue < min) {
            if (min === 1 && numValue === 0) {
                return 'Value must be at least 1 (zero not allowed)';
            }
            return `Minimum value is ${min.toLocaleString()}`;
        }
        // Check maximum
        if (numValue > max) {
            return `Maximum value is ${max.toLocaleString()}`;
        }
        // Valid!
        if (!errors) {
            return 'Value is valid!';
        }
        return errors?.['min']?.message || errors?.['max']?.message || errors?.['integer']?.message || null;
    }
    getUrlValidationMessage(value, errors) {
        if (!value) {
            return null; // URL is optional
        }
        // Check for HTTPS
        if (!value.toLowerCase().startsWith('https://')) {
            if (value.toLowerCase().startsWith('http://')) {
                return 'Use HTTPS instead of HTTP for security';
            }
            return 'URL must start with https://';
        }
        // Try to parse URL
        try {
            new URL(value);
        }
        catch {
            return 'Invalid URL format. Check for typos.';
        }
        // Check length
        if (value.length > 1000) {
            return 'URL is too long. Maximum 1000 characters.';
        }
        // Valid!
        if (!errors) {
            return 'Valid HTTPS URL!';
        }
        return errors?.['httpsUrl']?.message || null;
    }
    getGenericValidationMessage(value, errors) {
        if (!errors) {
            return this.control?.valid ? null : null;
        }
        // Return first error message
        if (errors['required'])
            return `${this.fieldName || 'This field'} is required`;
        if (errors['minlength'])
            return `Minimum ${errors['minlength'].requiredLength} characters required`;
        if (errors['maxlength'])
            return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
        if (errors['min'])
            return `Minimum value is ${errors['min'].min}`;
        if (errors['max'])
            return `Maximum value is ${errors['max'].max}`;
        // Check for custom error messages
        for (const key of Object.keys(errors)) {
            if (errors[key]?.message) {
                return errors[key].message;
            }
        }
        return 'Invalid value';
    }
    static { this.ɵfac = function ValidationHintComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidationHintComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ValidationHintComponent, selectors: [["app-validation-hint"]], inputs: { control: "control", fieldName: "fieldName", helperText: "helperText", checking: "checking", uniquenessResult: "uniquenessResult", showErrors: "showErrors", fieldType: "fieldType", minLength: "minLength", maxLength: "maxLength", minValue: "minValue", maxValue: "maxValue", showImmediately: "showImmediately" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 4, consts: [["class", "hint checking", "role", "status", "aria-live", "polite", 4, "ngIf"], ["class", "hint", "role", "status", "aria-live", "polite", 3, "available", "taken", 4, "ngIf"], ["class", "hint", "role", "alert", "aria-live", "polite", 3, "error", "success", "warning", 4, "ngIf"], ["class", "hint helper", 4, "ngIf"], ["role", "status", "aria-live", "polite", 1, "hint", "checking"], [1, "spinner"], ["role", "status", "aria-live", "polite", 1, "hint"], [1, "icon"], ["role", "alert", "aria-live", "polite", 1, "hint"], ["class", "icon", 4, "ngIf"], [1, "hint", "helper"]], template: function ValidationHintComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ValidationHintComponent_div_0_Template, 4, 0, "div", 0)(1, ValidationHintComponent_div_1_Template, 5, 6, "div", 1)(2, ValidationHintComponent_div_2_Template, 6, 10, "div", 2)(3, ValidationHintComponent_div_3_Template, 2, 2, "div", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.checking);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.checking && ctx.uniquenessResult);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrors && ctx.control && !ctx.checking && !ctx.uniquenessResult && ctx.smartMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.helperText && !ctx.checking && !ctx.uniquenessResult && !ctx.smartMessage && !(ctx.control == null ? null : ctx.control.value));
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".hint[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 12px;\n      margin-top: 4px;\n      padding: 4px 8px;\n      border-radius: 4px;\n      animation: _ngcontent-%COMP%_fadeIn 150ms ease-out;\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; transform: translateY(-2px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .helper[_ngcontent-%COMP%] {\n      color: #6b7280;\n      background: transparent;\n    }\n\n    .error[_ngcontent-%COMP%] {\n      color: #dc2626;\n      background: #fee2e2;\n    }\n    \n    .warning[_ngcontent-%COMP%] {\n      color: #d97706;\n      background: #fef3c7;\n    }\n    \n    .success[_ngcontent-%COMP%] {\n      color: #166534;\n      background: #dcfce7;\n    }\n\n    .checking[_ngcontent-%COMP%] {\n      color: #1e40af;\n      background: #dbeafe;\n    }\n\n    .available[_ngcontent-%COMP%] {\n      color: #166534;\n      background: #dcfce7;\n    }\n\n    .taken[_ngcontent-%COMP%] {\n      color: #dc2626;\n      background: #fee2e2;\n    }\n\n    .icon[_ngcontent-%COMP%] {\n      font-weight: bold;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 12px;\n      height: 12px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidationHintComponent, [{
        type: Component,
        args: [{ selector: 'app-validation-hint', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <!-- Uniqueness check status -->
    <div *ngIf="checking" class="hint checking" role="status" aria-live="polite">
      <span class="spinner"></span>
      <span>Checking availability...</span>
    </div>

    <!-- Uniqueness result -->
    <div *ngIf="!checking && uniquenessResult" 
         class="hint" 
         [class.available]="uniquenessResult.isValid"
         [class.taken]="!uniquenessResult.isValid"
         role="status" 
         aria-live="polite">
      <span class="icon">{{ uniquenessResult.isValid ? '✓' : '✗' }}</span>
      <span>{{ uniquenessResult.message }}</span>
    </div>

    <!-- Smart contextual validation feedback - shows immediately when dirty -->
    <div *ngIf="showErrors && control && !checking && !uniquenessResult && smartMessage"
         class="hint"
         [class.error]="control.invalid && (control.dirty || (showImmediately && control.value))"
         [class.success]="control.valid && control.dirty"
         [class.warning]="isWarning"
         role="alert"
         aria-live="polite">
      <span class="icon" *ngIf="control.invalid && (control.dirty || (showImmediately && control.value))">✗</span>
      <span class="icon" *ngIf="control.valid && control.dirty && !isWarning">✓</span>
      <span class="icon" *ngIf="isWarning">⚠</span>
      <span>{{ smartMessage }}</span>
    </div>

    <!-- Helper text when field is empty and untouched -->
    <div *ngIf="helperText && !checking && !uniquenessResult && !smartMessage && !control?.value"
         class="hint helper"
         [attr.aria-label]="helperText">
      {{ helperText }}
    </div>
  `, styles: ["\n    .hint {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 12px;\n      margin-top: 4px;\n      padding: 4px 8px;\n      border-radius: 4px;\n      animation: fadeIn 150ms ease-out;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(-2px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .helper {\n      color: #6b7280;\n      background: transparent;\n    }\n\n    .error {\n      color: #dc2626;\n      background: #fee2e2;\n    }\n    \n    .warning {\n      color: #d97706;\n      background: #fef3c7;\n    }\n    \n    .success {\n      color: #166534;\n      background: #dcfce7;\n    }\n\n    .checking {\n      color: #1e40af;\n      background: #dbeafe;\n    }\n\n    .available {\n      color: #166534;\n      background: #dcfce7;\n    }\n\n    .taken {\n      color: #dc2626;\n      background: #fee2e2;\n    }\n\n    .icon {\n      font-weight: bold;\n    }\n\n    .spinner {\n      width: 12px;\n      height: 12px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: spin 0.6s linear infinite;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n  "] }]
    }], null, { control: [{
            type: Input
        }], fieldName: [{
            type: Input
        }], helperText: [{
            type: Input
        }], checking: [{
            type: Input
        }], uniquenessResult: [{
            type: Input
        }], showErrors: [{
            type: Input
        }], fieldType: [{
            type: Input
        }], minLength: [{
            type: Input
        }], maxLength: [{
            type: Input
        }], minValue: [{
            type: Input
        }], maxValue: [{
            type: Input
        }], showImmediately: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ValidationHintComponent, { className: "ValidationHintComponent", filePath: "src/app/shared/components/validation-hint.component.ts", lineNumber: 125 }); })();
//# sourceMappingURL=validation-hint.component.js.map