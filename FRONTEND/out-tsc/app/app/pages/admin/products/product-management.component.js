import { Component, ViewChild, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';
// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ProductFormModalComponent } from './product-form-modal.component';
import { DeactivateConfirmationDialogComponent } from './deactivate-confirmation-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/products.service";
import * as i2 from "../../../services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
const _c0 = ["productsTable"];
function ProductManagementComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "span", 15);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵelement(4, "i", 17);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.lastName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.roles == null ? null : ctx_r0.currentUser.roles[0]) || "Admin", " ");
} }
function ProductManagementComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelement(1, "i", 19);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 20);
    i0.ɵɵlistener("click", function ProductManagementComponent_div_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.successMessage = null); });
    i0.ɵɵelement(5, "i", 21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.successMessage);
} }
function ProductManagementComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 20);
    i0.ɵɵlistener("click", function ProductManagementComponent_div_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeErrorAlert()); });
    i0.ɵɵelement(5, "i", 21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function ProductManagementComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "div", 25);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading products...");
    i0.ɵɵelementEnd()();
} }
function ProductManagementComponent_ng_container_13_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r5.name, " ");
} }
function ProductManagementComponent_ng_container_13_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 65);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r0.chartOption)("merge", ctx_r0.chartOption);
} }
function ProductManagementComponent_ng_container_13_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelement(1, "i", 67);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No products found for this category");
    i0.ɵɵelementEnd()();
} }
function ProductManagementComponent_ng_container_13_div_39_option_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r7.name, " ");
} }
function ProductManagementComponent_ng_container_13_div_39_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 68)(1, "div", 69)(2, "div", 70)(3, "label");
    i0.ɵɵtext(4, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "select", 71);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_div_39_Template_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedCategoryFilter, $event) || (ctx_r0.selectedCategoryFilter = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function ProductManagementComponent_ng_container_13_div_39_Template_select_change_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.applyFilters()); });
    i0.ɵɵelementStart(6, "option", 72);
    i0.ɵɵtext(7, "All Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ProductManagementComponent_ng_container_13_div_39_option_8_Template, 2, 2, "option", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 70)(10, "label");
    i0.ɵɵtext(11, "Stock Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "select", 71);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_div_39_Template_select_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.activeFilter.stockLevel, $event) || (ctx_r0.activeFilter.stockLevel = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function ProductManagementComponent_ng_container_13_div_39_Template_select_change_12_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.applyFilters()); });
    i0.ɵɵelementStart(13, "option", 34);
    i0.ɵɵtext(14, "All Levels");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "option", 73);
    i0.ɵɵtext(16, "Low Stock (<10)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "option", 74);
    i0.ɵɵtext(18, "Out of Stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "option", 75);
    i0.ɵɵtext(20, "Unlimited");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 70)(22, "label");
    i0.ɵɵtext(23, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "select", 71);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_div_39_Template_select_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.activeFilter.status, $event) || (ctx_r0.activeFilter.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function ProductManagementComponent_ng_container_13_div_39_Template_select_change_24_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.applyFilters()); });
    i0.ɵɵelementStart(25, "option", 34);
    i0.ɵɵtext(26, "All Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "option", 76);
    i0.ɵɵtext(28, "Active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 77);
    i0.ɵɵtext(30, "Inactive");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 78)(32, "label");
    i0.ɵɵtext(33, "Points Range");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 79)(35, "div", 80)(36, "span");
    i0.ɵɵtext(37);
    i0.ɵɵpipe(38, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div", 81)(43, "input", 82);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_div_39_Template_input_ngModelChange_43_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.activeFilter.minPoints, $event) || (ctx_r0.activeFilter.minPoints = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function ProductManagementComponent_ng_container_13_div_39_Template_input_input_43_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onRangeChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "input", 83);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_div_39_Template_input_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.activeFilter.maxPoints, $event) || (ctx_r0.activeFilter.maxPoints = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function ProductManagementComponent_ng_container_13_div_39_Template_input_input_44_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onRangeChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 84)(46, "span");
    i0.ɵɵtext(47, "0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49);
    i0.ɵɵpipe(50, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span");
    i0.ɵɵtext(52);
    i0.ɵɵpipe(53, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(54, "div", 85)(55, "button", 86);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_div_39_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resetFilters()); });
    i0.ɵɵelement(56, "i", 87);
    i0.ɵɵtext(57, " Reset ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.selectedCategoryFilter);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.categories);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.activeFilter.stockLevel);
    i0.ɵɵadvance(12);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.activeFilter.status);
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(38, 16, ctx_r0.activeFilter.minPoints));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(41, 18, ctx_r0.activeFilter.maxPoints));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("min", 0)("max", ctx_r0.maxPointsLimit)("step", 100);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.activeFilter.minPoints);
    i0.ɵɵadvance();
    i0.ɵɵproperty("min", 0)("max", ctx_r0.maxPointsLimit)("step", 100);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.activeFilter.maxPoints);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(50, 20, ctx_r0.maxPointsLimit / 2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(53, 22, ctx_r0.maxPointsLimit));
} }
function ProductManagementComponent_ng_container_13_tr_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 88)(1, "td", 89);
    i0.ɵɵelement(2, "i", 90);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "No products found");
    i0.ɵɵelementEnd()()();
} }
function ProductManagementComponent_ng_container_13_tr_62_div_28_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 116);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_div_28_button_11_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r11); const product_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deactivateProduct(product_r9.id, $event)); });
    i0.ɵɵelement(1, "i", 117);
    i0.ɵɵtext(2, " Deactivate ");
    i0.ɵɵelementEnd();
} }
function ProductManagementComponent_ng_container_13_tr_62_div_28_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 118);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_div_28_button_12_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const product_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.activateProduct(product_r9.id, $event)); });
    i0.ɵɵelement(1, "i", 119);
    i0.ɵɵtext(2, " Activate ");
    i0.ɵɵelementEnd();
} }
function ProductManagementComponent_ng_container_13_tr_62_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 108)(1, "button", 109);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_div_28_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r10); const product_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openProductDetail(product_r9.id, $event)); });
    i0.ɵɵelement(2, "i", 110);
    i0.ɵɵtext(3, " View ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 109);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_div_28_Template_button_click_4_listener($event) { i0.ɵɵrestoreView(_r10); const product_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.adjustStock(product_r9.id, $event)); });
    i0.ɵɵelement(5, "i", 111);
    i0.ɵɵtext(6, " Adjust Stock ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 109);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_div_28_Template_button_click_7_listener($event) { i0.ɵɵrestoreView(_r10); const product_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.viewRedemptions(product_r9.id, $event)); });
    i0.ɵɵelement(8, "i", 112);
    i0.ɵɵtext(9, " Redemptions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "div", 113);
    i0.ɵɵtemplate(11, ProductManagementComponent_ng_container_13_tr_62_div_28_button_11_Template, 3, 0, "button", 114)(12, ProductManagementComponent_ng_container_13_tr_62_div_28_button_12_Template, 3, 0, "button", 115);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const product_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", product_r9.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !product_r9.isActive);
} }
function ProductManagementComponent_ng_container_13_tr_62_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 91);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_Template_tr_click_0_listener() { const product_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openProductDetail(product_r9.id)); })("keydown.enter", function ProductManagementComponent_ng_container_13_tr_62_Template_tr_keydown_enter_0_listener() { const product_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openProductDetail(product_r9.id)); });
    i0.ɵɵelementStart(1, "td", 92)(2, "div", 93)(3, "div", 94)(4, "img", 95);
    i0.ɵɵlistener("error", function ProductManagementComponent_ng_container_13_tr_62_Template_img_error_4_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.target.src = "assets/placeholder-product.png"); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 96)(6, "div", 97);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 98);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "slice");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "td")(12, "span", 99);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "span", 100);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "td")(19, "span", 101);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "td")(22, "span", 102);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "td", 103);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_Template_td_click_24_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(25, "div", 104)(26, "button", 105);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_tr_62_Template_button_click_26_listener($event) { const product_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleDropdown(product_r9.id, $event)); });
    i0.ɵɵelement(27, "i", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, ProductManagementComponent_ng_container_13_tr_62_div_28_Template, 13, 2, "div", 107);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const product_r9 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", "View details for " + product_r9.name);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", product_r9.imageUrl || "assets/placeholder-product.png", i0.ɵɵsanitizeUrl)("alt", product_r9.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(product_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("ID: ", i0.ɵɵpipeBind3(10, 18, product_r9.id, 0, 8), "...");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(product_r9.categoryName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 22, product_r9.pointsCost));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("low-stock", product_r9.stockLevel < 10 && product_r9.stockLevel > 0)("out-of-stock", product_r9.stockLevel === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", product_r9.stockLevel === 999999 ? "Unlimited" : product_r9.stockLevel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", product_r9.isActive)("inactive", !product_r9.isActive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", product_r9.isActive ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.activeDropdown === product_r9.id);
} }
function ProductManagementComponent_ng_container_13_div_63_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 120)(1, "button", 121);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_div_63_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previousPage()); });
    i0.ɵɵelement(2, "i", 122);
    i0.ɵɵtext(3, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 123);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 121);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_div_63_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.nextPage()); });
    i0.ɵɵtext(7, " Next ");
    i0.ɵɵelement(8, "i", 124);
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
function ProductManagementComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 26)(2, "div", 27)(3, "div", 28)(4, "div", 29)(5, "h2", 30);
    i0.ɵɵtext(6, "Inventory Risk & Stock Health");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 31);
    i0.ɵɵtext(8, "Top 4 products with lowest stock in selected category");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 32)(10, "select", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedChartCategory, $event) || (ctx_r0.selectedChartCategory = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function ProductManagementComponent_ng_container_13_Template_select_change_10_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onChartCategoryChange()); });
    i0.ɵɵelementStart(11, "option", 34);
    i0.ɵɵtext(12, "All Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, ProductManagementComponent_ng_container_13_option_13_Template, 2, 2, "option", 35);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 36);
    i0.ɵɵtemplate(15, ProductManagementComponent_ng_container_13_div_15_Template, 1, 2, "div", 37)(16, ProductManagementComponent_ng_container_13_div_16_Template, 4, 0, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 39)(18, "div", 40);
    i0.ɵɵelement(19, "span", 41);
    i0.ɵɵelementStart(20, "span", 42);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 40);
    i0.ɵɵelement(23, "span", 43);
    i0.ɵɵelementStart(24, "span", 42);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(26, "section", 44)(27, "div", 45)(28, "div", 46)(29, "div", 47);
    i0.ɵɵelement(30, "i", 48);
    i0.ɵɵelementStart(31, "input", 49);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductManagementComponent_ng_container_13_Template_input_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.searchText, $event) || (ctx_r0.searchText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function ProductManagementComponent_ng_container_13_Template_input_input_31_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSearchInput()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "button", 50);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openAddProductModal()); });
    i0.ɵɵelement(33, "i", 51);
    i0.ɵɵtext(34, " Add Product ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 52);
    i0.ɵɵlistener("click", function ProductManagementComponent_ng_container_13_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleFilters()); });
    i0.ɵɵelement(36, "i", 53);
    i0.ɵɵtext(37, " Filters ");
    i0.ɵɵelement(38, "i", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, ProductManagementComponent_ng_container_13_div_39_Template, 58, 24, "div", 55);
    i0.ɵɵelementStart(40, "div", 56)(41, "span");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "section", 57)(44, "div", 58)(45, "table", 59)(46, "thead")(47, "tr")(48, "th");
    i0.ɵɵtext(49, "Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "th");
    i0.ɵɵtext(51, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "th");
    i0.ɵɵtext(53, "Points Cost");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵtext(55, "Stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th", 60);
    i0.ɵɵtext(59, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(60, "tbody");
    i0.ɵɵtemplate(61, ProductManagementComponent_ng_container_13_tr_61_Template, 5, 0, "tr", 61)(62, ProductManagementComponent_ng_container_13_tr_62_Template, 29, 24, "tr", 62);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(63, ProductManagementComponent_ng_container_13_div_63_Template, 9, 4, "div", 63);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.selectedChartCategory);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.categories);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.lowStockProducts().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.lowStockProducts().length === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Healthy Stock (\u2265", ctx_r0.lowStockThreshold, ")");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Low Stock (<", ctx_r0.lowStockThreshold, ")");
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.searchText);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r0.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("rotated", ctx_r0.showFilters);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.filteredProducts.length, " product", ctx_r0.filteredProducts.length !== 1 ? "s" : "", " found");
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngIf", ctx_r0.filteredProducts.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.paginatedProducts);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.totalPages > 1);
} }
function ProductManagementComponent_app_deactivate_confirmation_dialog_15_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-deactivate-confirmation-dialog", 125);
    i0.ɵɵlistener("confirm", function ProductManagementComponent_app_deactivate_confirmation_dialog_15_Template_app_deactivate_confirmation_dialog_confirm_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onDeactivateConfirmed()); })("cancel", function ProductManagementComponent_app_deactivate_confirmation_dialog_15_Template_app_deactivate_confirmation_dialog_cancel_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onDeactivateCancelled()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("data", ctx_r0.deactivateWarningData);
} }
// Register ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);
export class ProductManagementComponent {
    // Check if chart has no data for current category
    get chartHasNoData() {
        return this.lowStockProducts().length === 0;
    }
    constructor(productsService, authService, router, cdr) {
        this.productsService = productsService;
        this.authService = authService;
        this.router = router;
        this.cdr = cdr;
        // Expose Math for templates
        this.Math = Math;
        // Data
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        this.kpi = null;
        // UI State
        this.isLoading = false;
        this.selectedRows = new Set();
        this.searchText = '';
        this.currentPage = 1;
        this.pageSize = 10;
        this.showFilters = false;
        this.showAddProductModal = false;
        this.activeDropdown = null;
        this.isSubmitting = false;
        // Messages
        this.errorMessage = null;
        this.successMessage = null;
        this.hasLoadError = false;
        // Deactivation dialog state
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.pendingDeactivationProductId = null;
        this.deactivationBlockedMessage = null;
        // Chart state
        this.selectedChartCategory = 'all';
        this.lowStockThreshold = 10;
        this.topNProducts = 4;
        this.chartOption = {};
        // Products signal for chart
        this.productsSignal = signal([], ...(ngDevMode ? [{ debugName: "productsSignal" }] : []));
        this.selectedCategorySignal = signal('all', ...(ngDevMode ? [{ debugName: "selectedCategorySignal" }] : []));
        // Computed low stock products for chart - reads both signals for reactivity
        this.lowStockProducts = computed(() => {
            const products = this.productsSignal();
            const selectedCategory = this.selectedCategorySignal();
            let filtered = [...products];
            // Filter by category if selected
            if (selectedCategory !== 'all') {
                filtered = filtered.filter(p => p.categoryId === selectedCategory);
            }
            // Filter out unlimited stock products
            filtered = filtered.filter(p => p.stockLevel !== 999999);
            // Sort by stock level ascending
            filtered.sort((a, b) => a.stockLevel - b.stockLevel);
            // Take only the available products (up to topN, but show all if less)
            const available = filtered.slice(0, this.topNProducts);
            return available.map(p => ({
                name: p.name,
                stock: p.stockLevel,
                category: p.categoryName,
                isLowStock: p.stockLevel < this.lowStockThreshold
            }));
        }, ...(ngDevMode ? [{ debugName: "lowStockProducts" }] : []));
        // Filter state for inline filters
        this.selectedCategoryFilter = '';
        this.maxPointsLimit = 50000;
        // New Product Form
        this.newProduct = {
            name: '',
            description: '',
            categoryId: '',
            pointsCost: 1,
            imageUrl: '',
            initialStock: 1
        };
        // New Category Form
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.isCreatingCategory = false;
        this.showCategoryForm = false;
        // Filter State
        this.activeFilter = {
            status: 'all',
            stockLevel: 'all',
            categoryIds: [],
            minPoints: 0,
            maxPoints: 50000
        };
        this.destroy$ = new Subject();
        this.searchSubject = new Subject();
        // Bind the click handler in constructor to maintain reference
        this.documentClickHandler = this.onDocumentClick.bind(this);
        // Debounce search
        this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(query => {
            this.searchText = query;
            this.currentPage = 1;
            this.applyFiltersAndPagination();
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        this.loadCurrentUser();
        this.loadCategories();
        this.loadProducts();
        // Close dropdown on outside click
        document.addEventListener('click', this.documentClickHandler);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        document.removeEventListener('click', this.documentClickHandler);
    }
    onDocumentClick(event) {
        const target = event.target;
        if (!target.closest('.action-menu')) {
            this.activeDropdown = null;
            this.cdr.detectChanges();
        }
    }
    /**
     * Get paginated products
     */
    get paginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
    }
    /**
     * Get total pages
     */
    get totalPages() {
        return Math.ceil(this.filteredProducts.length / this.pageSize);
    }
    /**
     * Handle search input with debounce
     */
    onSearchInput() {
        this.searchSubject.next(this.searchText);
    }
    /**
     * Toggle filters panel
     */
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
    /**
     * Handle range slider change
     */
    onRangeChange() {
        // Ensure min doesn't exceed max
        if (this.activeFilter.minPoints > this.activeFilter.maxPoints) {
            const temp = this.activeFilter.minPoints;
            this.activeFilter.minPoints = this.activeFilter.maxPoints;
            this.activeFilter.maxPoints = temp;
        }
        this.applyFilters();
    }
    /**
     * Update chart on category change
     */
    onChartCategoryChange() {
        // Update the signal to trigger computed recalculation
        this.selectedCategorySignal.set(this.selectedChartCategory);
        this.updateChart();
    }
    /**
     * Update inventory risk chart
     */
    updateChart() {
        const lowStock = this.lowStockProducts();
        if (lowStock.length === 0) {
            this.chartOption = {
                graphic: {
                    elements: [{
                            type: 'text',
                            left: 'center',
                            top: 'middle',
                            style: {
                                text: 'Not enough data for this category',
                                fontSize: 14,
                                fill: '#6b7280'
                            }
                        }]
                }
            };
            this.cdr.detectChanges();
            return;
        }
        // Reverse for horizontal bar (lowest stock at top)
        const reversedProducts = [...lowStock].reverse();
        this.chartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params) => {
                    const data = params[0];
                    const product = reversedProducts[data.dataIndex];
                    const status = product.isLowStock ? '⚠️ Low Stock' : '✓ Healthy';
                    return `<strong>${data.name}</strong><br/>
                  Stock: ${data.value} units<br/>
                  Category: ${product.category}<br/>
                  Status: ${status}`;
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
                axisLabel: {
                    formatter: (value) => value.toString()
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: { color: '#e5e7eb' }
                }
            },
            yAxis: {
                type: 'category',
                data: reversedProducts.map(p => p.name),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: '#374151',
                    fontSize: 12,
                    width: 120,
                    overflow: 'truncate'
                }
            },
            series: [
                {
                    name: 'Stock',
                    type: 'bar',
                    data: reversedProducts.map(p => ({
                        value: p.stock,
                        itemStyle: {
                            color: p.isLowStock ? '#dc2626' : '#2c5f3f',
                            borderRadius: [0, 4, 4, 0]
                        }
                    })),
                    barWidth: '60%',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        color: '#6b7280',
                        fontSize: 11
                    }
                }
            ]
        };
        this.cdr.detectChanges();
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
     * Load categories for filter
     */
    loadCategories() {
        this.productsService.getCategories()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (categories) => {
                this.categories = categories;
                console.log('[ProductMgmt] Categories loaded:', categories);
            },
            error: (error) => {
                console.error('[ProductMgmt] Error loading categories:', error);
            }
        });
    }
    /**
     * Load products with current filters
     */
    loadProducts() {
        this.isLoading = true;
        this.errorMessage = null;
        console.log('[ProductMgmt] Loading products...');
        this.productsService.getAllProductsAdmin()
            .pipe(takeUntil(this.destroy$), finalize(() => {
            setTimeout(() => {
                this.isLoading = false;
                console.log('[ProductMgmt] Loading finished');
                try {
                    this.cdr.detectChanges();
                }
                catch (e) { /* ignore */ }
            }, 0);
        }))
            .subscribe({
            next: (data) => {
                console.log('[ProductMgmt] Products loaded successfully:', data);
                this.products = Array.isArray(data) ? data : [];
                this.productsSignal.set(this.products);
                this.hasLoadError = false;
                // Calculate KPIs
                this.kpi = this.productsService.calculateKPIs(this.products);
                console.log('[ProductMgmt] KPI computed:', this.kpi);
                // Apply filters and pagination
                this.applyFiltersAndPagination();
                // Update chart
                this.updateChart();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('[ProductMgmt] Error loading products:', error);
                this.products = [];
                this.filteredProducts = [];
                this.hasLoadError = true;
                this.errorMessage = `Failed to load products: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
                this.cdr.detectChanges();
            }
        });
    }
    /**
     * Apply filters and pagination
     */
    applyFiltersAndPagination() {
        // Apply search filter
        let filtered = [...this.products];
        if (this.searchText) {
            this.activeFilter.searchText = this.searchText;
        }
        else {
            delete this.activeFilter.searchText;
        }
        // Apply category filter from dropdown
        if (this.selectedCategoryFilter) {
            this.activeFilter.categoryIds = [this.selectedCategoryFilter];
        }
        else {
            this.activeFilter.categoryIds = [];
        }
        filtered = this.productsService.filterProducts(filtered, this.activeFilter);
        this.filteredProducts = filtered;
        console.log('[ProductMgmt] Filtered products:', this.filteredProducts.length, 'of', this.products.length);
    }
    /**
     * Handle search input (legacy method)
     */
    onSearch(searchText) {
        this.searchText = searchText;
        this.currentPage = 1;
        this.applyFiltersAndPagination();
    }
    /**
     * Apply filters from inline panel
     */
    applyFilters() {
        this.currentPage = 1;
        this.applyFiltersAndPagination();
    }
    /**
     * Reset filters
     */
    resetFilters() {
        this.activeFilter = {
            status: 'all',
            stockLevel: 'all',
            categoryIds: [],
            minPoints: 0,
            maxPoints: this.maxPointsLimit
        };
        this.searchText = '';
        this.selectedCategoryFilter = '';
        this.currentPage = 1;
        this.applyFiltersAndPagination();
    }
    /**
     * Open add product modal
     */
    openAddProductModal() {
        this.resetNewProductForm();
        this.showAddProductModal = true;
    }
    /**
     * Close add product modal
     */
    closeAddProductModal() {
        this.showAddProductModal = false;
        this.resetNewProductForm();
    }
    /**
     * Handle product created from modal
     */
    onProductCreated(request) {
        this.isSubmitting = true;
        this.productsService.createProduct(request)
            .pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (newProduct) => {
                console.log('[ProductMgmt] Product created successfully:', newProduct);
                this.closeAddProductModal();
                this.loadProducts();
                this.showSuccess(`Product "${newProduct.name}" created successfully!`);
            },
            error: (error) => {
                console.error('[ProductMgmt] Error creating product:', error);
                // Extract meaningful error message from various error formats
                let errorMsg = 'Unknown error';
                if (error?.error?.errors) {
                    // FluentValidation errors
                    const validationErrors = [];
                    for (const field in error.error.errors) {
                        if (Array.isArray(error.error.errors[field])) {
                            validationErrors.push(...error.error.errors[field]);
                        }
                    }
                    errorMsg = validationErrors.join('. ');
                }
                else if (error?.error?.error) {
                    errorMsg = error.error.error;
                }
                else if (error?.error?.message) {
                    errorMsg = error.error.message;
                }
                else if (error?.message) {
                    errorMsg = error.message;
                }
                this.errorMessage = `Failed to create product: ${errorMsg}`;
                setTimeout(() => this.errorMessage = null, 8000);
            }
        });
    }
    /**
     * Handle category created from modal
     */
    onCategoryCreated(data) {
        const request = {
            name: data.name,
            description: data.description,
            displayOrder: this.categories.length
        };
        this.productsService.createCategory(request)
            .pipe(finalize(() => {
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (newCategory) => {
                console.log('[ProductMgmt] Category created successfully:', newCategory);
                this.loadCategories();
                this.showSuccess(`Category "${newCategory.name}" created successfully!`);
            },
            error: (error) => {
                console.error('[ProductMgmt] Error creating category:', error);
                this.errorMessage = error?.error?.message || 'Failed to create category';
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }
    /**
     * Reset new product form
     */
    resetNewProductForm() {
        this.newProduct = {
            name: '',
            description: '',
            categoryId: '',
            pointsCost: 1,
            imageUrl: '',
            initialStock: 1
        };
        this.isSubmitting = false;
        this.resetCategoryForm();
    }
    /**
     * Reset category creation form
     */
    resetCategoryForm() {
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.isCreatingCategory = false;
    }
    /**
     * Create new category
     */
    createNewCategory() {
        if (!this.newCategoryName?.trim()) {
            this.errorMessage = 'Category name is required';
            setTimeout(() => this.errorMessage = null, 5000);
            return;
        }
        this.isCreatingCategory = true;
        const request = {
            name: this.newCategoryName.trim(),
            description: this.newCategoryDescription?.trim() || undefined,
            displayOrder: this.categories.length
        };
        this.productsService.createCategory(request)
            .pipe(finalize(() => {
            this.isCreatingCategory = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (newCategory) => {
                console.log('[ProductMgmt] Category created successfully:', newCategory);
                // Refresh categories list
                this.loadCategories();
                // Set the new category as selected
                this.newProduct.categoryId = newCategory.id;
                // Hide and reset category form
                this.showCategoryForm = false;
                this.resetCategoryForm();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('[ProductMgmt] Error creating category:', error);
                this.errorMessage = error?.error?.message || 'Failed to create category';
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }
    /**
     * Toggle category creation form visibility
     */
    toggleCategoryForm() {
        this.showCategoryForm = !this.showCategoryForm;
        if (!this.showCategoryForm) {
            this.resetCategoryForm();
        }
    }
    /**
     * Cancel category creation
     */
    cancelCategoryCreation() {
        this.showCategoryForm = false;
        this.resetCategoryForm();
    }
    /**
     * Submit new product
     */
    submitNewProduct() {
        // Validation
        if (!this.newProduct.name || !this.newProduct.categoryId || this.newProduct.pointsCost <= 0) {
            this.errorMessage = 'Please fill in all required fields';
            setTimeout(() => this.errorMessage = null, 5000);
            return;
        }
        this.isSubmitting = true;
        this.productsService.createProduct(this.newProduct)
            .pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (newProduct) => {
                console.log('[ProductMgmt] Product created successfully:', newProduct);
                this.closeAddProductModal();
                this.loadProducts();
                this.showSuccess(`Product "${newProduct.name}" created successfully!`);
            },
            error: (error) => {
                console.error('[ProductMgmt] Error creating product:', error);
                this.errorMessage = `Failed to create product: ${error?.error?.message || error?.message || 'Unknown error'}`;
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }
    /**
     * Show success message
     */
    showSuccess(message) {
        this.successMessage = message;
        this.cdr.markForCheck();
        setTimeout(() => {
            this.successMessage = null;
            this.cdr.markForCheck();
        }, 3000);
    }
    /**
     * Navigate to product detail page
     */
    openProductDetail(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.router.navigate(['/admin/products', productId]);
    }
    /**
     * Edit product (navigate to detail page)
     */
    editProduct(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.router.navigate(['/admin/products', productId]);
    }
    /**
     * Adjust stock - navigate to detail page stock tab
     */
    adjustStock(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.activeDropdown = null;
        this.router.navigate(['/admin/products', productId], { fragment: 'stock' });
    }
    /**
     * Deactivate product with business rule handling
     * Handles hard blocks (400) and soft warnings (409)
     */
    deactivateProduct(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.activeDropdown = null;
        this.deactivationBlockedMessage = null;
        const product = this.products.find(p => p.id === productId);
        if (!product)
            return;
        // First attempt without force - let server check for warnings/blocks
        this.isLoading = true;
        this.productsService.deactivateProduct(productId, false).subscribe({
            next: (response) => {
                console.log('Product deactivated successfully:', response);
                this.isLoading = false;
                this.showSuccess(`Product "${product.name}" deactivated successfully!`);
                this.loadProducts(); // Reload products to reflect changes
            },
            error: (error) => {
                console.error('Error deactivating product:', error);
                this.isLoading = false;
                // Check if it's a soft warning (409 Conflict)
                if (this.productsService.isDeactivationWarning(error)) {
                    const warnings = error.error;
                    this.pendingDeactivationProductId = productId;
                    this.deactivateWarningData = {
                        productName: product.name,
                        stock: warnings.stock,
                        recentRedemptions7d: warnings.recentRedemptions7d,
                        recentUniqueUsers7d: warnings.recentUniqueUsers7d,
                        recentRedemptions30d: warnings.recentRedemptions30d,
                        recentUniqueUsers30d: warnings.recentUniqueUsers30d,
                        lastRedemptionDate: warnings.lastRedemptionDate
                    };
                    this.showDeactivateDialog = true;
                    this.cdr.detectChanges();
                    return;
                }
                // Check if it's a hard block (400 Bad Request)
                if (this.productsService.isDeactivationBlocked(error)) {
                    const blocked = error.error;
                    this.deactivationBlockedMessage = `Cannot deactivate: ${blocked.pending} Pending and ${blocked.approved} Approved redemptions exist. Please resolve these redemptions first.`;
                    this.errorMessage = this.deactivationBlockedMessage;
                    setTimeout(() => {
                        this.errorMessage = null;
                        this.deactivationBlockedMessage = null;
                    }, 8000);
                    return;
                }
                // Generic error
                this.errorMessage = error?.error?.message || 'Failed to deactivate product. Please try again.';
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }
    /**
     * Handle confirmation from deactivate warning dialog
     */
    onDeactivateConfirmed() {
        if (!this.pendingDeactivationProductId)
            return;
        const productId = this.pendingDeactivationProductId;
        const product = this.products.find(p => p.id === productId);
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.isLoading = true;
        // Retry with force=true to bypass soft warnings
        this.productsService.deactivateProduct(productId, true).subscribe({
            next: (response) => {
                console.log('Product deactivated successfully (forced):', response);
                this.isLoading = false;
                this.pendingDeactivationProductId = null;
                this.showSuccess(`Product "${product?.name}" deactivated successfully!`);
                this.loadProducts();
            },
            error: (error) => {
                console.error('Error deactivating product (forced):', error);
                this.isLoading = false;
                this.pendingDeactivationProductId = null;
                // Even with force, hard blocks cannot be bypassed
                if (this.productsService.isDeactivationBlocked(error)) {
                    const blocked = error.error;
                    this.errorMessage = `Cannot deactivate: ${blocked.pending} Pending and ${blocked.approved} Approved redemptions exist.`;
                }
                else {
                    this.errorMessage = error?.error?.message || 'Failed to deactivate product. Please try again.';
                }
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }
    /**
     * Handle cancellation from deactivate warning dialog
     */
    onDeactivateCancelled() {
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.pendingDeactivationProductId = null;
    }
    /**
     * Activate product
     */
    activateProduct(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.activeDropdown = null;
        const product = this.products.find(p => p.id === productId);
        if (!product)
            return;
        if (confirm(`Are you sure you want to activate "${product.name}"?`)) {
            this.isLoading = true;
            this.productsService.activateProduct(productId).subscribe({
                next: (response) => {
                    console.log('Product activated successfully:', response);
                    this.loadProducts(); // Reload products to reflect changes
                },
                error: (error) => {
                    console.error('Error activating product:', error);
                    this.isLoading = false;
                    // Handle error appropriately
                    alert('Failed to activate product. Please try again.');
                }
            });
        }
    }
    /**
     * View redemptions for product
     */
    viewRedemptions(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.activeDropdown = null;
        this.router.navigate(['/admin/products', productId], { fragment: 'redemptions' });
    }
    /**
     * View audit trail for product
     */
    viewAuditTrail(productId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.activeDropdown = null;
        // TODO: Navigate to audit trail or show modal
        console.log('View audit trail for product:', productId);
    }
    /**
     * Toggle row selection
     */
    toggleRowSelection(productId, product) {
        if (this.selectedRows.has(productId)) {
            this.selectedRows.delete(productId);
        }
        else {
            this.selectedRows.add(productId);
        }
    }
    /**
     * Toggle dropdown menu
     */
    toggleDropdown(productId, event) {
        event.stopPropagation();
        event.preventDefault();
        this.activeDropdown = this.activeDropdown === productId ? null : productId;
        this.cdr.detectChanges();
    }
    /**
     * Check if dropdown is active
     */
    isDropdownActive(productId) {
        return this.activeDropdown === productId;
    }
    /**
     * Toggle all rows
     */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selectedRows.clear();
        }
        else {
            this.filteredProducts.forEach(p => this.selectedRows.add(p.id));
        }
    }
    /**
     * Check if all rows selected
     */
    isAllSelected() {
        return this.filteredProducts.length > 0 &&
            this.filteredProducts.every(p => this.selectedRows.has(p.id));
    }
    /**
     * Get status badge class
     */
    getStatusClass(product) {
        if (!product.isActive)
            return 'inactive';
        if (product.stockLevel === 0)
            return 'out-of-stock';
        if (product.stockLevel < 10)
            return 'low-stock';
        return 'active';
    }
    /**
     * Get status text
     */
    getStatusText(product) {
        if (!product.isActive)
            return 'Inactive';
        if (product.stockLevel === 0)
            return 'Out of Stock';
        if (product.stockLevel < 10)
            return 'Low Stock';
        return 'Active';
    }
    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    nextPage() {
        this.goToPage(this.currentPage + 1);
    }
    previousPage() {
        this.goToPage(this.currentPage - 1);
    }
    static { this.ɵfac = function ProductManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductManagementComponent)(i0.ɵɵdirectiveInject(i1.ProductsService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductManagementComponent, selectors: [["app-product-management"]], viewQuery: function ProductManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.productsTable = _t.first);
        } }, features: [i0.ɵɵProvidersFeature([
                provideEchartsCore({ echarts })
            ])], decls: 16, vars: 8, consts: [[1, "admin-products-wrapper"], [1, "admin-products-main"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "header-right"], ["class", "user-info", 4, "ngIf"], [1, "main-content"], ["class", "success-alert", "role", "alert", 4, "ngIf"], ["class", "error-alert", "role", "alert", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [3, "productSaved", "categoryCreated", "closed", "isOpen", "categories"], [3, "data", "confirm", "cancel", 4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "fa-solid", "fa-shield-halved"], ["role", "alert", 1, "success-alert"], [1, "fa-solid", "fa-circle-check"], ["aria-label", "Dismiss", 1, "alert-dismiss", 3, "click"], [1, "fa-solid", "fa-xmark"], ["role", "alert", 1, "error-alert"], [1, "fa-solid", "fa-circle-exclamation"], [1, "loading-container"], [1, "loading-spinner"], ["aria-label", "Inventory Risk & Stock Health", 1, "chart-section"], [1, "chart-card"], [1, "chart-header"], [1, "chart-title-group"], [1, "chart-title"], [1, "chart-subtitle"], [1, "chart-category-selector"], ["aria-label", "Select category for chart", 1, "category-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], [1, "chart-body"], ["echarts", "", "class", "stock-chart", "aria-label", "Horizontal bar chart showing products with lowest stock", 3, "options", "merge", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], [1, "chart-legend"], [1, "legend-item"], [1, "legend-color", "healthy"], [1, "legend-label"], [1, "legend-color", "low"], [1, "controls-section"], [1, "controls-card"], [1, "controls-row"], [1, "search-group"], [1, "fa-solid", "fa-magnifying-glass", "search-icon"], ["type", "text", "placeholder", "Search products by name...", "aria-label", "Search products", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "btn-primary", 3, "click"], [1, "fa-solid", "fa-plus"], [1, "btn-filter", 3, "click"], [1, "fa-solid", "fa-sliders"], [1, "fa-solid", "fa-chevron-down", "toggle-icon"], ["class", "filters-panel", 4, "ngIf"], [1, "results-summary"], [1, "table-section"], [1, "table-container"], [1, "products-table"], [1, "actions-col"], ["class", "empty-row", 4, "ngIf"], ["class", "product-row", "tabindex", "0", "role", "button", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], [3, "value"], ["echarts", "", "aria-label", "Horizontal bar chart showing products with lowest stock", 1, "stock-chart", 3, "options", "merge"], [1, "chart-empty"], [1, "fa-regular", "fa-chart-bar"], [1, "filters-panel"], [1, "filters-grid"], [1, "filter-group"], [3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "low"], ["value", "out"], ["value", "unlimited"], ["value", "active"], ["value", "inactive"], [1, "filter-group", "range-filter"], [1, "range-slider-container"], [1, "range-values"], [1, "range-inputs-dual"], ["type", "range", 1, "range-slider", "range-min", 3, "ngModelChange", "input", "min", "max", "step", "ngModel"], ["type", "range", 1, "range-slider", "range-max", 3, "ngModelChange", "input", "min", "max", "step", "ngModel"], [1, "range-scale"], [1, "filter-group", "filter-actions"], [1, "btn-reset", 3, "click"], [1, "fa-solid", "fa-rotate-left"], [1, "empty-row"], ["colspan", "6", 1, "empty-message"], [1, "fa-regular", "fa-box-open"], ["tabindex", "0", "role", "button", 1, "product-row", 3, "click", "keydown.enter"], [1, "product-cell"], [1, "product-info"], [1, "product-image"], [3, "error", "src", "alt"], [1, "product-details"], [1, "product-name"], [1, "product-id"], [1, "category-badge"], [1, "points-value"], [1, "stock-value"], [1, "status-badge"], [1, "actions-col", 3, "click"], [1, "action-menu"], ["aria-label", "More actions", 1, "menu-btn", 3, "click"], [1, "fa-solid", "fa-ellipsis-vertical"], ["class", "menu-dropdown", 4, "ngIf"], [1, "menu-dropdown"], [3, "click"], [1, "fa-solid", "fa-eye"], [1, "fa-solid", "fa-boxes-stacked"], [1, "fa-solid", "fa-receipt"], [1, "menu-divider"], ["class", "deactivate", 3, "click", 4, "ngIf"], ["class", "activate", 3, "click", 4, "ngIf"], [1, "deactivate", 3, "click"], [1, "fa-solid", "fa-ban"], [1, "activate", 3, "click"], [1, "fa-solid", "fa-check-circle"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "fa-solid", "fa-chevron-left"], [1, "page-info"], [1, "fa-solid", "fa-chevron-right"], [3, "confirm", "cancel", "data"]], template: function ProductManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "h1", 4);
            i0.ɵɵtext(6, "Products Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5);
            i0.ɵɵtemplate(8, ProductManagementComponent_div_8_Template, 6, 3, "div", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "main", 7);
            i0.ɵɵtemplate(10, ProductManagementComponent_div_10_Template, 6, 1, "div", 8)(11, ProductManagementComponent_div_11_Template, 6, 1, "div", 9)(12, ProductManagementComponent_div_12_Template, 4, 0, "div", 10)(13, ProductManagementComponent_ng_container_13_Template, 64, 17, "ng-container", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "app-product-form-modal", 12);
            i0.ɵɵlistener("productSaved", function ProductManagementComponent_Template_app_product_form_modal_productSaved_14_listener($event) { return ctx.onProductCreated($event); })("categoryCreated", function ProductManagementComponent_Template_app_product_form_modal_categoryCreated_14_listener($event) { return ctx.onCategoryCreated($event); })("closed", function ProductManagementComponent_Template_app_product_form_modal_closed_14_listener() { return ctx.closeAddProductModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, ProductManagementComponent_app_deactivate_confirmation_dialog_15_Template, 1, 1, "app-deactivate-confirmation-dialog", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.currentUser);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.showAddProductModal)("categories", ctx.categories);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeactivateDialog);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, FormsModule, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.RangeValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, AdminSidebarComponent, NgxEchartsDirective, ProductFormModalComponent, DeactivateConfirmationDialogComponent, i4.SlicePipe, i4.DecimalPipe], styles: ["\n\r\n\n\r\n\r\n\r\n\r\n\n\r\n.admin-products-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-products-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 11px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.main-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.success-alert[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  margin-bottom: 20px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%] {\r\n  background: #ecfdf5;\r\n  border: 1px solid #a7f3d0;\r\n  color: #047857;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%] {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  color: #dc2626;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.alert-dismiss[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-dismiss[_ngcontent-%COMP%]:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\r\n  color: #047857;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\r\n  color: #dc2626;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.chart-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.chart-card[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.chart-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.chart-title-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.chart-title[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.chart-subtitle[_ngcontent-%COMP%] {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n.chart-category-selector[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n}\r\n\r\n.category-select[_ngcontent-%COMP%] {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  min-width: 180px;\r\n}\r\n\r\n.category-select[_ngcontent-%COMP%]:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.category-select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.chart-body[_ngcontent-%COMP%] {\r\n  min-height: 200px;\r\n}\r\n\r\n.stock-chart[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 200px;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n.chart-legend[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 24px;\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n}\r\n\r\n.legend-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.legend-color[_ngcontent-%COMP%] {\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.legend-color.healthy[_ngcontent-%COMP%] {\r\n  background-color: #2c5f3f;\r\n}\r\n\r\n.legend-color.low[_ngcontent-%COMP%] {\r\n  background-color: #dc2626;\r\n}\r\n\r\n.legend-label[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n}\r\n\r\n\r\n\r\n\n\r\n.controls-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.controls-card[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 20px 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.controls-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-group[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 280px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: #9ca3af;\r\n  font-size: 14px;\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 10px 14px 10px 40px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]::placeholder {\r\n  color: #9ca3af;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 18px;\r\n  background: #2c5f3f;\r\n  color: #ffffff;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  white-space: nowrap;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  background: #1e4620;\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 16px;\r\n  background: #ffffff;\r\n  color: #374151;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%]:hover {\r\n  background: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-filter.active[_ngcontent-%COMP%] {\r\n  background: #f0fdf4;\r\n  border-color: #2c5f3f;\r\n  color: #2c5f3f;\r\n}\r\n\r\n.toggle-icon[_ngcontent-%COMP%] {\r\n  font-size: 10px;\r\n  transition: transform 0.2s;\r\n}\r\n\r\n.toggle-icon.rotated[_ngcontent-%COMP%] {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n\n\r\n.filters-panel[_ngcontent-%COMP%] {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\r\n}\r\n\r\n.filters-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\r\n  gap: 16px;\r\n  align-items: end;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n\n\r\n.range-filter[_ngcontent-%COMP%] {\r\n  min-width: 200px;\r\n}\r\n\r\n.range-slider-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n}\r\n\r\n.range-values[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #374151;\r\n}\r\n\r\n.range-inputs-dual[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 20px;\r\n}\r\n\r\n.range-slider[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 6px;\r\n  background: transparent;\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  pointer-events: none;\r\n}\r\n\r\n.range-slider[_ngcontent-%COMP%]::-webkit-slider-thumb {\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  width: 16px;\r\n  height: 16px;\r\n  background: #2c5f3f;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  pointer-events: all;\r\n  border: 2px solid #ffffff;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.range-slider[_ngcontent-%COMP%]::-moz-range-thumb {\r\n  width: 16px;\r\n  height: 16px;\r\n  background: #2c5f3f;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  pointer-events: all;\r\n  border: 2px solid #ffffff;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.range-min[_ngcontent-%COMP%] {\r\n  z-index: 1;\r\n}\r\n\r\n.range-max[_ngcontent-%COMP%] {\r\n  z-index: 2;\r\n}\r\n\r\n.range-scale[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  font-size: 10px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.filter-actions[_ngcontent-%COMP%] {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: #ffffff;\r\n  color: #6b7280;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n  background: #f9fafb;\r\n  color: #374151;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n}\r\n\r\n\n\r\n.results-summary[_ngcontent-%COMP%] {\r\n  margin-top: 12px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid #f3f4f6;\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n\r\n\r\n\n\r\n.table-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.table-container[_ngcontent-%COMP%] {\r\n  background: white;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.products-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\r\n  background: #f9fafb;\r\n  border-bottom: 1px solid #e5e7eb;\r\n}\r\n\r\n.products-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  padding: 12px 16px;\r\n  text-align: left;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  font-size: 12px;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.actions-col[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n  text-align: center;\r\n}\r\n\r\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\r\n  border-bottom: 1px solid #f3f4f6;\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.product-row[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n\r\n.product-row[_ngcontent-%COMP%]:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.products-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  padding: 12px 16px;\r\n  color: #1f2937;\r\n}\r\n\r\n.empty-row[_ngcontent-%COMP%] {\r\n  background: #f9fafb;\r\n}\r\n\r\n.empty-message[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  color: #9ca3af;\r\n  padding: 48px 16px !important;\r\n  font-size: 14px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.empty-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 32px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.product-cell[_ngcontent-%COMP%] {\r\n  padding: 12px 16px;\r\n}\r\n\r\n.product-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.product-image[_ngcontent-%COMP%] {\r\n  width: 44px;\r\n  height: 44px;\r\n  border-radius: 8px;\r\n  overflow: hidden;\r\n  background-color: #f3f4f6;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.product-details[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.product-name[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.product-id[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.category-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 4px 10px;\r\n  background: #f3f4f6;\r\n  border-radius: 4px;\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n  font-weight: 500;\r\n}\r\n\r\n.points-value[_ngcontent-%COMP%] {\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n}\r\n\r\n.stock-value[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.stock-value.low-stock[_ngcontent-%COMP%] {\r\n  color: #f59e0b;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-value.out-of-stock[_ngcontent-%COMP%] {\r\n  color: #dc2626;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 4px 8px;\r\n  border-radius: 4px;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n}\r\n\r\n.status-badge.active[_ngcontent-%COMP%] {\r\n  background: #d1fae5;\r\n  color: #047857;\r\n}\r\n\r\n.status-badge.inactive[_ngcontent-%COMP%] {\r\n  background: #f3f4f6;\r\n  color: #6b7280;\r\n}\r\n\r\n\n\r\n.action-menu[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n\r\n.menu-btn[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px 10px;\r\n  border-radius: 4px;\r\n  color: #6b7280;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.menu-btn[_ngcontent-%COMP%]:hover {\r\n  background-color: #f3f4f6;\r\n  color: #1f2937;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 0;\r\n  top: calc(100% + 4px);\r\n  background: white;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n  min-width: 180px;\r\n  z-index: 1000;\r\n  overflow: hidden;\r\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-8px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 10px 14px;\r\n  background: none;\r\n  border: none;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  color: #374151;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  width: 16px;\r\n  color: #6b7280;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   .deactivate[_ngcontent-%COMP%] {\r\n  color: #f59e0b;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   .deactivate[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: #f59e0b;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   .activate[_ngcontent-%COMP%] {\r\n  color: #10b981;\r\n}\r\n\r\n.menu-dropdown[_ngcontent-%COMP%]   .activate[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: #10b981;\r\n}\r\n\r\n.menu-divider[_ngcontent-%COMP%] {\r\n  height: 1px;\r\n  background-color: #e5e7eb;\r\n  margin: 4px 0;\r\n}\r\n\r\n\n\r\n.pagination[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 16px;\r\n  padding: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: white;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  color: #374151;\r\n  cursor: pointer;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-info[_ngcontent-%COMP%] {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n\r\n\r\n\n\r\n.modal-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  z-index: 1000;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\r\n}\r\n\r\n.modal-content[_ngcontent-%COMP%] {\r\n  background-color: white;\r\n  border-radius: 12px;\r\n  max-width: 560px;\r\n  width: 90%;\r\n  max-height: 90vh;\r\n  overflow-y: auto;\r\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%] {\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n}\r\n\r\n.close-btn[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n  color: #9ca3af;\r\n  padding: 4px;\r\n  border-radius: 4px;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.close-btn[_ngcontent-%COMP%]:hover {\r\n  background-color: #f3f4f6;\r\n  color: #374151;\r\n}\r\n\r\n.modal-form[_ngcontent-%COMP%] {\r\n  padding: 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.form-label[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: #374151;\r\n  font-size: 14px;\r\n}\r\n\r\n.form-label.required[_ngcontent-%COMP%]::after {\r\n  content: ' *';\r\n  color: #dc2626;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%], \r\n.form-select[_ngcontent-%COMP%], \r\n.form-textarea[_ngcontent-%COMP%] {\r\n  padding: 10px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus, \r\n.form-select[_ngcontent-%COMP%]:focus, \r\n.form-textarea[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.form-textarea[_ngcontent-%COMP%] {\r\n  resize: vertical;\r\n  font-family: inherit;\r\n}\r\n\r\n.form-row[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 16px;\r\n}\r\n\r\n.form-group-checkbox[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.form-group-checkbox[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%] {\r\n  width: 16px;\r\n  height: 16px;\r\n  cursor: pointer;\r\n  accent-color: #2c5f3f;\r\n}\r\n\r\n.form-group-checkbox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  color: #374151;\r\n}\r\n\r\n.modal-footer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 12px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  margin-top: 8px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%], \r\n.btn-submit[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 10px 16px;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 6px;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%] {\r\n  background-color: white;\r\n  border: 1px solid #e5e7eb;\r\n  color: #374151;\r\n}\r\n\r\n.btn-cancel[_ngcontent-%COMP%]:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%] {\r\n  background-color: #2c5f3f;\r\n  color: white;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: #1e4620;\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n.category-select-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 8px;\r\n  align-items: center;\r\n}\r\n\r\n.category-select-row[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.btn-add-category[_ngcontent-%COMP%] {\r\n  padding: 10px 12px;\r\n  background-color: #2c5f3f;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-add-category[_ngcontent-%COMP%]:hover {\r\n  background-color: #1e4620;\r\n}\r\n\r\n.inline-category-form[_ngcontent-%COMP%] {\r\n  margin-top: 12px;\r\n  padding: 16px;\r\n  background-color: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\r\n}\r\n\r\n.category-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 8px;\r\n  margin-top: 12px;\r\n}\r\n\r\n.btn-success-sm[_ngcontent-%COMP%] {\r\n  padding: 8px 12px;\r\n  background-color: #10b981;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-success-sm[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: #059669;\r\n}\r\n\r\n.btn-success-sm[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.btn-secondary-sm[_ngcontent-%COMP%] {\r\n  padding: 8px 12px;\r\n  background-color: #6b7280;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-secondary-sm[_ngcontent-%COMP%]:hover {\r\n  background-color: #4b5563;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 1024px) {\r\n  .main-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .chart-card[_ngcontent-%COMP%], \r\n   .controls-card[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .filters-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .main-content[_ngcontent-%COMP%] {\r\n    padding: 16px;\r\n  }\r\n\r\n  .controls-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-group[_ngcontent-%COMP%] {\r\n    min-width: 100%;\r\n  }\r\n\r\n  .btn-primary[_ngcontent-%COMP%], \r\n   .btn-filter[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n\r\n  .filters-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .stock-chart[_ngcontent-%COMP%] {\r\n    height: 180px;\r\n  }\r\n\r\n  .form-row[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-header[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .chart-category-selector[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n\r\n  .category-select[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n\r\n\r\n\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner[_ngcontent-%COMP%] {\r\n    animation: none;\r\n  }\r\n  \r\n  .toggle-icon[_ngcontent-%COMP%] {\r\n    transition: none;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-product-management', standalone: true, imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective, ProductFormModalComponent, DeactivateConfirmationDialogComponent], providers: [
                    provideEchartsCore({ echarts })
                ], template: "<div class=\"admin-products-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"admin-products-main\">\r\n    <!-- Header - Matches Admin Users -->\r\n    <header class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Products Management</h1>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <div class=\"user-info\" *ngIf=\"currentUser\">\r\n          <span class=\"user-name\">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>\r\n          <span class=\"user-role\">\r\n            <i class=\"fa-solid fa-shield-halved\"></i>\r\n            {{ currentUser?.roles?.[0] || 'Admin' }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"main-content\">\r\n      <!-- Success Message -->\r\n      <div class=\"success-alert\" *ngIf=\"successMessage\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-check\"></i>\r\n        <span>{{ successMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"successMessage = null\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Error Message -->\r\n      <div class=\"error-alert\" *ngIf=\"errorMessage\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span>{{ errorMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"closeErrorAlert()\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"loading-spinner\"></div>\r\n        <p>Loading products...</p>\r\n      </div>\r\n\r\n      <ng-container *ngIf=\"!isLoading\">\r\n        <!-- Inventory Risk Chart Card -->\r\n        <section class=\"chart-section\" aria-label=\"Inventory Risk & Stock Health\">\r\n          <div class=\"chart-card\">\r\n            <div class=\"chart-header\">\r\n              <div class=\"chart-title-group\">\r\n                <h2 class=\"chart-title\">Inventory Risk & Stock Health</h2>\r\n                <p class=\"chart-subtitle\">Top 4 products with lowest stock in selected category</p>\r\n              </div>\r\n              <!-- Category Selector -->\r\n              <div class=\"chart-category-selector\">\r\n                <select \r\n                  [(ngModel)]=\"selectedChartCategory\" \r\n                  (change)=\"onChartCategoryChange()\"\r\n                  class=\"category-select\"\r\n                  aria-label=\"Select category for chart\">\r\n                  <option value=\"all\">All Categories</option>\r\n                  <option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n                    {{ category.name }}\r\n                  </option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"chart-body\">\r\n              <div \r\n                *ngIf=\"lowStockProducts().length > 0\"\r\n                echarts \r\n                [options]=\"chartOption\" \r\n                [merge]=\"chartOption\"\r\n                class=\"stock-chart\"\r\n                aria-label=\"Horizontal bar chart showing products with lowest stock\">\r\n              </div>\r\n              <div class=\"chart-empty\" *ngIf=\"lowStockProducts().length === 0\">\r\n                <i class=\"fa-regular fa-chart-bar\"></i>\r\n                <p>No products found for this category</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"chart-legend\">\r\n              <div class=\"legend-item\">\r\n                <span class=\"legend-color healthy\"></span>\r\n                <span class=\"legend-label\">Healthy Stock (\u2265{{ lowStockThreshold }})</span>\r\n              </div>\r\n              <div class=\"legend-item\">\r\n                <span class=\"legend-color low\"></span>\r\n                <span class=\"legend-label\">Low Stock (&lt;{{ lowStockThreshold }})</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Controls Card -->\r\n        <section class=\"controls-section\">\r\n          <div class=\"controls-card\">\r\n            <div class=\"controls-row\">\r\n              <!-- Search -->\r\n              <div class=\"search-group\">\r\n                <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n                <input\r\n                  type=\"text\"\r\n                  class=\"search-input\"\r\n                  placeholder=\"Search products by name...\"\r\n                  [(ngModel)]=\"searchText\"\r\n                  (input)=\"onSearchInput()\"\r\n                  aria-label=\"Search products\"\r\n                />\r\n              </div>\r\n\r\n              <!-- Add Product Button -->\r\n              <button class=\"btn-primary\" (click)=\"openAddProductModal()\">\r\n                <i class=\"fa-solid fa-plus\"></i>\r\n                Add Product\r\n              </button>\r\n\r\n              <!-- Filters Toggle -->\r\n              <button class=\"btn-filter\" (click)=\"toggleFilters()\" [class.active]=\"showFilters\">\r\n                <i class=\"fa-solid fa-sliders\"></i>\r\n                Filters\r\n                <i class=\"fa-solid fa-chevron-down toggle-icon\" [class.rotated]=\"showFilters\"></i>\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Expandable Filters Panel -->\r\n            <div class=\"filters-panel\" *ngIf=\"showFilters\">\r\n              <div class=\"filters-grid\">\r\n                <!-- Category Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Category</label>\r\n                  <select [(ngModel)]=\"selectedCategoryFilter\" (change)=\"applyFilters()\">\r\n                    <option value=\"\">All Categories</option>\r\n                    <option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n                      {{ category.name }}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Stock Level Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Stock Level</label>\r\n                  <select [(ngModel)]=\"activeFilter.stockLevel\" (change)=\"applyFilters()\">\r\n                    <option value=\"all\">All Levels</option>\r\n                    <option value=\"low\">Low Stock (&lt;10)</option>\r\n                    <option value=\"out\">Out of Stock</option>\r\n                    <option value=\"unlimited\">Unlimited</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Status Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Status</label>\r\n                  <select [(ngModel)]=\"activeFilter.status\" (change)=\"applyFilters()\">\r\n                    <option value=\"all\">All Status</option>\r\n                    <option value=\"active\">Active</option>\r\n                    <option value=\"inactive\">Inactive</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Points Range Slider -->\r\n                <div class=\"filter-group range-filter\">\r\n                  <label>Points Range</label>\r\n                  <div class=\"range-slider-container\">\r\n                    <div class=\"range-values\">\r\n                      <span>{{ activeFilter.minPoints | number }}</span>\r\n                      <span>{{ activeFilter.maxPoints | number }}</span>\r\n                    </div>\r\n                    <div class=\"range-inputs-dual\">\r\n                      <input \r\n                        type=\"range\" \r\n                        class=\"range-slider range-min\"\r\n                        [min]=\"0\" \r\n                        [max]=\"maxPointsLimit\"\r\n                        [step]=\"100\"\r\n                        [(ngModel)]=\"activeFilter.minPoints\"\r\n                        (input)=\"onRangeChange()\"\r\n                      />\r\n                      <input \r\n                        type=\"range\" \r\n                        class=\"range-slider range-max\"\r\n                        [min]=\"0\" \r\n                        [max]=\"maxPointsLimit\"\r\n                        [step]=\"100\"\r\n                        [(ngModel)]=\"activeFilter.maxPoints\"\r\n                        (input)=\"onRangeChange()\"\r\n                      />\r\n                    </div>\r\n                    <div class=\"range-scale\">\r\n                      <span>0</span>\r\n                      <span>{{ maxPointsLimit / 2 | number }}</span>\r\n                      <span>{{ maxPointsLimit | number }}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!-- Reset Button -->\r\n                <div class=\"filter-group filter-actions\">\r\n                  <button class=\"btn-reset\" (click)=\"resetFilters()\">\r\n                    <i class=\"fa-solid fa-rotate-left\"></i>\r\n                    Reset\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Results Summary -->\r\n            <div class=\"results-summary\">\r\n              <span>{{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found</span>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Products Table -->\r\n        <section class=\"table-section\">\r\n          <div class=\"table-container\">\r\n            <table class=\"products-table\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Product</th>\r\n                  <th>Category</th>\r\n                  <th>Points Cost</th>\r\n                  <th>Stock</th>\r\n                  <th>Status</th>\r\n                  <th class=\"actions-col\">Actions</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngIf=\"filteredProducts.length === 0\" class=\"empty-row\">\r\n                  <td colspan=\"6\" class=\"empty-message\">\r\n                    <i class=\"fa-regular fa-box-open\"></i>\r\n                    <span>No products found</span>\r\n                  </td>\r\n                </tr>\r\n                <tr \r\n                  *ngFor=\"let product of paginatedProducts\"\r\n                  class=\"product-row\"\r\n                  (click)=\"openProductDetail(product.id)\"\r\n                  tabindex=\"0\"\r\n                  (keydown.enter)=\"openProductDetail(product.id)\"\r\n                  role=\"button\"\r\n                  [attr.aria-label]=\"'View details for ' + product.name\"\r\n                >\r\n                  <td class=\"product-cell\">\r\n                    <div class=\"product-info\">\r\n                      <div class=\"product-image\">\r\n                        <img [src]=\"product.imageUrl || 'assets/placeholder-product.png'\" \r\n                             [alt]=\"product.name\"\r\n                             (error)=\"$any($event.target).src='assets/placeholder-product.png'\" />\r\n                      </div>\r\n                      <div class=\"product-details\">\r\n                        <div class=\"product-name\">{{ product.name }}</div>\r\n                        <div class=\"product-id\">ID: {{ product.id | slice:0:8 }}...</div>\r\n                      </div>\r\n                    </div>\r\n                  </td>\r\n                  <td>\r\n                    <span class=\"category-badge\">{{ product.categoryName }}</span>\r\n                  </td>\r\n                  <td>\r\n                    <span class=\"points-value\">{{ product.pointsCost | number }}</span>\r\n                  </td>\r\n                  <td>\r\n                    <span class=\"stock-value\" \r\n                          [class.low-stock]=\"product.stockLevel < 10 && product.stockLevel > 0\"\r\n                          [class.out-of-stock]=\"product.stockLevel === 0\">\r\n                      {{ product.stockLevel === 999999 ? 'Unlimited' : product.stockLevel }}\r\n                    </span>\r\n                  </td>\r\n                  <td>\r\n                    <span class=\"status-badge\" [class.active]=\"product.isActive\" [class.inactive]=\"!product.isActive\">\r\n                      {{ product.isActive ? 'Active' : 'Inactive' }}\r\n                    </span>\r\n                  </td>\r\n                  <td class=\"actions-col\" (click)=\"$event.stopPropagation()\">\r\n                    <div class=\"action-menu\">\r\n                      <button class=\"menu-btn\" (click)=\"toggleDropdown(product.id, $event)\" aria-label=\"More actions\">\r\n                        <i class=\"fa-solid fa-ellipsis-vertical\"></i>\r\n                      </button>\r\n                      <div class=\"menu-dropdown\" *ngIf=\"activeDropdown === product.id\">\r\n                        <button (click)=\"openProductDetail(product.id, $event)\">\r\n                          <i class=\"fa-solid fa-eye\"></i> View\r\n                        </button>\r\n                        <button (click)=\"adjustStock(product.id, $event)\">\r\n                          <i class=\"fa-solid fa-boxes-stacked\"></i> Adjust Stock\r\n                        </button>\r\n                        <button (click)=\"viewRedemptions(product.id, $event)\">\r\n                          <i class=\"fa-solid fa-receipt\"></i> Redemptions\r\n                        </button>\r\n                        <div class=\"menu-divider\"></div>\r\n                        <button *ngIf=\"product.isActive\" (click)=\"deactivateProduct(product.id, $event)\" class=\"deactivate\">\r\n                          <i class=\"fa-solid fa-ban\"></i> Deactivate\r\n                        </button>\r\n                        <button *ngIf=\"!product.isActive\" (click)=\"activateProduct(product.id, $event)\" class=\"activate\">\r\n                          <i class=\"fa-solid fa-check-circle\"></i> Activate\r\n                        </button>\r\n                      </div>\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n            <!-- Pagination -->\r\n            <div class=\"pagination\" *ngIf=\"totalPages > 1\">\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage === 1\"\r\n                (click)=\"previousPage()\"\r\n              >\r\n                <i class=\"fa-solid fa-chevron-left\"></i> Previous\r\n              </button>\r\n              <div class=\"page-info\">\r\n                Page {{ currentPage }} of {{ totalPages }}\r\n              </div>\r\n              <button\r\n                class=\"page-btn\"\r\n                [disabled]=\"currentPage === totalPages\"\r\n                (click)=\"nextPage()\"\r\n              >\r\n                Next <i class=\"fa-solid fa-chevron-right\"></i>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </ng-container>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- Add Product Modal -->\r\n  <app-product-form-modal\r\n    [isOpen]=\"showAddProductModal\"\r\n    [categories]=\"categories\"\r\n    (productSaved)=\"onProductCreated($event)\"\r\n    (categoryCreated)=\"onCategoryCreated($event)\"\r\n    (closed)=\"closeAddProductModal()\"\r\n  ></app-product-form-modal>\r\n\r\n  <!-- Deactivate Confirmation Dialog -->\r\n  <app-deactivate-confirmation-dialog\r\n    *ngIf=\"showDeactivateDialog\"\r\n    [data]=\"deactivateWarningData\"\r\n    (confirm)=\"onDeactivateConfirmed()\"\r\n    (cancel)=\"onDeactivateCancelled()\"\r\n  ></app-deactivate-confirmation-dialog>\r\n</div>\r\n", styles: ["/* Products Management - Redesigned Layout */\r\n/* Matches Admin Users header & structure */\r\n\r\n/* =================================\r\n   Layout Structure\r\n   ================================= */\r\n.admin-products-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-products-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n/* =================================\r\n   Header (Matches Dashboard)\r\n   ================================= */\r\n.page-header {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role i {\r\n  font-size: 11px;\r\n}\r\n\r\n/* =================================\r\n   Main Content\r\n   ================================= */\r\n.main-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n/* =================================\r\n   Alerts\r\n   ================================= */\r\n.success-alert,\r\n.error-alert {\r\n  padding: 14px 16px;\r\n  margin-bottom: 20px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  animation: slideDown 0.3s ease;\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.success-alert {\r\n  background: #ecfdf5;\r\n  border: 1px solid #a7f3d0;\r\n  color: #047857;\r\n}\r\n\r\n.error-alert {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  color: #dc2626;\r\n}\r\n\r\n.success-alert i,\r\n.error-alert i {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.success-alert span,\r\n.error-alert span {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.alert-dismiss {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-dismiss:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.success-alert .alert-dismiss {\r\n  color: #047857;\r\n}\r\n\r\n.error-alert .alert-dismiss {\r\n  color: #dc2626;\r\n}\r\n\r\n/* =================================\r\n   Loading State\r\n   ================================= */\r\n.loading-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container p {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   Chart Section\r\n   ================================= */\r\n.chart-section {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.chart-card {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.chart-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: flex-start;\r\n  margin-bottom: 20px;\r\n  flex-wrap: wrap;\r\n  gap: 16px;\r\n}\r\n\r\n.chart-title-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.chart-title {\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.chart-subtitle {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n.chart-category-selector {\r\n  flex-shrink: 0;\r\n}\r\n\r\n.category-select {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  min-width: 180px;\r\n}\r\n\r\n.category-select:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.category-select:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.chart-body {\r\n  min-height: 200px;\r\n}\r\n\r\n.stock-chart {\r\n  width: 100%;\r\n  height: 200px;\r\n}\r\n\r\n.chart-empty {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty i {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty p {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n.chart-legend {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 24px;\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n}\r\n\r\n.legend-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.legend-color {\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.legend-color.healthy {\r\n  background-color: #2c5f3f;\r\n}\r\n\r\n.legend-color.low {\r\n  background-color: #dc2626;\r\n}\r\n\r\n.legend-label {\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n}\r\n\r\n/* =================================\r\n   Controls Section\r\n   ================================= */\r\n.controls-section {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.controls-card {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 20px 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.controls-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-group {\r\n  flex: 1;\r\n  min-width: 280px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: #9ca3af;\r\n  font-size: 14px;\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 10px 14px 10px 40px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: #9ca3af;\r\n}\r\n\r\n.btn-primary {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 18px;\r\n  background: #2c5f3f;\r\n  color: #ffffff;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  white-space: nowrap;\r\n}\r\n\r\n.btn-primary:hover {\r\n  background: #1e4620;\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\r\n}\r\n\r\n.btn-primary i {\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-filter {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 16px;\r\n  background: #ffffff;\r\n  color: #374151;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter:hover {\r\n  background: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-filter.active {\r\n  background: #f0fdf4;\r\n  border-color: #2c5f3f;\r\n  color: #2c5f3f;\r\n}\r\n\r\n.toggle-icon {\r\n  font-size: 10px;\r\n  transition: transform 0.2s;\r\n}\r\n\r\n.toggle-icon.rotated {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n/* Filters Panel */\r\n.filters-panel {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  animation: slideDown 0.2s ease;\r\n}\r\n\r\n.filters-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\r\n  gap: 16px;\r\n  align-items: end;\r\n}\r\n\r\n.filter-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-group label {\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-group select {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-group select:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.filter-group select:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n/* Range Filter */\r\n.range-filter {\r\n  min-width: 200px;\r\n}\r\n\r\n.range-slider-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n}\r\n\r\n.range-values {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #374151;\r\n}\r\n\r\n.range-inputs-dual {\r\n  position: relative;\r\n  height: 20px;\r\n}\r\n\r\n.range-slider {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 6px;\r\n  background: transparent;\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  pointer-events: none;\r\n}\r\n\r\n.range-slider::-webkit-slider-thumb {\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  width: 16px;\r\n  height: 16px;\r\n  background: #2c5f3f;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  pointer-events: all;\r\n  border: 2px solid #ffffff;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.range-slider::-moz-range-thumb {\r\n  width: 16px;\r\n  height: 16px;\r\n  background: #2c5f3f;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  pointer-events: all;\r\n  border: 2px solid #ffffff;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.range-min {\r\n  z-index: 1;\r\n}\r\n\r\n.range-max {\r\n  z-index: 2;\r\n}\r\n\r\n.range-scale {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  font-size: 10px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.filter-actions {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-reset {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: #ffffff;\r\n  color: #6b7280;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-reset:hover {\r\n  background: #f9fafb;\r\n  color: #374151;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-reset i {\r\n  font-size: 12px;\r\n}\r\n\r\n/* Results Summary */\r\n.results-summary {\r\n  margin-top: 12px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid #f3f4f6;\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n/* =================================\r\n   Table Section\r\n   ================================= */\r\n.table-section {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.table-container {\r\n  background: white;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.products-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.products-table thead {\r\n  background: #f9fafb;\r\n  border-bottom: 1px solid #e5e7eb;\r\n}\r\n\r\n.products-table th {\r\n  padding: 12px 16px;\r\n  text-align: left;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  font-size: 12px;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.actions-col {\r\n  width: 60px;\r\n  text-align: center;\r\n}\r\n\r\n.products-table tbody tr {\r\n  border-bottom: 1px solid #f3f4f6;\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.product-row {\r\n  cursor: pointer;\r\n}\r\n\r\n.product-row:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.products-table td {\r\n  padding: 12px 16px;\r\n  color: #1f2937;\r\n}\r\n\r\n.empty-row {\r\n  background: #f9fafb;\r\n}\r\n\r\n.empty-message {\r\n  text-align: center;\r\n  color: #9ca3af;\r\n  padding: 48px 16px !important;\r\n  font-size: 14px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.empty-message i {\r\n  font-size: 32px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.product-cell {\r\n  padding: 12px 16px;\r\n}\r\n\r\n.product-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.product-image {\r\n  width: 44px;\r\n  height: 44px;\r\n  border-radius: 8px;\r\n  overflow: hidden;\r\n  background-color: #f3f4f6;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.product-image img {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.product-details {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n}\r\n\r\n.product-name {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.product-id {\r\n  font-size: 12px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.category-badge {\r\n  display: inline-block;\r\n  padding: 4px 10px;\r\n  background: #f3f4f6;\r\n  border-radius: 4px;\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n  font-weight: 500;\r\n}\r\n\r\n.points-value {\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n}\r\n\r\n.stock-value {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.stock-value.low-stock {\r\n  color: #f59e0b;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-value.out-of-stock {\r\n  color: #dc2626;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge {\r\n  display: inline-block;\r\n  padding: 4px 8px;\r\n  border-radius: 4px;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n}\r\n\r\n.status-badge.active {\r\n  background: #d1fae5;\r\n  color: #047857;\r\n}\r\n\r\n.status-badge.inactive {\r\n  background: #f3f4f6;\r\n  color: #6b7280;\r\n}\r\n\r\n/* Actions Menu */\r\n.action-menu {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n\r\n.menu-btn {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px 10px;\r\n  border-radius: 4px;\r\n  color: #6b7280;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.menu-btn:hover {\r\n  background-color: #f3f4f6;\r\n  color: #1f2937;\r\n}\r\n\r\n.menu-dropdown {\r\n  position: absolute;\r\n  right: 0;\r\n  top: calc(100% + 4px);\r\n  background: white;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n  min-width: 180px;\r\n  z-index: 1000;\r\n  overflow: hidden;\r\n  animation: fadeIn 0.15s ease;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-8px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.menu-dropdown button {\r\n  width: 100%;\r\n  padding: 10px 14px;\r\n  background: none;\r\n  border: none;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  color: #374151;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.menu-dropdown button:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.menu-dropdown button i {\r\n  width: 16px;\r\n  color: #6b7280;\r\n}\r\n\r\n.menu-dropdown .deactivate {\r\n  color: #f59e0b;\r\n}\r\n\r\n.menu-dropdown .deactivate i {\r\n  color: #f59e0b;\r\n}\r\n\r\n.menu-dropdown .activate {\r\n  color: #10b981;\r\n}\r\n\r\n.menu-dropdown .activate i {\r\n  color: #10b981;\r\n}\r\n\r\n.menu-divider {\r\n  height: 1px;\r\n  background-color: #e5e7eb;\r\n  margin: 4px 0;\r\n}\r\n\r\n/* Pagination */\r\n.pagination {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 16px;\r\n  padding: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n}\r\n\r\n.page-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: white;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  color: #374151;\r\n  cursor: pointer;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.page-btn:hover:not(:disabled) {\r\n  background-color: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.page-btn:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.page-info {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n/* =================================\r\n   Modal Styles\r\n   ================================= */\r\n.modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  z-index: 1000;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  animation: fadeIn 0.2s ease;\r\n}\r\n\r\n.modal-content {\r\n  background-color: white;\r\n  border-radius: 12px;\r\n  max-width: 560px;\r\n  width: 90%;\r\n  max-height: 90vh;\r\n  overflow-y: auto;\r\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n.modal-header {\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.modal-header h3 {\r\n  margin: 0;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n}\r\n\r\n.close-btn {\r\n  background: none;\r\n  border: none;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n  color: #9ca3af;\r\n  padding: 4px;\r\n  border-radius: 4px;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.close-btn:hover {\r\n  background-color: #f3f4f6;\r\n  color: #374151;\r\n}\r\n\r\n.modal-form {\r\n  padding: 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.form-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.form-label {\r\n  font-weight: 500;\r\n  color: #374151;\r\n  font-size: 14px;\r\n}\r\n\r\n.form-label.required::after {\r\n  content: ' *';\r\n  color: #dc2626;\r\n}\r\n\r\n.form-input,\r\n.form-select,\r\n.form-textarea {\r\n  padding: 10px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.form-input:focus,\r\n.form-select:focus,\r\n.form-textarea:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.form-textarea {\r\n  resize: vertical;\r\n  font-family: inherit;\r\n}\r\n\r\n.form-row {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 16px;\r\n}\r\n\r\n.form-group-checkbox {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.form-group-checkbox input[type=\"checkbox\"] {\r\n  width: 16px;\r\n  height: 16px;\r\n  cursor: pointer;\r\n  accent-color: #2c5f3f;\r\n}\r\n\r\n.form-group-checkbox label {\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  color: #374151;\r\n}\r\n\r\n.modal-footer {\r\n  display: flex;\r\n  gap: 12px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  margin-top: 8px;\r\n}\r\n\r\n.btn-cancel,\r\n.btn-submit {\r\n  flex: 1;\r\n  padding: 10px 16px;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 6px;\r\n}\r\n\r\n.btn-cancel {\r\n  background-color: white;\r\n  border: 1px solid #e5e7eb;\r\n  color: #374151;\r\n}\r\n\r\n.btn-cancel:hover {\r\n  background-color: #f9fafb;\r\n}\r\n\r\n.btn-submit {\r\n  background-color: #2c5f3f;\r\n  color: white;\r\n}\r\n\r\n.btn-submit:hover:not(:disabled) {\r\n  background-color: #1e4620;\r\n}\r\n\r\n.btn-submit:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Category Select Row */\r\n.category-select-row {\r\n  display: flex;\r\n  gap: 8px;\r\n  align-items: center;\r\n}\r\n\r\n.category-select-row .form-select {\r\n  flex: 1;\r\n}\r\n\r\n.btn-add-category {\r\n  padding: 10px 12px;\r\n  background-color: #2c5f3f;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-add-category:hover {\r\n  background-color: #1e4620;\r\n}\r\n\r\n.inline-category-form {\r\n  margin-top: 12px;\r\n  padding: 16px;\r\n  background-color: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  animation: slideDown 0.2s ease;\r\n}\r\n\r\n.category-actions {\r\n  display: flex;\r\n  gap: 8px;\r\n  margin-top: 12px;\r\n}\r\n\r\n.btn-success-sm {\r\n  padding: 8px 12px;\r\n  background-color: #10b981;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-success-sm:hover:not(:disabled) {\r\n  background-color: #059669;\r\n}\r\n\r\n.btn-success-sm:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.btn-secondary-sm {\r\n  padding: 8px 12px;\r\n  background-color: #6b7280;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-secondary-sm:hover {\r\n  background-color: #4b5563;\r\n}\r\n\r\n/* =================================\r\n   Responsive Design\r\n   ================================= */\r\n@media (max-width: 1024px) {\r\n  .main-content {\r\n    padding: 20px;\r\n  }\r\n\r\n  .chart-card,\r\n  .controls-card {\r\n    padding: 20px;\r\n  }\r\n\r\n  .filters-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .main-content {\r\n    padding: 16px;\r\n  }\r\n\r\n  .controls-row {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-group {\r\n    min-width: 100%;\r\n  }\r\n\r\n  .btn-primary,\r\n  .btn-filter {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n\r\n  .filters-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info {\r\n    display: none;\r\n  }\r\n\r\n  .stock-chart {\r\n    height: 180px;\r\n  }\r\n\r\n  .form-row {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-header {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .chart-category-selector {\r\n    width: 100%;\r\n  }\r\n\r\n  .category-select {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n/* =================================\r\n   Scrollbar Styling\r\n   ================================= */\r\n.main-content::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n/* =================================\r\n   Accessibility\r\n   ================================= */\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner {\r\n    animation: none;\r\n  }\r\n  \r\n  .toggle-icon {\r\n    transition: none;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.ProductsService }, { type: i2.AuthService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], { productsTable: [{
            type: ViewChild,
            args: ['productsTable']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductManagementComponent, { className: "ProductManagementComponent", filePath: "src/app/pages/admin/products/product-management.component.ts", lineNumber: 44 }); })();
//# sourceMappingURL=product-management.component.js.map