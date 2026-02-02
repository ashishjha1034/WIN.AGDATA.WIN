import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AdminTransactionsService } from '../../../services/admin-transactions.service';
import { AdminUsersService } from '../../../services/admin-users.service';
import { AuthService } from '../../../services/auth.service';
import {
  AdminTransaction,
  TransactionFilterRequest,
  PagedTransactionResponse,
  TransactionSummary,
  MonthlyChartDataPoint,
  AdjustPointsRequest,
  UserOption
} from '../../../models/admin-transaction.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { utcToIst } from '../../../shared/utils/ist-timezone.utils';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsModule, PaginationComponent],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ]
})
export class TransactionManagementComponent implements OnInit, OnDestroy {
  // Expose Math for template
  public Math = Math;

  // Data
  transactions: AdminTransaction[] = [];
  selectedTransaction: AdminTransaction | null = null;
  currentUser: any;
  chartData: MonthlyChartDataPoint[] = [];
  chartOptions: EChartsOption = {};

  // Summary stats (from backend, not computed)
  summary: TransactionSummary = {
    totalEarned: 0,
    totalRedeemed: 0,
    totalAdjusted: 0,
    transactionCount: 0,
    netPoints: 0
  };

  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;
  totalPages = 0;

  // Unified filter state - drives KPIs, Chart, and Table together
  filters: TransactionFilterRequest = {
    pageNumber: 1,
    pageSize: 20,
    sortBy: 'Timestamp',
    sortDescending: true
  };
  searchText = '';
  selectedType: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  datePreset: string | null = null;

  // Type filter options
  typeOptions = [
    { value: null, label: 'All Types' },
    { value: 'Earned', label: 'Earned' },
    { value: 'Redeemed', label: 'Redeemed' },
    { value: 'Adjusted', label: 'Adjusted' },
    { value: 'Refunded', label: 'Refunded' }
  ];

  // Users for filter dropdown
  userOptions: UserOption[] = [];

  // UI State
  isLoading = false;
  isLoadingChart = false;
  isExporting = false;
  isSubmitting = false;
  showFiltersPanel = false;
  showDetailsDrawer = false;
  showAdjustPointsModal = false;
  showChart = true;

  // Adjust Points form
  adjustPointsForm = {
    userId: '',
    userName: '',
    amount: 0,
    reason: ''
  };

