import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';
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

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent]
})
export class TransactionManagementComponent implements OnInit, OnDestroy {
  // Expose Math for template
  public Math = Math;

  // Data
  transactions: AdminTransaction[] = [];
  selectedTransaction: AdminTransaction | null = null;
  currentUser: any;
  chartData: MonthlyChartDataPoint[] = [];

  // Summary stats
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
  pageSizeOptions = [10, 20, 50, 100];

  // Filters
  filters: TransactionFilterRequest = {
    pageNumber: 1,
    pageSize: 20,
    sortBy: 'Timestamp',
    sortDescending: true
  };
  searchText = '';
  selectedType: string | null = null;
  selectedSource: string | null = null;
  selectedUserId: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  // Type filter options
  typeOptions = [
    { value: null, label: 'All Types' },
    { value: 'Earned', label: 'Earned' },
    { value: 'Redeemed', label: 'Redeemed' },
    { value: 'Adjusted', label: 'Adjusted' },
    { value: 'Refunded', label: 'Refunded' }
  ];

  // Source filter options
  sourceOptions = [
    { value: null, label: 'All Sources' },
    { value: 'Event', label: 'Event' },
    { value: 'Product', label: 'Product' },
    { value: 'Admin', label: 'Admin' },
    { value: 'System', label: 'System' }
  ];

  // Users for filter dropdown
  userOptions: UserOption[] = [];

  // UI State
  isLoading = false;
  isLoadingDetails = false;
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
      this.loadTransactions();
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadTransactions();
    this.loadChart();
    this.loadUsers();
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

  loadTransactions(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    // Update filter with current pagination
    this.filters.pageNumber = this.currentPage;
    this.filters.pageSize = this.pageSize;
    this.filters.type = this.selectedType || undefined;
    this.filters.source = this.selectedSource || undefined;
    this.filters.userId = this.selectedUserId || undefined;
    this.filters.startDate = this.startDate || undefined;
    this.filters.endDate = this.endDate || undefined;

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
          this.summary = response.summary;
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.errorMessage = error.message || 'Failed to load transactions';
          this.showErrorAlert = true;
        }
      });
  }

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
        },
        error: (error) => {
          console.error('Error loading chart:', error);
        }
      });
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
    this.loadTransactions();
  }

  // Filter handlers
  onTypeFilterChange(): void {
    this.currentPage = 1;
    this.loadTransactions();
  }

  onSourceFilterChange(): void {
    this.currentPage = 1;
    this.loadTransactions();
  }

  onUserFilterChange(): void {
    this.currentPage = 1;
    this.loadTransactions();
  }

  onDateFilterChange(): void {
    this.currentPage = 1;
    this.loadTransactions();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedType = null;
    this.selectedSource = null;
    this.selectedUserId = null;
    this.startDate = null;
    this.endDate = null;
    this.filters = {
      pageNumber: 1,
      pageSize: this.pageSize,
      sortBy: 'Timestamp',
      sortDescending: true
    };
    this.currentPage = 1;
    this.loadTransactions();
  }

  get hasFiltersApplied(): boolean {
    return !!(this.searchText || this.selectedType || this.selectedSource ||
              this.selectedUserId || this.startDate || this.endDate);
  }

  toggleFiltersPanel(): void {
    this.showFiltersPanel = !this.showFiltersPanel;
  }

  // Pagination
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTransactions();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadTransactions();
  }

  get showingFrom(): number {
    if (this.totalCount === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push('...');
      }
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      if (current < total - 2) {
        pages.push('...');
      }
      if (!pages.includes(total)) {
        pages.push(total);
      }
    }

    return pages;
  }

  // Sorting
  sortBy(column: string): void {
    if (this.filters.sortBy === column) {
      this.filters.sortDescending = !this.filters.sortDescending;
    } else {
      this.filters.sortBy = column;
      this.filters.sortDescending = true;
    }
    this.loadTransactions();
  }

  getSortIcon(column: string): string {
    if (this.filters.sortBy !== column) return '↕️';
    return this.filters.sortDescending ? '↓' : '↑';
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
          this.loadTransactions();
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

  // Refresh
  refreshData(): void {
    this.loadTransactions();
    this.loadChart();
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
  getTypeLabel(type: string): string {
    return this.transactionsService.getTypeLabel(type);
  }

  getTypeClass(type: string): string {
    return this.transactionsService.getTypeClass(type);
  }

  getSourceIcon(source: string): string {
    return this.transactionsService.getSourceIcon(source);
  }

  getSourceClass(source: string): string {
    return this.transactionsService.getSourceClass(source);
  }

  formatPoints(points: number): string {
    return this.transactionsService.formatPoints(points);
  }

  getPointsClass(points: number): string {
    return points >= 0 ? 'points-positive' : 'points-negative';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
    return transaction.balanceAfter - transaction.amount;
  }

  // Chart helpers
  getChartMaxValue(): number {
    if (!this.chartData.length) return 100;
    const max = Math.max(
      ...this.chartData.map(d => Math.max(d.pointsEarned, d.pointsRedeemed))
    );
    return Math.ceil(max * 1.1); // Add 10% padding
  }

  getBarHeight(value: number): number {
    const max = this.getChartMaxValue();
    return max > 0 ? (value / max) * 100 : 0;
  }
}
