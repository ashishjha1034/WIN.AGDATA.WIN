import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
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
  events: Event[] = [];
  filteredEvents: Event[] = [];
  kpi: EventKPI | null = null;
  currentUser: any;

  // UI State
  isLoading = false;
  selectedRows = new Set<string>();
  searchText = '';
  activeStatusTab: EventStatus | 'All' = 'All';
  currentPage = 1;
  pageSize = 10;
  
  // Error & Empty States
  errorMessage = '';
  showErrorAlert = false;
  hasLoadError = false;

  // Filters
  statusOptions: Array<{ value: EventStatus | 'All'; label: string }> = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Draft', label: 'Draft' }
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
   */
  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;
    
    const filter: EventFilter = {};

    if (this.activeStatusTab !== 'All') {
      filter.status = this.activeStatusTab;
    }
    if (this.searchText) {
      filter.searchText = this.searchText;
    }

    console.log('[EventMgmt] Loading events with filter:', filter);

    this.eventService.getEvents(filter)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          console.log('[EventMgmt] Loading finished - finalize entered');
          // Defer clearing loading state to ensure any in-flight UI updates finish
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
          console.log('[EventMgmt] Data type:', typeof data, 'Is array?', Array.isArray(data));
          console.log('[EventMgmt] Data length:', data ? data.length : 'null/undefined');
          const extracted: any = Array.isArray(data) ? data : ((data as any)?.data || []);
          this.events = extracted;
          console.log('[EventMgmt] this.events assigned. Length:', this.events.length);
          this.hasLoadError = false;
          // Compute KPI from loaded events
          this.kpi = this.eventService.computeKPIFromEvents(this.events);
          console.log('[EventMgmt] KPI computed:', this.kpi);
          this.applyPagination();
          // Defensive: if events present but pagination produced empty list, reapply
          if (this.events.length > 0 && this.filteredEvents.length === 0) {
            console.warn('[EventMgmt] filteredEvents empty despite events present — reapplying pagination');
            this.applyPagination();
          }
          console.log('[EventMgmt] Pagination applied. filteredEvents length:', this.filteredEvents.length);
          // Trigger change detection to update template
          this.cdr.detectChanges();
          console.log('[EventMgmt] Change detection triggered');
        },
        error: (error) => {
          console.error('[EventMgmt] Error loading events:', error);
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
   * Filter by status tab
   */
  onStatusTabChange(status: EventStatus | 'All'): void {
    this.activeStatusTab = status;
    this.currentPage = 1;
    this.selectedRows.clear();
    this.loadEvents();
  }

  /**
   * Handle search
   */
  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.selectedRows.clear();
    this.loadEvents();
  }

  /**
   * Toggle row selection
   */
  toggleRowSelection(eventId: string, event?: Event): void {
    if (this.selectedRows.has(eventId)) {
      this.selectedRows.delete(eventId);
    } else {
      this.selectedRows.add(eventId);
    }
  }

  /**
   * Toggle all rows
   */
  toggleAllRows(): void {
    if (this.selectedRows.size === this.filteredEvents.length) {
      this.selectedRows.clear();
    } else {
      this.filteredEvents.forEach(e => this.selectedRows.add(e.id));
    }
  }

  /**
   * Check if all rows are selected
   */
  isAllSelected(): boolean {
    return (
      this.filteredEvents.length > 0 &&
      this.filteredEvents.every(e => this.selectedRows.has(e.id))
    );
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
   * Export events to CSV
   */
  exportEvents(): void {
    console.log('[EventMgmt] Exporting events...');
    // Implementation would generate CSV and download
    // For now, just log the action
    alert('Export feature coming soon!');
  }

  /**
   * Bulk action - would be implemented based on selection
   */
  onBulkAction(action: string): void {
    console.log('[EventMgmt] Bulk action:', action, 'Selected:', Array.from(this.selectedRows));
    alert(`Bulk ${action} on ${this.selectedRows.size} events - Coming soon!`);
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: EventStatus): string {
    const colors: Record<EventStatus, string> = {
      'Draft': '#6B7280',
      'Active': '#10B981',
      'Upcoming': '#3B82F6',
      'Completed': '#8B5CF6',
      'Cancelled': '#EF4444'
    };
    return colors[status] || '#6B7280';
  }

  /**
   * Get status text color
   */
  getStatusTextColor(status: EventStatus): string {
    const colors: Record<EventStatus, string> = {
      'Draft': '#374151',
      'Active': '#065F46',
      'Upcoming': '#1E3A8A',
      'Completed': '#5B21B6',
      'Cancelled': '#7F1D1D'
    };
    return colors[status] || '#374151';
  }

  /**
   * Format date
   */
  formatDate(date: string): string {
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
    this.selectedRows.clear();
    this.applyPagination();
  }

  /**
   * Get total pages
   */
  getTotalPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }
}
