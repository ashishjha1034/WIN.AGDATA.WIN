import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RedemptionStatus } from '../models/redemption.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RedemptionService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/admin/redemptions`;
        console.log('[RedemptionService] Initialized with apiUrl:', this.apiUrl);
    }
    /**
     * Get all redemptions with optional status filtering
     */
    getAllRedemptions(status) {
        let params = new HttpParams();
        if (status !== undefined && status !== null) {
            params = params.set('status', status.toString());
        }
        console.log('[RedemptionService] Fetching redemptions:', {
            url: this.apiUrl,
            status: status,
            params: params.toString()
        });
        return this.http.get(this.apiUrl, { params });
    }
    /**
     * Get detailed redemption information
     */
    getRedemptionDetails(id) {
        const url = `${this.apiUrl}/${id}`;
        console.log('[RedemptionService] Fetching details:', url);
        return this.http.get(url);
    }
    /**
     * Approve a pending redemption
     */
    approveRedemption(id, request) {
        const url = `${this.apiUrl}/${id}/approve`;
        console.log('[RedemptionService] Approving redemption:', { url, request });
        return this.http.post(url, request);
    }
    /**
     * Reject a pending redemption
     */
    rejectRedemption(id, request) {
        const url = `${this.apiUrl}/${id}/reject`;
        console.log('[RedemptionService] Rejecting redemption:', { url, request });
        return this.http.post(url, request);
    }
    /**
     * Mark an approved redemption as delivered
     */
    markAsDelivered(id, request) {
        const url = `${this.apiUrl}/${id}/deliver`;
        console.log('[RedemptionService] Marking as delivered:', { url, request });
        return this.http.post(url, request);
    }
    /**
     * Get status display label
     */
    getStatusLabel(status) {
        const labels = {
            [RedemptionStatus.Pending]: 'Pending',
            [RedemptionStatus.Approved]: 'Approved',
            [RedemptionStatus.Rejected]: 'Rejected',
            [RedemptionStatus.Delivered]: 'Delivered',
            [RedemptionStatus.Cancelled]: 'Cancelled'
        };
        return labels[status];
    }
    /**
     * Get status CSS class for styling
     */
    getStatusClass(status) {
        const classes = {
            [RedemptionStatus.Pending]: 'status-pending',
            [RedemptionStatus.Approved]: 'status-approved',
            [RedemptionStatus.Rejected]: 'status-rejected',
            [RedemptionStatus.Delivered]: 'status-delivered',
            [RedemptionStatus.Cancelled]: 'status-cancelled'
        };
        return classes[status];
    }
    static { this.ɵfac = function RedemptionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RedemptionService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RedemptionService, factory: RedemptionService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RedemptionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=redemption.service.js.map