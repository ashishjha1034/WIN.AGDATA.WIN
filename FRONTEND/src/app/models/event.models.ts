/**
 * Event-related models and interfaces
 * Used for Event Management admin module
 */

export interface Event {
  id: string;
  name: string;
  description: string;
  status: EventStatus;
  eventDate: string;
  endDate?: string;
  registrationDeadline?: string;
  location?: string;
  maxParticipants?: number;
  participantCount: number;
  pointsPerParticipant: number;
  totalPointsPool: number;
  pointsDistributed: number;
  bannerImageUrl?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventDetail extends Event {
  pointsRemaining: number;
  registeredCount: number;
  checkedInCount: number;
  attendedCount: number;
}

export interface EventParticipant {
  id?: string;
  userId: string;
  name: string;
  employeeId: string;
  email: string;
  attendanceStatus: AttendanceStatus;
  points?: number;
  rank?: ParticipantRank;
  registeredAt?: string;
  checkedInAt?: string;
  attendedAt?: string;
  pointsAwarded?: number;
  pointsAwardedAt?: string;
}

export interface PointsAward {
  id?: string;
  participantId: string;
  name?: string;
  employeeId?: string;
  rank: ParticipantRank;
  pointsAwarded: number;
  awardedAt?: string;
  awardedBy?: string;
}

export interface PointsPool {
  pointsPerParticipant: number;
  totalPointsPool: number;
  pointsDistributed: number;
  pointsRemaining: number;
}

export interface BulkAwardRequest {
  eventId: string;
  pointsPerParticipant: number;
  participantIds: string[];
}

export interface RankAwardRequest {
  eventId: string;
  participantId: string;
  rank: ParticipantRank;
  points: number;
}

export interface EventListResponse {
  data: Event[];
  total: number;
  page: number;
  pageSize: number;
}

export interface EventDetailResponse {
  data: EventDetail;
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
  dateRange?: {
    from?: string;
    to?: string;
  };
  participantCountRange?: {
    min?: number;
    max?: number;
  };
}

export type EventStatus = 'Draft' | 'Active' | 'Upcoming' | 'Completed' | 'Cancelled';
export type AttendanceStatus = 'Registered' | 'Checked-In' | 'Attended' | 'NoShow';
export type ParticipantRank = '1st' | '2nd' | '3rd' | 'Custom';

export interface EventKPI {
  totalEvents: number;
  activeEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  totalParticipants: number;
  totalPointsAllocated: number;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  eventDate: string;
  location?: string;
  maxParticipants?: number;
  totalPointsPool?: number;
  registrationEndDate?: string;
  bannerImageUrl?: string;
}

export interface UpdateEventRequest {
  name?: string;
  description?: string;
  eventDate?: string;
  endDate?: string;
  registrationDeadline?: string;
  location?: string;
  maxParticipants?: number;
  pointsPerParticipant?: number;
  status?: EventStatus;
}
