import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, TimeoutError, forkJoin } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class EventService {
    constructor(http) {
        this.http = http;
        this.EVENT_API_URL = `${API_CONFIG.getApiUrl()}/event`;
        // Observables for event data caching
        this.eventListSubject$ = new BehaviorSubject([]);
        this.eventDetailSubject$ = new BehaviorSubject(null);
        this.participantsSubject$ = new BehaviorSubject([]);
        this.kpiSubject$ = new BehaviorSubject(null);
        // Public observables
        this.eventList$ = this.eventListSubject$.asObservable();
        this.eventDetail$ = this.eventDetailSubject$.asObservable();
        this.participants$ = this.participantsSubject$.asObservable();
        this.kpi$ = this.kpiSubject$.asObservable();
    }
    /**
     * Get list of all events
     * BACKEND: GET /api/event
     */
    getEvents(filter) {
        const url = `${this.EVENT_API_URL}`;
        console.log('[EventService] Fetching events from:', url, 'with filter:', filter);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            console.log('[EventService] Raw response received:', response);
            let events = Array.isArray(response) ? response : response.data || [];
            // Client-side filtering by status
            if (filter?.status) {
                events = events.filter((e) => e.status === filter.status);
            }
            // Client-side search filtering
            if (filter?.searchText) {
                const search = filter.searchText.toLowerCase();
                events = events.filter((e) => e.name.toLowerCase().includes(search) ||
                    e.description?.toLowerCase().includes(search));
            }
            console.log('[EventService] Events after filter:', events.length);
            this.eventListSubject$.next(events);
        }), map(response => {
            let events = Array.isArray(response) ? response : response.data || [];
            if (filter?.status) {
                events = events.filter((e) => e.status === filter.status);
            }
            if (filter?.searchText) {
                const search = filter.searchText.toLowerCase();
                events = events.filter((e) => e.name.toLowerCase().includes(search) ||
                    e.description?.toLowerCase().includes(search));
            }
            return events;
        }), catchError(error => {
            console.error('[EventService] Error fetching events:', error);
            this.eventListSubject$.next([]);
            if (error instanceof TimeoutError) {
                return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
            }
            throw error;
        }));
    }
    /**
     * Get detailed view of a single event
     * BACKEND: GET /api/event/{id}
     */
    getEventDetail(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}`;
        console.log('[EventService] Fetching event detail from:', url);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            const event = response.data || response;
            // Add computed counts from participants if available
            const enrichedEvent = {
                ...event,
                registeredCount: response.participantCount || event.participantCount || 0,
                checkedInCount: 0 // Will be computed from participants
            };
            console.log('[EventService] Event detail loaded:', enrichedEvent);
            this.eventDetailSubject$.next(enrichedEvent);
        }), map(response => {
            const event = response.data || response;
            return {
                ...event,
                registeredCount: response.participantCount || event.participantCount || 0,
                checkedInCount: 0
            };
        }), catchError(error => {
            console.error('[EventService] Error fetching event detail:', error);
            if (error instanceof TimeoutError) {
                return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
            }
            throw error;
        }));
    }
    /**
     * Get participants for an event
     * BACKEND: GET /api/event/{eventId}/participants
     */
    getEventParticipants(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}/participants`;
        console.log('[EventService] Fetching participants from:', url);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            console.log('[EventService] Participants loaded:', response);
            const participants = response.data || [];
            this.participantsSubject$.next(participants);
        }), map(response => response.data || []), catchError(error => {
            console.error('[EventService] Error fetching participants:', error);
            throw error;
        }));
    }
    /**
     * Update participant attendance status
     * BACKEND: PATCH /api/event/{eventId}/participants/{participantId}/status
     */
    updateParticipantStatus(eventId, participantId, status) {
        const url = `${this.EVENT_API_URL}/${eventId}/participants/${participantId}/status`;
        console.log('[EventService] Updating participant status:', participantId, status);
        return this.http.patch(url, { status }).pipe(tap(response => {
            console.log('[EventService] Participant status updated:', response);
        }), catchError(error => {
            console.error('[EventService] Error updating participant status:', error);
            throw error;
        }));
    }
    /**
     * Remove participant from event
     * BACKEND: DELETE /api/event/{eventId}/participants/{participantId}
     */
    removeParticipant(eventId, participantId) {
        const url = `${this.EVENT_API_URL}/${eventId}/participants/${participantId}`;
        console.log('[EventService] Removing participant:', participantId);
        return this.http.delete(url).pipe(tap(response => {
            console.log('[EventService] Participant removed:', response);
        }), catchError(error => {
            console.error('[EventService] Error removing participant:', error);
            throw error;
        }));
    }
    /**
     * Get pool status for an event
     * BACKEND: GET /api/event/{eventId}/pool-status
     */
    getPoolStatus(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}/pool-status`;
        console.log('[EventService] Fetching pool status from:', url);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            console.log('[EventService] Pool status loaded:', response);
        }), catchError(error => {
            console.error('[EventService] Error fetching pool status:', error);
            throw error;
        }));
    }
    /**
     * Compute KPI from event list (client-side calculation)
     */
    computeKPIFromEvents(events) {
        const kpi = {
            totalEvents: events.length,
            liveEvents: events.filter(e => e.status === 'Live').length,
            upcomingEvents: events.filter(e => e.status === 'Upcoming').length,
            completedEvents: events.filter(e => e.status === 'Completed').length,
            cancelledEvents: events.filter(e => e.status === 'Cancelled').length,
            totalParticipants: events.reduce((sum, e) => sum + (e.participantCount || 0), 0),
            totalPointsAllocated: events.reduce((sum, e) => sum + (e.totalPointsPool || 0), 0)
        };
        console.log('[EventService] KPI computed:', kpi);
        this.kpiSubject$.next(kpi);
        return kpi;
    }
    /**
     * Create a new event
     * BACKEND: POST /api/event
     */
    createEvent(request) {
        const url = `${this.EVENT_API_URL}`;
        console.log('[EventService] Creating event:', request);
        return this.http.post(url, request).pipe(tap(response => {
            console.log('[EventService] Event created:', response);
        }), map(response => response.data || response), catchError(error => {
            console.error('[EventService] Error creating event:', error);
            throw error;
        }));
    }
    /**
     * Update an event
     * BACKEND: PUT /api/event/{id}
     */
    updateEvent(eventId, request) {
        const url = `${this.EVENT_API_URL}/${eventId}`;
        console.log('[EventService] Updating event:', eventId, request);
        return this.http.put(url, request).pipe(tap(response => {
            console.log('[EventService] Event updated:', response);
        }), map(response => response.data || response), catchError(error => {
            console.error('[EventService] Error updating event:', error);
            throw error;
        }));
    }
    /**
     * Activate an event (Upcoming → Live)
     * BACKEND: POST /api/event/{id}/activate
     */
    activateEvent(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}/activate`;
        console.log('[EventService] Activating event:', eventId);
        return this.http.post(url, {}).pipe(tap(response => {
            console.log('[EventService] Event activated:', response);
        }), catchError(error => {
            console.error('[EventService] Error activating event:', error);
            throw error;
        }));
    }
    /**
     * Complete an event (Live → Completed)
     * BACKEND: POST /api/event/{id}/complete
     */
    completeEvent(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}/complete`;
        console.log('[EventService] Completing event:', eventId);
        return this.http.post(url, {}).pipe(tap(response => {
            console.log('[EventService] Event completed:', response);
        }), catchError(error => {
            console.error('[EventService] Error completing event:', error);
            throw error;
        }));
    }
    /**
     * Cancel an event
     * BACKEND: POST /api/event/{id}/cancel
     */
    cancelEvent(eventId) {
        const url = `${this.EVENT_API_URL}/${eventId}/cancel`;
        console.log('[EventService] Cancelling event:', eventId);
        return this.http.post(url, {}).pipe(tap(response => {
            console.log('[EventService] Event cancelled:', response);
        }), catchError(error => {
            console.error('[EventService] Error cancelling event:', error);
            throw error;
        }));
    }
    /**
     * Check in a single participant
     * BACKEND: POST /api/event/{eventId}/check-in/{participantId}
     */
    checkInParticipant(eventId, participantId) {
        const url = `${this.EVENT_API_URL}/${eventId}/check-in/${participantId}`;
        console.log('[EventService] Checking in participant:', participantId);
        return this.http.post(url, {}).pipe(tap(response => {
            console.log('[EventService] Participant checked in:', response);
        }), catchError(error => {
            console.error('[EventService] Error checking in participant:', error);
            throw error;
        }));
    }
    /**
     * Bulk check-in all registered participants
     * Calls check-in endpoint for each registered participant
     */
    bulkCheckIn(eventId, participantIds) {
        console.log('[EventService] Bulk checking in participants:', participantIds.length);
        if (participantIds.length === 0) {
            return throwError(() => new Error('No participants to check in'));
        }
        // Create array of check-in observables
        const checkInRequests = participantIds.map(id => this.checkInParticipant(eventId, id).pipe(catchError(err => {
            console.warn(`[EventService] Failed to check in ${id}:`, err);
            return throwError(() => err);
        })));
        return forkJoin(checkInRequests).pipe(tap(results => {
            console.log('[EventService] Bulk check-in completed:', results.length);
        }), catchError(error => {
            console.error('[EventService] Error in bulk check-in:', error);
            throw error;
        }));
    }
    /**
     * Award points to a single participant
     * BACKEND: POST /api/event/{eventId}/award-points/{participantId}
     */
    awardPoints(eventId, participantId, request) {
        const url = `${this.EVENT_API_URL}/${eventId}/award-points/${participantId}`;
        console.log('[EventService] Awarding points:', participantId, request);
        return this.http.post(url, request).pipe(tap(response => {
            console.log('[EventService] Points awarded:', response);
        }), catchError(error => {
            console.error('[EventService] Error awarding points:', error);
            throw error;
        }));
    }
    /**
     * Bulk award points to multiple participants
     * BACKEND: POST /api/event/{eventId}/bulk-award-points
     */
    bulkAwardPoints(eventId, request) {
        const url = `${this.EVENT_API_URL}/${eventId}/bulk-award-points`;
        console.log('[EventService] Bulk awarding points:', request);
        return this.http.post(url, request).pipe(tap(response => {
            console.log('[EventService] Bulk award completed:', response);
        }), catchError(error => {
            console.error('[EventService] Error in bulk award:', error);
            throw error;
        }));
    }
    /**
     * Clear cached data
     */
    clearCache() {
        this.eventListSubject$.next([]);
        this.eventDetailSubject$.next(null);
        this.participantsSubject$.next([]);
    }
    static { this.ɵfac = function EventService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventService, factory: EventService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=event.service.js.map