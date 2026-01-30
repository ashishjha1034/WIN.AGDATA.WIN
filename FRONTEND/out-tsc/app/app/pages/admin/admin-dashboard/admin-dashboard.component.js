import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
// ECharts imports - tree-shaken
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
// Components
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { TableCardComponent } from './components/table-card/table-card.component';
// Models
import { RedemptionStatus } from '../../../models/redemption.models';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/auth.service";
import * as i2 from "../../../services/dashboard.service";
import * as i3 from "../../../services/redemption.service";
import * as i4 from "../../../services/event.service";
import * as i5 from "../../../services/products.service";
import * as i6 from "@angular/common";
function AdminDashboardComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "span", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 13);
    i0.ɵɵelement(4, "i", 14);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.lastName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.roles == null ? null : ctx_r0.currentUser.roles[0]) || "Admin", " ");
} }
function AdminDashboardComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 17);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.errorMessage = null); });
    i0.ɵɵelement(5, "i", 18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function AdminDashboardComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelement(1, "div", 20);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading dashboard data...");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelement(1, "div", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r0.redemptionsChartOption);
} }
function AdminDashboardComponent_ng_container_12_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No redemption data available");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelement(1, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r0.eventsChartOption);
} }
function AdminDashboardComponent_ng_container_12_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No event data available");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_table_19_tr_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 48);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 49);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 50);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const redemption_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r3.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(redemption_r3.productName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 3, redemption_r3.requestDate, "MMM d, yyyy"));
} }
function AdminDashboardComponent_ng_container_12_table_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Request Date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "tbody");
    i0.ɵɵtemplate(10, AdminDashboardComponent_ng_container_12_table_19_tr_10_Template, 8, 6, "tr", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r0.pendingRedemptionsList);
} }
function AdminDashboardComponent_ng_container_12_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No pending redemptions");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_table_22_tr_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 54)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const product_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r4.category);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.getStockBadgeClass(product_r4.stockCount));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", product_r4.stockCount === 0 ? "Out of Stock" : product_r4.stockCount + " left", " ");
} }
function AdminDashboardComponent_ng_container_12_table_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Stock Count");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "tbody");
    i0.ɵɵtemplate(10, AdminDashboardComponent_ng_container_12_table_22_tr_10_Template, 8, 5, "tr", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r0.lowStockProductsList);
} }
function AdminDashboardComponent_ng_container_12_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "All products are well stocked");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_table_25_tr_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 56);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 57)(4, "div", 58)(5, "div", 59);
    i0.ɵɵelement(6, "div", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 61);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const event_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r5.name);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("width", event_r5.awardedPercent, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formatDistributionLabel(event_r5));
} }
function AdminDashboardComponent_ng_container_12_table_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 46)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Event Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Points Distributed %");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "tbody");
    i0.ɵɵtemplate(8, AdminDashboardComponent_ng_container_12_table_25_tr_8_Template, 9, 4, "tr", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r0.liveEventsList);
} }
function AdminDashboardComponent_ng_container_12_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No live events at the moment");
    i0.ɵɵelementEnd()();
} }
function AdminDashboardComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 21)(2, "div", 22);
    i0.ɵɵelement(3, "app-kpi-card", 23)(4, "app-kpi-card", 24)(5, "app-kpi-card", 25)(6, "app-kpi-card", 26)(7, "app-kpi-card", 27)(8, "app-kpi-card", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "section", 29)(10, "div", 30)(11, "app-chart-card", 31);
    i0.ɵɵtemplate(12, AdminDashboardComponent_ng_container_12_div_12_Template, 2, 1, "div", 32)(13, AdminDashboardComponent_ng_container_12_div_13_Template, 4, 0, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "app-chart-card", 34);
    i0.ɵɵtemplate(15, AdminDashboardComponent_ng_container_12_div_15_Template, 2, 1, "div", 32)(16, AdminDashboardComponent_ng_container_12_div_16_Template, 4, 0, "div", 33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "section", 35)(18, "app-table-card", 36);
    i0.ɵɵtemplate(19, AdminDashboardComponent_ng_container_12_table_19_Template, 11, 1, "table", 37)(20, AdminDashboardComponent_ng_container_12_div_20_Template, 4, 0, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "app-table-card", 39);
    i0.ɵɵtemplate(22, AdminDashboardComponent_ng_container_12_table_22_Template, 11, 1, "table", 37)(23, AdminDashboardComponent_ng_container_12_div_23_Template, 4, 0, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "app-table-card", 40);
    i0.ɵɵtemplate(25, AdminDashboardComponent_ng_container_12_table_25_Template, 9, 1, "table", 37)(26, AdminDashboardComponent_ng_container_12_div_26_Template, 4, 0, "div", 38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r0.kpiData.totalUsers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r0.kpiData.totalEvents);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r0.kpiData.totalProducts);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r0.kpiData.lowStockProducts);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r0.kpiData.pendingRedemptions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r0.kpiData.liveEvents);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.redemptionsChartOption);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.redemptionStatusCounts.approved && !ctx_r0.redemptionStatusCounts.pending && !ctx_r0.redemptionStatusCounts.delivered && !ctx_r0.redemptionStatusCounts.rejected);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.eventsChartOption);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.eventStatusCounts.upcoming && !ctx_r0.eventStatusCounts.live && !ctx_r0.eventStatusCounts.completed && !ctx_r0.eventStatusCounts.cancelled);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.pendingRedemptionsList.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.pendingRedemptionsList.length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.lowStockProductsList.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.lowStockProductsList.length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.liveEventsList.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.liveEventsList.length === 0);
} }
export class AdminDashboardComponent {
    constructor(authService, dashboardService, redemptionService, eventService, productsService, cdr) {
        this.authService = authService;
        this.dashboardService = dashboardService;
        this.redemptionService = redemptionService;
        this.eventService = eventService;
        this.productsService = productsService;
        this.cdr = cdr;
        this.isLoading = true;
        this.errorMessage = null;
        // KPI Data
        this.kpiData = {
            totalUsers: 0,
            totalEvents: 0,
            totalProducts: 0,
            lowStockProducts: 0,
            pendingRedemptions: 0,
            liveEvents: 0
        };
        // Chart Data
        this.redemptionStatusCounts = {
            approved: 0,
            pending: 0,
            delivered: 0,
            rejected: 0,
            cancelled: 0
        };
        this.eventStatusCounts = {
            upcoming: 0,
            live: 0,
            completed: 0,
            cancelled: 0
        };
        // Table Data
        this.pendingRedemptionsList = [];
        this.lowStockProductsList = [];
        this.liveEventsList = [];
        // ECharts options
        this.redemptionsChartOption = {};
        this.eventsChartOption = {};
        // Theme colors
        this.chartColors = {
            approved: '#2c5f3f', // Green
            pending: '#f59e0b', // Amber
            delivered: '#6b7280', // Gray
            rejected: '#ef4444', // Red
            upcoming: '#0891b2', // Teal
            live: '#10b981', // Emerald
            completed: '#94a3b8', // Slate
            cancelled: '#dc2626' // Red
        };
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            this.cdr.markForCheck();
        });
        this.loadDashboardData();
    }
    loadDashboardData() {
        this.isLoading = true;
        this.errorMessage = null;
        // Parallel data fetching with forkJoin
        forkJoin({
            stats: this.dashboardService.getStats().pipe(catchError(() => of(null))),
            redemptions: this.redemptionService.getAllRedemptions().pipe(catchError(() => of(null))),
            events: this.eventService.getEvents().pipe(catchError(() => of([]))),
            products: this.productsService.getAllProductsAdmin().pipe(catchError(() => of([]))),
            lowStock: this.dashboardService.getLowStockProducts().pipe(catchError(() => of([])))
        }).pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (data) => {
                this.processStats(data.stats);
                this.processRedemptions(data.redemptions);
                this.processEvents(data.events);
                this.processProducts(data.products, data.lowStock);
                this.updateCharts();
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('[Dashboard] Error loading data:', error);
                this.errorMessage = 'Failed to load dashboard data. Please try again.';
                this.isLoading = false;
                this.cdr.markForCheck();
            }
        });
    }
    processStats(stats) {
        if (stats) {
            this.kpiData.totalUsers = stats.totalUsers;
            this.kpiData.pendingRedemptions = stats.pendingRedemptions;
        }
    }
    processRedemptions(redemptions) {
        if (!redemptions)
            return;
        // Use counts from response if available
        if (redemptions.counts) {
            this.redemptionStatusCounts = {
                approved: redemptions.counts.approved || 0,
                pending: redemptions.counts.pending || 0,
                delivered: redemptions.counts.delivered || 0,
                rejected: redemptions.counts.rejected || 0,
                cancelled: redemptions.counts.cancelled || 0
            };
            this.kpiData.pendingRedemptions = this.redemptionStatusCounts.pending;
        }
        // Process pending redemptions for table
        const pendingItems = (redemptions.items || [])
            .filter(r => r.status === RedemptionStatus.Pending)
            .sort((a, b) => b.pointsSpent - a.pointsSpent)
            .slice(0, 10);
        this.pendingRedemptionsList = pendingItems.map(r => ({
            id: r.id,
            userName: r.userName || 'Unknown User',
            productName: r.productName || 'Unknown Product',
            requestDate: r.createdAt,
            pointsSpent: r.pointsSpent
        }));
    }
    processEvents(events) {
        if (!events)
            return;
        // Count events by status
        const statusCounts = { upcoming: 0, live: 0, completed: 0, cancelled: 0 };
        events.forEach(event => {
            const status = this.mapEventStatus(event.status);
            if (status in statusCounts) {
                statusCounts[status]++;
            }
        });
        this.eventStatusCounts = statusCounts;
        this.kpiData.totalEvents = events.length;
        this.kpiData.liveEvents = statusCounts.live;
        // Process live events for table
        const liveEvents = events
            .filter(e => this.mapEventStatus(e.status) === 'live')
            .map(e => {
            const pool = e.totalPointsPool || 0;
            const distributed = e.distributedPoints || 0;
            const percent = pool > 0 ? Math.round((distributed / pool) * 100) : 0;
            return {
                id: e.id,
                name: e.name,
                awardedPercent: percent,
                distributedPoints: distributed,
                totalPointsPool: pool
            };
        })
            .sort((a, b) => a.awardedPercent - b.awardedPercent)
            .slice(0, 10);
        this.liveEventsList = liveEvents;
    }
    processProducts(products, lowStock) {
        this.kpiData.totalProducts = products?.length || 0;
        // Low stock products (including out-of-stock with 0)
        this.lowStockProductsList = (lowStock || [])
            .map(p => ({
            id: p.id,
            name: p.name,
            category: p.category || 'Uncategorized',
            stockCount: p.currentStock ?? 0
        }))
            .sort((a, b) => a.stockCount - b.stockCount)
            .slice(0, 10);
        this.kpiData.lowStockProducts = this.lowStockProductsList.length;
    }
    mapEventStatus(status) {
        const statusMap = {
            'Draft': 'upcoming',
            'Upcoming': 'upcoming',
            'Active': 'live',
            'Live': 'live',
            'Completed': 'completed',
            'Cancelled': 'cancelled'
        };
        return statusMap[status] || 'upcoming';
    }
    updateCharts() {
        this.updateRedemptionsChart();
        this.updateEventsChart();
    }
    updateRedemptionsChart() {
        const { approved, pending, delivered, rejected } = this.redemptionStatusCounts;
        const total = approved + pending + delivered + rejected;
        const data = [
            { value: approved, name: 'Approved', itemStyle: { color: this.chartColors.approved } },
            { value: pending, name: 'Pending', itemStyle: { color: this.chartColors.pending } },
            { value: delivered, name: 'Delivered', itemStyle: { color: this.chartColors.delivered } },
            { value: rejected, name: 'Rejected', itemStyle: { color: this.chartColors.rejected } }
        ].filter(d => d.value > 0);
        this.redemptionsChartOption = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    const percent = total > 0 ? ((params.value / total) * 100).toFixed(1) : 0;
                    return `${params.name}: ${params.value} (${percent}%)`;
                }
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                formatter: (name) => {
                    const item = data.find(d => d.name === name);
                    const value = item?.value || 0;
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                    return `${name} – ${value} (${percent}%)`;
                },
                textStyle: {
                    fontSize: 12,
                    color: '#4b5563'
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['45%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    emphasis: {
                        label: { show: false }
                    },
                    labelLine: { show: false },
                    data: data
                }
            ]
        };
    }
    updateEventsChart() {
        const { upcoming, live, completed, cancelled } = this.eventStatusCounts;
        const total = upcoming + live + completed + cancelled;
        const data = [
            { value: upcoming, name: 'Upcoming', itemStyle: { color: this.chartColors.upcoming } },
            { value: live, name: 'Live', itemStyle: { color: this.chartColors.live } },
            { value: completed, name: 'Completed', itemStyle: { color: this.chartColors.completed } },
            { value: cancelled, name: 'Cancelled', itemStyle: { color: this.chartColors.cancelled } }
        ].filter(d => d.value > 0);
        this.eventsChartOption = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    const percent = total > 0 ? ((params.value / total) * 100).toFixed(1) : 0;
                    return `${params.name}: ${params.value} (${percent}%)`;
                }
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                formatter: (name) => {
                    const item = data.find(d => d.name === name);
                    const value = item?.value || 0;
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                    return `${name} – ${value} (${percent}%)`;
                },
                textStyle: {
                    fontSize: 12,
                    color: '#4b5563'
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['45%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    emphasis: {
                        label: { show: false }
                    },
                    labelLine: { show: false },
                    data: data
                }
            ]
        };
    }
    formatDistributionLabel(event) {
        if (event.totalPointsPool === 0) {
            return `${event.awardedPercent}% : Unlimited Pool`;
        }
        return `${event.awardedPercent}% : ${event.distributedPoints.toLocaleString()} of ${event.totalPointsPool.toLocaleString()}`;
    }
    getStockBadgeClass(count) {
        if (count === 0)
            return 'stock-badge stock-badge--out';
        if (count < 5)
            return 'stock-badge stock-badge--critical';
        return 'stock-badge stock-badge--low';
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDashboardComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.DashboardService), i0.ɵɵdirectiveInject(i3.RedemptionService), i0.ɵɵdirectiveInject(i4.EventService), i0.ɵɵdirectiveInject(i5.ProductsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDashboardComponent, selectors: [["app-admin-dashboard"]], features: [i0.ɵɵProvidersFeature([
                provideEcharts()
            ])], decls: 13, vars: 4, consts: [[1, "admin-dashboard-wrapper"], [1, "admin-dashboard-main"], [1, "dashboard-header"], [1, "header-left"], [1, "page-title"], [1, "header-right"], ["class", "user-info", 4, "ngIf"], [1, "dashboard-content"], ["class", "error-alert", "role", "alert", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "fa-solid", "fa-shield-halved"], ["role", "alert", 1, "error-alert"], [1, "fa-solid", "fa-circle-exclamation"], ["aria-label", "Dismiss", 1, "error-dismiss", 3, "click"], [1, "fa-solid", "fa-xmark"], [1, "loading-container"], [1, "loading-spinner"], ["aria-label", "Key Performance Indicators", 1, "kpi-section"], [1, "kpi-grid"], ["label", "Total Users", "iconType", "users", 3, "value"], ["label", "Total Events", "iconType", "events", 3, "value"], ["label", "Total Products", "iconType", "products", 3, "value"], ["label", "Low Stock Products", "iconType", "low-stock", 3, "value"], ["label", "Pending Redemptions", "iconType", "pending", 3, "value"], ["label", "Live Events", "iconType", "live", 3, "value"], ["aria-label", "Status Charts", 1, "charts-section"], [1, "charts-grid"], ["title", "Redemptions Status", "subtitle", "Distribution by status"], ["class", "chart-container", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], ["title", "Events Status", "subtitle", "Distribution by status"], ["aria-label", "Data Tables", 1, "tables-section"], ["title", "Pending Redemptions", "subtitle", "Sorted by points (highest first)", "viewAllLink", "/admin/redemptions"], ["class", "data-table", 4, "ngIf"], ["class", "table-empty", 4, "ngIf"], ["title", "Low Stock Products", "subtitle", "Products below threshold (10 units)", "viewAllLink", "/admin/products"], ["title", "Live Events", "subtitle", "Sorted by distribution percentage (lowest first)", "viewAllLink", "/admin/events"], [1, "chart-container"], ["echarts", "", "aria-label", "Redemptions status pie chart", 1, "echart", 3, "options"], [1, "chart-empty"], [1, "fa-regular", "fa-chart-pie"], ["echarts", "", "aria-label", "Events status pie chart", 1, "echart", 3, "options"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "cell-user"], [1, "cell-product"], [1, "cell-date"], [1, "table-empty"], [1, "fa-regular", "fa-inbox"], [1, "cell-category"], [1, "cell-stock"], [1, "fa-regular", "fa-box-open"], [1, "cell-event"], [1, "cell-distribution"], [1, "distribution-info"], [1, "progress-bar"], [1, "progress-fill"], [1, "distribution-text"], [1, "fa-regular", "fa-calendar-xmark"]], template: function AdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "h1", 4);
            i0.ɵɵtext(6, "Admin Dashboard");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5);
            i0.ɵɵtemplate(8, AdminDashboardComponent_div_8_Template, 6, 3, "div", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "main", 7);
            i0.ɵɵtemplate(10, AdminDashboardComponent_div_10_Template, 6, 1, "div", 8)(11, AdminDashboardComponent_div_11_Template, 4, 0, "div", 9)(12, AdminDashboardComponent_ng_container_12_Template, 27, 16, "ng-container", 10);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.currentUser);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i6.NgForOf, i6.NgIf, FormsModule,
            RouterModule,
            NgxEchartsDirective,
            AdminSidebarComponent,
            KpiCardComponent,
            ChartCardComponent,
            TableCardComponent, i6.DatePipe], styles: ["\n\r\n\r\n\r\n\r\n\n\r\n.admin-dashboard-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-dashboard-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n\r\n\n\r\n.dashboard-header[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 11px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.dashboard-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.error-alert[_ngcontent-%COMP%] {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  border-radius: 8px;\r\n  padding: 14px 16px;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  color: #dc2626;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.error-dismiss[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  color: #dc2626;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.error-dismiss[_ngcontent-%COMP%]:hover {\r\n  opacity: 1;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.kpi-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 28px;\r\n}\r\n\r\n.kpi-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  gap: 20px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.charts-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 28px;\r\n}\r\n\r\n.charts-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 24px;\r\n}\r\n\r\n.chart-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 280px;\r\n}\r\n\r\n.echart[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.tables-section[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 24px;\r\n}\r\n\r\n\n\r\n.data-table[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\r\n  position: sticky;\r\n  top: 0;\r\n  background: #f9fafb;\r\n  z-index: 1;\r\n}\r\n\r\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n  padding: 10px 12px;\r\n  text-align: left;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  font-size: 12px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  border-bottom: 1px solid #e5e7eb;\r\n}\r\n\r\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  padding: 12px;\r\n  border-bottom: 1px solid #f3f4f6;\r\n  color: #374151;\r\n}\r\n\r\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\r\n  background: #f9fafb;\r\n}\r\n\r\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\r\n  border-bottom: none;\r\n}\r\n\r\n\n\r\n.cell-user[_ngcontent-%COMP%], \r\n.cell-product[_ngcontent-%COMP%], \r\n.cell-event[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.cell-category[_ngcontent-%COMP%] {\r\n  color: #6b7280;\r\n}\r\n\r\n.cell-date[_ngcontent-%COMP%] {\r\n  color: #6b7280;\r\n  font-size: 13px;\r\n}\r\n\r\n\n\r\n.stock-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 4px 10px;\r\n  border-radius: 12px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-badge--low[_ngcontent-%COMP%] {\r\n  background: #fef3c7;\r\n  color: #d97706;\r\n}\r\n\r\n.stock-badge--critical[_ngcontent-%COMP%] {\r\n  background: #fee2e2;\r\n  color: #dc2626;\r\n}\r\n\r\n.stock-badge--out[_ngcontent-%COMP%] {\r\n  background: #f3f4f6;\r\n  color: #6b7280;\r\n}\r\n\r\n\n\r\n.distribution-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.progress-bar[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 6px;\r\n  background: #e5e7eb;\r\n  border-radius: 3px;\r\n  overflow: hidden;\r\n}\r\n\r\n.progress-fill[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  background: linear-gradient(90deg, #2c5f3f, #10b981);\r\n  border-radius: 3px;\r\n  transition: width 0.3s ease;\r\n}\r\n\r\n.distribution-text[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n}\r\n\r\n\n\r\n.table-empty[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px 20px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.table-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 32px;\r\n  margin-bottom: 10px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.table-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 1200px) {\r\n  .kpi-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n  \r\n  .charts-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .dashboard-header[_ngcontent-%COMP%] {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .dashboard-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .kpi-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .data-table[_ngcontent-%COMP%] {\r\n    font-size: 13px;\r\n  }\r\n\r\n  .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \r\n   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    padding: 10px 8px;\r\n  }\r\n}\r\n\r\n\r\n\r\n\n\r\n.dashboard-content[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.dashboard-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner[_ngcontent-%COMP%] {\r\n    animation: none;\r\n  }\r\n\r\n  .progress-fill[_ngcontent-%COMP%] {\r\n    transition: none;\r\n  }\r\n}\r\n\r\n\n\r\n@media (prefers-contrast: high) {\r\n  .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    border-bottom: 2px solid #000;\r\n  }\r\n\r\n  .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n    border-bottom: 1px solid #000;\r\n  }\r\n\r\n  .stock-badge[_ngcontent-%COMP%] {\r\n    border: 1px solid currentColor;\r\n  }\r\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-dashboard', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterModule,
                    NgxEchartsDirective,
                    AdminSidebarComponent,
                    KpiCardComponent,
                    ChartCardComponent,
                    TableCardComponent
                ], providers: [
                    provideEcharts()
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"admin-dashboard-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"admin-dashboard-main\">\r\n    <!-- Top Header -->\r\n    <header class=\"dashboard-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Admin Dashboard</h1>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <div class=\"user-info\" *ngIf=\"currentUser\">\r\n          <span class=\"user-name\">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>\r\n          <span class=\"user-role\">\r\n            <i class=\"fa-solid fa-shield-halved\"></i>\r\n            {{ currentUser?.roles?.[0] || 'Admin' }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"dashboard-content\">\r\n      <!-- Error Message -->\r\n      <div *ngIf=\"errorMessage\" class=\"error-alert\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span>{{ errorMessage }}</span>\r\n        <button class=\"error-dismiss\" (click)=\"errorMessage = null\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"loading-spinner\"></div>\r\n        <p>Loading dashboard data...</p>\r\n      </div>\r\n\r\n      <!-- Dashboard Content -->\r\n      <ng-container *ngIf=\"!isLoading\">\r\n        <!-- KPI Cards Section - 2 rows x 3 cards -->\r\n        <section class=\"kpi-section\" aria-label=\"Key Performance Indicators\">\r\n          <div class=\"kpi-grid\">\r\n            <!-- Row 1 -->\r\n            <app-kpi-card\r\n              label=\"Total Users\"\r\n              [value]=\"kpiData.totalUsers\"\r\n              iconType=\"users\">\r\n            </app-kpi-card>\r\n            \r\n            <app-kpi-card\r\n              label=\"Total Events\"\r\n              [value]=\"kpiData.totalEvents\"\r\n              iconType=\"events\">\r\n            </app-kpi-card>\r\n            \r\n            <app-kpi-card\r\n              label=\"Total Products\"\r\n              [value]=\"kpiData.totalProducts\"\r\n              iconType=\"products\">\r\n            </app-kpi-card>\r\n            \r\n            <!-- Row 2 -->\r\n            <app-kpi-card\r\n              label=\"Low Stock Products\"\r\n              [value]=\"kpiData.lowStockProducts\"\r\n              iconType=\"low-stock\">\r\n            </app-kpi-card>\r\n            \r\n            <app-kpi-card\r\n              label=\"Pending Redemptions\"\r\n              [value]=\"kpiData.pendingRedemptions\"\r\n              iconType=\"pending\">\r\n            </app-kpi-card>\r\n            \r\n            <app-kpi-card\r\n              label=\"Live Events\"\r\n              [value]=\"kpiData.liveEvents\"\r\n              iconType=\"live\">\r\n            </app-kpi-card>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Charts Section - 2 pie charts side by side -->\r\n        <section class=\"charts-section\" aria-label=\"Status Charts\">\r\n          <div class=\"charts-grid\">\r\n            <!-- Redemptions Status Chart -->\r\n            <app-chart-card title=\"Redemptions Status\" subtitle=\"Distribution by status\">\r\n              <div class=\"chart-container\" *ngIf=\"redemptionsChartOption\">\r\n                <div\r\n                  echarts\r\n                  [options]=\"redemptionsChartOption\"\r\n                  class=\"echart\"\r\n                  aria-label=\"Redemptions status pie chart\">\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-empty\" *ngIf=\"!redemptionStatusCounts.approved && !redemptionStatusCounts.pending && !redemptionStatusCounts.delivered && !redemptionStatusCounts.rejected\">\r\n                <i class=\"fa-regular fa-chart-pie\"></i>\r\n                <p>No redemption data available</p>\r\n              </div>\r\n            </app-chart-card>\r\n\r\n            <!-- Events Status Chart -->\r\n            <app-chart-card title=\"Events Status\" subtitle=\"Distribution by status\">\r\n              <div class=\"chart-container\" *ngIf=\"eventsChartOption\">\r\n                <div\r\n                  echarts\r\n                  [options]=\"eventsChartOption\"\r\n                  class=\"echart\"\r\n                  aria-label=\"Events status pie chart\">\r\n                </div>\r\n              </div>\r\n              <div class=\"chart-empty\" *ngIf=\"!eventStatusCounts.upcoming && !eventStatusCounts.live && !eventStatusCounts.completed && !eventStatusCounts.cancelled\">\r\n                <i class=\"fa-regular fa-chart-pie\"></i>\r\n                <p>No event data available</p>\r\n              </div>\r\n            </app-chart-card>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Tables Section - 3 tables stacked -->\r\n        <section class=\"tables-section\" aria-label=\"Data Tables\">\r\n          <!-- Pending Redemptions Table -->\r\n          <app-table-card \r\n            title=\"Pending Redemptions\" \r\n            subtitle=\"Sorted by points (highest first)\"\r\n            viewAllLink=\"/admin/redemptions\">\r\n            <table class=\"data-table\" *ngIf=\"pendingRedemptionsList.length > 0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>User</th>\r\n                  <th>Product</th>\r\n                  <th>Request Date</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let redemption of pendingRedemptionsList\">\r\n                  <td class=\"cell-user\">{{ redemption.userName }}</td>\r\n                  <td class=\"cell-product\">{{ redemption.productName }}</td>\r\n                  <td class=\"cell-date\">{{ redemption.requestDate | date:'MMM d, yyyy' }}</td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"table-empty\" *ngIf=\"pendingRedemptionsList.length === 0\">\r\n              <i class=\"fa-regular fa-inbox\"></i>\r\n              <p>No pending redemptions</p>\r\n            </div>\r\n          </app-table-card>\r\n\r\n          <!-- Low Stock Products Table -->\r\n          <app-table-card \r\n            title=\"Low Stock Products\" \r\n            subtitle=\"Products below threshold (10 units)\"\r\n            viewAllLink=\"/admin/products\">\r\n            <table class=\"data-table\" *ngIf=\"lowStockProductsList.length > 0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Product</th>\r\n                  <th>Category</th>\r\n                  <th>Stock Count</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let product of lowStockProductsList\">\r\n                  <td class=\"cell-product\">{{ product.name }}</td>\r\n                  <td class=\"cell-category\">{{ product.category }}</td>\r\n                  <td class=\"cell-stock\">\r\n                    <span [class]=\"getStockBadgeClass(product.stockCount)\">\r\n                      {{ product.stockCount === 0 ? 'Out of Stock' : product.stockCount + ' left' }}\r\n                    </span>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"table-empty\" *ngIf=\"lowStockProductsList.length === 0\">\r\n              <i class=\"fa-regular fa-box-open\"></i>\r\n              <p>All products are well stocked</p>\r\n            </div>\r\n          </app-table-card>\r\n\r\n          <!-- Live Events Table -->\r\n          <app-table-card \r\n            title=\"Live Events\" \r\n            subtitle=\"Sorted by distribution percentage (lowest first)\"\r\n            viewAllLink=\"/admin/events\">\r\n            <table class=\"data-table\" *ngIf=\"liveEventsList.length > 0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Event Name</th>\r\n                  <th>Points Distributed %</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let event of liveEventsList\">\r\n                  <td class=\"cell-event\">{{ event.name }}</td>\r\n                  <td class=\"cell-distribution\">\r\n                    <div class=\"distribution-info\">\r\n                      <div class=\"progress-bar\">\r\n                        <div class=\"progress-fill\" [style.width.%]=\"event.awardedPercent\"></div>\r\n                      </div>\r\n                      <span class=\"distribution-text\">{{ formatDistributionLabel(event) }}</span>\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"table-empty\" *ngIf=\"liveEventsList.length === 0\">\r\n              <i class=\"fa-regular fa-calendar-xmark\"></i>\r\n              <p>No live events at the moment</p>\r\n            </div>\r\n          </app-table-card>\r\n        </section>\r\n      </ng-container>\r\n    </main>\r\n  </div>\r\n</div>\r\n", styles: ["/* Admin Dashboard - Redesigned Layout */\r\n\r\n/* =================================\r\n   Layout Structure\r\n   ================================= */\r\n.admin-dashboard-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-dashboard-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n/* =================================\r\n   Header\r\n   ================================= */\r\n.dashboard-header {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role i {\r\n  font-size: 11px;\r\n}\r\n\r\n/* =================================\r\n   Main Content\r\n   ================================= */\r\n.dashboard-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n/* =================================\r\n   Error Alert\r\n   ================================= */\r\n.error-alert {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  border-radius: 8px;\r\n  padding: 14px 16px;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  color: #dc2626;\r\n}\r\n\r\n.error-alert i {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.error-alert span {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.error-dismiss {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  color: #dc2626;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.error-dismiss:hover {\r\n  opacity: 1;\r\n}\r\n\r\n/* =================================\r\n   Loading State\r\n   ================================= */\r\n.loading-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container p {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   KPI Section\r\n   ================================= */\r\n.kpi-section {\r\n  margin-bottom: 28px;\r\n}\r\n\r\n.kpi-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  gap: 20px;\r\n}\r\n\r\n/* =================================\r\n   Charts Section\r\n   ================================= */\r\n.charts-section {\r\n  margin-bottom: 28px;\r\n}\r\n\r\n.charts-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  gap: 24px;\r\n}\r\n\r\n.chart-container {\r\n  width: 100%;\r\n  height: 280px;\r\n}\r\n\r\n.echart {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.chart-empty {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty i {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty p {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   Tables Section\r\n   ================================= */\r\n.tables-section {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 24px;\r\n}\r\n\r\n/* Data Table Styles */\r\n.data-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.data-table thead {\r\n  position: sticky;\r\n  top: 0;\r\n  background: #f9fafb;\r\n  z-index: 1;\r\n}\r\n\r\n.data-table th {\r\n  padding: 10px 12px;\r\n  text-align: left;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  font-size: 12px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  border-bottom: 1px solid #e5e7eb;\r\n}\r\n\r\n.data-table td {\r\n  padding: 12px;\r\n  border-bottom: 1px solid #f3f4f6;\r\n  color: #374151;\r\n}\r\n\r\n.data-table tbody tr:hover {\r\n  background: #f9fafb;\r\n}\r\n\r\n.data-table tbody tr:last-child td {\r\n  border-bottom: none;\r\n}\r\n\r\n/* Table Cell Variants */\r\n.cell-user,\r\n.cell-product,\r\n.cell-event {\r\n  font-weight: 500;\r\n  color: #1f2937;\r\n}\r\n\r\n.cell-category {\r\n  color: #6b7280;\r\n}\r\n\r\n.cell-date {\r\n  color: #6b7280;\r\n  font-size: 13px;\r\n}\r\n\r\n/* Stock Badge */\r\n.stock-badge {\r\n  display: inline-block;\r\n  padding: 4px 10px;\r\n  border-radius: 12px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.stock-badge--low {\r\n  background: #fef3c7;\r\n  color: #d97706;\r\n}\r\n\r\n.stock-badge--critical {\r\n  background: #fee2e2;\r\n  color: #dc2626;\r\n}\r\n\r\n.stock-badge--out {\r\n  background: #f3f4f6;\r\n  color: #6b7280;\r\n}\r\n\r\n/* Distribution Info */\r\n.distribution-info {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.progress-bar {\r\n  width: 100%;\r\n  height: 6px;\r\n  background: #e5e7eb;\r\n  border-radius: 3px;\r\n  overflow: hidden;\r\n}\r\n\r\n.progress-fill {\r\n  height: 100%;\r\n  background: linear-gradient(90deg, #2c5f3f, #10b981);\r\n  border-radius: 3px;\r\n  transition: width 0.3s ease;\r\n}\r\n\r\n.distribution-text {\r\n  font-size: 12px;\r\n  color: #6b7280;\r\n}\r\n\r\n/* Empty State */\r\n.table-empty {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px 20px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.table-empty i {\r\n  font-size: 32px;\r\n  margin-bottom: 10px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.table-empty p {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   Responsive Design\r\n   ================================= */\r\n@media (max-width: 1200px) {\r\n  .kpi-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n  \r\n  .charts-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .dashboard-header {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .dashboard-content {\r\n    padding: 20px;\r\n  }\r\n\r\n  .kpi-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info {\r\n    display: none;\r\n  }\r\n\r\n  .data-table {\r\n    font-size: 13px;\r\n  }\r\n\r\n  .data-table th,\r\n  .data-table td {\r\n    padding: 10px 8px;\r\n  }\r\n}\r\n\r\n/* =================================\r\n   Scrollbar Styling\r\n   ================================= */\r\n.dashboard-content::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.dashboard-content::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.dashboard-content::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.dashboard-content::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n/* =================================\r\n   Accessibility\r\n   ================================= */\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner {\r\n    animation: none;\r\n  }\r\n\r\n  .progress-fill {\r\n    transition: none;\r\n  }\r\n}\r\n\r\n/* High contrast mode support */\r\n@media (prefers-contrast: high) {\r\n  .data-table th {\r\n    border-bottom: 2px solid #000;\r\n  }\r\n\r\n  .data-table td {\r\n    border-bottom: 1px solid #000;\r\n  }\r\n\r\n  .stock-badge {\r\n    border: 1px solid currentColor;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.DashboardService }, { type: i3.RedemptionService }, { type: i4.EventService }, { type: i5.ProductsService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/pages/admin/admin-dashboard/admin-dashboard.component.ts", lineNumber: 97 }); })();
//# sourceMappingURL=admin-dashboard.component.js.map