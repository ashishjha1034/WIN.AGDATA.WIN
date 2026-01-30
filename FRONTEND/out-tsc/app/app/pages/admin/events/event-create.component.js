import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../services/event.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function EventCreateComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "div", 39)(2, "span", 40);
    i0.ɵɵtext(3, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 41);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 42);
    i0.ɵɵlistener("click", function EventCreateComponent_div_9_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeErrorAlert()); });
    i0.ɵɵtext(7, "\u2715");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function EventCreateComponent_div_21_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Event name is required");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_21_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 3 characters");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_21_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Maximum 100 characters");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtemplate(1, EventCreateComponent_div_21_span_1_Template, 2, 0, "span", 37)(2, EventCreateComponent_div_21_span_2_Template, 2, 0, "span", 37)(3, EventCreateComponent_div_21_span_3_Template, 2, 0, "span", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["name"].hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["name"].hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["name"].hasError("maxlength"));
} }
function EventCreateComponent_div_28_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Description is required");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_28_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 10 characters");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_28_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Maximum 500 characters");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtemplate(1, EventCreateComponent_div_28_span_1_Template, 2, 0, "span", 37)(2, EventCreateComponent_div_28_span_2_Template, 2, 0, "span", 37)(3, EventCreateComponent_div_28_span_3_Template, 2, 0, "span", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["description"].hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["description"].hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["description"].hasError("maxlength"));
} }
function EventCreateComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43)(1, "span");
    i0.ɵɵtext(2, "Location max 200 characters");
    i0.ɵɵelementEnd()();
} }
function EventCreateComponent_div_72_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Total points is required");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_72_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 1 point");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtemplate(1, EventCreateComponent_div_72_span_1_Template, 2, 0, "span", 37)(2, EventCreateComponent_div_72_span_2_Template, 2, 0, "span", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["totalPoints"].hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f["totalPoints"].hasError("min"));
} }
function EventCreateComponent_span_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Create Event");
    i0.ɵɵelementEnd();
} }
function EventCreateComponent_span_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Creating...");
    i0.ɵɵelementEnd();
} }
export class EventCreateComponent {
    constructor(fb, eventService, router) {
        this.fb = fb;
        this.eventService = eventService;
        this.router = router;
        this.isSubmitting = false;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.initializeForm();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    initializeForm() {
        const today = new Date().toISOString().split('T')[0];
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
            eventDate: [today, Validators.required],
            location: ['', Validators.maxLength(200)],
            maxParticipants: [0, Validators.min(0)],
            totalPoints: [0, [Validators.required, Validators.min(1)]],
            registrationEndDate: ['', Validators.required]
        });
    }
    get f() {
        return this.form.controls;
    }
    get eventDate() {
        return this.form.get('eventDate');
    }
    get registrationEndDate() {
        return this.form.get('registrationEndDate');
    }
    /**
     * Validate that dates make sense
     */
    validateDates() {
        const eventDate = new Date(this.eventDate?.value);
        const regEndDate = new Date(this.registrationEndDate?.value);
        // Registration deadline must be before or on event start
        if (regEndDate > eventDate) {
            this.errorMessage = 'Registration deadline must be before or on event start date';
            this.showErrorAlert = true;
            return false;
        }
        return true;
    }
    onSubmit() {
        this.errorMessage = '';
        this.showErrorAlert = false;
        if (!this.form.valid) {
            this.errorMessage = 'Please fill all required fields correctly';
            this.showErrorAlert = true;
            return;
        }
        if (!this.validateDates()) {
            return;
        }
        this.isSubmitting = true;
        const request = {
            name: this.form.value.name,
            description: this.form.value.description,
            eventDate: this.form.value.eventDate,
            location: this.form.value.location || undefined,
            maxParticipants: this.form.value.maxParticipants || undefined,
            totalPointsPool: this.form.value.totalPoints,
            registrationEndDateUtc: this.form.value.registrationEndDate
        };
        console.log('[EventCreate] Submitting form:', request);
        this.eventService
            .createEvent(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (event) => {
                console.log('[EventCreate] Event created successfully:', event);
                this.isSubmitting = false;
                // Navigate to event detail
                this.router.navigate(['/admin/events', event.id]);
            },
            error: (error) => {
                console.error('[EventCreate] Error creating event:', error);
                this.isSubmitting = false;
                this.errorMessage = 'Failed to create event. Please try again.';
                this.showErrorAlert = true;
            }
        });
    }
    onCancel() {
        this.router.navigate(['/admin/events']);
    }
    closeErrorAlert() {
        this.showErrorAlert = false;
    }
    static { this.ɵfac = function EventCreateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventCreateComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.EventService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventCreateComponent, selectors: [["app-event-create"]], decls: 95, vars: 23, consts: [[1, "event-create-container"], [1, "page-header"], [1, "back-button"], ["type", "button", 1, "btn-back", 3, "click"], [1, "subtitle"], ["class", "alert alert-danger", 4, "ngIf"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "form-group"], ["for", "name", 1, "form-label"], [1, "required"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "e.g., Spring Sales Contest", 1, "form-input"], ["class", "error-text", 4, "ngIf"], ["for", "description", 1, "form-label"], ["id", "description", "formControlName", "description", "placeholder", "Describe the event purpose and key details...", "rows", "4", 1, "form-textarea"], ["for", "location", 1, "form-label"], ["id", "location", "type", "text", "formControlName", "location", "placeholder", "e.g., Conference Room A or Virtual", 1, "form-input"], [1, "form-row"], ["for", "registrationEndDate", 1, "form-label"], ["id", "registrationEndDate", "type", "date", "formControlName", "registrationEndDate", 1, "form-input"], [1, "form-hint"], ["for", "eventDate", 1, "form-label"], ["id", "eventDate", "type", "date", "formControlName", "eventDate", 1, "form-input"], ["for", "maxParticipants", 1, "form-label"], ["id", "maxParticipants", "type", "number", "formControlName", "maxParticipants", "placeholder", "Leave empty for unlimited", "min", "0", 1, "form-input"], ["for", "totalPoints", 1, "form-label"], ["id", "totalPoints", "type", "number", "formControlName", "totalPoints", "placeholder", "0", "min", "1", 1, "form-input"], [1, "info-box"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [1, "info-box", "info-blue"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], [1, "alert", "alert-danger"], [1, "alert-content"], [1, "alert-icon"], [1, "alert-text"], ["type", "button", 1, "alert-close", 3, "click"], [1, "error-text"]], template: function EventCreateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
            i0.ɵɵlistener("click", function EventCreateComponent_Template_button_click_3_listener() { return ctx.onCancel(); });
            i0.ɵɵtext(4, " \u2190 Back to Events ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Create New Event");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Set up a new event to manage participants and award points");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, EventCreateComponent_div_9_Template, 8, 1, "div", 5);
            i0.ɵɵelementStart(10, "div", 6)(11, "form", 7);
            i0.ɵɵlistener("ngSubmit", function EventCreateComponent_Template_form_ngSubmit_11_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(12, "div", 8)(13, "h3", 9);
            i0.ɵɵtext(14, "Event Details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 10)(16, "label", 11);
            i0.ɵɵtext(17, " Event Name ");
            i0.ɵɵelementStart(18, "span", 12);
            i0.ɵɵtext(19, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "input", 13);
            i0.ɵɵtemplate(21, EventCreateComponent_div_21_Template, 4, 3, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 10)(23, "label", 15);
            i0.ɵɵtext(24, " Description ");
            i0.ɵɵelementStart(25, "span", 12);
            i0.ɵɵtext(26, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(27, "textarea", 16);
            i0.ɵɵtemplate(28, EventCreateComponent_div_28_Template, 4, 3, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 10)(30, "label", 17);
            i0.ɵɵtext(31, "Location");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 18);
            i0.ɵɵtemplate(33, EventCreateComponent_div_33_Template, 3, 0, "div", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 8)(35, "h3", 9);
            i0.ɵɵtext(36, "Event Timeline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 19)(38, "div", 10)(39, "label", 20);
            i0.ɵɵtext(40, " Registration End Date ");
            i0.ɵɵelementStart(41, "span", 12);
            i0.ɵɵtext(42, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(43, "input", 21);
            i0.ɵɵelementStart(44, "small", 22);
            i0.ɵɵtext(45, "Registrations close on this date");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 10)(47, "label", 23);
            i0.ɵɵtext(48, " Event Date ");
            i0.ɵɵelementStart(49, "span", 12);
            i0.ɵɵtext(50, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(51, "input", 24);
            i0.ɵɵelementStart(52, "small", 22);
            i0.ɵɵtext(53, "When the event takes place");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(54, "div", 8)(55, "h3", 9);
            i0.ɵɵtext(56, "Event Capacity & Points");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 19)(58, "div", 10)(59, "label", 25);
            i0.ɵɵtext(60, " Max Participants (Optional) ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(61, "input", 26);
            i0.ɵɵelementStart(62, "small", 22);
            i0.ɵɵtext(63, "Maximum number of participants (0 or empty = unlimited)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "div", 10)(65, "label", 27);
            i0.ɵɵtext(66, " Total Points Pool ");
            i0.ɵɵelementStart(67, "span", 12);
            i0.ɵɵtext(68, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(69, "input", 28);
            i0.ɵɵelementStart(70, "small", 22);
            i0.ɵɵtext(71, "Total points available for this event");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(72, EventCreateComponent_div_72_Template, 3, 2, "div", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "div", 29)(74, "div", 30)(75, "span", 31);
            i0.ɵɵtext(76, "\uD83D\uDCA1 Total Points Pool:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "span", 32);
            i0.ɵɵtext(78);
            i0.ɵɵpipe(79, "number");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(80, "div", 8)(81, "h3", 9);
            i0.ɵɵtext(82, "Event Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 33)(84, "span");
            i0.ɵɵtext(85, "\u2713 New events are created in ");
            i0.ɵɵelementStart(86, "strong");
            i0.ɵɵtext(87, "Upcoming");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(88, " status and must be activated manually to go Live");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(89, "div", 34)(90, "button", 35);
            i0.ɵɵlistener("click", function EventCreateComponent_Template_button_click_90_listener() { return ctx.onCancel(); });
            i0.ɵɵtext(91, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "button", 36);
            i0.ɵɵtemplate(93, EventCreateComponent_span_93_Template, 2, 0, "span", 37)(94, EventCreateComponent_span_94_Template, 2, 0, "span", 37);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("is-invalid", ctx.f["name"].invalid && ctx.f["name"].touched);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.f["name"].invalid && ctx.f["name"].touched);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("is-invalid", ctx.f["description"].invalid && ctx.f["description"].touched);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.f["description"].invalid && ctx.f["description"].touched);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.f["location"].invalid && ctx.f["location"].touched);
            i0.ɵɵadvance(10);
            i0.ɵɵclassProp("is-invalid", ctx.f["registrationEndDate"].invalid && ctx.f["registrationEndDate"].touched);
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("is-invalid", ctx.f["eventDate"].invalid && ctx.f["eventDate"].touched);
            i0.ɵɵadvance(18);
            i0.ɵɵclassProp("is-invalid", ctx.f["totalPoints"].invalid && ctx.f["totalPoints"].touched);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.f["totalPoints"].invalid && ctx.f["totalPoints"].touched);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(79, 21, ctx.f["totalPoints"].value || 0), " points ");
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("disabled", ctx.isSubmitting);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.form.valid || ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSubmitting);
        } }, dependencies: [CommonModule, i4.NgIf, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, i4.DecimalPipe], styles: [".event-create-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 2rem;\n  background-color: var(--ag-color-field-01);\n  min-height: 100vh;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--ag-color-text-secondary);\n  font-size: 0.95rem;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease;\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  color: var(--ag-button-primary);\n  transform: translateX(-4px);\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.875rem;\n  font-weight: 700;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 0.5rem 0;\n  letter-spacing: -0.02em;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: var(--ag-color-text-secondary);\n  margin: 0;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  border-radius: 6px;\n  padding: 0;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: var(--ag-tag-red-bg);\n  border-left: 4px solid var(--ag-color-support-error);\n}\n\n.alert-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.alert-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n\n.alert-text[_ngcontent-%COMP%] {\n  color: var(--ag-tag-red-text);\n  font-weight: 500;\n  flex: 1;\n}\n\n.alert-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--ag-tag-red-text);\n  font-size: 1.25rem;\n  cursor: pointer;\n  padding: 0;\n  flex-shrink: 0;\n  transition: all 0.2s ease;\n}\n\n.alert-close[_ngcontent-%COMP%]:hover {\n  color: var(--ag-color-support-error);\n}\n\n\n\n.form-card[_ngcontent-%COMP%] {\n  background-color: var(--ag-color-layer-01);\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 2rem;\n  margin-bottom: 2rem;\n}\n\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n\n\n.form-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  border-bottom: 1px solid var(--ag-color-border-subtle);\n  padding-bottom: 2rem;\n}\n\n.form-section[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 0.5rem 0;\n}\n\n\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: var(--ag-color-text-secondary);\n}\n\n.required[_ngcontent-%COMP%] {\n  color: var(--ag-color-support-error);\n  font-weight: bold;\n}\n\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 4px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: all 0.2s ease;\n  background-color: var(--ag-color-layer-01);\n}\n\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--ag-button-primary);\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n  background-color: var(--ag-color-field-01);\n}\n\n.form-input.is-invalid[_ngcontent-%COMP%], \n.form-textarea.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--ag-color-support-error);\n}\n\n.form-input.is-invalid[_ngcontent-%COMP%]:focus, \n.form-textarea.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n\n.form-hint[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ag-color-text-secondary);\n  margin-top: 0.25rem;\n}\n\n.error-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ag-color-support-error);\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n\n\n\n.info-box[_ngcontent-%COMP%] {\n  background-color: var(--ag-tag-green-bg);\n  border: 1px solid var(--ag-color-support-success);\n  border-radius: 6px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  color: var(--ag-tag-green-text);\n}\n\n.info-blue[_ngcontent-%COMP%] {\n  background-color: var(--ag-tag-blue-bg);\n  border-color: var(--ag-color-support-info);\n  color: var(--ag-tag-blue-text);\n}\n\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.info-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--ag-button-primary);\n}\n\n.info-blue[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  color: var(--ag-color-support-info);\n}\n\n\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  padding-top: 1rem;\n  border-top: 1px solid var(--ag-color-border-subtle);\n}\n\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 4px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--ag-button-primary);\n  color: white;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--ag-button-primary-hover);\n  box-shadow: 0 4px 6px rgba(44, 95, 63, 0.3);\n  transform: translateY(-2px);\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: var(--ag-color-border-subtle);\n  color: var(--ag-color-text-primary);\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--ag-color-layer-hover);\n}\n\n\n\n.help-section[_ngcontent-%COMP%] {\n  background-color: var(--ag-color-layer-01);\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.help-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 1rem 0;\n}\n\n.help-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.help-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ag-color-text-secondary);\n  padding-left: 1.5rem;\n  position: relative;\n}\n\n.help-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  color: var(--ag-button-primary);\n  font-weight: bold;\n}\n\n\n\n@media (max-width: 768px) {\n  .event-create-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-actions[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n\n  .form-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .info-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .event-create-container[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n    gap: 1rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .alert-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .alert-close[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventCreateComponent, [{
        type: Component,
        args: [{ selector: 'app-event-create', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], template: "<div class=\"event-create-container\">\r\n  <div class=\"page-header\">\r\n    <div class=\"back-button\">\r\n      <button type=\"button\" class=\"btn-back\" (click)=\"onCancel()\">\r\n        \u2190 Back to Events\r\n      </button>\r\n    </div>\r\n    <h1>Create New Event</h1>\r\n    <p class=\"subtitle\">Set up a new event to manage participants and award points</p>\r\n  </div>\r\n\r\n  <!-- Error Alert -->\r\n  <div *ngIf=\"showErrorAlert\" class=\"alert alert-danger\">\r\n    <div class=\"alert-content\">\r\n      <span class=\"alert-icon\">\u26A0\uFE0F</span>\r\n      <span class=\"alert-text\">{{ errorMessage }}</span>\r\n      <button type=\"button\" class=\"alert-close\" (click)=\"closeErrorAlert()\">\u2715</button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Form Card -->\r\n  <div class=\"form-card\">\r\n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n      <!-- Form Sections -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Details</h3>\r\n\r\n        <!-- Event Name -->\r\n        <div class=\"form-group\">\r\n          <label for=\"name\" class=\"form-label\">\r\n            Event Name <span class=\"required\">*</span>\r\n          </label>\r\n          <input\r\n            id=\"name\"\r\n            type=\"text\"\r\n            class=\"form-input\"\r\n            formControlName=\"name\"\r\n            placeholder=\"e.g., Spring Sales Contest\"\r\n            [class.is-invalid]=\"f['name'].invalid && f['name'].touched\"\r\n          />\r\n          <div *ngIf=\"f['name'].invalid && f['name'].touched\" class=\"error-text\">\r\n            <span *ngIf=\"f['name'].hasError('required')\">Event name is required</span>\r\n            <span *ngIf=\"f['name'].hasError('minlength')\">Minimum 3 characters</span>\r\n            <span *ngIf=\"f['name'].hasError('maxlength')\">Maximum 100 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Description -->\r\n        <div class=\"form-group\">\r\n          <label for=\"description\" class=\"form-label\">\r\n            Description <span class=\"required\">*</span>\r\n          </label>\r\n          <textarea\r\n            id=\"description\"\r\n            class=\"form-textarea\"\r\n            formControlName=\"description\"\r\n            placeholder=\"Describe the event purpose and key details...\"\r\n            rows=\"4\"\r\n            [class.is-invalid]=\"f['description'].invalid && f['description'].touched\"\r\n          ></textarea>\r\n          <div *ngIf=\"f['description'].invalid && f['description'].touched\" class=\"error-text\">\r\n            <span *ngIf=\"f['description'].hasError('required')\">Description is required</span>\r\n            <span *ngIf=\"f['description'].hasError('minlength')\">Minimum 10 characters</span>\r\n            <span *ngIf=\"f['description'].hasError('maxlength')\">Maximum 500 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Location -->\r\n        <div class=\"form-group\">\r\n          <label for=\"location\" class=\"form-label\">Location</label>\r\n          <input\r\n            id=\"location\"\r\n            type=\"text\"\r\n            class=\"form-input\"\r\n            formControlName=\"location\"\r\n            placeholder=\"e.g., Conference Room A or Virtual\"\r\n          />\r\n          <div *ngIf=\"f['location'].invalid && f['location'].touched\" class=\"error-text\">\r\n            <span>Location max 200 characters</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Date & Time Section -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Timeline</h3>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Registration End Date -->\r\n          <div class=\"form-group\">\r\n            <label for=\"registrationEndDate\" class=\"form-label\">\r\n              Registration End Date <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"registrationEndDate\"\r\n              type=\"date\"\r\n              class=\"form-input\"\r\n              formControlName=\"registrationEndDate\"\r\n              [class.is-invalid]=\"f['registrationEndDate'].invalid && f['registrationEndDate'].touched\"\r\n            />\r\n            <small class=\"form-hint\">Registrations close on this date</small>\r\n          </div>\r\n\r\n          <!-- Event Start Date -->\r\n          <div class=\"form-group\">\r\n            <label for=\"eventDate\" class=\"form-label\">\r\n              Event Date <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"eventDate\"\r\n              type=\"date\"\r\n              class=\"form-input\"\r\n              formControlName=\"eventDate\"\r\n              [class.is-invalid]=\"f['eventDate'].invalid && f['eventDate'].touched\"\r\n            />\r\n            <small class=\"form-hint\">When the event takes place</small>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Points & Participants Section -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Capacity & Points</h3>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Max Participants -->\r\n          <div class=\"form-group\">\r\n            <label for=\"maxParticipants\" class=\"form-label\">\r\n              Max Participants (Optional)\r\n            </label>\r\n            <input\r\n              id=\"maxParticipants\"\r\n              type=\"number\"\r\n              class=\"form-input\"\r\n              formControlName=\"maxParticipants\"\r\n              placeholder=\"Leave empty for unlimited\"\r\n              min=\"0\"\r\n            />\r\n            <small class=\"form-hint\">Maximum number of participants (0 or empty = unlimited)</small>\r\n          </div>\r\n\r\n          <!-- Total Points Pool -->\r\n          <div class=\"form-group\">\r\n            <label for=\"totalPoints\" class=\"form-label\">\r\n              Total Points Pool <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"totalPoints\"\r\n              type=\"number\"\r\n              class=\"form-input\"\r\n              formControlName=\"totalPoints\"\r\n              placeholder=\"0\"\r\n              min=\"1\"\r\n              [class.is-invalid]=\"f['totalPoints'].invalid && f['totalPoints'].touched\"\r\n            />\r\n            <small class=\"form-hint\">Total points available for this event</small>\r\n            <div *ngIf=\"f['totalPoints'].invalid && f['totalPoints'].touched\" class=\"error-text\">\r\n              <span *ngIf=\"f['totalPoints'].hasError('required')\">Total points is required</span>\r\n              <span *ngIf=\"f['totalPoints'].hasError('min')\">Minimum 1 point</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Info Box -->\r\n        <div class=\"info-box\">\r\n          <div class=\"info-row\">\r\n            <span class=\"info-label\">\uD83D\uDCA1 Total Points Pool:</span>\r\n            <span class=\"info-value\">\r\n              {{ f['totalPoints'].value || 0 | number }} points\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Status Section -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Status</h3>\r\n        <div class=\"info-box info-blue\">\r\n          <span>\u2713 New events are created in <strong>Upcoming</strong> status and must be activated manually to go Live</span>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Form Actions -->\r\n      <div class=\"form-actions\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\" [disabled]=\"isSubmitting\">\r\n          Cancel\r\n        </button>\r\n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!form.valid || isSubmitting\">\r\n          <span *ngIf=\"!isSubmitting\">Create Event</span>\r\n          <span *ngIf=\"isSubmitting\">Creating...</span>\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n", styles: [".event-create-container {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 2rem;\n  background-color: var(--ag-color-field-01);\n  min-height: 100vh;\n}\n\n.page-header {\n  margin-bottom: 2rem;\n}\n\n.back-button {\n  margin-bottom: 1rem;\n}\n\n.btn-back {\n  background: none;\n  border: none;\n  color: var(--ag-color-text-secondary);\n  font-size: 0.95rem;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease;\n}\n\n.btn-back:hover {\n  color: var(--ag-button-primary);\n  transform: translateX(-4px);\n}\n\n.page-header h1 {\n  font-size: 1.875rem;\n  font-weight: 700;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 0.5rem 0;\n  letter-spacing: -0.02em;\n}\n\n.subtitle {\n  font-size: 0.95rem;\n  color: var(--ag-color-text-secondary);\n  margin: 0;\n}\n\n/* Alert Styles */\n.alert {\n  margin-bottom: 1.5rem;\n  border-radius: 6px;\n  padding: 0;\n  overflow: hidden;\n  animation: slideDown 0.3s ease;\n}\n\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-danger {\n  background-color: var(--ag-tag-red-bg);\n  border-left: 4px solid var(--ag-color-support-error);\n}\n\n.alert-content {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.alert-icon {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n\n.alert-text {\n  color: var(--ag-tag-red-text);\n  font-weight: 500;\n  flex: 1;\n}\n\n.alert-close {\n  background: none;\n  border: none;\n  color: var(--ag-tag-red-text);\n  font-size: 1.25rem;\n  cursor: pointer;\n  padding: 0;\n  flex-shrink: 0;\n  transition: all 0.2s ease;\n}\n\n.alert-close:hover {\n  color: var(--ag-color-support-error);\n}\n\n/* Form Card */\n.form-card {\n  background-color: var(--ag-color-layer-01);\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 2rem;\n  margin-bottom: 2rem;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n/* Form Sections */\n.form-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  border-bottom: 1px solid var(--ag-color-border-subtle);\n  padding-bottom: 2rem;\n}\n\n.form-section:last-of-type {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.section-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 0.5rem 0;\n}\n\n/* Form Groups */\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n\n.form-label {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: var(--ag-color-text-secondary);\n}\n\n.required {\n  color: var(--ag-color-support-error);\n  font-weight: bold;\n}\n\n.form-input,\n.form-textarea {\n  padding: 0.75rem;\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 4px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: all 0.2s ease;\n  background-color: var(--ag-color-layer-01);\n}\n\n.form-input:focus,\n.form-textarea:focus {\n  outline: none;\n  border-color: var(--ag-button-primary);\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n  background-color: var(--ag-color-field-01);\n}\n\n.form-input.is-invalid,\n.form-textarea.is-invalid {\n  border-color: var(--ag-color-support-error);\n}\n\n.form-input.is-invalid:focus,\n.form-textarea.is-invalid:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n\n.form-textarea {\n  resize: vertical;\n  min-height: 100px;\n}\n\n.form-hint {\n  font-size: 0.85rem;\n  color: var(--ag-color-text-secondary);\n  margin-top: 0.25rem;\n}\n\n.error-text {\n  font-size: 0.85rem;\n  color: var(--ag-color-support-error);\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n\n/* Info Box */\n.info-box {\n  background-color: var(--ag-tag-green-bg);\n  border: 1px solid var(--ag-color-support-success);\n  border-radius: 6px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  color: var(--ag-tag-green-text);\n}\n\n.info-blue {\n  background-color: var(--ag-tag-blue-bg);\n  border-color: var(--ag-color-support-info);\n  color: var(--ag-tag-blue-text);\n}\n\n.info-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.info-label {\n  font-weight: 500;\n}\n\n.info-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--ag-button-primary);\n}\n\n.info-blue .info-value {\n  color: var(--ag-color-support-info);\n}\n\n/* Form Actions */\n.form-actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  padding-top: 1rem;\n  border-top: 1px solid var(--ag-color-border-subtle);\n}\n\n.btn {\n  padding: 0.75rem 1.5rem;\n  border-radius: 4px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.btn-primary {\n  background-color: var(--ag-button-primary);\n  color: white;\n}\n\n.btn-primary:hover:not(:disabled) {\n  background-color: var(--ag-button-primary-hover);\n  box-shadow: 0 4px 6px rgba(44, 95, 63, 0.3);\n  transform: translateY(-2px);\n}\n\n.btn-secondary {\n  background-color: var(--ag-color-border-subtle);\n  color: var(--ag-color-text-primary);\n}\n\n.btn-secondary:hover:not(:disabled) {\n  background-color: var(--ag-color-layer-hover);\n}\n\n/* Help Section */\n.help-section {\n  background-color: var(--ag-color-layer-01);\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.help-section h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ag-color-text-primary);\n  margin: 0 0 1rem 0;\n}\n\n.help-section ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.help-section li {\n  font-size: 0.9rem;\n  color: var(--ag-color-text-secondary);\n  padding-left: 1.5rem;\n  position: relative;\n}\n\n.help-section li:before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  color: var(--ag-button-primary);\n  font-weight: bold;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .event-create-container {\n    padding: 1rem;\n  }\n\n  .form-card {\n    padding: 1.5rem;\n  }\n\n  .page-header h1 {\n    font-size: 1.5rem;\n  }\n\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n\n  .form-actions {\n    justify-content: stretch;\n  }\n\n  .form-actions .btn {\n    flex: 1;\n  }\n\n  .info-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .event-create-container {\n    padding: 0.5rem;\n  }\n\n  .form-card {\n    padding: 1rem;\n  }\n\n  .page-header h1 {\n    font-size: 1.25rem;\n  }\n\n  .form-section {\n    gap: 1rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .alert-content {\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .alert-close {\n    align-self: flex-start;\n  }\n}\r\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.EventService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventCreateComponent, { className: "EventCreateComponent", filePath: "src/app/pages/admin/events/event-create.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=event-create.component.js.map