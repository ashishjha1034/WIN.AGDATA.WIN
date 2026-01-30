import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RedemptionStatus } from '../../../models/product.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { ValidationHintComponent } from '../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../shared/components/form-errors-summary.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services/products.service";
import * as i3 from "../../../services/validation.service";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
function ProductDetailComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "div", 7);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading product details...");
    i0.ɵɵelementEnd()();
} }
function ProductDetailComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9);
    i0.ɵɵelement(2, "i", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 11);
    i0.ɵɵtext(4, "Failed to Load Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 13);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_4_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goBack()); });
    i0.ɵɵelement(8, "i", 14);
    i0.ɵɵtext(9, " Back to Products ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function ProductDetailComponent_div_5_div_47_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_47_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.checkProductNameNow()); });
    i0.ɵɵtext(1, " Check ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.checkingProductName || !((tmp_3_0 = ctx_r1.editForm.get("name")) == null ? null : tmp_3_0.value) || ((tmp_3_0 = ctx_r1.editForm.get("name")) == null ? null : tmp_3_0.invalid) || !ctx_r1.product.isActive);
} }
function ProductDetailComponent_div_5_div_47_app_validation_hint_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-validation-hint", 68);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("control", ctx_r1.editForm.get("name"))("minLength", ctx_r1.ValidationConstants.NAME_MIN_LENGTH)("maxLength", ctx_r1.ValidationConstants.NAME_MAX_LENGTH)("checking", ctx_r1.checkingProductName)("uniquenessResult", ctx_r1.productNameResult);
} }
function ProductDetailComponent_div_5_div_47_app_validation_hint_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-validation-hint", 69);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("control", ctx_r1.editForm.get("imageUrl"));
} }
function ProductDetailComponent_div_5_div_47_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getTrimmedLength("description"), " / 500 characters | ", ctx_r1.getWordCount("description"), " words ");
} }
function ProductDetailComponent_div_5_div_47_app_validation_hint_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-validation-hint", 71);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("control", ctx_r1.editForm.get("description"))("minLength", ctx_r1.ValidationConstants.DESCRIPTION_MIN_LENGTH)("maxLength", ctx_r1.ValidationConstants.DESCRIPTION_MAX_LENGTH);
} }
function ProductDetailComponent_div_5_div_47_option_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r5.name, " ");
} }
function ProductDetailComponent_div_5_div_47_app_validation_hint_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-validation-hint", 73);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("control", ctx_r1.editForm.get("categoryId"));
} }
function ProductDetailComponent_div_5_div_47_app_validation_hint_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-validation-hint", 74);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("control", ctx_r1.editForm.get("pointsCost"))("minValue", ctx_r1.ValidationConstants.POINTS_COST_MIN)("maxValue", ctx_r1.ValidationConstants.POINTS_COST_MAX);
} }
function ProductDetailComponent_div_5_div_47_app_form_errors_summary_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-form-errors-summary", 75);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("form", ctx_r1.editForm)("fieldLabels", ctx_r1.editFormFieldLabels);
} }
function ProductDetailComponent_div_5_div_47_div_41_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "button", 77);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_47_div_41_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.saveChanges()); });
    i0.ɵɵelement(2, "i", 78);
    i0.ɵɵtext(3, " Save Changes ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canSave);
} }
function ProductDetailComponent_div_5_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39)(1, "form", 40)(2, "h3", 41);
    i0.ɵɵtext(3, "Basic Information");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 42)(5, "div", 43)(6, "label", 44);
    i0.ɵɵtext(7, "Product Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 45);
    i0.ɵɵelement(9, "input", 46);
    i0.ɵɵtemplate(10, ProductDetailComponent_div_5_div_47_button_10_Template, 2, 1, "button", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ProductDetailComponent_div_5_div_47_app_validation_hint_11_Template, 1, 5, "app-validation-hint", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 43)(13, "label", 49);
    i0.ɵɵtext(14, "Image URL");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 50);
    i0.ɵɵtemplate(16, ProductDetailComponent_div_5_div_47_app_validation_hint_16_Template, 1, 1, "app-validation-hint", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 52)(18, "label", 53);
    i0.ɵɵtext(19, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "textarea", 54);
    i0.ɵɵtemplate(21, ProductDetailComponent_div_5_div_47_div_21_Template, 2, 2, "div", 55)(22, ProductDetailComponent_div_5_div_47_app_validation_hint_22_Template, 1, 3, "app-validation-hint", 56);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "form", 40)(24, "h3", 41);
    i0.ɵɵtext(25, "Category & Pricing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 42)(27, "div", 43)(28, "label", 57);
    i0.ɵɵtext(29, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 58)(31, "option", 59);
    i0.ɵɵtext(32, "Select a category");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(33, ProductDetailComponent_div_5_div_47_option_33_Template, 2, 2, "option", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(34, ProductDetailComponent_div_5_div_47_app_validation_hint_34_Template, 1, 1, "app-validation-hint", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 43)(36, "label", 62);
    i0.ɵɵtext(37, "Redemption Cost (Points)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 63);
    i0.ɵɵtemplate(39, ProductDetailComponent_div_5_div_47_app_validation_hint_39_Template, 1, 3, "app-validation-hint", 64);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(40, ProductDetailComponent_div_5_div_47_app_form_errors_summary_40_Template, 1, 2, "app-form-errors-summary", 65)(41, ProductDetailComponent_div_5_div_47_div_41_Template, 4, 1, "div", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("read-only-content", !ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.editForm);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("name") || ctx_r1.productNameResult && !ctx_r1.productNameResult.isValid)("valid", ctx_r1.isFieldValid("name") && (!ctx_r1.productNameResult || ctx_r1.productNameResult.isValid));
    i0.ɵɵproperty("readonly", !ctx_r1.product.isActive);
    i0.ɵɵattribute("disabled", !ctx_r1.product.isActive ? true : null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("imageUrl"))("valid", ctx_r1.isFieldValid("imageUrl"));
    i0.ɵɵproperty("readonly", !ctx_r1.product.isActive);
    i0.ɵɵattribute("disabled", !ctx_r1.product.isActive ? true : null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("description"))("valid", ctx_r1.isFieldValid("description"));
    i0.ɵɵproperty("readonly", !ctx_r1.product.isActive);
    i0.ɵɵattribute("disabled", !ctx_r1.product.isActive ? true : null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.editForm);
    i0.ɵɵadvance(7);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("categoryId"));
    i0.ɵɵproperty("disabled", !ctx_r1.product.isActive);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.categories);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("error", ctx_r1.isFieldInvalid("pointsCost"))("valid", ctx_r1.isFieldValid("pointsCost"));
    i0.ɵɵproperty("readonly", !ctx_r1.product.isActive);
    i0.ɵɵattribute("disabled", !ctx_r1.product.isActive ? true : null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
} }
function ProductDetailComponent_div_5_div_48_div_12_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 105);
    i0.ɵɵtext(1, " (Cannot go below 0) ");
    i0.ɵɵelementEnd();
} }
function ProductDetailComponent_div_5_div_48_div_12_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 105);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (Max: ", i0.ɵɵpipeBind1(2, 1, ctx_r1.ValidationConstants.STOCK_MAX), ") ");
} }
function ProductDetailComponent_div_5_div_48_div_12_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 106)(1, "span", 9);
    i0.ɵɵtext(2, "\u2717");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.stockValidationError);
} }
function ProductDetailComponent_div_5_div_48_div_12_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107)(1, "span", 108);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.stockAdjustment.amount > 0 ? "Will add " + ctx_r1.stockAdjustment.amount + " to stock" : "Will remove " + ctx_r1.Math.abs(ctx_r1.stockAdjustment.amount) + " from stock");
} }
function ProductDetailComponent_div_5_div_48_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95)(1, "div", 82);
    i0.ɵɵtext(2, "Adjustment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 96)(4, "button", 97);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_div_12_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.stockAdjustment.amount = ctx_r1.stockAdjustment.amount - 1); });
    i0.ɵɵelement(5, "i", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 99);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductDetailComponent_div_5_div_48_div_12_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.stockAdjustment.amount, $event) || (ctx_r1.stockAdjustment.amount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 97);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_div_12_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.stockAdjustment.amount = ctx_r1.stockAdjustment.amount + 1); });
    i0.ɵɵelement(8, "i", 100);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 101);
    i0.ɵɵtext(10);
    i0.ɵɵtemplate(11, ProductDetailComponent_div_5_div_48_div_12_span_11_Template, 2, 0, "span", 102)(12, ProductDetailComponent_div_5_div_48_div_12_span_12_Template, 3, 3, "span", 102);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, ProductDetailComponent_div_5_div_48_div_12_div_13_Template, 5, 1, "div", 103)(14, ProductDetailComponent_div_5_div_48_div_12_div_14_Template, 5, 1, "div", 104);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("error", ctx_r1.stockValidationError);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.stockAdjustment.amount);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("warning", ctx_r1.product.stockLevel + ctx_r1.stockAdjustment.amount < 0 || ctx_r1.product.stockLevel + ctx_r1.stockAdjustment.amount > ctx_r1.ValidationConstants.STOCK_MAX);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" New stock: ", ctx_r1.Math.max(0, ctx_r1.Math.min(ctx_r1.ValidationConstants.STOCK_MAX, ctx_r1.product.stockLevel + ctx_r1.stockAdjustment.amount)), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.stockLevel + ctx_r1.stockAdjustment.amount < 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.stockLevel + ctx_r1.stockAdjustment.amount > ctx_r1.ValidationConstants.STOCK_MAX);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.stockValidationError);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.stockValidationError && ctx_r1.stockAdjustment.amount !== 0);
} }
function ProductDetailComponent_div_5_div_48_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 109)(1, "div", 110);
    i0.ɵɵelement(2, "i", 111);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Stock adjustments are disabled for inactive products.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Activate the product to manage stock levels.");
    i0.ɵɵelementEnd()()();
} }
function ProductDetailComponent_div_5_div_48_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 112)(1, "label", 113);
    i0.ɵɵtext(2, "Reason (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 114);
    i0.ɵɵtwoWayListener("ngModelChange", function ProductDetailComponent_div_5_div_48_div_14_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.stockAdjustment.reason, $event) || (ctx_r1.stockAdjustment.reason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.stockAdjustment.reason);
} }
function ProductDetailComponent_div_5_div_48_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 115)(1, "button", 77);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_div_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.adjustStock()); });
    i0.ɵɵelement(2, "i", 116);
    i0.ɵɵtext(3, " Save Stock Adjustment ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canAdjustStock);
} }
function ProductDetailComponent_div_5_div_48_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 117);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_button_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.deactivateProduct()); });
    i0.ɵɵelement(1, "i", 118);
    i0.ɵɵtext(2, " Deactivate Product ");
    i0.ɵɵelementEnd();
} }
function ProductDetailComponent_div_5_div_48_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_button_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.activateProduct()); });
    i0.ɵɵelement(1, "i", 120);
    i0.ɵɵtext(2, " Activate Product ");
    i0.ɵɵelementEnd();
} }
function ProductDetailComponent_div_5_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39)(1, "div", 79)(2, "h3", 41);
    i0.ɵɵtext(3, "Stock Management");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 80)(5, "div", 81)(6, "div", 82);
    i0.ɵɵtext(7, "Current Stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 83);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 84);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, ProductDetailComponent_div_5_div_48_div_12_Template, 15, 10, "div", 85)(13, ProductDetailComponent_div_5_div_48_div_13_Template, 7, 0, "div", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, ProductDetailComponent_div_5_div_48_div_14_Template, 4, 1, "div", 87)(15, ProductDetailComponent_div_5_div_48_div_15_Template, 4, 1, "div", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 89)(17, "h3", 41);
    i0.ɵɵtext(18, "Product Control");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 90);
    i0.ɵɵtemplate(20, ProductDetailComponent_div_5_div_48_button_20_Template, 3, 0, "button", 91)(21, ProductDetailComponent_div_5_div_48_button_21_Template, 3, 0, "button", 92);
    i0.ɵɵelementStart(22, "button", 93);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_48_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteProduct()); });
    i0.ɵɵelement(23, "i", 94);
    i0.ɵɵtext(24, " Delete Product ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("read-only-content", !ctx_r1.product.isActive);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.product.stockLevel);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("low-stock", ctx_r1.product.stockLevel < 10 && ctx_r1.product.stockLevel > 0)("out-of-stock", ctx_r1.product.stockLevel === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.product.stockLevel === 0 ? "Out of Stock" : ctx_r1.product.stockLevel < 10 ? "Low Stock" : "Normal Stock", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.product.isActive);
} }
function ProductDetailComponent_div_5_div_49_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 129);
    i0.ɵɵelement(1, "div", 130);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading redemptions...");
    i0.ɵɵelementEnd()();
} }
function ProductDetailComponent_div_5_div_49_table_20_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 134);
    i0.ɵɵelement(2, "i", 135);
    i0.ɵɵtext(3, " No redemptions found for this filter ");
    i0.ɵɵelementEnd()();
} }
function ProductDetailComponent_div_5_div_49_table_20_tr_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 136);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const redemption_r14 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r14.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r14.quantity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 6, redemption_r14.pointsSpent));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", "status-" + redemption_r14.statusText.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", redemption_r14.statusText, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 8, redemption_r14.requestDate, "short"));
} }
function ProductDetailComponent_div_5_div_49_table_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 131)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Quantity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Points Spent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, ProductDetailComponent_div_5_div_49_table_20_tr_14_Template, 4, 0, "tr", 132)(15, ProductDetailComponent_div_5_div_49_table_20_tr_15_Template, 14, 11, "tr", 133);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r1.filteredRedemptions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredRedemptions);
} }
function ProductDetailComponent_div_5_div_49_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39)(1, "div", 121)(2, "div", 122)(3, "h3", 41);
    i0.ɵɵtext(4, "Redemptions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 123);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.exportRedemptions()); });
    i0.ɵɵelement(6, "i", 124);
    i0.ɵɵtext(7, " Export CSV ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 125)(9, "button", 126);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setRedemptionFilter("all")); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 126);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setRedemptionFilter(ctx_r1.RedemptionStatus.Pending)); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 126);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setRedemptionFilter(ctx_r1.RedemptionStatus.Approved)); });
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 126);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setRedemptionFilter(ctx_r1.RedemptionStatus.Delivered)); });
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 126);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_div_49_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setRedemptionFilter(ctx_r1.RedemptionStatus.Rejected)); });
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, ProductDetailComponent_div_5_div_49_div_19_Template, 4, 0, "div", 127)(20, ProductDetailComponent_div_5_div_49_table_20_Template, 16, 2, "table", 128);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("read-only-content", !ctx_r1.product.isActive);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.filteredRedemptions.length === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.activeRedemptionFilter === "all");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" All (", ctx_r1.getRedemptionCount("all"), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeRedemptionFilter === ctx_r1.RedemptionStatus.Pending);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Pending (", ctx_r1.getRedemptionCount(ctx_r1.RedemptionStatus.Pending), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeRedemptionFilter === ctx_r1.RedemptionStatus.Approved);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Approved (", ctx_r1.getRedemptionCount(ctx_r1.RedemptionStatus.Approved), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeRedemptionFilter === ctx_r1.RedemptionStatus.Delivered);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Delivered (", ctx_r1.getRedemptionCount(ctx_r1.RedemptionStatus.Delivered), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeRedemptionFilter === ctx_r1.RedemptionStatus.Rejected);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Rejected (", ctx_r1.getRedemptionCount(ctx_r1.RedemptionStatus.Rejected), ") ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.redemptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.redemptionsLoading);
} }
function ProductDetailComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "div", 17)(3, "button", 18);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goBack()); });
    i0.ɵɵelement(4, "i", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19)(6, "div", 20)(7, "img", 21);
    i0.ɵɵlistener("error", function ProductDetailComponent_div_5_Template_img_error_7_listener($event) { i0.ɵɵrestoreView(_r3); return i0.ɵɵresetView($event.target.src = "assets/placeholder-product.png"); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 22)(9, "h1", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 24)(12, "span", 25);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 26);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 27);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 28)(20, "div", 29);
    i0.ɵɵelement(21, "i", 30);
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 29);
    i0.ɵɵelement(26, "i", 31);
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 29);
    i0.ɵɵelement(30, "i", 32);
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()()()()()();
    i0.ɵɵelementStart(33, "div", 33)(34, "div", 34)(35, "button", 35);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("info")); });
    i0.ɵɵelement(36, "i", 36);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Product Info");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "button", 35);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("stock")); });
    i0.ɵɵelement(40, "i", 37);
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42, "Stock & Control");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "button", 35);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_5_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchTab("redemptions")); });
    i0.ɵɵelement(44, "i", 31);
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Redemptions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(47, ProductDetailComponent_div_5_div_47_Template, 42, 41, "div", 38)(48, ProductDetailComponent_div_5_div_48_Template, 25, 15, "div", 38)(49, ProductDetailComponent_div_5_div_49_Template, 21, 20, "div", 38);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("src", ctx_r1.product.imageUrl || "assets/placeholder-product.png", i0.ɵɵsanitizeUrl)("alt", ctx_r1.product.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.product.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.product.categoryName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(16, 28, ctx_r1.product.pointsCost), " pts");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.product.isActive)("inactive", !ctx_r1.product.isActive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.product.isActive ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.product.createdAt ? i0.ɵɵpipeBind2(24, 30, ctx_r1.product.createdAt, "mediumDate") : "N/A");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.totalRedemptions, " redemptions");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("low-stock", ctx_r1.product.stockLevel < 10 && ctx_r1.product.stockLevel > 0)("out-of-stock", ctx_r1.product.stockLevel === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.product.stockLevel === 999999 ? "Unlimited" : ctx_r1.product.stockLevel, " in stock");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("inactive-product", !ctx_r1.product.isActive);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "info");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "stock");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "redemptions");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "info");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "stock");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.activeTab === "redemptions");
} }
function ProductDetailComponent_div_6_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151);
    i0.ɵɵelement(1, "i", 152);
    i0.ɵɵelementStart(2, "div", 153)(3, "strong");
    i0.ɵɵtext(4, "Stock Available:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("This product has ", i0.ɵɵpipeBind1(7, 1, ctx_r1.deactivateWarningData.stock), " units in stock. These will become unavailable once deactivated.");
} }
function ProductDetailComponent_div_6_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151);
    i0.ɵɵelement(1, "i", 154);
    i0.ɵɵelementStart(2, "div", 153)(3, "strong");
    i0.ɵɵtext(4, "Recent Activity (Last 7 Days):");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(7, 2, ctx_r1.deactivateWarningData.recentRedemptions7d), " redemptions from ", ctx_r1.deactivateWarningData.uniqueUsers7d || 0, " users");
} }
function ProductDetailComponent_div_6_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151);
    i0.ɵɵelement(1, "i", 155);
    i0.ɵɵelementStart(2, "div", 153)(3, "strong");
    i0.ɵɵtext(4, "Activity (Last 30 Days):");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(7, 2, ctx_r1.deactivateWarningData.recentRedemptions30d), " total redemptions from ", ctx_r1.deactivateWarningData.uniqueUsers30d || 0, " users");
} }
function ProductDetailComponent_div_6_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151);
    i0.ɵɵelement(1, "i", 156);
    i0.ɵɵelementStart(2, "div", 153)(3, "strong");
    i0.ɵɵtext(4, "Last Redemption:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 1, ctx_r1.deactivateWarningData.lastRedemptionDate, "mediumDate"));
} }
function ProductDetailComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 137)(1, "div", 138)(2, "div", 139)(3, "h2", 140);
    i0.ɵɵtext(4, "Deactivation Warnings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 141);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_6_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDeactivateCancelled()); });
    i0.ɵɵelement(6, "i", 142);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 143)(8, "p", 144);
    i0.ɵɵtext(9, "This product has the following conditions that may affect deactivation:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 145);
    i0.ɵɵtemplate(11, ProductDetailComponent_div_6_div_11_Template, 8, 3, "div", 146)(12, ProductDetailComponent_div_6_div_12_Template, 8, 4, "div", 146)(13, ProductDetailComponent_div_6_div_13_Template, 8, 4, "div", 146)(14, ProductDetailComponent_div_6_div_14_Template, 8, 4, "div", 146);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 147)(16, "p");
    i0.ɵɵtext(17, "Click \"Confirm\" to proceed with deactivation despite these warnings.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 148)(19, "button", 149);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_6_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDeactivateCancelled()); });
    i0.ɵɵtext(20, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 150);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_6_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDeactivateConfirmed()); });
    i0.ɵɵelement(22, "i", 116);
    i0.ɵɵtext(23, " Confirm Deactivation ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r1.deactivateWarningData.stock && ctx_r1.deactivateWarningData.stock > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.deactivateWarningData.recentRedemptions7d || 0) > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (ctx_r1.deactivateWarningData.recentRedemptions30d || 0) > (ctx_r1.deactivateWarningData.recentRedemptions7d || 0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.deactivateWarningData.lastRedemptionDate);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.isLoading);
} }
export class ProductDetailComponent {
    // Computed property for total redemptions count
    get totalRedemptions() {
        return this.redemptions.length;
    }
    constructor(route, router, productsService, validationService, fb, cdr) {
        this.route = route;
        this.router = router;
        this.productsService = productsService;
        this.validationService = validationService;
        this.fb = fb;
        this.cdr = cdr;
        // Expose Math and RedemptionStatus for template usage
        this.Math = Math;
        this.RedemptionStatus = RedemptionStatus;
        // Expose ValidationConstants for template
        this.ValidationConstants = ValidationConstants;
        this.product = null;
        this.categories = [];
        this.isLoading = false;
        this.hasError = false;
        this.errorMessage = '';
        this.activeTab = 'info';
        // Redemptions data
        this.redemptions = [];
        this.filteredRedemptions = [];
        this.redemptionsLoading = false;
        this.activeRedemptionFilter = 'all';
        this.originalName = '';
        // Product name uniqueness check
        this.checkingProductName = false;
        this.productNameResult = null;
        // Stock validation error message
        this.stockValidationError = null;
        // Deactivation dialog state
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.deactivationBlockedMessage = null;
        this.pendingDeactivationProductId = null;
        this.editFormFieldLabels = {
            name: 'Product Name',
            description: 'Description',
            categoryId: 'Category',
            pointsCost: 'Points Cost',
            imageUrl: 'Image URL'
        };
        // Legacy plain object for stock (keep for backward compat)
        this.stockAdjustment = {
            amount: 0,
            operation: 'adjust',
            reason: ''
        };
        this.destroy$ = new Subject();
        this.initForms();
    }
    ngOnInit() {
        // Initialize forms
        this.initForms();
        // Load categories for dropdown
        this.loadCategories();
        // Setup product name uniqueness check
        this.setupProductNameCheck();
        // Subscribe to route params changes to reload on navigation
        this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap(params => {
            const productId = params.get('id');
            if (productId) {
                this.loadProduct(productId);
            }
            return [];
        })).subscribe();
        // Check for fragment (tab selection)
        this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe(fragment => {
            if (fragment === 'stock' || fragment === 'redemptions' || fragment === 'info') {
                this.activeTab = fragment;
                this.cdr.detectChanges();
            }
        });
    }
    initForms() {
        // Initialize reactive edit form with validators matching create form
        this.editForm = this.fb.group({
            name: ['', [
                    Validators.minLength(ValidationConstants.NAME_MIN_LENGTH),
                    Validators.maxLength(ValidationConstants.NAME_MAX_LENGTH),
                    CustomValidators.productNameFormat()
                ]],
            description: ['', [
                    Validators.minLength(ValidationConstants.DESCRIPTION_MIN_LENGTH),
                    Validators.maxLength(ValidationConstants.DESCRIPTION_MAX_LENGTH),
                    CustomValidators.wordCount(ValidationConstants.DESCRIPTION_MIN_WORDS, ValidationConstants.DESCRIPTION_MAX_WORDS)
                ]],
            categoryId: [''],
            pointsCost: [null, [
                    Validators.min(ValidationConstants.POINTS_COST_MIN),
                    Validators.max(ValidationConstants.POINTS_COST_MAX),
                    CustomValidators.integer()
                ]],
            imageUrl: ['', [
                    Validators.maxLength(ValidationConstants.IMAGE_URL_MAX_LENGTH),
                    CustomValidators.httpsUrl()
                ]]
        });
        // Initialize stock adjustment form
        this.stockForm = this.fb.group({
            amount: [0, [
                    Validators.required,
                    CustomValidators.integer()
                ]],
            reason: ['']
        });
    }
    setupProductNameCheck() {
        this.editForm.get('name')?.valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(ValidationConstants.DEBOUNCE_TIME_MS), distinctUntilChanged())
            .subscribe(name => {
            // Only check if name is valid and changed from original
            if (name &&
                this.editForm.get('name')?.valid &&
                name.trim() !== this.originalName.trim()) {
                this.checkProductName(name);
            }
            else {
                this.productNameResult = null;
                this.checkingProductName = false;
            }
        });
    }
    checkProductName(name) {
        this.checkingProductName = true;
        this.productNameResult = null;
        this.cdr.markForCheck();
        // Exclude current product from uniqueness check
        this.validationService.checkProductNameAvailability(name, this.product?.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: result => {
                this.productNameResult = result;
                this.checkingProductName = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.checkingProductName = false;
                this.cdr.markForCheck();
            }
        });
    }
    checkProductNameNow() {
        const name = this.editForm.get('name')?.value;
        if (name && name.trim() !== this.originalName.trim()) {
            this.checkProductName(name);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadProduct(productId) {
        this.isLoading = true;
        this.hasError = false;
        this.errorMessage = '';
        console.log('[ProductDetail] Loading product:', productId);
        this.productsService.getProductById(productId)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            // Defer clearing loading state to ensure UI updates
            setTimeout(() => {
                this.isLoading = false;
                console.log('[ProductDetail] Loading finished, product:', this.product);
                this.cdr.detectChanges();
            }, 0);
        }))
            .subscribe({
            next: (product) => {
                console.log('[ProductDetail] Product loaded successfully:', product);
                this.product = product;
                this.hasError = false;
                this.initEditForm();
                // Load redemptions immediately to show accurate count in header
                this.loadRedemptions();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('[ProductDetail] Error loading product:', error);
                this.hasError = true;
                this.errorMessage = `Failed to load product: ${error?.message || 'Unknown error'}`;
                this.product = null;
                this.cdr.detectChanges();
            }
        });
    }
    loadCategories() {
        this.productsService.getCategories()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (categories) => {
                this.categories = categories;
                console.log('[ProductDetail] Categories loaded:', categories);
            },
            error: (error) => {
                console.error('[ProductDetail] Error loading categories:', error);
            }
        });
    }
    initEditForm() {
        if (this.product) {
            // Store original name for uniqueness comparison
            this.originalName = this.product.name || '';
            // Patch reactive form with product data
            this.editForm.patchValue({
                name: this.product.name,
                description: this.product.description,
                categoryId: this.product.categoryId,
                pointsCost: this.product.pointsCost,
                imageUrl: this.product.imageUrl
            });
            // Mark form as pristine after initial load
            this.editForm.markAsPristine();
            this.editForm.markAsUntouched();
            // Reset uniqueness check
            this.productNameResult = null;
            this.checkingProductName = false;
        }
    }
    // Helper methods for form validation
    isFieldInvalid(fieldName) {
        const field = this.editForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
    isFieldValid(fieldName) {
        const field = this.editForm.get(fieldName);
        return !!(field && field.valid && field.dirty);
    }
    // Get trimmed character count for display
    getTrimmedLength(fieldName) {
        const value = this.editForm.get(fieldName)?.value || '';
        return value.trim().length;
    }
    // Get word count for description
    getWordCount(fieldName) {
        const value = this.editForm.get(fieldName)?.value || '';
        return value.split(/\s+/).filter((w) => w.length > 0).length;
    }
    // Check if form has valid changes
    get hasValidChanges() {
        if (!this.product)
            return false;
        const formValue = this.editForm.value;
        const hasChanges = (formValue.name?.trim() !== this.product.name) ||
            (formValue.description?.trim() !== this.product.description) ||
            (formValue.categoryId !== this.product.categoryId) ||
            (formValue.pointsCost !== this.product.pointsCost) ||
            ((formValue.imageUrl?.trim() || '') !== (this.product.imageUrl || ''));
        return hasChanges && this.editForm.valid;
    }
    // Check if save button should be enabled
    get canSave() {
        if (!this.hasValidChanges)
            return false;
        if (this.checkingProductName)
            return false;
        if (this.productNameResult && !this.productNameResult.isValid)
            return false;
        return true;
    }
    // Check if stock adjustment can be submitted and validate limits
    get canAdjustStock() {
        if (this.stockAdjustment.amount === 0) {
            this.stockValidationError = null;
            return false;
        }
        if (!this.product) {
            this.stockValidationError = null;
            return false;
        }
        const newStock = this.product.stockLevel + this.stockAdjustment.amount;
        // Check if new stock would be negative
        if (newStock < 0) {
            this.stockValidationError = `Cannot reduce stock below 0. Maximum reduction is ${this.product.stockLevel}.`;
            return false;
        }
        // Check if new stock exceeds max limit
        if (newStock > ValidationConstants.STOCK_MAX) {
            this.stockValidationError = `Stock cannot exceed ${ValidationConstants.STOCK_MAX.toLocaleString()}. Maximum increase is ${(ValidationConstants.STOCK_MAX - this.product.stockLevel).toLocaleString()}.`;
            return false;
        }
        // Check if amount is a valid integer
        if (!Number.isInteger(this.stockAdjustment.amount)) {
            this.stockValidationError = 'Stock adjustment must be a whole number.';
            return false;
        }
        this.stockValidationError = null;
        return true;
    }
    switchTab(tab) {
        this.activeTab = tab;
        // Load redemptions data when switching to redemptions tab
        if (tab === 'redemptions' && this.product && this.redemptions.length === 0) {
            this.loadRedemptions();
        }
        this.cdr.detectChanges();
    }
    loadRedemptions() {
        if (!this.product)
            return;
        this.redemptionsLoading = true;
        this.productsService.getProductRedemptions(this.product.id)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            this.redemptionsLoading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (redemptions) => {
                console.log('[ProductDetail] Redemptions loaded:', redemptions);
                this.redemptions = redemptions;
                this.filterRedemptions();
            },
            error: (error) => {
                console.error('[ProductDetail] Error loading redemptions:', error);
                this.redemptions = [];
                this.filteredRedemptions = [];
            }
        });
    }
    filterRedemptions() {
        if (this.activeRedemptionFilter === 'all') {
            this.filteredRedemptions = [...this.redemptions];
        }
        else {
            // Filter by numeric status (enum value IS the numeric value)
            this.filteredRedemptions = this.redemptions.filter(r => r.status === this.activeRedemptionFilter);
        }
        console.log('[ProductDetail] Filtered redemptions:', this.filteredRedemptions.length, 'filter:', this.activeRedemptionFilter);
    }
    setRedemptionFilter(status) {
        this.activeRedemptionFilter = status;
        this.filterRedemptions();
    }
    getRedemptionCount(status) {
        if (status === 'all') {
            return this.redemptions.length;
        }
        // Enum value IS the numeric value
        return this.redemptions.filter(r => r.status === status).length;
    }
    exportRedemptions() {
        if (this.filteredRedemptions.length === 0)
            return;
        // Create CSV content
        const headers = ['User', 'Email', 'Quantity', 'Points Spent', 'Status', 'Request Date'];
        const rows = this.filteredRedemptions.map(r => [
            r.userName,
            r.userEmail,
            r.quantity.toString(),
            r.pointsSpent.toString(),
            r.statusText,
            new Date(r.requestDate).toLocaleDateString()
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.product?.name || 'product'}-redemptions-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    }
    goBack() {
        this.router.navigate(['/admin/products']);
    }
    saveChanges() {
        if (this.product && this.canSave) {
            // Mark all fields as touched to show any validation errors
            Object.keys(this.editForm.controls).forEach(key => {
                this.editForm.get(key)?.markAsTouched();
            });
            if (!this.editForm.valid) {
                return;
            }
            this.isLoading = true;
            // Build request with only changed, valid fields (trimmed values)
            const formValue = this.editForm.value;
            const request = {};
            if (formValue.name?.trim() !== this.product.name) {
                request.name = formValue.name.trim();
            }
            if (formValue.description?.trim() !== this.product.description) {
                request.description = formValue.description.trim();
            }
            if (formValue.categoryId !== this.product.categoryId) {
                request.categoryId = formValue.categoryId;
            }
            if (formValue.pointsCost !== this.product.pointsCost) {
                request.pointsCost = Math.floor(Number(formValue.pointsCost));
            }
            if ((formValue.imageUrl?.trim() || '') !== (this.product.imageUrl || '')) {
                request.imageUrl = formValue.imageUrl?.trim() || undefined;
            }
            this.productsService.updateProduct(this.product.id, request)
                .pipe(takeUntil(this.destroy$), finalize(() => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }, 0);
            }))
                .subscribe({
                next: () => {
                    alert('Product updated successfully');
                    this.loadProduct(this.product.id);
                },
                error: (error) => {
                    console.error('Error updating product:', error);
                    alert('Failed to update product: ' + (error?.error?.message || 'Unknown error'));
                }
            });
        }
    }
    adjustStock() {
        if (this.product) {
            this.isLoading = true;
            this.productsService.adjustStock(this.product.id, this.stockAdjustment)
                .pipe(takeUntil(this.destroy$), finalize(() => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }, 0);
            }))
                .subscribe({
                next: () => {
                    alert('Stock adjusted successfully');
                    this.loadProduct(this.product.id);
                    this.stockAdjustment = { amount: 0, operation: 'adjust' };
                },
                error: (error) => {
                    console.error('Error adjusting stock:', error);
                    alert('Failed to adjust stock');
                }
            });
        }
    }
    deactivateProduct() {
        if (!this.product)
            return;
        // First attempt without force
        this.isLoading = true;
        this.pendingDeactivationProductId = this.product.id;
        this.productsService.deactivateProduct(this.product.id, false)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            setTimeout(() => {
                this.isLoading = false;
                this.cdr.detectChanges();
            }, 0);
        }))
            .subscribe({
            next: () => {
                // Success - product deactivated
                if (this.product) {
                    this.product.isActive = false;
                }
                alert('Product deactivated successfully');
                this.pendingDeactivationProductId = null;
            },
            error: (error) => {
                console.error('Error deactivating product:', error);
                // Check for warnings (409 Conflict)
                if (error?.status === 409 && error?.error?.code === 'DEACTIVATE_WARNINGS') {
                    this.deactivateWarningData = error.error;
                    this.showDeactivateDialog = true;
                    this.deactivationBlockedMessage = null;
                }
                // Check for hard blocks (400 Bad Request)
                else if (error?.status === 400 && error?.error?.code === 'DEACTIVATE_BLOCKED') {
                    const blocked = error.error;
                    const message = `Cannot deactivate: ${blocked.pending || 0} pending and ${blocked.approved || 0} approved redemptions must be resolved first.`;
                    this.deactivationBlockedMessage = message;
                    this.showDeactivateDialog = false;
                    alert(message);
                    this.pendingDeactivationProductId = null;
                }
                // Other error
                else {
                    alert('Failed to deactivate product: ' + (error?.error?.message || 'Unknown error'));
                    this.pendingDeactivationProductId = null;
                }
            }
        });
    }
    onDeactivateConfirmed() {
        if (!this.pendingDeactivationProductId)
            return;
        this.showDeactivateDialog = false;
        this.isLoading = true;
        // Retry with force=true
        this.productsService.deactivateProduct(this.pendingDeactivationProductId, true)
            .pipe(takeUntil(this.destroy$), finalize(() => {
            setTimeout(() => {
                this.isLoading = false;
                this.cdr.detectChanges();
            }, 0);
        }))
            .subscribe({
            next: () => {
                if (this.product) {
                    this.product.isActive = false;
                }
                alert('Product deactivated successfully');
                this.pendingDeactivationProductId = null;
                this.deactivateWarningData = null;
            },
            error: (error) => {
                console.error('Error deactivating product with force:', error);
                // Check for hard blocks (even with force=true)
                if (error?.status === 400 && error?.error?.code === 'DEACTIVATE_BLOCKED') {
                    const blocked = error.error;
                    const message = `Cannot deactivate: ${blocked.pending || 0} pending and ${blocked.approved || 0} approved redemptions must be resolved first.`;
                    alert(message);
                }
                else {
                    alert('Failed to deactivate product: ' + (error?.error?.message || 'Unknown error'));
                }
                this.pendingDeactivationProductId = null;
                this.deactivateWarningData = null;
            }
        });
    }
    onDeactivateCancelled() {
        this.showDeactivateDialog = false;
        this.pendingDeactivationProductId = null;
        this.deactivateWarningData = null;
    }
    activateProduct() {
        if (this.product && confirm(`Are you sure you want to activate "${this.product.name}"?`)) {
            this.isLoading = true;
            this.productsService.activateProduct(this.product.id)
                .pipe(takeUntil(this.destroy$), finalize(() => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }, 0);
            }))
                .subscribe({
                next: () => {
                    // Update the product status locally to reflect the change
                    if (this.product) {
                        this.product.isActive = true;
                    }
                    alert('Product activated successfully');
                },
                error: (error) => {
                    console.error('Error activating product:', error);
                    alert('Failed to activate product: ' + (error?.error?.message || 'Unknown error'));
                }
            });
        }
    }
    deleteProduct() {
        if (this.product && confirm(`Are you sure you want to DELETE "${this.product.name}"? This cannot be undone.`)) {
            this.isLoading = true;
            this.productsService.deleteProduct(this.product.id)
                .pipe(takeUntil(this.destroy$), finalize(() => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }, 0);
            }))
                .subscribe({
                next: () => {
                    alert('Product deleted successfully');
                    this.goBack(); // Return to products list
                },
                error: (error) => {
                    console.error('Error deleting product:', error);
                    alert('Failed to delete product: ' + (error?.error?.message || 'Unknown error'));
                }
            });
        }
    }
    static { this.ɵfac = function ProductDetailComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductDetailComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ProductsService), i0.ɵɵdirectiveInject(i3.ValidationService), i0.ɵɵdirectiveInject(i4.FormBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductDetailComponent, selectors: [["app-product-detail"]], decls: 7, vars: 4, consts: [[1, "admin-products-wrapper"], [1, "admin-products-main"], ["class", "loading-container", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "product-detail-content", 4, "ngIf"], ["class", "dialog-overlay", 4, "ngIf"], [1, "loading-container"], [1, "loading-spinner"], [1, "error-state"], [1, "error-icon"], [1, "fa-solid", "fa-triangle-exclamation"], [1, "error-title"], [1, "error-message"], [1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-arrow-left"], [1, "product-detail-content"], [1, "detail-header"], [1, "header-top-row"], ["aria-label", "Back to products", 1, "btn-back", 3, "click"], [1, "product-header-content"], [1, "product-image-large"], [3, "error", "src", "alt"], [1, "product-info-section"], [1, "product-title"], [1, "product-meta-inline"], [1, "category-badge"], [1, "points-badge"], [1, "status-badge"], [1, "product-stats-inline"], [1, "stat-chip"], [1, "fa-regular", "fa-calendar"], [1, "fa-solid", "fa-receipt"], [1, "fa-solid", "fa-boxes-stacked"], [1, "tabs-container"], [1, "tabs-nav"], [1, "tab-btn", 3, "click"], [1, "fa-solid", "fa-circle-info"], [1, "fa-solid", "fa-cubes"], ["class", "tab-content", 3, "read-only-content", 4, "ngIf"], [1, "tab-content"], [1, "form-section", 3, "formGroup"], [1, "section-title"], [1, "form-grid"], [1, "form-group"], ["for", "name"], [1, "input-with-action"], ["id", "name", "type", "text", "formControlName", "name", "maxlength", "50", "aria-describedby", "name-hint", 1, "form-input", 3, "readonly"], ["type", "button", "class", "check-btn", 3, "disabled", "click", 4, "ngIf"], ["id", "name-hint", "fieldName", "Product name", "fieldType", "productName", "helperText", "1-4 words, alphanumeric only, 2-50 characters", 3, "control", "minLength", "maxLength", "checking", "uniquenessResult", 4, "ngIf"], ["for", "imageUrl"], ["id", "imageUrl", "type", "url", "formControlName", "imageUrl", "placeholder", "https://example.com/image.jpg", "maxlength", "1000", "aria-describedby", "imageUrl-hint", 1, "form-input", 3, "readonly"], ["id", "imageUrl-hint", "fieldName", "Image URL", "fieldType", "url", "helperText", "HTTPS URL only, max 1000 characters (optional)", 3, "control", 4, "ngIf"], [1, "form-group", "full-width"], ["for", "description"], ["id", "description", "formControlName", "description", "rows", "4", "maxlength", "500", "aria-describedby", "description-hint", 1, "form-textarea", 3, "readonly"], ["class", "char-count", 4, "ngIf"], ["id", "description-hint", "fieldName", "Description", "fieldType", "description", "helperText", "20-500 characters, 3-100 words", 3, "control", "minLength", "maxLength", 4, "ngIf"], ["for", "categoryId"], ["id", "categoryId", "formControlName", "categoryId", 1, "form-input", 3, "disabled"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["fieldName", "Category", 3, "control", 4, "ngIf"], ["for", "pointsCost"], ["id", "pointsCost", "type", "number", "formControlName", "pointsCost", "min", "1", "max", "10000000", "aria-describedby", "pointsCost-hint", 1, "form-input", 3, "readonly"], ["id", "pointsCost-hint", "fieldName", "Points cost", "fieldType", "number", "helperText", "Whole number from 1 to 10,000,000 (must be positive)", 3, "control", "minValue", "maxValue", 4, "ngIf"], [3, "form", "fieldLabels", 4, "ngIf"], ["class", "form-actions", 4, "ngIf"], ["type", "button", 1, "check-btn", 3, "click", "disabled"], ["id", "name-hint", "fieldName", "Product name", "fieldType", "productName", "helperText", "1-4 words, alphanumeric only, 2-50 characters", 3, "control", "minLength", "maxLength", "checking", "uniquenessResult"], ["id", "imageUrl-hint", "fieldName", "Image URL", "fieldType", "url", "helperText", "HTTPS URL only, max 1000 characters (optional)", 3, "control"], [1, "char-count"], ["id", "description-hint", "fieldName", "Description", "fieldType", "description", "helperText", "20-500 characters, 3-100 words", 3, "control", "minLength", "maxLength"], [3, "value"], ["fieldName", "Category", 3, "control"], ["id", "pointsCost-hint", "fieldName", "Points cost", "fieldType", "number", "helperText", "Whole number from 1 to 10,000,000 (must be positive)", 3, "control", "minValue", "maxValue"], [3, "form", "fieldLabels"], [1, "form-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "fa-solid", "fa-floppy-disk"], [1, "form-section"], [1, "stock-row"], [1, "stock-card"], [1, "stock-label"], [1, "stock-value-large"], [1, "stock-status"], ["class", "stock-card adjustment-card", 4, "ngIf"], ["class", "stock-card readonly-note", 4, "ngIf"], ["class", "form-group reason-group", 4, "ngIf"], ["class", "form-actions-center", 4, "ngIf"], [1, "form-section", "danger-zone"], [1, "danger-actions"], ["class", "btn btn-warning-outline", 3, "click", 4, "ngIf"], ["class", "btn btn-success-outline", 3, "click", 4, "ngIf"], [1, "btn", "btn-danger-outline", 3, "click", "disabled"], [1, "fa-solid", "fa-trash"], [1, "stock-card", "adjustment-card"], [1, "stock-adjustment-controls"], ["type", "button", 1, "btn-stock", 3, "click"], [1, "fa-solid", "fa-minus"], ["type", "number", "aria-describedby", "stockAmount-hint", 1, "form-input-center", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-plus"], [1, "stock-preview"], ["class", "stock-warning", 4, "ngIf"], ["class", "stock-validation-error", 4, "ngIf"], ["class", "stock-helper", 4, "ngIf"], [1, "stock-warning"], [1, "stock-validation-error"], [1, "stock-helper"], [1, "success-icon"], [1, "stock-card", "readonly-note"], [1, "readonly-message"], [1, "fa-solid", "fa-lock"], [1, "form-group", "reason-group"], ["for", "stockReason"], ["id", "stockReason", "type", "text", "placeholder", "Enter reason for stock adjustment...", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-actions-center"], [1, "fa-solid", "fa-check"], [1, "btn", "btn-warning-outline", 3, "click"], [1, "fa-solid", "fa-ban"], [1, "btn", "btn-success-outline", 3, "click"], [1, "fa-solid", "fa-check-circle"], [1, "redemptions-section"], [1, "section-header"], [1, "btn-export", 3, "click", "disabled"], [1, "fa-solid", "fa-file-csv"], [1, "redemptions-filters"], [1, "filter-tab", 3, "click"], ["class", "loading-state", 4, "ngIf"], ["class", "redemptions-table", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "redemptions-table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["colspan", "5", 1, "empty-cell"], [1, "fa-regular", "fa-folder-open"], [1, "status-badge", 3, "ngClass"], [1, "dialog-overlay"], ["role", "alertdialog", "aria-labelledby", "deactivateDialogTitle", "aria-modal", "true", 1, "dialog-content"], [1, "dialog-header"], ["id", "deactivateDialogTitle"], ["type", "button", "aria-label", "Close dialog", 1, "btn-close", 3, "click"], [1, "fa-solid", "fa-times"], [1, "dialog-body"], [1, "warning-intro"], [1, "warnings-list"], ["class", "warning-item", 4, "ngIf"], [1, "warning-message"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "warning-item"], [1, "fa-solid", "fa-box"], [1, "warning-content"], [1, "fa-solid", "fa-clock"], [1, "fa-solid", "fa-chart-line"], [1, "fa-solid", "fa-calendar"]], template: function ProductDetailComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1);
            i0.ɵɵtemplate(3, ProductDetailComponent_div_3_Template, 4, 0, "div", 2)(4, ProductDetailComponent_div_4_Template, 10, 1, "div", 3)(5, ProductDetailComponent_div_5_Template, 50, 33, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, ProductDetailComponent_div_6_Template, 24, 5, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.hasError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.product);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeactivateDialog && ctx.deactivateWarningData);
        } }, dependencies: [CommonModule, i5.NgClass, i5.NgForOf, i5.NgIf, FormsModule, i4.ɵNgNoValidate, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.MaxLengthValidator, i4.MinValidator, i4.MaxValidator, i4.NgModel, ReactiveFormsModule, i4.FormGroupDirective, i4.FormControlName, AdminSidebarComponent, ValidationHintComponent, FormErrorsSummaryComponent, i5.DecimalPipe, i5.DatePipe], styles: ["\n\r\n[_nghost-%COMP%] {\r\n  --primary-color: var(--ag-button-primary);\r\n  --primary-dark: var(--ag-button-primary-hover);\r\n  --danger-color: var(--ag-color-support-error);\r\n  --danger-light: var(--ag-tag-red-bg);\r\n  --success-color: var(--ag-color-support-success);\r\n  --success-light: var(--ag-tag-green-bg);\r\n  --warning-color: var(--ag-color-support-caution-major);\r\n  --warning-light: var(--ag-tag-yellow-bg);\r\n  --text-primary: var(--ag-color-text-primary);\r\n  --text-secondary: var(--ag-color-text-secondary);\r\n  --border-color: var(--ag-color-border-subtle);\r\n  --bg-light: var(--ag-color-field-01);\r\n  --bg-white: var(--ag-color-layer-01);\r\n  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\r\n  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n\n\r\n.admin-products-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.admin-products-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 2rem;\r\n  overflow-y: auto;\r\n}\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 400px;\r\n  gap: 1rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.loading-spinner[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--border-color);\r\n  border-top-color: var(--primary-color);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n\n\r\n.error-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 4rem 2rem;\r\n  gap: 1rem;\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  box-shadow: var(--shadow-sm);\r\n  text-align: center;\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%] {\r\n  font-size: 3rem;\r\n  color: var(--danger-color);\r\n}\r\n\r\n.error-title[_ngcontent-%COMP%] {\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.error-message[_ngcontent-%COMP%] {\r\n  color: var(--text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n.detail-header[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, var(--bg-white) 0%, #f8faf8 100%);\r\n  border-radius: 12px;\r\n  padding: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n  box-shadow: var(--shadow-sm);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.header-top-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 1rem;\r\n}\r\n\r\n.btn-back[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--danger-color);\r\n  background: transparent;\r\n  color: var(--danger-color);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 1rem;\r\n  transition: all 0.2s ease;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-back[_ngcontent-%COMP%]:hover {\r\n  background: var(--danger-color);\r\n  color: white;\r\n}\r\n\r\n.product-header-content[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 1.5rem;\r\n  flex: 1;\r\n}\r\n\r\n.product-image-large[_ngcontent-%COMP%] {\r\n  width: 120px;\r\n  height: 120px;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  background-color: var(--bg-light);\r\n  flex-shrink: 0;\r\n  border: 1px solid var(--border-color);\r\n  box-shadow: var(--shadow-sm);\r\n}\r\n\r\n.product-image-large[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.product-info-section[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.product-title[_ngcontent-%COMP%] {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: var(--text-primary);\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\n.product-meta-inline[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.product-stats-inline[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.5rem;\r\n}\r\n\r\n.stat-chip[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.375rem 0.75rem;\r\n  background-color: var(--bg-light);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.stat-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: var(--primary-color);\r\n  font-size: 0.85rem;\r\n}\r\n\r\n.stat-chip.low-stock[_ngcontent-%COMP%] {\r\n  background-color: var(--warning-light);\r\n}\r\n\r\n.stat-chip.low-stock[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stat-chip.out-of-stock[_ngcontent-%COMP%] {\r\n  background-color: var(--danger-light);\r\n}\r\n\r\n.stat-chip.out-of-stock[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.category-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  background-color: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: var(--text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.points-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  background-color: var(--primary-color);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: white;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  border-radius: 20px;\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge.active[_ngcontent-%COMP%] {\r\n  background-color: var(--success-light);\r\n  color: var(--success-color);\r\n}\r\n\r\n.status-badge.inactive[_ngcontent-%COMP%] {\r\n  background-color: var(--danger-light);\r\n  color: var(--danger-color);\r\n}\r\n\r\n\n\r\n.tabs-container[_ngcontent-%COMP%] {\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: var(--shadow-sm);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.tabs-nav[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  border-bottom: 1px solid var(--border-color);\r\n  background-color: var(--bg-light);\r\n  padding: 0.5rem;\r\n  gap: 0.25rem;\r\n}\r\n\r\n.tab-btn[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.75rem 1.25rem;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  font-weight: 500;\r\n  color: var(--text-secondary);\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.tab-btn[_ngcontent-%COMP%]:hover {\r\n  color: var(--text-primary);\r\n  background-color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.tab-btn.active[_ngcontent-%COMP%] {\r\n  color: var(--primary-color);\r\n  background-color: var(--bg-white);\r\n  box-shadow: var(--shadow-sm);\r\n}\r\n\r\n.tab-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 0.95rem;\r\n}\r\n\r\n\n\r\n.tab-content[_ngcontent-%COMP%] {\r\n  padding: 2rem;\r\n}\r\n\r\n\n\r\n.form-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 2rem;\r\n  padding-bottom: 2rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n}\r\n\r\n.form-section[_ngcontent-%COMP%]:last-child {\r\n  margin-bottom: 0;\r\n  padding-bottom: 0;\r\n  border-bottom: none;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n  font-size: 1.1rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n  margin: 0 0 1.5rem 0;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.form-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.form-group.full-width[_ngcontent-%COMP%] {\r\n  grid-column: 1 / -1;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%], \r\n.form-textarea[_ngcontent-%COMP%] {\r\n  padding: 0.75rem;\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 0.9rem;\r\n  font-family: inherit;\r\n  background-color: var(--bg-white);\r\n  outline: none;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus, \r\n.form-textarea[_ngcontent-%COMP%]:focus {\r\n  border-color: var(--primary-color);\r\n  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:disabled, \r\n.form-textarea[_ngcontent-%COMP%]:disabled, \r\n.form-input[readonly][_ngcontent-%COMP%], \r\n.form-textarea[readonly][_ngcontent-%COMP%] {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-secondary);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.form-hint[_ngcontent-%COMP%] {\r\n  font-size: 0.75rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n\n\r\n.input-with-action[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.input-with-action[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.check-btn[_ngcontent-%COMP%] {\r\n  padding: 0.75rem 1rem;\r\n  background: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.check-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--border-color);\r\n}\r\n\r\n.check-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n.char-count[_ngcontent-%COMP%] {\r\n  font-size: 0.75rem;\r\n  color: var(--text-secondary);\r\n  text-align: right;\r\n  margin-top: 0.25rem;\r\n}\r\n\r\n\n\r\n.form-input.error[_ngcontent-%COMP%], \r\n.form-textarea.error[_ngcontent-%COMP%] {\r\n  border-color: var(--danger-color);\r\n}\r\n\r\n.form-input.valid[_ngcontent-%COMP%], \r\n.form-textarea.valid[_ngcontent-%COMP%] {\r\n  border-color: var(--success-color);\r\n}\r\n\r\n\n\r\n.stock-preview.warning[_ngcontent-%COMP%] {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stock-warning[_ngcontent-%COMP%] {\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n}\r\n\r\n\n\r\n.stock-validation-error[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-top: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background-color: rgba(239, 68, 68, 0.1);\r\n  border: 1px solid var(--error-color, #ef4444);\r\n  border-radius: 6px;\r\n  color: var(--error-color, #ef4444);\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-validation-error[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\r\n  font-size: 0.9rem;\r\n  font-weight: 700;\r\n}\r\n\r\n\n\r\n.stock-helper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-top: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background-color: rgba(34, 197, 94, 0.1);\r\n  border: 1px solid var(--success-color, #22c55e);\r\n  border-radius: 6px;\r\n  color: var(--success-color, #22c55e);\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-helper[_ngcontent-%COMP%]   .success-icon[_ngcontent-%COMP%] {\r\n  font-size: 0.9rem;\r\n  font-weight: 700;\r\n}\r\n\r\n\n\r\n.form-input-center.error[_ngcontent-%COMP%] {\r\n  border-color: var(--error-color, #ef4444);\r\n  background-color: rgba(239, 68, 68, 0.05);\r\n}\r\n\r\n\n\r\n.form-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n.form-actions-center[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n\n\r\n.btn[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.75rem 1.5rem;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 0.9rem;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n.stock-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.stock-card[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 1.5rem;\r\n  background-color: var(--bg-light);\r\n  border-radius: 12px;\r\n  text-align: center;\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.stock-card.adjustment-card[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.stock-label[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n  color: var(--text-secondary);\r\n  margin-bottom: 0.5rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-value-large[_ngcontent-%COMP%] {\r\n  font-size: 2.5rem;\r\n  font-weight: 700;\r\n  color: var(--text-primary);\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.stock-status[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n  color: var(--primary-color);\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-status.low-stock[_ngcontent-%COMP%] {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stock-status.out-of-stock[_ngcontent-%COMP%] {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.stock-adjustment-controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.btn-stock[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 1px solid var(--border-color);\r\n  background-color: var(--bg-white);\r\n  border-radius: 8px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.btn-stock[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--primary-color);\r\n  border-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.form-input-center[_ngcontent-%COMP%] {\r\n  width: 80px;\r\n  text-align: center;\r\n  padding: 0.75rem;\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 1rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-preview[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.reason-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.readonly-note[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.readonly-message[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.readonly-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 1.5rem;\r\n  color: var(--warning-color);\r\n  margin-bottom: 0.5rem;\r\n  display: block;\r\n}\r\n\r\n.readonly-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0.25rem 0;\r\n  font-size: 0.875rem;\r\n}\r\n\r\n\n\r\n.danger-zone[_ngcontent-%COMP%] {\r\n  background-color: rgba(239, 68, 68, 0.05);\r\n  border: 1px solid var(--danger-light);\r\n  border-radius: 12px;\r\n  padding: 1.5rem;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.danger-zone[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.danger-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.btn-warning-outline[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border: 1px solid var(--warning-color);\r\n  color: var(--warning-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-warning-outline[_ngcontent-%COMP%]:hover {\r\n  background: var(--warning-color);\r\n  color: white;\r\n}\r\n\r\n.btn-success-outline[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border: 1px solid var(--success-color);\r\n  color: var(--success-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-success-outline[_ngcontent-%COMP%]:hover {\r\n  background: var(--success-color);\r\n  color: white;\r\n}\r\n\r\n.btn-danger-outline[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border: 1px solid var(--danger-color);\r\n  color: var(--danger-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-danger-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background: var(--danger-color);\r\n  color: white;\r\n}\r\n\r\n.btn-danger-outline[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n.redemptions-section[_ngcontent-%COMP%] {\r\n  min-height: 400px;\r\n}\r\n\r\n.section-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.btn-export[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.5rem 1rem;\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-export[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-export[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n.redemptions-filters[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  margin-bottom: 1.5rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-tab[_ngcontent-%COMP%] {\r\n  padding: 0.5rem 1rem;\r\n  background-color: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 20px;\r\n  cursor: pointer;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  transition: all 0.2s ease;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.filter-tab[_ngcontent-%COMP%]:hover {\r\n  border-color: var(--primary-color);\r\n}\r\n\r\n.filter-tab.active[_ngcontent-%COMP%] {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n  border-color: var(--primary-color);\r\n}\r\n\r\n\n\r\n.loading-state[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 3rem;\r\n  gap: 1rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 4px solid var(--border-color);\r\n  border-top-color: var(--primary-color);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n\n\r\n.redemptions-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.redemptions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  padding: 0.75rem 1rem;\r\n  text-align: left;\r\n  font-size: 0.8rem;\r\n  font-weight: 600;\r\n  color: var(--text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.05em;\r\n  border-bottom: 2px solid var(--border-color);\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.redemptions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  padding: 1rem;\r\n  font-size: 0.9rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n  color: var(--text-primary);\r\n}\r\n\r\n.redemptions-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.empty-cell[_ngcontent-%COMP%] {\r\n  text-align: center !important;\r\n  color: var(--text-secondary) !important;\r\n  padding: 3rem 1rem !important;\r\n}\r\n\r\n.empty-cell[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 2rem;\r\n  display: block;\r\n  margin-bottom: 0.5rem;\r\n  opacity: 0.5;\r\n}\r\n\r\n\n\r\n.status-pending[_ngcontent-%COMP%] {\r\n  background-color: var(--warning-light);\r\n  color: var(--warning-color);\r\n}\r\n\r\n.status-approved[_ngcontent-%COMP%] {\r\n  background-color: var(--success-light);\r\n  color: var(--success-color);\r\n}\r\n\r\n.status-delivered[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-tag-blue-bg, #e0f2fe);\r\n  color: var(--ag-color-support-info, #0284c7);\r\n}\r\n\r\n.status-rejected[_ngcontent-%COMP%] {\r\n  background-color: var(--danger-light);\r\n  color: var(--danger-color);\r\n}\r\n\r\n.status-cancelled[_ngcontent-%COMP%] {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-secondary);\r\n}\r\n\r\n\n\r\n.tabs-container.inactive-product[_ngcontent-%COMP%] {\r\n  position: relative;\r\n}\r\n\r\n.tabs-container.inactive-product[_ngcontent-%COMP%]::after {\r\n  content: \"Product Inactive - Read Only\";\r\n  position: absolute;\r\n  top: 0.5rem;\r\n  right: 0.5rem;\r\n  background-color: var(--warning-light);\r\n  color: var(--warning-color);\r\n  padding: 0.375rem 0.75rem;\r\n  border-radius: 20px;\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n  z-index: 10;\r\n}\r\n\r\n.tab-content.read-only-content[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  opacity: 0.8;\r\n}\r\n\r\n.tab-content.read-only-content[_ngcontent-%COMP%]::before {\r\n  display: none;\r\n}\r\n\r\n\n\r\n.dialog-overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 1000;\r\n  padding: 1rem;\r\n}\r\n\r\n.dialog-content[_ngcontent-%COMP%] {\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\r\n  max-width: 500px;\r\n  width: 100%;\r\n  max-height: 80vh;\r\n  overflow-y: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.dialog-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 1.5rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n}\r\n\r\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.btn-close[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  font-size: 1.5rem;\r\n  cursor: pointer;\r\n  color: var(--text-secondary);\r\n  padding: 0;\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 6px;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-close[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-primary);\r\n}\r\n\r\n.dialog-body[_ngcontent-%COMP%] {\r\n  padding: 1.5rem;\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n\r\n.warning-intro[_ngcontent-%COMP%] {\r\n  margin: 0 0 1rem 0;\r\n  color: var(--text-secondary);\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.warnings-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.warning-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1rem;\r\n  background-color: var(--bg-light);\r\n  border-left: 4px solid var(--warning-color);\r\n  border-radius: 6px;\r\n}\r\n\r\n.warning-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  color: var(--warning-color);\r\n  font-size: 1.25rem;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: var(--text-primary);\r\n  margin-bottom: 0.25rem;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.warning-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: var(--text-secondary);\r\n  font-size: 0.9rem;\r\n  line-height: 1.4;\r\n}\r\n\r\n.warning-message[_ngcontent-%COMP%] {\r\n  padding: 1rem;\r\n  background-color: #fff3cd;\r\n  border: 1px solid #ffeeba;\r\n  border-radius: 6px;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.warning-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #856404;\r\n  font-size: 0.9rem;\r\n}\r\n\r\n.dialog-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1.5rem;\r\n  border-top: 1px solid var(--border-color);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 0.75rem 1rem;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%] {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-primary);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: var(--border-color);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n\n\r\n@media (max-width: 768px) {\r\n  .admin-products-main[_ngcontent-%COMP%] {\r\n    padding: 1rem;\r\n  }\r\n\r\n  .header-top-row[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .product-header-content[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n  }\r\n\r\n  .product-image-large[_ngcontent-%COMP%] {\r\n    width: 100px;\r\n    height: 100px;\r\n  }\r\n\r\n  .product-stats-inline[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 0.5rem;\r\n  }\r\n\r\n  .tabs-nav[_ngcontent-%COMP%] {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .tab-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .form-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .stock-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .danger-actions[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .dialog-overlay[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n  }\r\n\r\n  .dialog-content[_ngcontent-%COMP%] {\r\n    border-radius: 8px;\r\n    max-height: 90vh;\r\n  }\r\n\r\n  .dialog-actions[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    width: 100%;  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductDetailComponent, [{
        type: Component,
        args: [{ selector: 'app-product-detail', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidebarComponent, ValidationHintComponent, FormErrorsSummaryComponent], template: "<div class=\"admin-products-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n  \r\n  <div class=\"admin-products-main\">\r\n    <!-- Loading State -->\r\n    <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n      <div class=\"loading-spinner\"></div>\r\n      <p>Loading product details...</p>\r\n    </div>\r\n\r\n    <!-- Error State -->\r\n    <div *ngIf=\"!isLoading && hasError\" class=\"error-state\">\r\n      <div class=\"error-icon\">\r\n        <i class=\"fa-solid fa-triangle-exclamation\"></i>\r\n      </div>\r\n      <h3 class=\"error-title\">Failed to Load Product</h3>\r\n      <p class=\"error-message\">{{ errorMessage }}</p>\r\n      <button class=\"btn btn-primary\" (click)=\"goBack()\">\r\n        <i class=\"fa-solid fa-arrow-left\"></i> Back to Products\r\n      </button>\r\n    </div>\r\n\r\n    <!-- Product Detail -->\r\n    <div *ngIf=\"!isLoading && !hasError && product\" class=\"product-detail-content\">\r\n      <!-- Compact Header with Back Button and Product Info -->\r\n      <div class=\"detail-header\">\r\n        <div class=\"header-top-row\">\r\n          <button class=\"btn-back\" (click)=\"goBack()\" aria-label=\"Back to products\">\r\n            <i class=\"fa-solid fa-arrow-left\"></i>\r\n          </button>\r\n          <div class=\"product-header-content\">\r\n            <div class=\"product-image-large\">\r\n              <img [src]=\"product.imageUrl || 'assets/placeholder-product.png'\" \r\n                   [alt]=\"product.name\"\r\n                   (error)=\"$any($event.target).src='assets/placeholder-product.png'\" />\r\n            </div>\r\n            <div class=\"product-info-section\">\r\n              <h1 class=\"product-title\">{{ product.name }}</h1>\r\n              <div class=\"product-meta-inline\">\r\n                <span class=\"category-badge\">{{ product.categoryName }}</span>\r\n                <span class=\"points-badge\">{{ product.pointsCost | number }} pts</span>\r\n                <span class=\"status-badge\" [class.active]=\"product.isActive\" [class.inactive]=\"!product.isActive\">\r\n                  {{ product.isActive ? 'Active' : 'Inactive' }}\r\n                </span>\r\n              </div>\r\n              <!-- Stats inside info section -->\r\n              <div class=\"product-stats-inline\">\r\n                <div class=\"stat-chip\">\r\n                  <i class=\"fa-regular fa-calendar\"></i>\r\n                  <span>{{ product.createdAt ? (product.createdAt | date:'mediumDate') : 'N/A' }}</span>\r\n                </div>\r\n                <div class=\"stat-chip\">\r\n                  <i class=\"fa-solid fa-receipt\"></i>\r\n                  <span>{{ totalRedemptions }} redemptions</span>\r\n                </div>\r\n                <div class=\"stat-chip\" [class.low-stock]=\"product.stockLevel < 10 && product.stockLevel > 0\" [class.out-of-stock]=\"product.stockLevel === 0\">\r\n                  <i class=\"fa-solid fa-boxes-stacked\"></i>\r\n                  <span>{{ product.stockLevel === 999999 ? 'Unlimited' : product.stockLevel }} in stock</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Modern Tabs -->\r\n      <div class=\"tabs-container\" [class.inactive-product]=\"!product.isActive\">\r\n        <div class=\"tabs-nav\">\r\n          <button class=\"tab-btn\" \r\n                  [class.active]=\"activeTab === 'info'\"\r\n                  (click)=\"switchTab('info')\">\r\n            <i class=\"fa-solid fa-circle-info\"></i>\r\n            <span>Product Info</span>\r\n          </button>\r\n          <button class=\"tab-btn\" \r\n                  [class.active]=\"activeTab === 'stock'\"\r\n                  (click)=\"switchTab('stock')\">\r\n            <i class=\"fa-solid fa-cubes\"></i>\r\n            <span>Stock & Control</span>\r\n          </button>\r\n          <button class=\"tab-btn\" \r\n                  [class.active]=\"activeTab === 'redemptions'\"\r\n                  (click)=\"switchTab('redemptions')\">\r\n            <i class=\"fa-solid fa-receipt\"></i>\r\n            <span>Redemptions</span>\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Tab Content: Product Info -->\r\n        <div class=\"tab-content\" *ngIf=\"activeTab === 'info'\" [class.read-only-content]=\"!product.isActive\">\r\n          <form [formGroup]=\"editForm\" class=\"form-section\">\r\n            <h3 class=\"section-title\">Basic Information</h3>\r\n            <div class=\"form-grid\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Product Name</label>\r\n                <div class=\"input-with-action\">\r\n                  <input \r\n                    id=\"name\"\r\n                    type=\"text\" \r\n                    formControlName=\"name\" \r\n                    class=\"form-input\" \r\n                    [class.error]=\"isFieldInvalid('name') || (productNameResult && !productNameResult.isValid)\"\r\n                    [class.valid]=\"isFieldValid('name') && (!productNameResult || productNameResult.isValid)\"\r\n                    [readonly]=\"!product.isActive\" \r\n                    [attr.disabled]=\"!product.isActive ? true : null\"\r\n                    maxlength=\"50\"\r\n                    aria-describedby=\"name-hint\" />\r\n                  <button \r\n                    type=\"button\" \r\n                    class=\"check-btn\" \r\n                    (click)=\"checkProductNameNow()\"\r\n                    [disabled]=\"checkingProductName || !editForm.get('name')?.value || editForm.get('name')?.invalid || !product.isActive\"\r\n                    *ngIf=\"product.isActive\">\r\n                    Check\r\n                  </button>\r\n                </div>\r\n                <app-validation-hint\r\n                  id=\"name-hint\"\r\n                  [control]=\"editForm.get('name')!\"\r\n                  fieldName=\"Product name\"\r\n                  fieldType=\"productName\"\r\n                  [minLength]=\"ValidationConstants.NAME_MIN_LENGTH\"\r\n                  [maxLength]=\"ValidationConstants.NAME_MAX_LENGTH\"\r\n                  helperText=\"1-4 words, alphanumeric only, 2-50 characters\"\r\n                  [checking]=\"checkingProductName\"\r\n                  [uniquenessResult]=\"productNameResult\"\r\n                  *ngIf=\"product.isActive\">\r\n                </app-validation-hint>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"imageUrl\">Image URL</label>\r\n                <input \r\n                  id=\"imageUrl\"\r\n                  type=\"url\" \r\n                  formControlName=\"imageUrl\" \r\n                  class=\"form-input\" \r\n                  [class.error]=\"isFieldInvalid('imageUrl')\"\r\n                  [class.valid]=\"isFieldValid('imageUrl')\"\r\n                  placeholder=\"https://example.com/image.jpg\" \r\n                  [readonly]=\"!product.isActive\" \r\n                  [attr.disabled]=\"!product.isActive ? true : null\"\r\n                  maxlength=\"1000\"\r\n                  aria-describedby=\"imageUrl-hint\" />\r\n                <app-validation-hint\r\n                  id=\"imageUrl-hint\"\r\n                  [control]=\"editForm.get('imageUrl')!\"\r\n                  fieldName=\"Image URL\"\r\n                  fieldType=\"url\"\r\n                  helperText=\"HTTPS URL only, max 1000 characters (optional)\"\r\n                  *ngIf=\"product.isActive\">\r\n                </app-validation-hint>\r\n              </div>\r\n              <div class=\"form-group full-width\">\r\n                <label for=\"description\">Description</label>\r\n                <textarea \r\n                  id=\"description\"\r\n                  formControlName=\"description\" \r\n                  class=\"form-textarea\" \r\n                  [class.error]=\"isFieldInvalid('description')\"\r\n                  [class.valid]=\"isFieldValid('description')\"\r\n                  rows=\"4\" \r\n                  [readonly]=\"!product.isActive\" \r\n                  [attr.disabled]=\"!product.isActive ? true : null\"\r\n                  maxlength=\"500\"\r\n                  aria-describedby=\"description-hint\"></textarea>\r\n                <div class=\"char-count\" *ngIf=\"product.isActive\">\r\n                  {{ getTrimmedLength('description') }} / 500 characters\r\n                  | {{ getWordCount('description') }} words\r\n                </div>\r\n                <app-validation-hint\r\n                  id=\"description-hint\"\r\n                  [control]=\"editForm.get('description')!\"\r\n                  fieldName=\"Description\"\r\n                  fieldType=\"description\"\r\n                  [minLength]=\"ValidationConstants.DESCRIPTION_MIN_LENGTH\"\r\n                  [maxLength]=\"ValidationConstants.DESCRIPTION_MAX_LENGTH\"\r\n                  helperText=\"20-500 characters, 3-100 words\"\r\n                  *ngIf=\"product.isActive\">\r\n                </app-validation-hint>\r\n              </div>\r\n            </div>\r\n          </form>\r\n\r\n          <form [formGroup]=\"editForm\" class=\"form-section\">\r\n            <h3 class=\"section-title\">Category & Pricing</h3>\r\n            <div class=\"form-grid\">\r\n              <div class=\"form-group\">\r\n                <label for=\"categoryId\">Category</label>\r\n                <select \r\n                  id=\"categoryId\"\r\n                  formControlName=\"categoryId\" \r\n                  class=\"form-input\" \r\n                  [class.error]=\"isFieldInvalid('categoryId')\"\r\n                  [disabled]=\"!product.isActive\">\r\n                  <option value=\"\">Select a category</option>\r\n                  <option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n                    {{ category.name }}\r\n                  </option>\r\n                </select>\r\n                <app-validation-hint\r\n                  [control]=\"editForm.get('categoryId')!\"\r\n                  fieldName=\"Category\"\r\n                  *ngIf=\"product.isActive\">\r\n                </app-validation-hint>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"pointsCost\">Redemption Cost (Points)</label>\r\n                <input \r\n                  id=\"pointsCost\"\r\n                  type=\"number\" \r\n                  formControlName=\"pointsCost\" \r\n                  class=\"form-input\" \r\n                  [class.error]=\"isFieldInvalid('pointsCost')\"\r\n                  [class.valid]=\"isFieldValid('pointsCost')\"\r\n                  min=\"1\" \r\n                  max=\"10000000\"\r\n                  [readonly]=\"!product.isActive\" \r\n                  [attr.disabled]=\"!product.isActive ? true : null\"\r\n                  aria-describedby=\"pointsCost-hint\" />\r\n                <app-validation-hint\r\n                  id=\"pointsCost-hint\"\r\n                  [control]=\"editForm.get('pointsCost')!\"\r\n                  fieldName=\"Points cost\"\r\n                  fieldType=\"number\"\r\n                  [minValue]=\"ValidationConstants.POINTS_COST_MIN\"\r\n                  [maxValue]=\"ValidationConstants.POINTS_COST_MAX\"\r\n                  helperText=\"Whole number from 1 to 10,000,000 (must be positive)\"\r\n                  *ngIf=\"product.isActive\">\r\n                </app-validation-hint>\r\n              </div>\r\n            </div>\r\n          </form>\r\n\r\n          <!-- Form Errors Summary - Toggle to show all errors -->\r\n          <app-form-errors-summary\r\n            [form]=\"editForm\"\r\n            [fieldLabels]=\"editFormFieldLabels\"\r\n            *ngIf=\"product.isActive\">\r\n          </app-form-errors-summary>\r\n\r\n          <div class=\"form-actions\" *ngIf=\"product.isActive\">\r\n            <button class=\"btn btn-primary\" (click)=\"saveChanges()\" [disabled]=\"!canSave\">\r\n              <i class=\"fa-solid fa-floppy-disk\"></i> Save Changes\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Tab Content: Stock & Control -->\r\n        <div class=\"tab-content\" *ngIf=\"activeTab === 'stock'\" [class.read-only-content]=\"!product.isActive\">\r\n          <div class=\"form-section\">\r\n            <h3 class=\"section-title\">Stock Management</h3>\r\n            \r\n            <!-- Stock Overview and Adjustment Row -->\r\n            <div class=\"stock-row\">\r\n              <div class=\"stock-card\">\r\n                <div class=\"stock-label\">Current Stock</div>\r\n                <div class=\"stock-value-large\">{{ product.stockLevel }}</div>\r\n                <div class=\"stock-status\" [class.low-stock]=\"product.stockLevel < 10 && product.stockLevel > 0\" [class.out-of-stock]=\"product.stockLevel === 0\">\r\n                  {{ product.stockLevel === 0 ? 'Out of Stock' : (product.stockLevel < 10 ? 'Low Stock' : 'Normal Stock') }}\r\n                </div>\r\n              </div>\r\n              <div class=\"stock-card adjustment-card\" *ngIf=\"product.isActive\">\r\n                <div class=\"stock-label\">Adjustment</div>\r\n                <div class=\"stock-adjustment-controls\">\r\n                  <button class=\"btn-stock\" (click)=\"stockAdjustment.amount = stockAdjustment.amount - 1\" type=\"button\">\r\n                    <i class=\"fa-solid fa-minus\"></i>\r\n                  </button>\r\n                  <input \r\n                    type=\"number\" \r\n                    [(ngModel)]=\"stockAdjustment.amount\" \r\n                    class=\"form-input-center\"\r\n                    [class.error]=\"stockValidationError\"\r\n                    aria-describedby=\"stockAmount-hint\" />\r\n                  <button class=\"btn-stock\" (click)=\"stockAdjustment.amount = stockAdjustment.amount + 1\" type=\"button\">\r\n                    <i class=\"fa-solid fa-plus\"></i>\r\n                  </button>\r\n                </div>\r\n                <div class=\"stock-preview\" [class.warning]=\"product.stockLevel + stockAdjustment.amount < 0 || (product.stockLevel + stockAdjustment.amount > ValidationConstants.STOCK_MAX)\">\r\n                  New stock: {{ Math.max(0, Math.min(ValidationConstants.STOCK_MAX, product.stockLevel + stockAdjustment.amount)) }}\r\n                  <span *ngIf=\"product.stockLevel + stockAdjustment.amount < 0\" class=\"stock-warning\">\r\n                    (Cannot go below 0)\r\n                  </span>\r\n                  <span *ngIf=\"product.stockLevel + stockAdjustment.amount > ValidationConstants.STOCK_MAX\" class=\"stock-warning\">\r\n                    (Max: {{ ValidationConstants.STOCK_MAX | number }})\r\n                  </span>\r\n                </div>\r\n                <!-- Stock Validation Error -->\r\n                <div class=\"stock-validation-error\" *ngIf=\"stockValidationError\">\r\n                  <span class=\"error-icon\">\u2717</span>\r\n                  <span>{{ stockValidationError }}</span>\r\n                </div>\r\n                <!-- Stock Helper Text when no error -->\r\n                <div class=\"stock-helper\" *ngIf=\"!stockValidationError && stockAdjustment.amount !== 0\">\r\n                  <span class=\"success-icon\">\u2713</span>\r\n                  <span>{{ stockAdjustment.amount > 0 ? 'Will add ' + stockAdjustment.amount + ' to stock' : 'Will remove ' + Math.abs(stockAdjustment.amount) + ' from stock' }}</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"stock-card readonly-note\" *ngIf=\"!product.isActive\">\r\n                <div class=\"readonly-message\">\r\n                  <i class=\"fa-solid fa-lock\"></i>\r\n                  <p>Stock adjustments are disabled for inactive products.</p>\r\n                  <p>Activate the product to manage stock levels.</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Reason Input -->\r\n            <div class=\"form-group reason-group\" *ngIf=\"product.isActive\">\r\n              <label for=\"stockReason\">Reason (optional)</label>\r\n              <input \r\n                id=\"stockReason\"\r\n                type=\"text\" \r\n                [(ngModel)]=\"stockAdjustment.reason\" \r\n                class=\"form-input\" \r\n                placeholder=\"Enter reason for stock adjustment...\" />\r\n            </div>\r\n\r\n            <!-- Centered Save Button -->\r\n            <div class=\"form-actions-center\" *ngIf=\"product.isActive\">\r\n              <button class=\"btn btn-primary\" (click)=\"adjustStock()\" [disabled]=\"!canAdjustStock\">\r\n                <i class=\"fa-solid fa-check\"></i> Save Stock Adjustment\r\n              </button>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-section danger-zone\">\r\n            <h3 class=\"section-title\">Product Control</h3>\r\n            <div class=\"danger-actions\">\r\n              <button *ngIf=\"product.isActive\" class=\"btn btn-warning-outline\" (click)=\"deactivateProduct()\">\r\n                <i class=\"fa-solid fa-ban\"></i> Deactivate Product\r\n              </button>\r\n              <button *ngIf=\"!product.isActive\" class=\"btn btn-success-outline\" (click)=\"activateProduct()\">\r\n                <i class=\"fa-solid fa-check-circle\"></i> Activate Product\r\n              </button>\r\n              <button class=\"btn btn-danger-outline\" (click)=\"deleteProduct()\" [disabled]=\"!product.isActive\">\r\n                <i class=\"fa-solid fa-trash\"></i> Delete Product\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Tab Content: Redemptions -->\r\n        <div class=\"tab-content\" *ngIf=\"activeTab === 'redemptions'\" [class.read-only-content]=\"!product.isActive\">\r\n          <div class=\"redemptions-section\">\r\n            <div class=\"section-header\">\r\n              <h3 class=\"section-title\">Redemptions</h3>\r\n              <button class=\"btn-export\" (click)=\"exportRedemptions()\" [disabled]=\"filteredRedemptions.length === 0\">\r\n                <i class=\"fa-solid fa-file-csv\"></i> Export CSV\r\n              </button>\r\n            </div>\r\n\r\n            <div class=\"redemptions-filters\">\r\n              <button \r\n                class=\"filter-tab\" \r\n                [class.active]=\"activeRedemptionFilter === 'all'\"\r\n                (click)=\"setRedemptionFilter('all')\"\r\n              >\r\n                All ({{ getRedemptionCount('all') }})\r\n              </button>\r\n              <button \r\n                class=\"filter-tab\" \r\n                [class.active]=\"activeRedemptionFilter === RedemptionStatus.Pending\"\r\n                (click)=\"setRedemptionFilter(RedemptionStatus.Pending)\"\r\n              >\r\n                Pending ({{ getRedemptionCount(RedemptionStatus.Pending) }})\r\n              </button>\r\n              <button \r\n                class=\"filter-tab\" \r\n                [class.active]=\"activeRedemptionFilter === RedemptionStatus.Approved\"\r\n                (click)=\"setRedemptionFilter(RedemptionStatus.Approved)\"\r\n              >\r\n                Approved ({{ getRedemptionCount(RedemptionStatus.Approved) }})\r\n              </button>\r\n              <button \r\n                class=\"filter-tab\" \r\n                [class.active]=\"activeRedemptionFilter === RedemptionStatus.Delivered\"\r\n                (click)=\"setRedemptionFilter(RedemptionStatus.Delivered)\"\r\n              >\r\n                Delivered ({{ getRedemptionCount(RedemptionStatus.Delivered) }})\r\n              </button>\r\n              <button \r\n                class=\"filter-tab\" \r\n                [class.active]=\"activeRedemptionFilter === RedemptionStatus.Rejected\"\r\n                (click)=\"setRedemptionFilter(RedemptionStatus.Rejected)\"\r\n              >\r\n                Rejected ({{ getRedemptionCount(RedemptionStatus.Rejected) }})\r\n              </button>\r\n            </div>\r\n\r\n            <div *ngIf=\"redemptionsLoading\" class=\"loading-state\">\r\n              <div class=\"spinner\"></div>\r\n              <p>Loading redemptions...</p>\r\n            </div>\r\n\r\n            <table class=\"redemptions-table\" *ngIf=\"!redemptionsLoading\">\r\n              <thead>\r\n                <tr>\r\n                  <th>User</th>\r\n                  <th>Quantity</th>\r\n                  <th>Points Spent</th>\r\n                  <th>Status</th>\r\n                  <th>Date</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngIf=\"filteredRedemptions.length === 0\">\r\n                  <td colspan=\"5\" class=\"empty-cell\">\r\n                    <i class=\"fa-regular fa-folder-open\"></i>\r\n                    No redemptions found for this filter\r\n                  </td>\r\n                </tr>\r\n                <tr *ngFor=\"let redemption of filteredRedemptions\">\r\n                  <td>{{ redemption.userName }}</td>\r\n                  <td>{{ redemption.quantity }}</td>\r\n                  <td>{{ redemption.pointsSpent | number }}</td>\r\n                  <td>\r\n                    <span class=\"status-badge\" [ngClass]=\"'status-' + redemption.statusText.toLowerCase()\">\r\n                      {{ redemption.statusText }}\r\n                    </span>\r\n                  </td>\r\n                  <td>{{ redemption.requestDate | date:'short' }}</td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Deactivation Warning Dialog -->\r\n  <div *ngIf=\"showDeactivateDialog && deactivateWarningData\" class=\"dialog-overlay\">\r\n    <div class=\"dialog-content\" role=\"alertdialog\" aria-labelledby=\"deactivateDialogTitle\" aria-modal=\"true\">\r\n      <div class=\"dialog-header\">\r\n        <h2 id=\"deactivateDialogTitle\">Deactivation Warnings</h2>\r\n        <button type=\"button\" class=\"btn-close\" (click)=\"onDeactivateCancelled()\" aria-label=\"Close dialog\">\r\n          <i class=\"fa-solid fa-times\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"dialog-body\">\r\n        <p class=\"warning-intro\">This product has the following conditions that may affect deactivation:</p>\r\n        \r\n        <div class=\"warnings-list\">\r\n          <div *ngIf=\"deactivateWarningData.stock && deactivateWarningData.stock > 0\" class=\"warning-item\">\r\n            <i class=\"fa-solid fa-box\"></i>\r\n            <div class=\"warning-content\">\r\n              <strong>Stock Available:</strong>\r\n              <p>This product has {{ deactivateWarningData.stock | number }} units in stock. These will become unavailable once deactivated.</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"(deactivateWarningData.recentRedemptions7d || 0) > 0\" class=\"warning-item\">\r\n            <i class=\"fa-solid fa-clock\"></i>\r\n            <div class=\"warning-content\">\r\n              <strong>Recent Activity (Last 7 Days):</strong>\r\n              <p>{{ deactivateWarningData.recentRedemptions7d | number }} redemptions from {{ deactivateWarningData.uniqueUsers7d || 0 }} users</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"(deactivateWarningData.recentRedemptions30d || 0) > (deactivateWarningData.recentRedemptions7d || 0)\" class=\"warning-item\">\r\n            <i class=\"fa-solid fa-chart-line\"></i>\r\n            <div class=\"warning-content\">\r\n              <strong>Activity (Last 30 Days):</strong>\r\n              <p>{{ deactivateWarningData.recentRedemptions30d | number }} total redemptions from {{ deactivateWarningData.uniqueUsers30d || 0 }} users</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"deactivateWarningData.lastRedemptionDate\" class=\"warning-item\">\r\n            <i class=\"fa-solid fa-calendar\"></i>\r\n            <div class=\"warning-content\">\r\n              <strong>Last Redemption:</strong>\r\n              <p>{{ deactivateWarningData.lastRedemptionDate | date:'mediumDate' }}</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"warning-message\">\r\n          <p>Click \"Confirm\" to proceed with deactivation despite these warnings.</p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"dialog-actions\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDeactivateCancelled()\">\r\n          Cancel\r\n        </button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onDeactivateConfirmed()\" [disabled]=\"isLoading\">\r\n          <i class=\"fa-solid fa-check\"></i> Confirm Deactivation\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n", styles: ["/* Product Detail Component - Unified Admin Design */\r\n:host {\r\n  --primary-color: var(--ag-button-primary);\r\n  --primary-dark: var(--ag-button-primary-hover);\r\n  --danger-color: var(--ag-color-support-error);\r\n  --danger-light: var(--ag-tag-red-bg);\r\n  --success-color: var(--ag-color-support-success);\r\n  --success-light: var(--ag-tag-green-bg);\r\n  --warning-color: var(--ag-color-support-caution-major);\r\n  --warning-light: var(--ag-tag-yellow-bg);\r\n  --text-primary: var(--ag-color-text-primary);\r\n  --text-secondary: var(--ag-color-text-secondary);\r\n  --border-color: var(--ag-color-border-subtle);\r\n  --bg-light: var(--ag-color-field-01);\r\n  --bg-white: var(--ag-color-layer-01);\r\n  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\r\n  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n/* Layout wrapper - same as Admin Users */\r\n.admin-products-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.admin-products-main {\r\n  flex: 1;\r\n  padding: 2rem;\r\n  overflow-y: auto;\r\n}\r\n\r\n/* Loading State */\r\n.loading-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 400px;\r\n  gap: 1rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.loading-spinner {\r\n  width: 48px;\r\n  height: 48px;\r\n  border: 4px solid var(--border-color);\r\n  border-top-color: var(--primary-color);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n/* Error State */\r\n.error-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 4rem 2rem;\r\n  gap: 1rem;\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  box-shadow: var(--shadow-sm);\r\n  text-align: center;\r\n}\r\n\r\n.error-icon {\r\n  font-size: 3rem;\r\n  color: var(--danger-color);\r\n}\r\n\r\n.error-title {\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.error-message {\r\n  color: var(--text-secondary);\r\n  margin: 0;\r\n}\r\n\r\n/* Detail Header - Compact with Back Button */\r\n.detail-header {\r\n  background: linear-gradient(135deg, var(--bg-white) 0%, #f8faf8 100%);\r\n  border-radius: 12px;\r\n  padding: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n  box-shadow: var(--shadow-sm);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.header-top-row {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 1rem;\r\n}\r\n\r\n.btn-back {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--danger-color);\r\n  background: transparent;\r\n  color: var(--danger-color);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 1rem;\r\n  transition: all 0.2s ease;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-back:hover {\r\n  background: var(--danger-color);\r\n  color: white;\r\n}\r\n\r\n.product-header-content {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 1.5rem;\r\n  flex: 1;\r\n}\r\n\r\n.product-image-large {\r\n  width: 120px;\r\n  height: 120px;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  background-color: var(--bg-light);\r\n  flex-shrink: 0;\r\n  border: 1px solid var(--border-color);\r\n  box-shadow: var(--shadow-sm);\r\n}\r\n\r\n.product-image-large img {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.product-info-section {\r\n  flex: 1;\r\n  min-width: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.product-title {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: var(--text-primary);\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\n.product-meta-inline {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.product-stats-inline {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.5rem;\r\n}\r\n\r\n.stat-chip {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.375rem 0.75rem;\r\n  background-color: var(--bg-light);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.stat-chip i {\r\n  color: var(--primary-color);\r\n  font-size: 0.85rem;\r\n}\r\n\r\n.stat-chip.low-stock {\r\n  background-color: var(--warning-light);\r\n}\r\n\r\n.stat-chip.low-stock i {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stat-chip.out-of-stock {\r\n  background-color: var(--danger-light);\r\n}\r\n\r\n.stat-chip.out-of-stock i {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.category-badge {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  background-color: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: var(--text-secondary);\r\n  font-weight: 500;\r\n}\r\n\r\n.points-badge {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  background-color: var(--primary-color);\r\n  border-radius: 20px;\r\n  font-size: 0.8rem;\r\n  color: white;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge {\r\n  display: inline-block;\r\n  padding: 0.25rem 0.75rem;\r\n  border-radius: 20px;\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.status-badge.active {\r\n  background-color: var(--success-light);\r\n  color: var(--success-color);\r\n}\r\n\r\n.status-badge.inactive {\r\n  background-color: var(--danger-light);\r\n  color: var(--danger-color);\r\n}\r\n\r\n/* Modern Tabs */\r\n.tabs-container {\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: var(--shadow-sm);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.tabs-nav {\r\n  display: flex;\r\n  border-bottom: 1px solid var(--border-color);\r\n  background-color: var(--bg-light);\r\n  padding: 0.5rem;\r\n  gap: 0.25rem;\r\n}\r\n\r\n.tab-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.75rem 1.25rem;\r\n  background: transparent;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  font-weight: 500;\r\n  color: var(--text-secondary);\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.tab-btn:hover {\r\n  color: var(--text-primary);\r\n  background-color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.tab-btn.active {\r\n  color: var(--primary-color);\r\n  background-color: var(--bg-white);\r\n  box-shadow: var(--shadow-sm);\r\n}\r\n\r\n.tab-btn i {\r\n  font-size: 0.95rem;\r\n}\r\n\r\n/* Tab Content */\r\n.tab-content {\r\n  padding: 2rem;\r\n}\r\n\r\n/* Form Sections */\r\n.form-section {\r\n  margin-bottom: 2rem;\r\n  padding-bottom: 2rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n}\r\n\r\n.form-section:last-child {\r\n  margin-bottom: 0;\r\n  padding-bottom: 0;\r\n  border-bottom: none;\r\n}\r\n\r\n.section-title {\r\n  font-size: 1.1rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n  margin: 0 0 1.5rem 0;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.form-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.form-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.form-group.full-width {\r\n  grid-column: 1 / -1;\r\n}\r\n\r\n.form-group label {\r\n  font-size: 0.875rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.form-input,\r\n.form-textarea {\r\n  padding: 0.75rem;\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 0.9rem;\r\n  font-family: inherit;\r\n  background-color: var(--bg-white);\r\n  outline: none;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.form-input:focus,\r\n.form-textarea:focus {\r\n  border-color: var(--primary-color);\r\n  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);\r\n}\r\n\r\n.form-input:disabled,\r\n.form-textarea:disabled,\r\n.form-input[readonly],\r\n.form-textarea[readonly] {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-secondary);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.form-hint {\r\n  font-size: 0.75rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n/* Input with action button (Check availability) */\r\n.input-with-action {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.input-with-action .form-input {\r\n  flex: 1;\r\n}\r\n\r\n.check-btn {\r\n  padding: 0.75rem 1rem;\r\n  background: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.check-btn:hover:not(:disabled) {\r\n  background: var(--border-color);\r\n}\r\n\r\n.check-btn:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Character/word count display */\r\n.char-count {\r\n  font-size: 0.75rem;\r\n  color: var(--text-secondary);\r\n  text-align: right;\r\n  margin-top: 0.25rem;\r\n}\r\n\r\n/* Form input validation states */\r\n.form-input.error,\r\n.form-textarea.error {\r\n  border-color: var(--danger-color);\r\n}\r\n\r\n.form-input.valid,\r\n.form-textarea.valid {\r\n  border-color: var(--success-color);\r\n}\r\n\r\n/* Stock preview warning */\r\n.stock-preview.warning {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stock-warning {\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n}\r\n\r\n/* Stock Validation Error Display */\r\n.stock-validation-error {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-top: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background-color: rgba(239, 68, 68, 0.1);\r\n  border: 1px solid var(--error-color, #ef4444);\r\n  border-radius: 6px;\r\n  color: var(--error-color, #ef4444);\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-validation-error .error-icon {\r\n  font-size: 0.9rem;\r\n  font-weight: 700;\r\n}\r\n\r\n/* Stock Helper Text */\r\n.stock-helper {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-top: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\r\n  background-color: rgba(34, 197, 94, 0.1);\r\n  border: 1px solid var(--success-color, #22c55e);\r\n  border-radius: 6px;\r\n  color: var(--success-color, #22c55e);\r\n  font-size: 0.85rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-helper .success-icon {\r\n  font-size: 0.9rem;\r\n  font-weight: 700;\r\n}\r\n\r\n/* Form Input Error State for Stock */\r\n.form-input-center.error {\r\n  border-color: var(--error-color, #ef4444);\r\n  background-color: rgba(239, 68, 68, 0.05);\r\n}\r\n\r\n/* Form Actions */\r\n.form-actions {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n.form-actions-center {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n/* Buttons */\r\n.btn {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.75rem 1.5rem;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 0.9rem;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-primary {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.btn-primary:hover {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-primary:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Stock Management */\r\n.stock-row {\r\n  display: flex;\r\n  gap: 1.5rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.stock-card {\r\n  flex: 1;\r\n  padding: 1.5rem;\r\n  background-color: var(--bg-light);\r\n  border-radius: 12px;\r\n  text-align: center;\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.stock-card.adjustment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.stock-label {\r\n  font-size: 0.875rem;\r\n  color: var(--text-secondary);\r\n  margin-bottom: 0.5rem;\r\n  font-weight: 500;\r\n}\r\n\r\n.stock-value-large {\r\n  font-size: 2.5rem;\r\n  font-weight: 700;\r\n  color: var(--text-primary);\r\n  margin-bottom: 0.5rem;\r\n}\r\n\r\n.stock-status {\r\n  font-size: 0.875rem;\r\n  color: var(--primary-color);\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-status.low-stock {\r\n  color: var(--warning-color);\r\n}\r\n\r\n.stock-status.out-of-stock {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.stock-adjustment-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  margin-bottom: 0.75rem;\r\n}\r\n\r\n.btn-stock {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 1px solid var(--border-color);\r\n  background-color: var(--bg-white);\r\n  border-radius: 8px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.btn-stock:hover {\r\n  background-color: var(--primary-color);\r\n  border-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.form-input-center {\r\n  width: 80px;\r\n  text-align: center;\r\n  padding: 0.75rem;\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 8px;\r\n  font-size: 1rem;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-preview {\r\n  font-size: 0.875rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.reason-group {\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.readonly-note {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.readonly-message {\r\n  text-align: center;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.readonly-message i {\r\n  font-size: 1.5rem;\r\n  color: var(--warning-color);\r\n  margin-bottom: 0.5rem;\r\n  display: block;\r\n}\r\n\r\n.readonly-message p {\r\n  margin: 0.25rem 0;\r\n  font-size: 0.875rem;\r\n}\r\n\r\n/* Danger Zone */\r\n.danger-zone {\r\n  background-color: rgba(239, 68, 68, 0.05);\r\n  border: 1px solid var(--danger-light);\r\n  border-radius: 12px;\r\n  padding: 1.5rem;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.danger-zone .section-title {\r\n  color: var(--danger-color);\r\n}\r\n\r\n.danger-actions {\r\n  display: flex;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.btn-warning-outline {\r\n  background: transparent;\r\n  border: 1px solid var(--warning-color);\r\n  color: var(--warning-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-warning-outline:hover {\r\n  background: var(--warning-color);\r\n  color: white;\r\n}\r\n\r\n.btn-success-outline {\r\n  background: transparent;\r\n  border: 1px solid var(--success-color);\r\n  color: var(--success-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-success-outline:hover {\r\n  background: var(--success-color);\r\n  color: white;\r\n}\r\n\r\n.btn-danger-outline {\r\n  background: transparent;\r\n  border: 1px solid var(--danger-color);\r\n  color: var(--danger-color);\r\n  padding: 0.75rem 1.25rem;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n  font-size: 0.9rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-danger-outline:hover:not(:disabled) {\r\n  background: var(--danger-color);\r\n  color: white;\r\n}\r\n\r\n.btn-danger-outline:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Redemptions Section */\r\n.redemptions-section {\r\n  min-height: 400px;\r\n}\r\n\r\n.section-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.btn-export {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.5rem 1rem;\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-export:hover:not(:disabled) {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-export:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Redemption Filters */\r\n.redemptions-filters {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  margin-bottom: 1.5rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.filter-tab {\r\n  padding: 0.5rem 1rem;\r\n  background-color: var(--bg-light);\r\n  border: 1px solid var(--border-color);\r\n  border-radius: 20px;\r\n  cursor: pointer;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  transition: all 0.2s ease;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.filter-tab:hover {\r\n  border-color: var(--primary-color);\r\n}\r\n\r\n.filter-tab.active {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n  border-color: var(--primary-color);\r\n}\r\n\r\n/* Loading State in Tabs */\r\n.loading-state {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 3rem;\r\n  gap: 1rem;\r\n  color: var(--text-secondary);\r\n}\r\n\r\n.loading-state .spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 4px solid var(--border-color);\r\n  border-top-color: var(--primary-color);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n/* Redemptions Table */\r\n.redemptions-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.redemptions-table th {\r\n  padding: 0.75rem 1rem;\r\n  text-align: left;\r\n  font-size: 0.8rem;\r\n  font-weight: 600;\r\n  color: var(--text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.05em;\r\n  border-bottom: 2px solid var(--border-color);\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.redemptions-table td {\r\n  padding: 1rem;\r\n  font-size: 0.9rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n  color: var(--text-primary);\r\n}\r\n\r\n.redemptions-table tbody tr:hover {\r\n  background-color: var(--bg-light);\r\n}\r\n\r\n.empty-cell {\r\n  text-align: center !important;\r\n  color: var(--text-secondary) !important;\r\n  padding: 3rem 1rem !important;\r\n}\r\n\r\n.empty-cell i {\r\n  font-size: 2rem;\r\n  display: block;\r\n  margin-bottom: 0.5rem;\r\n  opacity: 0.5;\r\n}\r\n\r\n/* Status Badges for Redemptions */\r\n.status-pending {\r\n  background-color: var(--warning-light);\r\n  color: var(--warning-color);\r\n}\r\n\r\n.status-approved {\r\n  background-color: var(--success-light);\r\n  color: var(--success-color);\r\n}\r\n\r\n.status-delivered {\r\n  background-color: var(--ag-tag-blue-bg, #e0f2fe);\r\n  color: var(--ag-color-support-info, #0284c7);\r\n}\r\n\r\n.status-rejected {\r\n  background-color: var(--danger-light);\r\n  color: var(--danger-color);\r\n}\r\n\r\n.status-cancelled {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-secondary);\r\n}\r\n\r\n/* Inactive Product Styles */\r\n.tabs-container.inactive-product {\r\n  position: relative;\r\n}\r\n\r\n.tabs-container.inactive-product::after {\r\n  content: \"Product Inactive - Read Only\";\r\n  position: absolute;\r\n  top: 0.5rem;\r\n  right: 0.5rem;\r\n  background-color: var(--warning-light);\r\n  color: var(--warning-color);\r\n  padding: 0.375rem 0.75rem;\r\n  border-radius: 20px;\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n  z-index: 10;\r\n}\r\n\r\n.tab-content.read-only-content {\r\n  position: relative;\r\n  opacity: 0.8;\r\n}\r\n\r\n.tab-content.read-only-content::before {\r\n  display: none;\r\n}\r\n\r\n/* Deactivation Warning Dialog */\r\n.dialog-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 1000;\r\n  padding: 1rem;\r\n}\r\n\r\n.dialog-content {\r\n  background-color: var(--bg-white);\r\n  border-radius: 12px;\r\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\r\n  max-width: 500px;\r\n  width: 100%;\r\n  max-height: 80vh;\r\n  overflow-y: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.dialog-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 1.5rem;\r\n  border-bottom: 1px solid var(--border-color);\r\n}\r\n\r\n.dialog-header h2 {\r\n  margin: 0;\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: var(--text-primary);\r\n}\r\n\r\n.btn-close {\r\n  background: none;\r\n  border: none;\r\n  font-size: 1.5rem;\r\n  cursor: pointer;\r\n  color: var(--text-secondary);\r\n  padding: 0;\r\n  width: 36px;\r\n  height: 36px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 6px;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n.btn-close:hover {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-primary);\r\n}\r\n\r\n.dialog-body {\r\n  padding: 1.5rem;\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n\r\n.warning-intro {\r\n  margin: 0 0 1rem 0;\r\n  color: var(--text-secondary);\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.warnings-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.warning-item {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1rem;\r\n  background-color: var(--bg-light);\r\n  border-left: 4px solid var(--warning-color);\r\n  border-radius: 6px;\r\n}\r\n\r\n.warning-item i {\r\n  color: var(--warning-color);\r\n  font-size: 1.25rem;\r\n  flex-shrink: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.warning-content {\r\n  flex: 1;\r\n}\r\n\r\n.warning-content strong {\r\n  display: block;\r\n  color: var(--text-primary);\r\n  margin-bottom: 0.25rem;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.warning-content p {\r\n  margin: 0;\r\n  color: var(--text-secondary);\r\n  font-size: 0.9rem;\r\n  line-height: 1.4;\r\n}\r\n\r\n.warning-message {\r\n  padding: 1rem;\r\n  background-color: #fff3cd;\r\n  border: 1px solid #ffeeba;\r\n  border-radius: 6px;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.warning-message p {\r\n  margin: 0;\r\n  color: #856404;\r\n  font-size: 0.9rem;\r\n}\r\n\r\n.dialog-actions {\r\n  display: flex;\r\n  gap: 1rem;\r\n  padding: 1.5rem;\r\n  border-top: 1px solid var(--border-color);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.dialog-actions button {\r\n  flex: 1;\r\n  padding: 0.75rem 1rem;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.btn-secondary {\r\n  background-color: var(--bg-light);\r\n  color: var(--text-primary);\r\n  border: 1px solid var(--border-color);\r\n}\r\n\r\n.btn-secondary:hover:not(:disabled) {\r\n  background-color: var(--border-color);\r\n}\r\n\r\n.btn-primary {\r\n  background-color: var(--primary-color);\r\n  color: white;\r\n}\r\n\r\n.btn-primary:hover:not(:disabled) {\r\n  background-color: var(--primary-dark);\r\n}\r\n\r\n.btn-primary:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n\r\n/* Responsive Adjustments */\r\n@media (max-width: 768px) {\r\n  .admin-products-main {\r\n    padding: 1rem;\r\n  }\r\n\r\n  .header-top-row {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .product-header-content {\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n  }\r\n\r\n  .product-image-large {\r\n    width: 100px;\r\n    height: 100px;\r\n  }\r\n\r\n  .product-stats-inline {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 0.5rem;\r\n  }\r\n\r\n  .tabs-nav {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .tab-btn span {\r\n    display: none;\r\n  }\r\n\r\n  .form-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .stock-row {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .danger-actions {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .dialog-overlay {\r\n    padding: 0;\r\n  }\r\n\r\n  .dialog-content {\r\n    border-radius: 8px;\r\n    max-height: 90vh;\r\n  }\r\n\r\n  .dialog-actions {\r\n    flex-direction: column;\r\n  }\r\n\r\n  .dialog-actions button {\r\n    width: 100%;  }\r\n}"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.ProductsService }, { type: i3.ValidationService }, { type: i4.FormBuilder }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src/app/pages/admin/products/product-detail.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=product-detail.component.js.map