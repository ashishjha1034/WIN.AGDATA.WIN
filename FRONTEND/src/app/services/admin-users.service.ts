import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  User,
  UserWithDetails,
  UserStats,
  AdjustPointsRequest,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserDetailsResponse,
  StatsDto,
  PaginationOptions,
  UserFilterCriteria
} from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private readonly API_URL = `${API_CONFIG.getApiUrl()}/admin`;
  
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
   * Create a new user
   */
  createUser(request: CreateUserRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/users`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Update user information
   */
  updateUser(userId: string, request: UpdateUserRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.put(`${this.API_URL}/users/${userId}`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Adjust user points
   */
  adjustPoints(request: AdjustPointsRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/adjust-points`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Activate a user
   */
  activateUser(userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/users/${userId}/activate`, {}).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Deactivate a user
   */
  deactivateUser(userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/users/${userId}/deactivate`, {}).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Delete a user
   */
  deleteUser(userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.delete(`${this.API_URL}/users/${userId}`).pipe(
      tap(() => this.setLoading(false)),
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
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.status === 404) {
        errorMessage = 'User not found';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden - Admin access required';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized - Please login';
      }
    }

    console.error('AdminUsersService error:', errorMessage, error);
    this.errorSubject.next(errorMessage);
    this.setLoading(false);

    return throwError(() => new Error(errorMessage));
  }
}
