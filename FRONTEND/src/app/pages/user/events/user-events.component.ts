import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { UserDashboardService } from '../../../services/user-dashboard.service';
import { Event, EventStatus } from '../../../models/event.models';
import { Subject, forkJoin, interval, Subscription } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { UserPageHeaderComponent } from '../../../components/user-page-header/user-page-header.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../config/api.config';
import { utcToIst } from '../../../shared/utils/ist-timezone.utils';
import { DialogService } from '../../../services/dialog.service';
import { ToastService } from '../../../services/toast.service';

type SortOption = 'dateNewest' | 'dateOldest' | 'nameAZ' | 'nameZA' | 'pointsHigh' | 'participantsHigh' | 'availabilityLow';
type RegistrationFilter = 'all' | 'registered' | 'not-registered';
type AwardFilter = 'all' | 'awarded' | 'not-awarded';

interface Tab {
  label: string;
  status: EventStatus | 'All';
  count: number;
}

interface UserEventContext {
  eventId: string;
  isRegistered: boolean;
  attendanceStatus?: string;
  pointsEarned?: number;
}

interface AwardedParticipant {
  rank?: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, UserPageHeaderComponent, PaginationComponent]
})
export class UserEventsComponent implements OnInit, OnDestroy {
  @ViewChild('detailHeading') detailHeading!: ElementRef;
  @ViewChild('rightColumn') rightColumn!: ElementRef;
  
  currentUser: any;
  userPoints = 0;
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  selectedEvent: Event | null = null;
  userContext: Map<string, UserEventContext> = new Map();
  
  // Store awarded participants data per event
  eventAwardsMap: Map<string, AwardedParticipant[]> = new Map();
  
  isLoading = true;
  isRegistering = false;
  isLoadingAwards = false;
  searchQuery = '';
  selectedSort: SortOption = 'dateNewest';
  
  // New Filters
  registrationFilter: RegistrationFilter = 'all';
  awardFilter: AwardFilter = 'all';
  dateFromFilter: string = '';
  dateToFilter: string = '';
  
  // Filter visibility toggle
  showFilters = false;
  
  // Detail panel tab
  activeDetailTab: 'info' | 'awards' = 'info';
  
  // Countdown timer
  countdownMap: Map<string, string> = new Map();
  private countdownSubscription: Subscription | null = null;
  
  tabs: Tab[] = [
    { label: 'All', status: 'All', count: 0 },
    { label: 'Upcoming', status: 'Upcoming', count: 0 },
    { label: 'Live', status: 'Live', count: 0 },
    { label: 'Completed', status: 'Completed', count: 0 },
    { label: 'Cancelled', status: 'Cancelled', count: 0 }
  ];
  
  activeTab: EventStatus | 'All' = 'All';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  
  sortOptions = [
    { value: 'dateNewest', label: 'Date (Newest)' },
    { value: 'dateOldest', label: 'Date (Oldest)' },
    { value: 'nameAZ', label: 'Name A–Z' },
    { value: 'nameZA', label: 'Name Z–A' },
    { value: 'pointsHigh', label: 'Points (High)' },
    { value: 'participantsHigh', label: 'Participants' }
  ];
  
