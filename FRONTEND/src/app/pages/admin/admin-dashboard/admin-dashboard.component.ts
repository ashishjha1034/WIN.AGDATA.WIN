import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DashboardService, DashboardStats, PendingRedemption, RecentEvent, LowStockProduct, PointsChartData } from '../../../services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ChartConfiguration, Chart, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, AdminSidebarComponent]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('barChart') barChart?: BaseChartDirective;
  @ViewChild('doughnutChart') doughnutChart?: BaseChartDirective;

  currentUser: any;
  isLoading = true;
  errorMessage: string | null = null;

  // Dashboard data
  stats: DashboardStats = {
    totalUsers: 0,
    totalPointsEarned: 0,
    pointsRedeemed: 0,
    pendingRedemptions: 0
  };

  pendingRedemptions: PendingRedemption[] = [];
  recentEvents: RecentEvent[] = [];
  lowStockProducts: LowStockProduct[] = [];

  searchQuery = '';
  private destroy$ = new Subject<void>();

  // Chart.js Bar Chart Configuration
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 500 as any
          },
          color: '#666',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 12,
        displayColors: true,
        borderColor: '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
          display: true,
          drawTicks: true
        } as any,
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      }
    }
  };

  barChartLabels: string[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Points Earned',
        data: [],
        backgroundColor: '#2c5f3f',
        borderColor: '#1b4332',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: '#1b4332'
      },
      {
        label: 'Points Redeemed',
        data: [],
        backgroundColor: '#a8d5ba',
        borderColor: '#52b788',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: '#52b788'
      }
    ]
  };

  // Chart.js Doughnut Chart Configuration
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 },
          color: '#666',
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a: any, b: any) => (a as number) + (b as number), 0);
            const percentage = ((context.parsed as number) / (total as number) * 100).toFixed(1);
            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Approved', 'Pending', 'Delivered'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#2c5f3f', '#f59e0b', '#9ca3af'],
        borderColor: ['#1b4332', '#d97706', '#6b7280'],
        borderWidth: 2
      }
    ]
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Load all dashboard data
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    console.log('[Dashboard] Starting loadDashboardData');
    console.log('[Dashboard] Current auth token:', !!this.authService.getToken());

    // We only require the core 3 endpoints to display the dashboard: stats, pending redemptions, recent events.
    // Optional endpoints (low-stock, points-chart) load in background and do not block rendering.

    let coreCompleted = 0;
    const totalCore = 3;

    const markCoreComplete = () => {
      coreCompleted++;
      console.log(`[Dashboard] Core completed ${coreCompleted}/${totalCore}`);
      if (coreCompleted >= totalCore) {
        this.isLoading = false;
        console.log('[Dashboard] Core data loaded - UI will display now');
        // Force change detection in case this ran outside Angular zone
        try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
      }
    };

    // Stats (CORE)
    this.dashboardService.getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          console.log('[Dashboard] Stats loaded:', stats);
          this.stats = stats;
        },
        error: (error) => {
          console.error('[Dashboard] Error loading stats:', error);
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized: Please log in again';
            this.redirectToLogin();
          } else {
            this.errorMessage = 'Failed to load dashboard statistics';
          }
        },
        complete: markCoreComplete
      });

    // Pending Redemptions (CORE)
    this.dashboardService.getPendingRedemptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (redemptions) => {
          console.log('[Dashboard] Pending redemptions loaded:', redemptions);
          this.pendingRedemptions = redemptions;
          // Update doughnut chart for redemption status (Approved, Pending, Delivered)
          try {
            const approved = redemptions.filter(r => Number(r.status) === 1).length;
            const pending = redemptions.filter(r => Number(r.status) === 0).length;
            const delivered = redemptions.filter(r => Number(r.status) === 3).length;
            if (this.doughnutChartData.datasets && this.doughnutChartData.datasets[0]) {
              this.doughnutChartData.datasets[0].data = [approved, pending, delivered].map(n => Number(n));
            }
            console.log('[Dashboard] Updated doughnutChartData:', this.doughnutChartData);
            try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
            // Defer update to next macrotask to ensure canvas is ready
            setTimeout(() => {
              try { this.doughnutChart?.chart?.update(); } catch (e) { console.warn('doughnutChart update failed', e); }
            }, 0);
          } catch (e) {
            console.warn('Failed to compute redemption status chart data', e);
          }
        },
        error: (error) => {
          console.error('[Dashboard] Error loading pending redemptions:', error);
          if (error.status === 401) this.redirectToLogin();
          this.pendingRedemptions = [];
        },
        complete: markCoreComplete
      });

    // Recent Events (CORE)
    this.dashboardService.getRecentEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (events) => {
          console.log('[Dashboard] Recent events loaded:', events);
          this.recentEvents = events;
        },
        error: (error) => {
          console.error('[Dashboard] Error loading recent events:', error);
          if (error.status === 401) this.redirectToLogin();
          this.recentEvents = [];
        },
        complete: markCoreComplete
      });

    // Low stock products (OPTIONAL)
    this.dashboardService.getLowStockProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          console.log('[Dashboard] Low stock products loaded:', products);
          this.lowStockProducts = products;
        },
        error: (error) => {
          console.warn('[Dashboard] Low stock products failed (optional):', error);
          this.lowStockProducts = [];
        }
      });

    // Points chart data (OPTIONAL)
    this.dashboardService.getPointsChartData(6)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (chartData) => {
          console.log('[Dashboard] Points chart data loaded:', chartData);
          this.updateBarChartData(chartData);
        },
        error: (error) => {
          console.warn('[Dashboard] Points chart data failed (optional):', error);
        }
      });
  }

  // loadingCount/checkLoadingComplete removed — core requests determine visibility now

  private redirectToLogin(): void {
    console.warn('[Dashboard] Redirecting to login due to 401 error');
    // Will be handled by auth guard, but force logout
    localStorage.removeItem('agdata_token');
    localStorage.removeItem('agdata_refresh_token');
  }

  private updateBarChartData(chartData: PointsChartData): void {
    this.barChartLabels = (chartData.labels || []).map((l: any) => String(l));
    // Update the actual data object used by the template
    this.barChartData.labels = this.barChartLabels;
    if (this.barChartData.datasets) {
      this.barChartData.datasets[0].data = (chartData.earned || []).map((v: any) => Number(v));
      this.barChartData.datasets[1].data = (chartData.redeemed || []).map((v: any) => Number(v));
    }
    console.log('[Dashboard] Updated barChartData:', this.barChartData);
    try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
    // Defer update to next macrotask to ensure canvas is ready
    setTimeout(() => {
      try { this.barChart?.chart?.update(); } catch (e) { console.warn('barChart update failed', e); }
    }, 0);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    // Implement search functionality here
    console.log('Search query:', query);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
