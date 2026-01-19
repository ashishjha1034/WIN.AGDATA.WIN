import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { EventDetail, EventParticipant, PointsAward, RankAwardRequest, ParticipantRank } from '../../../../models/event.models';

@Component({
  selector: 'app-event-detail-points',
  templateUrl: './event-detail-points.component.html',
  styleUrls: ['./event-detail-points.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventDetailPointsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() eventId: string = '';
  @Input() event: EventDetail | null = null;

  participants: EventParticipant[] = [];
  awardedPoints: PointsAward[] = [];
  isLoading = false;
  isBulkAwarding = false;
  isRankAwarding = false;
  showBulkConfirmation = false;
  showRankForm = false;

  // Rank award form
  selectedParticipantId: string = '';
  selectedParticipantName: string = '';
  selectedRank: ParticipantRank = '1st';
  customPoints: number = 0;
  filteredParticipants: EventParticipant[] = [];
  showParticipantDropdown = false;

  rankOptions: Array<{ value: ParticipantRank; label: string }> = [
    { value: '1st', label: '🥇 1st Place' },
    { value: '2nd', label: '🥈 2nd Place' },
    { value: '3rd', label: '🥉 3rd Place' },
    { value: 'Custom', label: '⭐ Custom Rank' }
  ];

  private destroy$ = new Subject<void>();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && changes['eventId'].currentValue) {
      this.loadData();
    }
    if (changes['event'] && changes['event'].currentValue) {
      // update any derived values
      this.awardedPoints = this.awardedPoints || [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    if (!this.eventId) return;
    
    this.isLoading = true;

    // Load participants for dropdown
    this.eventService.getEventParticipants(this.eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.participants = data.filter(p => p.attendanceStatus === 'Attended');
        }
      });

    // Load awarded points
    this.eventService.getAwardedPoints(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          console.log('[Points] Awarded points loaded:', data);
          this.awardedPoints = data;
        },
        error: (error) => {
          console.error('[Points] Error loading awarded points:', error);
        }
      });
  }

  /**
   * Award points to all attended participants
   */
  bulkAwardPoints(): void {
    this.showBulkConfirmation = true;
  }

  confirmBulkAward(): void {
    if (!this.eventId) return;
    
    this.isBulkAwarding = true;
    this.eventService.bulkAwardPoints(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isBulkAwarding = false))
      )
      .subscribe({
        next: () => {
          console.log('[Points] Bulk award successful');
          this.showBulkConfirmation = false;
          this.loadData();
        },
        error: (error) => {
          console.error('[Points] Bulk award error:', error);
        }
      });
  }

  /**
   * Handle rank award participant search
   */
  onParticipantSearch(search: string): void {
    if (!search) {
      this.filteredParticipants = [];
      return;
    }

    const searchLower = search.toLowerCase();
    this.filteredParticipants = this.participants.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.employeeId.toLowerCase().includes(searchLower)
    );
  }

  /**
   * Select participant from dropdown
   */
  selectParticipant(participant: EventParticipant): void {
    this.selectedParticipantId = participant.userId;
    this.selectedParticipantName = participant.name;
    this.filteredParticipants = [];
    this.showParticipantDropdown = false;
  }

  /**
   * Submit rank award
   */
  submitRankAward(): void {
    if (!this.eventId || !this.selectedParticipantId || !this.selectedRank) {
      alert('Please fill in all fields');
      return;
    }

    if (this.selectedRank === 'Custom' && this.customPoints <= 0) {
      alert('Please enter valid points for custom rank');
      return;
    }

    const points = this.selectedRank === 'Custom' ? this.customPoints : this.getDefaultPoints(this.selectedRank);

    const request: RankAwardRequest = {
      eventId: this.eventId,
      participantId: this.selectedParticipantId,
      rank: this.selectedRank,
      points
    };

    this.isRankAwarding = true;
    this.eventService.awardPointsByRank(this.eventId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isRankAwarding = false))
      )
      .subscribe({
        next: () => {
          console.log('[Points] Rank award successful');
          this.resetRankForm();
          this.loadData();
        },
        error: (error) => {
          console.error('[Points] Rank award error:', error);
        }
      });
  }

  /**
   * Reset rank award form
   */
  resetRankForm(): void {
    this.selectedParticipantId = '';
    this.selectedParticipantName = '';
    this.selectedRank = '1st';
    this.customPoints = 0;
    this.showRankForm = false;
  }

  /**
   * Get default points for rank
   */
  getDefaultPoints(rank: ParticipantRank): number {
    const pointsMap: Record<ParticipantRank, number> = {
      '1st': this.event?.pointsPerParticipant || 500,
      '2nd': Math.floor((this.event?.pointsPerParticipant || 500) * 0.75),
      '3rd': Math.floor((this.event?.pointsPerParticipant || 500) * 0.5),
      'Custom': 0
    };
    return pointsMap[rank];
  }

  /**
   * Get distribution percentage
   */
  getDistributionPercentage(): number {
    if (!this.event || this.event.totalPointsPool === 0) return 0;
    return Math.round((this.event.pointsDistributed / this.event.totalPointsPool) * 100);
  }

  /**
   * Calculate default points for current rank
   */
  getPointsForCurrentRank(): number {
    return this.selectedRank === 'Custom' ? this.customPoints : this.getDefaultPoints(this.selectedRank);
  }

  /**
   * Check if user can award points
   */
  canAwardPoints(): boolean {
    return this.event?.status === 'Active' || this.event?.status === 'Completed';
  }

  /**
   * Get count of attended participants
   */
  getAttendedCount(): number {
    return this.participants.filter(p => p.attendanceStatus === 'Attended').length;
  }

  /**
   * Check if bulk award should be disabled
   */
  isBulkAwardDisabled(): boolean {
    if (!this.canAwardPoints()) return true; // Event not Active/Completed
    if (this.getAttendedCount() === 0) return true; // No attended participants
    if (!this.event || this.event.pointsRemaining <= 0) return true; // No points remaining
    return false;
  }

  /**
   * Get bulk award disabled reason
   */
  getBulkAwardDisabledReason(): string {
    if (!this.canAwardPoints()) return 'Event must be Active or Completed';
    if (this.getAttendedCount() === 0) return 'No attended participants yet';
    if (!this.event || this.event.pointsRemaining <= 0) return 'Not enough points remaining';
    return '';
  }

  /**
   * Check if rank award should be disabled
   */
  isRankAwardDisabled(): boolean {
    if (!this.canAwardPoints()) return true; // Event not Active/Completed
    if (!this.selectedParticipantId) return true; // No participant selected
    if (!this.event || this.event.pointsRemaining <= 0) return true; // No points remaining
    
    // Check if participant already awarded this rank
    const alreadyAwarded = this.awardedPoints.some(
      ap => ap.participantId === this.selectedParticipantId && ap.rank === this.selectedRank
    );
    if (alreadyAwarded && this.selectedRank !== 'Custom') return true;
    
    return false;
  }

  /**
   * Get rank award disabled reason
   */
  getRankAwardDisabledReason(): string {
    if (!this.canAwardPoints()) return 'Event must be Active or Completed';
    if (!this.selectedParticipantId) return 'Select a participant';
    if (!this.event || this.event.pointsRemaining <= 0) return 'Not enough points remaining';
    
    const alreadyAwarded = this.awardedPoints.some(
      ap => ap.participantId === this.selectedParticipantId && ap.rank === this.selectedRank
    );
    if (alreadyAwarded && this.selectedRank !== 'Custom') return 'Participant already has this rank';
    
    return '';
  }
}
