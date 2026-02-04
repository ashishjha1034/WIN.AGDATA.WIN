import { Component, OnInit, OnDestroy, ViewChild, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, debounceTime, finalize, catchError } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

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
import { AdminHeaderComponent } from '../../../shared/components/admin-header.component';
import { AdminUsersService } from '../../../services/admin-users.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { UserListItem, UserFilterCriteria, InviteUserRequest, DeactivateUserWarnings, DeactivateUserBlocked, DeactivateUserWarningData } from '../../../models/user.models';
import { DialogService } from '../../../services/dialog.service';

import { UserTableComponent, UserTableAction } from './components/user-table.component';
import { UserDetailDrawerComponent, DrawerAction } from './components/user-detail-drawer.component';
import { AddUserModalComponent } from './components/add-user-modal-v2.component';

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
    AdminHeaderComponent,
    NgxEchartsDirective,
    UserTableComponent,
    UserDetailDrawerComponent,
    AddUserModalComponent
  ],
  providers: [
    provideEchartsCore({ echarts })
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
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

  // User Deactivation Dialog states (matches Product pattern)
  showDeactivateDialog = false;
  isDeactivating = false;
  deactivateWarningData: DeactivateUserWarningData | null = null;
  pendingDeactivationUserId: string | null = null;
  deactivationBlockedMessage: string | null = null;

  // Context Switcher (Admin View / Employee View)
  viewingContext: 'admin' | 'employee' = 'admin';
  isContextDropdownOpen: boolean = false;
  private readonly VIEWING_CONTEXT_KEY = 'agdata_viewing_context';

  // Chart options
  chartOption: EChartsOption = {};

  // Chart visibility toggle (matches Products page pattern)
  balanceChartVisible = signal(true);
  private readonly CHART_VISIBILITY_KEY = 'users_balance_chart_visible';

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private adminUsersService: AdminUsersService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private toastService: ToastService
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

    // Restore chart visibility from localStorage
    const saved = localStorage.getItem(this.CHART_VISIBILITY_KEY);
    if (saved !== null) {
      this.balanceChartVisible.set(saved === 'true');
    }

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
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#2c5f3f' },
              { offset: 1, color: '#4ade80' }
            ]),
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
   * Toggle balance chart visibility (matches Products page pattern)
   */
  toggleBalanceChart(): void {
    const newValue = !this.balanceChartVisible();
    this.balanceChartVisible.set(newValue);
    localStorage.setItem(this.CHART_VISIBILITY_KEY, String(newValue));
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
      case 'activate':
        if (this.selectedUserId) {
          this.activateUser(this.selectedUserId);
        }
        break;
      case 'toggle-role':
        if (action.data?.userId) {
          this.toggleUserRole(action.data.userId, action.data.newRole);
        }
        break;
      case 'user-updated':
        this.loadUsers();
        this.toastService.success('Success', 'User updated successfully!');
        break;
    }
  }

  /**
   * Toggle user role between Admin and Employee
   */
  private toggleUserRole(userId: string, newRole: string): void {
    this.cdr.markForCheck();
    
    this.adminUsersService.toggleUserRole(userId, newRole).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.toastService.success('Role Updated', `User role changed to ${newRole}`);
        this.loadUsers();
        // Refresh drawer if still open
        if (this.drawerComponent && this.isDrawerOpen) {
          this.drawerComponent.retryLoad();
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Role Change Failed', err.error?.message || 'Failed to change user role');
        this.cdr.markForCheck();
      }
    });
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
   * Show success message using toast
   */
  private showSuccess(message: string): void {
    this.toastService.success('Success', message);
  }

  /**
   * Show error message using toast
   */
  private showError(message: string): void {
    this.toastService.error('Error', message);
  }
  /**
   * Deactivate user with business rule handling
   * Handles hard blocks (422) and soft warnings (409)
   * Updates local state - NO page reload
   */
  private deactivateUser(userId: string): void {
    this.deactivationBlockedMessage = null;
    
    const user = this.usersSignal().find(u => u.id === userId);
    if (!user) return;
    
    // First attempt without force - let server check for warnings/blocks
    this.cdr.markForCheck();
    
    this.adminUsersService.deactivateUser(userId, false).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('User deactivated successfully:', response);
        // Update local state instead of reloading - NO page reload
        user.isActive = false;
        this.usersSignal.set([...this.usersSignal()]);
        // Refresh drawer if open
        if (this.drawerComponent && this.isDrawerOpen) {
          this.drawerComponent.retryLoad();
        }
        // Show single success toast
        this.toastService.success('User Deactivated', `${user.firstName} ${user.lastName} has been deactivated.`);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deactivating user:', error);
        this.cdr.markForCheck();
        
        // Check if it's a soft warning (409 Conflict) - show dialog overlay
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
          this.deactivationBlockedMessage = null;
          this.cdr.markForCheck();
          return;
        }
        
        // Check if it's a hard block (422 Unprocessable Entity) - show single toast
        if (this.adminUsersService.isDeactivationBlocked(error)) {
          const blocked = error.error as DeactivateUserBlocked;
          const message = blocked.reasons?.length > 0 
            ? blocked.reasons.join(' ') 
            : blocked.message || 'Cannot deactivate user due to active dependencies.';
          this.toastService.error('Cannot Deactivate', message);
          return;
        }
        
        // Generic error - single toast
        this.toastService.error('Deactivation Failed', error?.error?.message || 'Failed to deactivate user. Please try again.');
      }
    });
  }

  /**
   * Handle confirmation from deactivate warning drawer
   */
  onDeactivateConfirmed(): void {
    if (!this.pendingDeactivationUserId) return;
    
    const userId = this.pendingDeactivationUserId;
    const user = this.usersSignal().find(u => u.id === userId);
    
    this.isDeactivating = true;
    this.showDeactivateDialog = false;
    this.cdr.markForCheck();
    
    // Retry with force=true to bypass soft warnings
    this.adminUsersService.deactivateUser(userId, true).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isDeactivating = false;
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (response) => {
        console.log('User deactivated successfully (forced):', response);
        this.deactivateWarningData = null;
        this.pendingDeactivationUserId = null;
        // Update local state instead of reloading - NO page reload
        if (user) {
          user.isActive = false;
          this.usersSignal.set([...this.usersSignal()]);
        }
        // Refresh drawer if open
        if (this.drawerComponent && this.isDrawerOpen) {
          this.drawerComponent.retryLoad();
        }
        // Show single success toast
        this.toastService.success('User Deactivated', `${user?.firstName} ${user?.lastName} has been deactivated.`);
      },
      error: (error) => {
        console.error('Error deactivating user (forced):', error);
        
        // Even with force, hard blocks cannot be bypassed - single toast
        if (this.adminUsersService.isDeactivationBlocked(error)) {
          const blocked = error.error as DeactivateUserBlocked;
          const message = blocked.reasons?.length > 0 
            ? blocked.reasons.join(' ') 
            : blocked.message || 'Cannot deactivate user due to active dependencies.';
          this.toastService.error('Cannot Deactivate', message);
        } else {
          this.toastService.error('Deactivation Failed', error?.error?.message || 'Failed to deactivate user. Please try again.');
        }
        this.pendingDeactivationUserId = null;
        this.deactivateWarningData = null;
      }
    });
  }

  /**
   * Handle cancellation from deactivate warning drawer
   */
  onDeactivateCancelled(): void {
    this.showDeactivateDialog = false;
    this.deactivateWarningData = null;
    this.pendingDeactivationUserId = null;
    this.cdr.markForCheck();
  }

  /**
   * Activate user - updates local state without page reload
   */
  private activateUser(userId: string): void {
    const user = this.usersSignal().find(u => u.id === userId);
    if (!user) return;
    
    this.cdr.markForCheck();
    
    this.adminUsersService.activateUser(userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('User activated successfully:', response);
        // Update local state instead of reloading - NO page reload
        user.isActive = true;
        this.usersSignal.set([...this.usersSignal()]);
        // Refresh drawer if open to show updated state
        if (this.drawerComponent && this.isDrawerOpen) {
          this.drawerComponent.retryLoad();
        }
        // Show single success toast
        this.toastService.success('User Activated', `${user.firstName} ${user.lastName} has been activated successfully.`);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error activating user:', error);
        this.toastService.error('Activation Failed', error?.error?.message || 'Failed to activate user. Please try again.');
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Delete user
   */
  private deleteUser(userId: string): void {
    this.dialogService.confirm(
      'Are you sure you want to delete this user? This action cannot be undone.',
      'Delete User',
      'Delete',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed) {
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
    });
  }

  /**
   * Toggle context switcher dropdown
   */
  toggleContextDropdown(event: Event): void {
    event.stopPropagation();
    this.isContextDropdownOpen = !this.isContextDropdownOpen;
    this.cdr.markForCheck();
  }

  /**
   * Switch viewing context between Admin and Employee
   */
  switchContext(context: 'admin' | 'employee'): void {
    this.viewingContext = context;
    localStorage.setItem(this.VIEWING_CONTEXT_KEY, context);
    this.isContextDropdownOpen = false;
    
    // Navigate to the appropriate dashboard
    if (context === 'admin') {
      this.router.navigateByUrl('/admin/dashboard');
    } else {
      this.router.navigateByUrl('/user/dashboard');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
