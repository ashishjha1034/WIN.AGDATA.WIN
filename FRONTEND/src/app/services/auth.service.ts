import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError } from 'rxjs';
import { LoginRequest, LoginResponse, UserInfo } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api/auth';
  private tokenKey = 'agdata_token';
  private refreshTokenKey = 'agdata_refresh_token';
  private userKey = 'agdata_user';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<UserInfo | null>(this.getStoredUser());
  public user$ = this.userSubject.asObservable();

  private rolesSubject = new BehaviorSubject<string[]>(this.getStoredRoles());
  public roles$ = this.rolesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.validateTokenOnInit();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeRefreshToken(response.refreshToken);
        this.storeUser(response.user);
        this.updateAuthState(response.user);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        const errorMessage = error?.error?.message || 'Login failed. Please try again.';
        this.errorSubject.next(errorMessage);
        this.loadingSubject.next(false);
        throw error;
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

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    const token = this.getToken();

    if (!refreshToken || !token) {
      this.logout();
      throw new Error('No refresh token available');
    }

    return this.http.post<LoginResponse>(`${this.API_URL}/refresh-token`, {
      token,
      refreshToken
    }).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeRefreshToken(response.refreshToken);
      }),
      catchError(error => {
        this.logout();
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
