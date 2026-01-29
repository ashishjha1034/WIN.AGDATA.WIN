import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthError } from '../../services/http-error.service';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil, finalize, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomValidators, ValidationConstants } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;
  returnUrl: string = '';
  showPassword = false;
  
  // Rate limiting and lockout state
  isRateLimited = false;
  isLockedOut = false;
  countdownSeconds = 0;
  countdownDisplay = '';
  private countdownSubscription?: Subscription;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // Create the form with corporate email validation
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        CustomValidators.corporateEmail()
      ]],
      password: ['', [Validators.required, Validators.minLength(12)]]
    });

    // Get return URL from route parameters or default to '/user/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user/dashboard';
    
    // Check if redirected due to expired token
    const expired = this.route.snapshot.queryParams['expired'];
    if (expired === 'true') {
      this.error = 'Your session has expired. Please log in again.';
      console.warn('[Login] User redirected due to expired token');
    }

    // If already logged in, redirect based on role
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      if (user && user.roles && user.roles.includes('Admin')) {
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.router.navigateByUrl(this.returnUrl);
      }
    }

    // Subscribe to loading and error states
    this.authService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
        this.cdr.detectChanges();
      });

    this.authService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((authError: AuthError | null) => {
        if (authError) {
          this.ngZone.run(() => {
            this.error = authError.message;
            this.handleAuthError(authError);
            this.cdr.detectChanges();
          });
          console.error('Auth error:', authError);
        }
      });
  }

  /**
   * Handle structured auth errors for rate limiting and lockout
   */
  private handleAuthError(authError: AuthError): void {
    // Clear any existing countdown
    this.stopCountdown();

    if (authError.code === 'RATE_LIMITED') {
      this.isRateLimited = true;
      this.isLockedOut = false;
      if (authError.retryAfterSeconds) {
        this.startCountdown(authError.retryAfterSeconds);
      }
    } else if (authError.code === 'ACCOUNT_LOCKED') {
      this.isLockedOut = true;
      this.isRateLimited = false;
      if (authError.retryAfterSeconds) {
        this.startCountdown(authError.retryAfterSeconds);
      }
    } else {
      this.isRateLimited = false;
      this.isLockedOut = false;
    }
  }

  /**
   * Start countdown timer for rate limiting or lockout
   */
  private startCountdown(seconds: number): void {
    this.countdownSeconds = seconds;
    this.updateCountdownDisplay();

    this.countdownSubscription = interval(1000)
      .pipe(
        takeUntil(this.destroy$),
        take(seconds)
      )
      .subscribe({
        next: () => {
          this.countdownSeconds--;
          this.updateCountdownDisplay();
          this.cdr.detectChanges();
        },
        complete: () => {
          this.countdownSeconds = 0;
          this.isRateLimited = false;
          this.isLockedOut = false;
          this.error = null;
          this.countdownDisplay = '';
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Stop countdown timer
   */
  private stopCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = undefined;
    }
  }

  /**
   * Format countdown seconds into human-readable display
   */
  private updateCountdownDisplay(): void {
    if (this.countdownSeconds >= 60) {
      const minutes = Math.floor(this.countdownSeconds / 60);
      const secs = this.countdownSeconds % 60;
      this.countdownDisplay = `${minutes}:${secs.toString().padStart(2, '0')}`;
    } else {
      this.countdownDisplay = `${this.countdownSeconds}s`;
    }
  }

  /**
   * Check if form submission is blocked due to rate limiting or lockout
   */
  get isBlocked(): boolean {
    return this.isRateLimited || this.isLockedOut;
  }

  /**
   * Get tooltip text for submit button when blocked
   */
  get blockedTooltip(): string {
    if (this.isLockedOut) {
      return `Account locked. Try again in ${this.countdownDisplay}`;
    }
    if (this.isRateLimited) {
      return `Too many attempts. Try again in ${this.countdownDisplay}`;
    }
    if (this.loginForm.invalid) {
      return 'Please fill in all fields correctly';
    }
    return '';
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isBlocked) {
      return;
    }

    this.authService.clearError();
    this.error = null;
    const { email, password } = this.loginForm.value;

    console.log('Attempting login with:', email);

    this.authService.login({ email, password })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Safety net: ensure loading is false even if service finalize fails
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Login successful. Response:', response);
          console.log('Token stored:', !!this.authService.getToken());
          
          // Login successful, get user roles
          const roles = response.user.roles;
          console.log('User roles:', roles);

          // Add small delay to ensure state is settled before redirecting
          setTimeout(() => {
            // Navigate based on role
            if (roles.includes('Admin')) {
              console.log('Redirecting to admin dashboard');
              this.router.navigateByUrl('/admin/dashboard');
            } else if (roles.includes('Manager')) {
              console.log('Redirecting to manager dashboard');
              this.router.navigateByUrl('/manager/dashboard');
            } else {
              console.log('Redirecting to user dashboard');
              this.router.navigateByUrl('/user/dashboard');
            }
          }, 100);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Error is already handled by the service and subscription above
          // Set local error as fallback if service didn't provide one
          if (!this.error) {
            this.error = error?.error?.message || error?.error?.title || 'An error occurred during login';
          }
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.stopCountdown();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
