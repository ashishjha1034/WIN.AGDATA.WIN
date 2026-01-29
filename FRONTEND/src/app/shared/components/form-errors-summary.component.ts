import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, AbstractControl } from '@angular/forms';

interface FieldError {
  fieldName: string;
  fieldLabel: string;
  errors: string[];
}

/**
 * Component for displaying a summary of all form validation errors
 * Shows as a collapsible section at the bottom of forms
 */
@Component({
  selector: 'app-form-errors-summary',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
  styles: [`
    .errors-summary {
      margin-top: 16px;
      border: 1px solid #fca5a5;
      border-radius: 8px;
      background: #fef2f2;
      overflow: hidden;
      animation: fadeIn 200ms ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
      font-weight: 500;
      color: #991b1b;
      transition: background-color 0.2s ease;
    }

    .toggle-btn:hover {
      background: #fee2e2;
    }

    .toggle-icon {
      font-size: 10px;
      transition: transform 0.2s ease;
    }

    .error-count {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .error-icon {
      font-size: 14px;
    }

    .errors-list {
      padding: 0 16px 16px;
      border-top: 1px solid #fca5a5;
    }

    .error-group {
      margin-top: 12px;
    }

    .error-group:first-child {
      margin-top: 8px;
    }

    .field-name {
      font-size: 12px;
      font-weight: 600;
      color: #b91c1c;
      margin-bottom: 4px;
    }

    .field-errors {
      margin: 0;
      padding-left: 20px;
      font-size: 12px;
      color: #dc2626;
    }

    .field-errors li {
      margin: 2px 0;
    }

    .expanded .toggle-icon {
      transform: rotate(0deg);
    }
  `]
})
export class FormErrorsSummaryComponent implements OnChanges {
  @Input() form?: FormGroup;
  @Input() fieldLabels: { [key: string]: string } = {};
  @Input() showOnlyWhenTouched = false;
  
  fieldErrors: FieldError[] = [];
  totalErrors = 0;
  isExpanded = false;
  
  get hasErrors(): boolean {
    return this.totalErrors > 0;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateErrors();
  }
  
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
  
  updateErrors(): void {
    if (!this.form) {
      this.fieldErrors = [];
      this.totalErrors = 0;
      return;
    }
    
    this.fieldErrors = [];
    this.totalErrors = 0;
    
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form!.get(key);
      if (!control) return;
      
      // Skip if showOnlyWhenTouched is true and field is not touched
      if (this.showOnlyWhenTouched && !control.touched && !control.dirty) return;
      
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
  
  private getControlErrors(control: AbstractControl, fieldName: string): string[] {
    const errors: string[] = [];
    
    if (!control.errors) return errors;
    
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
      reqs.forEach((req: string) => errors.push(req));
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
  
  private formatFieldName(name: string): string {
    // Convert camelCase to Title Case with spaces
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}
