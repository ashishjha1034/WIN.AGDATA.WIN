import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

/**
 * Component for displaying inline validation hints
 * Shows real-time feedback as users type
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
      <span>Checking...</span>
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

    <!-- Standard validation errors -->
    <div *ngIf="showErrors && control && control.invalid && (control.dirty || control.touched)"
         class="hint error"
         role="alert"
         aria-live="polite">
      <ng-container *ngIf="control.errors">
        <span *ngIf="control.errors['required']">{{ fieldName || 'This field' }} is required</span>
        <span *ngIf="control.errors['minlength']">
          Minimum {{ control.errors['minlength'].requiredLength }} characters required
        </span>
        <span *ngIf="control.errors['maxlength']">
          Maximum {{ control.errors['maxlength'].requiredLength }} characters allowed
        </span>
        <span *ngIf="control.errors['email']">Please enter a valid email</span>
        <span *ngIf="control.errors['alphabetOnly']">{{ control.errors['alphabetOnly'].message }}</span>
        <span *ngIf="control.errors['employeeIdFormat']">{{ control.errors['employeeIdFormat'].message }}</span>
        <span *ngIf="control.errors['corporateEmail']">{{ control.errors['corporateEmail'].message }}</span>
        <span *ngIf="control.errors['productNameFormat']">{{ control.errors['productNameFormat'].message }}</span>
        <span *ngIf="control.errors['wordCount']">{{ control.errors['wordCount'].message }}</span>
        <span *ngIf="control.errors['httpsUrl']">{{ control.errors['httpsUrl'].message }}</span>
        <span *ngIf="control.errors['integer']">{{ control.errors['integer'].message }}</span>
        <span *ngIf="control.errors['min']">Minimum value is {{ control.errors['min'].min }}</span>
        <span *ngIf="control.errors['max']">Maximum value is {{ control.errors['max'].max }}</span>
      </ng-container>
    </div>

    <!-- Helper text when valid or not yet touched -->
    <div *ngIf="helperText && !checking && !uniquenessResult && (!control?.invalid || !control?.touched)"
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
export class ValidationHintComponent implements OnChanges {
  @Input() control?: AbstractControl;
  @Input() fieldName?: string;
  @Input() helperText?: string;
  @Input() checking = false;
  @Input() uniquenessResult?: { isValid: boolean; message: string } | null;
  @Input() showErrors = true;

  ngOnChanges(changes: SimpleChanges): void {
    // Component automatically updates via change detection
  }
}
