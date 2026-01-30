import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { EventDetailOverviewComponent } from './tabs/event-detail-overview.component';
import { EventDetailParticipantsComponent } from './tabs/event-detail-participants.component';
import { EventDetailPointsComponent } from './tabs/event-detail-points.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/event.service";
import * as i2 from "../../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
const _c0 = ["participantsTab"];
const _c1 = ["pointsTab"];
function EventDetailComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading event details...");
    i0.ɵɵelementEnd()();
} }
function EventDetailComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "div", 9);
    i0.ɵɵelement(3, "i", 10);
    i0.ɵɵelementStart(4, "span", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 12);
    i0.ɵɵlistener("click", function EventDetailComponent_div_3_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeErrorAlert()); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function EventDetailComponent_div_4_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "button", 43);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_24_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.editEvent()); });
    i0.ɵɵelement(2, "i", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 45);
    i0.ɵɵtext(4, "Edit");
    i0.ɵɵelementEnd()();
} }
function EventDetailComponent_div_4_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "button", 46);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_25_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancelEvent()); });
    i0.ɵɵelement(2, "i", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 45);
    i0.ɵɵtext(4, "Cancel");
    i0.ɵɵelementEnd()();
} }
function EventDetailComponent_div_4_div_46_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "div", 60)(2, "span", 61);
    i0.ɵɵtext(3, "Event Name:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 62);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 60)(7, "span", 61);
    i0.ɵɵtext(8, "Current Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 63);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 60)(12, "span", 61);
    i0.ɵɵtext(13, "Participants:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 62);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.name);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("status-" + ctx_r1.event.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.event.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.participantCount);
} }
function EventDetailComponent_div_4_div_46_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_46_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmActivate = false); });
    i0.ɵɵelementStart(1, "div", 48);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_46_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r6); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 49)(3, "h3");
    i0.ɵɵelement(4, "i", 50);
    i0.ɵɵtext(5, " Activate Event?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_46_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmActivate = false); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 52)(9, "p");
    i0.ɵɵtext(10, "You're about to activate this event and set it to ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12, "Live");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ".");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, EventDetailComponent_div_4_div_46_div_14_Template, 16, 5, "div", 53);
    i0.ɵɵelementStart(15, "p", 54);
    i0.ɵɵelement(16, "i", 55);
    i0.ɵɵtext(17, " Once activated, registration will close and check-in will become available.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 56)(19, "button", 57);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_46_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmActivate = false); });
    i0.ɵɵtext(20, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 58);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_46_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.confirmActivateEvent()); });
    i0.ɵɵtext(22, "Yes, Activate Event");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r1.event);
} }
function EventDetailComponent_div_4_div_47_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "div", 60)(2, "span", 61);
    i0.ɵɵtext(3, "Event Name:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 62);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 60)(7, "span", 61);
    i0.ɵɵtext(8, "Current Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 63);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 60)(12, "span", 61);
    i0.ɵɵtext(13, "Participants:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 62);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.name);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("status-" + ctx_r1.event.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.event.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.participantCount);
} }
function EventDetailComponent_div_4_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_47_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmComplete = false); });
    i0.ɵɵelementStart(1, "div", 64);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_47_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r7); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 49)(3, "h3");
    i0.ɵɵelement(4, "i", 65);
    i0.ɵɵtext(5, " Complete Event?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_47_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmComplete = false); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 52)(9, "p");
    i0.ɵɵtext(10, "You're about to mark this event as ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12, "Completed");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ".");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, EventDetailComponent_div_4_div_47_div_14_Template, 16, 5, "div", 53);
    i0.ɵɵelementStart(15, "p", 66);
    i0.ɵɵelement(16, "i", 67);
    i0.ɵɵtext(17, " Once completed, you cannot change this status. Ensure all points have been awarded.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 56)(19, "button", 57);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_47_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmComplete = false); });
    i0.ɵɵtext(20, "Keep Editing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 68);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_47_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.confirmCompleteEvent()); });
    i0.ɵɵtext(22, "Yes, Complete Event");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r1.event);
} }
function EventDetailComponent_div_4_div_48_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "div", 60)(2, "span", 61);
    i0.ɵɵtext(3, "Event Name:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 62);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 60)(7, "span", 61);
    i0.ɵɵtext(8, "Current Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 63);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 60)(12, "span", 61);
    i0.ɵɵtext(13, "Participants Registered:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 62);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.name);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("status-" + ctx_r1.event.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getStatusLabel(ctx_r1.event.status));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.event.registeredCount);
} }
function EventDetailComponent_div_4_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_48_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmCancel = false); });
    i0.ɵɵelementStart(1, "div", 69);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_48_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 49)(3, "h3");
    i0.ɵɵelement(4, "i", 67);
    i0.ɵɵtext(5, " Cancel Event?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_48_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmCancel = false); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 52)(9, "p");
    i0.ɵɵtext(10, "You're about to ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12, "cancel this event");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ". This is a destructive action.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, EventDetailComponent_div_4_div_48_div_14_Template, 16, 5, "div", 53);
    i0.ɵɵelementStart(15, "p", 66);
    i0.ɵɵelement(16, "i", 67);
    i0.ɵɵtext(17, " All registered participants will be notified. Points already awarded will not be refunded.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 56)(19, "button", 57);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_48_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showConfirmCancel = false); });
    i0.ɵɵtext(20, "Keep Event");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 68);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_48_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.confirmCancelEvent()); });
    i0.ɵɵtext(22, "Yes, Cancel Event");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r1.event);
} }
function EventDetailComponent_div_4_div_49_span_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 93);
    i0.ɵɵtext(2, " Saving... ");
    i0.ɵɵelementEnd();
} }
function EventDetailComponent_div_4_div_49_span_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 94);
    i0.ɵɵtext(2, " Update Event ");
    i0.ɵɵelementEnd();
} }
function EventDetailComponent_div_4_div_49_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_49_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeEditModal()); });
    i0.ɵɵelementStart(1, "div", 71);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_49_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r9); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 49)(3, "h3");
    i0.ɵɵelement(4, "i", 44);
    i0.ɵɵtext(5, " Edit Event");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_49_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeEditModal()); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "form", 72);
    i0.ɵɵlistener("ngSubmit", function EventDetailComponent_div_4_div_49_Template_form_ngSubmit_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitEditEvent()); });
    i0.ɵɵelementStart(9, "div", 73)(10, "label", 74);
    i0.ɵɵtext(11, " Event Name ");
    i0.ɵɵelementStart(12, "span", 75);
    i0.ɵɵtext(13, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "input", 76);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.name, $event) || (ctx_r1.editForm.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 73)(16, "label", 77);
    i0.ɵɵtext(17, " Description ");
    i0.ɵɵelementStart(18, "span", 75);
    i0.ɵɵtext(19, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "textarea", 78);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_textarea_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.description, $event) || (ctx_r1.editForm.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 79)(22, "div", 73)(23, "label", 80);
    i0.ɵɵtext(24, " Event Date & Time ");
    i0.ɵɵelementStart(25, "span", 75);
    i0.ɵɵtext(26, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "input", 81);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_27_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.eventDate, $event) || (ctx_r1.editForm.eventDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 73)(29, "label", 82);
    i0.ɵɵtext(30, " Registration Deadline ");
    i0.ɵɵelementStart(31, "span", 75);
    i0.ɵɵtext(32, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "input", 83);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.registrationEndDateUtc, $event) || (ctx_r1.editForm.registrationEndDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 79)(35, "div", 73)(36, "label", 84);
    i0.ɵɵtext(37, " Max Participants ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "input", 85);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.maxParticipants, $event) || (ctx_r1.editForm.maxParticipants = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 73)(40, "label", 86);
    i0.ɵɵtext(41, " Total Points Pool ");
    i0.ɵɵelementStart(42, "span", 75);
    i0.ɵɵtext(43, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "input", 87);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.totalPointsPool, $event) || (ctx_r1.editForm.totalPointsPool = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "div", 73)(46, "label", 88);
    i0.ɵɵtext(47, " Location ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "input", 89);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailComponent_div_4_div_49_Template_input_ngModelChange_48_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.location, $event) || (ctx_r1.editForm.location = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 56)(50, "button", 90);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_div_49_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeEditModal()); });
    i0.ɵɵtext(51, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "button", 91);
    i0.ɵɵtemplate(53, EventDetailComponent_div_4_div_49_span_53_Template, 3, 0, "span", 92)(54, EventDetailComponent_div_4_div_49_span_54_Template, 3, 0, "span", 92);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.name);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.description);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.eventDate);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.registrationEndDateUtc);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.maxParticipants);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.totalPointsPool);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.location);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmittingEdit);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmittingEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isSubmittingEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isSubmittingEdit);
} }
function EventDetailComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 14)(2, "div", 15)(3, "button", 16);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goBack()); });
    i0.ɵɵelement(4, "i", 17);
    i0.ɵɵtext(5, " Back ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 18)(7, "div", 19)(8, "h1", 20);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 21)(11, "span", 22);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 23);
    i0.ɵɵtext(14, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 24);
    i0.ɵɵelement(16, "i", 25);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 23);
    i0.ɵɵtext(19, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 26);
    i0.ɵɵelement(21, "i", 27);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 28);
    i0.ɵɵtemplate(24, EventDetailComponent_div_4_div_24_Template, 5, 0, "div", 29)(25, EventDetailComponent_div_4_div_25_Template, 5, 0, "div", 29);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(26, "div", 30)(27, "div", 31)(28, "button", 32);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("overview")); });
    i0.ɵɵelement(29, "i", 33);
    i0.ɵɵtext(30, " Overview ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "button", 32);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("participants")); });
    i0.ɵɵelement(32, "i", 27);
    i0.ɵɵtext(33, " Participants ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 32);
    i0.ɵɵlistener("click", function EventDetailComponent_div_4_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("points")); });
    i0.ɵɵelement(35, "i", 34);
    i0.ɵɵtext(36, " Points & Rewards ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div", 35)(38, "div", 36);
    i0.ɵɵelement(39, "app-event-detail-overview", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 36)(41, "app-event-detail-participants", 38, 0);
    i0.ɵɵlistener("participantsChanged", function EventDetailComponent_div_4_Template_app_event_detail_participants_participantsChanged_41_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onParticipantsChanged()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 36)(44, "app-event-detail-points", 39, 1);
    i0.ɵɵlistener("pointsAwarded", function EventDetailComponent_div_4_Template_app_event_detail_points_pointsAwarded_44_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPointsAwarded()); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(46, EventDetailComponent_div_4_div_46_Template, 23, 1, "div", 40)(47, EventDetailComponent_div_4_div_47_Template, 23, 1, "div", 40)(48, EventDetailComponent_div_4_div_48_Template, 23, 1, "div", 40)(49, EventDetailComponent_div_4_div_49_Template, 55, 11, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.event == null ? null : ctx_r1.event.name);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("status-" + ((ctx_r1.event == null ? null : ctx_r1.event.status == null ? null : ctx_r1.event.status.toLowerCase()) || "upcoming"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.event == null ? null : ctx_r1.event.status, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatDate((ctx_r1.event == null ? null : ctx_r1.event.eventDate) || ""), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.event == null ? null : ctx_r1.event.participantCount) || (ctx_r1.event == null ? null : ctx_r1.event.registeredCount) || 0, " Participants ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r1.event == null ? null : ctx_r1.event.status) === "Upcoming");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.event == null ? null : ctx_r1.event.status) === "Upcoming" && ctx_r1.isAdmin());
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "overview");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "participants");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "points");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "overview");
    i0.ɵɵadvance();
    i0.ɵɵproperty("event", ctx_r1.event);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "participants");
    i0.ɵɵadvance();
    i0.ɵɵproperty("eventId", ctx_r1.eventId)("event", ctx_r1.event);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "points");
    i0.ɵɵadvance();
    i0.ɵɵproperty("eventId", ctx_r1.eventId)("event", ctx_r1.event);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.showConfirmActivate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showConfirmComplete);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showConfirmCancel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showEditEventModal);
} }
export class EventDetailComponent {
    constructor(eventService, authService, router, route, cdr) {
        this.eventService = eventService;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.cdr = cdr;
        // Public properties for template access
        this.Math = Math;
        // Data
        this.event = null;
        this.participants = [];
        this.awardedPoints = [];
        // UI State
        this.isLoading = false;
        this.activeTab = 'overview';
        this.eventId = '';
        this.showConfirmActivate = false;
        this.showConfirmComplete = false;
        this.showConfirmCancel = false;
        this.errorMessage = '';
        this.showErrorAlert = false;
        // Edit Modal State
        this.showEditEventModal = false;
        this.isSubmittingEdit = false;
        this.editForm = {
            name: '',
            description: '',
            eventDate: '',
            location: '',
            maxParticipants: undefined,
            totalPointsPool: 0,
            registrationEndDateUtc: ''
        };
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadCurrentUser();
        this.route.params
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
            this.eventId = params['id'];
            if (this.eventId) {
                this.loadEventDetail();
            }
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
        });
    }
    /**
     * Load event detail
     */
    loadEventDetail() {
        this.isLoading = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.eventService.getEventDetail(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            console.log('[EventDetail] Loading finished. deferring isLoading=false and detectChanges');
            setTimeout(() => {
                this.isLoading = false;
                try {
                    this.cdr.detectChanges();
                }
                catch (e) { /* ignore */ }
                console.log('[EventDetail] isLoading false and change detection run');
            }, 0);
        }))
            .subscribe({
            next: (data) => {
                console.log('[EventDetail] Event loaded:', data);
                if (data) {
                    this.event = data;
                    try {
                        this.cdr.detectChanges();
                    }
                    catch (e) { /* ignore */ }
                }
                else {
                    console.warn('[EventDetail] No data returned from service');
                    this.errorMessage = 'No event data available';
                    this.showErrorAlert = true;
                }
            },
            error: (error) => {
                console.error('[EventDetail] Error loading event:', error);
                this.event = null;
                this.errorMessage = `Failed to load event: ${error?.status || error?.message || 'Unknown error'}`;
                this.showErrorAlert = true;
            }
        });
    }
    /**
     * Switch active tab
     */
    switchTab(tab) {
        this.activeTab = tab;
    }
    /**
     * Close error alert
     */
    closeErrorAlert() {
        this.showErrorAlert = false;
    }
    /**
     * Go back to event list
     */
    goBack() {
        this.router.navigateByUrl('/admin/events');
    }
    /**
     * Open Edit Event modal with prefilled data
     */
    editEvent() {
        if (!this.event)
            return;
        // Format dates for datetime-local input (YYYY-MM-DDTHH:mm)
        const formatForInput = (dateStr) => {
            if (!dateStr)
                return '';
            const date = new Date(dateStr);
            // Adjust for local timezone
            const offset = date.getTimezoneOffset() * 60000;
            const localDate = new Date(date.getTime() - offset);
            return localDate.toISOString().slice(0, 16);
        };
        // Populate form with current event data
        this.editForm = {
            name: this.event.name || '',
            description: this.event.description || '',
            eventDate: formatForInput(this.event.eventDate),
            location: this.event.location || '',
            maxParticipants: this.event.maxParticipants,
            totalPointsPool: this.event.totalPointsPool || 0,
            registrationEndDateUtc: formatForInput(this.event.registrationEndDateUtc)
        };
        this.showEditEventModal = true;
        this.cdr.markForCheck();
    }
    /**
     * Close edit modal
     */
    closeEditModal() {
        this.showEditEventModal = false;
        this.isSubmittingEdit = false;
        this.cdr.markForCheck();
    }
    /**
     * Validate edit form
     */
    validateEditForm() {
        if (!this.editForm.name || this.editForm.name.length < 3) {
            this.errorMessage = 'Event name must be at least 3 characters';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.editForm.description || this.editForm.description.length < 10) {
            this.errorMessage = 'Description must be at least 10 characters';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.editForm.eventDate) {
            this.errorMessage = 'Event date is required';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.editForm.registrationEndDateUtc) {
            this.errorMessage = 'Registration end date is required';
            this.showErrorAlert = true;
            return false;
        }
        if (!this.editForm.totalPointsPool || this.editForm.totalPointsPool < 1) {
            this.errorMessage = 'Total points pool must be at least 1';
            this.showErrorAlert = true;
            return false;
        }
        // Validate dates
        const eventDate = new Date(this.editForm.eventDate);
        const regEndDate = new Date(this.editForm.registrationEndDateUtc);
        if (regEndDate > eventDate) {
            this.errorMessage = 'Registration deadline must be before or on event date';
            this.showErrorAlert = true;
            return false;
        }
        return true;
    }
    /**
     * Submit edit form
     */
    submitEditEvent() {
        this.showErrorAlert = false;
        if (!this.validateEditForm()) {
            return;
        }
        this.isSubmittingEdit = true;
        this.eventService.updateEvent(this.eventId, this.editForm)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (updatedEvent) => {
                console.log('[EventDetail] Event updated:', updatedEvent);
                this.isSubmittingEdit = false;
                this.closeEditModal();
                // Reload event details to reflect changes
                this.loadEventDetail();
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('[EventDetail] Error updating event:', error);
                this.isSubmittingEdit = false;
                this.errorMessage = error?.error?.message || 'Failed to update event. Please try again.';
                this.showErrorAlert = true;
                this.cdr.markForCheck();
            }
        });
    }
    /**
     * Activate event (Upcoming → Live)
     */
    activateEvent() {
        if (!this.event)
            return;
        this.showConfirmActivate = true;
    }
    /**
     * Confirm activate event
     */
    confirmActivateEvent() {
        if (!this.event)
            return;
        this.isLoading = true;
        this.eventService.activateEvent(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
            .subscribe({
            next: () => {
                console.log('[EventDetail] Event activated');
                this.showConfirmActivate = false;
                this.loadEventDetail();
            },
            error: (error) => {
                console.error('[EventDetail] Error activating event:', error);
                this.errorMessage = error?.error?.message || 'Failed to activate event';
                this.showErrorAlert = true;
                this.showConfirmActivate = false;
            }
        });
    }
    /**
     * Complete event (Live → Completed)
     */
    completeEvent() {
        if (!this.event)
            return;
        this.showConfirmComplete = true;
    }
    /**
     * Confirm complete event
     */
    confirmCompleteEvent() {
        if (!this.event)
            return;
        this.isLoading = true;
        this.eventService.completeEvent(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
            .subscribe({
            next: () => {
                console.log('[EventDetail] Event completed');
                this.showConfirmComplete = false;
                this.loadEventDetail();
            },
            error: (error) => {
                console.error('[EventDetail] Error completing event:', error);
                this.errorMessage = error?.error?.message || 'Failed to complete event';
                this.showErrorAlert = true;
                this.showConfirmComplete = false;
            }
        });
    }
    /**
     * Cancel event
     */
    cancelEvent() {
        if (!this.event)
            return;
        this.showConfirmCancel = true;
    }
    /**
     * Confirm cancel event
     */
    confirmCancelEvent() {
        if (!this.event)
            return;
        this.isLoading = true;
        this.eventService.cancelEvent(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
            .subscribe({
            next: () => {
                console.log('[EventDetail] Event cancelled');
                this.showConfirmCancel = false;
                this.loadEventDetail();
            },
            error: (error) => {
                console.error('[EventDetail] Error cancelling event:', error);
                this.errorMessage = error?.error?.message || 'Failed to cancel event';
                this.showErrorAlert = true;
                this.showConfirmCancel = false;
            }
        });
    }
    /**
     * Get status badge color - aligned with spec
     */
    getStatusColor(status) {
        const colors = {
            'Active': '#16A34A', // Green (was 'Live')
            'Draft': '#F59E0B', // Amber/Orange (was 'Upcoming')
            'Completed': '#EC4899', // Pink
            'Cancelled': '#EF4444' // Red
        };
        return colors[status] || '#6B7280';
    }
    getStatusLabel(status) {
        const labels = {
            'Draft': 'Upcoming',
            'Active': 'Live',
            'Completed': 'Completed',
            'Cancelled': 'Cancelled'
        };
        return labels[status] || status;
    }
    /**
     * Format date with time
     */
    formatDate(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    /**
     * Format datetime (same as formatDate - shows date + time)
     */
    formatDateTime(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.currentUser?.roles?.includes('Admin') || false;
    }
    /**
     * When participants are changed, refresh points data
     */
    onParticipantsChanged() {
        console.log('[EventDetail] Participants changed, refreshing points data');
        if (this.pointsTab) {
            this.pointsTab.loadData();
        }
    }
    /**
     * When points are awarded, refresh participant data
     */
    onPointsAwarded() {
        console.log('[EventDetail] Points awarded, refreshing participant data');
        if (this.participantsTab) {
            this.participantsTab.loadParticipants();
        }
    }
    static { this.ɵfac = function EventDetailComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventDetailComponent)(i0.ɵɵdirectiveInject(i1.EventService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventDetailComponent, selectors: [["app-event-detail"]], viewQuery: function EventDetailComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.participantsTab = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.pointsTab = _t.first);
        } }, decls: 5, vars: 3, consts: [["participantsTab", ""], ["pointsTab", ""], [1, "admin-layout"], ["class", "loading-container", 4, "ngIf"], ["class", "event-detail-container", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "event-detail-container"], [1, "alert", "alert-danger"], [1, "alert-content"], [1, "fa-solid", "fa-circle-exclamation"], [1, "alert-text"], ["type", "button", 1, "alert-close", 3, "click"], [1, "fa-solid", "fa-xmark"], [1, "detail-header-card"], [1, "header-main"], ["title", "Back to events", 1, "btn-back", 3, "click"], [1, "fa-solid", "fa-arrow-left"], [1, "header-content"], [1, "header-info"], [1, "event-title"], [1, "event-meta"], [1, "status-tag"], [1, "meta-divider"], [1, "event-date"], [1, "fa-regular", "fa-calendar"], [1, "event-participants"], [1, "fa-solid", "fa-users"], [1, "header-actions"], ["class", "action-btn-group", 4, "ngIf"], [1, "tabs-container"], [1, "tabs-nav"], [1, "tab-link", 3, "click"], [1, "fa-solid", "fa-chart-simple"], [1, "fa-solid", "fa-coins"], [1, "tabs-content"], [1, "tab-pane"], [3, "event"], [3, "participantsChanged", "eventId", "event"], [3, "pointsAwarded", "eventId", "event"], ["class", "modal", 3, "click", 4, "ngIf"], ["class", "modal edit-modal-overlay", 3, "click", 4, "ngIf"], [1, "action-btn-group"], ["title", "Edit Event", 1, "action-btn", "action-btn-edit", 3, "click"], [1, "fa-solid", "fa-pen"], [1, "action-label"], ["title", "Cancel Event", 1, "action-btn", "action-btn-danger", 3, "click"], [1, "modal", 3, "click"], [1, "modal-content", "modal-info", 3, "click"], [1, "modal-header"], [1, "fa-solid", "fa-bolt"], [1, "modal-close", 3, "click"], [1, "modal-body"], ["class", "confirmation-summary", 4, "ngIf"], [1, "info-text"], [1, "fa-solid", "fa-circle-info"], [1, "modal-actions"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "confirmation-summary"], [1, "summary-row"], [1, "label"], [1, "value"], [1, "value", "status-tag"], [1, "modal-content", "modal-warning", 3, "click"], [1, "fa-solid", "fa-flag-checkered"], [1, "warning-text"], [1, "fa-solid", "fa-triangle-exclamation"], [1, "btn", "btn-danger", 3, "click"], [1, "modal-content", "modal-danger", 3, "click"], [1, "modal", "edit-modal-overlay", 3, "click"], [1, "modal-content", "edit-modal-content", 3, "click"], [1, "edit-form", 3, "ngSubmit"], [1, "form-group"], ["for", "editEventName", 1, "form-label"], [1, "required"], ["type", "text", "id", "editEventName", "name", "name", "placeholder", "Enter event name", "required", "", "minlength", "3", "maxlength", "100", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editEventDescription", 1, "form-label"], ["id", "editEventDescription", "name", "description", "placeholder", "Enter event description", "required", "", "minlength", "10", "maxlength", "500", "rows", "3", 1, "form-input", "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "editEventDate", 1, "form-label"], ["type", "datetime-local", "id", "editEventDate", "name", "eventDate", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editRegistrationEndDate", 1, "form-label"], ["type", "datetime-local", "id", "editRegistrationEndDate", "name", "registrationEndDateUtc", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editMaxParticipants", 1, "form-label"], ["type", "number", "id", "editMaxParticipants", "name", "maxParticipants", "placeholder", "Leave empty for unlimited", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editTotalPointsPool", 1, "form-label"], ["type", "number", "id", "editTotalPointsPool", "name", "totalPointsPool", "placeholder", "Enter points pool", "required", "", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editLocation", 1, "form-label"], ["type", "text", "id", "editLocation", "name", "location", "placeholder", "Enter location (optional)", "maxlength", "200", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], [1, "fa-solid", "fa-spinner", "fa-spin"], [1, "fa-solid", "fa-check"]], template: function EventDetailComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵtemplate(2, EventDetailComponent_div_2_Template, 4, 0, "div", 3)(3, EventDetailComponent_div_3_Template, 8, 1, "div", 4)(4, EventDetailComponent_div_4_Template, 50, 29, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.showErrorAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.showErrorAlert && ctx.event);
        } }, dependencies: [CommonModule, i4.NgIf, FormsModule, i5.ɵNgNoValidate, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.MinLengthValidator, i5.MaxLengthValidator, i5.MinValidator, i5.NgModel, i5.NgForm, AdminSidebarComponent,
            EventDetailOverviewComponent,
            EventDetailParticipantsComponent,
            EventDetailPointsComponent], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background-color: var(--ag-color-field-01);\n}\n\n\n\n.loading-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n}\n\n.loading-container[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--ag-color-border-subtle);\n  border-top-color: var(--ag-button-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--ag-color-text-secondary);\n}\n\n.event-detail-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  padding: 2rem;\n  background-color: var(--ag-color-field-01);\n  min-height: 100vh;\n  overflow-y: auto;\n}\n\n\n\n.detail-header-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.header-main[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: none;\n  border: none;\n  color: #2c5f3f;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease-in-out;\n  font-size: 0.95rem;\n  width: fit-content;\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  color: #234d33;\n}\n\n.btn-back[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.event-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1f2937;\n  letter-spacing: -0.02em;\n}\n\n.event-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.status-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.375rem 0.875rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  text-transform: capitalize;\n}\n\n.status-tag.status-upcoming[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-tag.status-live[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-tag.status-completed[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-tag.status-cancelled[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n.meta-divider[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n\n.event-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n\n.event-date[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n\n\n.action-btn-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.375rem;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n.action-btn-edit[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #4b5563;\n}\n\n.action-btn-edit[_ngcontent-%COMP%]:hover {\n  background-color: #e5e7eb;\n  color: #1f2937;\n}\n\n.action-btn-primary[_ngcontent-%COMP%] {\n  background-color: #2c5f3f;\n  color: #ffffff;\n}\n\n.action-btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #234d33;\n}\n\n.action-btn-complete[_ngcontent-%COMP%] {\n  background-color: #0891b2;\n  color: #ffffff;\n}\n\n.action-btn-complete[_ngcontent-%COMP%]:hover {\n  background-color: #0e7490;\n}\n\n.action-btn-danger[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #dc2626;\n}\n\n.action-btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #fecaca;\n  color: #b91c1c;\n}\n\n.action-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n\n\n\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  white-space: nowrap;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #2c5f3f;\n  color: white;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #234d33;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #f8faf9;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #dc2626;\n  color: white;\n}\n\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #b91c1c;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n\n\n.tabs-container[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.tabs-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  padding: 1rem 1.5rem;\n  background-color: #f8faf9;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.tab-link[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  background: transparent;\n  border: none;\n  color: #6b7280;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  white-space: nowrap;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.tab-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\n.tab-link[_ngcontent-%COMP%]:hover:not(.active) {\n  color: #374151;\n  background-color: #f3f4f6;\n}\n\n.tab-link.active[_ngcontent-%COMP%] {\n  color: #ffffff;\n  background-color: #2c5f3f;\n  box-shadow: 0 2px 4px rgba(44, 95, 63, 0.2);\n}\n\n.tabs-content[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 400px;\n}\n\n.tab-pane[_ngcontent-%COMP%] {\n  display: none;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n\n.tab-pane.active[_ngcontent-%COMP%] {\n  display: block;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n\n\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  max-width: 480px;\n  width: 90%;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-in-out;\n  overflow: hidden;\n}\n\n@keyframes _ngcontent-%COMP%_slideUp {\n  from { transform: translateY(20px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n\n.modal-close[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 0;\n  transition: all 0.2s ease-in-out;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n  background: #e5e7eb;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.modal-body[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: #6b7280;\n  line-height: 1.6;\n}\n\n.confirmation-summary[_ngcontent-%COMP%] {\n  background-color: #f8faf9;\n  border-radius: 8px;\n  padding: 1rem;\n  margin: 1rem 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  border: 1px solid #e5e7eb;\n}\n\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.summary-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.summary-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n\n.summary-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-weight: 600;\n}\n\n.info-text[_ngcontent-%COMP%] {\n  color: #0891b2;\n  background-color: #ecfeff;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  margin: 1rem 0 0 0;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  border: 1px solid #cffafe;\n}\n\n.info-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n\n.warning-text[_ngcontent-%COMP%] {\n  color: #d97706;\n  background-color: #fef3c7;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  margin: 1rem 0 0 0;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  border: 1px solid #fde68a;\n}\n\n.warning-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f8faf9;\n}\n\n.modal-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n}\n\n.modal-info[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  background-color: #ecfeff;\n  border-bottom-color: #cffafe;\n}\n\n.modal-info[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #0891b2;\n}\n\n.modal-warning[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  border-bottom-color: #fde68a;\n}\n\n.modal-warning[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #d97706;\n}\n\n.modal-danger[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  border-bottom-color: #fecaca;\n}\n\n.modal-danger[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n}\n\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n}\n\n.alert-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.alert-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #dc2626;\n}\n\n.alert-text[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #991b1b;\n  font-weight: 500;\n}\n\n.alert-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #dc2626;\n  cursor: pointer;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.alert-close[_ngcontent-%COMP%]:hover {\n  color: #991b1b;\n}\n\n\n\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n\n\n\n@media (max-width: 768px) {\n  .event-detail-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1.5rem;\n  }\n\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1.25rem;\n  }\n\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .event-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n\n  .event-meta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n\n  .meta-divider[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .tabs-nav[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    gap: 0.375rem;\n    padding: 0.75rem 1rem;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .tab-link[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    padding: 0.625rem 1rem;\n    font-size: 0.85rem;\n  }\n\n  .modal-content[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 1rem;\n  }\n\n  .action-btn[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 0.9rem;\n  }\n\n  .action-label[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .header-main[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .header-actions[_ngcontent-%COMP%] {\n    justify-content: space-around;\n  }\n\n  .action-btn-group[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n  }\n}\n\n\n\n.edit-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.edit-modal-content[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.edit-modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  background: none;\n}\n\n.edit-modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.edit-modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #2c5f3f;\n}\n\n.edit-form[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 6px;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  font-size: 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #1f2937;\n  transition: all 0.15s ease;\n  box-sizing: border-box;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.edit-form[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n\n.edit-modal-content[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n  margin-top: 8px;\n  border-top: 1px solid #e5e7eb;\n}\n\n\n\n@media (max-width: 600px) {\n  .edit-modal-content[_ngcontent-%COMP%] {\n    margin: 16px;\n    max-width: calc(100% - 32px);\n  }\n\n  .edit-form[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .edit-modal-content[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n\n  .edit-modal-content[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventDetailComponent, [{
        type: Component,
        args: [{ selector: 'app-event-detail', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    AdminSidebarComponent,
                    EventDetailOverviewComponent,
                    EventDetailParticipantsComponent,
                    EventDetailPointsComponent
                ], template: "<div class=\"admin-layout\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <!-- Loading State -->\r\n  <div class=\"loading-container\" *ngIf=\"isLoading\">\r\n    <div class=\"spinner\"></div>\r\n    <p>Loading event details...</p>\r\n  </div>\r\n\r\n  <!-- Error State -->\r\n  <div class=\"event-detail-container\" *ngIf=\"!isLoading && showErrorAlert\">\r\n    <div class=\"alert alert-danger\">\r\n      <div class=\"alert-content\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span class=\"alert-text\">{{ errorMessage }}</span>\r\n        <button type=\"button\" class=\"alert-close\" (click)=\"closeErrorAlert()\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Main Content -->\r\n  <div class=\"event-detail-container\" *ngIf=\"!isLoading && !showErrorAlert && event\">\r\n    <!-- Compact Detail Header Card -->\r\n    <div class=\"detail-header-card\">\r\n      <div class=\"header-main\">\r\n        <button class=\"btn-back\" (click)=\"goBack()\" title=\"Back to events\">\r\n          <i class=\"fa-solid fa-arrow-left\"></i>\r\n          Back\r\n        </button>\r\n        \r\n        <div class=\"header-content\">\r\n          <div class=\"header-info\">\r\n            <h1 class=\"event-title\">{{ event?.name }}</h1>\r\n            <div class=\"event-meta\">\r\n              <span class=\"status-tag\" [class]=\"'status-' + (event?.status?.toLowerCase() || 'upcoming')\">\r\n                {{ event?.status }}\r\n              </span>\r\n              <span class=\"meta-divider\">\u2022</span>\r\n              <span class=\"event-date\">\r\n                <i class=\"fa-regular fa-calendar\"></i>\r\n                {{ formatDate(event?.eventDate || '') }}\r\n              </span>\r\n              <span class=\"meta-divider\">\u2022</span>\r\n              <span class=\"event-participants\">\r\n                <i class=\"fa-solid fa-users\"></i>\r\n                {{ event?.participantCount || event?.registeredCount || 0 }} Participants\r\n              </span>\r\n            </div>\r\n          </div>\r\n          \r\n          <div class=\"header-actions\">\r\n            <!-- Edit Button - Only in Upcoming (Draft) status -->\r\n            <div class=\"action-btn-group\" *ngIf=\"event?.status === 'Upcoming'\">\r\n              <button class=\"action-btn action-btn-edit\" (click)=\"editEvent()\" title=\"Edit Event\">\r\n                <i class=\"fa-solid fa-pen\"></i>\r\n              </button>\r\n              <span class=\"action-label\">Edit</span>\r\n            </div>\r\n            \r\n            <!-- Cancel Button - Only in Upcoming (Draft) status -->\r\n            <div class=\"action-btn-group\" *ngIf=\"event?.status === 'Upcoming' && isAdmin()\">\r\n              <button class=\"action-btn action-btn-danger\" (click)=\"cancelEvent()\" title=\"Cancel Event\">\r\n                <i class=\"fa-solid fa-xmark\"></i>\r\n              </button>\r\n              <span class=\"action-label\">Cancel</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Tabs -->\r\n    <div class=\"tabs-container\">\r\n      <div class=\"tabs-nav\">\r\n        <button \r\n          class=\"tab-link\"\r\n          [class.active]=\"activeTab === 'overview'\"\r\n          (click)=\"switchTab('overview')\"\r\n        >\r\n          <i class=\"fa-solid fa-chart-simple\"></i>\r\n          Overview\r\n        </button>\r\n        <button \r\n          class=\"tab-link\"\r\n          [class.active]=\"activeTab === 'participants'\"\r\n          (click)=\"switchTab('participants')\"\r\n        >\r\n          <i class=\"fa-solid fa-users\"></i>\r\n          Participants\r\n        </button>\r\n        <button \r\n          class=\"tab-link\"\r\n          [class.active]=\"activeTab === 'points'\"\r\n          (click)=\"switchTab('points')\"\r\n        >\r\n          <i class=\"fa-solid fa-coins\"></i>\r\n          Points & Rewards\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"tabs-content\">\r\n        <!-- Overview Tab -->\r\n        <div class=\"tab-pane\" [class.active]=\"activeTab === 'overview'\">\r\n          <app-event-detail-overview [event]=\"event\"></app-event-detail-overview>\r\n        </div>\r\n\r\n        <!-- Participants Tab -->\r\n        <div class=\"tab-pane\" [class.active]=\"activeTab === 'participants'\">\r\n          <app-event-detail-participants #participantsTab [eventId]=\"eventId\" [event]=\"event\" (participantsChanged)=\"onParticipantsChanged()\"></app-event-detail-participants>\r\n        </div>\r\n\r\n        <!-- Points & Rewards Tab -->\r\n        <div class=\"tab-pane\" [class.active]=\"activeTab === 'points'\">\r\n          <app-event-detail-points #pointsTab [eventId]=\"eventId\" [event]=\"event\" (pointsAwarded)=\"onPointsAwarded()\"></app-event-detail-points>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Activate Confirmation Modal -->\r\n    <div class=\"modal\" *ngIf=\"showConfirmActivate\" (click)=\"showConfirmActivate = false\">\r\n      <div class=\"modal-content modal-info\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"modal-header\">\r\n          <h3><i class=\"fa-solid fa-bolt\"></i> Activate Event?</h3>\r\n          <button class=\"modal-close\" (click)=\"showConfirmActivate = false\">\r\n            <i class=\"fa-solid fa-xmark\"></i>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>You're about to activate this event and set it to <strong>Live</strong>.</p>\r\n          <div class=\"confirmation-summary\" *ngIf=\"event\">\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Event Name:</span>\r\n              <span class=\"value\">{{ event.name }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Current Status:</span>\r\n              <span class=\"value status-tag\" [class]=\"'status-' + event.status.toLowerCase()\">{{ event.status }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Participants:</span>\r\n              <span class=\"value\">{{ event.participantCount }}</span>\r\n            </div>\r\n          </div>\r\n          <p class=\"info-text\"><i class=\"fa-solid fa-circle-info\"></i> Once activated, registration will close and check-in will become available.</p>\r\n        </div>\r\n        <div class=\"modal-actions\">\r\n          <button class=\"btn btn-secondary\" (click)=\"showConfirmActivate = false\">Cancel</button>\r\n          <button class=\"btn btn-primary\" (click)=\"confirmActivateEvent()\">Yes, Activate Event</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Complete Confirmation Modal -->\r\n    <div class=\"modal\" *ngIf=\"showConfirmComplete\" (click)=\"showConfirmComplete = false\">\r\n      <div class=\"modal-content modal-warning\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"modal-header\">\r\n          <h3><i class=\"fa-solid fa-flag-checkered\"></i> Complete Event?</h3>\r\n          <button class=\"modal-close\" (click)=\"showConfirmComplete = false\">\r\n            <i class=\"fa-solid fa-xmark\"></i>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>You're about to mark this event as <strong>Completed</strong>.</p>\r\n          <div class=\"confirmation-summary\" *ngIf=\"event\">\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Event Name:</span>\r\n              <span class=\"value\">{{ event.name }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Current Status:</span>\r\n              <span class=\"value status-tag\" [class]=\"'status-' + event.status.toLowerCase()\">{{ event.status }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Participants:</span>\r\n              <span class=\"value\">{{ event.participantCount }}</span>\r\n            </div>\r\n          </div>\r\n          <p class=\"warning-text\"><i class=\"fa-solid fa-triangle-exclamation\"></i> Once completed, you cannot change this status. Ensure all points have been awarded.</p>\r\n        </div>\r\n        <div class=\"modal-actions\">\r\n          <button class=\"btn btn-secondary\" (click)=\"showConfirmComplete = false\">Keep Editing</button>\r\n          <button class=\"btn btn-danger\" (click)=\"confirmCompleteEvent()\">Yes, Complete Event</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Cancel Confirmation Modal -->\r\n    <div class=\"modal\" *ngIf=\"showConfirmCancel\" (click)=\"showConfirmCancel = false\">\r\n      <div class=\"modal-content modal-danger\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"modal-header\">\r\n          <h3><i class=\"fa-solid fa-triangle-exclamation\"></i> Cancel Event?</h3>\r\n          <button class=\"modal-close\" (click)=\"showConfirmCancel = false\">\r\n            <i class=\"fa-solid fa-xmark\"></i>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>You're about to <strong>cancel this event</strong>. This is a destructive action.</p>\r\n          <div class=\"confirmation-summary\" *ngIf=\"event\">\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Event Name:</span>\r\n              <span class=\"value\">{{ event.name }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Current Status:</span>\r\n              <span class=\"value status-tag\" [class]=\"'status-' + event.status.toLowerCase()\">{{ getStatusLabel(event.status) }}</span>\r\n            </div>\r\n            <div class=\"summary-row\">\r\n              <span class=\"label\">Participants Registered:</span>\r\n              <span class=\"value\">{{ event.registeredCount }}</span>\r\n            </div>\r\n          </div>\r\n          <p class=\"warning-text\"><i class=\"fa-solid fa-triangle-exclamation\"></i> All registered participants will be notified. Points already awarded will not be refunded.</p>\r\n        </div>\r\n        <div class=\"modal-actions\">\r\n          <button class=\"btn btn-secondary\" (click)=\"showConfirmCancel = false\">Keep Event</button>\r\n          <button class=\"btn btn-danger\" (click)=\"confirmCancelEvent()\">Yes, Cancel Event</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Edit Event Modal -->\r\n    <div class=\"modal edit-modal-overlay\" *ngIf=\"showEditEventModal\" (click)=\"closeEditModal()\">\r\n      <div class=\"modal-content edit-modal-content\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"modal-header\">\r\n          <h3><i class=\"fa-solid fa-pen\"></i> Edit Event</h3>\r\n          <button class=\"modal-close\" (click)=\"closeEditModal()\">\r\n            <i class=\"fa-solid fa-xmark\"></i>\r\n          </button>\r\n        </div>\r\n        \r\n        <form class=\"edit-form\" (ngSubmit)=\"submitEditEvent()\">\r\n          <!-- Event Name -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"editEventName\">\r\n              Event Name <span class=\"required\">*</span>\r\n            </label>\r\n            <input \r\n              type=\"text\" \r\n              id=\"editEventName\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"editForm.name\"\r\n              name=\"name\"\r\n              placeholder=\"Enter event name\"\r\n              required\r\n              minlength=\"3\"\r\n              maxlength=\"100\"\r\n            />\r\n          </div>\r\n\r\n          <!-- Description -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"editEventDescription\">\r\n              Description <span class=\"required\">*</span>\r\n            </label>\r\n            <textarea \r\n              id=\"editEventDescription\"\r\n              class=\"form-input form-textarea\"\r\n              [(ngModel)]=\"editForm.description\"\r\n              name=\"description\"\r\n              placeholder=\"Enter event description\"\r\n              required\r\n              minlength=\"10\"\r\n              maxlength=\"500\"\r\n              rows=\"3\"\r\n            ></textarea>\r\n          </div>\r\n\r\n          <div class=\"form-row\">\r\n            <!-- Event Date -->\r\n            <div class=\"form-group\">\r\n              <label class=\"form-label\" for=\"editEventDate\">\r\n                Event Date & Time <span class=\"required\">*</span>\r\n              </label>\r\n              <input \r\n                type=\"datetime-local\" \r\n                id=\"editEventDate\"\r\n                class=\"form-input\"\r\n                [(ngModel)]=\"editForm.eventDate\"\r\n                name=\"eventDate\"\r\n                required\r\n              />\r\n            </div>\r\n\r\n            <!-- Registration End Date -->\r\n            <div class=\"form-group\">\r\n              <label class=\"form-label\" for=\"editRegistrationEndDate\">\r\n                Registration Deadline <span class=\"required\">*</span>\r\n              </label>\r\n              <input \r\n                type=\"datetime-local\" \r\n                id=\"editRegistrationEndDate\"\r\n                class=\"form-input\"\r\n                [(ngModel)]=\"editForm.registrationEndDateUtc\"\r\n                name=\"registrationEndDateUtc\"\r\n                required\r\n              />\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-row\">\r\n            <!-- Max Participants -->\r\n            <div class=\"form-group\">\r\n              <label class=\"form-label\" for=\"editMaxParticipants\">\r\n                Max Participants\r\n              </label>\r\n              <input \r\n                type=\"number\" \r\n                id=\"editMaxParticipants\"\r\n                class=\"form-input\"\r\n                [(ngModel)]=\"editForm.maxParticipants\"\r\n                name=\"maxParticipants\"\r\n                placeholder=\"Leave empty for unlimited\"\r\n                min=\"0\"\r\n              />\r\n            </div>\r\n\r\n            <!-- Total Points Pool -->\r\n            <div class=\"form-group\">\r\n              <label class=\"form-label\" for=\"editTotalPointsPool\">\r\n                Total Points Pool <span class=\"required\">*</span>\r\n              </label>\r\n              <input \r\n                type=\"number\" \r\n                id=\"editTotalPointsPool\"\r\n                class=\"form-input\"\r\n                [(ngModel)]=\"editForm.totalPointsPool\"\r\n                name=\"totalPointsPool\"\r\n                placeholder=\"Enter points pool\"\r\n                required\r\n                min=\"1\"\r\n              />\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Location -->\r\n          <div class=\"form-group\">\r\n            <label class=\"form-label\" for=\"editLocation\">\r\n              Location\r\n            </label>\r\n            <input \r\n              type=\"text\" \r\n              id=\"editLocation\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"editForm.location\"\r\n              name=\"location\"\r\n              placeholder=\"Enter location (optional)\"\r\n              maxlength=\"200\"\r\n            />\r\n          </div>\r\n\r\n          <!-- Form Actions -->\r\n          <div class=\"modal-actions\">\r\n            <button \r\n              type=\"button\" \r\n              class=\"btn btn-secondary\"\r\n              (click)=\"closeEditModal()\"\r\n              [disabled]=\"isSubmittingEdit\"\r\n            >\r\n              Cancel\r\n            </button>\r\n            <button \r\n              type=\"submit\" \r\n              class=\"btn btn-primary\"\r\n              [disabled]=\"isSubmittingEdit\"\r\n            >\r\n              <span *ngIf=\"isSubmittingEdit\">\r\n                <i class=\"fa-solid fa-spinner fa-spin\"></i> Saving...\r\n              </span>\r\n              <span *ngIf=\"!isSubmittingEdit\">\r\n                <i class=\"fa-solid fa-check\"></i> Update Event\r\n              </span>\r\n            </button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>", styles: ["/* Admin Layout - Sidebar + Main Content */\n.admin-layout {\n  display: flex;\n  min-height: 100vh;\n  background-color: var(--ag-color-field-01);\n}\n\n/* Loading Container */\n.loading-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n}\n\n.loading-container .spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--ag-color-border-subtle);\n  border-top-color: var(--ag-button-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-container p {\n  font-size: 16px;\n  color: var(--ag-color-text-secondary);\n}\n\n.event-detail-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  padding: 2rem;\n  background-color: var(--ag-color-field-01);\n  min-height: 100vh;\n  overflow-y: auto;\n}\n\n/* ========== COMPACT DETAIL HEADER CARD ========== */\n.detail-header-card {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.header-main {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.btn-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: none;\n  border: none;\n  color: #2c5f3f;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.5rem 0;\n  transition: all 0.2s ease-in-out;\n  font-size: 0.95rem;\n  width: fit-content;\n}\n\n.btn-back:hover {\n  color: #234d33;\n}\n\n.btn-back i {\n  font-size: 1rem;\n}\n\n.header-content {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.event-title {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1f2937;\n  letter-spacing: -0.02em;\n}\n\n.event-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.status-tag {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.375rem 0.875rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  text-transform: capitalize;\n}\n\n.status-tag.status-upcoming {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-tag.status-live {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-tag.status-completed {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-tag.status-cancelled {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n.meta-divider {\n  color: #9ca3af;\n}\n\n.event-date {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n\n.event-date i {\n  color: #9ca3af;\n}\n\n.header-actions {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n/* Circular Action Button Groups */\n.action-btn-group {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.375rem;\n}\n\n.action-btn {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.action-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n.action-btn-edit {\n  background-color: #f3f4f6;\n  color: #4b5563;\n}\n\n.action-btn-edit:hover {\n  background-color: #e5e7eb;\n  color: #1f2937;\n}\n\n.action-btn-primary {\n  background-color: #2c5f3f;\n  color: #ffffff;\n}\n\n.action-btn-primary:hover {\n  background-color: #234d33;\n}\n\n.action-btn-complete {\n  background-color: #0891b2;\n  color: #ffffff;\n}\n\n.action-btn-complete:hover {\n  background-color: #0e7490;\n}\n\n.action-btn-danger {\n  background-color: #fee2e2;\n  color: #dc2626;\n}\n\n.action-btn-danger:hover {\n  background-color: #fecaca;\n  color: #b91c1c;\n}\n\n.action-label {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n\n/* General Buttons */\n.btn {\n  padding: 0.75rem 1.25rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  white-space: nowrap;\n}\n\n.btn-primary {\n  background-color: #2c5f3f;\n  color: white;\n}\n\n.btn-primary:hover {\n  background-color: #234d33;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n.btn-secondary {\n  background-color: #f8faf9;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n}\n\n.btn-secondary:hover {\n  background-color: #f3f4f6;\n}\n\n.btn-danger {\n  background-color: #dc2626;\n  color: white;\n}\n\n.btn-danger:hover {\n  background-color: #b91c1c;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n/* ========== TABS ========== */\n.tabs-container {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.tabs-nav {\n  display: flex;\n  gap: 0.5rem;\n  padding: 1rem 1.5rem;\n  background-color: #f8faf9;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.tab-link {\n  padding: 0.75rem 1.25rem;\n  background: transparent;\n  border: none;\n  color: #6b7280;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  white-space: nowrap;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.tab-link i {\n  font-size: 0.9rem;\n}\n\n.tab-link:hover:not(.active) {\n  color: #374151;\n  background-color: #f3f4f6;\n}\n\n.tab-link.active {\n  color: #ffffff;\n  background-color: #2c5f3f;\n  box-shadow: 0 2px 4px rgba(44, 95, 63, 0.2);\n}\n\n.tabs-content {\n  position: relative;\n  min-height: 400px;\n}\n\n.tab-pane {\n  display: none;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n.tab-pane.active {\n  display: block;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n/* ========== MODAL ========== */\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n.modal-content {\n  background: #ffffff;\n  border-radius: 12px;\n  max-width: 480px;\n  width: 90%;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);\n  animation: slideUp 0.3s ease-in-out;\n  overflow: hidden;\n}\n\n@keyframes slideUp {\n  from { transform: translateY(20px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.modal-header h3 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.modal-header h3 i {\n  font-size: 1.1rem;\n}\n\n.modal-close {\n  background: #f3f4f6;\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 0;\n  transition: all 0.2s ease-in-out;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-close:hover {\n  color: #1f2937;\n  background: #e5e7eb;\n}\n\n.modal-body {\n  padding: 1.5rem;\n}\n\n.modal-body > p {\n  margin: 0 0 1rem 0;\n  color: #6b7280;\n  line-height: 1.6;\n}\n\n.confirmation-summary {\n  background-color: #f8faf9;\n  border-radius: 8px;\n  padding: 1rem;\n  margin: 1rem 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  border: 1px solid #e5e7eb;\n}\n\n.summary-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.summary-row:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n\n.summary-row .label {\n  font-weight: 500;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n\n.summary-row .value {\n  color: #1f2937;\n  font-weight: 600;\n}\n\n.info-text {\n  color: #0891b2;\n  background-color: #ecfeff;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  margin: 1rem 0 0 0;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  border: 1px solid #cffafe;\n}\n\n.info-text i {\n  margin-top: 2px;\n}\n\n.warning-text {\n  color: #d97706;\n  background-color: #fef3c7;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  margin: 1rem 0 0 0;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  border: 1px solid #fde68a;\n}\n\n.warning-text i {\n  margin-top: 2px;\n}\n\n.modal-actions {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f8faf9;\n}\n\n.modal-actions .btn {\n  padding: 0.75rem 1.5rem;\n}\n\n.modal-info .modal-header {\n  background-color: #ecfeff;\n  border-bottom-color: #cffafe;\n}\n\n.modal-info .modal-header h3 {\n  color: #0891b2;\n}\n\n.modal-warning .modal-header {\n  background-color: #fef3c7;\n  border-bottom-color: #fde68a;\n}\n\n.modal-warning .modal-header h3 {\n  color: #d97706;\n}\n\n.modal-danger .modal-header {\n  background-color: #fee2e2;\n  border-bottom-color: #fecaca;\n}\n\n.modal-danger .modal-header h3 {\n  color: #dc2626;\n}\n\n/* ========== ALERT STYLES ========== */\n.alert {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n}\n\n.alert-danger {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n}\n\n.alert-content {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.alert-content i {\n  font-size: 1.25rem;\n  color: #dc2626;\n}\n\n.alert-text {\n  flex: 1;\n  color: #991b1b;\n  font-weight: 500;\n}\n\n.alert-close {\n  background: none;\n  border: none;\n  color: #dc2626;\n  cursor: pointer;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.alert-close:hover {\n  color: #991b1b;\n}\n\n/* ========== LOADING ========== */\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n\n/* ========== RESPONSIVE ========== */\n@media (max-width: 768px) {\n  .event-detail-container {\n    padding: 1rem;\n    gap: 1.5rem;\n  }\n\n  .header-content {\n    flex-direction: column;\n    gap: 1.25rem;\n  }\n\n  .header-actions {\n    width: 100%;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .event-title {\n    font-size: 1.5rem;\n  }\n\n  .event-meta {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n\n  .meta-divider {\n    display: none;\n  }\n\n  .tabs-nav {\n    overflow-x: auto;\n    gap: 0.375rem;\n    padding: 0.75rem 1rem;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .tab-link {\n    flex: 0 0 auto;\n    padding: 0.625rem 1rem;\n    font-size: 0.85rem;\n  }\n\n  .modal-content {\n    width: 95%;\n    margin: 1rem;\n  }\n\n  .action-btn {\n    width: 40px;\n    height: 40px;\n    font-size: 0.9rem;\n  }\n\n  .action-label {\n    font-size: 0.7rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .header-main {\n    padding: 1rem;\n  }\n\n  .header-actions {\n    justify-content: space-around;\n  }\n\n  .action-btn-group {\n    flex: 0 0 auto;\n  }\n}\n\n/* ========== EDIT EVENT MODAL ========== */\n.edit-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.edit-modal-content {\n  background: #ffffff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n  animation: slideUp 0.3s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.edit-modal-content .modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  background: none;\n}\n\n.edit-modal-content .modal-header h3 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.edit-modal-content .modal-header h3 i {\n  color: #2c5f3f;\n}\n\n.edit-form {\n  padding: 24px;\n}\n\n.edit-form .form-group {\n  margin-bottom: 20px;\n}\n\n.edit-form .form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.edit-form .form-row .form-group {\n  margin-bottom: 20px;\n}\n\n.edit-form .form-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 6px;\n}\n\n.edit-form .form-label .required {\n  color: #ef4444;\n}\n\n.edit-form .form-input {\n  width: 100%;\n  padding: 10px 14px;\n  font-size: 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #1f2937;\n  transition: all 0.15s ease;\n  box-sizing: border-box;\n}\n\n.edit-form .form-input:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.edit-form .form-input::placeholder {\n  color: #9ca3af;\n}\n\n.edit-form .form-textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n\n.edit-modal-content .modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n  margin-top: 8px;\n  border-top: 1px solid #e5e7eb;\n}\n\n/* Edit Modal responsive */\n@media (max-width: 600px) {\n  .edit-modal-content {\n    margin: 16px;\n    max-width: calc(100% - 32px);\n  }\n\n  .edit-form .form-row {\n    grid-template-columns: 1fr;\n  }\n\n  .edit-modal-content .modal-actions {\n    flex-direction: column-reverse;\n  }\n\n  .edit-modal-content .modal-actions button {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [{ type: i1.EventService }, { type: i2.AuthService }, { type: i3.Router }, { type: i3.ActivatedRoute }, { type: i0.ChangeDetectorRef }], { participantsTab: [{
            type: ViewChild,
            args: ['participantsTab']
        }], pointsTab: [{
            type: ViewChild,
            args: ['pointsTab']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventDetailComponent, { className: "EventDetailComponent", filePath: "src/app/pages/admin/events/event-detail.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=event-detail.component.js.map