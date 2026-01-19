import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  Group,
  GroupMember,
  GroupDetails,
  GroupListResponse,
  GroupDetailsResponse,
  AddMembersToGroupRequest,
  CreateGroupRequest,
  UpdateGroupRequest,
  RemoveGroupMemberRequest
} from '../models/group.models';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupsService {
  private readonly API_URL = `${API_CONFIG.getApiUrl()}/admin`;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AdminGroupsService initialized with API URL:', this.API_URL);
  }

  /**
   * Get all groups
   */
  getAllGroups(): Observable<GroupListResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<GroupListResponse>(`${this.API_URL}/groups`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get group details with members
   */
  getGroupDetails(groupId: string): Observable<GroupDetailsResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<GroupDetailsResponse>(`${this.API_URL}/groups/${groupId}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Create a new group
   */
  createGroup(request: CreateGroupRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/groups`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Update group information
   */
  updateGroup(groupId: string, request: UpdateGroupRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.put(`${this.API_URL}/groups/${groupId}`, request).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Rename group
   */
  renameGroup(groupId: string, newName: string): Observable<any> {
    return this.updateGroup(groupId, { name: newName });
  }

  /**
   * Delete group
   */
  deleteGroup(groupId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.delete(`${this.API_URL}/groups/${groupId}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Add members to group
   */
  addMembersToGroup(request: AddMembersToGroupRequest): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.post(`${this.API_URL}/groups/${request.groupId}/members`, {
      userIds: request.userIds,
      roles: request.roles
    }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Remove member from group
   */
  removeMemberFromGroup(groupId: string, userId: string): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.delete(`${this.API_URL}/groups/${groupId}/members/${userId}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Update member role in group
   */
  updateMemberRole(groupId: string, userId: string, role: 'Member' | 'Lead'): Observable<any> {
    this.setLoading(true);
    this.clearError();

    return this.http.put(`${this.API_URL}/groups/${groupId}/members/${userId}`, { role }).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Export group members
   */
  exportGroupMembers(groupId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/groups/${groupId}/export`, {
      responseType: 'blob'
    }).pipe(
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
        errorMessage = 'Group not found';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden - Admin access required';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized - Please login';
      }
    }

    console.error('AdminGroupsService error:', errorMessage, error);
    this.errorSubject.next(errorMessage);
    this.setLoading(false);

    return throwError(() => new Error(errorMessage));
  }
}
