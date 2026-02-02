import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { EventDetail, EventParticipant } from '../../../../models/event.models';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-event-detail-participants',
  templateUrl: './event-detail-participants.component.html',
  styleUrls: ['./event-detail-participants.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventDetailParticipantsComponent implements OnInit, OnDestroy, OnChanges {
  // Expose Math to template
  public Math = Math;
  
  @Input() eventId: string = '';
  @Input() event: EventDetail | null = null;
  @Output() participantsChanged = new EventEmitter<void>();

  participants: EventParticipant[] = [];
  filteredParticipants: EventParticipant[] = [];
  isLoading = false;
  searchText = '';
  statusFilter: 'All' | 'Registered' | 'Checked-In' = 'All';
  showFilterDropdown = false;
  currentPage = 1;
  pageSize = 10;
  errorMessage = '';
  successMessage = '';

  // For toggle operations
  togglingParticipantId: string | null = null;
  deletingParticipantId: string | null = null;
  isCheckingInAll = false;

  private destroy$ = new Subject<void>();

  constructor(
    private eventService: EventService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && changes['eventId'].currentValue) {
      this.loadParticipants();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadParticipants(): void {
    if (!this.eventId) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.eventService.getEventParticipants(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          console.log('[Participants] Loaded:', data.length);
          this.participants = data;
          this.applyFilters();
        },
        error: (error) => {
          console.error('[Participants] Error loading:', error);
          this.errorMessage = 'Failed to load participant data';
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.participants];

    // Filter by status
    if (this.statusFilter === 'Registered') {
      filtered = filtered.filter(p => p.attendanceStatus === 'Registered');
    } else if (this.statusFilter === 'Checked-In') {
      filtered = filtered.filter(p => p.attendanceStatus === 'Attended');
    }

    // Filter by search text
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(search) ||
        p.employeeId?.toLowerCase().includes(search) ||
        p.email?.toLowerCase().includes(search)
      );
    }

    this.filteredParticipants = filtered;
    
    // Reset page if needed
    if (this.currentPage > this.getTotalPages()) {
      this.currentPage = 1;
    }
  }

  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(filter: 'All' | 'Registered' | 'Checked-In'): void {
    this.statusFilter = filter;
    this.showFilterDropdown = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  closeFilterDropdown(): void {
    this.showFilterDropdown = false;
  }

  /**
   * Toggle attendance status for a participant (check-in)
   */
  toggleAttendance(participant: EventParticipant): void {
    if (!this.eventId || !this.canToggleStatus(participant)) return;
    
    // If registered, check them in
    if (participant.attendanceStatus === 'Registered') {
      this.checkInParticipant(participant);
    }
  }

  checkInParticipant(participant: EventParticipant): void {
    this.togglingParticipantId = participant.userId;
    this.errorMessage = '';
    
    this.eventService.checkInParticipant(this.eventId, participant.userId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.togglingParticipantId = null))
      )
      .subscribe({
        next: () => {
          console.log('[Participants] Check-in successful');
          participant.attendanceStatus = 'Attended';
          participant.checkedInAt = new Date().toISOString();
          this.successMessage = `${participant.name} checked in successfully`;
          this.applyFilters();
          this.participantsChanged.emit();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('[Participants] Check-in error:', error);
          this.errorMessage = error?.error?.message || 'Failed to check in participant';
        }
      });
  }

  /**
   * Delete participant from event
   */
  deleteParticipant(participant: EventParticipant): void {
    if (!this.eventId || !this.canDelete(participant)) return;
    
    this.dialogService.confirm(
      `Remove ${participant.name} from this event?`,
      'Remove Participant',
      'Remove',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed) {
        this.deletingParticipantId = participant.userId;
        this.errorMessage = '';
        
        this.eventService.removeParticipant(this.eventId, participant.userId)
          .pipe(
            takeUntil(this.destroy$),
            finalize(() => (this.deletingParticipantId = null))
          )
          .subscribe({
            next: () => {
              console.log('[Participants] Removed successfully');
              this.participants = this.participants.filter(p => p.userId !== participant.userId);
              this.applyFilters();
              this.successMessage = `${participant.name} removed from event`;
              this.participantsChanged.emit();
              setTimeout(() => this.successMessage = '', 3000);
            },
            error: (error) => {
              console.error('[Participants] Remove error:', error);
              this.errorMessage = error?.error?.message || 'Failed to remove participant';
            }
          });
      }
    });
  }

  /**
   * Can batch check-in all registered participants?
   */
  canCheckInAll(): boolean {
    // Event must be Live
    if (this.event?.status !== 'Live') return false;
    // Must have registered participants
    const registeredCount = this.participants.filter(p => p.attendanceStatus === 'Registered').length;
    return registeredCount > 0;
  }

  /**
   * Get tooltip for check-in all button
   */
  getCheckInAllTooltip(): string {
    if (this.event?.status !== 'Live') {
      return 'Event must be Live to check in participants';
    }
    const registeredCount = this.participants.filter(p => p.attendanceStatus === 'Registered').length;
    if (registeredCount === 0) {
      return 'No registered participants to check in';
    }
    return `Check in all ${registeredCount} registered participants`;
  }

  /**
   * Batch check-in all registered participants
   */
  checkInAll(): void {
    if (!this.canCheckInAll()) return;
    
    const registeredParticipants = this.participants.filter(p => p.attendanceStatus === 'Registered');
    const count = registeredParticipants.length;
    
    this.dialogService.confirm(
      `Check in all ${count} registered participants?`,
      'Batch Check-In',
      'Check In All',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed) {
        this.isCheckingInAll = true;
        this.errorMessage = '';
        
        this.eventService.batchCheckIn(this.eventId)
          .pipe(
            takeUntil(this.destroy$),
            finalize(() => (this.isCheckingInAll = false))
          )
          .subscribe({
            next: (response) => {
              console.log('[Participants] Batch check-in successful:', response);
              const updated = response.updated || response.checkedInCount || count;
              this.successMessage = `Successfully checked in ${updated} participants`;
              this.loadParticipants();
              this.participantsChanged.emit();
              setTimeout(() => this.successMessage = '', 5000);
            },
            error: (error) => {
              console.error('[Participants] Batch check-in error:', error);
              this.errorMessage = error?.error?.message || 'Failed to check in all participants';
              this.loadParticipants(); // Refresh to show any partial updates
            }
          });
      }
    });
  }

  /**
   * Can toggle status? Only for Live events and non-awarded participants
   */
  canToggleStatus(participant: EventParticipant): boolean {
    // Event must be Live
    if (this.event?.status !== 'Live') return false;
    // Cannot toggle if points awarded
    if (participant.pointsAwarded && participant.pointsAwarded > 0) return false;
    // Can only toggle from Registered to Checked-In
    return participant.attendanceStatus === 'Registered';
  }

  /**
   * Can delete participant? Only if not awarded points
   */
  canDelete(participant: EventParticipant): boolean {
    // Cannot delete from completed events
    if (this.event?.status === 'Completed') return false;
    // Cannot delete if points awarded
    return !(participant.pointsAwarded && participant.pointsAwarded > 0);
  }

  /**
   * Get display status
   */
  getDisplayStatus(status: string): string {
    return status === 'Attended' ? 'Checked-In' : status;
  }

  /**
   * Is checked in?
   */
  isCheckedIn(participant: EventParticipant): boolean {
    return participant.attendanceStatus === 'Attended';
  }

  /**
   * Get paginated participants
   */
  getPaginatedParticipants(): EventParticipant[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredParticipants.slice(start, start + this.pageSize);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredParticipants.length / this.pageSize) || 1;
  }

  getRegisteredCount(): number {
    return this.participants.filter(p => p.attendanceStatus === 'Registered').length;
  }

  getCheckedInCount(): number {
    return this.participants.filter(p => p.attendanceStatus === 'Attended').length;
  }

  dismissError(): void {
    this.errorMessage = '';
  }

  dismissSuccess(): void {
    this.successMessage = '';
  }
}
