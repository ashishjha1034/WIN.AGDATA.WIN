import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomValidators, ValidationConstants } from '../../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../../shared/components/validation-hint.component';
import { PasswordStrengthComponent } from '../../../../shared/components/password-strength.component';
import { FormErrorsSummaryComponent } from '../../../../shared/components/form-errors-summary.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../../services/validation.service";
import * as i3 from "@angular/common";
function AddUserModalComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵlistener("click", function AddUserModalComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeModal()); });
    i0.ɵɵelementEnd();
} }
function AddUserModalComponent_div_79_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "label", 47);
    i0.ɵɵtext(2, "Temporary Password ");
    i0.ɵɵelementStart(3, "span", 10);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 48);
    i0.ɵɵelement(6, "input", 49);
    i0.ɵɵelementStart(7, "button", 50);
    i0.ɵɵlistener("click", function AddUserModalComponent_div_79_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showPassword = !ctx_r1.showPassword); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "app-password-strength", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("temporaryPassword"));
    i0.ɵɵproperty("type", ctx_r1.showPassword ? "text" : "password");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", ctx_r1.showPassword ? "Hide password" : "Show password");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.showPassword ? "\uD83D\uDE48" : "\uD83D\uDC41\uFE0F", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("password", ((tmp_5_0 = ctx_r1.form.get("temporaryPassword")) == null ? null : tmp_5_0.value) || "")("firstName", ((tmp_6_0 = ctx_r1.form.get("firstName")) == null ? null : tmp_6_0.value) || "")("lastName", ((tmp_7_0 = ctx_r1.form.get("lastName")) == null ? null : tmp_7_0.value) || "")("employeeId", ((tmp_8_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_8_0.value) || "")("showRequirements", true);
} }
function AddUserModalComponent_div_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function AddUserModalComponent_div_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵelement(1, "div", 54);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Creating user...");
    i0.ɵɵelementEnd()();
} }
export class AddUserModalComponent {
    constructor(fb, validationService, cdr) {
        this.fb = fb;
        this.validationService = validationService;
        this.cdr = cdr;
        this.isOpen = false;
        this.userCreated = new EventEmitter();
        this.closed = new EventEmitter();
        this.isSubmitting = false;
        this.error = null;
        this.showPassword = false;
        // Uniqueness check states
        this.checkingEmail = false;
        this.checkingEmployeeId = false;
        this.emailResult = null;
        this.employeeIdResult = null;
        // Employee ID generator state
        this.generatingEmployeeId = false;
        this.generateAttemptsLeft = 3;
        this.MAX_GENERATE_ATTEMPTS = 3;
        this.INTERNAL_RETRY_LIMIT = 3;
        // Character counter constants
        this.maxNameLength = ValidationConstants.NAME_MAX_LENGTH;
        this.minNameLength = ValidationConstants.NAME_MIN_LENGTH;
        // Form field labels for error summary
        this.formFieldLabels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            employeeId: 'Employee ID',
            email: 'Email Address',
            role: 'Role',
            sendPasswordEmail: 'Send Password Email',
            temporaryPassword: 'Temporary Password'
        };
        this.destroy$ = new Subject();
        this.emailCheck$ = new Subject();
        this.employeeIdCheck$ = new Subject();
    }
    ngOnInit() {
        this.initForm();
        this.setupDebouncedChecks();
    }
    initForm() {
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
            }
            else {
                pwdControl?.setValidators([
                    Validators.required,
                    Validators.minLength(ValidationConstants.PASSWORD_MIN_LENGTH),
                    CustomValidators.strongPassword(this.form.get('firstName'), this.form.get('lastName'), this.form.get('employeeId'))
                ]);
            }
            pwdControl?.updateValueAndValidity();
        });
    }
    setupDebouncedChecks() {
        // Debounced email check
        this.form.get('email')?.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(ValidationConstants.DEBOUNCE_TIME_MS), distinctUntilChanged())
            .subscribe(email => {
            if (email && this.form.get('email')?.valid) {
                this.checkEmail(email);
            }
            else {
                this.emailResult = null;
            }
        });
        // Debounced employee ID check
        this.form.get('employeeId')?.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(ValidationConstants.DEBOUNCE_TIME_MS), distinctUntilChanged())
            .subscribe(employeeId => {
            if (employeeId && this.form.get('employeeId')?.valid) {
                this.checkEmployeeId(employeeId);
            }
            else {
                this.employeeIdResult = null;
            }
        });
    }
    checkEmail(email) {
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
    checkEmployeeId(employeeId) {
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
    checkEmailNow() {
        const email = this.form.get('email')?.value;
        if (email) {
            this.checkEmail(email);
        }
    }
    checkEmployeeIdNow() {
        const employeeId = this.form.get('employeeId')?.value;
        if (employeeId) {
            this.checkEmployeeId(employeeId);
        }
    }
    /**
     * Generate a random 9-character alphanumeric Employee ID
     * Checks uniqueness and retries internally if collision detected
     */
    generateEmployeeId() {
        if (this.generateAttemptsLeft <= 0 || this.generatingEmployeeId)
            return;
        this.generatingEmployeeId = true;
        this.employeeIdResult = null;
        this.cdr.markForCheck();
        this.tryGenerateUniqueEmployeeId(0);
    }
    tryGenerateUniqueEmployeeId(internalAttempt) {
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
                }
                else {
                    // Collision - retry if we haven't exceeded internal retries
                    if (internalAttempt < this.INTERNAL_RETRY_LIMIT - 1) {
                        this.tryGenerateUniqueEmployeeId(internalAttempt + 1);
                    }
                    else {
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
    isFieldInvalid(fieldName) {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
    isFieldValid(fieldName) {
        const field = this.form.get(fieldName);
        return !!(field && field.valid && field.dirty);
    }
    getCharCount(fieldName) {
        const value = this.form.get(fieldName)?.value;
        return value ? value.length : 0;
    }
    get canSubmit() {
        if (!this.form.valid)
            return false;
        if (this.isSubmitting)
            return false;
        if (this.checkingEmail || this.checkingEmployeeId)
            return false;
        if (this.emailResult && !this.emailResult.isValid)
            return false;
        if (this.employeeIdResult && !this.employeeIdResult.isValid)
            return false;
        // Check password if not sending email
        if (!this.form.get('sendPasswordEmail')?.value) {
            const pwd = this.form.get('temporaryPassword')?.value;
            if (!pwd || pwd.length < ValidationConstants.PASSWORD_MIN_LENGTH)
                return false;
        }
        return true;
    }
    closeModal() {
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
    setError(message) {
        this.error = message;
        this.isSubmitting = false;
    }
    setSubmitting(submitting) {
        this.isSubmitting = submitting;
    }
    onSubmit() {
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
        const request = {
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
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function AddUserModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddUserModalComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ValidationService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddUserModalComponent, selectors: [["app-add-user-modal"]], inputs: { isOpen: "isOpen" }, outputs: { userCreated: "userCreated", closed: "closed" }, decls: 88, vars: 59, consts: [["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "modal"], [1, "modal-header"], ["aria-label", "Close modal", 1, "close-btn", 3, "click"], [1, "modal-content", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "form-group"], [1, "label-row"], ["for", "firstName"], [1, "required"], ["aria-live", "polite", 1, "char-counter"], ["id", "firstName", "type", "text", "formControlName", "firstName", "placeholder", "e.g., John", "aria-describedby", "firstName-hint", 1, "form-input"], ["id", "firstName-hint", "fieldName", "First name", "fieldType", "name", 3, "control", "minLength", "maxLength"], ["for", "lastName"], ["id", "lastName", "type", "text", "formControlName", "lastName", "placeholder", "e.g., Doe", "aria-describedby", "lastName-hint", 1, "form-input"], ["id", "lastName-hint", "fieldName", "Last name", "fieldType", "name", 3, "control", "minLength", "maxLength"], ["for", "employeeId"], [1, "input-with-action"], ["id", "employeeId", "type", "text", "formControlName", "employeeId", "placeholder", "e.g., ABC123XYZ", "maxlength", "9", "aria-describedby", "employeeId-hint", 1, "form-input"], ["type", "button", "aria-label", "Generate random employee ID", 1, "generate-btn", 3, "click", "disabled"], ["type", "button", "aria-label", "Check employee ID availability", 1, "check-btn", 3, "click", "disabled"], ["id", "employeeId-hint", "fieldName", "Employee ID", "fieldType", "employeeId", "helperText", "Exactly 9 alphanumeric characters", 3, "control", "checking", "uniquenessResult"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "e.g., john.doe@agdata.com", "aria-describedby", "email-hint", 1, "form-input"], ["type", "button", "aria-label", "Check email availability", 1, "check-btn", 3, "click", "disabled"], ["id", "email-hint", "fieldName", "Email", "fieldType", "email", "helperText", "Must end with @agdata.com", 3, "control", "checking", "uniquenessResult"], [1, "optional"], [1, "help-text", "info-text"], [1, "role-selection"], [1, "role-option"], ["type", "radio", "id", "role-employee", "value", "Employee", "formControlName", "role"], ["for", "role-employee"], ["type", "radio", "id", "role-admin", "value", "Admin", "formControlName", "role"], ["for", "role-admin"], [1, "checkbox-group"], ["type", "checkbox", "id", "send-email", "formControlName", "sendPasswordEmail"], ["for", "send-email"], [1, "help-text"], ["class", "form-group", 4, "ngIf"], ["title", "Please fix the following errors:", 3, "form", "fieldLabels"], ["class", "error-banner", "role", "alert", 4, "ngIf"], ["class", "loading-banner", "role", "status", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-create", 3, "click", "disabled"], [1, "modal-overlay", 3, "click"], ["for", "temporaryPassword"], [1, "password-input-wrapper"], ["id", "temporaryPassword", "formControlName", "temporaryPassword", "placeholder", "Enter a strong password", "aria-describedby", "password-strength", 1, "form-input", 3, "type"], ["type", "button", 1, "toggle-password", 3, "click"], ["id", "password-strength", 3, "password", "firstName", "lastName", "employeeId", "showRequirements"], ["role", "alert", 1, "error-banner"], ["role", "status", 1, "loading-banner"], [1, "spinner"]], template: function AddUserModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AddUserModalComponent_div_0_Template, 1, 0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "h2");
            i0.ɵɵtext(4, "Add New User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 3);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_5_listener() { return ctx.closeModal(); });
            i0.ɵɵtext(6, "\u2715");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "form", 4);
            i0.ɵɵlistener("ngSubmit", function AddUserModalComponent_Template_form_ngSubmit_7_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(8, "div", 5)(9, "h3", 6);
            i0.ɵɵtext(10, "BASIC DETAILS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 7)(12, "div", 8)(13, "label", 9);
            i0.ɵɵtext(14, "First Name ");
            i0.ɵɵelementStart(15, "span", 10);
            i0.ɵɵtext(16, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "span", 11);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(19, "input", 12)(20, "app-validation-hint", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 7)(22, "div", 8)(23, "label", 14);
            i0.ɵɵtext(24, "Last Name ");
            i0.ɵɵelementStart(25, "span", 10);
            i0.ɵɵtext(26, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "span", 11);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(29, "input", 15)(30, "app-validation-hint", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 7)(32, "label", 17);
            i0.ɵɵtext(33, "Employee ID ");
            i0.ɵɵelementStart(34, "span", 10);
            i0.ɵɵtext(35, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 18);
            i0.ɵɵelement(37, "input", 19);
            i0.ɵɵelementStart(38, "button", 20);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_38_listener() { return ctx.generateEmployeeId(); });
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "button", 21);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_40_listener() { return ctx.checkEmployeeIdNow(); });
            i0.ɵɵtext(41, " Check ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(42, "app-validation-hint", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 7)(44, "label", 23);
            i0.ɵɵtext(45, "Email Address ");
            i0.ɵɵelementStart(46, "span", 10);
            i0.ɵɵtext(47, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 18);
            i0.ɵɵelement(49, "input", 24);
            i0.ɵɵelementStart(50, "button", 25);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_50_listener() { return ctx.checkEmailNow(); });
            i0.ɵɵtext(51, " Check ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(52, "app-validation-hint", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "div", 5)(54, "h3", 6);
            i0.ɵɵtext(55, "ROLE & ACCESS ");
            i0.ɵɵelementStart(56, "span", 27);
            i0.ɵɵtext(57, "(optional)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "span", 28);
            i0.ɵɵtext(59, "New users are assigned 'Employee' role by default.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 29)(61, "div", 30);
            i0.ɵɵelement(62, "input", 31);
            i0.ɵɵelementStart(63, "label", 32);
            i0.ɵɵtext(64, "Employee");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div", 30);
            i0.ɵɵelement(66, "input", 33);
            i0.ɵɵelementStart(67, "label", 34);
            i0.ɵɵtext(68, "Admin");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(69, "div", 5)(70, "h3", 6);
            i0.ɵɵtext(71, "SECURITY & ONBOARDING");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 7)(73, "div", 35);
            i0.ɵɵelement(74, "input", 36);
            i0.ɵɵelementStart(75, "label", 37);
            i0.ɵɵtext(76, "Send password setup email");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "span", 38);
            i0.ɵɵtext(78, "The user will receive an email to create their password.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(79, AddUserModalComponent_div_79_Template, 10, 10, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(80, "app-form-errors-summary", 40);
            i0.ɵɵtemplate(81, AddUserModalComponent_div_81_Template, 3, 1, "div", 41)(82, AddUserModalComponent_div_82_Template, 4, 0, "div", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 43)(84, "button", 44);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_84_listener() { return ctx.closeModal(); });
            i0.ɵɵtext(85, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "button", 45);
            i0.ɵɵlistener("click", function AddUserModalComponent_Template_button_click_86_listener() { return ctx.onSubmit(); });
            i0.ɵɵtext(87);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_25_0;
            let tmp_31_0;
            let tmp_35_0;
            i0.ɵɵproperty("ngIf", ctx.isOpen);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isOpen);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(10);
            i0.ɵɵclassProp("warning", ctx.getCharCount("firstName") > 0 && ctx.getCharCount("firstName") < ctx.minNameLength)("valid", ctx.getCharCount("firstName") >= ctx.minNameLength);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2(" ", ctx.getCharCount("firstName"), " / ", ctx.maxNameLength, " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("firstName"))("valid", ctx.isFieldValid("firstName"));
            i0.ɵɵattribute("maxlength", ctx.maxNameLength);
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("firstName"))("minLength", ctx.minNameLength)("maxLength", ctx.maxNameLength);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("warning", ctx.getCharCount("lastName") > 0 && ctx.getCharCount("lastName") < ctx.minNameLength)("valid", ctx.getCharCount("lastName") >= ctx.minNameLength);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2(" ", ctx.getCharCount("lastName"), " / ", ctx.maxNameLength, " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("lastName"))("valid", ctx.isFieldValid("lastName"));
            i0.ɵɵattribute("maxlength", ctx.maxNameLength);
            i0.ɵɵadvance();
            i0.ɵɵproperty("control", ctx.form.get("lastName"))("minLength", ctx.minNameLength)("maxLength", ctx.maxNameLength);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("employeeId") || ctx.employeeIdResult && !ctx.employeeIdResult.isValid)("valid", ctx.isFieldValid("employeeId") && (ctx.employeeIdResult == null ? null : ctx.employeeIdResult.isValid));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.generatingEmployeeId || ctx.generateAttemptsLeft <= 0);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.generatingEmployeeId ? "Generating..." : "Generate (" + ctx.generateAttemptsLeft + ")", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.checkingEmployeeId || !((tmp_25_0 = ctx.form.get("employeeId")) == null ? null : tmp_25_0.value));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("control", ctx.form.get("employeeId"))("checking", ctx.checkingEmployeeId || ctx.generatingEmployeeId)("uniquenessResult", ctx.employeeIdResult);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("error", ctx.isFieldInvalid("email") || ctx.emailResult && !ctx.emailResult.isValid)("valid", ctx.isFieldValid("email") && (ctx.emailResult == null ? null : ctx.emailResult.isValid));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.checkingEmail || !((tmp_31_0 = ctx.form.get("email")) == null ? null : tmp_31_0.value));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("control", ctx.form.get("email"))("checking", ctx.checkingEmail)("uniquenessResult", ctx.emailResult);
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("ngIf", !((tmp_35_0 = ctx.form.get("sendPasswordEmail")) == null ? null : tmp_35_0.value));
            i0.ɵɵadvance();
            i0.ɵɵproperty("form", ctx.form)("fieldLabels", ctx.formFieldLabels);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSubmitting);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSubmitting);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canSubmit);
            i0.ɵɵattribute("aria-disabled", !ctx.canSubmit);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting ? "Creating..." : "Create User", " ");
        } }, dependencies: [CommonModule, i3.NgIf, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, ValidationHintComponent, PasswordStrengthComponent, FormErrorsSummaryComponent], styles: [".modal-overlay[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n      animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .modal[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) scale(0.95);\n      width: 90%;\n      max-width: 520px;\n      max-height: 90vh;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      opacity: 0;\n      pointer-events: none;\n      transition: all 0.3s ease;\n    }\n\n    .modal.open[_ngcontent-%COMP%] {\n      opacity: 1;\n      pointer-events: auto;\n      transform: translate(-50%, -50%) scale(1);\n    }\n\n    .modal-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn[_ngcontent-%COMP%] {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n      padding: 0;\n      width: 32px;\n      height: 32px;\n    }\n\n    .close-btn[_ngcontent-%COMP%]:hover {\n      color: #1f2937;\n    }\n\n    .modal-content[_ngcontent-%COMP%] {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .form-section[_ngcontent-%COMP%] {\n      margin-bottom: 24px;\n      padding-bottom: 24px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .form-section[_ngcontent-%COMP%]:last-of-type {\n      border-bottom: none;\n      margin-bottom: 0;\n      padding-bottom: 0;\n    }\n\n    .section-title[_ngcontent-%COMP%] {\n      margin: 0 0 16px;\n      font-size: 12px;\n      font-weight: 700;\n      color: #374151;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .required[_ngcontent-%COMP%] { color: #dc2626; }\n\n    .label-row[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n    }\n\n    .label-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      margin-bottom: 0;\n    }\n\n    .char-counter[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    .char-counter.warning[_ngcontent-%COMP%] {\n      color: #f59e0b;\n    }\n\n    .char-counter.valid[_ngcontent-%COMP%] {\n      color: #16a34a;\n    }\n\n    .optional[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 400;\n      text-transform: none;\n      letter-spacing: normal;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n      margin-bottom: 16px;\n    }\n\n    .form-group[_ngcontent-%COMP%]:last-child {\n      margin-bottom: 0;\n    }\n\n    label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 13px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 6px;\n    }\n\n    .form-input[_ngcontent-%COMP%] {\n      width: 100%;\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      font-family: inherit;\n      transition: all 0.2s ease;\n      box-sizing: border-box;\n    }\n\n    .form-input[_ngcontent-%COMP%]:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input.error[_ngcontent-%COMP%] {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid[_ngcontent-%COMP%] {\n      border-color: #16a34a;\n    }\n\n    .help-text[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 12px;\n      color: #9ca3af;\n      margin-top: 4px;\n    }\n\n    .info-text[_ngcontent-%COMP%] {\n      display: block;\n      margin-bottom: 12px;\n      padding: 8px 12px;\n      background: #f0f9ff;\n      border-radius: 4px;\n      border-left: 3px solid #3b82f6;\n    }\n\n    .input-with-action[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 8px;\n    }\n\n    .input-with-action[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n      flex: 1;\n    }\n\n    .check-btn[_ngcontent-%COMP%] {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n    }\n\n    .check-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: #e5e7eb;\n    }\n\n    .check-btn[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .generate-btn[_ngcontent-%COMP%] {\n      padding: 10px 12px;\n      background: #4b5563;\n      color: white;\n      border: 1px solid #4b5563;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n    }\n\n    .generate-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: #3a4251;\n    }\n\n    .generate-btn[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      background: #9ca3af;\n      border-color: #9ca3af;\n    }\n\n    .password-input-wrapper[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    .password-input-wrapper[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n      padding-right: 44px;\n    }\n\n    .toggle-password[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 8px;\n      background: none;\n      border: none;\n      cursor: pointer;\n      font-size: 18px;\n      padding: 4px;\n    }\n\n    .role-selection[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 16px;\n    }\n\n    .role-option[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .role-option[_ngcontent-%COMP%]   input[type=\"radio\"][_ngcontent-%COMP%] {\n      accent-color: #4b5563;\n      cursor: pointer;\n    }\n\n    .role-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      margin: 0;\n      cursor: pointer;\n      font-weight: 400;\n    }\n\n    .checkbox-group[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .checkbox-group[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%] {\n      accent-color: #4b5563;\n      cursor: pointer;\n    }\n\n    .checkbox-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      margin: 0;\n      cursor: pointer;\n      font-weight: 400;\n    }\n\n    .error-banner[_ngcontent-%COMP%], .loading-banner[_ngcontent-%COMP%] {\n      margin: 16px 0;\n      padding: 12px 16px;\n      border-radius: 6px;\n      font-size: 13px;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .error-banner[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #dc2626;\n      border: 1px solid #fecaca;\n    }\n\n    .error-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; }\n\n    .loading-banner[_ngcontent-%COMP%] {\n      background: #dbeafe;\n      color: #1e40af;\n      border: 1px solid #bfdbfe;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .modal-footer[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%], .btn-create[_ngcontent-%COMP%] {\n      padding: 10px 20px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%] {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .btn-create[_ngcontent-%COMP%] {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-create[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: #3a4251;\n    }\n\n    .btn-cancel[_ngcontent-%COMP%]:disabled, .btn-create[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddUserModalComponent, [{
        type: Component,
        args: [{ selector: 'app-add-user-modal', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationHintComponent, PasswordStrengthComponent, FormErrorsSummaryComponent], template: `
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
  `, styles: ["\n    .modal-overlay {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n      animation: fadeIn 0.2s ease;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .modal {\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) scale(0.95);\n      width: 90%;\n      max-width: 520px;\n      max-height: 90vh;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      opacity: 0;\n      pointer-events: none;\n      transition: all 0.3s ease;\n    }\n\n    .modal.open {\n      opacity: 1;\n      pointer-events: auto;\n      transform: translate(-50%, -50%) scale(1);\n    }\n\n    .modal-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .modal-header h2 {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n      padding: 0;\n      width: 32px;\n      height: 32px;\n    }\n\n    .close-btn:hover {\n      color: #1f2937;\n    }\n\n    .modal-content {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .form-section {\n      margin-bottom: 24px;\n      padding-bottom: 24px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .form-section:last-of-type {\n      border-bottom: none;\n      margin-bottom: 0;\n      padding-bottom: 0;\n    }\n\n    .section-title {\n      margin: 0 0 16px;\n      font-size: 12px;\n      font-weight: 700;\n      color: #374151;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .required { color: #dc2626; }\n\n    .label-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n    }\n\n    .label-row label {\n      margin-bottom: 0;\n    }\n\n    .char-counter {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    .char-counter.warning {\n      color: #f59e0b;\n    }\n\n    .char-counter.valid {\n      color: #16a34a;\n    }\n\n    .optional {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 400;\n      text-transform: none;\n      letter-spacing: normal;\n    }\n\n    .form-group {\n      margin-bottom: 16px;\n    }\n\n    .form-group:last-child {\n      margin-bottom: 0;\n    }\n\n    label {\n      display: block;\n      font-size: 13px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 6px;\n    }\n\n    .form-input {\n      width: 100%;\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      font-family: inherit;\n      transition: all 0.2s ease;\n      box-sizing: border-box;\n    }\n\n    .form-input:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input.error {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid {\n      border-color: #16a34a;\n    }\n\n    .help-text {\n      display: block;\n      font-size: 12px;\n      color: #9ca3af;\n      margin-top: 4px;\n    }\n\n    .info-text {\n      display: block;\n      margin-bottom: 12px;\n      padding: 8px 12px;\n      background: #f0f9ff;\n      border-radius: 4px;\n      border-left: 3px solid #3b82f6;\n    }\n\n    .input-with-action {\n      display: flex;\n      gap: 8px;\n    }\n\n    .input-with-action .form-input {\n      flex: 1;\n    }\n\n    .check-btn {\n      padding: 10px 16px;\n      background: #f3f4f6;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n    }\n\n    .check-btn:hover:not(:disabled) {\n      background: #e5e7eb;\n    }\n\n    .check-btn:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .generate-btn {\n      padding: 10px 12px;\n      background: #4b5563;\n      color: white;\n      border: 1px solid #4b5563;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n    }\n\n    .generate-btn:hover:not(:disabled) {\n      background: #3a4251;\n    }\n\n    .generate-btn:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      background: #9ca3af;\n      border-color: #9ca3af;\n    }\n\n    .password-input-wrapper {\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    .password-input-wrapper .form-input {\n      padding-right: 44px;\n    }\n\n    .toggle-password {\n      position: absolute;\n      right: 8px;\n      background: none;\n      border: none;\n      cursor: pointer;\n      font-size: 18px;\n      padding: 4px;\n    }\n\n    .role-selection {\n      display: flex;\n      gap: 16px;\n    }\n\n    .role-option {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .role-option input[type=\"radio\"] {\n      accent-color: #4b5563;\n      cursor: pointer;\n    }\n\n    .role-option label {\n      margin: 0;\n      cursor: pointer;\n      font-weight: 400;\n    }\n\n    .checkbox-group {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .checkbox-group input[type=\"checkbox\"] {\n      accent-color: #4b5563;\n      cursor: pointer;\n    }\n\n    .checkbox-group label {\n      margin: 0;\n      cursor: pointer;\n      font-weight: 400;\n    }\n\n    .error-banner, .loading-banner {\n      margin: 16px 0;\n      padding: 12px 16px;\n      border-radius: 6px;\n      font-size: 13px;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .error-banner {\n      background: #fee2e2;\n      color: #dc2626;\n      border: 1px solid #fecaca;\n    }\n\n    .error-banner p { margin: 0; }\n\n    .loading-banner {\n      background: #dbeafe;\n      color: #1e40af;\n      border: 1px solid #bfdbfe;\n    }\n\n    .spinner {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #1e40af;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: spin 0.6s linear infinite;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .modal-footer {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn-cancel, .btn-create {\n      padding: 10px 20px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .btn-cancel {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-cancel:hover:not(:disabled) {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .btn-create {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-create:hover:not(:disabled) {\n      background: #3a4251;\n    }\n\n    .btn-cancel:disabled, .btn-create:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ValidationService }, { type: i0.ChangeDetectorRef }], { isOpen: [{
            type: Input
        }], userCreated: [{
            type: Output
        }], closed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddUserModalComponent, { className: "AddUserModalComponent", filePath: "src/app/pages/admin/users/components/add-user-modal-v2.component.ts", lineNumber: 652 }); })();
//# sourceMappingURL=add-user-modal-v2.component.js.map