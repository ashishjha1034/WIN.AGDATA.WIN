import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { takeUntil, finalize, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomValidators } from '../../shared/validators/custom-validators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function LoginComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 30);
    i0.ɵɵelement(2, "path", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "div", 32)(4, "strong");
    i0.ɵɵtext(5, "Too many attempts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Please wait ");
    i0.ɵɵelementStart(8, "span", 33);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " before trying again.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.countdownDisplay);
} }
function LoginComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 30);
    i0.ɵɵelement(2, "path", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "div", 32)(4, "strong");
    i0.ɵɵtext(5, "Account temporarily locked");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Too many failed attempts. Try again in ");
    i0.ɵɵelementStart(8, "span", 33);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, ".");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.countdownDisplay);
} }
function LoginComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 37);
    i0.ɵɵelement(2, "path", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.error, " ");
} }
function LoginComponent__svg_svg_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 39);
    i0.ɵɵelement(1, "path", 40);
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_18_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Email is required");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_18_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please enter a valid email");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_18_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Email must end with @agdata.com");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_18_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Use your corporate email. At least 5 characters before @agdata.com.");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵtemplate(1, LoginComponent_div_18_span_1_Template, 2, 0, "span", 26)(2, LoginComponent_div_18_span_2_Template, 2, 0, "span", 26)(3, LoginComponent_div_18_span_3_Template, 2, 0, "span", 26)(4, LoginComponent_div_18_span_4_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("email")) && !(ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("corporateEmail")) && !(ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("corporateEmailLocalPart")));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("corporateEmail"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.emailControl == null ? null : ctx_r0.emailControl.hasError("corporateEmailLocalPart"));
} }
function LoginComponent__svg_svg_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 42);
    i0.ɵɵelement(1, "path", 43);
    i0.ɵɵelementEnd();
} }
function LoginComponent__svg_svg_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 42);
    i0.ɵɵelement(1, "path", 44);
    i0.ɵɵelementEnd();
} }
function LoginComponent__svg_svg_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 39);
    i0.ɵɵelement(1, "path", 40);
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_28_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Password is required");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_28_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Password must be at least 12 characters");
    i0.ɵɵelementEnd();
} }
function LoginComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtemplate(1, LoginComponent_div_28_span_1_Template, 2, 0, "span", 26)(2, LoginComponent_div_28_span_2_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.passwordControl == null ? null : ctx_r0.passwordControl.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.passwordControl == null ? null : ctx_r0.passwordControl.hasError("minlength"));
} }
function LoginComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 47);
    i0.ɵɵelement(2, "path", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Please fix the errors above to sign in");
    i0.ɵɵelementEnd()();
} }
function LoginComponent_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign in");
    i0.ɵɵelementEnd();
} }
function LoginComponent_span_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵelement(1, "span", 50);
    i0.ɵɵtext(2, " Signing in... ");
    i0.ɵɵelementEnd();
} }
function LoginComponent_span_36_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Locked (", ctx_r0.countdownDisplay, ")");
} }
function LoginComponent_span_36_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Wait (", ctx_r0.countdownDisplay, ")");
} }
function LoginComponent_span_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, LoginComponent_span_36_span_1_Template, 2, 1, "span", 26)(2, LoginComponent_span_36_span_2_Template, 2, 1, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isLockedOut);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isRateLimited && !ctx_r0.isLockedOut);
} }
export class LoginComponent {
    constructor(formBuilder, authService, router, route, cdr, ngZone) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.loading = false;
        this.error = null;
        this.returnUrl = '';
        this.showPassword = false;
        // Rate limiting and lockout state
        this.isRateLimited = false;
        this.isLockedOut = false;
        this.countdownSeconds = 0;
        this.countdownDisplay = '';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
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
            }
            else {
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
            .subscribe((authError) => {
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
    handleAuthError(authError) {
        // Clear any existing countdown
        this.stopCountdown();
        if (authError.code === 'RATE_LIMITED') {
            this.isRateLimited = true;
            this.isLockedOut = false;
            if (authError.retryAfterSeconds) {
                this.startCountdown(authError.retryAfterSeconds);
            }
        }
        else if (authError.code === 'ACCOUNT_LOCKED') {
            this.isLockedOut = true;
            this.isRateLimited = false;
            if (authError.retryAfterSeconds) {
                this.startCountdown(authError.retryAfterSeconds);
            }
        }
        else {
            this.isRateLimited = false;
            this.isLockedOut = false;
        }
    }
    /**
     * Start countdown timer for rate limiting or lockout
     */
    startCountdown(seconds) {
        this.countdownSeconds = seconds;
        this.updateCountdownDisplay();
        this.countdownSubscription = interval(1000)
            .pipe(takeUntil(this.destroy$), take(seconds))
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
    stopCountdown() {
        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
            this.countdownSubscription = undefined;
        }
    }
    /**
     * Format countdown seconds into human-readable display
     */
    updateCountdownDisplay() {
        if (this.countdownSeconds >= 60) {
            const minutes = Math.floor(this.countdownSeconds / 60);
            const secs = this.countdownSeconds % 60;
            this.countdownDisplay = `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
        else {
            this.countdownDisplay = `${this.countdownSeconds}s`;
        }
    }
    /**
     * Check if form submission is blocked due to rate limiting or lockout
     */
    get isBlocked() {
        return this.isRateLimited || this.isLockedOut;
    }
    /**
     * Get tooltip text for submit button when blocked
     */
    get blockedTooltip() {
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
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    onSubmit() {
        if (this.loginForm.invalid || this.isBlocked) {
            return;
        }
        this.authService.clearError();
        this.error = null;
        const { email, password } = this.loginForm.value;
        console.log('Attempting login with:', email);
        this.authService.login({ email, password })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            // Safety net: ensure loading is false even if service finalize fails
            this.loading = false;
            this.cdr.detectChanges();
        }))
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
                    }
                    else if (roles.includes('Manager')) {
                        console.log('Redirecting to manager dashboard');
                        this.router.navigateByUrl('/manager/dashboard');
                    }
                    else {
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
    ngOnDestroy() {
        this.stopCountdown();
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], decls: 45, vars: 23, consts: [[1, "login-container"], [1, "login-sidebar"], [1, "logo-container"], ["src", "assets/brand/agdata-logo-white.png", "alt", "AGDATA Logo", 1, "agdata-logo"], [1, "login-main"], [1, "login-box"], [3, "ngSubmit", "formGroup"], ["class", "warning-message rate-limit-warning", "role", "alert", "aria-live", "assertive", 4, "ngIf"], ["class", "warning-message lockout-warning", "role", "alert", "aria-live", "assertive", 4, "ngIf"], ["class", "error-message", "role", "alert", "aria-live", "assertive", 4, "ngIf"], [1, "form-group"], ["for", "email"], [1, "input-wrapper"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "your.email@example.com", 1, "form-input"], ["class", "check-icon", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["class", "error-text", "role", "alert", "aria-live", "polite", 4, "ngIf"], ["for", "password"], [1, "input-wrapper", "password-wrapper"], ["id", "password", "formControlName", "password", "placeholder", "Enter your password", 1, "form-input", 3, "type"], ["type", "button", "title", "Toggle password visibility", 1, "toggle-password", 3, "click"], ["class", "eye-icon", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["class", "error-text", "aria-live", "polite", 4, "ngIf"], [1, "forgot-password"], ["routerLink", "/forgot-password"], ["class", "validation-summary", "role", "status", 4, "ngIf"], ["type", "submit", 1, "btn-signin", 3, "disabled", "title"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "demo-info"], ["role", "alert", "aria-live", "assertive", 1, "warning-message", "rate-limit-warning"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "warning-icon"], ["d", "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"], [1, "warning-content"], [1, "countdown"], ["role", "alert", "aria-live", "assertive", 1, "warning-message", "lockout-warning"], ["d", "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"], ["role", "alert", "aria-live", "assertive", 1, "error-message"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "error-icon"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "check-icon"], ["d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"], ["role", "alert", "aria-live", "polite", 1, "error-text"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "eye-icon"], ["d", "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"], ["d", "M11.83 9L15.29 12.46c.04-.3.06-.63.06-.96 0-1.66-1.34-3-3-3-.33 0-.66.02-.96.07zM19.07 4.93L4.93 19.07c1.44 1.13 3.23 1.93 5.07 1.93 5.52 0 10-4.48 10-10 0-1.84-.8-3.63-1.93-5.07zM12 2C6.48 2 1.73 5.61 1 10.5c.81 2.03 2.12 3.89 3.73 5.32l2.64-2.64c-.36-.71-.57-1.51-.57-2.38 0-2.66 2.24-4.8 5.2-4.8 1.87 0 3.47.87 4.54 2.22l2.64-2.64c-1.42-1.61-3.28-2.92-5.38-3.73zM12 22c5.52 0 10-4.48 10-10 0-.83-.12-1.63-.35-2.39l-2.08 2.08c.18.44.29.92.29 1.41 0 2.66-2.24 4.8-5.2 4.8-1.21 0-2.37-.39-3.33-1.07l-2.33 2.33C10.37 21.88 11.16 22 12 22z"], ["aria-live", "polite", 1, "error-text"], ["role", "status", 1, "validation-summary"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "info-icon"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"], [1, "spinner"], [1, "spinner-dot"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5)(6, "h1");
            i0.ɵɵtext(7, "Sign in");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "form", 6);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_8_listener() { return ctx.onSubmit(); });
            i0.ɵɵtemplate(9, LoginComponent_div_9_Template, 11, 1, "div", 7)(10, LoginComponent_div_10_Template, 11, 1, "div", 8)(11, LoginComponent_div_11_Template, 4, 1, "div", 9);
            i0.ɵɵelementStart(12, "div", 10)(13, "label", 11);
            i0.ɵɵtext(14, "Email address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 12);
            i0.ɵɵelement(16, "input", 13);
            i0.ɵɵtemplate(17, LoginComponent__svg_svg_17_Template, 2, 0, "svg", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, LoginComponent_div_18_Template, 5, 4, "div", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 10)(20, "label", 16);
            i0.ɵɵtext(21, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 17);
            i0.ɵɵelement(23, "input", 18);
            i0.ɵɵelementStart(24, "button", 19);
            i0.ɵɵlistener("click", function LoginComponent_Template_button_click_24_listener() { return ctx.togglePasswordVisibility(); });
            i0.ɵɵtemplate(25, LoginComponent__svg_svg_25_Template, 2, 0, "svg", 20)(26, LoginComponent__svg_svg_26_Template, 2, 0, "svg", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(27, LoginComponent__svg_svg_27_Template, 2, 0, "svg", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(28, LoginComponent_div_28_Template, 3, 2, "div", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 22)(30, "a", 23);
            i0.ɵɵtext(31, "Forgot password?");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, LoginComponent_div_32_Template, 5, 0, "div", 24);
            i0.ɵɵelementStart(33, "button", 25);
            i0.ɵɵtemplate(34, LoginComponent_span_34_Template, 2, 0, "span", 26)(35, LoginComponent_span_35_Template, 3, 0, "span", 27)(36, LoginComponent_span_36_Template, 3, 2, "span", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 28)(38, "p")(39, "strong");
            i0.ɵɵtext(40, "Demo Credentials:");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "p")(42, "strong");
            i0.ɵɵtext(43, "Admin:");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(44, " admin@agdata.com / Admin@123456");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵattribute("aria-busy", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isRateLimited && !ctx.isLockedOut);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLockedOut);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error && !ctx.isRateLimited && !ctx.isLockedOut);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("input-error", (ctx.emailControl == null ? null : ctx.emailControl.invalid) && (ctx.emailControl == null ? null : ctx.emailControl.touched));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.emailControl == null ? null : ctx.emailControl.valid) && (ctx.emailControl == null ? null : ctx.emailControl.touched));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.emailControl == null ? null : ctx.emailControl.invalid) && (ctx.emailControl == null ? null : ctx.emailControl.touched));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("input-error", (ctx.passwordControl == null ? null : ctx.passwordControl.invalid) && (ctx.passwordControl == null ? null : ctx.passwordControl.touched));
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.passwordControl == null ? null : ctx.passwordControl.valid) && (ctx.passwordControl == null ? null : ctx.passwordControl.touched));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.passwordControl == null ? null : ctx.passwordControl.invalid) && (ctx.passwordControl == null ? null : ctx.passwordControl.touched));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.loginForm.invalid && ((ctx.emailControl == null ? null : ctx.emailControl.touched) || (ctx.passwordControl == null ? null : ctx.passwordControl.touched)));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loginForm.invalid || ctx.loading || ctx.isBlocked)("title", ctx.blockedTooltip);
            i0.ɵɵattribute("aria-disabled", ctx.loginForm.invalid || ctx.loading || ctx.isBlocked);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.isBlocked);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isBlocked && !ctx.loading);
        } }, dependencies: [CommonModule, i4.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterModule, i3.RouterLink], styles: [".login-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: 100vh;\r\n  width: 100%;\r\n}\r\n\r\n.login-sidebar[_ngcontent-%COMP%] {\r\n  width: 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.login-sidebar[_ngcontent-%COMP%]::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  width: 500px;\r\n  height: 500px;\r\n  background: rgba(255, 255, 255, 0.05);\r\n  border-radius: 50%;\r\n  transform: translate(25%, -25%);\r\n}\r\n\r\n.logo-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  z-index: 1;\r\n  text-align: center;\r\n}\r\n\r\n.agdata-logo[_ngcontent-%COMP%] {\r\n  width: 300px;\r\n  height: auto;\r\n  max-width: 90%;\r\n  display: block;\r\n  object-fit: contain;\r\n  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));\r\n}\r\n\r\n.login-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: var(--ag-color-field-01);\r\n  padding: 20px;\r\n}\r\n\r\n.login-box[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 500px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 48px 40px;\r\n  border-radius: 12px;\r\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.login-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h2);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 32px;\r\n  text-align: left;\r\n}\r\n\r\nform[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  padding-right: 44px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-01);\r\n  transition: all 0.3s ease;\r\n  background-color: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  background-color: var(--ag-color-layer-01);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:hover:not(:focus) {\r\n  border-color: var(--ag-color-border-strong);\r\n}\r\n\r\n.form-input.input-error[_ngcontent-%COMP%] {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.form-input.input-error[_ngcontent-%COMP%]:focus {\r\n  box-shadow: 0 0 0 3px rgba(218, 30, 40, 0.1);\r\n}\r\n\r\n.check-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 12px;\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.toggle-password[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 12px;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 4px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: color 0.2s;\r\n}\r\n\r\n.toggle-password[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.eye-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.password-wrapper[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%] {\r\n  right: 44px;\r\n}\r\n\r\n.error-text[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-error);\r\n  font: var(--ag-typo-helper-text);\r\n  margin-top: 6px;\r\n  display: block;\r\n}\r\n\r\n.error-message[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  margin-bottom: 24px;\r\n  color: var(--ag-tag-red-text);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n\n\r\n.warning-message[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  margin-bottom: 24px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.warning-message.rate-limit-warning[_ngcontent-%COMP%] {\r\n  background-color: #fef3c7;\r\n  border: 1px solid #f59e0b;\r\n  color: #92400e;\r\n}\r\n\r\n.warning-message.lockout-warning[_ngcontent-%COMP%] {\r\n  background-color: #fee2e2;\r\n  border: 1px solid #ef4444;\r\n  color: #991b1b;\r\n}\r\n\r\n.warning-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.rate-limit-warning[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%] {\r\n  color: #f59e0b;\r\n}\r\n\r\n.lockout-warning[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%] {\r\n  color: #ef4444;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  font-weight: 600;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%]   .countdown[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-family: monospace;\r\n}\r\n\r\n.validation-summary[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background-color: #fef3c7;\r\n  border: 1px solid #f59e0b;\r\n  border-radius: 6px;\r\n  padding: 10px 14px;\r\n  margin-bottom: 16px;\r\n  color: #92400e;\r\n  font-size: 13px;\r\n}\r\n\r\n.info-icon[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n  flex-shrink: 0;\r\n  color: #f59e0b;\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.forgot-password[_ngcontent-%COMP%] {\r\n  text-align: right;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  transition: color 0.3s;\r\n  cursor: pointer;\r\n}\r\n\r\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n.btn-signin[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 14px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-signin[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 8px 16px rgba(0, 116, 121, 0.3);\r\n}\r\n\r\n.btn-signin[_ngcontent-%COMP%]:active:not(:disabled) {\r\n  background: var(--ag-button-primary-active);\r\n  transform: translateY(0);\r\n}\r\n\r\n.btn-signin[_ngcontent-%COMP%]:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot[_ngcontent-%COMP%] {\r\n  width: 8px;\r\n  height: 8px;\r\n  border-radius: 50%;\r\n  background-color: rgba(255, 255, 255, 0.8);\r\n  animation: _ngcontent-%COMP%_spin 1.4s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  0%, 100% { opacity: 0.3; }\r\n  50% { opacity: 1; }\r\n}\r\n\r\n.demo-info[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-blue-bg);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-tag-blue-text);\r\n  margin-bottom: 20px;\r\n  line-height: 1.6;\r\n}\r\n\r\n.demo-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n}\r\n\r\n.demo-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-bottom: 4px;\r\n  font-weight: 600;\r\n}\r\n\r\n.register-section[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  padding-top: 24px;\r\n}\r\n\r\n.register-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.btn-register[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-color-icon-interactive);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.3s;\r\n  padding: 0;\r\n}\r\n\r\n.btn-register[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n\n\r\n@media (max-width: 768px) {\r\n  .login-container[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .login-sidebar[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    min-height: 200px;\r\n    padding: 20px;\r\n  }\r\n\r\n  .agdata-logo[_ngcontent-%COMP%] {\r\n    width: 200px;\r\n    height: 100px;\r\n  }\r\n\r\n  .login-main[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n  }\r\n\r\n  .login-box[_ngcontent-%COMP%] {\r\n    padding: 40px 24px;\r\n  }\r\n\r\n  .login-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h3);\r\n    margin-bottom: 24px;\r\n  }\r\n}\r\n\r\n\n\r\n.password-hint[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  margin-top: 12px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.password-hint[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-size: 12px;\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .login-box[_ngcontent-%COMP%] {\r\n    padding: 32px 20px;\r\n  }\r\n\r\n  .login-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .form-input[_ngcontent-%COMP%] {\r\n    padding: 10px 12px;\r\n  }\r\n\r\n  .btn-signin[_ngcontent-%COMP%] {\r\n    padding: 12px 20px;\r\n  }\r\n\r\n  .demo-info[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-legal);\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], template: "<div class=\"login-container\">\r\n<div class=\"login-sidebar\">\r\n  <div class=\"logo-container\">\r\n    <img src=\"assets/brand/agdata-logo-white.png\" alt=\"AGDATA Logo\" class=\"agdata-logo\" />\r\n  </div>\r\n</div>\r\n\r\n<div class=\"login-main\">\r\n    <div class=\"login-box\">\r\n      <h1>Sign in</h1>\r\n\r\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\" [attr.aria-busy]=\"loading\">\r\n        <!-- Rate Limit Warning -->\r\n        <div *ngIf=\"isRateLimited && !isLockedOut\" class=\"warning-message rate-limit-warning\" role=\"alert\" aria-live=\"assertive\">\r\n          <svg class=\"warning-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/>\r\n          </svg>\r\n          <div class=\"warning-content\">\r\n            <strong>Too many attempts</strong>\r\n            <span>Please wait <span class=\"countdown\">{{ countdownDisplay }}</span> before trying again.</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Account Locked Warning -->\r\n        <div *ngIf=\"isLockedOut\" class=\"warning-message lockout-warning\" role=\"alert\" aria-live=\"assertive\">\r\n          <svg class=\"warning-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z\"/>\r\n          </svg>\r\n          <div class=\"warning-content\">\r\n            <strong>Account temporarily locked</strong>\r\n            <span>Too many failed attempts. Try again in <span class=\"countdown\">{{ countdownDisplay }}</span>.</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- General Error Message -->\r\n        <div *ngIf=\"error && !isRateLimited && !isLockedOut\" class=\"error-message\" role=\"alert\" aria-live=\"assertive\">\r\n          <svg class=\"error-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"/>\r\n          </svg>\r\n          {{ error }}\r\n        </div>\r\n\r\n        <!-- Email Field -->\r\n        <div class=\"form-group\">\r\n          <label for=\"email\">Email address</label>\r\n          <div class=\"input-wrapper\">\r\n            <input\r\n              id=\"email\"\r\n              type=\"email\"\r\n              formControlName=\"email\"\r\n              placeholder=\"your.email&#64;example.com\"\r\n              class=\"form-input\"\r\n              [class.input-error]=\"emailControl?.invalid && emailControl?.touched\"\r\n            />\r\n            <svg *ngIf=\"emailControl?.valid && emailControl?.touched\" class=\"check-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n            </svg>\r\n          </div>\r\n          <div *ngIf=\"emailControl?.invalid && emailControl?.touched\" class=\"error-text\" role=\"alert\" aria-live=\"polite\">\r\n            <span *ngIf=\"emailControl?.hasError('required')\">Email is required</span>\r\n            <span *ngIf=\"emailControl?.hasError('email') && !emailControl?.hasError('corporateEmail') && !emailControl?.hasError('corporateEmailLocalPart')\">Please enter a valid email</span>\r\n            <span *ngIf=\"emailControl?.hasError('corporateEmail')\">Email must end with &#64;agdata.com</span>\r\n            <span *ngIf=\"emailControl?.hasError('corporateEmailLocalPart')\">Use your corporate email. At least 5 characters before &#64;agdata.com.</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Password Field -->\r\n        <div class=\"form-group\">\r\n          <label for=\"password\">Password</label>\r\n          <div class=\"input-wrapper password-wrapper\">\r\n            <input\r\n              id=\"password\"\r\n              [type]=\"showPassword ? 'text' : 'password'\"\r\n              formControlName=\"password\"\r\n              placeholder=\"Enter your password\"\r\n              class=\"form-input\"\r\n              [class.input-error]=\"passwordControl?.invalid && passwordControl?.touched\"\r\n            />\r\n            <button\r\n              type=\"button\"\r\n              class=\"toggle-password\"\r\n              (click)=\"togglePasswordVisibility()\"\r\n              title=\"Toggle password visibility\"\r\n            >\r\n              <svg *ngIf=\"!showPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\"/>\r\n              </svg>\r\n              <svg *ngIf=\"showPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M11.83 9L15.29 12.46c.04-.3.06-.63.06-.96 0-1.66-1.34-3-3-3-.33 0-.66.02-.96.07zM19.07 4.93L4.93 19.07c1.44 1.13 3.23 1.93 5.07 1.93 5.52 0 10-4.48 10-10 0-1.84-.8-3.63-1.93-5.07zM12 2C6.48 2 1.73 5.61 1 10.5c.81 2.03 2.12 3.89 3.73 5.32l2.64-2.64c-.36-.71-.57-1.51-.57-2.38 0-2.66 2.24-4.8 5.2-4.8 1.87 0 3.47.87 4.54 2.22l2.64-2.64c-1.42-1.61-3.28-2.92-5.38-3.73zM12 22c5.52 0 10-4.48 10-10 0-.83-.12-1.63-.35-2.39l-2.08 2.08c.18.44.29.92.29 1.41 0 2.66-2.24 4.8-5.2 4.8-1.21 0-2.37-.39-3.33-1.07l-2.33 2.33C10.37 21.88 11.16 22 12 22z\"/>\r\n              </svg>\r\n            </button>\r\n            <svg *ngIf=\"passwordControl?.valid && passwordControl?.touched\" class=\"check-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n            </svg>\r\n          </div>\r\n          <div *ngIf=\"passwordControl?.invalid && passwordControl?.touched\" class=\"error-text\" aria-live=\"polite\">\r\n            <span *ngIf=\"passwordControl?.hasError('required')\">Password is required</span>\r\n            <span *ngIf=\"passwordControl?.hasError('minlength')\">Password must be at least 12 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Forgot Password -->\r\n        <div class=\"forgot-password\">\r\n          <a routerLink=\"/forgot-password\">Forgot password?</a>\r\n        </div>\r\n\r\n        <!-- Validation Summary (when button is disabled) -->\r\n        <div *ngIf=\"loginForm.invalid && (emailControl?.touched || passwordControl?.touched)\" class=\"validation-summary\" role=\"status\">\r\n          <svg class=\"info-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z\"/>\r\n          </svg>\r\n          <span>Please fix the errors above to sign in</span>\r\n        </div>\r\n\r\n        <!-- Submit Button -->\r\n        <button\r\n          type=\"submit\"\r\n          class=\"btn-signin\"\r\n          [disabled]=\"loginForm.invalid || loading || isBlocked\"\r\n          [attr.aria-disabled]=\"loginForm.invalid || loading || isBlocked\"\r\n          [title]=\"blockedTooltip\"\r\n        >\r\n          <span *ngIf=\"!loading && !isBlocked\">Sign in</span>\r\n          <span *ngIf=\"loading\" class=\"spinner\">\r\n            <span class=\"spinner-dot\"></span>\r\n            Signing in...\r\n          </span>\r\n          <span *ngIf=\"isBlocked && !loading\">\r\n            <span *ngIf=\"isLockedOut\">Locked ({{ countdownDisplay }})</span>\r\n            <span *ngIf=\"isRateLimited && !isLockedOut\">Wait ({{ countdownDisplay }})</span>\r\n          </span>\r\n        </button>\r\n\r\n        <!-- Demo Credentials Info -->\r\n        <div class=\"demo-info\">\r\n          <p><strong>Demo Credentials:</strong></p>\r\n          <p><strong>Admin:</strong> admin&#64;agdata.com / Admin&#64;123456</p>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".login-container {\r\n  display: flex;\r\n  height: 100vh;\r\n  width: 100%;\r\n}\r\n\r\n.login-sidebar {\r\n  width: 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.login-sidebar::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  width: 500px;\r\n  height: 500px;\r\n  background: rgba(255, 255, 255, 0.05);\r\n  border-radius: 50%;\r\n  transform: translate(25%, -25%);\r\n}\r\n\r\n.logo-container {\r\n  position: relative;\r\n  z-index: 1;\r\n  text-align: center;\r\n}\r\n\r\n.agdata-logo {\r\n  width: 300px;\r\n  height: auto;\r\n  max-width: 90%;\r\n  display: block;\r\n  object-fit: contain;\r\n  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));\r\n}\r\n\r\n.login-main {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: var(--ag-color-field-01);\r\n  padding: 20px;\r\n}\r\n\r\n.login-box {\r\n  width: 100%;\r\n  max-width: 500px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 48px 40px;\r\n  border-radius: 12px;\r\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.login-box h1 {\r\n  font: var(--ag-typo-h2);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 32px;\r\n  text-align: left;\r\n}\r\n\r\nform {\r\n  width: 100%;\r\n}\r\n\r\n.form-group {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.form-group label {\r\n  display: block;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.form-input {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  padding-right: 44px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-01);\r\n  transition: all 0.3s ease;\r\n  background-color: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.form-input::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  background-color: var(--ag-color-layer-01);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input:hover:not(:focus) {\r\n  border-color: var(--ag-color-border-strong);\r\n}\r\n\r\n.form-input.input-error {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.form-input.input-error:focus {\r\n  box-shadow: 0 0 0 3px rgba(218, 30, 40, 0.1);\r\n}\r\n\r\n.check-icon {\r\n  position: absolute;\r\n  right: 12px;\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.toggle-password {\r\n  position: absolute;\r\n  right: 12px;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 4px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: color 0.2s;\r\n}\r\n\r\n.toggle-password:hover {\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.eye-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.password-wrapper .check-icon {\r\n  right: 44px;\r\n}\r\n\r\n.error-text {\r\n  color: var(--ag-color-text-error);\r\n  font: var(--ag-typo-helper-text);\r\n  margin-top: 6px;\r\n  display: block;\r\n}\r\n\r\n.error-message {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  margin-bottom: 24px;\r\n  color: var(--ag-tag-red-text);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n/* Warning message styles for rate limiting and lockout */\r\n.warning-message {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 12px;\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  margin-bottom: 24px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.warning-message.rate-limit-warning {\r\n  background-color: #fef3c7;\r\n  border: 1px solid #f59e0b;\r\n  color: #92400e;\r\n}\r\n\r\n.warning-message.lockout-warning {\r\n  background-color: #fee2e2;\r\n  border: 1px solid #ef4444;\r\n  color: #991b1b;\r\n}\r\n\r\n.warning-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.rate-limit-warning .warning-icon {\r\n  color: #f59e0b;\r\n}\r\n\r\n.lockout-warning .warning-icon {\r\n  color: #ef4444;\r\n}\r\n\r\n.warning-content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.warning-content strong {\r\n  font-weight: 600;\r\n}\r\n\r\n.warning-content .countdown {\r\n  font-weight: 700;\r\n  font-family: monospace;\r\n}\r\n\r\n.validation-summary {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background-color: #fef3c7;\r\n  border: 1px solid #f59e0b;\r\n  border-radius: 6px;\r\n  padding: 10px 14px;\r\n  margin-bottom: 16px;\r\n  color: #92400e;\r\n  font-size: 13px;\r\n}\r\n\r\n.info-icon {\r\n  width: 18px;\r\n  height: 18px;\r\n  flex-shrink: 0;\r\n  color: #f59e0b;\r\n}\r\n\r\n.error-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.forgot-password {\r\n  text-align: right;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.forgot-password a {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  transition: color 0.3s;\r\n  cursor: pointer;\r\n}\r\n\r\n.forgot-password a:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n.btn-signin {\r\n  width: 100%;\r\n  padding: 14px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-signin:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 8px 16px rgba(0, 116, 121, 0.3);\r\n}\r\n\r\n.btn-signin:active:not(:disabled) {\r\n  background: var(--ag-button-primary-active);\r\n  transform: translateY(0);\r\n}\r\n\r\n.btn-signin:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot {\r\n  width: 8px;\r\n  height: 8px;\r\n  border-radius: 50%;\r\n  background-color: rgba(255, 255, 255, 0.8);\r\n  animation: spin 1.4s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  0%, 100% { opacity: 0.3; }\r\n  50% { opacity: 1; }\r\n}\r\n\r\n.demo-info {\r\n  background-color: var(--ag-tag-blue-bg);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-tag-blue-text);\r\n  margin-bottom: 20px;\r\n  line-height: 1.6;\r\n}\r\n\r\n.demo-info p {\r\n  margin: 0;\r\n}\r\n\r\n.demo-info strong {\r\n  display: block;\r\n  margin-bottom: 4px;\r\n  font-weight: 600;\r\n}\r\n\r\n.register-section {\r\n  text-align: center;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  padding-top: 24px;\r\n}\r\n\r\n.register-section p {\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.btn-register {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-color-icon-interactive);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.3s;\r\n  padding: 0;\r\n}\r\n\r\n.btn-register:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n/* Responsive Design */\r\n@media (max-width: 768px) {\r\n  .login-container {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .login-sidebar {\r\n    width: 100%;\r\n    min-height: 200px;\r\n    padding: 20px;\r\n  }\r\n\r\n  .agdata-logo {\r\n    width: 200px;\r\n    height: 100px;\r\n  }\r\n\r\n  .login-main {\r\n    flex: 1;\r\n  }\r\n\r\n  .login-box {\r\n    padding: 40px 24px;\r\n  }\r\n\r\n  .login-box h1 {\r\n    font: var(--ag-typo-h3);\r\n    margin-bottom: 24px;\r\n  }\r\n}\r\n\r\n/* Password hint below login button */\r\n.password-hint {\r\n  text-align: center;\r\n  margin-top: 12px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.password-hint small {\r\n  font: var(--ag-typo-body-02);\r\n  font-size: 12px;\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .login-box {\r\n    padding: 32px 20px;\r\n  }\r\n\r\n  .login-box h1 {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .form-input {\r\n    padding: 10px 12px;\r\n  }\r\n\r\n  .btn-signin {\r\n    padding: 12px 20px;\r\n  }\r\n\r\n  .demo-info {\r\n    font: var(--ag-typo-legal);\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i3.ActivatedRoute }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=login.component.js.map