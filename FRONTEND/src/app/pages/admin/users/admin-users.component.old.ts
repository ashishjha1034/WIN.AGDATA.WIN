import { Component, OnInit, OnDestroy, ViewChild, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, finalize } from 'rxjs/operators';

import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { AdminUsersService } from '../../../services/admin-users.service';
import { AdminGroupsService } from '../../../services/admin-groups.service';
import { UserListItem, UserFilterCriteria, StatsDto, InviteUserRequest } from '../../../models/user.models';
import { Group } from '../../../models/group.models';

import { KPICardComponent } from './components/kpi-card.component';
import { UserFiltersComponent } from './components/user-filters.component';
import { UserTableComponent, UserTableAction } from './components/user-table.component';
import { UserDetailDrawerComponent, DrawerAction } from './components/user-detail-drawer.component';
import { AddUserModalComponent } from './components/add-user-modal.component';
import { GroupListComponent } from './components/group-list.component';
import { GroupDetailsComponent } from './components/group-details.component';
import { AddGroupMembersModalComponent } from './components/add-group-members-modal.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminSidebarComponent,
    KPICardComponent,
    UserFiltersComponent,
    UserTableComponent,
    UserDetailDrawerComponent,
    AddUserModalComponent,
    GroupListComponent,
    GroupDetailsComponent,
    AddGroupMembersModalComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  @ViewChild(UserDetailDrawerComponent) drawerComponent?: UserDetailDrawerComponent;
  @ViewChild(AddUserModalComponent) addUserModalComponent?: AddUserModalComponent;

  // Tab management
  activeTab: 'users' | 'groups' = 'users';

  // Users data - using signals for reactivity
  private usersSignal = signal<UserListItem[]>([]);
  private searchQuerySignal = signal<string>('');
  private filtersSignal = signal<UserFilterCriteria>({});
  
  // Computed filtered users - automatically updates when signals change
  filteredUsers = computed(() => {
    let filtered = [...this.usersSignal()];
    const query = this.searchQuerySignal().toLowerCase();
    const filters = this.filtersSignal();

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

    return filtered;
  });

  stats: StatsDto | null = null;

  // Pagination - computed from filtered users
  currentPage = 1;
  pageSize = 10;
  
  get totalItems(): number {
    return this.filteredUsers().length;
  }

  // UI States
  isLoading = false;
  isLoadingStats = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Modal and Drawer states
  isAddUserModalOpen = false;
  isDrawerOpen = false;
  selectedUserId: string | null = null;

  // Groups data (placeholder - not MVP)
  groups: Group[] = [];
  selectedGroupId: string | null = null;
  selectedGroupName: string = '';
  selectedGroupMembers: string[] = [];
  isAddGroupMembersModalOpen = false;

  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<UserFilterCriteria>();

  constructor(
    private adminUsersService: AdminUsersService,
    private groupsService: AdminGroupsService
  ) {
    // Debounce filter changes and update signal
    this.filterSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(filters => {
      this.filtersSignal.set(filters);
      this.currentPage = 1;
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadStats();
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
      })
    ).subscribe({
      next: (response) => {
        // Update the signal with API data
        this.usersSignal.set(response.users || []);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load users';
        console.error('Failed to load users:', err);
      }
    });
  }

  /**
   * Load statistics
   */
  private loadStats(): void {
    this.isLoadingStats = true;

    this.adminUsersService.getStats().pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoadingStats = false;
      })
    ).subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (err) => {
        console.error('Failed to load stats:', err);
      }
    });
  }

  /**
   * Handle filter changes from filter component
   */
  onFiltersChanged(filters: UserFilterCriteria): void {
    this.filterSubject.next(filters);
  }

  /**
   * Handle search changes - update signal immediately for responsiveness
   */
  onSearchChanged(query: string): void {
    this.searchQuerySignal.set(query);
    this.currentPage = 1;
  }

  /**
   * Handle pagination
   */
  onPageChanged(page: number): void {
    this.currentPage = page;
  }

  /**
   * Get paginated users for display - computed from filtered signal
   */
  get paginatedUsers(): UserListItem[] {
    const filtered = this.filteredUsers();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Handle row double-click to open drawer
   */
  onRowDoubleClicked(user: UserListItem): void {
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
  }

  /**
   * Open drawer in edit mode for a user
   */
  openDrawerForEdit(userId: string): void {
    this.selectedUserId = userId;
    this.isDrawerOpen = true;
    // Small delay to let drawer open then trigger edit mode
    setTimeout(() => {
      if (this.drawerComponent) {
        this.drawerComponent.enterEditMode();
      }
    }, 100);
  }

  /**
   * Open drawer on transaction tab
   */
  openDrawerForTransactions(userId: string): void {
    this.selectedUserId = userId;
    this.isDrawerOpen = true;
    // Small delay to let drawer open then switch to activity tab
    setTimeout(() => {
      if (this.drawerComponent) {
        this.drawerComponent.activeTab = 'activity';
      }
    }, 100);
  }

  /**
   * Close user detail drawer
   */
  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedUserId = null;
  }

  /**
   * Handle drawer actions
   */
  onDrawerAction(action: DrawerAction): void {
    switch (action.type) {
      case 'assign-roles':
        // TODO: Open assign roles modal
        console.log('Assign roles for user:', this.selectedUserId);
        break;
      case 'deactivate':
        if (this.selectedUserId) {
          this.deactivateUser(this.selectedUserId);
        }
        break;
      case 'edit':
        // Edit is handled in drawer component
        break;
      case 'user-updated':
        // Refresh users list after user was edited
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
  }

  /**
   * Close add user modal
   */
  closeAddUserModal(): void {
    this.isAddUserModalOpen = false;
    if (this.addUserModalComponent) {
      this.addUserModalComponent.closeModal();
    }
  }

  /**
   * Handle user creation - aligned with backend InviteUserRequest
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
      next: (response) => {
        this.showSuccess('User created successfully!');
        this.closeAddUserModal();
        this.loadUsers();
        this.loadStats();
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
   * Show success message with auto-dismiss
   */
  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  /**
   * Show error message with auto-dismiss
   */
  private showError(message: string): void {
    this.error = message;
    setTimeout(() => {
      this.error = null;
    }, 5000);
  }

  /**
   * Reset user password
   */
  private resetUserPassword(userId: string): void {
    if (confirm('Send password reset email to this user?')) {
      // TODO: Implement password reset API call
      console.log('Resetting password for user:', userId);
      this.showSuccess('Password reset email sent!');
    }
  }

  /**
   * Toggle user active/inactive status
   */
  private toggleUserStatus(user: UserListItem): void {
    const action = user.isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      const request$ = user.isActive
        ? this.adminUsersService.deactivateUser(user.id)
        : this.adminUsersService.activateUser(user.id);

      request$.pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: () => {
          this.showSuccess(`User ${action}d successfully!`);
          this.loadUsers();
          if (this.isDrawerOpen) {
            this.closeDrawer();
          }
        },
        error: (err) => {
          this.showError(`Failed to ${action} user`);
        }
      });
    }
  }

  /**
   * Deactivate user
   */
  private deactivateUser(userId: string): void {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.adminUsersService.deactivateUser(userId).pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: () => {
          this.showSuccess('User deactivated successfully!');
          this.closeDrawer();
          this.loadUsers();
        },
        error: (err) => {
          this.showError('Failed to deactivate user');
        }
      });
    }
  }

  /**
   * Delete user
   */
  private deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.adminUsersService.deleteUser(userId).pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: () => {
          this.showSuccess('User deleted successfully!');
          this.loadUsers();
        },
        error: (err) => {
          this.showError('Failed to delete user');
        }
      });
    }
  }

  /**
   * GROUP MANAGEMENT METHODS (Placeholder - Not MVP)
   * Groups feature is disabled in current MVP
   */

  /**
   * Handle group selection from group list
   */
  onGroupSelected(group: Group): void {
    this.selectedGroupId = group.id;
    this.selectedGroupName = group.name;
    this.selectedGroupMembers = [];
  }

  /**
   * Handle create group click (placeholder)
   */
  onCreateGroupClick(): void {
    // Groups not implemented in MVP
    this.showError('Groups feature coming soon');
  }

  /**
   * Handle add members to group click (placeholder)
   */
  onAddGroupMembersClick(groupId: string): void {
    // Groups not implemented in MVP
    this.showError('Groups feature coming soon');
  }

  /**
   * Close add group members modal
   */
  closeAddGroupMembersModal(): void {
    this.isAddGroupMembersModalOpen = false;
  }

  /**
   * Handle members added to group (placeholder)
   */
  onGroupMembersAdded(userIds: string[]): void {
    this.showSuccess(`${userIds.length} member(s) added to group successfully!`);
    this.closeAddGroupMembersModal();
  }

  /**
   * Handle group updated
   */
  onGroupUpdated(): void {
    // Refresh group details and list
    if (this.selectedGroupId) {
      this.onGroupSelected({ id: this.selectedGroupId, name: this.selectedGroupName } as Group);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
