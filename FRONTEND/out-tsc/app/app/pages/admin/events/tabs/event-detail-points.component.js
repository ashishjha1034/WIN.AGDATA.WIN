import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { getRemainingPoints } from '../../../../models/event.models';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/event.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function EventDetailPointsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
    i0.ɵɵelement(2, "i", 7);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 8);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismissError()); });
    i0.ɵɵelement(6, "i", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function EventDetailPointsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 6);
    i0.ɵɵelement(2, "i", 11);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 8);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismissSuccess()); });
    i0.ɵɵelement(6, "i", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
function EventDetailPointsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading points data...");
    i0.ɵɵelementEnd()();
} }
function EventDetailPointsComponent_div_4_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.getTotalPool() || 0));
} }
function EventDetailPointsComponent_div_4_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Unlimited");
    i0.ɵɵelementContainerEnd();
} }
function EventDetailPointsComponent_div_4_ng_container_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.getRemainingPoints()));
} }
function EventDetailPointsComponent_div_4_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 26);
    i0.ɵɵelementContainerEnd();
} }
function EventDetailPointsComponent_div_4_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28);
    i0.ɵɵelement(2, "div", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 30)(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.getDistributionPercentage(), "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.getDistributionPercentage(), "% distributed");
} }
function EventDetailPointsComponent_div_4_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "div", 32);
    i0.ɵɵelement(2, "i", 33);
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "Points Award Locked");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Event must be ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8, "Live");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " to award points.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 34);
    i0.ɵɵtext(11, "Current status: ");
    i0.ɵɵelementStart(12, "span", 35);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(12);
    i0.ɵɵclassMap("status-" + ctx_r1.event.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.event.status);
} }
function EventDetailPointsComponent_div_4_ng_container_26_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 70);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Max: ", i0.ɵɵpipeBind1(2, 1, ctx_r1.getRemainingPoints()), " ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵtext(2, " Amount exceeds remaining points ");
    i0.ɵɵelementEnd();
} }
function EventDetailPointsComponent_div_4_ng_container_26_tr_34_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 52)(2, "label", 53)(3, "input", 54);
    i0.ɵɵlistener("change", function EventDetailPointsComponent_div_4_ng_container_26_tr_34_Template_input_change_3_listener() { const p_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleParticipantSelection(p_r6.userId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "span", 55);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "td", 56);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 57);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 58);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(p_r6.userId));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", ctx_r1.isSelected(p_r6.userId));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(p_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r6.employeeId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r6.email);
} }
function EventDetailPointsComponent_div_4_ng_container_26_tr_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 73);
    i0.ɵɵtext(2, "No eligible participants found");
    i0.ɵɵelementEnd()();
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74)(1, "div", 75)(2, "span", 76)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " participants selected ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "i", 77);
    i0.ɵɵelementStart(7, "span", 78)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, " points each ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.getSelectedCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 2, ctx_r1.getPointsPerParticipant()));
} }
function EventDetailPointsComponent_div_4_ng_container_26_i_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 79);
} }
function EventDetailPointsComponent_div_4_ng_container_26_i_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵelement(1, "i", 82);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No eligible participants available for rank awards.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 83);
    i0.ɵɵtext(5, "Eligible participants are those who: are registered/checked-in AND have not yet received points.");
    i0.ɵɵelementEnd()();
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 96);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_7_div_1_Template_div_click_0_listener() { const p_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.selectRankParticipant(p_r9)); });
    i0.ɵɵelementStart(1, "span", 97);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 98);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", p_r9.employeeId, " \u2022 ", p_r9.email);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵtemplate(1, EventDetailPointsComponent_div_4_ng_container_26_div_47_div_7_div_1_Template, 5, 3, "div", 95);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredRankParticipants);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 99)(1, "span", 100);
    i0.ɵɵelement(2, "i", 101);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 102);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_8_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.clearRankSelection()); });
    i0.ɵɵelement(5, "i", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.selectedRankParticipant.name, " (", ctx_r1.selectedRankParticipant.employeeId, ") ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Amount exceeds remaining points (", i0.ɵɵpipeBind1(3, 1, ctx_r1.getRemainingPoints()), " available) ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵelement(1, "i", 103);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Rank #", ctx_r1.rankValue, " has already been assigned. Please choose a different rank. ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_i_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 79);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_i_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85)(2, "label", 39);
    i0.ɵɵtext(3, "Find Participant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 86);
    i0.ɵɵelement(5, "i", 48);
    i0.ɵɵelementStart(6, "input", 87);
    i0.ɵɵlistener("input", function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template_input_input_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onRankParticipantSearch($event.target.value)); })("focus", function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template_input_focus_6_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.showRankDropdown = ctx_r1.filteredRankParticipants.length > 0); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, EventDetailPointsComponent_div_4_ng_container_26_div_47_div_7_Template, 2, 1, "div", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, EventDetailPointsComponent_div_4_ng_container_26_div_47_div_8_Template, 6, 2, "div", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 90)(10, "div", 85)(11, "label", 39);
    i0.ɵɵtext(12, "Rank");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 91);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.rankValue, $event) || (ctx_r1.rankValue = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 85)(15, "label", 39);
    i0.ɵɵtext(16, "Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 92);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.rankPoints, $event) || (ctx_r1.rankPoints = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(18, EventDetailPointsComponent_div_4_ng_container_26_div_47_div_18_Template, 4, 3, "div", 43)(19, EventDetailPointsComponent_div_4_ng_container_26_div_47_div_19_Template, 3, 1, "div", 43);
    i0.ɵɵelementStart(20, "div", 93)(21, "button", 62);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_47_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submitRankAward()); });
    i0.ɵɵtemplate(22, EventDetailPointsComponent_div_4_ng_container_26_div_47_i_22_Template, 1, 0, "i", 63)(23, EventDetailPointsComponent_div_4_ng_container_26_div_47_i_23_Template, 1, 0, "i", 64);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", ctx_r1.rankSearchText);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showRankDropdown && ctx_r1.filteredRankParticipants.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedRankParticipant);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.rankValue);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.rankPoints);
    i0.ɵɵproperty("max", ctx_r1.isPoolUnlimited() ? undefined : ctx_r1.getRemainingPoints());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.rankPoints > 0 && !ctx_r1.isPoolUnlimited() && ctx_r1.rankPoints > ctx_r1.getRemainingPoints());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.rankValue && ctx_r1.isRankAlreadyUsed(ctx_r1.rankValue));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canSubmitRankAward() || ctx_r1.isRankAwarding);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isRankAwarding);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isRankAwarding);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isRankAwarding ? "Awarding..." : "Assign & Award", " ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 85)(1, "label", 39);
    i0.ɵɵtext(2, "Points per Rank (comma-separated)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 119);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_17_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r1.rankPointsInput, $event) || (ctx_r1.rankPointsInput = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 120);
    i0.ɵɵtext(5, " Enter points for Rank 1, 2, 3, etc. The last participant(s) will receive the remaining points automatically. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.rankPointsInput);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 121);
    i0.ɵɵelement(1, "i", 122);
    i0.ɵɵtext(2, " Select participants from the Bulk Points section above ");
    i0.ɵɵelementEnd();
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵelement(1, "i", 124);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getSelectedCount(), " participants selected ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_th_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1, "Rank");
    i0.ɵɵelementEnd();
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_tr_13_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "span", 132);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", item_r13.rank);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_tr_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_tr_13_td_1_Template, 3, 1, "td", 4);
    i0.ɵɵelementStart(2, "td");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 131);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.poolAllocationMode === "RankBased");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 3, item_r13.points));
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 125)(1, "h4", 126);
    i0.ɵɵtext(2, "Distribution Preview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 127)(4, "table", 128)(5, "thead")(6, "tr");
    i0.ɵɵtemplate(7, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_th_7_Template, 2, 0, "th", 4);
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Participant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "tbody");
    i0.ɵɵtemplate(13, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_tr_13_Template, 7, 5, "tr", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "tfoot")(15, "tr", 130)(16, "td")(17, "strong");
    i0.ɵɵtext(18, "Total");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 131)(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "number");
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r1.poolAllocationMode === "RankBased");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.getPoolAllocationPreview());
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("colspan", ctx_r1.poolAllocationMode === "RankBased" ? 2 : 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 4, ctx_r1.getRemainingPoints()));
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_22_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "number");
    i0.ɵɵpipe(4, "number");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Sum of rank points (", i0.ɵɵpipeBind1(3, 2, ctx_r1.getRankPointsSum()), ") exceeds remaining pool (", i0.ɵɵpipeBind1(4, 4, ctx_r1.getRemainingPoints()), ") ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵtemplate(1, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_22_ng_container_1_Template, 5, 6, "ng-container", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getRankPointsSum() > ctx_r1.getRemainingPoints());
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_i_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 133);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_i_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function EventDetailPointsComponent_div_4_ng_container_26_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 104)(1, "h3", 15);
    i0.ɵɵelement(2, "i", 105);
    i0.ɵɵtext(3, " Allocate Entire Prize Pool");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 106);
    i0.ɵɵtext(5, " Distribute all ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " remaining points to selected participants. This action will exhaust the pool and auto-complete the event. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 107)(11, "button", 108);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_48_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.poolAllocationMode = "EqualSplit"); });
    i0.ɵɵelement(12, "i", 109);
    i0.ɵɵtext(13, " Equal Split ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 108);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_48_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.poolAllocationMode = "RankBased"); });
    i0.ɵɵelement(15, "i", 110);
    i0.ɵɵtext(16, " Rank-Based ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_17_Template, 6, 1, "div", 111);
    i0.ɵɵelementStart(18, "div", 112);
    i0.ɵɵtemplate(19, EventDetailPointsComponent_div_4_ng_container_26_div_48_span_19_Template, 3, 0, "span", 113)(20, EventDetailPointsComponent_div_4_ng_container_26_div_48_span_20_Template, 3, 1, "span", 114);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_21_Template, 23, 6, "div", 115)(22, EventDetailPointsComponent_div_4_ng_container_26_div_48_div_22_Template, 2, 1, "div", 43);
    i0.ɵɵelementStart(23, "div", 116)(24, "button", 117);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_div_48_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submitPoolAllocation()); });
    i0.ɵɵtemplate(25, EventDetailPointsComponent_div_4_ng_container_26_div_48_i_25_Template, 1, 0, "i", 118)(26, EventDetailPointsComponent_div_4_ng_container_26_div_48_i_26_Template, 1, 0, "i", 64);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 14, ctx_r1.getRemainingPoints()));
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.poolAllocationMode === "EqualSplit");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.poolAllocationMode === "RankBased");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.poolAllocationMode === "RankBased");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.getSelectedCount() === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getSelectedCount() > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getSelectedCount() > 0 && ctx_r1.canSubmitPoolAllocation());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.poolAllocationMode === "RankBased" && ctx_r1.parseRankPoints().length > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canSubmitPoolAllocation() || ctx_r1.isAllocatingPool);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isAllocatingPool);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isAllocatingPool);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isAllocatingPool ? "Allocating..." : "Allocate Entire Pool", " ");
} }
function EventDetailPointsComponent_div_4_ng_container_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 36)(2, "h3", 15);
    i0.ɵɵelement(3, "i", 37);
    i0.ɵɵtext(4, " Bulk Points Awarding");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 38)(6, "label", 39);
    i0.ɵɵtext(7, "Enter Bulk Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 40)(9, "input", 41);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailPointsComponent_div_4_ng_container_26_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.bulkAwardAmount, $event) || (ctx_r1.bulkAwardAmount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, EventDetailPointsComponent_div_4_ng_container_26_span_10_Template, 3, 3, "span", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, EventDetailPointsComponent_div_4_ng_container_26_div_11_Template, 3, 0, "div", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 44)(13, "div", 45)(14, "span", 46);
    i0.ɵɵtext(15, "Select Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 47);
    i0.ɵɵelement(17, "i", 48);
    i0.ɵɵelementStart(18, "input", 49);
    i0.ɵɵtwoWayListener("ngModelChange", function EventDetailPointsComponent_div_4_ng_container_26_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.bulkSearchText, $event) || (ctx_r1.bulkSearchText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 50)(20, "table", 51)(21, "thead")(22, "tr")(23, "th", 52)(24, "label", 53)(25, "input", 54);
    i0.ɵɵlistener("change", function EventDetailPointsComponent_div_4_ng_container_26_Template_input_change_25_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleSelectAll()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "span", 55);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "th", 56);
    i0.ɵɵtext(28, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "th", 57);
    i0.ɵɵtext(30, "Employee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 58);
    i0.ɵɵtext(32, "Email");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "tbody");
    i0.ɵɵtemplate(34, EventDetailPointsComponent_div_4_ng_container_26_tr_34_Template, 11, 6, "tr", 59)(35, EventDetailPointsComponent_div_4_ng_container_26_tr_35_Template, 3, 0, "tr", 4);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(36, EventDetailPointsComponent_div_4_ng_container_26_div_36_Template, 12, 4, "div", 60);
    i0.ɵɵelementStart(37, "div", 61)(38, "button", 62);
    i0.ɵɵlistener("click", function EventDetailPointsComponent_div_4_ng_container_26_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitBulkAward()); });
    i0.ɵɵtemplate(39, EventDetailPointsComponent_div_4_ng_container_26_i_39_Template, 1, 0, "i", 63)(40, EventDetailPointsComponent_div_4_ng_container_26_i_40_Template, 1, 0, "i", 64);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 65)(43, "h3", 15);
    i0.ɵɵelement(44, "i", 66);
    i0.ɵɵtext(45, " Award by Rank");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(46, EventDetailPointsComponent_div_4_ng_container_26_div_46_Template, 6, 0, "div", 67)(47, EventDetailPointsComponent_div_4_ng_container_26_div_47_Template, 25, 12, "div", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(48, EventDetailPointsComponent_div_4_ng_container_26_div_48_Template, 28, 16, "div", 69);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.bulkAwardAmount);
    i0.ɵɵproperty("max", ctx_r1.isPoolUnlimited() ? undefined : ctx_r1.getRemainingPoints());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.bulkAwardAmount > 0 && !ctx_r1.isPoolUnlimited() && ctx_r1.bulkAwardAmount > ctx_r1.getRemainingPoints());
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.bulkSearchText);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("checked", ctx_r1.selectAll);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r1.getFilteredEligibleParticipants());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getFilteredEligibleParticipants().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getSelectedCount() > 0 && ctx_r1.bulkAwardAmount > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canSubmitBulkAward() || ctx_r1.isBulkAwarding);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isBulkAwarding);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isBulkAwarding);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isBulkAwarding ? "Awarding..." : "Award Points", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.getEligibleRankParticipants().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getEligibleRankParticipants().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isPoolUnlimited() && ctx_r1.getRemainingPoints() > 0);
} }
function EventDetailPointsComponent_div_4_div_27_tr_19_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 132);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("#", p_r14.eventRank);
} }
function EventDetailPointsComponent_div_4_div_27_tr_19_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function EventDetailPointsComponent_div_4_div_27_tr_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 138);
    i0.ɵɵtemplate(2, EventDetailPointsComponent_div_4_div_27_tr_19_span_2_Template, 2, 1, "span", 141)(3, EventDetailPointsComponent_div_4_div_27_tr_19_span_3_Template, 2, 0, "span", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 56);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 57);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 139);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 140);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r14 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", p_r14.eventRank);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r14.eventRank);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r14.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r14.employeeId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, p_r14.pointsAwarded));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(p_r14.awardedAt));
} }
function EventDetailPointsComponent_div_4_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 134)(1, "h3", 15);
    i0.ɵɵelement(2, "i", 135);
    i0.ɵɵtext(3, " Rank History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 136)(5, "table", 137)(6, "thead")(7, "tr")(8, "th", 138);
    i0.ɵɵtext(9, "Rank");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 56);
    i0.ɵɵtext(11, "Participant Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 57);
    i0.ɵɵtext(13, "Employee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 139);
    i0.ɵɵtext(15, "Points Allotted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 140);
    i0.ɵɵtext(17, "Assigned Time");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "tbody");
    i0.ɵɵtemplate(19, EventDetailPointsComponent_div_4_div_27_tr_19_Template, 13, 8, "tr", 129);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngForOf", ctx_r1.getAwardedParticipants());
} }
function EventDetailPointsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 14)(2, "h3", 15);
    i0.ɵɵelement(3, "i", 16);
    i0.ɵɵtext(4, " Points Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 17)(6, "div", 18)(7, "span", 19);
    i0.ɵɵtext(8, "Total Points Pool");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 20);
    i0.ɵɵtemplate(10, EventDetailPointsComponent_div_4_ng_container_10_Template, 3, 3, "ng-container", 4)(11, EventDetailPointsComponent_div_4_ng_container_11_Template, 2, 0, "ng-container", 4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 18)(13, "span", 19);
    i0.ɵɵtext(14, "Distributed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 21);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 18)(19, "span", 19);
    i0.ɵɵtext(20, "Remaining");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 22);
    i0.ɵɵtemplate(22, EventDetailPointsComponent_div_4_ng_container_22_Template, 3, 3, "ng-container", 4)(23, EventDetailPointsComponent_div_4_ng_container_23_Template, 2, 0, "ng-container", 4);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(24, EventDetailPointsComponent_div_4_div_24_Template, 6, 3, "div", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, EventDetailPointsComponent_div_4_div_25_Template, 14, 3, "div", 24)(26, EventDetailPointsComponent_div_4_ng_container_26_Template, 49, 16, "ng-container", 4)(27, EventDetailPointsComponent_div_4_div_27_Template, 20, 1, "div", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", !ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 9, ctx_r1.getDistributedPoints()));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", !ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isPoolUnlimited());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.canAwardPoints());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canAwardPoints());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.getAwardedParticipants().length > 0);
} }
export class EventDetailPointsComponent {
    constructor(eventService) {
        this.eventService = eventService;
        // Public properties for template access
        this.Math = Math;
        this.eventId = '';
        this.event = null;
        this.pointsAwarded = new EventEmitter();
        // Data
        this.participants = [];
        this.checkedInParticipants = [];
        this.poolStatus = null;
        // UI State
        this.isLoading = false;
        this.isBulkAwarding = false;
        this.isRankAwarding = false;
        this.isAllocatingPool = false;
        this.errorMessage = '';
        this.successMessage = '';
        // Distribution Mode
        this.distributionMode = 'Manual';
        // Bulk Award Section
        this.bulkAwardAmount = 0;
        this.bulkSearchText = '';
        this.selectedParticipantIds = new Set();
        this.selectAll = false;
        // Pool Allocation (EqualSplit/RankBased)
        this.poolAllocationMode = 'EqualSplit';
        this.rankPointsInput = ''; // Comma-separated rank points
        // Rank Award Section
        this.rankSearchText = '';
        this.selectedRankParticipant = null;
        this.rankPoints = 0;
        this.rankValue = null;
        this.filteredRankParticipants = [];
        this.showRankDropdown = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.loadData();
    }
    ngOnChanges(changes) {
        if (changes['eventId'] && changes['eventId'].currentValue) {
            this.loadData();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadData() {
        if (!this.eventId)
            return;
        this.isLoading = true;
        this.errorMessage = '';
        // Load pool status
        this.eventService.getPoolStatus(this.eventId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (status) => {
                console.log('[Points] Pool status loaded:', status);
                this.poolStatus = status;
            },
            error: (error) => {
                console.error('[Points] Error loading pool status:', error);
                this.errorMessage = 'Failed to load pool status';
            }
        });
        // Load participants
        this.eventService.getEventParticipants(this.eventId)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
            .subscribe({
            next: (data) => {
                console.log('[Points] Participants loaded:', data.length);
                this.participants = data;
                this.checkedInParticipants = data.filter((p) => p.attendanceStatus === 'Attended');
                // Reset selections
                this.selectedParticipantIds.clear();
                this.selectAll = false;
            },
            error: (err) => {
                console.error('[Points] Error loading participants:', err);
                this.errorMessage = 'Failed to load participants';
            }
        });
    }
    // ==================== POINTS OVERVIEW ====================
    canAwardPoints() {
        return this.event?.status === 'Live';
    }
    getRemainingPoints() {
        if (this.poolStatus?.pool) {
            return this.poolStatus.pool.remainingPoints ?? 0;
        }
        return this.event ? getRemainingPoints(this.event) : 0;
    }
    getTotalPool() {
        return this.poolStatus?.pool?.totalPool ?? this.event?.totalPointsPool ?? null;
    }
    getDistributedPoints() {
        return this.poolStatus?.pool?.distributedPoints ?? this.event?.distributedPoints ?? 0;
    }
    isPoolUnlimited() {
        return this.poolStatus?.pool?.isUnlimited ?? false;
    }
    getDistributionPercentage() {
        const total = this.getTotalPool();
        if (!total || total === 0)
            return 0;
        return Math.round((this.getDistributedPoints() / total) * 100);
    }
    // ==================== BULK AWARD ====================
    getEligibleParticipants() {
        // Eligible = checked-in and not yet awarded
        return this.checkedInParticipants.filter(p => !p.pointsAwarded || p.pointsAwarded === 0);
    }
    getFilteredEligibleParticipants() {
        const eligible = this.getEligibleParticipants();
        if (!this.bulkSearchText)
            return eligible;
        const search = this.bulkSearchText.toLowerCase();
        return eligible.filter(p => p.name?.toLowerCase().includes(search) ||
            p.employeeId?.toLowerCase().includes(search) ||
            p.email?.toLowerCase().includes(search));
    }
    toggleSelectAll() {
        if (this.selectAll) {
            // Deselect all
            this.selectedParticipantIds.clear();
        }
        else {
            // Select all filtered eligible
            this.getFilteredEligibleParticipants().forEach(p => this.selectedParticipantIds.add(p.userId));
        }
        this.selectAll = !this.selectAll;
    }
    toggleParticipantSelection(participantId) {
        if (this.selectedParticipantIds.has(participantId)) {
            this.selectedParticipantIds.delete(participantId);
        }
        else {
            this.selectedParticipantIds.add(participantId);
        }
        // Update selectAll state
        const filtered = this.getFilteredEligibleParticipants();
        this.selectAll = filtered.length > 0 && filtered.every(p => this.selectedParticipantIds.has(p.userId));
    }
    isSelected(participantId) {
        return this.selectedParticipantIds.has(participantId);
    }
    getSelectedCount() {
        return this.selectedParticipantIds.size;
    }
    getPointsPerParticipant() {
        const count = this.getSelectedCount();
        if (count === 0 || this.bulkAwardAmount <= 0)
            return 0;
        // Return integer points (floor division)
        return Math.floor(this.bulkAwardAmount / count);
    }
    canSubmitBulkAward() {
        if (!this.canAwardPoints())
            return false;
        if (this.bulkAwardAmount <= 0)
            return false;
        if (this.getSelectedCount() === 0)
            return false;
        if (!this.isPoolUnlimited() && this.bulkAwardAmount > this.getRemainingPoints())
            return false;
        return true;
    }
    submitBulkAward() {
        if (!this.canSubmitBulkAward())
            return;
        const perParticipant = this.getPointsPerParticipant();
        const awards = Array.from(this.selectedParticipantIds).map(id => ({
            participantId: id,
            points: Math.floor(perParticipant) // Ensure integer
        }));
        const request = { awards };
        this.isBulkAwarding = true;
        this.errorMessage = '';
        this.eventService.bulkAwardPoints(this.eventId, request)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isBulkAwarding = false)))
            .subscribe({
            next: (response) => {
                console.log('[Points] Bulk award successful:', response);
                this.successMessage = `Awarded ${response.participantsAwarded} participants with ${perParticipant.toLocaleString()} points each`;
                this.bulkAwardAmount = 0;
                this.selectedParticipantIds.clear();
                this.selectAll = false;
                this.loadData();
                this.pointsAwarded.emit();
                setTimeout(() => this.successMessage = '', 5000);
            },
            error: (error) => {
                console.error('[Points] Bulk award error:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to award points. Please try again.';
                this.loadData(); // Refresh data on error
            }
        });
    }
    // ==================== RANK AWARD ====================
    /**
     * Get participants eligible for rank award.
     * Only shows participants who:
     * 1. Have NOT received points yet (pointsAwarded === 0 or null)
     * 2. Are registered or checked-in (not NoShow)
     * 3. Match search criteria if search is active
     */
    getEligibleRankParticipants() {
        return this.checkedInParticipants.filter(p => (p.pointsAwarded || 0) === 0 &&
            (p.attendanceStatus === 'Registered' || p.attendanceStatus === 'Attended'));
    }
    onRankParticipantSearch(search) {
        this.rankSearchText = search;
        this.selectedRankParticipant = null;
        if (!search || search.length < 2) {
            this.filteredRankParticipants = [];
            this.showRankDropdown = false;
            return;
        }
        const searchLower = search.toLowerCase();
        const eligible = this.getEligibleRankParticipants();
        this.filteredRankParticipants = eligible.filter(p => p.name?.toLowerCase().includes(searchLower) ||
            p.employeeId?.toLowerCase().includes(searchLower) ||
            p.email?.toLowerCase().includes(searchLower)).slice(0, 10);
        this.showRankDropdown = this.filteredRankParticipants.length > 0;
    }
    selectRankParticipant(participant) {
        this.selectedRankParticipant = participant;
        this.rankSearchText = participant.name;
        this.showRankDropdown = false;
    }
    clearRankSelection() {
        this.selectedRankParticipant = null;
        this.rankSearchText = '';
        this.rankPoints = 0;
        this.rankValue = null;
    }
    canSubmitRankAward() {
        if (!this.canAwardPoints())
            return false;
        if (!this.selectedRankParticipant)
            return false;
        if (this.rankPoints <= 0)
            return false;
        if (!this.isPoolUnlimited() && this.rankPoints > this.getRemainingPoints())
            return false;
        // Check for duplicate rank
        if (this.rankValue && this.isRankAlreadyUsed(this.rankValue))
            return false;
        return true;
    }
    isRankAlreadyUsed(rank) {
        return this.participants.some(p => p.eventRank === rank && (p.pointsAwarded || 0) > 0);
    }
    submitRankAward() {
        if (!this.canSubmitRankAward() || !this.selectedRankParticipant)
            return;
        const request = {
            points: this.rankPoints,
            rank: this.rankValue || undefined
        };
        this.isRankAwarding = true;
        this.errorMessage = '';
        this.eventService.awardPoints(this.eventId, this.selectedRankParticipant.userId, request)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isRankAwarding = false)))
            .subscribe({
            next: (response) => {
                console.log('[Points] Rank award successful:', response);
                this.successMessage = `Awarded ${this.rankPoints.toLocaleString()} pts to ${this.selectedRankParticipant?.name}${this.rankValue ? ` (Rank #${this.rankValue})` : ''}`;
                this.clearRankSelection();
                this.loadData();
                this.pointsAwarded.emit();
                setTimeout(() => this.successMessage = '', 5000);
            },
            error: (error) => {
                console.error('[Points] Rank award error:', error);
                const errMsg = error.error?.message || error.message || 'Failed to award points. Please try again.';
                this.errorMessage = errMsg;
                this.loadData(); // Refresh data on error
            }
        });
    }
    // ==================== POOL ALLOCATION (EqualSplit / RankBased) ====================
    /**
     * Validate if pool allocation can be submitted
     */
    canSubmitPoolAllocation() {
        if (!this.canAwardPoints())
            return false;
        if (this.isPoolUnlimited())
            return false;
        if (this.getRemainingPoints() <= 0)
            return false;
        if (this.getSelectedCount() === 0)
            return false;
        if (this.poolAllocationMode === 'RankBased') {
            const rankPointsArray = this.parseRankPoints();
            if (rankPointsArray.length === 0)
                return false;
            // Sum of rank points must not exceed pool
            const sum = rankPointsArray.reduce((a, b) => a + b, 0);
            if (sum > this.getRemainingPoints())
                return false;
        }
        return true;
    }
    /**
     * Parse comma-separated rank points input
     */
    parseRankPoints() {
        if (!this.rankPointsInput.trim())
            return [];
        return this.rankPointsInput
            .split(',')
            .map(s => parseInt(s.trim(), 10))
            .filter(n => !isNaN(n) && n > 0);
    }
    /**
     * Get sum of parsed rank points (for template use)
     */
    getRankPointsSum() {
        return this.parseRankPoints().reduce((a, b) => a + b, 0);
    }
    /**
     * Preview points distribution for pool allocation
     */
    getPoolAllocationPreview() {
        const selectedParticipants = this.getFilteredEligibleParticipants()
            .filter(p => this.selectedParticipantIds.has(p.userId));
        if (selectedParticipants.length === 0)
            return [];
        const remaining = this.getRemainingPoints();
        const count = selectedParticipants.length;
        if (this.poolAllocationMode === 'EqualSplit') {
            const basePoints = Math.floor(remaining / count);
            const remainder = remaining % count;
            return selectedParticipants.map((p, idx) => ({
                participantId: p.userId,
                name: p.name,
                points: basePoints + (idx < remainder ? 1 : 0)
            }));
        }
        else {
            // RankBased
            const rankPointsArray = this.parseRankPoints();
            const specifiedCount = Math.min(rankPointsArray.length, count - 1);
            const specifiedSum = rankPointsArray.slice(0, specifiedCount).reduce((a, b) => a + b, 0);
            const remainingForLast = remaining - specifiedSum;
            return selectedParticipants.map((p, idx) => {
                const rank = idx + 1;
                let points;
                if (idx < specifiedCount) {
                    points = rankPointsArray[idx];
                }
                else {
                    // Last rank(s) get remaining
                    const lastCount = count - specifiedCount;
                    if (lastCount === 1) {
                        points = remainingForLast;
                    }
                    else {
                        const lastIdx = idx - specifiedCount;
                        const baseLastPoints = Math.floor(remainingForLast / lastCount);
                        const lastRemainder = remainingForLast % lastCount;
                        points = baseLastPoints + (lastIdx < lastRemainder ? 1 : 0);
                    }
                }
                return {
                    participantId: p.userId,
                    name: p.name,
                    points,
                    rank
                };
            });
        }
    }
    /**
     * Submit pool allocation (entire pool distribution)
     */
    submitPoolAllocation() {
        if (!this.canSubmitPoolAllocation())
            return;
        // Build awards from preview
        const preview = this.getPoolAllocationPreview();
        const awards = preview.map(p => ({
            participantId: p.participantId,
            points: p.points,
            rank: p.rank
        }));
        const request = {
            awards,
            mode: this.poolAllocationMode,
            consumeEntirePool: true,
            rankPoints: this.poolAllocationMode === 'RankBased' ? this.parseRankPoints() : undefined
        };
        this.isAllocatingPool = true;
        this.errorMessage = '';
        this.eventService.bulkAwardPoints(this.eventId, request)
            .pipe(takeUntil(this.destroy$), finalize(() => (this.isAllocatingPool = false)))
            .subscribe({
            next: (response) => {
                console.log('[Points] Pool allocation successful:', response);
                const mode = this.poolAllocationMode === 'EqualSplit' ? 'Equal Split' : 'Rank-Based';
                this.successMessage = `${mode} allocation complete! Awarded ${response.participantsAwarded} participants with ${response.totalPointsAwarded.toLocaleString()} total points.`;
                if (response.remainingPoolPoints === 0) {
                    this.successMessage += ' Event auto-completed (pool exhausted).';
                }
                this.selectedParticipantIds.clear();
                this.selectAll = false;
                this.rankPointsInput = '';
                this.loadData();
                this.pointsAwarded.emit();
                setTimeout(() => this.successMessage = '', 8000);
            },
            error: (error) => {
                console.error('[Points] Pool allocation error:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to allocate pool. Please try again.';
                this.loadData();
            }
        });
    }
    // ==================== RANK HISTORY ====================
    getAwardedParticipants() {
        return this.participants.filter(p => p.pointsAwarded && p.pointsAwarded > 0)
            .sort((a, b) => {
            // Sort by rank if available, then by awarded time
            if (a.eventRank && b.eventRank)
                return a.eventRank - b.eventRank;
            if (a.eventRank)
                return -1;
            if (b.eventRank)
                return 1;
            return 0;
        });
    }
    formatDate(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    // ==================== UTILS ====================
    dismissError() {
        this.errorMessage = '';
    }
    dismissSuccess() {
        this.successMessage = '';
    }
    static { this.ɵfac = function EventDetailPointsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventDetailPointsComponent)(i0.ɵɵdirectiveInject(i1.EventService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventDetailPointsComponent, selectors: [["app-event-detail-points"]], inputs: { eventId: "eventId", event: "event" }, outputs: { pointsAwarded: "pointsAwarded" }, features: [i0.ɵɵNgOnChangesFeature], decls: 5, vars: 4, consts: [[1, "points-content"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "alert", "alert-danger"], [1, "alert-body"], [1, "fa-solid", "fa-circle-exclamation"], ["type", "button", 1, "alert-close", 3, "click"], [1, "fa-solid", "fa-xmark"], [1, "alert", "alert-success"], [1, "fa-solid", "fa-circle-check"], [1, "loading-state"], [1, "spinner"], [1, "card", "points-overview-card"], [1, "card-title"], [1, "fa-solid", "fa-coins"], [1, "points-stats"], [1, "stat-item"], [1, "stat-label"], [1, "stat-value"], [1, "stat-value", "distributed"], [1, "stat-value", "remaining"], ["class", "distribution-bar-container", 4, "ngIf"], ["class", "card locked-card", 4, "ngIf"], ["class", "card history-card", 4, "ngIf"], [1, "fa-solid", "fa-infinity"], [1, "distribution-bar-container"], [1, "distribution-bar"], [1, "distribution-fill"], [1, "distribution-info"], [1, "card", "locked-card"], [1, "locked-content"], [1, "fa-solid", "fa-lock"], [1, "current-status"], [1, "status-tag"], [1, "card", "bulk-award-card"], [1, "fa-solid", "fa-layer-group"], [1, "bulk-amount-section"], [1, "input-label"], [1, "amount-input-group"], ["type", "number", "placeholder", "Enter total points to distribute", "min", "1", 1, "form-input", "amount-input", 3, "ngModelChange", "ngModel", "max"], ["class", "remaining-hint", 4, "ngIf"], ["class", "validation-error", 4, "ngIf"], [1, "participants-selection"], [1, "selection-header"], [1, "selection-title"], [1, "selection-search"], [1, "fa-solid", "fa-magnifying-glass", "search-icon"], ["type", "text", "placeholder", "Search by name, email, or employee ID...", 1, "form-input", "search-input", 3, "ngModelChange", "ngModel"], [1, "selection-table-container"], [1, "selection-table"], [1, "col-checkbox"], [1, "checkbox-label"], ["type", "checkbox", 3, "change", "checked"], [1, "checkmark"], [1, "col-name"], [1, "col-employee-id"], [1, "col-email"], [3, "selected", 4, "ngFor", "ngForOf"], ["class", "bulk-summary", 4, "ngIf"], [1, "bulk-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "fa-solid fa-gift", 4, "ngIf"], ["class", "fa-solid fa-spinner fa-spin", 4, "ngIf"], [1, "card", "rank-award-card"], [1, "fa-solid", "fa-trophy"], ["class", "no-eligible-message", 4, "ngIf"], ["class", "rank-form", 4, "ngIf"], ["class", "card pool-allocation-card", 4, "ngIf"], [1, "remaining-hint"], [1, "validation-error"], [1, "fa-solid", "fa-triangle-exclamation"], ["colspan", "4", 1, "empty-message"], [1, "bulk-summary"], [1, "summary-info"], [1, "summary-item"], [1, "fa-solid", "fa-arrow-right", "summary-arrow"], [1, "summary-item", "highlight"], [1, "fa-solid", "fa-gift"], [1, "fa-solid", "fa-spinner", "fa-spin"], [1, "no-eligible-message"], [1, "fa-solid", "fa-circle-info"], [1, "small-text"], [1, "rank-form"], [1, "form-group"], [1, "participant-search"], ["type", "text", "placeholder", "Search by name, email, or employee ID...", 1, "form-input", 3, "input", "focus", "value"], ["class", "search-dropdown", 4, "ngIf"], ["class", "selected-participant", 4, "ngIf"], [1, "form-row"], ["type", "number", "placeholder", "e.g., 1, 2, 3", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Enter points", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel", "max"], [1, "rank-actions"], [1, "search-dropdown"], ["class", "dropdown-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "dropdown-item", 3, "click"], [1, "item-name"], [1, "item-details"], [1, "selected-participant"], [1, "participant-badge"], [1, "fa-solid", "fa-user-check"], [1, "btn-clear", 3, "click"], [1, "fa-solid", "fa-circle-xmark"], [1, "card", "pool-allocation-card"], [1, "fa-solid", "fa-sack-dollar"], [1, "section-description"], [1, "mode-toggle"], [1, "mode-btn", 3, "click"], [1, "fa-solid", "fa-equals"], [1, "fa-solid", "fa-ranking-star"], ["class", "form-group", 4, "ngIf"], [1, "selection-info"], ["class", "text-muted", 4, "ngIf"], ["class", "text-success", 4, "ngIf"], ["class", "allocation-preview", 4, "ngIf"], [1, "pool-allocation-actions"], [1, "btn", "btn-warning", 3, "click", "disabled"], ["class", "fa-solid fa-bolt", 4, "ngIf"], ["type", "text", "placeholder", "e.g., 500, 300, 150 (last rank auto-calculated)", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-hint"], [1, "text-muted"], [1, "fa-solid", "fa-arrow-up"], [1, "text-success"], [1, "fa-solid", "fa-check-circle"], [1, "allocation-preview"], [1, "preview-title"], [1, "preview-table-container"], [1, "preview-table"], [4, "ngFor", "ngForOf"], [1, "total-row"], [1, "points-cell"], [1, "rank-badge"], [1, "fa-solid", "fa-bolt"], [1, "card", "history-card"], [1, "fa-solid", "fa-clock-rotate-left"], [1, "history-table-container"], [1, "history-table"], [1, "col-rank"], [1, "col-points"], [1, "col-time"], ["class", "rank-badge", 4, "ngIf"]], template: function EventDetailPointsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, EventDetailPointsComponent_div_1_Template, 7, 1, "div", 1)(2, EventDetailPointsComponent_div_2_Template, 7, 1, "div", 2)(3, EventDetailPointsComponent_div_3_Template, 4, 0, "div", 3)(4, EventDetailPointsComponent_div_4_Template, 28, 11, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.event);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, FormsModule, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.NgControlStatus, i3.MinValidator, i3.MaxValidator, i3.NgModel, i2.DecimalPipe], styles: ["\n\n\n\n\n\n.points-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  border-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.alert-body[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  border: 1px solid #86efac;\n  color: #166534;\n}\n\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  color: #991b1b;\n}\n\n.alert-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: inherit;\n  opacity: 0.7;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.alert-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n  background: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin: 0 auto 1rem;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n\n\n.card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem;\n}\n\n.card-title[_ngcontent-%COMP%] {\n  margin: 0 0 1.25rem 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.card-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #2c5f3f;\n}\n\n\n\n.points-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n  padding: 1rem;\n  background: #f8faf9;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6b7280;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.stat-value.distributed[_ngcontent-%COMP%] {\n  color: #2c5f3f;\n}\n\n.stat-value.remaining[_ngcontent-%COMP%] {\n  color: #0891b2;\n}\n\n\n\n.distribution-bar-container[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n\n.distribution-bar[_ngcontent-%COMP%] {\n  height: 10px;\n  background: #e5e7eb;\n  border-radius: 999px;\n  overflow: hidden;\n}\n\n.distribution-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #2c5f3f, #4ade80);\n  border-radius: 999px;\n  transition: width 0.5s ease;\n}\n\n.distribution-info[_ngcontent-%COMP%] {\n  text-align: right;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n\n\n\n.locked-card[_ngcontent-%COMP%] {\n  background: #f8faf9;\n}\n\n.locked-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem 1rem;\n}\n\n.locked-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #9ca3af;\n  margin-bottom: 1rem;\n}\n\n.locked-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  color: #374151;\n}\n\n.locked-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n\n.current-status[_ngcontent-%COMP%] {\n  margin-top: 1rem !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n\n\n.status-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.8rem;\n}\n\n.status-tag.status-upcoming[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-tag.status-live[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-tag.status-completed[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-tag.status-cancelled[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n\n\n.bulk-amount-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n\n.input-label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n\n.amount-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n  background: #ffffff;\n}\n\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.amount-input[_ngcontent-%COMP%] {\n  max-width: 300px;\n}\n\n.remaining-hint[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n.validation-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #991b1b;\n  font-size: 0.9rem;\n}\n\n.validation-error[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n\n\n.participants-selection[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n\n.selection-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.selection-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.95rem;\n}\n\n.selection-search[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 280px;\n  flex: 1;\n  max-width: 400px;\n}\n\n.selection-search[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  pointer-events: none;\n  font-size: 0.9rem;\n}\n\n.selection-search[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  padding-left: 2.5rem;\n}\n\n\n\n.selection-table-container[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n\n.selection-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n\n.selection-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8faf9;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\n.selection-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.selection-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #4b5563;\n}\n\n.selection-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8faf9;\n}\n\n.selection-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n}\n\n.col-checkbox[_ngcontent-%COMP%] {\n  width: 48px;\n}\n\n\n\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.checkbox-label[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  accent-color: #2c5f3f;\n  cursor: pointer;\n}\n\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #9ca3af;\n  padding: 2rem !important;\n}\n\n\n\n.bulk-summary[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 8px;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n\n.summary-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #374151;\n}\n\n.summary-item.highlight[_ngcontent-%COMP%] {\n  color: #166534;\n  font-weight: 600;\n}\n\n.summary-arrow[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n\n\n\n.bulk-actions[_ngcontent-%COMP%], \n.rank-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n\n\n\n.no-eligible-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 8px;\n  text-align: center;\n}\n\n.no-eligible-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #0891b2;\n}\n\n.no-eligible-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #0e7490;\n}\n\n.no-eligible-message[_ngcontent-%COMP%]   .small-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n.rank-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n\n\n\n.participant-search[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.participant-search[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  pointer-events: none;\n  font-size: 0.9rem;\n}\n\n.participant-search[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-left: 2.5rem;\n}\n\n.search-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin-top: 4px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  max-height: 240px;\n  overflow-y: auto;\n}\n\n.search-dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  border-bottom: 1px solid #f3f4f6;\n  transition: background 0.15s;\n}\n\n.search-dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.search-dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #f8faf9;\n}\n\n.dropdown-item[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.dropdown-item[_ngcontent-%COMP%]   .item-details[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6b7280;\n}\n\n\n\n.selected-participant[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n\n.participant-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 999px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #166534;\n}\n\n.participant-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n\n.btn-clear[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: #f3f4f6;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n\n.btn-clear[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n\n\n\n.history-table-container[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n\n.history-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8faf9;\n}\n\n.history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #4b5563;\n}\n\n.history-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n\n.history-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8faf9;\n}\n\n.col-rank[_ngcontent-%COMP%] {\n  width: 80px;\n}\n\n.rank-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem 0.75rem;\n  background: linear-gradient(135deg, #fbbf24, #f59e0b);\n  color: #ffffff;\n  font-weight: 700;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);\n}\n\n.col-points[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.col-time[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n\n\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #2c5f3f;\n  color: #ffffff;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #234d33;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(44, 95, 63, 0.25);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n\n\n.pool-allocation-card[_ngcontent-%COMP%] {\n  border: 2px solid #f59e0b;\n  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);\n}\n\n.pool-allocation-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n\n.section-description[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.9rem;\n  margin-bottom: 1.25rem;\n  line-height: 1.6;\n}\n\n.section-description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n  font-weight: 600;\n}\n\n.mode-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.25rem;\n}\n\n.mode-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  background: #ffffff;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease;\n}\n\n.mode-btn[_ngcontent-%COMP%]:hover {\n  border-color: #f59e0b;\n  color: #b45309;\n}\n\n.mode-btn.active[_ngcontent-%COMP%] {\n  border-color: #f59e0b;\n  background: #fef3c7;\n  color: #b45309;\n}\n\n.input-hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #9ca3af;\n  margin-top: 0.5rem;\n}\n\n.selection-info[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background: #f9fafb;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  text-align: center;\n}\n\n.selection-info[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n\n.selection-info[_ngcontent-%COMP%]   .text-success[_ngcontent-%COMP%] {\n  color: #166534;\n  font-weight: 500;\n}\n\n.allocation-preview[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n\n.preview-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.75rem;\n}\n\n.preview-table-container[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n\n.preview-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n\n.preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.preview-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.625rem 0.75rem;\n  text-align: left;\n  border-bottom: 1px solid #f3f4f6;\n}\n\n.preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  font-weight: 600;\n  color: #374151;\n  position: sticky;\n  top: 0;\n}\n\n.preview-table[_ngcontent-%COMP%]   .points-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.preview-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  font-weight: 600;\n}\n\n.preview-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n\n.pool-allocation-actions[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n\n.btn-warning[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  background-color: #f59e0b;\n  color: #ffffff;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.btn-warning[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #d97706;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.25);\n}\n\n.btn-warning[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n\n\n@media (max-width: 768px) {\n  .points-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .points-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n\n  .selection-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .selection-search[_ngcontent-%COMP%] {\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .amount-input-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .amount-input[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n\n  .col-email[_ngcontent-%COMP%] {\n    display: none;\n  }\n  \n  .mode-toggle[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventDetailPointsComponent, [{
        type: Component,
        args: [{ selector: 'app-event-detail-points', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"points-content\">\r\n  <!-- Messages -->\r\n  <div *ngIf=\"errorMessage\" class=\"alert alert-danger\">\r\n    <div class=\"alert-body\">\r\n      <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n      <span>{{ errorMessage }}</span>\r\n    </div>\r\n    <button type=\"button\" class=\"alert-close\" (click)=\"dismissError()\">\r\n      <i class=\"fa-solid fa-xmark\"></i>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"successMessage\" class=\"alert alert-success\">\r\n    <div class=\"alert-body\">\r\n      <i class=\"fa-solid fa-circle-check\"></i>\r\n      <span>{{ successMessage }}</span>\r\n    </div>\r\n    <button type=\"button\" class=\"alert-close\" (click)=\"dismissSuccess()\">\r\n      <i class=\"fa-solid fa-xmark\"></i>\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Loading State -->\r\n  <div *ngIf=\"isLoading\" class=\"loading-state\">\r\n    <div class=\"spinner\"></div>\r\n    <p>Loading points data...</p>\r\n  </div>\r\n\r\n  <!-- Main Content -->\r\n  <div *ngIf=\"!isLoading && event\">\r\n    \r\n    <!-- 1. Points Overview Section -->\r\n    <div class=\"card points-overview-card\">\r\n      <h3 class=\"card-title\"><i class=\"fa-solid fa-coins\"></i> Points Overview</h3>\r\n      \r\n      <div class=\"points-stats\">\r\n        <div class=\"stat-item\">\r\n          <span class=\"stat-label\">Total Points Pool</span>\r\n          <span class=\"stat-value\">\r\n            <ng-container *ngIf=\"!isPoolUnlimited()\">{{ (getTotalPool() || 0) | number }}</ng-container>\r\n            <ng-container *ngIf=\"isPoolUnlimited()\">Unlimited</ng-container>\r\n          </span>\r\n        </div>\r\n        <div class=\"stat-item\">\r\n          <span class=\"stat-label\">Distributed</span>\r\n          <span class=\"stat-value distributed\">{{ getDistributedPoints() | number }}</span>\r\n        </div>\r\n        <div class=\"stat-item\">\r\n          <span class=\"stat-label\">Remaining</span>\r\n          <span class=\"stat-value remaining\">\r\n            <ng-container *ngIf=\"!isPoolUnlimited()\">{{ getRemainingPoints() | number }}</ng-container>\r\n            <ng-container *ngIf=\"isPoolUnlimited()\"><i class=\"fa-solid fa-infinity\"></i></ng-container>\r\n          </span>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Distribution Bar -->\r\n      <div class=\"distribution-bar-container\" *ngIf=\"!isPoolUnlimited()\">\r\n        <div class=\"distribution-bar\">\r\n          <div class=\"distribution-fill\" [style.width.%]=\"getDistributionPercentage()\"></div>\r\n        </div>\r\n        <div class=\"distribution-info\">\r\n          <span>{{ getDistributionPercentage() }}% distributed</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Locked State -->\r\n    <div class=\"card locked-card\" *ngIf=\"!canAwardPoints()\">\r\n      <div class=\"locked-content\">\r\n        <i class=\"fa-solid fa-lock\"></i>\r\n        <h4>Points Award Locked</h4>\r\n        <p>Event must be <strong>Live</strong> to award points.</p>\r\n        <p class=\"current-status\">Current status: <span class=\"status-tag\" [class]=\"'status-' + event.status.toLowerCase()\">{{ event.status }}</span></p>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Award Sections (only when Live) -->\r\n    <ng-container *ngIf=\"canAwardPoints()\">\r\n      \r\n      <!-- 2. Bulk Points Awarding Section -->\r\n      <div class=\"card bulk-award-card\">\r\n        <h3 class=\"card-title\"><i class=\"fa-solid fa-layer-group\"></i> Bulk Points Awarding</h3>\r\n        \r\n        <!-- Bulk Amount Input -->\r\n        <div class=\"bulk-amount-section\">\r\n          <label class=\"input-label\">Enter Bulk Amount</label>\r\n          <div class=\"amount-input-group\">\r\n            <input \r\n              type=\"number\" \r\n              class=\"form-input amount-input\"\r\n              [(ngModel)]=\"bulkAwardAmount\"\r\n              placeholder=\"Enter total points to distribute\"\r\n              min=\"1\"\r\n              [max]=\"isPoolUnlimited() ? undefined : getRemainingPoints()\"\r\n            />\r\n            <span class=\"remaining-hint\" *ngIf=\"!isPoolUnlimited()\">\r\n              Max: {{ getRemainingPoints() | number }}\r\n            </span>\r\n          </div>\r\n          <div class=\"validation-error\" *ngIf=\"bulkAwardAmount > 0 && !isPoolUnlimited() && bulkAwardAmount > getRemainingPoints()\">\r\n            <i class=\"fa-solid fa-triangle-exclamation\"></i> Amount exceeds remaining points\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Participants Selection -->\r\n        <div class=\"participants-selection\">\r\n          <div class=\"selection-header\">\r\n            <span class=\"selection-title\">Select Participants</span>\r\n            <div class=\"selection-search\">\r\n              <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n              <input \r\n                type=\"text\" \r\n                class=\"form-input search-input\"\r\n                [(ngModel)]=\"bulkSearchText\"\r\n                placeholder=\"Search by name, email, or employee ID...\"\r\n              />\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"selection-table-container\">\r\n            <table class=\"selection-table\">\r\n              <thead>\r\n                <tr>\r\n                  <th class=\"col-checkbox\">\r\n                    <label class=\"checkbox-label\">\r\n                      <input \r\n                        type=\"checkbox\" \r\n                        [checked]=\"selectAll\"\r\n                        (change)=\"toggleSelectAll()\"\r\n                      />\r\n                      <span class=\"checkmark\"></span>\r\n                    </label>\r\n                  </th>\r\n                  <th class=\"col-name\">Name</th>\r\n                  <th class=\"col-employee-id\">Employee ID</th>\r\n                  <th class=\"col-email\">Email</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let p of getFilteredEligibleParticipants()\" [class.selected]=\"isSelected(p.userId)\">\r\n                  <td class=\"col-checkbox\">\r\n                    <label class=\"checkbox-label\">\r\n                      <input \r\n                        type=\"checkbox\" \r\n                        [checked]=\"isSelected(p.userId)\"\r\n                        (change)=\"toggleParticipantSelection(p.userId)\"\r\n                      />\r\n                      <span class=\"checkmark\"></span>\r\n                    </label>\r\n                  </td>\r\n                  <td class=\"col-name\">{{ p.name }}</td>\r\n                  <td class=\"col-employee-id\">{{ p.employeeId }}</td>\r\n                  <td class=\"col-email\">{{ p.email }}</td>\r\n                </tr>\r\n                <tr *ngIf=\"getFilteredEligibleParticipants().length === 0\">\r\n                  <td colspan=\"4\" class=\"empty-message\">No eligible participants found</td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Bulk Summary -->\r\n        <div class=\"bulk-summary\" *ngIf=\"getSelectedCount() > 0 && bulkAwardAmount > 0\">\r\n          <div class=\"summary-info\">\r\n            <span class=\"summary-item\">\r\n              <strong>{{ getSelectedCount() }}</strong> participants selected\r\n            </span>\r\n            <i class=\"fa-solid fa-arrow-right summary-arrow\"></i>\r\n            <span class=\"summary-item highlight\">\r\n              <strong>{{ getPointsPerParticipant() | number }}</strong> points each\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"bulk-actions\">\r\n          <button \r\n            class=\"btn btn-primary\"\r\n            (click)=\"submitBulkAward()\"\r\n            [disabled]=\"!canSubmitBulkAward() || isBulkAwarding\"\r\n          >\r\n            <i class=\"fa-solid fa-gift\" *ngIf=\"!isBulkAwarding\"></i>\r\n            <i class=\"fa-solid fa-spinner fa-spin\" *ngIf=\"isBulkAwarding\"></i>\r\n            {{ isBulkAwarding ? 'Awarding...' : 'Award Points' }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- 3. Award by Rank Section -->\r\n      <div class=\"card rank-award-card\">\r\n        <h3 class=\"card-title\"><i class=\"fa-solid fa-trophy\"></i> Award by Rank</h3>\r\n        \r\n        <!-- No Eligible Participants Message -->\r\n        <div class=\"no-eligible-message\" *ngIf=\"getEligibleRankParticipants().length === 0\">\r\n          <i class=\"fa-solid fa-circle-info\"></i>\r\n          <p>No eligible participants available for rank awards.</p>\r\n          <p class=\"small-text\">Eligible participants are those who: are registered/checked-in AND have not yet received points.</p>\r\n        </div>\r\n\r\n        <div class=\"rank-form\" *ngIf=\"getEligibleRankParticipants().length > 0\">\r\n          <!-- Participant Search -->\r\n          <div class=\"form-group\">\r\n            <label class=\"input-label\">Find Participant</label>\r\n            <div class=\"participant-search\">\r\n              <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n              <input \r\n                type=\"text\" \r\n                class=\"form-input\"\r\n                placeholder=\"Search by name, email, or employee ID...\"\r\n                [value]=\"rankSearchText\"\r\n                (input)=\"onRankParticipantSearch($any($event.target).value)\"\r\n                (focus)=\"showRankDropdown = filteredRankParticipants.length > 0\"\r\n              />\r\n              <div class=\"search-dropdown\" *ngIf=\"showRankDropdown && filteredRankParticipants.length > 0\">\r\n                <div \r\n                  *ngFor=\"let p of filteredRankParticipants\"\r\n                  class=\"dropdown-item\"\r\n                  (click)=\"selectRankParticipant(p)\"\r\n                >\r\n                  <span class=\"item-name\">{{ p.name }}</span>\r\n                  <span class=\"item-details\">{{ p.employeeId }} \u2022 {{ p.email }}</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"selectedRankParticipant\" class=\"selected-participant\">\r\n              <span class=\"participant-badge\">\r\n                <i class=\"fa-solid fa-user-check\"></i>\r\n                {{ selectedRankParticipant.name }} ({{ selectedRankParticipant.employeeId }})\r\n              </span>\r\n              <button class=\"btn-clear\" (click)=\"clearRankSelection()\">\r\n                <i class=\"fa-solid fa-xmark\"></i>\r\n              </button>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Rank & Points Inputs -->\r\n          <div class=\"form-row\">\r\n            <div class=\"form-group\">\r\n              <label class=\"input-label\">Rank</label>\r\n              <input \r\n                type=\"number\" \r\n                class=\"form-input\"\r\n                [(ngModel)]=\"rankValue\"\r\n                placeholder=\"e.g., 1, 2, 3\"\r\n                min=\"1\"\r\n              />\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label class=\"input-label\">Points</label>\r\n              <input \r\n                type=\"number\" \r\n                class=\"form-input\"\r\n                [(ngModel)]=\"rankPoints\"\r\n                placeholder=\"Enter points\"\r\n                min=\"1\"\r\n                [max]=\"isPoolUnlimited() ? undefined : getRemainingPoints()\"\r\n              />\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"validation-error\" *ngIf=\"rankPoints > 0 && !isPoolUnlimited() && rankPoints > getRemainingPoints()\">\r\n            <i class=\"fa-solid fa-triangle-exclamation\"></i> Amount exceeds remaining points ({{ getRemainingPoints() | number }} available)\r\n          </div>\r\n\r\n          <div class=\"validation-error\" *ngIf=\"rankValue && isRankAlreadyUsed(rankValue)\">\r\n            <i class=\"fa-solid fa-circle-xmark\"></i> Rank #{{ rankValue }} has already been assigned. Please choose a different rank.\r\n          </div>\r\n\r\n          <div class=\"rank-actions\">\r\n            <button \r\n              class=\"btn btn-primary\"\r\n              (click)=\"submitRankAward()\"\r\n              [disabled]=\"!canSubmitRankAward() || isRankAwarding\"\r\n            >\r\n              <i class=\"fa-solid fa-gift\" *ngIf=\"!isRankAwarding\"></i>\r\n              <i class=\"fa-solid fa-spinner fa-spin\" *ngIf=\"isRankAwarding\"></i>\r\n              {{ isRankAwarding ? 'Awarding...' : 'Assign & Award' }}\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- 4. Allocate Entire Prize Pool Section -->\r\n      <div class=\"card pool-allocation-card\" *ngIf=\"!isPoolUnlimited() && getRemainingPoints() > 0\">\r\n        <h3 class=\"card-title\"><i class=\"fa-solid fa-sack-dollar\"></i> Allocate Entire Prize Pool</h3>\r\n        <p class=\"section-description\">\r\n          Distribute all <strong>{{ getRemainingPoints() | number }}</strong> remaining points to selected participants.\r\n          This action will exhaust the pool and auto-complete the event.\r\n        </p>\r\n\r\n        <!-- Distribution Mode Toggle -->\r\n        <div class=\"mode-toggle\">\r\n          <button \r\n            class=\"mode-btn\"\r\n            [class.active]=\"poolAllocationMode === 'EqualSplit'\"\r\n            (click)=\"poolAllocationMode = 'EqualSplit'\"\r\n          >\r\n            <i class=\"fa-solid fa-equals\"></i> Equal Split\r\n          </button>\r\n          <button \r\n            class=\"mode-btn\"\r\n            [class.active]=\"poolAllocationMode === 'RankBased'\"\r\n            (click)=\"poolAllocationMode = 'RankBased'\"\r\n          >\r\n            <i class=\"fa-solid fa-ranking-star\"></i> Rank-Based\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Rank Points Input (only for RankBased) -->\r\n        <div class=\"form-group\" *ngIf=\"poolAllocationMode === 'RankBased'\">\r\n          <label class=\"input-label\">Points per Rank (comma-separated)</label>\r\n          <input \r\n            type=\"text\" \r\n            class=\"form-input\"\r\n            [(ngModel)]=\"rankPointsInput\"\r\n            placeholder=\"e.g., 500, 300, 150 (last rank auto-calculated)\"\r\n          />\r\n          <p class=\"input-hint\">\r\n            Enter points for Rank 1, 2, 3, etc. The last participant(s) will receive the remaining points automatically.\r\n          </p>\r\n        </div>\r\n\r\n        <!-- Participant Selection (reuses bulk selection) -->\r\n        <div class=\"selection-info\">\r\n          <span *ngIf=\"getSelectedCount() === 0\" class=\"text-muted\">\r\n            <i class=\"fa-solid fa-arrow-up\"></i> Select participants from the Bulk Points section above\r\n          </span>\r\n          <span *ngIf=\"getSelectedCount() > 0\" class=\"text-success\">\r\n            <i class=\"fa-solid fa-check-circle\"></i> {{ getSelectedCount() }} participants selected\r\n          </span>\r\n        </div>\r\n\r\n        <!-- Preview -->\r\n        <div class=\"allocation-preview\" *ngIf=\"getSelectedCount() > 0 && canSubmitPoolAllocation()\">\r\n          <h4 class=\"preview-title\">Distribution Preview</h4>\r\n          <div class=\"preview-table-container\">\r\n            <table class=\"preview-table\">\r\n              <thead>\r\n                <tr>\r\n                  <th *ngIf=\"poolAllocationMode === 'RankBased'\">Rank</th>\r\n                  <th>Participant</th>\r\n                  <th>Points</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of getPoolAllocationPreview()\">\r\n                  <td *ngIf=\"poolAllocationMode === 'RankBased'\">\r\n                    <span class=\"rank-badge\">#{{ item.rank }}</span>\r\n                  </td>\r\n                  <td>{{ item.name }}</td>\r\n                  <td class=\"points-cell\">{{ item.points | number }}</td>\r\n                </tr>\r\n              </tbody>\r\n              <tfoot>\r\n                <tr class=\"total-row\">\r\n                  <td [attr.colspan]=\"poolAllocationMode === 'RankBased' ? 2 : 1\"><strong>Total</strong></td>\r\n                  <td class=\"points-cell\"><strong>{{ getRemainingPoints() | number }}</strong></td>\r\n                </tr>\r\n              </tfoot>\r\n            </table>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Validation errors -->\r\n        <div class=\"validation-error\" *ngIf=\"poolAllocationMode === 'RankBased' && parseRankPoints().length > 0\">\r\n          <ng-container *ngIf=\"getRankPointsSum() > getRemainingPoints()\">\r\n            <i class=\"fa-solid fa-triangle-exclamation\"></i> \r\n            Sum of rank points ({{ getRankPointsSum() | number }}) exceeds remaining pool ({{ getRemainingPoints() | number }})\r\n          </ng-container>\r\n        </div>\r\n\r\n        <div class=\"pool-allocation-actions\">\r\n          <button \r\n            class=\"btn btn-warning\"\r\n            (click)=\"submitPoolAllocation()\"\r\n            [disabled]=\"!canSubmitPoolAllocation() || isAllocatingPool\"\r\n          >\r\n            <i class=\"fa-solid fa-bolt\" *ngIf=\"!isAllocatingPool\"></i>\r\n            <i class=\"fa-solid fa-spinner fa-spin\" *ngIf=\"isAllocatingPool\"></i>\r\n            {{ isAllocatingPool ? 'Allocating...' : 'Allocate Entire Pool' }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n\r\n    <!-- 4. Rank History Section -->\r\n    <div class=\"card history-card\" *ngIf=\"getAwardedParticipants().length > 0\">\r\n      <h3 class=\"card-title\"><i class=\"fa-solid fa-clock-rotate-left\"></i> Rank History</h3>\r\n      \r\n      <div class=\"history-table-container\">\r\n        <table class=\"history-table\">\r\n          <thead>\r\n            <tr>\r\n              <th class=\"col-rank\">Rank</th>\r\n              <th class=\"col-name\">Participant Name</th>\r\n              <th class=\"col-employee-id\">Employee ID</th>\r\n              <th class=\"col-points\">Points Allotted</th>\r\n              <th class=\"col-time\">Assigned Time</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let p of getAwardedParticipants()\">\r\n              <td class=\"col-rank\">\r\n                <span class=\"rank-badge\" *ngIf=\"p.eventRank\">#{{ p.eventRank }}</span>\r\n                <span *ngIf=\"!p.eventRank\">\u2014</span>\r\n              </td>\r\n              <td class=\"col-name\">{{ p.name }}</td>\r\n              <td class=\"col-employee-id\">{{ p.employeeId }}</td>\r\n              <td class=\"col-points\">{{ p.pointsAwarded | number }}</td>\r\n              <td class=\"col-time\">{{ formatDate(p.awardedAt) }}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>", styles: ["/* ==========================================\n   POINTS & REWARDS TAB STYLES\n   Redesigned to match admin design system\n   ========================================== */\n\n.points-content {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n/* ========== ALERTS ========== */\n.alert {\n  padding: 1rem 1.25rem;\n  border-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  animation: slideIn 0.3s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.alert-body {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.alert-body i {\n  font-size: 1.1rem;\n}\n\n.alert-success {\n  background-color: #dcfce7;\n  border: 1px solid #86efac;\n  color: #166534;\n}\n\n.alert-danger {\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  color: #991b1b;\n}\n\n.alert-close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: inherit;\n  opacity: 0.7;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.alert-close:hover {\n  opacity: 1;\n}\n\n/* ========== LOADING STATE ========== */\n.loading-state {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n  background: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n}\n\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin: 0 auto 1rem;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n/* ========== CARD BASE ========== */\n.card {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem;\n}\n\n.card-title {\n  margin: 0 0 1.25rem 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.card-title i {\n  color: #2c5f3f;\n}\n\n/* ========== POINTS OVERVIEW CARD ========== */\n.points-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.stat-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n  padding: 1rem;\n  background: #f8faf9;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n}\n\n.stat-label {\n  font-size: 0.8rem;\n  color: #6b7280;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n}\n\n.stat-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.stat-value.distributed {\n  color: #2c5f3f;\n}\n\n.stat-value.remaining {\n  color: #0891b2;\n}\n\n/* Distribution Bar */\n.distribution-bar-container {\n  margin-top: 0.5rem;\n}\n\n.distribution-bar {\n  height: 10px;\n  background: #e5e7eb;\n  border-radius: 999px;\n  overflow: hidden;\n}\n\n.distribution-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #2c5f3f, #4ade80);\n  border-radius: 999px;\n  transition: width 0.5s ease;\n}\n\n.distribution-info {\n  text-align: right;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n\n/* ========== LOCKED CARD ========== */\n.locked-card {\n  background: #f8faf9;\n}\n\n.locked-content {\n  text-align: center;\n  padding: 2rem 1rem;\n}\n\n.locked-content i {\n  font-size: 2.5rem;\n  color: #9ca3af;\n  margin-bottom: 1rem;\n}\n\n.locked-content h4 {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  color: #374151;\n}\n\n.locked-content p {\n  margin: 0;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n\n.current-status {\n  margin-top: 1rem !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n/* Status Tags */\n.status-tag {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.8rem;\n}\n\n.status-tag.status-upcoming {\n  background-color: #ffffff;\n  color: #2c5f3f;\n  border: 1px solid #a7d7b8;\n}\n\n.status-tag.status-live {\n  background-color: #ffffff;\n  color: #0891b2;\n  border: 1px solid #67d7f0;\n}\n\n.status-tag.status-completed {\n  background-color: #ffffff;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n}\n\n.status-tag.status-cancelled {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n\n/* ========== BULK AWARD CARD ========== */\n.bulk-amount-section {\n  margin-bottom: 1.25rem;\n}\n\n.input-label {\n  display: block;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n\n.amount-input-group {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n  background: #ffffff;\n}\n\n.form-input:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.amount-input {\n  max-width: 300px;\n}\n\n.remaining-hint {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n.validation-error {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #991b1b;\n  font-size: 0.9rem;\n}\n\n.validation-error i {\n  flex-shrink: 0;\n}\n\n/* Participants Selection */\n.participants-selection {\n  margin-bottom: 1.25rem;\n}\n\n.selection-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.selection-title {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.95rem;\n}\n\n.selection-search {\n  position: relative;\n  min-width: 280px;\n  flex: 1;\n  max-width: 400px;\n}\n\n.selection-search .search-icon {\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  pointer-events: none;\n  font-size: 0.9rem;\n}\n\n.selection-search .search-input {\n  padding-left: 2.5rem;\n}\n\n/* Selection Table */\n.selection-table-container {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n\n.selection-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n\n.selection-table thead {\n  background: #f8faf9;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\n.selection-table th {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.selection-table td {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #4b5563;\n}\n\n.selection-table tbody tr:hover {\n  background: #f8faf9;\n}\n\n.selection-table tbody tr.selected {\n  background: #ecfdf5;\n}\n\n.col-checkbox {\n  width: 48px;\n}\n\n/* Checkbox Styling */\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.checkbox-label input[type=\"checkbox\"] {\n  width: 18px;\n  height: 18px;\n  accent-color: #2c5f3f;\n  cursor: pointer;\n}\n\n.empty-message {\n  text-align: center;\n  color: #9ca3af;\n  padding: 2rem !important;\n}\n\n/* Bulk Summary */\n.bulk-summary {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 8px;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n\n.summary-info {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.summary-item {\n  font-size: 0.95rem;\n  color: #374151;\n}\n\n.summary-item.highlight {\n  color: #166534;\n  font-weight: 600;\n}\n\n.summary-arrow {\n  color: #10b981;\n}\n\n/* Bulk Actions */\n.bulk-actions,\n.rank-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n/* ========== RANK AWARD CARD ========== */\n.no-eligible-message {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 8px;\n  text-align: center;\n}\n\n.no-eligible-message i {\n  font-size: 1.5rem;\n  color: #0891b2;\n}\n\n.no-eligible-message p {\n  margin: 0;\n  color: #0e7490;\n}\n\n.no-eligible-message .small-text {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n.rank-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n\n/* Participant Search Dropdown */\n.participant-search {\n  position: relative;\n}\n\n.participant-search .search-icon {\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  pointer-events: none;\n  font-size: 0.9rem;\n}\n\n.participant-search .form-input {\n  padding-left: 2.5rem;\n}\n\n.search-dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin-top: 4px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  max-height: 240px;\n  overflow-y: auto;\n}\n\n.search-dropdown .dropdown-item {\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  border-bottom: 1px solid #f3f4f6;\n  transition: background 0.15s;\n}\n\n.search-dropdown .dropdown-item:last-child {\n  border-bottom: none;\n}\n\n.search-dropdown .dropdown-item:hover {\n  background: #f8faf9;\n}\n\n.dropdown-item .item-name {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.dropdown-item .item-details {\n  font-size: 0.8rem;\n  color: #6b7280;\n}\n\n/* Selected Participant */\n.selected-participant {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n\n.participant-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  border-radius: 999px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #166534;\n}\n\n.participant-badge i {\n  color: #10b981;\n}\n\n.btn-clear {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: #f3f4f6;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n\n.btn-clear:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n\n/* ========== HISTORY CARD ========== */\n.history-table-container {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.history-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n\n.history-table thead {\n  background: #f8faf9;\n}\n\n.history-table th {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.history-table td {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #4b5563;\n}\n\n.history-table tbody tr:last-child td {\n  border-bottom: none;\n}\n\n.history-table tbody tr:hover {\n  background: #f8faf9;\n}\n\n.col-rank {\n  width: 80px;\n}\n\n.rank-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem 0.75rem;\n  background: linear-gradient(135deg, #fbbf24, #f59e0b);\n  color: #ffffff;\n  font-weight: 700;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);\n}\n\n.col-points {\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.col-time {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n\n/* ========== BUTTONS ========== */\n.btn {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn-primary {\n  background-color: #2c5f3f;\n  color: #ffffff;\n}\n\n.btn-primary:hover:not(:disabled) {\n  background-color: #234d33;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(44, 95, 63, 0.25);\n}\n\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n/* ========== POOL ALLOCATION SECTION ========== */\n.pool-allocation-card {\n  border: 2px solid #f59e0b;\n  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);\n}\n\n.pool-allocation-card .card-title {\n  color: #b45309;\n}\n\n.section-description {\n  color: #6b7280;\n  font-size: 0.9rem;\n  margin-bottom: 1.25rem;\n  line-height: 1.6;\n}\n\n.section-description strong {\n  color: #b45309;\n  font-weight: 600;\n}\n\n.mode-toggle {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.25rem;\n}\n\n.mode-btn {\n  flex: 1;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  background: #ffffff;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease;\n}\n\n.mode-btn:hover {\n  border-color: #f59e0b;\n  color: #b45309;\n}\n\n.mode-btn.active {\n  border-color: #f59e0b;\n  background: #fef3c7;\n  color: #b45309;\n}\n\n.input-hint {\n  font-size: 0.8rem;\n  color: #9ca3af;\n  margin-top: 0.5rem;\n}\n\n.selection-info {\n  padding: 1rem;\n  background: #f9fafb;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  text-align: center;\n}\n\n.selection-info .text-muted {\n  color: #9ca3af;\n}\n\n.selection-info .text-success {\n  color: #166534;\n  font-weight: 500;\n}\n\n.allocation-preview {\n  margin-bottom: 1.25rem;\n}\n\n.preview-title {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.75rem;\n}\n\n.preview-table-container {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n\n.preview-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n\n.preview-table th,\n.preview-table td {\n  padding: 0.625rem 0.75rem;\n  text-align: left;\n  border-bottom: 1px solid #f3f4f6;\n}\n\n.preview-table th {\n  background: #f9fafb;\n  font-weight: 600;\n  color: #374151;\n  position: sticky;\n  top: 0;\n}\n\n.preview-table .points-cell {\n  text-align: right;\n  font-weight: 600;\n  color: #2c5f3f;\n}\n\n.preview-table .total-row {\n  background: #fef3c7;\n  font-weight: 600;\n}\n\n.preview-table .total-row td {\n  border-bottom: none;\n}\n\n.pool-allocation-actions {\n  margin-top: 1rem;\n}\n\n.btn-warning {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  background-color: #f59e0b;\n  color: #ffffff;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.btn-warning:hover:not(:disabled) {\n  background-color: #d97706;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.25);\n}\n\n.btn-warning:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n/* ========== RESPONSIVE ========== */\n@media (max-width: 768px) {\n  .points-content {\n    padding: 1rem;\n  }\n\n  .points-stats {\n    grid-template-columns: 1fr;\n  }\n\n  .stat-value {\n    font-size: 1.25rem;\n  }\n\n  .selection-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .selection-search {\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n\n  .amount-input-group {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .amount-input {\n    max-width: 100%;\n  }\n\n  .col-email {\n    display: none;\n  }\n  \n  .mode-toggle {\n    flex-direction: column;\n  }\n}\n"] }]
    }], () => [{ type: i1.EventService }], { eventId: [{
            type: Input
        }], event: [{
            type: Input
        }], pointsAwarded: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventDetailPointsComponent, { className: "EventDetailPointsComponent", filePath: "src/app/pages/admin/events/tabs/event-detail-points.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=event-detail-points.component.js.map