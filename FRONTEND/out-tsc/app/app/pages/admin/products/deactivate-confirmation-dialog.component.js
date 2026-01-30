import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["dialogContainer"];
const _c1 = ["cancelButton"];
const _c2 = ["confirmButton"];
function DeactivateConfirmationDialogComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "This product still has ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " in stock.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r1.data == null ? null : ctx_r1.data.stock, " unit", (ctx_r1.data == null ? null : ctx_r1.data.stock) !== 1 ? "s" : "");
} }
function DeactivateConfirmationDialogComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "i", 24);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, " Had ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " by ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " in the last ");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11, "7 days");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, ". ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r1.data == null ? null : ctx_r1.data.recentRedemptions7d, " redemption", (ctx_r1.data == null ? null : ctx_r1.data.recentRedemptions7d) !== 1 ? "s" : "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.data == null ? null : ctx_r1.data.recentUniqueUsers7d, " user", (ctx_r1.data == null ? null : ctx_r1.data.recentUniqueUsers7d) !== 1 ? "s" : "");
} }
function DeactivateConfirmationDialogComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "i", 26);
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " by ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " in the last ");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "30 days");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, ". ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r1.data == null ? null : ctx_r1.data.recentRedemptions30d, " total redemption", (ctx_r1.data == null ? null : ctx_r1.data.recentRedemptions30d) !== 1 ? "s" : "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.data == null ? null : ctx_r1.data.recentUniqueUsers30d, " user", (ctx_r1.data == null ? null : ctx_r1.data.recentUniqueUsers30d) !== 1 ? "s" : "");
} }
export class DeactivateConfirmationDialogComponent {
    constructor() {
        this.data = null;
        this.confirm = new EventEmitter();
        this.cancel = new EventEmitter();
        this.announcement = '';
        this.previousActiveElement = null;
        this.focusableElements = [];
    }
    // Computed properties for null-safe template conditions
    get hasStock() {
        return !!this.data?.stock && this.data.stock > 0;
    }
    get hasRecentRedemptions() {
        return !!this.data?.recentRedemptions7d && this.data.recentRedemptions7d > 0;
    }
    get hasMoreRedemptions30d() {
        const r30d = this.data?.recentRedemptions30d ?? 0;
        const r7d = this.data?.recentRedemptions7d ?? 0;
        return r30d > r7d;
    }
    ngAfterViewInit() {
        // Store previously focused element
        this.previousActiveElement = document.activeElement;
        // Focus the dialog container for keyboard navigation
        setTimeout(() => {
            if (this.cancelButton) {
                this.cancelButton.nativeElement.focus();
            }
            this.setupFocusTrap();
            this.announce('Deactivation warning dialog opened. Review the warnings and choose an action.');
        }, 0);
    }
    ngOnDestroy() {
        // Restore focus to previous element
        if (this.previousActiveElement instanceof HTMLElement) {
            this.previousActiveElement.focus();
        }
    }
    setupFocusTrap() {
        if (!this.dialogContainer)
            return;
        const container = this.dialogContainer.nativeElement;
        this.focusableElements = Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    }
    onKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.onCancel();
            return;
        }
        if (event.key === 'Tab') {
            this.handleTabKey(event);
        }
        if (event.key === 'Enter' && event.target === this.confirmButton?.nativeElement) {
            event.preventDefault();
            this.onConfirm();
        }
    }
    handleTabKey(event) {
        if (this.focusableElements.length === 0)
            return;
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];
        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
        else {
            // Tab
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
    onOverlayClick(event) {
        // Only close if clicking on the overlay itself, not the dialog
        if (event.target === event.currentTarget) {
            this.onCancel();
        }
    }
    onConfirm() {
        this.announce('Deactivating product...');
        this.confirm.emit();
    }
    onCancel() {
        this.announce('Deactivation cancelled.');
        this.cancel.emit();
    }
    announce(message) {
        this.announcement = '';
        setTimeout(() => {
            this.announcement = message;
        }, 100);
    }
    static { this.ɵfac = function DeactivateConfirmationDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DeactivateConfirmationDialogComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DeactivateConfirmationDialogComponent, selectors: [["app-deactivate-confirmation-dialog"]], viewQuery: function DeactivateConfirmationDialogComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5)(_c2, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogContainer = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.cancelButton = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.confirmButton = _t.first);
        } }, inputs: { data: "data" }, outputs: { confirm: "confirm", cancel: "cancel" }, decls: 32, vars: 5, consts: [["dialogContainer", ""], ["cancelButton", ""], ["confirmButton", ""], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "dialog-title", "aria-describedby", "dialog-description", 1, "dialog-overlay", 3, "click", "keydown"], ["tabindex", "-1", 1, "dialog-container"], [1, "dialog-header"], [1, "warning-icon"], [1, "fa-solid", "fa-triangle-exclamation"], ["id", "dialog-title", 1, "dialog-title"], ["type", "button", "aria-label", "Close dialog", 1, "close-btn", 3, "click"], [1, "fa-solid", "fa-xmark"], ["id", "dialog-description", 1, "dialog-body"], [1, "warning-text"], [1, "warning-details"], ["class", "warning-item", 4, "ngIf"], ["class", "warning-item secondary", 4, "ngIf"], [1, "confirmation-question"], [1, "dialog-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "fa-solid", "fa-ban"], ["aria-live", "polite", "aria-atomic", "true", 1, "sr-only"], [1, "warning-item"], [1, "fa-solid", "fa-boxes-stacked", "warning-icon-sm"], [1, "fa-solid", "fa-chart-line", "warning-icon-sm"], [1, "warning-item", "secondary"], [1, "fa-solid", "fa-calendar-days", "warning-icon-sm"]], template: function DeactivateConfirmationDialogComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3);
            i0.ɵɵlistener("click", function DeactivateConfirmationDialogComponent_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onOverlayClick($event)); })("keydown", function DeactivateConfirmationDialogComponent_Template_div_keydown_0_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onKeyDown($event)); });
            i0.ɵɵelementStart(1, "div", 4, 0)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelement(5, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h2", 8);
            i0.ɵɵtext(7, "Deactivation Warning");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 9);
            i0.ɵɵlistener("click", function DeactivateConfirmationDialogComponent_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCancel()); });
            i0.ɵɵelement(9, "i", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 11)(11, "p", 12);
            i0.ɵɵtext(12, " You are about to deactivate ");
            i0.ɵɵelementStart(13, "strong");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(15, ". ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 13);
            i0.ɵɵtemplate(17, DeactivateConfirmationDialogComponent_div_17_Template, 7, 2, "div", 14)(18, DeactivateConfirmationDialogComponent_div_18_Template, 13, 4, "div", 14)(19, DeactivateConfirmationDialogComponent_div_19_Template, 12, 4, "div", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "p", 16);
            i0.ɵɵtext(21, " Are you sure you want to deactivate this product? ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 17)(23, "button", 18, 1);
            i0.ɵɵlistener("click", function DeactivateConfirmationDialogComponent_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCancel()); });
            i0.ɵɵtext(25, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 19, 2);
            i0.ɵɵlistener("click", function DeactivateConfirmationDialogComponent_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onConfirm()); });
            i0.ɵɵelement(28, "i", 20);
            i0.ɵɵtext(29, " Deactivate anyway ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 21);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.data == null ? null : ctx.data.productName);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.hasStock);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasRecentRedemptions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasMoreRedemptions30d);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1(" ", ctx.announcement, " ");
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".dialog-overlay[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1000;\n      animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .dialog-container[_ngcontent-%COMP%] {\n      background: white;\n      border-radius: 12px;\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n      max-width: 480px;\n      width: 90%;\n      max-height: 90vh;\n      overflow: hidden;\n      animation: _ngcontent-%COMP%_slideIn 0.2s ease-out;\n    }\n\n    @keyframes _ngcontent-%COMP%_slideIn {\n      from { \n        opacity: 0;\n        transform: translateY(-20px) scale(0.95);\n      }\n      to { \n        opacity: 1;\n        transform: translateY(0) scale(1);\n      }\n    }\n\n    .dialog-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      padding: 16px 20px;\n      border-bottom: 1px solid #e5e7eb;\n      gap: 12px;\n    }\n\n    .warning-icon[_ngcontent-%COMP%] {\n      width: 40px;\n      height: 40px;\n      background: #fef3c7;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #d97706;\n      font-size: 18px;\n      flex-shrink: 0;\n    }\n\n    .dialog-title[_ngcontent-%COMP%] {\n      flex: 1;\n      margin: 0;\n      font-size: 18px;\n      font-weight: 600;\n      color: #1f2937;\n    }\n\n    .close-btn[_ngcontent-%COMP%] {\n      background: none;\n      border: none;\n      cursor: pointer;\n      padding: 8px;\n      color: #6b7280;\n      border-radius: 6px;\n      transition: all 0.15s;\n    }\n\n    .close-btn[_ngcontent-%COMP%]:hover {\n      background: #f3f4f6;\n      color: #374151;\n    }\n\n    .close-btn[_ngcontent-%COMP%]:focus {\n      outline: 2px solid #3b82f6;\n      outline-offset: 2px;\n    }\n\n    .dialog-body[_ngcontent-%COMP%] {\n      padding: 20px;\n    }\n\n    .warning-text[_ngcontent-%COMP%] {\n      margin: 0 0 16px 0;\n      color: #374151;\n      font-size: 15px;\n    }\n\n    .warning-details[_ngcontent-%COMP%] {\n      background: #fffbeb;\n      border: 1px solid #fcd34d;\n      border-radius: 8px;\n      padding: 16px;\n      margin-bottom: 16px;\n    }\n\n    .warning-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n      color: #92400e;\n      font-size: 14px;\n      line-height: 1.5;\n    }\n\n    .warning-item[_ngcontent-%COMP%]    + .warning-item[_ngcontent-%COMP%] {\n      margin-top: 12px;\n      padding-top: 12px;\n      border-top: 1px solid #fde68a;\n    }\n\n    .warning-item.secondary[_ngcontent-%COMP%] {\n      color: #78716c;\n      font-size: 13px;\n    }\n\n    .warning-icon-sm[_ngcontent-%COMP%] {\n      margin-top: 2px;\n      flex-shrink: 0;\n      width: 16px;\n    }\n\n    .confirmation-question[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #4b5563;\n      font-size: 14px;\n      font-weight: 500;\n    }\n\n    .dialog-footer[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn[_ngcontent-%COMP%] {\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .btn[_ngcontent-%COMP%]:focus {\n      outline: 2px solid #3b82f6;\n      outline-offset: 2px;\n    }\n\n    .btn-secondary[_ngcontent-%COMP%] {\n      background: white;\n      border: 1px solid #d1d5db;\n      color: #374151;\n    }\n\n    .btn-secondary[_ngcontent-%COMP%]:hover {\n      background: #f3f4f6;\n      border-color: #9ca3af;\n    }\n\n    .btn-danger[_ngcontent-%COMP%] {\n      background: #dc2626;\n      border: 1px solid #dc2626;\n      color: white;\n    }\n\n    .btn-danger[_ngcontent-%COMP%]:hover {\n      background: #b91c1c;\n      border-color: #b91c1c;\n    }\n\n    .sr-only[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 1px;\n      height: 1px;\n      padding: 0;\n      margin: -1px;\n      overflow: hidden;\n      clip: rect(0, 0, 0, 0);\n      white-space: nowrap;\n      border: 0;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DeactivateConfirmationDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-deactivate-confirmation-dialog', standalone: true, imports: [CommonModule], template: `
    <div 
      class="dialog-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      (click)="onOverlayClick($event)"
      (keydown)="onKeyDown($event)">
      
      <div class="dialog-container" #dialogContainer tabindex="-1">
        <!-- Header -->
        <div class="dialog-header">
          <div class="warning-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h2 id="dialog-title" class="dialog-title">Deactivation Warning</h2>
          <button 
            type="button" 
            class="close-btn" 
            (click)="onCancel()"
            aria-label="Close dialog">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="dialog-body" id="dialog-description">
          <p class="warning-text">
            You are about to deactivate <strong>{{ data?.productName }}</strong>.
          </p>
          
          <div class="warning-details">
            <!-- Stock Warning -->
            <div class="warning-item" *ngIf="hasStock">
              <i class="fa-solid fa-boxes-stacked warning-icon-sm"></i>
              <span>This product still has <strong>{{ data?.stock }} unit{{ data?.stock !== 1 ? 's' : '' }}</strong> in stock.</span>
            </div>

            <!-- Recent Demand Warning -->
            <div class="warning-item" *ngIf="hasRecentRedemptions">
              <i class="fa-solid fa-chart-line warning-icon-sm"></i>
              <span>
                Had <strong>{{ data?.recentRedemptions7d }} redemption{{ data?.recentRedemptions7d !== 1 ? 's' : '' }}</strong> 
                by <strong>{{ data?.recentUniqueUsers7d }} user{{ data?.recentUniqueUsers7d !== 1 ? 's' : '' }}</strong> 
                in the last <strong>7 days</strong>.
              </span>
            </div>

            <!-- 30-day stats if different -->
            <div class="warning-item secondary" *ngIf="hasMoreRedemptions30d">
              <i class="fa-solid fa-calendar-days warning-icon-sm"></i>
              <span>
                <strong>{{ data?.recentRedemptions30d }} total redemption{{ data?.recentRedemptions30d !== 1 ? 's' : '' }}</strong> 
                by <strong>{{ data?.recentUniqueUsers30d }} user{{ data?.recentUniqueUsers30d !== 1 ? 's' : '' }}</strong> 
                in the last <strong>30 days</strong>.
              </span>
            </div>
          </div>

          <p class="confirmation-question">
            Are you sure you want to deactivate this product?
          </p>
        </div>

        <!-- Footer -->
        <div class="dialog-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            (click)="onCancel()"
            #cancelButton>
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-danger" 
            (click)="onConfirm()"
            #confirmButton>
            <i class="fa-solid fa-ban"></i>
            Deactivate anyway
          </button>
        </div>
      </div>

      <!-- Live region for screen readers -->
      <div class="sr-only" aria-live="polite" aria-atomic="true">
        {{ announcement }}
      </div>
    </div>
  `, styles: ["\n    .dialog-overlay {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1000;\n      animation: fadeIn 0.15s ease-out;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    .dialog-container {\n      background: white;\n      border-radius: 12px;\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n      max-width: 480px;\n      width: 90%;\n      max-height: 90vh;\n      overflow: hidden;\n      animation: slideIn 0.2s ease-out;\n    }\n\n    @keyframes slideIn {\n      from { \n        opacity: 0;\n        transform: translateY(-20px) scale(0.95);\n      }\n      to { \n        opacity: 1;\n        transform: translateY(0) scale(1);\n      }\n    }\n\n    .dialog-header {\n      display: flex;\n      align-items: center;\n      padding: 16px 20px;\n      border-bottom: 1px solid #e5e7eb;\n      gap: 12px;\n    }\n\n    .warning-icon {\n      width: 40px;\n      height: 40px;\n      background: #fef3c7;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #d97706;\n      font-size: 18px;\n      flex-shrink: 0;\n    }\n\n    .dialog-title {\n      flex: 1;\n      margin: 0;\n      font-size: 18px;\n      font-weight: 600;\n      color: #1f2937;\n    }\n\n    .close-btn {\n      background: none;\n      border: none;\n      cursor: pointer;\n      padding: 8px;\n      color: #6b7280;\n      border-radius: 6px;\n      transition: all 0.15s;\n    }\n\n    .close-btn:hover {\n      background: #f3f4f6;\n      color: #374151;\n    }\n\n    .close-btn:focus {\n      outline: 2px solid #3b82f6;\n      outline-offset: 2px;\n    }\n\n    .dialog-body {\n      padding: 20px;\n    }\n\n    .warning-text {\n      margin: 0 0 16px 0;\n      color: #374151;\n      font-size: 15px;\n    }\n\n    .warning-details {\n      background: #fffbeb;\n      border: 1px solid #fcd34d;\n      border-radius: 8px;\n      padding: 16px;\n      margin-bottom: 16px;\n    }\n\n    .warning-item {\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n      color: #92400e;\n      font-size: 14px;\n      line-height: 1.5;\n    }\n\n    .warning-item + .warning-item {\n      margin-top: 12px;\n      padding-top: 12px;\n      border-top: 1px solid #fde68a;\n    }\n\n    .warning-item.secondary {\n      color: #78716c;\n      font-size: 13px;\n    }\n\n    .warning-icon-sm {\n      margin-top: 2px;\n      flex-shrink: 0;\n      width: 16px;\n    }\n\n    .confirmation-question {\n      margin: 0;\n      color: #4b5563;\n      font-size: 14px;\n      font-weight: 500;\n    }\n\n    .dialog-footer {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n      padding: 16px 20px;\n      border-top: 1px solid #e5e7eb;\n      background: #f9fafb;\n    }\n\n    .btn {\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .btn:focus {\n      outline: 2px solid #3b82f6;\n      outline-offset: 2px;\n    }\n\n    .btn-secondary {\n      background: white;\n      border: 1px solid #d1d5db;\n      color: #374151;\n    }\n\n    .btn-secondary:hover {\n      background: #f3f4f6;\n      border-color: #9ca3af;\n    }\n\n    .btn-danger {\n      background: #dc2626;\n      border: 1px solid #dc2626;\n      color: white;\n    }\n\n    .btn-danger:hover {\n      background: #b91c1c;\n      border-color: #b91c1c;\n    }\n\n    .sr-only {\n      position: absolute;\n      width: 1px;\n      height: 1px;\n      padding: 0;\n      margin: -1px;\n      overflow: hidden;\n      clip: rect(0, 0, 0, 0);\n      white-space: nowrap;\n      border: 0;\n    }\n  "] }]
    }], null, { data: [{
            type: Input
        }], confirm: [{
            type: Output
        }], cancel: [{
            type: Output
        }], dialogContainer: [{
            type: ViewChild,
            args: ['dialogContainer']
        }], cancelButton: [{
            type: ViewChild,
            args: ['cancelButton']
        }], confirmButton: [{
            type: ViewChild,
            args: ['confirmButton']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DeactivateConfirmationDialogComponent, { className: "DeactivateConfirmationDialogComponent", filePath: "src/app/pages/admin/products/deactivate-confirmation-dialog.component.ts", lineNumber: 312 }); })();
//# sourceMappingURL=deactivate-confirmation-dialog.component.js.map