import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
  error: string | null = null;
  success = false;
  successMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
    this.error = null;
    this.success = false;

    this.authService.forgotPassword(this.forgotForm.value.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Forgot password request successful');
          this.success = true;
          this.successMessage = response.message || 'If the account exists, a password reset link has been sent to your email.';
          this.forgotForm.reset();
          this.loading = false;

          // Redirect to login after 3 seconds
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
        },
        error: (error) => {
          console.error('Forgot password error:', error);
          this.error = error?.error?.message || 'An error occurred. Please try again.';
          this.loading = false;
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
