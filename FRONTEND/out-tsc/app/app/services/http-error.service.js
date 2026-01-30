import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HttpErrorService {
    constructor() { }
    /**
     * Parse HTTP error into structured AuthError for auth flows
     */
    parseAuthError(error) {
        console.error('Parsing HTTP Error:', error);
        if (!error) {
            return { code: 'UNKNOWN', message: 'An unknown error occurred' };
        }
        // Handle timeout or network errors (status 0)
        if (error.status === 0) {
            if (error.error instanceof ProgressEvent) {
                return {
                    code: 'NETWORK_ERROR',
                    message: 'Network timeout or backend not responding. Ensure backend is running on https://localhost:7113'
                };
            }
            return {
                code: 'NETWORK_ERROR',
                message: 'Unable to connect to backend server. Ensure it is running on https://localhost:7113'
            };
        }
        // Handle rate limiting (429)
        if (error.status === 429) {
            const retryAfter = this.parseRetryAfterHeader(error);
            return {
                code: 'RATE_LIMITED',
                message: this.formatRetryAfterMessage(retryAfter),
                retryAfterSeconds: retryAfter
            };
        }
        // Handle account locked (423 or 401 with lockedOut flag)
        if (error.status === 423 || (error.status === 401 && error.error?.lockedOut)) {
            const retryAfter = error.error?.retryAfterSeconds ?? this.parseRetryAfterHeader(error);
            return {
                code: 'ACCOUNT_LOCKED',
                message: error.error?.message || 'Account temporarily locked due to too many failed attempts.',
                retryAfterSeconds: retryAfter,
                lockedOut: true
            };
        }
        // Handle standard 401 unauthorized
        if (error.status === 401) {
            return {
                code: 'INVALID_CREDENTIALS',
                message: error.error?.message || 'Invalid email or password'
            };
        }
        // Handle 5xx server errors
        if (error.status >= 500) {
            return {
                code: 'SERVER_ERROR',
                message: error.error?.message || 'Server error. Please try again later.'
            };
        }
        // Fallback to generic message extraction
        return {
            code: 'UNKNOWN',
            message: this.getErrorMessage(error)
        };
    }
    /**
     * Parse Retry-After header from HTTP response
     * Supports both seconds (integer) and HTTP-date formats
     */
    parseRetryAfterHeader(error) {
        const retryAfter = error.headers?.get('Retry-After');
        if (!retryAfter) {
            // Default fallback if header is missing
            return 60;
        }
        // Check if it's a number (seconds)
        const seconds = parseInt(retryAfter, 10);
        if (!isNaN(seconds)) {
            return seconds;
        }
        // Try parsing as HTTP-date
        try {
            const date = new Date(retryAfter);
            const now = new Date();
            const diffSeconds = Math.max(0, Math.floor((date.getTime() - now.getTime()) / 1000));
            return diffSeconds;
        }
        catch {
            return 60; // Default fallback
        }
    }
    /**
     * Format retry-after duration into human-readable message
     */
    formatRetryAfterMessage(seconds) {
        if (seconds >= 60) {
            const minutes = Math.ceil(seconds / 60);
            return `Too many attempts. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`;
        }
        return `Too many attempts. Please try again in ${seconds} second${seconds > 1 ? 's' : ''}.`;
    }
    getErrorMessage(error) {
        console.error('HTTP Error:', error);
        if (!error) {
            return 'An unknown error occurred';
        }
        // Handle timeout or network errors
        if (error.status === 0 && error.error instanceof ProgressEvent) {
            return 'Network timeout or backend not responding. Ensure backend is running on https://localhost:7113';
        }
        // Handle client-side errors
        if (error.error instanceof ErrorEvent) {
            return error.error.message || 'An error occurred';
        }
        // Handle server-side errors
        if (error.error) {
            // Check for standard error response structures
            if (typeof error.error === 'string') {
                return error.error;
            }
            if (error.error.message) {
                return error.error.message;
            }
            if (error.error.title) {
                return error.error.title;
            }
            if (error.error.error) {
                return error.error.error;
            }
        }
        // Handle by HTTP status code
        switch (error.status) {
            case 0:
                return 'Unable to connect to backend server. Ensure it is running on https://localhost:7113';
            case 400:
                return error.error?.message || 'Bad request. Please check your input.';
            case 401:
                return error.error?.message || 'Invalid email or password';
            case 403:
                return error.error?.message || 'Access denied';
            case 404:
                return error.error?.message || 'Resource not found';
            case 429:
                return 'Too many requests. Please try again later.';
            case 500:
                return error.error?.message || 'Server error. Please try again later.';
            case 503:
                return 'Service unavailable. Backend may be starting up.';
            default:
                if (error.statusText) {
                    return `Error: ${error.status} ${error.statusText}`;
                }
                return 'An error occurred. Please try again.';
        }
    }
    static { this.ɵfac = function HttpErrorService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HttpErrorService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HttpErrorService, factory: HttpErrorService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HttpErrorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();
//# sourceMappingURL=http-error.service.js.map