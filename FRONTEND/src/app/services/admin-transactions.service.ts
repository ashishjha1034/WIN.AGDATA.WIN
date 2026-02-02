import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  AdminTransaction,
  TransactionFilterRequest,
  PagedTransactionResponse,
  TransactionSummary,
  PointsChartResponse,
  AdjustPointsRequest,
  AdjustPointsResponse,
  TransactionType
} from '../models/admin-transaction.models';

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionsService {
  private readonly API_URL = `${API_CONFIG.getApiUrl()}/admin`;
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AdminTransactionsService initialized with API URL:', this.API_URL);
  }

  /**
   * Get all transactions with filtering and pagination
   */
  getAllTransactions(filter: TransactionFilterRequest): Observable<PagedTransactionResponse> {
    this.setLoading(true);
    this.clearError();

    let params = new HttpParams();
    
    params = params.set('pageNumber', filter.pageNumber.toString());
    params = params.set('pageSize', filter.pageSize.toString());
    
    if (filter.userId) {
      params = params.set('userId', filter.userId);
    }
    if (filter.type) {
      params = params.set('type', filter.type);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }
    if (filter.source) {
      params = params.set('source', filter.source);
    }
    if (filter.searchQuery) {
      params = params.set('searchQuery', filter.searchQuery);
    }
    if (filter.sortBy) {
      params = params.set('sortBy', filter.sortBy);
    }
    if (filter.sortDescending !== undefined) {
      params = params.set('sortDescending', filter.sortDescending.toString());
    }

    return this.http.get<PagedTransactionResponse>(`${this.API_URL}/transactions`, { params }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get transaction details by ID
   */
  getTransactionDetails(id: string): Observable<AdminTransaction> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<AdminTransaction>(`${this.API_URL}/transactions/${id}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get transaction summary statistics
   */
  getTransactionSummary(startDate?: string, endDate?: string): Observable<TransactionSummary> {
    this.setLoading(true);
    this.clearError();

    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<TransactionSummary>(`${this.API_URL}/transactions/summary`, { params }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get monthly points chart data
   */
  getPointsChart(months: number = 6): Observable<PointsChartResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<PointsChartResponse>(`${this.API_URL}/stats/points-chart`, {
      params: new HttpParams().set('months', months.toString())
    }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get filtered monthly points chart data (synced with table/KPIs filters)
   */
  getFilteredPointsChart(filter: TransactionFilterRequest): Observable<PointsChartResponse> {
    let params = new HttpParams();
    
    if (filter.userId) {
      params = params.set('userId', filter.userId);
    }
    if (filter.type) {
      params = params.set('type', filter.type);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }
    if (filter.source) {
      params = params.set('source', filter.source);
    }

    return this.http.get<PointsChartResponse>(`${this.API_URL}/transactions/chart`, { params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Adjust user points (admin action)
   */
  adjustPoints(request: AdjustPointsRequest): Observable<AdjustPointsResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.post<AdjustPointsResponse>(`${this.API_URL}/adjust-points`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Export transactions to CSV
   */
  exportTransactions(filter: TransactionFilterRequest): Observable<Blob> {
    let params = new HttpParams();
    
    if (filter.userId) {
      params = params.set('userId', filter.userId);
    }
    if (filter.type) {
      params = params.set('type', filter.type);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }
    if (filter.source) {
      params = params.set('source', filter.source);
    }
    if (filter.searchQuery) {
      params = params.set('searchQuery', filter.searchQuery);
    }

    return this.http.get(`${this.API_URL}/transactions/export`, {
      params,
      responseType: 'blob'
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Download CSV file
   */
  downloadCsv(blob: Blob, filename?: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Get type display label
   */
  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'Earned': 'Earned',
      'Redeemed': 'Redeemed',
      'Adjusted': 'Adjusted',
      'Refunded': 'Refunded'
    };
    return labels[type] || type;
  }

  /**
   * Get type badge CSS class
   */
  getTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Earned': 'type-earned',
      'Redeemed': 'type-redeemed',
      'Adjusted': 'type-adjusted',
      'Refunded': 'type-refunded'
    };
    return classes[type] || 'type-default';
  }

  /**
   * Get source icon
   */
  getSourceIcon(source: string): string {
    const icons: { [key: string]: string } = {
      'Event': '🎉',
      'Product': '🛍️',
      'Admin': '👤',
      'System': '⚙️'
    };
    return icons[source] || '📝';
  }

  /**
   * Get source CSS class
   */
  getSourceClass(source: string): string {
    const classes: { [key: string]: string } = {
      'Event': 'source-event',
      'Product': 'source-product',
      'Admin': 'source-admin',
      'System': 'source-system'
    };
    return classes[source] || 'source-default';
  }

  /**
   * Format points with sign
   */
  formatPoints(points: number): string {
    // Show just 0 if points is zero
    if (points === 0) return '0';
    if (points > 0) {
      return `+${points.toLocaleString()}`;
    }
    return points.toLocaleString();
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
        errorMessage = 'Transaction not found';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden - Admin access required';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized - Please login';
      }
    }

    console.error('AdminTransactionsService error:', errorMessage, error);
    this.errorSubject.next(errorMessage);
    this.setLoading(false);

    return throwError(() => new Error(errorMessage));
  }
}
