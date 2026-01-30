import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomValidators, ValidationConstants } from '../../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../../shared/components/form-errors-summary.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/admin-users.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
const _c0 = () => [];
function UserDetailDrawerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDrawer()); });
    i0.ɵɵelementEnd();
} }
function UserDetailDrawerComponent_ng_container_7_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r4);
} }
function UserDetailDrawerComponent_ng_container_7_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1, "No roles assigned");
    i0.ɵɵelementEnd();
} }
function UserDetailDrawerComponent_ng_container_7_div_62_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "label");
    i0.ɵɵtext(2, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.createdAt, "medium"));
} }
function UserDetailDrawerComponent_ng_container_7_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38)(2, "label");
    i0.ɵɵtext(3, "First Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 38)(7, "label");
    i0.ɵɵtext(8, "Last Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 38)(12, "label");
    i0.ɵɵtext(13, "Email Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 38)(17, "label");
    i0.ɵɵtext(18, "Employee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, UserDetailDrawerComponent_ng_container_7_div_62_div_21_Template, 6, 4, "div", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.firstName) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.lastName) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.email) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.employeeId) || "-");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.createdAt);
} }
function UserDetailDrawerComponent_ng_container_7_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38)(2, "label");
    i0.ɵɵtext(3, "Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 38)(8, "label");
    i0.ɵɵtext(9, "Total Earned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 38)(14, "label");
    i0.ɵɵtext(15, "Total Redeemed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 38)(20, "label");
    i0.ɵɵtext(21, "Net Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(6, 4, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.current) ?? 0), " points");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(12, 6, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.earned) ?? 0), " points");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(18, 8, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.redeemed) ?? 0), " points");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(24, 10, ((ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.earned) ?? 0) - ((ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.redeemed) ?? 0)), " points");
} }
function UserDetailDrawerComponent_ng_container_7_div_64_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "div", 44);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading transactions...");
    i0.ɵɵelementEnd()();
} }
function UserDetailDrawerComponent_ng_container_7_div_64_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45)(1, "p");
    i0.ɵɵtext(2, "No transactions found");
    i0.ɵɵelementEnd()();
} }
function UserDetailDrawerComponent_ng_container_7_div_64_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "div", 49)(2, "span", 50);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 51);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 52)(7, "p", 53);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 54);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const transaction_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("positive", transaction_r5.amount > 0)("negative", transaction_r5.amount < 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", transaction_r5.transactionType || transaction_r5.type, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("positive", transaction_r5.amount > 0)("negative", transaction_r5.amount < 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", transaction_r5.amount > 0 ? "+" : "", "", transaction_r5.amount, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(transaction_r5.reason || transaction_r5.description || "No description");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 13, transaction_r5.createdAt || transaction_r5.timestamp, "medium"));
} }
function UserDetailDrawerComponent_ng_container_7_div_64_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtemplate(1, UserDetailDrawerComponent_ng_container_7_div_64_div_8_div_1_Template, 12, 16, "div", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.transactions);
} }
function UserDetailDrawerComponent_ng_container_7_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38)(2, "label");
    i0.ɵɵtext(3, "Total Transactions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, UserDetailDrawerComponent_ng_container_7_div_64_div_6_Template, 4, 0, "div", 40)(7, UserDetailDrawerComponent_ng_container_7_div_64_div_7_Template, 3, 0, "div", 41)(8, UserDetailDrawerComponent_ng_container_7_div_64_div_8_Template, 2, 1, "div", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.userDetails.transactionCount ?? 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isLoadingTransactions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isLoadingTransactions && ctx_r1.transactions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isLoadingTransactions && ctx_r1.transactions.length > 0);
} }
function UserDetailDrawerComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 9)(2, "div", 10)(3, "div", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 12)(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 13);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 14);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 15);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_ng_container_7_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.enterEditMode()); });
    i0.ɵɵtext(13, "\u270E Edit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 16)(15, "div", 17)(16, "span", 18);
    i0.ɵɵtext(17, "Roles:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 19);
    i0.ɵɵtemplate(19, UserDetailDrawerComponent_ng_container_7_span_19_Template, 2, 1, "span", 20)(20, UserDetailDrawerComponent_ng_container_7_span_20_Template, 2, 0, "span", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 17)(22, "span", 18);
    i0.ɵɵtext(23, "Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 22)(25, "span", 23);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(27, "div", 24)(28, "h4");
    i0.ɵɵtext(29, "Points Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 25)(31, "div", 26)(32, "div", 27);
    i0.ɵɵtext(33, "Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 28);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div", 26)(38, "div", 27);
    i0.ɵɵtext(39, "Total Earned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 29);
    i0.ɵɵtext(41);
    i0.ɵɵpipe(42, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 26)(44, "div", 27);
    i0.ɵɵtext(45, "Total Redeemed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 30);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 26)(50, "div", 27);
    i0.ɵɵtext(51, "Transactions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 28);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(54, "div", 31)(55, "div", 32)(56, "button", 33);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_ng_container_7_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.activeTab = "profile"); });
    i0.ɵɵtext(57, " Profile ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 33);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_ng_container_7_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.activeTab = "points"); });
    i0.ɵɵtext(59, " Points ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "button", 33);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_ng_container_7_Template_button_click_60_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.activeTab = "activity"); });
    i0.ɵɵtext(61, " Activity ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(62, UserDetailDrawerComponent_ng_container_7_div_62_Template, 22, 5, "div", 34)(63, UserDetailDrawerComponent_ng_container_7_div_63_Template, 25, 12, "div", 34)(64, UserDetailDrawerComponent_ng_container_7_div_64_Template, 9, 4, "div", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.getInitials());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", (ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.firstName) || "", " ", (ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.lastName) || "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.email) || "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("ID: ", (ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.employeeId) || "");
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", (ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.roles) || i0.ɵɵpureFunction0(31, _c0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !(ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.roles == null ? null : ctx_r1.userDetails.user.roles.length));
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("active", ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.isActive)("inactive", !(ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.isActive));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.isActive) ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 25, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.current) ?? 0));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("+", i0.ɵɵpipeBind1(42, 27, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.earned) ?? 0));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("-", i0.ɵɵpipeBind1(48, 29, (ctx_r1.userDetails.points == null ? null : ctx_r1.userDetails.points.redeemed) ?? 0));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.userDetails.transactionCount ?? 0);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "profile");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "points");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "activity");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "profile");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "points");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "activity");
} }
function UserDetailDrawerComponent_ng_container_8_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.editError);
} }
function UserDetailDrawerComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 9)(2, "form", 55);
    i0.ɵɵlistener("ngSubmit", function UserDetailDrawerComponent_ng_container_8_Template_form_ngSubmit_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveEdit()); });
    i0.ɵɵelementStart(3, "div", 56)(4, "div", 57)(5, "label", 58);
    i0.ɵɵtext(6, "First Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 59);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "input", 60)(10, "app-validation-hint", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 56)(12, "div", 57)(13, "label", 62);
    i0.ɵɵtext(14, "Last Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 59);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(17, "input", 63)(18, "app-validation-hint", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 56)(20, "label", 65);
    i0.ɵɵtext(21, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 66);
    i0.ɵɵelementStart(23, "span", 67);
    i0.ɵɵtext(24, "Email cannot be changed. Contact support if needed.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 56)(26, "label", 68);
    i0.ɵɵtext(27, "Employee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 69);
    i0.ɵɵelementStart(29, "span", 67);
    i0.ɵɵtext(30, "Employee ID cannot be changed. Contact support if needed.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(31, "app-form-errors-summary", 70);
    i0.ɵɵtemplate(32, UserDetailDrawerComponent_ng_container_8_div_32_Template, 2, 1, "div", 71);
    i0.ɵɵelementStart(33, "div", 72)(34, "button", 73);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_ng_container_8_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelEdit()); });
    i0.ɵɵtext(35, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 74);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_14_0;
    let tmp_15_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.editForm);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("warning", ctx_r1.getCharCount("firstName") > 0 && ctx_r1.getCharCount("firstName") < ctx_r1.minNameLength)("valid", ctx_r1.getCharCount("firstName") >= ctx_r1.minNameLength);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getCharCount("firstName"), " / ", ctx_r1.maxNameLength, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("error", ((tmp_5_0 = ctx_r1.editForm.get("firstName")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.editForm.get("firstName")) == null ? null : tmp_5_0.touched))("valid", ((tmp_6_0 = ctx_r1.editForm.get("firstName")) == null ? null : tmp_6_0.valid) && ((tmp_6_0 = ctx_r1.editForm.get("firstName")) == null ? null : tmp_6_0.dirty));
    i0.ɵɵattribute("maxlength", ctx_r1.maxNameLength);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r1.editForm.get("firstName"))("minLength", ctx_r1.minNameLength)("maxLength", ctx_r1.maxNameLength);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("warning", ctx_r1.getCharCount("lastName") > 0 && ctx_r1.getCharCount("lastName") < ctx_r1.minNameLength)("valid", ctx_r1.getCharCount("lastName") >= ctx_r1.minNameLength);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getCharCount("lastName"), " / ", ctx_r1.maxNameLength, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("error", ((tmp_14_0 = ctx_r1.editForm.get("lastName")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx_r1.editForm.get("lastName")) == null ? null : tmp_14_0.touched))("valid", ((tmp_15_0 = ctx_r1.editForm.get("lastName")) == null ? null : tmp_15_0.valid) && ((tmp_15_0 = ctx_r1.editForm.get("lastName")) == null ? null : tmp_15_0.dirty));
    i0.ɵɵattribute("maxlength", ctx_r1.maxNameLength);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r1.editForm.get("lastName"))("minLength", ctx_r1.minNameLength)("maxLength", ctx_r1.maxNameLength);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("form", ctx_r1.editForm)("fieldLabels", ctx_r1.editFormFieldLabels);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.editError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSaving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canSaveEdit);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSaving ? "Saving..." : "Save Changes", " ");
} }
function UserDetailDrawerComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76);
    i0.ɵɵelement(1, "div", 77);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading user details...");
    i0.ɵɵelementEnd()();
} }
function UserDetailDrawerComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 78)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 79);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_div_10_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retryLoad()); });
    i0.ɵɵtext(4, "Retry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 79);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_div_10_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDrawer()); });
    i0.ɵɵtext(6, "Close");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function UserDetailDrawerComponent_div_11_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 82);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_div_11_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onAction("deactivate")); });
    i0.ɵɵtext(1, " Deactivate User ");
    i0.ɵɵelementEnd();
} }
function UserDetailDrawerComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 80)(1, "button", 79);
    i0.ɵɵlistener("click", function UserDetailDrawerComponent_div_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onAction("assign-roles")); });
    i0.ɵɵtext(2, "Assign Roles");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, UserDetailDrawerComponent_div_11_button_3_Template, 2, 0, "button", 81);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.userDetails.user == null ? null : ctx_r1.userDetails.user.isActive);
} }
export class UserDetailDrawerComponent {
    constructor(adminUsersService, fb, cdr, ngZone) {
        this.adminUsersService = adminUsersService;
        this.fb = fb;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.isOpen = false;
        this.userId = null;
        this.actionTriggered = new EventEmitter();
        this.closed = new EventEmitter();
        this.userDetails = null;
        this.transactions = [];
        this.isLoading = false;
        this.isLoadingTransactions = false;
        this.error = null;
        this.activeTab = 'profile';
        // Edit mode state
        this.isEditMode = false;
        this.isSaving = false;
        this.editError = null;
        // Name validation constants
        this.minNameLength = ValidationConstants.NAME_MIN_LENGTH;
        this.maxNameLength = ValidationConstants.NAME_MAX_LENGTH;
        // Form field labels for error summary
        this.editFormFieldLabels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            employeeId: 'Employee ID'
        };
        this.destroy$ = new Subject();
        // Initialize form with proper validators
        // Note: email and employeeId are read-only in edit mode
        this.editForm = this.fb.group({
            firstName: ['', [
                    Validators.required,
                    CustomValidators.liveNameValidation()
                ]],
            lastName: ['', [
                    Validators.required,
                    CustomValidators.liveNameValidation()
                ]],
            email: [{ value: '', disabled: true }],
            employeeId: [{ value: '', disabled: true }]
        });
    }
    ngOnInit() {
        // Initial load if already open with userId
        if (this.isOpen && this.userId) {
            this.loadUserDetails();
        }
    }
    ngOnChanges(changes) {
        // React to isOpen or userId changes
        if (changes['isOpen'] || changes['userId']) {
            if (this.isOpen && this.userId) {
                this.loadUserDetails();
            }
            else if (!this.isOpen) {
                // Reset state when drawer closes
                this.resetState();
            }
        }
    }
    resetState() {
        this.userDetails = null;
        this.transactions = [];
        this.error = null;
        this.activeTab = 'profile';
        this.isEditMode = false;
        this.editError = null;
        this.isSaving = false;
        this.editForm.reset();
    }
    loadUserDetails() {
        if (!this.userId) {
            this.error = 'No user selected';
            this.cdr.detectChanges();
            return;
        }
        this.isLoading = true;
        this.error = null;
        this.userDetails = null;
        this.cdr.detectChanges();
        this.adminUsersService.getUserDetails(this.userId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    // API returns { user: {...}, points: {...}, transactionCount: N }
                    this.userDetails = response;
                    this.error = null;
                    // Load transactions
                    this.loadTransactions();
                    // Use setTimeout(0) to ensure change detection runs after state update
                    setTimeout(() => {
                        this.isLoading = false;
                        this.cdr.detectChanges();
                    }, 0);
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    console.error('Failed to load user details:', err);
                    this.error = err.message || 'Failed to load user details';
                    this.userDetails = null;
                    setTimeout(() => {
                        this.isLoading = false;
                        this.cdr.detectChanges();
                    }, 0);
                });
            }
        });
    }
    /** Get user initials safely */
    getInitials() {
        if (!this.userDetails?.user)
            return '?';
        const first = this.userDetails.user.firstName?.charAt(0) || '';
        const last = this.userDetails.user.lastName?.charAt(0) || '';
        return (first + last).toUpperCase() || '?';
    }
    /** Load user transactions */
    loadTransactions() {
        if (!this.userId)
            return;
        this.isLoadingTransactions = true;
        this.adminUsersService.getUserTransactions(this.userId, 1, 50).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    this.transactions = response.data || [];
                    this.isLoadingTransactions = false;
                    this.cdr.detectChanges();
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    console.error('Failed to load transactions:', err);
                    this.transactions = [];
                    this.isLoadingTransactions = false;
                    this.cdr.detectChanges();
                });
            }
        });
    }
    retryLoad() {
        this.loadUserDetails();
    }
    closeDrawer() {
        this.closed.emit();
    }
    onAction(type) {
        this.actionTriggered.emit({ type });
    }
    /** Get character count for a form field */
    getCharCount(fieldName) {
        const value = this.editForm.get(fieldName)?.value;
        return value ? value.length : 0;
    }
    /** Check if edit form can be saved */
    get canSaveEdit() {
        // Only firstName and lastName need to be valid (email/employeeId are disabled)
        const firstName = this.editForm.get('firstName');
        const lastName = this.editForm.get('lastName');
        return !this.isSaving &&
            firstName?.valid === true &&
            lastName?.valid === true;
    }
    /** Enter edit mode and populate form */
    enterEditMode() {
        if (!this.userDetails?.user)
            return;
        // Enable all controls briefly to set values, then disable email/employeeId
        this.editForm.get('email')?.enable();
        this.editForm.get('employeeId')?.enable();
        this.editForm.patchValue({
            firstName: this.userDetails.user.firstName || '',
            lastName: this.userDetails.user.lastName || '',
            email: this.userDetails.user.email || '',
            employeeId: this.userDetails.user.employeeId || ''
        });
        // Disable email and employeeId - these cannot be changed
        this.editForm.get('email')?.disable();
        this.editForm.get('employeeId')?.disable();
        this.isEditMode = true;
        this.editError = null;
        this.cdr.detectChanges();
    }
    /** Cancel edit mode */
    cancelEdit() {
        this.isEditMode = false;
        this.editError = null;
        this.editForm.reset();
        this.cdr.detectChanges();
    }
    /** Save edit changes - only firstName and lastName are editable */
    saveEdit() {
        if (!this.canSaveEdit || !this.userId)
            return;
        this.isSaving = true;
        this.editError = null;
        this.cdr.detectChanges();
        // Only send editable fields (firstName and lastName)
        // Email and EmployeeId are intentionally NOT sent - they cannot be changed
        const request = {
            firstName: this.editForm.get('firstName')?.value?.trim(),
            lastName: this.editForm.get('lastName')?.value?.trim()
        };
        this.adminUsersService.updateUser(this.userId, request).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.ngZone.run(() => {
                    this.isSaving = false;
                    this.isEditMode = false;
                    // Reload user details to show updated data
                    this.loadUserDetails();
                    // Notify parent that user was updated
                    this.actionTriggered.emit({ type: 'user-updated', data: { userId: this.userId } });
                    this.cdr.detectChanges();
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    this.isSaving = false;
                    this.editError = err.message || 'Failed to update user';
                    this.cdr.detectChanges();
                });
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserDetailDrawerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserDetailDrawerComponent)(i0.ɵɵdirectiveInject(i1.AdminUsersService), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserDetailDrawerComponent, selectors: [["app-user-detail-drawer"]], inputs: { isOpen: "isOpen", userId: "userId" }, outputs: { actionTriggered: "actionTriggered", closed: "closed" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 9, consts: [["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "drawer"], [1, "drawer-header"], [1, "close-btn", 3, "click"], [4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], ["class", "drawer-error", 4, "ngIf"], ["class", "drawer-footer", 4, "ngIf"], [1, "drawer-overlay", 3, "click"], [1, "drawer-content"], [1, "profile-section"], [1, "avatar-large"], [1, "profile-info"], [1, "email"], [1, "employee-id"], [1, "edit-btn", 3, "click"], [1, "meta-section"], [1, "meta-row"], [1, "label"], [1, "roles"], ["class", "role-chip", 4, "ngFor", "ngForOf"], ["class", "no-roles", 4, "ngIf"], [1, "status-toggle"], [1, "status-badge"], [1, "stats-section"], [1, "stats-grid"], [1, "stat-item"], [1, "stat-label"], [1, "stat-value"], [1, "stat-value", "earned"], [1, "stat-value", "redeemed"], [1, "tabs-section"], [1, "tabs-header"], [1, "tab-btn", 3, "click"], ["class", "tab-content", 4, "ngIf"], [1, "role-chip"], [1, "no-roles"], [1, "tab-content"], [1, "info-group"], ["class", "info-group", 4, "ngIf"], ["class", "loading-transactions", 4, "ngIf"], ["class", "no-transactions", 4, "ngIf"], ["class", "transactions-list", 4, "ngIf"], [1, "loading-transactions"], [1, "spinner-small"], [1, "no-transactions"], [1, "transactions-list"], ["class", "transaction-item", 4, "ngFor", "ngForOf"], [1, "transaction-item"], [1, "transaction-header"], [1, "transaction-type"], [1, "transaction-amount"], [1, "transaction-details"], [1, "transaction-reason"], [1, "transaction-date"], [1, "edit-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "label-row"], ["for", "firstName"], ["aria-live", "polite", 1, "char-counter"], ["type", "text", "id", "firstName", "formControlName", "firstName", "aria-describedby", "edit-firstName-hint", 1, "form-input"], ["id", "edit-firstName-hint", "fieldName", "First name", "fieldType", "name", 3, "control", "minLength", "maxLength"], ["for", "lastName"], ["type", "text", "id", "lastName", "formControlName", "lastName", "aria-describedby", "edit-lastName-hint", 1, "form-input"], ["id", "edit-lastName-hint", "fieldName", "Last name", "fieldType", "name", 3, "control", "minLength", "maxLength"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", "readonly", "", 1, "form-input", "disabled-field"], [1, "readonly-hint"], ["for", "employeeId"], ["type", "text", "id", "employeeId", "formControlName", "employeeId", "readonly", "", 1, "form-input", "disabled-field"], ["title", "Please fix the following errors:", 3, "form", "fieldLabels"], ["class", "edit-error", "role", "alert", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["role", "alert", 1, "edit-error"], [1, "drawer-loading"], [1, "spinner"], [1, "drawer-error"], [1, "btn-secondary", 3, "click"], [1, "drawer-footer"], ["class", "btn-danger", 3, "click", 4, "ngIf"], [1, "btn-danger", 3, "click"]], template: function UserDetailDrawerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, UserDetailDrawerComponent_div_0_Template, 1, 0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "h2");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 3);
            i0.ɵɵlistener("click", function UserDetailDrawerComponent_Template_button_click_5_listener() { return ctx.closeDrawer(); });
            i0.ɵɵtext(6, "\u2715");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, UserDetailDrawerComponent_ng_container_7_Template, 65, 32, "ng-container", 4)(8, UserDetailDrawerComponent_ng_container_8_Template, 38, 35, "ng-container", 4)(9, UserDetailDrawerComponent_div_9_Template, 4, 0, "div", 5)(10, UserDetailDrawerComponent_div_10_Template, 7, 1, "div", 6)(11, UserDetailDrawerComponent_div_11_Template, 4, 1, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.isOpen);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isOpen);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.isEditMode ? "Edit User" : "User Details");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.error && ctx.userDetails && !ctx.isEditMode);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.error && ctx.userDetails && ctx.isEditMode);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error && !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.userDetails && !ctx.isLoading && !ctx.isEditMode);
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, ValidationHintComponent, FormErrorsSummaryComponent, i3.DecimalPipe, i3.DatePipe], styles: [".drawer-overlay[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n      animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .drawer[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 0;\n      right: -400px;\n      width: 400px;\n      height: 100vh;\n      background: white;\n      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      transition: right 0.3s ease;\n    }\n\n    .drawer.open[_ngcontent-%COMP%] {\n      right: 0;\n    }\n\n    .drawer-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .drawer-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn[_ngcontent-%COMP%] {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n      padding: 0;\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      transition: color 0.2s ease;\n    }\n\n    .close-btn[_ngcontent-%COMP%]:hover {\n      color: #1f2937;\n    }\n\n    .drawer-content[_ngcontent-%COMP%] {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .profile-section[_ngcontent-%COMP%] {\n      text-align: center;\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .avatar-large[_ngcontent-%COMP%] {\n      width: 80px;\n      height: 80px;\n      border-radius: 50%;\n      background: #4b5563;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 32px;\n      font-weight: 700;\n      margin: 0 auto 12px;\n    }\n\n    .profile-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin: 0 0 4px;\n      font-size: 16px;\n      color: #1f2937;\n    }\n\n    .profile-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 13px;\n      color: #6b7280;\n    }\n\n    .email[_ngcontent-%COMP%] {\n      font-weight: 500;\n    }\n\n    .employee-id[_ngcontent-%COMP%] {\n      color: #9ca3af;\n    }\n\n    .edit-btn[_ngcontent-%COMP%] {\n      margin-top: 12px;\n      padding: 8px 12px;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .edit-btn[_ngcontent-%COMP%]:hover {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .meta-section[_ngcontent-%COMP%] {\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .meta-row[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 12px;\n      gap: 12px;\n    }\n\n    .meta-row[_ngcontent-%COMP%]:last-child {\n      margin-bottom: 0;\n    }\n\n    .label[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      color: #6b7280;\n      text-transform: uppercase;\n      min-width: 60px;\n    }\n\n    .roles[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 6px;\n      flex: 1;\n    }\n\n    .role-chip[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 4px 8px;\n      background: #dbeafe;\n      color: #1e40af;\n      border-radius: 4px;\n      font-size: 11px;\n      font-weight: 500;\n    }\n\n    .role-chip[_ngcontent-%COMP%]:has-text('Employee') {\n      background: #dbeafe;\n      color: #1e40af;\n    }\n\n    .status-badge[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n    }\n\n    .status-badge.active[_ngcontent-%COMP%] {\n      background: #d1fae5;\n      color: #047857;\n    }\n\n    .status-badge.inactive[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .stats-section[_ngcontent-%COMP%] {\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .stats-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n      margin: 0 0 12px;\n      font-size: 13px;\n      font-weight: 600;\n      color: #1f2937;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .stats-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 12px;\n    }\n\n    .stat-item[_ngcontent-%COMP%] {\n      padding: 12px;\n      background: #f9fafb;\n      border-radius: 6px;\n    }\n\n    .stat-label[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: #6b7280;\n      margin-bottom: 4px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      font-weight: 600;\n    }\n\n    .stat-value[_ngcontent-%COMP%] {\n      font-size: 16px;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .stat-value.earned[_ngcontent-%COMP%] {\n      color: #047857;\n    }\n\n    .stat-value.redeemed[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .tabs-section[_ngcontent-%COMP%] {\n      padding-bottom: 20px;\n    }\n\n    .tabs-header[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 0;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 16px;\n    }\n\n    .tab-btn[_ngcontent-%COMP%] {\n      flex: 1;\n      padding: 12px 16px;\n      background: none;\n      border: none;\n      border-bottom: 2px solid transparent;\n      font-size: 13px;\n      font-weight: 500;\n      color: #6b7280;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .tab-btn[_ngcontent-%COMP%]:hover {\n      color: #1f2937;\n    }\n\n    .tab-btn.active[_ngcontent-%COMP%] {\n      color: #4b5563;\n      border-bottom-color: #4b5563;\n    }\n\n    .tab-content[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_slideIn 0.2s ease;\n    }\n\n    @keyframes _ngcontent-%COMP%_slideIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .info-group[_ngcontent-%COMP%] {\n      margin-bottom: 16px;\n    }\n\n    .info-group[_ngcontent-%COMP%]:last-child {\n      margin-bottom: 0;\n    }\n\n    .info-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 11px;\n      font-weight: 600;\n      color: #6b7280;\n      margin-bottom: 4px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .info-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 14px;\n      color: #1f2937;\n    }\n\n    .placeholder[_ngcontent-%COMP%] {\n      color: #9ca3af;\n      font-size: 13px;\n      text-align: center;\n      padding: 20px;\n    }\n\n    \n\n    .loading-transactions[_ngcontent-%COMP%], \n   .no-transactions[_ngcontent-%COMP%] {\n      text-align: center;\n      padding: 20px;\n      color: #6b7280;\n    }\n\n    .spinner-small[_ngcontent-%COMP%] {\n      width: 24px;\n      height: 24px;\n      border: 2px solid #f3f4f6;\n      border-top: 2px solid #4b5563;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n      margin: 0 auto 8px;\n    }\n\n    .transactions-list[_ngcontent-%COMP%] {\n      max-height: 400px;\n      overflow-y: auto;\n    }\n\n    .transaction-item[_ngcontent-%COMP%] {\n      padding: 12px;\n      border-bottom: 1px solid #e5e7eb;\n      transition: background 0.2s ease;\n    }\n\n    .transaction-item[_ngcontent-%COMP%]:hover {\n      background: #f9fafb;\n    }\n\n    .transaction-item[_ngcontent-%COMP%]:last-child {\n      border-bottom: none;\n    }\n\n    .transaction-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 4px;\n    }\n\n    .transaction-type[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .transaction-amount[_ngcontent-%COMP%] {\n      font-size: 14px;\n      font-weight: 700;\n    }\n\n    .transaction-amount.positive[_ngcontent-%COMP%] {\n      color: #047857;\n    }\n\n    .transaction-amount.negative[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .transaction-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 12px;\n      color: #6b7280;\n    }\n\n    .transaction-reason[_ngcontent-%COMP%] {\n      margin-bottom: 2px !important;\n      color: #374151 !important;\n    }\n\n    .transaction-date[_ngcontent-%COMP%] {\n      color: #9ca3af !important;\n    }\n\n    .drawer-loading[_ngcontent-%COMP%], \n   .drawer-error[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 20px;\n      gap: 12px;\n    }\n\n    .drawer-error[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .drawer-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      text-align: center;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 32px;\n      height: 32px;\n      border: 3px solid #f3f4f6;\n      border-top: 3px solid #4b5563;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n      margin-bottom: 12px;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .drawer-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0 0 12px;\n      color: #dc2626;\n      text-align: center;\n    }\n\n    .drawer-footer[_ngcontent-%COMP%] {\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n    }\n\n    .btn-primary[_ngcontent-%COMP%], \n   .btn-secondary[_ngcontent-%COMP%], \n   .btn-danger[_ngcontent-%COMP%] {\n      padding: 10px 16px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .btn-primary[_ngcontent-%COMP%] {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: #3a4251;\n    }\n\n    .btn-secondary[_ngcontent-%COMP%] {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-secondary[_ngcontent-%COMP%]:hover {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .btn-danger[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .btn-danger[_ngcontent-%COMP%]:hover {\n      background: #fecaca;\n    }\n\n    \n\n    .edit-form[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 16px;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 4px;\n    }\n\n    .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      color: #374151;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .form-input[_ngcontent-%COMP%] {\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      font-family: inherit;\n      transition: all 0.2s ease;\n    }\n\n    .form-input[_ngcontent-%COMP%]:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 2px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input[_ngcontent-%COMP%]:disabled, \n   .form-input.disabled-field[_ngcontent-%COMP%] {\n      background: #f3f4f6;\n      color: #6b7280;\n      cursor: not-allowed;\n    }\n\n    .form-input.error[_ngcontent-%COMP%] {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid[_ngcontent-%COMP%] {\n      border-color: #16a34a;\n    }\n\n    .label-row[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 4px;\n    }\n\n    .label-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      margin-bottom: 0;\n    }\n\n    .char-counter[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    .char-counter.warning[_ngcontent-%COMP%] {\n      color: #f59e0b;\n    }\n\n    .char-counter.valid[_ngcontent-%COMP%] {\n      color: #16a34a;\n    }\n\n    .readonly-hint[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 11px;\n      color: #9ca3af;\n      margin-top: 4px;\n      font-style: italic;\n    }\n\n    .error-text[_ngcontent-%COMP%] {\n      font-size: 12px;\n      color: #dc2626;\n    }\n\n    .edit-error[_ngcontent-%COMP%] {\n      padding: 10px 12px;\n      background: #fee2e2;\n      color: #dc2626;\n      border-radius: 6px;\n      font-size: 13px;\n    }\n\n    .form-actions[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 12px;\n      margin-top: 12px;\n    }\n\n    .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      flex: 1;\n    }\n\n    .no-roles[_ngcontent-%COMP%] {\n      color: #9ca3af;\n      font-size: 12px;\n      font-style: italic;\n    }\n\n    .btn-primary[_ngcontent-%COMP%]:disabled, \n   .btn-secondary[_ngcontent-%COMP%]:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    @media (max-width: 640px) {\n      .drawer[_ngcontent-%COMP%] {\n        width: 100%;\n        right: -100%;\n      }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserDetailDrawerComponent, [{
        type: Component,
        args: [{ selector: 'app-user-detail-drawer', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationHintComponent, FormErrorsSummaryComponent], template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="closeDrawer()"></div>
    <div class="drawer" [class.open]="isOpen">
      <div class="drawer-header">
        <h2>{{ isEditMode ? 'Edit User' : 'User Details' }}</h2>
        <button class="close-btn" (click)="closeDrawer()">✕</button>
      </div>

      <!-- View Mode -->
      <ng-container *ngIf="!isLoading && !error && userDetails && !isEditMode">
        <div class="drawer-content">
          <!-- User Profile Section -->
          <div class="profile-section">
            <div class="avatar-large">{{ getInitials() }}</div>
            <div class="profile-info">
              <h3>{{ userDetails.user?.firstName || '' }} {{ userDetails.user?.lastName || '' }}</h3>
              <p class="email">{{ userDetails.user?.email || '' }}</p>
              <p class="employee-id">ID: {{ userDetails.user?.employeeId || '' }}</p>
            </div>
            <button class="edit-btn" (click)="enterEditMode()">✎ Edit</button>
          </div>

          <!-- Roles and Status -->
          <div class="meta-section">
            <div class="meta-row">
              <span class="label">Roles:</span>
              <div class="roles">
                <span *ngFor="let role of userDetails.user?.roles || []" class="role-chip">{{ role }}</span>
                <span *ngIf="!userDetails.user?.roles?.length" class="no-roles">No roles assigned</span>
              </div>
            </div>
            <div class="meta-row">
              <span class="label">Status:</span>
              <div class="status-toggle">
                <span class="status-badge" [class.active]="userDetails.user?.isActive" [class.inactive]="!userDetails.user?.isActive">
                  {{ userDetails.user?.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="stats-section">
            <h4>Points Account</h4>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-label">Current Balance</div>
                <div class="stat-value">{{ userDetails.points?.current ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Total Earned</div>
                <div class="stat-value earned">+{{ userDetails.points?.earned ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Total Redeemed</div>
                <div class="stat-value redeemed">-{{ userDetails.points?.redeemed ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Transactions</div>
                <div class="stat-value">{{ userDetails.transactionCount ?? 0 }}</div>
              </div>
            </div>
          </div>

        <!-- Tabs Section -->
        <div class="tabs-section">
          <div class="tabs-header">
            <button
              class="tab-btn"
              [class.active]="activeTab === 'profile'"
              (click)="activeTab = 'profile'"
            >
              Profile
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'points'"
              (click)="activeTab = 'points'"
            >
              Points
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'activity'"
              (click)="activeTab = 'activity'"
            >
              Activity
            </button>
          </div>

          <!-- Profile Tab -->
          <div *ngIf="activeTab === 'profile'" class="tab-content">
            <div class="info-group">
              <label>First Name</label>
              <p>{{ userDetails.user?.firstName || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Last Name</label>
              <p>{{ userDetails.user?.lastName || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Email Address</label>
              <p>{{ userDetails.user?.email || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Employee ID</label>
              <p>{{ userDetails.user?.employeeId || '-' }}</p>
            </div>
            <div class="info-group" *ngIf="userDetails.user?.createdAt">
              <label>Created</label>
              <p>{{ userDetails.user?.createdAt | date: 'medium' }}</p>
            </div>
          </div>

          <!-- Points Tab -->
          <div *ngIf="activeTab === 'points'" class="tab-content">
            <div class="info-group">
              <label>Current Balance</label>
              <p>{{ userDetails.points?.current ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Earned</label>
              <p>{{ userDetails.points?.earned ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Redeemed</label>
              <p>{{ userDetails.points?.redeemed ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Net Points</label>
              <p>{{ ((userDetails.points?.earned ?? 0) - (userDetails.points?.redeemed ?? 0)) | number }} points</p>
            </div>
          </div>

          <!-- Activity Tab -->
          <div *ngIf="activeTab === 'activity'" class="tab-content">
            <div class="info-group">
              <label>Total Transactions</label>
              <p>{{ userDetails.transactionCount ?? 0 }}</p>
            </div>
            
            <div *ngIf="isLoadingTransactions" class="loading-transactions">
              <div class="spinner-small"></div>
              <p>Loading transactions...</p>
            </div>

            <div *ngIf="!isLoadingTransactions && transactions.length === 0" class="no-transactions">
              <p>No transactions found</p>
            </div>

            <div *ngIf="!isLoadingTransactions && transactions.length > 0" class="transactions-list">
              <div *ngFor="let transaction of transactions" class="transaction-item">
                <div class="transaction-header">
                  <span class="transaction-type" [class.positive]="transaction.amount > 0" [class.negative]="transaction.amount < 0">
                    {{ transaction.transactionType || transaction.type }}
                  </span>
                  <span class="transaction-amount" [class.positive]="transaction.amount > 0" [class.negative]="transaction.amount < 0">
                    {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount }}
                  </span>
                </div>
                <div class="transaction-details">
                  <p class="transaction-reason">{{ transaction.reason || transaction.description || 'No description' }}</p>
                  <p class="transaction-date">{{ transaction.createdAt || transaction.timestamp | date:'medium' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ng-container>

      <!-- Edit Mode -->
      <ng-container *ngIf="!isLoading && !error && userDetails && isEditMode">
        <div class="drawer-content">
          <form [formGroup]="editForm" (ngSubmit)="saveEdit()" class="edit-form">
            <div class="form-group">
              <div class="label-row">
                <label for="firstName">First Name *</label>
                <span class="char-counter" 
                      [class.warning]="getCharCount('firstName') > 0 && getCharCount('firstName') < minNameLength"
                      [class.valid]="getCharCount('firstName') >= minNameLength"
                      aria-live="polite">
                  {{ getCharCount('firstName') }} / {{ maxNameLength }}
                </span>
              </div>
              <input 
                type="text" 
                id="firstName" 
                formControlName="firstName" 
                class="form-input"
                [class.error]="editForm.get('firstName')?.invalid && editForm.get('firstName')?.touched"
                [class.valid]="editForm.get('firstName')?.valid && editForm.get('firstName')?.dirty"
                [attr.maxlength]="maxNameLength"
                aria-describedby="edit-firstName-hint"
              />
              <app-validation-hint
                id="edit-firstName-hint"
                [control]="editForm.get('firstName')!"
                fieldName="First name"
                fieldType="name"
                [minLength]="minNameLength"
                [maxLength]="maxNameLength">
              </app-validation-hint>
            </div>
            <div class="form-group">
              <div class="label-row">
                <label for="lastName">Last Name *</label>
                <span class="char-counter" 
                      [class.warning]="getCharCount('lastName') > 0 && getCharCount('lastName') < minNameLength"
                      [class.valid]="getCharCount('lastName') >= minNameLength"
                      aria-live="polite">
                  {{ getCharCount('lastName') }} / {{ maxNameLength }}
                </span>
              </div>
              <input 
                type="text" 
                id="lastName" 
                formControlName="lastName" 
                class="form-input"
                [class.error]="editForm.get('lastName')?.invalid && editForm.get('lastName')?.touched"
                [class.valid]="editForm.get('lastName')?.valid && editForm.get('lastName')?.dirty"
                [attr.maxlength]="maxNameLength"
                aria-describedby="edit-lastName-hint"
              />
              <app-validation-hint
                id="edit-lastName-hint"
                [control]="editForm.get('lastName')!"
                fieldName="Last name"
                fieldType="name"
                [minLength]="minNameLength"
                [maxLength]="maxNameLength">
              </app-validation-hint>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                class="form-input disabled-field"
                readonly
              />
              <span class="readonly-hint">Email cannot be changed. Contact support if needed.</span>
            </div>
            <div class="form-group">
              <label for="employeeId">Employee ID</label>
              <input 
                type="text" 
                id="employeeId" 
                formControlName="employeeId" 
                class="form-input disabled-field"
                readonly
              />
              <span class="readonly-hint">Employee ID cannot be changed. Contact support if needed.</span>
            </div>

            <!-- Form Errors Summary -->
            <app-form-errors-summary
              [form]="editForm"
              [fieldLabels]="editFormFieldLabels"
              title="Please fix the following errors:">
            </app-form-errors-summary>

            <div *ngIf="editError" class="edit-error" role="alert">{{ editError }}</div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="cancelEdit()" [disabled]="isSaving">Cancel</button>
              <button type="submit" class="btn-primary" [disabled]="!canSaveEdit">
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </ng-container>

      <!-- Loading State -->
      <div class="drawer-loading" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading user details...</p>
      </div>

      <!-- Error State -->
      <div class="drawer-error" *ngIf="error && !isLoading">
        <p>{{ error }}</p>
        <button class="btn-secondary" (click)="retryLoad()">Retry</button>
        <button class="btn-secondary" (click)="closeDrawer()">Close</button>
      </div>

      <!-- Footer Actions -->
      <div class="drawer-footer" *ngIf="userDetails && !isLoading && !isEditMode">
        <button class="btn-secondary" (click)="onAction('assign-roles')">Assign Roles</button>
        <button
          class="btn-danger"
          (click)="onAction('deactivate')"
          *ngIf="userDetails.user?.isActive"
        >
          Deactivate User
        </button>
      </div>
    </div>
  `, styles: ["\n    .drawer-overlay {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      z-index: 99;\n      animation: fadeIn 0.2s ease;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .drawer {\n      position: fixed;\n      top: 0;\n      right: -400px;\n      width: 400px;\n      height: 100vh;\n      background: white;\n      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);\n      z-index: 100;\n      display: flex;\n      flex-direction: column;\n      transition: right 0.3s ease;\n    }\n\n    .drawer.open {\n      right: 0;\n    }\n\n    .drawer-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 20px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    .drawer-header h2 {\n      margin: 0;\n      font-size: 18px;\n      color: #1f2937;\n    }\n\n    .close-btn {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      color: #6b7280;\n      padding: 0;\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      transition: color 0.2s ease;\n    }\n\n    .close-btn:hover {\n      color: #1f2937;\n    }\n\n    .drawer-content {\n      flex: 1;\n      overflow-y: auto;\n      padding: 20px;\n    }\n\n    .profile-section {\n      text-align: center;\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .avatar-large {\n      width: 80px;\n      height: 80px;\n      border-radius: 50%;\n      background: #4b5563;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 32px;\n      font-weight: 700;\n      margin: 0 auto 12px;\n    }\n\n    .profile-info h3 {\n      margin: 0 0 4px;\n      font-size: 16px;\n      color: #1f2937;\n    }\n\n    .profile-info p {\n      margin: 0;\n      font-size: 13px;\n      color: #6b7280;\n    }\n\n    .email {\n      font-weight: 500;\n    }\n\n    .employee-id {\n      color: #9ca3af;\n    }\n\n    .edit-btn {\n      margin-top: 12px;\n      padding: 8px 12px;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .edit-btn:hover {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .meta-section {\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .meta-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 12px;\n      gap: 12px;\n    }\n\n    .meta-row:last-child {\n      margin-bottom: 0;\n    }\n\n    .label {\n      font-size: 12px;\n      font-weight: 600;\n      color: #6b7280;\n      text-transform: uppercase;\n      min-width: 60px;\n    }\n\n    .roles {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 6px;\n      flex: 1;\n    }\n\n    .role-chip {\n      display: inline-block;\n      padding: 4px 8px;\n      background: #dbeafe;\n      color: #1e40af;\n      border-radius: 4px;\n      font-size: 11px;\n      font-weight: 500;\n    }\n\n    .role-chip:has-text('Employee') {\n      background: #dbeafe;\n      color: #1e40af;\n    }\n\n    .status-badge {\n      display: inline-block;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n    }\n\n    .status-badge.active {\n      background: #d1fae5;\n      color: #047857;\n    }\n\n    .status-badge.inactive {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .stats-section {\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 20px;\n    }\n\n    .stats-section h4 {\n      margin: 0 0 12px;\n      font-size: 13px;\n      font-weight: 600;\n      color: #1f2937;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .stats-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 12px;\n    }\n\n    .stat-item {\n      padding: 12px;\n      background: #f9fafb;\n      border-radius: 6px;\n    }\n\n    .stat-label {\n      font-size: 11px;\n      color: #6b7280;\n      margin-bottom: 4px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      font-weight: 600;\n    }\n\n    .stat-value {\n      font-size: 16px;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .stat-value.earned {\n      color: #047857;\n    }\n\n    .stat-value.redeemed {\n      color: #dc2626;\n    }\n\n    .tabs-section {\n      padding-bottom: 20px;\n    }\n\n    .tabs-header {\n      display: flex;\n      gap: 0;\n      border-bottom: 1px solid #e5e7eb;\n      margin-bottom: 16px;\n    }\n\n    .tab-btn {\n      flex: 1;\n      padding: 12px 16px;\n      background: none;\n      border: none;\n      border-bottom: 2px solid transparent;\n      font-size: 13px;\n      font-weight: 500;\n      color: #6b7280;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .tab-btn:hover {\n      color: #1f2937;\n    }\n\n    .tab-btn.active {\n      color: #4b5563;\n      border-bottom-color: #4b5563;\n    }\n\n    .tab-content {\n      animation: slideIn 0.2s ease;\n    }\n\n    @keyframes slideIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .info-group {\n      margin-bottom: 16px;\n    }\n\n    .info-group:last-child {\n      margin-bottom: 0;\n    }\n\n    .info-group label {\n      display: block;\n      font-size: 11px;\n      font-weight: 600;\n      color: #6b7280;\n      margin-bottom: 4px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .info-group p {\n      margin: 0;\n      font-size: 14px;\n      color: #1f2937;\n    }\n\n    .placeholder {\n      color: #9ca3af;\n      font-size: 13px;\n      text-align: center;\n      padding: 20px;\n    }\n\n    /* Transaction Styles */\n    .loading-transactions,\n    .no-transactions {\n      text-align: center;\n      padding: 20px;\n      color: #6b7280;\n    }\n\n    .spinner-small {\n      width: 24px;\n      height: 24px;\n      border: 2px solid #f3f4f6;\n      border-top: 2px solid #4b5563;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n      margin: 0 auto 8px;\n    }\n\n    .transactions-list {\n      max-height: 400px;\n      overflow-y: auto;\n    }\n\n    .transaction-item {\n      padding: 12px;\n      border-bottom: 1px solid #e5e7eb;\n      transition: background 0.2s ease;\n    }\n\n    .transaction-item:hover {\n      background: #f9fafb;\n    }\n\n    .transaction-item:last-child {\n      border-bottom: none;\n    }\n\n    .transaction-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 4px;\n    }\n\n    .transaction-type {\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .transaction-amount {\n      font-size: 14px;\n      font-weight: 700;\n    }\n\n    .transaction-amount.positive {\n      color: #047857;\n    }\n\n    .transaction-amount.negative {\n      color: #dc2626;\n    }\n\n    .transaction-details p {\n      margin: 0;\n      font-size: 12px;\n      color: #6b7280;\n    }\n\n    .transaction-reason {\n      margin-bottom: 2px !important;\n      color: #374151 !important;\n    }\n\n    .transaction-date {\n      color: #9ca3af !important;\n    }\n\n    .drawer-loading,\n    .drawer-error {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 20px;\n      gap: 12px;\n    }\n\n    .drawer-error {\n      color: #dc2626;\n    }\n\n    .drawer-error p {\n      margin: 0;\n      text-align: center;\n    }\n\n    .spinner {\n      width: 32px;\n      height: 32px;\n      border: 3px solid #f3f4f6;\n      border-top: 3px solid #4b5563;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n      margin-bottom: 12px;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .drawer-error p {\n      margin: 0 0 12px;\n      color: #dc2626;\n      text-align: center;\n    }\n\n    .drawer-footer {\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n    }\n\n    .btn-primary,\n    .btn-secondary,\n    .btn-danger {\n      padding: 10px 16px;\n      border: none;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .btn-primary {\n      background: #4b5563;\n      color: white;\n    }\n\n    .btn-primary:hover {\n      background: #3a4251;\n    }\n\n    .btn-secondary {\n      background: white;\n      border: 1px solid #e5e7eb;\n      color: #374151;\n    }\n\n    .btn-secondary:hover {\n      background: #f3f4f6;\n      border-color: #d1d5db;\n    }\n\n    .btn-danger {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .btn-danger:hover {\n      background: #fecaca;\n    }\n\n    /* Edit Form Styles */\n    .edit-form {\n      display: flex;\n      flex-direction: column;\n      gap: 16px;\n    }\n\n    .form-group {\n      display: flex;\n      flex-direction: column;\n      gap: 4px;\n    }\n\n    .form-group label {\n      font-size: 12px;\n      font-weight: 600;\n      color: #374151;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .form-input {\n      padding: 10px 12px;\n      border: 1px solid #d1d5db;\n      border-radius: 6px;\n      font-size: 14px;\n      font-family: inherit;\n      transition: all 0.2s ease;\n    }\n\n    .form-input:focus {\n      outline: none;\n      border-color: #4b5563;\n      box-shadow: 0 0 0 2px rgba(75, 85, 99, 0.1);\n    }\n\n    .form-input:disabled,\n    .form-input.disabled-field {\n      background: #f3f4f6;\n      color: #6b7280;\n      cursor: not-allowed;\n    }\n\n    .form-input.error {\n      border-color: #dc2626;\n    }\n\n    .form-input.valid {\n      border-color: #16a34a;\n    }\n\n    .label-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 4px;\n    }\n\n    .label-row label {\n      margin-bottom: 0;\n    }\n\n    .char-counter {\n      font-size: 11px;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    .char-counter.warning {\n      color: #f59e0b;\n    }\n\n    .char-counter.valid {\n      color: #16a34a;\n    }\n\n    .readonly-hint {\n      display: block;\n      font-size: 11px;\n      color: #9ca3af;\n      margin-top: 4px;\n      font-style: italic;\n    }\n\n    .error-text {\n      font-size: 12px;\n      color: #dc2626;\n    }\n\n    .edit-error {\n      padding: 10px 12px;\n      background: #fee2e2;\n      color: #dc2626;\n      border-radius: 6px;\n      font-size: 13px;\n    }\n\n    .form-actions {\n      display: flex;\n      gap: 12px;\n      margin-top: 12px;\n    }\n\n    .form-actions button {\n      flex: 1;\n    }\n\n    .no-roles {\n      color: #9ca3af;\n      font-size: 12px;\n      font-style: italic;\n    }\n\n    .btn-primary:disabled,\n    .btn-secondary:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    @media (max-width: 640px) {\n      .drawer {\n        width: 100%;\n        right: -100%;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.AdminUsersService }, { type: i2.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], { isOpen: [{
            type: Input
        }], userId: [{
            type: Input
        }], actionTriggered: [{
            type: Output
        }], closed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserDetailDrawerComponent, { className: "UserDetailDrawerComponent", filePath: "src/app/pages/admin/users/components/user-detail-drawer.component.ts", lineNumber: 938 }); })();
//# sourceMappingURL=user-detail-drawer.component.js.map