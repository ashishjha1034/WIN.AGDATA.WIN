import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function UserTableComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 7)(1, "td", 8);
    i0.ɵɵelement(2, "div", 9);
    i0.ɵɵtext(3, " Loading users... ");
    i0.ɵɵelementEnd()();
} }
function UserTableComponent_tr_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 10)(1, "td", 11);
    i0.ɵɵtext(2, "No users found");
    i0.ɵɵelementEnd()();
} }
function UserTableComponent_tr_19_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r4);
} }
function UserTableComponent_tr_19_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1, "Employee");
    i0.ɵɵelementEnd();
} }
function UserTableComponent_tr_19_div_35_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "button", 32);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("view", user_r2)); });
    i0.ɵɵtext(2, "View Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 32);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("edit", user_r2)); });
    i0.ɵɵtext(4, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 32);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("transactions", user_r2)); });
    i0.ɵɵtext(6, "Transactions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 32);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("reset-password", user_r2)); });
    i0.ɵɵtext(8, "Reset Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "div", 33);
    i0.ɵɵelementStart(10, "button", 32);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("toggle-status", user_r2)); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 34);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_div_35_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAction("delete", user_r2)); });
    i0.ɵɵtext(13, "Delete");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("@fadeInOut", undefined);
    i0.ɵɵadvance(10);
    i0.ɵɵclassProp("deactivate", user_r2.isActive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", user_r2.isActive ? "Deactivate" : "Activate", " ");
} }
function UserTableComponent_tr_19_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 12);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_Template_tr_click_0_listener() { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onRowClick(user_r2)); })("keydown.enter", function UserTableComponent_tr_19_Template_tr_keydown_enter_0_listener() { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onRowClick(user_r2)); });
    i0.ɵɵelementStart(1, "td", 13)(2, "div", 14)(3, "div", 15);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 16)(6, "div", 17);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 18);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtemplate(13, UserTableComponent_tr_19_span_13_Template, 2, 1, "span", 19)(14, UserTableComponent_tr_19_span_14_Template, 2, 0, "span", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td")(16, "span", 21);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "td")(19, "div", 22)(20, "div", 23);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 24)(24, "span", 25);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(27, " / ");
    i0.ɵɵelementStart(28, "span", 26);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "td", 2)(32, "div", 27)(33, "button", 28);
    i0.ɵɵlistener("click", function UserTableComponent_tr_19_Template_button_click_33_listener($event) { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleMenu($event, user_r2.id)); });
    i0.ɵɵtext(34, "\u22EF");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(35, UserTableComponent_tr_19_div_35_Template, 14, 4, "div", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", "View details for " + user_r2.firstName + " " + user_r2.lastName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.getInitials(user_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", user_r2.firstName, " ", user_r2.lastName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r2.employeeId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r2.email);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", user_r2.roles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !user_r2.roles || user_r2.roles.length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", user_r2.isActive)("inactive", !user_r2.isActive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", user_r2.isActive ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 17, (user_r2.points == null ? null : user_r2.points.current) ?? 0));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("+", i0.ɵɵpipeBind1(26, 19, (user_r2.points == null ? null : user_r2.points.earned) ?? 0));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("-", i0.ɵɵpipeBind1(30, 21, (user_r2.points == null ? null : user_r2.points.redeemed) ?? 0));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.activeMenuId === user_r2.id);
} }
function UserTableComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "button", 36);
    i0.ɵɵlistener("click", function UserTableComponent_div_20_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.previousPage()); });
    i0.ɵɵtext(2, " \u2190 Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 36);
    i0.ɵɵlistener("click", function UserTableComponent_div_20_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.nextPage()); });
    i0.ɵɵtext(6, " Next \u2192 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r2.currentPage, " of ", ctx_r2.totalPages, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.currentPage === ctx_r2.totalPages);
} }
export class UserTableComponent {
    constructor() {
        this.users = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalItems = 0;
        this.isLoading = false;
        this.actionTriggered = new EventEmitter();
        this.pageChanged = new EventEmitter();
        this.rowDoubleClicked = new EventEmitter();
        this.rowClicked = new EventEmitter();
        this.activeMenuId = null;
    }
    onDocumentClick(event) {
        // Close menu when clicking outside
        if (this.activeMenuId && !event.target.closest('.action-menu')) {
            this.activeMenuId = null;
        }
    }
    get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize) || 1;
    }
    getInitials(user) {
        return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    }
    toggleMenu(event, userId) {
        event.stopPropagation();
        this.activeMenuId = this.activeMenuId === userId ? null : userId;
    }
    onRowDoubleClick(user) {
        this.rowDoubleClicked.emit(user);
    }
    onRowClick(user) {
        this.rowClicked.emit(user);
    }
    onAction(type, user) {
        this.activeMenuId = null;
        this.actionTriggered.emit({
            type,
            userId: user.id,
            user
        });
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.pageChanged.emit(this.currentPage - 1);
        }
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.pageChanged.emit(this.currentPage + 1);
        }
    }
    static { this.ɵfac = function UserTableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserTableComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserTableComponent, selectors: [["app-user-table"]], hostBindings: function UserTableComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function UserTableComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { users: "users", currentPage: "currentPage", pageSize: "pageSize", totalItems: "totalItems", isLoading: "isLoading" }, outputs: { actionTriggered: "actionTriggered", pageChanged: "pageChanged", rowDoubleClicked: "rowDoubleClicked", rowClicked: "rowClicked" }, decls: 21, vars: 4, consts: [[1, "table-container"], [1, "users-table"], [1, "actions-col"], ["class", "loading-row", 4, "ngIf"], ["class", "empty-row", 4, "ngIf"], ["class", "user-row", "tabindex", "0", "role", "button", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], [1, "loading-row"], ["colspan", "6", 1, "loading-message"], [1, "spinner"], [1, "empty-row"], ["colspan", "6", 1, "empty-message"], ["tabindex", "0", "role", "button", 1, "user-row", 3, "click", "keydown.enter"], [1, "user-cell"], [1, "user-info"], [1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-id"], ["class", "role-chip", 4, "ngFor", "ngForOf"], ["class", "role-chip", 4, "ngIf"], [1, "status-badge"], [1, "balance-info"], [1, "balance-amount"], [1, "balance-detail"], [1, "earned"], [1, "redeemed"], [1, "action-menu"], [1, "menu-btn", 3, "click"], ["class", "menu-dropdown", 4, "ngIf"], [1, "role-chip"], [1, "menu-dropdown"], [3, "click"], [1, "menu-divider"], [1, "delete", 3, "click"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "page-info"]], template: function UserTableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "table", 1)(2, "thead")(3, "tr")(4, "th");
            i0.ɵɵtext(5, "User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "th");
            i0.ɵɵtext(7, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "th");
            i0.ɵɵtext(9, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "th");
            i0.ɵɵtext(11, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "th");
            i0.ɵɵtext(13, "Balance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "th", 2);
            i0.ɵɵtext(15, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "tbody");
            i0.ɵɵtemplate(17, UserTableComponent_tr_17_Template, 4, 0, "tr", 3)(18, UserTableComponent_tr_18_Template, 3, 0, "tr", 4)(19, UserTableComponent_tr_19_Template, 36, 23, "tr", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(20, UserTableComponent_div_20_Template, 7, 4, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.users.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.users);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.totalPages > 1);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, i1.DecimalPipe], styles: [".table-container[_ngcontent-%COMP%] {\n      background: white;\n      border-radius: 8px;\n      overflow: hidden;\n      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    }\n\n    .users-table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 14px;\n    }\n\n    thead[_ngcontent-%COMP%] {\n      background: #f9fafb;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    th[_ngcontent-%COMP%] {\n      padding: 12px 16px;\n      text-align: left;\n      font-weight: 600;\n      color: #6b7280;\n      text-transform: uppercase;\n      font-size: 12px;\n      letter-spacing: 0.5px;\n    }\n\n    .actions-col[_ngcontent-%COMP%] {\n      width: 50px;\n      text-align: center;\n    }\n\n    tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n      border-bottom: 1px solid #f3f4f6;\n      transition: background-color 0.15s ease;\n    }\n\n    tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n      background-color: #f9fafb;\n    }\n\n    td[_ngcontent-%COMP%] {\n      padding: 12px 16px;\n      color: #1f2937;\n    }\n\n    .empty-row[_ngcontent-%COMP%] {\n      background: #f9fafb;\n    }\n\n    .empty-message[_ngcontent-%COMP%] {\n      text-align: center;\n      color: #9ca3af;\n      padding: 32px 16px;\n      font-size: 14px;\n    }\n\n    .user-cell[_ngcontent-%COMP%] {\n      padding: 12px 16px;\n    }\n\n    .user-info[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .user-avatar[_ngcontent-%COMP%] {\n      width: 40px;\n      height: 40px;\n      border-radius: 50%;\n      background: #4b5563;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-weight: 600;\n      font-size: 14px;\n    }\n\n    .user-details[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .user-name[_ngcontent-%COMP%] {\n      font-weight: 500;\n      color: #1f2937;\n    }\n\n    .user-id[_ngcontent-%COMP%] {\n      font-size: 12px;\n      color: #9ca3af;\n    }\n\n    .role-chip[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 4px 8px;\n      background: #dbeafe;\n      color: #1e40af;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n      margin-right: 4px;\n    }\n\n    .status-badge[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n    }\n\n    .status-badge.active[_ngcontent-%COMP%] {\n      background: #d1fae5;\n      color: #047857;\n    }\n\n    .status-badge.inactive[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .balance-info[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .balance-amount[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: #1f2937;\n    }\n\n    .balance-detail[_ngcontent-%COMP%] {\n      font-size: 12px;\n      color: #9ca3af;\n    }\n\n    .action-menu[_ngcontent-%COMP%] {\n      position: relative;\n      display: inline-block;\n    }\n\n    .menu-btn[_ngcontent-%COMP%] {\n      padding: 6px 8px;\n      background: transparent;\n      border: none;\n      font-size: 18px;\n      cursor: pointer;\n      color: #6b7280;\n      transition: color 0.2s ease;\n    }\n\n    .menu-btn[_ngcontent-%COMP%]:hover {\n      color: #1f2937;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 100%;\n      right: 0;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n      min-width: 160px;\n      z-index: 10;\n      overflow: hidden;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      display: block;\n      width: 100%;\n      padding: 10px 16px;\n      border: none;\n      background: white;\n      text-align: left;\n      font-size: 13px;\n      color: #374151;\n      cursor: pointer;\n      transition: all 0.15s ease;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background: #f3f4f6;\n      color: #1f2937;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%]   .menu-divider[_ngcontent-%COMP%] {\n      height: 1px;\n      padding: 0;\n      margin: 4px 0;\n      background: #e5e7eb;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%]   button.deactivate[_ngcontent-%COMP%], \n   .menu-dropdown[_ngcontent-%COMP%]   button.delete[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .menu-dropdown[_ngcontent-%COMP%]   button.deactivate[_ngcontent-%COMP%]:hover, \n   .menu-dropdown[_ngcontent-%COMP%]   button.delete[_ngcontent-%COMP%]:hover {\n      background: #fee2e2;\n    }\n\n    .loading-row[_ngcontent-%COMP%] {\n      background: #f9fafb;\n    }\n\n    .loading-message[_ngcontent-%COMP%] {\n      text-align: center;\n      color: #6b7280;\n      padding: 32px 16px;\n      font-size: 14px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 12px;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 20px;\n      height: 20px;\n      border: 2px solid #e5e7eb;\n      border-top-color: #4b5563;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .balance-detail[_ngcontent-%COMP%]   .earned[_ngcontent-%COMP%] {\n      color: #10b981;\n    }\n\n    .balance-detail[_ngcontent-%COMP%]   .redeemed[_ngcontent-%COMP%] {\n      color: #ef4444;\n    }\n\n    .user-row[_ngcontent-%COMP%] {\n      cursor: pointer;\n    }\n\n    .user-row[_ngcontent-%COMP%]:focus {\n      outline: none;\n      background-color: #f0fdf4;\n      box-shadow: inset 0 0 0 2px #2c5f3f;\n    }\n\n    .user-row[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid #2c5f3f;\n      outline-offset: -2px;\n    }\n\n    .pagination[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      gap: 16px;\n      padding: 16px;\n      background: #f9fafb;\n      border-top: 1px solid #e5e7eb;\n    }\n\n    .page-btn[_ngcontent-%COMP%] {\n      padding: 8px 12px;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      color: #6b7280;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: #f9fafb;\n      border-color: #d1d5db;\n      color: #374151;\n    }\n\n    .page-btn[_ngcontent-%COMP%]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .page-info[_ngcontent-%COMP%] {\n      font-size: 13px;\n      color: #6b7280;\n      font-weight: 500;\n    }"], data: { animation: [
                trigger('fadeInOut', [
                    transition(':enter', [
                        style({ opacity: 0, transform: 'translateY(-8px)' }),
                        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ]),
                    transition(':leave', [
                        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
                    ])
                ])
            ] } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserTableComponent, [{
        type: Component,
        args: [{ selector: 'app-user-table', standalone: true, imports: [CommonModule], animations: [
                    trigger('fadeInOut', [
                        transition(':enter', [
                            style({ opacity: 0, transform: 'translateY(-8px)' }),
                            animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                        ]),
                        transition(':leave', [
                            animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
                        ])
                    ])
                ], template: `
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Balance</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="isLoading" class="loading-row">
            <td colspan="6" class="loading-message">
              <div class="spinner"></div>
              Loading users...
            </td>
          </tr>
          <tr *ngIf="!isLoading && users.length === 0" class="empty-row">
            <td colspan="6" class="empty-message">No users found</td>
          </tr>
          <tr 
            *ngFor="let user of users" 
            class="user-row"
            (click)="onRowClick(user)"
            tabindex="0"
            (keydown.enter)="onRowClick(user)"
            role="button"
            [attr.aria-label]="'View details for ' + user.firstName + ' ' + user.lastName"
          >
            <td class="user-cell">
              <div class="user-info">
                <div class="user-avatar">{{ getInitials(user) }}</div>
                <div class="user-details">
                  <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="user-id">{{ user.employeeId }}</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span *ngFor="let role of user.roles" class="role-chip">{{ role }}</span>
              <span *ngIf="!user.roles || user.roles.length === 0" class="role-chip">Employee</span>
            </td>
            <td>
              <span class="status-badge" [class.active]="user.isActive" [class.inactive]="!user.isActive">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="balance-info">
                <div class="balance-amount">{{ user.points?.current ?? 0 | number }}</div>
                <div class="balance-detail">
                  <span class="earned">+{{ user.points?.earned ?? 0 | number }}</span> / 
                  <span class="redeemed">-{{ user.points?.redeemed ?? 0 | number }}</span>
                </div>
              </div>
            </td>
            <td class="actions-col">
              <div class="action-menu">
                <button class="menu-btn" (click)="toggleMenu($event, user.id)">⋯</button>
                <div class="menu-dropdown" *ngIf="activeMenuId === user.id" @fadeInOut>
                  <button (click)="onAction('view', user)">View Details</button>
                  <button (click)="onAction('edit', user)">Edit</button>
                  <button (click)="onAction('transactions', user)">Transactions</button>
                  <button (click)="onAction('reset-password', user)">Reset Password</button>
                  <div class="menu-divider"></div>
                  <button
                    [class.deactivate]="user.isActive"
                    (click)="onAction('toggle-status', user)"
                  >
                    {{ user.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button class="delete" (click)="onAction('delete', user)">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination" *ngIf="totalPages > 1">
        <button
          class="page-btn"
          [disabled]="currentPage === 1"
          (click)="previousPage()"
        >
          ← Previous
        </button>
        <div class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <button
          class="page-btn"
          [disabled]="currentPage === totalPages"
          (click)="nextPage()"
        >
          Next →
        </button>
      </div>
    </div>
  `, styles: ["\n    .table-container {\n      background: white;\n      border-radius: 8px;\n      overflow: hidden;\n      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    }\n\n    .users-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 14px;\n    }\n\n    thead {\n      background: #f9fafb;\n      border-bottom: 1px solid #e5e7eb;\n    }\n\n    th {\n      padding: 12px 16px;\n      text-align: left;\n      font-weight: 600;\n      color: #6b7280;\n      text-transform: uppercase;\n      font-size: 12px;\n      letter-spacing: 0.5px;\n    }\n\n    .actions-col {\n      width: 50px;\n      text-align: center;\n    }\n\n    tbody tr {\n      border-bottom: 1px solid #f3f4f6;\n      transition: background-color 0.15s ease;\n    }\n\n    tbody tr:hover {\n      background-color: #f9fafb;\n    }\n\n    td {\n      padding: 12px 16px;\n      color: #1f2937;\n    }\n\n    .empty-row {\n      background: #f9fafb;\n    }\n\n    .empty-message {\n      text-align: center;\n      color: #9ca3af;\n      padding: 32px 16px;\n      font-size: 14px;\n    }\n\n    .user-cell {\n      padding: 12px 16px;\n    }\n\n    .user-info {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .user-avatar {\n      width: 40px;\n      height: 40px;\n      border-radius: 50%;\n      background: #4b5563;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-weight: 600;\n      font-size: 14px;\n    }\n\n    .user-details {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .user-name {\n      font-weight: 500;\n      color: #1f2937;\n    }\n\n    .user-id {\n      font-size: 12px;\n      color: #9ca3af;\n    }\n\n    .role-chip {\n      display: inline-block;\n      padding: 4px 8px;\n      background: #dbeafe;\n      color: #1e40af;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n      margin-right: 4px;\n    }\n\n    .status-badge {\n      display: inline-block;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 12px;\n      font-weight: 500;\n    }\n\n    .status-badge.active {\n      background: #d1fae5;\n      color: #047857;\n    }\n\n    .status-badge.inactive {\n      background: #fee2e2;\n      color: #dc2626;\n    }\n\n    .balance-info {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .balance-amount {\n      font-weight: 600;\n      color: #1f2937;\n    }\n\n    .balance-detail {\n      font-size: 12px;\n      color: #9ca3af;\n    }\n\n    .action-menu {\n      position: relative;\n      display: inline-block;\n    }\n\n    .menu-btn {\n      padding: 6px 8px;\n      background: transparent;\n      border: none;\n      font-size: 18px;\n      cursor: pointer;\n      color: #6b7280;\n      transition: color 0.2s ease;\n    }\n\n    .menu-btn:hover {\n      color: #1f2937;\n    }\n\n    .menu-dropdown {\n      position: absolute;\n      top: 100%;\n      right: 0;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n      min-width: 160px;\n      z-index: 10;\n      overflow: hidden;\n    }\n\n    .menu-dropdown button {\n      display: block;\n      width: 100%;\n      padding: 10px 16px;\n      border: none;\n      background: white;\n      text-align: left;\n      font-size: 13px;\n      color: #374151;\n      cursor: pointer;\n      transition: all 0.15s ease;\n    }\n\n    .menu-dropdown button:hover {\n      background: #f3f4f6;\n      color: #1f2937;\n    }\n\n    .menu-dropdown .menu-divider {\n      height: 1px;\n      padding: 0;\n      margin: 4px 0;\n      background: #e5e7eb;\n    }\n\n    .menu-dropdown button.deactivate,\n    .menu-dropdown button.delete {\n      color: #dc2626;\n    }\n\n    .menu-dropdown button.deactivate:hover,\n    .menu-dropdown button.delete:hover {\n      background: #fee2e2;\n    }\n\n    .loading-row {\n      background: #f9fafb;\n    }\n\n    .loading-message {\n      text-align: center;\n      color: #6b7280;\n      padding: 32px 16px;\n      font-size: 14px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 12px;\n    }\n\n    .spinner {\n      width: 20px;\n      height: 20px;\n      border: 2px solid #e5e7eb;\n      border-top-color: #4b5563;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .balance-detail .earned {\n      color: #10b981;\n    }\n\n    .balance-detail .redeemed {\n      color: #ef4444;\n    }\n\n    .user-row {\n      cursor: pointer;\n    }\n\n    .user-row:focus {\n      outline: none;\n      background-color: #f0fdf4;\n      box-shadow: inset 0 0 0 2px #2c5f3f;\n    }\n\n    .user-row:focus-visible {\n      outline: 2px solid #2c5f3f;\n      outline-offset: -2px;\n    }\n\n    .pagination {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      gap: 16px;\n      padding: 16px;\n      background: #f9fafb;\n      border-top: 1px solid #e5e7eb;\n    }\n\n    .page-btn {\n      padding: 8px 12px;\n      background: white;\n      border: 1px solid #e5e7eb;\n      border-radius: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      color: #6b7280;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .page-btn:hover:not(:disabled) {\n      background: #f9fafb;\n      border-color: #d1d5db;\n      color: #374151;\n    }\n\n    .page-btn:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .page-info {\n      font-size: 13px;\n      color: #6b7280;\n      font-weight: 500;\n    }\n  "] }]
    }], null, { users: [{
            type: Input
        }], currentPage: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], totalItems: [{
            type: Input
        }], isLoading: [{
            type: Input
        }], actionTriggered: [{
            type: Output
        }], pageChanged: [{
            type: Output
        }], rowDoubleClicked: [{
            type: Output
        }], rowClicked: [{
            type: Output
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserTableComponent, { className: "UserTableComponent", filePath: "src/app/pages/admin/users/components/user-table.component.ts", lineNumber: 432 }); })();
//# sourceMappingURL=user-table.component.js.map