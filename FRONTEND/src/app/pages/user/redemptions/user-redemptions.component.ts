import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserRedemption, RedemptionStatusCounts } from '../../../services/user-dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { UserPageHeaderComponent } from '../../../components/user-page-header/user-page-header.component';

interface StatusTab {
  key: 'pending' | 'approved' | 'delivered' | 'rejected';
  label: string;
  count: number;
  statusCode: number;
}

@Component({
  selector: 'app-user-redemptions',
  templateUrl: './user-redemptions.component.html',
  styleUrls: ['./user-redemptions.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, PaginationComponent, UserPageHeaderComponent]
})
export class UserRedemptionsComponent implements OnInit, OnDestroy {
  currentUser: any;
  redemptions: UserRedemption[] = [];
  filteredRedemptions: UserRedemption[] = [];
  isLoading = true;
  userPoints = 0;
  
  // Status tabs
  statusTabs: StatusTab[] = [
    { key: 'pending', label: 'Pending', count: 0, statusCode: 0 },
    { key: 'approved', label: 'Approved', count: 0, statusCode: 1 },
    { key: 'delivered', label: 'Delivered', count: 0, statusCode: 3 },
    { key: 'rejected', label: 'Rejected', count: 0, statusCode: 2 }
  ];
  activeTab: 'pending' | 'approved' | 'delivered' | 'rejected' = 'pending';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Subscribe to query params for URL-driven filtering
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['status']) {
          const statusParam = params['status'].toLowerCase();
          const validStatuses: ('pending' | 'approved' | 'delivered' | 'rejected')[] = ['pending', 'approved', 'delivered', 'rejected'];
          if (validStatuses.includes(statusParam as any)) {
            this.activeTab = statusParam as 'pending' | 'approved' | 'delivered' | 'rejected';
            // Re-apply filter if data is already loaded
            if (this.redemptions.length > 0) {
              this.filterByStatus();
            }
          }
        }
      });

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadData();
        }
      });
  }

  loadData(): void {
    this.isLoading = true;
    
    // Load user points
    this.userDashboardService.getUserPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (points) => {
          this.userPoints = points;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error loading user points:', error)
      });

    // Load redemptions
    this.userDashboardService.getRedemptions()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (redemptions) => {
          this.redemptions = redemptions;
          this.calculateStatusCounts();
          this.filterRedemptionsByTab();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading redemptions:', error);
        }
      });
  }

  calculateStatusCounts(): void {
    // Reset counts
    this.statusTabs.forEach(tab => tab.count = 0);
    
    // Calculate counts from redemptions
    this.redemptions.forEach(r => {
      const tab = this.statusTabs.find(t => t.statusCode === r.statusCode);
      if (tab) {
        tab.count++;
      }
    });
  }

  selectTab(tabKey: 'pending' | 'approved' | 'delivered' | 'rejected'): void {
    this.activeTab = tabKey;
    this.filterRedemptionsByTab();
    
    // Update URL with status filter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: tabKey },
      queryParamsHandling: 'merge'
    });
  }

  filterByStatus(): void {
    // Re-apply tab filter (used when URL params update after data load)
    this.filterRedemptionsByTab();
  }

  filterRedemptionsByTab(): void {
    const activeTabConfig = this.statusTabs.find(t => t.key === this.activeTab);
    if (activeTabConfig) {
      this.filteredRedemptions = this.redemptions.filter(r => r.statusCode === activeTabConfig.statusCode);
      this.currentPage = 1; // Reset to first page when changing tabs
    }
  }

  get paginatedRedemptions(): UserRedemption[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredRedemptions.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getStatusClass(statusCode: number): string {
    switch (statusCode) {
      case 0: return 'status-pending';
      case 1: return 'status-approved';
      case 2: return 'status-rejected';
      case 3: return 'status-delivered';
      default: return 'status-pending';
    }
  }

  getTimelineStepClass(stepIndex: number, statusCode: number): string {
    // Timeline steps: 0=Requested, 1=Approved, 2=Delivered
    // Status codes: 0=Pending, 1=Approved, 2=Rejected, 3=Delivered
    
    if (statusCode === 2) {
      // Rejected: only Requested is completed
      return stepIndex === 0 ? 'step-completed' : 'step-pending';
    }
    
    if (statusCode === 0) {
      // Pending: only Requested is completed
      return stepIndex === 0 ? 'step-completed' : 'step-pending';
    }
    
    if (statusCode === 1) {
      // Approved: Requested and Approved are completed
      return stepIndex <= 1 ? 'step-completed' : 'step-pending';
    }
    
    if (statusCode === 3) {
      // Delivered: all steps completed
      return 'step-completed';
    }
    
    return 'step-pending';
  }

  isTimelineConnectorActive(connectorIndex: number, statusCode: number): boolean {
    // Connector 0: between Requested and Approved
    // Connector 1: between Approved and Delivered
    
    if (statusCode === 2) {
      // Rejected
      return false;
    }
    
    if (statusCode === 0) {
      // Pending
      return false;
    }
    
    if (statusCode === 1) {
      // Approved
      return connectorIndex === 0;
    }
    
    if (statusCode === 3) {
      // Delivered
      return true;
    }
    
    return false;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  formatShortDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  formatRedemptionId(id: string): string {
    // Return last 7 characters of the ID
    if (!id) return '';
    return '#' + id.substring(id.length - 7).toUpperCase();
  }

  navigateToProducts(): void {
    this.router.navigateByUrl('/user/products');
  }

  getEmptyStateMessage(): { title: string; subtitle?: string; showCta: boolean } {
    switch (this.activeTab) {
      case 'pending':
        return {
          title: "You don't have any pending redemptions.",
          subtitle: "Browse rewards and redeem your points!",
          showCta: true
        };
      case 'approved':
        return {
          title: "No approved redemptions awaiting delivery.",
          subtitle: "Your approved redemptions will appear here.",
          showCta: false
        };
      case 'delivered':
        return {
          title: "You haven't received any rewards yet.",
          subtitle: "Start redeeming your points for exciting rewards!",
          showCta: true
        };
      case 'rejected':
        return {
          title: "No rejected redemptions.",
          subtitle: "All your redemptions are in good standing.",
          showCta: false
        };
      default:
        return {
          title: "No redemptions found.",
          showCta: false
        };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
