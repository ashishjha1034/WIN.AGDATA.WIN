import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * Component for displaying inline validation hints
 * Shows real-time intelligent feedback as users type
 */
@Component({
  selector: 'app-validation-hint',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
  styles: [`
    .hint {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      margin-top: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      animation: fadeIn 150ms ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-2px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .helper {
      color: #6b7280;
      background: transparent;
    }

    .error {
      color: #dc2626;
      background: #fee2e2;
    }
    
    .warning {
      color: #d97706;
      background: #fef3c7;
    }
    
    .success {
      color: #166534;
      background: #dcfce7;
    }

    .checking {
      color: #1e40af;
      background: #dbeafe;
    }

    .available {
      color: #166534;
      background: #dcfce7;
    }

    .taken {
      color: #dc2626;
      background: #fee2e2;
    }

    .icon {
      font-weight: bold;
    }

    .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid #1e40af;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ValidationHintComponent implements OnChanges, OnInit, OnDestroy {
  @Input() control?: AbstractControl;
  @Input() fieldName?: string;
  @Input() helperText?: string;
  @Input() checking = false;
  @Input() uniquenessResult?: { isValid: boolean; message: string } | null;
  @Input() showErrors = true;
  @Input() fieldType?: 'name' | 'employeeId' | 'email' | 'productName' | 'description' | 'number' | 'url' | 'generic';
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  /** Show errors immediately as user types, without waiting for blur/touch */
  @Input() showImmediately = true;
  
  smartMessage: string | null = null;
  isWarning = false;
  
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(100)
        )
        .subscribe(() => {
          this.updateSmartMessage();
        });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateSmartMessage();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private updateSmartMessage(): void {
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
      } else {
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
  
  private inferFieldType(): string {
    const name = this.fieldName?.toLowerCase() || '';
    if (name.includes('first') || name.includes('last') || name === 'name') return 'name';
    if (name.includes('employee')) return 'employeeId';
    if (name.includes('email')) return 'email';
    if (name.includes('product') && name.includes('name')) return 'productName';
    if (name.includes('description')) return 'description';
    if (name.includes('point') || name.includes('stock') || name.includes('cost')) return 'number';
    if (name.includes('url') || name.includes('image')) return 'url';
    return 'generic';
  }
  
  /**
   * Get name validation message - shows single, highest-priority message.
   * Priority order: space > digit > symbol > min-length > max-length
   * Works with liveNameValidation() errors from CustomValidators.
   */
  private getNameValidationMessage(value: string, errors: any): string | null {
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
  
  private getEmployeeIdValidationMessage(value: string, errors: any): string | null {
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
  
  private getEmailValidationMessage(value: string, errors: any): string | null {
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
  
  private getProductNameValidationMessage(value: string, errors: any): string | null {
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
  
  private getDescriptionValidationMessage(value: string, errors: any): string | null {
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
  
  private getNumberValidationMessage(value: any, errors: any): string | null {
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
  
  private getUrlValidationMessage(value: string, errors: any): string | null {
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
    } catch {
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
  
  private getGenericValidationMessage(value: string, errors: any): string | null {
    if (!errors) {
      return this.control?.valid ? null : null;
    }
    
    // Return first error message
    if (errors['required']) return `${this.fieldName || 'This field'} is required`;
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;
    
    // Check for custom error messages
    for (const key of Object.keys(errors)) {
      if (errors[key]?.message) {
        return errors[key].message;
      }
    }
    
    return 'Invalid value';
  }
}
