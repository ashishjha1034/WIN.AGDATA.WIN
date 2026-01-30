import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AdminUsersService {
    constructor(http) {
        this.http = http;
        this.API_URL = `${API_CONFIG.getApiUrl()}/admin`;
        this.USERS_API_URL = `${API_CONFIG.getApiUrl()}/users`; // For user CRUD operations
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.errorSubject = new BehaviorSubject(null);
        this.error$ = this.errorSubject.asObservable();
        console.log('AdminUsersService initialized with API URL:', this.API_URL);
    }
    /**
     * Get all users or filter by active status
     */
    getAllUsers(activeOnly = true) {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/users`, {
            params: { activeOnly: activeOnly.toString() }
        }).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get detailed information for a specific user
     */
    getUserDetails(userId) {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/users/${userId}`).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get system statistics
     */
    getStats() {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/stats`).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Create/invite a new user - aligned with backend InviteUserRequest
     */
    createUser(request) {
        this.setLoading(true);
        this.clearError();
        return this.http.post(`${this.API_URL}/users`, request).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Update user information - uses /api/users endpoint
     */
    updateUser(userId, request) {
        this.setLoading(true);
        this.clearError();
        return this.http.put(`${this.USERS_API_URL}/${userId}`, request).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Activate a user - uses /api/users endpoint
     */
    activateUser(userId) {
        this.setLoading(true);
        this.clearError();
        return this.http.post(`${this.USERS_API_URL}/${userId}/activate`, {}).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Deactivate a user with business rule enforcement
     * BACKEND: POST /api/users/{id}/deactivate
     *
     * @param userId - The user ID to deactivate
     * @param force - If true, bypasses soft warnings (points > 0, recent activity) but not hard blocks
     * @returns Observable that:
     * - Completes successfully if deactivation succeeds
     * - Throws error with status 422 and DeactivateUserBlocked if hard blocked
     * - Throws error with status 409 and DeactivateUserWarnings if soft warnings exist
     */
    deactivateUser(userId, force = false) {
        this.setLoading(true);
        this.clearError();
        return this.http.post(`${this.USERS_API_URL}/${userId}/deactivate`, { force }).pipe(tap(() => this.setLoading(false)), catchError(error => {
            this.setLoading(false);
            // Don't transform 409/422 errors - let the caller handle them
            throw error;
        }));
    }
    /**
     * Check if error response is a deactivation warning (409 Conflict)
     */
    isDeactivationWarning(error) {
        return error?.status === 409 && error?.error?.code === 'DEACTIVATE_USER_WARNINGS';
    }
    /**
     * Check if error response is a deactivation block (422 Unprocessable Entity)
     */
    isDeactivationBlocked(error) {
        return error?.status === 422 && error?.error?.code === 'DEACTIVATE_USER_BLOCKED';
    }
    /**
     * Delete a user - uses /api/users endpoint
     */
    deleteUser(userId) {
        this.setLoading(true);
        this.clearError();
        return this.http.delete(`${this.USERS_API_URL}/${userId}`).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
    }
    /**
     * Get user transactions
     */
    getUserTransactions(userId, pageNumber = 1, pageSize = 50) {
        return this.http.get(`${API_CONFIG.getApiUrl()}/Transaction/user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(catchError(error => this.handleError(error)));
    }
    /**
     * Get pending redemptions
     */
    getPendingRedemptions() {
        this.setLoading(true);
        this.clearError();
        return this.http.get(`${this.API_URL}/redemptions/pending`).pipe(tap(() => this.setLoading(false)), catchError(error => this.handleError(error)));
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
            // Handle FluentValidation errors (object with field names)
            if (error.error?.errors) {
                const validationErrors = error.error.errors;
                const errorMessages = [];
                for (const field in validationErrors) {
                    if (Array.isArray(validationErrors[field])) {
                        errorMessages.push(...validationErrors[field]);
                    }
                }
                if (errorMessages.length > 0) {
                    errorMessage = errorMessages.join('. ');
                }
            }
            else if (error.error?.message) {
                errorMessage = error.error.message;
            }
            else if (error.error?.title) {
                // ASP.NET Core validation error format
                errorMessage = error.error.title;
            }
            else if (typeof error.error === 'string') {
                errorMessage = error.error;
            }
            else if (error.status === 404) {
                errorMessage = 'User not found';
            }
            else if (error.status === 403) {
                errorMessage = 'Forbidden - Admin access required';
            }
            else if (error.status === 401) {
                errorMessage = 'Unauthorized - Please login';
            }
            else if (error.status === 400) {
                errorMessage = 'Invalid request - Please check all fields';
            }
        }
        console.error('AdminUsersService error:', errorMessage, error);
        this.errorSubject.next(errorMessage);
        this.setLoading(false);
        return throwError(() => new Error(errorMessage));
    }
    static { this.ɵfac = function AdminUsersService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminUsersService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminUsersService, factory: AdminUsersService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminUsersService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=admin-users.service.js.map