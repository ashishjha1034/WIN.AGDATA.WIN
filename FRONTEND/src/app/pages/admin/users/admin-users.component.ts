import { Component, OnInit, OnDestroy, ViewChild, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, debounceTime, finalize, catchError } from 'rxjs/operators';

// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

// Register ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { AdminUsersService } from '../../../services/admin-users.service';
import { AuthService } from '../../../services/auth.service';
import { UserListItem, UserFilterCriteria, InviteUserRequest, DeactivateUserWarnings, DeactivateUserBlocked, DeactivateUserWarningData } from '../../../models/user.models';

import { UserTableComponent, UserTableAction } from './components/user-table.component';
import { UserDetailDrawerComponent, DrawerAction } from './components/user-detail-drawer.component';
import { AddUserModalComponent } from './components/add-user-modal-v2.component';
import { UserDeactivateConfirmationDialogComponent } from './components/user-deactivate-confirmation-dialog.component';

// Sort options type
type SortField = 'name' | 'email' | 'balance' | 'createdAt';
type SortDirection = 'asc' | 'desc';

interface SortOption {
  field: SortField;
  direction: SortDirection;
}

// Top user for chart
interface TopUser {
  name: string;
  balance: number;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminSidebarComponent,
    NgxEchartsDirective,
    UserTableComponent,
    UserDetailDrawerComponent,
    AddUserModalComponent,
    UserDeactivateConfirmationDialogComponent
  ],
  providers: [
    provideEchartsCore({ echarts })
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  @ViewChild(UserDetailDrawerComponent) drawerComponent?: UserDetailDrawerComponent;
  @ViewChild(AddUserModalComponent) addUserModalComponent?: AddUserModalComponent;

  // Current admin user
  currentUser: any;

  // Users data - using signals for reactivity
  private usersSignal = signal<UserListItem[]>([]);
  private searchQuerySignal = signal<string>('');
  private filtersSignal = signal<UserFilterCriteria>({});
  private sortSignal = signal<SortOption>({ field: 'name', direction: 'asc' });

  // Computed filtered and sorted users
  filteredUsers = computed(() => {
    let filtered = [...this.usersSignal()];
    const query = this.searchQuerySignal().toLowerCase();
    const filters = this.filtersSignal();
    const sort = this.sortSignal();

    // Apply search filter
    if (query) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.employeeId.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(user =>
        (filters.status === 'active' && user.isActive) ||
        (filters.status === 'inactive' && !user.isActive)
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user =>
        user.roles?.includes(filters.role!)
      );
    }

    // Apply balance range filter (fixed)
    if (filters.balanceRange) {
      filtered = filtered.filter(user => {
        const balance = user.points?.current ?? 0;
        switch (filters.balanceRange) {
          case '0-1000':
            return balance >= 0 && balance <= 1000;
          case '1000-5000':
            return balance > 1000 && balance <= 5000;
          case '5000+':
            return balance > 5000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'balance':
          comparison = (a.points?.current ?? 0) - (b.points?.current ?? 0);
          break;
        case 'createdAt':
          // If createdAt exists, use it; otherwise fall back to id
          comparison = (a.id || '').localeCompare(b.id || '');
          break;
      }
      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return filtered;
  });

  // Top 5 users for chart
  topUsers = computed(() => {
    const users = [...this.usersSignal()];
    return users
      .sort((a, b) => (b.points?.current ?? 0) - (a.points?.current ?? 0))
      .slice(0, 5)
      .map(u => ({
        name: `${u.firstName} ${u.lastName}`,
        balance: u.points?.current ?? 0
      }));
  });

  // Pagination
  currentPage = 1;
  pageSize = 10;

  get totalItems(): number {
    return this.filteredUsers().length;
  }

  // UI States
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Filters state
  searchQuery = '';
  statusFilter = '';
  roleFilter = '';
  balanceFilter = '';
  sortField: SortField = 'name';
  sortDirection: SortDirection = 'asc';
  showFilters = false;

  // Modal and Drawer states
  isAddUserModalOpen = false;
  isDrawerOpen = false;
  selectedUserId: string | null = null;

  // User Deactivation Dialog states
  showDeactivateDialog = false;
  deactivateWarningData: DeactivateUserWarningData | null = null;
  pendingDeactivationUserId: string | null = null;
  deactivationBlockedMessage: string | null = null;

  // Chart options
  chartOption: EChartsOption = {};

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private adminUsersService: AdminUsersService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    // Debounce search
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchQuerySignal.set(query);
      this.currentPage = 1;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.cdr.markForCheck();
      });

    this.loadUsers();
  }

  /**
   * Load all users from API
   */
  private loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    this.adminUsersService.getAllUsers(false).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (response) => {
        this.usersSignal.set(response.users || []);
        this.updateChart();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.message || 'Failed to load users';
        console.error('Failed to load users:', err);
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Update chart with top 5 users
   */
  private updateChart(): void {
    const top5 = this.topUsers();
    
    if (top5.length === 0) {
      this.chartOption = {};
      return;
    }

    // Reverse for horizontal bar (top user at top)
    const reversedUsers = [...top5].reverse();

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const data = params[0];
          return `${data.name}<br/>Balance: ${data.value.toLocaleString()} pts`;
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
        },
        splitLine: {
          lineStyle: { color: '#f0f0f0' }
        }
      },
      yAxis: {
        type: 'category',
        data: reversedUsers.map(u => u.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#374151',
          fontSize: 12
        }
      },
      series: [
        {
          name: 'Balance',
          type: 'bar',
          data: reversedUsers.map(u => u.balance),
          itemStyle: {
            color: '#2c5f3f',
            borderRadius: [0, 4, 4, 0]
          },
          barWidth: '60%',
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => params.value.toLocaleString(),
            color: '#6b7280',
            fontSize: 11
          }
        }
      ]
    };
  }

  /**
   * Handle search input
   */
  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  /**
   * Apply filters
   */
  applyFilters(): void {
    this.filtersSignal.set({
      status: (this.statusFilter || undefined) as 'active' | 'inactive' | undefined,
      role: this.roleFilter || undefined,
      balanceRange: (this.balanceFilter || undefined) as '0-1000' | '1000-5000' | '5000+' | undefined
    });
    this.sortSignal.set({
      field: this.sortField,
      direction: this.sortDirection
    });
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  /**
   * Reset filters
   */
  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.balanceFilter = '';
    this.sortField = 'name';
    this.sortDirection = 'asc';
    this.searchQuerySignal.set('');
    this.filtersSignal.set({});
    this.sortSignal.set({ field: 'name', direction: 'asc' });
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  /**
   * Toggle filters panel
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Handle pagination
   */
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.cdr.markForCheck();
  }

  /**
   * Get paginated users for display
   */
  get paginatedUsers(): UserListItem[] {
    const filtered = this.filteredUsers();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Handle row single-click to open drawer
   */
  onRowClicked(user: UserListItem): void {
    this.openDrawer(user.id);
  }

  /**
   * Handle table actions
   */
  onTableAction(action: UserTableAction): void {
    switch (action.type) {
      case 'view':
        this.openDrawer(action.userId);
        break;
      case 'edit':
        this.openDrawerForEdit(action.userId);
        break;
      case 'transactions':
        this.openDrawerForTransactions(action.userId);
        break;
      case 'reset-password':
        this.resetUserPassword(action.userId);
        break;
      case 'toggle-status':
        this.toggleUserStatus(action.user);
        break;
      case 'delete':
        this.deleteUser(action.userId);
        break;
    }
  }

  /**
   * Open user detail drawer
   */
  openDrawer(userId: string): void {
    this.selectedUserId = userId;
    this.isDrawerOpen = true;
    this.cdr.markForCheck();
  }

  /**
   * Open drawer in edit mode
   */
  openDrawerForEdit(userId: string): void {
    this.selectedUserId = userId;
    this.isDrawerOpen = true;
    setTimeout(() => {
      if (this.drawerComponent) {
        this.drawerComponent.enterEditMode();
      }
    }, 100);
    this.cdr.markForCheck();
  }

  /**
   * Open drawer on transaction tab
   */
  openDrawerForTransactions(userId: string): void {
    this.selectedUserId = userId;
    this.isDrawerOpen = true;
    setTimeout(() => {
      if (this.drawerComponent) {
        this.drawerComponent.activeTab = 'activity';
      }
    }, 100);
    this.cdr.markForCheck();
  }

  /**
   * Close drawer
   */
  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedUserId = null;
    this.cdr.markForCheck();
  }

  /**
   * Handle drawer actions
   */
  onDrawerAction(action: DrawerAction): void {
    switch (action.type) {
      case 'deactivate':
        if (this.selectedUserId) {
          this.deactivateUser(this.selectedUserId);
        }
        break;
      case 'user-updated':
        this.loadUsers();
        this.showSuccess('User updated successfully!');
        break;
    }
  }

  /**
   * Open add user modal
   */
  openAddUserModal(): void {
    this.isAddUserModalOpen = true;
    this.cdr.markForCheck();
  }

  /**
   * Close add user modal
   */
  closeAddUserModal(): void {
    this.isAddUserModalOpen = false;
    if (this.addUserModalComponent) {
      this.addUserModalComponent.closeModal();
    }
    this.cdr.markForCheck();
  }

  /**
   * Handle user creation
   */
  onUserCreated(request: InviteUserRequest): void {
    this.adminUsersService.createUser(request).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        if (this.addUserModalComponent) {
          this.addUserModalComponent.setSubmitting(false);
        }
      })
    ).subscribe({
      next: () => {
        this.showSuccess('User created successfully!');
        this.closeAddUserModal();
        this.loadUsers();
      },
      error: (err) => {
        const errorMessage = err.message || 'Failed to create user';
        if (this.addUserModalComponent) {
          this.addUserModalComponent.setError(errorMessage);
        }
        console.error('Create user error:', err);
      }
    });
  }

  /**
   * Show success message
   */
  private showSuccess(message: string): void {
    this.successMessage = message;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.successMessage = null;
      this.cdr.markForCheck();
    }, 3000);
  }

  /**
   * Show error message
   */
  private showError(message: string): void {
    this.error = message;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.error = null;
      this.cdr.markForCheck();
    }, 5000);
  }

  /**
   * Reset user password
   */
  private resetUserPassword(userId: string): void {
    if (confirm('Send password reset email to this user?')) {
      console.log('Resetting password for user:', userId);
      this.showSuccess('Password reset email sent!');
    }
  }

  /**
   * Toggle user status
   * For deactivation: initiates the business rule validation flow
   * For activation: simple toggle
   */
  private toggleUserStatus(user: UserListItem): void {
    if (user.isActive) {
      // Deactivating - use the business rule flow
      this.deactivateUser(user.id);
    } else {
      // Activating - simple confirm and activate
      if (confirm(`Are you sure you want to activate this user?`)) {
        this.adminUsersService.activateUser(user.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.showSuccess('User activated successfully!');
            this.loadUsers();
            if (this.isDrawerOpen) {
              this.closeDrawer();
            }
          },
          error: () => {
            this.showError('Failed to activate user');
          }
        });
      }
    }
  }

  /**
   * Deactivate user with business rule handling
   * Handles hard blocks (422) and soft warnings (409)
   */
  private deactivateUser(userId: string): void {
    this.deactivationBlockedMessage = null;
    
    const user = this.usersSignal().find(u => u.id === userId);
    if (!user) return;
    
    // First attempt without force - let server check for warnings/blocks
    this.isLoading = true;
    this.cdr.markForCheck();
    
    this.adminUsersService.deactivateUser(userId, false).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('User deactivated successfully:', response);
        this.isLoading = false;
        this.showSuccess(`User "${user.firstName} ${user.lastName}" deactivated successfully!`);
        this.closeDrawer();
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deactivating user:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
        
        // Check if it's a soft warning (409 Conflict)
        if (this.adminUsersService.isDeactivationWarning(error)) {
          const warnings = error.error as DeactivateUserWarnings;
          this.pendingDeactivationUserId = userId;
          this.deactivateWarningData = {
            userName: `${user.firstName} ${user.lastName}`,
            userId: userId,
            pointsBalance: warnings.pointsBalance,
            completedEventsCount: warnings.completedEventsCount,
            completedRedemptionsCount: warnings.completedRedemptionsCount,
            lastActivityDate: warnings.lastActivityDate,
            daysSinceLastActivity: warnings.daysSinceLastActivity
          };
          this.showDeactivateDialog = true;
          this.cdr.markForCheck();
          return;
        }
        
        // Check if it's a hard block (422 Unprocessable Entity)
        if (this.adminUsersService.isDeactivationBlocked(error)) {
          const blocked = error.error as DeactivateUserBlocked;
          // Show blocking reasons in error message
          const reasons = blocked.reasons?.length > 0 
            ? blocked.reasons.join(' ') 
            : blocked.message;
          this.deactivationBlockedMessage = reasons;
          this.error = reasons;
          setTimeout(() => {
            this.error = null;
            this.deactivationBlockedMessage = null;
            this.cdr.markForCheck();
          }, 8000);
          this.cdr.markForCheck();
          return;
        }
        
        // Generic error
        this.showError(error?.error?.message || 'Failed to deactivate user. Please try again.');
      }
    });
  }

  /**
   * Handle confirmation from deactivate warning dialog
   */
  onDeactivateConfirmed(): void {
    if (!this.pendingDeactivationUserId) return;
    
    const userId = this.pendingDeactivationUserId;
    const user = this.usersSignal().find(u => u.id === userId);
    
    this.showDeactivateDialog = false;
    this.deactivateWarningData = null;
    this.isLoading = true;
    this.cdr.markForCheck();
    
    // Retry with force=true to bypass soft warnings
    this.adminUsersService.deactivateUser(userId, true).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('User deactivated successfully (forced):', response);
        this.isLoading = false;
        this.pendingDeactivationUserId = null;
        this.showSuccess(`User "${user?.firstName} ${user?.lastName}" deactivated successfully!`);
        this.closeDrawer();
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deactivating user (forced):', error);
        this.isLoading = false;
        this.pendingDeactivationUserId = null;
        this.cdr.markForCheck();
        
        // Even with force, hard blocks cannot be bypassed
        if (this.adminUsersService.isDeactivationBlocked(error)) {
          const blocked = error.error as DeactivateUserBlocked;
          const reasons = blocked.reasons?.length > 0 
            ? blocked.reasons.join(' ') 
            : blocked.message;
          this.error = reasons;
        } else {
          this.error = error?.error?.message || 'Failed to deactivate user. Please try again.';
        }
        setTimeout(() => {
          this.error = null;
          this.cdr.markForCheck();
        }, 5000);
      }
    });
  }

  /**
   * Handle cancellation from deactivate warning dialog
   */
  onDeactivateCancelled(): void {
    this.showDeactivateDialog = false;
    this.deactivateWarningData = null;
    this.pendingDeactivationUserId = null;
    this.cdr.markForCheck();
  }

  /**
   * Delete user
   */
  private deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.adminUsersService.deleteUser(userId).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.showSuccess('User deleted successfully!');
          this.loadUsers();
        },
        error: () => {
          this.showError('Failed to delete user');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
