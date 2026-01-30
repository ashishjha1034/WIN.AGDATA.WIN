import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, share } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Service for server-side validation checks with debouncing
 */
export class ValidationService {
    constructor(http) {
        this.http = http;
        this.apiUrl = environment.apiUrl;
        this.debounceTime = 500; // 500ms debounce
    }
    /**
     * Check email availability with debouncing
     */
    checkEmailAvailability(email, excludeUserId) {
        if (!email || email.trim().length === 0) {
            return of({ isValid: false, message: 'Email is required' });
        }
        let params = new HttpParams().set('email', email.trim());
        if (excludeUserId) {
            params = params.set('excludeUserId', excludeUserId);
        }
        return this.http.get(`${this.apiUrl}/validation/check-email`, { params }).pipe(catchError(error => {
            console.error('Email validation error:', error);
            return of({ isValid: true, message: '' }); // Fail open - let backend validate
        }));
    }
    /**
     * Check employee ID availability with debouncing
     */
    checkEmployeeIdAvailability(employeeId, excludeUserId) {
        if (!employeeId || employeeId.trim().length === 0) {
            return of({ isValid: false, message: 'Employee ID is required' });
        }
        let params = new HttpParams().set('employeeId', employeeId.trim());
        if (excludeUserId) {
            params = params.set('excludeUserId', excludeUserId);
        }
        return this.http.get(`${this.apiUrl}/validation/check-employee-id`, { params }).pipe(catchError(error => {
            console.error('Employee ID validation error:', error);
            return of({ isValid: true, message: '' }); // Fail open - let backend validate
        }));
    }
    /**
     * Check category name availability with debouncing
     */
    checkCategoryNameAvailability(name) {
        if (!name || name.trim().length === 0) {
            return of({ isValid: false, message: 'Category name is required' });
        }
        const params = new HttpParams().set('name', name.trim());
        return this.http.get(`${this.apiUrl}/validation/check-category-name`, { params }).pipe(catchError(error => {
            console.error('Category name validation error:', error);
            return of({ isValid: true, message: '' }); // Fail open - let backend validate
        }));
    }
    /**
     * Check product name availability with debouncing
     */
    checkProductNameAvailability(name, excludeProductId) {
        if (!name || name.trim().length === 0) {
            return of({ isValid: false, message: 'Product name is required' });
        }
        let params = new HttpParams().set('name', name.trim());
        if (excludeProductId) {
            params = params.set('excludeProductId', excludeProductId);
        }
        return this.http.get(`${this.apiUrl}/validation/check-product-name`, { params }).pipe(catchError(error => {
            console.error('Product name validation error:', error);
            return of({ isValid: true, message: '' }); // Fail open - let backend validate
        }));
    }
    /**
     * Creates a debounced uniqueness checker that can be used with forms
     * Returns an observable that emits checking state and results
     */
    createDebouncedChecker(valueChanges$, checkFn, debounceMs = this.debounceTime) {
        return valueChanges$.pipe(debounceTime(debounceMs), distinctUntilChanged(), switchMap(value => {
            if (!value || value.trim().length === 0) {
                return of({ checking: false, result: null });
            }
            // Emit checking state, then result
            return new Observable(subscriber => {
                subscriber.next({ checking: true, result: null });
                checkFn(value).subscribe({
                    next: result => {
                        subscriber.next({ checking: false, result });
                        subscriber.complete();
                    },
                    error: () => {
                        subscriber.next({ checking: false, result: { isValid: true, message: '' } });
                        subscriber.complete();
                    }
                });
            });
        }), share());
    }
    static { this.ɵfac = function ValidationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidationService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=validation.service.js.map