import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../shared/validators/custom-validators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function ForgotPasswordComponent_form_10_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 23);
    i0.ɵɵelement(2, "path", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.error, " ");
} }
function ForgotPasswordComponent_form_10__svg_svg_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 25);
    i0.ɵɵelement(1, "path", 26);
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_div_8_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Email is required");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_div_8_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please enter a valid email");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_div_8_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Must end with @agdata.com");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_div_8_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Username before @ must be at least 5 characters");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtemplate(1, ForgotPasswordComponent_form_10_div_8_span_1_Template, 2, 0, "span", 20)(2, ForgotPasswordComponent_form_10_div_8_span_2_Template, 2, 0, "span", 20)(3, ForgotPasswordComponent_form_10_div_8_span_3_Template, 2, 0, "span", 20)(4, ForgotPasswordComponent_form_10_div_8_span_4_Template, 2, 0, "span", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.emailControl == null ? null : ctx_r1.emailControl.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.emailControl == null ? null : ctx_r1.emailControl.hasError("email"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.emailControl == null ? null : ctx_r1.emailControl.hasError("corporateEmail"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.emailControl == null ? null : ctx_r1.emailControl.hasError("corporateEmailLocalPart"));
} }
function ForgotPasswordComponent_form_10_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Send Reset Link");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 28);
    i0.ɵɵelement(1, "span", 29);
    i0.ɵɵtext(2, " Sending... ");
    i0.ɵɵelementEnd();
} }
function ForgotPasswordComponent_form_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 11);
    i0.ɵɵlistener("ngSubmit", function ForgotPasswordComponent_form_10_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSubmit()); });
    i0.ɵɵtemplate(1, ForgotPasswordComponent_form_10_div_1_Template, 4, 1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13)(3, "label", 14);
    i0.ɵɵtext(4, "Email address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 15);
    i0.ɵɵelement(6, "input", 16);
    i0.ɵɵtemplate(7, ForgotPasswordComponent_form_10__svg_svg_7_Template, 2, 0, "svg", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ForgotPasswordComponent_form_10_div_8_Template, 5, 4, "div", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 19);
    i0.ɵɵtemplate(10, ForgotPasswordComponent_form_10_span_10_Template, 2, 0, "span", 20)(11, ForgotPasswordComponent_form_10_span_11_Template, 3, 0, "span", 21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.forgotForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.error);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("input-error", (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.invalid) && (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.touched));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.valid) && (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.touched));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.invalid) && (ctx_r1.emailControl == null ? null : ctx_r1.emailControl.touched));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.forgotForm.invalid || ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
} }
function ForgotPasswordComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 31);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 32);
    i0.ɵɵelement(3, "path", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Check Your Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 33);
    i0.ɵɵtext(9, "Redirecting to login in 3 seconds...");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
