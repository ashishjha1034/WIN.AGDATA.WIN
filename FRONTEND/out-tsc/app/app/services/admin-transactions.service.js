import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AdminTransactionsService {
    constructor(http) {
        this.http = http;
        this.API_URL = `${API_CONFIG.getApiUrl()}/admin`;
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.errorSubject = new BehaviorSubject(null);
        this.error$ = this.errorSubject.asObservable();
        console.log('AdminTransactionsService initialized with API URL:', this.API_URL);
    }
    /**
     * Get all transactions with filtering and pagination
     */
    getAllTransactions(filter) {
        this.setLoading(true);
        this.clearError();
        let params = new HttpParams();
        params = params.set('pageNumber', filter.pageNumber.toString());
        params = params.set('pageSize', filter.pageSize.toString());
        if (filter.userId) {
            params = params.set('userId', filter.userId);
        }
        if (filter.type) {
            params = params.set('type', filter.type);
        }
        if (filter.startDate) {
            params = params.set('startDate', filter.startDate);
        }
        if (filter.endDate) {
            params = params.set('endDate', filter.endDate);
        }
        if (filter.source) {
            params = params.set('source', filter.source);
        }
        if (filter.searchQuery) {
            params = params.set('searchQuery', filter.searchQuery);
        }
        if (filter.sortBy) {
            params = params.set('sortBy', filter.sortBy);
        }
        if (filter.sortDescending !== undefined) {
            params = params.set('sortDescending', filter.sortDescending.toString());
        }
        return this.http.get(`${this.API_URL}/transactions`, { params }).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get transaction details by ID
     */
    getTransactionDetails(id) {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/transactions/${id}`).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get transaction summary statistics
     */
    getTransactionSummary(startDate, endDate) {
        this.setLoading(true);
        this.clearError();
        let params = new HttpParams();
        if (startDate) {
            params = params.set('startDate', startDate);
        }
        if (endDate) {
            params = params.set('endDate', endDate);
        }
        return this.http.get(`${this.API_URL}/transactions/summary`, { params }).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get monthly points chart data
     */
    getPointsChart(months = 6) {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/stats/points-chart`, {
            params: new HttpParams().set('months', months.toString())
        }).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Adjust user points (admin action)
     */
    adjustPoints(request) {
        this.setLoading(true);
        this.clearError();
        return this.http.post(`${this.API_URL}/adjust-points`, request).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Export transactions to CSV
     */
    exportTransactions(filter) {
        let params = new HttpParams();
        if (filter.userId) {
            params = params.set('userId', filter.userId);
        }
        if (filter.type) {
            params = params.set('type', filter.type);
        }
        if (filter.startDate) {
            params = params.set('startDate', filter.startDate);
        }
        if (filter.endDate) {
            params = params.set('endDate', filter.endDate);
        }
        if (filter.source) {
            params = params.set('source', filter.source);
        }
        if (filter.searchQuery) {
            params = params.set('searchQuery', filter.searchQuery);
        }
        return this.http.get(`${this.API_URL}/transactions/export`, {
            params,
            responseType: 'blob'
        }).pipe(catchError(error => this.handleError(error)));
    }
    /**
     * Download CSV file
     */
    downloadCsv(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    }
    /**
     * Get type display label
     */
    getTypeLabel(type) {
        const labels = {
            'Earned': 'Earned',
            'Redeemed': 'Redeemed',
            'Adjusted': 'Adjusted',
            'Refunded': 'Refunded'
        };
        return labels[type] || type;
    }
    /**
     * Get type badge CSS class
     */
    getTypeClass(type) {
        const classes = {
            'Earned': 'type-earned',
            'Redeemed': 'type-redeemed',
            'Adjusted': 'type-adjusted',
            'Refunded': 'type-refunded'
        };
        return classes[type] || 'type-default';
    }
    /**
     * Get source icon
     */
    getSourceIcon(source) {
        const icons = {
            'Event': '🎉',
            'Product': '🛍️',
            'Admin': '👤',
            'System': '⚙️'
        };
        return icons[source] || '📝';
    }
    /**
     * Get source CSS class
     */
    getSourceClass(source) {
        const classes = {
            'Event': 'source-event',
            'Product': 'source-product',
            'Admin': 'source-admin',
            'System': 'source-system'
        };
        return classes[source] || 'source-default';
    }
    /**
     * Format points with sign
     */
    formatPoints(points) {
        if (points > 0) {
            return `+${points.toLocaleString()}`;
        }
        return points.toLocaleString();
    }
    /**
     * Private helper methods
     */
    setLoading(loading) {
        this.loadingSubject.next(loading);
    }
    clearError() {
        this.errorSubject.next(null);
    }
    handleError(error) {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        }
        else {
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
            else if (error.status === 404) {
                errorMessage = 'Transaction not found';
            }
            else if (error.status === 403) {
                errorMessage = 'Forbidden - Admin access required';
            }
            else if (error.status === 401) {
                errorMessage = 'Unauthorized - Please login';
            }
        }
        console.error('AdminTransactionsService error:', errorMessage, error);
        this.errorSubject.next(errorMessage);
        this.setLoading(false);
        return throwError(() => new Error(errorMessage));
    }
    static { this.ɵfac = function AdminTransactionsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminTransactionsService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminTransactionsService, factory: AdminTransactionsService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminTransactionsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=admin-transactions.service.js.map