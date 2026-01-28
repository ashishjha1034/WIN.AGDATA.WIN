import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, catchError, map } from 'rxjs/operators';

// ECharts imports - tree-shaken
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

// Components
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { TableCardComponent } from './components/table-card/table-card.component';

// Services
import { AuthService } from '../../../services/auth.service';
import { DashboardService, DashboardStats, PendingRedemption, LowStockProduct } from '../../../services/dashboard.service';
import { RedemptionService } from '../../../services/redemption.service';
import { EventService } from '../../../services/event.service';
import { ProductsService } from '../../../services/products.service';

// Models
import { RedemptionStatus, RedemptionListResponse } from '../../../models/redemption.models';
import { Event, EventStatus } from '../../../models/event.models';

// Interfaces for dashboard data
interface KpiData {
  totalUsers: number;
  totalEvents: number;
  totalProducts: number;
  lowStockProducts: number;
  pendingRedemptions: number;
  liveEvents: number;
}

interface RedemptionStatusCounts {
  approved: number;
  pending: number;
  delivered: number;
  rejected: number;
  cancelled: number;
}

interface EventStatusCounts {
  upcoming: number;
  live: number;
  completed: number;
  cancelled: number;
}

interface LiveEventDisplay {
  id: string;
  name: string;
  awardedPercent: number;
  distributedPoints: number;
  totalPointsPool: number;
}

interface PendingRedemptionDisplay {
  id: string;
  userName: string;
  productName: string;
  requestDate: string;
  pointsSpent: number;
}

