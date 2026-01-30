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
function EventEditComponent_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.eventDetail.name, " \u2022 Status: ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "status-" + ctx_r0.eventDetail.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.eventDetail.status);
} }
function EventEditComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading event details...");
    i0.ɵɵelementEnd()();
} }
function EventEditComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵelement(2, "i", 15);
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 17);
    i0.ɵɵlistener("click", function EventEditComponent_div_10_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeErrorAlert()); });
    i0.ɵɵelement(6, "i", 18);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function EventEditComponent_div_11_div_11_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Event name is required");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_11_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 3 characters");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_11_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Maximum 100 characters");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtemplate(1, EventEditComponent_div_11_div_11_span_1_Template, 2, 0, "span", 54)(2, EventEditComponent_div_11_div_11_span_2_Template, 2, 0, "span", 54)(3, EventEditComponent_div_11_div_11_span_3_Template, 2, 0, "span", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["name"].hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["name"].hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["name"].hasError("maxlength"));
} }
function EventEditComponent_div_11_div_18_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Description is required");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_18_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 10 characters");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_18_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Maximum 500 characters");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtemplate(1, EventEditComponent_div_11_div_18_span_1_Template, 2, 0, "span", 54)(2, EventEditComponent_div_11_div_18_span_2_Template, 2, 0, "span", 54)(3, EventEditComponent_div_11_div_18_span_3_Template, 2, 0, "span", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["description"].hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["description"].hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["description"].hasError("maxlength"));
} }
function EventEditComponent_div_11_span_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵelement(1, "i", 57);
    i0.ɵɵtext(2, " Locked");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_small_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 35);
    i0.ɵɵtext(1, " Points are locked when event is Active ");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_small_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 35);
    i0.ɵɵtext(1, " Points per participant (editable only in Draft) ");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_79_small_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, " This event is in draft status and can be edited freely before activation. ");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_79_small_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, " This event is active. Some fields like points are locked and cannot be changed. ");
    i0.ɵɵelementEnd();
} }
function EventEditComponent_div_11_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "h3", 22);
    i0.ɵɵtext(2, "Event Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 58)(4, "strong");
    i0.ɵɵtext(5, "Current Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, EventEditComponent_div_11_div_79_small_7_Template, 2, 0, "small", 54)(8, EventEditComponent_div_11_div_79_small_8_Template, 2, 0, "small", 54);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", "info-" + ctx_r0.eventDetail.status.toLowerCase());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.eventDetail.status, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.eventDetail.status === "Draft");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.eventDetail.status === "Active");
} }
function EventEditComponent_div_11_ng_container_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 59);
    i0.ɵɵtext(2, " Save Changes ");
    i0.ɵɵelementContainerEnd();
} }
function EventEditComponent_div_11_ng_container_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵtext(2, " Saving... ");
    i0.ɵɵelementContainerEnd();
} }
function EventEditComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "form", 20);
    i0.ɵɵlistener("ngSubmit", function EventEditComponent_div_11_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSubmit()); });
    i0.ɵɵelementStart(2, "div", 21)(3, "h3", 22);
    i0.ɵɵtext(4, "Event Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 23)(6, "label", 24);
    i0.ɵɵtext(7, " Event Name ");
    i0.ɵɵelementStart(8, "span", 25);
    i0.ɵɵtext(9, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(10, "input", 26);
    i0.ɵɵtemplate(11, EventEditComponent_div_11_div_11_Template, 4, 3, "div", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 23)(13, "label", 28);
    i0.ɵɵtext(14, " Description ");
    i0.ɵɵelementStart(15, "span", 25);
    i0.ɵɵtext(16, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(17, "textarea", 29);
    i0.ɵɵtemplate(18, EventEditComponent_div_11_div_18_Template, 4, 3, "div", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 23)(20, "label", 30);
    i0.ɵɵtext(21, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 21)(24, "h3", 22);
    i0.ɵɵtext(25, "Event Timeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 32)(27, "div", 23)(28, "label", 33);
    i0.ɵɵtext(29, " Registration Deadline ");
    i0.ɵɵelementStart(30, "span", 25);
    i0.ɵɵtext(31, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(32, "input", 34);
    i0.ɵɵelementStart(33, "small", 35);
    i0.ɵɵtext(34, "Registrations close on this date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 23)(36, "label", 36);
    i0.ɵɵtext(37, " Event Start Date ");
    i0.ɵɵelementStart(38, "span", 25);
    i0.ɵɵtext(39, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(40, "input", 37);
    i0.ɵɵelementStart(41, "small", 35);
    i0.ɵɵtext(42, "When the event begins");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(43, "div", 23)(44, "label", 38);
    i0.ɵɵtext(45, " Event End Date ");
    i0.ɵɵelementStart(46, "span", 25);
    i0.ɵɵtext(47, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(48, "input", 39);
    i0.ɵɵelementStart(49, "small", 35);
    i0.ɵɵtext(50, "When the event concludes");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(51, "div", 21)(52, "h3", 22);
    i0.ɵɵtext(53, "Participants & Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 32)(55, "div", 23)(56, "label", 40);
    i0.ɵɵtext(57, " Max Participants ");
    i0.ɵɵelementStart(58, "span", 25);
    i0.ɵɵtext(59, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(60, "input", 41);
    i0.ɵɵelementStart(61, "small", 35);
    i0.ɵɵtext(62, "Maximum number of event participants");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "div", 23)(64, "label", 42);
    i0.ɵɵtext(65, " Points Per Participant ");
    i0.ɵɵelementStart(66, "span", 25);
    i0.ɵɵtext(67, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(68, EventEditComponent_div_11_span_68_Template, 3, 0, "span", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(69, "input", 44);
    i0.ɵɵtemplate(70, EventEditComponent_div_11_small_70_Template, 2, 0, "small", 45)(71, EventEditComponent_div_11_small_71_Template, 2, 0, "small", 45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "div", 46)(73, "div", 47)(74, "span", 48);
    i0.ɵɵtext(75, "Estimated Total Points Pool:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "span", 49);
    i0.ɵɵtext(77);
    i0.ɵɵpipe(78, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(79, EventEditComponent_div_11_div_79_Template, 9, 4, "div", 50);
    i0.ɵɵelementStart(80, "div", 51)(81, "button", 52);
    i0.ɵɵlistener("click", function EventEditComponent_div_11_Template_button_click_81_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onCancel()); });
    i0.ɵɵelement(82, "i", 18);
    i0.ɵɵtext(83, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "button", 53);
    i0.ɵɵtemplate(85, EventEditComponent_div_11_ng_container_85_Template, 3, 0, "ng-container", 54)(86, EventEditComponent_div_11_ng_container_86_Template, 3, 0, "ng-container", 54);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(9);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["name"].invalid && ctx_r0.f["name"].touched);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["name"].invalid && ctx_r0.f["name"].touched);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["description"].invalid && ctx_r0.f["description"].touched);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.f["description"].invalid && ctx_r0.f["description"].touched);
    i0.ɵɵadvance(14);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["registrationDeadline"].invalid && ctx_r0.f["registrationDeadline"].touched);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["eventDate"].invalid && ctx_r0.f["eventDate"].touched);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["endDate"].invalid && ctx_r0.f["endDate"].touched);
    i0.ɵɵadvance(12);
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["maxParticipants"].invalid && ctx_r0.f["maxParticipants"].touched);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r0.pointsLocked);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-invalid", ctx_r0.f["pointsPerParticipant"].invalid && ctx_r0.f["pointsPerParticipant"].touched);
    i0.ɵɵproperty("disabled", ctx_r0.pointsLocked);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.pointsLocked);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.pointsLocked);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(78, 27, (ctx_r0.f["maxParticipants"].value || 0) * (ctx_r0.f["pointsPerParticipant"].value || 0)), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.eventDetail);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r0.form.valid || ctx_r0.isSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isSubmitting);
} }
export class EventEditComponent {
    constructor(fb, eventService, route, router) {
        this.fb = fb;
        this.eventService = eventService;
        this.route = route;
        this.router = router;
        this.eventDetail = null;
        this.isLoading = false;
        this.isSubmitting = false;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.pointsLocked = false;
        this.eventId = '';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.initializeForm();
        this.loadEvent();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    initializeForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
            eventDate: ['', Validators.required],
            registrationDeadline: ['', Validators.required],
            endDate: ['', Validators.required],
            location: ['', Validators.maxLength(200)],
            maxParticipants: [0, [Validators.required, Validators.min(1)]],
            pointsPerParticipant: [0, [Validators.required, Validators.min(1)]]
        });
    }
    loadEvent() {
        const id = this.route.snapshot.paramMap.get('id');
        this.eventId = id || '';
        if (!this.eventId) {
            this.router.navigate(['/admin/events']);
            return;
        }
        this.isLoading = true;
        this.eventService
            .getEventDetail(this.eventId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (event) => {
                console.log('[EventEdit] Event loaded:', event);
                this.eventDetail = event;
                this.isLoading = false;
                // Determine if this event can be edited
                if (event.status !== 'Upcoming' && event.status !== 'Live') {
                    this.errorMessage = `Cannot edit event in ${event.status} status`;
                    this.showErrorAlert = true;
                    setTimeout(() => this.router.navigate(['/admin/events', this.eventId]), 2000);
                    return;
                }
                // Determine if points are locked
                this.pointsLocked = event.status === 'Live';
                // Populate form
                this.populateForm(event);
            },
            error: (error) => {
                console.error('[EventEdit] Error loading event:', error);
                this.isLoading = false;
                this.errorMessage = 'Failed to load event. Please try again.';
                this.showErrorAlert = true;
            }
        });
    }
    populateForm(event) {
        const formValue = {
            name: event.name,
            description: event.description,
            eventDate: this.formatDateForInput(event.eventDate),
            registrationDeadline: event.registrationEndDateUtc ? this.formatDateForInput(event.registrationEndDateUtc) : '',
            location: event.location || '',
            maxParticipants: event.maxParticipants,
            totalPointsPool: event.totalPointsPool
        };
        this.form.patchValue(formValue);
        // Lock points fields if event is Live
        if (this.pointsLocked) {
            this.form.get('totalPointsPool')?.disable();
        }
    }
    formatDateForInput(dateString) {
        // Convert from ISO string to YYYY-MM-DD format
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    get f() {
        return this.form.controls;
    }
    get eventDate() {
        return this.form.get('eventDate');
    }
    get registrationDeadline() {
        return this.form.get('registrationDeadline');
    }
    get endDate() {
        return this.form.get('endDate');
    }
    /**
     * Validate that dates make sense
     */
    validateDates() {
        const eventDate = new Date(this.eventDate?.value);
        const regDeadline = new Date(this.registrationDeadline?.value);
        const endDate = new Date(this.endDate?.value);
        // Registration deadline must be before event start
        if (regDeadline >= eventDate) {
            this.errorMessage = 'Registration deadline must be before event start date';
            this.showErrorAlert = true;
            return false;
        }
        // Event end date must be after event start
        if (endDate < eventDate) {
            this.errorMessage = 'Event end date must be after event start date';
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
            registrationEndDateUtc: this.form.value.registrationDeadline,
            location: this.form.value.location || '',
            maxParticipants: this.form.value.maxParticipants,
            totalPointsPool: this.pointsLocked
                ? this.eventDetail?.totalPointsPool || 0
                : this.form.value.totalPointsPool
        };
        console.log('[EventEdit] Submitting form:', request);
        this.eventService
            .updateEvent(this.eventId, request)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: () => {
                console.log('[EventEdit] Event updated successfully');
                this.isSubmitting = false;
                // Navigate back to event detail, staying on current tab
                this.router.navigate(['/admin/events', this.eventId]);
            },
            error: (error) => {
                console.error('[EventEdit] Error updating event:', error);
                this.isSubmitting = false;
                this.errorMessage = 'Failed to update event. Please try again.';
                this.showErrorAlert = true;
            }
        });
    }
    onCancel() {
        this.router.navigate(['/admin/events', this.eventId]);
    }
    closeErrorAlert() {
        this.showErrorAlert = false;
    }
    static { this.ɵfac = function EventEditComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventEditComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.EventService), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventEditComponent, selectors: [["app-event-edit"]], decls: 12, vars: 4, consts: [[1, "event-edit-container"], [1, "page-header"], [1, "back-button"], ["type", "button", 1, "btn-back", 3, "click"], [1, "fa-solid", "fa-arrow-left"], ["class", "subtitle", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "form-card", 4, "ngIf"], [1, "subtitle"], [1, "status-badge", 3, "ngClass"], [1, "loading-state"], [1, "spinner"], [1, "alert", "alert-danger"], [1, "alert-content"], [1, "fa-solid", "fa-circle-exclamation"], [1, "alert-text"], ["type", "button", 1, "alert-close", 3, "click"], [1, "fa-solid", "fa-xmark"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "form-group"], ["for", "name", 1, "form-label"], [1, "required"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "e.g., Spring Sales Contest", 1, "form-input"], ["class", "error-text", 4, "ngIf"], ["for", "description", 1, "form-label"], ["id", "description", "formControlName", "description", "placeholder", "Describe the event purpose and key details...", "rows", "4", 1, "form-textarea"], ["for", "location", 1, "form-label"], ["id", "location", "type", "text", "formControlName", "location", "placeholder", "e.g., Conference Room A or Virtual", 1, "form-input"], [1, "form-row"], ["for", "registrationDeadline", 1, "form-label"], ["id", "registrationDeadline", "type", "date", "formControlName", "registrationDeadline", 1, "form-input"], [1, "form-hint"], ["for", "eventDate", 1, "form-label"], ["id", "eventDate", "type", "date", "formControlName", "eventDate", 1, "form-input"], ["for", "endDate", 1, "form-label"], ["id", "endDate", "type", "date", "formControlName", "endDate", 1, "form-input"], ["for", "maxParticipants", 1, "form-label"], ["id", "maxParticipants", "type", "number", "formControlName", "maxParticipants", "placeholder", "0", "min", "1", 1, "form-input"], ["for", "pointsPerParticipant", 1, "form-label"], ["class", "lock-badge", 4, "ngIf"], ["id", "pointsPerParticipant", "type", "number", "formControlName", "pointsPerParticipant", "placeholder", "0", "min", "1", 1, "form-input", 3, "disabled"], ["class", "form-hint", 4, "ngIf"], [1, "info-box"], [1, "info-row"], [1, "info-label"], [1, "info-value"], ["class", "form-section", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], [1, "error-text"], [1, "lock-badge"], [1, "fa-solid", "fa-lock"], [1, "info-box", 3, "ngClass"], [1, "fa-solid", "fa-check"], [1, "fa-solid", "fa-spinner", "fa-spin"]], template: function EventEditComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
            i0.ɵɵlistener("click", function EventEditComponent_Template_button_click_3_listener() { return ctx.onCancel(); });
            i0.ɵɵelement(4, "i", 4);
            i0.ɵɵtext(5, " Back to Event ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Edit Event");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, EventEditComponent_p_8_Template, 4, 3, "p", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, EventEditComponent_div_9_Template, 4, 0, "div", 6)(10, EventEditComponent_div_10_Template, 7, 1, "div", 7)(11, EventEditComponent_div_11_Template, 87, 29, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.eventDetail);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert && !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgIf, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, i4.DecimalPipe], styles: [".event-edit-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 2rem;\n  background-color: #f8faf9;\n  min-height: 100vh;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #2c5f3f;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  color: #234d33;\n  transform: translateX(-4px);\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.875rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n  letter-spacing: -0.02em;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #6b7280;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n\n.status-badge.status-draft[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-badge.status-active[_ngcontent-%COMP%], \n.status-badge.status-live[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-badge.status-upcoming[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-badge.status-completed[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-badge.status-cancelled[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-weight: 500;\n}\n\n.alert[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  border-radius: 8px;\n  padding: 0;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n}\n\n.alert-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n}\n\n.alert-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #dc2626;\n}\n\n.alert-text[_ngcontent-%COMP%] {\n  color: #991b1b;\n  font-weight: 500;\n  flex: 1;\n}\n\n.alert-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #dc2626;\n  cursor: pointer;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n\n.alert-close[_ngcontent-%COMP%]:hover {\n  color: #991b1b;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  padding: 2rem;\n  margin-bottom: 2rem;\n}\n\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  padding-bottom: 2rem;\n}\n\n.form-section[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n}\n\n.lock-badge[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #d97706;\n  margin-left: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: all 0.2s ease;\n  background: #ffffff;\n}\n\n.form-input[_ngcontent-%COMP%]:disabled, \n.form-textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n  border-color: #e5e7eb;\n}\n\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.form-input.is-invalid[_ngcontent-%COMP%], \n.form-textarea.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n}\n\n.form-input.is-invalid[_ngcontent-%COMP%]:focus, \n.form-textarea.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n\n.form-hint[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n  margin-top: 0.25rem;\n}\n\n.error-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #dc2626;\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n\n.info-box[_ngcontent-%COMP%] {\n  background-color: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  color: #166534;\n  font-size: 0.95rem;\n}\n\n.info-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.info-box[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.9;\n}\n\n.info-draft[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  border-color: #d1d5db;\n  color: #4b5563;\n}\n\n.info-active[_ngcontent-%COMP%], \n.info-live[_ngcontent-%COMP%] {\n  background-color: #ecfeff;\n  border-color: #67d7f0;\n  color: #0e7490;\n}\n\n.info-upcoming[_ngcontent-%COMP%] {\n  background-color: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #166534;\n}\n\n.info-completed[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  border-color: #d1d5db;\n  color: #4b5563;\n}\n\n.info-cancelled[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.info-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #2c5f3f;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #2c5f3f;\n  color: white;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #234d33;\n  box-shadow: 0 4px 8px rgba(44, 95, 63, 0.25);\n  transform: translateY(-1px);\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #e5e7eb;\n}\n\n@media (max-width: 768px) {\n  .event-edit-container[_ngcontent-%COMP%] { padding: 1rem; }\n  .form-card[_ngcontent-%COMP%] { padding: 1.5rem; }\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: 1.5rem; }\n  .subtitle[_ngcontent-%COMP%] { flex-direction: column; align-items: flex-start; }\n  .form-row[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .form-actions[_ngcontent-%COMP%] { justify-content: stretch; }\n  .form-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] { flex: 1; }\n  .info-row[_ngcontent-%COMP%] { flex-direction: column; align-items: flex-start; gap: 0.5rem; }\n}\n\n@media (max-width: 480px) {\n  .event-edit-container[_ngcontent-%COMP%] { padding: 0.5rem; }\n  .form-card[_ngcontent-%COMP%] { padding: 1rem; }\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: 1.25rem; }\n  .form-section[_ngcontent-%COMP%] { gap: 1rem; padding-bottom: 1.5rem; }\n  .alert-content[_ngcontent-%COMP%] { flex-direction: column; gap: 0.75rem; }\n  .alert-close[_ngcontent-%COMP%] { align-self: flex-start; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventEditComponent, [{
        type: Component,
        args: [{ selector: 'app-event-edit', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], template: "<div class=\"event-edit-container\">\r\n  <div class=\"page-header\">\r\n    <div class=\"back-button\">\r\n      <button type=\"button\" class=\"btn-back\" (click)=\"onCancel()\">\r\n        <i class=\"fa-solid fa-arrow-left\"></i> Back to Event\r\n      </button>\r\n    </div>\r\n    <h1>Edit Event</h1>\r\n    <p class=\"subtitle\" *ngIf=\"eventDetail\">\r\n      {{ eventDetail.name }} \u2022 Status: <span class=\"status-badge\" [ngClass]=\"'status-' + eventDetail.status.toLowerCase()\">{{ eventDetail.status }}</span>\r\n    </p>\r\n  </div>\r\n\r\n  <!-- Loading State -->\r\n  <div *ngIf=\"isLoading\" class=\"loading-state\">\r\n    <div class=\"spinner\"></div>\r\n    <p>Loading event details...</p>\r\n  </div>\r\n\r\n  <!-- Error Alert -->\r\n  <div *ngIf=\"showErrorAlert && !isLoading\" class=\"alert alert-danger\">\r\n    <div class=\"alert-content\">\r\n      <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n      <span class=\"alert-text\">{{ errorMessage }}</span>\r\n      <button type=\"button\" class=\"alert-close\" (click)=\"closeErrorAlert()\">\r\n        <i class=\"fa-solid fa-xmark\"></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Form Card -->\r\n  <div *ngIf=\"!isLoading\" class=\"form-card\">\r\n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n      <!-- Form Sections -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Details</h3>\r\n\r\n        <!-- Event Name -->\r\n        <div class=\"form-group\">\r\n          <label for=\"name\" class=\"form-label\">\r\n            Event Name <span class=\"required\">*</span>\r\n          </label>\r\n          <input\r\n            id=\"name\"\r\n            type=\"text\"\r\n            class=\"form-input\"\r\n            formControlName=\"name\"\r\n            placeholder=\"e.g., Spring Sales Contest\"\r\n            [class.is-invalid]=\"f['name'].invalid && f['name'].touched\"\r\n          />\r\n          <div *ngIf=\"f['name'].invalid && f['name'].touched\" class=\"error-text\">\r\n            <span *ngIf=\"f['name'].hasError('required')\">Event name is required</span>\r\n            <span *ngIf=\"f['name'].hasError('minlength')\">Minimum 3 characters</span>\r\n            <span *ngIf=\"f['name'].hasError('maxlength')\">Maximum 100 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Description -->\r\n        <div class=\"form-group\">\r\n          <label for=\"description\" class=\"form-label\">\r\n            Description <span class=\"required\">*</span>\r\n          </label>\r\n          <textarea\r\n            id=\"description\"\r\n            class=\"form-textarea\"\r\n            formControlName=\"description\"\r\n            placeholder=\"Describe the event purpose and key details...\"\r\n            rows=\"4\"\r\n            [class.is-invalid]=\"f['description'].invalid && f['description'].touched\"\r\n          ></textarea>\r\n          <div *ngIf=\"f['description'].invalid && f['description'].touched\" class=\"error-text\">\r\n            <span *ngIf=\"f['description'].hasError('required')\">Description is required</span>\r\n            <span *ngIf=\"f['description'].hasError('minlength')\">Minimum 10 characters</span>\r\n            <span *ngIf=\"f['description'].hasError('maxlength')\">Maximum 500 characters</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Location -->\r\n        <div class=\"form-group\">\r\n          <label for=\"location\" class=\"form-label\">Location</label>\r\n          <input\r\n            id=\"location\"\r\n            type=\"text\"\r\n            class=\"form-input\"\r\n            formControlName=\"location\"\r\n            placeholder=\"e.g., Conference Room A or Virtual\"\r\n          />\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Date & Time Section -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Event Timeline</h3>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Registration Deadline -->\r\n          <div class=\"form-group\">\r\n            <label for=\"registrationDeadline\" class=\"form-label\">\r\n              Registration Deadline <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"registrationDeadline\"\r\n              type=\"date\"\r\n              class=\"form-input\"\r\n              formControlName=\"registrationDeadline\"\r\n              [class.is-invalid]=\"f['registrationDeadline'].invalid && f['registrationDeadline'].touched\"\r\n            />\r\n            <small class=\"form-hint\">Registrations close on this date</small>\r\n          </div>\r\n\r\n          <!-- Event Start Date -->\r\n          <div class=\"form-group\">\r\n            <label for=\"eventDate\" class=\"form-label\">\r\n              Event Start Date <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"eventDate\"\r\n              type=\"date\"\r\n              class=\"form-input\"\r\n              formControlName=\"eventDate\"\r\n              [class.is-invalid]=\"f['eventDate'].invalid && f['eventDate'].touched\"\r\n            />\r\n            <small class=\"form-hint\">When the event begins</small>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Event End Date -->\r\n        <div class=\"form-group\">\r\n          <label for=\"endDate\" class=\"form-label\">\r\n            Event End Date <span class=\"required\">*</span>\r\n          </label>\r\n          <input\r\n            id=\"endDate\"\r\n            type=\"date\"\r\n            class=\"form-input\"\r\n            formControlName=\"endDate\"\r\n            [class.is-invalid]=\"f['endDate'].invalid && f['endDate'].touched\"\r\n          />\r\n          <small class=\"form-hint\">When the event concludes</small>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Points & Participants Section -->\r\n      <div class=\"form-section\">\r\n        <h3 class=\"section-title\">Participants & Points</h3>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Max Participants -->\r\n          <div class=\"form-group\">\r\n            <label for=\"maxParticipants\" class=\"form-label\">\r\n              Max Participants <span class=\"required\">*</span>\r\n            </label>\r\n            <input\r\n              id=\"maxParticipants\"\r\n              type=\"number\"\r\n              class=\"form-input\"\r\n              formControlName=\"maxParticipants\"\r\n              placeholder=\"0\"\r\n              min=\"1\"\r\n              [class.is-invalid]=\"f['maxParticipants'].invalid && f['maxParticipants'].touched\"\r\n            />\r\n            <small class=\"form-hint\">Maximum number of event participants</small>\r\n          </div>\r\n\r\n          <!-- Points Per Participant -->\r\n          <div class=\"form-group\">\r\n            <label for=\"pointsPerParticipant\" class=\"form-label\">\r\n              Points Per Participant <span class=\"required\">*</span>\r\n              <span *ngIf=\"pointsLocked\" class=\"lock-badge\"><i class=\"fa-solid fa-lock\"></i> Locked</span>\r\n            </label>\r\n            <input\r\n              id=\"pointsPerParticipant\"\r\n              type=\"number\"\r\n              class=\"form-input\"\r\n              formControlName=\"pointsPerParticipant\"\r\n              placeholder=\"0\"\r\n              min=\"1\"\r\n              [disabled]=\"pointsLocked\"\r\n              [class.is-invalid]=\"f['pointsPerParticipant'].invalid && f['pointsPerParticipant'].touched\"\r\n            />\r\n            <small class=\"form-hint\" *ngIf=\"pointsLocked\">\r\n              Points are locked when event is Active\r\n            </small>\r\n            <small class=\"form-hint\" *ngIf=\"!pointsLocked\">\r\n              Points per participant (editable only in Draft)\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Calculated Total Points -->\r\n        <div class=\"info-box\">\r\n          <div class=\"info-row\">\r\n            <span class=\"info-label\">Estimated Total Points Pool:</span>\r\n            <span class=\"info-value\">\r\n              {{ (f['maxParticipants'].value || 0) * (f['pointsPerParticipant'].value || 0)\r\n              | number }}\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Status Info -->\r\n      <div class=\"form-section\" *ngIf=\"eventDetail\">\r\n        <h3 class=\"section-title\">Event Status</h3>\r\n        <div class=\"info-box\" [ngClass]=\"'info-' + eventDetail.status.toLowerCase()\">\r\n          <strong>Current Status:</strong> {{ eventDetail.status }}\r\n          <small *ngIf=\"eventDetail.status === 'Draft'\">\r\n            This event is in draft status and can be edited freely before activation.\r\n          </small>\r\n          <small *ngIf=\"eventDetail.status === 'Active'\">\r\n            This event is active. Some fields like points are locked and cannot be changed.\r\n          </small>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Form Actions -->\r\n      <div class=\"form-actions\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\" [disabled]=\"isSubmitting\">\r\n          <i class=\"fa-solid fa-xmark\"></i> Cancel\r\n        </button>\r\n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!form.valid || isSubmitting\">\r\n          <ng-container *ngIf=\"!isSubmitting\">\r\n            <i class=\"fa-solid fa-check\"></i> Save Changes\r\n          </ng-container>\r\n          <ng-container *ngIf=\"isSubmitting\">\r\n            <i class=\"fa-solid fa-spinner fa-spin\"></i> Saving...\r\n          </ng-container>\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n", styles: [".event-edit-container {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 2rem;\n  background-color: #f8faf9;\n  min-height: 100vh;\n}\n\n.page-header {\n  margin-bottom: 2rem;\n}\n\n.back-button {\n  margin-bottom: 1rem;\n}\n\n.btn-back {\n  background: none;\n  border: none;\n  color: #2c5f3f;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.btn-back:hover {\n  color: #234d33;\n  transform: translateX(-4px);\n}\n\n.page-header h1 {\n  font-size: 1.875rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n  letter-spacing: -0.02em;\n}\n\n.subtitle {\n  font-size: 0.95rem;\n  color: #6b7280;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n\n.status-badge.status-draft {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-badge.status-active,\n.status-badge.status-live {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-badge.status-upcoming {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-badge.status-completed {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-badge.status-cancelled {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-state p {\n  color: #6b7280;\n  font-weight: 500;\n}\n\n.alert {\n  margin-bottom: 1.5rem;\n  border-radius: 8px;\n  padding: 0;\n  overflow: hidden;\n  animation: slideDown 0.3s ease;\n}\n\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-danger {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n}\n\n.alert-content {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n}\n\n.alert-content i {\n  font-size: 1.1rem;\n  color: #dc2626;\n}\n\n.alert-text {\n  color: #991b1b;\n  font-weight: 500;\n  flex: 1;\n}\n\n.alert-close {\n  background: none;\n  border: none;\n  color: #dc2626;\n  cursor: pointer;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n\n.alert-close:hover {\n  color: #991b1b;\n}\n\n.form-card {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  padding: 2rem;\n  margin-bottom: 2rem;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n.form-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  padding-bottom: 2rem;\n}\n\n.form-section:last-of-type {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.section-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n\n.form-label {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.required {\n  color: #dc2626;\n  font-weight: bold;\n}\n\n.lock-badge {\n  font-size: 0.8rem;\n  color: #d97706;\n  margin-left: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n\n.form-input,\n.form-textarea {\n  padding: 0.75rem 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: all 0.2s ease;\n  background: #ffffff;\n}\n\n.form-input:disabled,\n.form-textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n  border-color: #e5e7eb;\n}\n\n.form-input:focus,\n.form-textarea:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.form-input.is-invalid,\n.form-textarea.is-invalid {\n  border-color: #dc2626;\n}\n\n.form-input.is-invalid:focus,\n.form-textarea.is-invalid:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n\n.form-textarea {\n  resize: vertical;\n  min-height: 100px;\n}\n\n.form-hint {\n  font-size: 0.85rem;\n  color: #6b7280;\n  margin-top: 0.25rem;\n}\n\n.error-text {\n  font-size: 0.85rem;\n  color: #dc2626;\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n\n.info-box {\n  background-color: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  color: #166534;\n  font-size: 0.95rem;\n}\n\n.info-box strong {\n  font-weight: 600;\n}\n\n.info-box small {\n  font-size: 0.85rem;\n  opacity: 0.9;\n}\n\n.info-draft {\n  background-color: #f3f4f6;\n  border-color: #d1d5db;\n  color: #4b5563;\n}\n\n.info-active,\n.info-live {\n  background-color: #ecfeff;\n  border-color: #67d7f0;\n  color: #0e7490;\n}\n\n.info-upcoming {\n  background-color: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #166534;\n}\n\n.info-completed {\n  background-color: #f3f4f6;\n  border-color: #d1d5db;\n  color: #4b5563;\n}\n\n.info-cancelled {\n  background-color: #fee2e2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n\n.info-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.info-label {\n  font-weight: 500;\n}\n\n.info-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #2c5f3f;\n}\n\n.form-actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n\n.btn {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.btn-primary {\n  background-color: #2c5f3f;\n  color: white;\n}\n\n.btn-primary:hover:not(:disabled) {\n  background-color: #234d33;\n  box-shadow: 0 4px 8px rgba(44, 95, 63, 0.25);\n  transform: translateY(-1px);\n}\n\n.btn-secondary {\n  background-color: #f3f4f6;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n}\n\n.btn-secondary:hover:not(:disabled) {\n  background-color: #e5e7eb;\n}\n\n@media (max-width: 768px) {\n  .event-edit-container { padding: 1rem; }\n  .form-card { padding: 1.5rem; }\n  .page-header h1 { font-size: 1.5rem; }\n  .subtitle { flex-direction: column; align-items: flex-start; }\n  .form-row { grid-template-columns: 1fr; }\n  .form-actions { justify-content: stretch; }\n  .form-actions .btn { flex: 1; }\n  .info-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }\n}\n\n@media (max-width: 480px) {\n  .event-edit-container { padding: 0.5rem; }\n  .form-card { padding: 1rem; }\n  .page-header h1 { font-size: 1.25rem; }\n  .form-section { gap: 1rem; padding-bottom: 1.5rem; }\n  .alert-content { flex-direction: column; gap: 0.75rem; }\n  .alert-close { align-self: flex-start; }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.EventService }, { type: i3.ActivatedRoute }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventEditComponent, { className: "EventEditComponent", filePath: "src/app/pages/admin/events/event-edit.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=event-edit.component.js.map