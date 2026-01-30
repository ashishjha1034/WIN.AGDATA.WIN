import { Component } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/auth.service";
import * as i2 from "../../../services/user-dashboard.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function UserTransactionsComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "div", 22);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading transactions...");
    i0.ɵɵelementEnd()();
} }
function UserTransactionsComponent_div_22_tr_54_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 59);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_tr_54_Template_tr_click_0_listener() { const transaction_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openTransactionDetail(transaction_r4)); });
    i0.ɵɵelementStart(1, "td", 51);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 52)(5, "div", 60)(6, "span", 61);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 62);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "td", 53)(11, "span", 63);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td", 64);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 55);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const transaction_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 9, transaction_r4.timestamp, "MMM d, yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r1.getSourceClass(transaction_r4.source));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getSourceIcon(transaction_r4.source), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(transaction_r4.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.getTypeBadgeClass(transaction_r4.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getTypeLabel(transaction_r4.type), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.getTransactionClass(transaction_r4.points));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatPoints(transaction_r4.points), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 12, transaction_r4.balanceAfter), " pts ");
} }
function UserTransactionsComponent_div_22_div_55_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1, "Try adjusting your filters");
    i0.ɵɵelementEnd();
} }
function UserTransactionsComponent_div_22_div_55_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1, "Your transaction history will appear here");
    i0.ɵɵelementEnd();
} }
function UserTransactionsComponent_div_22_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 66);
    i0.ɵɵelement(2, "path", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "p", 68);
    i0.ɵɵtext(4, "No transactions found");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, UserTransactionsComponent_div_22_div_55_p_5_Template, 2, 0, "p", 69)(6, UserTransactionsComponent_div_22_div_55_p_6_Template, 2, 0, "p", 69);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.hasFiltersApplied);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.hasFiltersApplied);
} }
function UserTransactionsComponent_div_22_div_56_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 82);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r6);
} }
function UserTransactionsComponent_div_22_div_56_button_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_div_56_button_16_Template_button_click_0_listener() { const page_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.goToPage(page_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", page_r8 === ctx_r1.currentPage)("ellipsis", page_r8 === "...");
    i0.ɵɵproperty("disabled", page_r8 === "...");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r8, " ");
} }
function UserTransactionsComponent_div_22_div_56_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71)(1, "div", 72);
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " transactions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 73)(7, "div", 74)(8, "span");
    i0.ɵɵtext(9, "Rows per page:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 75);
    i0.ɵɵtwoWayListener("ngModelChange", function UserTransactionsComponent_div_22_div_56_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.pageSize, $event) || (ctx_r1.pageSize = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function UserTransactionsComponent_div_22_div_56_Template_select_change_10_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onPageSizeChange()); });
    i0.ɵɵtemplate(11, UserTransactionsComponent_div_22_div_56_option_11_Template, 2, 2, "option", 76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 77)(13, "button", 78);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_div_56_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.previousPage()); });
    i0.ɵɵtext(14, " < ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 79);
    i0.ɵɵtemplate(16, UserTransactionsComponent_div_22_div_56_button_16_Template, 2, 6, "button", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 81);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_div_56_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.nextPage()); });
    i0.ɵɵtext(18, " > ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Showing ", ctx_r1.showingFrom, "\u2013", ctx_r1.showingTo, " of ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.totalTransactions);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.visiblePages);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
} }
function UserTransactionsComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 24)(2, "div", 25);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 26);
    i0.ɵɵelement(4, "path", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span", 28);
    i0.ɵɵtext(6, "Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 29);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 30);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(11, "svg", 31);
    i0.ɵɵelement(12, "rect", 32)(13, "line", 33)(14, "line", 34)(15, "line", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(16, "input", 36);
    i0.ɵɵtwoWayListener("ngModelChange", function UserTransactionsComponent_div_22_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.filters.startDate, $event) || (ctx_r1.filters.startDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function UserTransactionsComponent_div_22_Template_input_change_16_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDateChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 37);
    i0.ɵɵtext(18, "-");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "input", 38);
    i0.ɵɵtwoWayListener("ngModelChange", function UserTransactionsComponent_div_22_Template_input_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.filters.endDate, $event) || (ctx_r1.filters.endDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function UserTransactionsComponent_div_22_Template_input_change_19_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDateChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 39);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(21, "svg", 40);
    i0.ɵɵelement(22, "circle", 41)(23, "path", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(24, "input", 43);
    i0.ɵɵtwoWayListener("ngModelChange", function UserTransactionsComponent_div_22_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.filters.searchQuery, $event) || (ctx_r1.filters.searchQuery = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function UserTransactionsComponent_div_22_Template_input_input_24_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSearchChange()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 44)(26, "div", 45)(27, "button", 46);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setTypeFilter("all")); });
    i0.ɵɵtext(28, " All ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 46);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setTypeFilter("earned")); });
    i0.ɵɵtext(30, " Earned ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "button", 46);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setTypeFilter("redeemed")); });
    i0.ɵɵtext(32, " Redeemed ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 47);
    i0.ɵɵtext(34, " Dates ");
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(35, "svg", 14);
    i0.ɵɵelement(36, "path", 15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(37, "button", 48);
    i0.ɵɵlistener("click", function UserTransactionsComponent_div_22_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵtext(38, " Reset Filters ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 49)(40, "table", 50)(41, "thead")(42, "tr")(43, "th", 51);
    i0.ɵɵtext(44, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "th", 52);
    i0.ɵɵtext(46, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "th", 53);
    i0.ɵɵtext(48, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "th", 54);
    i0.ɵɵtext(50, "Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "th", 55);
    i0.ɵɵtext(52, "Balance After");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "tbody");
    i0.ɵɵtemplate(54, UserTransactionsComponent_div_22_tr_54_Template, 18, 14, "tr", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(55, UserTransactionsComponent_div_22_div_55_Template, 7, 2, "div", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, UserTransactionsComponent_div_22_div_56_Template, 19, 8, "div", 58);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(9, 14, ctx_r1.stats == null ? null : ctx_r1.stats.currentBalance), " pts");
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.filters.startDate);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.filters.endDate);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.filters.searchQuery);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.filters.type === "all");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.filters.type === "earned");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.filters.type === "redeemed");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", !ctx_r1.hasFiltersApplied);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r1.paginatedTransactions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.filteredTransactions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.filteredTransactions.length > 0);
} }
function UserTransactionsComponent_aside_24_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 84)(1, "div", 85)(2, "h2", 86);
    i0.ɵɵtext(3, "Transaction Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 87);
    i0.ɵɵlistener("click", function UserTransactionsComponent_aside_24_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDrawer()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(5, "svg", 5);
    i0.ɵɵelement(6, "line", 88)(7, "line", 89);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "div", 90)(9, "div", 91)(10, "span", 92);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "h3", 93);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 94)(15, "div", 95)(16, "span", 96);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 97);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 98)(21, "div", 99)(22, "span", 28);
    i0.ɵɵtext(23, "Balance Before");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 29);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(27, "svg", 100);
    i0.ɵɵelement(28, "path", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(29, "div", 99)(30, "span", 28);
    i0.ɵɵtext(31, "Balance After");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 29);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(35, "div", 102)(36, "div", 103)(37, "span", 104);
    i0.ɵɵtext(38, "Date & Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 105);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 103)(42, "span", 104);
    i0.ɵɵtext(43, "Transaction Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "span", 105)(45, "span", 63);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "div", 103)(48, "span", 104);
    i0.ɵɵtext(49, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span", 105);
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div", 103)(53, "span", 104);
    i0.ɵɵtext(54, "Processed By");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span", 105);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "div", 106)(58, "span", 104);
    i0.ɵɵtext(59, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p", 107);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "div", 108)(63, "span", 109);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open", ctx_r1.isDrawerOpen);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngClass", ctx_r1.getSourceClass(ctx_r1.selectedTransaction.source));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getSourceIcon(ctx_r1.selectedTransaction.source), " ", ctx_r1.selectedTransaction.source, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.getTransactionClass(ctx_r1.selectedTransaction.points));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Points ", ctx_r1.selectedTransaction.points >= 0 ? "Earned" : "Spent");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatPoints(ctx_r1.selectedTransaction.points));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(26, 18, ctx_r1.selectedTransaction.balanceAfter - ctx_r1.selectedTransaction.points), " pts");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(34, 20, ctx_r1.selectedTransaction.balanceAfter), " pts");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.formatFullDate(ctx_r1.selectedTransaction.timestamp));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r1.getTypeBadgeClass(ctx_r1.selectedTransaction.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getTypeLabel(ctx_r1.selectedTransaction.type), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.source);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.getProcessedByLabel(ctx_r1.selectedTransaction.processedBy));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTransaction.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Transaction ID: ", ctx_r1.selectedTransaction.id);
} }
export class UserTransactionsComponent {
    constructor(authService, userDashboardService, router, cdr) {
        this.authService = authService;
        this.userDashboardService = userDashboardService;
        this.router = router;
        this.cdr = cdr;
        this.transactions = [];
        this.filteredTransactions = [];
        this.stats = null;
        this.isLoading = true;
        // Filters
        this.filters = {
            type: 'all',
            startDate: null,
            endDate: null,
            searchQuery: ''
        };
        // Pagination
        this.currentPage = 1;
        this.pageSize = 20;
        this.totalTransactions = 0;
        this.pageSizeOptions = [10, 20, 50, 100];
        // Detail drawer
        this.selectedTransaction = null;
        this.isDrawerOpen = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.loadData();
            }
        });
    }
    loadData() {
        this.isLoading = true;
        forkJoin({
            transactions: this.userDashboardService.getAllTransactions(),
            stats: this.userDashboardService.getUserStats()
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            setTimeout(() => {
                this.isLoading = false;
                this.cdr.detectChanges();
            }, 0);
        }))
            .subscribe({
            next: ({ transactions, stats }) => {
                // Map and calculate balanceAfter for each transaction
                this.transactions = this.processTransactions(transactions, stats.currentBalance);
                this.stats = stats;
                this.applyFilters();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading data:', error);
            }
        });
    }
    processTransactions(transactions, currentBalance) {
        // Sort by timestamp descending (newest first)
        const sorted = [...transactions].sort((a, b) => new Date(b.createdAt || b.timestamp).getTime() - new Date(a.createdAt || a.timestamp).getTime());
        // Calculate balance after for each transaction (going backwards from current)
        let runningBalance = currentBalance;
        const processed = sorted.map(t => {
            const amount = t.points ?? t.amount ?? 0;
            const balanceAfter = t.balanceAfter ?? runningBalance;
            runningBalance = balanceAfter - amount; // Calculate what balance was before this transaction
            return {
                id: t.id,
                type: t.type || 'Transaction',
                description: t.description || t.type || '',
                points: amount,
                amount: amount,
                source: t.source || this.inferSource(t.description || t.type || ''),
                sourceId: t.sourceId || null,
                balanceAfter: balanceAfter,
                processedBy: t.processedBy || null,
                timestamp: t.createdAt || t.timestamp
            };
        });
        return processed;
    }
    inferSource(description) {
        const desc = description.toLowerCase();
        if (desc.includes('event') || desc.includes('participation') || desc.includes('contest') ||
            desc.includes('challenge') || desc.includes('bonus points') || desc.includes('quarterly')) {
            return 'Event';
        }
        if (desc.includes('redemption') || desc.includes('gift card') || desc.includes('reward')) {
            return 'Product';
        }
        if (desc.includes('admin') || desc.includes('adjustment')) {
            return 'Admin';
        }
        return 'System';
    }
    applyFilters() {
        let filtered = [...this.transactions];
        // Filter by type
        if (this.filters.type !== 'all') {
            filtered = filtered.filter(t => {
                const type = t.type.toLowerCase();
                if (this.filters.type === 'earned') {
                    return type === 'earned' || t.points > 0;
                }
                else if (this.filters.type === 'redeemed') {
                    return type === 'redeemed' || t.points < 0;
                }
                return true;
            });
        }
        // Filter by date range
        if (this.filters.startDate) {
            const start = new Date(this.filters.startDate);
            start.setHours(0, 0, 0, 0);
            filtered = filtered.filter(t => new Date(t.timestamp) >= start);
        }
        if (this.filters.endDate) {
            const end = new Date(this.filters.endDate);
            end.setHours(23, 59, 59, 999);
            filtered = filtered.filter(t => new Date(t.timestamp) <= end);
        }
        // Filter by search query
        if (this.filters.searchQuery.trim()) {
            const query = this.filters.searchQuery.toLowerCase();
            filtered = filtered.filter(t => t.description.toLowerCase().includes(query) ||
                t.source.toLowerCase().includes(query));
        }
        this.totalTransactions = filtered.length;
        this.filteredTransactions = filtered;
        // Reset to first page when filters change
        this.currentPage = 1;
    }
    get paginatedTransactions() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredTransactions.slice(start, end);
    }
    get totalPages() {
        return Math.ceil(this.totalTransactions / this.pageSize);
    }
    get showingFrom() {
        if (this.totalTransactions === 0)
            return 0;
        return (this.currentPage - 1) * this.pageSize + 1;
    }
    get showingTo() {
        const to = this.currentPage * this.pageSize;
        return Math.min(to, this.totalTransactions);
    }
    get hasFiltersApplied() {
        return this.filters.type !== 'all' ||
            this.filters.startDate !== null ||
            this.filters.endDate !== null ||
            this.filters.searchQuery.trim() !== '';
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
            // Always show first page
            pages.push(1);
            if (current > 3) {
                pages.push('...');
            }
            // Show pages around current
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            if (current < total - 2) {
                pages.push('...');
            }
            // Always show last page
            if (!pages.includes(total)) {
                pages.push(total);
            }
        }
        return pages;
    }
    // Filter actions
    setTypeFilter(type) {
        this.filters.type = type;
        this.applyFilters();
    }
    onSearchChange() {
        this.applyFilters();
    }
    onDateChange() {
        this.applyFilters();
    }
    resetFilters() {
        this.filters = {
            type: 'all',
            startDate: null,
            endDate: null,
            searchQuery: ''
        };
        this.applyFilters();
    }
    // Pagination actions
    goToPage(page) {
        if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
    onPageSizeChange() {
        this.currentPage = 1;
    }
    // Transaction detail drawer
    openTransactionDetail(transaction) {
        this.selectedTransaction = transaction;
        this.isDrawerOpen = true;
    }
    closeDrawer() {
        this.isDrawerOpen = false;
        setTimeout(() => {
            this.selectedTransaction = null;
        }, 300);
    }
    onOverlayClick(event) {
        if (event.target.classList.contains('drawer-overlay')) {
            this.closeDrawer();
        }
    }
    // Helper methods
    getTransactionClass(points) {
        return points >= 0 ? 'positive' : 'negative';
    }
    formatPoints(points) {
        const prefix = points > 0 ? '+' : '';
        return `${prefix}${points.toLocaleString()}`;
    }
    getSourceIcon(source) {
        switch (source.toLowerCase()) {
            case 'event':
                return '📅';
            case 'product':
                return '🎁';
            case 'admin':
                return '⚙️';
            default:
                return '📋';
        }
    }
    getSourceClass(source) {
        return `source-${source.toLowerCase()}`;
    }
    getTypeLabel(type) {
        const typeLower = type.toLowerCase();
        if (typeLower === 'earned')
            return 'Earned';
        if (typeLower === 'redeemed')
            return 'Redeemed';
        return type;
    }
    getTypeBadgeClass(type) {
        const typeLower = type.toLowerCase();
        if (typeLower === 'earned')
            return 'type-earned';
        if (typeLower === 'redeemed')
            return 'type-redeemed';
        return '';
    }
    formatFullDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    getProcessedByLabel(processedBy) {
        if (!processedBy)
            return 'System';
        return 'Admin';
    }
    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserTransactionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserTransactionsComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.UserDashboardService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserTransactionsComponent, selectors: [["app-user-transactions"]], decls: 25, vars: 9, consts: [[1, "user-page-wrapper"], [1, "user-page-main"], [1, "page-header"], [1, "header-left"], ["aria-label", "Toggle menu", 1, "menu-toggle"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"], [1, "header-title"], [1, "header-right"], [1, "welcome-text"], [1, "user-avatar", 3, "title"], ["aria-label", "User menu", 1, "avatar-dropdown-btn"], ["viewBox", "0 0 24 24", "fill", "currentColor", "width", "16", "height", "16"], ["d", "M7 10l5 5 5-5z"], [1, "page-content"], ["class", "loading-container", 4, "ngIf"], ["class", "transactions-container", 4, "ngIf"], [1, "drawer-overlay", 3, "click"], ["class", "transaction-drawer", 3, "open", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "transactions-container"], [1, "top-controls"], [1, "balance-badge"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "balance-icon"], ["d", "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"], [1, "balance-label"], [1, "balance-value"], [1, "date-range-picker"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "calendar-icon"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2", "stroke-width", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6", "stroke-width", "2"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6", "stroke-width", "2"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10", "stroke-width", "2"], ["type", "date", "placeholder", "From", 1, "date-input", 3, "ngModelChange", "change", "ngModel"], [1, "date-separator"], ["type", "date", "placeholder", "To", 1, "date-input", 3, "ngModelChange", "change", "ngModel"], [1, "search-box"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8", "stroke-width", "2"], ["d", "m21 21-4.35-4.35", "stroke-width", "2"], ["type", "text", "placeholder", "Search transactions", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-row"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "filter-tab", "dates-btn"], [1, "reset-filters-btn", 3, "click", "disabled"], [1, "table-container"], [1, "transactions-table"], [1, "col-date"], [1, "col-description"], [1, "col-type"], [1, "col-points"], [1, "col-balance"], ["class", "transaction-row", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination-row", 4, "ngIf"], [1, "transaction-row", 3, "click"], [1, "description-cell"], [1, "source-icon", 3, "ngClass"], [1, "description-text"], [1, "type-badge", 3, "ngClass"], [1, "col-points", 3, "ngClass"], [1, "empty-state"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "empty-icon"], ["d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", "stroke-width", "2"], [1, "empty-title"], ["class", "empty-subtitle", 4, "ngIf"], [1, "empty-subtitle"], [1, "pagination-row"], [1, "pagination-info"], [1, "pagination-controls"], [1, "rows-per-page"], [1, "page-size-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "page-navigation"], ["aria-label", "Previous page", 1, "nav-btn", 3, "click", "disabled"], [1, "page-numbers"], ["class", "page-btn", 3, "active", "ellipsis", "disabled", "click", 4, "ngFor", "ngForOf"], ["aria-label", "Next page", 1, "nav-btn", 3, "click", "disabled"], [3, "value"], [1, "page-btn", 3, "click", "disabled"], [1, "transaction-drawer"], [1, "drawer-header"], [1, "drawer-title"], ["aria-label", "Close", 1, "drawer-close", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "drawer-content"], [1, "detail-section", "title-section"], [1, "source-badge", 3, "ngClass"], [1, "transaction-title"], [1, "detail-section", "points-section"], [1, "points-change", 3, "ngClass"], [1, "points-label"], [1, "points-amount"], [1, "balance-change"], [1, "balance-item"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "arrow-icon"], ["d", "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"], [1, "detail-section", "info-grid"], [1, "info-item"], [1, "info-label"], [1, "info-value"], [1, "detail-section"], [1, "full-description"], [1, "detail-section", "footer-section"], [1, "transaction-id"]], template: function UserTransactionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-user-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "button", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(6, "svg", 5);
            i0.ɵɵelement(7, "line", 6)(8, "line", 7)(9, "line", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(10, "h1", 9);
            i0.ɵɵtext(11, "Transactions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 10)(13, "span", 11);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 12);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 13);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(18, "svg", 14);
            i0.ɵɵelement(19, "path", 15);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(20, "main", 16);
            i0.ɵɵtemplate(21, UserTransactionsComponent_div_21_Template, 4, 0, "div", 17)(22, UserTransactionsComponent_div_22_Template, 57, 16, "div", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 19);
            i0.ɵɵlistener("click", function UserTransactionsComponent_Template_div_click_23_listener($event) { return ctx.onOverlayClick($event); });
            i0.ɵɵtemplate(24, UserTransactionsComponent_aside_24_Template, 65, 22, "aside", 20);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate1("Welcome, ", (ctx.currentUser == null ? null : ctx.currentUser.firstName) || "User");
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", (ctx.currentUser == null ? null : ctx.currentUser.firstName) + " " + (ctx.currentUser == null ? null : ctx.currentUser.lastName));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2(" ", (ctx.currentUser == null ? null : ctx.currentUser.firstName == null ? null : ctx.currentUser.firstName.charAt(0)) || "", "", (ctx.currentUser == null ? null : ctx.currentUser.lastName == null ? null : ctx.currentUser.lastName.charAt(0)) || "", " ");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isDrawerOpen);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedTransaction);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgForOf, i4.NgIf, FormsModule, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, UserSidebarComponent, i4.DecimalPipe, i4.DatePipe], styles: ["\r\n\r\n\n\r\n\r\n\n\r\n.user-page-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n  overflow: hidden;\r\n}\r\n\r\n.user-page-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.menu-toggle[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: background 0.2s;\r\n}\r\n\r\n.menu-toggle[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.menu-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.header-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.avatar-dropdown-btn[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n.transactions-container[_ngcontent-%COMP%] {\r\n  max-width: 100%;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.top-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n\n\r\n.balance-badge[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  padding: 12px 20px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(44, 95, 63, 0.3);\r\n}\r\n\r\n.balance-icon[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  opacity: 0.9;\r\n}\r\n\r\n.balance-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  opacity: 0.9;\r\n}\r\n\r\n.balance-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  margin-left: 4px;\r\n}\r\n\r\n\n\r\n.date-range-picker[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 8px 16px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.calendar-icon[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-secondary);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.date-input[_ngcontent-%COMP%] {\r\n  border: none;\r\n  background: transparent;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  width: 120px;\r\n  outline: none;\r\n}\r\n\r\n.date-input[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\r\n  opacity: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.date-separator[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n\n\r\n.search-box[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 10px 16px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  flex: 1;\r\n  max-width: 300px;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-placeholder);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  border: none;\r\n  background: transparent;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  width: 100%;\r\n  outline: none;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n\r\n\r\n\n\r\n.filter-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.filter-tabs[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 4px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.filter-tab[_ngcontent-%COMP%] {\r\n  padding: 10px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-tab[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.filter-tab.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.dates-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 16px;\r\n  height: 16px;\r\n}\r\n\r\n.reset-filters-btn[_ngcontent-%COMP%] {\r\n  padding: 10px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.reset-filters-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  color: var(--ag-color-text-secondary);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.reset-filters-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\r\n\r\n\n\r\n.table-container[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  overflow: hidden;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  padding: 16px 20px;\r\n  text-align: left;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n  cursor: pointer;\r\n  transition: background 0.15s;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.transactions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  padding: 16px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  vertical-align: middle;\r\n}\r\n\r\n\n\r\n.col-date[_ngcontent-%COMP%] {\r\n  width: 140px;\r\n}\r\n\r\n.col-description[_ngcontent-%COMP%] {\r\n  width: auto;\r\n}\r\n\r\n.col-type[_ngcontent-%COMP%] {\r\n  width: 120px;\r\n}\r\n\r\n.col-points[_ngcontent-%COMP%] {\r\n  width: 100px;\r\n  text-align: right;\r\n  font-weight: 600;\r\n}\r\n\r\n.col-balance[_ngcontent-%COMP%] {\r\n  width: 140px;\r\n  text-align: right;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.description-cell[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.source-icon[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 16px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.source-icon.source-event[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n}\r\n\r\n.source-icon.source-product[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n}\r\n\r\n.source-icon.source-admin[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.source-icon.source-system[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n}\r\n\r\n.description-text[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n}\r\n\r\n\n\r\n.type-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 6px 14px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.type-badge.type-earned[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.type-badge.type-redeemed[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n\n\r\n.positive[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.negative[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n\r\n\r\n\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon[_ngcontent-%COMP%] {\r\n  width: 64px;\r\n  height: 64px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.empty-subtitle[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.pagination-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.pagination-info[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.pagination-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 600;\r\n}\r\n\r\n.pagination-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.rows-per-page[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.page-size-select[_ngcontent-%COMP%] {\r\n  padding: 6px 12px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n\r\n.page-size-select[_ngcontent-%COMP%]:focus {\r\n  border-color: var(--ag-button-primary);\r\n}\r\n\r\n.page-navigation[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.nav-btn[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.nav-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.nav-btn[_ngcontent-%COMP%]:disabled {\r\n  color: var(--ag-color-border-subtle);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-numbers[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%] {\r\n  min-width: 32px;\r\n  height: 32px;\r\n  padding: 0 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled):not(.active) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.page-btn.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.page-btn.ellipsis[_ngcontent-%COMP%] {\r\n  border: none;\r\n  background: transparent;\r\n  cursor: default;\r\n}\r\n\r\n\r\n\r\n\n\r\n.drawer-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0);\r\n  z-index: 100;\r\n  pointer-events: none;\r\n  transition: background 0.3s ease;\r\n}\r\n\r\n.drawer-overlay.open[_ngcontent-%COMP%] {\r\n  background: rgba(0, 0, 0, 0.4);\r\n  pointer-events: auto;\r\n}\r\n\r\n.transaction-drawer[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  right: -480px;\r\n  width: 480px;\r\n  max-width: 100%;\r\n  height: 100vh;\r\n  background: var(--ag-color-layer-01);\r\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);\r\n  z-index: 101;\r\n  display: flex;\r\n  flex-direction: column;\r\n  transition: right 0.3s ease;\r\n}\r\n\r\n.transaction-drawer.open[_ngcontent-%COMP%] {\r\n  right: 0;\r\n}\r\n\r\n.drawer-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.drawer-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.drawer-close[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.drawer-close[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.drawer-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.drawer-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px;\r\n}\r\n\r\n\n\r\n.detail-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n  padding-bottom: 24px;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.detail-section[_ngcontent-%COMP%]:last-child {\r\n  border-bottom: none;\r\n  margin-bottom: 0;\r\n}\r\n\r\n\n\r\n.title-section[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n.source-badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 16px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.source-badge.source-event[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.source-badge.source-product[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.source-badge.source-admin[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.source-badge.source-system[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.transaction-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.points-section[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n.points-change[_ngcontent-%COMP%] {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.points-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.points-amount[_ngcontent-%COMP%] {\r\n  font-size: 36px;\r\n  font-weight: 700;\r\n}\r\n\r\n.points-change.positive[_ngcontent-%COMP%]   .points-amount[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-change.negative[_ngcontent-%COMP%]   .points-amount[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.balance-change[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 16px;\r\n  padding: 16px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n}\r\n\r\n.balance-item[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n.balance-item[_ngcontent-%COMP%]   .balance-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 4px;\r\n}\r\n\r\n.balance-item[_ngcontent-%COMP%]   .balance-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.arrow-icon[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n\n\r\n.info-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 20px;\r\n}\r\n\r\n.info-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.info-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.info-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n\n\r\n.full-description[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  line-height: 1.6;\r\n  margin: 8px 0 0 0;\r\n}\r\n\r\n\n\r\n.footer-section[_ngcontent-%COMP%] {\r\n  border-top: 1px solid var(--ag-color-field-01);\r\n  padding-top: 16px;\r\n  margin-top: 16px;\r\n}\r\n\r\n.transaction-id[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-family: monospace;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 1024px) {\r\n  .page-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n  \r\n  .top-controls[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n  }\r\n  \r\n  .search-box[_ngcontent-%COMP%] {\r\n    max-width: 100%;\r\n    order: 3;\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    padding: 12px 16px;\r\n  }\r\n  \r\n  .header-title[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n  \r\n  .page-content[_ngcontent-%COMP%] {\r\n    padding: 16px;\r\n  }\r\n  \r\n  .filter-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n  \r\n  .filter-tabs[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n  \r\n  .reset-filters-btn[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n  \r\n  .transactions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \r\n   .transactions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    padding: 12px;\r\n  }\r\n  \r\n  .col-balance[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  \r\n  .pagination-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n    gap: 12px;\r\n  }\r\n  \r\n  .pagination-controls[_ngcontent-%COMP%] {\r\n    justify-content: space-between;\r\n  }\r\n  \r\n  .transaction-drawer[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    right: -100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .balance-badge[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n  \r\n  .date-range-picker[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n  \r\n  .filter-tab[_ngcontent-%COMP%] {\r\n    padding: 8px 12px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n  \r\n  .col-type[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  \r\n  .info-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserTransactionsComponent, [{
        type: Component,
        args: [{ selector: 'app-user-transactions', standalone: true, imports: [CommonModule, FormsModule, UserSidebarComponent], template: "<div class=\"user-page-wrapper\">\r\n  <app-user-sidebar></app-user-sidebar>\r\n\r\n  <div class=\"user-page-main\">\r\n    <!-- Header -->\r\n    <header class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <button class=\"menu-toggle\" aria-label=\"Toggle menu\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line>\r\n            <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\r\n            <line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>\r\n          </svg>\r\n        </button>\r\n        <h1 class=\"header-title\">Transactions</h1>\r\n      </div>\r\n\r\n      <div class=\"header-right\">\r\n        <span class=\"welcome-text\">Welcome, {{ currentUser?.firstName || 'User' }}</span>\r\n        <div class=\"user-avatar\" [title]=\"currentUser?.firstName + ' ' + currentUser?.lastName\">\r\n          {{ currentUser?.firstName?.charAt(0) || '' }}{{ currentUser?.lastName?.charAt(0) || '' }}\r\n        </div>\r\n        <button class=\"avatar-dropdown-btn\" aria-label=\"User menu\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" width=\"16\" height=\"16\">\r\n            <path d=\"M7 10l5 5 5-5z\"/>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"page-content\">\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"spinner\"></div>\r\n        <p>Loading transactions...</p>\r\n      </div>\r\n\r\n      <div *ngIf=\"!isLoading\" class=\"transactions-container\">\r\n        <!-- Balance & Filters Row -->\r\n        <div class=\"top-controls\">\r\n          <!-- Current Balance Badge -->\r\n          <div class=\"balance-badge\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"balance-icon\">\r\n              <path d=\"M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/>\r\n            </svg>\r\n            <span class=\"balance-label\">Current Balance</span>\r\n            <span class=\"balance-value\">{{ stats?.currentBalance | number }} pts</span>\r\n          </div>\r\n\r\n          <!-- Date Range Picker -->\r\n          <div class=\"date-range-picker\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" class=\"calendar-icon\">\r\n              <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\" stroke-width=\"2\"/>\r\n              <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\" stroke-width=\"2\"/>\r\n              <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\" stroke-width=\"2\"/>\r\n              <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\" stroke-width=\"2\"/>\r\n            </svg>\r\n            <input \r\n              type=\"date\" \r\n              class=\"date-input\" \r\n              [(ngModel)]=\"filters.startDate\"\r\n              (change)=\"onDateChange()\"\r\n              placeholder=\"From\"\r\n            />\r\n            <span class=\"date-separator\">-</span>\r\n            <input \r\n              type=\"date\" \r\n              class=\"date-input\" \r\n              [(ngModel)]=\"filters.endDate\"\r\n              (change)=\"onDateChange()\"\r\n              placeholder=\"To\"\r\n            />\r\n          </div>\r\n\r\n          <!-- Search Input -->\r\n          <div class=\"search-box\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" class=\"search-icon\">\r\n              <circle cx=\"11\" cy=\"11\" r=\"8\" stroke-width=\"2\"/>\r\n              <path d=\"m21 21-4.35-4.35\" stroke-width=\"2\"/>\r\n            </svg>\r\n            <input \r\n              type=\"text\" \r\n              class=\"search-input\" \r\n              placeholder=\"Search transactions\"\r\n              [(ngModel)]=\"filters.searchQuery\"\r\n              (input)=\"onSearchChange()\"\r\n            />\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Filter Tabs Row -->\r\n        <div class=\"filter-row\">\r\n          <div class=\"filter-tabs\">\r\n            <button \r\n              class=\"filter-tab\" \r\n              [class.active]=\"filters.type === 'all'\"\r\n              (click)=\"setTypeFilter('all')\"\r\n            >\r\n              All\r\n            </button>\r\n            <button \r\n              class=\"filter-tab\" \r\n              [class.active]=\"filters.type === 'earned'\"\r\n              (click)=\"setTypeFilter('earned')\"\r\n            >\r\n              Earned\r\n            </button>\r\n            <button \r\n              class=\"filter-tab\" \r\n              [class.active]=\"filters.type === 'redeemed'\"\r\n              (click)=\"setTypeFilter('redeemed')\"\r\n            >\r\n              Redeemed\r\n            </button>\r\n            <button class=\"filter-tab dates-btn\">\r\n              Dates\r\n              <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" width=\"16\" height=\"16\">\r\n                <path d=\"M7 10l5 5 5-5z\"/>\r\n              </svg>\r\n            </button>\r\n          </div>\r\n\r\n          <button \r\n            class=\"reset-filters-btn\"\r\n            [disabled]=\"!hasFiltersApplied\"\r\n            (click)=\"resetFilters()\"\r\n          >\r\n            Reset Filters\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Transactions Table -->\r\n        <div class=\"table-container\">\r\n          <table class=\"transactions-table\">\r\n            <thead>\r\n              <tr>\r\n                <th class=\"col-date\">Date</th>\r\n                <th class=\"col-description\">Description</th>\r\n                <th class=\"col-type\">Type</th>\r\n                <th class=\"col-points\">Points</th>\r\n                <th class=\"col-balance\">Balance After</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr \r\n                *ngFor=\"let transaction of paginatedTransactions\"\r\n                class=\"transaction-row\"\r\n                (click)=\"openTransactionDetail(transaction)\"\r\n              >\r\n                <td class=\"col-date\">\r\n                  {{ transaction.timestamp | date: 'MMM d, yyyy' }}\r\n                </td>\r\n                <td class=\"col-description\">\r\n                  <div class=\"description-cell\">\r\n                    <span class=\"source-icon\" [ngClass]=\"getSourceClass(transaction.source)\">\r\n                      {{ getSourceIcon(transaction.source) }}\r\n                    </span>\r\n                    <span class=\"description-text\">{{ transaction.description }}</span>\r\n                  </div>\r\n                </td>\r\n                <td class=\"col-type\">\r\n                  <span class=\"type-badge\" [ngClass]=\"getTypeBadgeClass(transaction.type)\">\r\n                    {{ getTypeLabel(transaction.type) }}\r\n                  </span>\r\n                </td>\r\n                <td class=\"col-points\" [ngClass]=\"getTransactionClass(transaction.points)\">\r\n                  {{ formatPoints(transaction.points) }}\r\n                </td>\r\n                <td class=\"col-balance\">\r\n                  {{ transaction.balanceAfter | number }} pts\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n\r\n          <!-- Empty State -->\r\n          <div *ngIf=\"filteredTransactions.length === 0\" class=\"empty-state\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" class=\"empty-icon\">\r\n              <path d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\" stroke-width=\"2\"/>\r\n            </svg>\r\n            <p class=\"empty-title\">No transactions found</p>\r\n            <p class=\"empty-subtitle\" *ngIf=\"hasFiltersApplied\">Try adjusting your filters</p>\r\n            <p class=\"empty-subtitle\" *ngIf=\"!hasFiltersApplied\">Your transaction history will appear here</p>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Pagination -->\r\n        <div class=\"pagination-row\" *ngIf=\"filteredTransactions.length > 0\">\r\n          <div class=\"pagination-info\">\r\n            Showing {{ showingFrom }}\u2013{{ showingTo }} of <strong>{{ totalTransactions }}</strong> transactions\r\n          </div>\r\n\r\n          <div class=\"pagination-controls\">\r\n            <div class=\"rows-per-page\">\r\n              <span>Rows per page:</span>\r\n              <select \r\n                [(ngModel)]=\"pageSize\" \r\n                (change)=\"onPageSizeChange()\"\r\n                class=\"page-size-select\"\r\n              >\r\n                <option *ngFor=\"let size of pageSizeOptions\" [value]=\"size\">{{ size }}</option>\r\n              </select>\r\n            </div>\r\n\r\n            <div class=\"page-navigation\">\r\n              <button \r\n                class=\"nav-btn\" \r\n                [disabled]=\"currentPage === 1\"\r\n                (click)=\"previousPage()\"\r\n                aria-label=\"Previous page\"\r\n              >\r\n                &lt;\r\n              </button>\r\n\r\n              <div class=\"page-numbers\">\r\n                <button \r\n                  *ngFor=\"let page of visiblePages\"\r\n                  class=\"page-btn\"\r\n                  [class.active]=\"page === currentPage\"\r\n                  [class.ellipsis]=\"page === '...'\"\r\n                  [disabled]=\"page === '...'\"\r\n                  (click)=\"goToPage(page)\"\r\n                >\r\n                  {{ page }}\r\n                </button>\r\n              </div>\r\n\r\n              <button \r\n                class=\"nav-btn\" \r\n                [disabled]=\"currentPage === totalPages\"\r\n                (click)=\"nextPage()\"\r\n                aria-label=\"Next page\"\r\n              >\r\n                &gt;\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- Transaction Detail Drawer -->\r\n  <div \r\n    class=\"drawer-overlay\" \r\n    [class.open]=\"isDrawerOpen\"\r\n    (click)=\"onOverlayClick($event)\"\r\n  >\r\n    <aside class=\"transaction-drawer\" [class.open]=\"isDrawerOpen\" *ngIf=\"selectedTransaction\">\r\n      <div class=\"drawer-header\">\r\n        <h2 class=\"drawer-title\">Transaction Details</h2>\r\n        <button class=\"drawer-close\" (click)=\"closeDrawer()\" aria-label=\"Close\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/>\r\n            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"drawer-content\">\r\n        <!-- Transaction Title -->\r\n        <div class=\"detail-section title-section\">\r\n          <span class=\"source-badge\" [ngClass]=\"getSourceClass(selectedTransaction.source)\">\r\n            {{ getSourceIcon(selectedTransaction.source) }} {{ selectedTransaction.source }}\r\n          </span>\r\n          <h3 class=\"transaction-title\">{{ selectedTransaction.description }}</h3>\r\n        </div>\r\n\r\n        <!-- Points Change -->\r\n        <div class=\"detail-section points-section\">\r\n          <div class=\"points-change\" [ngClass]=\"getTransactionClass(selectedTransaction.points)\">\r\n            <span class=\"points-label\">Points {{ selectedTransaction.points >= 0 ? 'Earned' : 'Spent' }}</span>\r\n            <span class=\"points-amount\">{{ formatPoints(selectedTransaction.points) }}</span>\r\n          </div>\r\n          <div class=\"balance-change\">\r\n            <div class=\"balance-item\">\r\n              <span class=\"balance-label\">Balance Before</span>\r\n              <span class=\"balance-value\">{{ (selectedTransaction.balanceAfter - selectedTransaction.points) | number }} pts</span>\r\n            </div>\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"arrow-icon\">\r\n              <path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/>\r\n            </svg>\r\n            <div class=\"balance-item\">\r\n              <span class=\"balance-label\">Balance After</span>\r\n              <span class=\"balance-value\">{{ selectedTransaction.balanceAfter | number }} pts</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Details Grid -->\r\n        <div class=\"detail-section info-grid\">\r\n          <div class=\"info-item\">\r\n            <span class=\"info-label\">Date & Time</span>\r\n            <span class=\"info-value\">{{ formatFullDate(selectedTransaction.timestamp) }}</span>\r\n          </div>\r\n          <div class=\"info-item\">\r\n            <span class=\"info-label\">Transaction Type</span>\r\n            <span class=\"info-value\">\r\n              <span class=\"type-badge\" [ngClass]=\"getTypeBadgeClass(selectedTransaction.type)\">\r\n                {{ getTypeLabel(selectedTransaction.type) }}\r\n              </span>\r\n            </span>\r\n          </div>\r\n          <div class=\"info-item\">\r\n            <span class=\"info-label\">Source</span>\r\n            <span class=\"info-value\">{{ selectedTransaction.source }}</span>\r\n          </div>\r\n          <div class=\"info-item\">\r\n            <span class=\"info-label\">Processed By</span>\r\n            <span class=\"info-value\">{{ getProcessedByLabel(selectedTransaction.processedBy) }}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Full Description -->\r\n        <div class=\"detail-section\">\r\n          <span class=\"info-label\">Description</span>\r\n          <p class=\"full-description\">{{ selectedTransaction.description }}</p>\r\n        </div>\r\n\r\n        <!-- Transaction ID -->\r\n        <div class=\"detail-section footer-section\">\r\n          <span class=\"transaction-id\">Transaction ID: {{ selectedTransaction.id }}</span>\r\n        </div>\r\n      </div>\r\n    </aside>\r\n  </div>\r\n</div>\r\n", styles: ["/* ============================================\r\n   USER TRANSACTIONS PAGE - EXACT DESIGN REPLICA\r\n   ============================================ */\r\n\r\n/* Layout */\r\n.user-page-wrapper {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n  overflow: hidden;\r\n}\r\n\r\n.user-page-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n/* ============================================\r\n   HEADER\r\n   ============================================ */\r\n.page-header {\r\n  background: var(--ag-color-layer-01);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.menu-toggle {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: background 0.2s;\r\n}\r\n\r\n.menu-toggle:hover {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.menu-toggle svg {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.header-title {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.avatar-dropdown-btn {\r\n  background: transparent;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n/* ============================================\r\n   MAIN CONTENT\r\n   ============================================ */\r\n.page-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n.transactions-container {\r\n  max-width: 100%;\r\n}\r\n\r\n/* ============================================\r\n   LOADING STATE\r\n   ============================================ */\r\n.loading-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.spinner {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container p {\r\n  font: var(--ag-typo-body-01);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n/* ============================================\r\n   TOP CONTROLS ROW\r\n   ============================================ */\r\n.top-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n/* Balance Badge */\r\n.balance-badge {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  padding: 12px 20px;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 8px rgba(44, 95, 63, 0.3);\r\n}\r\n\r\n.balance-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  opacity: 0.9;\r\n}\r\n\r\n.balance-label {\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  opacity: 0.9;\r\n}\r\n\r\n.balance-value {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  margin-left: 4px;\r\n}\r\n\r\n/* Date Range Picker */\r\n.date-range-picker {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 8px 16px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.calendar-icon {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-secondary);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.date-input {\r\n  border: none;\r\n  background: transparent;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  width: 120px;\r\n  outline: none;\r\n}\r\n\r\n.date-input::-webkit-calendar-picker-indicator {\r\n  opacity: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.date-separator {\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n/* Search Box */\r\n.search-box {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 10px 16px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  flex: 1;\r\n  max-width: 300px;\r\n}\r\n\r\n.search-icon {\r\n  width: 18px;\r\n  height: 18px;\r\n  color: var(--ag-color-text-placeholder);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.search-input {\r\n  border: none;\r\n  background: transparent;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  width: 100%;\r\n  outline: none;\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n/* ============================================\r\n   FILTER ROW\r\n   ============================================ */\r\n.filter-row {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.filter-tabs {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  background: var(--ag-color-layer-01);\r\n  padding: 4px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.filter-tab {\r\n  padding: 10px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-tab:hover {\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.filter-tab.active {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.dates-btn svg {\r\n  width: 16px;\r\n  height: 16px;\r\n}\r\n\r\n.reset-filters-btn {\r\n  padding: 10px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.reset-filters-btn:hover:not(:disabled) {\r\n  color: var(--ag-color-text-secondary);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.reset-filters-btn:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* ============================================\r\n   TRANSACTIONS TABLE\r\n   ============================================ */\r\n.table-container {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  overflow: hidden;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.transactions-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.transactions-table thead {\r\n  background: var(--ag-color-field-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.transactions-table th {\r\n  padding: 16px 20px;\r\n  text-align: left;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.transactions-table tbody tr {\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n  cursor: pointer;\r\n  transition: background 0.15s;\r\n}\r\n\r\n.transactions-table tbody tr:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.transactions-table tbody tr:hover {\r\n  background: var(--ag-color-layer-hover);\r\n}\r\n\r\n.transactions-table td {\r\n  padding: 16px 20px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  vertical-align: middle;\r\n}\r\n\r\n/* Column Widths */\r\n.col-date {\r\n  width: 140px;\r\n}\r\n\r\n.col-description {\r\n  width: auto;\r\n}\r\n\r\n.col-type {\r\n  width: 120px;\r\n}\r\n\r\n.col-points {\r\n  width: 100px;\r\n  text-align: right;\r\n  font-weight: 600;\r\n}\r\n\r\n.col-balance {\r\n  width: 140px;\r\n  text-align: right;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Description Cell */\r\n.description-cell {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.source-icon {\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 16px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.source-icon.source-event {\r\n  background: var(--ag-tag-green-bg);\r\n}\r\n\r\n.source-icon.source-product {\r\n  background: var(--ag-tag-red-bg);\r\n}\r\n\r\n.source-icon.source-admin {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.source-icon.source-system {\r\n  background: var(--ag-tag-blue-bg);\r\n}\r\n\r\n.description-text {\r\n  font-weight: 500;\r\n}\r\n\r\n/* Type Badge */\r\n.type-badge {\r\n  display: inline-block;\r\n  padding: 6px 14px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.type-badge.type-earned {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.type-badge.type-redeemed {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n/* Points Colors */\r\n.positive {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.negative {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n/* ============================================\r\n   EMPTY STATE\r\n   ============================================ */\r\n.empty-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon {\r\n  width: 64px;\r\n  height: 64px;\r\n  color: var(--ag-color-border-subtle);\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 8px 0;\r\n}\r\n\r\n.empty-subtitle {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n/* ============================================\r\n   PAGINATION\r\n   ============================================ */\r\n.pagination-row {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.pagination-info {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.pagination-info strong {\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 600;\r\n}\r\n\r\n.pagination-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.rows-per-page {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.page-size-select {\r\n  padding: 6px 12px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  background: var(--ag-color-layer-01);\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n\r\n.page-size-select:focus {\r\n  border-color: var(--ag-button-primary);\r\n}\r\n\r\n.page-navigation {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.nav-btn {\r\n  width: 32px;\r\n  height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.nav-btn:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.nav-btn:disabled {\r\n  color: var(--ag-color-border-subtle);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-numbers {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.page-btn {\r\n  min-width: 32px;\r\n  height: 32px;\r\n  padding: 0 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.page-btn:hover:not(:disabled):not(.active) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.page-btn.active {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.page-btn.ellipsis {\r\n  border: none;\r\n  background: transparent;\r\n  cursor: default;\r\n}\r\n\r\n/* ============================================\r\n   TRANSACTION DETAIL DRAWER\r\n   ============================================ */\r\n.drawer-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0);\r\n  z-index: 100;\r\n  pointer-events: none;\r\n  transition: background 0.3s ease;\r\n}\r\n\r\n.drawer-overlay.open {\r\n  background: rgba(0, 0, 0, 0.4);\r\n  pointer-events: auto;\r\n}\r\n\r\n.transaction-drawer {\r\n  position: fixed;\r\n  top: 0;\r\n  right: -480px;\r\n  width: 480px;\r\n  max-width: 100%;\r\n  height: 100vh;\r\n  background: var(--ag-color-layer-01);\r\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);\r\n  z-index: 101;\r\n  display: flex;\r\n  flex-direction: column;\r\n  transition: right 0.3s ease;\r\n}\r\n\r\n.transaction-drawer.open {\r\n  right: 0;\r\n}\r\n\r\n.drawer-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.drawer-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.drawer-close {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.drawer-close:hover {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.drawer-close svg {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.drawer-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px;\r\n}\r\n\r\n/* Drawer Sections */\r\n.detail-section {\r\n  margin-bottom: 24px;\r\n  padding-bottom: 24px;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.detail-section:last-child {\r\n  border-bottom: none;\r\n  margin-bottom: 0;\r\n}\r\n\r\n/* Title Section */\r\n.title-section {\r\n  text-align: center;\r\n}\r\n\r\n.source-badge {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 16px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.source-badge.source-event {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.source-badge.source-product {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.source-badge.source-admin {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.source-badge.source-system {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.transaction-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n/* Points Section */\r\n.points-section {\r\n  text-align: center;\r\n}\r\n\r\n.points-change {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.points-label {\r\n  display: block;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.points-amount {\r\n  font-size: 36px;\r\n  font-weight: 700;\r\n}\r\n\r\n.points-change.positive .points-amount {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.points-change.negative .points-amount {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.balance-change {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 16px;\r\n  padding: 16px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n}\r\n\r\n.balance-item {\r\n  text-align: center;\r\n}\r\n\r\n.balance-item .balance-label {\r\n  display: block;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 4px;\r\n}\r\n\r\n.balance-item .balance-value {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.arrow-icon {\r\n  width: 24px;\r\n  height: 24px;\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n/* Info Grid */\r\n.info-grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 20px;\r\n}\r\n\r\n.info-item {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.info-label {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.info-value {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n/* Full Description */\r\n.full-description {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  line-height: 1.6;\r\n  margin: 8px 0 0 0;\r\n}\r\n\r\n/* Footer Section */\r\n.footer-section {\r\n  border-top: 1px solid var(--ag-color-field-01);\r\n  padding-top: 16px;\r\n  margin-top: 16px;\r\n}\r\n\r\n.transaction-id {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-family: monospace;\r\n}\r\n\r\n/* ============================================\r\n   RESPONSIVE\r\n   ============================================ */\r\n@media (max-width: 1024px) {\r\n  .page-content {\r\n    padding: 20px;\r\n  }\r\n  \r\n  .top-controls {\r\n    flex-wrap: wrap;\r\n  }\r\n  \r\n  .search-box {\r\n    max-width: 100%;\r\n    order: 3;\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header {\r\n    padding: 12px 16px;\r\n  }\r\n  \r\n  .header-title {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n  \r\n  .page-content {\r\n    padding: 16px;\r\n  }\r\n  \r\n  .filter-row {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n  \r\n  .filter-tabs {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n  \r\n  .reset-filters-btn {\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n  \r\n  .transactions-table th,\r\n  .transactions-table td {\r\n    padding: 12px;\r\n  }\r\n  \r\n  .col-balance {\r\n    display: none;\r\n  }\r\n  \r\n  .pagination-row {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n    gap: 12px;\r\n  }\r\n  \r\n  .pagination-controls {\r\n    justify-content: space-between;\r\n  }\r\n  \r\n  .transaction-drawer {\r\n    width: 100%;\r\n    right: -100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .balance-badge {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n  \r\n  .date-range-picker {\r\n    width: 100%;\r\n  }\r\n  \r\n  .filter-tab {\r\n    padding: 8px 12px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n  \r\n  .col-type {\r\n    display: none;\r\n  }\r\n  \r\n  .info-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.UserDashboardService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserTransactionsComponent, { className: "UserTransactionsComponent", filePath: "src/app/pages/user/transactions/user-transactions.component.ts", lineNumber: 38 }); })();
//# sourceMappingURL=user-transactions.component.js.map