import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import {
  EventDetail,
  EventParticipant,
  PointsAward,
  EventKPI,
  AttendanceStatus,
  RankAwardRequest
} from '../../../models/event.models';
import { EventDetailOverviewComponent } from './tabs/event-detail-overview.component';
import { EventDetailParticipantsComponent } from './tabs/event-detail-participants.component';
import { EventDetailPointsComponent } from './tabs/event-detail-points.component';

type ActiveTab = 'overview' | 'participants' | 'points';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminSidebarComponent,
    EventDetailOverviewComponent,
    EventDetailParticipantsComponent,
    EventDetailPointsComponent
  ]
})
export class EventDetailComponent implements OnInit, OnDestroy {
  // Public properties for template access
  public Math = Math;

  // Template references
  @ViewChild('participantsTab') participantsTab: EventDetailParticipantsComponent | undefined;
  @ViewChild('pointsTab') pointsTab: EventDetailPointsComponent | undefined;

  // Data
  event: EventDetail | null = null;
  participants: EventParticipant[] = [];
  awardedPoints: PointsAward[] = [];
  currentUser: any;

  // UI State
  isLoading = false;
  activeTab: ActiveTab = 'overview';
  eventId: string = '';
  showConfirmActivate = false;
  showConfirmComplete = false;
  showConfirmCancel = false;
  errorMessage = '';
  showErrorAlert = false;

  private destroy$ = new Subject<void>();

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.eventId = params['id'];
        if (this.eventId) {
          this.loadEventDetail();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load current user info
   */
  loadCurrentUser(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  /**
   * Load event detail
   */
  loadEventDetail(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;
    
    this.eventService.getEventDetail(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          console.log('[EventDetail] Loading finished. deferring isLoading=false and detectChanges');
          setTimeout(() => {
            this.isLoading = false;
            try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
            console.log('[EventDetail] isLoading false and change detection run');
          }, 0);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[EventDetail] Event loaded:', data);
          if (data) {
            this.event = data;
            try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
          } else {
            console.warn('[EventDetail] No data returned from service');
            this.errorMessage = 'No event data available';
            this.showErrorAlert = true;
          }
        },
        error: (error) => {
          console.error('[EventDetail] Error loading event:', error);
          this.event = null;
          this.errorMessage = `Failed to load event: ${error?.status || error?.message || 'Unknown error'}`;
          this.showErrorAlert = true;
        }
      });
  }

  /**
   * Switch active tab
   */
  switchTab(tab: ActiveTab): void {
    this.activeTab = tab;
  }

  /**
   * Close error alert
   */
  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }

  /**
   * Go back to event list
   */
  goBack(): void {
    this.router.navigateByUrl('/admin/events');
  }

  /**
   * Edit event
   */
  editEvent(): void {
    this.router.navigateByUrl(`/admin/events/${this.eventId}/edit`);
  }

  /**
   * Activate event (Upcoming → Live)
   */
  activateEvent(): void {
    if (!this.event) return;
    this.showConfirmActivate = true;
  }

  /**
   * Confirm activate event
   */
  confirmActivateEvent(): void {
    if (!this.event) return;
    
    this.isLoading = true;
    this.eventService.activateEvent(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          console.log('[EventDetail] Event activated');
          this.showConfirmActivate = false;
          this.loadEventDetail();
        },
        error: (error) => {
          console.error('[EventDetail] Error activating event:', error);
          this.errorMessage = error?.error?.message || 'Failed to activate event';
          this.showErrorAlert = true;
          this.showConfirmActivate = false;
        }
      });
  }

  /**
   * Complete event (Live → Completed)
   */
  completeEvent(): void {
    if (!this.event) return;
    this.showConfirmComplete = true;
  }

  /**
   * Confirm complete event
   */
  confirmCompleteEvent(): void {
    if (!this.event) return;
    
    this.isLoading = true;
    this.eventService.completeEvent(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          console.log('[EventDetail] Event completed');
          this.showConfirmComplete = false;
          this.loadEventDetail();
        },
        error: (error) => {
          console.error('[EventDetail] Error completing event:', error);
          this.errorMessage = error?.error?.message || 'Failed to complete event';
          this.showErrorAlert = true;
          this.showConfirmComplete = false;
        }
      });
  }

  /**
   * Cancel event
   */
  cancelEvent(): void {
    if (!this.event) return;
    this.showConfirmCancel = true;
  }

  /**
   * Confirm cancel event
   */
  confirmCancelEvent(): void {
    if (!this.event) return;
    
    this.isLoading = true;
    this.eventService.cancelEvent(this.eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          console.log('[EventDetail] Event cancelled');
          this.showConfirmCancel = false;
          this.loadEventDetail();
        },
        error: (error) => {
          console.error('[EventDetail] Error cancelling event:', error);
          this.errorMessage = error?.error?.message || 'Failed to cancel event';
          this.showErrorAlert = true;
          this.showConfirmCancel = false;
        }
      });
  }

  /**
   * Get status badge color - aligned with spec
   */
  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'Active': '#16A34A',     // Green (was 'Live')
      'Draft': '#F59E0B',      // Amber/Orange (was 'Upcoming')
      'Completed': '#EC4899',  // Pink
      'Cancelled': '#EF4444'   // Red
    };
    return colors[status] || '#6B7280';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'Draft': 'Upcoming',
      'Active': 'Live',
      'Completed': 'Completed',
      'Cancelled': 'Cancelled'
    };
    return labels[status] || status;
  }

  /**
   * Format date
   */
  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Format datetime
   */
  formatDateTime(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.currentUser?.roles?.includes('Admin') || false;
  }

  /**
   * When participants are changed, refresh points data
   */
  onParticipantsChanged(): void {
    console.log('[EventDetail] Participants changed, refreshing points data');
    if (this.pointsTab) {
      this.pointsTab.loadData();
    }
  }

  /**
   * When points are awarded, refresh participant data
   */
  onPointsAwarded(): void {
    console.log('[EventDetail] Points awarded, refreshing participant data');
    if (this.participantsTab) {
      this.participantsTab.loadParticipants();
    }
  }
}
