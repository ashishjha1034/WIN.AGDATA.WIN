import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { InviteUserRequest } from '../../../../models/user.models';
import { ValidationService, ValidationResult } from '../../../../services/validation.service';
import { CustomValidators, ValidationConstants, calculatePasswordStrength } from '../../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../../shared/components/validation-hint.component';
import { PasswordStrengthComponent } from '../../../../shared/components/password-strength.component';
import { FormErrorsSummaryComponent } from '../../../../shared/components/form-errors-summary.component';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationHintComponent, PasswordStrengthComponent, FormErrorsSummaryComponent],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()"></div>
    <div class="modal" [class.open]="isOpen">
      <div class="modal-header">
        <h2>Add New User</h2>
        <button class="close-btn" (click)="closeModal()" aria-label="Close modal">✕</button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="modal-content">
        <!-- BASIC DETAILS Section -->
        <div class="form-section">
          <h3 class="section-title">BASIC DETAILS</h3>

          <!-- First Name -->
          <div class="form-group">
            <div class="label-row">
              <label for="firstName">First Name <span class="required">*</span></label>
              <span class="char-counter" 
                    [class.warning]="getCharCount('firstName') > 0 && getCharCount('firstName') < minNameLength"
                    [class.valid]="getCharCount('firstName') >= minNameLength"
                    aria-live="polite">
                {{ getCharCount('firstName') }} / {{ maxNameLength }}
              </span>
            </div>
            <input
              id="firstName"
              type="text"
              formControlName="firstName"
              placeholder="e.g., John"
              class="form-input"
              [class.error]="isFieldInvalid('firstName')"
              [class.valid]="isFieldValid('firstName')"
              [attr.maxlength]="maxNameLength"
              aria-describedby="firstName-hint"
            />
            <app-validation-hint
              id="firstName-hint"
              [control]="form.get('firstName')!"
              fieldName="First name"
              fieldType="name"
              [minLength]="minNameLength"
              [maxLength]="maxNameLength">
            </app-validation-hint>
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <div class="label-row">
              <label for="lastName">Last Name <span class="required">*</span></label>
              <span class="char-counter" 
                    [class.warning]="getCharCount('lastName') > 0 && getCharCount('lastName') < minNameLength"
                    [class.valid]="getCharCount('lastName') >= minNameLength"
                    aria-live="polite">
                {{ getCharCount('lastName') }} / {{ maxNameLength }}
              </span>
            </div>
            <input
              id="lastName"
              type="text"
              formControlName="lastName"
              placeholder="e.g., Doe"
              class="form-input"
              [class.error]="isFieldInvalid('lastName')"
              [class.valid]="isFieldValid('lastName')"
              [attr.maxlength]="maxNameLength"
              aria-describedby="lastName-hint"
            />
            <app-validation-hint
              id="lastName-hint"
              [control]="form.get('lastName')!"
              fieldName="Last name"
              fieldType="name"
              [minLength]="minNameLength"
              [maxLength]="maxNameLength">
            </app-validation-hint>
          </div>

          <!-- Employee ID -->
          <div class="form-group">
            <label for="employeeId">Employee ID <span class="required">*</span></label>
            <div class="input-with-action">
              <input
                id="employeeId"
                type="text"
                formControlName="employeeId"
                placeholder="e.g., ABC123XYZ"
                class="form-input"
                [class.error]="isFieldInvalid('employeeId') || (employeeIdResult && !employeeIdResult.isValid)"
                [class.valid]="isFieldValid('employeeId') && employeeIdResult?.isValid"
                maxlength="9"
                aria-describedby="employeeId-hint"
              />
              <button 
                type="button" 
                class="generate-btn" 
                (click)="generateEmployeeId()"
                [disabled]="generatingEmployeeId || generateAttemptsLeft <= 0"
                aria-label="Generate random employee ID">
                {{ generatingEmployeeId ? 'Generating...' : 'Generate (' + generateAttemptsLeft + ')' }}
              </button>
              <button 
                type="button" 
                class="check-btn" 
                (click)="checkEmployeeIdNow()"
                [disabled]="checkingEmployeeId || !form.get('employeeId')?.value"
                aria-label="Check employee ID availability">
                Check
              </button>
            </div>
            <app-validation-hint
              id="employeeId-hint"
              [control]="form.get('employeeId')!"
              fieldName="Employee ID"
              fieldType="employeeId"
              helperText="Exactly 9 alphanumeric characters"
              [checking]="checkingEmployeeId || generatingEmployeeId"
              [uniquenessResult]="employeeIdResult">
            </app-validation-hint>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address <span class="required">*</span></label>
            <div class="input-with-action">
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="e.g., john.doe@agdata.com"
                class="form-input"
                [class.error]="isFieldInvalid('email') || (emailResult && !emailResult.isValid)"
                [class.valid]="isFieldValid('email') && emailResult?.isValid"
                aria-describedby="email-hint"
              />
              <button 
                type="button" 
                class="check-btn" 
                (click)="checkEmailNow()"
                [disabled]="checkingEmail || !form.get('email')?.value"
                aria-label="Check email availability">
                Check
              </button>
            </div>
            <app-validation-hint
              id="email-hint"
              [control]="form.get('email')!"
              fieldName="Email"
              fieldType="email"
              helperText="Must end with @agdata.com"
              [checking]="checkingEmail"
              [uniquenessResult]="emailResult">
            </app-validation-hint>
          </div>
        </div>

        <!-- ROLE & ACCESS Section -->
        <div class="form-section">
          <h3 class="section-title">ROLE & ACCESS <span class="optional">(optional)</span></h3>
          <span class="help-text info-text">New users are assigned 'Employee' role by default.</span>
          <div class="role-selection">
            <div class="role-option">
              <input type="radio" id="role-employee" value="Employee" formControlName="role" />
              <label for="role-employee">Employee</label>
            </div>
            <div class="role-option">
              <input type="radio" id="role-admin" value="Admin" formControlName="role" />
              <label for="role-admin">Admin</label>
            </div>
          </div>
        </div>

        <!-- SECURITY & ONBOARDING Section -->
        <div class="form-section">
          <h3 class="section-title">SECURITY & ONBOARDING</h3>

          <div class="form-group">
            <div class="checkbox-group">
              <input type="checkbox" id="send-email" formControlName="sendPasswordEmail" />
              <label for="send-email">Send password setup email</label>
            </div>
            <span class="help-text">The user will receive an email to create their password.</span>
          </div>

          <div class="form-group" *ngIf="!form.get('sendPasswordEmail')?.value">
            <label for="temporaryPassword">Temporary Password <span class="required">*</span></label>
            <div class="password-input-wrapper">
              <input
                id="temporaryPassword"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="temporaryPassword"
                placeholder="Enter a strong password"
                class="form-input"
                [class.error]="isFieldInvalid('temporaryPassword')"
                aria-describedby="password-strength"
              />
              <button 
                type="button" 
                class="toggle-password" 
                (click)="showPassword = !showPassword"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <app-password-strength
              id="password-strength"
              [password]="form.get('temporaryPassword')?.value || ''"
              [firstName]="form.get('firstName')?.value || ''"
              [lastName]="form.get('lastName')?.value || ''"
              [employeeId]="form.get('employeeId')?.value || ''"
              [showRequirements]="true">
            </app-password-strength>
          </div>
        </div>

        <!-- Form Errors Summary -->
        <app-form-errors-summary
          [form]="form"
          [fieldLabels]="formFieldLabels"
          title="Please fix the following errors:">
        </app-form-errors-summary>

        <!-- Error Message -->
        <div class="error-banner" *ngIf="error" role="alert">
          <p>{{ error }}</p>
        </div>

        <!-- Loading State -->
        <div class="loading-banner" *ngIf="isSubmitting" role="status">
          <div class="spinner"></div>
          <p>Creating user...</p>
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
          [disabled]="!canSubmit"
          [attr.aria-disabled]="!canSubmit">
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
      max-width: 520px;
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

    .required { color: #dc2626; }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .label-row label {
      margin-bottom: 0;
    }

    .char-counter {
      font-size: 11px;
      color: #9ca3af;
      font-weight: 500;
    }

    .char-counter.warning {
      color: #f59e0b;
    }

    .char-counter.valid {
      color: #16a34a;
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

    .form-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .form-input.error {
      border-color: #dc2626;
    }

    .form-input.valid {
      border-color: #16a34a;
    }

    .help-text {
      display: block;
      font-size: 12px;
      color: #9ca3af;
      margin-top: 4px;
    }

    .info-text {
      display: block;
      margin-bottom: 12px;
      padding: 8px 12px;
      background: #f0f9ff;
      border-radius: 4px;
      border-left: 3px solid #3b82f6;
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
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .check-btn:hover:not(:disabled) {
      background: #e5e7eb;
    }

    .check-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .generate-btn {
      padding: 10px 12px;
      background: #4b5563;
      color: white;
      border: 1px solid #4b5563;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .generate-btn:hover:not(:disabled) {
      background: #3a4251;
    }

    .generate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #9ca3af;
      border-color: #9ca3af;
    }

    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-input-wrapper .form-input {
      padding-right: 44px;
    }

    .toggle-password {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      padding: 4px;
    }

    .role-selection {
      display: flex;
      gap: 16px;
    }

    .role-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .role-option input[type="radio"] {
      accent-color: #4b5563;
      cursor: pointer;
    }

    .role-option label {
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
      border: 1px solid #fecaca;
    }

    .error-banner p { margin: 0; }

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

    .btn-cancel, .btn-create {
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

    .btn-cancel:disabled, .btn-create:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class AddUserModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() userCreated = new EventEmitter<InviteUserRequest>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  showPassword = false;

  // Uniqueness check states
  checkingEmail = false;
  checkingEmployeeId = false;
  emailResult: ValidationResult | null = null;
  employeeIdResult: ValidationResult | null = null;

  // Employee ID generator state
  generatingEmployeeId = false;
  generateAttemptsLeft = 3;
  private readonly MAX_GENERATE_ATTEMPTS = 3;
  private readonly INTERNAL_RETRY_LIMIT = 3;

  // Character counter constants
  readonly maxNameLength = ValidationConstants.NAME_MAX_LENGTH;
  readonly minNameLength = ValidationConstants.NAME_MIN_LENGTH;

  // Form field labels for error summary
  readonly formFieldLabels: Record<string, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    employeeId: 'Employee ID',
    email: 'Email Address',
    role: 'Role',
    sendPasswordEmail: 'Send Password Email',
    temporaryPassword: 'Temporary Password'
  };

  private destroy$ = new Subject<void>();
  private emailCheck$ = new Subject<string>();
  private employeeIdCheck$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupDebouncedChecks();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [
        Validators.required,
        CustomValidators.liveNameValidation()
      ]],
      lastName: ['', [
        Validators.required,
        CustomValidators.liveNameValidation()
      ]],
      employeeId: ['', [
        Validators.required,
        CustomValidators.employeeIdFormat()
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        CustomValidators.corporateEmail()
      ]],
      role: ['Employee'],
      sendPasswordEmail: [false],
      temporaryPassword: ['']
    });

    // Update password validator when sendPasswordEmail changes
    this.form.get('sendPasswordEmail')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(sendEmail => {
        const pwdControl = this.form.get('temporaryPassword');
        if (sendEmail) {
          pwdControl?.clearValidators();
        } else {
          pwdControl?.setValidators([
            Validators.required,
            Validators.minLength(ValidationConstants.PASSWORD_MIN_LENGTH),
            CustomValidators.strongPassword(
              this.form.get('firstName')!,
              this.form.get('lastName')!,
              this.form.get('employeeId')!
            )
          ]);
        }
        pwdControl?.updateValueAndValidity();
      });
  }

  private setupDebouncedChecks(): void {
    // Debounced email check
    this.form.get('email')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(ValidationConstants.DEBOUNCE_TIME_MS),
        distinctUntilChanged()
      )
      .subscribe(email => {
        if (email && this.form.get('email')?.valid) {
          this.checkEmail(email);
        } else {
          this.emailResult = null;
        }
      });

    // Debounced employee ID check
    this.form.get('employeeId')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(ValidationConstants.DEBOUNCE_TIME_MS),
        distinctUntilChanged()
      )
      .subscribe(employeeId => {
        if (employeeId && this.form.get('employeeId')?.valid) {
          this.checkEmployeeId(employeeId);
        } else {
          this.employeeIdResult = null;
        }
      });
  }

  private checkEmail(email: string): void {
    this.checkingEmail = true;
    this.emailResult = null;
    this.cdr.markForCheck();

    this.validationService.checkEmailAvailability(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.emailResult = result;
          this.checkingEmail = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.checkingEmail = false;
          this.cdr.markForCheck();
        }
      });
  }

  private checkEmployeeId(employeeId: string): void {
    this.checkingEmployeeId = true;
    this.employeeIdResult = null;
    this.cdr.markForCheck();

    this.validationService.checkEmployeeIdAvailability(employeeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.employeeIdResult = result;
          this.checkingEmployeeId = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.checkingEmployeeId = false;
          this.cdr.markForCheck();
        }
      });
  }

  checkEmailNow(): void {
    const email = this.form.get('email')?.value;
    if (email) {
      this.checkEmail(email);
    }
  }

  checkEmployeeIdNow(): void {
    const employeeId = this.form.get('employeeId')?.value;
    if (employeeId) {
      this.checkEmployeeId(employeeId);
    }
  }

  /**
   * Generate a random 9-character alphanumeric Employee ID
   * Checks uniqueness and retries internally if collision detected
   */
  generateEmployeeId(): void {
    if (this.generateAttemptsLeft <= 0 || this.generatingEmployeeId) return;

    this.generatingEmployeeId = true;
    this.employeeIdResult = null;
    this.cdr.markForCheck();

    this.tryGenerateUniqueEmployeeId(0);
  }

  private tryGenerateUniqueEmployeeId(internalAttempt: number): void {
    // Generate random 9-char alphanumeric ID (A-Z, 0-9)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedId = '';
    for (let i = 0; i < 9; i++) {
      generatedId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check uniqueness
    this.validationService.checkEmployeeIdAvailability(generatedId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.isValid) {
            // Success! Fill the field
            this.form.get('employeeId')?.setValue(generatedId);
            this.form.get('employeeId')?.markAsDirty();
            this.form.get('employeeId')?.markAsTouched();
            this.employeeIdResult = result;
            this.generateAttemptsLeft--;
            this.generatingEmployeeId = false;
            this.cdr.markForCheck();
          } else {
            // Collision - retry if we haven't exceeded internal retries
            if (internalAttempt < this.INTERNAL_RETRY_LIMIT - 1) {
              this.tryGenerateUniqueEmployeeId(internalAttempt + 1);
            } else {
              // Failed after all internal retries
              this.employeeIdResult = {
                isValid: false,
                message: "Couldn't generate a unique ID now. Try again."
              };
              this.generateAttemptsLeft--;
              this.generatingEmployeeId = false;
              this.cdr.markForCheck();
            }
          }
        },
        error: () => {
          // On error, still fill the field but warn user
          this.form.get('employeeId')?.setValue(generatedId);
          this.form.get('employeeId')?.markAsDirty();
          this.employeeIdResult = null;
          this.generateAttemptsLeft--;
          this.generatingEmployeeId = false;
          this.cdr.markForCheck();
        }
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.valid && field.dirty);
  }

  getCharCount(fieldName: string): number {
    const value = this.form.get(fieldName)?.value;
    return value ? value.length : 0;
  }

  get canSubmit(): boolean {
    if (!this.form.valid) return false;
    if (this.isSubmitting) return false;
    if (this.checkingEmail || this.checkingEmployeeId) return false;
    if (this.emailResult && !this.emailResult.isValid) return false;
    if (this.employeeIdResult && !this.employeeIdResult.isValid) return false;
    
    // Check password if not sending email
    if (!this.form.get('sendPasswordEmail')?.value) {
      const pwd = this.form.get('temporaryPassword')?.value;
      if (!pwd || pwd.length < ValidationConstants.PASSWORD_MIN_LENGTH) return false;
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
    this.emailResult = null;
    this.employeeIdResult = null;
    // Reset employee ID generator state
    this.generateAttemptsLeft = this.MAX_GENERATE_ATTEMPTS;
    this.generatingEmployeeId = false;
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
    
    const request: InviteUserRequest = {
      employeeId: formValue.employeeId.trim(),
      email: formValue.email.trim().toLowerCase(),
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
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
