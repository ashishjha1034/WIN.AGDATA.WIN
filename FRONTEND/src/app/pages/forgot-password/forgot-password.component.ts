import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm!: FormGroup;
  loading = false;
  success = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        CustomValidators.corporateEmail()
      ]]
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  get emailControl() {
    return this.forgotForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    this.success = false;

    this.authService.forgotPassword(this.forgotForm.value.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.success = true;
          this.forgotForm.reset();
          this.loading = false;
          
          // Show non-revealing toast message for security
          this.toastService.success(
            'Reset Email Sent',
            'If the email exists, you will receive a reset link'
          );

          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: () => {
          // Always show success message for security (don't reveal if email exists)
          this.success = true;
          this.forgotForm.reset();
          this.loading = false;
          
          this.toastService.info(
            'Reset Email Sent',
            'If the email exists, you will receive a reset link'
          );

          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        }
      });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
