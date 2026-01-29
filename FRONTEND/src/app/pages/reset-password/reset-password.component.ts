import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CustomValidators, ValidationConstants, calculatePasswordStrength } from '../../shared/validators/custom-validators';
import { PasswordStrengthComponent } from '../../shared/components/password-strength.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrengthComponent]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm!: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;
  token = '';
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get token from URL
    this.route.queryParams.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.token = params['token'];
        if (!this.token) {
          this.error = 'Invalid or missing reset token. Please request a new password reset link.';
        }
      });

    // Strong password validation - min 12 chars, upper/lower/digit/special, no spaces
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(ValidationConstants.PASSWORD_MIN_LENGTH),
        CustomValidators.strongPassword()
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');

    if (newPassword?.value === confirmPassword?.value) {
      confirmPassword?.setErrors(null);
      return null;
    }

    if (confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    }
    return null;
  }

  get newPasswordControl() {
    return this.resetForm.get('newPassword');
  }

  get confirmPasswordControl() {
    return this.resetForm.get('confirmPassword');
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onPasswordChange(): void {
    const password = this.newPasswordControl?.value;
    let strength = 0;

    if (!password) {
      this.passwordStrength = 0;
      return;
    }

    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[!@#$%^&*]/.test(password)) strength += 10;

    this.passwordStrength = Math.min(strength, 100);
  }

  getPasswordStrengthClass(): string {
    if (this.passwordStrength < 30) return 'weak';
    if (this.passwordStrength < 60) return 'fair';
    if (this.passwordStrength < 85) return 'good';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    if (this.passwordStrength < 30) return 'Weak';
    if (this.passwordStrength < 60) return 'Fair';
    if (this.passwordStrength < 85) return 'Good';
    return 'Strong';
  }

  hasUppercase(value: string): boolean {
    return /[A-Z]/.test(value || '');
  }

  hasLowercase(value: string): boolean {
    return /[a-z]/.test(value || '');
  }

  hasNumber(value: string): boolean {
    return /[0-9]/.test(value || '');
  }

  hasMinLength(value: string, length: number): boolean {
    return (value?.length || 0) >= length;
  }

  onSubmit(): void {
    if (!this.token || this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.resetPassword({
      token: this.token,
      newPassword: this.newPasswordControl?.value
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Password reset successful');
          this.success = true;
          this.loading = false;

          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: (error) => {
          console.error('Password reset error:', error);
          this.error = error?.error?.message || 'Password reset failed. Please try again.';
          this.loading = false;
        }
      });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  navigateToForgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
