import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, finalize, distinctUntilChanged, map } from 'rxjs';
import { LoginRequest, LoginResponse, UserInfo } from '../models/auth.models';
import { HttpErrorService, AuthError } from './http-error.service';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${API_CONFIG.getApiUrl()}/auth`;
  private tokenKey = 'agdata_token';
  private refreshTokenKey = 'agdata_refresh_token';
  private userKey = 'agdata_user';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<UserInfo | null>(this.getStoredUser());
  public user$ = this.userSubject.asObservable();
  public currentUser$ = this.userSubject.asObservable();

  private rolesSubject = new BehaviorSubject<string[]>(this.getStoredRoles());
  public roles$ = this.rolesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable().pipe(distinctUntilChanged());

  private errorSubject = new BehaviorSubject<AuthError | null>(null);
  public error$ = this.errorSubject.asObservable();

  // Expose simple error message for backward compatibility
  public errorMessage$ = this.errorSubject.asObservable().pipe(
    map(err => err?.message ?? null)
  );

  constructor(
    private http: HttpClient,
    private errorService: HttpErrorService,
    private ngZone: NgZone
  ) {
    this.validateTokenOnInit();
    console.log('AuthService initialized with API URL:', this.API_URL);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const loginUrl = `${this.API_URL}${API_CONFIG.endpoints.auth.login}`;
    console.log('Sending login request to:', loginUrl);

    return this.http.post<LoginResponse>(loginUrl, credentials, { observe: 'response' }).pipe(
      map(response => {
        // Extract body from HttpResponse
        const body = response.body as LoginResponse;
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
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error response:', error);
        // Run inside Angular zone to ensure immediate change detection
        this.ngZone.run(() => {
          const authError = this.errorService.parseAuthError(error);
          this.errorSubject.next(authError);
        });
        throw error;
      }),
      finalize(() => {
        // Ensure loading is always set to false, regardless of success or error
        this.ngZone.run(() => {
          this.loadingSubject.next(false);
        });
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    this.rolesSubject.next([]);
    this.errorSubject.next(null);
  }

  forgotPassword(email: string): Observable<any> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const forgotUrl = `${this.API_URL}/forgot-password`;
    console.log('Sending forgot password request to:', forgotUrl);

    return this.http.post<any>(forgotUrl, { email }).pipe(
      tap(response => {
        console.log('Forgot password request successful');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Forgot password error:', error);
        this.ngZone.run(() => {
          const authError = this.errorService.parseAuthError(error);
          this.errorSubject.next(authError);
        });
        throw error;
      }),
      finalize(() => {
        this.ngZone.run(() => {
          this.loadingSubject.next(false);
        });
      })
    );
  }

  resetPassword(request: { token: string; newPassword: string }): Observable<any> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const resetUrl = `${this.API_URL}/reset-password`;
    console.log('Sending reset password request to:', resetUrl);

    return this.http.post<any>(resetUrl, request).pipe(
      tap(response => {
        console.log('Reset password successful');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Reset password error:', error);
        this.ngZone.run(() => {
          const authError = this.errorService.parseAuthError(error);
          this.errorSubject.next(authError);
        });
        throw error;
      }),
      finalize(() => {
        this.ngZone.run(() => {
          this.loadingSubject.next(false);
        });
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    const token = this.getToken();

    if (!refreshToken || !token) {
      this.logout();
      throw new Error('No refresh token available');
    }

    const refreshUrl = `${this.API_URL}${API_CONFIG.endpoints.auth.refreshToken}`;

    return this.http.post<LoginResponse>(refreshUrl, {
      token,
      refreshToken
    }).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeRefreshToken(response.refreshToken);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Token refresh error:', error);
        this.logout();
        throw error;
      })
    );
  }

  getToken(): string | null {
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
          } else if (now > expirationDate) {
            console.warn('[AuthService] Token is recently expired, allowing backend to handle it');
          }
        }
      } catch (e) {
        console.error('[AuthService] Error checking token expiration:', e);
      }
    } else {
      console.warn('[AuthService] No token found in localStorage');
    }
    
    return token;
  }
  
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('[AuthService] Error decoding token:', e);
      return null;
    }
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUser(): UserInfo | null {
    return this.userSubject.value;
  }

  getCurrentUser(): UserInfo | null {
    return this.getStoredUser();
  }

  getRoles(): string[] {
    return this.rolesSubject.value;
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.value.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isManager(): boolean {
    return this.hasRole('Manager');
  }

  isEmployee(): boolean {
    return this.hasRole('Employee');
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  private hasToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private storeUser(user: UserInfo): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getStoredUser(): UserInfo | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  private getStoredRoles(): string[] {
    const user = this.getStoredUser();
    return user?.roles || [];
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  private updateAuthState(user: UserInfo): void {
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
    this.rolesSubject.next(user.roles);
  }

  private validateTokenOnInit(): void {
    const token = this.getToken();
    const user = this.getStoredUser();

    if (token && user) {
      this.isAuthenticatedSubject.next(true);
      this.userSubject.next(user);
      this.rolesSubject.next(user.roles);
    }
  }
}
