import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Log for debugging
  console.log('[AuthInterceptor] Processing request:', req.url);
  console.log('[AuthInterceptor] Token available:', !!token);

  // Clone request and add token if available
  let clonedReq = req;
  if (token && !isAuthEndpoint(req.url)) {
    console.log('[AuthInterceptor] Adding Authorization header');
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } else if (!token) {
    console.warn('[AuthInterceptor] No token available for request:', req.url);
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('[AuthInterceptor] Request error:', error.status, error.statusText);
      if (error.status === 401) {
        console.warn('[AuthInterceptor] 401 error detected');
        // For now, just log. Refresh logic can be added later
      }
      return throwError(() => error);
    })
  );
};

function isAuthEndpoint(url: string): boolean {
  const authEndpoints = ['/login', '/register', '/forgot-password', '/reset-password', '/refresh-token'];
  return authEndpoints.some(endpoint => url.includes(endpoint));
}
