import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
export const authInterceptor = (req, next) => {
    const authService = inject(AuthService);
    // Get token directly from localStorage to avoid expiration check issues
    let token = localStorage.getItem('agdata_token');
    // Log for debugging
    console.log('[AuthInterceptor] ======================================');
    console.log('[AuthInterceptor] Processing request:', req.url);
    console.log('[AuthInterceptor] Method:', req.method);
    console.log('[AuthInterceptor] Token from localStorage:', !!token);
    if (token) {
        console.log('[AuthInterceptor] Token preview:', token.substring(0, 50) + '...');
        // Check if token looks valid (JWT has 3 parts separated by dots)
        const tokenParts = token.split('.');
        console.log('[AuthInterceptor] Token parts count:', tokenParts.length, '(should be 3 for JWT)');
        // Decode and check expiration
        try {
            const payload = JSON.parse(atob(tokenParts[1].replace(/-/g, '+').replace(/_/g, '/')));
            const exp = payload.exp * 1000;
            const now = Date.now();
            const timeToExpiry = exp - now;
            console.log('[AuthInterceptor] Token expires in:', Math.floor(timeToExpiry / 1000 / 60), 'minutes');
            if (timeToExpiry < 0) {
                console.warn('[AuthInterceptor] Token is expired!');
                token = null; // Don't use expired token
            }
        }
        catch (e) {
            console.error('[AuthInterceptor] Error checking token:', e);
        }
    }
    // Clone request and add token if available
    let clonedReq = req;
    const isAuth = isAuthEndpoint(req.url);
    console.log('[AuthInterceptor] Is auth endpoint?', isAuth);
    console.log('[AuthInterceptor] Should add token?', token && !isAuth);
    if (token && !isAuth) {
        console.log('[AuthInterceptor] ✓ Adding Authorization header with Bearer token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        // Only add Content-Type if not already set and body is not empty
        if (!req.headers.has('Content-Type') && req.body !== null && req.body !== undefined) {
            headers['Content-Type'] = 'application/json';
        }
        clonedReq = req.clone({ setHeaders: headers });
        console.log('[AuthInterceptor] Headers:', clonedReq.headers.keys());
        console.log('[AuthInterceptor] Authorization header:', clonedReq.headers.get('Authorization')?.substring(0, 50) + '...');
    }
    else if (!token) {
        console.warn('[AuthInterceptor] ✗ No token available for request:', req.url);
        console.warn('[AuthInterceptor] This request will be sent without authentication!');
    }
    else if (isAuth) {
        console.log('[AuthInterceptor] Skipping auth header for auth endpoint:', req.url);
    }
    return next(clonedReq).pipe(catchError((error) => {
        console.error('[AuthInterceptor] Request error:', error.status, error.statusText);
        console.error('[AuthInterceptor] Error details:', error);
        if (error.status === 401) {
            console.warn('[AuthInterceptor] 401 Unauthorized - Token likely expired or invalid');
            console.warn('[AuthInterceptor] Current token:', authService.getToken()?.substring(0, 50));
            // If this is not a login/auth endpoint, log the user out
            if (!isAuthEndpoint(req.url)) {
                console.error('[AuthInterceptor] Logging out due to invalid/expired token');
                setTimeout(() => {
                    authService.logout();
                    window.location.href = '/login?expired=true';
                }, 100);
            }
        }
        return throwError(() => error);
    }));
};
function isAuthEndpoint(url) {
    // Only match auth endpoints - be specific to avoid matching event registration
    const authEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/refresh-token'];
    return authEndpoints.some(endpoint => url.includes(endpoint));
}
//# sourceMappingURL=auth.interceptor.js.map