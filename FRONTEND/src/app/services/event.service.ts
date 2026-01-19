import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, TimeoutError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  Event,
  EventDetail,
  EventParticipant,
  EventFilter,
  EventKPI,
  EventListResponse,
  EventDetailResponse,
  ParticipantsResponse,
  PointsAwardResponse,
  PointsAward,
  BulkAwardRequest,
  RankAwardRequest,
  CreateEventRequest,
  UpdateEventRequest,
  AttendanceStatus
} from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly EVENT_API_URL = `${API_CONFIG.getApiUrl()}/event`;

  // Observables for event data caching
  private eventListSubject$ = new BehaviorSubject<Event[]>([]);
  private eventDetailSubject$ = new BehaviorSubject<EventDetail | null>(null);
  private participantsSubject$ = new BehaviorSubject<EventParticipant[]>([]);
  private kpiSubject$ = new BehaviorSubject<EventKPI | null>(null);

  // Public observables
  public eventList$ = this.eventListSubject$.asObservable();
  public eventDetail$ = this.eventDetailSubject$.asObservable();
  public participants$ = this.participantsSubject$.asObservable();
  public kpi$ = this.kpiSubject$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get list of all events
   * BACKEND: GET /api/event
   */
  getEvents(filter?: EventFilter): Observable<Event[]> {
    let url = `${this.EVENT_API_URL}`;
    
    // Add query parameters if filter is provided
    if (filter) {
      const params = new URLSearchParams();
      if (filter.status) {
        params.append('status', filter.status);
      }
      if (filter.searchText) {
        params.append('search', filter.searchText);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    
    console.log('[EventService] Fetching events from:', url, 'with filter:', filter);

    return this.http.get<any>(url).pipe(
      timeout(15000), // 15 second timeout
      tap(response => {
        console.log('[EventService] Raw response received:', response);
        const events = Array.isArray(response) ? response : response.data || [];
        console.log('[EventService] Events extracted:', events);
        console.log('[EventService] Events count:', events.length);
        this.eventListSubject$.next(events);
      }),
      map(response => {
        const events = Array.isArray(response) ? response : response.data || [];
        console.log('[EventService] Mapping response, returning:', events);
        return events;
      }),
      catchError(error => {
        console.error('[EventService] Error fetching events:', error);
        this.eventListSubject$.next([]);
        if (error instanceof TimeoutError) {
          return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
        }
        throw error;
      })
    );
  }

  /**
   * Get detailed view of a single event
   * BACKEND: GET /api/event/{id}
   */
  getEventDetail(eventId: string): Observable<EventDetail> {
    const url = `${this.EVENT_API_URL}/${eventId}`;
    console.log('[EventService] Fetching event detail from:', url);

    return this.http.get<any>(url).pipe(
      timeout(15000), // 15 second timeout
      tap(response => {
        const event = response.data || response;
        console.log('[EventService] Event detail loaded:', event);
        this.eventDetailSubject$.next(event);
      }),
      map(response => response.data || response),
      catchError(error => {
        console.error('[EventService] Error fetching event detail:', error);
        if (error instanceof TimeoutError) {
          return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
        }
        throw error;
      })
    );
  }

  /**
   * Get participants for a specific event (from event detail)
   * Note: Not yet available in current event detail model
   */
  getEventParticipants(
    eventId: string,
    filters?: { attendanceStatus?: AttendanceStatus; searchText?: string }
  ): Observable<EventParticipant[]> {
    const error = new Error('Get participants endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Compute KPI from event list (client-side calculation)
   * No backend endpoint required
   */
  computeKPIFromEvents(events: Event[]): EventKPI {
    const kpi: EventKPI = {
      totalEvents: events.length,
      activeEvents: events.filter(e => e.status === 'Active').length,
      upcomingEvents: events.filter(e => e.status === 'Upcoming').length,
      completedEvents: events.filter(e => e.status === 'Completed').length,
      totalParticipants: 0,
      totalPointsAllocated: 0
    };
    console.log('[EventService] KPI computed:', kpi);
    this.kpiSubject$.next(kpi);
    return kpi;
  }

  /**
   * Award points to all attended participants
   * BACKEND: Not yet implemented
   */
  bulkAwardPoints(eventId: string): Observable<any> {
    const error = new Error('Bulk award endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Award points by rank
   * BACKEND: Not yet implemented
   */
  awardPointsByRank(eventId: string, request: RankAwardRequest): Observable<any> {
    const error = new Error('Rank award endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Get awarded points for an event
   * BACKEND: Not yet implemented
   */
  getAwardedPoints(eventId: string): Observable<PointsAward[]> {
    const error = new Error('Get awarded points endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Create a new event
   * BACKEND: POST /api/event
   */
  createEvent(request: CreateEventRequest): Observable<Event> {
    const url = `${this.EVENT_API_URL}`;
    console.log('[EventService] Creating event:', request);

    return this.http.post<any>(url, request).pipe(
      tap(response => {
        console.log('[EventService] Event created:', response);
      }),
      map(response => response.data || response),
      catchError(error => {
        console.error('[EventService] Error creating event:', error);
        throw error;
      })
    );
  }

  /**
   * Update an event
   * BACKEND: Not yet implemented
   */
  updateEvent(eventId: string, request: UpdateEventRequest): Observable<Event> {
    const error = new Error('Update event endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Update participant attendance status
   * BACKEND: Not yet implemented
   */
  updateParticipantStatus(
    eventId: string,
    participantId: string,
    status: AttendanceStatus
  ): Observable<any> {
    const error = new Error('Update participant status endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Remove a participant from an event
   * BACKEND: Not yet implemented
   */
  removeParticipant(eventId: string, participantId: string): Observable<any> {
    const error = new Error('Remove participant endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Complete an event
   * BACKEND: Not yet implemented
   */
  completeEvent(eventId: string): Observable<any> {
    const error = new Error('Complete event endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Cancel an event
   * BACKEND: Not yet implemented
   */
  cancelEvent(eventId: string): Observable<any> {
    const error = new Error('Cancel event endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Check in a participant
   * BACKEND: Not yet implemented
   */
  checkInParticipant(eventId: string, participantId: string): Observable<any> {
    const error = new Error('Check-in endpoint not implemented on backend');
    console.error('[EventService]', error.message);
    return throwError(() => error);
  }

  /**
   * Clear cached data
   */
  clearCache(): void {
    this.eventListSubject$.next([]);
    this.eventDetailSubject$.next(null);
    this.participantsSubject$.next([]);
  }
}
