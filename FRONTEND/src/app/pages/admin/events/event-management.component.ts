import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { Event, EventStatus, EventFilter, EventKPI } from '../../../models/event.models';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent]
})
export class EventManagementComponent implements OnInit, OnDestroy {
  // Expose global Math to templates to avoid AOT/runtime undefined
  public Math = Math;
  // Data
  allEvents: Event[] = [];  // All events for KPI calculation (unfiltered)
  events: Event[] = [];     // Events filtered by status tab
  filteredEvents: Event[] = [];
  kpi: EventKPI | null = null;
  currentUser: any;

  // UI State
  isLoading = false;
  searchText = '';
  activeStatusTab: EventStatus | 'All' = 'All';
  currentPage = 1;
  pageSize = 10;
  
  // Error & Empty States
  errorMessage = '';
  showErrorAlert = false;
  hasLoadError = false;

  // Search debounce
  private searchSubject$ = new Subject<string>();

  // Status tabs - aligned with backend statuses
  statusOptions: Array<{ value: EventStatus | 'All'; label: string }> = [
    { value: 'All', label: 'All' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Live', label: 'Live' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Canceled' }
  ];

  private destroy$ = new Subject<void>();

  @ViewChild('eventsTable') eventsTable!: ElementRef;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadEvents();
    
    // Setup search debounce
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchText => {
      this.searchText = searchText;
      this.currentPage = 1;
      this.loadEvents();
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
   * Load events with current filters
   * KPIs are computed from ALL events, tabs filter display only
   */
  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    console.log('[EventMgmt] Loading all events');

    // Always fetch all events first for KPI calculation
    this.eventService.getEvents({})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          console.log('[EventMgmt] Loading finished - finalize entered');
          setTimeout(() => {
            this.isLoading = false;
            console.log('[EventMgmt] isLoading set to false (deferred)');
            try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
          }, 0);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[EventMgmt] Events loaded successfully, received data:', data);
          const extracted: any = Array.isArray(data) ? data : ((data as any)?.data || []);
          this.allEvents = extracted;
          
          // Compute KPI from ALL events (not filtered)
          this.kpi = this.eventService.computeKPIFromEvents(this.allEvents);
          console.log('[EventMgmt] KPI computed from all events:', this.kpi);
          
          // Apply tab filter for display
          this.applyStatusFilter();
          this.hasLoadError = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('[EventMgmt] Error loading events:', error);
          this.allEvents = [];
          this.events = [];
          this.filteredEvents = [];
          this.hasLoadError = true;
          this.errorMessage = `Failed to load events: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
          this.showErrorAlert = true;
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Apply status tab filter to events for display
   */
  applyStatusFilter(): void {
    let filtered = [...this.allEvents];
    
    // Filter by status tab
    if (this.activeStatusTab !== 'All') {
      filtered = filtered.filter(e => e.status === this.activeStatusTab);
    }
    
    // Filter by search text
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(search) ||
        e.description?.toLowerCase().includes(search)
      );
    }
    
    this.events = filtered;
    console.log('[EventMgmt] Filtered events:', this.events.length);
    this.applyPagination();
  }

  /**
   * Close error alert
   */
  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }

  /**
   * Apply pagination to events
   */
  applyPagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredEvents = this.events.slice(start, end);
  }

  /**
   * Filter by status tab (no reload, just filter)
   */
  onStatusTabChange(status: EventStatus | 'All'): void {
    this.activeStatusTab = status;
    this.currentPage = 1;
    this.applyStatusFilter();
  }

  /**
   * Handle search with debounce
   */
  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.applyStatusFilter();
  }

  /**
   * Navigate to event detail
   */
  openEventDetail(eventId: string): void {
    this.router.navigateByUrl(`/admin/events/${eventId}`);
  }

  /**
   * Create new event
   */
  createEvent(): void {
    this.router.navigateByUrl('/admin/events/new');
  }

  /**
   * Get status badge background color - updated per spec
   */
  getStatusColor(status: EventStatus): string {
    const colors: Record<EventStatus, string> = {
      'Live': '#16A34A',       // Green
      'Upcoming': '#F59E0B',   // Amber/Orange
      'Completed': '#EC4899',  // Pink
      'Cancelled': '#EF4444'   // Red
    };
    return colors[status] || '#6B7280';
  }

  /**
   * Get status text color for contrast
   */
  getStatusTextColor(status: EventStatus): string {
    // All status badges use white text for high contrast
    return '#FFFFFF';
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
   * Page change handler
   */
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.applyPagination();
  }

  /**
   * Get total pages
   */
  getTotalPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }
}
