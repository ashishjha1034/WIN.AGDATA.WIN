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
  
  // Awarding Mode Selection (Bulk or Rank)
  awardingMode: 'Bulk' | 'Rank' = 'Bulk';
  
  // Bulk Award Section - Redesigned
  allocateEntirePool: boolean = false;
  
  // Rank-Based Award Section - Redesigned
  rankCount: 1 | 2 | 3 = 1;
  selectedSplit: string = '100'; // For 1 rank
  rankAssignments: Array<{ rank: number; participant: EventParticipant | null; points: number }> = [];
  rankSearchText: string = '';
  filteredRankSearchParticipants: EventParticipant[] = [];
  showRankSearchDropdown: boolean = false;
  currentRankBeingAssigned: number | null = null;

  private destroy$ = new Subject<void>();

  // Split options based on rank count
  private splitOptions = {
    1: [{ label: '100%', split: [100] }],
    2: [
      { label: '60-40', split: [60, 40] },
      { label: '70-30', split: [70, 30] }
    ],
    3: [
      { label: '50-30-20', split: [50, 30, 20] },
      { label: '45-35-20', split: [45, 35, 20] },
      { label: '60-25-15', split: [60, 25, 15] }
    ]
  };

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
          // Initialize rank count based on checked-in participants
          this.initializeRankCount();
          this.initializeRankAssignments();
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

  // ==================== BULK AWARD (EQUAL SPLIT) ====================

  /**
   * Get participants eligible for awards:
   * - Must be checked-in (Attended status)
   * - Must not have received points yet
   */
  getEligibleParticipants(): EventParticipant[] {
    // Eligible = checked-in (Attended) and not yet awarded
    return this.checkedInParticipants.filter(p => !p.pointsAwarded || p.pointsAwarded === 0);
  }

  /**
   * Get participants who are NOT eligible with reasons
   */
  getIneligibleParticipantsWithReasons(): Array<{ participant: EventParticipant; reason: string }> {
    const ineligible: Array<{ participant: EventParticipant; reason: string }> = [];
    
    for (const p of this.participants) {
      if (p.attendanceStatus !== 'Attended') {
        ineligible.push({ participant: p, reason: 'Not checked-in' });
      } else if (p.pointsAwarded && p.pointsAwarded > 0) {
        ineligible.push({ participant: p, reason: 'Already awarded points' });
      }
    }
    
    return ineligible;
  }

  /**
   * Get pre-submit validation warnings for bulk award
   */
  getBulkAwardWarnings(): string[] {
    const warnings: string[] = [];
    
    if (this.event?.status !== 'Live') {
      warnings.push(`Event must be Live to award points. Current status: ${this.event?.status}`);
    }
    
    const eligible = this.getEligibleParticipants();
    if (eligible.length === 0) {
      warnings.push('No eligible participants (must be checked-in with no points awarded)');
    }
    
    const remaining = this.getRemainingPoints();
    if (remaining <= 0) {
      warnings.push('No remaining points in pool');
    }
    
    return warnings;
  }

  /**
   * Get distribution preview for bulk equal split
   * Uses proper float distribution: distributes remainder to earlier participants
   */
  getBulkDistributionPreview(): Array<{ sn: number; name: string; email: string; points: number }> {
    const eligible = this.getEligibleParticipants();
    if (eligible.length === 0 || !this.allocateEntirePool) return [];
    
    const remaining = this.getRemainingPoints();
    const count = eligible.length;
    const basePoints = Math.floor(remaining / count);
    const remainder = remaining % count;
    
    // Distribute remainder to first 'remainder' participants (1 extra point each)
    return eligible.map((p, idx) => ({
      sn: idx + 1,
      name: p.name,
      email: p.email,
      points: basePoints + (idx < remainder ? 1 : 0)
    }));
  }

  /**
   * Get total points for bulk distribution
   */
  getBulkDistributionTotal(): number {
    return this.getBulkDistributionPreview().reduce((sum, item) => sum + item.points, 0);
  }

  /**
   * Can submit bulk allocation?
   */
  canSubmitBulkAllocation(): boolean {
    if (!this.canAwardPoints()) return false;
    if (!this.allocateEntirePool) return false;
    if (this.getEligibleParticipants().length === 0) return false;
    if (this.getRemainingPoints() <= 0) return false;
    return true;
  }

  /**
   * Submit bulk equal split allocation
   */
  submitBulkAllocation(): void {
    if (!this.canSubmitBulkAllocation()) return;
    
    const preview = this.getBulkDistributionPreview();
    const eligible = this.getEligibleParticipants();
    
    // Debug logging
    console.log('[Points] Eligible participants:', eligible.map(p => ({
      userId: p.userId,
      name: p.name,
      attendanceStatus: p.attendanceStatus,
      pointsAwarded: p.pointsAwarded
    })));
    
    const awards: BulkAwardItem[] = preview.map((item, idx) => ({
      participantId: eligible[idx].userId,
      points: item.points
    }));
    
    const request: BulkAwardRequest = {
      awards,
      mode: 'EqualSplit',
      consumeEntirePool: true
    };
    
    console.log('[Points] Submitting bulk award request:', JSON.stringify(request, null, 2));
    console.log('[Points] Event status:', this.event?.status);
    
    this.isBulkAwarding = true;
    this.errorMessage = '';
    
    this.eventService.bulkAwardPoints(this.eventId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isBulkAwarding = false))
      )
      .subscribe({
        next: (response) => {
          console.log('[Points] Bulk allocation successful:', response);
          this.successMessage = `Awarded ${response.participantsAwarded} participants with ${response.totalPointsAwarded.toLocaleString()} total points`;
          this.allocateEntirePool = false;
          this.loadData();
          this.pointsAwarded.emit();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          console.error('[Points] Bulk allocation error:', error);
          // Surface exact server error message to user
          this.errorMessage = this.parseServerError(error);
          this.loadData();
        }
      });
  }

  /**
   * Parse server error to user-friendly message
   */
  private parseServerError(error: any): string {
    // Log full error for debugging
    console.error('[Points] Full error object:', JSON.stringify(error.error, null, 2));
    
    // Try to get the exact server message (various formats)
    const serverMessage = error.error?.message 
      || error.error?.Message 
      || error.error?.title 
      || error.error?.detail;
    if (serverMessage) {
      return serverMessage;
    }
    
    // Check for validation errors object (ASP.NET ModelState format)
    if (error.error?.errors && typeof error.error.errors === 'object') {
      const errorMessages: string[] = [];
      for (const key in error.error.errors) {
        const fieldErrors = error.error.errors[key];
        if (Array.isArray(fieldErrors)) {
          errorMessages.push(...fieldErrors);
        }
      }
      if (errorMessages.length > 0) {
        return errorMessages.join('. ');
      }
    }
    
    // If error.error is a string, use it directly
    if (typeof error.error === 'string') {
      return error.error;
    }
    
    // Check for common HTTP status codes
    if (error.status === 400) {
      return 'Invalid request. Please check that all participants are checked-in and have not already received points.';
    }
    if (error.status === 403) {
      return 'You do not have permission to award points.';
    }
    if (error.status === 404) {
      return 'Event or participant not found.';
    }
    
    return error.message || 'Failed to allocate points. Please try again.';
  }

  // ==================== RANK AWARD ====================

  /**
   * Initialize rank count based on checked-in participants
   */
  private initializeRankCount(): void {
    const checkedInCount = this.checkedInParticipants.filter(p => !p.pointsAwarded || p.pointsAwarded === 0).length;
    if (checkedInCount >= 3) {
      this.rankCount = 3;
    } else if (checkedInCount >= 2) {
      this.rankCount = 2;
    } else {
      this.rankCount = 1;
    }
    this.updateSelectedSplit();
  }

  /**
   * Initialize rank assignments array
   */
  private initializeRankAssignments(): void {
    this.rankAssignments = Array.from({ length: this.rankCount }, (_, i) => ({
      rank: i + 1,
      participant: null,
      points: 0
    }));
    this.calculateRankPoints();
  }

  /**
   * Update selected split when rank count changes
   */
  private updateSelectedSplit(): void {
    const options = this.splitOptions[this.rankCount];
    if (options && options.length > 0) {
      this.selectedSplit = options[0].label;
    }
  }

  /**
   * Get available split options for current rank count
   */
  getAvailableSplits(): Array<{ label: string; split: number[] }> {
    return this.splitOptions[this.rankCount] || [];
  }

  /**
   * Get current split percentages
   */
  getCurrentSplit(): number[] {
    const option = this.getAvailableSplits().find(o => o.label === this.selectedSplit);
    return option?.split || [];
  }

  /**
   * Calculate points for each rank based on selected split.
   * Properly distributes integer points: uses floor for all except last rank which gets remainder.
   * This ensures total equals prize pool exactly without floats.
   */
  private calculateRankPoints(): void {
    const split = this.getCurrentSplit();
    const remaining = this.getRemainingPoints();
    
    let totalAssigned = 0;
    this.rankAssignments.forEach((assignment, idx) => {
      if (idx < split.length) {
        if (idx === split.length - 1) {
          // Last rank gets the remainder to ensure exact total
          assignment.points = remaining - totalAssigned;
        } else {
          // Use floor for all intermediate ranks
          assignment.points = Math.floor((split[idx] / 100) * remaining);
          totalAssigned += assignment.points;
        }
      }
    });
  }

  /**
   * On rank count change
   */
  onRankCountChange(count: 1 | 2 | 3): void {
    this.rankCount = count;
    this.updateSelectedSplit();
    this.initializeRankAssignments();
  }

  /**
   * On split selection change
   */
  onSplitChange(splitLabel: string): void {
    this.selectedSplit = splitLabel;
    this.calculateRankPoints();
  }

  /**
   * Start assigning participant to a rank - show all eligible immediately
   */
  startRankSearch(rank: number): void {
    this.currentRankBeingAssigned = rank;
    this.rankSearchText = '';
    
    // Show all eligible participants immediately
    const eligible = this.getEligibleParticipants();
    const alreadyAssigned = new Set(this.rankAssignments.map(a => a.participant?.userId).filter(Boolean));
    
    this.filteredRankSearchParticipants = eligible
      .filter(p => !alreadyAssigned.has(p.userId))
      .slice(0, 15);
    
    this.showRankSearchDropdown = this.filteredRankSearchParticipants.length > 0;
  }

  /**
   * Search participants for rank assignment
   */
  onRankSearch(search: string): void {
    this.rankSearchText = search;
    
    const eligible = this.getEligibleParticipants();
    const alreadyAssigned = new Set(this.rankAssignments.map(a => a.participant?.userId).filter(Boolean));
    
    // Filter out already assigned
    let available = eligible.filter(p => !alreadyAssigned.has(p.userId));
    
    // If search text provided, filter by it
    if (search && search.length > 0) {
      const searchLower = search.toLowerCase();
      available = available.filter(p =>
        p.name?.toLowerCase().includes(searchLower) ||
        p.employeeId?.toLowerCase().includes(searchLower) ||
        p.email?.toLowerCase().includes(searchLower)
      );
    }
    
    this.filteredRankSearchParticipants = available.slice(0, 15);
    this.showRankSearchDropdown = this.filteredRankSearchParticipants.length > 0;
  }

  /**
   * Assign participant to rank
   */
  assignParticipantToRank(participant: EventParticipant, rank: number): void {
    const assignment = this.rankAssignments.find(a => a.rank === rank);
    if (assignment) {
      assignment.participant = participant;
      this.rankSearchText = '';
      this.showRankSearchDropdown = false;
      this.currentRankBeingAssigned = null;
    }
  }

  /**
   * Clear rank assignment
   */
  clearRankAssignment(rank: number): void {
    const assignment = this.rankAssignments.find(a => a.rank === rank);
    if (assignment) {
      assignment.participant = null;
    }
  }

  /**
   * Can submit rank-based award?
   */
  canSubmitRankAward(): boolean {
    if (!this.canAwardPoints()) return false;
    if (this.getRemainingPoints() <= 0) return false;
    // All ranks must be assigned
    return this.rankAssignments.every(a => a.participant !== null);
  }

  /**
   * Submit rank-based award
   */
  submitRankAward(): void {
    if (!this.canSubmitRankAward()) return;
    
    const awards: BulkAwardItem[] = this.rankAssignments.map(assignment => ({
      participantId: assignment.participant!.userId,
      points: assignment.points,
      rank: assignment.rank
    }));
    
    const request: BulkAwardRequest = {
      awards,
      mode: 'RankBased'
    };
    
    this.isRankAwarding = true;
    this.errorMessage = '';
    
    this.eventService.bulkAwardPoints(this.eventId, request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isRankAwarding = false))
      )
      .subscribe({
        next: (response) => {
          console.log('[Points] Rank award successful:', response);
          this.successMessage = `Rank-based award complete! Awarded ${response.participantsAwarded} participants with ${response.totalPointsAwarded.toLocaleString()} total points.`;
          this.initializeRankAssignments();
          this.loadData();
          this.pointsAwarded.emit();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          console.error('[Points] Rank award error:', error);
          // Surface exact server error message to user
          this.errorMessage = this.parseServerError(error);
          this.loadData();
        }
      });
  }

  /**
   * Check if any rank has been assigned
   */
  hasAnyRankAssignment(): boolean {
    return this.rankAssignments.some(a => a.participant !== null);
  }

  // ==================== AWARDED PARTICIPANTS ====================

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

  getTotalAwardedPoints(): number {
    return this.getAwardedParticipants()
      .reduce((sum, p) => sum + (p.pointsAwarded || 0), 0);
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
