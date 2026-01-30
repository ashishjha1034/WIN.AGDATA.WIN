import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class KpiCardComponent {
    constructor() {
        this.label = '';
        this.value = 0;
        this.iconType = 'users';
    }
    getIconClass() {
        const iconMap = {
            'users': 'fa-solid fa-user-group',
            'events': 'fa-solid fa-calendar-days',
            'products': 'fa-solid fa-boxes-stacked',
            'low-stock': 'fa-solid fa-triangle-exclamation',
            'pending': 'fa-solid fa-gift',
            'live': 'fa-solid fa-bolt'
        };
        return iconMap[this.iconType] || 'fa-solid fa-chart-simple';
    }
    static { this.ɵfac = function KpiCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KpiCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KpiCardComponent, selectors: [["app-kpi-card"]], inputs: { label: "label", value: "value", iconType: "iconType" }, decls: 9, vars: 8, consts: [[1, "kpi-card"], [1, "kpi-icon"], [1, "kpi-content"], [1, "kpi-label"], [1, "kpi-value"]], template: function KpiCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵdomElement(2, "i");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "div", 2)(4, "span", 3);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "span", 4);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "number");
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassMap("kpi-card--" + ctx.iconType);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.getIconClass());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 6, ctx.value));
        } }, dependencies: [CommonModule, i1.DecimalPipe], styles: [".kpi-card[_ngcontent-%COMP%] {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 20px 24px;\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      transition: transform 0.2s, box-shadow 0.2s;\n    }\n\n    .kpi-card[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n    }\n\n    .kpi-icon[_ngcontent-%COMP%] {\n      width: 56px;\n      height: 56px;\n      border-radius: 12px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n\n    .kpi-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 24px;\n    }\n\n    \n\n    .kpi-card--users[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(44, 95, 63, 0.12);\n      color: #2c5f3f;\n    }\n\n    .kpi-card--events[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(59, 130, 246, 0.12);\n      color: #3b82f6;\n    }\n\n    .kpi-card--products[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(139, 92, 246, 0.12);\n      color: #8b5cf6;\n    }\n\n    .kpi-card--low-stock[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.12);\n      color: #f59e0b;\n    }\n\n    .kpi-card--pending[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(236, 72, 153, 0.12);\n      color: #ec4899;\n    }\n\n    .kpi-card--live[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n      background: rgba(16, 185, 129, 0.12);\n      color: #10b981;\n    }\n\n    .kpi-content[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 4px;\n      min-width: 0;\n    }\n\n    .kpi-label[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--ag-color-text-secondary, #6b7280);\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      white-space: nowrap;\n    }\n\n    .kpi-value[_ngcontent-%COMP%] {\n      font-size: 28px;\n      font-weight: 700;\n      color: var(--ag-color-text-primary, #1f2937);\n      line-height: 1.2;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KpiCardComponent, [{
        type: Component,
        args: [{ selector: 'app-kpi-card', standalone: true, imports: [CommonModule], template: `
    <div class="kpi-card" [class]="'kpi-card--' + iconType">
      <div class="kpi-icon">
        <i [class]="getIconClass()"></i>
      </div>
      <div class="kpi-content">
        <span class="kpi-label">{{ label }}</span>
        <span class="kpi-value">{{ value | number }}</span>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .kpi-card {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 20px 24px;\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      transition: transform 0.2s, box-shadow 0.2s;\n    }\n\n    .kpi-card:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n    }\n\n    .kpi-icon {\n      width: 56px;\n      height: 56px;\n      border-radius: 12px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n\n    .kpi-icon i {\n      font-size: 24px;\n    }\n\n    /* Icon color variants */\n    .kpi-card--users .kpi-icon {\n      background: rgba(44, 95, 63, 0.12);\n      color: #2c5f3f;\n    }\n\n    .kpi-card--events .kpi-icon {\n      background: rgba(59, 130, 246, 0.12);\n      color: #3b82f6;\n    }\n\n    .kpi-card--products .kpi-icon {\n      background: rgba(139, 92, 246, 0.12);\n      color: #8b5cf6;\n    }\n\n    .kpi-card--low-stock .kpi-icon {\n      background: rgba(245, 158, 11, 0.12);\n      color: #f59e0b;\n    }\n\n    .kpi-card--pending .kpi-icon {\n      background: rgba(236, 72, 153, 0.12);\n      color: #ec4899;\n    }\n\n    .kpi-card--live .kpi-icon {\n      background: rgba(16, 185, 129, 0.12);\n      color: #10b981;\n    }\n\n    .kpi-content {\n      display: flex;\n      flex-direction: column;\n      gap: 4px;\n      min-width: 0;\n    }\n\n    .kpi-label {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--ag-color-text-secondary, #6b7280);\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      white-space: nowrap;\n    }\n\n    .kpi-value {\n      font-size: 28px;\n      font-weight: 700;\n      color: var(--ag-color-text-primary, #1f2937);\n      line-height: 1.2;\n    }\n  "] }]
    }], null, { label: [{
            type: Input
        }], value: [{
            type: Input
        }], iconType: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KpiCardComponent, { className: "KpiCardComponent", filePath: "src/app/pages/admin/admin-dashboard/components/kpi-card/kpi-card.component.ts", lineNumber: 109 }); })();
//# sourceMappingURL=kpi-card.component.js.map