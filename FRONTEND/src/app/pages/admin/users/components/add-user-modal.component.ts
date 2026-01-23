import { Component, Input, Output, EventEmitter, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InviteUserRequest } from '../../../../models/user.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()"></div>
    <div class="modal" [class.open]="isOpen">
      <div class="modal-header">
        <h2>Add New User</h2>
        <button class="close-btn" (click)="closeModal()">✕</button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="modal-content">
        <!-- BASIC DETAILS Section -->
        <div class="form-section">
          <h3 class="section-title">BASIC DETAILS</h3>

          <div class="form-group">
            <label>First Name <span class="required">*</span></label>
            <input
              type="text"
              formControlName="firstName"
              placeholder="e.g., John"
              class="form-input"
              [class.error]="isFieldInvalid('firstName')"
            />
            <span class="error-message" *ngIf="isFieldInvalid('firstName')">
              First name is required
            </span>
          </div>

          <div class="form-group">
            <label>Last Name <span class="required">*</span></label>
            <input
              type="text"
              formControlName="lastName"
              placeholder="e.g., Doe"
              class="form-input"
              [class.error]="isFieldInvalid('lastName')"
            />
            <span class="error-message" *ngIf="isFieldInvalid('lastName')">
              Last name is required
            </span>
          </div>

          <div class="form-group">
            <label>Employee ID <span class="required">*</span></label>
            <input
              type="text"
              formControlName="employeeId"
              placeholder="e.g., EMP2024"
              class="form-input"
              [class.error]="isFieldInvalid('employeeId')"
            />
            <span class="help-text">Must be unique. Used for internal identification.</span>
            <span class="error-message" *ngIf="isFieldInvalid('employeeId')">
              Employee ID is required and must be unique
            </span>
          </div>

          <div class="form-group">
            <label>Email Address <span class="required">*</span></label>
            <input
              type="email"
              formControlName="email"
              placeholder="e.g., john@example.com"
              class="form-input"
              [class.error]="isFieldInvalid('email')"
            />
            <span class="error-message" *ngIf="isFieldInvalid('email')">
              Valid email is required
            </span>
          </div>
        </div>

        <!-- ROLE & ACCESS Section - Note: Backend assigns Employee role by default -->
        <div class="form-section">
          <h3 class="section-title">ROLE & ACCESS <span class="optional">(optional)</span></h3>
          <span class="help-text info-text">Note: New users are assigned 'Employee' role by default. Roles can be modified after creation by an Admin.</span>
          <div class="role-selection">
            <div class="role-option">
              <input
                type="radio"
                id="role-employee"
                value="Employee"
                formControlName="role"
              />
              <label for="role-employee">Employee</label>
            </div>
            <div class="role-option">
              <input
                type="radio"
                id="role-admin"
                value="Admin"
                formControlName="role"
              />
              <label for="role-admin">Admin</label>
            </div>
          </div>
        </div>

        <!-- ASSIGN TO GROUP Section - NOT MVP -->
        <div class="form-section disabled-section">
          <h3 class="section-title">ASSIGN TO GROUP <span class="optional">(coming soon)</span></h3>
          <select class="form-input" disabled>
            <option value="">Groups feature coming soon...</option>
          </select>
          <span class="help-text">Group assignment will be available in a future release.</span>
        </div>

        <!-- SECURITY & ONBOARDING Section -->
        <div class="form-section">
          <h3 class="section-title">SECURITY & ONBOARDING</h3>

          <div class="form-group">
            <div class="checkbox-group">
              <input
                type="checkbox"
                id="send-email"
                formControlName="sendPasswordEmail"
              />
              <label for="send-email">
                Send password setup email
              </label>
            </div>
            <span class="help-text">The user will receive an email to create their password.</span>
          </div>

          <div class="form-group" *ngIf="!form.get('sendPasswordEmail')?.value">
            <label>Temporary Password <span class="required">*</span></label>
            <input
              type="password"
              formControlName="temporaryPassword"
              placeholder="Enter temporary password (min 8 chars)"
              class="form-input"
              [class.error]="isFieldInvalid('temporaryPassword')"
            />
            <span class="help-text">Min 8 characters. The user must change this on first login.</span>
            <span class="error-message" *ngIf="isFieldInvalid('temporaryPassword')">
              Password is required (min 8 characters)
            </span>
          </div>
        </div>

        <!-- Error Message -->
        <div class="error-banner" *ngIf="error">
          <p>{{ error }}</p>
        </div>

        <!-- Loading State -->
        <div class="loading-banner" *ngIf="isSubmitting">
          <div class="spinner"></div>
          <p>Creating user...</p>
        </div>
      </form>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button
          type="button"
          class="btn-cancel"
          (click)="closeModal()"
          [disabled]="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn-create"
          (click)="onSubmit()"
          [disabled]="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? 'Creating...' : 'Create User' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      animation: fadeIn 0.2s ease;
      display: none;
    }

    .modal-overlay {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 500px;
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
      padding: 0;
      width: 32px;
      height: 32px;
    }

    .close-btn:hover {
      color: #1f2937;
    }

    .modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .form-section {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .form-section:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .section-title {
      margin: 0 0 16px;
      font-size: 12px;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .required {
      color: #dc2626;
    }

    .optional {
      font-size: 11px;
      color: #9ca3af;
      font-weight: 400;
      text-transform: none;
      letter-spacing: normal;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .form-input.error {
      border-color: #dc2626;
    }

    .form-input:disabled {
      background: #f3f4f6;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .help-text {
      display: block;
      font-size: 12px;
      color: #9ca3af;
      margin-top: 4px;
    }

    .error-message {
      display: block;
      font-size: 12px;
      color: #dc2626;
      margin-top: 4px;
    }

    .role-selection,
    .status-options {
      display: flex;
      gap: 16px;
    }

    .role-option,
    .status-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .role-option input[type="radio"],
    .status-option input[type="radio"] {
      accent-color: #4b5563;
      cursor: pointer;
    }

    .role-option label,
    .status-option label {
      margin: 0;
      cursor: pointer;
      font-weight: 400;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-group input[type="checkbox"] {
      accent-color: #4b5563;
      cursor: pointer;
    }

    .checkbox-group label {
      margin: 0;
      cursor: pointer;
      font-weight: 400;
    }

    .error-banner,
    .loading-banner {
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
      border: 1px solid #fecaca;
    }

    .error-banner p {
      margin: 0;
    }

    .loading-banner {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
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

    .btn-cancel,
    .btn-create {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel {
      background: white;
      border: 1px solid #e5e7eb;
      color: #374151;
    }

    .btn-cancel:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    .btn-create {
      background: #4b5563;
      color: white;
    }

    .btn-create:hover:not(:disabled) {
      background: #3a4251;
    }

    .btn-cancel:disabled,
    .btn-create:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .disabled-section {
      opacity: 0.6;
    }

    .info-text {
      display: block;
      margin-bottom: 12px;
      padding: 8px 12px;
      background: #f0f9ff;
      border-radius: 4px;
      border-left: 3px solid #3b82f6;
    }
  `]
})
export class AddUserModalComponent implements OnDestroy {
  @Input() isOpen = false;
  @Output() userCreated = new EventEmitter<InviteUserRequest>();
  @Output() closed = new EventEmitter<void>();

  form: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      employeeId: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['Employee'],
      sendPasswordEmail: [false],
      temporaryPassword: ['', [Validators.minLength(8)]]
    }, { validators: this.passwordValidator });
  }

  // Custom validator: require password if not sending email
  passwordValidator(group: FormGroup): ValidationErrors | null {
    const sendEmail = group.get('sendPasswordEmail')?.value;
    const password = group.get('temporaryPassword')?.value;
    
    if (!sendEmail && (!password || password.length < 8)) {
      return { passwordRequired: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  get isFormValid(): boolean {
    if (!this.form.valid) return false;
    
    // Additional check for password requirement
    const sendEmail = this.form.get('sendPasswordEmail')?.value;
    const password = this.form.get('temporaryPassword')?.value;
    if (!sendEmail && (!password || password.length < 8)) {
      return false;
    }
    return true;
  }

  closeModal(): void {
    this.form.reset({
      role: 'Employee',
      sendPasswordEmail: false,
      temporaryPassword: ''
    });
    this.error = null;
    this.isSubmitting = false;
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
    // Mark all fields as touched for validation display
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (!this.isFormValid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formValue = this.form.value;
    
    // Build request matching backend InviteUserRequest exactly
    const request: InviteUserRequest = {
      employeeId: formValue.employeeId.trim(),
      email: formValue.email.trim().toLowerCase(),
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      // Only include roles if Admin is selected, otherwise let backend assign default
      roles: formValue.role === 'Admin' ? ['Admin'] : undefined,
      generateTempPassword: formValue.sendPasswordEmail,
      temporaryPassword: formValue.sendPasswordEmail ? undefined : formValue.temporaryPassword
    };

    this.userCreated.emit(request);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
