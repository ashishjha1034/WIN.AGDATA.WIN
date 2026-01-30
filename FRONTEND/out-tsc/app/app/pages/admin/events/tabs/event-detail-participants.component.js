import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/event.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function EventDetailParticipantsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 19);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_1_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismissSuccess()); });
    i0.ɵɵelement(4, "i", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
function EventDetailParticipantsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 19);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismissError()); });
    i0.ɵɵelement(4, "i", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function EventDetailParticipantsComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵlistener("clickOutside", function EventDetailParticipantsComponent_div_13_Template_div_clickOutside_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeFilterDropdown()); });
    i0.ɵɵelementStart(1, "button", 23);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_13_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("All")); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 23);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_13_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("Registered")); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 23);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_13_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("Checked-In")); });
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.statusFilter === "All");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" All (", ctx_r1.participants.length, ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.statusFilter === "Registered");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Registered (", ctx_r1.getRegisteredCount(), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.statusFilter === "Checked-In");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Checked-In (", ctx_r1.getCheckedInCount(), ") ");
} }
function EventDetailParticipantsComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "div", 25);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading participants...");
    i0.ɵɵelementEnd()();
} }
function EventDetailParticipantsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "p");
    i0.ɵɵtext(2, "No participants found");
    i0.ɵɵelementEnd()();
} }
function EventDetailParticipantsComponent_table_17_tr_14_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42);
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵelementEnd();
} }
function EventDetailParticipantsComponent_table_17_tr_14_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵelementEnd();
} }
function EventDetailParticipantsComponent_table_17_tr_14_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 20);
    i0.ɵɵelementEnd();
} }
function EventDetailParticipantsComponent_table_17_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 34)(1, "td", 28);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 30);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 31)(8, "label", 35)(9, "input", 36);
    i0.ɵɵlistener("change", function EventDetailParticipantsComponent_table_17_tr_14_Template_input_change_9_listener() { const participant_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleAttendance(participant_r6)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "span", 37);
    i0.ɵɵelementStart(11, "span", 38);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, EventDetailParticipantsComponent_table_17_tr_14_span_13_Template, 2, 0, "span", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 32)(15, "button", 40);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_table_17_tr_14_Template_button_click_15_listener() { const participant_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteParticipant(participant_r6)); });
    i0.ɵɵtemplate(16, EventDetailParticipantsComponent_table_17_tr_14_span_16_Template, 2, 0, "span", 41)(17, EventDetailParticipantsComponent_table_17_tr_14_span_17_Template, 2, 0, "span", 41);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const participant_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(participant_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(participant_r6.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(participant_r6.employeeId);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("disabled", !ctx_r1.canToggleStatus(participant_r6));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.isCheckedIn(participant_r6))("disabled", !ctx_r1.canToggleStatus(participant_r6));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isCheckedIn(participant_r6) ? "Checked-In" : "Registered", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.togglingParticipantId === participant_r6.userId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canDelete(participant_r6) || ctx_r1.deletingParticipantId === participant_r6.userId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.deletingParticipantId === participant_r6.userId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.deletingParticipantId !== participant_r6.userId);
} }
function EventDetailParticipantsComponent_table_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 27)(1, "thead")(2, "tr")(3, "th", 28);
    i0.ɵɵtext(4, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 29);
    i0.ɵɵtext(6, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 30);
    i0.ɵɵtext(8, "Employee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 31);
    i0.ɵɵtext(10, "Attendance Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 32);
    i0.ɵɵtext(12, "Delete");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, EventDetailParticipantsComponent_table_17_tr_14_Template, 18, 12, "tr", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r1.getPaginatedParticipants());
} }
function EventDetailParticipantsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44)(1, "span", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 46)(4, "button", 47);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_18_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.currentPage = ctx_r1.currentPage - 1; return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelement(5, "i", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 49);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 47);
    i0.ɵɵlistener("click", function EventDetailParticipantsComponent_div_18_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.currentPage = ctx_r1.currentPage + 1; return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelement(9, "i", 50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" Showing ", (ctx_r1.currentPage - 1) * ctx_r1.pageSize + 1, " to ", ctx_r1.Math.min(ctx_r1.currentPage * ctx_r1.pageSize, ctx_r1.filteredParticipants.length), " of ", ctx_r1.filteredParticipants.length, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.currentPage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage >= ctx_r1.getTotalPages());
} }
export class EventDetailParticipantsComponent {
    constructor(eventService) {
        this.eventService = eventService;
        // Expose Math to template
        this.Math = Math;
        this.eventId = '';
        this.event = null;
        this.participantsChanged = new EventEmitter();
        this.participants = [];
        this.filteredParticipants = [];
        this.isLoading = false;
        this.searchText = '';
        this.statusFilter = 'All';
        this.showFilterDropdown = false;
        this.currentPage = 1;
        this.pageSize = 10;
        this.errorMessage = '';
        this.successMessage = '';
        // For toggle operations
        this.togglingParticipantId = null;
        this.deletingParticipantId = null;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadParticipants();
    }
    ngOnChanges(changes) {
        if (changes['eventId'] && changes['eventId'].currentValue) {
            this.loadParticipants();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadParticipants() {
        if (!this.eventId)
            return;
        this.isLoading = true;
        this.errorMessage = '';
        this.eventService.getEventParticipants(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
            .subscribe({
            next: (data) => {
                console.log('[Participants] Loaded:', data.length);
                this.participants = data;
                this.applyFilters();
            },
            error: (error) => {
                console.error('[Participants] Error loading:', error);
                this.errorMessage = 'Failed to load participant data';
            }
        });
    }
    applyFilters() {
        let filtered = [...this.participants];
        // Filter by status
        if (this.statusFilter === 'Registered') {
            filtered = filtered.filter(p => p.attendanceStatus === 'Registered');
        }
        else if (this.statusFilter === 'Checked-In') {
            filtered = filtered.filter(p => p.attendanceStatus === 'Attended');
        }
        // Filter by search text
        if (this.searchText) {
            const search = this.searchText.toLowerCase();
            filtered = filtered.filter(p => p.name?.toLowerCase().includes(search) ||
                p.employeeId?.toLowerCase().includes(search) ||
                p.email?.toLowerCase().includes(search));
        }
        this.filteredParticipants = filtered;
        // Reset page if needed
        if (this.currentPage > this.getTotalPages()) {
            this.currentPage = 1;
        }
    }
    onSearch(text) {
        this.searchText = text;
        this.currentPage = 1;
        this.applyFilters();
    }
    onFilterChange(filter) {
        this.statusFilter = filter;
        this.showFilterDropdown = false;
        this.currentPage = 1;
        this.applyFilters();
    }
    toggleFilterDropdown() {
        this.showFilterDropdown = !this.showFilterDropdown;
    }
    closeFilterDropdown() {
        this.showFilterDropdown = false;
    }
    /**
     * Toggle attendance status for a participant (check-in)
     */
    toggleAttendance(participant) {
        if (!this.eventId || !this.canToggleStatus(participant))
            return;
        // If registered, check them in
        if (participant.attendanceStatus === 'Registered') {
            this.checkInParticipant(participant);
        }
    }
    checkInParticipant(participant) {
        this.togglingParticipantId = participant.userId;
        this.errorMessage = '';
        this.eventService.checkInParticipant(this.eventId, participant.userId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.togglingParticipantId = null)))
            .subscribe({
            next: () => {
                console.log('[Participants] Check-in successful');
                participant.attendanceStatus = 'Attended';
                participant.checkedInAt = new Date().toISOString();
                this.successMessage = `${participant.name} checked in successfully`;
                this.applyFilters();
                this.participantsChanged.emit();
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (error) => {
                console.error('[Participants] Check-in error:', error);
                this.errorMessage = error?.error?.message || 'Failed to check in participant';
            }
        });
    }
    /**
     * Delete participant from event
     */
    deleteParticipant(participant) {
        if (!this.eventId || !this.canDelete(participant))
            return;
        if (!confirm(`Remove ${participant.name} from this event?`))
            return;
        this.deletingParticipantId = participant.userId;
        this.errorMessage = '';
        this.eventService.removeParticipant(this.eventId, participant.userId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.deletingParticipantId = null)))
            .subscribe({
            next: () => {
                console.log('[Participants] Removed successfully');
                this.participants = this.participants.filter(p => p.userId !== participant.userId);
                this.applyFilters();
                this.successMessage = `${participant.name} removed from event`;
                this.participantsChanged.emit();
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (error) => {
                console.error('[Participants] Remove error:', error);
                this.errorMessage = error?.error?.message || 'Failed to remove participant';
            }
        });
    }
    /**
     * Can toggle status? Only for Live events and non-awarded participants
     */
    canToggleStatus(participant) {
        // Event must be Live
        if (this.event?.status !== 'Live')
            return false;
        // Cannot toggle if points awarded
        if (participant.pointsAwarded && participant.pointsAwarded > 0)
            return false;
        // Can only toggle from Registered to Checked-In
        return participant.attendanceStatus === 'Registered';
    }
    /**
     * Can delete participant? Only if not awarded points
     */
    canDelete(participant) {
        // Cannot delete from completed events
        if (this.event?.status === 'Completed')
            return false;
        // Cannot delete if points awarded
        return !(participant.pointsAwarded && participant.pointsAwarded > 0);
    }
    /**
     * Get display status
     */
    getDisplayStatus(status) {
        return status === 'Attended' ? 'Checked-In' : status;
    }
    /**
     * Is checked in?
     */
    isCheckedIn(participant) {
        return participant.attendanceStatus === 'Attended';
    }
    /**
     * Get paginated participants
     */
    getPaginatedParticipants() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredParticipants.slice(start, start + this.pageSize);
    }
    getTotalPages() {
        return Math.ceil(this.filteredParticipants.length / this.pageSize) || 1;
    }
    getRegisteredCount() {
        return this.participants.filter(p => p.attendanceStatus === 'Registered').length;
    }
    getCheckedInCount() {
        return this.participants.filter(p => p.attendanceStatus === 'Attended').length;
    }
    dismissError() {
        this.errorMessage = '';
    }
    dismissSuccess() {
        this.successMessage = '';
    }
    static { this.ɵfac = function EventDetailParticipantsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventDetailParticipantsComponent)(i0.ɵɵdirectiveInject(i1.EventService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventDetailParticipantsComponent, selectors: [["app-event-detail-participants"]], inputs: { eventId: "eventId", event: "event" }, outputs: { participantsChanged: "participantsChanged" }, features: [i0.ɵɵNgOnChangesFeature], decls: 19, vars: 9, consts: [[1, "participants-content"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], [1, "filter-bar"], [1, "search-box"], ["type", "text", "placeholder", "Search by name, email, or employee ID...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "search-icon"], [1, "fa-solid", "fa-magnifying-glass"], [1, "filter-dropdown-container"], [1, "btn", "btn-filter", 3, "click"], [1, "filter-icon"], [1, "fa-solid", "fa-filter"], ["class", "filter-dropdown", 3, "clickOutside", 4, "ngIf"], [1, "table-container"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "participants-table", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], [1, "alert", "alert-success"], ["type", "button", 1, "alert-close", 3, "click"], [1, "fa-solid", "fa-xmark"], [1, "alert", "alert-danger"], [1, "filter-dropdown", 3, "clickOutside"], [1, "dropdown-item", 3, "click"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "participants-table"], [1, "col-name"], [1, "col-email"], [1, "col-employee-id"], [1, "col-status"], [1, "col-delete"], ["class", "table-row", 4, "ngFor", "ngForOf"], [1, "table-row"], [1, "toggle-switch"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "toggle-slider"], [1, "toggle-label"], ["class", "toggle-loading", 4, "ngIf"], ["title", "Remove participant", 1, "btn-delete", 3, "click", "disabled"], [4, "ngIf"], [1, "toggle-loading"], [1, "fa-solid", "fa-spinner", "fa-spin"], [1, "pagination"], [1, "pagination-info"], [1, "pagination-controls"], [1, "btn-page", 3, "click", "disabled"], [1, "fa-solid", "fa-chevron-left"], [1, "page-number"], [1, "fa-solid", "fa-chevron-right"]], template: function EventDetailParticipantsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, EventDetailParticipantsComponent_div_1_Template, 5, 1, "div", 1)(2, EventDetailParticipantsComponent_div_2_Template, 5, 1, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function EventDetailParticipantsComponent_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event); return $event; });
            i0.ɵɵlistener("input", function EventDetailParticipantsComponent_Template_input_input_5_listener() { return ctx.onSearch(ctx.searchText); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 6);
            i0.ɵɵelement(7, "i", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 8)(9, "button", 9);
            i0.ɵɵlistener("click", function EventDetailParticipantsComponent_Template_button_click_9_listener() { return ctx.toggleFilterDropdown(); });
            i0.ɵɵelementStart(10, "span", 10);
            i0.ɵɵelement(11, "i", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, EventDetailParticipantsComponent_div_13_Template, 7, 9, "div", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 13);
            i0.ɵɵtemplate(15, EventDetailParticipantsComponent_div_15_Template, 4, 0, "div", 14)(16, EventDetailParticipantsComponent_div_16_Template, 3, 0, "div", 15)(17, EventDetailParticipantsComponent_table_17_Template, 15, 1, "table", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, EventDetailParticipantsComponent_div_18_Template, 10, 6, "div", 17);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchText);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" Filter: ", ctx.statusFilter, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showFilterDropdown);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredParticipants.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredParticipants.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredParticipants.length > 0);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, FormsModule, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel], styles: [".participants-content[_ngcontent-%COMP%] { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }\n\n.alert[_ngcontent-%COMP%] { padding: 1rem 1.25rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; animation: _ngcontent-%COMP%_slideIn 0.3s ease-out; }\n\n@keyframes _ngcontent-%COMP%_slideIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.alert-success[_ngcontent-%COMP%] { background-color: var(--ag-tag-green-bg); border: 1px solid var(--ag-color-support-success); color: var(--ag-tag-green-text); }\n.alert-danger[_ngcontent-%COMP%] { background-color: var(--ag-tag-red-bg); border: 1px solid var(--ag-color-support-error); color: var(--ag-color-support-error); }\n.alert-close[_ngcontent-%COMP%] { background: none; border: none; cursor: pointer; font-size: 1rem; color: inherit; opacity: 0.7; }\n.alert-close[_ngcontent-%COMP%]:hover { opacity: 1; }\n\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  padding: 1rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n\n.search-box[_ngcontent-%COMP%] { position: relative; flex: 1; min-width: 250px; }\n\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 2.5rem 0.75rem 1rem;\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 6px;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.search-input[_ngcontent-%COMP%]:focus { outline: none; border-color: var(--ag-button-primary); box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1); }\n.search-icon[_ngcontent-%COMP%] { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--ag-color-text-secondary); pointer-events: none; }\n\n.filter-dropdown-container[_ngcontent-%COMP%] { position: relative; }\n\n.btn-filter[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  background-color: var(--ag-color-layer-01);\n  color: var(--ag-color-text-primary);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-filter[_ngcontent-%COMP%]:hover { border-color: var(--ag-button-primary); background-color: var(--ag-color-field-01); }\n.filter-icon[_ngcontent-%COMP%] { font-size: 0.75rem; }\n\n.filter-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  margin-top: 0.5rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  min-width: 180px;\n  overflow: hidden;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  text-align: left;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 0.95rem;\n  color: var(--ag-color-text-primary);\n  transition: background-color 0.2s ease-in-out;\n}\n\n.dropdown-item[_ngcontent-%COMP%]:hover { background-color: var(--ag-color-field-01); }\n.dropdown-item.active[_ngcontent-%COMP%] { background-color: var(--ag-button-primary); color: white; font-weight: 600; }\n\n.table-container[_ngcontent-%COMP%] { position: relative; border: 1px solid var(--ag-color-border-subtle); border-radius: 8px; overflow: hidden; }\n\n.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] { padding: 3rem; text-align: center; color: var(--ag-color-text-secondary); background-color: var(--ag-color-layer-01); }\n\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--ag-color-border-subtle);\n  border-top-color: var(--ag-button-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin: 0 auto 1rem;\n}\n\n@keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }\n\n.participants-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; background-color: var(--ag-color-layer-01); font-size: 0.95rem; }\n.participants-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] { background-color: var(--ag-color-field-01); border-bottom: 2px solid var(--ag-color-border-subtle); position: sticky; top: 0; }\n.participants-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { padding: 1rem 0.75rem; text-align: left; font-weight: 600; color: var(--ag-color-text-primary); white-space: nowrap; }\n.participants-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] { border-bottom: 1px solid var(--ag-color-border-subtle); transition: all 0.2s ease-in-out; }\n.participants-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover { background-color: var(--ag-color-field-01); }\n.participants-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 1rem 0.75rem; vertical-align: middle; }\n\n.col-name[_ngcontent-%COMP%] { width: 22%; min-width: 150px; }\n.col-email[_ngcontent-%COMP%] { width: 28%; min-width: 200px; }\n.col-employee-id[_ngcontent-%COMP%] { width: 15%; }\n.col-status[_ngcontent-%COMP%] { width: 25%; }\n.col-delete[_ngcontent-%COMP%] { width: 10%; text-align: center; }\n\n.toggle-switch[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none; }\n.toggle-switch.disabled[_ngcontent-%COMP%] { cursor: not-allowed; opacity: 0.6; }\n.toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { display: none; }\n\n.toggle-slider[_ngcontent-%COMP%] {\n  position: relative;\n  width: 48px;\n  height: 26px;\n  background-color: var(--ag-color-border-subtle);\n  border-radius: 999px;\n  transition: background-color 0.3s ease-in-out;\n}\n\n.toggle-slider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 20px;\n  height: 20px;\n  background-color: white;\n  border-radius: 50%;\n  transition: transform 0.3s ease-in-out;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .toggle-slider[_ngcontent-%COMP%] { background-color: var(--ag-button-primary); }\n.toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .toggle-slider[_ngcontent-%COMP%]::after { transform: translateX(22px); }\n.toggle-label[_ngcontent-%COMP%] { font-size: 0.9rem; font-weight: 500; color: var(--ag-color-text-primary); }\n.toggle-loading[_ngcontent-%COMP%] { font-size: 0.85rem; }\n\n.btn-delete[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background-color: var(--ag-tag-red-bg);\n  border: 1px solid var(--ag-color-support-error);\n  color: var(--ag-color-support-error);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-delete[_ngcontent-%COMP%]:hover:not(:disabled) { background-color: var(--ag-color-support-error); color: white; border-color: var(--ag-color-support-error); }\n.btn-delete[_ngcontent-%COMP%]:disabled { opacity: 0.4; cursor: not-allowed; }\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-top: none;\n  border-radius: 0 0 8px 8px;\n}\n\n.pagination-info[_ngcontent-%COMP%] { font-size: 0.9rem; color: var(--ag-color-text-secondary); }\n.pagination-controls[_ngcontent-%COMP%] { display: flex; gap: 0.5rem; align-items: center; }\n\n.btn-page[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-page[_ngcontent-%COMP%]:hover:not(:disabled) { background-color: var(--ag-button-primary); color: white; border-color: var(--ag-button-primary); }\n.btn-page[_ngcontent-%COMP%]:disabled { opacity: 0.5; cursor: not-allowed; }\n.page-number[_ngcontent-%COMP%] { min-width: 40px; text-align: center; font-weight: 600; color: var(--ag-color-text-primary); }\n\n@media (max-width: 1024px) { .col-email[_ngcontent-%COMP%] { display: none; } }\n\n@media (max-width: 768px) {\n  .participants-content[_ngcontent-%COMP%] { padding: 1rem; }\n  .filter-bar[_ngcontent-%COMP%] { flex-direction: column; }\n  .search-box[_ngcontent-%COMP%] { width: 100%; }\n  .filter-dropdown-container[_ngcontent-%COMP%] { width: 100%; }\n  .btn-filter[_ngcontent-%COMP%] { width: 100%; justify-content: center; }\n  .col-employee-id[_ngcontent-%COMP%], .col-email[_ngcontent-%COMP%] { display: none; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventDetailParticipantsComponent, [{
        type: Component,
        args: [{ selector: 'app-event-detail-participants', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"participants-content\">\r\n  <!-- Success Message -->\r\n  <div *ngIf=\"successMessage\" class=\"alert alert-success\">\r\n    <span>{{ successMessage }}</span>\r\n    <button type=\"button\" class=\"alert-close\" (click)=\"dismissSuccess()\"><i class=\"fa-solid fa-xmark\"></i></button>\r\n  </div>\r\n\r\n  <!-- Error Message -->\r\n  <div *ngIf=\"errorMessage\" class=\"alert alert-danger\">\r\n    <span>{{ errorMessage }}</span>\r\n    <button type=\"button\" class=\"alert-close\" (click)=\"dismissError()\"><i class=\"fa-solid fa-xmark\"></i></button>\r\n  </div>\r\n\r\n  <!-- Filter Bar: Search + Filter Button -->\r\n  <div class=\"filter-bar\">\r\n    <div class=\"search-box\">\r\n      <input \r\n        type=\"text\" \r\n        placeholder=\"Search by name, email, or employee ID...\"\r\n        [(ngModel)]=\"searchText\"\r\n        (input)=\"onSearch(searchText)\"\r\n        class=\"search-input\"\r\n      />\r\n      <span class=\"search-icon\"><i class=\"fa-solid fa-magnifying-glass\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"filter-dropdown-container\">\r\n      <button class=\"btn btn-filter\" (click)=\"toggleFilterDropdown()\">\r\n        <span class=\"filter-icon\"><i class=\"fa-solid fa-filter\"></i></span>\r\n        Filter: {{ statusFilter }}\r\n      </button>\r\n      <div class=\"filter-dropdown\" *ngIf=\"showFilterDropdown\" (clickOutside)=\"closeFilterDropdown()\">\r\n        <button \r\n          class=\"dropdown-item\"\r\n          [class.active]=\"statusFilter === 'All'\"\r\n          (click)=\"onFilterChange('All')\"\r\n        >\r\n          All ({{ participants.length }})\r\n        </button>\r\n        <button \r\n          class=\"dropdown-item\"\r\n          [class.active]=\"statusFilter === 'Registered'\"\r\n          (click)=\"onFilterChange('Registered')\"\r\n        >\r\n          Registered ({{ getRegisteredCount() }})\r\n        </button>\r\n        <button \r\n          class=\"dropdown-item\"\r\n          [class.active]=\"statusFilter === 'Checked-In'\"\r\n          (click)=\"onFilterChange('Checked-In')\"\r\n        >\r\n          Checked-In ({{ getCheckedInCount() }})\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Table Container -->\r\n  <div class=\"table-container\">\r\n    <div *ngIf=\"isLoading\" class=\"loading-state\">\r\n      <div class=\"spinner\"></div>\r\n      <p>Loading participants...</p>\r\n    </div>\r\n\r\n    <div *ngIf=\"!isLoading && filteredParticipants.length === 0\" class=\"empty-state\">\r\n      <p>No participants found</p>\r\n    </div>\r\n\r\n    <table class=\"participants-table\" *ngIf=\"!isLoading && filteredParticipants.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th class=\"col-name\">Name</th>\r\n          <th class=\"col-email\">Email</th>\r\n          <th class=\"col-employee-id\">Employee ID</th>\r\n          <th class=\"col-status\">Attendance Status</th>\r\n          <th class=\"col-delete\">Delete</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let participant of getPaginatedParticipants()\" class=\"table-row\">\r\n          <td class=\"col-name\">{{ participant.name }}</td>\r\n          <td class=\"col-email\">{{ participant.email }}</td>\r\n          <td class=\"col-employee-id\">{{ participant.employeeId }}</td>\r\n          <td class=\"col-status\">\r\n            <label class=\"toggle-switch\" [class.disabled]=\"!canToggleStatus(participant)\">\r\n              <input \r\n                type=\"checkbox\" \r\n                [checked]=\"isCheckedIn(participant)\"\r\n                [disabled]=\"!canToggleStatus(participant)\"\r\n                (change)=\"toggleAttendance(participant)\"\r\n              />\r\n              <span class=\"toggle-slider\"></span>\r\n              <span class=\"toggle-label\">\r\n                {{ isCheckedIn(participant) ? 'Checked-In' : 'Registered' }}\r\n              </span>\r\n              <span class=\"toggle-loading\" *ngIf=\"togglingParticipantId === participant.userId\"><i class=\"fa-solid fa-spinner fa-spin\"></i></span>\r\n            </label>\r\n          </td>\r\n          <td class=\"col-delete\">\r\n            <button \r\n              class=\"btn-delete\"\r\n              (click)=\"deleteParticipant(participant)\"\r\n              [disabled]=\"!canDelete(participant) || deletingParticipantId === participant.userId\"\r\n              title=\"Remove participant\"\r\n            >\r\n              <span *ngIf=\"deletingParticipantId === participant.userId\"><i class=\"fa-solid fa-spinner fa-spin\"></i></span>\r\n              <span *ngIf=\"deletingParticipantId !== participant.userId\"><i class=\"fa-solid fa-xmark\"></i></span>\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <!-- Pagination -->\r\n  <div class=\"pagination\" *ngIf=\"!isLoading && filteredParticipants.length > 0\">\r\n    <span class=\"pagination-info\">\r\n      Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, filteredParticipants.length) }} of {{ filteredParticipants.length }}\r\n    </span>\r\n    <div class=\"pagination-controls\">\r\n      <button \r\n        class=\"btn-page\"\r\n        [disabled]=\"currentPage === 1\"\r\n        (click)=\"currentPage = currentPage - 1; applyFilters()\"\r\n      >\r\n        <i class=\"fa-solid fa-chevron-left\"></i>\r\n      </button>\r\n      <span class=\"page-number\">{{ currentPage }}</span>\r\n      <button \r\n        class=\"btn-page\"\r\n        [disabled]=\"currentPage >= getTotalPages()\"\r\n        (click)=\"currentPage = currentPage + 1; applyFilters()\"\r\n      >\r\n        <i class=\"fa-solid fa-chevron-right\"></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".participants-content { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }\n\n.alert { padding: 1rem 1.25rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; animation: slideIn 0.3s ease-out; }\n\n@keyframes slideIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.alert-success { background-color: var(--ag-tag-green-bg); border: 1px solid var(--ag-color-support-success); color: var(--ag-tag-green-text); }\n.alert-danger { background-color: var(--ag-tag-red-bg); border: 1px solid var(--ag-color-support-error); color: var(--ag-color-support-error); }\n.alert-close { background: none; border: none; cursor: pointer; font-size: 1rem; color: inherit; opacity: 0.7; }\n.alert-close:hover { opacity: 1; }\n\n.filter-bar {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  padding: 1rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n\n.search-box { position: relative; flex: 1; min-width: 250px; }\n\n.search-input {\n  width: 100%;\n  padding: 0.75rem 2.5rem 0.75rem 1rem;\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 6px;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.search-input:focus { outline: none; border-color: var(--ag-button-primary); box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1); }\n.search-icon { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--ag-color-text-secondary); pointer-events: none; }\n\n.filter-dropdown-container { position: relative; }\n\n.btn-filter {\n  padding: 0.75rem 1.25rem;\n  background-color: var(--ag-color-layer-01);\n  color: var(--ag-color-text-primary);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-filter:hover { border-color: var(--ag-button-primary); background-color: var(--ag-color-field-01); }\n.filter-icon { font-size: 0.75rem; }\n\n.filter-dropdown {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  margin-top: 0.5rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  min-width: 180px;\n  overflow: hidden;\n}\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  text-align: left;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 0.95rem;\n  color: var(--ag-color-text-primary);\n  transition: background-color 0.2s ease-in-out;\n}\n\n.dropdown-item:hover { background-color: var(--ag-color-field-01); }\n.dropdown-item.active { background-color: var(--ag-button-primary); color: white; font-weight: 600; }\n\n.table-container { position: relative; border: 1px solid var(--ag-color-border-subtle); border-radius: 8px; overflow: hidden; }\n\n.loading-state, .empty-state { padding: 3rem; text-align: center; color: var(--ag-color-text-secondary); background-color: var(--ag-color-layer-01); }\n\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--ag-color-border-subtle);\n  border-top-color: var(--ag-button-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin: 0 auto 1rem;\n}\n\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.participants-table { width: 100%; border-collapse: collapse; background-color: var(--ag-color-layer-01); font-size: 0.95rem; }\n.participants-table thead { background-color: var(--ag-color-field-01); border-bottom: 2px solid var(--ag-color-border-subtle); position: sticky; top: 0; }\n.participants-table th { padding: 1rem 0.75rem; text-align: left; font-weight: 600; color: var(--ag-color-text-primary); white-space: nowrap; }\n.participants-table tbody tr { border-bottom: 1px solid var(--ag-color-border-subtle); transition: all 0.2s ease-in-out; }\n.participants-table tbody tr:hover { background-color: var(--ag-color-field-01); }\n.participants-table td { padding: 1rem 0.75rem; vertical-align: middle; }\n\n.col-name { width: 22%; min-width: 150px; }\n.col-email { width: 28%; min-width: 200px; }\n.col-employee-id { width: 15%; }\n.col-status { width: 25%; }\n.col-delete { width: 10%; text-align: center; }\n\n.toggle-switch { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none; }\n.toggle-switch.disabled { cursor: not-allowed; opacity: 0.6; }\n.toggle-switch input { display: none; }\n\n.toggle-slider {\n  position: relative;\n  width: 48px;\n  height: 26px;\n  background-color: var(--ag-color-border-subtle);\n  border-radius: 999px;\n  transition: background-color 0.3s ease-in-out;\n}\n\n.toggle-slider::after {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 20px;\n  height: 20px;\n  background-color: white;\n  border-radius: 50%;\n  transition: transform 0.3s ease-in-out;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.toggle-switch input:checked + .toggle-slider { background-color: var(--ag-button-primary); }\n.toggle-switch input:checked + .toggle-slider::after { transform: translateX(22px); }\n.toggle-label { font-size: 0.9rem; font-weight: 500; color: var(--ag-color-text-primary); }\n.toggle-loading { font-size: 0.85rem; }\n\n.btn-delete {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background-color: var(--ag-tag-red-bg);\n  border: 1px solid var(--ag-color-support-error);\n  color: var(--ag-color-support-error);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-delete:hover:not(:disabled) { background-color: var(--ag-color-support-error); color: white; border-color: var(--ag-color-support-error); }\n.btn-delete:disabled { opacity: 0.4; cursor: not-allowed; }\n\n.pagination {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-top: none;\n  border-radius: 0 0 8px 8px;\n}\n\n.pagination-info { font-size: 0.9rem; color: var(--ag-color-text-secondary); }\n.pagination-controls { display: flex; gap: 0.5rem; align-items: center; }\n\n.btn-page {\n  padding: 0.5rem 0.75rem;\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-page:hover:not(:disabled) { background-color: var(--ag-button-primary); color: white; border-color: var(--ag-button-primary); }\n.btn-page:disabled { opacity: 0.5; cursor: not-allowed; }\n.page-number { min-width: 40px; text-align: center; font-weight: 600; color: var(--ag-color-text-primary); }\n\n@media (max-width: 1024px) { .col-email { display: none; } }\n\n@media (max-width: 768px) {\n  .participants-content { padding: 1rem; }\n  .filter-bar { flex-direction: column; }\n  .search-box { width: 100%; }\n  .filter-dropdown-container { width: 100%; }\n  .btn-filter { width: 100%; justify-content: center; }\n  .col-employee-id, .col-email { display: none; }\n}\r\n"] }]
    }], () => [{ type: i1.EventService }], { eventId: [{
            type: Input
        }], event: [{
            type: Input
        }], participantsChanged: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventDetailParticipantsComponent, { className: "EventDetailParticipantsComponent", filePath: "src/app/pages/admin/events/tabs/event-detail-participants.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=event-detail-participants.component.js.map