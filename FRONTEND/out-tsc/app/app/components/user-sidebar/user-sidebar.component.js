import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../../services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = () => ({ exact: false });
function UserSidebarComponent_img_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 16);
} }
function UserSidebarComponent_li_8_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.label);
} }
function UserSidebarComponent_li_8_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.badge);
} }
function UserSidebarComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 17)(1, "a", 18)(2, "span", 19);
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, UserSidebarComponent_li_8_span_4_Template, 2, 1, "span", 20)(5, UserSidebarComponent_li_8_span_5_Template, 2, 1, "span", 21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", item_r1.path)("routerLinkActiveOptions", i0.ɵɵpureFunction0(7, _c0))("title", item_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(item_r1.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isCollapsed);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r1.badge && !ctx_r1.isCollapsed);
} }
function UserSidebarComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24)(1, "div", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 26)(4, "p", 27);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 28);
    i0.ɵɵtext(7, "Employee");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", (ctx_r1.currentUser.firstName == null ? null : ctx_r1.currentUser.firstName.charAt(0)) || "", "", (ctx_r1.currentUser.lastName == null ? null : ctx_r1.currentUser.lastName.charAt(0)) || "", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.currentUser.firstName, " ", ctx_r1.currentUser.lastName);
} }
function UserSidebarComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", (ctx_r1.currentUser.firstName == null ? null : ctx_r1.currentUser.firstName.charAt(0)) || "", "", (ctx_r1.currentUser.lastName == null ? null : ctx_r1.currentUser.lastName.charAt(0)) || "", " ");
} }
function UserSidebarComponent_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Logout");
    i0.ɵɵelementEnd();
} }
export class UserSidebarComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isCollapsed = false;
        this.menuItems = [
            {
                label: 'Dashboard',
                icon: 'fa-solid fa-chart-line',
                path: '/user/dashboard'
            },
            {
                label: 'Events',
                icon: 'fa-solid fa-calendar-days',
                path: '/user/events'
            },
            {
                label: 'Products',
                icon: 'fa-solid fa-headphones',
                path: '/user/products'
            },
            {
                label: 'Redemptions',
                icon: 'fa-regular fa-circle-check',
                path: '/user/redemptions'
            },
            {
                label: 'Transactions',
                icon: 'fa-solid fa-wallet',
                path: '/user/transactions'
            }
        ];
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
        });
    }
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }
    navigateTo(path) {
        this.router.navigateByUrl(path);
    }
    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserSidebarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserSidebarComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserSidebarComponent, selectors: [["app-user-sidebar"]], decls: 16, vars: 7, consts: [[1, "sidebar"], [1, "sidebar-header"], [1, "logo-wrapper"], ["src", "assets/brand/agdata-logo-white.png", "alt", "AGDATA", "class", "agdata-logo", 4, "ngIf"], ["title", "Toggle sidebar", 1, "toggle-btn", 3, "click"], [1, "fa-solid", "fa-circle-dot"], [1, "sidebar-nav"], [1, "menu-list"], ["class", "menu-item", 4, "ngFor", "ngForOf"], [1, "sidebar-footer"], ["class", "user-info", 4, "ngIf"], ["class", "user-avatar-only", 4, "ngIf"], ["title", "Logout", 1, "logout-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"], [4, "ngIf"], ["src", "assets/brand/agdata-logo-white.png", "alt", "AGDATA", 1, "agdata-logo"], [1, "menu-item"], ["routerLinkActive", "active", 1, "menu-link", 3, "routerLink", "routerLinkActiveOptions", "title"], [1, "menu-icon"], ["class", "menu-label", 4, "ngIf"], ["class", "badge", 4, "ngIf"], [1, "menu-label"], [1, "badge"], [1, "user-info"], [1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "user-avatar-only"]], template: function UserSidebarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtemplate(3, UserSidebarComponent_img_3_Template, 1, 0, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 4);
            i0.ɵɵlistener("click", function UserSidebarComponent_Template_button_click_4_listener() { return ctx.toggleSidebar(); });
            i0.ɵɵelement(5, "i", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "nav", 6)(7, "ul", 7);
            i0.ɵɵtemplate(8, UserSidebarComponent_li_8_Template, 6, 8, "li", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 9);
            i0.ɵɵtemplate(10, UserSidebarComponent_div_10_Template, 8, 4, "div", 10)(11, UserSidebarComponent_div_11_Template, 2, 2, "div", 11);
            i0.ɵɵelementStart(12, "button", 12);
            i0.ɵɵlistener("click", function UserSidebarComponent_Template_button_click_12_listener() { return ctx.logout(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(13, "svg", 13);
            i0.ɵɵelement(14, "path", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, UserSidebarComponent_span_15_Template, 2, 0, "span", 15);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("collapsed", ctx.isCollapsed);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.isCollapsed);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.menuItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.currentUser && !ctx.isCollapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.currentUser && ctx.isCollapsed);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.isCollapsed);
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, RouterModule, i2.RouterLink, i2.RouterLinkActive], styles: [".sidebar[_ngcontent-%COMP%] {\r\n  width: 260px;\r\n  height: 100vh;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 60;\r\n  background: var(--ag-color-background-brand);\r\n  color: var(--ag-color-text-on-color);\r\n  display: flex;\r\n  flex-direction: column;\r\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\r\n  overflow-y: auto;\r\n}\r\n\r\n.sidebar.collapsed[_ngcontent-%COMP%] {\r\n  width: 80px;\r\n}\r\n\r\n\n\r\n.sidebar-header[_ngcontent-%COMP%] {\r\n  padding: 20px 16px;\r\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 12px;\r\n}\r\n\r\n.logo-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.agdata-logo[_ngcontent-%COMP%] {\r\n  height: 40px;\r\n  width: auto;\r\n  max-width: 180px;\r\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\r\n  flex-shrink: 0;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border-radius: 8px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.logo-text[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02-bold);\r\n  letter-spacing: 2px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.toggle-btn[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border: none;\r\n  color: var(--ag-color-text-on-color);\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transition: all 0.2s;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.toggle-btn[_ngcontent-%COMP%]:hover {\r\n  background: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.toggle-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n\n\r\n.sidebar-nav[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 16px 8px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.menu-list[_ngcontent-%COMP%] {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.menu-item[_ngcontent-%COMP%] {\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.menu-link[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 12px 16px;\r\n  color: rgba(255, 255, 255, 0.7);\r\n  text-decoration: none;\r\n  border-radius: 6px;\r\n  transition: all 0.2s;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  position: relative;\r\n}\r\n\r\n.menu-link[_ngcontent-%COMP%]:hover {\r\n  background: rgba(255, 255, 255, 0.1);\r\n  color: var(--ag-color-text-on-color);\r\n  text-decoration: none;\r\n}\r\n\r\n.menu-link.active[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-background-selected);\r\n  color: var(--ag-color-text-on-color);\r\n  border-left: 3px solid var(--ag-color-text-on-color);\r\n  padding-left: 13px;\r\n}\r\n\r\n.menu-icon[_ngcontent-%COMP%] {\r\n  font-size: 20px;\r\n  flex-shrink: 0;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 24px;\r\n}\r\n\r\n.menu-label[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-error);\r\n  color: var(--ag-color-text-on-color);\r\n  font: var(--ag-typo-label);\r\n  padding: 2px 8px;\r\n  border-radius: 12px;\r\n  min-width: 20px;\r\n  text-align: center;\r\n}\r\n\r\n.sidebar.collapsed[_ngcontent-%COMP%]   .menu-label[_ngcontent-%COMP%], \r\n.sidebar.collapsed[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n\n\r\n.sidebar-footer[_ngcontent-%COMP%] {\r\n  padding: 16px;\r\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 12px;\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border-radius: 8px;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.user-avatar[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02-bold);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.user-avatar-only[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-01-bold);\r\n  margin: 0 auto 12px;\r\n}\r\n\r\n.user-details[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.user-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02-bold);\r\n  margin: 0 0 4px 0;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: rgba(255, 255, 255, 0.7);\r\n  margin: 0;\r\n}\r\n\r\n.logout-btn[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 12px;\r\n  background: var(--ag-button-danger);\r\n  border: none;\r\n  color: var(--ag-color-text-on-color);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.logout-btn[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-danger-hover);\r\n}\r\n\r\n.logout-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n\n\r\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n  width: 6px;\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\r\n  background: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  border-radius: 3px;\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\r\n  background: rgba(255, 255, 255, 0.3);\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserSidebarComponent, [{
        type: Component,
        args: [{ selector: 'app-user-sidebar', standalone: true, imports: [CommonModule, RouterModule], template: "<aside class=\"sidebar\" [class.collapsed]=\"isCollapsed\">\r\n  <!-- Logo Section -->\r\n  <div class=\"sidebar-header\">\r\n    <div class=\"logo-wrapper\">\r\n      <img src=\"assets/brand/agdata-logo-white.png\" alt=\"AGDATA\" class=\"agdata-logo\" *ngIf=\"!isCollapsed\"/>\r\n    </div>\r\n    <button class=\"toggle-btn\" (click)=\"toggleSidebar()\" title=\"Toggle sidebar\">\r\n      <i class=\"fa-solid fa-circle-dot\"></i>\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Navigation Menu -->\r\n  <nav class=\"sidebar-nav\">\r\n    <ul class=\"menu-list\">\r\n      <li *ngFor=\"let item of menuItems\" class=\"menu-item\">\r\n        <a\r\n          [routerLink]=\"item.path\"\r\n          routerLinkActive=\"active\"\r\n          [routerLinkActiveOptions]=\"{ exact: false }\"\r\n          class=\"menu-link\"\r\n          [title]=\"item.label\"\r\n        >\r\n          <span class=\"menu-icon\"><i [class]=\"item.icon\"></i></span>\r\n          <span class=\"menu-label\" *ngIf=\"!isCollapsed\">{{ item.label }}</span>\r\n          <span class=\"badge\" *ngIf=\"item.badge && !isCollapsed\">{{ item.badge }}</span>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </nav>\r\n\r\n  <!-- User Section -->\r\n  <div class=\"sidebar-footer\">\r\n    <div class=\"user-info\" *ngIf=\"currentUser && !isCollapsed\">\r\n      <div class=\"user-avatar\">\r\n        {{ currentUser.firstName?.charAt(0) || '' }}{{ currentUser.lastName?.charAt(0) || '' }}\r\n      </div>\r\n      <div class=\"user-details\">\r\n        <p class=\"user-name\">{{ currentUser.firstName }} {{ currentUser.lastName }}</p>\r\n        <p class=\"user-role\">Employee</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"user-avatar-only\" *ngIf=\"currentUser && isCollapsed\">\r\n      {{ currentUser.firstName?.charAt(0) || '' }}{{ currentUser.lastName?.charAt(0) || '' }}\r\n    </div>\r\n\r\n    <!-- Logout Button -->\r\n    <button class=\"logout-btn\" (click)=\"logout()\" title=\"Logout\">\r\n      <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n        <path d=\"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z\"/>\r\n      </svg>\r\n      <span *ngIf=\"!isCollapsed\">Logout</span>\r\n    </button>\r\n  </div>\r\n</aside>\r\n", styles: [".sidebar {\r\n  width: 260px;\r\n  height: 100vh;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 60;\r\n  background: var(--ag-color-background-brand);\r\n  color: var(--ag-color-text-on-color);\r\n  display: flex;\r\n  flex-direction: column;\r\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\r\n  overflow-y: auto;\r\n}\r\n\r\n.sidebar.collapsed {\r\n  width: 80px;\r\n}\r\n\r\n/* Header */\r\n.sidebar-header {\r\n  padding: 20px 16px;\r\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 12px;\r\n}\r\n\r\n.logo-wrapper {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.agdata-logo {\r\n  height: 40px;\r\n  width: auto;\r\n  max-width: 180px;\r\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\r\n  flex-shrink: 0;\r\n}\r\n\r\n.logo {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border-radius: 8px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.logo svg {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.logo-text {\r\n  font: var(--ag-typo-body-02-bold);\r\n  letter-spacing: 2px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.toggle-btn {\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border: none;\r\n  color: var(--ag-color-text-on-color);\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transition: all 0.2s;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.toggle-btn:hover {\r\n  background: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.toggle-btn svg {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n/* Navigation */\r\n.sidebar-nav {\r\n  flex: 1;\r\n  padding: 16px 8px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.menu-list {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.menu-item {\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.menu-link {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 12px 16px;\r\n  color: rgba(255, 255, 255, 0.7);\r\n  text-decoration: none;\r\n  border-radius: 6px;\r\n  transition: all 0.2s;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  position: relative;\r\n}\r\n\r\n.menu-link:hover {\r\n  background: rgba(255, 255, 255, 0.1);\r\n  color: var(--ag-color-text-on-color);\r\n  text-decoration: none;\r\n}\r\n\r\n.menu-link.active {\r\n  background: var(--ag-color-background-selected);\r\n  color: var(--ag-color-text-on-color);\r\n  border-left: 3px solid var(--ag-color-text-on-color);\r\n  padding-left: 13px;\r\n}\r\n\r\n.menu-icon {\r\n  font-size: 20px;\r\n  flex-shrink: 0;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 24px;\r\n}\r\n\r\n.menu-label {\r\n  flex: 1;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.badge {\r\n  background: var(--ag-color-support-error);\r\n  color: var(--ag-color-text-on-color);\r\n  font: var(--ag-typo-label);\r\n  padding: 2px 8px;\r\n  border-radius: 12px;\r\n  min-width: 20px;\r\n  text-align: center;\r\n}\r\n\r\n.sidebar.collapsed .menu-label,\r\n.sidebar.collapsed .badge {\r\n  display: none;\r\n}\r\n\r\n/* Footer */\r\n.sidebar-footer {\r\n  padding: 16px;\r\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\r\n}\r\n\r\n.user-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 12px;\r\n  background: rgba(255, 255, 255, 0.1);\r\n  border-radius: 8px;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.user-avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02-bold);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.user-avatar-only {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-01-bold);\r\n  margin: 0 auto 12px;\r\n}\r\n\r\n.user-details {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.user-name {\r\n  font: var(--ag-typo-body-02-bold);\r\n  margin: 0 0 4px 0;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.user-role {\r\n  font: var(--ag-typo-helper-text);\r\n  color: rgba(255, 255, 255, 0.7);\r\n  margin: 0;\r\n}\r\n\r\n.logout-btn {\r\n  width: 100%;\r\n  padding: 12px;\r\n  background: var(--ag-button-danger);\r\n  border: none;\r\n  color: var(--ag-color-text-on-color);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 8px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.logout-btn:hover {\r\n  background: var(--ag-button-danger-hover);\r\n}\r\n\r\n.logout-btn svg {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n/* Scrollbar Styling */\r\n.sidebar::-webkit-scrollbar {\r\n  width: 6px;\r\n}\r\n\r\n.sidebar::-webkit-scrollbar-track {\r\n  background: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.sidebar::-webkit-scrollbar-thumb {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  border-radius: 3px;\r\n}\r\n\r\n.sidebar::-webkit-scrollbar-thumb:hover {\r\n  background: rgba(255, 255, 255, 0.3);\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserSidebarComponent, { className: "UserSidebarComponent", filePath: "src/app/components/user-sidebar/user-sidebar.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=user-sidebar.component.js.map