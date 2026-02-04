import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { takeUntil, finalize, debounceTime, distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { ToastService } from '../../../services/toast.service';
import { Event, EventStatus, EventFilter, EventKPI, CreateEventRequest, UpdateEventRequest } from '../../../models/event.models';
import { AuthService } from '../../../services/auth.service';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../shared/components/admin-header.component';
import { ValidationHintComponent } from '../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../shared/components/form-errors-summary.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { 
  formatDateTimeForInputIst, 
  parseInputDateTimeToUtcIso, 
  getMinDateTimeForInput,
  EventValidationUtils 
} from '../../../shared/utils/ist-timezone.utils';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidebarComponent, AdminHeaderComponent, NgxEchartsDirective, ValidationHintComponent, FormErrorsSummaryComponent, PaginationComponent],
  providers: [
    provideEchartsCore({ echarts })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
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
  showFilters = false;
  poolStatusFilter = 'all';
  capacityFilter = 'all';
  
  // Chart visibility state
  eventStatusChartVisible = signal(true);
  private readonly CHART_VISIBILITY_KEY = 'events_status_chart_visible';
  
  // Error & Empty States
  errorMessage = '';
  showErrorAlert = false;
  hasLoadError = false;

  // Modal State
  showCreateEventModal = false;
  showEditEventModal = false;
  isSubmittingEvent = false;
  editingEventId: string | null = null;
  
  // Create/Edit Event Form - Reactive Form
  eventForm!: FormGroup;
  validationConstants = ValidationConstants;
  
  // Validation signals for event form
  nameCharCount = signal(0);
  nameWordCount = signal(0);
  descCharCount = signal(0);
  descWordCount = signal(0);
  locationCharCount = signal(0);
  locationWordCount = signal(0);
  nameUniquenessChecking = signal(false);
  nameUniquenessResult = signal<ValidationResult | null>(null);
  minDateTime = signal('');
  maxRegistrationDateTime = signal('');
  
  // For name uniqueness debounce
  private nameChange$ = new Subject<string>();
  
  // Legacy newEvent object (for compatibility during transition)
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
    private validationService: ValidationService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadEvents();
    this.initializeEventForm();
    this.setupEventFormListeners();
    this.setupNameUniquenessCheck();
    this.updateMinDateTime();
    this.loadChartVisibilityPreference();
    
    // Check for status query param and set active tab
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params['status'] === 'Live') {
        this.activeStatusTab = 'Live';
        this.applyStatusFilter();
      }
    });
    
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

  // ============================================================
  // Event Form Methods
  // ============================================================

  /**
   * Initialize the reactive form for event create/edit
   */
  private initializeEventForm(): void {
    this.eventForm = this.fb.group({
      name: ['', [
        Validators.required,
        CustomValidators.eventNameFormat()
      ]],
      description: ['', [
        Validators.required,
        CustomValidators.eventDescriptionFormat()
      ]],
      eventDate: ['', [
        Validators.required,
        CustomValidators.futureDate()
      ]],
      registrationEndDate: ['', [
        Validators.required,
        CustomValidators.futureDate(),
        CustomValidators.registrationBeforeEvent('eventDate')
      ]],
      location: ['', [
        CustomValidators.eventLocationFormat()
      ]],
      maxParticipants: [null, [
        CustomValidators.eventMaxParticipants()
      ]],
      totalPointsPool: [null, [
        Validators.required,
        CustomValidators.eventPointsPool()
      ]]
    });

    // Cross-field validation: re-validate registrationEndDate when eventDate changes
    this.eventForm.get('eventDate')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const regEndControl = this.eventForm.get('registrationEndDate');
      if (regEndControl) {
        regEndControl.updateValueAndValidity();
      }
      // Update max datetime for registration
      const eventDate = this.eventForm.get('eventDate')?.value;
      if (eventDate) {
        this.maxRegistrationDateTime.set(eventDate);
      }
    });
  }

  /**
   * Setup value change listeners for counters
   */
  private setupEventFormListeners(): void {
    // Name counters
    this.eventForm.get('name')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.nameCharCount.set(EventValidationUtils.countCharsNoSpaces(value));
      this.nameWordCount.set(EventValidationUtils.countWords(value));
      // Trigger uniqueness check
      if (value && value.trim().length >= 2) {
        this.nameChange$.next(value);
      } else {
        this.nameUniquenessResult.set(null);
      }
    });

    // Description counters
    this.eventForm.get('description')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.descCharCount.set(value?.trim()?.length || 0);
      this.descWordCount.set(EventValidationUtils.countWords(value));
    });

    // Location counters
    this.eventForm.get('location')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.locationCharCount.set(EventValidationUtils.countCharsNoSpaces(value));
      this.locationWordCount.set(EventValidationUtils.countWords(value));
    });
  }

  /**
   * Setup name uniqueness check with debounce
   */
  private setupNameUniquenessCheck(): void {
    this.nameChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      filter(name => {
        const nameControl = this.eventForm.get('name');
        return nameControl?.valid ?? false;
      }),
      tap(() => {
        this.nameUniquenessChecking.set(true);
        this.nameUniquenessResult.set(null);
      }),
      switchMap(name => {
        if (!name || name.trim().length < 2) {
          return of(null);
        }
        // Pass excludeEventId for edit scenario
        return this.validationService.checkEventNameAvailability(name, this.editingEventId || undefined);
      })
    ).subscribe({
      next: (result) => {
        this.nameUniquenessChecking.set(false);
        this.nameUniquenessResult.set(result);
        this.cdr.markForCheck();
      },
      error: () => {
        this.nameUniquenessChecking.set(false);
        this.nameUniquenessResult.set(null);
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Update minimum datetime for date inputs
   */
  private updateMinDateTime(): void {
    this.minDateTime.set(getMinDateTimeForInput());
  }

  /**
   * Check name availability manually
   */
  checkEventNameAvailability(): void {
    const name = this.eventForm.get('name')?.value;
    if (name && name.trim().length >= 2) {
      this.nameUniquenessChecking.set(true);
      this.nameUniquenessResult.set(null);
      this.validationService.checkEventNameAvailability(name, this.editingEventId || undefined)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result) => {
            this.nameUniquenessChecking.set(false);
            this.nameUniquenessResult.set(result);
            this.cdr.markForCheck();
          },
          error: () => {
            this.nameUniquenessChecking.set(false);
            this.nameUniquenessResult.set(null);
            this.cdr.markForCheck();
          }
        });
    }
  }

  /**
   * Form control getter
   */
  get ef() {
    return this.eventForm.controls;
  }

  /**
   * Check if form can be submitted
   */
  canSubmitEventForm(): boolean {
    const form = this.eventForm;
    const uniquenessResult = this.nameUniquenessResult();
    const isChecking = this.nameUniquenessChecking();

    // Cannot submit if form is invalid or currently checking uniqueness
    if (form.invalid || isChecking) {
      return false;
    }

    // Cannot submit if uniqueness check failed
    if (uniquenessResult && !uniquenessResult.isValid) {
      return false;
    }

    return true;
  }

  /**
   * Get submit disabled message
   */
  getSubmitDisabledMessage(): string {
    if (this.isSubmittingEvent) return 'Saving...';
    if (this.nameUniquenessChecking()) return 'Checking name availability...';
    if (this.nameUniquenessResult() && !this.nameUniquenessResult()?.isValid) {
      return 'Event name is already taken';
    }
    if (this.eventForm.invalid) return 'Please fix validation errors';
    return '';
  }

  // ============================================================
  // End Event Form Methods
  // ============================================================

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
          // Enrollment chart removed as per requirements
          
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
          return `${name}: ${count}`;
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
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: (params: any) => {
              const percent = total > 0 ? ((params.value / total) * 100).toFixed(0) : 0;
              return `${percent}%`;
            },
            fontSize: 12,
            fontWeight: 600,
            color: '#374151'
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 15,
            smooth: true
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            },
            scale: true,
            scaleSize: 5
          },
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
   * Load chart visibility preference from localStorage
   */
  private loadChartVisibilityPreference(): void {
    const stored = localStorage.getItem(this.CHART_VISIBILITY_KEY);
    if (stored !== null) {
      this.eventStatusChartVisible.set(stored === 'true');
    }
  }

  /**
   * Toggle event status chart visibility
   */
  toggleEventStatusChart(): void {
    const newState = !this.eventStatusChartVisible();
    this.eventStatusChartVisible.set(newState);
    localStorage.setItem(this.CHART_VISIBILITY_KEY, String(newState));
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
   * Toggle filters panel
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Reset all filters to defaults
   */
  resetFilters(): void {
    this.sortBy = 'eventDate';
    this.poolStatusFilter = 'all';
    this.capacityFilter = 'all';
    this.searchText = '';
    this.currentPage = 1;
    this.applyStatusFilter();
    this.cdr.markForCheck();
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

    // Filter by pool status
    if (this.poolStatusFilter !== 'all') {
      filtered = filtered.filter(e => {
        const isFullyDistributed = e.totalPointsPool > 0 && e.distributedPoints >= e.totalPointsPool;
        return this.poolStatusFilter === 'distributed' ? isFullyDistributed : !isFullyDistributed;
      });
    }

    // Filter by participant capacity
    if (this.capacityFilter !== 'all') {
      filtered = filtered.filter(e => {
        const percent = e.maxParticipants ? (e.participantCount / e.maxParticipants) * 100 : 0;
        switch (this.capacityFilter) {
          case 'full': return percent >= 100;
          case 'high': return percent >= 75 && percent < 100;
          case 'medium': return percent >= 50 && percent < 75;
          case 'low': return percent < 50;
          default: return true;
        }
      });
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
   * Handle pie chart click to filter by status
   */
  onPieChartClick(event: any): void {
    if (event && event.name) {
      // Map chart label to EventStatus
      const statusMap: Record<string, EventStatus> = {
        'Upcoming': 'Upcoming',
        'Live': 'Live',
        'Completed': 'Completed',
        'Cancelled': 'Cancelled'
      };
      
      const status = statusMap[event.name];
      if (status) {
        this.onStatusTabChange(status);
      }
    }
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
   * Format UTC datetime string for datetime-local input (YYYY-MM-DDTHH:mm)
   */
  formatDatetimeForInput(utcDateStr: string): string {
    if (!utcDateStr) return '';
    // Parse UTC date and convert to local timezone
    const date = new Date(utcDateStr);
    // Format as YYYY-MM-DDTHH:mm (datetime-local format)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Open Edit Event modal with prefilled data
   */
  openEditEventModal(event: Event): void {
    this.editingEventId = event.id;
    
    // Format dates for input
    const eventDateFormatted = event.eventDate ? formatDateTimeForInputIst(event.eventDate) : '';
    const regEndDateFormatted = event.registrationEndDateUtc ? formatDateTimeForInputIst(event.registrationEndDateUtc) : '';
    
    // Reset the form and populate with event data
    this.eventForm.reset();
    this.eventForm.patchValue({
      name: event.name,
      description: event.description || '',
      eventDate: eventDateFormatted,
      registrationEndDate: regEndDateFormatted,
      location: event.location || '',
      maxParticipants: event.maxParticipants || null,
      totalPointsPool: event.totalPointsPool || 0
    });
    
    // Update counters
    this.nameCharCount.set(EventValidationUtils.countCharsNoSpaces(event.name));
    this.nameWordCount.set(EventValidationUtils.countWords(event.name));
    this.descCharCount.set(event.description?.trim()?.length || 0);
    this.descWordCount.set(EventValidationUtils.countWords(event.description));
    this.locationCharCount.set(EventValidationUtils.countCharsNoSpaces(event.location));
    this.locationWordCount.set(EventValidationUtils.countWords(event.location));
    
    // Update max registration date
    if (eventDateFormatted) {
      this.maxRegistrationDateTime.set(eventDateFormatted);
    }
    
    // Clear uniqueness result (will re-check if name changes)
    this.nameUniquenessResult.set(null);
    
    // Legacy support
    this.newEvent = {
      name: event.name,
      description: event.description || '',
      eventDate: event.eventDate ? this.formatDatetimeForInput(event.eventDate) : '',
      location: event.location || '',
      maxParticipants: event.maxParticipants,
      totalPointsPool: event.totalPointsPool || 0,
      registrationEndDateUtc: event.registrationEndDateUtc ? this.formatDatetimeForInput(event.registrationEndDateUtc) : ''
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
    const now = new Date();
    const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16); // YYYY-MM-DDTHH:mm format for datetime-local
    
    // Reset reactive form
    if (this.eventForm) {
      this.eventForm.reset({
        name: '',
        description: '',
        eventDate: localDatetime,
        registrationEndDate: '',
        location: '',
        maxParticipants: null,
        totalPointsPool: null
      });
    }
    
    // Reset counters
    this.nameCharCount.set(0);
    this.nameWordCount.set(0);
    this.descCharCount.set(0);
    this.descWordCount.set(0);
    this.locationCharCount.set(0);
    this.locationWordCount.set(0);
    this.nameUniquenessResult.set(null);
    this.nameUniquenessChecking.set(false);
    this.updateMinDateTime();
    
    // Legacy support
    this.newEvent = {
      name: '',
      description: '',
      eventDate: localDatetime,
      location: '',
      maxParticipants: undefined,
      totalPointsPool: 0,
      registrationEndDateUtc: ''
    };
  }

  /**
   * Validate event form
   * 
   * Validation Rules:
   * - Name: at least 3 characters
   * - Description: at least 10 characters  
   * - Event date: required
   * - Registration end date: required, must be STRICTLY EARLIER than event start
   * - Points pool: at least 1
   */
  validateEventForm(): boolean {
    this.showErrorAlert = false;
    
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

    // Validate dates - Registration end must be STRICTLY EARLIER than event start
    // Same day is allowed as long as registration time < event time
    const eventDate = new Date(this.newEvent.eventDate);
    const regEndDate = new Date(this.newEvent.registrationEndDateUtc);
    if (regEndDate >= eventDate) {
      this.errorMessage = 'Registration deadline must be strictly earlier than event start time. Same day is allowed if times differ.';
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
    
    // Mark all fields as touched
    Object.keys(this.eventForm.controls).forEach(key => {
      this.eventForm.get(key)?.markAsTouched();
    });
    
    if (!this.canSubmitEventForm()) {
      this.cdr.markForCheck();
      return;
    }

    this.isSubmittingEvent = true;
    const formValue = this.eventForm.value;
    
    // Convert datetime-local format to ISO UTC
    const eventPayload: CreateEventRequest = {
      name: formValue.name,
      description: formValue.description,
      eventDate: parseInputDateTimeToUtcIso(formValue.eventDate),
      registrationEndDateUtc: parseInputDateTimeToUtcIso(formValue.registrationEndDate),
      location: formValue.location || '',
      maxParticipants: formValue.maxParticipants || undefined,
      totalPointsPool: formValue.totalPointsPool
    };
    
    this.eventService.createEvent(eventPayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          console.log('[EventMgmt] Event created:', event);
          this.isSubmittingEvent = false;
          this.closeEventModal();
          this.toastService.success('Event Created', `Event "${event.name}" created successfully!`);
          this.loadEvents();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('[EventMgmt] Error creating event:', error);
          this.isSubmittingEvent = false;
          
          // Extract validation error message from ProblemDetails or response
          const errorMsg = this.extractErrorMessage(error, 'Failed to create event');
          this.toastService.error('Error', errorMsg);
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Submit event update
   */
  submitEditEvent(): void {
    this.showErrorAlert = false;
    
    // Mark all fields as touched
    Object.keys(this.eventForm.controls).forEach(key => {
      this.eventForm.get(key)?.markAsTouched();
    });
    
    if (!this.canSubmitEventForm() || !this.editingEventId) {
      this.cdr.markForCheck();
      return;
    }

    this.isSubmittingEvent = true;
    
    const formValue = this.eventForm.value;
    
    // Convert datetime-local format to ISO UTC
    const updateRequest: UpdateEventRequest = {
      name: formValue.name,
      description: formValue.description,
      eventDate: parseInputDateTimeToUtcIso(formValue.eventDate),
      location: formValue.location || undefined,
      maxParticipants: formValue.maxParticipants || undefined,
      totalPointsPool: formValue.totalPointsPool,
      registrationEndDateUtc: parseInputDateTimeToUtcIso(formValue.registrationEndDate)
    };
    
    this.eventService.updateEvent(this.editingEventId, updateRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          console.log('[EventMgmt] Event updated:', event);
          this.isSubmittingEvent = false;
          this.closeEventModal();
          this.toastService.success('Event Updated', `Event "${event.name}" updated successfully!`);
          this.loadEvents();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('[EventMgmt] Error updating event:', error);
          this.isSubmittingEvent = false;
          
          // Extract validation error message from ProblemDetails or response
          const errorMsg = this.extractErrorMessage(error, 'Failed to update event');
          this.toastService.error('Error', errorMsg);
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Extract error message from HTTP error response.
   * Handles ProblemDetails format, message property, and generic errors.
   */
  private extractErrorMessage(error: any, fallbackMessage: string): string {
    if (!error) return fallbackMessage;
    
    const errorBody = error.error;
    
    // ProblemDetails format (RFC 7807)
    if (errorBody?.detail) {
      return errorBody.detail;
    }
    
    // Standard message property
    if (errorBody?.message) {
      return errorBody.message;
    }
    
    // Errors dictionary (validation errors)
    if (errorBody?.errors) {
      const errorMessages: string[] = [];
      for (const key of Object.keys(errorBody.errors)) {
        const fieldErrors = errorBody.errors[key];
        if (Array.isArray(fieldErrors)) {
          errorMessages.push(...fieldErrors);
        } else if (typeof fieldErrors === 'string') {
          errorMessages.push(fieldErrors);
        }
      }
      if (errorMessages.length > 0) {
        return errorMessages.join('. ');
      }
    }
    
    // Status text from HTTP response
    if (error.statusText && error.statusText !== 'OK') {
      return `${fallbackMessage}: ${error.statusText}`;
    }
    
    return fallbackMessage + '. Please try again.';
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
   * Format datetime with IST timezone for table display (12-hour AM/PM format)
   * Handles both "2026-02-02T10:00:00Z" and "2026-02-02T10:00:00" (assumes UTC)
   */
  formatDateTimeIst(dateStr: string): string {
    if (!dateStr) return '—';
    
    // Ensure the date string is treated as UTC
    let normalized = dateStr.trim();
    if (!normalized.endsWith('Z') && !normalized.includes('+') && !normalized.includes('-', 10)) {
      normalized = normalized + 'Z';
    }
    const date = new Date(normalized);
    
    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffset);
    
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    
    // Convert to 12-hour format with AM/PM
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hoursStr}:${minutes} ${ampm}`;
  }

  /**
   * Check if pool is fully distributed
   */
  isPoolFullyDistributed(event: Event): boolean {
    if (!event.totalPointsPool || event.totalPointsPool === 0) return false;
    return event.distributedPoints >= event.totalPointsPool;
  }

  /**
   * Get pool tooltip text
   */
  getPoolTooltip(event: Event): string {
    return this.isPoolFullyDistributed(event) 
      ? 'Fully distributed' 
      : 'Distribution pending';
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
