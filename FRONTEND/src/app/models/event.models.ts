/**
 * Event-related models and interfaces
 * Used for Event Management admin module
 * Aligned with backend DTOs and changelog v2026.01.20
 */

export interface Event {
  id: string;
  name: string;
  description: string;
  status: EventStatus;
  eventDate: string;
  registrationEndDateUtc?: string;
  registrationEndDate?: string;
  location?: string;
  maxParticipants?: number;
  participantCount: number;
  totalPointsPool: number;
  distributedPoints: number;
  bannerImageUrl?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventDetail extends Event {
  registeredCount: number;
  checkedInCount: number;
}

// Computed property helper
export function getRemainingPoints(event: Event | EventDetail): number {
  return (event.totalPointsPool || 0) - (event.distributedPoints || 0);
}

export interface EventParticipant {
  id?: string;
  odataetag?: string;
  userId: string;
  name: string;
  employeeId: string;
  email: string;
  attendanceStatus: AttendanceStatus;
  pointsAwarded?: number;
  eventRank?: number;
  registeredAt?: string;
  checkedInAt?: string;
  awardedAt?: string;
}

export interface PointsAward {
  id?: string;
  participantId: string;
  name?: string;
  employeeId?: string;
  rank?: number;
  pointsAwarded: number;
  awardedAt?: string;
  awardedBy?: string;
}

export interface PoolStatus {
  eventId: string;
  eventName: string;
  status: string;
  pool: {
    totalPool: number | null;
    distributedPoints: number;
    remainingPoints: number | null;
    isUnlimited: boolean;
  };
  participants: {
    total: number;
    awarded: number;
    pending: number;
  };
}

/**
 * Distribution mode for bulk awards
 */
export type DistributionMode = 'Manual' | 'EqualSplit' | 'RankBased';

export interface BulkAwardItem {
  participantId: string;
  points: number;
  rank?: number;
}

export interface BulkAwardRequest {
  awards: BulkAwardItem[];
  /** Distribution mode: Manual (default), EqualSplit, or RankBased */
  mode?: DistributionMode;
  /** When true, consumes the entire remaining pool */
  consumeEntirePool?: boolean;
  /** Points for each rank position (used only in RankBased mode) */
  rankPoints?: number[];
}

export interface BulkAwardResponse {
  success: boolean;
  message: string;
  eventId: string;
  totalPointsAwarded: number;
  participantsAwarded: number;
  remainingPoolPoints: number | null;
}

export interface RankAwardRequest {
  points: number;
  rank?: number;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  eventDate: string;
  location?: string;
  maxParticipants?: number;
  totalPointsPool?: number;
  registrationEndDateUtc?: string;
  bannerImageUrl?: string;
}

export interface UpdateEventRequest {
  name?: string;
  description?: string;
  eventDate?: string;
  registrationEndDateUtc?: string;
  location?: string;
  maxParticipants?: number;
  totalPointsPool?: number;
  bannerImageUrl?: string;
}

export interface EventListResponse {
  data: Event[];
  count: number;
}

export interface EventDetailResponse {
  data: EventDetail;
  participantCount: number;
}

export interface ParticipantsResponse {
  data: EventParticipant[];
  total: number;
}

export interface PointsAwardResponse {
  data: PointsAward[];
}

export interface EventFilter {
  status?: EventStatus;
  searchText?: string;
}

// Backend-aligned status values (API returns these strings)
export type EventStatus = 'Upcoming' | 'Live' | 'Completed' | 'Cancelled';
export type AttendanceStatus = 'Registered' | 'Attended';

export interface EventKPI {
  totalEvents: number;
  liveEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  cancelledEvents: number;
  totalParticipants: number;
  totalPointsAllocated: number;
}
