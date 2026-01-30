import { Component } from '@angular/core';
import { Subject, forkJoin, interval } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { API_CONFIG } from '../../../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/auth.service";
import * as i2 from "../../../services/event.service";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
function UserEventsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading events...");
    i0.ɵɵelementEnd()();
} }
function UserEventsComponent_div_19_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function UserEventsComponent_div_19_button_3_Template_button_click_0_listener() { const tab_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.selectTab(tab_r3.status)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 32);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tab_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r3.activeTab === tab_r3.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", tab_r3.label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r3.count);
} }
function UserEventsComponent_div_19_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", opt_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", opt_r5.label, " ");
} }
function UserEventsComponent_div_19_div_10_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 41);
    i0.ɵɵelement(2, "path", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(event_r7.location);
} }
function UserEventsComponent_div_19_div_10_div_1_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 46);
    i0.ɵɵelement(2, "path", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", event_r7.totalPointsPool, " pts");
} }
function UserEventsComponent_div_19_div_10_div_1_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52)(1, "span", 53);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.getCountdown(event_r7.id));
} }
function UserEventsComponent_div_19_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵlistener("click", function UserEventsComponent_div_19_div_10_div_1_Template_div_click_0_listener() { const event_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.selectEvent(event_r7)); });
    i0.ɵɵelementStart(1, "div", 37)(2, "h3", 38);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 39)(7, "div", 40);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(8, "svg", 41);
    i0.ɵɵelement(9, "path", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, UserEventsComponent_div_19_div_10_div_1_div_12_Template, 5, 1, "div", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 44)(14, "div", 45);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(15, "svg", 46);
    i0.ɵɵelement(16, "path", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, UserEventsComponent_div_19_div_10_div_1_div_19_Template, 5, 1, "div", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, UserEventsComponent_div_19_div_10_div_1_div_20_Template, 3, 1, "div", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r3.getEventCardClass(event_r7));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(event_r7.name);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r3.getStatusBadgeClass(event_r7.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.getStatusLabel(event_r7.status));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r3.formatDate(event_r7.eventDate));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", event_r7.location);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(event_r7.participantCount || 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", event_r7.totalPointsPool);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.hasCountdown(event_r7.id));
} }
function UserEventsComponent_div_19_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtemplate(1, UserEventsComponent_div_19_div_10_div_1_Template, 21, 11, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredEvents);
} }
function UserEventsComponent_div_19_div_11_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Try adjusting your search terms");
    i0.ɵɵelementEnd();
} }
function UserEventsComponent_div_19_div_11_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("No ", ctx_r3.activeTab.toLowerCase(), " events available");
} }
function UserEventsComponent_div_19_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 55);
    i0.ɵɵelement(2, "rect", 56)(3, "line", 57)(4, "line", 58)(5, "line", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7, "No events found");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, UserEventsComponent_div_19_div_11_p_8_Template, 2, 0, "p", 60)(9, UserEventsComponent_div_19_div_11_p_9_Template, 2, 1, "p", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r3.searchQuery);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.searchQuery && ctx_r3.activeTab !== "All");
} }
function UserEventsComponent_div_19_div_12_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 74);
    i0.ɵɵelement(3, "path", 80);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "div", 75)(5, "div", 76);
    i0.ɵɵtext(6, "Registration Deadline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 77);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.formatDateTime(ctx_r3.selectedEvent.registrationEndDate));
} }
function UserEventsComponent_div_19_div_12_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 74);
    i0.ɵɵelement(3, "path", 51);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "div", 75)(5, "div", 76);
    i0.ɵɵtext(6, "Points Pool");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 77);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r3.selectedEvent.totalPointsPool, " points");
} }
function UserEventsComponent_div_19_div_12_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81)(1, "div", 82);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 83);
    i0.ɵɵelement(3, "path", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "You're registered for this event");
    i0.ɵɵelementEnd()()();
} }
function UserEventsComponent_div_19_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "div", 62)(2, "div", 63)(3, "h2", 64);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 65)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 66);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "div", 67)(11, "button", 68);
    i0.ɵɵlistener("click", function UserEventsComponent_div_19_div_12_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r8); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onCtaClick(ctx_r3.selectedEvent)); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 69)(14, "h3");
    i0.ɵɵtext(15, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 70);
    i0.ɵɵtemplate(19, UserEventsComponent_div_19_div_12_div_19_Template, 9, 1, "div", 71);
    i0.ɵɵelementStart(20, "div", 72)(21, "div", 73);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(22, "svg", 74);
    i0.ɵɵelement(23, "path", 47);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(24, "div", 75)(25, "div", 76);
    i0.ɵɵtext(26, "Registered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 77);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(29, UserEventsComponent_div_19_div_12_div_29_Template, 9, 1, "div", 71);
    i0.ɵɵelementStart(30, "div", 72)(31, "div", 73);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(32, "svg", 74);
    i0.ɵɵelement(33, "path", 78);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(34, "div", 75)(35, "div", 76);
    i0.ɵɵtext(36, "Points Rewarded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 77);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(39, UserEventsComponent_div_19_div_12_div_39_Template, 6, 0, "div", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background-image", ctx_r3.selectedEvent.bannerImageUrl ? "url(" + ctx_r3.selectedEvent.bannerImageUrl + ")" : "none");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.selectedEvent.name);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r3.getStatusBadgeClass(ctx_r3.selectedEvent.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.getStatusLabel(ctx_r3.selectedEvent.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.formatDate(ctx_r3.selectedEvent.eventDate));
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r3.getCtaButtonClass(ctx_r3.selectedEvent));
    i0.ɵɵproperty("disabled", ctx_r3.isCtaDisabled(ctx_r3.selectedEvent) || ctx_r3.isRegistering);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.isRegistering ? "Registering..." : ctx_r3.getCtaButtonText(ctx_r3.selectedEvent), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.selectedEvent.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedEvent.registrationEndDate);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r3.selectedEvent.participantCount || 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedEvent.totalPointsPool);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r3.selectedEvent.distributedPoints || 0, " points");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isUserRegistered(ctx_r3.selectedEvent.id));
} }
function UserEventsComponent_div_19_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "div", 86);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 87);
    i0.ɵɵelement(3, "rect", 56)(4, "line", 57)(5, "line", 58)(6, "line", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8, "Select an event");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10, "Choose an event from the list to view details");
    i0.ɵɵelementEnd()()();
} }
function UserEventsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 19)(2, "div", 20);
    i0.ɵɵtemplate(3, UserEventsComponent_div_19_button_3_Template, 4, 4, "button", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 22)(5, "div", 23)(6, "label", 24);
    i0.ɵɵtext(7, "Sort by:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "select", 25);
    i0.ɵɵtwoWayListener("ngModelChange", function UserEventsComponent_div_19_Template_select_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.selectedSort, $event) || (ctx_r3.selectedSort = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function UserEventsComponent_div_19_Template_select_ngModelChange_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onSortChange()); });
    i0.ɵɵtemplate(9, UserEventsComponent_div_19_option_9_Template, 2, 2, "option", 26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, UserEventsComponent_div_19_div_10_Template, 2, 1, "div", 27)(11, UserEventsComponent_div_19_div_11_Template, 10, 2, "div", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, UserEventsComponent_div_19_div_12_Template, 40, 17, "div", 29)(13, UserEventsComponent_div_19_div_13_Template, 11, 0, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.tabs);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.selectedSort);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.sortOptions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.filteredEvents.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.filteredEvents.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedEvent);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.selectedEvent && ctx_r3.filteredEvents.length > 0);
} }
export class UserEventsComponent {
    constructor(authService, eventService, http, router, cdr) {
        this.authService = authService;
        this.eventService = eventService;
        this.http = http;
        this.router = router;
        this.cdr = cdr;
        this.allEvents = [];
        this.filteredEvents = [];
        this.selectedEvent = null;
        this.userContext = new Map();
        this.isLoading = true;
        this.isRegistering = false;
        this.searchQuery = '';
        this.selectedSort = 'dateNewest';
        // Countdown timer
        this.countdownMap = new Map();
        this.countdownSubscription = null;
        this.tabs = [
            { label: 'All', status: 'All', count: 0 },
            { label: 'Upcoming', status: 'Upcoming', count: 0 },
            { label: 'Live', status: 'Live', count: 0 },
            { label: 'Completed', status: 'Completed', count: 0 },
            { label: 'Cancelled', status: 'Cancelled', count: 0 }
        ];
        this.activeTab = 'All';
        this.sortOptions = [
            { value: 'dateNewest', label: 'Date (Newest First)' },
            { value: 'dateOldest', label: 'Date (Oldest First)' },
            { value: 'pointsHigh', label: 'Points (High → Low)' },
            { value: 'participantsHigh', label: 'Participants (High → Low)' },
            { value: 'availabilityLow', label: 'Availability (Few slots first)' }
        ];
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.loadEvents();
            }
        });
    }
    loadEvents() {
        this.isLoading = true;
        forkJoin({
            allEvents: this.eventService.getEvents(),
            myEvents: this.http.get(`${API_CONFIG.getApiUrl()}/event/user/my-events`)
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (results) => {
                this.allEvents = results.allEvents;
                // Build user context from registered events
                const myEventsData = Array.isArray(results.myEvents) ? results.myEvents : results.myEvents.data || [];
                myEventsData.forEach((event) => {
                    this.userContext.set(event.id, {
                        eventId: event.id,
                        isRegistered: true
                    });
                });
                this.updateTabCounts();
                this.selectDefaultTab();
                this.applyFiltersAndSort();
                // Auto-select first event if available
                if (this.filteredEvents.length > 0) {
                    this.selectEvent(this.filteredEvents[0]);
                }
                // Start countdown timer for upcoming/live events
                this.startCountdownTimer();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading events:', error);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }
    updateTabCounts() {
        this.tabs[0].count = this.allEvents.length; // All
        this.tabs[1].count = this.allEvents.filter(e => e.status === 'Upcoming').length;
        this.tabs[2].count = this.allEvents.filter(e => e.status === 'Live').length;
        this.tabs[3].count = this.allEvents.filter(e => e.status === 'Completed').length;
        this.tabs[4].count = this.allEvents.filter(e => e.status === 'Cancelled').length;
    }
    selectDefaultTab() {
        // Default: Live if exists, else Upcoming
        const hasLive = this.allEvents.some(e => e.status === 'Live');
        this.activeTab = hasLive ? 'Live' : 'Upcoming';
    }
    selectTab(status) {
        this.activeTab = status;
        this.applyFiltersAndSort();
        // Auto-select first event in new tab
        if (this.filteredEvents.length > 0) {
            this.selectEvent(this.filteredEvents[0]);
        }
        else {
            this.selectedEvent = null;
        }
    }
    onSearchChange() {
        this.applyFiltersAndSort();
    }
    onSortChange() {
        this.applyFiltersAndSort();
    }
    applyFiltersAndSort() {
        let events = [...this.allEvents];
        // Filter by tab
        if (this.activeTab !== 'All') {
            events = events.filter(e => e.status === this.activeTab);
        }
        // Filter by search
        if (this.searchQuery.trim()) {
            const search = this.searchQuery.toLowerCase();
            events = events.filter(e => e.name.toLowerCase().includes(search) ||
                e.description?.toLowerCase().includes(search));
        }
        // Sort
        events = this.sortEvents(events, this.selectedSort);
        this.filteredEvents = events;
    }
    sortEvents(events, sortBy) {
        const sorted = [...events];
        switch (sortBy) {
            case 'dateNewest':
                sorted.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
                break;
            case 'dateOldest':
                sorted.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
                break;
            case 'pointsHigh':
                sorted.sort((a, b) => (b.totalPointsPool || 0) - (a.totalPointsPool || 0));
                break;
            case 'participantsHigh':
                sorted.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0));
                break;
            case 'availabilityLow':
                sorted.sort((a, b) => {
                    const aSlotsLeft = (a.maxParticipants || 999999) - (a.participantCount || 0);
                    const bSlotsLeft = (b.maxParticipants || 999999) - (b.participantCount || 0);
                    return aSlotsLeft - bSlotsLeft;
                });
                break;
        }
        return sorted;
    }
    selectEvent(event) {
        this.selectedEvent = event;
    }
    isEventSelected(event) {
        return this.selectedEvent?.id === event.id;
    }
    isUserRegistered(eventId) {
        return this.userContext.get(eventId)?.isRegistered || false;
    }
    canRegister(event) {
        if (this.isUserRegistered(event.id))
            return false;
        if (event.status !== 'Upcoming')
            return false;
        // Check registration deadline
        if (event.registrationEndDateUtc) {
            const deadline = new Date(event.registrationEndDateUtc);
            const now = new Date();
            if (now > deadline)
                return false;
        }
        // Check max participants
        if (event.maxParticipants && event.participantCount >= event.maxParticipants) {
            return false;
        }
        return true;
    }
    getCtaButtonText(event) {
        if (!event)
            return '';
        if (event.status === 'Upcoming') {
            return this.isUserRegistered(event.id) ? 'Registered' : 'Register';
        }
        else if (event.status === 'Live') {
            return this.isUserRegistered(event.id) ? 'Live Now' : 'Not Registered';
        }
        else if (event.status === 'Completed') {
            return 'Completed';
        }
        else if (event.status === 'Cancelled') {
            return 'Cancelled';
        }
        return '';
    }
    getCtaButtonClass(event) {
        if (!event)
            return '';
        if (event.status === 'Upcoming' && this.canRegister(event)) {
            return 'cta-button cta-register';
        }
        else if (event.status === 'Live' && this.isUserRegistered(event.id)) {
            return 'cta-button cta-live';
        }
        return 'cta-button cta-disabled';
    }
    isCtaDisabled(event) {
        if (!event)
            return true;
        if (event.status === 'Upcoming') {
            return !this.canRegister(event);
        }
        return event.status !== 'Live' || !this.isUserRegistered(event.id);
    }
    onCtaClick(event) {
        if (this.isCtaDisabled(event))
            return;
        if (event.status === 'Upcoming' && this.canRegister(event)) {
            this.registerForEvent(event);
        }
    }
    registerForEvent(event) {
        this.isRegistering = true;
        // Log for debugging
        const token = localStorage.getItem('agdata_token');
        console.log('[UserEvents] Registering for event:', event.id);
        console.log('[UserEvents] Token available:', !!token);
        console.log('[UserEvents] User:', this.currentUser);
        this.http.post(`${API_CONFIG.getApiUrl()}/event/${event.id}/register`, {})
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isRegistering = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                console.log('[UserEvents] Registration successful:', response);
                // Update user context
                this.userContext.set(event.id, {
                    eventId: event.id,
                    isRegistered: true
                });
                // Reload events to get updated participant count
                this.loadEvents();
                // Show success message
                alert('Successfully registered for ' + event.name);
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('[UserEvents] Registration error:', error);
                console.error('[UserEvents] Error status:', error.status);
                console.error('[UserEvents] Error message:', error.error);
                let errorMessage = 'Failed to register for event';
                if (error.status === 401) {
                    errorMessage = 'Authentication failed. Please log out and log in again.';
                }
                else if (error.status === 400) {
                    errorMessage = error.error?.message || 'Registration not allowed. Check deadline and capacity.';
                }
                else if (error.error?.message) {
                    errorMessage = error.error.message;
                }
                alert(errorMessage);
            }
        });
    }
    formatDate(dateStr) {
        if (!dateStr)
            return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    formatDateTime(dateStr) {
        if (!dateStr)
            return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }
    // ==================== COUNTDOWN ====================
    /**
     * Start countdown timer that updates every second
     */
    startCountdownTimer() {
        this.stopCountdownTimer();
        this.countdownSubscription = interval(1000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateCountdowns();
            this.cdr.detectChanges();
        });
        // Initial update
        this.updateCountdowns();
    }
    /**
     * Stop countdown timer
     */
    stopCountdownTimer() {
        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
            this.countdownSubscription = null;
        }
    }
    /**
     * Update countdowns for all relevant events
     */
    updateCountdowns() {
        const now = new Date().getTime();
        this.allEvents.forEach(event => {
            const isRegistered = this.isUserRegistered(event.id);
            let targetDate = null;
            let label = '';
            if (event.status === 'Upcoming') {
                if (!isRegistered && event.registrationEndDateUtc) {
                    // Show countdown to registration close
                    targetDate = new Date(event.registrationEndDateUtc);
                    label = 'Registration closes in';
                }
                else if (isRegistered) {
                    // Show countdown to event start
                    targetDate = new Date(event.eventDate);
                    label = 'Event starts in';
                }
            }
            else if (event.status === 'Live' && isRegistered) {
                // Show that event is live
                this.countdownMap.set(event.id, '🔴 Event is LIVE');
                return;
            }
            if (targetDate) {
                const diff = targetDate.getTime() - now;
                if (diff <= 0) {
                    this.countdownMap.set(event.id, label === 'Registration closes in' ? 'Registration closed' : 'Started');
                }
                else {
                    this.countdownMap.set(event.id, `${label}: ${this.formatCountdown(diff)}`);
                }
            }
            else {
                this.countdownMap.delete(event.id);
            }
        });
    }
    /**
     * Format countdown time in human-readable format
     */
    formatCountdown(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days}d ${hours % 24}h ${minutes % 60}m`;
        }
        else if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        }
        else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        }
        else {
            return `${seconds}s`;
        }
    }
    /**
     * Get countdown display for an event
     */
    getCountdown(eventId) {
        return this.countdownMap.get(eventId) || '';
    }
    /**
     * Check if event has a countdown to display
     */
    hasCountdown(eventId) {
        return this.countdownMap.has(eventId);
    }
    getStatusBadgeClass(status) {
        switch (status) {
            case 'Live': return 'status-badge status-live';
            case 'Upcoming': return 'status-badge status-upcoming';
            case 'Completed': return 'status-badge status-completed';
            case 'Cancelled': return 'status-badge status-cancelled';
            default: return 'status-badge';
        }
    }
    getStatusLabel(status) {
        switch (status) {
            case 'Live': return 'Live';
            case 'Upcoming': return 'Upcoming';
            case 'Completed': return 'Completed';
            case 'Cancelled': return 'Cancelled';
            default: return status;
        }
    }
    getEventCardClass(event) {
        let classes = 'event-card';
        if (this.isEventSelected(event)) {
            classes += ' selected';
        }
        if (event.status === 'Live') {
            classes += ' event-live';
        }
        else if (event.status === 'Completed') {
            classes += ' event-completed';
        }
        else if (event.status === 'Cancelled') {
            classes += ' event-cancelled';
        }
        return classes;
    }
    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.stopCountdownTimer();
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserEventsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserEventsComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.EventService), i0.ɵɵdirectiveInject(i3.HttpClient), i0.ɵɵdirectiveInject(i4.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserEventsComponent, selectors: [["app-user-events"]], decls: 20, vars: 6, consts: [[1, "user-page-wrapper"], [1, "user-page-main"], [1, "page-header"], [1, "search-container"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "text", "placeholder", "Search events", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "header-right"], [1, "user-menu"], [1, "user-label"], [1, "user-avatar-small"], [1, "page-title-section"], [1, "page-title"], ["class", "loading-container", 4, "ngIf"], ["class", "events-layout", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "events-layout"], [1, "events-list-panel"], [1, "tabs-container"], ["class", "tab-button", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "list-toolbar"], [1, "sort-container"], ["for", "sort-select"], ["id", "sort-select", 1, "sort-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "event-cards-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "event-details-panel", 4, "ngIf"], ["class", "event-details-panel empty-selection", 4, "ngIf"], [1, "tab-button", 3, "click"], [1, "tab-count"], [3, "value"], [1, "event-cards-list"], [3, "class", "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "event-card-header"], [1, "event-name"], [1, "event-card-meta"], [1, "meta-item"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "meta-icon"], ["d", "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"], ["class", "meta-item", 4, "ngIf"], [1, "event-card-stats"], [1, "stat-item"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "stat-icon"], ["d", "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"], ["class", "stat-item", 4, "ngIf"], ["class", "event-countdown", 4, "ngIf"], ["d", "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"], ["d", "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"], [1, "event-countdown"], [1, "countdown-text"], [1, "empty-state"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "empty-icon"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [4, "ngIf"], [1, "event-details-panel"], [1, "event-hero"], [1, "hero-overlay"], [1, "event-title"], [1, "hero-meta"], [1, "event-date"], [1, "event-action-section"], [3, "click", "disabled"], [1, "event-description"], [1, "event-info-grid"], ["class", "info-card", 4, "ngIf"], [1, "info-card"], [1, "info-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor"], [1, "info-content"], [1, "info-label"], [1, "info-value"], ["d", "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"], ["class", "user-context-section", 4, "ngIf"], ["d", "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"], [1, "user-context-section"], [1, "context-header"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "check-icon"], ["d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"], [1, "event-details-panel", "empty-selection"], [1, "empty-selection-content"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "empty-selection-icon"]], template: function UserEventsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-user-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "div", 2)(4, "div", 3);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 4);
            i0.ɵɵelement(6, "circle", 5)(7, "path", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(8, "input", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function UserEventsComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function UserEventsComponent_Template_input_ngModelChange_8_listener() { return ctx.onSearchChange(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 8)(10, "div", 9)(11, "span", 10);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 11);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(15, "div", 12)(16, "h1", 13);
            i0.ɵɵtext(17, "Events");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(18, UserEventsComponent_div_18_Template, 4, 0, "div", 14)(19, UserEventsComponent_div_19_Template, 14, 7, "div", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Welcome, ", (ctx.currentUser == null ? null : ctx.currentUser.firstName) || "User");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2(" ", (ctx.currentUser == null ? null : ctx.currentUser.firstName == null ? null : ctx.currentUser.firstName.charAt(0)) || "", "", (ctx.currentUser == null ? null : ctx.currentUser.lastName == null ? null : ctx.currentUser.lastName.charAt(0)) || "", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i5.NgForOf, i5.NgIf, FormsModule, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i6.DefaultValueAccessor, i6.SelectControlValueAccessor, i6.NgControlStatus, i6.NgModel, UserSidebarComponent], styles: ["\n\r\n\r\n.user-page-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.user-page-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  padding: 1rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 10;\r\n}\r\n\r\n.search-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  flex: 1;\r\n  max-width: 500px;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 0.625rem 0.75rem 0.625rem 2.5rem;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(79, 138, 107, 0.1);\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n}\r\n\r\n.user-menu[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.user-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar-small[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, var(--ag-button-primary), var(--ag-color-support-success));\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: 600;\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n\n\r\n.page-title-section[_ngcontent-%COMP%] {\r\n  padding: 1.5rem 2rem 1rem;\r\n  background: var(--ag-color-layer-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font-size: 1.75rem;\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 4rem 2rem;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin-top: 1rem;\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n\n\r\n.events-layout[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 400px 1fr;\r\n  gap: 1.5rem;\r\n  padding: 1.5rem 2rem;\r\n  flex: 1;\r\n  overflow: hidden;\r\n  align-items: start;\r\n}\r\n\r\n\n\r\n.events-list-panel[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  overflow: hidden;\r\n  height: calc(100vh - 150px);\r\n  position: sticky;\r\n  top: 1.5rem;\r\n}\r\n\r\n\n\r\n.tabs-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  padding: 0.5rem;\r\n  gap: 0.25rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n  overflow-x: auto;\r\n}\r\n\r\n.tab-button[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: fit-content;\r\n  padding: 0.5rem 0.75rem;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  white-space: nowrap;\r\n}\r\n\r\n.tab-button[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.tab-button.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count[_ngcontent-%COMP%] {\r\n  background: rgba(0, 0, 0, 0.1);\r\n  padding: 0.125rem 0.5rem;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.tab-button.active[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n\n\r\n.list-toolbar[_ngcontent-%COMP%] {\r\n  padding: 1rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-layer-01);\r\n}\r\n\r\n.sort-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.sort-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.sort-select[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 0.5rem 0.75rem;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.sort-select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(79, 138, 107, 0.1);\r\n}\r\n\r\n\n\r\n.event-cards-list[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 0.75rem;\r\n}\r\n\r\n.event-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border: 2px solid var(--ag-color-border-subtle);\r\n  border-radius: 10px;\r\n  padding: 1rem;\r\n  margin-bottom: 0.75rem;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.event-card[_ngcontent-%COMP%]:hover {\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 2px 8px rgba(79, 138, 107, 0.15);\r\n}\r\n\r\n.event-card.selected[_ngcontent-%COMP%] {\r\n  border-color: var(--ag-button-primary);\r\n  background: var(--ag-tag-green-bg);\r\n  box-shadow: 0 2px 8px rgba(79, 138, 107, 0.2);\r\n}\r\n\r\n.event-card.event-live[_ngcontent-%COMP%] {\r\n  border-left: 4px solid var(--ag-color-support-success);\r\n}\r\n\r\n.event-card.event-completed[_ngcontent-%COMP%] {\r\n  opacity: 0.75;\r\n}\r\n\r\n.event-card.event-cancelled[_ngcontent-%COMP%] {\r\n  opacity: 0.5;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.event-card-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.event-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  flex: 1;\r\n  line-height: 1.4;\r\n}\r\n\r\n.status-badge[_ngcontent-%COMP%] {\r\n  padding: 0.25rem 0.625rem;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  white-space: nowrap;\r\n}\r\n\r\n.status-upcoming[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.status-live[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.status-completed[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.status-cancelled[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.event-card-meta[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.meta-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.meta-icon[_ngcontent-%COMP%] {\r\n  width: 16px;\r\n  height: 16px;\r\n  color: var(--ag-color-text-placeholder);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.event-card-stats[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding-top: 0.75rem;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.stat-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.375rem;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.stat-icon[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.event-countdown[_ngcontent-%COMP%] {\r\n  margin-top: 0.75rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background: linear-gradient(135deg, rgba(79, 138, 107, 0.1), rgba(79, 138, 107, 0.05));\r\n  border-radius: 6px;\r\n  border-left: 3px solid var(--ag-button-primary);\r\n}\r\n\r\n.countdown-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-button-primary);\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n}\r\n\r\n\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 3rem 1.5rem;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon[_ngcontent-%COMP%] {\r\n  width: 64px;\r\n  height: 64px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  font-size: 1.125rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 0.5rem;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.event-details-panel[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  overflow-y: visible;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\n\r\n.event-hero[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  background: linear-gradient(135deg, var(--ag-button-primary), var(--ag-color-support-success));\r\n  background-size: cover;\r\n  background-position: center;\r\n  min-height: 240px;\r\n  display: flex;\r\n  align-items: flex-end;\r\n  padding: 2rem;\r\n}\r\n\r\n.hero-overlay[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  z-index: 1;\r\n  width: 100%;\r\n}\r\n\r\n.event-hero[_ngcontent-%COMP%]::before {\r\n  content: '';\r\n  position: absolute;\r\n  inset: 0;\r\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));\r\n  z-index: 0;\r\n}\r\n\r\n.event-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-layer-01);\r\n  margin: 0 0 0.75rem;\r\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.hero-meta[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n}\r\n\r\n.event-date[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-layer-01);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n\n\r\n.event-action-section[_ngcontent-%COMP%] {\r\n  padding: 1.5rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.cta-button[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 0.875rem 1.5rem;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.025em;\r\n}\r\n\r\n.cta-register[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.cta-register[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(79, 138, 107, 0.3);\r\n}\r\n\r\n.cta-live[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-success);\r\n  color: var(--ag-color-layer-01);\r\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_pulse {\r\n  0%, 100% {\r\n    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);\r\n  }\r\n}\r\n\r\n.cta-disabled[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.cta-button[_ngcontent-%COMP%]:disabled {\r\n  cursor: not-allowed;\r\n  opacity: 0.6;\r\n}\r\n\r\n\n\r\n.event-description[_ngcontent-%COMP%] {\r\n  padding: 1.5rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.event-description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  font-size: 1.125rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 0.75rem;\r\n}\r\n\r\n.event-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  line-height: 1.6;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.event-info-grid[_ngcontent-%COMP%] {\r\n  padding: 1.5rem 2rem;\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 1rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.info-card[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1rem;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.info-icon[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.info-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.info-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.info-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  margin-bottom: 0.25rem;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.025em;\r\n}\r\n\r\n.info-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  font-weight: 600;\r\n  word-break: break-word;\r\n}\r\n\r\n\n\r\n.user-context-section[_ngcontent-%COMP%] {\r\n  padding: 1.5rem 2rem;\r\n}\r\n\r\n.context-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  padding: 1rem;\r\n  background: var(--ag-tag-green-bg);\r\n  border: 1px solid var(--ag-color-support-success);\r\n  border-radius: 8px;\r\n  color: var(--ag-tag-green-text);\r\n  font-weight: 500;\r\n}\r\n\r\n.check-icon[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n\n\r\n.empty-selection[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.empty-selection-content[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding: 3rem;\r\n}\r\n\r\n.empty-selection-icon[_ngcontent-%COMP%] {\r\n  width: 80px;\r\n  height: 80px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin: 0 auto 1.5rem;\r\n}\r\n\r\n.empty-selection-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 0.5rem;\r\n}\r\n\r\n.empty-selection-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n@media (max-width: 1200px) {\r\n  .events-layout[_ngcontent-%COMP%] {\r\n    grid-template-columns: 350px 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 968px) {\r\n  .events-layout[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n  \r\n  .event-details-panel[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  \r\n  .event-card.selected[_ngcontent-%COMP%]    + .event-details-panel[_ngcontent-%COMP%] {\r\n    display: flex;\r\n  }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n    align-items: stretch;\r\n  }\r\n  \r\n  .search-container[_ngcontent-%COMP%] {\r\n    max-width: none;\r\n  }\r\n  \r\n  .events-layout[_ngcontent-%COMP%] {\r\n    padding: 1rem;\r\n  }\r\n  \r\n  .event-info-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n  \r\n  .tabs-container[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserEventsComponent, [{
        type: Component,
        args: [{ selector: 'app-user-events', standalone: true, imports: [CommonModule, FormsModule, UserSidebarComponent], template: "<div class=\"user-page-wrapper\">\r\n  <app-user-sidebar></app-user-sidebar>\r\n\r\n  <div class=\"user-page-main\">\r\n    <!-- Header -->\r\n    <div class=\"page-header\">\r\n      <div class=\"search-container\">\r\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\">\r\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n          <path d=\"m21 21-4.35-4.35\"></path>\r\n        </svg>\r\n        <input \r\n          type=\"text\" \r\n          class=\"search-input\" \r\n          placeholder=\"Search events\" \r\n          [(ngModel)]=\"searchQuery\"\r\n          (ngModelChange)=\"onSearchChange()\" \r\n        />\r\n      </div>\r\n\r\n      <div class=\"header-right\">\r\n        <div class=\"user-menu\">\r\n          <span class=\"user-label\">Welcome, {{ currentUser?.firstName || 'User' }}</span>\r\n          <div class=\"user-avatar-small\">\r\n            {{ currentUser?.firstName?.charAt(0) || '' }}{{ currentUser?.lastName?.charAt(0) || '' }}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Page Title -->\r\n    <div class=\"page-title-section\">\r\n      <h1 class=\"page-title\">Events</h1>\r\n    </div>\r\n\r\n    <!-- Loading State -->\r\n    <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n      <div class=\"spinner\"></div>\r\n      <p>Loading events...</p>\r\n    </div>\r\n\r\n    <!-- Main Content -->\r\n    <div *ngIf=\"!isLoading\" class=\"events-layout\">\r\n      <!-- Left Panel: Event List -->\r\n      <div class=\"events-list-panel\">\r\n        <!-- Tabs -->\r\n        <div class=\"tabs-container\">\r\n          <button \r\n            *ngFor=\"let tab of tabs\" \r\n            class=\"tab-button\"\r\n            [class.active]=\"activeTab === tab.status\"\r\n            (click)=\"selectTab(tab.status)\"\r\n          >\r\n            {{ tab.label }}\r\n            <span class=\"tab-count\">{{ tab.count }}</span>\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Toolbar -->\r\n        <div class=\"list-toolbar\">\r\n          <div class=\"sort-container\">\r\n            <label for=\"sort-select\">Sort by:</label>\r\n            <select \r\n              id=\"sort-select\" \r\n              class=\"sort-select\" \r\n              [(ngModel)]=\"selectedSort\"\r\n              (ngModelChange)=\"onSortChange()\"\r\n            >\r\n              <option *ngFor=\"let opt of sortOptions\" [value]=\"opt.value\">\r\n                {{ opt.label }}\r\n              </option>\r\n            </select>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Event Cards -->\r\n        <div class=\"event-cards-list\" *ngIf=\"filteredEvents.length > 0\">\r\n          <div \r\n            *ngFor=\"let event of filteredEvents\" \r\n            [class]=\"getEventCardClass(event)\"\r\n            (click)=\"selectEvent(event)\"\r\n          >\r\n            <div class=\"event-card-header\">\r\n              <h3 class=\"event-name\">{{ event.name }}</h3>\r\n              <span [class]=\"getStatusBadgeClass(event.status)\">{{ getStatusLabel(event.status) }}</span>\r\n            </div>\r\n            \r\n            <div class=\"event-card-meta\">\r\n              <div class=\"meta-item\">\r\n                <svg class=\"meta-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                  <path d=\"M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z\"/>\r\n                </svg>\r\n                <span>{{ formatDate(event.eventDate) }}</span>\r\n              </div>\r\n              \r\n              <div class=\"meta-item\" *ngIf=\"event.location\">\r\n                <svg class=\"meta-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                  <path d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\"/>\r\n                </svg>\r\n                <span>{{ event.location }}</span>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"event-card-stats\">\r\n              <div class=\"stat-item\">\r\n                <svg class=\"stat-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                  <path d=\"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z\"/>\r\n                </svg>\r\n                <span>{{ event.participantCount || 0 }}</span>\r\n              </div>\r\n              \r\n              <div class=\"stat-item\" *ngIf=\"event.totalPointsPool\">\r\n                <svg class=\"stat-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                  <path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/>\r\n                </svg>\r\n                <span>{{ event.totalPointsPool }} pts</span>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Countdown Timer -->\r\n            <div class=\"event-countdown\" *ngIf=\"hasCountdown(event.id)\">\r\n              <span class=\"countdown-text\">{{ getCountdown(event.id) }}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Empty State -->\r\n        <div class=\"empty-state\" *ngIf=\"filteredEvents.length === 0\">\r\n          <svg class=\"empty-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\">\r\n            <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n            <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\r\n            <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\r\n            <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\r\n          </svg>\r\n          <h3>No events found</h3>\r\n          <p *ngIf=\"searchQuery\">Try adjusting your search terms</p>\r\n          <p *ngIf=\"!searchQuery && activeTab !== 'All'\">No {{ activeTab.toLowerCase() }} events available</p>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Right Panel: Event Details -->\r\n      <div class=\"event-details-panel\" *ngIf=\"selectedEvent\">\r\n        <!-- Hero Section -->\r\n        <div class=\"event-hero\" [style.background-image]=\"selectedEvent.bannerImageUrl ? 'url(' + selectedEvent.bannerImageUrl + ')' : 'none'\">\r\n          <div class=\"hero-overlay\">\r\n            <h2 class=\"event-title\">{{ selectedEvent.name }}</h2>\r\n            <div class=\"hero-meta\">\r\n              <span [class]=\"getStatusBadgeClass(selectedEvent.status)\">{{ getStatusLabel(selectedEvent.status) }}</span>\r\n              <span class=\"event-date\">{{ formatDate(selectedEvent.eventDate) }}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Action Button -->\r\n        <div class=\"event-action-section\">\r\n          <button \r\n            [class]=\"getCtaButtonClass(selectedEvent)\"\r\n            [disabled]=\"isCtaDisabled(selectedEvent) || isRegistering\"\r\n            (click)=\"onCtaClick(selectedEvent)\"\r\n          >\r\n            {{ isRegistering ? 'Registering...' : getCtaButtonText(selectedEvent) }}\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Description -->\r\n        <div class=\"event-description\">\r\n          <h3>Description</h3>\r\n          <p>{{ selectedEvent.description }}</p>\r\n        </div>\r\n\r\n        <!-- Event Info Grid -->\r\n        <div class=\"event-info-grid\">\r\n          <div class=\"info-card\" *ngIf=\"selectedEvent.registrationEndDate\">\r\n            <div class=\"info-icon\">\r\n              <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z\"/>\r\n              </svg>\r\n            </div>\r\n            <div class=\"info-content\">\r\n              <div class=\"info-label\">Registration Deadline</div>\r\n              <div class=\"info-value\">{{ formatDateTime(selectedEvent.registrationEndDate) }}</div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"info-card\">\r\n            <div class=\"info-icon\">\r\n              <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z\"/>\r\n              </svg>\r\n            </div>\r\n            <div class=\"info-content\">\r\n              <div class=\"info-label\">Registered</div>\r\n              <div class=\"info-value\">{{ selectedEvent.participantCount || 0 }}</div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"info-card\" *ngIf=\"selectedEvent.totalPointsPool\">\r\n            <div class=\"info-icon\">\r\n              <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/>\r\n              </svg>\r\n            </div>\r\n            <div class=\"info-content\">\r\n              <div class=\"info-label\">Points Pool</div>\r\n              <div class=\"info-value\">{{ selectedEvent.totalPointsPool }} points</div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"info-card\">\r\n            <div class=\"info-icon\">\r\n              <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                <path d=\"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z\"/>\r\n              </svg>\r\n            </div>\r\n            <div class=\"info-content\">\r\n              <div class=\"info-label\">Points Rewarded</div>\r\n              <div class=\"info-value\">{{ selectedEvent.distributedPoints || 0 }} points</div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- User Context Section -->\r\n        <div class=\"user-context-section\" *ngIf=\"isUserRegistered(selectedEvent.id)\">\r\n          <div class=\"context-header\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"check-icon\">\r\n              <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>\r\n            </svg>\r\n            <span>You're registered for this event</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Placeholder when no event selected -->\r\n      <div class=\"event-details-panel empty-selection\" *ngIf=\"!selectedEvent && filteredEvents.length > 0\">\r\n        <div class=\"empty-selection-content\">\r\n          <svg class=\"empty-selection-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\">\r\n            <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n            <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\r\n            <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\r\n            <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\r\n          </svg>\r\n          <h3>Select an event</h3>\r\n          <p>Choose an event from the list to view details</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["/* User Events Page - Two Column Layout */\r\n\r\n.user-page-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.user-page-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n/* Page Header */\r\n.page-header {\r\n  background: var(--ag-color-layer-01);\r\n  padding: 1rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 10;\r\n}\r\n\r\n.search-container {\r\n  position: relative;\r\n  flex: 1;\r\n  max-width: 500px;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 0.625rem 0.75rem 0.625rem 2.5rem;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(79, 138, 107, 0.1);\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n}\r\n\r\n.user-menu {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.user-label {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar-small {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, var(--ag-button-primary), var(--ag-color-support-success));\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: 600;\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n/* Page Title Section */\r\n.page-title-section {\r\n  padding: 1.5rem 2rem 1rem;\r\n  background: var(--ag-color-layer-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.75rem;\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n/* Loading State */\r\n.loading-container {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 4rem 2rem;\r\n}\r\n\r\n.spinner {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container p {\r\n  margin-top: 1rem;\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n/* Main Events Layout - Two Columns */\r\n.events-layout {\r\n  display: grid;\r\n  grid-template-columns: 400px 1fr;\r\n  gap: 1.5rem;\r\n  padding: 1.5rem 2rem;\r\n  flex: 1;\r\n  overflow: hidden;\r\n  align-items: start;\r\n}\r\n\r\n/* Left Panel - Events List */\r\n.events-list-panel {\r\n  display: flex;\r\n  flex-direction: column;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  overflow: hidden;\r\n  height: calc(100vh - 150px);\r\n  position: sticky;\r\n  top: 1.5rem;\r\n}\r\n\r\n/* Tabs */\r\n.tabs-container {\r\n  display: flex;\r\n  padding: 0.5rem;\r\n  gap: 0.25rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n  overflow-x: auto;\r\n}\r\n\r\n.tab-button {\r\n  flex: 1;\r\n  min-width: fit-content;\r\n  padding: 0.5rem 0.75rem;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  white-space: nowrap;\r\n}\r\n\r\n.tab-button:hover {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.tab-button.active {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count {\r\n  background: rgba(0, 0, 0, 0.1);\r\n  padding: 0.125rem 0.5rem;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.tab-button.active .tab-count {\r\n  background: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n/* List Toolbar */\r\n.list-toolbar {\r\n  padding: 1rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-layer-01);\r\n}\r\n\r\n.sort-container {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.sort-container label {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.sort-select {\r\n  flex: 1;\r\n  padding: 0.5rem 0.75rem;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.sort-select:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(79, 138, 107, 0.1);\r\n}\r\n\r\n/* Event Cards List */\r\n.event-cards-list {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 0.75rem;\r\n}\r\n\r\n.event-card {\r\n  background: var(--ag-color-layer-01);\r\n  border: 2px solid var(--ag-color-border-subtle);\r\n  border-radius: 10px;\r\n  padding: 1rem;\r\n  margin-bottom: 0.75rem;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.event-card:hover {\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 2px 8px rgba(79, 138, 107, 0.15);\r\n}\r\n\r\n.event-card.selected {\r\n  border-color: var(--ag-button-primary);\r\n  background: var(--ag-tag-green-bg);\r\n  box-shadow: 0 2px 8px rgba(79, 138, 107, 0.2);\r\n}\r\n\r\n.event-card.event-live {\r\n  border-left: 4px solid var(--ag-color-support-success);\r\n}\r\n\r\n.event-card.event-completed {\r\n  opacity: 0.75;\r\n}\r\n\r\n.event-card.event-cancelled {\r\n  opacity: 0.5;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.event-card-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.event-name {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  flex: 1;\r\n  line-height: 1.4;\r\n}\r\n\r\n.status-badge {\r\n  padding: 0.25rem 0.625rem;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  white-space: nowrap;\r\n}\r\n\r\n.status-upcoming {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.status-live {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.status-completed {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.status-cancelled {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.event-card-meta {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.meta-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.meta-icon {\r\n  width: 16px;\r\n  height: 16px;\r\n  color: var(--ag-color-text-placeholder);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.event-card-stats {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding-top: 0.75rem;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.stat-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.375rem;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.stat-icon {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Event Countdown */\r\n.event-countdown {\r\n  margin-top: 0.75rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background: linear-gradient(135deg, rgba(79, 138, 107, 0.1), rgba(79, 138, 107, 0.05));\r\n  border-radius: 6px;\r\n  border-left: 3px solid var(--ag-button-primary);\r\n}\r\n\r\n.countdown-text {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-button-primary);\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n}\r\n\r\n/* Empty State in List */\r\n.empty-state {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 3rem 1.5rem;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon {\r\n  width: 64px;\r\n  height: 64px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.empty-state h3 {\r\n  font-size: 1.125rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 0.5rem;\r\n}\r\n\r\n.empty-state p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0;\r\n}\r\n\r\n/* Right Panel - Event Details */\r\n.event-details-panel {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  overflow-y: visible;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Hero Section */\r\n.event-hero {\r\n  position: relative;\r\n  background: linear-gradient(135deg, var(--ag-button-primary), var(--ag-color-support-success));\r\n  background-size: cover;\r\n  background-position: center;\r\n  min-height: 240px;\r\n  display: flex;\r\n  align-items: flex-end;\r\n  padding: 2rem;\r\n}\r\n\r\n.hero-overlay {\r\n  position: relative;\r\n  z-index: 1;\r\n  width: 100%;\r\n}\r\n\r\n.event-hero::before {\r\n  content: '';\r\n  position: absolute;\r\n  inset: 0;\r\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));\r\n  z-index: 0;\r\n}\r\n\r\n.event-title {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-layer-01);\r\n  margin: 0 0 0.75rem;\r\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.hero-meta {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n}\r\n\r\n.event-date {\r\n  color: var(--ag-color-layer-01);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n/* Action Section */\r\n.event-action-section {\r\n  padding: 1.5rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.cta-button {\r\n  width: 100%;\r\n  padding: 0.875rem 1.5rem;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.025em;\r\n}\r\n\r\n.cta-register {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.cta-register:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(79, 138, 107, 0.3);\r\n}\r\n\r\n.cta-live {\r\n  background: var(--ag-color-support-success);\r\n  color: var(--ag-color-layer-01);\r\n  animation: pulse 2s infinite;\r\n}\r\n\r\n@keyframes pulse {\r\n  0%, 100% {\r\n    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);\r\n  }\r\n  50% {\r\n    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);\r\n  }\r\n}\r\n\r\n.cta-disabled {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.cta-button:disabled {\r\n  cursor: not-allowed;\r\n  opacity: 0.6;\r\n}\r\n\r\n/* Description */\r\n.event-description {\r\n  padding: 1.5rem 2rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.event-description h3 {\r\n  font-size: 1.125rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 0.75rem;\r\n}\r\n\r\n.event-description p {\r\n  font: var(--ag-typo-body-02);\r\n  line-height: 1.6;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n/* Event Info Grid */\r\n.event-info-grid {\r\n  padding: 1.5rem 2rem;\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 1rem;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.info-card {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1rem;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.info-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.info-icon svg {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.info-content {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.info-label {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  margin-bottom: 0.25rem;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.025em;\r\n}\r\n\r\n.info-value {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  font-weight: 600;\r\n  word-break: break-word;\r\n}\r\n\r\n/* User Context Section */\r\n.user-context-section {\r\n  padding: 1.5rem 2rem;\r\n}\r\n\r\n.context-header {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  padding: 1rem;\r\n  background: var(--ag-tag-green-bg);\r\n  border: 1px solid var(--ag-color-support-success);\r\n  border-radius: 8px;\r\n  color: var(--ag-tag-green-text);\r\n  font-weight: 500;\r\n}\r\n\r\n.check-icon {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n/* Empty Selection State */\r\n.empty-selection {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.empty-selection-content {\r\n  text-align: center;\r\n  padding: 3rem;\r\n}\r\n\r\n.empty-selection-icon {\r\n  width: 80px;\r\n  height: 80px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin: 0 auto 1.5rem;\r\n}\r\n\r\n.empty-selection-content h3 {\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 0.5rem;\r\n}\r\n\r\n.empty-selection-content p {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0;\r\n}\r\n\r\n/* Responsive Design */\r\n@media (max-width: 1200px) {\r\n  .events-layout {\r\n    grid-template-columns: 350px 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 968px) {\r\n  .events-layout {\r\n    grid-template-columns: 1fr;\r\n  }\r\n  \r\n  .event-details-panel {\r\n    display: none;\r\n  }\r\n  \r\n  .event-card.selected + .event-details-panel {\r\n    display: flex;\r\n  }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .page-header {\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n    align-items: stretch;\r\n  }\r\n  \r\n  .search-container {\r\n    max-width: none;\r\n  }\r\n  \r\n  .events-layout {\r\n    padding: 1rem;\r\n  }\r\n  \r\n  .event-info-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n  \r\n  .tabs-container {\r\n    flex-wrap: wrap;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.EventService }, { type: i3.HttpClient }, { type: i4.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserEventsComponent, { className: "UserEventsComponent", filePath: "src/app/pages/user/events/user-events.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=user-events.component.js.map