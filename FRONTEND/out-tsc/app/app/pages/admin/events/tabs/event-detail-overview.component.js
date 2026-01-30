import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getRemainingPoints } from '../../../../models/event.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function EventDetailOverviewComponent_div_0_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, "Registration End Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(ctx_r0.event.registrationEndDateUtc));
} }
function EventDetailOverviewComponent_div_0_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, "Max Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.event.maxParticipants);
} }
function EventDetailOverviewComponent_div_0_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.event.location);
} }
function EventDetailOverviewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5);
    i0.ɵɵtext(5, "Event Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 6)(7, "div", 7)(8, "span", 8);
    i0.ɵɵtext(9, "Event Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 9);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 7)(13, "span", 8);
    i0.ɵɵtext(14, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 10);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 7)(18, "span", 8);
    i0.ɵɵtext(19, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 11);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(22, "div", 4)(23, "h3", 5);
    i0.ɵɵtext(24, "Event Dates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 6)(26, "div", 7)(27, "span", 8);
    i0.ɵɵtext(28, "Event Start Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 9);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(31, EventDetailOverviewComponent_div_0_div_31_Template, 5, 1, "div", 12)(32, EventDetailOverviewComponent_div_0_div_32_Template, 5, 1, "div", 12)(33, EventDetailOverviewComponent_div_0_div_33_Template, 5, 1, "div", 12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 13)(35, "div", 14)(36, "div", 15)(37, "div", 16);
    i0.ɵɵelement(38, "i", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 18)(40, "div", 19);
    i0.ɵɵtext(41, "Total Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 20);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "div", 15)(45, "div", 16);
    i0.ɵɵelement(46, "i", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 18)(48, "div", 19);
    i0.ɵɵtext(49, "Total Points Pool");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 20);
    i0.ɵɵtext(51);
    i0.ɵɵpipe(52, "number");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(53, "div", 4)(54, "h3", 5);
    i0.ɵɵtext(55, "Points Distribution Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "div", 22)(57, "div", 23);
    i0.ɵɵelement(58, "div", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 25)(60, "span", 26);
    i0.ɵɵtext(61, "Distributed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span", 27);
    i0.ɵɵtext(63);
    i0.ɵɵpipe(64, "number");
    i0.ɵɵpipe(65, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "div", 28);
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div", 29)(69, "span", 8);
    i0.ɵɵtext(70, "Remaining:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 9);
    i0.ɵɵtext(72);
    i0.ɵɵpipe(73, "number");
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r0.event.name);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("background-color", ctx_r0.getStatusColor(ctx_r0.event.status))("color", "#FFFFFF");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getStatusLabel(ctx_r0.event.status));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.event.description);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(ctx_r0.event.eventDate));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.event.registrationEndDateUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.event.maxParticipants);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.event.location);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r0.event.registeredCount || ctx_r0.event.participantCount || 0);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(52, 19, ctx_r0.event.totalPointsPool));
    i0.ɵɵadvance(7);
    i0.ɵɵstyleProp("width", ctx_r0.getDistributionPercentage(), "%");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(64, 21, ctx_r0.event.distributedPoints), " / ", i0.ɵɵpipeBind1(65, 23, ctx_r0.event.totalPointsPool));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getDistributionPercentage(), "% ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(73, 25, ctx_r0.getRemainingPoints()));
} }
export class EventDetailOverviewComponent {
    constructor() {
        // Public properties for template access
        this.Math = Math;
        this.event = null;
    }
    formatDate(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    formatDateTime(date) {
        if (!date)
            return '—';
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    getStatusColor(status) {
        const colors = {
            'Active': '#16A34A',
            'Draft': '#F59E0B',
            'Completed': '#EC4899',
            'Cancelled': '#EF4444'
        };
        return colors[status] || '#6B7280';
    }
    getStatusLabel(status) {
        const labels = {
            'Draft': 'Upcoming',
            'Active': 'Live',
            'Completed': 'Completed',
            'Cancelled': 'Cancelled'
        };
        return labels[status] || status;
    }
    getRemainingPoints() {
        if (!this.event)
            return 0;
        return getRemainingPoints(this.event);
    }
    getDistributionPercentage() {
        if (!this.event || !this.event.totalPointsPool || this.event.totalPointsPool === 0)
            return 0;
        return Math.round((this.event.distributedPoints / this.event.totalPointsPool) * 100);
    }
    static { this.ɵfac = function EventDetailOverviewComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventDetailOverviewComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventDetailOverviewComponent, selectors: [["app-event-detail-overview"]], inputs: { event: "event" }, decls: 1, vars: 1, consts: [["class", "overview-content", 4, "ngIf"], [1, "overview-content"], [1, "overview-grid"], [1, "overview-column", "left-column"], [1, "card"], [1, "card-title"], [1, "details-group"], [1, "detail-row"], [1, "label"], [1, "value"], [1, "value", "badge"], [1, "value", "description"], ["class", "detail-row", 4, "ngIf"], [1, "overview-column", "right-column"], [1, "summary-cards"], [1, "summary-card"], [1, "card-icon"], [1, "fa-solid", "fa-users"], [1, "card-info"], [1, "card-label"], [1, "card-value"], [1, "fa-solid", "fa-coins"], [1, "progress-container"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-info"], [1, "progress-label"], [1, "progress-value"], [1, "progress-percentage"], [1, "progress-remaining"]], template: function EventDetailOverviewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EventDetailOverviewComponent_div_0_Template, 74, 27, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.event);
        } }, dependencies: [CommonModule, i1.NgIf, i1.DecimalPipe], styles: [".overview-content[_ngcontent-%COMP%] { padding: 2rem; }\n.overview-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }\n.overview-column[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.5rem; }\n\n.card[_ngcontent-%COMP%] {\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n}\n\n.card-title[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--ag-color-text-primary);\n  border-bottom: 2px solid var(--ag-color-border-subtle);\n  padding-bottom: 0.75rem;\n}\n\n.details-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n.detail-row[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }\n.label[_ngcontent-%COMP%] { font-size: 0.9rem; color: var(--ag-color-text-secondary); font-weight: 600; min-width: 150px; text-align: right; }\n.value[_ngcontent-%COMP%] { flex: 1; font-size: 0.95rem; color: var(--ag-color-text-primary); }\n.value.description[_ngcontent-%COMP%] { color: var(--ag-color-text-secondary); line-height: 1.6; font-style: italic; }\n\n.value.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.4rem 0.8rem;\n  border-radius: 999px;\n  color: white;\n  font-weight: 600;\n  font-size: 0.85rem;\n  text-align: center;\n  min-width: auto;\n}\n\n.value.badge.draft[_ngcontent-%COMP%] { background-color: var(--ag-color-text-secondary); }\n.value.badge.active[_ngcontent-%COMP%] { background-color: var(--ag-color-support-success); }\n.value.badge.upcoming[_ngcontent-%COMP%] { background-color: var(--ag-color-support-info); }\n.value.badge.completed[_ngcontent-%COMP%] { background-color: var(--ag-color-support-undefined); }\n.value.badge.cancelled[_ngcontent-%COMP%] { background-color: var(--ag-color-support-error); }\n\n.value-copyable[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: var(--ag-color-field-01);\n  padding: 0.5rem;\n  border-radius: 4px;\n}\n\n.value-copyable[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] { font-family: monospace; font-size: 0.85rem; flex: 1; word-break: break-all; }\n.btn-copy[_ngcontent-%COMP%] { background: none; border: none; font-size: 1rem; cursor: pointer; padding: 0.25rem; transition: all 0.2s ease-in-out; }\n.btn-copy[_ngcontent-%COMP%]:hover { transform: scale(1.2); }\n\n.summary-cards[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }\n\n.summary-card[_ngcontent-%COMP%] {\n  background: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in-out;\n}\n\n.summary-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--ag-tag-green-bg);\n  color: var(--ag-button-primary);\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n\n.card-info[_ngcontent-%COMP%] { flex: 1; }\n.card-label[_ngcontent-%COMP%] { font-size: 0.85rem; color: var(--ag-color-text-secondary); font-weight: 600; margin-bottom: 0.25rem; }\n.card-value[_ngcontent-%COMP%] { font-size: 1.5rem; font-weight: 700; color: var(--ag-color-text-primary); }\n\n.progress-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 12px;\n  background-color: var(--ag-color-field-01);\n  border-radius: 999px;\n  overflow: hidden;\n  border: 1px solid var(--ag-color-border-subtle);\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--ag-button-primary);\n  transition: width 0.3s ease-in-out;\n}\n\n.progress-info[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; }\n.progress-label[_ngcontent-%COMP%] { font-size: 0.9rem; color: var(--ag-color-text-secondary); font-weight: 600; }\n.progress-value[_ngcontent-%COMP%] { font-size: 0.95rem; color: var(--ag-color-text-primary); font-weight: 600; }\n.progress-percentage[_ngcontent-%COMP%] { font-size: 1.25rem; font-weight: 700; color: var(--ag-button-primary); text-align: right; }\n\n@media (max-width: 1024px) {\n  .overview-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .summary-cards[_ngcontent-%COMP%] { grid-template-columns: repeat(3, 1fr); }\n}\n\n@media (max-width: 768px) {\n  .overview-content[_ngcontent-%COMP%] { padding: 1rem; }\n  .overview-grid[_ngcontent-%COMP%] { gap: 1rem; }\n  .card[_ngcontent-%COMP%] { padding: 1rem; }\n  .detail-row[_ngcontent-%COMP%] { flex-direction: column; }\n  .label[_ngcontent-%COMP%] { text-align: left; min-width: auto; }\n  .summary-cards[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }\n}\n\n@media (max-width: 480px) {\n  .summary-cards[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .card-icon[_ngcontent-%COMP%] { width: 40px; height: 40px; font-size: 1.5rem; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventDetailOverviewComponent, [{
        type: Component,
        args: [{ selector: 'app-event-detail-overview', standalone: true, imports: [CommonModule], template: "<div class=\"overview-content\" *ngIf=\"event\">\r\n  <div class=\"overview-grid\">\r\n    <!-- Left Column -->\r\n    <div class=\"overview-column left-column\">\r\n      <!-- Event Details Section -->\r\n      <div class=\"card\">\r\n        <h3 class=\"card-title\">Event Details</h3>\r\n        <div class=\"details-group\">\r\n          <div class=\"detail-row\">\r\n            <span class=\"label\">Event Name</span>\r\n            <span class=\"value\">{{ event.name }}</span>\r\n          </div>\r\n          <div class=\"detail-row\">\r\n            <span class=\"label\">Status</span>\r\n            <span class=\"value badge\" [style.backgroundColor]=\"getStatusColor(event.status)\" [style.color]=\"'#FFFFFF'\">{{ getStatusLabel(event.status) }}</span>\r\n          </div>\r\n          <div class=\"detail-row\">\r\n            <span class=\"label\">Description</span>\r\n            <p class=\"value description\">{{ event.description }}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Event Dates Section -->\r\n      <div class=\"card\">\r\n        <h3 class=\"card-title\">Event Dates</h3>\r\n        <div class=\"details-group\">\r\n          <div class=\"detail-row\">\r\n            <span class=\"label\">Event Start Date</span>\r\n            <span class=\"value\">{{ formatDate(event.eventDate) }}</span>\r\n          </div>\r\n          <div class=\"detail-row\" *ngIf=\"event.registrationEndDateUtc\">\r\n            <span class=\"label\">Registration End Date</span>\r\n            <span class=\"value\">{{ formatDate(event.registrationEndDateUtc) }}</span>\r\n          </div>\r\n          <div class=\"detail-row\" *ngIf=\"event.maxParticipants\">\r\n            <span class=\"label\">Max Participants</span>\r\n            <span class=\"value\">{{ event.maxParticipants }}</span>\r\n          </div>\r\n          <div class=\"detail-row\" *ngIf=\"event.location\">\r\n            <span class=\"label\">Location</span>\r\n            <span class=\"value\">{{ event.location }}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Right Column (Summary Cards) -->\r\n    <div class=\"overview-column right-column\">\r\n      <!-- Summary Cards - Only Total Participants and Total Points Pool -->\r\n      <div class=\"summary-cards\">\r\n        <div class=\"summary-card\">\r\n          <div class=\"card-icon\">\r\n            <i class=\"fa-solid fa-users\"></i>\r\n          </div>\r\n          <div class=\"card-info\">\r\n            <div class=\"card-label\">Total Participants</div>\r\n            <div class=\"card-value\">{{ event.registeredCount || event.participantCount || 0 }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"summary-card\">\r\n          <div class=\"card-icon\">\r\n            <i class=\"fa-solid fa-coins\"></i>\r\n          </div>\r\n          <div class=\"card-info\">\r\n            <div class=\"card-label\">Total Points Pool</div>\r\n            <div class=\"card-value\">{{ event.totalPointsPool | number }}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Progress Bar -->\r\n      <div class=\"card\">\r\n        <h3 class=\"card-title\">Points Distribution Progress</h3>\r\n        <div class=\"progress-container\">\r\n          <div class=\"progress-bar\">\r\n            <div \r\n              class=\"progress-fill\"\r\n              [style.width.%]=\"getDistributionPercentage()\"\r\n            ></div>\r\n          </div>\r\n          <div class=\"progress-info\">\r\n            <span class=\"progress-label\">Distributed</span>\r\n            <span class=\"progress-value\">{{ event.distributedPoints | number }} / {{ event.totalPointsPool | number }}</span>\r\n          </div>\r\n          <div class=\"progress-percentage\">\r\n            {{ getDistributionPercentage() }}%\r\n          </div>\r\n          <div class=\"progress-remaining\">\r\n            <span class=\"label\">Remaining:</span>\r\n            <span class=\"value\">{{ getRemainingPoints() | number }}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".overview-content { padding: 2rem; }\n.overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }\n.overview-column { display: flex; flex-direction: column; gap: 1.5rem; }\n\n.card {\n  background-color: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n}\n\n.card-title {\n  margin: 0 0 1rem 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--ag-color-text-primary);\n  border-bottom: 2px solid var(--ag-color-border-subtle);\n  padding-bottom: 0.75rem;\n}\n\n.details-group { display: flex; flex-direction: column; gap: 1rem; }\n.detail-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }\n.label { font-size: 0.9rem; color: var(--ag-color-text-secondary); font-weight: 600; min-width: 150px; text-align: right; }\n.value { flex: 1; font-size: 0.95rem; color: var(--ag-color-text-primary); }\n.value.description { color: var(--ag-color-text-secondary); line-height: 1.6; font-style: italic; }\n\n.value.badge {\n  display: inline-block;\n  padding: 0.4rem 0.8rem;\n  border-radius: 999px;\n  color: white;\n  font-weight: 600;\n  font-size: 0.85rem;\n  text-align: center;\n  min-width: auto;\n}\n\n.value.badge.draft { background-color: var(--ag-color-text-secondary); }\n.value.badge.active { background-color: var(--ag-color-support-success); }\n.value.badge.upcoming { background-color: var(--ag-color-support-info); }\n.value.badge.completed { background-color: var(--ag-color-support-undefined); }\n.value.badge.cancelled { background-color: var(--ag-color-support-error); }\n\n.value-copyable {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: var(--ag-color-field-01);\n  padding: 0.5rem;\n  border-radius: 4px;\n}\n\n.value-copyable .value { font-family: monospace; font-size: 0.85rem; flex: 1; word-break: break-all; }\n.btn-copy { background: none; border: none; font-size: 1rem; cursor: pointer; padding: 0.25rem; transition: all 0.2s ease-in-out; }\n.btn-copy:hover { transform: scale(1.2); }\n\n.summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }\n\n.summary-card {\n  background: var(--ag-color-layer-01);\n  border: 1px solid var(--ag-color-border-subtle);\n  border-radius: 8px;\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in-out;\n}\n\n.summary-card:hover {\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n\n.card-icon {\n  font-size: 1.75rem;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--ag-tag-green-bg);\n  color: var(--ag-button-primary);\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n\n.card-info { flex: 1; }\n.card-label { font-size: 0.85rem; color: var(--ag-color-text-secondary); font-weight: 600; margin-bottom: 0.25rem; }\n.card-value { font-size: 1.5rem; font-weight: 700; color: var(--ag-color-text-primary); }\n\n.progress-container { display: flex; flex-direction: column; gap: 1rem; }\n\n.progress-bar {\n  width: 100%;\n  height: 12px;\n  background-color: var(--ag-color-field-01);\n  border-radius: 999px;\n  overflow: hidden;\n  border: 1px solid var(--ag-color-border-subtle);\n}\n\n.progress-fill {\n  height: 100%;\n  background: var(--ag-button-primary);\n  transition: width 0.3s ease-in-out;\n}\n\n.progress-info { display: flex; justify-content: space-between; align-items: center; }\n.progress-label { font-size: 0.9rem; color: var(--ag-color-text-secondary); font-weight: 600; }\n.progress-value { font-size: 0.95rem; color: var(--ag-color-text-primary); font-weight: 600; }\n.progress-percentage { font-size: 1.25rem; font-weight: 700; color: var(--ag-button-primary); text-align: right; }\n\n@media (max-width: 1024px) {\n  .overview-grid { grid-template-columns: 1fr; }\n  .summary-cards { grid-template-columns: repeat(3, 1fr); }\n}\n\n@media (max-width: 768px) {\n  .overview-content { padding: 1rem; }\n  .overview-grid { gap: 1rem; }\n  .card { padding: 1rem; }\n  .detail-row { flex-direction: column; }\n  .label { text-align: left; min-width: auto; }\n  .summary-cards { grid-template-columns: 1fr 1fr; }\n}\n\n@media (max-width: 480px) {\n  .summary-cards { grid-template-columns: 1fr; }\n  .card-icon { width: 40px; height: 40px; font-size: 1.5rem; }\n}\n"] }]
    }], null, { event: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventDetailOverviewComponent, { className: "EventDetailOverviewComponent", filePath: "src/app/pages/admin/events/tabs/event-detail-overview.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=event-detail-overview.component.js.map