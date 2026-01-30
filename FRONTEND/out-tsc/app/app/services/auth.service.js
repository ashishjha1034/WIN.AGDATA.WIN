import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, finalize, distinctUntilChanged, map } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./http-error.service";
export class AuthService {
    constructor(http, errorService, ngZone) {
        this.http = http;
        this.errorService = errorService;
        this.ngZone = ngZone;
        this.API_URL = `${API_CONFIG.getApiUrl()}/auth`;
        this.tokenKey = 'agdata_token';
        this.refreshTokenKey = 'agdata_refresh_token';
        this.userKey = 'agdata_user';
        this.isAuthenticatedSubject = new BehaviorSubject(this.hasToken());
        this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
        this.userSubject = new BehaviorSubject(this.getStoredUser());
        this.user$ = this.userSubject.asObservable();
        this.currentUser$ = this.userSubject.asObservable();
        this.rolesSubject = new BehaviorSubject(this.getStoredRoles());
        this.roles$ = this.rolesSubject.asObservable();
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable().pipe(distinctUntilChanged());
        this.errorSubject = new BehaviorSubject(null);
        this.error$ = this.errorSubject.asObservable();
        // Expose simple error message for backward compatibility
        this.errorMessage$ = this.errorSubject.asObservable().pipe(map(err => err?.message ?? null));
        this.validateTokenOnInit();
        console.log('AuthService initialized with API URL:', this.API_URL);
    }
    login(credentials) {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        const loginUrl = `${this.API_URL}${API_CONFIG.endpoints.auth.login}`;
        console.log('Sending login request to:', loginUrl);
        return this.http.post(loginUrl, credentials, { observe: 'response' }).pipe(map(response => {
            // Extract body from HttpResponse
            const body = response.body;
            console.log('Login successful:', body);
            console.log('Storing token:', body.token?.substring(0, 50) + '...');
            this.storeToken(body.token);
            this.storeRefreshToken(body.refreshToken);
            this.storeUser(body.user);
            this.updateAuthState(body.user);
            // Verify token was stored
            const storedToken = localStorage.getItem(this.tokenKey);
            console.log('Token stored successfully:', !!storedToken);
            if (storedToken) {
                console.log('Stored token preview:', storedToken.substring(0, 50) + '...');
            }
            return body;
        }), catchError((error) => {
            console.error('Login error response:', error);
            // Run inside Angular zone to ensure immediate change detection
            this.ngZone.run(() => {
                const authError = this.errorService.parseAuthError(error);
                this.errorSubject.next(authError);
            });
            throw error;
        }), finalize(() => {
            // Ensure loading is always set to false, regardless of success or error
            this.ngZone.run(() => {
                this.loadingSubject.next(false);
            });
        }));
    }
    logout() {
        this.clearAuthData();
        this.isAuthenticatedSubject.next(false);
        this.userSubject.next(null);
        this.rolesSubject.next([]);
        this.errorSubject.next(null);
    }
    forgotPassword(email) {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        const forgotUrl = `${this.API_URL}/forgot-password`;
        console.log('Sending forgot password request to:', forgotUrl);
        return this.http.post(forgotUrl, { email }).pipe(tap(response => {
            console.log('Forgot password request successful');
        }), catchError((error) => {
            console.error('Forgot password error:', error);
            this.ngZone.run(() => {
                const authError = this.errorService.parseAuthError(error);
                this.errorSubject.next(authError);
            });
            throw error;
        }), finalize(() => {
            this.ngZone.run(() => {
                this.loadingSubject.next(false);
            });
        }));
    }
    resetPassword(request) {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        const resetUrl = `${this.API_URL}/reset-password`;
        console.log('Sending reset password request to:', resetUrl);
        return this.http.post(resetUrl, request).pipe(tap(response => {
            console.log('Reset password successful');
        }), catchError((error) => {
            console.error('Reset password error:', error);
            this.ngZone.run(() => {
                const authError = this.errorService.parseAuthError(error);
                this.errorSubject.next(authError);
            });
            throw error;
        }), finalize(() => {
            this.ngZone.run(() => {
                this.loadingSubject.next(false);
            });
        }));
    }
    refreshToken() {
        const refreshToken = this.getRefreshToken();
        const token = this.getToken();
        if (!refreshToken || !token) {
            this.logout();
            throw new Error('No refresh token available');
        }
        const refreshUrl = `${this.API_URL}${API_CONFIG.endpoints.auth.refreshToken}`;
        return this.http.post(refreshUrl, {
            token,
            refreshToken
        }).pipe(tap(response => {
            this.storeToken(response.token);
            this.storeRefreshToken(response.refreshToken);
        }), catchError((error) => {
            console.error('Token refresh error:', error);
            this.logout();
            throw error;
        }));
    }
    getToken() {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
            // Check if token is expired, but don't logout automatically
            // Let the interceptor handle 401 responses instead
            try {
                const payload = this.decodeToken(token);
                if (payload && payload.exp) {
                    const expirationDate = new Date(payload.exp * 1000);
                    const now = new Date();
                    const timeToExpiry = expirationDate.getTime() - now.getTime();
                    const minutesToExpiry = Math.floor(timeToExpiry / 1000 / 60);
                    console.log('[AuthService] Token expiration:', expirationDate);
                    console.log('[AuthService] Current time:', now);
                    console.log('[AuthService] Minutes to expiry:', minutesToExpiry);
                    console.log('[AuthService] Token expired:', now > expirationDate);
                    // Only auto-logout if token is very expired (more than 5 minutes)
                    // This prevents premature logouts due to clock skew
                    if (timeToExpiry < -300000) { // -5 minutes
                        console.warn('[AuthService] Token has been expired for more than 5 minutes');
                        this.logout();
                        return null;
                    }
                    else if (now > expirationDate) {
                        console.warn('[AuthService] Token is recently expired, allowing backend to handle it');
                    }
                }
            }
            catch (e) {
                console.error('[AuthService] Error checking token expiration:', e);
            }
        }
        else {
            console.warn('[AuthService] No token found in localStorage');
        }
        return token;
    }
    decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
        catch (e) {
            console.error('[AuthService] Error decoding token:', e);
            return null;
        }
    }
    getRefreshToken() {
        return localStorage.getItem(this.refreshTokenKey);
    }
    isAuthenticated() {
        return this.hasToken();
    }
    getUser() {
        return this.userSubject.value;
    }
    getCurrentUser() {
        return this.getStoredUser();
    }
    getRoles() {
        return this.rolesSubject.value;
    }
    hasRole(role) {
        return this.rolesSubject.value.includes(role);
    }
    isAdmin() {
        return this.hasRole('Admin');
    }
    isManager() {
        return this.hasRole('Manager');
    }
    isEmployee() {
        return this.hasRole('Employee');
    }
    clearError() {
        this.errorSubject.next(null);
    }
    hasToken() {
        const token = localStorage.getItem(this.tokenKey);
        return !!token;
    }
    storeToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }
    storeRefreshToken(refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
    storeUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    getStoredUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }
    getStoredRoles() {
        const user = this.getStoredUser();
        return user?.roles || [];
    }
    clearAuthData() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userKey);
    }
    updateAuthState(user) {
        this.isAuthenticatedSubject.next(true);
        this.userSubject.next(user);
        this.rolesSubject.next(user.roles);
    }
    validateTokenOnInit() {
        const token = this.getToken();
        const user = this.getStoredUser();
        if (token && user) {
            this.isAuthenticatedSubject.next(true);
            this.userSubject.next(user);
            this.rolesSubject.next(user.roles);
        }
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.HttpErrorService), i0.ɵɵinject(i0.NgZone)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2.HttpErrorService }, { type: i0.NgZone }], null); })();
//# sourceMappingURL=auth.service.js.map