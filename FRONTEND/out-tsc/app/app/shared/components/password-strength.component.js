import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { calculatePasswordStrength } from '../validators/custom-validators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PasswordStrengthComponent_div_0_ul_5_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r1 = ctx.$implicit;
    i0.ɵɵclassProp("met", req_r1.met)("unmet", !req_r1.met);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(req_r1.met ? "\u2713" : "\u25CB");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", req_r1.text, " ");
} }
function PasswordStrengthComponent_div_0_ul_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 7);
    i0.ɵɵtemplate(1, PasswordStrengthComponent_div_0_ul_5_li_1_Template, 4, 6, "li", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.strength.requirements);
} }
function PasswordStrengthComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "span", 11);
    i0.ɵɵtext(2, "\u26A0");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Password cannot contain your name or employee ID ");
    i0.ɵɵelementEnd();
} }
function PasswordStrengthComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
    i0.ɵɵelement(2, "div", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PasswordStrengthComponent_div_0_ul_5_Template, 2, 1, "ul", 5)(6, PasswordStrengthComponent_div_0_div_6_Template, 4, 0, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.strengthClass);
    i0.ɵɵstyleProp("width", ctx_r1.strength.score, "%");
    i0.ɵɵattribute("aria-valuenow", ctx_r1.strength.score);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.strengthClass);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.strength.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showRequirements);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.containsPersonalInfo);
} }
/**
 * Component for displaying password strength indicator and requirements checklist
 */
