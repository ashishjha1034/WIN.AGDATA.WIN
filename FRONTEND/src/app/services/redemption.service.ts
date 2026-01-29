import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  RedemptionListResponse,
  RedemptionDetail,
  RedemptionStatus,
  ApproveRedemptionRequest,
  RejectRedemptionRequest,
  DeliverRedemptionRequest,
  RedemptionActionResponse
} from '../models/redemption.models';

@Injectable({
  providedIn: 'root'
})
export class RedemptionService {
  private apiUrl = `${environment.apiUrl}/admin/redemptions`;

  constructor(private http: HttpClient) {
    console.log('[RedemptionService] Initialized with apiUrl:', this.apiUrl);
  }

  /**
   * Get all redemptions with optional status filtering
   */
  getAllRedemptions(status?: RedemptionStatus): Observable<RedemptionListResponse> {
    let params = new HttpParams();
    if (status !== undefined && status !== null) {
      params = params.set('status', status.toString());
    }
    console.log('[RedemptionService] Fetching redemptions:', {
      url: this.apiUrl,
      status: status,
      params: params.toString()
    });
    return this.http.get<RedemptionListResponse>(this.apiUrl, { params });
  }

  /**
   * Get detailed redemption information
   */
  getRedemptionDetails(id: string): Observable<RedemptionDetail> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[RedemptionService] Fetching details:', url);
    return this.http.get<RedemptionDetail>(url);
  }

  /**
   * Approve a pending redemption
   */
  approveRedemption(id: string, request: ApproveRedemptionRequest): Observable<RedemptionActionResponse> {
    const url = `${this.apiUrl}/${id}/approve`;
    console.log('[RedemptionService] Approving redemption:', { url, request });
    return this.http.post<RedemptionActionResponse>(url, request);
  }

  /**
   * Reject a pending redemption
   */
  rejectRedemption(id: string, request: RejectRedemptionRequest): Observable<RedemptionActionResponse> {
    const url = `${this.apiUrl}/${id}/reject`;
    console.log('[RedemptionService] Rejecting redemption:', { url, request });
    return this.http.post<RedemptionActionResponse>(url, request);
  }

  /**
   * Mark an approved redemption as delivered
   */
  markAsDelivered(id: string, request: DeliverRedemptionRequest): Observable<RedemptionActionResponse> {
    const url = `${this.apiUrl}/${id}/deliver`;
    console.log('[RedemptionService] Marking as delivered:', { url, request });
    return this.http.post<RedemptionActionResponse>(url, request);
  }

  /**
   * Get status display label
   */
  getStatusLabel(status: RedemptionStatus): string {
    const labels: { [key in RedemptionStatus]: string } = {
      [RedemptionStatus.Pending]: 'Pending',
      [RedemptionStatus.Approved]: 'Approved',
      [RedemptionStatus.Rejected]: 'Rejected',
      [RedemptionStatus.Delivered]: 'Delivered',
      [RedemptionStatus.Cancelled]: 'Cancelled'
    };
    return labels[status];
  }

  /**
   * Get status CSS class for styling
   */
  getStatusClass(status: RedemptionStatus): string {
    const classes: { [key in RedemptionStatus]: string } = {
      [RedemptionStatus.Pending]: 'status-pending',
      [RedemptionStatus.Approved]: 'status-approved',
      [RedemptionStatus.Rejected]: 'status-rejected',
      [RedemptionStatus.Delivered]: 'status-delivered',
      [RedemptionStatus.Cancelled]: 'status-cancelled'
    };
    return classes[status];
  }
}
