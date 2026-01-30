import { Component, ViewChild, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/event.service";
import * as i2 from "../../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
const _c0 = ["eventsTable"];
function EventManagementComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 15);
    i0.ɵɵelement(4, "i", 16);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.lastName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.roles == null ? null : ctx_r0.currentUser.roles[0]) || "Admin", " ");
} }
function EventManagementComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "i", 18);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 19);
    i0.ɵɵlistener("click", function EventManagementComponent_div_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.successMessage = null); });
    i0.ɵɵelement(5, "i", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.successMessage);
} }
function EventManagementComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 19);
    i0.ɵɵlistener("click", function EventManagementComponent_div_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeErrorAlert()); });
    i0.ɵɵelement(5, "i", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function EventManagementComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "div", 24);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading events...");
    i0.ɵɵelementEnd()();
} }
function EventManagementComponent_ng_container_13_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 60);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r0.eventStatusChartOption)("merge", ctx_r0.eventStatusChartOption);
} }
function EventManagementComponent_ng_container_13_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No event data available");
    i0.ɵɵelementEnd()();
} }
function EventManagementComponent_ng_container_13_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 63);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r0.enrollmentChartOption)("merge", ctx_r0.enrollmentChartOption);
} }
function EventManagementComponent_ng_container_13_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 64);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No upcoming events found");
    i0.ɵɵelementEnd()();
} }
function EventManagementComponent_ng_container_13_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "div", 66);
    i0.ɵɵelement(2, "span", 67);
    i0.ɵɵelementStart(3, "span", 68);
    i0.ɵɵtext(4, "Enrolled");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 66);
    i0.ɵɵelement(6, "span", 69);
    i0.ɵɵelementStart(7, "span", 68);
    i0.ɵɵtext(8, "Available Slots");
    i0.ɵɵelementEnd()()();
} }
function EventManagementComponent_ng_container_13_button_47_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getStatusCount(status_r6.value), " ");
} }
function EventManagementComponent_ng_container_13_button_47_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function EventManagementComponent_ng_container_13_button_47_Template_button_click_0_listener() { const status_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onStatusTabChange(status_r6.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, EventManagementComponent_ng_container_13_button_47_span_2_Template, 2, 1, "span", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.activeStatusTab === status_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", status_r6.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.getStatusCount(status_r6.value) > 0);
} }
function EventManagementComponent_ng_container_13_table_50_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 75);
    i0.ɵɵlistener("click", function EventManagementComponent_ng_container_13_table_50_tr_14_Template_tr_click_0_listener() { const event_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openEventDetail(event_r8.id)); })("keydown.enter", function EventManagementComponent_ng_container_13_table_50_tr_14_Template_tr_keydown_enter_0_listener() { const event_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openEventDetail(event_r8.id)); });
    i0.ɵɵelementStart(1, "td", 76)(2, "div", 77)(3, "div", 78);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 79);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "slice");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "td")(9, "span", 80);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td", 81);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 82)(14, "div", 83)(15, "span", 84);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 85);
    i0.ɵɵelement(18, "div", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 87);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "td", 88)(22, "div", 83)(23, "span", 84);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 85);
    i0.ɵɵelement(26, "div", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 87);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "number");
    i0.ɵɵpipe(30, "number");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const event_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", "View details for " + event_r8.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(event_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind3(7, 18, event_r8.description, 0, 60), "", event_r8.description && event_r8.description.length > 60 ? "..." : "");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("status-" + event_r8.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", event_r8.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.formatDate(event_r8.eventDate), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r0.getParticipantPercent(event_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r0.getParticipantPercent(event_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", event_r8.participantCount, " / ", event_r8.maxParticipants || "\u221E");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r0.getPointsPercent(event_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r0.getPointsPercent(event_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(29, 22, event_r8.distributedPoints), " / ", i0.ɵɵpipeBind1(30, 24, event_r8.totalPointsPool));
} }
function EventManagementComponent_ng_container_13_table_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 73)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Event Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, EventManagementComponent_ng_container_13_table_50_tr_14_Template, 31, 26, "tr", 74);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r0.filteredEvents);
} }
function EventManagementComponent_ng_container_13_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵelement(1, "i", 90);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No events found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 91);
    i0.ɵɵtext(5, "Create your first event to get started");
    i0.ɵɵelementEnd()();
} }
function EventManagementComponent_ng_container_13_div_52_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 92)(1, "button", 93);
    i0.ɵɵlistener("click", function EventManagementComponent_ng_container_13_div_52_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onPageChange(ctx_r0.currentPage - 1)); });
    i0.ɵɵelement(2, "i", 94);
    i0.ɵɵtext(3, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 95);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 93);
    i0.ɵɵlistener("click", function EventManagementComponent_ng_container_13_div_52_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onPageChange(ctx_r0.currentPage + 1)); });
    i0.ɵɵtext(7, " Next ");
    i0.ɵɵelement(8, "i", 96);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.currentPage === 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r0.currentPage, " of ", ctx_r0.totalPages, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.currentPage >= ctx_r0.totalPages);
} }
function EventManagementComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 25)(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "div", 29)(6, "h2", 30);
    i0.ɵɵtext(7, "Events Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 31);
    i0.ɵɵtext(9, "Distribution by status");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 32);
    i0.ɵɵtemplate(11, EventManagementComponent_ng_container_13_div_11_Template, 1, 2, "div", 33)(12, EventManagementComponent_ng_container_13_div_12_Template, 4, 0, "div", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 27)(14, "div", 28)(15, "div", 29)(16, "h2", 30);
    i0.ɵɵtext(17, "Participants Enrollment Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 31);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 32);
    i0.ɵɵtemplate(21, EventManagementComponent_ng_container_13_div_21_Template, 1, 2, "div", 35)(22, EventManagementComponent_ng_container_13_div_22_Template, 4, 0, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(23, EventManagementComponent_ng_container_13_div_23_Template, 9, 0, "div", 36);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "section", 37)(25, "div", 38)(26, "div", 39)(27, "div", 40);
    i0.ɵɵelement(28, "i", 41);
    i0.ɵɵelementStart(29, "input", 42);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_ng_container_13_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.searchText, $event) || (ctx_r0.searchText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function EventManagementComponent_ng_container_13_Template_input_input_29_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSearch(ctx_r0.searchText)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "button", 43);
    i0.ɵɵlistener("click", function EventManagementComponent_ng_container_13_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.createEvent()); });
    i0.ɵɵelement(31, "i", 44);
    i0.ɵɵtext(32, " Create Event ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 45)(34, "label", 46);
    i0.ɵɵtext(35, "Sort by:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "select", 47);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_ng_container_13_Template_select_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.sortBy, $event) || (ctx_r0.sortBy = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function EventManagementComponent_ng_container_13_Template_select_change_36_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSortChange()); });
    i0.ɵɵelementStart(37, "option", 48);
    i0.ɵɵtext(38, "Event Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 49);
    i0.ɵɵtext(40, "Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 50);
    i0.ɵɵtext(42, "Points Pool");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 51);
    i0.ɵɵtext(44, "Points Distributed (%)");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(45, "section", 52)(46, "div", 53);
    i0.ɵɵtemplate(47, EventManagementComponent_ng_container_13_button_47_Template, 3, 4, "button", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "section", 55)(49, "div", 56);
    i0.ɵɵtemplate(50, EventManagementComponent_ng_container_13_table_50_Template, 15, 1, "table", 57)(51, EventManagementComponent_ng_container_13_div_51_Template, 6, 0, "div", 58)(52, EventManagementComponent_ng_container_13_div_52_Template, 9, 4, "div", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r0.hasEventStatusData());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.hasEventStatusData());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("Top ", ctx_r0.topNUpcoming, " upcoming events by enrollment");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.upcomingEventsForChart().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.upcomingEventsForChart().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.upcomingEventsForChart().length > 0);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.searchText);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.sortBy);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngForOf", ctx_r0.statusOptions);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.filteredEvents.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.filteredEvents.length === 0 && !ctx_r0.hasLoadError);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.totalPages > 1);
} }
function EventManagementComponent_div_14_span_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 122);
    i0.ɵɵtext(2, " Saving... ");
    i0.ɵɵelementEnd();
} }
function EventManagementComponent_div_14_span_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 123);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.showEditEventModal ? "Update Event" : "Create Event", " ");
} }
function EventManagementComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵlistener("click", function EventManagementComponent_div_14_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeEventModal()); });
    i0.ɵɵelementStart(1, "div", 98);
    i0.ɵɵlistener("click", function EventManagementComponent_div_14_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 99)(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 100);
    i0.ɵɵlistener("click", function EventManagementComponent_div_14_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeEventModal()); });
    i0.ɵɵelement(6, "i", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 101);
    i0.ɵɵlistener("ngSubmit", function EventManagementComponent_div_14_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showEditEventModal ? ctx_r0.submitEditEvent() : ctx_r0.submitNewEvent()); });
    i0.ɵɵelementStart(8, "div", 102)(9, "label", 103);
    i0.ɵɵtext(10, " Event Name ");
    i0.ɵɵelementStart(11, "span", 104);
    i0.ɵɵtext(12, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "input", 105);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.name, $event) || (ctx_r0.newEvent.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 102)(15, "label", 106);
    i0.ɵɵtext(16, " Description ");
    i0.ɵɵelementStart(17, "span", 104);
    i0.ɵɵtext(18, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "textarea", 107);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_textarea_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.description, $event) || (ctx_r0.newEvent.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 108)(21, "div", 102)(22, "label", 109);
    i0.ɵɵtext(23, " Event Date & Time ");
    i0.ɵɵelementStart(24, "span", 104);
    i0.ɵɵtext(25, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "input", 110);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.eventDate, $event) || (ctx_r0.newEvent.eventDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 102)(28, "label", 111);
    i0.ɵɵtext(29, " Registration Deadline ");
    i0.ɵɵelementStart(30, "span", 104);
    i0.ɵɵtext(31, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "input", 112);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.registrationEndDateUtc, $event) || (ctx_r0.newEvent.registrationEndDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div", 108)(34, "div", 102)(35, "label", 113);
    i0.ɵɵtext(36, " Max Participants ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "input", 114);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.maxParticipants, $event) || (ctx_r0.newEvent.maxParticipants = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 102)(39, "label", 115);
    i0.ɵɵtext(40, " Total Points Pool ");
    i0.ɵɵelementStart(41, "span", 104);
    i0.ɵɵtext(42, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "input", 116);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_43_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.totalPointsPool, $event) || (ctx_r0.newEvent.totalPointsPool = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "div", 102)(45, "label", 117);
    i0.ɵɵtext(46, " Location ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "input", 118);
    i0.ɵɵtwoWayListener("ngModelChange", function EventManagementComponent_div_14_Template_input_ngModelChange_47_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.newEvent.location, $event) || (ctx_r0.newEvent.location = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 119)(49, "button", 120);
    i0.ɵɵlistener("click", function EventManagementComponent_div_14_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeEventModal()); });
    i0.ɵɵtext(50, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "button", 121);
    i0.ɵɵtemplate(52, EventManagementComponent_div_14_span_52_Template, 3, 0, "span", 11)(53, EventManagementComponent_div_14_span_53_Template, 3, 1, "span", 11);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.showEditEventModal ? "Edit Event" : "Create New Event");
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.name);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.description);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.eventDate);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.registrationEndDateUtc);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.maxParticipants);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.totalPointsPool);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.newEvent.location);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmittingEvent);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmittingEvent);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isSubmittingEvent);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isSubmittingEvent);
} }
// Register ECharts components
echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);
export class EventManagementComponent {
    constructor(eventService, authService, router, cdr) {
        this.eventService = eventService;
        this.authService = authService;
        this.router = router;
        this.cdr = cdr;
        // Expose global Math to templates to avoid AOT/runtime undefined
        this.Math = Math;
        // Data
        this.allEvents = []; // All events for KPI calculation (unfiltered)
        this.events = []; // Events filtered by status tab
        this.filteredEvents = [];
        this.kpi = null;
        // UI State
        this.isLoading = false;
        this.searchText = '';
        this.activeStatusTab = 'All';
        this.currentPage = 1;
        this.pageSize = 10;
        this.sortBy = 'eventDate';
        this.successMessage = null;
        // Error & Empty States
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.hasLoadError = false;
        // Modal State
        this.showCreateEventModal = false;
        this.showEditEventModal = false;
        this.isSubmittingEvent = false;
        this.editingEventId = null;
        // Create/Edit Event Form
        this.newEvent = {
            name: '',
            description: '',
            eventDate: '',
            location: '',
            maxParticipants: undefined,
            totalPointsPool: 0,
            registrationEndDateUtc: ''
        };
        // Chart configuration
        this.topNUpcoming = 4;
        this.eventStatusChartOption = {};
        this.enrollmentChartOption = {};
        // Chart colors
        this.chartColors = {
            upcoming: '#0891b2', // Teal/Cyan
            live: '#16a34a', // Green
            completed: '#6b7280', // Gray
            cancelled: '#dc2626' // Red
        };
        // Signals for upcoming events chart
        this.allEventsSignal = signal([], ...(ngDevMode ? [{ debugName: "allEventsSignal" }] : []));
        // Computed upcoming events for chart
        this.upcomingEventsForChart = computed(() => {
            const events = this.allEventsSignal();
            return events
                .filter(e => e.status === 'Upcoming')
                .slice(0, this.topNUpcoming)
                .map(e => ({
                name: e.name,
                enrolled: e.participantCount || 0,
                capacity: e.maxParticipants || 100,
                percent: e.maxParticipants ? Math.round((e.participantCount / e.maxParticipants) * 100) : 0
            }));
        }, ...(ngDevMode ? [{ debugName: "upcomingEventsForChart" }] : []));
        // Search debounce
        this.searchSubject$ = new Subject();
        // Status tabs - aligned with backend statuses
        this.statusOptions = [
            { value: 'All', label: 'All' },
            { value: 'Upcoming', label: 'Upcoming' },
            { value: 'Live', label: 'Live' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Cancelled', label: 'Canceled' }
        ];
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadCurrentUser();
        this.loadEvents();
        // Setup search debounce
        this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(searchText => {
            this.searchText = searchText;
            this.currentPage = 1;
            this.applyStatusFilter();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Load current user info
     */
    loadCurrentUser() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            this.cdr.markForCheck();
        });
    }
    /**
     * Load events with current filters
     * KPIs are computed from ALL events, tabs filter display only
     */
    loadEvents() {
        this.isLoading = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        console.log('[EventMgmt] Loading all events');
        // Always fetch all events first for KPI calculation
        this.eventService.getEvents({})
            .pipe(takeUntil(this.destroy$), finalize(() => {
            console.log('[EventMgmt] Loading finished - finalize entered');
            setTimeout(() => {
                this.isLoading = false;
                console.log('[EventMgmt] isLoading set to false (deferred)');
                this.cdr.markForCheck();
            }, 0);
        }))
            .subscribe({
            next: (data) => {
                console.log('[EventMgmt] Events loaded successfully, received data:', data);
                const extracted = Array.isArray(data) ? data : (data?.data || []);
                this.allEvents = extracted;
                this.allEventsSignal.set(extracted);
                // Compute KPI from ALL events (not filtered)
                this.kpi = this.eventService.computeKPIFromEvents(this.allEvents);
                console.log('[EventMgmt] KPI computed from all events:', this.kpi);
                // Update charts
                this.updateEventStatusChart();
                this.updateEnrollmentChart();
                // Apply tab filter for display
                this.applyStatusFilter();
                this.hasLoadError = false;
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('[EventMgmt] Error loading events:', error);
                this.allEvents = [];
                this.events = [];
                this.filteredEvents = [];
                this.hasLoadError = true;
                this.errorMessage = `Failed to load events: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
                this.showErrorAlert = true;
                this.cdr.markForCheck();
            }
        });
    }
    /**
     * Update the Event Status pie chart
     */
    updateEventStatusChart() {
        const statusCounts = {
            upcoming: this.allEvents.filter(e => e.status === 'Upcoming').length,
            live: this.allEvents.filter(e => e.status === 'Live').length,
            completed: this.allEvents.filter(e => e.status === 'Completed').length,
            cancelled: this.allEvents.filter(e => e.status === 'Cancelled').length
        };
        const total = statusCounts.upcoming + statusCounts.live + statusCounts.completed + statusCounts.cancelled;
        this.eventStatusChartOption = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    const percent = total > 0 ? ((params.value / total) * 100).toFixed(1) : 0;
                    return `${params.name}: ${params.value} (${percent}%)`;
                }
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                formatter: (name) => {
                    const key = name.toLowerCase();
                    const count = statusCounts[key] || 0;
                    const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                    return `${name}: ${count} (${percent}%)`;
                },
                textStyle: {
                    fontSize: 12,
                    color: '#6b7280'
                }
            },
            series: [
                {
                    name: 'Event Status',
                    type: 'pie',
                    radius: ['45%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: { show: false },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: { show: false },
                    data: [
                        { value: statusCounts.upcoming, name: 'Upcoming', itemStyle: { color: this.chartColors.upcoming } },
                        { value: statusCounts.live, name: 'Live', itemStyle: { color: this.chartColors.live } },
                        { value: statusCounts.completed, name: 'Completed', itemStyle: { color: this.chartColors.completed } },
                        { value: statusCounts.cancelled, name: 'Cancelled', itemStyle: { color: this.chartColors.cancelled } }
                    ].filter(d => d.value > 0)
                }
            ]
        };
    }
    /**
     * Update the Enrollment Progress bar chart
     */
    updateEnrollmentChart() {
        const upcomingEvents = this.upcomingEventsForChart();
        if (upcomingEvents.length === 0) {
            this.enrollmentChartOption = {};
            return;
        }
        // Reverse for horizontal bar chart (bottom to top)
        const reversed = [...upcomingEvents].reverse();
        const eventNames = reversed.map(e => e.name); // Full names - no truncation
        const enrolledData = reversed.map(e => e.percent);
        const remainingData = reversed.map(e => 100 - e.percent);
        this.enrollmentChartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(44, 95, 63, 0.08)'
                    }
                },
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: [12, 16],
                textStyle: {
                    color: '#374151',
                    fontSize: 13
                },
                formatter: (params) => {
                    const event = reversed[params[0].dataIndex];
                    return `<div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${event.name}</div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="color: #6b7280;">Enrolled:</span>
                    <span style="font-weight: 500; margin-left: 16px;">${event.enrolled} / ${event.capacity}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Progress:</span>
                    <span style="font-weight: 600; color: #2c5f3f; margin-left: 16px;">${event.percent}%</span>
                  </div>`;
                },
                extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;'
            },
            grid: {
                left: '3%',
                right: '12%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: 100,
                axisLabel: {
                    formatter: '{value}%',
                    fontSize: 11,
                    color: '#9ca3af'
                },
                splitLine: {
                    lineStyle: { color: '#f3f4f6' }
                }
            },
            yAxis: {
                type: 'category',
                data: eventNames,
                axisLabel: {
                    fontSize: 12,
                    color: '#374151',
                    width: 180,
                    overflow: 'truncate',
                    formatter: (value) => {
                        // Show full name up to 28 chars, then truncate
                        return value.length > 28 ? value.substring(0, 28) + '...' : value;
                    }
                },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            series: [
                {
                    name: 'Enrolled',
                    type: 'bar',
                    stack: 'total',
                    barWidth: 24,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#2c5f3f' },
                            { offset: 1, color: '#3d8b5a' }
                        ]),
                        borderRadius: [4, 0, 0, 4]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#3d8b5a' },
                                { offset: 1, color: '#4ade80' }
                            ]),
                            shadowBlur: 8,
                            shadowColor: 'rgba(44, 95, 63, 0.3)'
                        }
                    },
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: (params) => {
                            const event = reversed[params.dataIndex];
                            return event.percent >= 15 ? `${event.percent}%` : '';
                        },
                        fontSize: 11,
                        color: '#fff',
                        fontWeight: 'bold'
                    },
                    data: enrolledData
                },
                {
                    name: 'Remaining',
                    type: 'bar',
                    stack: 'total',
                    barWidth: 24,
                    itemStyle: {
                        color: '#e5e7eb',
                        borderRadius: [0, 4, 4, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#d1d5db'
                        }
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: (params) => {
                            const event = reversed[params.dataIndex];
                            return `${event.enrolled}/${event.capacity}`;
                        },
                        fontSize: 11,
                        color: '#6b7280'
                    },
                    data: remainingData
                }
            ]
        };
    }
    /**
     * Check if we have event status data for the chart
     */
    hasEventStatusData() {
        return this.allEvents.length > 0;
    }
    /**
     * Get count for a specific status
     */
    getStatusCount(status) {
        if (status === 'All')
            return this.allEvents.length;
        return this.allEvents.filter(e => e.status === status).length;
    }
    /**
     * Get participant percentage for display
     */
    getParticipantPercent(event) {
        if (!event.maxParticipants || event.maxParticipants === 0)
            return 0;
        return Math.round((event.participantCount / event.maxParticipants) * 100);
    }
    /**
     * Get points distribution percentage
     */
    getPointsPercent(event) {
        if (!event.totalPointsPool || event.totalPointsPool === 0)
            return 0;
        return Math.round((event.distributedPoints / event.totalPointsPool) * 100);
    }
    /**
     * Get total pages for pagination
     */
    get totalPages() {
        return Math.ceil(this.events.length / this.pageSize);
    }
    /**
     * Sort change handler
     */
    onSortChange() {
        this.applyStatusFilter();
    }
    /**
     * Apply status tab filter to events for display
     */
    applyStatusFilter() {
        let filtered = [...this.allEvents];
        // Filter by status tab
        if (this.activeStatusTab !== 'All') {
            filtered = filtered.filter(e => e.status === this.activeStatusTab);
        }
        // Filter by search text
        if (this.searchText) {
            const search = this.searchText.toLowerCase();
            filtered = filtered.filter(e => e.name.toLowerCase().includes(search) ||
                e.description?.toLowerCase().includes(search));
        }
        // Apply sorting
        filtered = this.applySorting(filtered);
        this.events = filtered;
        console.log('[EventMgmt] Filtered events:', this.events.length);
        this.applyPagination();
    }
    /**
     * Apply sorting to events
     */
    applySorting(events) {
        return events.sort((a, b) => {
            switch (this.sortBy) {
                case 'participants':
                    return (b.participantCount || 0) - (a.participantCount || 0);
                case 'pointsPool':
                    return (b.totalPointsPool || 0) - (a.totalPointsPool || 0);
                case 'pointsDistributed':
                    const percentA = a.totalPointsPool ? (a.distributedPoints / a.totalPointsPool) : 0;
                    const percentB = b.totalPointsPool ? (b.distributedPoints / b.totalPointsPool) : 0;
                    return percentB - percentA;
                case 'eventDate':
                default:
                    return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
            }
        });
    }
    /**
     * Close error alert
     */
    closeErrorAlert() {
        this.showErrorAlert = false;
    }
    /**
     * Apply pagination to events
     */
    applyPagination() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.filteredEvents = this.events.slice(start, end);
    }
    /**
     * Filter by status tab (no reload, just filter)
     */
    onStatusTabChange(status) {
        this.activeStatusTab = status;
        this.currentPage = 1;
        this.applyStatusFilter();
        this.cdr.markForCheck();
    }
    /**
     * Handle search with debounce
     */
    onSearch(text) {
        this.searchText = text;
        this.currentPage = 1;
        this.applyStatusFilter();
        this.cdr.markForCheck();
    }
    /**
     * Navigate to event detail
     */
    openEventDetail(eventId) {
        this.router.navigateByUrl(`/admin/events/${eventId}`);
    }
    /**
     * Open Create Event modal
     */
    createEvent() {
        this.resetEventForm();
        this.showCreateEventModal = true;
        this.showEditEventModal = false;
        this.editingEventId = null;
        this.cdr.markForCheck();
    }
    /**
     * Open Edit Event modal with prefilled data
     */
    openEditEventModal(event) {
        this.editingEventId = event.id;
        this.newEvent = {
            name: event.name,
            description: event.description || '',
            eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
            location: event.location || '',
            maxParticipants: event.maxParticipants,
            totalPointsPool: event.totalPointsPool || 0,
            registrationEndDateUtc: event.registrationEndDateUtc ? event.registrationEndDateUtc.split('T')[0] : ''
        };
        this.showEditEventModal = true;
        this.showCreateEventModal = false;
        this.cdr.markForCheck();
    }
    /**
     * Close the event modal
     */
    closeEventModal() {
        this.showCreateEventModal = false;
        this.showEditEventModal = false;
        this.editingEventId = null;
        this.resetEventForm();
        this.cdr.markForCheck();
    }
    /**
     * Reset the event form
     */
    resetEventForm() {
        const today = new Date().toISOString().split('T')[0];
        this.newEvent = {
            name: '',
            description: '',
            eventDate: today,
            location: '',
            maxParticipants: undefined,
            totalPointsPool: 0,
            registrationEndDateUtc: ''
        };
    }
    /**
     * Validate event form
     */
    validateEventForm() {
        if (!this.newEvent.name || this.newEvent.name.length < 3) {
            this.errorMessage = 'Event name must be at least 3 characters';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.newEvent.description || this.newEvent.description.length < 10) {
            this.errorMessage = 'Description must be at least 10 characters';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.newEvent.eventDate) {
            this.errorMessage = 'Event date is required';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.newEvent.registrationEndDateUtc) {
            this.errorMessage = 'Registration end date is required';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.newEvent.totalPointsPool || this.newEvent.totalPointsPool < 1) {
            this.errorMessage = 'Total points pool must be at least 1';
            this.showErrorAlert = true;
            return false;
        }
        // Validate dates
        const eventDate = new Date(this.newEvent.eventDate);
        const regEndDate = new Date(this.newEvent.registrationEndDateUtc);
        if (regEndDate > eventDate) {
            this.errorMessage = 'Registration deadline must be before or on event date';
            this.showErrorAlert = true;
            return false;
        }
        return true;
    }
    /**
     * Submit new event
     */
    submitNewEvent() {
        this.showErrorAlert = false;
        if (!this.validateEventForm()) {
            return;
        }
        this.isSubmittingEvent = true;
        this.eventService.createEvent(this.newEvent)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (event) => {
                console.log('[EventMgmt] Event created:', event);
                this.isSubmittingEvent = false;
                this.closeEventModal();
                this.successMessage = `Event "${event.name}" created successfully!`;
                this.loadEvents();
                this.cdr.markForCheck();
                // Clear success message after 3 seconds
                setTimeout(() => {
                    this.successMessage = null;
                    this.cdr.markForCheck();
                }, 3000);
            },
            error: (error) => {
                console.error('[EventMgmt] Error creating event:', error);
                this.isSubmittingEvent = false;
                this.errorMessage = 'Failed to create event. Please try again.';
                this.showErrorAlert = true;
                this.cdr.markForCheck();
            }
        });
    }
    /**
     * Submit event update
     */
    submitEditEvent() {
        this.showErrorAlert = false;
        if (!this.validateEventForm() || !this.editingEventId) {
            return;
        }
        this.isSubmittingEvent = true;
        const updateRequest = {
            name: this.newEvent.name,
            description: this.newEvent.description,
            eventDate: this.newEvent.eventDate,
            location: this.newEvent.location || undefined,
            maxParticipants: this.newEvent.maxParticipants,
            totalPointsPool: this.newEvent.totalPointsPool,
            registrationEndDateUtc: this.newEvent.registrationEndDateUtc
        };
        this.eventService.updateEvent(this.editingEventId, updateRequest)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (event) => {
                console.log('[EventMgmt] Event updated:', event);
                this.isSubmittingEvent = false;
                this.closeEventModal();
                this.successMessage = `Event "${event.name}" updated successfully!`;
                this.loadEvents();
                this.cdr.markForCheck();
                // Clear success message after 3 seconds
                setTimeout(() => {
                    this.successMessage = null;
                    this.cdr.markForCheck();
                }, 3000);
            },
            error: (error) => {
                console.error('[EventMgmt] Error updating event:', error);
                this.isSubmittingEvent = false;
                this.errorMessage = 'Failed to update event. Please try again.';
                this.showErrorAlert = true;
                this.cdr.markForCheck();
            }
        });
    }
    /**
     * Get status badge background color - updated per spec
     */
    getStatusColor(status) {
        const colors = {
            'Live': '#16A34A', // Green
            'Upcoming': '#F59E0B', // Amber/Orange
            'Completed': '#EC4899', // Pink
            'Cancelled': '#EF4444' // Red
        };
        return colors[status] || '#6B7280';
    }
    /**
     * Get status text color for contrast
     */
    getStatusTextColor(status) {
        // All status badges use white text for high contrast
        return '#FFFFFF';
    }
    /**
     * Format date
     */
    formatDate(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    /**
     * Page change handler
     */
    onPageChange(newPage) {
        this.currentPage = newPage;
        this.applyPagination();
        this.cdr.markForCheck();
    }
    /**
     * Get total pages (legacy method for template compatibility)
     */
    getTotalPages() {
        return this.totalPages;
    }
    static { this.ɵfac = function EventManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventManagementComponent)(i0.ɵɵdirectiveInject(i1.EventService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventManagementComponent, selectors: [["app-event-management"]], viewQuery: function EventManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.eventsTable = _t.first);
        } }, features: [i0.ɵɵProvidersFeature([
                provideEchartsCore({ echarts })
            ])], decls: 15, vars: 6, consts: [[1, "admin-events-wrapper"], [1, "admin-events-main"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "header-right"], ["class", "user-info", 4, "ngIf"], [1, "main-content"], ["class", "success-alert", "role", "alert", 4, "ngIf"], ["class", "error-alert", "role", "alert", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "fa-solid", "fa-shield-halved"], ["role", "alert", 1, "success-alert"], [1, "fa-solid", "fa-circle-check"], ["aria-label", "Dismiss", 1, "alert-dismiss", 3, "click"], [1, "fa-solid", "fa-xmark"], ["role", "alert", 1, "error-alert"], [1, "fa-solid", "fa-circle-exclamation"], [1, "loading-container"], [1, "loading-spinner"], ["aria-label", "Event Analytics", 1, "charts-section"], [1, "charts-grid"], [1, "chart-card"], [1, "chart-header"], [1, "chart-title-group"], [1, "chart-title"], [1, "chart-subtitle"], [1, "chart-body"], ["echarts", "", "class", "status-chart", "aria-label", "Pie chart showing events status distribution", 3, "options", "merge", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], ["echarts", "", "class", "enrollment-chart", "aria-label", "Horizontal bar chart showing enrollment progress for upcoming events", 3, "options", "merge", 4, "ngIf"], ["class", "chart-legend", 4, "ngIf"], [1, "controls-section"], [1, "controls-card"], [1, "controls-row"], [1, "search-group"], [1, "fa-solid", "fa-magnifying-glass", "search-icon"], ["type", "text", "placeholder", "Search events by name...", "aria-label", "Search events", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "btn-primary", 3, "click"], [1, "fa-solid", "fa-plus"], [1, "sort-group"], [1, "sort-label"], ["aria-label", "Sort events by", 1, "sort-select", 3, "ngModelChange", "change", "ngModel"], ["value", "eventDate"], ["value", "participants"], ["value", "pointsPool"], ["value", "pointsDistributed"], [1, "tabs-section"], [1, "tabs-bar"], ["class", "tab-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "table-section"], [1, "table-container"], ["class", "events-table", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], ["echarts", "", "aria-label", "Pie chart showing events status distribution", 1, "status-chart", 3, "options", "merge"], [1, "chart-empty"], [1, "fa-regular", "fa-chart-pie"], ["echarts", "", "aria-label", "Horizontal bar chart showing enrollment progress for upcoming events", 1, "enrollment-chart", 3, "options", "merge"], [1, "fa-regular", "fa-chart-bar"], [1, "chart-legend"], [1, "legend-item"], [1, "legend-color", "enrolled"], [1, "legend-label"], [1, "legend-color", "remaining"], [1, "tab-btn", 3, "click"], ["class", "tab-count", 4, "ngIf"], [1, "tab-count"], [1, "events-table"], ["class", "event-row", "tabindex", "0", "role", "button", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", "role", "button", 1, "event-row", 3, "click", "keydown.enter"], [1, "event-cell"], [1, "event-info"], [1, "event-name"], [1, "event-desc"], [1, "status-tag"], [1, "date-cell"], [1, "participants-cell"], [1, "progress-cell"], [1, "progress-percent"], [1, "mini-progress"], [1, "mini-progress-fill"], [1, "progress-counts"], [1, "points-cell"], [1, "empty-state"], [1, "fa-regular", "fa-calendar-xmark"], [1, "empty-subtext"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "fa-solid", "fa-chevron-left"], [1, "page-info"], [1, "fa-solid", "fa-chevron-right"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-form", 3, "ngSubmit"], [1, "form-group"], ["for", "eventName", 1, "form-label"], [1, "required"], ["type", "text", "id", "eventName", "name", "name", "placeholder", "Enter event name", "required", "", "minlength", "3", "maxlength", "100", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "eventDescription", 1, "form-label"], ["id", "eventDescription", "name", "description", "placeholder", "Enter event description", "required", "", "minlength", "10", "maxlength", "500", "rows", "3", 1, "form-input", "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "eventDate", 1, "form-label"], ["type", "datetime-local", "id", "eventDate", "name", "eventDate", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "registrationEndDate", 1, "form-label"], ["type", "datetime-local", "id", "registrationEndDate", "name", "registrationEndDateUtc", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "maxParticipants", 1, "form-label"], ["type", "number", "id", "maxParticipants", "name", "maxParticipants", "placeholder", "Leave empty for unlimited", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "totalPointsPool", 1, "form-label"], ["type", "number", "id", "totalPointsPool", "name", "totalPointsPool", "placeholder", "Enter points pool", "required", "", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "location", 1, "form-label"], ["type", "text", "id", "location", "name", "location", "placeholder", "Enter location (optional)", "maxlength", "200", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "fa-solid", "fa-spinner", "fa-spin"], [1, "fa-solid", "fa-check"]], template: function EventManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "h1", 4);
            i0.ɵɵtext(6, "Events Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5);
            i0.ɵɵtemplate(8, EventManagementComponent_div_8_Template, 6, 3, "div", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "main", 7);
            i0.ɵɵtemplate(10, EventManagementComponent_div_10_Template, 6, 1, "div", 8)(11, EventManagementComponent_div_11_Template, 6, 1, "div", 9)(12, EventManagementComponent_div_12_Template, 4, 0, "div", 10)(13, EventManagementComponent_ng_container_13_Template, 53, 12, "ng-container", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, EventManagementComponent_div_14_Template, 54, 12, "div", 12);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.currentUser);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCreateEventModal || ctx.showEditEventModal);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, FormsModule, i5.ɵNgNoValidate, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.MinLengthValidator, i5.MaxLengthValidator, i5.MinValidator, i5.NgModel, i5.NgForm, AdminSidebarComponent, NgxEchartsDirective, i4.SlicePipe, i4.DecimalPipe], styles: ["\n\n\n\n\n\n\n\n\n.admin-events-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: #f8faf9;\n}\n\n.admin-events-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n\n\n\n\n\n.page-header[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.page-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n\n.user-role[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.user-role[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n\n\n\n\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 32px;\n}\n\n\n\n\n\n.success-alert[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.success-alert[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n}\n\n.error-alert[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n}\n\n.success-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.success-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n}\n\n.alert-dismiss[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n\n.alert-dismiss[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.success-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\n  color: #047857;\n}\n\n.error-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n\n\n\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  gap: 16px;\n}\n\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to { transform: rotate(360deg); }\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n\n\n\n\n.charts-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.chart-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.chart-title-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.chart-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.chart-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n}\n\n.chart-body[_ngcontent-%COMP%] {\n  min-height: 200px;\n}\n\n.status-chart[_ngcontent-%COMP%], \n.enrollment-chart[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n}\n\n.chart-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 200px;\n  color: #9ca3af;\n}\n\n.chart-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.legend-color[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 3px;\n}\n\n.legend-color.enrolled[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #2c5f3f, #3d8b5a);\n}\n\n.legend-color.remaining[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n}\n\n.legend-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n\n\n\n\n.controls-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.controls-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 20px 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.controls-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.search-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 280px;\n  position: relative;\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 14px;\n  pointer-events: none;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px 10px 40px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: #2c5f3f;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #1e4620;\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\n}\n\n.btn-primary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.sort-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.sort-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  white-space: nowrap;\n}\n\n.sort-select[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n}\n\n.sort-select[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n}\n\n.sort-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n\n\n\n\n.tabs-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 4px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.tab-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 20px;\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.tab-btn[_ngcontent-%COMP%]:hover:not(.active) {\n  color: #374151;\n  background: #f9fafb;\n}\n\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: #2c5f3f;\n  color: #ffffff;\n  font-weight: 600;\n}\n\n.tab-btn.active[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 0;\n  height: 0;\n}\n\n.tab-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.1);\n}\n\n.tab-btn.active[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n}\n\n\n\n\n\n.table-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.events-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.events-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n}\n\n.events-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f3f4f6;\n  transition: background-color 0.15s ease;\n}\n\n.event-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.event-row[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n\n.events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  color: #1f2937;\n  vertical-align: middle;\n}\n\n\n\n.event-cell[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n\n.event-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.event-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.event-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  line-height: 1.4;\n}\n\n\n\n.status-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  background: #ffffff;\n  border: 1px solid;\n}\n\n.status-tag.status-upcoming[_ngcontent-%COMP%] {\n  color: #0891b2;\n  border-color: #0891b2;\n}\n\n.status-tag.status-live[_ngcontent-%COMP%] {\n  color: #16a34a;\n  border-color: #16a34a;\n}\n\n.status-tag.status-completed[_ngcontent-%COMP%] {\n  color: #6b7280;\n  border-color: #d1d5db;\n}\n\n.status-tag.status-cancelled[_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: #dc2626;\n}\n\n\n\n.date-cell[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: #6b7280;\n  font-size: 13px;\n}\n\n\n\n.participants-cell[_ngcontent-%COMP%], \n.points-cell[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n\n.progress-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.progress-percent[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.mini-progress[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 6px;\n  background: #e5e7eb;\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.mini-progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #2c5f3f, #3d8b5a);\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n\n.progress-counts[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  color: #9ca3af;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n\n.empty-subtext[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin-top: 8px !important;\n}\n\n\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n}\n\n\n\n\n\n@media (max-width: 1200px) {\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n  }\n\n  .main-content[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n  }\n\n  .controls-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-group[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n\n  .sort-group[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .sort-select[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .tabs-bar[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    gap: 4px;\n  }\n\n  .tab-btn[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    padding: 10px 16px;\n    font-size: 13px;\n  }\n\n  .events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), \n   .events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4), \n   .events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(5), \n   .events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(5) {\n    display: none;\n  }\n}\n\n@media (max-width: 480px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n\n  .header-right[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .user-info[_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    width: 100%;\n  }\n\n  .events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3), \n   .events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3) {\n    display: none;\n  }\n}\n\n\n\n\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.modal-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: #f3f4f6;\n  border-radius: 6px;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n  color: #374151;\n}\n\n.modal-form[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 6px;\n}\n\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  font-size: 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #1f2937;\n  transition: all 0.15s ease;\n  box-sizing: border-box;\n}\n\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n  margin-top: 8px;\n  border-top: 1px solid #e5e7eb;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.modal-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  border: none;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #2c5f3f 0%, #3d8b5a 100%);\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.modal-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: linear-gradient(135deg, #234a32 0%, #2c6b45 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.25);\n}\n\n.modal-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.modal-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n\n\n\n@media (max-width: 600px) {\n  .modal-content[_ngcontent-%COMP%] {\n    margin: 16px;\n    max-width: calc(100% - 32px);\n  }\n\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .modal-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n\n  .modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-event-management', standalone: true, imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective], providers: [
                    provideEchartsCore({ echarts })
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"admin-events-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"admin-events-main\">\r\n    <!-- Header - Matches Products/Users -->\r\n    <header class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Events Management</h1>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <div class=\"user-info\" *ngIf=\"currentUser\">\r\n          <span class=\"user-name\">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>\r\n          <span class=\"user-role\">\r\n            <i class=\"fa-solid fa-shield-halved\"></i>\r\n            {{ currentUser?.roles?.[0] || 'Admin' }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"main-content\">\r\n      <!-- Success Message -->\r\n      <div class=\"success-alert\" *ngIf=\"successMessage\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-check\"></i>\r\n        <span>{{ successMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"successMessage = null\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Error Message -->\r\n      <div class=\"error-alert\" *ngIf=\"showErrorAlert\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span>{{ errorMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"closeErrorAlert()\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"loading-spinner\"></div>\r\n        <p>Loading events...</p>\r\n      </div>\r\n\r\n      <ng-container *ngIf=\"!isLoading\">\r\n        <!-- Charts Section - 2 charts side by side -->\r\n        <section class=\"charts-section\" aria-label=\"Event Analytics\">\r\n          <div class=\"charts-grid\">\r\n            <!-- Chart 1: Events Status Pie Chart -->\r\n            <div class=\"chart-card\">\r\n              <div class=\"chart-header\">\r\n                <div class=\"chart-title-group\">\r\n                  <h2 class=\"chart-title\">Events Status</h2>\r\n                  <p class=\"chart-subtitle\">Distribution by status</p>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-body\">\r\n                <div \r\n                  *ngIf=\"hasEventStatusData()\"\r\n                  echarts \r\n                  [options]=\"eventStatusChartOption\" \r\n                  [merge]=\"eventStatusChartOption\"\r\n                  class=\"status-chart\"\r\n                  aria-label=\"Pie chart showing events status distribution\">\r\n                </div>\r\n                <div class=\"chart-empty\" *ngIf=\"!hasEventStatusData()\">\r\n                  <i class=\"fa-regular fa-chart-pie\"></i>\r\n                  <p>No event data available</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Chart 2: Enrollment Progress Bar Chart -->\r\n            <div class=\"chart-card\">\r\n              <div class=\"chart-header\">\r\n                <div class=\"chart-title-group\">\r\n                  <h2 class=\"chart-title\">Participants Enrollment Progress</h2>\r\n                  <p class=\"chart-subtitle\">Top {{ topNUpcoming }} upcoming events by enrollment</p>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-body\">\r\n                <div \r\n                  *ngIf=\"upcomingEventsForChart().length > 0\"\r\n                  echarts \r\n                  [options]=\"enrollmentChartOption\" \r\n                  [merge]=\"enrollmentChartOption\"\r\n                  class=\"enrollment-chart\"\r\n                  aria-label=\"Horizontal bar chart showing enrollment progress for upcoming events\">\r\n                </div>\r\n                <div class=\"chart-empty\" *ngIf=\"upcomingEventsForChart().length === 0\">\r\n                  <i class=\"fa-regular fa-chart-bar\"></i>\r\n                  <p>No upcoming events found</p>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-legend\" *ngIf=\"upcomingEventsForChart().length > 0\">\r\n                <div class=\"legend-item\">\r\n                  <span class=\"legend-color enrolled\"></span>\r\n                  <span class=\"legend-label\">Enrolled</span>\r\n                </div>\r\n                <div class=\"legend-item\">\r\n                  <span class=\"legend-color remaining\"></span>\r\n                  <span class=\"legend-label\">Available Slots</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Controls Card -->\r\n        <section class=\"controls-section\">\r\n          <div class=\"controls-card\">\r\n            <div class=\"controls-row\">\r\n              <!-- Search -->\r\n              <div class=\"search-group\">\r\n                <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n                <input\r\n                  type=\"text\"\r\n                  class=\"search-input\"\r\n                  placeholder=\"Search events by name...\"\r\n                  [(ngModel)]=\"searchText\"\r\n                  (input)=\"onSearch(searchText)\"\r\n                  aria-label=\"Search events\"\r\n                />\r\n              </div>\r\n\r\n              <!-- Create Event Button -->\r\n              <button class=\"btn-primary\" (click)=\"createEvent()\">\r\n                <i class=\"fa-solid fa-plus\"></i>\r\n                Create Event\r\n              </button>\r\n\r\n              <!-- Sort By Dropdown -->\r\n              <div class=\"sort-group\">\r\n                <label class=\"sort-label\">Sort by:</label>\r\n                <select \r\n                  class=\"sort-select\"\r\n                  [(ngModel)]=\"sortBy\"\r\n                  (change)=\"onSortChange()\"\r\n                  aria-label=\"Sort events by\">\r\n                  <option value=\"eventDate\">Event Date</option>\r\n                  <option value=\"participants\">Participants</option>\r\n                  <option value=\"pointsPool\">Points Pool</option>\r\n                  <option value=\"pointsDistributed\">Points Distributed (%)</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Tabs Bar -->\r\n        <section class=\"tabs-section\">\r\n          <div class=\"tabs-bar\">\r\n            <button \r\n              *ngFor=\"let status of statusOptions\"\r\n              class=\"tab-btn\"\r\n              [class.active]=\"activeStatusTab === status.value\"\r\n              (click)=\"onStatusTabChange(status.value)\"\r\n            >\r\n              {{ status.label }}\r\n              <span class=\"tab-count\" *ngIf=\"getStatusCount(status.value) > 0\">\r\n                {{ getStatusCount(status.value) }}\r\n              </span>\r\n            </button>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Events Table -->\r\n        <section class=\"table-section\">\r\n          <div class=\"table-container\">\r\n            <table class=\"events-table\" *ngIf=\"filteredEvents.length > 0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Event Name</th>\r\n                  <th>Status</th>\r\n                  <th>Date</th>\r\n                  <th>Participants</th>\r\n                  <th>Points</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr \r\n                  *ngFor=\"let event of filteredEvents\"\r\n                  class=\"event-row\"\r\n                  (click)=\"openEventDetail(event.id)\"\r\n                  tabindex=\"0\"\r\n                  (keydown.enter)=\"openEventDetail(event.id)\"\r\n                  role=\"button\"\r\n                  [attr.aria-label]=\"'View details for ' + event.name\"\r\n                >\r\n                  <td class=\"event-cell\">\r\n                    <div class=\"event-info\">\r\n                      <div class=\"event-name\">{{ event.name }}</div>\r\n                      <div class=\"event-desc\">{{ event.description | slice:0:60 }}{{ event.description && event.description.length > 60 ? '...' : '' }}</div>\r\n                    </div>\r\n                  </td>\r\n                  <td>\r\n                    <span class=\"status-tag\" [class]=\"'status-' + event.status.toLowerCase()\">\r\n                      {{ event.status }}\r\n                    </span>\r\n                  </td>\r\n                  <td class=\"date-cell\">\r\n                    {{ formatDate(event.eventDate) }}\r\n                  </td>\r\n                  <td class=\"participants-cell\">\r\n                    <div class=\"progress-cell\">\r\n                      <span class=\"progress-percent\">{{ getParticipantPercent(event) }}%</span>\r\n                      <div class=\"mini-progress\">\r\n                        <div class=\"mini-progress-fill\" [style.width.%]=\"getParticipantPercent(event)\"></div>\r\n                      </div>\r\n                      <span class=\"progress-counts\">{{ event.participantCount }} / {{ event.maxParticipants || '\u221E' }}</span>\r\n                    </div>\r\n                  </td>\r\n                  <td class=\"points-cell\">\r\n                    <div class=\"progress-cell\">\r\n                      <span class=\"progress-percent\">{{ getPointsPercent(event) }}%</span>\r\n                      <div class=\"mini-progress\">\r\n                        <div class=\"mini-progress-fill\" [style.width.%]=\"getPointsPercent(event)\"></div>\r\n                      </div>\r\n                      <span class=\"progress-counts\">{{ event.distributedPoints | number }} / {{ event.totalPointsPool | number }}</span>\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n            <!-- Empty State -->\r\n            <div class=\"empty-state\" *ngIf=\"filteredEvents.length === 0 && !hasLoadError\">\r\n              <i class=\"fa-regular fa-calendar-xmark\"></i>\r\n              <p>No events found</p>\r\n              <p class=\"empty-subtext\">Create your first event to get started</p>\r\n            </div>\r\n\r\n            <!-- Pagination -->\r\n            <div class=\"pagination\" *ngIf=\"totalPages > 1\">\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage === 1\"\r\n                (click)=\"onPageChange(currentPage - 1)\"\r\n              >\r\n                <i class=\"fa-solid fa-chevron-left\"></i> Previous\r\n              </button>\r\n              <div class=\"page-info\">\r\n                Page {{ currentPage }} of {{ totalPages }}\r\n              </div>\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage >= totalPages\"\r\n                (click)=\"onPageChange(currentPage + 1)\"\r\n              >\r\n                Next <i class=\"fa-solid fa-chevron-right\"></i>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </ng-container>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- Create/Edit Event Modal -->\r\n  <div class=\"modal-overlay\" *ngIf=\"showCreateEventModal || showEditEventModal\" (click)=\"closeEventModal()\">\r\n    <div class=\"modal-content\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h3>{{ showEditEventModal ? 'Edit Event' : 'Create New Event' }}</h3>\r\n        <button class=\"modal-close\" (click)=\"closeEventModal()\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n      \r\n      <form class=\"modal-form\" (ngSubmit)=\"showEditEventModal ? submitEditEvent() : submitNewEvent()\">\r\n        <!-- Event Name -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\" for=\"eventName\">\r\n            Event Name <span class=\"required\">*</span>\r\n          </label>\r\n          <input \r\n            type=\"text\" \r\n            id=\"eventName\"\r\n            class=\"form-input\"\r\n            [(ngModel)]=\"newEvent.name\"\r\n            name=\"name\"\r\n            placeholder=\"Enter event name\"\r\n            required\r\n            minlength=\"3\"\r\n            maxlength=\"100\"\r\n          />\r\n        </div>\r\n\r\n        <!-- Description -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\" for=\"eventDescription\">\r\n            Description <span class=\"required\">*</span>\r\n          </label>\r\n          <textarea \r\n            id=\"eventDescription\"\r\n            class=\"form-input form-textarea\"\r\n            [(ngModel)]=\"newEvent.description\"\r\n            name=\"description\"\r\n            placeholder=\"Enter event description\"\r\n            required\r\n            minlength=\"10\"\r\n            maxlength=\"500\"\r\n            rows=\"3\"\r\n          ></textarea>\r\n        </div>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Event Date -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"eventDate\">\r\n              Event Date & Time <span class=\"required\">*</span>\r\n            </label>\r\n            <input \r\n              type=\"datetime-local\" \r\n              id=\"eventDate\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"newEvent.eventDate\"\r\n              name=\"eventDate\"\r\n              required\r\n            />\r\n          </div>\r\n\r\n          <!-- Registration End Date -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"registrationEndDate\">\r\n              Registration Deadline <span class=\"required\">*</span>\r\n            </label>\r\n            <input \r\n              type=\"datetime-local\" \r\n              id=\"registrationEndDate\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"newEvent.registrationEndDateUtc\"\r\n              name=\"registrationEndDateUtc\"\r\n              required\r\n            />\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"form-row\">\r\n          <!-- Max Participants -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"maxParticipants\">\r\n              Max Participants\r\n            </label>\r\n            <input \r\n              type=\"number\" \r\n              id=\"maxParticipants\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"newEvent.maxParticipants\"\r\n              name=\"maxParticipants\"\r\n              placeholder=\"Leave empty for unlimited\"\r\n              min=\"0\"\r\n            />\r\n          </div>\r\n\r\n          <!-- Total Points Pool -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"totalPointsPool\">\r\n              Total Points Pool <span class=\"required\">*</span>\r\n            </label>\r\n            <input \r\n              type=\"number\" \r\n              id=\"totalPointsPool\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"newEvent.totalPointsPool\"\r\n              name=\"totalPointsPool\"\r\n              placeholder=\"Enter points pool\"\r\n              required\r\n              min=\"1\"\r\n            />\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Location -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\" for=\"location\">\r\n            Location\r\n          </label>\r\n          <input \r\n            type=\"text\" \r\n            id=\"location\"\r\n            class=\"form-input\"\r\n            [(ngModel)]=\"newEvent.location\"\r\n            name=\"location\"\r\n            placeholder=\"Enter location (optional)\"\r\n            maxlength=\"200\"\r\n          />\r\n        </div>\r\n\r\n        <!-- Form Actions -->\r\n        <div class=\"modal-actions\">\r\n          <button \r\n            type=\"button\" \r\n            class=\"btn-secondary\"\r\n            (click)=\"closeEventModal()\"\r\n            [disabled]=\"isSubmittingEvent\"\r\n          >\r\n            Cancel\r\n          </button>\r\n          <button \r\n            type=\"submit\" \r\n            class=\"btn-primary\"\r\n            [disabled]=\"isSubmittingEvent\"\r\n          >\r\n            <span *ngIf=\"isSubmittingEvent\">\r\n              <i class=\"fa-solid fa-spinner fa-spin\"></i> Saving...\r\n            </span>\r\n            <span *ngIf=\"!isSubmittingEvent\">\r\n              <i class=\"fa-solid fa-check\"></i> {{ showEditEventModal ? 'Update Event' : 'Create Event' }}\r\n            </span>\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>", styles: ["/* Events Management - Redesigned Layout */\n/* Matches Products/Users header & structure */\n\n/* =================================\n   Layout Structure\n   ================================= */\n.admin-events-wrapper {\n  display: flex;\n  min-height: 100vh;\n  background: #f8faf9;\n}\n\n.admin-events-main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n\n/* =================================\n   Header (Matches Products/Users)\n   ================================= */\n.page-header {\n  background: #ffffff;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.page-title {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-name {\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n\n.user-role {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.user-role i {\n  font-size: 11px;\n}\n\n/* =================================\n   Main Content\n   ================================= */\n.main-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 32px;\n}\n\n/* =================================\n   Alerts\n   ================================= */\n.success-alert,\n.error-alert {\n  padding: 14px 16px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  animation: slideDown 0.3s ease;\n}\n\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.success-alert {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n}\n\n.error-alert {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n}\n\n.success-alert i,\n.error-alert i {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.success-alert span,\n.error-alert span {\n  flex: 1;\n  font-size: 14px;\n}\n\n.alert-dismiss {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n\n.alert-dismiss:hover {\n  opacity: 1;\n}\n\n.success-alert .alert-dismiss {\n  color: #047857;\n}\n\n.error-alert .alert-dismiss {\n  color: #dc2626;\n}\n\n/* =================================\n   Loading State\n   ================================= */\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  gap: 16px;\n}\n\n.loading-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n.loading-container p {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n/* =================================\n   Charts Section\n   ================================= */\n.charts-section {\n  margin-bottom: 24px;\n}\n\n.charts-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n.chart-card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.chart-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.chart-title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.chart-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.chart-subtitle {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n}\n\n.chart-body {\n  min-height: 200px;\n}\n\n.status-chart,\n.enrollment-chart {\n  width: 100%;\n  height: 200px;\n}\n\n.chart-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 200px;\n  color: #9ca3af;\n}\n\n.chart-empty i {\n  font-size: 40px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n\n.chart-empty p {\n  font-size: 14px;\n  margin: 0;\n}\n\n.chart-legend {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.legend-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.legend-color {\n  width: 12px;\n  height: 12px;\n  border-radius: 3px;\n}\n\n.legend-color.enrolled {\n  background: linear-gradient(135deg, #2c5f3f, #3d8b5a);\n}\n\n.legend-color.remaining {\n  background-color: #e5e7eb;\n}\n\n.legend-label {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n/* =================================\n   Controls Section\n   ================================= */\n.controls-section {\n  margin-bottom: 24px;\n}\n\n.controls-card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 20px 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.controls-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.search-group {\n  flex: 1;\n  min-width: 280px;\n  position: relative;\n}\n\n.search-icon {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 14px;\n  pointer-events: none;\n}\n\n.search-input {\n  width: 100%;\n  padding: 10px 14px 10px 40px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.search-input::placeholder {\n  color: #9ca3af;\n}\n\n.btn-primary {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: #2c5f3f;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n\n.btn-primary:hover {\n  background: #1e4620;\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\n}\n\n.btn-primary i {\n  font-size: 12px;\n}\n\n.sort-group {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.sort-label {\n  font-size: 13px;\n  color: #6b7280;\n  white-space: nowrap;\n}\n\n.sort-select {\n  padding: 10px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n}\n\n.sort-select:hover {\n  border-color: #d1d5db;\n}\n\n.sort-select:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n/* =================================\n   Tabs Section\n   ================================= */\n.tabs-section {\n  margin-bottom: 24px;\n}\n\n.tabs-bar {\n  display: flex;\n  gap: 0;\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 4px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.tab-btn {\n  flex: 1;\n  padding: 12px 20px;\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.tab-btn:hover:not(.active) {\n  color: #374151;\n  background: #f9fafb;\n}\n\n.tab-btn.active {\n  background: #2c5f3f;\n  color: #ffffff;\n  font-weight: 600;\n}\n\n.tab-btn.active::after {\n  content: '';\n  position: absolute;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 0;\n  height: 0;\n}\n\n.tab-count {\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.1);\n}\n\n.tab-btn.active .tab-count {\n  background: rgba(255, 255, 255, 0.2);\n}\n\n/* =================================\n   Table Section\n   ================================= */\n.table-section {\n  margin-bottom: 24px;\n}\n\n.table-container {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.events-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.events-table thead {\n  background: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.events-table th {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n}\n\n.events-table tbody tr {\n  border-bottom: 1px solid #f3f4f6;\n  transition: background-color 0.15s ease;\n}\n\n.event-row {\n  cursor: pointer;\n}\n\n.event-row:hover {\n  background-color: #f9fafb;\n}\n\n.events-table td {\n  padding: 12px 16px;\n  color: #1f2937;\n  vertical-align: middle;\n}\n\n/* Event Cell */\n.event-cell {\n  min-width: 200px;\n}\n\n.event-info {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.event-name {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.event-desc {\n  font-size: 12px;\n  color: #9ca3af;\n  line-height: 1.4;\n}\n\n/* Status Tags - White background, green text */\n.status-tag {\n  display: inline-block;\n  padding: 4px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  background: #ffffff;\n  border: 1px solid;\n}\n\n.status-tag.status-upcoming {\n  color: #0891b2;\n  border-color: #0891b2;\n}\n\n.status-tag.status-live {\n  color: #16a34a;\n  border-color: #16a34a;\n}\n\n.status-tag.status-completed {\n  color: #6b7280;\n  border-color: #d1d5db;\n}\n\n.status-tag.status-cancelled {\n  color: #dc2626;\n  border-color: #dc2626;\n}\n\n/* Date Cell */\n.date-cell {\n  white-space: nowrap;\n  color: #6b7280;\n  font-size: 13px;\n}\n\n/* Progress Cells (Participants & Points) */\n.participants-cell,\n.points-cell {\n  min-width: 120px;\n}\n\n.progress-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.progress-percent {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.mini-progress {\n  width: 100%;\n  height: 6px;\n  background: #e5e7eb;\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.mini-progress-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #2c5f3f, #3d8b5a);\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n\n.progress-counts {\n  font-size: 11px;\n  color: #9ca3af;\n}\n\n/* Empty State */\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  color: #9ca3af;\n}\n\n.empty-state i {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n\n.empty-state p {\n  margin: 0;\n  font-size: 14px;\n}\n\n.empty-subtext {\n  font-size: 13px;\n  margin-top: 8px !important;\n}\n\n/* Pagination */\n.pagination {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.page-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.page-btn:hover:not(:disabled) {\n  background-color: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.page-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.page-info {\n  font-size: 13px;\n  color: #6b7280;\n}\n\n/* =================================\n   Responsive Design\n   ================================= */\n@media (max-width: 1200px) {\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header {\n    padding: 16px 20px;\n  }\n\n  .main-content {\n    padding: 16px 20px;\n  }\n\n  .controls-row {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-group {\n    min-width: 100%;\n  }\n\n  .sort-group {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .sort-select {\n    flex: 1;\n  }\n\n  .tabs-bar {\n    overflow-x: auto;\n    gap: 4px;\n  }\n\n  .tab-btn {\n    flex: 0 0 auto;\n    padding: 10px 16px;\n    font-size: 13px;\n  }\n\n  .events-table th:nth-child(4),\n  .events-table td:nth-child(4),\n  .events-table th:nth-child(5),\n  .events-table td:nth-child(5) {\n    display: none;\n  }\n}\n\n@media (max-width: 480px) {\n  .page-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n\n  .header-right {\n    width: 100%;\n  }\n\n  .user-info {\n    justify-content: flex-end;\n    width: 100%;\n  }\n\n  .events-table th:nth-child(3),\n  .events-table td:nth-child(3) {\n    display: none;\n  }\n}\n\n/* =================================\n   Modal Styles\n   ================================= */\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.modal-content {\n  background: #ffffff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n  animation: slideUp 0.3s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.modal-header h3 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.modal-close {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: #f3f4f6;\n  border-radius: 6px;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.modal-close:hover {\n  background: #e5e7eb;\n  color: #374151;\n}\n\n.modal-form {\n  padding: 24px;\n}\n\n.form-group {\n  margin-bottom: 20px;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.form-row .form-group {\n  margin-bottom: 20px;\n}\n\n.form-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 6px;\n}\n\n.form-label .required {\n  color: #ef4444;\n}\n\n.form-input {\n  width: 100%;\n  padding: 10px 14px;\n  font-size: 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #1f2937;\n  transition: all 0.15s ease;\n  box-sizing: border-box;\n}\n\n.form-input:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.form-input::placeholder {\n  color: #9ca3af;\n}\n\n.form-textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n  margin-top: 8px;\n  border-top: 1px solid #e5e7eb;\n}\n\n.btn-secondary {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n\n.btn-secondary:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n\n.btn-secondary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.modal-actions .btn-primary {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  border: none;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #2c5f3f 0%, #3d8b5a 100%);\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.modal-actions .btn-primary:hover:not(:disabled) {\n  background: linear-gradient(135deg, #234a32 0%, #2c6b45 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.25);\n}\n\n.modal-actions .btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.modal-actions .btn-primary i {\n  font-size: 13px;\n}\n\n/* Modal responsive */\n@media (max-width: 600px) {\n  .modal-content {\n    margin: 16px;\n    max-width: calc(100% - 32px);\n  }\n\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n\n  .modal-actions {\n    flex-direction: column-reverse;\n  }\n\n  .modal-actions button {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [{ type: i1.EventService }, { type: i2.AuthService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], { eventsTable: [{
            type: ViewChild,
            args: ['eventsTable']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventManagementComponent, { className: "EventManagementComponent", filePath: "src/app/pages/admin/events/event-management.component.ts", lineNumber: 35 }); })();
//# sourceMappingURL=event-management.component.js.map