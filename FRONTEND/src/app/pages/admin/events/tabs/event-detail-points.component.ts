import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { 
  EventDetail, 
  EventParticipant, 
  PoolStatus,
  BulkAwardRequest,
  BulkAwardItem,
  RankAwardRequest,
  DistributionMode,
  getRemainingPoints 
} from '../../../../models/event.models';

@Component({
  selector: 'app-event-detail-points',
  templateUrl: './event-detail-points.component.html',
  styleUrls: ['./event-detail-points.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventDetailPointsComponent implements OnInit, OnDestroy, OnChanges {
  // Public properties for template access
  public Math = Math;

  @Input() eventId: string = '';
  @Input() event: EventDetail | null = null;
  @Output() pointsAwarded = new EventEmitter<void>();

  // Data
  participants: EventParticipant[] = [];
  checkedInParticipants: EventParticipant[] = [];
  poolStatus: PoolStatus | null = null;
  
  // UI State
  isLoading = false;
  isBulkAwarding = false;
  isRankAwarding = false;
  isAllocatingPool = false;
  errorMessage = '';
  successMessage = '';
  
  // Distribution Mode
  distributionMode: DistributionMode = 'Manual';
  
  // Bulk Award Section
  bulkAwardAmount: number = 0;
  bulkSearchText: string = '';
  selectedParticipantIds: Set<string> = new Set();
  selectAll: boolean = false;
  
  // Pool Allocation (EqualSplit/RankBased)
  poolAllocationMode: 'EqualSplit' | 'RankBased' = 'EqualSplit';
  rankPointsInput: string = ''; // Comma-separated rank points
  
  // Rank Award Section
  rankSearchText: string = '';
  selectedRankParticipant: EventParticipant | null = null;
  rankPoints: number = 0;
  rankValue: number | null = null;
  filteredRankParticipants: EventParticipant[] = [];
  showRankDropdown: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && changes['eventId'].currentValue) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    if (!this.eventId) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    // Load pool status
    this.eventService.getPoolStatus(this.eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (status) => {
          console.log('[Points] Pool status loaded:', status);
          this.poolStatus = status;
        },
        error: (error) => {
          console.error('[Points] Error loading pool status:', error);
          this.errorMessage = 'Failed to load pool status';
        }
      });

    // Load participants
    this.eventService.getEventParticipants(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data: EventParticipant[]) => {
          console.log('[Points] Participants loaded:', data.length);
          this.participants = data;
          this.checkedInParticipants = data.filter((p: EventParticipant) => p.attendanceStatus === 'Attended');
          // Reset selections
          this.selectedParticipantIds.clear();
          this.selectAll = false;
        },
        error: (err: any) => {
          console.error('[Points] Error loading participants:', err);
          this.errorMessage = 'Failed to load participants';
        }
      });
  }

  // ==================== POINTS OVERVIEW ====================

  canAwardPoints(): boolean {
    return this.event?.status === 'Live';
  }

  getRemainingPoints(): number {
    if (this.poolStatus?.pool) {
      return this.poolStatus.pool.remainingPoints ?? 0;
    }
    return this.event ? getRemainingPoints(this.event) : 0;
  }

  getTotalPool(): number | null {
    return this.poolStatus?.pool?.totalPool ?? this.event?.totalPointsPool ?? null;
  }

  getDistributedPoints(): number {
    return this.poolStatus?.pool?.distributedPoints ?? this.event?.distributedPoints ?? 0;
  }

  isPoolUnlimited(): boolean {
    return this.poolStatus?.pool?.isUnlimited ?? false;
  }

  getDistributionPercentage(): number {
    const total = this.getTotalPool();
    if (!total || total === 0) return 0;
    return Math.round((this.getDistributedPoints() / total) * 100);
  }

  // ==================== BULK AWARD ====================

  getEligibleParticipants(): EventParticipant[] {
    // Eligible = checked-in and not yet awarded
    return this.checkedInParticipants.filter(p => !p.pointsAwarded || p.pointsAwarded === 0);
  }

  getFilteredEligibleParticipants(): EventParticipant[] {
    const eligible = this.getEligibleParticipants();
    if (!this.bulkSearchText) return eligible;
    
    const search = this.bulkSearchText.toLowerCase();
    return eligible.filter(p =>
      p.name?.toLowerCase().includes(search) ||
      p.employeeId?.toLowerCase().includes(search) ||
      p.email?.toLowerCase().includes(search)
    );
  }

  toggleSelectAll(): void {
    if (this.selectAll) {
      // Deselect all
      this.selectedParticipantIds.clear();
    } else {
      // Select all filtered eligible
      this.getFilteredEligibleParticipants().forEach(p => this.selectedParticipantIds.add(p.userId));
    }
    this.selectAll = !this.selectAll;
  }

  toggleParticipantSelection(participantId: string): void {
    if (this.selectedParticipantIds.has(participantId)) {
      this.selectedParticipantIds.delete(participantId);
    } else {
      this.selectedParticipantIds.add(participantId);
    }
    // Update selectAll state
    const filtered = this.getFilteredEligibleParticipants();
    this.selectAll = filtered.length > 0 && filtered.every(p => this.selectedParticipantIds.has(p.userId));
  }

  isSelected(participantId: string): boolean {
    return this.selectedParticipantIds.has(participantId);
  }

  getSelectedCount(): number {
    return this.selectedParticipantIds.size;
  }

  getPointsPerParticipant(): number {
    const count = this.getSelectedCount();
    if (count === 0 || this.bulkAwardAmount <= 0) return 0;
    // Return integer points (floor division)
    return Math.floor(this.bulkAwardAmount / count);
  }

  canSubmitBulkAward(): boolean {
    if (!this.canAwardPoints()) return false;
    if (this.bulkAwardAmount <= 0) return false;
    if (this.getSelectedCount() === 0) return false;
    if (!this.isPoolUnlimited() && this.bulkAwardAmount > this.getRemainingPoints()) return false;
    return true;
  }

  submitBulkAward(): void {
    if (!this.canSubmitBulkAward()) return;

    const perParticipant = this.getPointsPerParticipant();
    const awards: BulkAwardItem[] = Array.from(this.selectedParticipantIds).map(id => ({
      participantId: id,
      points: Math.floor(perParticipant) // Ensure integer
    }));

    const request: BulkAwardRequest = { awards };

    this.isBulkAwarding = true;
    this.errorMessage = '';

    this.eventService.bulkAwardPoints(this.eventId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isBulkAwarding = false))
      )
      .subscribe({
        next: (response) => {
          console.log('[Points] Bulk award successful:', response);
          this.successMessage = `Awarded ${response.participantsAwarded} participants with ${perParticipant.toLocaleString()} points each`;
          this.bulkAwardAmount = 0;
          this.selectedParticipantIds.clear();
          this.selectAll = false;
          this.loadData();
          this.pointsAwarded.emit();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          console.error('[Points] Bulk award error:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to award points. Please try again.';
          this.loadData(); // Refresh data on error
        }
      });
  }

  // ==================== RANK AWARD ====================

  /**
   * Get participants eligible for rank award.
   * Only shows participants who:
   * 1. Have NOT received points yet (pointsAwarded === 0 or null)
   * 2. Are registered or checked-in (not NoShow)
   * 3. Match search criteria if search is active
   */
  getEligibleRankParticipants(): EventParticipant[] {
    return this.checkedInParticipants.filter(p => 
      (p.pointsAwarded || 0) === 0 && 
      (p.attendanceStatus === 'Registered' || p.attendanceStatus === 'Attended')
    );
  }

  onRankParticipantSearch(search: string): void {
    this.rankSearchText = search;
    this.selectedRankParticipant = null;
    
    if (!search || search.length < 2) {
      this.filteredRankParticipants = [];
      this.showRankDropdown = false;
      return;
    }

    const searchLower = search.toLowerCase();
    const eligible = this.getEligibleRankParticipants();
    this.filteredRankParticipants = eligible.filter(p =>
      p.name?.toLowerCase().includes(searchLower) ||
      p.employeeId?.toLowerCase().includes(searchLower) ||
      p.email?.toLowerCase().includes(searchLower)
    ).slice(0, 10);
    
    this.showRankDropdown = this.filteredRankParticipants.length > 0;
  }

  selectRankParticipant(participant: EventParticipant): void {
    this.selectedRankParticipant = participant;
    this.rankSearchText = participant.name;
    this.showRankDropdown = false;
  }

  clearRankSelection(): void {
    this.selectedRankParticipant = null;
    this.rankSearchText = '';
    this.rankPoints = 0;
    this.rankValue = null;
  }

  canSubmitRankAward(): boolean {
    if (!this.canAwardPoints()) return false;
    if (!this.selectedRankParticipant) return false;
    if (this.rankPoints <= 0) return false;
    if (!this.isPoolUnlimited() && this.rankPoints > this.getRemainingPoints()) return false;
    // Check for duplicate rank
    if (this.rankValue && this.isRankAlreadyUsed(this.rankValue)) return false;
    return true;
  }

  isRankAlreadyUsed(rank: number): boolean {
    return this.participants.some(p => p.eventRank === rank && (p.pointsAwarded || 0) > 0);
  }

  submitRankAward(): void {
    if (!this.canSubmitRankAward() || !this.selectedRankParticipant) return;

    const request: RankAwardRequest = {
      points: this.rankPoints,
      rank: this.rankValue || undefined
    };

    this.isRankAwarding = true;
    this.errorMessage = '';

    this.eventService.awardPoints(this.eventId, this.selectedRankParticipant.userId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isRankAwarding = false))
      )
      .subscribe({
        next: (response) => {
          console.log('[Points] Rank award successful:', response);
          this.successMessage = `Awarded ${this.rankPoints.toLocaleString()} pts to ${this.selectedRankParticipant?.name}${this.rankValue ? ` (Rank #${this.rankValue})` : ''}`;
          this.clearRankSelection();
          this.loadData();
          this.pointsAwarded.emit();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          console.error('[Points] Rank award error:', error);
          const errMsg = error.error?.message || error.message || 'Failed to award points. Please try again.';
          this.errorMessage = errMsg;
          this.loadData(); // Refresh data on error
        }
      });
  }

  // ==================== POOL ALLOCATION (EqualSplit / RankBased) ====================

  /**
   * Validate if pool allocation can be submitted
   */
  canSubmitPoolAllocation(): boolean {
    if (!this.canAwardPoints()) return false;
    if (this.isPoolUnlimited()) return false;
    if (this.getRemainingPoints() <= 0) return false;
    if (this.getSelectedCount() === 0) return false;
    
    if (this.poolAllocationMode === 'RankBased') {
      const rankPointsArray = this.parseRankPoints();
      if (rankPointsArray.length === 0) return false;
      // Sum of rank points must not exceed pool
      const sum = rankPointsArray.reduce((a, b) => a + b, 0);
      if (sum > this.getRemainingPoints()) return false;
    }
    
    return true;
  }

  /**
   * Parse comma-separated rank points input
   */
  parseRankPoints(): number[] {
    if (!this.rankPointsInput.trim()) return [];
    return this.rankPointsInput
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0);
  }

  /**
   * Get sum of parsed rank points (for template use)
   */
  getRankPointsSum(): number {
    return this.parseRankPoints().reduce((a, b) => a + b, 0);
  }

  /**
   * Preview points distribution for pool allocation
   */
  getPoolAllocationPreview(): { participantId: string; name: string; points: number; rank?: number }[] {
    const selectedParticipants = this.getFilteredEligibleParticipants()
      .filter(p => this.selectedParticipantIds.has(p.userId));
    
    if (selectedParticipants.length === 0) return [];
    
    const remaining = this.getRemainingPoints();
    const count = selectedParticipants.length;
    
    if (this.poolAllocationMode === 'EqualSplit') {
      const basePoints = Math.floor(remaining / count);
      const remainder = remaining % count;
      
      return selectedParticipants.map((p, idx) => ({
        participantId: p.userId,
        name: p.name,
        points: basePoints + (idx < remainder ? 1 : 0)
      }));
    } else {
      // RankBased
      const rankPointsArray = this.parseRankPoints();
      const specifiedCount = Math.min(rankPointsArray.length, count - 1);
      const specifiedSum = rankPointsArray.slice(0, specifiedCount).reduce((a, b) => a + b, 0);
      const remainingForLast = remaining - specifiedSum;
      
      return selectedParticipants.map((p, idx) => {
        const rank = idx + 1;
        let points: number;
        
        if (idx < specifiedCount) {
          points = rankPointsArray[idx];
        } else {
          // Last rank(s) get remaining
          const lastCount = count - specifiedCount;
          if (lastCount === 1) {
            points = remainingForLast;
          } else {
            const lastIdx = idx - specifiedCount;
            const baseLastPoints = Math.floor(remainingForLast / lastCount);
            const lastRemainder = remainingForLast % lastCount;
            points = baseLastPoints + (lastIdx < lastRemainder ? 1 : 0);
          }
        }
        
        return {
          participantId: p.userId,
          name: p.name,
          points,
          rank
        };
      });
    }
  }

  /**
   * Submit pool allocation (entire pool distribution)
   */
  submitPoolAllocation(): void {
    if (!this.canSubmitPoolAllocation()) return;

    // Build awards from preview
    const preview = this.getPoolAllocationPreview();
    const awards: BulkAwardItem[] = preview.map(p => ({
      participantId: p.participantId,
      points: p.points,
      rank: p.rank
    }));

    const request: BulkAwardRequest = {
      awards,
      mode: this.poolAllocationMode,
      consumeEntirePool: true,
      rankPoints: this.poolAllocationMode === 'RankBased' ? this.parseRankPoints() : undefined
    };

    this.isAllocatingPool = true;
    this.errorMessage = '';

    this.eventService.bulkAwardPoints(this.eventId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isAllocatingPool = false))
      )
      .subscribe({
        next: (response) => {
          console.log('[Points] Pool allocation successful:', response);
          const mode = this.poolAllocationMode === 'EqualSplit' ? 'Equal Split' : 'Rank-Based';
          this.successMessage = `${mode} allocation complete! Awarded ${response.participantsAwarded} participants with ${response.totalPointsAwarded.toLocaleString()} total points.`;
          
          if (response.remainingPoolPoints === 0) {
            this.successMessage += ' Event auto-completed (pool exhausted).';
          }
          
          this.selectedParticipantIds.clear();
          this.selectAll = false;
          this.rankPointsInput = '';
          this.loadData();
          this.pointsAwarded.emit();
          setTimeout(() => this.successMessage = '', 8000);
        },
        error: (error) => {
          console.error('[Points] Pool allocation error:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to allocate pool. Please try again.';
          this.loadData();
        }
      });
  }

  // ==================== RANK HISTORY ====================

  getAwardedParticipants(): EventParticipant[] {
    return this.participants.filter(p => p.pointsAwarded && p.pointsAwarded > 0)
      .sort((a, b) => {
        // Sort by rank if available, then by awarded time
        if (a.eventRank && b.eventRank) return a.eventRank - b.eventRank;
        if (a.eventRank) return -1;
        if (b.eventRank) return 1;
        return 0;
      });
  }

  formatDate(date: string | undefined): string {
    if (!date) return '—';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // ==================== UTILS ====================

  dismissError(): void {
    this.errorMessage = '';
  }

  dismissSuccess(): void {
    this.successMessage = '';
  }
}
