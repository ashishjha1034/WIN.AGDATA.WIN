import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;
  returnUrl: string = '';
  showPassword = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Create the form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
      .subscribe(loading => this.loading = loading);

    this.authService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          this.error = error;
          console.error('Auth error:', error);
        }
      });
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
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.clearError();
    const { email, password } = this.loginForm.value;

    console.log('Attempting login with:', email);

    this.authService.login({ email, password })
      .pipe(takeUntil(this.destroy$))
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
          // Error is already handled by the service
          if (!this.error) {
            this.error = error?.error?.message || error?.error?.title || 'An error occurred during login';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
