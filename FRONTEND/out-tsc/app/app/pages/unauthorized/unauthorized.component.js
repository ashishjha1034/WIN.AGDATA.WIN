import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class UnauthorizedComponent {
    goBack() {
        window.history.back();
    }
    goHome() {
        window.location.href = '/login';
    }
    static { this.ɵfac = function UnauthorizedComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UnauthorizedComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 16, vars: 0, consts: [[1, "unauthorized-container"], [1, "error-content"], [1, "error-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"], [1, "error-code"], [1, "action-buttons"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-secondary", 3, "click"]], template: function UnauthorizedComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(3, "svg", 3);
            i0.ɵɵdomElement(4, "path", 4);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵdomElementStart(5, "h1");
            i0.ɵɵtext(6, "Access Denied");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "p");
            i0.ɵɵtext(8, "You don't have permission to access this resource.");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(9, "p", 5);
            i0.ɵɵtext(10, "Error 403: Unauthorized");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "div", 6)(12, "button", 7);
            i0.ɵɵdomListener("click", function UnauthorizedComponent_Template_button_click_12_listener() { return ctx.goBack(); });
            i0.ɵɵtext(13, "Go Back");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(14, "button", 8);
            i0.ɵɵdomListener("click", function UnauthorizedComponent_Template_button_click_14_listener() { return ctx.goHome(); });
            i0.ɵɵtext(15, "Go to Login");
            i0.ɵɵdomElementEnd()()()();
        } }, dependencies: [CommonModule], styles: [".unauthorized-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n  padding: 20px;\r\n}\r\n\r\n.error-content[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\r\n  padding: 60px 40px;\r\n  text-align: center;\r\n  max-width: 500px;\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n  font-size: 64px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.error-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 80px;\r\n  height: 80px;\r\n}\r\n\r\n.error-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h2);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.error-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-01);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.error-code[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n  font-family: monospace;\r\n  margin-bottom: 32px;\r\n}\r\n\r\n.action-buttons[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 12px;\r\n  justify-content: center;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n  padding: 12px 24px;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.3s;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--ag-button-primary-hover);\r\n  transform: translateY(-2px);\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%] {\r\n  background-color: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.btn-secondary[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--ag-color-layer-hover);\r\n  border-color: var(--ag-color-border-strong);\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UnauthorizedComponent, [{
        type: Component,
        args: [{ selector: 'app-unauthorized', standalone: true, imports: [CommonModule], template: "<div class=\"unauthorized-container\">\r\n  <div class=\"error-content\">\r\n    <div class=\"error-icon\">\r\n      <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n        <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/>\r\n      </svg>\r\n    </div>\r\n    <h1>Access Denied</h1>\r\n    <p>You don't have permission to access this resource.</p>\r\n    <p class=\"error-code\">Error 403: Unauthorized</p>\r\n    <div class=\"action-buttons\">\r\n      <button class=\"btn btn-primary\" (click)=\"goBack()\">Go Back</button>\r\n      <button class=\"btn btn-secondary\" (click)=\"goHome()\">Go to Login</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".unauthorized-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n  padding: 20px;\r\n}\r\n\r\n.error-content {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\r\n  padding: 60px 40px;\r\n  text-align: center;\r\n  max-width: 500px;\r\n}\r\n\r\n.error-icon {\r\n  color: var(--ag-color-support-error);\r\n  font-size: 64px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.error-icon svg {\r\n  width: 80px;\r\n  height: 80px;\r\n}\r\n\r\n.error-content h1 {\r\n  font: var(--ag-typo-h2);\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.error-content p {\r\n  color: var(--ag-color-text-secondary);\r\n  font: var(--ag-typo-body-01);\r\n  margin-bottom: 12px;\r\n}\r\n\r\n.error-code {\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n  font-family: monospace;\r\n  margin-bottom: 32px;\r\n}\r\n\r\n.action-buttons {\r\n  display: flex;\r\n  gap: 12px;\r\n  justify-content: center;\r\n}\r\n\r\n.btn {\r\n  padding: 12px 24px;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-button);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.3s;\r\n  min-height: 44px;\r\n}\r\n\r\n.btn-primary {\r\n  background-color: var(--ag-button-primary);\r\n  color: var(--ag-color-text-on-color);\r\n}\r\n\r\n.btn-primary:hover {\r\n  background-color: var(--ag-button-primary-hover);\r\n  transform: translateY(-2px);\r\n}\r\n\r\n.btn-secondary {\r\n  background-color: var(--ag-color-field-01);\r\n  color: var(--ag-color-text-primary);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.btn-secondary:hover {\r\n  background-color: var(--ag-color-layer-hover);\r\n  border-color: var(--ag-color-border-strong);\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src/app/pages/unauthorized/unauthorized.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=unauthorized.component.js.map