export class PasswordStrengthComponent {
    constructor() {
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.employeeId = '';
        this.showRequirements = true;
        this.strength = calculatePasswordStrength('');
        this.containsPersonalInfo = false;
    }
    get strengthClass() {
        return this.strength.label.toLowerCase();
    }
    ngOnChanges(changes) {
        this.strength = calculatePasswordStrength(this.password);
        this.checkPersonalInfo();
    }
    checkPersonalInfo() {
        if (!this.password) {
            this.containsPersonalInfo = false;
            return;
        }
        const pwdLower = this.password.toLowerCase();
        this.containsPersonalInfo = !!((this.firstName && this.firstName.length > 1 && pwdLower.includes(this.firstName.toLowerCase())) ||
            (this.lastName && this.lastName.length > 1 && pwdLower.includes(this.lastName.toLowerCase())) ||
            (this.employeeId && this.employeeId.length > 1 && pwdLower.includes(this.employeeId.toLowerCase())));
    }
    static { this.ɵfac = function PasswordStrengthComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PasswordStrengthComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PasswordStrengthComponent, selectors: [["app-password-strength"]], inputs: { password: "password", firstName: "firstName", lastName: "lastName", employeeId: "employeeId", showRequirements: "showRequirements" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "password-strength", "role", "region", "aria-label", "Password strength indicator", 4, "ngIf"], ["role", "region", "aria-label", "Password strength indicator", 1, "password-strength"], [1, "strength-bar-container"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "strength-bar"], [1, "strength-label"], ["class", "requirements", "aria-live", "polite", 4, "ngIf"], ["class", "warning", "role", "alert", 4, "ngIf"], ["aria-live", "polite", 1, "requirements"], [3, "met", "unmet", 4, "ngFor", "ngForOf"], [1, "check"], ["role", "alert", 1, "warning"], [1, "icon"]], template: function PasswordStrengthComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, PasswordStrengthComponent_div_0_Template, 7, 10, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.password);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".password-strength[_ngcontent-%COMP%] {\n      margin-top: 8px;\n    }\n\n    .strength-bar-container[_ngcontent-%COMP%] {\n      height: 4px;\n      background: #e5e7eb;\n      border-radius: 2px;\n      overflow: hidden;\n      margin-bottom: 4px;\n    }\n\n    .strength-bar[_ngcontent-%COMP%] {\n      height: 100%;\n      border-radius: 2px;\n      transition: width 200ms ease, background-color 200ms ease;\n    }\n\n    .strength-bar.weak[_ngcontent-%COMP%] { background: #dc2626; }\n    .strength-bar.fair[_ngcontent-%COMP%] { background: #f59e0b; }\n    .strength-bar.good[_ngcontent-%COMP%] { background: #22c55e; }\n    .strength-bar.strong[_ngcontent-%COMP%] { background: #16a34a; }\n    .strength-bar.excellent[_ngcontent-%COMP%] { background: #15803d; }\n\n    .strength-label[_ngcontent-%COMP%] {\n      font-size: 11px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .strength-label.weak[_ngcontent-%COMP%] { color: #dc2626; }\n    .strength-label.fair[_ngcontent-%COMP%] { color: #f59e0b; }\n    .strength-label.good[_ngcontent-%COMP%] { color: #22c55e; }\n    .strength-label.strong[_ngcontent-%COMP%] { color: #16a34a; }\n    .strength-label.excellent[_ngcontent-%COMP%] { color: #15803d; }\n\n    .requirements[_ngcontent-%COMP%] {\n      list-style: none;\n      padding: 0;\n      margin: 8px 0 0 0;\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n      gap: 4px;\n    }\n\n    .requirements[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 12px;\n      padding: 2px 0;\n      transition: color 150ms ease;\n    }\n\n    .requirements[_ngcontent-%COMP%]   li.met[_ngcontent-%COMP%] {\n      color: #16a34a;\n    }\n\n    .requirements[_ngcontent-%COMP%]   li.unmet[_ngcontent-%COMP%] {\n      color: #9ca3af;\n    }\n\n    .requirements[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n      font-size: 12px;\n      width: 14px;\n      text-align: center;\n    }\n\n    .warning[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 8px;\n      padding: 8px 12px;\n      background: #fef3c7;\n      border: 1px solid #f59e0b;\n      border-radius: 4px;\n      font-size: 12px;\n      color: #92400e;\n    }\n\n    .warning[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n      font-size: 14px;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PasswordStrengthComponent, [{
        type: Component,
        args: [{ selector: 'app-password-strength', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="password-strength" *ngIf="password" role="region" aria-label="Password strength indicator">
      <!-- Strength bar -->
      <div class="strength-bar-container">
        <div class="strength-bar" 
             [style.width.%]="strength.score" 
             [class]="strengthClass"
             role="progressbar"
             [attr.aria-valuenow]="strength.score"
             aria-valuemin="0"
             aria-valuemax="100">
        </div>
      </div>
      <span class="strength-label" [class]="strengthClass">{{ strength.label }}</span>

      <!-- Requirements checklist -->
      <ul class="requirements" *ngIf="showRequirements" aria-live="polite">
        <li *ngFor="let req of strength.requirements" 
            [class.met]="req.met"
            [class.unmet]="!req.met">
          <span class="check">{{ req.met ? '✓' : '○' }}</span>
          {{ req.text }}
        </li>
      </ul>

      <!-- Personal info warning -->
      <div *ngIf="containsPersonalInfo" class="warning" role="alert">
        <span class="icon">⚠</span>
        Password cannot contain your name or employee ID
      </div>
    </div>
  `, styles: ["\n    .password-strength {\n      margin-top: 8px;\n    }\n\n    .strength-bar-container {\n      height: 4px;\n      background: #e5e7eb;\n      border-radius: 2px;\n      overflow: hidden;\n      margin-bottom: 4px;\n    }\n\n    .strength-bar {\n      height: 100%;\n      border-radius: 2px;\n      transition: width 200ms ease, background-color 200ms ease;\n    }\n\n    .strength-bar.weak { background: #dc2626; }\n    .strength-bar.fair { background: #f59e0b; }\n    .strength-bar.good { background: #22c55e; }\n    .strength-bar.strong { background: #16a34a; }\n    .strength-bar.excellent { background: #15803d; }\n\n    .strength-label {\n      font-size: 11px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .strength-label.weak { color: #dc2626; }\n    .strength-label.fair { color: #f59e0b; }\n    .strength-label.good { color: #22c55e; }\n    .strength-label.strong { color: #16a34a; }\n    .strength-label.excellent { color: #15803d; }\n\n    .requirements {\n      list-style: none;\n      padding: 0;\n      margin: 8px 0 0 0;\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n      gap: 4px;\n    }\n\n    .requirements li {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 12px;\n      padding: 2px 0;\n      transition: color 150ms ease;\n    }\n\n    .requirements li.met {\n      color: #16a34a;\n    }\n\n    .requirements li.unmet {\n      color: #9ca3af;\n    }\n\n    .requirements li .check {\n      font-size: 12px;\n      width: 14px;\n      text-align: center;\n    }\n\n    .warning {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 8px;\n      padding: 8px 12px;\n      background: #fef3c7;\n      border: 1px solid #f59e0b;\n      border-radius: 4px;\n      font-size: 12px;\n      color: #92400e;\n    }\n\n    .warning .icon {\n      font-size: 14px;\n    }\n  "] }]
    }], null, { password: [{
            type: Input
        }], firstName: [{
            type: Input
        }], lastName: [{
            type: Input
        }], employeeId: [{
            type: Input
        }], showRequirements: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PasswordStrengthComponent, { className: "PasswordStrengthComponent", filePath: "src/app/shared/components/password-strength.component.ts", lineNumber: 133 }); })();
//# sourceMappingURL=password-strength.component.js.map