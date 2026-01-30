import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CustomValidators, ValidationConstants } from '../../shared/validators/custom-validators';
import { PasswordStrengthComponent } from '../../shared/components/password-strength.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function ResetPasswordComponent_form_10_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 29);
    i0.ɵɵelement(2, "path", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.error, " ");
} }
function ResetPasswordComponent_form_10__svg_svg_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 31);
    i0.ɵɵelement(1, "path", 32);
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10__svg_svg_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 31);
    i0.ɵɵelement(1, "path", 33);
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 35);
    i0.ɵɵelement(2, "div", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.passwordStrength, "%");
    i0.ɵɵproperty("ngClass", ctx_r1.getPasswordStrengthClass());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "strength-" + ctx_r1.getPasswordStrengthClass());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Strength: ", ctx_r1.getPasswordStrengthText(), " ");
} }
function ResetPasswordComponent_form_10_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "Password is required");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_11_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "Password must be at least 8 characters");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_11_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "Password must contain uppercase, lowercase, and numbers");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, ResetPasswordComponent_form_10_div_11_div_1_Template, 2, 0, "div", 26)(2, ResetPasswordComponent_form_10_div_11_div_2_Template, 2, 0, "div", 26)(3, ResetPasswordComponent_form_10_div_11_div_3_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.hasError("pattern"));
} }
function ResetPasswordComponent_form_10__svg_svg_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 31);
    i0.ɵɵelement(1, "path", 32);
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10__svg_svg_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 31);
    i0.ɵɵelement(1, "path", 33);
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_37_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "Please confirm your password");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_37_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "Passwords do not match");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, ResetPasswordComponent_form_10_div_37_div_1_Template, 2, 0, "div", 26)(2, ResetPasswordComponent_form_10_div_37_div_2_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.confirmPasswordControl == null ? null : ctx_r1.confirmPasswordControl.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.resetForm.hasError("passwordMismatch"));
} }
function ResetPasswordComponent_form_10_span_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Reset Password");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_span_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵelement(1, "span", 40);
    i0.ɵɵtext(2, " Resetting... ");
    i0.ɵɵelementEnd();
} }
function ResetPasswordComponent_form_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 11);
    i0.ɵɵlistener("ngSubmit", function ResetPasswordComponent_form_10_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSubmit()); });
    i0.ɵɵtemplate(1, ResetPasswordComponent_form_10_div_1_Template, 4, 1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13)(3, "label", 14);
    i0.ɵɵtext(4, "New Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 15)(6, "input", 16);
    i0.ɵɵlistener("input", function ResetPasswordComponent_form_10_Template_input_input_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPasswordChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 17);
    i0.ɵɵlistener("click", function ResetPasswordComponent_form_10_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.togglePasswordVisibility("password")); });
    i0.ɵɵtemplate(8, ResetPasswordComponent_form_10__svg_svg_8_Template, 2, 0, "svg", 18)(9, ResetPasswordComponent_form_10__svg_svg_9_Template, 2, 0, "svg", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, ResetPasswordComponent_form_10_div_10_Template, 5, 5, "div", 19)(11, ResetPasswordComponent_form_10_div_11_Template, 4, 3, "div", 20);
    i0.ɵɵelementStart(12, "ul", 21)(13, "li")(14, "i", 22);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16, " At least one uppercase letter ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "li")(18, "i", 22);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20, " At least one lowercase letter ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "li")(22, "i", 22);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(24, " At least one number ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "li")(26, "i", 22);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(28, " At least 8 characters ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 13)(30, "label", 23);
    i0.ɵɵtext(31, "Confirm Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 15);
    i0.ɵɵelement(33, "input", 24);
    i0.ɵɵelementStart(34, "button", 17);
    i0.ɵɵlistener("click", function ResetPasswordComponent_form_10_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.togglePasswordVisibility("confirm")); });
    i0.ɵɵtemplate(35, ResetPasswordComponent_form_10__svg_svg_35_Template, 2, 0, "svg", 18)(36, ResetPasswordComponent_form_10__svg_svg_36_Template, 2, 0, "svg", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(37, ResetPasswordComponent_form_10_div_37_Template, 3, 2, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 25);
    i0.ɵɵtemplate(39, ResetPasswordComponent_form_10_span_39_Template, 2, 0, "span", 26)(40, ResetPasswordComponent_form_10_span_40_Template, 3, 0, "span", 27);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.resetForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.error);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("input-error", (ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.invalid) && (ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.touched));
    i0.ɵɵproperty("type", ctx_r1.showPassword ? "text" : "password");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.showPassword);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showPassword);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.invalid) && (ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.touched));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("met", ctx_r1.hasUppercase((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || ""));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.hasUppercase((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || "") ? "\u2713" : "\u2717");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("met", ctx_r1.hasLowercase((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || ""));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.hasLowercase((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || "") ? "\u2713" : "\u2717");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("met", ctx_r1.hasNumber((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || ""));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.hasNumber((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || "") ? "\u2713" : "\u2717");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("met", ctx_r1.hasMinLength((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || "", 8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.hasMinLength((ctx_r1.newPasswordControl == null ? null : ctx_r1.newPasswordControl.value) || "", 8) ? "\u2713" : "\u2717");
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("input-error", ((ctx_r1.confirmPasswordControl == null ? null : ctx_r1.confirmPasswordControl.invalid) || ctx_r1.resetForm.hasError("passwordMismatch")) && (ctx_r1.confirmPasswordControl == null ? null : ctx_r1.confirmPasswordControl.touched));
    i0.ɵɵproperty("type", ctx_r1.showConfirmPassword ? "text" : "password");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.showConfirmPassword);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showConfirmPassword);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ((ctx_r1.confirmPasswordControl == null ? null : ctx_r1.confirmPasswordControl.invalid) || ctx_r1.resetForm.hasError("passwordMismatch")) && (ctx_r1.confirmPasswordControl == null ? null : ctx_r1.confirmPasswordControl.touched));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.token || ctx_r1.resetForm.invalid || ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
} }
function ResetPasswordComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 42);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 43);
    i0.ɵɵelement(3, "path", 44);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Password Reset Successful!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Your password has been reset successfully.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 45);
    i0.ɵɵtext(9, "Redirecting to login in 2 seconds...");
    i0.ɵɵelementEnd()();
} }
export class ResetPasswordComponent {
    constructor(formBuilder, authService, router, route) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.loading = false;
        this.error = null;
        this.success = false;
        this.token = '';
        this.showPassword = false;
        this.showConfirmPassword = false;
        this.passwordStrength = 0;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
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
    passwordMatchValidator(group) {
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
    togglePasswordVisibility(field) {
        if (field === 'password') {
            this.showPassword = !this.showPassword;
        }
        else {
            this.showConfirmPassword = !this.showConfirmPassword;
        }
    }
    onPasswordChange() {
        const password = this.newPasswordControl?.value;
        let strength = 0;
        if (!password) {
            this.passwordStrength = 0;
            return;
        }
        if (password.length >= 8)
            strength += 25;
        if (password.length >= 12)
            strength += 25;
        if (/[A-Z]/.test(password))
            strength += 15;
        if (/[a-z]/.test(password))
            strength += 15;
        if (/[0-9]/.test(password))
            strength += 10;
        if (/[!@#$%^&*]/.test(password))
            strength += 10;
        this.passwordStrength = Math.min(strength, 100);
    }
    getPasswordStrengthClass() {
        if (this.passwordStrength < 30)
            return 'weak';
        if (this.passwordStrength < 60)
            return 'fair';
        if (this.passwordStrength < 85)
            return 'good';
        return 'strong';
    }
    getPasswordStrengthText() {
        if (this.passwordStrength < 30)
            return 'Weak';
        if (this.passwordStrength < 60)
            return 'Fair';
        if (this.passwordStrength < 85)
            return 'Good';
        return 'Strong';
    }
    hasUppercase(value) {
        return /[A-Z]/.test(value || '');
    }
    hasLowercase(value) {
        return /[a-z]/.test(value || '');
    }
    hasNumber(value) {
        return /[0-9]/.test(value || '');
    }
    hasMinLength(value, length) {
        return (value?.length || 0) >= length;
    }
    onSubmit() {
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
    navigateToLogin() {
        this.router.navigateByUrl('/login');
    }
    navigateToForgotPassword() {
        this.router.navigateByUrl('/forgot-password');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function ResetPasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResetPasswordComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResetPasswordComponent, selectors: [["app-reset-password"]], decls: 19, vars: 2, consts: [[1, "reset-password-container"], [1, "reset-password-sidebar"], [1, "logo-container"], ["src", "assets/brand/agdata-logo-white.png", "alt", "AGDATA Logo", 1, "agdata-logo"], [1, "reset-password-main"], [1, "reset-password-box"], [1, "subtitle"], [3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "success-container", 4, "ngIf"], [1, "back-to-login"], [1, "link", 3, "click"], [3, "ngSubmit", "formGroup"], ["class", "error-message", "role", "alert", 4, "ngIf"], [1, "form-group"], ["for", "newPassword"], [1, "input-wrapper", "password-wrapper"], ["id", "newPassword", "formControlName", "newPassword", "placeholder", "Enter new password", 1, "form-input", 3, "input", "type"], ["type", "button", "title", "Toggle password visibility", 1, "toggle-password", 3, "click"], ["class", "eye-icon", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["class", "password-strength", 4, "ngIf"], ["class", "error-text", 4, "ngIf"], [1, "password-requirements"], [1, "req-icon"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "placeholder", "Confirm new password", 1, "form-input", 3, "type"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], ["role", "alert", 1, "error-message"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "error-icon"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "eye-icon"], ["d", "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"], ["d", "M11.83 9L15.29 12.46c.04-.3.06-.63.06-.96 0-1.66-1.34-3-3-3-.33 0-.66.02-.96.07zM19.07 4.93L4.93 19.07c1.44 1.13 3.23 1.93 5.07 1.93 5.52 0 10-4.48 10-10 0-1.84-.8-3.63-1.93-5.07zM12 2C6.48 2 1.73 5.61 1 10.5c.81 2.03 2.12 3.89 3.73 5.32l2.64-2.64c-.36-.71-.57-1.51-.57-2.38 0-2.66 2.24-4.8 5.2-4.8 1.87 0 3.47.87 4.54 2.22l2.64-2.64c-1.42-1.61-3.28-2.92-5.38-3.73zM12 22c5.52 0 10-4.48 10-10 0-.83-.12-1.63-.35-2.39l-2.08 2.08c.18.44.29.92.29 1.41 0 2.66-2.24 4.8-5.2 4.8-1.21 0-2.37-.39-3.33-1.07l-2.33 2.33C10.37 21.88 11.16 22 12 22z"], [1, "password-strength"], [1, "strength-bar"], [1, "strength-fill", 3, "ngClass"], [3, "ngClass"], [1, "error-text"], [1, "spinner"], [1, "spinner-dot"], [1, "success-container"], [1, "success-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"], [1, "info-text"]], template: function ResetPasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5)(6, "h1");
            i0.ɵɵtext(7, "Reset Your Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, "Enter your new password below.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, ResetPasswordComponent_form_10_Template, 41, 30, "form", 7)(11, ResetPasswordComponent_div_11_Template, 10, 0, "div", 8);
            i0.ɵɵelementStart(12, "div", 9)(13, "p")(14, "a", 10);
            i0.ɵɵlistener("click", function ResetPasswordComponent_Template_a_click_14_listener() { return ctx.navigateToLogin(); });
            i0.ɵɵtext(15, "Back to sign in");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "p")(17, "a", 10);
            i0.ɵɵlistener("click", function ResetPasswordComponent_Template_a_click_17_listener() { return ctx.navigateToForgotPassword(); });
            i0.ɵɵtext(18, "Request new reset link");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", !ctx.success);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: [".reset-password-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.reset-password-sidebar[_ngcontent-%COMP%] {\r\n  flex: 0 0 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.logo-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 300px;\r\n}\r\n\r\n.agdata-logo[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: auto;\r\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n.reset-password-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.reset-password-box[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 450px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 40px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.reset-password-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  margin-bottom: 8px;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.subtitle[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 24px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.password-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px 12px 16px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n  color: var(--ag-color-text-primary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input.input-error[_ngcontent-%COMP%] {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.toggle-password[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 12px;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 0;\r\n  color: var(--ag-color-text-secondary);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.toggle-password[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-color-icon-interactive);\r\n}\r\n\r\n.eye-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.password-strength[_ngcontent-%COMP%] {\r\n  margin-top: 8px;\r\n}\r\n\r\n.strength-bar[_ngcontent-%COMP%] {\r\n  height: 4px;\r\n  background-color: var(--ag-color-border-subtle);\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  margin-bottom: 6px;\r\n}\r\n\r\n.strength-fill[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  border-radius: 2px;\r\n  transition: width 0.3s, background-color 0.3s;\r\n}\r\n\r\n.strength-fill.weak[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-color-support-error);\r\n}\r\n\r\n.strength-fill.fair[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.strength-fill.good[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-color-support-info);\r\n}\r\n\r\n.strength-fill.strong[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-color-support-success);\r\n}\r\n\r\n.strength-bar[_ngcontent-%COMP%]    ~ small[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  display: block;\r\n}\r\n\r\n.strength-weak[_ngcontent-%COMP%] { color: var(--ag-color-support-error); }\r\n.strength-fair[_ngcontent-%COMP%] { color: var(--ag-color-support-caution-major); }\r\n.strength-good[_ngcontent-%COMP%] { color: var(--ag-color-support-info); }\r\n.strength-strong[_ngcontent-%COMP%] { color: var(--ag-color-support-success); }\r\n\r\n.password-requirements[_ngcontent-%COMP%] {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin-top: 12px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.password-requirements[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  padding: 6px 0;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.password-requirements[_ngcontent-%COMP%]   li.met[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.req-icon[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 16px;\r\n  height: 16px;\r\n  font-weight: 600;\r\n  font: var(--ag-typo-helper-text);\r\n}\r\n\r\n.error-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-error);\r\n  margin-top: 6px;\r\n}\r\n\r\n.error-message[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-tag-red-text);\r\n  padding: 12px 16px;\r\n  border-radius: 6px;\r\n  margin-bottom: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-top: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  box-shadow: 0 4px 12px rgba(0, 116, 121, 0.15);\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  width: 4px;\r\n  height: 4px;\r\n  background: var(--ag-color-text-on-color);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 1s infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  0%, 100% {\r\n    opacity: 0.3;\r\n  }\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding: 20px 0;\r\n}\r\n\r\n.success-icon[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n  height: 60px;\r\n  background: var(--ag-tag-green-bg);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.success-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 12px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.info-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-style: italic;\r\n}\r\n\r\n.back-to-login[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  margin-top: 24px;\r\n  padding-top: 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.back-to-login[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 6px 0;\r\n}\r\n\r\n.link[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.link[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .reset-password-container[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .reset-password-sidebar[_ngcontent-%COMP%] {\r\n    flex: 0 0 auto;\r\n    padding: 20px;\r\n    min-height: 150px;\r\n  }\r\n\r\n  .agdata-logo[_ngcontent-%COMP%] {\r\n    max-width: 200px;\r\n  }\r\n\r\n  .reset-password-main[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    padding: 20px;\r\n  }\r\n\r\n  .reset-password-box[_ngcontent-%COMP%] {\r\n    padding: 30px 20px;\r\n  }\r\n\r\n  .reset-password-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .form-input[_ngcontent-%COMP%] {\r\n    padding: 12px 40px 12px 12px;\r\n  }\r\n\r\n  .toggle-password[_ngcontent-%COMP%] {\r\n    right: 8px;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResetPasswordComponent, [{
        type: Component,
        args: [{ selector: 'app-reset-password', standalone: true, imports: [CommonModule, ReactiveFormsModule, PasswordStrengthComponent], template: "<div class=\"reset-password-container\">\r\n  <div class=\"reset-password-sidebar\">\r\n    <div class=\"logo-container\">\r\n      <img src=\"assets/brand/agdata-logo-white.png\" alt=\"AGDATA Logo\" class=\"agdata-logo\" />\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"reset-password-main\">\r\n    <div class=\"reset-password-box\">\r\n      <h1>Reset Your Password</h1>\r\n      <p class=\"subtitle\">Enter your new password below.</p>\r\n\r\n      <form [formGroup]=\"resetForm\" (ngSubmit)=\"onSubmit()\" *ngIf=\"!success\">\r\n        <!-- Error Message -->\r\n        <div *ngIf=\"error\" class=\"error-message\" role=\"alert\">\r\n          <svg class=\"error-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"/>\r\n          </svg>\r\n          {{ error }}\r\n        </div>\r\n\r\n        <!-- New Password Field -->\r\n        <div class=\"form-group\">\r\n          <label for=\"newPassword\">New Password</label>\r\n          <div class=\"input-wrapper password-wrapper\">\r\n            <input\r\n              id=\"newPassword\"\r\n              [type]=\"showPassword ? 'text' : 'password'\"\r\n              formControlName=\"newPassword\"\r\n              placeholder=\"Enter new password\"\r\n              class=\"form-input\"\r\n              (input)=\"onPasswordChange()\"\r\n              [class.input-error]=\"newPasswordControl?.invalid && newPasswordControl?.touched\"\r\n            />\r\n            <button\r\n              type=\"button\"\r\n              class=\"toggle-password\"\r\n              (click)=\"togglePasswordVisibility('password')\"\r\n              title=\"Toggle password visibility\"\r\n            >\r\n              <svg *ngIf=\"!showPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\"/>\r\n              </svg>\r\n              <svg *ngIf=\"showPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M11.83 9L15.29 12.46c.04-.3.06-.63.06-.96 0-1.66-1.34-3-3-3-.33 0-.66.02-.96.07zM19.07 4.93L4.93 19.07c1.44 1.13 3.23 1.93 5.07 1.93 5.52 0 10-4.48 10-10 0-1.84-.8-3.63-1.93-5.07zM12 2C6.48 2 1.73 5.61 1 10.5c.81 2.03 2.12 3.89 3.73 5.32l2.64-2.64c-.36-.71-.57-1.51-.57-2.38 0-2.66 2.24-4.8 5.2-4.8 1.87 0 3.47.87 4.54 2.22l2.64-2.64c-1.42-1.61-3.28-2.92-5.38-3.73zM12 22c5.52 0 10-4.48 10-10 0-.83-.12-1.63-.35-2.39l-2.08 2.08c.18.44.29.92.29 1.41 0 2.66-2.24 4.8-5.2 4.8-1.21 0-2.37-.39-3.33-1.07l-2.33 2.33C10.37 21.88 11.16 22 12 22z\"/>\r\n              </svg>\r\n            </button>\r\n          </div>\r\n\r\n          <!-- Password Strength Indicator -->\r\n          <div *ngIf=\"newPasswordControl?.value\" class=\"password-strength\">\r\n            <div class=\"strength-bar\">\r\n              <div\r\n                class=\"strength-fill\"\r\n                [ngClass]=\"getPasswordStrengthClass()\"\r\n                [style.width.%]=\"passwordStrength\"\r\n              ></div>\r\n            </div>\r\n            <small [ngClass]=\"'strength-' + getPasswordStrengthClass()\">\r\n              Strength: {{ getPasswordStrengthText() }}\r\n            </small>\r\n          </div>\r\n\r\n          <!-- Validation Errors -->\r\n          <div *ngIf=\"newPasswordControl?.invalid && newPasswordControl?.touched\" class=\"error-text\">\r\n            <div *ngIf=\"newPasswordControl?.hasError('required')\">Password is required</div>\r\n            <div *ngIf=\"newPasswordControl?.hasError('minlength')\">Password must be at least 8 characters</div>\r\n            <div *ngIf=\"newPasswordControl?.hasError('pattern')\">Password must contain uppercase, lowercase, and numbers</div>\r\n          </div>\r\n\r\n          <!-- Requirements List -->\r\n          <ul class=\"password-requirements\">\r\n            <li [class.met]=\"hasUppercase(newPasswordControl?.value || '')\">\r\n              <i class=\"req-icon\">{{ hasUppercase(newPasswordControl?.value || '') ? '\u2713' : '\u2717' }}</i>\r\n              At least one uppercase letter\r\n            </li>\r\n            <li [class.met]=\"hasLowercase(newPasswordControl?.value || '')\">\r\n              <i class=\"req-icon\">{{ hasLowercase(newPasswordControl?.value || '') ? '\u2713' : '\u2717' }}</i>\r\n              At least one lowercase letter\r\n            </li>\r\n            <li [class.met]=\"hasNumber(newPasswordControl?.value || '')\">\r\n              <i class=\"req-icon\">{{ hasNumber(newPasswordControl?.value || '') ? '\u2713' : '\u2717' }}</i>\r\n              At least one number\r\n            </li>\r\n            <li [class.met]=\"hasMinLength(newPasswordControl?.value || '', 8)\">\r\n              <i class=\"req-icon\">{{ hasMinLength(newPasswordControl?.value || '', 8) ? '\u2713' : '\u2717' }}</i>\r\n              At least 8 characters\r\n            </li>\r\n          </ul>\r\n        </div>\r\n\r\n        <!-- Confirm Password Field -->\r\n        <div class=\"form-group\">\r\n          <label for=\"confirmPassword\">Confirm Password</label>\r\n          <div class=\"input-wrapper password-wrapper\">\r\n            <input\r\n              id=\"confirmPassword\"\r\n              [type]=\"showConfirmPassword ? 'text' : 'password'\"\r\n              formControlName=\"confirmPassword\"\r\n              placeholder=\"Confirm new password\"\r\n              class=\"form-input\"\r\n              [class.input-error]=\"(confirmPasswordControl?.invalid || resetForm.hasError('passwordMismatch')) && confirmPasswordControl?.touched\"\r\n            />\r\n            <button\r\n              type=\"button\"\r\n              class=\"toggle-password\"\r\n              (click)=\"togglePasswordVisibility('confirm')\"\r\n              title=\"Toggle password visibility\"\r\n            >\r\n              <svg *ngIf=\"!showConfirmPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\"/>\r\n              </svg>\r\n              <svg *ngIf=\"showConfirmPassword\" class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M11.83 9L15.29 12.46c.04-.3.06-.63.06-.96 0-1.66-1.34-3-3-3-.33 0-.66.02-.96.07zM19.07 4.93L4.93 19.07c1.44 1.13 3.23 1.93 5.07 1.93 5.52 0 10-4.48 10-10 0-1.84-.8-3.63-1.93-5.07zM12 2C6.48 2 1.73 5.61 1 10.5c.81 2.03 2.12 3.89 3.73 5.32l2.64-2.64c-.36-.71-.57-1.51-.57-2.38 0-2.66 2.24-4.8 5.2-4.8 1.87 0 3.47.87 4.54 2.22l2.64-2.64c-1.42-1.61-3.28-2.92-5.38-3.73zM12 22c5.52 0 10-4.48 10-10 0-.83-.12-1.63-.35-2.39l-2.08 2.08c.18.44.29.92.29 1.41 0 2.66-2.24 4.8-5.2 4.8-1.21 0-2.37-.39-3.33-1.07l-2.33 2.33C10.37 21.88 11.16 22 12 22z\"/>\r\n              </svg>\r\n            </button>\r\n          </div>\r\n\r\n          <div *ngIf=\"(confirmPasswordControl?.invalid || resetForm.hasError('passwordMismatch')) && confirmPasswordControl?.touched\" class=\"error-text\">\r\n            <div *ngIf=\"confirmPasswordControl?.hasError('required')\">Please confirm your password</div>\r\n            <div *ngIf=\"resetForm.hasError('passwordMismatch')\">Passwords do not match</div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Submit Button -->\r\n        <button\r\n          type=\"submit\"\r\n          class=\"btn-submit\"\r\n          [disabled]=\"!token || resetForm.invalid || loading\"\r\n        >\r\n          <span *ngIf=\"!loading\">Reset Password</span>\r\n          <span *ngIf=\"loading\" class=\"spinner\">\r\n            <span class=\"spinner-dot\"></span>\r\n            Resetting...\r\n          </span>\r\n        </button>\r\n      </form>\r\n\r\n      <!-- Success Message -->\r\n      <div *ngIf=\"success\" class=\"success-container\">\r\n        <div class=\"success-icon\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n          </svg>\r\n        </div>\r\n        <h2>Password Reset Successful!</h2>\r\n        <p>Your password has been reset successfully.</p>\r\n        <p class=\"info-text\">Redirecting to login in 2 seconds...</p>\r\n      </div>\r\n\r\n      <!-- Back to Login -->\r\n      <div class=\"back-to-login\">\r\n        <p><a (click)=\"navigateToLogin()\" class=\"link\">Back to sign in</a></p>\r\n        <p><a (click)=\"navigateToForgotPassword()\" class=\"link\">Request new reset link</a></p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".reset-password-container {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.reset-password-sidebar {\r\n  flex: 0 0 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.logo-container {\r\n  width: 100%;\r\n  max-width: 300px;\r\n}\r\n\r\n.agdata-logo {\r\n  width: 100%;\r\n  height: auto;\r\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n.reset-password-main {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.reset-password-box {\r\n  width: 100%;\r\n  max-width: 450px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 40px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.reset-password-box h1 {\r\n  font: var(--ag-typo-h3);\r\n  margin-bottom: 8px;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.subtitle {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 24px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.form-group {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.form-group label {\r\n  display: block;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.password-wrapper {\r\n  position: relative;\r\n}\r\n\r\n.form-input {\r\n  width: 100%;\r\n  padding: 12px 16px 12px 16px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n  color: var(--ag-color-text-primary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.form-input::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input.input-error {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.toggle-password {\r\n  position: absolute;\r\n  right: 12px;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 0;\r\n  color: var(--ag-color-text-secondary);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.toggle-password:hover {\r\n  color: var(--ag-color-icon-interactive);\r\n}\r\n\r\n.eye-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.password-strength {\r\n  margin-top: 8px;\r\n}\r\n\r\n.strength-bar {\r\n  height: 4px;\r\n  background-color: var(--ag-color-border-subtle);\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  margin-bottom: 6px;\r\n}\r\n\r\n.strength-fill {\r\n  height: 100%;\r\n  border-radius: 2px;\r\n  transition: width 0.3s, background-color 0.3s;\r\n}\r\n\r\n.strength-fill.weak {\r\n  background-color: var(--ag-color-support-error);\r\n}\r\n\r\n.strength-fill.fair {\r\n  background-color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.strength-fill.good {\r\n  background-color: var(--ag-color-support-info);\r\n}\r\n\r\n.strength-fill.strong {\r\n  background-color: var(--ag-color-support-success);\r\n}\r\n\r\n.strength-bar ~ small {\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  display: block;\r\n}\r\n\r\n.strength-weak { color: var(--ag-color-support-error); }\r\n.strength-fair { color: var(--ag-color-support-caution-major); }\r\n.strength-good { color: var(--ag-color-support-info); }\r\n.strength-strong { color: var(--ag-color-support-success); }\r\n\r\n.password-requirements {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin-top: 12px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.password-requirements li {\r\n  padding: 6px 0;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.password-requirements li.met {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.req-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 16px;\r\n  height: 16px;\r\n  font-weight: 600;\r\n  font: var(--ag-typo-helper-text);\r\n}\r\n\r\n.error-text {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-error);\r\n  margin-top: 6px;\r\n}\r\n\r\n.error-message {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-tag-red-text);\r\n  padding: 12px 16px;\r\n  border-radius: 6px;\r\n  margin-bottom: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.error-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-submit {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-top: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-submit:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  box-shadow: 0 4px 12px rgba(0, 116, 121, 0.15);\r\n}\r\n\r\n.btn-submit:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot {\r\n  display: inline-block;\r\n  width: 4px;\r\n  height: 4px;\r\n  background: var(--ag-color-text-on-color);\r\n  border-radius: 50%;\r\n  animation: spin 1s infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  0%, 100% {\r\n    opacity: 0.3;\r\n  }\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.success-container {\r\n  text-align: center;\r\n  padding: 20px 0;\r\n}\r\n\r\n.success-icon {\r\n  width: 60px;\r\n  height: 60px;\r\n  background: var(--ag-tag-green-bg);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.success-icon svg {\r\n  width: 32px;\r\n  height: 32px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.success-container h2 {\r\n  font: var(--ag-typo-h4);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.success-container p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 12px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.info-text {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-style: italic;\r\n}\r\n\r\n.back-to-login {\r\n  text-align: center;\r\n  margin-top: 24px;\r\n  padding-top: 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.back-to-login p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 6px 0;\r\n}\r\n\r\n.link {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.link:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .reset-password-container {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .reset-password-sidebar {\r\n    flex: 0 0 auto;\r\n    padding: 20px;\r\n    min-height: 150px;\r\n  }\r\n\r\n  .agdata-logo {\r\n    max-width: 200px;\r\n  }\r\n\r\n  .reset-password-main {\r\n    flex: 1;\r\n    padding: 20px;\r\n  }\r\n\r\n  .reset-password-box {\r\n    padding: 30px 20px;\r\n  }\r\n\r\n  .reset-password-box h1 {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .form-input {\r\n    padding: 12px 40px 12px 12px;\r\n  }\r\n\r\n  .toggle-password {\r\n    right: 8px;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i3.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src/app/pages/reset-password/reset-password.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=reset-password.component.js.map