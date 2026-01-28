import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

// Register ECharts components
echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

import { EventService } from '../../../services/event.service';
import { Event, EventStatus, EventFilter, EventKPI, CreateEventRequest, UpdateEventRequest } from '../../../models/event.models';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective],
  providers: [
    provideEchartsCore({ echarts })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  sortBy = 'eventDate';
  successMessage: string | null = null;
  
  // Error & Empty States
  errorMessage = '';
  showErrorAlert = false;
  hasLoadError = false;

  // Modal State
  showCreateEventModal = false;
  showEditEventModal = false;
  isSubmittingEvent = false;
  editingEventId: string | null = null;
  
  // Create/Edit Event Form
  newEvent: CreateEventRequest = {
    name: '',
    description: '',
    eventDate: '',
    location: '',
    maxParticipants: undefined,
    totalPointsPool: 0,
    registrationEndDateUtc: ''
  };

  // Chart configuration
  topNUpcoming = 4;
  eventStatusChartOption: EChartsOption = {};
  enrollmentChartOption: EChartsOption = {};
  
  // Chart colors
  private readonly chartColors = {
    upcoming: '#0891b2',   // Teal/Cyan
    live: '#16a34a',       // Green
    completed: '#6b7280',  // Gray
    cancelled: '#dc2626'   // Red
  };

  // Signals for upcoming events chart
  private allEventsSignal = signal<Event[]>([]);
  
  // Computed upcoming events for chart
  upcomingEventsForChart = computed(() => {
    const events = this.allEventsSignal();
    return events
      .filter(e => e.status === 'Upcoming')
      .slice(0, this.topNUpcoming)
      .map(e => ({
        name: e.name,
        enrolled: e.participantCount || 0,
        capacity: e.maxParticipants || 100,
        percent: e.maxParticipants ? Math.round((e.participantCount / e.maxParticipants) * 100) : 0
      }));
  });

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
      this.applyStatusFilter();
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
        this.cdr.markForCheck();
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
            this.cdr.markForCheck();
          }, 0);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[EventMgmt] Events loaded successfully, received data:', data);
          const extracted: any = Array.isArray(data) ? data : ((data as any)?.data || []);
          this.allEvents = extracted;
          this.allEventsSignal.set(extracted);
          
          // Compute KPI from ALL events (not filtered)
          this.kpi = this.eventService.computeKPIFromEvents(this.allEvents);
          console.log('[EventMgmt] KPI computed from all events:', this.kpi);
          
          // Update charts
          this.updateEventStatusChart();
          this.updateEnrollmentChart();
          
          // Apply tab filter for display
          this.applyStatusFilter();
          this.hasLoadError = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('[EventMgmt] Error loading events:', error);
          this.allEvents = [];
          this.events = [];
          this.filteredEvents = [];
          this.hasLoadError = true;
          this.errorMessage = `Failed to load events: ${error?.status || error?.message || 'Unknown error'}. Please try again.`;
          this.showErrorAlert = true;
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Update the Event Status pie chart
   */
  updateEventStatusChart(): void {
    const statusCounts = {
      upcoming: this.allEvents.filter(e => e.status === 'Upcoming').length,
      live: this.allEvents.filter(e => e.status === 'Live').length,
      completed: this.allEvents.filter(e => e.status === 'Completed').length,
      cancelled: this.allEvents.filter(e => e.status === 'Cancelled').length
    };

    const total = statusCounts.upcoming + statusCounts.live + statusCounts.completed + statusCounts.cancelled;

    this.eventStatusChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const percent = total > 0 ? ((params.value / total) * 100).toFixed(1) : 0;
          return `${params.name}: ${params.value} (${percent}%)`;
        }
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        formatter: (name: string) => {
          const key = name.toLowerCase() as keyof typeof statusCounts;
          const count = statusCounts[key] || 0;
          const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
          return `${name}: ${count} (${percent}%)`;
        },
        textStyle: {
          fontSize: 12,
          color: '#6b7280'
        }
      },
      series: [
        {
          name: 'Event Status',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data: [
            { value: statusCounts.upcoming, name: 'Upcoming', itemStyle: { color: this.chartColors.upcoming } },
            { value: statusCounts.live, name: 'Live', itemStyle: { color: this.chartColors.live } },
            { value: statusCounts.completed, name: 'Completed', itemStyle: { color: this.chartColors.completed } },
            { value: statusCounts.cancelled, name: 'Cancelled', itemStyle: { color: this.chartColors.cancelled } }
          ].filter(d => d.value > 0)
        }
      ]
    };
  }

  /**
   * Update the Enrollment Progress bar chart
   */
  updateEnrollmentChart(): void {
    const upcomingEvents = this.upcomingEventsForChart();
    
    if (upcomingEvents.length === 0) {
      this.enrollmentChartOption = {};
      return;
    }

    // Reverse for horizontal bar chart (bottom to top)
    const reversed = [...upcomingEvents].reverse();
    const eventNames = reversed.map(e => e.name); // Full names - no truncation
    const enrolledData = reversed.map(e => e.percent);
    const remainingData = reversed.map(e => 100 - e.percent);

    this.enrollmentChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { 
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(44, 95, 63, 0.08)'
          }
        },
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: [12, 16],
        textStyle: {
          color: '#374151',
          fontSize: 13
        },
        formatter: (params: any) => {
          const event = reversed[params[0].dataIndex];
          return `<div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${event.name}</div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="color: #6b7280;">Enrolled:</span>
                    <span style="font-weight: 500; margin-left: 16px;">${event.enrolled} / ${event.capacity}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Progress:</span>
                    <span style="font-weight: 600; color: #2c5f3f; margin-left: 16px;">${event.percent}%</span>
                  </div>`;
        },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;'
      },
      grid: {
        left: '3%',
        right: '12%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%',
          fontSize: 11,
          color: '#9ca3af'
        },
        splitLine: {
          lineStyle: { color: '#f3f4f6' }
        }
      },
      yAxis: {
        type: 'category',
        data: eventNames,
        axisLabel: {
          fontSize: 12,
          color: '#374151',
          width: 180,
          overflow: 'truncate',
          formatter: (value: string) => {
            // Show full name up to 28 chars, then truncate
            return value.length > 28 ? value.substring(0, 28) + '...' : value;
          }
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: 'Enrolled',
          type: 'bar',
          stack: 'total',
          barWidth: 24,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#2c5f3f' },
              { offset: 1, color: '#3d8b5a' }
            ]),
            borderRadius: [4, 0, 0, 4]
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#3d8b5a' },
                { offset: 1, color: '#4ade80' }
              ]),
              shadowBlur: 8,
              shadowColor: 'rgba(44, 95, 63, 0.3)'
            }
          },
          label: {
            show: true,
            position: 'insideRight',
            formatter: (params: any) => {
              const event = reversed[params.dataIndex];
              return event.percent >= 15 ? `${event.percent}%` : '';
            },
            fontSize: 11,
            color: '#fff',
            fontWeight: 'bold'
          },
          data: enrolledData
        },
        {
          name: 'Remaining',
          type: 'bar',
          stack: 'total',
          barWidth: 24,
          itemStyle: {
            color: '#e5e7eb',
            borderRadius: [0, 4, 4, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#d1d5db'
            }
          },
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              const event = reversed[params.dataIndex];
              return `${event.enrolled}/${event.capacity}`;
            },
            fontSize: 11,
            color: '#6b7280'
          },
          data: remainingData
        }
      ]
    };
  }

  /**
   * Check if we have event status data for the chart
   */
  hasEventStatusData(): boolean {
    return this.allEvents.length > 0;
  }

  /**
   * Get count for a specific status
   */
  getStatusCount(status: EventStatus | 'All'): number {
    if (status === 'All') return this.allEvents.length;
    return this.allEvents.filter(e => e.status === status).length;
  }

  /**
   * Get participant percentage for display
   */
  getParticipantPercent(event: Event): number {
    if (!event.maxParticipants || event.maxParticipants === 0) return 0;
    return Math.round((event.participantCount / event.maxParticipants) * 100);
  }

  /**
   * Get points distribution percentage
   */
  getPointsPercent(event: Event): number {
    if (!event.totalPointsPool || event.totalPointsPool === 0) return 0;
    return Math.round((event.distributedPoints / event.totalPointsPool) * 100);
  }

  /**
   * Get total pages for pagination
   */
  get totalPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }

  /**
   * Sort change handler
   */
  onSortChange(): void {
    this.applyStatusFilter();
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
    
    // Apply sorting
    filtered = this.applySorting(filtered);
    
    this.events = filtered;
    console.log('[EventMgmt] Filtered events:', this.events.length);
    this.applyPagination();
  }

  /**
   * Apply sorting to events
   */
  applySorting(events: Event[]): Event[] {
    return events.sort((a, b) => {
      switch (this.sortBy) {
        case 'participants':
          return (b.participantCount || 0) - (a.participantCount || 0);
        case 'pointsPool':
          return (b.totalPointsPool || 0) - (a.totalPointsPool || 0);
        case 'pointsDistributed':
          const percentA = a.totalPointsPool ? (a.distributedPoints / a.totalPointsPool) : 0;
          const percentB = b.totalPointsPool ? (b.distributedPoints / b.totalPointsPool) : 0;
          return percentB - percentA;
        case 'eventDate':
        default:
          return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
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
   * Filter by status tab (no reload, just filter)
   */
  onStatusTabChange(status: EventStatus | 'All'): void {
    this.activeStatusTab = status;
    this.currentPage = 1;
    this.applyStatusFilter();
    this.cdr.markForCheck();
  }

  /**
   * Handle search with debounce
   */
  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.applyStatusFilter();
    this.cdr.markForCheck();
  }

  /**
   * Navigate to event detail
   */
  openEventDetail(eventId: string): void {
    this.router.navigateByUrl(`/admin/events/${eventId}`);
  }

  /**
   * Open Create Event modal
   */
  createEvent(): void {
    this.resetEventForm();
    this.showCreateEventModal = true;
    this.showEditEventModal = false;
    this.editingEventId = null;
    this.cdr.markForCheck();
  }

  /**
   * Open Edit Event modal with prefilled data
   */
  openEditEventModal(event: Event): void {
    this.editingEventId = event.id;
    this.newEvent = {
      name: event.name,
      description: event.description || '',
      eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
      location: event.location || '',
      maxParticipants: event.maxParticipants,
      totalPointsPool: event.totalPointsPool || 0,
      registrationEndDateUtc: event.registrationEndDateUtc ? event.registrationEndDateUtc.split('T')[0] : ''
    };
    this.showEditEventModal = true;
    this.showCreateEventModal = false;
    this.cdr.markForCheck();
  }

  /**
   * Close the event modal
   */
  closeEventModal(): void {
    this.showCreateEventModal = false;
    this.showEditEventModal = false;
    this.editingEventId = null;
    this.resetEventForm();
    this.cdr.markForCheck();
  }

  /**
   * Reset the event form
   */
  resetEventForm(): void {
    const today = new Date().toISOString().split('T')[0];
    this.newEvent = {
      name: '',
      description: '',
      eventDate: today,
      location: '',
      maxParticipants: undefined,
      totalPointsPool: 0,
      registrationEndDateUtc: ''
    };
  }

  /**
   * Validate event form
   */
  validateEventForm(): boolean {
    if (!this.newEvent.name || this.newEvent.name.length < 3) {
      this.errorMessage = 'Event name must be at least 3 characters';
      this.showErrorAlert = true;
      return false;
    }
    if (!this.newEvent.description || this.newEvent.description.length < 10) {
      this.errorMessage = 'Description must be at least 10 characters';
      this.showErrorAlert = true;
      return false;
    }
    if (!this.newEvent.eventDate) {
      this.errorMessage = 'Event date is required';
      this.showErrorAlert = true;
      return false;
    }
    if (!this.newEvent.registrationEndDateUtc) {
      this.errorMessage = 'Registration end date is required';
      this.showErrorAlert = true;
      return false;
    }
    if (!this.newEvent.totalPointsPool || this.newEvent.totalPointsPool < 1) {
      this.errorMessage = 'Total points pool must be at least 1';
      this.showErrorAlert = true;
      return false;
    }

    // Validate dates
    const eventDate = new Date(this.newEvent.eventDate);
    const regEndDate = new Date(this.newEvent.registrationEndDateUtc);
    if (regEndDate > eventDate) {
      this.errorMessage = 'Registration deadline must be before or on event date';
      this.showErrorAlert = true;
      return false;
    }

    return true;
  }

  /**
   * Submit new event
   */
  submitNewEvent(): void {
    this.showErrorAlert = false;
    
    if (!this.validateEventForm()) {
      return;
    }

    this.isSubmittingEvent = true;
    
    this.eventService.createEvent(this.newEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          console.log('[EventMgmt] Event created:', event);
          this.isSubmittingEvent = false;
          this.closeEventModal();
          this.successMessage = `Event "${event.name}" created successfully!`;
          this.loadEvents();
          this.cdr.markForCheck();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
            this.cdr.markForCheck();
          }, 3000);
        },
        error: (error) => {
          console.error('[EventMgmt] Error creating event:', error);
          this.isSubmittingEvent = false;
          this.errorMessage = 'Failed to create event. Please try again.';
          this.showErrorAlert = true;
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Submit event update
   */
  submitEditEvent(): void {
    this.showErrorAlert = false;
    
    if (!this.validateEventForm() || !this.editingEventId) {
      return;
    }

    this.isSubmittingEvent = true;
    
    const updateRequest: UpdateEventRequest = {
      name: this.newEvent.name,
      description: this.newEvent.description,
      eventDate: this.newEvent.eventDate,
      location: this.newEvent.location || undefined,
      maxParticipants: this.newEvent.maxParticipants,
      totalPointsPool: this.newEvent.totalPointsPool,
      registrationEndDateUtc: this.newEvent.registrationEndDateUtc
    };
    
    this.eventService.updateEvent(this.editingEventId, updateRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          console.log('[EventMgmt] Event updated:', event);
          this.isSubmittingEvent = false;
          this.closeEventModal();
          this.successMessage = `Event "${event.name}" updated successfully!`;
          this.loadEvents();
          this.cdr.markForCheck();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
            this.cdr.markForCheck();
          }, 3000);
        },
        error: (error) => {
          console.error('[EventMgmt] Error updating event:', error);
          this.isSubmittingEvent = false;
          this.errorMessage = 'Failed to update event. Please try again.';
          this.showErrorAlert = true;
          this.cdr.markForCheck();
        }
      });
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
    this.cdr.markForCheck();
  }

  /**
   * Get total pages (legacy method for template compatibility)
   */
  getTotalPages(): number {
    return this.totalPages;
  }
}
