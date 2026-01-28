import { Component, OnInit, OnDestroy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

// Register ECharts components
echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

import { RedemptionService } from '../../../services/redemption.service';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';
import {
  Redemption,
  RedemptionDetail,
  RedemptionStatus,
  RedemptionListResponse
} from '../../../models/redemption.models';
import { ProductCategory } from '../../../models/product.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

// Interface for product redemption aggregation
interface ProductRedemptionCount {
  productId: string;
  productName: string;
  category: string;
  categoryId: string;
  count: number;
}

@Component({
  selector: 'app-redemption-management',
  templateUrl: './redemption-management.component.html',
  styleUrls: ['./redemption-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, NgxEchartsDirective],
  providers: [
    provideEchartsCore({ echarts })
  ]
})
export class RedemptionManagementComponent implements OnInit, OnDestroy {
  // Expose enums and Math for template
  public RedemptionStatus = RedemptionStatus;
  public Math = Math;

  // Data
  redemptions: Redemption[] = [];
  filteredRedemptions: Redemption[] = [];
  selectedRedemption: RedemptionDetail | null = null;
  currentUser: any;
  categories: ProductCategory[] = [];

  // Status counts for charts
  statusCounts = {
    pending: 0,
    approved: 0,
    delivered: 0,
    rejected: 0
  };

  // UI State
  isLoading = false;
  isLoadingDetails = false;
  isSubmitting = false;
  searchText = '';
  currentPage = 1;
  pageSize = 10;
  showFilters = false;
  showDetailsDrawer = false;

  // Filter State
  selectedStatus: RedemptionStatus | null = null;
  selectedStatusFilter: string = '';
  sortField: string = 'date';
  sortOrder: 'asc' | 'desc' = 'desc';
  
  // Chart state
  selectedChartCategory = 'all';
  redemptionStatusChartOption: EChartsOption = {};
  topProductsChartOption: EChartsOption = {};
  
  // Signals for reactive chart data
  private redemptionsSignal = signal<Redemption[]>([]);
  private selectedCategorySignal = signal<string>('all');
  
  // Computed product redemption counts
  topProductsChartData = computed(() => {
    const redemptions = this.redemptionsSignal();
    const selectedCategory = this.selectedCategorySignal();
    
    // Aggregate redemptions by product
    const productCounts = new Map<string, ProductRedemptionCount>();
    
    redemptions.forEach(r => {
      // Skip if filtering by category and doesn't match
      if (selectedCategory !== 'all') {
        const matchingCategory = this.categories.find(c => c.id === selectedCategory);
        if (matchingCategory && r.productCategory !== matchingCategory.name) {
          return;
        }
      }
      
      const existing = productCounts.get(r.productId);
      if (existing) {
        existing.count += r.quantity;
      } else {
        productCounts.set(r.productId, {
          productId: r.productId,
          productName: r.productName,
          category: r.productCategory,
          categoryId: '', // We don't have this in redemption data
          count: r.quantity
        });
      }
    });
    
    // Sort by count and take top 5
    return Array.from(productCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  // Chart colors
  private readonly chartColors = {
    approved: '#2c5f3f',
    pending: '#f59e0b',
    delivered: '#6b7280',
    rejected: '#ef4444'
  };
  
  // Action notes
  actionNotes = '';
  showReasonWarning = false;

  // Error & Success States
  errorMessage = '';
  successMessage = '';
  showErrorAlert = false;
  showSuccessAlert = false;

  private destroy$ = new Subject<void>();

  constructor(
    private redemptionService: RedemptionService,
    private productsService: ProductsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[RedemptionManagement] Component initialized');
    
    this.loadCurrentUser();
    this.loadCategories();
    this.loadRedemptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCurrentUser(): void {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      console.log('[RedemptionManagement] Current user loaded:', user);
      this.currentUser = user;
    });
  }

  loadCategories(): void {
    this.productsService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log('[RedemptionManagement] Categories loaded:', categories.length);
        },
        error: (error) => {
          console.error('[RedemptionManagement] Error loading categories:', error);
        }
      });
  }

  loadRedemptions(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    console.log('[RedemptionManagement] Loading redemptions with status:', this.selectedStatus);

    this.redemptionService.getAllRedemptions(this.selectedStatus ?? undefined)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response: RedemptionListResponse) => {
          console.log('[RedemptionManagement] Received response:', response);
          
          if (!response || !response.items) {
            console.error('[RedemptionManagement] Invalid response structure:', response);
            this.errorMessage = 'Invalid response from server';
            this.showErrorAlert = true;
            return;
          }

          this.redemptions = response.items;
          this.redemptionsSignal.set(response.items);
          
          this.statusCounts = {
            pending: response.counts?.pending || 0,
            approved: response.counts?.approved || 0,
            delivered: response.counts?.delivered || 0,
            rejected: response.counts?.rejected || 0
          };
          
          console.log('[RedemptionManagement] Loaded redemptions:', {
            total: this.redemptions.length,
            statusCounts: this.statusCounts
          });
          
          this.applyFilters();
          this.updateCharts();
        },
        error: (error) => {
          console.error('[RedemptionManagement] Error loading redemptions:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to load redemptions.';
          this.showErrorAlert = true;
          this.redemptions = [];
          this.filteredRedemptions = [];
        }
      });
  }

  // Chart methods
  hasRedemptionStatusData(): boolean {
    const { approved, pending, delivered, rejected } = this.statusCounts;
    return (approved + pending + delivered + rejected) > 0;
  }

  updateCharts(): void {
    this.updateRedemptionStatusChart();
    this.updateTopProductsChart();
  }

  updateRedemptionStatusChart(): void {
    const { approved, pending, delivered, rejected } = this.statusCounts;
    const total = approved + pending + delivered + rejected;

    const data = [
      { value: approved, name: 'Approved', itemStyle: { color: this.chartColors.approved } },
      { value: pending, name: 'Pending', itemStyle: { color: this.chartColors.pending } },
      { value: delivered, name: 'Delivered', itemStyle: { color: this.chartColors.delivered } },
      { value: rejected, name: 'Rejected', itemStyle: { color: this.chartColors.rejected } }
    ].filter(d => d.value > 0);

    this.redemptionStatusChartOption = {
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
          return `${name}: ${value} (${percent}%)`;
        },
        textStyle: {
          fontSize: 12,
          color: '#6b7280'
        }
      },
      series: [
        {
          name: 'Redemption Status',
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
          data: data
        }
      ]
    };
  }

  updateTopProductsChart(): void {
    const topProducts = this.topProductsChartData();
    
    if (topProducts.length === 0) {
      this.topProductsChartOption = {};
      return;
    }

    // Reverse for horizontal bar chart (bottom to top)
    const reversed = [...topProducts].reverse();
    const productNames = reversed.map(p => p.productName.length > 20 ? p.productName.substring(0, 20) + '...' : p.productName);
    const counts = reversed.map(p => p.count);
    const maxCount = Math.max(...counts);

    this.topProductsChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const data = reversed[params[0].dataIndex];
          return `<strong>${data.productName}</strong><br/>
                  Category: ${data.category}<br/>
                  Redemptions: ${data.count}`;
        }
      },
      grid: {
        left: '3%',
        right: '15%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: maxCount * 1.2,
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: productNames,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 12,
          color: '#374151',
          width: 120,
          overflow: 'truncate'
        }
      },
      series: [
        {
          type: 'bar',
          data: counts,
          barWidth: '60%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#2c5f3f' },
              { offset: 1, color: '#4ade80' }
            ]),
            borderRadius: [0, 4, 4, 0]
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            fontSize: 12,
            fontWeight: 600,
            color: '#374151'
          }
        }
      ]
    };
  }

  onChartCategoryChange(): void {
    this.selectedCategorySignal.set(this.selectedChartCategory);
    this.updateTopProductsChart();
  }

  // Toggle filters panel
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    let filtered = [...this.redemptions];

    // Search filter
    if (this.searchText && this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(r =>
        r.userName?.toLowerCase().includes(search) ||
        r.productName?.toLowerCase().includes(search) ||
        r.id?.toLowerCase().includes(search) ||
        r.userId?.toLowerCase().includes(search) ||
        r.productId?.toLowerCase().includes(search) ||
        r.userEmail?.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    filtered = this.applySorting(filtered);

    this.filteredRedemptions = filtered;
    this.currentPage = 1;
    
    console.log('[RedemptionManagement] Filters applied:', {
      totalRedemptions: this.redemptions.length,
      filteredCount: this.filteredRedemptions.length,
      searchText: this.searchText,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    });
  }

  applySorting(redemptions: Redemption[]): Redemption[] {
    const sorted = [...redemptions];
    const multiplier = this.sortOrder === 'desc' ? -1 : 1;
    
    switch (this.sortField) {
      case 'date':
        return sorted.sort((a, b) => multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      case 'points':
        return sorted.sort((a, b) => multiplier * (a.pointsSpent - b.pointsSpent));
      case 'quantity':
        return sorted.sort((a, b) => multiplier * (a.quantity - b.quantity));
      default:
        return sorted;
    }
  }

  onSearch(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  filterByStatus(status: RedemptionStatus | null): void {
    this.selectedStatus = status;
    this.selectedStatusFilter = status !== null ? status.toString() : '';
    this.loadRedemptions();
  }

  onStatusFilterChange(): void {
    if (this.selectedStatusFilter === '') {
      this.selectedStatus = null;
    } else {
      this.selectedStatus = parseInt(this.selectedStatusFilter) as RedemptionStatus;
    }
    this.loadRedemptions();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedStatus = null;
    this.selectedStatusFilter = '';
    this.sortField = 'date';
    this.sortOrder = 'desc';
    this.loadRedemptions();
  }

  refreshData(): void {
    this.loadRedemptions();
  }

  // Pagination
  get paginatedRedemptions(): Redemption[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredRedemptions.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRedemptions.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Drawer actions
  openDetails(redemption: Redemption): void {
    console.log('[RedemptionManagement] Opening details for:', redemption.id);
    
    this.isLoadingDetails = true;
    this.showDetailsDrawer = true;
    this.actionNotes = '';
    this.errorMessage = '';
    this.showErrorAlert = false;

    this.redemptionService.getRedemptionDetails(redemption.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoadingDetails = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (details) => {
          console.log('[RedemptionManagement] Received details:', details);
          
          if (!details) {
            console.error('[RedemptionManagement] Empty details response');
            this.errorMessage = 'Invalid details response from server';
            this.showErrorAlert = true;
            this.showDetailsDrawer = false;
            return;
          }
          
          this.selectedRedemption = details;
        },
        error: (error) => {
          console.error('[RedemptionManagement] Error loading details:', {
            error,
            status: error.status,
            message: error.message,
            errorObj: error.error
          });
          
          this.errorMessage = error.error?.message || error.message || 'Failed to load redemption details. Please check console.';
          this.showErrorAlert = true;
          this.showDetailsDrawer = false;
        }
      });
  }

  closeDetails(): void {
    this.showDetailsDrawer = false;
    this.selectedRedemption = null;
    this.actionNotes = '';
    this.showReasonWarning = false;
  }

  // Clear warning when user starts typing
  onNotesInput(): void {
    if (this.actionNotes.trim()) {
      this.showReasonWarning = false;
    }
  }

  // Action handlers
  approveRedemption(): void {
    if (!this.selectedRedemption || !this.currentUser) {
      console.warn('[RedemptionManagement] Cannot approve: missing redemption or user');
      return;
    }

    console.log('[RedemptionManagement] Approving redemption:', this.selectedRedemption.id);
    
    this.isSubmitting = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    this.redemptionService.approveRedemption(this.selectedRedemption.id, {
      approvedBy: this.currentUser.id,
      notes: this.actionNotes || undefined
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('[RedemptionManagement] Approve success:', response);
          this.successMessage = response.message;
          this.showSuccessAlert = true;
          this.closeDetails();
          this.loadRedemptions();
          setTimeout(() => this.showSuccessAlert = false, 5000);
        },
        error: (error) => {
          console.error('[RedemptionManagement] Approve error:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to approve redemption';
          this.showErrorAlert = true;
        }
      });
  }

  rejectRedemption(): void {
    if (!this.selectedRedemption || !this.currentUser) {
      console.warn('[RedemptionManagement] Cannot reject: missing redemption or user');
      return;
    }
    
    // Validate rejection reason
    if (!this.actionNotes.trim()) {
      this.showReasonWarning = true;
      this.cdr.detectChanges();
      // Focus the textarea
      setTimeout(() => {
        const textarea = document.querySelector('.notes-textarea') as HTMLTextAreaElement;
        if (textarea) textarea.focus();
      }, 100);
      return;
    }

    this.showReasonWarning = false;
    console.log('[RedemptionManagement] Rejecting redemption:', this.selectedRedemption.id);
    
    this.isSubmitting = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    this.redemptionService.rejectRedemption(this.selectedRedemption.id, {
      rejectedBy: this.currentUser.id,
      reason: this.actionNotes
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('[RedemptionManagement] Reject success:', response);
          
          // Build detailed success message
          let message = response.message || 'Redemption rejected successfully.';
          const details: string[] = [];
          
          if (response.pointsRefunded && response.pointsRefunded > 0) {
            details.push(`${response.pointsRefunded.toLocaleString()} points refunded to user`);
          }
          if (response.quantityRestored && response.quantityRestored > 0) {
            details.push(`${response.quantityRestored} item(s) restored to inventory`);
          }
          
          if (details.length > 0) {
            message = `${message} ${details.join('. ')}.`;
          }
          
          this.successMessage = message;
          this.showSuccessAlert = true;
          this.closeDetails();
          this.loadRedemptions();
          setTimeout(() => this.showSuccessAlert = false, 8000); // Longer display for detailed message
        },
        error: (error) => {
          console.error('[RedemptionManagement] Reject error:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to reject redemption';
          this.showErrorAlert = true;
        }
      });
  }

  markAsDelivered(): void {
    if (!this.selectedRedemption || !this.currentUser) {
      console.warn('[RedemptionManagement] Cannot deliver: missing redemption or user');
      return;
    }

    console.log('[RedemptionManagement] Marking as delivered:', this.selectedRedemption.id);
    
    this.isSubmitting = true;
    this.errorMessage = '';
    this.showErrorAlert = false;

    this.redemptionService.markAsDelivered(this.selectedRedemption.id, {
      deliveredBy: this.currentUser.id,
      notes: this.actionNotes || undefined
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          console.log('[RedemptionManagement] Deliver success:', response);
          this.successMessage = response.message;
          this.showSuccessAlert = true;
          this.closeDetails();
          this.loadRedemptions();
          setTimeout(() => this.showSuccessAlert = false, 5000);
        },
        error: (error) => {
          console.error('[RedemptionManagement] Deliver error:', error);
          this.errorMessage = error.error?.message || error.message || 'Failed to mark as delivered';
          this.showErrorAlert = true;
        }
      });
  }

  // Utility methods
  getStatusLabel(status: RedemptionStatus): string {
    return this.redemptionService.getStatusLabel(status);
  }

  getStatusClass(status: RedemptionStatus): string {
    return this.redemptionService.getStatusClass(status);
  }

  canApprove(status: RedemptionStatus): boolean {
    return status === RedemptionStatus.Pending;
  }

  canReject(status: RedemptionStatus): boolean {
    return status === RedemptionStatus.Pending;
  }

  canDeliver(status: RedemptionStatus): boolean {
    return status === RedemptionStatus.Approved;
  }

  formatDate(date: string): string {
    const now = new Date();
    const redemptionDate = new Date(date);
    const diffMs = now.getTime() - redemptionDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return redemptionDate.toLocaleDateString();
  }

  formatDateTime(date: string): string {
    return new Date(date).toLocaleString();
  }

  getUserInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  closeAlert(type: 'error' | 'success'): void {
    if (type === 'error') {
      this.showErrorAlert = false;
    } else {
      this.showSuccessAlert = false;
    }
  }
}
