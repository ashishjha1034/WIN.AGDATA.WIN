import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UserDashboardService {
    constructor(http) {
        this.http = http;
        this.API_URL = API_CONFIG.getApiUrl();
    }
    /**
     * Fetch user dashboard statistics
     * Uses /api/transaction/statistics endpoint
     */
    getUserStats() {
        const url = `${this.API_URL}/transaction/statistics`;
        console.log('Fetching user dashboard stats from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('User stats response:', response);
            // Handle nested response structure: response.user contains the data
            const user = response.user || response;
            const userStats = response.userStats || {};
            return {
                currentBalance: user.currentBalance ?? user.CurrentBalance ?? 0,
                pointsEarned: user.totalEarned ?? user.TotalEarned ?? 0,
                pointsRedeemed: user.totalRedeemed ?? user.TotalRedeemed ?? 0,
                eventsRegistered: userStats.eventParticipationCount ?? userStats.EventParticipationCount ?? 0
            };
        }), catchError(error => {
            console.error('Error fetching user stats:', error);
            return of({
                currentBalance: 0,
                pointsEarned: 0,
                pointsRedeemed: 0,
                eventsRegistered: 0
            });
        }));
    }
    /**
     * Fetch recent transactions for the current user
     * Uses /api/transaction/my-history endpoint
     */
    getRecentTransactions(limit = 5) {
        const url = `${this.API_URL}/transaction/my-history?pageNumber=1&pageSize=${limit}`;
        console.log('Fetching recent transactions from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('Transactions response:', response);
            const transactions = response.data || [];
            return transactions.map((t) => ({
                id: t.id,
                type: t.type || t.Type || 'Transaction',
                description: t.description || t.Description || t.type || t.Type,
                points: t.points ?? t.Points ?? 0,
                createdAt: t.createdAt || t.CreatedAt
            }));
        }), catchError(error => {
            console.error('Error fetching recent transactions:', error);
            return of([]);
        }));
    }
    /**
     * Fetch all transactions for the current user
     */
    getAllTransactions() {
        const url = `${this.API_URL}/transaction/my-history?pageNumber=1&pageSize=100`;
        console.log('Fetching all transactions from:', url);
        return this.http.get(url).pipe(map(response => {
            const transactions = response.data || [];
            return transactions.map((t) => ({
                id: t.id,
                type: t.type || t.Type || 'Transaction',
                description: t.description || t.Description || t.type || t.Type,
                points: t.amount ?? t.Amount ?? t.points ?? t.Points ?? 0,
                amount: t.amount ?? t.Amount ?? t.points ?? t.Points ?? 0,
                source: t.source || t.Source || '',
                sourceId: t.sourceId || t.SourceId || null,
                balanceAfter: t.balanceAfter ?? t.BalanceAfter ?? 0,
                processedBy: t.processedBy || t.ProcessedBy || null,
                createdAt: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt,
                timestamp: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt
            }));
        }), catchError(error => {
            console.error('Error fetching all transactions:', error);
            return of([]);
        }));
    }
    /**
     * Fetch upcoming events
     * Uses /api/event endpoint and filters upcoming events
     */
    getUpcomingEvents(limit = 3) {
        const url = `${this.API_URL}/event`;
        console.log('Fetching events from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('Events response:', response);
            const events = response.data || [];
            const now = new Date();
            // Filter upcoming events and take only the limit
            const upcomingEvents = events
                .filter((e) => new Date(e.eventDate || e.EventDate) >= now)
                .slice(0, limit)
                .map((e) => ({
                id: e.id,
                name: e.name || e.Name,
                eventDate: e.eventDate || e.EventDate,
                location: e.location || e.Location || '',
                status: e.status || e.Status || 'Active',
                participantCount: e.participantCount || e.ParticipantCount || 0,
                spotsLeft: e.maxParticipants ? (e.maxParticipants - (e.participantCount || 0)) : undefined
            }));
            return upcomingEvents;
        }), catchError(error => {
            console.error('Error fetching upcoming events:', error);
            return of([]);
        }));
    }
    /**
     * Fetch all events
     */
    getAllEvents() {
        const url = `${this.API_URL}/event`;
        console.log('Fetching all events from:', url);
        return this.http.get(url).pipe(map(response => {
            const events = response.data || [];
            return events.map((e) => ({
                id: e.id,
                name: e.name || e.Name,
                eventDate: e.eventDate || e.EventDate,
                location: e.location || e.Location || '',
                status: e.status || e.Status || 'Active',
                participantCount: e.participantCount || e.ParticipantCount || 0
            }));
        }), catchError(error => {
            console.error('Error fetching all events:', error);
            return of([]);
        }));
    }
    /**
     * Register for an event
     */
    registerForEvent(eventId) {
        const url = `${this.API_URL}/event/${eventId}/participate`;
        console.log('Registering for event:', url);
        return this.http.post(url, {});
    }
    /**
     * Fetch available products
     * Uses /api/products endpoint
     */
    getProducts() {
        const url = `${this.API_URL}/products`;
        console.log('Fetching products from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('Products response:', response);
            const products = response.data || [];
            return products.map((p) => ({
                id: p.id,
                name: p.name || p.Name,
                description: p.description || p.Description || '',
                category: p.categoryName || p.CategoryName || '',
                categoryId: p.categoryId || p.CategoryId || '',
                price: p.price ?? p.Price ?? 0,
                pointsCost: p.pointsCost ?? p.PointsCost ?? p.price ?? p.Price ?? 0,
                imageUrl: p.imageUrl || p.ImageUrl,
                currentStock: p.stockLevel ?? p.StockLevel ?? 0,
                isActive: p.isActive ?? p.IsActive ?? true
            }));
        }), catchError(error => {
            console.error('Error fetching products:', error);
            return of([]);
        }));
    }
    /**
     * Fetch product categories
     */
    getProductCategories() {
        const url = `${this.API_URL}/products/categories/all`;
        console.log('Fetching product categories from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('Categories response:', response);
            const categories = response.data || response || [];
            return categories.map((c) => ({
                id: c.id || c.Id,
                name: c.name || c.Name,
                description: c.description || c.Description
            }));
        }), catchError(error => {
            console.error('Error fetching product categories:', error);
            return of([]);
        }));
    }
    /**
     * Get current user's points balance
     */
    getUserPoints() {
        return this.getUserStats().pipe(map(stats => stats.currentBalance));
    }
    /**
     * Create a redemption request
     */
    createRedemption(productId, quantity) {
        const url = `${this.API_URL}/redemptions`;
        console.log('Creating redemption:', url, { productId, quantity });
        return this.http.post(url, { productId, quantity });
    }
    /**
     * Fetch product details
     */
    getProductDetails(productId) {
        const url = `${this.API_URL}/products/${productId}`;
        console.log('Fetching product details from:', url);
        return this.http.get(url).pipe(map(response => {
            const p = response.data || response;
            return {
                id: p.id,
                name: p.name || p.Name,
                description: p.description || p.Description || '',
                category: p.categoryName || p.CategoryName || '',
                categoryId: p.categoryId || p.CategoryId || '',
                price: p.price ?? p.Price ?? 0,
                pointsCost: p.pointsCost ?? p.PointsCost ?? p.price ?? p.Price ?? 0,
                imageUrl: p.imageUrl || p.ImageUrl,
                currentStock: p.stockLevel ?? p.StockLevel ?? 0,
                isActive: p.isActive ?? p.IsActive ?? true
            };
        }));
    }
    /**
     * Redeem a product
     */
    redeemProduct(productId, quantity) {
        const url = `${this.API_URL}/redemptions`;
        console.log('Redeeming product:', url);
        return this.http.post(url, { productId, quantity });
    }
    /**
     * Fetch user redemptions
     * Uses /api/redemptions/my-redemptions endpoint
     */
    getRedemptions() {
        const url = `${this.API_URL}/redemptions/my-redemptions`;
        console.log('Fetching redemptions from:', url);
        return this.http.get(url).pipe(map(response => {
            console.log('Redemptions response:', response);
            const redemptions = response.data || [];
            return redemptions.map((r) => {
                const statusCode = this.parseRedemptionStatus(r.status || r.Status);
                return {
                    id: r.id,
                    productId: r.productId || r.ProductId,
                    productName: r.productName || r.ProductName || 'Product',
                    productDescription: r.productDescription || r.ProductDescription || '',
                    productCategory: r.productCategory || r.ProductCategory || '',
                    productImageUrl: r.productImageUrl || r.ProductImageUrl || '',
                    productPointsPerUnit: r.productPointsPerUnit || r.ProductPointsPerUnit || Math.round((r.pointsSpent || r.PointsSpent || 0) / (r.quantity || r.Quantity || 1)),
                    quantity: r.quantity ?? r.Quantity ?? 1,
                    pointsSpent: r.pointsSpent ?? r.PointsSpent ?? 0,
                    status: this.getStatusLabel(statusCode),
                    statusCode: statusCode,
                    adminNotes: r.adminNotes || r.AdminNotes || null,
                    createdAt: r.createdAt || r.CreatedAt,
                    approvedAt: r.approvedAt || r.ApprovedAt,
                    deliveredAt: r.deliveredAt || r.DeliveredAt,
                    userCurrentBalance: r.userCurrentBalance || r.UserCurrentBalance
                };
            });
        }), catchError(error => {
            console.error('Error fetching redemptions:', error);
            return of([]);
        }));
    }
    /**
     * Parse redemption status from API response
     */
    parseRedemptionStatus(status) {
        if (typeof status === 'number')
            return status;
        if (typeof status === 'string') {
            const statusLower = status.toLowerCase();
            if (statusLower === 'pending' || status === '0')
                return 0;
            if (statusLower === 'approved' || status === '1')
                return 1;
            if (statusLower === 'rejected' || status === '2')
                return 2;
            if (statusLower === 'delivered' || status === '3')
                return 3;
            if (statusLower === 'cancelled' || status === '4')
                return 4;
        }
        return 0;
    }
    /**
     * Get status label from status code
     */
    getStatusLabel(statusCode) {
        switch (statusCode) {
            case 0: return 'Pending';
            case 1: return 'Approved';
            case 2: return 'Rejected';
            case 3: return 'Delivered';
            case 4: return 'Cancelled';
            default: return 'Pending';
        }
    }
    /**
     * Fetch redemption status counts
     * Calculates from user's redemptions
     */
    getRedemptionStatusCounts() {
        return this.getRedemptions().pipe(map(redemptions => {
            const counts = {
                pending: 0,
                approved: 0,
                delivered: 0,
                rejected: 0
            };
            redemptions.forEach(r => {
                const statusCode = r.statusCode;
                if (statusCode === 0) {
                    counts.pending++;
                }
                else if (statusCode === 1) {
                    counts.approved++;
                }
                else if (statusCode === 2) {
                    counts.rejected++;
                }
                else if (statusCode === 3) {
                    counts.delivered++;
                }
            });
            console.log('Redemption counts:', counts);
            return counts;
        }), catchError(error => {
            console.error('Error calculating redemption counts:', error);
            return of({ pending: 0, approved: 0, delivered: 0, rejected: 0 });
        }));
    }
    /**
     * Fetch complete dashboard data
     */
    getDashboardData() {
        // This would combine multiple endpoints
        console.log('Fetching complete user dashboard data');
        return this.http.get(`${this.API_URL}/users/me`);
    }
    static { this.ɵfac = function UserDashboardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserDashboardService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserDashboardService, factory: UserDashboardService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserDashboardService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=user-dashboard.service.js.map