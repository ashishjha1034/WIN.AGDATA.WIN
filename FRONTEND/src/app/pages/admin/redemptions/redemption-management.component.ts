import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { RedemptionService } from '../../../services/redemption.service';
import { AuthService } from '../../../services/auth.service';
import {
  Redemption,
  RedemptionDetail,
  RedemptionStatus,
  RedemptionListResponse
} from '../../../models/redemption.models';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-redemption-management',
  templateUrl: './redemption-management.component.html',
  styleUrls: ['./redemption-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent]
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

  // Status counts
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
  showFilterBar = false;
  showDetailsDrawer = false;

  // Filter State
  selectedStatus: RedemptionStatus | null = null;
  
  // Action notes
  actionNotes = '';

  // Error & Success States
  errorMessage = '';
  successMessage = '';
  showErrorAlert = false;
  showSuccessAlert = false;

  private destroy$ = new Subject<void>();

  constructor(
    private redemptionService: RedemptionService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[RedemptionManagement] Component initialized');
    console.log('[RedemptionManagement] Service apiUrl:', (this.redemptionService as any).apiUrl);
    
    this.loadCurrentUser();
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

          // Backend returns { items: [...], counts: {...} }
          this.redemptions = response.items;
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
        },
        error: (error) => {
          console.error('[RedemptionManagement] Error loading redemptions:', {
            error,
            status: error.status,
            message: error.message,
            errorObj: error.error
          });
          
          this.errorMessage = error.error?.message || error.message || 'Failed to load redemptions. Please check console for details.';
          this.showErrorAlert = true;
          this.redemptions = [];
          this.filteredRedemptions = [];
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.redemptions];

    // Search filter
    if (this.searchText && this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(r =>
        r.userName?.toLowerCase().includes(search) ||
        r.productName?.toLowerCase().includes(search) ||
        r.id?.toLowerCase().includes(search)
      );
    }

    this.filteredRedemptions = filtered;
    this.currentPage = 1;
    
    console.log('[RedemptionManagement] Filters applied:', {
      totalRedemptions: this.redemptions.length,
      filteredCount: this.filteredRedemptions.length,
      searchText: this.searchText
    });
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
    this.loadRedemptions();
  }

  toggleFilterBar(): void {
    this.showFilterBar = !this.showFilterBar;
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
    
    if (!this.actionNotes.trim()) {
      this.errorMessage = 'Rejection reason is required';
      this.showErrorAlert = true;
      return;
    }

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
        next: (response) => {
          console.log('[RedemptionManagement] Reject success:', response);
          this.successMessage = response.message;
          this.showSuccessAlert = true;
          this.closeDetails();
          this.loadRedemptions();
          setTimeout(() => this.showSuccessAlert = false, 5000);
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
