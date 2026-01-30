import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/admin-transactions.service";
import * as i2 from "../../../services/admin-users.service";
import * as i3 from "../../../services/auth.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function TransactionManagementComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 46)(1, "div", 47)(2, "span", 48);
    i0.ɵɵtext(3, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 50);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_3_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAlert("success")); });
    i0.ɵɵtext(7, "\u2715");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
function TransactionManagementComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 51)(1, "div", 47)(2, "span", 48);
    i0.ɵɵtext(3, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 52)(5, "span", 49);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 50);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_4_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAlert("error")); });
    i0.ɵɵtext(8, "\u2715");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function TransactionManagementComponent_div_59_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 65);
    i0.ɵɵelement(2, "div", 66);
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelement(4, "div", 67);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 68);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const data_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("height", ctx_r1.getBarHeight(data_r5.pointsEarned), "%");
    i0.ɵɵproperty("title", "Earned: " + i0.ɵɵpipeBind1(3, 7, data_r5.pointsEarned));
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("height", ctx_r1.getBarHeight(data_r5.pointsRedeemed), "%");
    i0.ɵɵproperty("title", "Redeemed: " + i0.ɵɵpipeBind1(5, 9, data_r5.pointsRedeemed));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(data_r5.monthName == null ? null : data_r5.monthName.substring(0, 3));
} }
function TransactionManagementComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54)(2, "h3", 55);
    i0.ɵɵtext(3, "Monthly Points Trend");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 56);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_59_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleChart()); });
    i0.ɵɵtext(5, "Hide");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 57)(7, "div", 58);
    i0.ɵɵtemplate(8, TransactionManagementComponent_div_59_div_8_Template, 8, 11, "div", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 60)(10, "span", 61);
    i0.ɵɵelement(11, "span", 62);
    i0.ɵɵtext(12, " Earned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 61);
    i0.ɵɵelement(14, "span", 63);
    i0.ɵɵtext(15, " Redeemed");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r1.chartData);
} }
function TransactionManagementComponent_button_60_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 69);
    i0.ɵɵlistener("click", function TransactionManagementComponent_button_60_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleChart()); });
    i0.ɵɵtext(1, " \uD83D\uDCCA Show Monthly Chart ");
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_button_67_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function TransactionManagementComponent_button_67_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSearch()); });
    i0.ɵɵtext(1, "\u2715");
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_option_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r8 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", opt_r8.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(opt_r8.label);
} }
function TransactionManagementComponent_option_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", opt_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(opt_r9.label);
} }
function TransactionManagementComponent_button_77_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 72);
    i0.ɵɵlistener("click", function TransactionManagementComponent_button_77_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(1, " Clear All ");
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_div_78_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r12 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", user_r12.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", user_r12.name, " (", user_r12.employeeId, ") ");
} }
function TransactionManagementComponent_div_78_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 73)(1, "div", 74)(2, "label", 75);
    i0.ɵɵtext(3, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 76);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_78_Template_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.selectedUserId, $event) || (ctx_r1.selectedUserId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function TransactionManagementComponent_div_78_Template_select_change_4_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onUserFilterChange()); });
    i0.ɵɵelementStart(5, "option", 71);
    i0.ɵɵtext(6, "All Users");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, TransactionManagementComponent_div_78_option_7_Template, 2, 3, "option", 32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 74)(9, "label", 75);
    i0.ɵɵtext(10, "Start Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 77);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_78_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.startDate, $event) || (ctx_r1.startDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function TransactionManagementComponent_div_78_Template_input_change_11_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDateFilterChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 74)(13, "label", 75);
    i0.ɵɵtext(14, "End Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 77);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_78_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.endDate, $event) || (ctx_r1.endDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function TransactionManagementComponent_div_78_Template_input_change_15_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDateFilterChange()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.selectedUserId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.userOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.startDate);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.endDate);
} }
function TransactionManagementComponent_div_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵelement(1, "div", 79);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading transactions...");
    i0.ɵɵelementEnd()();
} }
function TransactionManagementComponent_div_81_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, " No transactions match your filters. Try adjusting your search criteria. ");
    i0.ɵɵelementContainerEnd();
} }
function TransactionManagementComponent_div_81_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, " There are no transactions in the system yet. ");
    i0.ɵɵelementContainerEnd();
} }
function TransactionManagementComponent_div_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80)(1, "div", 81);
    i0.ɵɵtext(2, "\uD83D\uDCED");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 82);
    i0.ɵɵtext(4, "No transactions found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 83);
    i0.ɵɵtemplate(6, TransactionManagementComponent_div_81_ng_container_6_Template, 2, 0, "ng-container", 84)(7, TransactionManagementComponent_div_81_ng_container_7_Template, 2, 0, "ng-container", 84);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.hasFiltersApplied);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.hasFiltersApplied);
} }
function TransactionManagementComponent_table_82_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 95);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_tr_20_Template_tr_click_0_listener() { const transaction_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openDetails(transaction_r15)); });
    i0.ɵɵelementStart(1, "td", 96)(2, "div", 97)(3, "span", 98);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 99);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td", 100)(8, "div", 101)(9, "div", 102);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 103)(12, "div", 104);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 105);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(16, "td", 106)(17, "span", 107);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 108);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 90);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 109)(25, "span", 110);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "td", 92)(28, "span", 111);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "slice");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "td", 93)(32, "span", 112);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const transaction_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(transaction_r15.timestamp));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatTime(transaction_r15.timestamp));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.getUserInitials(transaction_r15.userName));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(transaction_r15.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(transaction_r15.employeeId || transaction_r15.userEmail);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.getTypeClass(transaction_r15.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getTypeLabel(transaction_r15.type), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.getPointsClass(transaction_r15.amount));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatPoints(transaction_r15.amount), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 17, transaction_r15.balanceAfter), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r1.getSourceClass(transaction_r15.source));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getSourceIcon(transaction_r15.source), " ", transaction_r15.source, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", transaction_r15.description);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind3(30, 19, transaction_r15.description, 0, 40), "", transaction_r15.description.length > 40 ? "..." : "", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(transaction_r15.processedByName || "System");
} }
function TransactionManagementComponent_table_82_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "table", 85)(1, "thead")(2, "tr")(3, "th", 86);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_Template_th_click_3_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortBy("Timestamp")); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 87);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_Template_th_click_5_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortBy("User")); });
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 88);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_Template_th_click_7_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortBy("Type")); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 89);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_Template_th_click_9_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortBy("Points")); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 90);
    i0.ɵɵtext(12, "Balance After");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 91);
    i0.ɵɵlistener("click", function TransactionManagementComponent_table_82_Template_th_click_13_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortBy("Source")); });
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 92);
    i0.ɵɵtext(16, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 93);
    i0.ɵɵtext(18, "Processed By");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵtemplate(20, TransactionManagementComponent_table_82_tr_20_Template, 34, 23, "tr", 94);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Date/Time ", ctx_r1.getSortIcon("Timestamp"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" User ", ctx_r1.getSortIcon("User"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Type ", ctx_r1.getSortIcon("Type"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Points ", ctx_r1.getSortIcon("Points"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Source ", ctx_r1.getSortIcon("Source"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.transactions);
} }
function TransactionManagementComponent_div_83_option_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 123);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r17);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r17);
} }
function TransactionManagementComponent_div_83_ng_container_12_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 126);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_83_ng_container_12_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const page_r19 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changePage(+page_r19)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.currentPage === page_r19);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r19, " ");
} }
function TransactionManagementComponent_div_83_ng_container_12_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 127);
    i0.ɵɵtext(1, "...");
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_div_83_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, TransactionManagementComponent_div_83_ng_container_12_button_1_Template, 2, 3, "button", 124)(2, TransactionManagementComponent_div_83_ng_container_12_span_2_Template, 2, 0, "span", 125);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r19 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", page_r19 !== "...");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", page_r19 === "...");
} }
function TransactionManagementComponent_div_83_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 113)(1, "div", 114);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 115)(4, "div", 116)(5, "span");
    i0.ɵɵtext(6, "Rows:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "select", 117);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_83_Template_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.pageSize, $event) || (ctx_r1.pageSize = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function TransactionManagementComponent_div_83_Template_select_change_7_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageSizeChange()); });
    i0.ɵɵtemplate(8, TransactionManagementComponent_div_83_option_8_Template, 2, 2, "option", 118);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 119)(10, "button", 120);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_83_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePage(ctx_r1.currentPage - 1)); });
    i0.ɵɵtext(11, " \u2039 ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, TransactionManagementComponent_div_83_ng_container_12_Template, 3, 2, "ng-container", 121);
    i0.ɵɵelementStart(13, "button", 122);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_83_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePage(ctx_r1.currentPage + 1)); });
    i0.ɵɵtext(14, " \u203A ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" Showing ", ctx_r1.showingFrom, " to ", ctx_r1.showingTo, " of ", ctx_r1.totalCount, " transactions ");
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.visiblePages);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
} }
function TransactionManagementComponent_div_84_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 128);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_84_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetails()); });
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_div_86_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 154);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Employee ID: ", ctx_r1.selectedTransaction.employeeId, " ");
} }
function TransactionManagementComponent_div_86_div_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 158)(1, "span", 159);
    i0.ɵɵtext(2, "Source ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 165);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.sourceId);
} }
function TransactionManagementComponent_div_86_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 129)(1, "div", 130)(2, "div", 131)(3, "h3", 132);
    i0.ɵɵtext(4, "Transaction Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 133)(6, "span", 134);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "button", 135);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_86_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetails()); });
    i0.ɵɵtext(9, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 136)(11, "div", 137)(12, "div", 138)(13, "span", 139);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 140);
    i0.ɵɵtext(16, "Points");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 141)(18, "span", 142);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 143)(21, "h4", 144);
    i0.ɵɵtext(22, "Balance Change");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 145)(24, "div", 146)(25, "span", 147);
    i0.ɵɵtext(26, "Before");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 148);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 149);
    i0.ɵɵtext(31, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 146)(33, "span", 147);
    i0.ɵɵtext(34, "After");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 148);
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(38, "div", 143)(39, "h4", 144);
    i0.ɵɵtext(40, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 150)(42, "div", 151);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 152)(45, "div", 153);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 154);
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(49, TransactionManagementComponent_div_86_div_49_Template, 2, 1, "div", 155);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "button", 156);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_86_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openAdjustPointsModal(ctx_r1.selectedTransaction)); });
    i0.ɵɵtext(51, " Adjust Points ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div", 143)(53, "h4", 144);
    i0.ɵɵtext(54, "Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 157)(56, "div", 158)(57, "span", 159);
    i0.ɵɵtext(58, "Date & Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span", 160);
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div", 158)(62, "span", 159);
    i0.ɵɵtext(63, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "span", 160)(65, "span", 110);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(67, TransactionManagementComponent_div_86_div_67_Template, 5, 1, "div", 161);
    i0.ɵɵelementStart(68, "div", 158)(69, "span", 159);
    i0.ɵɵtext(70, "Processed By");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 160);
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(73, "div", 143)(74, "h4", 144);
    i0.ɵɵtext(75, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "p", 162);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(78, "div", 163)(79, "span", 164);
    i0.ɵɵtext(80);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.id.substring(0, 13).toUpperCase());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r1.getPointsClass(ctx_r1.selectedTransaction.amount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatPoints(ctx_r1.selectedTransaction.amount));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r1.getTypeClass(ctx_r1.selectedTransaction.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getTypeLabel(ctx_r1.selectedTransaction.type), " ");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 19, ctx_r1.getBalanceBefore(ctx_r1.selectedTransaction)));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(37, 21, ctx_r1.selectedTransaction.balanceAfter));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.getUserInitials(ctx_r1.selectedTransaction.userName));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.userEmail);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedTransaction.employeeId);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.formatDateTime(ctx_r1.selectedTransaction.timestamp));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r1.getSourceClass(ctx_r1.selectedTransaction.source));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getSourceIcon(ctx_r1.selectedTransaction.source), " ", ctx_r1.selectedTransaction.source, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedTransaction.sourceId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.processedByName || "System");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Transaction ID: ", ctx_r1.selectedTransaction.id);
} }
function TransactionManagementComponent_div_87_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 166);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_87_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAdjustPointsModal()); });
    i0.ɵɵelementEnd();
} }
function TransactionManagementComponent_div_88_option_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 123);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r24 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r24.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", user_r24.name, " (", user_r24.employeeId, ") ");
} }
function TransactionManagementComponent_div_88_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 167)(1, "div", 168);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_88_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r23); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 169)(3, "h3", 170);
    i0.ɵɵtext(4, "Adjust User Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 171);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_88_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAdjustPointsModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 172)(8, "div", 173)(9, "label", 174);
    i0.ɵɵtext(10, "Select User *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 175);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_88_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.adjustPointsForm.userId, $event) || (ctx_r1.adjustPointsForm.userId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function TransactionManagementComponent_div_88_Template_select_change_11_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onAdjustUserChange()); });
    i0.ɵɵelementStart(12, "option", 176);
    i0.ɵɵtext(13, "-- Select User --");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, TransactionManagementComponent_div_88_option_14_Template, 2, 3, "option", 118);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 173)(16, "label", 174);
    i0.ɵɵtext(17, "Points Amount *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 177);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_88_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.adjustPointsForm.amount, $event) || (ctx_r1.adjustPointsForm.amount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "small", 178);
    i0.ɵɵtext(20, "Use positive values to add points, negative to deduct");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 173)(22, "label", 174);
    i0.ɵɵtext(23, "Reason *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "textarea", 179);
    i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_div_88_Template_textarea_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.adjustPointsForm.reason, $event) || (ctx_r1.adjustPointsForm.reason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 180)(26, "button", 181);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_88_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAdjustPointsModal()); });
    i0.ɵɵtext(27, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 182);
    i0.ɵɵlistener("click", function TransactionManagementComponent_div_88_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitAdjustPoints()); });
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.adjustPointsForm.userId);
    i0.ɵɵproperty("disabled", !!ctx_r1.selectedTransaction);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.userOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.adjustPointsForm.amount);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.adjustPointsForm.reason);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting || !ctx_r1.adjustPointsForm.userId || !ctx_r1.adjustPointsForm.reason.trim());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting ? "Processing..." : "Adjust Points", " ");
} }
export class TransactionManagementComponent {
    constructor(transactionsService, usersService, authService, cdr) {
        this.transactionsService = transactionsService;
        this.usersService = usersService;
        this.authService = authService;
        this.cdr = cdr;
        // Expose Math for template
        this.Math = Math;
        // Data
        this.transactions = [];
        this.selectedTransaction = null;
        this.chartData = [];
        // Summary stats
        this.summary = {
            totalEarned: 0,
            totalRedeemed: 0,
            totalAdjusted: 0,
            transactionCount: 0,
            netPoints: 0
        };
        // Pagination
        this.currentPage = 1;
        this.pageSize = 20;
        this.totalCount = 0;
        this.totalPages = 0;
        this.pageSizeOptions = [10, 20, 50, 100];
        // Filters
        this.filters = {
            pageNumber: 1,
            pageSize: 20,
            sortBy: 'Timestamp',
            sortDescending: true
        };
        this.searchText = '';
        this.selectedType = null;
        this.selectedSource = null;
        this.selectedUserId = null;
        this.startDate = null;
        this.endDate = null;
        // Type filter options
        this.typeOptions = [
            { value: null, label: 'All Types' },
            { value: 'Earned', label: 'Earned' },
            { value: 'Redeemed', label: 'Redeemed' },
            { value: 'Adjusted', label: 'Adjusted' },
            { value: 'Refunded', label: 'Refunded' }
        ];
        // Source filter options
        this.sourceOptions = [
            { value: null, label: 'All Sources' },
            { value: 'Event', label: 'Event' },
            { value: 'Product', label: 'Product' },
            { value: 'Admin', label: 'Admin' },
            { value: 'System', label: 'System' }
        ];
        // Users for filter dropdown
        this.userOptions = [];
        // UI State
        this.isLoading = false;
        this.isLoadingDetails = false;
        this.isLoadingChart = false;
        this.isExporting = false;
        this.isSubmitting = false;
        this.showFiltersPanel = false;
        this.showDetailsDrawer = false;
        this.showAdjustPointsModal = false;
        this.showChart = true;
        // Adjust Points form
        this.adjustPointsForm = {
            userId: '',
            userName: '',
            amount: 0,
            reason: ''
        };
        // Error & Success States
        this.errorMessage = '';
        this.successMessage = '';
        this.showErrorAlert = false;
        this.showSuccessAlert = false;
        this.destroy$ = new Subject();
        this.searchSubject = new Subject();
        // Debounce search input
        this.searchSubject.pipe(debounceTime(400), takeUntil(this.destroy$)).subscribe(query => {
            this.filters.searchQuery = query;
            this.loadTransactions();
        });
    }
    ngOnInit() {
        this.loadCurrentUser();
        this.loadTransactions();
        this.loadChart();
        this.loadUsers();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadCurrentUser() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
        });
    }
    loadTransactions() {
        this.isLoading = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        // Update filter with current pagination
        this.filters.pageNumber = this.currentPage;
        this.filters.pageSize = this.pageSize;
        this.filters.type = this.selectedType || undefined;
        this.filters.source = this.selectedSource || undefined;
        this.filters.userId = this.selectedUserId || undefined;
        this.filters.startDate = this.startDate || undefined;
        this.filters.endDate = this.endDate || undefined;
        this.transactionsService.getAllTransactions(this.filters)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.transactions = response.data;
                this.totalCount = response.pagination.totalCount;
                this.totalPages = response.pagination.totalPages;
                this.summary = response.summary;
            },
            error: (error) => {
                console.error('Error loading transactions:', error);
                this.errorMessage = error.message || 'Failed to load transactions';
                this.showErrorAlert = true;
            }
        });
    }
    loadChart() {
        this.isLoadingChart = true;
        this.transactionsService.getPointsChart(6)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoadingChart = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.chartData = response.data;
            },
            error: (error) => {
                console.error('Error loading chart:', error);
            }
        });
    }
    loadUsers() {
        this.usersService.getAllUsers(false)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (response) => {
                this.userOptions = (response.users || []).map((u) => ({
                    id: u.id,
                    name: `${u.firstName} ${u.lastName}`,
                    email: u.email,
                    employeeId: u.employeeId
                }));
            },
            error: (error) => {
                console.error('Error loading users:', error);
            }
        });
    }
    // Search handling
    onSearchInput() {
        this.searchSubject.next(this.searchText);
    }
    clearSearch() {
        this.searchText = '';
        this.filters.searchQuery = '';
        this.loadTransactions();
    }
    // Filter handlers
    onTypeFilterChange() {
        this.currentPage = 1;
        this.loadTransactions();
    }
    onSourceFilterChange() {
        this.currentPage = 1;
        this.loadTransactions();
    }
    onUserFilterChange() {
        this.currentPage = 1;
        this.loadTransactions();
    }
    onDateFilterChange() {
        this.currentPage = 1;
        this.loadTransactions();
    }
    clearFilters() {
        this.searchText = '';
        this.selectedType = null;
        this.selectedSource = null;
        this.selectedUserId = null;
        this.startDate = null;
        this.endDate = null;
        this.filters = {
            pageNumber: 1,
            pageSize: this.pageSize,
            sortBy: 'Timestamp',
            sortDescending: true
        };
        this.currentPage = 1;
        this.loadTransactions();
    }
    get hasFiltersApplied() {
        return !!(this.searchText || this.selectedType || this.selectedSource ||
            this.selectedUserId || this.startDate || this.endDate);
    }
    toggleFiltersPanel() {
        this.showFiltersPanel = !this.showFiltersPanel;
    }
    // Pagination
    changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadTransactions();
        }
    }
    onPageSizeChange() {
        this.currentPage = 1;
        this.loadTransactions();
    }
    get showingFrom() {
        if (this.totalCount === 0)
            return 0;
        return (this.currentPage - 1) * this.pageSize + 1;
    }
    get showingTo() {
        return Math.min(this.currentPage * this.pageSize, this.totalCount);
    }
    get visiblePages() {
        const pages = [];
        const total = this.totalPages;
        const current = this.currentPage;
        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        }
        else {
            pages.push(1);
            if (current > 3) {
                pages.push('...');
            }
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            if (current < total - 2) {
                pages.push('...');
            }
            if (!pages.includes(total)) {
                pages.push(total);
            }
        }
        return pages;
    }
    // Sorting
    sortBy(column) {
        if (this.filters.sortBy === column) {
            this.filters.sortDescending = !this.filters.sortDescending;
        }
        else {
            this.filters.sortBy = column;
            this.filters.sortDescending = true;
        }
        this.loadTransactions();
    }
    getSortIcon(column) {
        if (this.filters.sortBy !== column)
            return '↕️';
        return this.filters.sortDescending ? '↓' : '↑';
    }
    // Details drawer
    openDetails(transaction) {
        this.selectedTransaction = transaction;
        this.showDetailsDrawer = true;
    }
    closeDetails() {
        this.showDetailsDrawer = false;
        this.selectedTransaction = null;
    }
    // Adjust Points Modal
    openAdjustPointsModal(transaction) {
        if (transaction) {
            this.adjustPointsForm = {
                userId: transaction.userId,
                userName: transaction.userName,
                amount: 0,
                reason: ''
            };
        }
        else {
            this.adjustPointsForm = {
                userId: '',
                userName: '',
                amount: 0,
                reason: ''
            };
        }
        this.showAdjustPointsModal = true;
    }
    closeAdjustPointsModal() {
        this.showAdjustPointsModal = false;
        this.adjustPointsForm = {
            userId: '',
            userName: '',
            amount: 0,
            reason: ''
        };
    }
    onAdjustUserChange() {
        const selectedUser = this.userOptions.find(u => u.id === this.adjustPointsForm.userId);
        if (selectedUser) {
            this.adjustPointsForm.userName = selectedUser.name;
        }
    }
    submitAdjustPoints() {
        if (!this.adjustPointsForm.userId || !this.adjustPointsForm.reason.trim()) {
            this.errorMessage = 'Please select a user and provide a reason';
            this.showErrorAlert = true;
            return;
        }
        this.isSubmitting = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        const request = {
            userId: this.adjustPointsForm.userId,
            amount: this.adjustPointsForm.amount,
            reason: this.adjustPointsForm.reason
        };
        this.transactionsService.adjustPoints(request)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.successMessage = response.message;
                this.showSuccessAlert = true;
                this.closeAdjustPointsModal();
                this.loadTransactions();
                setTimeout(() => this.showSuccessAlert = false, 5000);
            },
            error: (error) => {
                this.errorMessage = error.message || 'Failed to adjust points';
                this.showErrorAlert = true;
            }
        });
    }
    // Export
    exportTransactions() {
        this.isExporting = true;
        this.transactionsService.exportTransactions(this.filters)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isExporting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (blob) => {
                this.transactionsService.downloadCsv(blob);
                this.successMessage = 'Export downloaded successfully';
                this.showSuccessAlert = true;
                setTimeout(() => this.showSuccessAlert = false, 3000);
            },
            error: (error) => {
                this.errorMessage = error.message || 'Failed to export transactions';
                this.showErrorAlert = true;
            }
        });
    }
    // Refresh
    refreshData() {
        this.loadTransactions();
        this.loadChart();
    }
    // Toggle chart visibility
    toggleChart() {
        this.showChart = !this.showChart;
    }
    // Alert handling
    closeAlert(type) {
        if (type === 'success') {
            this.showSuccessAlert = false;
        }
        else {
            this.showErrorAlert = false;
        }
    }
    // Utility methods
    getTypeLabel(type) {
        return this.transactionsService.getTypeLabel(type);
    }
    getTypeClass(type) {
        return this.transactionsService.getTypeClass(type);
    }
    getSourceIcon(source) {
        return this.transactionsService.getSourceIcon(source);
    }
    getSourceClass(source) {
        return this.transactionsService.getSourceClass(source);
    }
    formatPoints(points) {
        return this.transactionsService.formatPoints(points);
    }
    getPointsClass(points) {
        return points >= 0 ? 'points-positive' : 'points-negative';
    }
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    getUserInitials(name) {
        if (!name)
            return '?';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
    getBalanceBefore(transaction) {
        return transaction.balanceAfter - transaction.amount;
    }
    // Chart helpers
    getChartMaxValue() {
        if (!this.chartData.length)
            return 100;
        const max = Math.max(...this.chartData.map(d => Math.max(d.pointsEarned, d.pointsRedeemed)));
        return Math.ceil(max * 1.1); // Add 10% padding
    }
    getBarHeight(value) {
        const max = this.getChartMaxValue();
        return max > 0 ? (value / max) * 100 : 0;
    }
    static { this.ɵfac = function TransactionManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionManagementComponent)(i0.ɵɵdirectiveInject(i1.AdminTransactionsService), i0.ɵɵdirectiveInject(i2.AdminUsersService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionManagementComponent, selectors: [["app-transaction-management"]], decls: 89, vars: 36, consts: [[1, "admin-layout"], [1, "transaction-management-container"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], [1, "btn", "btn-primary", 3, "click"], [1, "btn-icon"], [1, "btn", "btn-secondary", 3, "click", "disabled"], ["title", "Refresh", 1, "btn-icon-only", 3, "click"], [1, "summary-cards"], [1, "summary-card", "card-earned"], [1, "card-icon"], [1, "card-content"], [1, "card-value"], [1, "card-label"], [1, "summary-card", "card-redeemed"], [1, "summary-card", "card-net"], [1, "summary-card", "card-count"], ["class", "chart-section", 4, "ngIf"], ["class", "btn-text show-chart-btn", 3, "click", 4, "ngIf"], [1, "filters-section"], [1, "filters-row"], [1, "search-container"], [1, "search-icon"], ["type", "text", "placeholder", "Search by user, description...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-search", 3, "click", 4, "ngIf"], [1, "quick-filters"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "btn-filter", 3, "click"], ["class", "btn-clear-filters", 3, "click", 4, "ngIf"], ["class", "advanced-filters", 4, "ngIf"], [1, "table-container"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "transactions-table", 4, "ngIf"], ["class", "pagination-container", 4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "details-drawer"], ["class", "drawer-container", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "modal-container", 4, "ngIf"], [1, "alert", "alert-success"], [1, "alert-content"], [1, "alert-icon"], [1, "alert-text"], ["type", "button", 1, "alert-close", 3, "click"], [1, "alert", "alert-danger"], [1, "alert-text-container"], [1, "chart-section"], [1, "chart-header"], [1, "chart-title"], [1, "btn-text", 3, "click"], [1, "chart-container"], [1, "chart-bars"], ["class", "chart-bar-group", 4, "ngFor", "ngForOf"], [1, "chart-legend"], [1, "legend-item"], [1, "legend-color", "earned"], [1, "legend-color", "redeemed"], [1, "chart-bar-group"], [1, "bar-container"], [1, "bar", "bar-earned", 3, "title"], [1, "bar", "bar-redeemed", 3, "title"], [1, "bar-label"], [1, "btn-text", "show-chart-btn", 3, "click"], [1, "clear-search", 3, "click"], [3, "ngValue"], [1, "btn-clear-filters", 3, "click"], [1, "advanced-filters"], [1, "filter-group"], [1, "filter-label"], [1, "filter-select", "full-width", 3, "ngModelChange", "change", "ngModel"], ["type", "date", 1, "filter-input", 3, "ngModelChange", "change", "ngModel"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-description"], [4, "ngIf"], [1, "transactions-table"], [1, "col-date", "sortable", 3, "click"], [1, "col-user", "sortable", 3, "click"], [1, "col-type", "sortable", 3, "click"], [1, "col-points", "sortable", 3, "click"], [1, "col-balance"], [1, "col-source", "sortable", 3, "click"], [1, "col-description"], [1, "col-processed"], ["class", "table-row", 3, "click", 4, "ngFor", "ngForOf"], [1, "table-row", 3, "click"], [1, "col-date"], [1, "date-cell"], [1, "date-value"], [1, "time-value"], [1, "col-user"], [1, "user-cell"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-email"], [1, "col-type"], [1, "type-badge", 3, "ngClass"], [1, "col-points", 3, "ngClass"], [1, "col-source"], [1, "source-badge", 3, "ngClass"], [1, "description-text", 3, "title"], [1, "processed-by"], [1, "pagination-container"], [1, "pagination-info"], [1, "pagination-controls"], [1, "page-size-selector"], [3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "page-navigation"], [1, "btn-page", "btn-prev", 3, "click", "disabled"], [4, "ngFor", "ngForOf"], [1, "btn-page", "btn-next", 3, "click", "disabled"], [3, "value"], ["class", "btn-page", 3, "active", "click", 4, "ngIf"], ["class", "page-ellipsis", 4, "ngIf"], [1, "btn-page", 3, "click"], [1, "page-ellipsis"], [1, "drawer-overlay", 3, "click"], [1, "drawer-container"], [1, "drawer-header"], [1, "drawer-title-section"], [1, "drawer-title"], [1, "drawer-subtitle"], [1, "transaction-id"], [1, "btn-close-drawer", 3, "click"], [1, "drawer-content"], [1, "detail-card", "highlight-card"], [1, "points-display", 3, "ngClass"], [1, "points-amount"], [1, "points-label"], [1, "type-display"], [1, "type-badge", "large", 3, "ngClass"], [1, "detail-card"], [1, "card-title"], [1, "balance-flow"], [1, "balance-item"], [1, "balance-label"], [1, "balance-value"], [1, "balance-arrow"], [1, "user-detail"], [1, "user-avatar", "large"], [1, "user-info-detail"], [1, "user-name-large"], [1, "user-meta"], ["class", "user-meta", 4, "ngIf"], [1, "btn", "btn-sm", "btn-outline", 3, "click"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], ["class", "detail-item", 4, "ngIf"], [1, "description-full"], [1, "detail-card", "footer-card"], [1, "transaction-id-full"], [1, "detail-value", "monospace"], [1, "modal-overlay", 3, "click"], [1, "modal-container"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-title"], [1, "btn-close-modal", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "disabled"], ["value", ""], ["type", "number", "placeholder", "Enter amount (positive to add, negative to deduct)", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["placeholder", "Provide a reason for this adjustment (required)", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"]], template: function TransactionManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1);
            i0.ɵɵtemplate(3, TransactionManagementComponent_div_3_Template, 8, 1, "div", 2)(4, TransactionManagementComponent_div_4_Template, 9, 1, "div", 3);
            i0.ɵɵelementStart(5, "div", 4)(6, "div", 5)(7, "h1", 6);
            i0.ɵɵtext(8, "Transactions / Audit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 7);
            i0.ɵɵtext(10, "View and manage all point transactions across the system");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 8)(12, "button", 9);
            i0.ɵɵlistener("click", function TransactionManagementComponent_Template_button_click_12_listener() { return ctx.openAdjustPointsModal(); });
            i0.ɵɵelementStart(13, "span", 10);
            i0.ɵɵtext(14, "\u2795");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(15, " Adjust Points ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 11);
            i0.ɵɵlistener("click", function TransactionManagementComponent_Template_button_click_16_listener() { return ctx.exportTransactions(); });
            i0.ɵɵelementStart(17, "span", 10);
            i0.ɵɵtext(18, "\uD83D\uDCE5");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 12);
            i0.ɵɵlistener("click", function TransactionManagementComponent_Template_button_click_20_listener() { return ctx.refreshData(); });
            i0.ɵɵtext(21, " \uD83D\uDD04 ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 13)(23, "div", 14)(24, "div", 15);
            i0.ɵɵtext(25, "\uD83D\uDCC8");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 16)(27, "div", 17);
            i0.ɵɵtext(28);
            i0.ɵɵpipe(29, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 18);
            i0.ɵɵtext(31, "Total Earned");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(32, "div", 19)(33, "div", 15);
            i0.ɵɵtext(34, "\uD83D\uDCC9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 16)(36, "div", 17);
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 18);
            i0.ɵɵtext(40, "Total Redeemed");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(41, "div", 20)(42, "div", 15);
            i0.ɵɵtext(43, "\uD83D\uDCB0");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 16)(45, "div", 17);
            i0.ɵɵtext(46);
            i0.ɵɵpipe(47, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 18);
            i0.ɵɵtext(49, "Net Points");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "div", 21)(51, "div", 15);
            i0.ɵɵtext(52, "\uD83D\uDCCA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 16)(54, "div", 17);
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 18);
            i0.ɵɵtext(58, "Total Transactions");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(59, TransactionManagementComponent_div_59_Template, 16, 1, "div", 22)(60, TransactionManagementComponent_button_60_Template, 2, 0, "button", 23);
            i0.ɵɵelementStart(61, "div", 24)(62, "div", 25)(63, "div", 26)(64, "span", 27);
            i0.ɵɵtext(65, "\uD83D\uDD0D");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "input", 28);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_Template_input_ngModelChange_66_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event); return $event; });
            i0.ɵɵlistener("input", function TransactionManagementComponent_Template_input_input_66_listener() { return ctx.onSearchInput(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(67, TransactionManagementComponent_button_67_Template, 2, 0, "button", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 30)(69, "select", 31);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_Template_select_ngModelChange_69_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event); return $event; });
            i0.ɵɵlistener("change", function TransactionManagementComponent_Template_select_change_69_listener() { return ctx.onTypeFilterChange(); });
            i0.ɵɵtemplate(70, TransactionManagementComponent_option_70_Template, 2, 2, "option", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "select", 31);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionManagementComponent_Template_select_ngModelChange_71_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedSource, $event) || (ctx.selectedSource = $event); return $event; });
            i0.ɵɵlistener("change", function TransactionManagementComponent_Template_select_change_71_listener() { return ctx.onSourceFilterChange(); });
            i0.ɵɵtemplate(72, TransactionManagementComponent_option_72_Template, 2, 2, "option", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "button", 33);
            i0.ɵɵlistener("click", function TransactionManagementComponent_Template_button_click_73_listener() { return ctx.toggleFiltersPanel(); });
            i0.ɵɵelementStart(74, "span", 10);
            i0.ɵɵtext(75, "\u2699\uFE0F");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(76, " More Filters ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(77, TransactionManagementComponent_button_77_Template, 2, 0, "button", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(78, TransactionManagementComponent_div_78_Template, 16, 5, "div", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 36);
            i0.ɵɵtemplate(80, TransactionManagementComponent_div_80_Template, 4, 0, "div", 37)(81, TransactionManagementComponent_div_81_Template, 8, 2, "div", 38)(82, TransactionManagementComponent_table_82_Template, 21, 6, "table", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(83, TransactionManagementComponent_div_83_Template, 15, 8, "div", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(84, TransactionManagementComponent_div_84_Template, 1, 0, "div", 41);
            i0.ɵɵelementStart(85, "div", 42);
            i0.ɵɵtemplate(86, TransactionManagementComponent_div_86_Template, 81, 23, "div", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(87, TransactionManagementComponent_div_87_Template, 1, 0, "div", 44)(88, TransactionManagementComponent_div_88_Template, 30, 7, "div", 45);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.showSuccessAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("disabled", ctx.isExporting);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.isExporting ? "Exporting..." : "Export CSV", " ");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 28, ctx.summary.totalEarned));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(38, 30, ctx.summary.totalRedeemed));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(47, 32, ctx.summary.netPoints));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(56, 34, ctx.summary.transactionCount));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.showChart && ctx.chartData.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.showChart && ctx.chartData.length > 0);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchText);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.searchText);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.typeOptions);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedSource);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.sourceOptions);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.hasFiltersApplied);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showFiltersPanel);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.transactions.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.transactions.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.transactions.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDetailsDrawer);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.showDetailsDrawer);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedTransaction);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showAdjustPointsModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showAdjustPointsModal);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgForOf, i4.NgIf, FormsModule, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, AdminSidebarComponent, i4.SlicePipe, i4.DecimalPipe], styles: ["\n\r\n\r\n\n\r\n.admin-layout[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.transaction-management-container[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 24px 32px;\r\n  max-width: 100%;\r\n  overflow-x: hidden;\r\n}\r\n\r\n\n\r\n.alert[_ngcontent-%COMP%] {\r\n  padding: 12px 16px;\r\n  border-radius: 8px;\r\n  margin-bottom: 16px;\r\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slideIn {\r\n  from {\r\n    transform: translateY(-10px);\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    transform: translateY(0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.alert-success[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-green-bg);\r\n  border: 1px solid var(--ag-color-support-success);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.alert-danger[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.alert-content[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.alert-icon[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n}\r\n\r\n.alert-text[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.alert-close[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n  opacity: 0.6;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-close[_ngcontent-%COMP%]:hover {\r\n  opacity: 1;\r\n}\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 4px 0;\r\n}\r\n\r\n.page-subtitle[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n\n\r\n.btn[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 20px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  border-radius: 8px;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-info);\r\n  color: white;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n  transform: none;\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.btn-outline[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border: 1px solid var(--ag-button-info);\r\n  color: var(--ag-button-info);\r\n}\r\n\r\n.btn-outline[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-info);\r\n  color: white;\r\n}\r\n\r\n.btn-sm[_ngcontent-%COMP%] {\r\n  padding: 6px 12px;\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-icon-only[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-field-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-icon-only[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.btn-text[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-button-info);\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  padding: 4px 8px;\r\n}\r\n\r\n.btn-text[_ngcontent-%COMP%]:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.btn-icon[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n}\r\n\r\n\n\r\n.summary-cards[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, 1fr);\r\n  gap: 20px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.summary-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  transition: transform 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.summary-card[_ngcontent-%COMP%]:hover {\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.card-icon[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 12px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 24px;\r\n}\r\n\r\n.card-earned[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.card-redeemed[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.card-net[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-info);\r\n}\r\n\r\n.card-count[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-undefined);\r\n}\r\n\r\n.card-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.card-value[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.card-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-top: 2px;\r\n}\r\n\r\n\n\r\n.chart-section[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 20px;\r\n  margin-bottom: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.chart-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.chart-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.chart-container[_ngcontent-%COMP%] {\r\n  padding: 20px 0;\r\n}\r\n\r\n.chart-bars[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: flex-end;\r\n  height: 200px;\r\n  padding: 0 20px;\r\n}\r\n\r\n.chart-bar-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.bar-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 4px;\r\n  align-items: flex-end;\r\n  height: 180px;\r\n}\r\n\r\n.bar[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  border-radius: 4px 4px 0 0;\r\n  transition: height 0.5s ease-out;\r\n  min-height: 4px;\r\n}\r\n\r\n.bar-earned[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.bar-redeemed[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.bar-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.chart-legend[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 24px;\r\n  margin-top: 16px;\r\n}\r\n\r\n.legend-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.legend-color[_ngcontent-%COMP%] {\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.legend-color.earned[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.legend-color.redeemed[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.show-chart-btn[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n\n\r\n.filters-section[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 16px 20px;\r\n  margin-bottom: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.filters-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  flex: 1;\r\n  min-width: 250px;\r\n  max-width: 400px;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  font-size: 14px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 10px 36px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n  box-shadow: 0 0 0 3px rgba(0, 67, 206, 0.1);\r\n}\r\n\r\n.clear-search[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.clear-search[_ngcontent-%COMP%]:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.quick-filters[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-select[_ngcontent-%COMP%] {\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  min-width: 140px;\r\n}\r\n\r\n.filter-select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.btn-clear-filters[_ngcontent-%COMP%] {\r\n  padding: 10px 14px;\r\n  border: none;\r\n  border-radius: 8px;\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n}\r\n\r\n.btn-clear-filters[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-tag-yellow-bg);\r\n}\r\n\r\n\n\r\n.advanced-filters[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  gap: 16px;\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-input[_ngcontent-%COMP%] {\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n}\r\n\r\n.filter-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n}\r\n\r\n.full-width[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\r\n\r\n\n\r\n.table-container[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  border-bottom: 2px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  text-align: left;\r\n  font-size: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-info);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  cursor: pointer;\r\n  transition: background-color 0.15s;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--ag-color-layer-hover);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  vertical-align: middle;\r\n}\r\n\r\n\n\r\n.date-cell[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.date-value[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n}\r\n\r\n.time-value[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.user-cell[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: var(--ag-color-support-info);\r\n  color: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-avatar.large[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  font-size: 16px;\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.user-name[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n}\r\n\r\n.user-email[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.type-badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  padding: 4px 10px;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.type-badge.large[_ngcontent-%COMP%] {\r\n  padding: 6px 14px;\r\n  font-size: 14px;\r\n}\r\n\r\n.type-earned[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.type-redeemed[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.type-adjusted[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.type-refunded[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n\n\r\n.col-points[_ngcontent-%COMP%] {\r\n  font-weight: 600;\r\n  font-size: 15px;\r\n}\r\n\r\n.points-positive[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-negative[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n\n\r\n.source-badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  padding: 4px 10px;\r\n  border-radius: 6px;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n}\r\n\r\n.source-event[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.source-product[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.source-admin[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-purple-bg);\r\n  color: var(--ag-tag-purple-text);\r\n}\r\n\r\n.source-system[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.description-text[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.processed-by[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.loading-state[_ngcontent-%COMP%], \r\n.empty-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid var(--ag-color-field-01);\r\n  border-top: 3px solid var(--ag-button-info);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  0% { transform: rotate(0deg); }\r\n  100% { transform: rotate(360deg); }\r\n}\r\n\r\n.empty-icon[_ngcontent-%COMP%] {\r\n  font-size: 48px;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.empty-description[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.pagination-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.pagination-info[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.pagination-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.page-size-selector[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.page-size-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n  padding: 6px 10px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font-size: var(--ag-typo-body-02);\r\n}\r\n\r\n.page-navigation[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.btn-page[_ngcontent-%COMP%] {\r\n  min-width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  font-size: var(--ag-typo-body-02);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-page[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.btn-page.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.btn-page[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-ellipsis[_ngcontent-%COMP%] {\r\n  padding: 0 8px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.drawer-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  z-index: 1000;\r\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_fadeIn {\r\n  from { opacity: 0; }\r\n  to { opacity: 1; }\r\n}\r\n\r\n.details-drawer[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  right: -450px;\r\n  width: 450px;\r\n  height: 100vh;\r\n  background: var(--ag-color-layer-01);\r\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);\r\n  z-index: 1001;\r\n  transition: right 0.3s ease-out;\r\n  overflow-y: auto;\r\n}\r\n\r\n.details-drawer.open[_ngcontent-%COMP%] {\r\n  right: 0;\r\n}\r\n\r\n.drawer-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n\r\n.drawer-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  padding: 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.drawer-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.drawer-subtitle[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.transaction-id[_ngcontent-%COMP%] {\r\n  font-family: monospace;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-hover);\r\n  padding: 4px 8px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.btn-close-drawer[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-h4);\r\n  transition: background 0.2s;\r\n}\r\n\r\n.btn-close-drawer[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.drawer-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 24px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.detail-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  padding: 16px;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.highlight-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  border: 1px solid var(--ag-color-support-info);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.points-display[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.points-display[_ngcontent-%COMP%]   .points-amount[_ngcontent-%COMP%] {\r\n  font-size: 32px;\r\n  font-weight: 700;\r\n}\r\n\r\n.points-display.points-positive[_ngcontent-%COMP%]   .points-amount[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-display.points-negative[_ngcontent-%COMP%]   .points-amount[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.points-display[_ngcontent-%COMP%]   .points-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.card-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin: 0 0 12px 0;\r\n}\r\n\r\n.balance-flow[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 16px;\r\n}\r\n\r\n.balance-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.balance-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.balance-value[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.balance-arrow[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h3);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.user-detail[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.user-info-detail[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.user-name-large[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.user-meta[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 12px;\r\n}\r\n\r\n.detail-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.detail-label[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.detail-value[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.detail-value.monospace[_ngcontent-%COMP%] {\r\n  font-family: monospace;\r\n  font-size: 12px;\r\n  word-break: break-all;\r\n}\r\n\r\n.description-full[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n.footer-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-hover);\r\n  text-align: center;\r\n}\r\n\r\n.transaction-id-full[_ngcontent-%COMP%] {\r\n  font-family: monospace;\r\n  font-size: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  word-break: break-all;\r\n}\r\n\r\n\n\r\n.modal-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  z-index: 1100;\r\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\r\n}\r\n\r\n.modal-container[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  z-index: 1101;\r\n  width: 100%;\r\n  max-width: 480px;\r\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slideUp {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate(-50%, -45%);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translate(-50%, -50%);\r\n  }\r\n}\r\n\r\n.modal-content[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 16px;\r\n  overflow: hidden;\r\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.modal-title[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.btn-close-modal[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-01);\r\n}\r\n\r\n.btn-close-modal[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.modal-body[_ngcontent-%COMP%] {\r\n  padding: 24px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.form-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.form-select[_ngcontent-%COMP%], \r\n.form-input[_ngcontent-%COMP%], \r\n.form-textarea[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.form-select[_ngcontent-%COMP%]:focus, \r\n.form-input[_ngcontent-%COMP%]:focus, \r\n.form-textarea[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.form-textarea[_ngcontent-%COMP%] {\r\n  resize: vertical;\r\n  min-height: 80px;\r\n}\r\n\r\n.form-hint[_ngcontent-%COMP%] {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-top: 4px;\r\n  display: block;\r\n}\r\n\r\n.modal-footer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 12px;\r\n  padding: 16px 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n\n\r\n@media (max-width: 1200px) {\r\n  .summary-cards[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n  \r\n  .advanced-filters[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .transaction-management-container[_ngcontent-%COMP%] {\r\n    padding: 16px;\r\n  }\r\n\r\n  .page-header[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    gap: 16px;\r\n  }\r\n\r\n  .header-right[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .summary-cards[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr 1fr;\r\n  }\r\n\r\n  .filters-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .search-container[_ngcontent-%COMP%] {\r\n    max-width: none;\r\n    width: 100%;\r\n  }\r\n\r\n  .quick-filters[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: space-between;\r\n  }\r\n\r\n  .advanced-filters[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .details-drawer[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    right: -100%;\r\n  }\r\n\r\n  .pagination-container[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    gap: 16px;\r\n  }\r\n\r\n  .pagination-controls[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    width: 100%;\r\n  }\r\n\r\n  .page-navigation[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-transaction-management', standalone: true, imports: [CommonModule, FormsModule, AdminSidebarComponent], template: "<div class=\"admin-layout\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"transaction-management-container\">\r\n    <!-- Success Alert -->\r\n    <div *ngIf=\"showSuccessAlert\" class=\"alert alert-success\">\r\n      <div class=\"alert-content\">\r\n        <span class=\"alert-icon\">\u2713</span>\r\n        <span class=\"alert-text\">{{ successMessage }}</span>\r\n        <button type=\"button\" class=\"alert-close\" (click)=\"closeAlert('success')\">\u2715</button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Error Alert -->\r\n    <div *ngIf=\"showErrorAlert\" class=\"alert alert-danger\">\r\n      <div class=\"alert-content\">\r\n        <span class=\"alert-icon\">\u26A0\uFE0F</span>\r\n        <div class=\"alert-text-container\">\r\n          <span class=\"alert-text\">{{ errorMessage }}</span>\r\n        </div>\r\n        <button type=\"button\" class=\"alert-close\" (click)=\"closeAlert('error')\">\u2715</button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Page Header -->\r\n    <div class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Transactions / Audit</h1>\r\n        <p class=\"page-subtitle\">View and manage all point transactions across the system</p>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <button class=\"btn btn-primary\" (click)=\"openAdjustPointsModal()\">\r\n          <span class=\"btn-icon\">\u2795</span> Adjust Points\r\n        </button>\r\n        <button class=\"btn btn-secondary\" (click)=\"exportTransactions()\" [disabled]=\"isExporting\">\r\n          <span class=\"btn-icon\">\uD83D\uDCE5</span> {{ isExporting ? 'Exporting...' : 'Export CSV' }}\r\n        </button>\r\n        <button class=\"btn-icon-only\" (click)=\"refreshData()\" title=\"Refresh\">\r\n          \uD83D\uDD04\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Summary Cards -->\r\n    <div class=\"summary-cards\">\r\n      <div class=\"summary-card card-earned\">\r\n        <div class=\"card-icon\">\uD83D\uDCC8</div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-value\">{{ summary.totalEarned | number }}</div>\r\n          <div class=\"card-label\">Total Earned</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"summary-card card-redeemed\">\r\n        <div class=\"card-icon\">\uD83D\uDCC9</div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-value\">{{ summary.totalRedeemed | number }}</div>\r\n          <div class=\"card-label\">Total Redeemed</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"summary-card card-net\">\r\n        <div class=\"card-icon\">\uD83D\uDCB0</div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-value\">{{ summary.netPoints | number }}</div>\r\n          <div class=\"card-label\">Net Points</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"summary-card card-count\">\r\n        <div class=\"card-icon\">\uD83D\uDCCA</div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-value\">{{ summary.transactionCount | number }}</div>\r\n          <div class=\"card-label\">Total Transactions</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Chart Section -->\r\n    <div class=\"chart-section\" *ngIf=\"showChart && chartData.length > 0\">\r\n      <div class=\"chart-header\">\r\n        <h3 class=\"chart-title\">Monthly Points Trend</h3>\r\n        <button class=\"btn-text\" (click)=\"toggleChart()\">Hide</button>\r\n      </div>\r\n      <div class=\"chart-container\">\r\n        <div class=\"chart-bars\">\r\n          <div class=\"chart-bar-group\" *ngFor=\"let data of chartData\">\r\n            <div class=\"bar-container\">\r\n              <div class=\"bar bar-earned\" \r\n                   [style.height.%]=\"getBarHeight(data.pointsEarned)\"\r\n                   [title]=\"'Earned: ' + (data.pointsEarned | number)\">\r\n              </div>\r\n              <div class=\"bar bar-redeemed\" \r\n                   [style.height.%]=\"getBarHeight(data.pointsRedeemed)\"\r\n                   [title]=\"'Redeemed: ' + (data.pointsRedeemed | number)\">\r\n              </div>\r\n            </div>\r\n            <div class=\"bar-label\">{{ data.monthName?.substring(0, 3) }}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"chart-legend\">\r\n          <span class=\"legend-item\"><span class=\"legend-color earned\"></span> Earned</span>\r\n          <span class=\"legend-item\"><span class=\"legend-color redeemed\"></span> Redeemed</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <button *ngIf=\"!showChart && chartData.length > 0\" class=\"btn-text show-chart-btn\" (click)=\"toggleChart()\">\r\n      \uD83D\uDCCA Show Monthly Chart\r\n    </button>\r\n\r\n    <!-- Filters Section -->\r\n    <div class=\"filters-section\">\r\n      <div class=\"filters-row\">\r\n        <!-- Search -->\r\n        <div class=\"search-container\">\r\n          <span class=\"search-icon\">\uD83D\uDD0D</span>\r\n          <input \r\n            type=\"text\" \r\n            class=\"search-input\"\r\n            placeholder=\"Search by user, description...\"\r\n            [(ngModel)]=\"searchText\"\r\n            (input)=\"onSearchInput()\"\r\n          />\r\n          <button *ngIf=\"searchText\" class=\"clear-search\" (click)=\"clearSearch()\">\u2715</button>\r\n        </div>\r\n\r\n        <!-- Quick Filters -->\r\n        <div class=\"quick-filters\">\r\n          <select \r\n            class=\"filter-select\"\r\n            [(ngModel)]=\"selectedType\"\r\n            (change)=\"onTypeFilterChange()\"\r\n          >\r\n            <option *ngFor=\"let opt of typeOptions\" [ngValue]=\"opt.value\">{{ opt.label }}</option>\r\n          </select>\r\n\r\n          <select \r\n            class=\"filter-select\"\r\n            [(ngModel)]=\"selectedSource\"\r\n            (change)=\"onSourceFilterChange()\"\r\n          >\r\n            <option *ngFor=\"let opt of sourceOptions\" [ngValue]=\"opt.value\">{{ opt.label }}</option>\r\n          </select>\r\n\r\n          <button class=\"btn-filter\" (click)=\"toggleFiltersPanel()\">\r\n            <span class=\"btn-icon\">\u2699\uFE0F</span> More Filters\r\n          </button>\r\n\r\n          <button \r\n            *ngIf=\"hasFiltersApplied\" \r\n            class=\"btn-clear-filters\"\r\n            (click)=\"clearFilters()\"\r\n          >\r\n            Clear All\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Advanced Filters Panel -->\r\n      <div class=\"advanced-filters\" *ngIf=\"showFiltersPanel\">\r\n        <div class=\"filter-group\">\r\n          <label class=\"filter-label\">User</label>\r\n          <select \r\n            class=\"filter-select full-width\"\r\n            [(ngModel)]=\"selectedUserId\"\r\n            (change)=\"onUserFilterChange()\"\r\n          >\r\n            <option [ngValue]=\"null\">All Users</option>\r\n            <option *ngFor=\"let user of userOptions\" [ngValue]=\"user.id\">\r\n              {{ user.name }} ({{ user.employeeId }})\r\n            </option>\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\"filter-group\">\r\n          <label class=\"filter-label\">Start Date</label>\r\n          <input \r\n            type=\"date\" \r\n            class=\"filter-input\"\r\n            [(ngModel)]=\"startDate\"\r\n            (change)=\"onDateFilterChange()\"\r\n          />\r\n        </div>\r\n\r\n        <div class=\"filter-group\">\r\n          <label class=\"filter-label\">End Date</label>\r\n          <input \r\n            type=\"date\" \r\n            class=\"filter-input\"\r\n            [(ngModel)]=\"endDate\"\r\n            (change)=\"onDateFilterChange()\"\r\n          />\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Transactions Table -->\r\n    <div class=\"table-container\">\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-state\">\r\n        <div class=\"spinner\"></div>\r\n        <p>Loading transactions...</p>\r\n      </div>\r\n\r\n      <!-- Empty State -->\r\n      <div *ngIf=\"!isLoading && transactions.length === 0\" class=\"empty-state\">\r\n        <div class=\"empty-icon\">\uD83D\uDCED</div>\r\n        <h3 class=\"empty-title\">No transactions found</h3>\r\n        <p class=\"empty-description\">\r\n          <ng-container *ngIf=\"hasFiltersApplied\">\r\n            No transactions match your filters. Try adjusting your search criteria.\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!hasFiltersApplied\">\r\n            There are no transactions in the system yet.\r\n          </ng-container>\r\n        </p>\r\n      </div>\r\n\r\n      <!-- Table -->\r\n      <table class=\"transactions-table\" *ngIf=\"!isLoading && transactions.length > 0\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"col-date sortable\" (click)=\"sortBy('Timestamp')\">\r\n              Date/Time {{ getSortIcon('Timestamp') }}\r\n            </th>\r\n            <th class=\"col-user sortable\" (click)=\"sortBy('User')\">\r\n              User {{ getSortIcon('User') }}\r\n            </th>\r\n            <th class=\"col-type sortable\" (click)=\"sortBy('Type')\">\r\n              Type {{ getSortIcon('Type') }}\r\n            </th>\r\n            <th class=\"col-points sortable\" (click)=\"sortBy('Points')\">\r\n              Points {{ getSortIcon('Points') }}\r\n            </th>\r\n            <th class=\"col-balance\">Balance After</th>\r\n            <th class=\"col-source sortable\" (click)=\"sortBy('Source')\">\r\n              Source {{ getSortIcon('Source') }}\r\n            </th>\r\n            <th class=\"col-description\">Description</th>\r\n            <th class=\"col-processed\">Processed By</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr \r\n            *ngFor=\"let transaction of transactions\"\r\n            class=\"table-row\"\r\n            (click)=\"openDetails(transaction)\"\r\n          >\r\n            <td class=\"col-date\">\r\n              <div class=\"date-cell\">\r\n                <span class=\"date-value\">{{ formatDate(transaction.timestamp) }}</span>\r\n                <span class=\"time-value\">{{ formatTime(transaction.timestamp) }}</span>\r\n              </div>\r\n            </td>\r\n            <td class=\"col-user\">\r\n              <div class=\"user-cell\">\r\n                <div class=\"user-avatar\">{{ getUserInitials(transaction.userName) }}</div>\r\n                <div class=\"user-info\">\r\n                  <div class=\"user-name\">{{ transaction.userName }}</div>\r\n                  <div class=\"user-email\">{{ transaction.employeeId || transaction.userEmail }}</div>\r\n                </div>\r\n              </div>\r\n            </td>\r\n            <td class=\"col-type\">\r\n              <span class=\"type-badge\" [ngClass]=\"getTypeClass(transaction.type)\">\r\n                {{ getTypeLabel(transaction.type) }}\r\n              </span>\r\n            </td>\r\n            <td class=\"col-points\" [ngClass]=\"getPointsClass(transaction.amount)\">\r\n              {{ formatPoints(transaction.amount) }}\r\n            </td>\r\n            <td class=\"col-balance\">\r\n              {{ transaction.balanceAfter | number }}\r\n            </td>\r\n            <td class=\"col-source\">\r\n              <span class=\"source-badge\" [ngClass]=\"getSourceClass(transaction.source)\">\r\n                {{ getSourceIcon(transaction.source) }} {{ transaction.source }}\r\n              </span>\r\n            </td>\r\n            <td class=\"col-description\">\r\n              <span class=\"description-text\" [title]=\"transaction.description\">\r\n                {{ transaction.description | slice:0:40 }}{{ transaction.description.length > 40 ? '...' : '' }}\r\n              </span>\r\n            </td>\r\n            <td class=\"col-processed\">\r\n              <span class=\"processed-by\">{{ transaction.processedByName || 'System' }}</span>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <!-- Pagination -->\r\n    <div class=\"pagination-container\" *ngIf=\"!isLoading && transactions.length > 0\">\r\n      <div class=\"pagination-info\">\r\n        Showing {{ showingFrom }} to {{ showingTo }} of {{ totalCount }} transactions\r\n      </div>\r\n      <div class=\"pagination-controls\">\r\n        <div class=\"page-size-selector\">\r\n          <span>Rows:</span>\r\n          <select [(ngModel)]=\"pageSize\" (change)=\"onPageSizeChange()\">\r\n            <option *ngFor=\"let size of pageSizeOptions\" [value]=\"size\">{{ size }}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"page-navigation\">\r\n          <button \r\n            class=\"btn-page btn-prev\"\r\n            [disabled]=\"currentPage === 1\"\r\n            (click)=\"changePage(currentPage - 1)\"\r\n          >\r\n            \u2039\r\n          </button>\r\n\r\n          <ng-container *ngFor=\"let page of visiblePages\">\r\n            <button \r\n              *ngIf=\"page !== '...'\"\r\n              class=\"btn-page\"\r\n              [class.active]=\"currentPage === page\"\r\n              (click)=\"changePage(+page)\"\r\n            >\r\n              {{ page }}\r\n            </button>\r\n            <span *ngIf=\"page === '...'\" class=\"page-ellipsis\">...</span>\r\n          </ng-container>\r\n\r\n          <button \r\n            class=\"btn-page btn-next\"\r\n            [disabled]=\"currentPage === totalPages\"\r\n            (click)=\"changePage(currentPage + 1)\"\r\n          >\r\n            \u203A\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Details Drawer -->\r\n  <div class=\"drawer-overlay\" *ngIf=\"showDetailsDrawer\" (click)=\"closeDetails()\"></div>\r\n  <div class=\"details-drawer\" [class.open]=\"showDetailsDrawer\">\r\n    <div class=\"drawer-container\" *ngIf=\"selectedTransaction\">\r\n      <!-- Drawer Header -->\r\n      <div class=\"drawer-header\">\r\n        <div class=\"drawer-title-section\">\r\n          <h3 class=\"drawer-title\">Transaction Details</h3>\r\n          <div class=\"drawer-subtitle\">\r\n            <span class=\"transaction-id\">{{ selectedTransaction.id.substring(0, 13).toUpperCase() }}</span>\r\n          </div>\r\n        </div>\r\n        <button class=\"btn-close-drawer\" (click)=\"closeDetails()\">\u2715</button>\r\n      </div>\r\n\r\n      <!-- Drawer Content -->\r\n      <div class=\"drawer-content\">\r\n        <!-- Transaction Type & Points -->\r\n        <div class=\"detail-card highlight-card\">\r\n          <div class=\"points-display\" [ngClass]=\"getPointsClass(selectedTransaction.amount)\">\r\n            <span class=\"points-amount\">{{ formatPoints(selectedTransaction.amount) }}</span>\r\n            <span class=\"points-label\">Points</span>\r\n          </div>\r\n          <div class=\"type-display\">\r\n            <span class=\"type-badge large\" [ngClass]=\"getTypeClass(selectedTransaction.type)\">\r\n              {{ getTypeLabel(selectedTransaction.type) }}\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Balance Change -->\r\n        <div class=\"detail-card\">\r\n          <h4 class=\"card-title\">Balance Change</h4>\r\n          <div class=\"balance-flow\">\r\n            <div class=\"balance-item\">\r\n              <span class=\"balance-label\">Before</span>\r\n              <span class=\"balance-value\">{{ getBalanceBefore(selectedTransaction) | number }}</span>\r\n            </div>\r\n            <div class=\"balance-arrow\">\u2192</div>\r\n            <div class=\"balance-item\">\r\n              <span class=\"balance-label\">After</span>\r\n              <span class=\"balance-value\">{{ selectedTransaction.balanceAfter | number }}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- User Info -->\r\n        <div class=\"detail-card\">\r\n          <h4 class=\"card-title\">User</h4>\r\n          <div class=\"user-detail\">\r\n            <div class=\"user-avatar large\">{{ getUserInitials(selectedTransaction.userName) }}</div>\r\n            <div class=\"user-info-detail\">\r\n              <div class=\"user-name-large\">{{ selectedTransaction.userName }}</div>\r\n              <div class=\"user-meta\">{{ selectedTransaction.userEmail }}</div>\r\n              <div class=\"user-meta\" *ngIf=\"selectedTransaction.employeeId\">\r\n                Employee ID: {{ selectedTransaction.employeeId }}\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <button class=\"btn btn-sm btn-outline\" (click)=\"openAdjustPointsModal(selectedTransaction)\">\r\n            Adjust Points\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Transaction Details -->\r\n        <div class=\"detail-card\">\r\n          <h4 class=\"card-title\">Details</h4>\r\n          <div class=\"detail-grid\">\r\n            <div class=\"detail-item\">\r\n              <span class=\"detail-label\">Date & Time</span>\r\n              <span class=\"detail-value\">{{ formatDateTime(selectedTransaction.timestamp) }}</span>\r\n            </div>\r\n            <div class=\"detail-item\">\r\n              <span class=\"detail-label\">Source</span>\r\n              <span class=\"detail-value\">\r\n                <span class=\"source-badge\" [ngClass]=\"getSourceClass(selectedTransaction.source)\">\r\n                  {{ getSourceIcon(selectedTransaction.source) }} {{ selectedTransaction.source }}\r\n                </span>\r\n              </span>\r\n            </div>\r\n            <div class=\"detail-item\" *ngIf=\"selectedTransaction.sourceId\">\r\n              <span class=\"detail-label\">Source ID</span>\r\n              <span class=\"detail-value monospace\">{{ selectedTransaction.sourceId }}</span>\r\n            </div>\r\n            <div class=\"detail-item\">\r\n              <span class=\"detail-label\">Processed By</span>\r\n              <span class=\"detail-value\">{{ selectedTransaction.processedByName || 'System' }}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Description -->\r\n        <div class=\"detail-card\">\r\n          <h4 class=\"card-title\">Description</h4>\r\n          <p class=\"description-full\">{{ selectedTransaction.description }}</p>\r\n        </div>\r\n\r\n        <!-- Transaction ID -->\r\n        <div class=\"detail-card footer-card\">\r\n          <span class=\"transaction-id-full\">Transaction ID: {{ selectedTransaction.id }}</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Adjust Points Modal -->\r\n  <div class=\"modal-overlay\" *ngIf=\"showAdjustPointsModal\" (click)=\"closeAdjustPointsModal()\"></div>\r\n  <div class=\"modal-container\" *ngIf=\"showAdjustPointsModal\">\r\n    <div class=\"modal-content\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Adjust User Points</h3>\r\n        <button class=\"btn-close-modal\" (click)=\"closeAdjustPointsModal()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"modal-body\">\r\n        <!-- User Selection -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\">Select User *</label>\r\n          <select \r\n            class=\"form-select\"\r\n            [(ngModel)]=\"adjustPointsForm.userId\"\r\n            (change)=\"onAdjustUserChange()\"\r\n            [disabled]=\"!!selectedTransaction\"\r\n          >\r\n            <option value=\"\">-- Select User --</option>\r\n            <option *ngFor=\"let user of userOptions\" [value]=\"user.id\">\r\n              {{ user.name }} ({{ user.employeeId }})\r\n            </option>\r\n          </select>\r\n        </div>\r\n\r\n        <!-- Amount -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\">Points Amount *</label>\r\n          <input \r\n            type=\"number\" \r\n            class=\"form-input\"\r\n            [(ngModel)]=\"adjustPointsForm.amount\"\r\n            placeholder=\"Enter amount (positive to add, negative to deduct)\"\r\n          />\r\n          <small class=\"form-hint\">Use positive values to add points, negative to deduct</small>\r\n        </div>\r\n\r\n        <!-- Reason -->\r\n        <div class=\"form-group\">\r\n          <label class=\"form-label\">Reason *</label>\r\n          <textarea \r\n            class=\"form-textarea\"\r\n            [(ngModel)]=\"adjustPointsForm.reason\"\r\n            placeholder=\"Provide a reason for this adjustment (required)\"\r\n            rows=\"3\"\r\n          ></textarea>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button class=\"btn btn-secondary\" (click)=\"closeAdjustPointsModal()\">Cancel</button>\r\n        <button \r\n          class=\"btn btn-primary\" \r\n          (click)=\"submitAdjustPoints()\"\r\n          [disabled]=\"isSubmitting || !adjustPointsForm.userId || !adjustPointsForm.reason.trim()\"\r\n        >\r\n          {{ isSubmitting ? 'Processing...' : 'Adjust Points' }}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["/* Transaction Management Component Styles */\r\n\r\n/* Layout */\r\n.admin-layout {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.transaction-management-container {\r\n  flex: 1;\r\n  padding: 24px 32px;\r\n  max-width: 100%;\r\n  overflow-x: hidden;\r\n}\r\n\r\n/* Alerts */\r\n.alert {\r\n  padding: 12px 16px;\r\n  border-radius: 8px;\r\n  margin-bottom: 16px;\r\n  animation: slideIn 0.3s ease-out;\r\n}\r\n\r\n@keyframes slideIn {\r\n  from {\r\n    transform: translateY(-10px);\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    transform: translateY(0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.alert-success {\r\n  background-color: var(--ag-tag-green-bg);\r\n  border: 1px solid var(--ag-color-support-success);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.alert-danger {\r\n  background-color: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.alert-content {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.alert-icon {\r\n  font-size: 18px;\r\n}\r\n\r\n.alert-text {\r\n  flex: 1;\r\n}\r\n\r\n.alert-close {\r\n  background: none;\r\n  border: none;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n  opacity: 0.6;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-close:hover {\r\n  opacity: 1;\r\n}\r\n\r\n/* Page Header */\r\n.page-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.header-left {\r\n  flex: 1;\r\n}\r\n\r\n.page-title {\r\n  font-size: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 4px 0;\r\n}\r\n\r\n.page-subtitle {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n/* Buttons */\r\n.btn {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 20px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  border-radius: 8px;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-primary {\r\n  background: var(--ag-button-info);\r\n  color: white;\r\n}\r\n\r\n.btn-primary:hover {\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\r\n}\r\n\r\n.btn-primary:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n  transform: none;\r\n}\r\n\r\n.btn-secondary {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.btn-secondary:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.btn-outline {\r\n  background: transparent;\r\n  border: 1px solid var(--ag-button-info);\r\n  color: var(--ag-button-info);\r\n}\r\n\r\n.btn-outline:hover {\r\n  background: var(--ag-button-info);\r\n  color: white;\r\n}\r\n\r\n.btn-sm {\r\n  padding: 6px 12px;\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-icon-only {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-field-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-icon-only:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.btn-text {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-button-info);\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  padding: 4px 8px;\r\n}\r\n\r\n.btn-text:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.btn-icon {\r\n  font-size: 14px;\r\n}\r\n\r\n/* Summary Cards */\r\n.summary-cards {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, 1fr);\r\n  gap: 20px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.summary-card {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  transition: transform 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.summary-card:hover {\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.card-icon {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 12px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 24px;\r\n}\r\n\r\n.card-earned .card-icon {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.card-redeemed .card-icon {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.card-net .card-icon {\r\n  background: var(--ag-color-support-info);\r\n}\r\n\r\n.card-count .card-icon {\r\n  background: var(--ag-color-support-undefined);\r\n}\r\n\r\n.card-content {\r\n  flex: 1;\r\n}\r\n\r\n.card-value {\r\n  font-size: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.card-label {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-top: 2px;\r\n}\r\n\r\n/* Chart Section */\r\n.chart-section {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 20px;\r\n  margin-bottom: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.chart-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.chart-title {\r\n  font-size: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.chart-container {\r\n  padding: 20px 0;\r\n}\r\n\r\n.chart-bars {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: flex-end;\r\n  height: 200px;\r\n  padding: 0 20px;\r\n}\r\n\r\n.chart-bar-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.bar-container {\r\n  display: flex;\r\n  gap: 4px;\r\n  align-items: flex-end;\r\n  height: 180px;\r\n}\r\n\r\n.bar {\r\n  width: 24px;\r\n  border-radius: 4px 4px 0 0;\r\n  transition: height 0.5s ease-out;\r\n  min-height: 4px;\r\n}\r\n\r\n.bar-earned {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.bar-redeemed {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.bar-label {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.chart-legend {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 24px;\r\n  margin-top: 16px;\r\n}\r\n\r\n.legend-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.legend-color {\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.legend-color.earned {\r\n  background: var(--ag-color-support-success);\r\n}\r\n\r\n.legend-color.redeemed {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.show-chart-btn {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n/* Filters Section */\r\n.filters-section {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  padding: 16px 20px;\r\n  margin-bottom: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.filters-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-container {\r\n  position: relative;\r\n  flex: 1;\r\n  min-width: 250px;\r\n  max-width: 400px;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  font-size: 14px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 10px 36px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n  box-shadow: 0 0 0 3px rgba(0, 67, 206, 0.1);\r\n}\r\n\r\n.clear-search {\r\n  position: absolute;\r\n  right: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.clear-search:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.quick-filters {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-select {\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  min-width: 140px;\r\n}\r\n\r\n.filter-select:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n}\r\n\r\n.btn-filter {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter:hover {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.btn-clear-filters {\r\n  padding: 10px 14px;\r\n  border: none;\r\n  border-radius: 8px;\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n}\r\n\r\n.btn-clear-filters:hover {\r\n  background: var(--ag-tag-yellow-bg);\r\n}\r\n\r\n/* Advanced Filters */\r\n.advanced-filters {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  gap: 16px;\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.filter-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-label {\r\n  font-size: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-input {\r\n  padding: 10px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n}\r\n\r\n.filter-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-info);\r\n}\r\n\r\n.full-width {\r\n  width: 100%;\r\n}\r\n\r\n/* Table */\r\n.table-container {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.transactions-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.transactions-table thead tr {\r\n  background: var(--ag-color-field-01);\r\n  border-bottom: 2px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.transactions-table th {\r\n  padding: 14px 16px;\r\n  text-align: left;\r\n  font-size: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n}\r\n\r\n.transactions-table th.sortable {\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.transactions-table th.sortable:hover {\r\n  color: var(--ag-button-info);\r\n}\r\n\r\n.transactions-table tbody tr {\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  cursor: pointer;\r\n  transition: background-color 0.15s;\r\n}\r\n\r\n.transactions-table tbody tr:hover {\r\n  background-color: var(--ag-color-layer-hover);\r\n}\r\n\r\n.transactions-table td {\r\n  padding: 14px 16px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  vertical-align: middle;\r\n}\r\n\r\n/* Table Cells */\r\n.date-cell {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.date-value {\r\n  font-weight: 500;\r\n}\r\n\r\n.time-value {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.user-cell {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-avatar {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: var(--ag-color-support-info);\r\n  color: white;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-avatar.large {\r\n  width: 48px;\r\n  height: 48px;\r\n  font-size: 16px;\r\n}\r\n\r\n.user-info {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.user-name {\r\n  font-weight: 500;\r\n}\r\n\r\n.user-email {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Type Badge */\r\n.type-badge {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  padding: 4px 10px;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.type-badge.large {\r\n  padding: 6px 14px;\r\n  font-size: 14px;\r\n}\r\n\r\n.type-earned {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.type-redeemed {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.type-adjusted {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.type-refunded {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n/* Points */\r\n.col-points {\r\n  font-weight: 600;\r\n  font-size: 15px;\r\n}\r\n\r\n.points-positive {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-negative {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n/* Source Badge */\r\n.source-badge {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  padding: 4px 10px;\r\n  border-radius: 6px;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n}\r\n\r\n.source-event {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.source-product {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.source-admin {\r\n  background: var(--ag-tag-purple-bg);\r\n  color: var(--ag-tag-purple-text);\r\n}\r\n\r\n.source-system {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.description-text {\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.processed-by {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Loading & Empty States */\r\n.loading-state,\r\n.empty-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid var(--ag-color-field-01);\r\n  border-top: 3px solid var(--ag-button-info);\r\n  border-radius: 50%;\r\n  animation: spin 1s linear infinite;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n@keyframes spin {\r\n  0% { transform: rotate(0deg); }\r\n  100% { transform: rotate(360deg); }\r\n}\r\n\r\n.empty-icon {\r\n  font-size: 48px;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-title {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.empty-description {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n/* Pagination */\r\n.pagination-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n}\r\n\r\n.pagination-info {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.pagination-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.page-size-selector {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.page-size-selector select {\r\n  padding: 6px 10px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font-size: var(--ag-typo-body-02);\r\n}\r\n\r\n.page-navigation {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.btn-page {\r\n  min-width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  font-size: var(--ag-typo-body-02);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-page:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.btn-page.active {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.btn-page:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-ellipsis {\r\n  padding: 0 8px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Drawer */\r\n.drawer-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  z-index: 1000;\r\n  animation: fadeIn 0.2s ease-out;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from { opacity: 0; }\r\n  to { opacity: 1; }\r\n}\r\n\r\n.details-drawer {\r\n  position: fixed;\r\n  top: 0;\r\n  right: -450px;\r\n  width: 450px;\r\n  height: 100vh;\r\n  background: var(--ag-color-layer-01);\r\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);\r\n  z-index: 1001;\r\n  transition: right 0.3s ease-out;\r\n  overflow-y: auto;\r\n}\r\n\r\n.details-drawer.open {\r\n  right: 0;\r\n}\r\n\r\n.drawer-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n\r\n.drawer-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  padding: 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.drawer-title {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.drawer-subtitle {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.transaction-id {\r\n  font-family: monospace;\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-hover);\r\n  padding: 4px 8px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.btn-close-drawer {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-h4);\r\n  transition: background 0.2s;\r\n}\r\n\r\n.btn-close-drawer:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.drawer-content {\r\n  flex: 1;\r\n  padding: 24px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.detail-card {\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  padding: 16px;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.highlight-card {\r\n  background: var(--ag-tag-blue-bg);\r\n  border: 1px solid var(--ag-color-support-info);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.points-display {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.points-display .points-amount {\r\n  font-size: 32px;\r\n  font-weight: 700;\r\n}\r\n\r\n.points-display.points-positive .points-amount {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-display.points-negative .points-amount {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.points-display .points-label {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.card-title {\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin: 0 0 12px 0;\r\n}\r\n\r\n.balance-flow {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 16px;\r\n}\r\n\r\n.balance-item {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.balance-label {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.balance-value {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.balance-arrow {\r\n  font-size: var(--ag-typo-h3);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.user-detail {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.user-info-detail {\r\n  flex: 1;\r\n}\r\n\r\n.user-name-large {\r\n  font-size: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.user-meta {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.detail-grid {\r\n  display: grid;\r\n  gap: 12px;\r\n}\r\n\r\n.detail-item {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.detail-label {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.detail-value {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.detail-value.monospace {\r\n  font-family: monospace;\r\n  font-size: 12px;\r\n  word-break: break-all;\r\n}\r\n\r\n.description-full {\r\n  font-size: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n.footer-card {\r\n  background: var(--ag-color-layer-hover);\r\n  text-align: center;\r\n}\r\n\r\n.transaction-id-full {\r\n  font-family: monospace;\r\n  font-size: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  word-break: break-all;\r\n}\r\n\r\n/* Modal */\r\n.modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  z-index: 1100;\r\n  animation: fadeIn 0.2s ease-out;\r\n}\r\n\r\n.modal-container {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  z-index: 1101;\r\n  width: 100%;\r\n  max-width: 480px;\r\n  animation: slideUp 0.3s ease-out;\r\n}\r\n\r\n@keyframes slideUp {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate(-50%, -45%);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translate(-50%, -50%);\r\n  }\r\n}\r\n\r\n.modal-content {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 16px;\r\n  overflow: hidden;\r\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.modal-title {\r\n  font-size: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.btn-close-modal {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: var(--ag-typo-body-01);\r\n}\r\n\r\n.btn-close-modal:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.modal-body {\r\n  padding: 24px;\r\n}\r\n\r\n.form-group {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.form-label {\r\n  display: block;\r\n  font-size: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.form-select,\r\n.form-input,\r\n.form-textarea {\r\n  width: 100%;\r\n  padding: 12px 14px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font-size: var(--ag-typo-body-02);\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n}\r\n\r\n.form-select:focus,\r\n.form-input:focus,\r\n.form-textarea:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.form-textarea {\r\n  resize: vertical;\r\n  min-height: 80px;\r\n}\r\n\r\n.form-hint {\r\n  font-size: var(--ag-typo-label);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-top: 4px;\r\n  display: block;\r\n}\r\n\r\n.modal-footer {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 12px;\r\n  padding: 16px 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n/* Responsive */\r\n@media (max-width: 1200px) {\r\n  .summary-cards {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n  \r\n  .advanced-filters {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .transaction-management-container {\r\n    padding: 16px;\r\n  }\r\n\r\n  .page-header {\r\n    flex-direction: column;\r\n    gap: 16px;\r\n  }\r\n\r\n  .header-right {\r\n    width: 100%;\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .summary-cards {\r\n    grid-template-columns: 1fr 1fr;\r\n  }\r\n\r\n  .filters-row {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .search-container {\r\n    max-width: none;\r\n    width: 100%;\r\n  }\r\n\r\n  .quick-filters {\r\n    width: 100%;\r\n    justify-content: space-between;\r\n  }\r\n\r\n  .advanced-filters {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .details-drawer {\r\n    width: 100%;\r\n    right: -100%;\r\n  }\r\n\r\n  .pagination-container {\r\n    flex-direction: column;\r\n    gap: 16px;\r\n  }\r\n\r\n  .pagination-controls {\r\n    flex-direction: column;\r\n    width: 100%;\r\n  }\r\n\r\n  .page-navigation {\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AdminTransactionsService }, { type: i2.AdminUsersService }, { type: i3.AuthService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionManagementComponent, { className: "TransactionManagementComponent", filePath: "src/app/pages/admin/transactions/transaction-management.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=transaction-management.component.js.map