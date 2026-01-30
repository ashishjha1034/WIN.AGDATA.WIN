import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../../services/auth.service";
import * as i2 from "@angular/router";
export class EmployeeDashboardComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userName = '';
        this.userEmail = '';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            if (user) {
                this.userName = user.firstName;
                this.userEmail = user.email;
            }
        });
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function EmployeeDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeDashboardComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeeDashboardComponent, selectors: [["app-employee-dashboard"]], decls: 28, vars: 3, consts: [[1, "employee-container"], [1, "navbar"], [1, "navbar-left"], [1, "navbar-brand"], [1, "badge", "badge-employee"], [1, "navbar-right"], [1, "user-info"], [1, "btn-logout", 3, "click"], [1, "dashboard-content"]], template: function EmployeeDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "h1", 3);
            i0.ɵɵtext(4, "WIN.AGDATA");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "span", 4);
            i0.ɵɵtext(6, "Employee");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(7, "div", 5)(8, "span", 6);
            i0.ɵɵtext(9);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(10, "button", 7);
            i0.ɵɵdomListener("click", function EmployeeDashboardComponent_Template_button_click_10_listener() { return ctx.logout(); });
            i0.ɵɵtext(11, "Logout");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(12, "div", 8)(13, "h2");
            i0.ɵɵtext(14, "Employee Dashboard");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(15, "p");
            i0.ɵɵtext(16);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(17, "p");
            i0.ɵɵtext(18, "Here you can:");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(19, "ul")(20, "li");
            i0.ɵɵtext(21, "View your reward points balance");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(22, "li");
            i0.ɵɵtext(23, "Check points history");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(24, "li");
            i0.ɵɵtext(25, "Browse and redeem products");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(26, "li");
            i0.ɵɵtext(27, "Track your redemption status");
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate2("", ctx.userName, " (", ctx.userEmail, ")");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("Welcome to your dashboard, ", ctx.userName, "!");
        } }, dependencies: [CommonModule], styles: [".employee-container[_ngcontent-%COMP%] {\r\n  height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.navbar[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-background-brand);\r\n  color: var(--ag-color-text-on-color);\r\n  padding: 16px 24px;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n.navbar-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.navbar-brand[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  margin: 0;\r\n}\r\n\r\n.badge[_ngcontent-%COMP%] {\r\n  padding: 4px 12px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n.badge-employee[_ngcontent-%COMP%] {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-text-on-color);\r\n}\r\n\r\n.navbar-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  opacity: 0.9;\r\n}\r\n\r\n.btn-logout[_ngcontent-%COMP%] {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-text-on-color);\r\n  border: 1px solid rgba(255, 255, 255, 0.3);\r\n  padding: 8px 16px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.3s;\r\n}\r\n\r\n.btn-logout[_ngcontent-%COMP%]:hover {\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n  border-color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 40px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 16px;\r\n  font: var(--ag-typo-h3);\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 16px;\r\n  font: var(--ag-typo-body-01);\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n  margin-left: 20px;\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  margin-bottom: 8px;\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-employee-dashboard', standalone: true, imports: [CommonModule], template: "<div class=\"employee-container\">\r\n  <nav class=\"navbar\">\r\n    <div class=\"navbar-left\">\r\n      <h1 class=\"navbar-brand\">WIN.AGDATA</h1>\r\n      <span class=\"badge badge-employee\">Employee</span>\r\n    </div>\r\n    <div class=\"navbar-right\">\r\n      <span class=\"user-info\">{{ userName }} ({{ userEmail }})</span>\r\n      <button class=\"btn-logout\" (click)=\"logout()\">Logout</button>\r\n    </div>\r\n  </nav>\r\n\r\n  <div class=\"dashboard-content\">\r\n    <h2>Employee Dashboard</h2>\r\n    <p>Welcome to your dashboard, {{ userName }}!</p>\r\n    <p>Here you can:</p>\r\n    <ul>\r\n      <li>View your reward points balance</li>\r\n      <li>Check points history</li>\r\n      <li>Browse and redeem products</li>\r\n      <li>Track your redemption status</li>\r\n    </ul>\r\n  </div>\r\n</div>\r\n", styles: [".employee-container {\r\n  height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: var(--ag-color-field-01);\r\n}\r\n\r\n.navbar {\r\n  background: var(--ag-color-background-brand);\r\n  color: var(--ag-color-text-on-color);\r\n  padding: 16px 24px;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n.navbar-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.navbar-brand {\r\n  font: var(--ag-typo-h4);\r\n  margin: 0;\r\n}\r\n\r\n.badge {\r\n  padding: 4px 12px;\r\n  border-radius: 20px;\r\n  font: var(--ag-typo-label);\r\n}\r\n\r\n.badge-employee {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-text-on-color);\r\n}\r\n\r\n.navbar-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.user-info {\r\n  font: var(--ag-typo-helper-text);\r\n  opacity: 0.9;\r\n}\r\n\r\n.btn-logout {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-text-on-color);\r\n  border: 1px solid rgba(255, 255, 255, 0.3);\r\n  padding: 8px 16px;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.3s;\r\n}\r\n\r\n.btn-logout:hover {\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n  border-color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.dashboard-content {\r\n  flex: 1;\r\n  padding: 40px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.dashboard-content h2 {\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 16px;\r\n  font: var(--ag-typo-h3);\r\n}\r\n\r\n.dashboard-content p {\r\n  color: var(--ag-color-text-secondary);\r\n  margin-bottom: 16px;\r\n  font: var(--ag-typo-body-01);\r\n}\r\n\r\n.dashboard-content ul {\r\n  color: var(--ag-color-text-secondary);\r\n  margin-left: 20px;\r\n}\r\n\r\n.dashboard-content li {\r\n  margin-bottom: 8px;\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeeDashboardComponent, { className: "EmployeeDashboardComponent", filePath: "src/app/pages/employee-dashboard/employee-dashboard.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=employee-dashboard.component.js.map