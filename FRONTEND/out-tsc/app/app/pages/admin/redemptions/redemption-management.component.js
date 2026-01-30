import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { RedemptionStatus } from '../../../models/redemption.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/redemption.service";
import * as i2 from "../../../services/products.service";
import * as i3 from "../../../services/auth.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function RedemptionManagementComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵelement(4, "i", 19);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.lastName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.roles == null ? null : ctx_r0.currentUser.roles[0]) || "Admin", " ");
} }
function RedemptionManagementComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 22);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAlert("success")); });
    i0.ɵɵelement(5, "i", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.successMessage);
} }
function RedemptionManagementComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "i", 25);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 22);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAlert("error")); });
    i0.ɵɵelement(5, "i", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function RedemptionManagementComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "div", 27);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading redemptions...");
    i0.ɵɵelementEnd()();
} }
function RedemptionManagementComponent_ng_container_13_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 60);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r0.redemptionStatusChartOption)("merge", ctx_r0.redemptionStatusChartOption);
} }
function RedemptionManagementComponent_ng_container_13_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No redemption data available");
    i0.ɵɵelementEnd()();
} }
function RedemptionManagementComponent_ng_container_13_option_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r5.name, " ");
} }
function RedemptionManagementComponent_ng_container_13_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 64);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r0.topProductsChartOption)("merge", ctx_r0.topProductsChartOption);
} }
function RedemptionManagementComponent_ng_container_13_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 65);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No product redemption data for this category");
    i0.ɵɵelementEnd()();
} }
function RedemptionManagementComponent_ng_container_13_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66)(1, "div", 67);
    i0.ɵɵelement(2, "span", 68);
    i0.ɵɵelementStart(3, "span", 69);
    i0.ɵɵtext(4, "Total Redemptions");
    i0.ɵɵelementEnd()()();
} }
function RedemptionManagementComponent_ng_container_13_div_39_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 70)(1, "div", 71)(2, "div", 72)(3, "label");
    i0.ɵɵtext(4, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "select", 73);
    i0.ɵɵtwoWayListener("ngModelChange", function RedemptionManagementComponent_ng_container_13_div_39_Template_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedStatusFilter, $event) || (ctx_r0.selectedStatusFilter = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function RedemptionManagementComponent_ng_container_13_div_39_Template_select_change_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onStatusFilterChange()); });
    i0.ɵɵelementStart(6, "option", 74);
    i0.ɵɵtext(7, "All Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "option", 75);
    i0.ɵɵtext(9, "Pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "option", 76);
    i0.ɵɵtext(11, "Approved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "option", 77);
    i0.ɵɵtext(13, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 78);
    i0.ɵɵtext(15, "Rejected");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 72)(17, "label");
    i0.ɵɵtext(18, "Sort By");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 73);
    i0.ɵɵtwoWayListener("ngModelChange", function RedemptionManagementComponent_ng_container_13_div_39_Template_select_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.sortField, $event) || (ctx_r0.sortField = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function RedemptionManagementComponent_ng_container_13_div_39_Template_select_change_19_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onSortChange()); });
    i0.ɵɵelementStart(20, "option", 79);
    i0.ɵɵtext(21, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "option", 80);
    i0.ɵɵtext(23, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "option", 81);
    i0.ɵɵtext(25, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "div", 72)(27, "label");
    i0.ɵɵtext(28, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 82)(30, "button", 83);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_div_39_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setSortOrder("desc")); });
    i0.ɵɵelement(31, "i", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 85);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_div_39_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setSortOrder("asc")); });
    i0.ɵɵelement(33, "i", 86);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 87)(35, "button", 88);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_div_39_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resetFilters()); });
    i0.ɵɵelement(36, "i", 89);
    i0.ɵɵtext(37, " Reset ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.selectedStatusFilter);
    i0.ɵɵadvance(14);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.sortField);
    i0.ɵɵadvance(11);
    i0.ɵɵclassProp("active", ctx_r0.sortOrder === "desc");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r0.sortOrder === "asc");
} }
function RedemptionManagementComponent_ng_container_13_table_45_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 92);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_table_45_tr_16_Template_tr_click_0_listener() { const redemption_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openDetails(redemption_r8)); })("keydown.enter", function RedemptionManagementComponent_ng_container_13_table_45_tr_16_Template_tr_keydown_enter_0_listener() { const redemption_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openDetails(redemption_r8)); });
    i0.ɵɵelementStart(1, "td", 93)(2, "div", 94)(3, "div", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 96)(6, "div", 17);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 97);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td", 98)(11, "div", 99)(12, "div", 100);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 101);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "td", 102)(17, "span", 103);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 104)(20, "span", 105);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "td", 106)(24, "span", 107);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "td", 108);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const redemption_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", "View details for redemption by " + redemption_r8.userName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getUserInitials(redemption_r8.userName), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(redemption_r8.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r8.userEmail);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(redemption_r8.productName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r8.productCategory);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(redemption_r8.quantity);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 12, redemption_r8.pointsSpent));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("status-" + ctx_r0.getStatusLabel(redemption_r8.status).toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getStatusLabel(redemption_r8.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.formatDate(redemption_r8.createdAt), " ");
} }
function RedemptionManagementComponent_ng_container_13_table_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 90)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Points Spent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Created");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, RedemptionManagementComponent_ng_container_13_table_45_tr_16_Template, 28, 14, "tr", 91);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r0.paginatedRedemptions);
} }
function RedemptionManagementComponent_ng_container_13_div_46_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 112);
    i0.ɵɵtext(1, " Try adjusting your filters ");
    i0.ɵɵelementEnd();
} }
function RedemptionManagementComponent_ng_container_13_div_46_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 112);
    i0.ɵɵtext(1, " No redemption requests yet ");
    i0.ɵɵelementEnd();
} }
function RedemptionManagementComponent_ng_container_13_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 109);
    i0.ɵɵelement(1, "i", 110);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No redemptions found");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, RedemptionManagementComponent_ng_container_13_div_46_p_4_Template, 2, 0, "p", 111)(5, RedemptionManagementComponent_ng_container_13_div_46_p_5_Template, 2, 0, "p", 111);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.searchText || ctx_r0.selectedStatus !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.searchText && ctx_r0.selectedStatus === null);
} }
function RedemptionManagementComponent_ng_container_13_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 113)(1, "button", 114);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_div_47_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.changePage(ctx_r0.currentPage - 1)); });
    i0.ɵɵelement(2, "i", 115);
    i0.ɵɵtext(3, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 116);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 114);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_div_47_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.changePage(ctx_r0.currentPage + 1)); });
    i0.ɵɵtext(7, " Next ");
    i0.ɵɵelement(8, "i", 117);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.currentPage === 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r0.currentPage, " of ", ctx_r0.totalPages, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
} }
function RedemptionManagementComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 28)(2, "div", 29)(3, "div", 30)(4, "div", 31)(5, "div", 32)(6, "h2", 33);
    i0.ɵɵtext(7, "Redemptions Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 34);
    i0.ɵɵtext(9, "Distribution by status");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 35);
    i0.ɵɵtemplate(11, RedemptionManagementComponent_ng_container_13_div_11_Template, 1, 2, "div", 36)(12, RedemptionManagementComponent_ng_container_13_div_12_Template, 4, 0, "div", 37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 30)(14, "div", 31)(15, "div", 32)(16, "h2", 33);
    i0.ɵɵtext(17, "Top 5 Products by Redemptions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 34);
    i0.ɵɵtext(19, "Most redeemed products");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 38)(21, "select", 39);
    i0.ɵɵtwoWayListener("ngModelChange", function RedemptionManagementComponent_ng_container_13_Template_select_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedChartCategory, $event) || (ctx_r0.selectedChartCategory = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function RedemptionManagementComponent_ng_container_13_Template_select_change_21_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onChartCategoryChange()); });
    i0.ɵɵelementStart(22, "option", 40);
    i0.ɵɵtext(23, "All Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, RedemptionManagementComponent_ng_container_13_option_24_Template, 2, 2, "option", 41);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 35);
    i0.ɵɵtemplate(26, RedemptionManagementComponent_ng_container_13_div_26_Template, 1, 2, "div", 42)(27, RedemptionManagementComponent_ng_container_13_div_27_Template, 4, 0, "div", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, RedemptionManagementComponent_ng_container_13_div_28_Template, 5, 0, "div", 43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "section", 44)(30, "div", 45)(31, "div", 46)(32, "div", 47);
    i0.ɵɵelement(33, "i", 48);
    i0.ɵɵelementStart(34, "input", 49);
    i0.ɵɵtwoWayListener("ngModelChange", function RedemptionManagementComponent_ng_container_13_Template_input_ngModelChange_34_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.searchText, $event) || (ctx_r0.searchText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function RedemptionManagementComponent_ng_container_13_Template_input_input_34_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSearch()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 50);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_ng_container_13_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleFilters()); });
    i0.ɵɵelement(36, "i", 51);
    i0.ɵɵtext(37, " Filters ");
    i0.ɵɵelement(38, "i", 52);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, RedemptionManagementComponent_ng_container_13_div_39_Template, 38, 6, "div", 53);
    i0.ɵɵelementStart(40, "div", 54)(41, "span");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "section", 55)(44, "div", 56);
    i0.ɵɵtemplate(45, RedemptionManagementComponent_ng_container_13_table_45_Template, 17, 1, "table", 57)(46, RedemptionManagementComponent_ng_container_13_div_46_Template, 6, 2, "div", 58)(47, RedemptionManagementComponent_ng_container_13_div_47_Template, 9, 4, "div", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r0.hasRedemptionStatusData());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.hasRedemptionStatusData());
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.selectedChartCategory);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.categories);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.topProductsChartData().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.topProductsChartData().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.topProductsChartData().length > 0);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.searchText);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r0.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("rotated", ctx_r0.showFilters);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.filteredRedemptions.length, " redemption", ctx_r0.filteredRedemptions.length !== 1 ? "s" : "", " found");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.filteredRedemptions.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.filteredRedemptions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.totalPages > 1);
} }
function RedemptionManagementComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 118);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_14_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeDetails()); });
    i0.ɵɵelementEnd();
} }
function RedemptionManagementComponent_div_16_ng_container_82_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 171);
    i0.ɵɵelement(1, "i", 172);
    i0.ɵɵtext(2, " Please enter a rejection reason before rejecting. ");
    i0.ɵɵelementEnd();
} }
function RedemptionManagementComponent_div_16_ng_container_82_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 166)(2, "button", 167);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_16_ng_container_82_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.approveRedemption()); });
    i0.ɵɵelement(3, "i", 168);
    i0.ɵɵtext(4, " Approve ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 169);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_16_ng_container_82_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.rejectRedemption()); });
    i0.ɵɵelement(6, "i", 23);
    i0.ɵɵtext(7, " Reject ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, RedemptionManagementComponent_div_16_ng_container_82_div_8_Template, 3, 0, "div", 170);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("needs-reason", !ctx_r0.actionNotes.trim());
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.showReasonWarning);
} }
function RedemptionManagementComponent_div_16_ng_container_83_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 166)(2, "button", 173);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_16_ng_container_83_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markAsDelivered()); });
    i0.ɵɵelement(3, "i", 174);
    i0.ɵɵtext(4, " Mark as Delivered ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting);
} }
function RedemptionManagementComponent_div_16_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 175);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Delivered on ", ctx_r0.formatDateTime(ctx_r0.selectedRedemption.deliveredAt));
} }
function RedemptionManagementComponent_div_16_div_85_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 180)(1, "strong");
    i0.ɵɵtext(2, "Reason:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.selectedRedemption.adminNotes, " ");
} }
function RedemptionManagementComponent_div_16_div_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "div", 178)(3, "span");
    i0.ɵɵtext(4, "Redemption was rejected. Points have been refunded.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, RedemptionManagementComponent_div_16_div_85_div_5_Template, 4, 1, "div", 179);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.adminNotes);
} }
function RedemptionManagementComponent_div_16_div_86_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 185);
    i0.ɵɵtext(1, "* Required for rejection");
    i0.ɵɵelementEnd();
} }
function RedemptionManagementComponent_div_16_div_86_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 181)(1, "label", 182);
    i0.ɵɵtext(2, " Admin Notes ");
    i0.ɵɵtemplate(3, RedemptionManagementComponent_div_16_div_86_span_3_Template, 2, 0, "span", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "textarea", 184);
    i0.ɵɵtwoWayListener("ngModelChange", function RedemptionManagementComponent_div_16_div_86_Template_textarea_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.actionNotes, $event) || (ctx_r0.actionNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function RedemptionManagementComponent_div_16_div_86_Template_textarea_input_4_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onNotesInput()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.canApprove(ctx_r0.selectedRedemption.status));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("warning-border", ctx_r0.showReasonWarning && ctx_r0.canApprove(ctx_r0.selectedRedemption.status));
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.actionNotes);
    i0.ɵɵproperty("placeholder", ctx_r0.canApprove(ctx_r0.selectedRedemption.status) ? "Enter reason for rejection or optional notes for approval..." : "Add delivery notes (optional)...")("disabled", ctx_r0.isSubmitting);
} }
function RedemptionManagementComponent_div_16_div_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 186)(1, "label", 182);
    i0.ɵɵtext(2, "Admin Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 187);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.adminNotes);
} }
function RedemptionManagementComponent_div_16_div_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵelement(1, "div", 188);
    i0.ɵɵelementStart(2, "div", 162)(3, "div", 163);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 164);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("approved", ctx_r0.selectedRedemption.status !== ctx_r0.RedemptionStatus.Rejected)("rejected", ctx_r0.selectedRedemption.status === ctx_r0.RedemptionStatus.Rejected);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.status === ctx_r0.RedemptionStatus.Rejected ? "Rejected" : "Approved");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formatDateTime(ctx_r0.selectedRedemption.approvedAt));
} }
function RedemptionManagementComponent_div_16_div_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵelement(1, "div", 189);
    i0.ɵɵelementStart(2, "div", 162)(3, "div", 163);
    i0.ɵɵtext(4, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 164);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.formatDateTime(ctx_r0.selectedRedemption.deliveredAt));
} }
function RedemptionManagementComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 119)(1, "div", 120)(2, "div", 121)(3, "h3", 122);
    i0.ɵɵtext(4, "Redemption Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 123)(6, "span", 124);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 125);
    i0.ɵɵelement(9, "i", 126);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "button", 127);
    i0.ɵɵlistener("click", function RedemptionManagementComponent_div_16_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeDetails()); });
    i0.ɵɵelement(12, "i", 23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 128)(14, "div", 129)(15, "div", 130);
    i0.ɵɵelement(16, "i", 131);
    i0.ɵɵelementStart(17, "h4", 132);
    i0.ɵɵtext(18, "User Information");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 133)(20, "div", 134);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 135)(23, "div", 136);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 137);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 138)(28, "div", 139)(29, "span", 140);
    i0.ɵɵtext(30, "Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 141);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 139)(35, "span", 140);
    i0.ɵɵtext(36, "Total Earned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 142);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 139)(41, "span", 140);
    i0.ɵɵtext(42, "Total Redeemed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 142);
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(46, "div", 129)(47, "div", 130);
    i0.ɵɵelement(48, "i", 143);
    i0.ɵɵelementStart(49, "h4", 132);
    i0.ɵɵtext(50, "Product Information");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 144)(52, "div", 145)(53, "img", 146);
    i0.ɵɵlistener("error", function RedemptionManagementComponent_div_16_Template_img_error_53_listener($event) { i0.ɵɵrestoreView(_r11); return i0.ɵɵresetView($event.target.src = "assets/placeholder-product.png"); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "div", 147)(55, "div", 148);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "span", 149);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(59, "div", 138)(60, "div", 139)(61, "span", 140);
    i0.ɵɵtext(62, "Points per Unit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span", 142);
    i0.ɵɵtext(64);
    i0.ɵɵpipe(65, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "div", 139)(67, "span", 140);
    i0.ɵɵtext(68, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span", 142);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(71, "div", 150)(72, "span", 140);
    i0.ɵɵtext(73, "Total Points Spent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "span", 151);
    i0.ɵɵtext(75);
    i0.ɵɵpipe(76, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(77, "div", 152)(78, "div", 130);
    i0.ɵɵelement(79, "i", 153);
    i0.ɵɵelementStart(80, "h4", 132);
    i0.ɵɵtext(81, "Actions");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(82, RedemptionManagementComponent_div_16_ng_container_82_Template, 9, 5, "ng-container", 11)(83, RedemptionManagementComponent_div_16_ng_container_83_Template, 5, 1, "ng-container", 11)(84, RedemptionManagementComponent_div_16_div_84_Template, 4, 1, "div", 154)(85, RedemptionManagementComponent_div_16_div_85_Template, 6, 1, "div", 155)(86, RedemptionManagementComponent_div_16_div_86_Template, 5, 6, "div", 156)(87, RedemptionManagementComponent_div_16_div_87_Template, 5, 1, "div", 157);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 129)(89, "div", 130);
    i0.ɵɵelement(90, "i", 158);
    i0.ɵɵelementStart(91, "h4", 132);
    i0.ɵɵtext(92, "Timeline");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(93, "div", 159)(94, "div", 160);
    i0.ɵɵelement(95, "div", 161);
    i0.ɵɵelementStart(96, "div", 162)(97, "div", 163);
    i0.ɵɵtext(98, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(99, "div", 164);
    i0.ɵɵtext(100);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(101, RedemptionManagementComponent_div_16_div_101_Template, 7, 6, "div", 165)(102, RedemptionManagementComponent_div_16_div_102_Template, 7, 1, "div", 165);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap("status-" + ctx_r0.getStatusLabel(ctx_r0.selectedRedemption.status).toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getStatusLabel(ctx_r0.selectedRedemption.status), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.formatDateTime(ctx_r0.selectedRedemption.createdAt), " ");
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getUserInitials(ctx_r0.selectedRedemption.userName), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.userEmail);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(33, 26, ctx_r0.selectedRedemption.userCurrentBalance), " pts");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(39, 28, ctx_r0.selectedRedemption.userTotalEarned), " pts");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(45, 30, ctx_r0.selectedRedemption.userTotalRedeemed), " pts");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("src", ctx_r0.selectedRedemption.productImageUrl || "assets/placeholder-product.png", i0.ɵɵsanitizeUrl)("alt", ctx_r0.selectedRedemption.productName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.productName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.productCategory);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(65, 32, ctx_r0.selectedRedemption.productPointsPerUnit), " pts");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.selectedRedemption.quantity);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(76, 34, ctx_r0.selectedRedemption.pointsSpent), " pts");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r0.canApprove(ctx_r0.selectedRedemption.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.canDeliver(ctx_r0.selectedRedemption.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.status === ctx_r0.RedemptionStatus.Delivered);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.status === ctx_r0.RedemptionStatus.Rejected);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.canApprove(ctx_r0.selectedRedemption.status) || ctx_r0.canDeliver(ctx_r0.selectedRedemption.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.adminNotes && !ctx_r0.canApprove(ctx_r0.selectedRedemption.status) && ctx_r0.selectedRedemption.status !== ctx_r0.RedemptionStatus.Rejected);
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(ctx_r0.formatDateTime(ctx_r0.selectedRedemption.createdAt));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.approvedAt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedRedemption.deliveredAt);
} }
function RedemptionManagementComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 190);
    i0.ɵɵelement(1, "div", 27);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading details...");
    i0.ɵɵelementEnd()();
} }
// Register ECharts components
echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);
export class RedemptionManagementComponent {
    constructor(redemptionService, productsService, authService, cdr) {
        this.redemptionService = redemptionService;
        this.productsService = productsService;
        this.authService = authService;
        this.cdr = cdr;
        // Expose enums and Math for template
        this.RedemptionStatus = RedemptionStatus;
        this.Math = Math;
        // Data
        this.redemptions = [];
        this.filteredRedemptions = [];
        this.selectedRedemption = null;
        this.categories = [];
        // Status counts for charts
        this.statusCounts = {
            pending: 0,
            approved: 0,
            delivered: 0,
            rejected: 0
        };
        // UI State
        this.isLoading = false;
        this.isLoadingDetails = false;
        this.isSubmitting = false;
        this.searchText = '';
        this.currentPage = 1;
        this.pageSize = 10;
        this.showFilters = false;
        this.showDetailsDrawer = false;
        // Filter State
        this.selectedStatus = null;
        this.selectedStatusFilter = '';
        this.sortField = 'date';
        this.sortOrder = 'desc';
        // Chart state
        this.selectedChartCategory = 'all';
        this.redemptionStatusChartOption = {};
        this.topProductsChartOption = {};
        // Signals for reactive chart data
        this.redemptionsSignal = signal([], ...(ngDevMode ? [{ debugName: "redemptionsSignal" }] : []));
        this.selectedCategorySignal = signal('all', ...(ngDevMode ? [{ debugName: "selectedCategorySignal" }] : []));
        // Computed product redemption counts
        this.topProductsChartData = computed(() => {
            const redemptions = this.redemptionsSignal();
            const selectedCategory = this.selectedCategorySignal();
            // Aggregate redemptions by product
            const productCounts = new Map();
            redemptions.forEach(r => {
                // Skip if filtering by category and doesn't match
                if (selectedCategory !== 'all') {
                    const matchingCategory = this.categories.find(c => c.id === selectedCategory);
                    if (matchingCategory && r.productCategory !== matchingCategory.name) {
                        return;
                    }
                }
                const existing = productCounts.get(r.productId);
                if (existing) {
                    existing.count += r.quantity;
                }
                else {
                    productCounts.set(r.productId, {
                        productId: r.productId,
                        productName: r.productName,
                        category: r.productCategory,
                        categoryId: '', // We don't have this in redemption data
                        count: r.quantity
                    });
                }
            });
            // Sort by count and take top 5
            return Array.from(productCounts.values())
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
        }, ...(ngDevMode ? [{ debugName: "topProductsChartData" }] : []));
        // Chart colors
        this.chartColors = {
            approved: '#2c5f3f',
            pending: '#f59e0b',
            delivered: '#6b7280',
            rejected: '#ef4444'
        };
        // Action notes
        this.actionNotes = '';
        this.showReasonWarning = false;
        // Error & Success States
        this.errorMessage = '';
        this.successMessage = '';
        this.showErrorAlert = false;
        this.showSuccessAlert = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        console.log('[RedemptionManagement] Component initialized');
        this.loadCurrentUser();
        this.loadCategories();
        this.loadRedemptions();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadCurrentUser() {
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            console.log('[RedemptionManagement] Current user loaded:', user);
            this.currentUser = user;
        });
    }
    loadCategories() {
        this.productsService.getCategories()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (categories) => {
                this.categories = categories;
                console.log('[RedemptionManagement] Categories loaded:', categories.length);
            },
            error: (error) => {
                console.error('[RedemptionManagement] Error loading categories:', error);
            }
        });
    }
    loadRedemptions() {
        this.isLoading = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        console.log('[RedemptionManagement] Loading redemptions with status:', this.selectedStatus);
        this.redemptionService.getAllRedemptions(this.selectedStatus ?? undefined)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                console.log('[RedemptionManagement] Received response:', response);
                if (!response || !response.items) {
                    console.error('[RedemptionManagement] Invalid response structure:', response);
                    this.errorMessage = 'Invalid response from server';
                    this.showErrorAlert = true;
                    return;
                }
                this.redemptions = response.items;
                this.redemptionsSignal.set(response.items);
                this.statusCounts = {
                    pending: response.counts?.pending || 0,
                    approved: response.counts?.approved || 0,
                    delivered: response.counts?.delivered || 0,
                    rejected: response.counts?.rejected || 0
                };
                console.log('[RedemptionManagement] Loaded redemptions:', {
                    total: this.redemptions.length,
                    statusCounts: this.statusCounts
                });
                this.applyFilters();
                this.updateCharts();
            },
            error: (error) => {
                console.error('[RedemptionManagement] Error loading redemptions:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to load redemptions.';
                this.showErrorAlert = true;
                this.redemptions = [];
                this.filteredRedemptions = [];
            }
        });
    }
    // Chart methods
    hasRedemptionStatusData() {
        const { approved, pending, delivered, rejected } = this.statusCounts;
        return (approved + pending + delivered + rejected) > 0;
    }
    updateCharts() {
        this.updateRedemptionStatusChart();
        this.updateTopProductsChart();
    }
    updateRedemptionStatusChart() {
        const { approved, pending, delivered, rejected } = this.statusCounts;
        const total = approved + pending + delivered + rejected;
        const data = [
            { value: approved, name: 'Approved', itemStyle: { color: this.chartColors.approved } },
            { value: pending, name: 'Pending', itemStyle: { color: this.chartColors.pending } },
            { value: delivered, name: 'Delivered', itemStyle: { color: this.chartColors.delivered } },
            { value: rejected, name: 'Rejected', itemStyle: { color: this.chartColors.rejected } }
        ].filter(d => d.value > 0);
        this.redemptionStatusChartOption = {
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
                    const item = data.find(d => d.name === name);
                    const value = item?.value || 0;
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                    return `${name}: ${value} (${percent}%)`;
                },
                textStyle: {
                    fontSize: 12,
                    color: '#6b7280'
                }
            },
            series: [
                {
                    name: 'Redemption Status',
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
                    data: data
                }
            ]
        };
    }
    updateTopProductsChart() {
        const topProducts = this.topProductsChartData();
        if (topProducts.length === 0) {
            this.topProductsChartOption = {};
            return;
        }
        // Reverse for horizontal bar chart (bottom to top)
        const reversed = [...topProducts].reverse();
        const productNames = reversed.map(p => p.productName.length > 20 ? p.productName.substring(0, 20) + '...' : p.productName);
        const counts = reversed.map(p => p.count);
        const maxCount = Math.max(...counts);
        this.topProductsChartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params) => {
                    const data = reversed[params[0].dataIndex];
                    return `<strong>${data.productName}</strong><br/>
                  Category: ${data.category}<br/>
                  Redemptions: ${data.count}`;
                }
            },
            grid: {
                left: '3%',
                right: '15%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: maxCount * 1.2,
                axisLabel: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'category',
                data: productNames,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    fontSize: 12,
                    color: '#374151',
                    width: 120,
                    overflow: 'truncate'
                }
            },
            series: [
                {
                    type: 'bar',
                    data: counts,
                    barWidth: '60%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#2c5f3f' },
                            { offset: 1, color: '#4ade80' }
                        ]),
                        borderRadius: [0, 4, 4, 0]
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#374151'
                    }
                }
            ]
        };
    }
    onChartCategoryChange() {
        this.selectedCategorySignal.set(this.selectedChartCategory);
        this.updateTopProductsChart();
    }
    // Toggle filters panel
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
    applyFilters() {
        let filtered = [...this.redemptions];
        // Search filter
        if (this.searchText && this.searchText.trim()) {
            const search = this.searchText.toLowerCase();
            filtered = filtered.filter(r => r.userName?.toLowerCase().includes(search) ||
                r.productName?.toLowerCase().includes(search) ||
                r.id?.toLowerCase().includes(search) ||
                r.userId?.toLowerCase().includes(search) ||
                r.productId?.toLowerCase().includes(search) ||
                r.userEmail?.toLowerCase().includes(search));
        }
        // Apply sorting
        filtered = this.applySorting(filtered);
        this.filteredRedemptions = filtered;
        this.currentPage = 1;
        console.log('[RedemptionManagement] Filters applied:', {
            totalRedemptions: this.redemptions.length,
            filteredCount: this.filteredRedemptions.length,
            searchText: this.searchText,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    }
    applySorting(redemptions) {
        const sorted = [...redemptions];
        const multiplier = this.sortOrder === 'desc' ? -1 : 1;
        switch (this.sortField) {
            case 'date':
                return sorted.sort((a, b) => multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
            case 'points':
                return sorted.sort((a, b) => multiplier * (a.pointsSpent - b.pointsSpent));
            case 'quantity':
                return sorted.sort((a, b) => multiplier * (a.quantity - b.quantity));
            default:
                return sorted;
        }
    }
    onSearch() {
        this.applyFilters();
    }
    clearSearch() {
        this.searchText = '';
        this.applyFilters();
    }
    filterByStatus(status) {
        this.selectedStatus = status;
        this.selectedStatusFilter = status !== null ? status.toString() : '';
        this.loadRedemptions();
    }
    onStatusFilterChange() {
        if (this.selectedStatusFilter === '') {
            this.selectedStatus = null;
        }
        else {
            this.selectedStatus = parseInt(this.selectedStatusFilter);
        }
        this.loadRedemptions();
    }
    onSortChange() {
        this.applyFilters();
    }
    setSortOrder(order) {
        this.sortOrder = order;
        this.applyFilters();
    }
    resetFilters() {
        this.searchText = '';
        this.selectedStatus = null;
        this.selectedStatusFilter = '';
        this.sortField = 'date';
        this.sortOrder = 'desc';
        this.loadRedemptions();
    }
    refreshData() {
        this.loadRedemptions();
    }
    // Pagination
    get paginatedRedemptions() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredRedemptions.slice(start, end);
    }
    get totalPages() {
        return Math.ceil(this.filteredRedemptions.length / this.pageSize);
    }
    changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    // Drawer actions
    openDetails(redemption) {
        console.log('[RedemptionManagement] Opening details for:', redemption.id);
        this.isLoadingDetails = true;
        this.showDetailsDrawer = true;
        this.actionNotes = '';
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.redemptionService.getRedemptionDetails(redemption.id)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoadingDetails = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (details) => {
                console.log('[RedemptionManagement] Received details:', details);
                if (!details) {
                    console.error('[RedemptionManagement] Empty details response');
                    this.errorMessage = 'Invalid details response from server';
                    this.showErrorAlert = true;
                    this.showDetailsDrawer = false;
                    return;
                }
                this.selectedRedemption = details;
            },
            error: (error) => {
                console.error('[RedemptionManagement] Error loading details:', {
                    error,
                    status: error.status,
                    message: error.message,
                    errorObj: error.error
                });
                this.errorMessage = error.error?.message || error.message || 'Failed to load redemption details. Please check console.';
                this.showErrorAlert = true;
                this.showDetailsDrawer = false;
            }
        });
    }
    closeDetails() {
        this.showDetailsDrawer = false;
        this.selectedRedemption = null;
        this.actionNotes = '';
        this.showReasonWarning = false;
    }
    // Clear warning when user starts typing
    onNotesInput() {
        if (this.actionNotes.trim()) {
            this.showReasonWarning = false;
        }
    }
    // Action handlers
    approveRedemption() {
        if (!this.selectedRedemption || !this.currentUser) {
            console.warn('[RedemptionManagement] Cannot approve: missing redemption or user');
            return;
        }
        console.log('[RedemptionManagement] Approving redemption:', this.selectedRedemption.id);
        this.isSubmitting = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.redemptionService.approveRedemption(this.selectedRedemption.id, {
            approvedBy: this.currentUser.id,
            notes: this.actionNotes || undefined
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                console.log('[RedemptionManagement] Approve success:', response);
                this.successMessage = response.message;
                this.showSuccessAlert = true;
                this.closeDetails();
                this.loadRedemptions();
                setTimeout(() => this.showSuccessAlert = false, 5000);
            },
            error: (error) => {
                console.error('[RedemptionManagement] Approve error:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to approve redemption';
                this.showErrorAlert = true;
            }
        });
    }
    rejectRedemption() {
        if (!this.selectedRedemption || !this.currentUser) {
            console.warn('[RedemptionManagement] Cannot reject: missing redemption or user');
            return;
        }
        // Validate rejection reason
        if (!this.actionNotes.trim()) {
            this.showReasonWarning = true;
            this.cdr.detectChanges();
            // Focus the textarea
            setTimeout(() => {
                const textarea = document.querySelector('.notes-textarea');
                if (textarea)
                    textarea.focus();
            }, 100);
            return;
        }
        this.showReasonWarning = false;
        console.log('[RedemptionManagement] Rejecting redemption:', this.selectedRedemption.id);
        this.isSubmitting = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.redemptionService.rejectRedemption(this.selectedRedemption.id, {
            rejectedBy: this.currentUser.id,
            reason: this.actionNotes
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                console.log('[RedemptionManagement] Reject success:', response);
                // Build detailed success message
                let message = response.message || 'Redemption rejected successfully.';
                const details = [];
                if (response.pointsRefunded && response.pointsRefunded > 0) {
                    details.push(`${response.pointsRefunded.toLocaleString()} points refunded to user`);
                }
                if (response.quantityRestored && response.quantityRestored > 0) {
                    details.push(`${response.quantityRestored} item(s) restored to inventory`);
                }
                if (details.length > 0) {
                    message = `${message} ${details.join('. ')}.`;
                }
                this.successMessage = message;
                this.showSuccessAlert = true;
                this.closeDetails();
                this.loadRedemptions();
                setTimeout(() => this.showSuccessAlert = false, 8000); // Longer display for detailed message
            },
            error: (error) => {
                console.error('[RedemptionManagement] Reject error:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to reject redemption';
                this.showErrorAlert = true;
            }
        });
    }
    markAsDelivered() {
        if (!this.selectedRedemption || !this.currentUser) {
            console.warn('[RedemptionManagement] Cannot deliver: missing redemption or user');
            return;
        }
        console.log('[RedemptionManagement] Marking as delivered:', this.selectedRedemption.id);
        this.isSubmitting = true;
        this.errorMessage = '';
        this.showErrorAlert = false;
        this.redemptionService.markAsDelivered(this.selectedRedemption.id, {
            deliveredBy: this.currentUser.id,
            notes: this.actionNotes || undefined
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                console.log('[RedemptionManagement] Deliver success:', response);
                this.successMessage = response.message;
                this.showSuccessAlert = true;
                this.closeDetails();
                this.loadRedemptions();
                setTimeout(() => this.showSuccessAlert = false, 5000);
            },
            error: (error) => {
                console.error('[RedemptionManagement] Deliver error:', error);
                this.errorMessage = error.error?.message || error.message || 'Failed to mark as delivered';
                this.showErrorAlert = true;
            }
        });
    }
    // Utility methods
    getStatusLabel(status) {
        return this.redemptionService.getStatusLabel(status);
    }
    getStatusClass(status) {
        return this.redemptionService.getStatusClass(status);
    }
    canApprove(status) {
        return status === RedemptionStatus.Pending;
    }
    canReject(status) {
        return status === RedemptionStatus.Pending;
    }
    canDeliver(status) {
        return status === RedemptionStatus.Approved;
    }
    formatDate(date) {
        const now = new Date();
        const redemptionDate = new Date(date);
        const diffMs = now.getTime() - redemptionDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1)
            return 'Just now';
        if (diffMins < 60)
            return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24)
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays === 1)
            return '1 day ago';
        if (diffDays < 7)
            return `${diffDays} days ago`;
        return redemptionDate.toLocaleDateString();
    }
    formatDateTime(date) {
        return new Date(date).toLocaleString();
    }
    getUserInitials(name) {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
    closeAlert(type) {
        if (type === 'error') {
            this.showErrorAlert = false;
        }
        else {
            this.showSuccessAlert = false;
        }
    }
    static { this.ɵfac = function RedemptionManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RedemptionManagementComponent)(i0.ɵɵdirectiveInject(i1.RedemptionService), i0.ɵɵdirectiveInject(i2.ProductsService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RedemptionManagementComponent, selectors: [["app-redemption-management"]], features: [i0.ɵɵProvidersFeature([
                provideEchartsCore({ echarts })
            ])], decls: 18, vars: 10, consts: [[1, "admin-redemptions-wrapper"], [1, "admin-redemptions-main"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "header-right"], ["class", "user-info", 4, "ngIf"], [1, "main-content"], ["class", "success-alert", "role", "alert", 4, "ngIf"], ["class", "error-alert", "role", "alert", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "details-drawer"], ["class", "drawer-container", 4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "fa-solid", "fa-shield-halved"], ["role", "alert", 1, "success-alert"], [1, "fa-solid", "fa-circle-check"], ["aria-label", "Dismiss", 1, "alert-dismiss", 3, "click"], [1, "fa-solid", "fa-xmark"], ["role", "alert", 1, "error-alert"], [1, "fa-solid", "fa-circle-exclamation"], [1, "loading-container"], [1, "loading-spinner"], ["aria-label", "Redemption Analytics", 1, "charts-section"], [1, "charts-grid"], [1, "chart-card"], [1, "chart-header"], [1, "chart-title-group"], [1, "chart-title"], [1, "chart-subtitle"], [1, "chart-body"], ["echarts", "", "class", "status-chart", "aria-label", "Donut chart showing redemptions status distribution", 3, "options", "merge", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], [1, "chart-category-selector"], ["aria-label", "Select category for chart", 1, "category-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], ["echarts", "", "class", "products-chart", "aria-label", "Horizontal bar chart showing top products by redemptions", 3, "options", "merge", 4, "ngIf"], ["class", "chart-legend", 4, "ngIf"], [1, "controls-section"], [1, "controls-card"], [1, "controls-row"], [1, "search-group"], [1, "fa-solid", "fa-magnifying-glass", "search-icon"], ["type", "text", "placeholder", "Search by user, product, or redemption ID...", "aria-label", "Search redemptions", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "btn-filter", 3, "click"], [1, "fa-solid", "fa-sliders"], [1, "fa-solid", "fa-chevron-down", "toggle-icon"], ["class", "filters-panel", 4, "ngIf"], [1, "results-summary"], [1, "table-section"], [1, "table-container"], ["class", "redemptions-table", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], ["echarts", "", "aria-label", "Donut chart showing redemptions status distribution", 1, "status-chart", 3, "options", "merge"], [1, "chart-empty"], [1, "fa-regular", "fa-chart-pie"], [3, "value"], ["echarts", "", "aria-label", "Horizontal bar chart showing top products by redemptions", 1, "products-chart", 3, "options", "merge"], [1, "fa-regular", "fa-chart-bar"], [1, "chart-legend"], [1, "legend-item"], [1, "legend-color", "redemptions"], [1, "legend-label"], [1, "filters-panel"], [1, "filters-grid"], [1, "filter-group"], [3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "0"], ["value", "1"], ["value", "3"], ["value", "2"], ["value", "date"], ["value", "quantity"], ["value", "points"], [1, "order-toggle"], ["title", "Descending", 1, "order-btn", 3, "click"], [1, "fa-solid", "fa-arrow-down-wide-short"], ["title", "Ascending", 1, "order-btn", 3, "click"], [1, "fa-solid", "fa-arrow-up-wide-short"], [1, "filter-group", "filter-actions"], [1, "btn-reset", 3, "click"], [1, "fa-solid", "fa-rotate-left"], [1, "redemptions-table"], ["class", "redemption-row", "tabindex", "0", "role", "button", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", "role", "button", 1, "redemption-row", 3, "click", "keydown.enter"], [1, "user-cell"], [1, "user-info-cell"], [1, "user-avatar"], [1, "user-details"], [1, "user-email"], [1, "product-cell"], [1, "product-info"], [1, "product-name"], [1, "product-category"], [1, "quantity-cell"], [1, "quantity-value"], [1, "points-cell"], [1, "points-value"], [1, "status-cell"], [1, "status-tag"], [1, "date-cell"], [1, "empty-state"], [1, "fa-regular", "fa-rectangle-list"], ["class", "empty-subtext", 4, "ngIf"], [1, "empty-subtext"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "fa-solid", "fa-chevron-left"], [1, "page-info"], [1, "fa-solid", "fa-chevron-right"], [1, "drawer-overlay", 3, "click"], [1, "drawer-container"], [1, "drawer-header"], [1, "drawer-title-section"], [1, "drawer-title"], [1, "drawer-meta"], [1, "status-tag", "status-lg"], [1, "created-time"], [1, "fa-regular", "fa-clock"], ["title", "Close", 1, "btn-close-drawer", 3, "click"], [1, "drawer-content"], [1, "detail-section"], [1, "section-header"], [1, "fa-solid", "fa-user", "section-icon"], [1, "section-title"], [1, "user-card"], [1, "user-avatar-lg"], [1, "user-card-details"], [1, "user-card-name"], [1, "user-card-email"], [1, "info-grid"], [1, "info-item"], [1, "info-label"], [1, "info-value", "highlight"], [1, "info-value"], [1, "fa-solid", "fa-box", "section-icon"], [1, "product-card"], [1, "product-image"], [3, "error", "src", "alt"], [1, "product-card-details"], [1, "product-card-name"], [1, "category-badge"], [1, "info-item", "full-width"], [1, "info-value", "highlight-lg"], [1, "detail-section", "action-section"], [1, "fa-solid", "fa-gavel", "section-icon"], ["class", "status-message success", 4, "ngIf"], ["class", "status-message error", 4, "ngIf"], ["class", "notes-field", 4, "ngIf"], ["class", "existing-notes", 4, "ngIf"], [1, "fa-solid", "fa-clock-rotate-left", "section-icon"], [1, "timeline"], [1, "timeline-item"], [1, "timeline-dot", "created"], [1, "timeline-content"], [1, "timeline-label"], [1, "timeline-time"], ["class", "timeline-item", 4, "ngIf"], [1, "action-buttons"], [1, "btn", "btn-approve", 3, "click", "disabled"], [1, "fa-solid", "fa-check"], [1, "btn", "btn-reject", 3, "click", "disabled"], ["class", "reason-warning", 4, "ngIf"], [1, "reason-warning"], [1, "fa-solid", "fa-triangle-exclamation"], [1, "btn", "btn-deliver", 3, "click", "disabled"], [1, "fa-solid", "fa-truck"], [1, "status-message", "success"], [1, "status-message", "error"], [1, "fa-solid", "fa-circle-xmark"], [1, "status-message-content"], ["class", "rejection-reason", 4, "ngIf"], [1, "rejection-reason"], [1, "notes-field"], [1, "notes-label"], ["class", "required-hint", 4, "ngIf"], ["rows", "3", 1, "notes-textarea", 3, "ngModelChange", "input", "ngModel", "placeholder", "disabled"], [1, "required-hint"], [1, "existing-notes"], [1, "notes-display"], [1, "timeline-dot"], [1, "timeline-dot", "delivered"], [1, "drawer-loading"]], template: function RedemptionManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "h1", 4);
            i0.ɵɵtext(6, "Redemptions Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5);
            i0.ɵɵtemplate(8, RedemptionManagementComponent_div_8_Template, 6, 3, "div", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "main", 7);
            i0.ɵɵtemplate(10, RedemptionManagementComponent_div_10_Template, 6, 1, "div", 8)(11, RedemptionManagementComponent_div_11_Template, 6, 1, "div", 9)(12, RedemptionManagementComponent_div_12_Template, 4, 0, "div", 10)(13, RedemptionManagementComponent_ng_container_13_Template, 48, 18, "ng-container", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, RedemptionManagementComponent_div_14_Template, 1, 0, "div", 12);
            i0.ɵɵelementStart(15, "div", 13);
            i0.ɵɵtemplate(16, RedemptionManagementComponent_div_16_Template, 103, 36, "div", 14)(17, RedemptionManagementComponent_div_17_Template, 4, 0, "div", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.currentUser);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showSuccessAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDetailsDrawer);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.showDetailsDrawer);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedRedemption && !ctx.isLoadingDetails);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoadingDetails);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, FormsModule, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, AdminSidebarComponent, NgxEchartsDirective, i4.DecimalPipe], styles: ["\n\n\n\n\n\n\n\n\n.admin-redemptions-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: #f8faf9;\n}\n\n.admin-redemptions-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n\n\n\n\n\n.page-header[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.page-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n\n.user-role[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.user-role[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n\n\n\n\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 32px;\n}\n\n\n\n\n\n.success-alert[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.success-alert[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n}\n\n.error-alert[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n}\n\n.success-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.success-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n}\n\n.alert-dismiss[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n\n.alert-dismiss[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.success-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\n  color: #047857;\n}\n\n.error-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n\n\n\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  gap: 16px;\n}\n\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to { transform: rotate(360deg); }\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n\n\n\n\n.charts-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.chart-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.chart-title-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.chart-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.chart-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n}\n\n.chart-category-selector[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.category-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n}\n\n.category-select[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n}\n\n.category-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.chart-body[_ngcontent-%COMP%] {\n  min-height: 200px;\n}\n\n.status-chart[_ngcontent-%COMP%], \n.products-chart[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n}\n\n.chart-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 200px;\n  color: #9ca3af;\n}\n\n.chart-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.legend-color[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 3px;\n}\n\n.legend-color.redemptions[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n}\n\n.legend-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n\n\n\n\n.controls-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.controls-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 20px 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.controls-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.search-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 280px;\n  position: relative;\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 14px;\n  pointer-events: none;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px 10px 40px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.btn-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: #ffffff;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-filter[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.btn-filter.active[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border-color: #2c5f3f;\n  color: #2c5f3f;\n}\n\n.toggle-icon[_ngcontent-%COMP%] {\n  font-size: 10px;\n  transition: transform 0.2s;\n}\n\n.toggle-icon.rotated[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n\n\n\n.filters-panel[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n}\n\n.filters-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 16px;\n  align-items: end;\n}\n\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n}\n\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n\n\n.order-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n\n.order-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: #ffffff;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.order-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.order-btn.active[_ngcontent-%COMP%] {\n  background: #2c5f3f;\n  border-color: #2c5f3f;\n  color: #ffffff;\n}\n\n\n\n.btn-reset[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #ffffff;\n  color: #6b7280;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-reset[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  color: #374151;\n  border-color: #d1d5db;\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n\n\n\n.results-summary[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #f3f4f6;\n  font-size: 13px;\n  color: #6b7280;\n}\n\n\n\n\n\n.table-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.redemptions-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  text-align: left;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f3f4f6;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.redemptions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  font-size: 14px;\n  color: #374151;\n}\n\n\n\n.user-info-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.user-details[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.user-details[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.user-details[_ngcontent-%COMP%]   .user-email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n.product-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n\n.product-info[_ngcontent-%COMP%]   .product-category[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n\n\n.quantity-value[_ngcontent-%COMP%], \n.points-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n\n\n.status-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  background: #ffffff;\n  border: 1px solid;\n}\n\n.status-tag.status-pending[_ngcontent-%COMP%] {\n  color: #d97706;\n  border-color: #fcd34d;\n  background: #fffbeb;\n}\n\n.status-tag.status-approved[_ngcontent-%COMP%] {\n  color: #059669;\n  border-color: #6ee7b7;\n  background: #ecfdf5;\n}\n\n.status-tag.status-delivered[_ngcontent-%COMP%] {\n  color: #6b7280;\n  border-color: #d1d5db;\n  background: #f9fafb;\n}\n\n.status-tag.status-rejected[_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: #fca5a5;\n  background: #fef2f2;\n}\n\n.status-tag.status-lg[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 13px;\n}\n\n\n\n.date-cell[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n}\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  text-align: center;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #d1d5db;\n  margin-bottom: 16px;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #6b7280;\n  margin: 0;\n}\n\n.empty-state[_ngcontent-%COMP%]   .empty-subtext[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 400;\n  color: #9ca3af;\n  margin-top: 8px;\n}\n\n\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 16px 24px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n}\n\n\n\n\n\n.drawer-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.4);\n  z-index: 999;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.details-drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: -560px;\n  width: 560px;\n  height: 100vh;\n  background: #ffffff;\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  transition: right 0.3s ease;\n  display: flex;\n  flex-direction: column;\n}\n\n.details-drawer.open[_ngcontent-%COMP%] {\n  right: 0;\n}\n\n.drawer-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n\n\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  flex-shrink: 0;\n}\n\n.drawer-title-section[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.drawer-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 12px 0;\n}\n\n.drawer-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.created-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: #6b7280;\n}\n\n.created-time[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.btn-close-drawer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-close-drawer[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n\n\n.drawer-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n\n\n.detail-section[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-radius: 10px;\n  padding: 20px;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n\n.section-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #2c5f3f;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin: 0;\n}\n\n\n\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.user-avatar-lg[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.user-card-details[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.user-card-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.user-card-email[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n}\n\n\n\n.product-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.product-image[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 8px;\n  overflow: hidden;\n  flex-shrink: 0;\n  background: #e5e7eb;\n}\n\n.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.product-card-details[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.product-card-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 6px;\n}\n\n.category-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 4px 10px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n\n\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 12px;\n  background: #ffffff;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n}\n\n.info-item.full-width[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n\n.info-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.info-value[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.info-value.highlight[_ngcontent-%COMP%] {\n  color: #2c5f3f;\n}\n\n.info-value.highlight-lg[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #2c5f3f;\n}\n\n\n\n.action-section[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-approve[_ngcontent-%COMP%] {\n  background: #2c5f3f;\n  color: #ffffff;\n}\n\n.btn-approve[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1e4620;\n}\n\n.btn-reject[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: #ffffff;\n}\n\n.btn-reject[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.btn-reject.needs-reason[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n\n.btn-deliver[_ngcontent-%COMP%] {\n  background: #0891b2;\n  color: #ffffff;\n}\n\n.btn-deliver[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0e7490;\n}\n\n\n\n.reason-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #fffbeb;\n  border: 1px solid #fcd34d;\n  border-radius: 8px;\n  color: #d97706;\n  font-size: 13px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  animation: _ngcontent-%COMP%_shake 0.4s ease;\n}\n\n@keyframes _ngcontent-%COMP%_shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-4px); }\n  50% { transform: translateX(4px); }\n  75% { transform: translateX(-4px); }\n}\n\n\n\n.status-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  border-radius: 8px;\n  font-size: 14px;\n}\n\n.status-message.success[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n}\n\n.status-message.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n\n.status-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.status-message-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.rejection-reason[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 13px;\n}\n\n\n\n.notes-field[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n\n.notes-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 8px;\n}\n\n.required-hint[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 500;\n  font-size: 11px;\n  margin-left: 6px;\n}\n\n.notes-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-family: inherit;\n  font-size: 14px;\n  resize: vertical;\n  min-height: 80px;\n  transition: all 0.2s;\n}\n\n.notes-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.notes-textarea.warning-border[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.notes-textarea[_ngcontent-%COMP%]:disabled {\n  background: #f9fafb;\n  cursor: not-allowed;\n}\n\n\n\n.existing-notes[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n\n.notes-display[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #f9fafb;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #374151;\n  line-height: 1.5;\n}\n\n\n\n.timeline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  padding: 12px 0;\n  position: relative;\n}\n\n.timeline-item[_ngcontent-%COMP%]:not(:last-child)::after {\n  content: '';\n  position: absolute;\n  left: 5px;\n  top: 32px;\n  bottom: 0;\n  width: 2px;\n  background: #e5e7eb;\n}\n\n.timeline-dot[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n\n.timeline-dot.created[_ngcontent-%COMP%] {\n  background: #9ca3af;\n}\n\n.timeline-dot.approved[_ngcontent-%COMP%] {\n  background: #10b981;\n}\n\n.timeline-dot.rejected[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n\n.timeline-dot.delivered[_ngcontent-%COMP%] {\n  background: #2c5f3f;\n}\n\n.timeline-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.timeline-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 2px;\n}\n\n.timeline-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n\n\n.drawer-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 16px;\n}\n\n.drawer-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n\n\n\n\n@media (max-width: 1280px) {\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  \n  .page-header[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  \n  .controls-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .search-group[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  \n  .filters-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .details-drawer[_ngcontent-%COMP%] {\n    width: 100%;\n    right: -100%;\n  }\n  \n  .redemptions-table[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  \n  .redemptions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .redemptions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px 10px;\n  }\n  \n  .user-info-cell[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  \n  .user-avatar[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 12px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RedemptionManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-redemption-management', standalone: true, imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective], providers: [
                    provideEchartsCore({ echarts })
                ], template: "<div class=\"admin-redemptions-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"admin-redemptions-main\">\r\n    <!-- Header - Matches Products/Users/Events -->\r\n    <header class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Redemptions Management</h1>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <div class=\"user-info\" *ngIf=\"currentUser\">\r\n          <span class=\"user-name\">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>\r\n          <span class=\"user-role\">\r\n            <i class=\"fa-solid fa-shield-halved\"></i>\r\n            {{ currentUser?.roles?.[0] || 'Admin' }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"main-content\">\r\n      <!-- Success Message -->\r\n      <div class=\"success-alert\" *ngIf=\"showSuccessAlert\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-check\"></i>\r\n        <span>{{ successMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"closeAlert('success')\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Error Message -->\r\n      <div class=\"error-alert\" *ngIf=\"showErrorAlert\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span>{{ errorMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"closeAlert('error')\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"loading-spinner\"></div>\r\n        <p>Loading redemptions...</p>\r\n      </div>\r\n\r\n      <ng-container *ngIf=\"!isLoading\">\r\n        <!-- Charts Section - 2 charts side by side -->\r\n        <section class=\"charts-section\" aria-label=\"Redemption Analytics\">\r\n          <div class=\"charts-grid\">\r\n            <!-- Chart 1: Redemptions Status Pie/Donut Chart -->\r\n            <div class=\"chart-card\">\r\n              <div class=\"chart-header\">\r\n                <div class=\"chart-title-group\">\r\n                  <h2 class=\"chart-title\">Redemptions Status</h2>\r\n                  <p class=\"chart-subtitle\">Distribution by status</p>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-body\">\r\n                <div \r\n                  *ngIf=\"hasRedemptionStatusData()\"\r\n                  echarts \r\n                  [options]=\"redemptionStatusChartOption\" \r\n                  [merge]=\"redemptionStatusChartOption\"\r\n                  class=\"status-chart\"\r\n                  aria-label=\"Donut chart showing redemptions status distribution\">\r\n                </div>\r\n                <div class=\"chart-empty\" *ngIf=\"!hasRedemptionStatusData()\">\r\n                  <i class=\"fa-regular fa-chart-pie\"></i>\r\n                  <p>No redemption data available</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Chart 2: Top 5 Products by Redemptions -->\r\n            <div class=\"chart-card\">\r\n              <div class=\"chart-header\">\r\n                <div class=\"chart-title-group\">\r\n                  <h2 class=\"chart-title\">Top 5 Products by Redemptions</h2>\r\n                  <p class=\"chart-subtitle\">Most redeemed products</p>\r\n                </div>\r\n                <!-- Category Filter -->\r\n                <div class=\"chart-category-selector\">\r\n                  <select \r\n                    [(ngModel)]=\"selectedChartCategory\" \r\n                    (change)=\"onChartCategoryChange()\"\r\n                    class=\"category-select\"\r\n                    aria-label=\"Select category for chart\">\r\n                    <option value=\"all\">All Categories</option>\r\n                    <option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n                      {{ category.name }}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-body\">\r\n                <div \r\n                  *ngIf=\"topProductsChartData().length > 0\"\r\n                  echarts \r\n                  [options]=\"topProductsChartOption\" \r\n                  [merge]=\"topProductsChartOption\"\r\n                  class=\"products-chart\"\r\n                  aria-label=\"Horizontal bar chart showing top products by redemptions\">\r\n                </div>\r\n                <div class=\"chart-empty\" *ngIf=\"topProductsChartData().length === 0\">\r\n                  <i class=\"fa-regular fa-chart-bar\"></i>\r\n                  <p>No product redemption data for this category</p>\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-legend\" *ngIf=\"topProductsChartData().length > 0\">\r\n                <div class=\"legend-item\">\r\n                  <span class=\"legend-color redemptions\"></span>\r\n                  <span class=\"legend-label\">Total Redemptions</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Controls Card -->\r\n        <section class=\"controls-section\">\r\n          <div class=\"controls-card\">\r\n            <div class=\"controls-row\">\r\n              <!-- Search -->\r\n              <div class=\"search-group\">\r\n                <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n                <input\r\n                  type=\"text\"\r\n                  class=\"search-input\"\r\n                  placeholder=\"Search by user, product, or redemption ID...\"\r\n                  [(ngModel)]=\"searchText\"\r\n                  (input)=\"onSearch()\"\r\n                  aria-label=\"Search redemptions\"\r\n                />\r\n              </div>\r\n\r\n              <!-- Filters Toggle -->\r\n              <button class=\"btn-filter\" (click)=\"toggleFilters()\" [class.active]=\"showFilters\">\r\n                <i class=\"fa-solid fa-sliders\"></i>\r\n                Filters\r\n                <i class=\"fa-solid fa-chevron-down toggle-icon\" [class.rotated]=\"showFilters\"></i>\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Expandable Filters Panel -->\r\n            <div class=\"filters-panel\" *ngIf=\"showFilters\">\r\n              <div class=\"filters-grid\">\r\n                <!-- Status Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Status</label>\r\n                  <select [(ngModel)]=\"selectedStatusFilter\" (change)=\"onStatusFilterChange()\">\r\n                    <option value=\"\">All Status</option>\r\n                    <option value=\"0\">Pending</option>\r\n                    <option value=\"1\">Approved</option>\r\n                    <option value=\"3\">Delivered</option>\r\n                    <option value=\"2\">Rejected</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Sort By -->\r\n                <div class=\"filter-group\">\r\n                  <label>Sort By</label>\r\n                  <select [(ngModel)]=\"sortField\" (change)=\"onSortChange()\">\r\n                    <option value=\"date\">Date</option>\r\n                    <option value=\"quantity\">Quantity</option>\r\n                    <option value=\"points\">Points</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Order By -->\r\n                <div class=\"filter-group\">\r\n                  <label>Order</label>\r\n                  <div class=\"order-toggle\">\r\n                    <button \r\n                      class=\"order-btn\" \r\n                      [class.active]=\"sortOrder === 'desc'\"\r\n                      (click)=\"setSortOrder('desc')\"\r\n                      title=\"Descending\">\r\n                      <i class=\"fa-solid fa-arrow-down-wide-short\"></i>\r\n                    </button>\r\n                    <button \r\n                      class=\"order-btn\" \r\n                      [class.active]=\"sortOrder === 'asc'\"\r\n                      (click)=\"setSortOrder('asc')\"\r\n                      title=\"Ascending\">\r\n                      <i class=\"fa-solid fa-arrow-up-wide-short\"></i>\r\n                    </button>\r\n                  </div>\r\n                </div>\r\n\r\n                <!-- Reset Button -->\r\n                <div class=\"filter-group filter-actions\">\r\n                  <button class=\"btn-reset\" (click)=\"resetFilters()\">\r\n                    <i class=\"fa-solid fa-rotate-left\"></i>\r\n                    Reset\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Results Summary -->\r\n            <div class=\"results-summary\">\r\n              <span>{{ filteredRedemptions.length }} redemption{{ filteredRedemptions.length !== 1 ? 's' : '' }} found</span>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Redemptions Table -->\r\n        <section class=\"table-section\">\r\n          <div class=\"table-container\">\r\n            <table class=\"redemptions-table\" *ngIf=\"filteredRedemptions.length > 0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>User</th>\r\n                  <th>Product</th>\r\n                  <th>Quantity</th>\r\n                  <th>Points Spent</th>\r\n                  <th>Status</th>\r\n                  <th>Created</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr \r\n                  *ngFor=\"let redemption of paginatedRedemptions\"\r\n                  class=\"redemption-row\"\r\n                  (click)=\"openDetails(redemption)\"\r\n                  tabindex=\"0\"\r\n                  (keydown.enter)=\"openDetails(redemption)\"\r\n                  role=\"button\"\r\n                  [attr.aria-label]=\"'View details for redemption by ' + redemption.userName\"\r\n                >\r\n                  <td class=\"user-cell\">\r\n                    <div class=\"user-info-cell\">\r\n                      <div class=\"user-avatar\">\r\n                        {{ getUserInitials(redemption.userName) }}\r\n                      </div>\r\n                      <div class=\"user-details\">\r\n                        <div class=\"user-name\">{{ redemption.userName }}</div>\r\n                        <div class=\"user-email\">{{ redemption.userEmail }}</div>\r\n                      </div>\r\n                    </div>\r\n                  </td>\r\n                  <td class=\"product-cell\">\r\n                    <div class=\"product-info\">\r\n                      <div class=\"product-name\">{{ redemption.productName }}</div>\r\n                      <div class=\"product-category\">{{ redemption.productCategory }}</div>\r\n                    </div>\r\n                  </td>\r\n                  <td class=\"quantity-cell\">\r\n                    <span class=\"quantity-value\">{{ redemption.quantity }}</span>\r\n                  </td>\r\n                  <td class=\"points-cell\">\r\n                    <span class=\"points-value\">{{ redemption.pointsSpent | number }}</span>\r\n                  </td>\r\n                  <td class=\"status-cell\">\r\n                    <span class=\"status-tag\" [class]=\"'status-' + getStatusLabel(redemption.status).toLowerCase()\">\r\n                      {{ getStatusLabel(redemption.status) }}\r\n                    </span>\r\n                  </td>\r\n                  <td class=\"date-cell\">\r\n                    {{ formatDate(redemption.createdAt) }}\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n            <!-- Empty State -->\r\n            <div class=\"empty-state\" *ngIf=\"filteredRedemptions.length === 0\">\r\n              <i class=\"fa-regular fa-rectangle-list\"></i>\r\n              <p>No redemptions found</p>\r\n              <p class=\"empty-subtext\" *ngIf=\"searchText || selectedStatus !== null\">\r\n                Try adjusting your filters\r\n              </p>\r\n              <p class=\"empty-subtext\" *ngIf=\"!searchText && selectedStatus === null\">\r\n                No redemption requests yet\r\n              </p>\r\n            </div>\r\n\r\n            <!-- Pagination -->\r\n            <div class=\"pagination\" *ngIf=\"totalPages > 1\">\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage === 1\"\r\n                (click)=\"changePage(currentPage - 1)\"\r\n              >\r\n                <i class=\"fa-solid fa-chevron-left\"></i> Previous\r\n              </button>\r\n              <div class=\"page-info\">\r\n                Page {{ currentPage }} of {{ totalPages }}\r\n              </div>\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage === totalPages\"\r\n                (click)=\"changePage(currentPage + 1)\"\r\n              >\r\n                Next <i class=\"fa-solid fa-chevron-right\"></i>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </ng-container>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- Details Drawer -->\r\n  <div class=\"drawer-overlay\" *ngIf=\"showDetailsDrawer\" (click)=\"closeDetails()\"></div>\r\n  <div class=\"details-drawer\" [class.open]=\"showDetailsDrawer\">\r\n    <div class=\"drawer-container\" *ngIf=\"selectedRedemption && !isLoadingDetails\">\r\n      <!-- Drawer Header -->\r\n      <div class=\"drawer-header\">\r\n        <div class=\"drawer-title-section\">\r\n          <h3 class=\"drawer-title\">Redemption Details</h3>\r\n          <div class=\"drawer-meta\">\r\n            <span class=\"status-tag status-lg\" [class]=\"'status-' + getStatusLabel(selectedRedemption.status).toLowerCase()\">\r\n              {{ getStatusLabel(selectedRedemption.status) }}\r\n            </span>\r\n            <span class=\"created-time\">\r\n              <i class=\"fa-regular fa-clock\"></i>\r\n              {{ formatDateTime(selectedRedemption.createdAt) }}\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <button class=\"btn-close-drawer\" (click)=\"closeDetails()\" title=\"Close\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Drawer Content -->\r\n      <div class=\"drawer-content\">\r\n        <!-- User Section -->\r\n        <div class=\"detail-section\">\r\n          <div class=\"section-header\">\r\n            <i class=\"fa-solid fa-user section-icon\"></i>\r\n            <h4 class=\"section-title\">User Information</h4>\r\n          </div>\r\n          <div class=\"user-card\">\r\n            <div class=\"user-avatar-lg\">\r\n              {{ getUserInitials(selectedRedemption.userName) }}\r\n            </div>\r\n            <div class=\"user-card-details\">\r\n              <div class=\"user-card-name\">{{ selectedRedemption.userName }}</div>\r\n              <div class=\"user-card-email\">{{ selectedRedemption.userEmail }}</div>\r\n            </div>\r\n          </div>\r\n          <div class=\"info-grid\">\r\n            <div class=\"info-item\">\r\n              <span class=\"info-label\">Current Balance</span>\r\n              <span class=\"info-value highlight\">{{ selectedRedemption.userCurrentBalance | number }} pts</span>\r\n            </div>\r\n            <div class=\"info-item\">\r\n              <span class=\"info-label\">Total Earned</span>\r\n              <span class=\"info-value\">{{ selectedRedemption.userTotalEarned | number }} pts</span>\r\n            </div>\r\n            <div class=\"info-item\">\r\n              <span class=\"info-label\">Total Redeemed</span>\r\n              <span class=\"info-value\">{{ selectedRedemption.userTotalRedeemed | number }} pts</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Product Section -->\r\n        <div class=\"detail-section\">\r\n          <div class=\"section-header\">\r\n            <i class=\"fa-solid fa-box section-icon\"></i>\r\n            <h4 class=\"section-title\">Product Information</h4>\r\n          </div>\r\n          <div class=\"product-card\">\r\n            <div class=\"product-image\">\r\n              <img [src]=\"selectedRedemption.productImageUrl || 'assets/placeholder-product.png'\" \r\n                   [alt]=\"selectedRedemption.productName\"\r\n                   (error)=\"$any($event.target).src='assets/placeholder-product.png'\" />\r\n            </div>\r\n            <div class=\"product-card-details\">\r\n              <div class=\"product-card-name\">{{ selectedRedemption.productName }}</div>\r\n              <span class=\"category-badge\">{{ selectedRedemption.productCategory }}</span>\r\n            </div>\r\n          </div>\r\n          <div class=\"info-grid\">\r\n            <div class=\"info-item\">\r\n              <span class=\"info-label\">Points per Unit</span>\r\n              <span class=\"info-value\">{{ selectedRedemption.productPointsPerUnit | number }} pts</span>\r\n            </div>\r\n            <div class=\"info-item\">\r\n              <span class=\"info-label\">Quantity</span>\r\n              <span class=\"info-value\">{{ selectedRedemption.quantity }}</span>\r\n            </div>\r\n            <div class=\"info-item full-width\">\r\n              <span class=\"info-label\">Total Points Spent</span>\r\n              <span class=\"info-value highlight-lg\">{{ selectedRedemption.pointsSpent | number }} pts</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Action Panel -->\r\n        <div class=\"detail-section action-section\">\r\n          <div class=\"section-header\">\r\n            <i class=\"fa-solid fa-gavel section-icon\"></i>\r\n            <h4 class=\"section-title\">Actions</h4>\r\n          </div>\r\n          \r\n          <!-- Pending State Actions -->\r\n          <ng-container *ngIf=\"canApprove(selectedRedemption.status)\">\r\n            <div class=\"action-buttons\">\r\n              <button \r\n                class=\"btn btn-approve\"\r\n                (click)=\"approveRedemption()\"\r\n                [disabled]=\"isSubmitting\">\r\n                <i class=\"fa-solid fa-check\"></i> Approve\r\n              </button>\r\n              <button \r\n                class=\"btn btn-reject\"\r\n                (click)=\"rejectRedemption()\"\r\n                [disabled]=\"isSubmitting\"\r\n                [class.needs-reason]=\"!actionNotes.trim()\">\r\n                <i class=\"fa-solid fa-xmark\"></i> Reject\r\n              </button>\r\n            </div>\r\n            \r\n            <!-- Rejection Reason Warning -->\r\n            <div *ngIf=\"showReasonWarning\" class=\"reason-warning\">\r\n              <i class=\"fa-solid fa-triangle-exclamation\"></i>\r\n              Please enter a rejection reason before rejecting.\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Approved State Actions -->\r\n          <ng-container *ngIf=\"canDeliver(selectedRedemption.status)\">\r\n            <div class=\"action-buttons\">\r\n              <button \r\n                class=\"btn btn-deliver\"\r\n                (click)=\"markAsDelivered()\"\r\n                [disabled]=\"isSubmitting\">\r\n                <i class=\"fa-solid fa-truck\"></i> Mark as Delivered\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Delivered State -->\r\n          <div *ngIf=\"selectedRedemption.status === RedemptionStatus.Delivered\" class=\"status-message success\">\r\n            <i class=\"fa-solid fa-circle-check\"></i>\r\n            <span>Delivered on {{ formatDateTime(selectedRedemption.deliveredAt!) }}</span>\r\n          </div>\r\n\r\n          <!-- Rejected State -->\r\n          <div *ngIf=\"selectedRedemption.status === RedemptionStatus.Rejected\" class=\"status-message error\">\r\n            <i class=\"fa-solid fa-circle-xmark\"></i>\r\n            <div class=\"status-message-content\">\r\n              <span>Redemption was rejected. Points have been refunded.</span>\r\n              <div class=\"rejection-reason\" *ngIf=\"selectedRedemption.adminNotes\">\r\n                <strong>Reason:</strong> {{ selectedRedemption.adminNotes }}\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Admin Notes Input -->\r\n          <div class=\"notes-field\" *ngIf=\"canApprove(selectedRedemption.status) || canDeliver(selectedRedemption.status)\">\r\n            <label class=\"notes-label\">\r\n              Admin Notes\r\n              <span *ngIf=\"canApprove(selectedRedemption.status)\" class=\"required-hint\">* Required for rejection</span>\r\n            </label>\r\n            <textarea \r\n              class=\"notes-textarea\"\r\n              [(ngModel)]=\"actionNotes\"\r\n              [placeholder]=\"canApprove(selectedRedemption.status) ? 'Enter reason for rejection or optional notes for approval...' : 'Add delivery notes (optional)...'\"\r\n              rows=\"3\"\r\n              [class.warning-border]=\"showReasonWarning && canApprove(selectedRedemption.status)\"\r\n              [disabled]=\"isSubmitting\"\r\n              (input)=\"onNotesInput()\"></textarea>\r\n          </div>\r\n\r\n          <!-- Existing Notes Display -->\r\n          <div class=\"existing-notes\" *ngIf=\"selectedRedemption.adminNotes && !canApprove(selectedRedemption.status) && selectedRedemption.status !== RedemptionStatus.Rejected\">\r\n            <label class=\"notes-label\">Admin Notes</label>\r\n            <div class=\"notes-display\">{{ selectedRedemption.adminNotes }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Audit Timeline -->\r\n        <div class=\"detail-section\">\r\n          <div class=\"section-header\">\r\n            <i class=\"fa-solid fa-clock-rotate-left section-icon\"></i>\r\n            <h4 class=\"section-title\">Timeline</h4>\r\n          </div>\r\n          <div class=\"timeline\">\r\n            <div class=\"timeline-item\">\r\n              <div class=\"timeline-dot created\"></div>\r\n              <div class=\"timeline-content\">\r\n                <div class=\"timeline-label\">Created</div>\r\n                <div class=\"timeline-time\">{{ formatDateTime(selectedRedemption.createdAt) }}</div>\r\n              </div>\r\n            </div>\r\n            \r\n            <div class=\"timeline-item\" *ngIf=\"selectedRedemption.approvedAt\">\r\n              <div class=\"timeline-dot\" [class.approved]=\"selectedRedemption.status !== RedemptionStatus.Rejected\" [class.rejected]=\"selectedRedemption.status === RedemptionStatus.Rejected\"></div>\r\n              <div class=\"timeline-content\">\r\n                <div class=\"timeline-label\">{{ selectedRedemption.status === RedemptionStatus.Rejected ? 'Rejected' : 'Approved' }}</div>\r\n                <div class=\"timeline-time\">{{ formatDateTime(selectedRedemption.approvedAt) }}</div>\r\n              </div>\r\n            </div>\r\n            \r\n            <div class=\"timeline-item\" *ngIf=\"selectedRedemption.deliveredAt\">\r\n              <div class=\"timeline-dot delivered\"></div>\r\n              <div class=\"timeline-content\">\r\n                <div class=\"timeline-label\">Delivered</div>\r\n                <div class=\"timeline-time\">{{ formatDateTime(selectedRedemption.deliveredAt) }}</div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Loading State for Drawer -->\r\n    <div class=\"drawer-loading\" *ngIf=\"isLoadingDetails\">\r\n      <div class=\"loading-spinner\"></div>\r\n      <p>Loading details...</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["/* Redemptions Management - Redesigned Layout */\n/* Matches Products/Users/Events header & structure */\n\n/* =================================\n   Layout Structure\n   ================================= */\n.admin-redemptions-wrapper {\n  display: flex;\n  min-height: 100vh;\n  background: #f8faf9;\n}\n\n.admin-redemptions-main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n\n/* =================================\n   Header (Matches Products/Users/Events)\n   ================================= */\n.page-header {\n  background: #ffffff;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.page-title {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-name {\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n\n.user-role {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.user-role i {\n  font-size: 11px;\n}\n\n/* =================================\n   Main Content\n   ================================= */\n.main-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 32px;\n}\n\n/* =================================\n   Alerts\n   ================================= */\n.success-alert,\n.error-alert {\n  padding: 14px 16px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  animation: slideDown 0.3s ease;\n}\n\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.success-alert {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n}\n\n.error-alert {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n}\n\n.success-alert i,\n.error-alert i {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.success-alert span,\n.error-alert span {\n  flex: 1;\n  font-size: 14px;\n}\n\n.alert-dismiss {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n\n.alert-dismiss:hover {\n  opacity: 1;\n}\n\n.success-alert .alert-dismiss {\n  color: #047857;\n}\n\n.error-alert .alert-dismiss {\n  color: #dc2626;\n}\n\n/* =================================\n   Loading State\n   ================================= */\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  gap: 16px;\n}\n\n.loading-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #2c5f3f;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n.loading-container p {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n/* =================================\n   Charts Section\n   ================================= */\n.charts-section {\n  margin-bottom: 24px;\n}\n\n.charts-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 24px;\n}\n\n.chart-card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.chart-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.chart-title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.chart-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0;\n}\n\n.chart-subtitle {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n}\n\n.chart-category-selector {\n  flex-shrink: 0;\n}\n\n.category-select {\n  padding: 8px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n}\n\n.category-select:hover {\n  border-color: #d1d5db;\n}\n\n.category-select:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.chart-body {\n  min-height: 200px;\n}\n\n.status-chart,\n.products-chart {\n  width: 100%;\n  height: 200px;\n}\n\n.chart-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 200px;\n  color: #9ca3af;\n}\n\n.chart-empty i {\n  font-size: 40px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n\n.chart-empty p {\n  font-size: 14px;\n  margin: 0;\n}\n\n.chart-legend {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.legend-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.legend-color {\n  width: 12px;\n  height: 12px;\n  border-radius: 3px;\n}\n\n.legend-color.redemptions {\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n}\n\n.legend-label {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n/* =================================\n   Controls Section\n   ================================= */\n.controls-section {\n  margin-bottom: 24px;\n}\n\n.controls-card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 20px 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n}\n\n.controls-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.search-group {\n  flex: 1;\n  min-width: 280px;\n  position: relative;\n}\n\n.search-icon {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 14px;\n  pointer-events: none;\n}\n\n.search-input {\n  width: 100%;\n  padding: 10px 14px 10px 40px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.search-input::placeholder {\n  color: #9ca3af;\n}\n\n.btn-filter {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: #ffffff;\n  color: #374151;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-filter:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.btn-filter.active {\n  background: #f0fdf4;\n  border-color: #2c5f3f;\n  color: #2c5f3f;\n}\n\n.toggle-icon {\n  font-size: 10px;\n  transition: transform 0.2s;\n}\n\n.toggle-icon.rotated {\n  transform: rotate(180deg);\n}\n\n/* Filters Panel */\n.filters-panel {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n  animation: slideDown 0.2s ease;\n}\n\n.filters-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 16px;\n  align-items: end;\n}\n\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.filter-group label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.filter-group select {\n  padding: 8px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.filter-group select:hover {\n  border-color: #d1d5db;\n}\n\n.filter-group select:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n/* Order Toggle */\n.order-toggle {\n  display: flex;\n  gap: 4px;\n}\n\n.order-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: #ffffff;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.order-btn:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.order-btn.active {\n  background: #2c5f3f;\n  border-color: #2c5f3f;\n  color: #ffffff;\n}\n\n/* Reset Button */\n.btn-reset {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #ffffff;\n  color: #6b7280;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-reset:hover {\n  background: #f9fafb;\n  color: #374151;\n  border-color: #d1d5db;\n}\n\n.filter-actions {\n  justify-content: flex-end;\n}\n\n/* Results Summary */\n.results-summary {\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #f3f4f6;\n  font-size: 13px;\n  color: #6b7280;\n}\n\n/* =================================\n   Table Section\n   ================================= */\n.table-section {\n  margin-bottom: 24px;\n}\n\n.table-container {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.redemptions-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n\n.redemptions-table thead tr {\n  background: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.redemptions-table th {\n  padding: 14px 16px;\n  text-align: left;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.redemptions-table tbody tr {\n  border-bottom: 1px solid #f3f4f6;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n\n.redemptions-table tbody tr:hover {\n  background: #f9fafb;\n}\n\n.redemptions-table tbody tr:last-child {\n  border-bottom: none;\n}\n\n.redemptions-table td {\n  padding: 16px;\n  font-size: 14px;\n  color: #374151;\n}\n\n/* User Cell */\n.user-info-cell {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.user-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.user-details {\n  min-width: 0;\n}\n\n.user-details .user-name {\n  font-weight: 600;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.user-details .user-email {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* Product Cell */\n.product-info {\n  min-width: 0;\n}\n\n.product-info .product-name {\n  font-weight: 500;\n  color: #1f2937;\n}\n\n.product-info .product-category {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n/* Values */\n.quantity-value,\n.points-value {\n  font-weight: 600;\n  color: #1f2937;\n}\n\n/* Status Tags - Simplified (White BG, Green Text) */\n.status-tag {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  background: #ffffff;\n  border: 1px solid;\n}\n\n.status-tag.status-pending {\n  color: #d97706;\n  border-color: #fcd34d;\n  background: #fffbeb;\n}\n\n.status-tag.status-approved {\n  color: #059669;\n  border-color: #6ee7b7;\n  background: #ecfdf5;\n}\n\n.status-tag.status-delivered {\n  color: #6b7280;\n  border-color: #d1d5db;\n  background: #f9fafb;\n}\n\n.status-tag.status-rejected {\n  color: #dc2626;\n  border-color: #fca5a5;\n  background: #fef2f2;\n}\n\n.status-tag.status-lg {\n  padding: 8px 16px;\n  font-size: 13px;\n}\n\n/* Date Cell */\n.date-cell {\n  color: #6b7280;\n  font-size: 13px;\n}\n\n/* Empty State */\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  text-align: center;\n}\n\n.empty-state i {\n  font-size: 48px;\n  color: #d1d5db;\n  margin-bottom: 16px;\n}\n\n.empty-state p {\n  font-size: 16px;\n  font-weight: 500;\n  color: #6b7280;\n  margin: 0;\n}\n\n.empty-state .empty-subtext {\n  font-size: 14px;\n  font-weight: 400;\n  color: #9ca3af;\n  margin-top: 8px;\n}\n\n/* Pagination */\n.pagination {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 16px 24px;\n  border-top: 1px solid #f3f4f6;\n}\n\n.page-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.page-btn:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.page-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.page-info {\n  font-size: 14px;\n  color: #6b7280;\n}\n\n/* =================================\n   Details Drawer\n   ================================= */\n.drawer-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.4);\n  z-index: 999;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.details-drawer {\n  position: fixed;\n  top: 0;\n  right: -560px;\n  width: 560px;\n  height: 100vh;\n  background: #ffffff;\n  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  transition: right 0.3s ease;\n  display: flex;\n  flex-direction: column;\n}\n\n.details-drawer.open {\n  right: 0;\n}\n\n.drawer-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n/* Drawer Header */\n.drawer-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  flex-shrink: 0;\n}\n\n.drawer-title-section {\n  flex: 1;\n}\n\n.drawer-title {\n  font-size: 18px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 12px 0;\n}\n\n.drawer-meta {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.created-time {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: #6b7280;\n}\n\n.created-time i {\n  font-size: 12px;\n}\n\n.btn-close-drawer {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-close-drawer:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n/* Drawer Content */\n.drawer-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n/* Detail Sections */\n.detail-section {\n  background: #f9fafb;\n  border-radius: 10px;\n  padding: 20px;\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n\n.section-icon {\n  font-size: 16px;\n  color: #2c5f3f;\n}\n\n.section-title {\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin: 0;\n}\n\n/* User Card */\n.user-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.user-avatar-lg {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #2c5f3f, #4ade80);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.user-card-details {\n  min-width: 0;\n}\n\n.user-card-name {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.user-card-email {\n  font-size: 13px;\n  color: #6b7280;\n}\n\n/* Product Card */\n.product-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.product-image {\n  width: 64px;\n  height: 64px;\n  border-radius: 8px;\n  overflow: hidden;\n  flex-shrink: 0;\n  background: #e5e7eb;\n}\n\n.product-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.product-card-details {\n  min-width: 0;\n}\n\n.product-card-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 6px;\n}\n\n.category-badge {\n  display: inline-flex;\n  padding: 4px 10px;\n  background: rgba(44, 95, 63, 0.1);\n  color: #2c5f3f;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n/* Info Grid */\n.info-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n\n.info-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 12px;\n  background: #ffffff;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n}\n\n.info-item.full-width {\n  grid-column: span 2;\n}\n\n.info-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.info-value {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.info-value.highlight {\n  color: #2c5f3f;\n}\n\n.info-value.highlight-lg {\n  font-size: 18px;\n  color: #2c5f3f;\n}\n\n/* Action Section */\n.action-section {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n}\n\n.action-buttons {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.btn {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-approve {\n  background: #2c5f3f;\n  color: #ffffff;\n}\n\n.btn-approve:hover:not(:disabled) {\n  background: #1e4620;\n}\n\n.btn-reject {\n  background: #dc2626;\n  color: #ffffff;\n}\n\n.btn-reject:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.btn-reject.needs-reason {\n  opacity: 0.7;\n}\n\n.btn-deliver {\n  background: #0891b2;\n  color: #ffffff;\n}\n\n.btn-deliver:hover:not(:disabled) {\n  background: #0e7490;\n}\n\n/* Reason Warning */\n.reason-warning {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #fffbeb;\n  border: 1px solid #fcd34d;\n  border-radius: 8px;\n  color: #d97706;\n  font-size: 13px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  animation: shake 0.4s ease;\n}\n\n@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-4px); }\n  50% { transform: translateX(4px); }\n  75% { transform: translateX(-4px); }\n}\n\n/* Status Messages */\n.status-message {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  border-radius: 8px;\n  font-size: 14px;\n}\n\n.status-message.success {\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n}\n\n.status-message.error {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n\n.status-message i {\n  font-size: 18px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.status-message-content {\n  flex: 1;\n}\n\n.rejection-reason {\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 13px;\n}\n\n/* Notes Field */\n.notes-field {\n  margin-top: 16px;\n}\n\n.notes-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 8px;\n}\n\n.required-hint {\n  color: #dc2626;\n  font-weight: 500;\n  font-size: 11px;\n  margin-left: 6px;\n}\n\n.notes-textarea {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-family: inherit;\n  font-size: 14px;\n  resize: vertical;\n  min-height: 80px;\n  transition: all 0.2s;\n}\n\n.notes-textarea:focus {\n  outline: none;\n  border-color: #2c5f3f;\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\n}\n\n.notes-textarea.warning-border {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.notes-textarea:disabled {\n  background: #f9fafb;\n  cursor: not-allowed;\n}\n\n/* Existing Notes */\n.existing-notes {\n  margin-top: 16px;\n}\n\n.notes-display {\n  padding: 12px;\n  background: #f9fafb;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #374151;\n  line-height: 1.5;\n}\n\n/* Timeline */\n.timeline {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.timeline-item {\n  display: flex;\n  gap: 14px;\n  padding: 12px 0;\n  position: relative;\n}\n\n.timeline-item:not(:last-child)::after {\n  content: '';\n  position: absolute;\n  left: 5px;\n  top: 32px;\n  bottom: 0;\n  width: 2px;\n  background: #e5e7eb;\n}\n\n.timeline-dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n\n.timeline-dot.created {\n  background: #9ca3af;\n}\n\n.timeline-dot.approved {\n  background: #10b981;\n}\n\n.timeline-dot.rejected {\n  background: #ef4444;\n}\n\n.timeline-dot.delivered {\n  background: #2c5f3f;\n}\n\n.timeline-content {\n  flex: 1;\n}\n\n.timeline-label {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 2px;\n}\n\n.timeline-time {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n/* Drawer Loading */\n.drawer-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 16px;\n}\n\n.drawer-loading p {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n\n/* =================================\n   Responsive\n   ================================= */\n@media (max-width: 1280px) {\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 1024px) {\n  .main-content {\n    padding: 20px;\n  }\n  \n  .page-header {\n    padding: 16px 20px;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  \n  .controls-row {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .search-group {\n    min-width: 100%;\n  }\n  \n  .filters-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .details-drawer {\n    width: 100%;\n    right: -100%;\n  }\n  \n  .redemptions-table {\n    font-size: 13px;\n  }\n  \n  .redemptions-table th,\n  .redemptions-table td {\n    padding: 12px 10px;\n  }\n  \n  .user-info-cell {\n    gap: 8px;\n  }\n  \n  .user-avatar {\n    width: 32px;\n    height: 32px;\n    font-size: 12px;\n  }\n}\n"] }]
    }], () => [{ type: i1.RedemptionService }, { type: i2.ProductsService }, { type: i3.AuthService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RedemptionManagementComponent, { className: "RedemptionManagementComponent", filePath: "src/app/pages/admin/redemptions/redemption-management.component.ts", lineNumber: 49 }); })();
//# sourceMappingURL=redemption-management.component.js.map