import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function FormErrorsSummaryComponent_div_0_div_8_div_1_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r3);
} }
function FormErrorsSummaryComponent_div_0_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 11);
    i0.ɵɵtemplate(4, FormErrorsSummaryComponent_div_0_div_8_div_1_li_4_Template, 2, 1, "li", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r4.fieldLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", field_r4.errors);
} }
function FormErrorsSummaryComponent_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, FormErrorsSummaryComponent_div_0_div_8_div_1_Template, 5, 2, "div", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.fieldErrors);
} }
function FormErrorsSummaryComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
    i0.ɵɵlistener("click", function FormErrorsSummaryComponent_div_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleExpanded()); });
    i0.ɵɵelementStart(2, "span", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 4)(5, "span", 5);
    i0.ɵɵtext(6, "\u26A0");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, FormErrorsSummaryComponent_div_0_div_8_Template, 2, 1, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("expanded", ctx_r1.isExpanded);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r1.isExpanded);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.isExpanded ? "\u25BC" : "\u25B6");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.totalErrors, " validation ", ctx_r1.totalErrors === 1 ? "error" : "errors", " preventing submission ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isExpanded);
} }
/**
 * Component for displaying a summary of all form validation errors
 * Shows as a collapsible section at the bottom of forms
 */
export class FormErrorsSummaryComponent {
    constructor() {
        this.fieldLabels = {};
        this.showOnlyWhenTouched = false;
        this.fieldErrors = [];
        this.totalErrors = 0;
        this.isExpanded = false;
    }
    get hasErrors() {
        return this.totalErrors > 0;
    }
    ngOnChanges(changes) {
        this.updateErrors();
    }
    toggleExpanded() {
        this.isExpanded = !this.isExpanded;
    }
    updateErrors() {
        if (!this.form) {
            this.fieldErrors = [];
            this.totalErrors = 0;
            return;
        }
        this.fieldErrors = [];
        this.totalErrors = 0;
        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            if (!control)
                return;
            // Skip if showOnlyWhenTouched is true and field is not touched
            if (this.showOnlyWhenTouched && !control.touched && !control.dirty)
                return;
            const errors = this.getControlErrors(control, key);
            if (errors.length > 0) {
                this.fieldErrors.push({
                    fieldName: key,
                    fieldLabel: this.fieldLabels[key] || this.formatFieldName(key),
                    errors: errors
                });
                this.totalErrors += errors.length;
            }
        });
    }
    getControlErrors(control, fieldName) {
        const errors = [];
        if (!control.errors)
            return errors;
        const errorObj = control.errors;
        // Handle specific error types with user-friendly messages
        if (errorObj['required']) {
            errors.push('This field is required');
        }
        if (errorObj['minlength']) {
            const min = errorObj['minlength'].requiredLength;
            errors.push(`Minimum ${min} characters required`);
        }
        if (errorObj['maxlength']) {
            const max = errorObj['maxlength'].requiredLength;
            errors.push(`Maximum ${max} characters allowed`);
        }
        if (errorObj['min']) {
            const min = errorObj['min'].min;
            errors.push(`Minimum value is ${min.toLocaleString()}`);
        }
        if (errorObj['max']) {
            const max = errorObj['max'].max;
            errors.push(`Maximum value is ${max.toLocaleString()}`);
        }
        if (errorObj['email']) {
            errors.push('Invalid email format');
        }
        if (errorObj['pattern']) {
            errors.push('Invalid format');
        }
        // Custom validator errors with messages
        if (errorObj['productNameFormat']) {
            errors.push(errorObj['productNameFormat'].message || 'Invalid product name format');
        }
        if (errorObj['wordCount']) {
            errors.push(errorObj['wordCount'].message || 'Invalid word count');
        }
        if (errorObj['httpsUrl']) {
            errors.push(errorObj['httpsUrl'].message || 'URL must use HTTPS');
        }
        if (errorObj['integer']) {
            errors.push(errorObj['integer'].message || 'Must be a whole number');
        }
        if (errorObj['alphabetOnly']) {
            errors.push(errorObj['alphabetOnly'].message || 'Only letters allowed');
        }
        if (errorObj['employeeIdFormat']) {
            errors.push(errorObj['employeeIdFormat'].message || 'Invalid employee ID format');
        }
        if (errorObj['corporateEmail']) {
            errors.push(errorObj['corporateEmail'].message || 'Must use corporate email');
        }
        if (errorObj['corporateEmailLocalPart']) {
            errors.push(errorObj['corporateEmailLocalPart'].message || 'Invalid email username');
        }
        if (errorObj['strongPassword']) {
            const reqs = errorObj['strongPassword'].requirements || [];
            reqs.forEach((req) => errors.push(req));
        }
        // Handle name validation errors
        if (errorObj['nameHasSpace']) {
            errors.push(errorObj['nameHasSpace'].message || 'No spaces allowed');
        }
        if (errorObj['nameHasDigit']) {
            errors.push(errorObj['nameHasDigit'].message || 'Numbers not allowed');
        }
        if (errorObj['nameHasSymbol']) {
            errors.push(errorObj['nameHasSymbol'].message || 'Symbols not allowed');
        }
        if (errorObj['nameMinLength']) {
            errors.push(errorObj['nameMinLength'].message || 'Name too short');
        }
        if (errorObj['nameMaxLength']) {
            errors.push(errorObj['nameMaxLength'].message || 'Name too long');
        }
        // Generic custom errors with message property
        Object.keys(errorObj).forEach(key => {
            if (!['required', 'minlength', 'maxlength', 'min', 'max', 'email', 'pattern',
                'productNameFormat', 'wordCount', 'httpsUrl', 'integer', 'alphabetOnly',
                'employeeIdFormat', 'corporateEmail', 'corporateEmailLocalPart', 'strongPassword',
                'nameHasSpace', 'nameHasDigit', 'nameHasSymbol', 'nameMinLength', 'nameMaxLength'].includes(key)) {
                if (errorObj[key]?.message) {
                    errors.push(errorObj[key].message);
                }
            }
        });
        return errors;
    }
    formatFieldName(name) {
        // Convert camelCase to Title Case with spaces
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    static { this.ɵfac = function FormErrorsSummaryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FormErrorsSummaryComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FormErrorsSummaryComponent, selectors: [["app-form-errors-summary"]], inputs: { form: "form", fieldLabels: "fieldLabels", showOnlyWhenTouched: "showOnlyWhenTouched" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "errors-summary", 3, "expanded", 4, "ngIf"], [1, "errors-summary"], ["type", "button", "aria-controls", "errors-list", 1, "toggle-btn", 3, "click"], [1, "toggle-icon"], [1, "error-count"], [1, "error-icon"], ["id", "errors-list", "class", "errors-list", "role", "alert", "aria-live", "polite", 4, "ngIf"], ["id", "errors-list", "role", "alert", "aria-live", "polite", 1, "errors-list"], ["class", "error-group", 4, "ngFor", "ngForOf"], [1, "error-group"], [1, "field-name"], [1, "field-errors"], [4, "ngFor", "ngForOf"]], template: function FormErrorsSummaryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, FormErrorsSummaryComponent_div_0_Template, 9, 7, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.hasErrors);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".errors-summary[_ngcontent-%COMP%] {\n      margin-top: 16px;\n      border: 1px solid #fca5a5;\n      border-radius: 8px;\n      background: #fef2f2;\n      overflow: hidden;\n      animation: _ngcontent-%COMP%_fadeIn 200ms ease-out;\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; transform: translateY(-4px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .toggle-btn[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      width: 100%;\n      padding: 12px 16px;\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      text-align: left;\n      font-size: 13px;\n      font-weight: 500;\n      color: #991b1b;\n      transition: background-color 0.2s ease;\n    }\n\n    .toggle-btn[_ngcontent-%COMP%]:hover {\n      background: #fee2e2;\n    }\n\n    .toggle-icon[_ngcontent-%COMP%] {\n      font-size: 10px;\n      transition: transform 0.2s ease;\n    }\n\n    .error-count[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n    }\n\n    .error-icon[_ngcontent-%COMP%] {\n      font-size: 14px;\n    }\n\n    .errors-list[_ngcontent-%COMP%] {\n      padding: 0 16px 16px;\n      border-top: 1px solid #fca5a5;\n    }\n\n    .error-group[_ngcontent-%COMP%] {\n      margin-top: 12px;\n    }\n\n    .error-group[_ngcontent-%COMP%]:first-child {\n      margin-top: 8px;\n    }\n\n    .field-name[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      color: #b91c1c;\n      margin-bottom: 4px;\n    }\n\n    .field-errors[_ngcontent-%COMP%] {\n      margin: 0;\n      padding-left: 20px;\n      font-size: 12px;\n      color: #dc2626;\n    }\n\n    .field-errors[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      margin: 2px 0;\n    }\n\n    .expanded[_ngcontent-%COMP%]   .toggle-icon[_ngcontent-%COMP%] {\n      transform: rotate(0deg);\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormErrorsSummaryComponent, [{
        type: Component,
        args: [{ selector: 'app-form-errors-summary', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="errors-summary" *ngIf="hasErrors" [class.expanded]="isExpanded">
      <button 
        type="button" 
        class="toggle-btn" 
        (click)="toggleExpanded()"
        [attr.aria-expanded]="isExpanded"
        aria-controls="errors-list">
        <span class="toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
        <span class="error-count">
          <span class="error-icon">⚠</span>
          {{ totalErrors }} validation {{ totalErrors === 1 ? 'error' : 'errors' }} preventing submission
        </span>
      </button>
      
      <div id="errors-list" class="errors-list" *ngIf="isExpanded" role="alert" aria-live="polite">
        <div class="error-group" *ngFor="let field of fieldErrors">
          <div class="field-name">{{ field.fieldLabel }}</div>
          <ul class="field-errors">
            <li *ngFor="let error of field.errors">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  `, styles: ["\n    .errors-summary {\n      margin-top: 16px;\n      border: 1px solid #fca5a5;\n      border-radius: 8px;\n      background: #fef2f2;\n      overflow: hidden;\n      animation: fadeIn 200ms ease-out;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(-4px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .toggle-btn {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      width: 100%;\n      padding: 12px 16px;\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      text-align: left;\n      font-size: 13px;\n      font-weight: 500;\n      color: #991b1b;\n      transition: background-color 0.2s ease;\n    }\n\n    .toggle-btn:hover {\n      background: #fee2e2;\n    }\n\n    .toggle-icon {\n      font-size: 10px;\n      transition: transform 0.2s ease;\n    }\n\n    .error-count {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n    }\n\n    .error-icon {\n      font-size: 14px;\n    }\n\n    .errors-list {\n      padding: 0 16px 16px;\n      border-top: 1px solid #fca5a5;\n    }\n\n    .error-group {\n      margin-top: 12px;\n    }\n\n    .error-group:first-child {\n      margin-top: 8px;\n    }\n\n    .field-name {\n      font-size: 12px;\n      font-weight: 600;\n      color: #b91c1c;\n      margin-bottom: 4px;\n    }\n\n    .field-errors {\n      margin: 0;\n      padding-left: 20px;\n      font-size: 12px;\n      color: #dc2626;\n    }\n\n    .field-errors li {\n      margin: 2px 0;\n    }\n\n    .expanded .toggle-icon {\n      transform: rotate(0deg);\n    }\n  "] }]
    }], null, { form: [{
            type: Input
        }], fieldLabels: [{
            type: Input
        }], showOnlyWhenTouched: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FormErrorsSummaryComponent, { className: "FormErrorsSummaryComponent", filePath: "src/app/shared/components/form-errors-summary.component.ts", lineNumber: 131 }); })();
//# sourceMappingURL=form-errors-summary.component.js.map