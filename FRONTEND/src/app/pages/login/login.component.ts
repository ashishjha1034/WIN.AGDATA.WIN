import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // If already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }

    // Subscribe to loading and error states
    this.authService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);

    this.authService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => this.error = error);
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

    this.authService.login({ email, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Login successful, get user roles
          const roles = response.user.roles;
          console.log('Login successful. User roles:', roles);

          // Navigate based on role
          if (roles.includes('Admin')) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (roles.includes('Manager')) {
            this.router.navigateByUrl('/manager/dashboard');
          } else {
            this.router.navigateByUrl('/employee/dashboard');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Error is already handled by the service
        }
      });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
