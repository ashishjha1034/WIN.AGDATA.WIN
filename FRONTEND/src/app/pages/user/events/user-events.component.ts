import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { Event, EventStatus } from '../../../models/event.models';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../config/api.config';

type SortOption = 'dateNewest' | 'dateOldest' | 'pointsHigh' | 'participantsHigh' | 'availabilityLow';

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

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent]
})
export class UserEventsComponent implements OnInit, OnDestroy {
  currentUser: any;
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  selectedEvent: Event | null = null;
  userContext: Map<string, UserEventContext> = new Map();
  
  isLoading = true;
  isRegistering = false;
  searchQuery = '';
  selectedSort: SortOption = 'dateNewest';
  
  tabs: Tab[] = [
    { label: 'All', status: 'All', count: 0 },
    { label: 'Upcoming', status: 'Upcoming', count: 0 },
    { label: 'Live', status: 'Live', count: 0 },
    { label: 'Completed', status: 'Completed', count: 0 },
    { label: 'Cancelled', status: 'Cancelled', count: 0 }
  ];
  
  activeTab: EventStatus | 'All' = 'All';
  
  sortOptions = [
    { value: 'dateNewest', label: 'Date (Newest First)' },
    { value: 'dateOldest', label: 'Date (Oldest First)' },
    { value: 'pointsHigh', label: 'Points (High → Low)' },
    { value: 'participantsHigh', label: 'Participants (High → Low)' },
    { value: 'availabilityLow', label: 'Availability (Few slots first)' }
  ];
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadEvents();
        }
      });
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
        
        // Build user context from registered events
        const myEventsData = Array.isArray(results.myEvents) ? results.myEvents : results.myEvents.data || [];
        myEventsData.forEach((event: any) => {
          this.userContext.set(event.id, {
            eventId: event.id,
            isRegistered: true
          });
        });
        
        this.updateTabCounts();
        this.selectDefaultTab();
        this.applyFiltersAndSort();
        
        // Auto-select first event if available
        if (this.filteredEvents.length > 0) {
          this.selectEvent(this.filteredEvents[0]);
        }
        
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

  applyFiltersAndSort(): void {
    let events = [...this.allEvents];
    
    // Filter by tab
    if (this.activeTab !== 'All') {
      events = events.filter(e => e.status === this.activeTab);
    }
    
    // Filter by search
    if (this.searchQuery.trim()) {
      const search = this.searchQuery.toLowerCase();
      events = events.filter(e =>
        e.name.toLowerCase().includes(search) ||
        e.description?.toLowerCase().includes(search)
      );
    }
    
    // Sort
    events = this.sortEvents(events, this.selectedSort);
    
    this.filteredEvents = events;
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
      case 'pointsHigh':
        sorted.sort((a, b) => (b.totalPointsPool || 0) - (a.totalPointsPool || 0));
        break;
      case 'participantsHigh':
        sorted.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0));
        break;
      case 'availabilityLow':
        sorted.sort((a, b) => {
          const aSlotsLeft = (a.maxParticipants || 999999) - (a.participantCount || 0);
          const bSlotsLeft = (b.maxParticipants || 999999) - (b.participantCount || 0);
          return aSlotsLeft - bSlotsLeft;
        });
        break;
    }
    
    return sorted;
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
  }

  isEventSelected(event: Event): boolean {
    return this.selectedEvent?.id === event.id;
  }

  isUserRegistered(eventId: string): boolean {
    return this.userContext.get(eventId)?.isRegistered || false;
  }

  canRegister(event: Event): boolean {
    if (this.isUserRegistered(event.id)) return false;
    if (event.status !== 'Upcoming') return false;
    
    // Check registration deadline
    if (event.registrationEndDateUtc) {
      const deadline = new Date(event.registrationEndDateUtc);
      const now = new Date();
      if (now > deadline) return false;
    }
    
    // Check max participants
    if (event.maxParticipants && event.participantCount >= event.maxParticipants) {
      return false;
    }
    
    return true;
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
          alert('Successfully registered for ' + event.name);
          
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
          
          alert(errorMessage);
        }
      });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatDateTime(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
