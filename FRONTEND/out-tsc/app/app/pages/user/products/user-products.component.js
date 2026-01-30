import { Component } from '@angular/core';
import { Subject } from 'rxjs';
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
function UserProductsComponent_option_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r1.name);
} }
function UserProductsComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵelement(1, "div", 48);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading rewards...");
    i0.ɵɵelementEnd()();
} }
function UserProductsComponent_div_51_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, " Low Stock ");
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_51_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtext(1, " Out of Stock ");
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_51_div_1_img_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 66);
    i0.ɵɵlistener("error", function UserProductsComponent_div_51_div_1_img_4_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r5); const product_r3 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(product_r3.imageUrl = ""); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const product_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", product_r3.imageUrl, i0.ɵɵsanitizeUrl)("alt", product_r3.name);
} }
function UserProductsComponent_div_51_div_1_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 68);
    i0.ɵɵelement(2, "rect", 69)(3, "circle", 70)(4, "polyline", 71);
    i0.ɵɵelementEnd()();
} }
function UserProductsComponent_div_51_div_1_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 17);
    i0.ɵɵelement(2, "path", 73)(3, "line", 74)(4, "line", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Not enough points.");
    i0.ɵɵelementEnd()();
} }
function UserProductsComponent_div_51_div_1_div_16__svg_svg_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 81);
    i0.ɵɵelement(1, "path", 82);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_51_div_1_div_16__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 83);
    i0.ɵɵelement(1, "path", 73)(2, "line", 74)(3, "line", 75);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_51_div_1_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "div", 77);
    i0.ɵɵtemplate(2, UserProductsComponent_div_51_div_1_div_16__svg_svg_2_Template, 2, 0, "svg", 78)(3, UserProductsComponent_div_51_div_1_div_16__svg_svg_3_Template, 4, 0, "svg", 79);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 80);
    i0.ɵɵlistener("click", function UserProductsComponent_div_51_div_1_div_16_Template_button_click_6_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.redeemProduct()); });
    i0.ɵɵtext(7, " Redeem ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const product_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", product_r3.stockStatus);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", product_r3.stockStatus === "in-stock");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", product_r3.stockStatus === "low-stock");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r3.stockLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !product_r3.canRedeem);
} }
function UserProductsComponent_div_51_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵlistener("click", function UserProductsComponent_div_51_div_1_Template_div_click_0_listener() { const product_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openProductModal(product_r3)); });
    i0.ɵɵtemplate(1, UserProductsComponent_div_51_div_1_div_1_Template, 2, 0, "div", 52)(2, UserProductsComponent_div_51_div_1_div_2_Template, 2, 0, "div", 53);
    i0.ɵɵelementStart(3, "div", 54);
    i0.ɵɵtemplate(4, UserProductsComponent_div_51_div_1_img_4_Template, 1, 2, "img", 55)(5, UserProductsComponent_div_51_div_1_div_5_Template, 5, 0, "div", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 57)(7, "h3", 58);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 59);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementStart(12, "span", 60);
    i0.ɵɵtext(13, "pts");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 61);
    i0.ɵɵtemplate(15, UserProductsComponent_div_51_div_1_div_15_Template, 7, 0, "div", 62)(16, UserProductsComponent_div_51_div_1_div_16_Template, 8, 5, "div", 63);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const product_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", product_r3.stockStatus === "low-stock");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", product_r3.stockStatus === "out-of-stock");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", product_r3.imageUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !product_r3.imageUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(product_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(11, 8, product_r3.pointsCost), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r3.userPoints < product_r3.pointsCost && product_r3.currentStock > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.userPoints >= product_r3.pointsCost || product_r3.currentStock === 0);
} }
function UserProductsComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtemplate(1, UserProductsComponent_div_51_div_1_Template, 17, 10, "div", 50);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.paginatedProducts);
} }
function UserProductsComponent_div_52_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Try adjusting your filters");
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 68);
    i0.ɵɵelement(2, "circle", 85)(3, "path", 86)(4, "line", 87)(5, "line", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "No rewards found");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, UserProductsComponent_div_52_span_8_Template, 2, 0, "span", 89);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r3.searchQuery || ctx_r3.selectedCategory);
} }
function UserProductsComponent_div_53_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 96);
    i0.ɵɵlistener("click", function UserProductsComponent_div_53_button_4_Template_button_click_0_listener() { const page_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.goToPage(page_r9)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r9 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", page_r9 === ctx_r3.currentPage);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r9, " ");
} }
function UserProductsComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 90)(1, "div", 91)(2, "span", 92);
    i0.ɵɵtext(3, "Showing");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, UserProductsComponent_div_53_button_4_Template, 2, 3, "button", 93);
    i0.ɵɵelementStart(5, "button", 94);
    i0.ɵɵlistener("click", function UserProductsComponent_div_53_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.goToPage(ctx_r3.currentPage + 1)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 17);
    i0.ɵɵelement(7, "polyline", 18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "p", 95);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.pageNumbers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r3.currentPage >= ctx_r3.totalPages);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate3(" Showing ", (ctx_r3.currentPage - 1) * ctx_r3.pageSize + 1, "\u2013", ctx_r3.Math.min(ctx_r3.currentPage * ctx_r3.pageSize, ctx_r3.totalProducts), " of ", ctx_r3.totalProducts, " rewards ");
} }
function UserProductsComponent_div_54_div_10_img_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 126);
    i0.ɵɵlistener("error", function UserProductsComponent_div_54_div_10_img_2_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.selectedProduct.imageUrl = ""); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", ctx_r3.selectedProduct.imageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r3.selectedProduct.name);
} }
function UserProductsComponent_div_54_div_10_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 128);
    i0.ɵɵelement(2, "rect", 69)(3, "circle", 70)(4, "polyline", 71);
    i0.ɵɵelementEnd()();
} }
function UserProductsComponent_div_54_div_10__svg_svg_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 129);
    i0.ɵɵelement(1, "path", 82);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_54_div_10__svg_svg_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 17);
    i0.ɵɵelement(1, "path", 73);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_54_div_10_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Redeem");
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_54_div_10_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Processing...");
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_div_54_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "div", 107);
    i0.ɵɵtemplate(2, UserProductsComponent_div_54_div_10_img_2_Template, 1, 2, "img", 108)(3, UserProductsComponent_div_54_div_10_div_3_Template, 5, 0, "div", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 110)(5, "h2", 111);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 112);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "number");
    i0.ɵɵelementStart(10, "span", 60);
    i0.ɵɵtext(11, "pts");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 113);
    i0.ɵɵtemplate(13, UserProductsComponent_div_54_div_10__svg_svg_13_Template, 2, 0, "svg", 114)(14, UserProductsComponent_div_54_div_10__svg_svg_14_Template, 2, 0, "svg", 115);
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "p", 116);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 117)(20, "span", 118);
    i0.ɵɵtext(21, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 119)(23, "button", 120);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_div_10_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.decrementQuantity()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(24, "svg", 17);
    i0.ɵɵelement(25, "line", 121);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(26, "span", 122);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 120);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_div_10_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.incrementQuantity()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(29, "svg", 17);
    i0.ɵɵelement(30, "line", 123)(31, "line", 121);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(32, "button", 124);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_div_10_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.redeemProduct()); });
    i0.ɵɵtemplate(33, UserProductsComponent_div_54_div_10_span_33_Template, 2, 0, "span", 89)(34, UserProductsComponent_div_54_div_10_span_34_Template, 2, 0, "span", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 125);
    i0.ɵɵtext(36, " You have ");
    i0.ɵɵelementStart(37, "strong");
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(40, " points available. ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedProduct.imageUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.selectedProduct.imageUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.selectedProduct.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(9, 16, ctx_r3.selectedProduct.pointsCost), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r3.selectedProduct.stockStatus);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedProduct.stockStatus === "in-stock");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedProduct.stockStatus === "low-stock");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.selectedProduct.stockLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.selectedProduct.description);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r3.selectedQuantity <= 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.selectedQuantity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r3.selectedQuantity >= ctx_r3.selectedProduct.currentStock);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r3.canRedeemSelected || ctx_r3.isRedeeming);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.isRedeeming);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isRedeeming);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 18, ctx_r3.userPoints));
} }
function UserProductsComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.closeModal()); });
    i0.ɵɵelementStart(1, "div", 98);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 99)(3, "button", 100);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.closeModal()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(4, "svg", 9);
    i0.ɵɵelement(5, "polyline", 101);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "button", 102);
    i0.ɵɵlistener("click", function UserProductsComponent_div_54_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.closeModal()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(7, "svg", 9);
    i0.ɵɵelement(8, "line", 103)(9, "line", 104);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, UserProductsComponent_div_54_div_10_Template, 41, 20, "div", 105);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedProduct);
} }
function UserProductsComponent__svg_svg_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 13);
    i0.ɵɵelement(1, "path", 130)(2, "polyline", 131);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent__svg_svg_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 13);
    i0.ɵɵelement(1, "circle", 85)(2, "line", 132)(3, "line", 133);
    i0.ɵɵelementEnd();
} }
function UserProductsComponent_button_61_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 134);
    i0.ɵɵlistener("click", function UserProductsComponent_button_61_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.goToMyRedemptions()); });
    i0.ɵɵtext(1, " View My Redemptions ");
    i0.ɵɵelementEnd();
} }
export class UserProductsComponent {
    constructor(authService, userDashboardService, router, cdr) {
        this.authService = authService;
        this.userDashboardService = userDashboardService;
        this.router = router;
        this.cdr = cdr;
        this.Math = Math;
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        this.isLoading = true;
        this.searchQuery = '';
        this.selectedCategory = '';
        this.sortBy = 'points-low';
        this.userPoints = 0;
        // Pagination
        this.currentPage = 1;
        this.pageSize = 8;
        this.totalProducts = 0;
        // Modal
        this.showModal = false;
        this.selectedProduct = null;
        this.selectedQuantity = 1;
        this.isRedeeming = false;
        // Toast notification
        this.showToast = false;
        this.toastMessage = '';
        this.toastType = 'success';
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
        // Load products, categories, and user points in parallel
        this.userDashboardService.getProducts()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (products) => {
                this.processProducts(products);
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
        this.userDashboardService.getProductCategories()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (categories) => {
                this.categories = categories;
                this.cdr.detectChanges();
            },
            error: (error) => console.error('Error loading categories:', error)
        });
        this.loadUserPoints();
    }
    loadUserPoints() {
        this.userDashboardService.getUserPoints()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (points) => {
                this.userPoints = points;
                this.updateProductStates();
                this.cdr.detectChanges();
            },
            error: (error) => console.error('Error loading user points:', error)
        });
    }
    processProducts(products) {
        this.products = products.map(product => this.enrichProduct(product));
        this.applyFilters();
    }
    enrichProduct(product) {
        const stockStatus = this.getStockStatus(product.currentStock);
        const canRedeem = this.userPoints >= product.pointsCost && product.currentStock > 0;
        return {
            ...product,
            canRedeem,
            stockStatus,
            stockLabel: this.getStockLabel(stockStatus)
        };
    }
    getStockStatus(stock) {
        if (stock === 0)
            return 'out-of-stock';
        if (stock <= 5)
            return 'low-stock';
        return 'in-stock';
    }
    getStockLabel(status) {
        switch (status) {
            case 'in-stock': return 'In Stock';
            case 'low-stock': return 'Low Stock';
            case 'out-of-stock': return 'Out of Stock';
            default: return '';
        }
    }
    updateProductStates() {
        this.products = this.products.map(product => ({
            ...product,
            canRedeem: this.userPoints >= product.pointsCost && product.currentStock > 0
        }));
        this.applyFilters();
    }
    applyFilters() {
        let filtered = [...this.products];
        // Category filter
        if (this.selectedCategory) {
            filtered = filtered.filter(p => p.categoryId === this.selectedCategory);
        }
        // Search filter
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query));
        }
        // Sorting
        switch (this.sortBy) {
            case 'points-low':
                filtered.sort((a, b) => a.pointsCost - b.pointsCost);
                break;
            case 'points-high':
                filtered.sort((a, b) => b.pointsCost - a.pointsCost);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        this.totalProducts = filtered.length;
        this.filteredProducts = filtered;
        this.currentPage = 1;
    }
    get paginatedProducts() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredProducts.slice(start, start + this.pageSize);
    }
    get totalPages() {
        return Math.ceil(this.totalProducts / this.pageSize);
    }
    get pageNumbers() {
        const pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    onCategoryChange() {
        this.applyFilters();
    }
    onSortChange() {
        this.applyFilters();
    }
    onSearch() {
        this.applyFilters();
    }
    // Modal functions
    openProductModal(product) {
        this.selectedProduct = product;
        this.selectedQuantity = 1;
        this.showModal = true;
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.showModal = false;
        this.selectedProduct = null;
        this.selectedQuantity = 1;
        document.body.style.overflow = '';
    }
    incrementQuantity() {
        if (this.selectedProduct && this.selectedQuantity < this.selectedProduct.currentStock) {
            const maxAffordable = Math.floor(this.userPoints / this.selectedProduct.pointsCost);
            if (this.selectedQuantity < maxAffordable) {
                this.selectedQuantity++;
            }
        }
    }
    decrementQuantity() {
        if (this.selectedQuantity > 1) {
            this.selectedQuantity--;
        }
    }
    get totalPointsCost() {
        return this.selectedProduct ? this.selectedProduct.pointsCost * this.selectedQuantity : 0;
    }
    get canRedeemSelected() {
        if (!this.selectedProduct)
            return false;
        return this.userPoints >= this.totalPointsCost &&
            this.selectedProduct.currentStock >= this.selectedQuantity;
    }
    redeemProduct() {
        if (!this.selectedProduct || this.isRedeeming || !this.canRedeemSelected)
            return;
        this.isRedeeming = true;
        this.userDashboardService.createRedemption(this.selectedProduct.id, this.selectedQuantity)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isRedeeming = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.showToastMessage('Redemption request submitted successfully!', 'success');
                this.closeModal();
                this.loadUserPoints();
                this.loadData();
            },
            error: (error) => {
                const message = error.error?.message || 'Failed to submit redemption request. Please try again.';
                this.showToastMessage(message, 'error');
            }
        });
    }
    showToastMessage(message, type) {
        this.toastMessage = message;
        this.toastType = type;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
            this.cdr.detectChanges();
        }, 4000);
    }
    goToMyRedemptions() {
        this.router.navigate(['/user/redemptions']);
    }
    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        document.body.style.overflow = '';
    }
    static { this.ɵfac = function UserProductsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserProductsComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.UserDashboardService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserProductsComponent, selectors: [["app-user-products"]], decls: 62, vars: 24, consts: [[1, "user-page-wrapper"], [1, "user-page-main"], [1, "page-header"], [1, "header-left"], [1, "header-title"], [1, "header-right"], [1, "user-welcome"], [1, "welcome-text"], [1, "user-avatar"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "points-badge"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "2", "y", "5", "width", "20", "height", "14", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], [1, "points-value"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "9 18 15 12 9 6"], [1, "filter-controls"], [1, "filter-group"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "select-arrow"], ["points", "6 9 12 15 18 9"], [1, "filter-select", "sort-select", 3, "ngModelChange", "change", "ngModel"], ["value", "points-low"], ["value", "points-high"], ["value", "name-asc"], ["value", "name-desc"], [1, "search-container"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "text", "placeholder", "Search rewards", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "page-content"], ["class", "loading-indicator", 4, "ngIf"], ["class", "products-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination-container", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "toast"], [1, "toast-content"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["class", "toast-action", 3, "click", 4, "ngIf"], [3, "value"], [1, "loading-indicator"], [1, "spinner"], [1, "products-grid"], ["class", "product-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "product-card", 3, "click"], ["class", "stock-badge low-stock", 4, "ngIf"], ["class", "stock-badge out-of-stock", 4, "ngIf"], [1, "product-image-container"], ["class", "product-image", 3, "src", "alt", "error", 4, "ngIf"], ["class", "placeholder-image", 4, "ngIf"], [1, "product-info"], [1, "product-name"], [1, "product-points"], [1, "pts-label"], [1, "product-actions"], ["class", "insufficient-points", 4, "ngIf"], ["class", "action-row", 4, "ngIf"], [1, "stock-badge", "low-stock"], [1, "stock-badge", "out-of-stock"], [1, "product-image", 3, "error", "src", "alt"], [1, "placeholder-image"], ["width", "64", "height", "64", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], [1, "insufficient-points"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], [1, "action-row"], [1, "stock-status", 3, "ngClass"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "redeem-btn", 3, "click", "disabled"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "empty-state"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M16 16s-1.5-2-4-2-4 2-4 2"], ["x1", "9", "y1", "9", "x2", "9.01", "y2", "9"], ["x1", "15", "y1", "9", "x2", "15.01", "y2", "9"], [4, "ngIf"], [1, "pagination-container"], [1, "pagination-controls"], [1, "pagination-label"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-btn", "nav-btn", 3, "click", "disabled"], [1, "pagination-info"], [1, "page-btn", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-container", 3, "click"], [1, "modal-header"], [1, "modal-back", 3, "click"], ["points", "15 18 9 12 15 6"], [1, "modal-close", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["class", "modal-content", 4, "ngIf"], [1, "modal-content"], [1, "modal-image-container"], ["class", "modal-product-image", 3, "src", "alt", "error", 4, "ngIf"], ["class", "placeholder-image modal-placeholder", 4, "ngIf"], [1, "modal-product-info"], [1, "modal-product-name"], [1, "modal-product-points"], [1, "modal-stock-status", 3, "ngClass"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "modal-product-description"], [1, "quantity-selector"], [1, "quantity-label"], [1, "quantity-controls"], [1, "qty-btn", 3, "click", "disabled"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "quantity-value"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], [1, "modal-redeem-btn", 3, "click", "disabled"], [1, "modal-points-available"], [1, "modal-product-image", 3, "error", "src", "alt"], [1, "placeholder-image", "modal-placeholder"], ["width", "80", "height", "80", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["x1", "15", "y1", "9", "x2", "9", "y2", "15"], ["x1", "9", "y1", "9", "x2", "15", "y2", "15"], [1, "toast-action", 3, "click"]], template: function UserProductsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-user-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "h1", 4);
            i0.ɵɵtext(6, "Rewards");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5)(8, "div", 6)(9, "span", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 8);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(12, "svg", 9);
            i0.ɵɵelement(13, "path", 10)(14, "circle", 11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(15, "div", 12);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(16, "svg", 13);
            i0.ɵɵelement(17, "rect", 14)(18, "line", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(19, "span", 16);
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(22, "svg", 17);
            i0.ɵɵelement(23, "polyline", 18);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(24, "div", 19)(25, "div", 20)(26, "select", 21);
            i0.ɵɵtwoWayListener("ngModelChange", function UserProductsComponent_Template_select_ngModelChange_26_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedCategory, $event) || (ctx.selectedCategory = $event); return $event; });
            i0.ɵɵlistener("change", function UserProductsComponent_Template_select_change_26_listener() { return ctx.onCategoryChange(); });
            i0.ɵɵelementStart(27, "option", 22);
            i0.ɵɵtext(28, "All Categories");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(29, UserProductsComponent_option_29_Template, 2, 2, "option", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(30, "svg", 24);
            i0.ɵɵelement(31, "polyline", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(32, "div", 20)(33, "select", 26);
            i0.ɵɵtwoWayListener("ngModelChange", function UserProductsComponent_Template_select_ngModelChange_33_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.sortBy, $event) || (ctx.sortBy = $event); return $event; });
            i0.ɵɵlistener("change", function UserProductsComponent_Template_select_change_33_listener() { return ctx.onSortChange(); });
            i0.ɵɵelementStart(34, "option", 27);
            i0.ɵɵtext(35, "Sort by: Points (Low to High)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "option", 28);
            i0.ɵɵtext(37, "Sort by: Points (High to Low)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "option", 29);
            i0.ɵɵtext(39, "Sort by: Name (A-Z)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "option", 30);
            i0.ɵɵtext(41, "Sort by: Name (Z-A)");
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(42, "svg", 24);
            i0.ɵɵelement(43, "polyline", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(44, "div", 31);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(45, "svg", 32);
            i0.ɵɵelement(46, "circle", 33)(47, "path", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(48, "input", 35);
            i0.ɵɵtwoWayListener("ngModelChange", function UserProductsComponent_Template_input_ngModelChange_48_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("input", function UserProductsComponent_Template_input_input_48_listener() { return ctx.onSearch(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(49, "div", 36);
            i0.ɵɵtemplate(50, UserProductsComponent_div_50_Template, 4, 0, "div", 37)(51, UserProductsComponent_div_51_Template, 2, 1, "div", 38)(52, UserProductsComponent_div_52_Template, 9, 1, "div", 39)(53, UserProductsComponent_div_53_Template, 10, 5, "div", 40);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(54, UserProductsComponent_div_54_Template, 11, 1, "div", 41);
            i0.ɵɵelementStart(55, "div", 42)(56, "div", 43);
            i0.ɵɵtemplate(57, UserProductsComponent__svg_svg_57_Template, 3, 0, "svg", 44)(58, UserProductsComponent__svg_svg_58_Template, 4, 0, "svg", 44);
            i0.ɵɵelementStart(59, "span");
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(61, UserProductsComponent_button_61_Template, 2, 0, "button", 45);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate2("Welcome, ", (ctx.currentUser == null ? null : ctx.currentUser.firstName) || "User", " ", (ctx.currentUser == null ? null : ctx.currentUser.lastName) || "");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(21, 22, ctx.userPoints), " pts");
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedCategory);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.sortBy);
            i0.ɵɵadvance(15);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.paginatedProducts.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredProducts.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.totalProducts > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("show", ctx.showToast)("success", ctx.toastType === "success")("error", ctx.toastType === "error");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.toastType === "success");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.toastType === "error");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.toastMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.toastType === "success");
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgForOf, i4.NgIf, FormsModule, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, UserSidebarComponent, i4.DecimalPipe], styles: ["\r\n\r\n\r\n\n\r\n\r\n\n\r\n.user-page-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 50%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.user-page-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.7);\r\n  backdrop-filter: blur(10px);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.header-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.user-welcome[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.points-badge[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  padding: 10px 16px;\r\n  border-radius: 24px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.points-badge[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.points-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n}\r\n\r\n\r\n\r\n\n\r\n.filter-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 20px 32px;\r\n  background: transparent;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%] {\r\n  position: relative;\r\n}\r\n\r\n.filter-select[_ngcontent-%COMP%] {\r\n  appearance: none;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  padding: 12px 40px 12px 16px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  min-width: 180px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.sort-select[_ngcontent-%COMP%] {\r\n  min-width: 240px;\r\n}\r\n\r\n.select-arrow[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.search-container[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  max-width: 300px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px 16px 12px 44px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 0 32px 32px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-indicator[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n\r\n\r\n\n\r\n.products-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, 1fr);\r\n  gap: 24px;\r\n}\r\n\r\n@media (max-width: 1400px) {\r\n  .products-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(3, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n  .products-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .products-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n\r\n\r\n\n\r\n.product-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid rgba(0, 0, 0, 0.05);\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  position: relative;\r\n}\r\n\r\n.product-card[_ngcontent-%COMP%]:hover {\r\n  transform: translateY(-4px);\r\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.stock-badge[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 12px;\r\n  padding: 4px 10px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  z-index: 1;\r\n}\r\n\r\n.stock-badge.low-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stock-badge.out-of-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.product-image-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 180px;\r\n  background: var(--ag-color-field-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  overflow: hidden;\r\n}\r\n\r\n.product-image[_ngcontent-%COMP%] {\r\n  max-width: 85%;\r\n  max-height: 85%;\r\n  object-fit: contain;\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n.placeholder-image[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.placeholder-image.modal-placeholder[_ngcontent-%COMP%] {\r\n  min-height: 200px;\r\n}\r\n\r\n.product-card[_ngcontent-%COMP%]:hover   .product-image[_ngcontent-%COMP%] {\r\n  transform: scale(1.05);\r\n}\r\n\r\n.product-info[_ngcontent-%COMP%] {\r\n  padding: 16px 20px 8px;\r\n}\r\n\r\n.product-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 4px;\r\n  line-height: 1.3;\r\n}\r\n\r\n.product-points[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n.pts-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.product-actions[_ngcontent-%COMP%] {\r\n  padding: 12px 20px 20px;\r\n}\r\n\r\n\n\r\n.insufficient-points[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 14px;\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  color: var(--ag-color-support-caution-major);\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n}\r\n\r\n.insufficient-points[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n}\r\n\r\n\n\r\n.action-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 12px;\r\n}\r\n\r\n.stock-status[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-status.in-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.stock-status.low-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stock-status.out-of-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.redeem-btn[_ngcontent-%COMP%] {\r\n  padding: 10px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.redeem-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n.redeem-btn[_ngcontent-%COMP%]:disabled {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n\r\n\r\n\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  text-align: center;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  margin: 0 0 8px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n\r\n\r\n\n\r\n.pagination-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 12px;\r\n  margin-top: 40px;\r\n  padding-top: 24px;\r\n}\r\n\r\n.pagination-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.pagination-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-right: 8px;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.page-btn.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.page-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.nav-btn[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n}\r\n\r\n.pagination-info[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.modal-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  z-index: 1000;\r\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_fadeIn {\r\n  from { opacity: 0; }\r\n  to { opacity: 1; }\r\n}\r\n\r\n.modal-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 480px;\r\n  height: 100%;\r\n  background: var(--ag-color-layer-01);\r\n  display: flex;\r\n  flex-direction: column;\r\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\r\n  overflow-y: auto;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slideIn {\r\n  from { transform: translateX(100%); }\r\n  to { transform: translateX(0); }\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  position: sticky;\r\n  top: 0;\r\n  background: var(--ag-color-layer-01);\r\n  z-index: 1;\r\n}\r\n\r\n.modal-back[_ngcontent-%COMP%], \r\n.modal-close[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: none;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.modal-back[_ngcontent-%COMP%]:hover, \r\n.modal-close[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.modal-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.modal-image-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 280px;\r\n  background: var(--ag-color-field-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.modal-product-image[_ngcontent-%COMP%] {\r\n  max-width: 80%;\r\n  max-height: 80%;\r\n  object-fit: contain;\r\n}\r\n\r\n.modal-product-info[_ngcontent-%COMP%] {\r\n  padding: 24px;\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.modal-product-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-product-points[_ngcontent-%COMP%] {\r\n  font-size: 28px;\r\n  font-weight: 700;\r\n  color: var(--ag-button-primary);\r\n  margin: 0 0 16px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-stock-status[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  padding: 8px 16px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  width: fit-content;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.modal-stock-status.in-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.modal-stock-status.low-stock[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.modal-product-description[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  line-height: 1.6;\r\n  margin: 0 0 24px;\r\n  text-align: center;\r\n}\r\n\r\n.quantity-selector[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.quantity-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.quantity-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.qty-btn[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.qty-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.quantity-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  min-width: 32px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-redeem-btn[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.modal-redeem-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n.modal-redeem-btn[_ngcontent-%COMP%]:disabled {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modal-points-available[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  text-align: center;\r\n  margin: 0;\r\n}\r\n\r\n.modal-points-available[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n\r\n\r\n\n\r\n.toast[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  bottom: 24px;\r\n  right: 24px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);\r\n  padding: 16px 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  transform: translateY(120%);\r\n  opacity: 0;\r\n  transition: all 0.3s ease;\r\n  z-index: 1100;\r\n  max-width: 400px;\r\n}\r\n\r\n.toast.show[_ngcontent-%COMP%] {\r\n  transform: translateY(0);\r\n  opacity: 1;\r\n}\r\n\r\n.toast.success[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.toast.error[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.toast-content[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n}\r\n\r\n.toast-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.toast-action[_ngcontent-%COMP%] {\r\n  padding: 8px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.toast-action[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 768px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    padding: 12px 16px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .header-title[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .filter-controls[_ngcontent-%COMP%] {\r\n    padding: 16px;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .filter-select[_ngcontent-%COMP%], \r\n   .sort-select[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    min-width: auto;\r\n  }\r\n\r\n  .search-container[_ngcontent-%COMP%] {\r\n    max-width: none;\r\n  }\r\n\r\n  .page-content[_ngcontent-%COMP%] {\r\n    padding: 0 16px 24px;\r\n  }\r\n\r\n  .modal-container[_ngcontent-%COMP%] {\r\n    max-width: 100%;\r\n  }\r\n\r\n  .toast[_ngcontent-%COMP%] {\r\n    left: 16px;\r\n    right: 16px;\r\n    bottom: 16px;\r\n    max-width: none;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n  }\r\n\r\n  .toast-action[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserProductsComponent, [{
        type: Component,
        args: [{ selector: 'app-user-products', standalone: true, imports: [CommonModule, FormsModule, UserSidebarComponent], template: "<div class=\"user-page-wrapper\">\r\n  <app-user-sidebar></app-user-sidebar>\r\n\r\n  <div class=\"user-page-main\">\r\n    <!-- Top Header Bar -->\r\n    <div class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"header-title\">Rewards</h1>\r\n      </div>\r\n\r\n      <div class=\"header-right\">\r\n        <div class=\"user-welcome\">\r\n          <span class=\"welcome-text\">Welcome, {{ currentUser?.firstName || 'User' }} {{ currentUser?.lastName || '' }}</span>\r\n          <div class=\"user-avatar\">\r\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\r\n              <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\r\n            </svg>\r\n          </div>\r\n        </div>\r\n        <div class=\"points-badge\">\r\n          <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect>\r\n            <line x1=\"2\" y1=\"10\" x2=\"22\" y2=\"10\"></line>\r\n          </svg>\r\n          <span class=\"points-value\">{{ userPoints | number }} pts</span>\r\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polyline points=\"9 18 15 12 9 6\"></polyline>\r\n          </svg>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Filter Controls Row -->\r\n    <div class=\"filter-controls\">\r\n      <div class=\"filter-group\">\r\n        <select class=\"filter-select\" [(ngModel)]=\"selectedCategory\" (change)=\"onCategoryChange()\">\r\n          <option value=\"\">All Categories</option>\r\n          <option *ngFor=\"let cat of categories\" [value]=\"cat.id\">{{ cat.name }}</option>\r\n        </select>\r\n        <svg class=\"select-arrow\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <polyline points=\"6 9 12 15 18 9\"></polyline>\r\n        </svg>\r\n      </div>\r\n\r\n      <div class=\"filter-group\">\r\n        <select class=\"filter-select sort-select\" [(ngModel)]=\"sortBy\" (change)=\"onSortChange()\">\r\n          <option value=\"points-low\">Sort by: Points (Low to High)</option>\r\n          <option value=\"points-high\">Sort by: Points (High to Low)</option>\r\n          <option value=\"name-asc\">Sort by: Name (A-Z)</option>\r\n          <option value=\"name-desc\">Sort by: Name (Z-A)</option>\r\n        </select>\r\n        <svg class=\"select-arrow\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <polyline points=\"6 9 12 15 18 9\"></polyline>\r\n        </svg>\r\n      </div>\r\n\r\n      <div class=\"search-container\">\r\n        <svg class=\"search-icon\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n          <path d=\"m21 21-4.35-4.35\"></path>\r\n        </svg>\r\n        <input \r\n          type=\"text\" \r\n          class=\"search-input\" \r\n          placeholder=\"Search rewards\" \r\n          [(ngModel)]=\"searchQuery\"\r\n          (input)=\"onSearch()\" />\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Main Content -->\r\n    <div class=\"page-content\">\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-indicator\">\r\n        <div class=\"spinner\"></div>\r\n        <p>Loading rewards...</p>\r\n      </div>\r\n\r\n      <!-- Products Grid -->\r\n      <div class=\"products-grid\" *ngIf=\"!isLoading && paginatedProducts.length > 0\">\r\n        <div \r\n          class=\"product-card\" \r\n          *ngFor=\"let product of paginatedProducts\"\r\n          (click)=\"openProductModal(product)\">\r\n          \r\n          <!-- Low Stock Badge -->\r\n          <div class=\"stock-badge low-stock\" *ngIf=\"product.stockStatus === 'low-stock'\">\r\n            Low Stock\r\n          </div>\r\n          <div class=\"stock-badge out-of-stock\" *ngIf=\"product.stockStatus === 'out-of-stock'\">\r\n            Out of Stock\r\n          </div>\r\n\r\n          <!-- Product Image -->\r\n          <div class=\"product-image-container\">\r\n            <img \r\n              *ngIf=\"product.imageUrl\"\r\n              [src]=\"product.imageUrl\" \r\n              [alt]=\"product.name\"\r\n              class=\"product-image\"\r\n              (error)=\"product.imageUrl = ''\" />\r\n            <div class=\"placeholder-image\" *ngIf=\"!product.imageUrl\">\r\n              <svg width=\"64\" height=\"64\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">\r\n                <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n                <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle>\r\n                <polyline points=\"21 15 16 10 5 21\"></polyline>\r\n              </svg>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Product Info -->\r\n          <div class=\"product-info\">\r\n            <h3 class=\"product-name\">{{ product.name }}</h3>\r\n            <p class=\"product-points\">{{ product.pointsCost | number }} <span class=\"pts-label\">pts</span></p>\r\n          </div>\r\n\r\n          <!-- Product Actions -->\r\n          <div class=\"product-actions\">\r\n            <!-- Insufficient Points State -->\r\n            <div class=\"insufficient-points\" *ngIf=\"userPoints < product.pointsCost && product.currentStock > 0\">\r\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\r\n                <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line>\r\n                <line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>\r\n              </svg>\r\n              <span>Not enough points.</span>\r\n            </div>\r\n\r\n            <!-- Stock Status + Redeem Button -->\r\n            <div class=\"action-row\" *ngIf=\"userPoints >= product.pointsCost || product.currentStock === 0\">\r\n              <div class=\"stock-status\" [ngClass]=\"product.stockStatus\">\r\n                <svg *ngIf=\"product.stockStatus === 'in-stock'\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                  <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\r\n                </svg>\r\n                <svg *ngIf=\"product.stockStatus === 'low-stock'\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                  <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\r\n                  <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line>\r\n                  <line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>\r\n                </svg>\r\n                <span>{{ product.stockLabel }}</span>\r\n              </div>\r\n              <button \r\n                class=\"redeem-btn\"\r\n                [disabled]=\"!product.canRedeem\"\r\n                (click)=\"$event.stopPropagation(); redeemProduct()\">\r\n                Redeem\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Empty State -->\r\n      <div *ngIf=\"!isLoading && filteredProducts.length === 0\" class=\"empty-state\">\r\n        <svg width=\"64\" height=\"64\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">\r\n          <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n          <path d=\"M16 16s-1.5-2-4-2-4 2-4 2\"></path>\r\n          <line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line>\r\n          <line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>\r\n        </svg>\r\n        <p>No rewards found</p>\r\n        <span *ngIf=\"searchQuery || selectedCategory\">Try adjusting your filters</span>\r\n      </div>\r\n\r\n      <!-- Pagination -->\r\n      <div class=\"pagination-container\" *ngIf=\"!isLoading && totalProducts > 0\">\r\n        <div class=\"pagination-controls\">\r\n          <span class=\"pagination-label\">Showing</span>\r\n          <button \r\n            *ngFor=\"let page of pageNumbers\"\r\n            class=\"page-btn\"\r\n            [class.active]=\"page === currentPage\"\r\n            (click)=\"goToPage(page)\">\r\n            {{ page }}\r\n          </button>\r\n          <button \r\n            class=\"page-btn nav-btn\"\r\n            [disabled]=\"currentPage >= totalPages\"\r\n            (click)=\"goToPage(currentPage + 1)\">\r\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polyline points=\"9 18 15 12 9 6\"></polyline>\r\n            </svg>\r\n          </button>\r\n        </div>\r\n        <p class=\"pagination-info\">\r\n          Showing {{ (currentPage - 1) * pageSize + 1 }}\u2013{{ Math.min(currentPage * pageSize, totalProducts) }} of {{ totalProducts }} rewards\r\n        </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Product Detail Modal -->\r\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\r\n  <div class=\"modal-container\" (click)=\"$event.stopPropagation()\">\r\n    <div class=\"modal-header\">\r\n      <button class=\"modal-back\" (click)=\"closeModal()\">\r\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <polyline points=\"15 18 9 12 15 6\"></polyline>\r\n        </svg>\r\n      </button>\r\n      <button class=\"modal-close\" (click)=\"closeModal()\">\r\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\r\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"modal-content\" *ngIf=\"selectedProduct\">\r\n      <div class=\"modal-image-container\">\r\n        <img \r\n          *ngIf=\"selectedProduct.imageUrl\"\r\n          [src]=\"selectedProduct.imageUrl\" \r\n          [alt]=\"selectedProduct.name\"\r\n          class=\"modal-product-image\"\r\n          (error)=\"selectedProduct.imageUrl = ''\" />\r\n        <div class=\"placeholder-image modal-placeholder\" *ngIf=\"!selectedProduct.imageUrl\">\r\n          <svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">\r\n            <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n            <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle>\r\n            <polyline points=\"21 15 16 10 5 21\"></polyline>\r\n          </svg>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-product-info\">\r\n        <h2 class=\"modal-product-name\">{{ selectedProduct.name }}</h2>\r\n        <p class=\"modal-product-points\">{{ selectedProduct.pointsCost | number }} <span class=\"pts-label\">pts</span></p>\r\n        \r\n        <div class=\"modal-stock-status\" [ngClass]=\"selectedProduct.stockStatus\">\r\n          <svg *ngIf=\"selectedProduct.stockStatus === 'in-stock'\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n            <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\r\n          </svg>\r\n          <svg *ngIf=\"selectedProduct.stockStatus === 'low-stock'\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\r\n          </svg>\r\n          <span>{{ selectedProduct.stockLabel }}</span>\r\n        </div>\r\n\r\n        <p class=\"modal-product-description\">{{ selectedProduct.description }}</p>\r\n\r\n        <div class=\"quantity-selector\">\r\n          <span class=\"quantity-label\">Quantity</span>\r\n          <div class=\"quantity-controls\">\r\n            <button class=\"qty-btn\" (click)=\"decrementQuantity()\" [disabled]=\"selectedQuantity <= 1\">\r\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\r\n              </svg>\r\n            </button>\r\n            <span class=\"quantity-value\">{{ selectedQuantity }}</span>\r\n            <button class=\"qty-btn\" (click)=\"incrementQuantity()\" [disabled]=\"selectedQuantity >= selectedProduct.currentStock\">\r\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\r\n                <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\r\n              </svg>\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <button \r\n          class=\"modal-redeem-btn\"\r\n          [disabled]=\"!canRedeemSelected || isRedeeming\"\r\n          (click)=\"redeemProduct()\">\r\n          <span *ngIf=\"!isRedeeming\">Redeem</span>\r\n          <span *ngIf=\"isRedeeming\">Processing...</span>\r\n        </button>\r\n\r\n        <p class=\"modal-points-available\">\r\n          You have <strong>{{ userPoints | number }}</strong> points available.\r\n        </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Toast Notification -->\r\n<div class=\"toast\" [class.show]=\"showToast\" [class.success]=\"toastType === 'success'\" [class.error]=\"toastType === 'error'\">\r\n  <div class=\"toast-content\">\r\n    <svg *ngIf=\"toastType === 'success'\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n      <path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path>\r\n      <polyline points=\"22 4 12 14.01 9 11.01\"></polyline>\r\n    </svg>\r\n    <svg *ngIf=\"toastType === 'error'\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n      <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n      <line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>\r\n      <line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>\r\n    </svg>\r\n    <span>{{ toastMessage }}</span>\r\n  </div>\r\n  <button class=\"toast-action\" *ngIf=\"toastType === 'success'\" (click)=\"goToMyRedemptions()\">\r\n    View My Redemptions\r\n  </button>\r\n</div>\r\n", styles: ["/* ==========================================\r\n   USER PRODUCTS (REWARDS) PAGE STYLES\r\n   Matching the provided design mockups\r\n   ========================================== */\r\n\r\n/* Page Layout */\r\n.user-page-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 50%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.user-page-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n/* ==========================================\r\n   HEADER STYLES\r\n   ========================================== */\r\n.page-header {\r\n  background: rgba(255, 255, 255, 0.7);\r\n  backdrop-filter: blur(10px);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.header-title {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.user-welcome {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.points-badge {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  padding: 10px 16px;\r\n  border-radius: 24px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.points-badge:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.points-value {\r\n  font: var(--ag-typo-body-01);\r\n}\r\n\r\n/* ==========================================\r\n   FILTER CONTROLS\r\n   ========================================== */\r\n.filter-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 20px 32px;\r\n  background: transparent;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-group {\r\n  position: relative;\r\n}\r\n\r\n.filter-select {\r\n  appearance: none;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  padding: 12px 40px 12px 16px;\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  min-width: 180px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-select:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.sort-select {\r\n  min-width: 240px;\r\n}\r\n\r\n.select-arrow {\r\n  position: absolute;\r\n  right: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.search-container {\r\n  flex: 1;\r\n  max-width: 300px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 12px 16px 12px 44px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  background: var(--ag-color-layer-01);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n/* ==========================================\r\n   PAGE CONTENT\r\n   ========================================== */\r\n.page-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 0 32px 32px;\r\n}\r\n\r\n/* ==========================================\r\n   LOADING STATE\r\n   ========================================== */\r\n.loading-indicator {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.spinner {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n/* ==========================================\r\n   PRODUCTS GRID\r\n   ========================================== */\r\n.products-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, 1fr);\r\n  gap: 24px;\r\n}\r\n\r\n@media (max-width: 1400px) {\r\n  .products-grid {\r\n    grid-template-columns: repeat(3, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n  .products-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .products-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n/* ==========================================\r\n   PRODUCT CARD\r\n   ========================================== */\r\n.product-card {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid rgba(0, 0, 0, 0.05);\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  position: relative;\r\n}\r\n\r\n.product-card:hover {\r\n  transform: translateY(-4px);\r\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.stock-badge {\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 12px;\r\n  padding: 4px 10px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 600;\r\n  z-index: 1;\r\n}\r\n\r\n.stock-badge.low-stock {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stock-badge.out-of-stock {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.product-image-container {\r\n  width: 100%;\r\n  height: 180px;\r\n  background: var(--ag-color-field-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  overflow: hidden;\r\n}\r\n\r\n.product-image {\r\n  max-width: 85%;\r\n  max-height: 85%;\r\n  object-fit: contain;\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n.placeholder-image {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.placeholder-image.modal-placeholder {\r\n  min-height: 200px;\r\n}\r\n\r\n.product-card:hover .product-image {\r\n  transform: scale(1.05);\r\n}\r\n\r\n.product-info {\r\n  padding: 16px 20px 8px;\r\n}\r\n\r\n.product-name {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 4px;\r\n  line-height: 1.3;\r\n}\r\n\r\n.product-points {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 700;\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n.pts-label {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.product-actions {\r\n  padding: 12px 20px 20px;\r\n}\r\n\r\n/* Insufficient Points State */\r\n.insufficient-points {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 14px;\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  color: var(--ag-color-support-caution-major);\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n}\r\n\r\n.insufficient-points svg {\r\n  flex-shrink: 0;\r\n}\r\n\r\n/* Action Row */\r\n.action-row {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 12px;\r\n}\r\n\r\n.stock-status {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-status.in-stock {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.stock-status.low-stock {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stock-status.out-of-stock {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.redeem-btn {\r\n  padding: 10px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.redeem-btn:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n.redeem-btn:disabled {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* ==========================================\r\n   EMPTY STATE\r\n   ========================================== */\r\n.empty-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  text-align: center;\r\n}\r\n\r\n.empty-state svg {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.empty-state p {\r\n  font: var(--ag-typo-h4);\r\n  margin: 0 0 8px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.empty-state span {\r\n  font: var(--ag-typo-body-02);\r\n}\r\n\r\n/* ==========================================\r\n   PAGINATION\r\n   ========================================== */\r\n.pagination-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 12px;\r\n  margin-top: 40px;\r\n  padding-top: 24px;\r\n}\r\n\r\n.pagination-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.pagination-label {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin-right: 8px;\r\n}\r\n\r\n.page-btn {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: none;\r\n  border-radius: 8px;\r\n  background: var(--ag-color-layer-01);\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.page-btn:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.page-btn.active {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.page-btn:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.nav-btn {\r\n  background: transparent;\r\n}\r\n\r\n.pagination-info {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-button-primary);\r\n  margin: 0;\r\n}\r\n\r\n/* ==========================================\r\n   MODAL STYLES\r\n   ========================================== */\r\n.modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  z-index: 1000;\r\n  animation: fadeIn 0.2s ease;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from { opacity: 0; }\r\n  to { opacity: 1; }\r\n}\r\n\r\n.modal-container {\r\n  width: 100%;\r\n  max-width: 480px;\r\n  height: 100%;\r\n  background: var(--ag-color-layer-01);\r\n  display: flex;\r\n  flex-direction: column;\r\n  animation: slideIn 0.3s ease;\r\n  overflow-y: auto;\r\n}\r\n\r\n@keyframes slideIn {\r\n  from { transform: translateX(100%); }\r\n  to { transform: translateX(0); }\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  position: sticky;\r\n  top: 0;\r\n  background: var(--ag-color-layer-01);\r\n  z-index: 1;\r\n}\r\n\r\n.modal-back,\r\n.modal-close {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: none;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.modal-back:hover,\r\n.modal-close:hover {\r\n  background: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.modal-content {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.modal-image-container {\r\n  width: 100%;\r\n  height: 280px;\r\n  background: var(--ag-color-field-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.modal-product-image {\r\n  max-width: 80%;\r\n  max-height: 80%;\r\n  object-fit: contain;\r\n}\r\n\r\n.modal-product-info {\r\n  padding: 24px;\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.modal-product-name {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 8px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-product-points {\r\n  font-size: 28px;\r\n  font-weight: 700;\r\n  color: var(--ag-button-primary);\r\n  margin: 0 0 16px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-stock-status {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  padding: 8px 16px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  width: fit-content;\r\n  margin: 0 auto 20px;\r\n}\r\n\r\n.modal-stock-status.in-stock {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.modal-stock-status.low-stock {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.modal-product-description {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  line-height: 1.6;\r\n  margin: 0 0 24px;\r\n  text-align: center;\r\n}\r\n\r\n.quantity-selector {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 16px 20px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.quantity-label {\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.quantity-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.qty-btn {\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-color-text-secondary);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.qty-btn:hover:not(:disabled) {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.qty-btn:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.quantity-value {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  min-width: 32px;\r\n  text-align: center;\r\n}\r\n\r\n.modal-redeem-btn {\r\n  width: 100%;\r\n  padding: 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-body-01);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.modal-redeem-btn:hover:not(:disabled) {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n.modal-redeem-btn:disabled {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modal-points-available {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  text-align: center;\r\n  margin: 0;\r\n}\r\n\r\n.modal-points-available strong {\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n/* ==========================================\r\n   TOAST NOTIFICATION\r\n   ========================================== */\r\n.toast {\r\n  position: fixed;\r\n  bottom: 24px;\r\n  right: 24px;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);\r\n  padding: 16px 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  transform: translateY(120%);\r\n  opacity: 0;\r\n  transition: all 0.3s ease;\r\n  z-index: 1100;\r\n  max-width: 400px;\r\n}\r\n\r\n.toast.show {\r\n  transform: translateY(0);\r\n  opacity: 1;\r\n}\r\n\r\n.toast.success .toast-content svg {\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.toast.error .toast-content svg {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.toast-content {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n}\r\n\r\n.toast-content span {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.toast-action {\r\n  padding: 8px 16px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.toast-action:hover {\r\n  background: var(--ag-button-primary-hover);\r\n}\r\n\r\n/* ==========================================\r\n   RESPONSIVE ADJUSTMENTS\r\n   ========================================== */\r\n@media (max-width: 768px) {\r\n  .page-header {\r\n    padding: 12px 16px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .header-title {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .filter-controls {\r\n    padding: 16px;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .filter-select,\r\n  .sort-select {\r\n    width: 100%;\r\n    min-width: auto;\r\n  }\r\n\r\n  .search-container {\r\n    max-width: none;\r\n  }\r\n\r\n  .page-content {\r\n    padding: 0 16px 24px;\r\n  }\r\n\r\n  .modal-container {\r\n    max-width: 100%;\r\n  }\r\n\r\n  .toast {\r\n    left: 16px;\r\n    right: 16px;\r\n    bottom: 16px;\r\n    max-width: none;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n  }\r\n\r\n  .toast-action {\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.UserDashboardService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserProductsComponent, { className: "UserProductsComponent", filePath: "src/app/pages/user/products/user-products.component.ts", lineNumber: 24 }); })();
//# sourceMappingURL=user-products.component.js.map