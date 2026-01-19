import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { EventDetail, EventParticipant, AttendanceStatus } from '../../../../models/event.models';

@Component({
  selector: 'app-event-detail-participants',
  templateUrl: './event-detail-participants.component.html',
  styleUrls: ['./event-detail-participants.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventDetailParticipantsComponent implements OnInit, OnDestroy, OnChanges {
  // expose Math to template
  public Math = Math;
  @Input() eventId: string = '';
  @Input() event: EventDetail | null = null;

  participants: EventParticipant[] = [];
  filteredParticipants: EventParticipant[] = [];
  isLoading = false;
  searchText = '';
  selectedAttendanceStatus: AttendanceStatus | 'All' = 'All';
  currentPage = 1;
  pageSize = 10;

  attendanceStatusOptions: Array<{ value: AttendanceStatus | 'All'; label: string }> = [
    { value: 'All', label: 'All' },
    { value: 'Registered', label: 'Registered' },
    { value: 'Checked-In', label: 'Checked-In' },
    { value: 'Attended', label: 'Attended' }
  ];

  private destroy$ = new Subject<void>();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && changes['eventId'].currentValue) {
      this.loadParticipants();
    }
    if (changes['event'] && changes['event'].currentValue) {
      this.applyFilters();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadParticipants(): void {
    if (!this.eventId) return;
    
    this.isLoading = true;
    this.eventService.getEventParticipants(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          console.log('[Participants] Loaded:', data);
          this.participants = data;
          this.applyFilters();
        },
        error: (error) => {
          console.error('[Participants] Error loading:', error);
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.participants];

    if (this.selectedAttendanceStatus !== 'All') {
      filtered = filtered.filter(p => p.attendanceStatus === this.selectedAttendanceStatus);
    }

    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.employeeId.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search)
      );
    }

    this.filteredParticipants = filtered.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  onStatusFilterChange(status: AttendanceStatus | 'All'): void {
    this.selectedAttendanceStatus = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.applyFilters();
  }

  checkInParticipant(participantId: string): void {
    if (!this.eventId) return;
    
    this.eventService.checkInParticipant(this.eventId, participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[Participants] Check-in successful');
          this.loadParticipants();
        },
        error: (error) => {
          console.error('[Participants] Check-in error:', error);
        }
      });
  }

  removeParticipant(participantId: string): void {
    if (!this.eventId) return;
    if (!confirm('Are you sure you want to remove this participant?')) return;
    
    this.eventService.removeParticipant(this.eventId, participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[Participants] Participant removed');
          this.loadParticipants();
        },
        error: (error) => {
          console.error('[Participants] Error removing:', error);
        }
      });
  }

  bulkCheckIn(): void {
    if (!this.eventId) return;
    const registeredOnly = this.participants.filter(p => p.attendanceStatus === 'Registered');
    if (registeredOnly.length === 0) {
      alert('No registered participants to check in');
      return;
    }
    if (!confirm(`Check in ${registeredOnly.length} participants?`)) return;
    
    registeredOnly.forEach(p => {
      this.eventService.updateParticipantStatus(this.eventId, p.userId, 'Checked-In')
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
    
    setTimeout(() => this.loadParticipants(), 500);
  }

  getTotalPages(): number {
    return Math.ceil(this.participants.length / this.pageSize);
  }

  getParticipantCount(): { total: number; registered: number; checkedIn: number; attended: number } {
    return {
      total: this.participants.length,
      registered: this.participants.filter(p => p.attendanceStatus === 'Registered').length,
      checkedIn: this.participants.filter(p => p.attendanceStatus === 'Checked-In').length,
      attended: this.participants.filter(p => p.attendanceStatus === 'Attended').length
    };
  }
}
