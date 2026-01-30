import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DashboardService {
    constructor(http) {
        this.http = http;
        this.ADMIN_API_URL = `${API_CONFIG.getApiUrl()}/admin`;
    }
    /**
     * Fetch dashboard statistics
     */
    getStats() {
        const url = `${this.ADMIN_API_URL}/stats`;
        console.log('Fetching dashboard stats from:', url);
        return this.http.get(url).pipe(map(response => {
            // Backend returns PascalCase by default (TotalUsers). Accept both.
            const totalUsers = response.totalUsers ?? response.TotalUsers ?? 0;
            const totalPointsEarned = response.totalPointsEarned ?? response.TotalPointsEarned ?? 0;
            const pointsRedeemed = response.pointsRedeemed ?? response.TotalPointsRedeemed ?? 0;
            const pendingRedemptions = response.pendingRedemptions ?? response.PendingRedemptions ?? 0;
            return {
                totalUsers,
                totalPointsEarned,
                pointsRedeemed,
                pendingRedemptions
            };
        }));
    }
    /**
     * Fetch pending redemptions
     */
    getPendingRedemptions() {
        const url = `${this.ADMIN_API_URL}/redemptions`;
        const params = { status: '0' }; // 0 = Pending
        console.log('Fetching pending redemptions from:', url, 'with params:', params);
        return this.http.get(url, { params }).pipe(map(response => {
            console.log('Pending redemptions response:', response);
            // Response structure: { items: [...], counts: {...} }
            return response.items || [];
        }));
    }
    /**
     * Fetch recent events
     */
    getRecentEvents() {
        const url = `${this.ADMIN_API_URL}/events/recent`;
        console.log('Fetching recent events from:', url);
        return this.http.get(url).pipe(map(response => response.data || []));
    }
    /**
     * Fetch low stock products
     */
    getLowStockProducts() {
        const url = `${this.ADMIN_API_URL}/products/low-stock`;
        console.log('Fetching low stock products from:', url);
        return this.http.get(url).pipe(map(response => response.data || []));
    }
    /**
     * Fetch points chart data
     */
    getPointsChartData(months = 6) {
        const url = `${this.ADMIN_API_URL}/stats/points-chart?months=${months}`;
        console.log('Fetching points chart data from:', url);
        return this.http.get(url).pipe(map(response => {
            const chartData = response.data || [];
            return {
                labels: chartData.map((d) => d.monthName),
                earned: chartData.map((d) => d.pointsEarned),
                redeemed: chartData.map((d) => d.pointsRedeemed)
            };
        }));
    }
    /**
     * Fetch all dashboard data
     */
    getDashboardData() {
        const url = `${this.ADMIN_API_URL}/dashboard`;
        console.log('Fetching complete dashboard data from:', url);
        return this.http.get(url);
    }
    static { this.ɵfac = function DashboardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardService, factory: DashboardService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=dashboard.service.js.map