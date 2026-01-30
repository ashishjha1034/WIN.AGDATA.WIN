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
function UserRedemptionsComponent_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function UserRedemptionsComponent_button_22_Template_button_click_0_listener() { const tab_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectTab(tab_r2.key)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.activeTab === tab_r2.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", tab_r2.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("has-count", tab_r2.count > 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tab_r2.count);
} }
function UserRedemptionsComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "div", 25);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading your redemptions...");
    i0.ɵɵelementEnd()();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_img_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 51);
    i0.ɵɵlistener("error", function UserRedemptionsComponent_div_25_div_4_div_1_img_3_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r4); const redemption_r5 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(redemption_r5.productImageUrl = ""); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", redemption_r5.productImageUrl, i0.ɵɵsanitizeUrl)("alt", redemption_r5.productName);
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 53);
    i0.ɵɵelement(2, "rect", 54)(3, "circle", 55)(4, "polyline", 56);
    i0.ɵɵelementEnd()();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57)(1, "h4", 58);
    i0.ɵɵtext(2, "Points Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 59)(4, "span", 60);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(5, "svg", 61);
    i0.ɵɵelement(6, "polyline", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(9, "span", 63);
    i0.ɵɵtext(10, "\u2014\u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 60);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(12, "svg", 61);
    i0.ɵɵelement(13, "polyline", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" Points Spent: ", i0.ɵɵpipeBind1(8, 2, redemption_r5.pointsSpent), " pts ");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" Pb Balance: ", i0.ɵɵpipeBind1(15, 4, ctx_r2.userPoints), " pts ");
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_18_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 74);
    i0.ɵɵelement(2, "circle", 67)(3, "polyline", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Admin Note: ", ctx_r2.formatRedemptionId(redemption_r5.id), " ");
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 65);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 66);
    i0.ɵɵelement(3, "circle", 67)(4, "line", 68)(5, "line", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "span", 70);
    i0.ɵɵtext(7, "Admin Note:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 71);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, UserRedemptionsComponent_div_25_div_4_div_1_div_18_div_10_Template, 5, 1, "div", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(redemption_r5.adminNotes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode === 1);
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 83);
    i0.ɵɵelement(1, "polyline", 84);
    i0.ɵɵelementEnd();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.formatShortDate(redemption_r5.createdAt));
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 83);
    i0.ɵɵelement(1, "polyline", 84);
    i0.ɵɵelementEnd();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.formatShortDate(redemption_r5.approvedAt));
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 83);
    i0.ɵɵelement(1, "polyline", 84);
    i0.ɵɵelementEnd();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.formatShortDate(redemption_r5.deliveredAt));
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76)(1, "div", 77)(2, "div", 78);
    i0.ɵɵtemplate(3, UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_3_Template, 2, 0, "svg", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 80);
    i0.ɵɵtext(5, "Requested");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_6_Template, 2, 1, "span", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "div", 82);
    i0.ɵɵelementStart(8, "div", 77)(9, "div", 78);
    i0.ɵɵtemplate(10, UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_10_Template, 2, 0, "svg", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 80);
    i0.ɵɵtext(12, "Approved");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_13_Template, 2, 1, "span", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "div", 82);
    i0.ɵɵelementStart(15, "div", 77)(16, "div", 78);
    i0.ɵɵtemplate(17, UserRedemptionsComponent_div_25_div_4_div_1_div_19__svg_svg_17_Template, 2, 0, "svg", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 80);
    i0.ɵɵtext(19, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, UserRedemptionsComponent_div_25_div_4_div_1_div_19_span_20_Template, 2, 1, "span", 81);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const redemption_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.getTimelineStepClass(0, redemption_r5.statusCode));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.getTimelineStepClass(0, redemption_r5.statusCode) === "step-completed");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode >= 0 && redemption_r5.createdAt);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.isTimelineConnectorActive(0, redemption_r5.statusCode));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.getTimelineStepClass(1, redemption_r5.statusCode));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.getTimelineStepClass(1, redemption_r5.statusCode) === "step-completed");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", redemption_r5.approvedAt);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.isTimelineConnectorActive(1, redemption_r5.statusCode));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.getTimelineStepClass(2, redemption_r5.statusCode));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.getTimelineStepClass(2, redemption_r5.statusCode) === "step-completed");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", redemption_r5.deliveredAt);
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "div", 87)(2, "div", 78);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 83);
    i0.ɵɵelement(4, "polyline", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span", 80);
    i0.ɵɵtext(6, "Requested");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "div", 88);
    i0.ɵɵelementStart(8, "div", 89)(9, "div", 90);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 91);
    i0.ɵɵelement(11, "line", 92)(12, "line", 93);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(13, "span", 80);
    i0.ɵɵtext(14, "Rejected");
    i0.ɵɵelementEnd()()();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 66);
    i0.ɵɵelement(2, "circle", 67)(3, "polyline", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Awaiting approval");
    i0.ɵɵelementEnd()();
} }
function UserRedemptionsComponent_div_25_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 34)(2, "div", 35);
    i0.ɵɵtemplate(3, UserRedemptionsComponent_div_25_div_4_div_1_img_3_Template, 1, 2, "img", 36)(4, UserRedemptionsComponent_div_25_div_4_div_1_div_4_Template, 5, 0, "div", 37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 38)(6, "div", 39)(7, "h3", 40);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 41);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 42)(13, "strong");
    i0.ɵɵtext(14, "Points Spent:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, UserRedemptionsComponent_div_25_div_4_div_1_div_17_Template, 16, 6, "div", 43)(18, UserRedemptionsComponent_div_25_div_4_div_1_div_18_Template, 11, 2, "div", 44)(19, UserRedemptionsComponent_div_25_div_4_div_1_div_19_Template, 21, 13, "div", 45)(20, UserRedemptionsComponent_div_25_div_4_div_1_div_20_Template, 15, 0, "div", 46)(21, UserRedemptionsComponent_div_25_div_4_div_1_div_21_Template, 6, 0, "div", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 48)(23, "span", 49);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "uppercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 50);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const redemption_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", redemption_r5.productImageUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !redemption_r5.productImageUrl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(redemption_r5.productName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Qty: ", redemption_r5.quantity, " \u00D7 ", i0.ɵɵpipeBind1(11, 14, redemption_r5.productPointsPerUnit), " pts");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 16, redemption_r5.pointsSpent), " pts");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", redemption_r5.adminNotes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode !== 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode === 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", redemption_r5.statusCode === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.getStatusClass(redemption_r5.statusCode));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(25, 18, redemption_r5.status), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Redemption ID: ", ctx_r2.formatRedemptionId(redemption_r5.id));
} }
function UserRedemptionsComponent_div_25_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtemplate(1, UserRedemptionsComponent_div_25_div_4_div_1_Template, 28, 20, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredRedemptions);
} }
function UserRedemptionsComponent_div_25_div_5_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.getEmptyStateMessage().subtitle);
} }
function UserRedemptionsComponent_div_25_div_5_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 104);
    i0.ɵɵlistener("click", function UserRedemptionsComponent_div_25_div_5_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.navigateToProducts()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 105);
    i0.ɵɵelement(2, "path", 106)(3, "line", 7)(4, "path", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Browse Rewards ");
    i0.ɵɵelementEnd();
} }
function UserRedemptionsComponent_div_25_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "div", 96);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 97);
    i0.ɵɵelement(3, "rect", 54)(4, "line", 98)(5, "line", 99);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "h3", 100);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, UserRedemptionsComponent_div_25_div_5_p_8_Template, 2, 1, "p", 101)(9, UserRedemptionsComponent_div_25_div_5_button_9_Template, 6, 0, "button", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.getEmptyStateMessage().title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.getEmptyStateMessage().subtitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.getEmptyStateMessage().showCta);
} }
function UserRedemptionsComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "div", 27)(2, "h2", 28);
    i0.ɵɵtext(3, "My Redemptions");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, UserRedemptionsComponent_div_25_div_4_Template, 2, 1, "div", 29)(5, UserRedemptionsComponent_div_25_div_5_Template, 10, 3, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r2.filteredRedemptions.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.filteredRedemptions.length === 0);
} }
export class UserRedemptionsComponent {
    constructor(authService, userDashboardService, router, cdr) {
        this.authService = authService;
        this.userDashboardService = userDashboardService;
        this.router = router;
        this.cdr = cdr;
        this.redemptions = [];
        this.filteredRedemptions = [];
        this.isLoading = true;
        this.userPoints = 0;
        // Status tabs
        this.statusTabs = [
            { key: 'pending', label: 'Pending', count: 0, statusCode: 0 },
            { key: 'approved', label: 'Approved', count: 0, statusCode: 1 },
            { key: 'delivered', label: 'Delivered', count: 0, statusCode: 3 },
            { key: 'rejected', label: 'Rejected', count: 0, statusCode: 2 }
        ];
        this.activeTab = 'pending';
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
        // Load user points
        this.userDashboardService.getUserPoints()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (points) => {
                this.userPoints = points;
                this.cdr.detectChanges();
            },
            error: (error) => console.error('Error loading user points:', error)
        });
        // Load redemptions
        this.userDashboardService.getRedemptions()
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (redemptions) => {
                this.redemptions = redemptions;
                this.calculateStatusCounts();
                this.filterRedemptionsByTab();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading redemptions:', error);
            }
        });
    }
    calculateStatusCounts() {
        // Reset counts
        this.statusTabs.forEach(tab => tab.count = 0);
        // Calculate counts from redemptions
        this.redemptions.forEach(r => {
            const tab = this.statusTabs.find(t => t.statusCode === r.statusCode);
            if (tab) {
                tab.count++;
            }
        });
    }
    selectTab(tabKey) {
        this.activeTab = tabKey;
        this.filterRedemptionsByTab();
    }
    filterRedemptionsByTab() {
        const activeTabConfig = this.statusTabs.find(t => t.key === this.activeTab);
        if (activeTabConfig) {
            this.filteredRedemptions = this.redemptions.filter(r => r.statusCode === activeTabConfig.statusCode);
        }
    }
    getStatusClass(statusCode) {
        switch (statusCode) {
            case 0: return 'status-pending';
            case 1: return 'status-approved';
            case 2: return 'status-rejected';
            case 3: return 'status-delivered';
            default: return 'status-pending';
        }
    }
    getTimelineStepClass(stepIndex, statusCode) {
        // Timeline steps: 0=Requested, 1=Approved, 2=Delivered
        // Status codes: 0=Pending, 1=Approved, 2=Rejected, 3=Delivered
        if (statusCode === 2) {
            // Rejected: only Requested is completed
            return stepIndex === 0 ? 'step-completed' : 'step-pending';
        }
        if (statusCode === 0) {
            // Pending: only Requested is completed
            return stepIndex === 0 ? 'step-completed' : 'step-pending';
        }
        if (statusCode === 1) {
            // Approved: Requested and Approved are completed
            return stepIndex <= 1 ? 'step-completed' : 'step-pending';
        }
        if (statusCode === 3) {
            // Delivered: all steps completed
            return 'step-completed';
        }
        return 'step-pending';
    }
    isTimelineConnectorActive(connectorIndex, statusCode) {
        // Connector 0: between Requested and Approved
        // Connector 1: between Approved and Delivered
        if (statusCode === 2) {
            // Rejected
            return false;
        }
        if (statusCode === 0) {
            // Pending
            return false;
        }
        if (statusCode === 1) {
            // Approved
            return connectorIndex === 0;
        }
        if (statusCode === 3) {
            // Delivered
            return true;
        }
        return false;
    }
    formatDate(dateString) {
        if (!dateString)
            return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    formatShortDate(dateString) {
        if (!dateString)
            return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    formatRedemptionId(id) {
        // Return last 7 characters of the ID
        if (!id)
            return '';
        return '#' + id.substring(id.length - 7).toUpperCase();
    }
    navigateToProducts() {
        this.router.navigateByUrl('/user/products');
    }
    getEmptyStateMessage() {
        switch (this.activeTab) {
            case 'pending':
                return {
                    title: "You don't have any pending redemptions.",
                    subtitle: "Browse rewards and redeem your points!",
                    showCta: true
                };
            case 'approved':
                return {
                    title: "No approved redemptions awaiting delivery.",
                    subtitle: "Your approved redemptions will appear here.",
                    showCta: false
                };
            case 'delivered':
                return {
                    title: "You haven't received any rewards yet.",
                    subtitle: "Start redeeming your points for exciting rewards!",
                    showCta: true
                };
            case 'rejected':
                return {
                    title: "No rejected redemptions.",
                    subtitle: "All your redemptions are in good standing.",
                    showCta: false
                };
            default:
                return {
                    title: "No redemptions found.",
                    showCta: false
                };
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserRedemptionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserRedemptionsComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.UserDashboardService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserRedemptionsComponent, selectors: [["app-user-redemptions"]], decls: 26, vars: 5, consts: [[1, "user-page-wrapper"], [1, "user-page-main"], [1, "page-header"], [1, "header-left"], ["aria-label", "Toggle menu", 1, "menu-toggle"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"], [1, "header-title"], [1, "header-right"], [1, "user-welcome"], [1, "welcome-text"], [1, "user-avatar"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "status-tabs-container"], [1, "status-tabs"], ["class", "status-tab", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-content"], ["class", "loading-indicator", 4, "ngIf"], ["class", "redemptions-container", 4, "ngIf"], [1, "status-tab", 3, "click"], [1, "tab-count"], [1, "loading-indicator"], [1, "spinner"], [1, "redemptions-container"], [1, "redemptions-header"], [1, "section-title"], ["class", "redemptions-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "redemptions-list"], ["class", "redemption-card", 4, "ngFor", "ngForOf"], [1, "redemption-card"], [1, "card-image-section"], [1, "product-image-wrapper"], ["class", "product-image", 3, "src", "alt", "error", 4, "ngIf"], ["class", "placeholder-image", 4, "ngIf"], [1, "card-info-section"], [1, "product-details"], [1, "product-name"], [1, "product-quantity"], [1, "points-spent"], ["class", "points-summary-box", 4, "ngIf"], ["class", "admin-note-box", 4, "ngIf"], ["class", "redemption-timeline", 4, "ngIf"], ["class", "redemption-timeline rejected", 4, "ngIf"], ["class", "awaiting-message", 4, "ngIf"], [1, "card-status-section"], [1, "status-badge", 3, "ngClass"], [1, "redemption-id"], [1, "product-image", 3, "error", "src", "alt"], [1, "placeholder-image"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], [1, "points-summary-box"], [1, "summary-title"], [1, "summary-row"], [1, "summary-label"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "20 6 9 17 4 12"], [1, "summary-connector"], [1, "admin-note-box"], [1, "admin-note-header"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "16", "x2", "12", "y2", "12"], ["x1", "12", "y1", "8", "x2", "12.01", "y2", "8"], [1, "admin-note-label"], [1, "admin-note-text"], ["class", "admin-note-id", 4, "ngIf"], [1, "admin-note-id"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "12 6 12 12 16 14"], [1, "redemption-timeline"], [1, "timeline-step", 3, "ngClass"], [1, "step-indicator"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], [1, "step-label"], ["class", "step-date", 4, "ngIf"], [1, "timeline-connector"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], ["points", "20 6 9 17 4 12", "stroke", "currentColor", "stroke-width", "3", "fill", "none"], [1, "step-date"], [1, "redemption-timeline", "rejected"], [1, "timeline-step", "step-completed"], [1, "timeline-connector", "rejected"], [1, "timeline-step", "step-rejected"], [1, "step-indicator", "rejected"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "awaiting-message"], [1, "empty-state"], [1, "empty-icon"], ["width", "80", "height", "80", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1"], ["x1", "3", "y1", "9", "x2", "21", "y2", "9"], ["x1", "9", "y1", "21", "x2", "9", "y2", "9"], [1, "empty-title"], ["class", "empty-subtitle", 4, "ngIf"], ["class", "browse-rewards-btn", 3, "click", 4, "ngIf"], [1, "empty-subtitle"], [1, "browse-rewards-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"], ["d", "M16 10a4 4 0 0 1-8 0"]], template: function UserRedemptionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-user-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "button", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(6, "svg", 5);
            i0.ɵɵelement(7, "line", 6)(8, "line", 7)(9, "line", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(10, "h1", 9);
            i0.ɵɵtext(11, "My Redemptions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 10)(13, "div", 11)(14, "span", 12);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 13);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(17, "svg", 5);
            i0.ɵɵelement(18, "path", 14)(19, "circle", 15);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(20, "div", 16)(21, "div", 17);
            i0.ɵɵtemplate(22, UserRedemptionsComponent_button_22_Template, 4, 6, "button", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 19);
            i0.ɵɵtemplate(24, UserRedemptionsComponent_div_24_Template, 4, 0, "div", 20)(25, UserRedemptionsComponent_div_25_Template, 6, 2, "div", 21);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate2("Welcome, ", (ctx.currentUser == null ? null : ctx.currentUser.firstName) || "User", " ", (ctx.currentUser == null ? null : ctx.currentUser.lastName) || "");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.statusTabs);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgForOf, i4.NgIf, FormsModule, UserSidebarComponent, i4.UpperCasePipe, i4.DecimalPipe], styles: ["\r\n\r\n\r\n\n\r\n\r\n\n\r\n.user-page-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 50%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.user-page-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(10px);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.menu-toggle[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  padding: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-button-primary);\r\n  border-radius: 6px;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.menu-toggle[_ngcontent-%COMP%]:hover {\r\n  background: rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.header-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.user-welcome[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-border-subtle);\r\n}\r\n\r\n\r\n\r\n\n\r\n.status-tabs-container[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  padding: 20px 32px 0;\r\n}\r\n\r\n.status-tabs[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 8px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.status-tab[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 12px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 24px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.status-tab[_ngcontent-%COMP%]:hover {\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.status-tab.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 22px;\r\n  height: 22px;\r\n  padding: 0 6px;\r\n  background: var(--ag-color-border-subtle);\r\n  border-radius: 11px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.status-tab.active[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.3);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count.has-count[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.status-tab.active[_ngcontent-%COMP%]   .tab-count.has-count[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px 32px;\r\n}\r\n\r\n.redemptions-container[_ngcontent-%COMP%] {\r\n  max-width: 1200px;\r\n}\r\n\r\n.redemptions-header[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-indicator[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n\r\n\r\n\n\r\n.redemptions-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 20px;\r\n}\r\n\r\n.redemption-card[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 16px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid rgba(0, 0, 0, 0.05);\r\n  transition: all 0.3s ease;\r\n}\r\n\r\n.redemption-card[_ngcontent-%COMP%]:hover {\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n\n\r\n.card-image-section[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n  width: 160px;\r\n  padding: 20px;\r\n  display: flex;\r\n  align-items: flex-start;\r\n  justify-content: center;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.product-image-wrapper[_ngcontent-%COMP%] {\r\n  width: 120px;\r\n  height: 120px;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  background: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.product-image[_ngcontent-%COMP%] {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  object-fit: contain;\r\n}\r\n\r\n.placeholder-image[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n\n\r\n.card-info-section[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 20px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n  min-width: 0;\r\n}\r\n\r\n.product-details[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.product-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  line-height: 1.3;\r\n}\r\n\r\n.product-quantity[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.points-spent[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 4px 0 0;\r\n}\r\n\r\n.points-spent[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  font-weight: 600;\r\n}\r\n\r\n\n\r\n.points-summary-box[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  padding: 16px 20px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.summary-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 12px;\r\n}\r\n\r\n.summary-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.summary-label[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-button-primary);\r\n  font-weight: 500;\r\n}\r\n\r\n.summary-label[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.summary-connector[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-border-subtle);\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n\n\r\n.admin-note-box[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  border-left: 4px solid var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.admin-note-label[_ngcontent-%COMP%] {\r\n  font-weight: 600;\r\n}\r\n\r\n.admin-note-text[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-id[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  margin-top: 8px;\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n\n\r\n.redemption-timeline[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 0;\r\n  padding: 8px 0;\r\n}\r\n\r\n.timeline-step[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 6px;\r\n  min-width: 80px;\r\n}\r\n\r\n.step-indicator[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  transition: all 0.3s;\r\n}\r\n\r\n.step-completed[_ngcontent-%COMP%]   .step-indicator[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.step-pending[_ngcontent-%COMP%]   .step-indicator[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.step-rejected[_ngcontent-%COMP%]   .step-indicator[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.step-rejected[_ngcontent-%COMP%]   .step-indicator.rejected[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.step-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.step-completed[_ngcontent-%COMP%]   .step-label[_ngcontent-%COMP%] {\r\n  color: var(--ag-button-primary);\r\n  font-weight: 600;\r\n}\r\n\r\n.step-rejected[_ngcontent-%COMP%]   .step-label[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n  font-weight: 600;\r\n}\r\n\r\n.step-date[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.timeline-connector[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  height: 2px;\r\n  background: var(--ag-color-border-subtle);\r\n  margin-top: 11px;\r\n  min-width: 40px;\r\n  max-width: 80px;\r\n}\r\n\r\n.timeline-connector.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n}\r\n\r\n.timeline-connector.rejected[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n\n\r\n.awaiting-message[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 14px;\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  color: var(--ag-color-support-caution-major);\r\n  width: fit-content;\r\n}\r\n\r\n.awaiting-message[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n}\r\n\r\n\n\r\n.card-status-section[_ngcontent-%COMP%] {\r\n  flex-shrink: 0;\r\n  padding: 20px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n  justify-content: space-between;\r\n  min-width: 160px;\r\n}\r\n\r\n.status-badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  padding: 6px 14px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.status-pending[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.status-approved[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.status-delivered[_ngcontent-%COMP%] {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.status-rejected[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.redemption-id[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-weight: 500;\r\n}\r\n\r\n\r\n\r\n\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.empty-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 8px;\r\n}\r\n\r\n.empty-subtitle[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0 0 24px;\r\n}\r\n\r\n.browse-rewards-btn[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 12px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.browse-rewards-btn[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 1024px) {\r\n  .redemption-card[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .card-image-section[_ngcontent-%COMP%] {\r\n    width: 140px;\r\n  }\r\n\r\n  .card-status-section[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    flex-direction: row;\r\n    padding: 16px 24px;\r\n    border-top: 1px solid var(--ag-color-field-01);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    padding: 12px 20px;\r\n  }\r\n\r\n  .status-tabs-container[_ngcontent-%COMP%] {\r\n    padding: 16px 20px 0;\r\n  }\r\n\r\n  .page-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .status-tabs[_ngcontent-%COMP%] {\r\n    gap: 6px;\r\n  }\r\n\r\n  .status-tab[_ngcontent-%COMP%] {\r\n    padding: 10px 16px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n\r\n  .redemption-card[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .card-image-section[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    padding: 16px;\r\n  }\r\n\r\n  .product-image-wrapper[_ngcontent-%COMP%] {\r\n    width: 100px;\r\n    height: 100px;\r\n  }\r\n\r\n  .card-info-section[_ngcontent-%COMP%] {\r\n    padding: 0 16px 16px;\r\n  }\r\n\r\n  .card-status-section[_ngcontent-%COMP%] {\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 16px;\r\n    border-top: 1px solid var(--ag-color-field-01);\r\n  }\r\n\r\n  .summary-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 8px;\r\n  }\r\n\r\n  .summary-connector[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .timeline-step[_ngcontent-%COMP%] {\r\n    min-width: 60px;\r\n  }\r\n\r\n  .timeline-connector[_ngcontent-%COMP%] {\r\n    min-width: 20px;\r\n    max-width: 40px;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .header-title[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .welcome-text[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .status-tab[_ngcontent-%COMP%] {\r\n    padding: 8px 12px;\r\n    font: var(--ag-typo-label);\r\n  }\r\n\r\n  .tab-count[_ngcontent-%COMP%] {\r\n    min-width: 18px;\r\n    height: 18px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n\r\n  .product-name[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-body-01);\r\n  }\r\n\r\n  .redemption-timeline[_ngcontent-%COMP%] {\r\n    overflow-x: auto;\r\n    padding-bottom: 8px;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserRedemptionsComponent, [{
        type: Component,
        args: [{ selector: 'app-user-redemptions', standalone: true, imports: [CommonModule, FormsModule, UserSidebarComponent], template: "<div class=\"user-page-wrapper\">\r\n  <app-user-sidebar></app-user-sidebar>\r\n\r\n  <div class=\"user-page-main\">\r\n    <!-- Top Header Bar -->\r\n    <div class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <button class=\"menu-toggle\" aria-label=\"Toggle menu\">\r\n          <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line>\r\n            <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\r\n            <line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>\r\n          </svg>\r\n        </button>\r\n        <h1 class=\"header-title\">My Redemptions</h1>\r\n      </div>\r\n\r\n      <div class=\"header-right\">\r\n        <div class=\"user-welcome\">\r\n          <span class=\"welcome-text\">Welcome, {{ currentUser?.firstName || 'User' }} {{ currentUser?.lastName || '' }}</span>\r\n          <div class=\"user-avatar\">\r\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\r\n              <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\r\n            </svg>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Status Tabs -->\r\n    <div class=\"status-tabs-container\">\r\n      <div class=\"status-tabs\">\r\n        <button \r\n          *ngFor=\"let tab of statusTabs\"\r\n          class=\"status-tab\"\r\n          [class.active]=\"activeTab === tab.key\"\r\n          (click)=\"selectTab(tab.key)\">\r\n          {{ tab.label }}\r\n          <span class=\"tab-count\" [class.has-count]=\"tab.count > 0\">{{ tab.count }}</span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Main Content -->\r\n    <div class=\"page-content\">\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-indicator\">\r\n        <div class=\"spinner\"></div>\r\n        <p>Loading your redemptions...</p>\r\n      </div>\r\n\r\n      <!-- Redemptions Content -->\r\n      <div *ngIf=\"!isLoading\" class=\"redemptions-container\">\r\n        <div class=\"redemptions-header\">\r\n          <h2 class=\"section-title\">My Redemptions</h2>\r\n        </div>\r\n\r\n        <!-- Redemptions List -->\r\n        <div class=\"redemptions-list\" *ngIf=\"filteredRedemptions.length > 0\">\r\n          <div class=\"redemption-card\" *ngFor=\"let redemption of filteredRedemptions\">\r\n            <!-- Left: Product Image -->\r\n            <div class=\"card-image-section\">\r\n              <div class=\"product-image-wrapper\">\r\n                <img \r\n                  *ngIf=\"redemption.productImageUrl\"\r\n                  [src]=\"redemption.productImageUrl\" \r\n                  [alt]=\"redemption.productName\"\r\n                  class=\"product-image\"\r\n                  (error)=\"redemption.productImageUrl = ''\" />\r\n                <div class=\"placeholder-image\" *ngIf=\"!redemption.productImageUrl\">\r\n                  <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">\r\n                    <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n                    <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle>\r\n                    <polyline points=\"21 15 16 10 5 21\"></polyline>\r\n                  </svg>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Middle: Product Info -->\r\n            <div class=\"card-info-section\">\r\n              <div class=\"product-details\">\r\n                <h3 class=\"product-name\">{{ redemption.productName }}</h3>\r\n                <p class=\"product-quantity\">Qty: {{ redemption.quantity }} \u00D7 {{ redemption.productPointsPerUnit | number }} pts</p>\r\n                <p class=\"points-spent\"><strong>Points Spent:</strong> {{ redemption.pointsSpent | number }} pts</p>\r\n              </div>\r\n\r\n              <!-- Points Summary Box (for pending/approved) -->\r\n              <div class=\"points-summary-box\" *ngIf=\"redemption.statusCode === 0\">\r\n                <h4 class=\"summary-title\">Points Summary</h4>\r\n                <div class=\"summary-row\">\r\n                  <span class=\"summary-label\">\r\n                    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                      <polyline points=\"20 6 9 17 4 12\"></polyline>\r\n                    </svg>\r\n                    Points Spent: {{ redemption.pointsSpent | number }} pts\r\n                  </span>\r\n                  <span class=\"summary-connector\">\u2014\u2014</span>\r\n                  <span class=\"summary-label\">\r\n                    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                      <polyline points=\"20 6 9 17 4 12\"></polyline>\r\n                    </svg>\r\n                    Pb Balance: {{ userPoints | number }} pts\r\n                  </span>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- Admin Note Box (if exists) -->\r\n              <div class=\"admin-note-box\" *ngIf=\"redemption.adminNotes\">\r\n                <div class=\"admin-note-header\">\r\n                  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                    <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n                    <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line>\r\n                    <line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>\r\n                  </svg>\r\n                  <span class=\"admin-note-label\">Admin Note:</span>\r\n                  <span class=\"admin-note-text\">{{ redemption.adminNotes }}</span>\r\n                </div>\r\n                <div class=\"admin-note-id\" *ngIf=\"redemption.statusCode === 1\">\r\n                  <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                    <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n                    <polyline points=\"12 6 12 12 16 14\"></polyline>\r\n                  </svg>\r\n                  Admin Note: {{ formatRedemptionId(redemption.id) }}\r\n                </div>\r\n              </div>\r\n\r\n              <!-- Timeline -->\r\n              <div class=\"redemption-timeline\" *ngIf=\"redemption.statusCode !== 2\">\r\n                <div class=\"timeline-step\" [ngClass]=\"getTimelineStepClass(0, redemption.statusCode)\">\r\n                  <div class=\"step-indicator\">\r\n                    <svg *ngIf=\"getTimelineStepClass(0, redemption.statusCode) === 'step-completed'\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                      <polyline points=\"20 6 9 17 4 12\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\"></polyline>\r\n                    </svg>\r\n                  </div>\r\n                  <span class=\"step-label\">Requested</span>\r\n                  <span class=\"step-date\" *ngIf=\"redemption.statusCode >= 0 && redemption.createdAt\">{{ formatShortDate(redemption.createdAt) }}</span>\r\n                </div>\r\n                \r\n                <div class=\"timeline-connector\" [class.active]=\"isTimelineConnectorActive(0, redemption.statusCode)\"></div>\r\n                \r\n                <div class=\"timeline-step\" [ngClass]=\"getTimelineStepClass(1, redemption.statusCode)\">\r\n                  <div class=\"step-indicator\">\r\n                    <svg *ngIf=\"getTimelineStepClass(1, redemption.statusCode) === 'step-completed'\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                      <polyline points=\"20 6 9 17 4 12\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\"></polyline>\r\n                    </svg>\r\n                  </div>\r\n                  <span class=\"step-label\">Approved</span>\r\n                  <span class=\"step-date\" *ngIf=\"redemption.approvedAt\">{{ formatShortDate(redemption.approvedAt) }}</span>\r\n                </div>\r\n                \r\n                <div class=\"timeline-connector\" [class.active]=\"isTimelineConnectorActive(1, redemption.statusCode)\"></div>\r\n                \r\n                <div class=\"timeline-step\" [ngClass]=\"getTimelineStepClass(2, redemption.statusCode)\">\r\n                  <div class=\"step-indicator\">\r\n                    <svg *ngIf=\"getTimelineStepClass(2, redemption.statusCode) === 'step-completed'\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                      <polyline points=\"20 6 9 17 4 12\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\"></polyline>\r\n                    </svg>\r\n                  </div>\r\n                  <span class=\"step-label\">Delivered</span>\r\n                  <span class=\"step-date\" *ngIf=\"redemption.deliveredAt\">{{ formatShortDate(redemption.deliveredAt) }}</span>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- Rejected Timeline -->\r\n              <div class=\"redemption-timeline rejected\" *ngIf=\"redemption.statusCode === 2\">\r\n                <div class=\"timeline-step step-completed\">\r\n                  <div class=\"step-indicator\">\r\n                    <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                      <polyline points=\"20 6 9 17 4 12\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\"></polyline>\r\n                    </svg>\r\n                  </div>\r\n                  <span class=\"step-label\">Requested</span>\r\n                </div>\r\n                <div class=\"timeline-connector rejected\"></div>\r\n                <div class=\"timeline-step step-rejected\">\r\n                  <div class=\"step-indicator rejected\">\r\n                    <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\">\r\n                      <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\r\n                      <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\r\n                    </svg>\r\n                  </div>\r\n                  <span class=\"step-label\">Rejected</span>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- Awaiting Approval Message (Pending only) -->\r\n              <div class=\"awaiting-message\" *ngIf=\"redemption.statusCode === 0\">\r\n                <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n                  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n                  <polyline points=\"12 6 12 12 16 14\"></polyline>\r\n                </svg>\r\n                <span>Awaiting approval</span>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Right: Status Badge & ID -->\r\n            <div class=\"card-status-section\">\r\n              <span class=\"status-badge\" [ngClass]=\"getStatusClass(redemption.statusCode)\">\r\n                {{ redemption.status | uppercase }}\r\n              </span>\r\n              <span class=\"redemption-id\">Redemption ID: {{ formatRedemptionId(redemption.id) }}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Empty State -->\r\n        <div *ngIf=\"filteredRedemptions.length === 0\" class=\"empty-state\">\r\n          <div class=\"empty-icon\">\r\n            <svg width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\">\r\n              <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\r\n              <line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"></line>\r\n              <line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"></line>\r\n            </svg>\r\n          </div>\r\n          <h3 class=\"empty-title\">{{ getEmptyStateMessage().title }}</h3>\r\n          <p class=\"empty-subtitle\" *ngIf=\"getEmptyStateMessage().subtitle\">{{ getEmptyStateMessage().subtitle }}</p>\r\n          <button class=\"browse-rewards-btn\" *ngIf=\"getEmptyStateMessage().showCta\" (click)=\"navigateToProducts()\">\r\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path>\r\n              <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\r\n              <path d=\"M16 10a4 4 0 0 1-8 0\"></path>\r\n            </svg>\r\n            Browse Rewards\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["/* ==========================================\r\n   USER REDEMPTIONS PAGE STYLES\r\n   Matching the provided design mockups\r\n   ========================================== */\r\n\r\n/* Page Layout */\r\n.user-page-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 50%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.user-page-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n/* ==========================================\r\n   HEADER STYLES\r\n   ========================================== */\r\n.page-header {\r\n  background: rgba(255, 255, 255, 0.85);\r\n  backdrop-filter: blur(10px);\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.menu-toggle {\r\n  background: none;\r\n  border: none;\r\n  padding: 8px;\r\n  cursor: pointer;\r\n  color: var(--ag-button-primary);\r\n  border-radius: 6px;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.menu-toggle:hover {\r\n  background: rgba(74, 103, 65, 0.1);\r\n}\r\n\r\n.header-title {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 24px;\r\n}\r\n\r\n.user-welcome {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.welcome-text {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.user-avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.user-avatar:hover {\r\n  background: var(--ag-color-border-subtle);\r\n}\r\n\r\n/* ==========================================\r\n   STATUS TABS\r\n   ========================================== */\r\n.status-tabs-container {\r\n  background: transparent;\r\n  padding: 20px 32px 0;\r\n}\r\n\r\n.status-tabs {\r\n  display: flex;\r\n  gap: 8px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.status-tab {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 12px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 24px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.status-tab:hover {\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.status-tab.active {\r\n  background: var(--ag-button-primary);\r\n  border-color: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 22px;\r\n  height: 22px;\r\n  padding: 0 6px;\r\n  background: var(--ag-color-border-subtle);\r\n  border-radius: 11px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.status-tab.active .tab-count {\r\n  background: rgba(255, 255, 255, 0.3);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.tab-count.has-count {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.status-tab.active .tab-count.has-count {\r\n  background: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n/* ==========================================\r\n   PAGE CONTENT\r\n   ========================================== */\r\n.page-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px 32px;\r\n}\r\n\r\n.redemptions-container {\r\n  max-width: 1200px;\r\n}\r\n\r\n.redemptions-header {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.section-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n/* ==========================================\r\n   LOADING STATE\r\n   ========================================== */\r\n.loading-indicator {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.spinner {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n/* ==========================================\r\n   REDEMPTION CARDS\r\n   ========================================== */\r\n.redemptions-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 20px;\r\n}\r\n\r\n.redemption-card {\r\n  display: flex;\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 16px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid rgba(0, 0, 0, 0.05);\r\n  transition: all 0.3s ease;\r\n}\r\n\r\n.redemption-card:hover {\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n/* Card Image Section */\r\n.card-image-section {\r\n  flex-shrink: 0;\r\n  width: 160px;\r\n  padding: 20px;\r\n  display: flex;\r\n  align-items: flex-start;\r\n  justify-content: center;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.product-image-wrapper {\r\n  width: 120px;\r\n  height: 120px;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  background: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.product-image {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  object-fit: contain;\r\n}\r\n\r\n.placeholder-image {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n/* Card Info Section */\r\n.card-info-section {\r\n  flex: 1;\r\n  padding: 20px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n  min-width: 0;\r\n}\r\n\r\n.product-details {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.product-name {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  line-height: 1.3;\r\n}\r\n\r\n.product-quantity {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n.points-spent {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 4px 0 0;\r\n}\r\n\r\n.points-spent strong {\r\n  font-weight: 600;\r\n}\r\n\r\n/* Points Summary Box */\r\n.points-summary-box {\r\n  background: var(--ag-color-field-01);\r\n  border-radius: 12px;\r\n  padding: 16px 20px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.summary-title {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 12px;\r\n}\r\n\r\n.summary-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.summary-label {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-button-primary);\r\n  font-weight: 500;\r\n}\r\n\r\n.summary-label svg {\r\n  color: var(--ag-button-primary);\r\n}\r\n\r\n.summary-connector {\r\n  color: var(--ag-color-border-subtle);\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n/* Admin Note Box */\r\n.admin-note-box {\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  padding: 12px 16px;\r\n  border-left: 4px solid var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-header {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-header svg {\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.admin-note-label {\r\n  font-weight: 600;\r\n}\r\n\r\n.admin-note-text {\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.admin-note-id {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  margin-top: 8px;\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n/* Redemption Timeline */\r\n.redemption-timeline {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 0;\r\n  padding: 8px 0;\r\n}\r\n\r\n.timeline-step {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 6px;\r\n  min-width: 80px;\r\n}\r\n\r\n.step-indicator {\r\n  width: 24px;\r\n  height: 24px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n  transition: all 0.3s;\r\n}\r\n\r\n.step-completed .step-indicator {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.step-pending .step-indicator {\r\n  background: var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.step-rejected .step-indicator {\r\n  background: var(--ag-color-support-error);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.step-rejected .step-indicator.rejected {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n.step-label {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n.step-completed .step-label {\r\n  color: var(--ag-button-primary);\r\n  font-weight: 600;\r\n}\r\n\r\n.step-rejected .step-label {\r\n  color: var(--ag-color-support-error);\r\n  font-weight: 600;\r\n}\r\n\r\n.step-date {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n.timeline-connector {\r\n  flex: 1;\r\n  height: 2px;\r\n  background: var(--ag-color-border-subtle);\r\n  margin-top: 11px;\r\n  min-width: 40px;\r\n  max-width: 80px;\r\n}\r\n\r\n.timeline-connector.active {\r\n  background: var(--ag-button-primary);\r\n}\r\n\r\n.timeline-connector.rejected {\r\n  background: var(--ag-color-support-error);\r\n}\r\n\r\n/* Awaiting Message */\r\n.awaiting-message {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 14px;\r\n  background: var(--ag-color-support-caution-major);\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-helper-text);\r\n  font-weight: 500;\r\n  color: var(--ag-color-support-caution-major);\r\n  width: fit-content;\r\n}\r\n\r\n.awaiting-message svg {\r\n  flex-shrink: 0;\r\n}\r\n\r\n/* Card Status Section */\r\n.card-status-section {\r\n  flex-shrink: 0;\r\n  padding: 20px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n  justify-content: space-between;\r\n  min-width: 160px;\r\n}\r\n\r\n.status-badge {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  padding: 6px 14px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.status-pending {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.status-approved {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-tag-green-text);\r\n}\r\n\r\n.status-delivered {\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.status-rejected {\r\n  background: var(--ag-tag-red-bg);\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n.redemption-id {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  font-weight: 500;\r\n}\r\n\r\n/* ==========================================\r\n   EMPTY STATE\r\n   ========================================== */\r\n.empty-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  text-align: center;\r\n}\r\n\r\n.empty-icon {\r\n  margin-bottom: 24px;\r\n  color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.empty-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  margin: 0 0 8px;\r\n}\r\n\r\n.empty-subtitle {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin: 0 0 24px;\r\n}\r\n\r\n.browse-rewards-btn {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 12px 24px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 8px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.browse-rewards-btn:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n}\r\n\r\n/* ==========================================\r\n   RESPONSIVE STYLES\r\n   ========================================== */\r\n@media (max-width: 1024px) {\r\n  .redemption-card {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .card-image-section {\r\n    width: 140px;\r\n  }\r\n\r\n  .card-status-section {\r\n    width: 100%;\r\n    flex-direction: row;\r\n    padding: 16px 24px;\r\n    border-top: 1px solid var(--ag-color-field-01);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header {\r\n    padding: 12px 20px;\r\n  }\r\n\r\n  .status-tabs-container {\r\n    padding: 16px 20px 0;\r\n  }\r\n\r\n  .page-content {\r\n    padding: 20px;\r\n  }\r\n\r\n  .status-tabs {\r\n    gap: 6px;\r\n  }\r\n\r\n  .status-tab {\r\n    padding: 10px 16px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n\r\n  .redemption-card {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .card-image-section {\r\n    width: 100%;\r\n    padding: 16px;\r\n  }\r\n\r\n  .product-image-wrapper {\r\n    width: 100px;\r\n    height: 100px;\r\n  }\r\n\r\n  .card-info-section {\r\n    padding: 0 16px 16px;\r\n  }\r\n\r\n  .card-status-section {\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 16px;\r\n    border-top: 1px solid var(--ag-color-field-01);\r\n  }\r\n\r\n  .summary-row {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 8px;\r\n  }\r\n\r\n  .summary-connector {\r\n    display: none;\r\n  }\r\n\r\n  .timeline-step {\r\n    min-width: 60px;\r\n  }\r\n\r\n  .timeline-connector {\r\n    min-width: 20px;\r\n    max-width: 40px;\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .header-title {\r\n    font: var(--ag-typo-h4);\r\n  }\r\n\r\n  .welcome-text {\r\n    display: none;\r\n  }\r\n\r\n  .status-tab {\r\n    padding: 8px 12px;\r\n    font: var(--ag-typo-label);\r\n  }\r\n\r\n  .tab-count {\r\n    min-width: 18px;\r\n    height: 18px;\r\n    font: var(--ag-typo-helper-text);\r\n  }\r\n\r\n  .product-name {\r\n    font: var(--ag-typo-body-01);\r\n  }\r\n\r\n  .redemption-timeline {\r\n    overflow-x: auto;\r\n    padding-bottom: 8px;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.UserDashboardService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserRedemptionsComponent, { className: "UserRedemptionsComponent", filePath: "src/app/pages/user/redemptions/user-redemptions.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=user-redemptions.component.js.map