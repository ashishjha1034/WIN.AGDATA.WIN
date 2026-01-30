import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
function ChartCardComponent_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
export class ChartCardComponent {
    constructor() {
        this.title = '';
    }
    static { this.ɵfac = function ChartCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChartCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChartCardComponent, selectors: [["app-chart-card"]], inputs: { title: "title", subtitle: "subtitle" }, ngContentSelectors: _c0, decls: 7, vars: 2, consts: [[1, "chart-card"], [1, "chart-card__header"], [1, "chart-card__title"], ["class", "chart-card__subtitle", 4, "ngIf"], [1, "chart-card__body"], [1, "chart-card__subtitle"]], template: function ChartCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, ChartCardComponent_p_4_Template, 2, 1, "p", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵprojection(6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.subtitle);
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".chart-card[_ngcontent-%COMP%] {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .chart-card__header[_ngcontent-%COMP%] {\n      margin-bottom: 20px;\n    }\n\n    .chart-card__title[_ngcontent-%COMP%] {\n      font-size: 16px;\n      font-weight: 600;\n      color: var(--ag-color-text-primary, #1f2937);\n      margin: 0 0 4px 0;\n    }\n\n    .chart-card__subtitle[_ngcontent-%COMP%] {\n      font-size: 13px;\n      color: var(--ag-color-text-secondary, #6b7280);\n      margin: 0;\n    }\n\n    .chart-card__body[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      min-height: 0;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChartCardComponent, [{
        type: Component,
        args: [{ selector: 'app-chart-card', standalone: true, imports: [CommonModule], template: `
    <div class="chart-card">
      <div class="chart-card__header">
        <h3 class="chart-card__title">{{ title }}</h3>
        <p class="chart-card__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
      </div>
      <div class="chart-card__body">
        <ng-content></ng-content>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .chart-card {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .chart-card__header {\n      margin-bottom: 20px;\n    }\n\n    .chart-card__title {\n      font-size: 16px;\n      font-weight: 600;\n      color: var(--ag-color-text-primary, #1f2937);\n      margin: 0 0 4px 0;\n    }\n\n    .chart-card__subtitle {\n      font-size: 13px;\n      color: var(--ag-color-text-secondary, #6b7280);\n      margin: 0;\n    }\n\n    .chart-card__body {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      min-height: 0;\n    }\n  "] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChartCardComponent, { className: "ChartCardComponent", filePath: "src/app/pages/admin/admin-dashboard/components/chart-card/chart-card.component.ts", lineNumber: 57 }); })();
//# sourceMappingURL=chart-card.component.js.map