export class ForgotPasswordComponent {
    constructor(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.loading = false;
        this.error = null;
        this.success = false;
        this.successMessage = '';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
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
    onSubmit() {
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
    navigateToLogin() {
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function ForgotPasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotPasswordComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPasswordComponent, selectors: [["app-forgot-password"]], decls: 17, vars: 2, consts: [[1, "forgot-password-container"], [1, "forgot-password-sidebar"], [1, "logo-container"], ["src", "assets/brand/agdata-logo-white.png", "alt", "AGDATA Logo", 1, "agdata-logo"], [1, "forgot-password-main"], [1, "forgot-password-box"], [1, "subtitle"], [3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "success-container", 4, "ngIf"], [1, "back-to-login"], [1, "link", 3, "click"], [3, "ngSubmit", "formGroup"], ["class", "error-message", "role", "alert", 4, "ngIf"], [1, "form-group"], ["for", "email"], [1, "input-wrapper"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "your.email@example.com", 1, "form-input"], ["class", "check-icon", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["class", "error-text", 4, "ngIf"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], ["role", "alert", 1, "error-message"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "error-icon"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "check-icon"], ["d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"], [1, "error-text"], [1, "spinner"], [1, "spinner-dot"], [1, "success-container"], [1, "success-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor"], [1, "info-text"]], template: function ForgotPasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5)(6, "h1");
            i0.ɵɵtext(7, "Forgot Password?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, "No problem! Enter your email and we'll send you a link to reset your password.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, ForgotPasswordComponent_form_10_Template, 12, 9, "form", 7)(11, ForgotPasswordComponent_div_11_Template, 10, 1, "div", 8);
            i0.ɵɵelementStart(12, "div", 9)(13, "p");
            i0.ɵɵtext(14, "Remember your password? ");
            i0.ɵɵelementStart(15, "a", 10);
            i0.ɵɵlistener("click", function ForgotPasswordComponent_Template_a_click_15_listener() { return ctx.navigateToLogin(); });
            i0.ɵɵtext(16, "Back to sign in");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", !ctx.success);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
        } }, dependencies: [CommonModule, i4.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: [".forgot-password-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.forgot-password-sidebar[_ngcontent-%COMP%] {\r\n  flex: 0 0 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.logo-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 300px;\r\n}\r\n\r\n.agdata-logo[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: auto;\r\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n.forgot-password-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.forgot-password-box[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 400px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 40px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.forgot-password-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  margin-bottom: 8px;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.subtitle[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 24px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n  color: var(--ag-color-text-primary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input.input-error[_ngcontent-%COMP%] {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.check-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-support-success);\r\n  position: absolute;\r\n  right: 12px;\r\n  pointer-events: none;\r\n}\r\n\r\n.error-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-error);\r\n  margin-top: 6px;\r\n}\r\n\r\n.error-message[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-tag-red-text);\r\n  padding: 12px 16px;\r\n  border-radius: 6px;\r\n  margin-bottom: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-top: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  box-shadow: 0 4px 12px rgba(0, 116, 121, 0.15);\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  width: 4px;\r\n  height: 4px;\r\n  background: var(--ag-color-text-on-color);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 1s infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  0%, 100% {\r\n    opacity: 0.3;\r\n  }\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding: 20px 0;\r\n}\r\n\r\n.success-icon[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n  height: 60px;\r\n  background: var(--ag-tag-green-bg);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.success-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.success-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 12px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.info-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-style: italic;\r\n}\r\n\r\n.back-to-login[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  margin-top: 24px;\r\n  padding-top: 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.back-to-login[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.link[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.link[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .forgot-password-container[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .forgot-password-sidebar[_ngcontent-%COMP%] {\r\n    flex: 0 0 auto;\r\n    padding: 20px;\r\n    min-height: 150px;\r\n  }\r\n\r\n  .agdata-logo[_ngcontent-%COMP%] {\r\n    max-width: 200px;\r\n  }\r\n\r\n  .forgot-password-main[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    padding: 20px;\r\n  }\r\n\r\n  .forgot-password-box[_ngcontent-%COMP%] {\r\n    padding: 30px 20px;\r\n  }\r\n\r\n  .forgot-password-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPasswordComponent, [{
        type: Component,
        args: [{ selector: 'app-forgot-password', standalone: true, imports: [CommonModule, ReactiveFormsModule], template: "<div class=\"forgot-password-container\">\r\n  <div class=\"forgot-password-sidebar\">\r\n    <div class=\"logo-container\">\r\n      <img src=\"assets/brand/agdata-logo-white.png\" alt=\"AGDATA Logo\" class=\"agdata-logo\" />\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"forgot-password-main\">\r\n    <div class=\"forgot-password-box\">\r\n      <h1>Forgot Password?</h1>\r\n      <p class=\"subtitle\">No problem! Enter your email and we'll send you a link to reset your password.</p>\r\n\r\n      <form [formGroup]=\"forgotForm\" (ngSubmit)=\"onSubmit()\" *ngIf=\"!success\">\r\n        <!-- Error Message -->\r\n        <div *ngIf=\"error\" class=\"error-message\" role=\"alert\">\r\n          <svg class=\"error-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"/>\r\n          </svg>\r\n          {{ error }}\r\n        </div>\r\n\r\n        <!-- Email Field -->\r\n        <div class=\"form-group\">\r\n          <label for=\"email\">Email address</label>\r\n          <div class=\"input-wrapper\">\r\n            <input\r\n              id=\"email\"\r\n              type=\"email\"\r\n              formControlName=\"email\"\r\n              placeholder=\"your.email@example.com\"\r\n              class=\"form-input\"\r\n              [class.input-error]=\"emailControl?.invalid && emailControl?.touched\"\r\n            />\r\n            <svg *ngIf=\"emailControl?.valid && emailControl?.touched\" class=\"check-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n            </svg>\r\n          </div>\r\n          <div *ngIf=\"emailControl?.invalid && emailControl?.touched\" class=\"error-text\">\r\n            <span *ngIf=\"emailControl?.hasError('required')\">Email is required</span>\r\n            <span *ngIf=\"emailControl?.hasError('email')\">Please enter a valid email</span>\r\n            <span *ngIf=\"emailControl?.hasError('corporateEmail')\">Must end with &#64;agdata.com</span>\r\n            <span *ngIf=\"emailControl?.hasError('corporateEmailLocalPart')\">Username before &#64; must be at least 5 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Submit Button -->\r\n        <button\r\n          type=\"submit\"\r\n          class=\"btn-submit\"\r\n          [disabled]=\"forgotForm.invalid || loading\"\r\n        >\r\n          <span *ngIf=\"!loading\">Send Reset Link</span>\r\n          <span *ngIf=\"loading\" class=\"spinner\">\r\n            <span class=\"spinner-dot\"></span>\r\n            Sending...\r\n          </span>\r\n        </button>\r\n      </form>\r\n\r\n      <!-- Success Message -->\r\n      <div *ngIf=\"success\" class=\"success-container\">\r\n        <div class=\"success-icon\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n          </svg>\r\n        </div>\r\n        <h2>Check Your Email</h2>\r\n        <p>{{ successMessage }}</p>\r\n        <p class=\"info-text\">Redirecting to login in 3 seconds...</p>\r\n      </div>\r\n\r\n      <!-- Back to Login -->\r\n      <div class=\"back-to-login\">\r\n        <p>Remember your password? <a (click)=\"navigateToLogin()\" class=\"link\">Back to sign in</a></p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".forgot-password-container {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.forgot-password-sidebar {\r\n  flex: 0 0 40%;\r\n  background: var(--ag-color-background-brand);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.logo-container {\r\n  width: 100%;\r\n  max-width: 300px;\r\n}\r\n\r\n.agdata-logo {\r\n  width: 100%;\r\n  height: auto;\r\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n.forgot-password-main {\r\n  flex: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px;\r\n}\r\n\r\n.forgot-password-box {\r\n  width: 100%;\r\n  max-width: 400px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 40px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.forgot-password-box h1 {\r\n  font: var(--ag-typo-h3);\r\n  margin-bottom: 8px;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.subtitle {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 24px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.form-group {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.form-group label {\r\n  display: block;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.form-input {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n  color: var(--ag-color-text-primary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.form-input::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.form-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-color-border-interactive);\r\n  box-shadow: 0 0 0 3px rgba(0, 112, 121, 0.1);\r\n}\r\n\r\n.form-input.input-error {\r\n  border-color: var(--ag-color-support-error);\r\n}\r\n\r\n.check-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-support-success);\r\n  position: absolute;\r\n  right: 12px;\r\n  pointer-events: none;\r\n}\r\n\r\n.error-text {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-error);\r\n  margin-top: 6px;\r\n}\r\n\r\n.error-message {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-tag-red-text);\r\n  padding: 12px 16px;\r\n  border-radius: 6px;\r\n  margin-bottom: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n.error-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-submit {\r\n  width: 100%;\r\n  padding: 12px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-top: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-submit:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n  box-shadow: 0 4px 12px rgba(0, 116, 121, 0.15);\r\n}\r\n\r\n.btn-submit:disabled {\r\n  background: var(--ag-button-disabled);\r\n  color: var(--ag-color-text-disabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.spinner {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.spinner-dot {\r\n  display: inline-block;\r\n  width: 4px;\r\n  height: 4px;\r\n  background: var(--ag-color-text-on-color);\r\n  border-radius: 50%;\r\n  animation: spin 1s infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  0%, 100% {\r\n    opacity: 0.3;\r\n  }\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.success-container {\r\n  text-align: center;\r\n  padding: 20px 0;\r\n}\r\n\r\n.success-icon {\r\n  width: 60px;\r\n  height: 60px;\r\n  background: var(--ag-tag-green-bg);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.success-icon svg {\r\n  width: 32px;\r\n  height: 32px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.success-container h2 {\r\n  font: var(--ag-typo-h4);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.success-container p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 12px;\r\n  line-height: 1.5;\r\n}\r\n\r\n.info-text {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-style: italic;\r\n}\r\n\r\n.back-to-login {\r\n  text-align: center;\r\n  margin-top: 24px;\r\n  padding-top: 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.back-to-login p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.link {\r\n  color: var(--ag-color-icon-interactive);\r\n  text-decoration: none;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.link:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .forgot-password-container {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .forgot-password-sidebar {\r\n    flex: 0 0 auto;\r\n    padding: 20px;\r\n    min-height: 150px;\r\n  }\r\n\r\n  .agdata-logo {\r\n    max-width: 200px;\r\n  }\r\n\r\n  .forgot-password-main {\r\n    flex: 1;\r\n    padding: 20px;\r\n  }\r\n\r\n  .forgot-password-box {\r\n    padding: 30px 20px;\r\n  }\r\n\r\n  .forgot-password-box h1 {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src/app/pages/forgot-password/forgot-password.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=forgot-password.component.js.map