  // Error & Success States
  errorMessage = '';
  successMessage = '';
  showErrorAlert = false;
  showSuccessAlert = false;

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private transactionsService: AdminTransactionsService,
    private usersService: AdminUsersService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(400),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.filters.searchQuery = query;
      this.loadAllData(); // Reload all data with new filter
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadAllData();
    this.loadUsers();
    // Load chart data ONCE without filters - chart should not change with filters
    this.loadChart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCurrentUser(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  /**
   * Load all data (transactions, summary, chart) with the same filter state
   * This ensures KPIs, Chart, and Table are always in sync
   */
  loadAllData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    // Build unified filter
    this.buildFilters();

    // Load transactions (includes summary in response)
    this.transactionsService.getAllTransactions(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response: PagedTransactionResponse) => {
          this.transactions = response.data;
          this.totalCount = response.pagination.totalCount;
          this.totalPages = response.pagination.totalPages;
          this.summary = response.summary; // KPIs from backend
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.errorMessage = error.message || 'Failed to load transactions';
          this.showErrorAlert = true;
        }
      });

    // Chart is loaded once on init and does NOT change with filters
  }

  /**
   * Build filter object from current UI state
   */
  private buildFilters(): void {
    this.filters.pageNumber = this.currentPage;
    this.filters.pageSize = this.pageSize;
    this.filters.type = this.selectedType || undefined;
    this.filters.startDate = this.startDate || undefined;
    this.filters.endDate = this.endDate || undefined;
  }

  /**
   * Load chart data ONCE (without filters) - chart shows overall trends
   */
  loadChart(): void {
    this.isLoadingChart = true;

    this.transactionsService.getPointsChart(6)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoadingChart = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.chartData = response.data;
          this.buildChartOptions();
        },
        error: (error) => {
          console.error('Error loading chart:', error);
        }
      });
  }

  /**
   * Load chart data with the same filters as table/KPIs (DEPRECATED - kept for reference)
   */
  loadFilteredChart(): void {
    // Now using loadChart() instead - chart should NOT change with filters
    this.loadChart();
  }

  /**
   * Build ECharts options for Monthly Points Trend chart
   * Grouped bars for Earned & Redeemed + thin line for Net
   */
  buildChartOptions(): void {
    const months = this.chartData.map(d => d.monthName?.substring(0, 3) || '');
    const earnedData = this.chartData.map(d => d.pointsEarned);
    const redeemedData = this.chartData.map(d => d.pointsRedeemed);
    const netData = this.chartData.map(d => d.netPoints);

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        formatter: (params: any) => {
          let result = `<strong>${params[0].axisValue}</strong><br/>`;
          params.forEach((item: any) => {
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>`;
            result += `${marker}${item.seriesName}: ${item.value?.toLocaleString()}<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['Earned', 'Redeemed', 'Net Points'],
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#6b7280'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          color: '#6b7280',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#e5e7eb'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6b7280',
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'k';
            }
            return value.toString();
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6'
          }
        }
      },
      series: [
        {
          name: 'Earned',
          type: 'bar',
          barWidth: '25%',
          data: earnedData,
          itemStyle: {
            color: '#16a34a',
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: 'Redeemed',
          type: 'bar',
          barWidth: '25%',
          data: redeemedData,
          itemStyle: {
            color: '#dc2626',
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: 'Net Points',
          type: 'line',
          data: netData,
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#2c5f3f'
          },
          itemStyle: {
            color: '#2c5f3f'
          },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };
  }

  loadUsers(): void {
    this.usersService.getAllUsers(false)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.userOptions = (response.users || []).map((u: any) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            employeeId: u.employeeId
          }));
        },
        error: (error) => {
          console.error('Error loading users:', error);
        }
      });
  }

  // Search handling
  onSearchInput(): void {
    this.searchSubject.next(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.filters.searchQuery = '';
    this.loadAllData();
  }

  // Filter handlers - all reload everything to keep in sync
  onTypeFilterChange(): void {
    this.currentPage = 1;
    this.loadAllData();
  }

  onDateFilterChange(): void {
    this.datePreset = null; // Clear preset when manual dates change
    this.currentPage = 1;
    this.loadAllData();
  }

  setDatePreset(preset: string): void {
    const today = new Date();
    let start: Date;

    if (preset === 'last15') {
      start = new Date(today);
      start.setDate(today.getDate() - 15);
    } else if (preset === 'last30') {
      start = new Date(today);
      start.setDate(today.getDate() - 30);
    } else {
      return;
    }

    this.datePreset = preset;
    this.startDate = start.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
    this.currentPage = 1;
    this.loadAllData();
  }

  onSortChange(): void {
    this.loadAllData();
  }

  setSortOrder(descending: boolean): void {
    this.filters.sortDescending = descending;
    this.loadAllData();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedType = null;
    this.startDate = null;
    this.endDate = null;
    this.datePreset = null;
    this.filters = {
      pageNumber: 1,
      pageSize: this.pageSize,
      sortBy: 'Timestamp',
      sortDescending: true
    };
    this.currentPage = 1;
    this.loadAllData();
  }

  get hasFiltersApplied(): boolean {
    return !!(this.searchText || this.selectedType || this.startDate || this.endDate);
  }

  toggleFiltersPanel(): void {
    this.showFiltersPanel = !this.showFiltersPanel;
  }

  // Pagination
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAllData();
    }
  }

  // Details drawer
  openDetails(transaction: AdminTransaction): void {
    this.selectedTransaction = transaction;
    this.showDetailsDrawer = true;
  }

  closeDetails(): void {
    this.showDetailsDrawer = false;
    this.selectedTransaction = null;
  }

  // Adjust Points Modal
  openAdjustPointsModal(transaction?: AdminTransaction): void {
    if (transaction) {
      this.adjustPointsForm = {
        userId: transaction.userId,
        userName: transaction.userName,
        amount: 0,
        reason: ''
      };
    } else {
      this.adjustPointsForm = {
        userId: '',
        userName: '',
        amount: 0,
        reason: ''
      };
    }
    this.showAdjustPointsModal = true;
  }

  closeAdjustPointsModal(): void {
    this.showAdjustPointsModal = false;
    this.adjustPointsForm = {
      userId: '',
      userName: '',
      amount: 0,
      reason: ''
    };
  }

  onAdjustUserChange(): void {
    const selectedUser = this.userOptions.find(u => u.id === this.adjustPointsForm.userId);
    if (selectedUser) {
      this.adjustPointsForm.userName = selectedUser.name;
    }
  }

  submitAdjustPoints(): void {
    if (!this.adjustPointsForm.userId || !this.adjustPointsForm.reason.trim()) {
      this.errorMessage = 'Please select a user and provide a reason';
      this.showErrorAlert = true;
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    const request: AdjustPointsRequest = {
      userId: this.adjustPointsForm.userId,
      amount: this.adjustPointsForm.amount,
      reason: this.adjustPointsForm.reason
    };

    this.transactionsService.adjustPoints(request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.showSuccessAlert = true;
          this.closeAdjustPointsModal();
          this.loadAllData(); // Refresh all data
          setTimeout(() => this.showSuccessAlert = false, 5000);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to adjust points';
          this.showErrorAlert = true;
        }
      });
  }

  // Export
  exportTransactions(): void {
    this.isExporting = true;

    this.transactionsService.exportTransactions(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isExporting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (blob) => {
          this.transactionsService.downloadCsv(blob);
          this.successMessage = 'Export downloaded successfully';
          this.showSuccessAlert = true;
          setTimeout(() => this.showSuccessAlert = false, 3000);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to export transactions';
          this.showErrorAlert = true;
        }
      });
  }

  // Toggle chart visibility
  toggleChart(): void {
    this.showChart = !this.showChart;
  }

  // Alert handling
  closeAlert(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.showSuccessAlert = false;
    } else {
      this.showErrorAlert = false;
    }
  }

  // Utility methods
  formatDateTime(dateString: string): string {
    if (!dateString) return '';
    // Convert UTC to IST for display
    const istDate = utcToIst(dateString);
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month} ${day}, ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }

  getUserInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  getBalanceBefore(transaction: AdminTransaction): number {
    // Calculate balance before based on transaction type
    // Points are stored as positive values in the database
    const type = transaction.type?.toLowerCase();
    if (type === 'redeemed') {
      // For redeemed, balance before was higher (add back the points)
      return transaction.balanceAfter + Math.abs(transaction.amount);
    }
    // For earned/refunded, balance before was lower (subtract the points)
    return transaction.balanceAfter - Math.abs(transaction.amount);
  }
}