interface LowStockProductDisplay {
  id: string;
  name: string;
  category: string;
  stockCount: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxEchartsDirective,
    AdminSidebarComponent,
    KpiCardComponent,
    ChartCardComponent,
    TableCardComponent
  ],
  providers: [
    provideEcharts()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  currentUser: any;
  isLoading = true;
  errorMessage: string | null = null;

  // KPI Data
  kpiData: KpiData = {
    totalUsers: 0,
    totalEvents: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    pendingRedemptions: 0,
    liveEvents: 0
  };

  // Chart Data
  redemptionStatusCounts: RedemptionStatusCounts = {
    approved: 0,
    pending: 0,
    delivered: 0,
    rejected: 0,
    cancelled: 0
  };

  eventStatusCounts: EventStatusCounts = {
    upcoming: 0,
    live: 0,
    completed: 0,
    cancelled: 0
  };

  // Table Data
  pendingRedemptionsList: PendingRedemptionDisplay[] = [];
  lowStockProductsList: LowStockProductDisplay[] = [];
  liveEventsList: LiveEventDisplay[] = [];

  // ECharts options
  redemptionsChartOption: EChartsOption = {};
  eventsChartOption: EChartsOption = {};

  // Theme colors
  private readonly chartColors = {
    approved: '#2c5f3f',    // Green
    pending: '#f59e0b',     // Amber
    delivered: '#6b7280',   // Gray
    rejected: '#ef4444',    // Red
    upcoming: '#0891b2',    // Teal
    live: '#10b981',        // Emerald
    completed: '#94a3b8',   // Slate
    cancelled: '#dc2626'    // Red
  };

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private redemptionService: RedemptionService,
    private eventService: EventService,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.cdr.markForCheck();
      });

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Parallel data fetching with forkJoin
    forkJoin({
      stats: this.dashboardService.getStats().pipe(catchError(() => of(null))),
      redemptions: this.redemptionService.getAllRedemptions().pipe(catchError(() => of(null))),
      events: this.eventService.getEvents().pipe(catchError(() => of([]))),
      products: this.productsService.getAllProductsAdmin().pipe(catchError(() => of([]))),
      lowStock: this.dashboardService.getLowStockProducts().pipe(catchError(() => of([])))
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.processStats(data.stats);
          this.processRedemptions(data.redemptions);
          this.processEvents(data.events);
          this.processProducts(data.products, data.lowStock);
          
          this.updateCharts();
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('[Dashboard] Error loading data:', error);
          this.errorMessage = 'Failed to load dashboard data. Please try again.';
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  private processStats(stats: DashboardStats | null): void {
    if (stats) {
      this.kpiData.totalUsers = stats.totalUsers;
      this.kpiData.pendingRedemptions = stats.pendingRedemptions;
    }
  }

  private processRedemptions(redemptions: RedemptionListResponse | null): void {
    if (!redemptions) return;

    // Use counts from response if available
    if (redemptions.counts) {
      this.redemptionStatusCounts = {
        approved: redemptions.counts.approved || 0,
        pending: redemptions.counts.pending || 0,
        delivered: redemptions.counts.delivered || 0,
        rejected: redemptions.counts.rejected || 0,
        cancelled: redemptions.counts.cancelled || 0
      };
      this.kpiData.pendingRedemptions = this.redemptionStatusCounts.pending;
    }

    // Process pending redemptions for table
    const pendingItems = (redemptions.items || [])
      .filter(r => r.status === RedemptionStatus.Pending)
      .sort((a, b) => b.pointsSpent - a.pointsSpent)
      .slice(0, 10);

    this.pendingRedemptionsList = pendingItems.map(r => ({
      id: r.id,
      userName: r.userName || 'Unknown User',
      productName: r.productName || 'Unknown Product',
      requestDate: r.createdAt,
      pointsSpent: r.pointsSpent
    }));
  }

  private processEvents(events: Event[]): void {
    if (!events) return;

    // Count events by status
    const statusCounts = { upcoming: 0, live: 0, completed: 0, cancelled: 0 };
    
    events.forEach(event => {
      const status = this.mapEventStatus(event.status);
      if (status in statusCounts) {
        statusCounts[status as keyof typeof statusCounts]++;
      }
    });

    this.eventStatusCounts = statusCounts;
    this.kpiData.totalEvents = events.length;
    this.kpiData.liveEvents = statusCounts.live;

    // Process live events for table
    const liveEvents = events
      .filter(e => this.mapEventStatus(e.status) === 'live')
      .map(e => {
        const pool = e.totalPointsPool || 0;
        const distributed = e.distributedPoints || 0;
        const percent = pool > 0 ? Math.round((distributed / pool) * 100) : 0;
        return {
          id: e.id,
          name: e.name,
          awardedPercent: percent,
          distributedPoints: distributed,
          totalPointsPool: pool
        };
      })
      .sort((a, b) => a.awardedPercent - b.awardedPercent)
      .slice(0, 10);

    this.liveEventsList = liveEvents;
  }

  private processProducts(products: any[], lowStock: LowStockProduct[]): void {
    this.kpiData.totalProducts = products?.length || 0;
    
    // Low stock products (including out-of-stock with 0)
    this.lowStockProductsList = (lowStock || [])
      .map(p => ({
        id: p.id,
        name: p.name,
        category: p.category || 'Uncategorized',
        stockCount: p.currentStock ?? 0
      }))
      .sort((a, b) => a.stockCount - b.stockCount)
      .slice(0, 10);

    this.kpiData.lowStockProducts = this.lowStockProductsList.length;
  }

  private mapEventStatus(status: EventStatus | string): string {
    const statusMap: Record<string, string> = {
      'Draft': 'upcoming',
      'Upcoming': 'upcoming',
      'Active': 'live',
      'Live': 'live',
      'Completed': 'completed',
      'Cancelled': 'cancelled'
    };
    return statusMap[status] || 'upcoming';
  }

  private updateCharts(): void {
    this.updateRedemptionsChart();
    this.updateEventsChart();
  }

  private updateRedemptionsChart(): void {
    const { approved, pending, delivered, rejected } = this.redemptionStatusCounts;
    const total = approved + pending + delivered + rejected;

    const data = [
      { value: approved, name: 'Approved', itemStyle: { color: this.chartColors.approved } },
      { value: pending, name: 'Pending', itemStyle: { color: this.chartColors.pending } },
      { value: delivered, name: 'Delivered', itemStyle: { color: this.chartColors.delivered } },
      { value: rejected, name: 'Rejected', itemStyle: { color: this.chartColors.rejected } }
    ].filter(d => d.value > 0);

    this.redemptionsChartOption = {
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
          const item = data.find(d => d.name === name);
          const value = item?.value || 0;
          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
          return `${name} – ${value} (${percent}%)`;
        },
        textStyle: {
          fontSize: 12,
          color: '#4b5563'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: { show: false }
          },
          labelLine: { show: false },
          data: data
        }
      ]
    };
  }

  private updateEventsChart(): void {
    const { upcoming, live, completed, cancelled } = this.eventStatusCounts;
    const total = upcoming + live + completed + cancelled;

    const data = [
      { value: upcoming, name: 'Upcoming', itemStyle: { color: this.chartColors.upcoming } },
      { value: live, name: 'Live', itemStyle: { color: this.chartColors.live } },
      { value: completed, name: 'Completed', itemStyle: { color: this.chartColors.completed } },
      { value: cancelled, name: 'Cancelled', itemStyle: { color: this.chartColors.cancelled } }
    ].filter(d => d.value > 0);

    this.eventsChartOption = {
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
          const item = data.find(d => d.name === name);
          const value = item?.value || 0;
          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
          return `${name} – ${value} (${percent}%)`;
        },
        textStyle: {
          fontSize: 12,
          color: '#4b5563'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: { show: false }
          },
          labelLine: { show: false },
          data: data
        }
      ]
    };
  }

  formatDistributionLabel(event: LiveEventDisplay): string {
    if (event.totalPointsPool === 0) {
      return `${event.awardedPercent}% : Unlimited Pool`;
    }
    return `${event.awardedPercent}% : ${event.distributedPoints.toLocaleString()} of ${event.totalPointsPool.toLocaleString()}`;
  }

  getStockBadgeClass(count: number): string {
    if (count === 0) return 'stock-badge stock-badge--out';
    if (count < 5) return 'stock-badge stock-badge--critical';
    return 'stock-badge stock-badge--low';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
