import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  UserListItem,
  InviteUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserDetailsResponse,
  StatsDto
} from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private readonly API_URL = `${API_CONFIG.getApiUrl()}/admin`;
  private readonly USERS_API_URL = `${API_CONFIG.getApiUrl()}/users`; // For user CRUD operations
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AdminUsersService initialized with API URL:', this.API_URL);
  }

  /**
   * Get all users or filter by active status
   */
  getAllUsers(activeOnly: boolean = true): Observable<UserListResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<UserListResponse>(`${this.API_URL}/users`, {
      params: { activeOnly: activeOnly.toString() }
    }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get detailed information for a specific user
   */
  getUserDetails(userId: string): Observable<UserDetailsResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<UserDetailsResponse>(`${this.API_URL}/users/${userId}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get system statistics
   */
  getStats(): Observable<StatsDto> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<StatsDto>(`${this.API_URL}/stats`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Create/invite a new user - aligned with backend InviteUserRequest
   */
  createUser(request: InviteUserRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/users`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Update user information - uses /api/users endpoint
   */
  updateUser(userId: string, request: UpdateUserRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.put(`${this.USERS_API_URL}/${userId}`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Activate a user - uses /api/users endpoint
   */
  activateUser(userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.USERS_API_URL}/${userId}/activate`, {}).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
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
  deactivateUser(userId: string, force: boolean = false): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.USERS_API_URL}/${userId}/deactivate`, { force }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setLoading(false);
        // Don't transform 409/422 errors - let the caller handle them
        throw error;
      })
    );
  }

  /**
   * Check if error response is a deactivation warning (409 Conflict)
   */
  isDeactivationWarning(error: any): boolean {
    return error?.status === 409 && error?.error?.code === 'DEACTIVATE_USER_WARNINGS';
  }

  /**
   * Check if error response is a deactivation block (422 Unprocessable Entity)
   */
  isDeactivationBlocked(error: any): boolean {
    return error?.status === 422 && error?.error?.code === 'DEACTIVATE_USER_BLOCKED';
  }

  /**
   * Delete a user - uses /api/users endpoint
   */
  deleteUser(userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.delete(`${this.USERS_API_URL}/${userId}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get user transactions
   */
  getUserTransactions(userId: string, pageNumber: number = 1, pageSize: number = 50): Observable<any> {
    return this.http.get(`${API_CONFIG.getApiUrl()}/Transaction/user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get pending redemptions
   */
  getPendingRedemptions(): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.get(`${this.API_URL}/redemptions/pending`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Toggle user role between Admin and Employee
   * @param userId - The user ID to update
   * @param newRole - The new role ('Admin' or 'Employee')
   */
  toggleUserRole(userId: string, newRole: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.USERS_API_URL}/${userId}/toggle-role`, { newRole }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Private helper methods
   */
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // Handle FluentValidation errors (object with field names)
      if (error.error?.errors) {
        const validationErrors = error.error.errors;
        const errorMessages: string[] = [];
        for (const field in validationErrors) {
          if (Array.isArray(validationErrors[field])) {
            errorMessages.push(...validationErrors[field]);
          }
        }
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join('. ');
        }
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.title) {
        // ASP.NET Core validation error format
        errorMessage = error.error.title;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.status === 404) {
        errorMessage = 'User not found';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden - Admin access required';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized - Please login';
      } else if (error.status === 400) {
        errorMessage = 'Invalid request - Please check all fields';
      }
    }

    console.error('AdminUsersService error:', errorMessage, error);
    this.errorSubject.next(errorMessage);
    this.setLoading(false);

    return throwError(() => new Error(errorMessage));
  }
}
