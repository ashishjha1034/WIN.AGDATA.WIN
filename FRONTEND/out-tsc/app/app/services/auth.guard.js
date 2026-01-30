import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
import * as i2 from "@angular/router";
export class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.isAuthenticated()) {
            // Check if the route has specific role requirements
            const requiredRoles = route.data['roles'];
            if (requiredRoles && requiredRoles.length > 0) {
                const userRoles = this.authService.getRoles();
                if (requiredRoles.some(role => userRoles.includes(role))) {
                    return true;
                }
                // User doesn't have required role
                this.router.navigate(['/unauthorized']);
                return false;
            }
            return true;
        }
        // Not authenticated, redirect to login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    static { this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
//# sourceMappingURL=auth.guard.js.map