  private destroy$ = new Subject<void>();
  private pendingEventIdFromUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private userDashboardService: UserDashboardService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    // Subscribe to query params for URL-driven filtering and deep links
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        // Apply status filter from URL
        if (params['status']) {
          const statusParam = params['status'];
          const validStatuses: (EventStatus | 'All')[] = ['All', 'Upcoming', 'Live', 'Completed', 'Cancelled'];
          if (validStatuses.includes(statusParam as EventStatus | 'All')) {
            this.activeTab = statusParam as EventStatus | 'All';
          }
        }
        // Deep link to specific event
        if (params['eventId']) {
          this.pendingEventIdFromUrl = params['eventId'];
        }
        // If data is already loaded, re-apply filters
        if (this.allEvents.length > 0) {
          this.applyFiltersAndSort();
          this.handleDeepLink();
        }
      });

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadEvents();
          this.loadUserPoints();
        }
      });
  }

  loadUserPoints(): void {
    this.userDashboardService.getUserPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (points) => {
          this.userPoints = points;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error loading user points:', error)
      });
  }

  private handleDeepLink(): void {
    if (this.pendingEventIdFromUrl) {
      const event = this.allEvents.find(e => e.id === this.pendingEventIdFromUrl);
      if (event) {
        this.selectEvent(event);
        // Ensure the event's tab is selected
        if (event.status && event.status !== this.activeTab && this.activeTab !== 'All') {
          this.activeTab = event.status as EventStatus;
          this.applyFiltersAndSort();
        }
      }
      this.pendingEventIdFromUrl = null;
    }
  }

  loadEvents(): void {
    this.isLoading = true;
    
    forkJoin({
      allEvents: this.eventService.getEvents(),
      myEvents: this.http.get<any>(`${API_CONFIG.getApiUrl()}/event/user/my-events`)
    })
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (results) => {
        this.allEvents = results.allEvents;
        
        // Build user context from registered events, including points earned
        const myEventsData = Array.isArray(results.myEvents) ? results.myEvents : results.myEvents.data || [];
        myEventsData.forEach((event: any) => {
          this.userContext.set(event.id, {
            eventId: event.id,
            isRegistered: true,
            attendanceStatus: event.attendanceStatus,
            pointsEarned: event.pointsAwarded || event.pointsEarned || 0
          });
          
          // Pre-populate awards data for events where user has been awarded
          if (event.pointsAwarded || event.pointsEarned) {
            const points = event.pointsAwarded || event.pointsEarned || 0;
            if (points > 0) {
              this.eventAwardsMap.set(event.id, [{
                rank: event.eventRank || undefined,
                name: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`.trim() || 'You',
                points: points,
                isCurrentUser: true
              }]);
            }
          }
        });
        
        this.updateTabCounts();
        this.selectDefaultTab();
        this.applyFiltersAndSort();
        
        // Handle deep link from URL if present
        this.handleDeepLink();
        
        // Auto-select first event if available and no deep link
        if (!this.selectedEvent && this.filteredEvents.length > 0) {
          this.selectEvent(this.filteredEvents[0]);
        }
        
        // Start countdown timer for upcoming/live events
        this.startCountdownTimer();
        
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateTabCounts(): void {
    this.tabs[0].count = this.allEvents.length; // All
    this.tabs[1].count = this.allEvents.filter(e => e.status === 'Upcoming').length;
    this.tabs[2].count = this.allEvents.filter(e => e.status === 'Live').length;
    this.tabs[3].count = this.allEvents.filter(e => e.status === 'Completed').length;
    this.tabs[4].count = this.allEvents.filter(e => e.status === 'Cancelled').length;
  }

  selectDefaultTab(): void {
    // Default: Live if exists, else Upcoming
    const hasLive = this.allEvents.some(e => e.status === 'Live');
    this.activeTab = hasLive ? 'Live' : 'Upcoming';
  }

  selectTab(status: EventStatus | 'All'): void {
    this.activeTab = status;
    this.applyFiltersAndSort();
    
    // Update URL with status filter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: status },
      queryParamsHandling: 'merge'
    });
    
    // Auto-select first event in new tab
    if (this.filteredEvents.length > 0) {
      this.selectEvent(this.filteredEvents[0]);
    } else {
      this.selectedEvent = null;
    }
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

  hasActiveFilters(): boolean {
    return this.registrationFilter !== 'all' ||
           this.awardFilter !== 'all' ||
           !!this.dateFromFilter ||
           !!this.dateToFilter;
  }

  clearFilters(): void {
    this.registrationFilter = 'all';
    this.awardFilter = 'all';
    this.dateFromFilter = '';
    this.dateToFilter = '';
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let events = [...this.allEvents];
    
    // Filter by tab (status)
    if (this.activeTab !== 'All') {
      events = events.filter(e => e.status === this.activeTab);
    }
    
    // Filter by search
    if (this.searchQuery.trim()) {
      const search = this.searchQuery.toLowerCase();
      events = events.filter(e =>
        e.name.toLowerCase().includes(search) ||
        e.description?.toLowerCase().includes(search) ||
        e.location?.toLowerCase().includes(search)
      );
    }

    // Filter by registration status
    if (this.registrationFilter === 'registered') {
      events = events.filter(e => this.isUserRegistered(e.id));
    } else if (this.registrationFilter === 'not-registered') {
      events = events.filter(e => !this.isUserRegistered(e.id));
    }

    // Filter by award status
    if (this.awardFilter === 'awarded') {
      events = events.filter(e => this.getUserPointsForEvent(e.id) > 0);
    } else if (this.awardFilter === 'not-awarded') {
      events = events.filter(e => this.getUserPointsForEvent(e.id) === 0);
    }

    // Filter by date range
    if (this.dateFromFilter) {
      const fromDate = new Date(this.dateFromFilter);
      fromDate.setHours(0, 0, 0, 0);
      events = events.filter(e => {
        const eventDate = new Date(e.eventDate);
        return eventDate >= fromDate;
      });
    }
    if (this.dateToFilter) {
      const toDate = new Date(this.dateToFilter);
      toDate.setHours(23, 59, 59, 999);
      events = events.filter(e => {
        const eventDate = new Date(e.eventDate);
        return eventDate <= toDate;
      });
    }
    
    // Sort
    events = this.sortEvents(events, this.selectedSort);
    
    this.filteredEvents = events;
    this.currentPage = 1; // Reset to first page when filters change
  }

  get paginatedEvents(): Event[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEvents.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.cdr.markForCheck();
    
    // Scroll to top of events list
    if (this.rightColumn?.nativeElement) {
      this.rightColumn.nativeElement.scrollTop = 0;
    }
  }

  sortEvents(events: Event[], sortBy: SortOption): Event[] {
    const sorted = [...events];
    
    switch (sortBy) {
      case 'dateNewest':
        sorted.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
        break;
      case 'dateOldest':
        sorted.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
        break;
      case 'nameAZ':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'pointsHigh':
        sorted.sort((a, b) => (b.totalPointsPool || 0) - (a.totalPointsPool || 0));
        break;
      case 'participantsHigh':
        sorted.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0));
        break;
    }
    
    return sorted;
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.activeDetailTab = 'info'; // Reset to info tab when selecting new event
    
    // Focus management for accessibility - move focus to detail heading after selection
    setTimeout(() => {
      if (this.detailHeading?.nativeElement) {
        this.detailHeading.nativeElement.focus();
      }
    }, 100);
    
    // Load awards data if the event is Live or Completed
    if (event.status === 'Live' || event.status === 'Completed') {
      this.loadEventAwards(event.id);
    }
  }

  isEventSelected(event: Event): boolean {
    return this.selectedEvent?.id === event.id;
  }

  isUserRegistered(eventId: string): boolean {
    return this.userContext.get(eventId)?.isRegistered || false;
  }

  /**
   * Get the points earned by the current user for a specific event
   */
  getUserPointsForEvent(eventId: string): number {
    return this.userContext.get(eventId)?.pointsEarned || 0;
  }

  /**
   * Check if Awards tab should be visible (only for Live/Completed events)
   */
  showAwardsTab(event: Event): boolean {
    return event.status === 'Live' || event.status === 'Completed';
  }

  /**
   * Get the CTA button icon based on event state
   */
  getCtaIcon(event: Event): string {
    if (!event) return '';
    
    if (event.status === 'Upcoming') {
      return this.isUserRegistered(event.id) ? 'fa-check-circle' : 'fa-user-plus';
    } else if (event.status === 'Live') {
      return this.isUserRegistered(event.id) ? 'fa-broadcast-tower' : 'fa-user-slash';
    } else if (event.status === 'Completed') {
      return 'fa-flag-checkered';
    } else if (event.status === 'Cancelled') {
      return 'fa-ban';
    }
    return '';
  }

  /**
   * Get countdown text for registration deadline
   */
  getRegistrationCountdown(event: Event): string {
    const dateStr = event.registrationEndDateUtc || event.registrationEndDate;
    if (!dateStr) return 'No deadline';
    
    const deadline = this.parseUtcDate(dateStr);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return 'Closed';
    return this.formatCountdown(diff);
  }

  /**
   * Get countdown text for event date
   */
  getEventDateCountdown(event: Event): string {
    if (!event.eventDate) return 'TBD';
    
    const eventDate = this.parseUtcDate(event.eventDate);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      if (event.status === 'Live') return 'Happening now!';
      if (event.status === 'Completed') return 'Ended';
      return 'Started';
    }
    return this.formatCountdown(diff);
  }

  /**
   * Toggle filter visibility
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Get count of active filters
   */
  getActiveFilterCount(): number {
    let count = 0;
    if (this.registrationFilter !== 'all') count++;
    if (this.awardFilter !== 'all') count++;
    if (this.dateFromFilter) count++;
    if (this.dateToFilter) count++;
    return count;
  }

  /**
   * Load awards data for an event from API
   */
  private loadEventAwards(eventId: string): void {
    // If already loaded, skip
    if (this.eventAwardsMap.has(eventId)) {
      this.isLoadingAwards = false;
      return;
    }
    
    this.isLoadingAwards = true;
    
    // Call the public awards API to get awarded participants
    this.eventService.getEventAwards(eventId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoadingAwards = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (participants) => {
          // Map to AwardedParticipant interface
          const awardedParticipants: AwardedParticipant[] = participants
            .filter(p => p.pointsAwarded && p.pointsAwarded > 0)
            .map(p => ({
              rank: p.eventRank,
              name: p.name,
              points: p.pointsAwarded || 0,
              isCurrentUser: p.userId === this.currentUser?.id || p.email === this.currentUser?.email
            }))
            .sort((a, b) => {
              // Sort by rank if available, otherwise by points
              if (a.rank && b.rank) return a.rank - b.rank;
              if (a.rank) return -1;
              if (b.rank) return 1;
              return b.points - a.points;
            });
          
          this.eventAwardsMap.set(eventId, awardedParticipants);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[UserEvents] Error loading event awards:', error);
          // Set empty array on error so we don't keep retrying
          this.eventAwardsMap.set(eventId, []);
        }
      });
  }

  /**
   * Get awarded participants for an event
   */
  getEventAwardedParticipants(eventId: string): AwardedParticipant[] {
    return this.eventAwardsMap.get(eventId) || [];
  }

  canRegister(event: Event): boolean {
    if (this.isUserRegistered(event.id)) return false;
    if (event.status !== 'Upcoming') return false;
    
    // Check registration deadline
    if (event.registrationEndDateUtc) {
      const deadline = this.parseUtcDate(event.registrationEndDateUtc);
      const now = new Date();
      if (now > deadline) return false;
    }
    
    // Check max participants
    if (event.maxParticipants && event.participantCount >= event.maxParticipants) {
      return false;
    }
    
    return true;
  }

  /**
   * Parse a date string ensuring it's treated as UTC.
   * Handles both "2026-02-02T10:00:00Z" and "2026-02-02T10:00:00" formats.
   */
  private parseUtcDate(dateStr: string): Date {
    if (!dateStr) return new Date(NaN);
    let normalized = dateStr.trim();
    if (!normalized.endsWith('Z') && !normalized.includes('+') && !normalized.includes('-', 10)) {
      normalized = normalized + 'Z';
    }
    return new Date(normalized);
  }

  getCtaButtonText(event: Event): string {
    if (!event) return '';
    
    if (event.status === 'Upcoming') {
      return this.isUserRegistered(event.id) ? 'Registered' : 'Register';
    } else if (event.status === 'Live') {
      return this.isUserRegistered(event.id) ? 'Live Now' : 'Not Registered';
    } else if (event.status === 'Completed') {
      return 'Completed';
    } else if (event.status === 'Cancelled') {
      return 'Cancelled';
    }
    
    return '';
  }

  getCtaButtonClass(event: Event): string {
    if (!event) return '';
    
    if (event.status === 'Upcoming' && this.canRegister(event)) {
      return 'cta-button cta-register';
    } else if (event.status === 'Live' && this.isUserRegistered(event.id)) {
      return 'cta-button cta-live';
    }
    
    return 'cta-button cta-disabled';
  }

  isCtaDisabled(event: Event): boolean {
    if (!event) return true;
    
    if (event.status === 'Upcoming') {
      return !this.canRegister(event);
    }
    
    return event.status !== 'Live' || !this.isUserRegistered(event.id);
  }

  onCtaClick(event: Event): void {
    if (this.isCtaDisabled(event)) return;
    
    if (event.status === 'Upcoming' && this.canRegister(event)) {
      this.registerForEvent(event);
    }
  }

  registerForEvent(event: Event): void {
    this.isRegistering = true;
    
    // Log for debugging
    const token = localStorage.getItem('agdata_token');
    console.log('[UserEvents] Registering for event:', event.id);
    console.log('[UserEvents] Token available:', !!token);
    console.log('[UserEvents] User:', this.currentUser);
    
    this.http.post<any>(`${API_CONFIG.getApiUrl()}/event/${event.id}/register`, {})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isRegistering = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('[UserEvents] Registration successful:', response);
          
          // Update user context
          this.userContext.set(event.id, {
            eventId: event.id,
            isRegistered: true
          });
          
          // Reload events to get updated participant count
          this.loadEvents();
          
          // Show success message
          this.toastService.success('Successfully registered for ' + event.name);
          
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[UserEvents] Registration error:', error);
          console.error('[UserEvents] Error status:', error.status);
          console.error('[UserEvents] Error message:', error.error);
          
          let errorMessage = 'Failed to register for event';
          
          if (error.status === 401) {
            errorMessage = 'Authentication failed. Please log out and log in again.';
          } else if (error.status === 400) {
            errorMessage = error.error?.message || 'Registration not allowed. Check deadline and capacity.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          
          this.toastService.error(errorMessage);
        }
      });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    // Convert UTC to IST for display
    const istDate = utcToIst(dateStr);
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${month} ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }

  formatDateTime(dateStr: string): string {
    return this.formatDate(dateStr);
  }

  // ==================== COUNTDOWN ====================

  /**
   * Start countdown timer that updates every second
   */
  startCountdownTimer(): void {
    this.stopCountdownTimer();
    
    this.countdownSubscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateCountdowns();
        this.cdr.detectChanges();
      });
    
    // Initial update
    this.updateCountdowns();
  }

  /**
   * Stop countdown timer
   */
  stopCountdownTimer(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = null;
    }
  }

  /**
   * Update countdowns for all relevant events
   */
  updateCountdowns(): void {
    const now = new Date().getTime();
    
    this.allEvents.forEach(event => {
      const isRegistered = this.isUserRegistered(event.id);
      let targetDate: Date | null = null;
      let label = '';
      
      if (event.status === 'Upcoming') {
        if (!isRegistered && event.registrationEndDateUtc) {
          // Show countdown to registration close
          targetDate = this.parseUtcDate(event.registrationEndDateUtc);
          label = 'Registration closes in';
        } else if (isRegistered) {
          // Show countdown to event start
          targetDate = this.parseUtcDate(event.eventDate);
          label = 'Event starts in';
        }
      } else if (event.status === 'Live' && isRegistered) {
        // Show that event is live
        this.countdownMap.set(event.id, '🔴 Event is LIVE');
        return;
      }
      
      if (targetDate) {
        const diff = targetDate.getTime() - now;
        if (diff <= 0) {
          this.countdownMap.set(event.id, label === 'Registration closes in' ? 'Registration closed' : 'Started');
        } else {
          this.countdownMap.set(event.id, `${label}: ${this.formatCountdown(diff)}`);
        }
      } else {
        this.countdownMap.delete(event.id);
      }
    });
  }

  /**
   * Format countdown time in human-readable format
   */
  formatCountdown(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  /**
   * Get countdown display for an event
   */
  getCountdown(eventId: string): string {
    return this.countdownMap.get(eventId) || '';
  }

  /**
   * Check if event has a countdown to display
   */
  hasCountdown(eventId: string): boolean {
    return this.countdownMap.has(eventId);
  }

  getStatusBadgeClass(status: EventStatus): string {
    switch (status) {
      case 'Live': return 'status-badge status-live';
      case 'Upcoming': return 'status-badge status-upcoming';
      case 'Completed': return 'status-badge status-completed';
      case 'Cancelled': return 'status-badge status-cancelled';
      default: return 'status-badge';
    }
  }

  getStatusLabel(status: EventStatus): string {
    switch (status) {
      case 'Live': return 'Live';
      case 'Upcoming': return 'Upcoming';
      case 'Completed': return 'Completed';
      case 'Cancelled': return 'Cancelled';
      default: return status;
    }
  }

  getEventCardClass(event: Event): string {
    let classes = 'event-card';
    
    if (this.isEventSelected(event)) {
      classes += ' selected';
    }
    
    if (event.status === 'Live') {
      classes += ' event-live';
    } else if (event.status === 'Completed') {
      classes += ' event-completed';
    } else if (event.status === 'Cancelled') {
      classes += ' event-cancelled';
    }
    
    return classes;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.stopCountdownTimer();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
