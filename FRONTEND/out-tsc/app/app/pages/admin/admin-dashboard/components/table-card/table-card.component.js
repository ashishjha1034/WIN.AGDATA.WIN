import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
const _c0 = ["*"];
function TableCardComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
function TableCardComponent_a_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵtext(1, " View All ");
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", ctx_r0.viewAllLink);
} }
export class TableCardComponent {
    constructor() {
        this.title = '';
    }
    static { this.ɵfac = function TableCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TableCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TableCardComponent, selectors: [["app-table-card"]], inputs: { title: "title", subtitle: "subtitle", viewAllLink: "viewAllLink" }, ngContentSelectors: _c0, decls: 9, vars: 3, consts: [[1, "table-card"], [1, "table-card__header"], [1, "table-card__title-group"], [1, "table-card__title"], ["class", "table-card__subtitle", 4, "ngIf"], ["class", "table-card__link", 3, "routerLink", 4, "ngIf"], [1, "table-card__body"], [1, "table-card__subtitle"], [1, "table-card__link", 3, "routerLink"], [1, "fa-solid", "fa-arrow-right"]], template: function TableCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h3", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, TableCardComponent_p_5_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, TableCardComponent_a_6_Template, 3, 1, "a", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 6);
            i0.ɵɵprojection(8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.subtitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewAllLink);
        } }, dependencies: [CommonModule, i1.NgIf, RouterModule, i2.RouterLink], styles: [".table-card[_ngcontent-%COMP%] {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      display: flex;\n      flex-direction: column;\n    }\n\n    .table-card__header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      margin-bottom: 16px;\n    }\n\n    .table-card__title-group[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .table-card__title[_ngcontent-%COMP%] {\n      font-size: 16px;\n      font-weight: 600;\n      color: var(--ag-color-text-primary, #1f2937);\n      margin: 0;\n    }\n\n    .table-card__subtitle[_ngcontent-%COMP%] {\n      font-size: 13px;\n      color: var(--ag-color-text-secondary, #6b7280);\n      margin: 0;\n    }\n\n    .table-card__link[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: #2c5f3f;\n      text-decoration: none;\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      white-space: nowrap;\n      transition: color 0.2s;\n    }\n\n    .table-card__link[_ngcontent-%COMP%]:hover {\n      color: #1e4620;\n    }\n\n    .table-card__link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 11px;\n    }\n\n    .table-card__body[_ngcontent-%COMP%] {\n      max-height: 220px;\n      overflow-y: auto;\n    }\n\n    \n\n    .table-card__body[_ngcontent-%COMP%]::-webkit-scrollbar {\n      width: 6px;\n    }\n\n    .table-card__body[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n      background: #f1f5f9;\n      border-radius: 3px;\n    }\n\n    .table-card__body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n      background: #cbd5e1;\n      border-radius: 3px;\n    }\n\n    .table-card__body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n      background: #94a3b8;\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TableCardComponent, [{
        type: Component,
        args: [{ selector: 'app-table-card', standalone: true, imports: [CommonModule, RouterModule], template: `
    <div class="table-card">
      <div class="table-card__header">
        <div class="table-card__title-group">
          <h3 class="table-card__title">{{ title }}</h3>
          <p class="table-card__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <a *ngIf="viewAllLink" [routerLink]="viewAllLink" class="table-card__link">
          View All <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <div class="table-card__body">
        <ng-content></ng-content>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .table-card {\n      background: var(--ag-color-layer-01, #ffffff);\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);\n      display: flex;\n      flex-direction: column;\n    }\n\n    .table-card__header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      margin-bottom: 16px;\n    }\n\n    .table-card__title-group {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .table-card__title {\n      font-size: 16px;\n      font-weight: 600;\n      color: var(--ag-color-text-primary, #1f2937);\n      margin: 0;\n    }\n\n    .table-card__subtitle {\n      font-size: 13px;\n      color: var(--ag-color-text-secondary, #6b7280);\n      margin: 0;\n    }\n\n    .table-card__link {\n      font-size: 13px;\n      font-weight: 500;\n      color: #2c5f3f;\n      text-decoration: none;\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      white-space: nowrap;\n      transition: color 0.2s;\n    }\n\n    .table-card__link:hover {\n      color: #1e4620;\n    }\n\n    .table-card__link i {\n      font-size: 11px;\n    }\n\n    .table-card__body {\n      max-height: 220px;\n      overflow-y: auto;\n    }\n\n    /* Scrollbar styling */\n    .table-card__body::-webkit-scrollbar {\n      width: 6px;\n    }\n\n    .table-card__body::-webkit-scrollbar-track {\n      background: #f1f5f9;\n      border-radius: 3px;\n    }\n\n    .table-card__body::-webkit-scrollbar-thumb {\n      background: #cbd5e1;\n      border-radius: 3px;\n    }\n\n    .table-card__body::-webkit-scrollbar-thumb:hover {\n      background: #94a3b8;\n    }\n  "] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], viewAllLink: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TableCardComponent, { className: "TableCardComponent", filePath: "src/app/pages/admin/admin-dashboard/components/table-card/table-card.component.ts", lineNumber: 108 }); })();
//# sourceMappingURL=table-card.component.js.map