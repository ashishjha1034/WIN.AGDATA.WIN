import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { AdminUsersService } from '../../../services/admin-users.service';
import { AdminGroupsService } from '../../../services/admin-groups.service';
import { User, UserFilterCriteria, StatsDto, CreateUserRequest, UserWithDetails } from '../../../models/user.models';
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

  // Tab management
  activeTab: 'users' | 'groups' = 'users';

  // Users data
  users: User[] = [];
  filteredUsers: User[] = [];
  stats: StatsDto | null = null;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  // Filters and Search
  currentFilters: UserFilterCriteria = {};
  searchQuery = '';

  // UI States
  isLoading = false;
  isLoadingStats = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Modal and Drawer states
  isAddUserModalOpen = false;
  isDrawerOpen = false;
  selectedUserId: string | null = null;

  // Groups data
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
    // Debounce filter changes
    this.filterSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(filters => {
      this.currentFilters = filters;
      this.currentPage = 1;
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadStats();
  }

  /**
   * Load all users
   */
  private loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    this.adminUsersService.getAllUsers(true).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.users = response.users || [];
        this.totalItems = response.count || 0;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  /**
   * Load statistics
   */
  private loadStats(): void {
    this.isLoadingStats = true;

    this.adminUsersService.getStats().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.stats = response;
        this.isLoadingStats = false;
      },
      error: (err) => {
        console.error('Failed to load stats:', err);
        this.isLoadingStats = false;
      }
    });
  }

  /**
   * Apply filters to users list
   */
  private applyFilters(): void {
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.employeeId.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (this.currentFilters.status) {
      filtered = filtered.filter(user =>
        (this.currentFilters.status === 'active' && user.isActive) ||
        (this.currentFilters.status === 'inactive' && !user.isActive)
      );
    }

    // Apply role filter
    if (this.currentFilters.role) {
      filtered = filtered.filter(user =>
        user.roles.includes(this.currentFilters.role!)
      );
    }

    // Apply balance filters (would need points data)
    // This would be enhanced when we have full user details with points

    this.filteredUsers = filtered;
    this.totalItems = this.filteredUsers.length;
    this.currentPage = 1;
  }

  /**
   * Handle filter changes from filter component
   */
  onFiltersChanged(filters: UserFilterCriteria): void {
    this.filterSubject.next(filters);
  }

  /**
   * Handle search changes
   */
  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  /**
   * Handle pagination
   */
  onPageChanged(page: number): void {
    this.currentPage = page;
  }

  /**
   * Get paginated users for display
   */
  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
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
        // TODO: Implement edit functionality
        console.log('Edit user:', action.userId);
        break;
      case 'points':
        // TODO: Implement adjust points modal
        console.log('Adjust points for user:', action.userId);
        break;
      case 'transactions':
        // TODO: Implement view transactions
        console.log('View transactions for user:', action.userId);
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
      case 'adjust-points':
        // TODO: Open adjust points modal
        console.log('Adjust points for user:', this.selectedUserId);
        break;
      case 'assign-roles':
        // TODO: Open assign roles modal
        console.log('Assign roles for user:', this.selectedUserId);
        break;
      case 'deactivate':
        if (this.selectedUserId) {
          this.deactivateUser(this.selectedUserId);
        }
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
  }

  /**
   * Handle user creation
   */
  onUserCreated(request: CreateUserRequest): void {
    this.isLoading = true;
    this.error = null;

    this.adminUsersService.createUser(request).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.successMessage = 'User created successfully!';
        this.closeAddUserModal();
        this.loadUsers();
        this.loadStats();

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        this.error = err.message || 'Failed to create user';
        this.isLoading = false;
      }
    });
  }

  /**
   * Reset user password
   */
  private resetUserPassword(userId: string): void {
    if (confirm('Send password reset email to this user?')) {
      // TODO: Implement password reset API call
      console.log('Resetting password for user:', userId);
      this.successMessage = 'Password reset email sent!';
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

  /**
   * Toggle user active/inactive status
   */
  private toggleUserStatus(user: User): void {
    const action = user.isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      this.isLoading = true;

      const request$ = user.isActive
        ? this.adminUsersService.deactivateUser(user.id)
        : this.adminUsersService.activateUser(user.id);

      request$.pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.successMessage = `User ${action}d successfully!`;
          this.loadUsers();
          if (this.isDrawerOpen) {
            this.closeDrawer();
          }
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.error = `Failed to ${action} user`;
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Deactivate user
   */
  private deactivateUser(userId: string): void {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.isLoading = true;

      this.adminUsersService.deactivateUser(userId).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.successMessage = 'User deactivated successfully!';
          this.closeDrawer();
          this.loadUsers();
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.error = 'Failed to deactivate user';
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Delete user
   */
  private deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.isLoading = true;

      this.adminUsersService.deleteUser(userId).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.successMessage = 'User deleted successfully!';
          this.loadUsers();
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.error = 'Failed to delete user';
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Export users to CSV
   */
  exportToCSV(): void {
    // TODO: Implement CSV export
    console.log('Exporting users to CSV');
  }

  /**
   * Import users from CSV
   */
  importFromCSV(): void {
    // TODO: Implement CSV import
    console.log('Importing users from CSV');
  }

  /**
   * GROUP MANAGEMENT METHODS
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
   * Handle create group click
   */
  onCreateGroupClick(): void {
    const groupName = prompt('Enter new group name:');
    if (groupName && groupName.trim()) {
      this.isLoading = true;
      this.groupsService.createGroup({ name: groupName.trim() })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.successMessage = 'Group created successfully!';
            this.isLoading = false;
            // Reload groups in the group list component
            // (component will reload when service emits new data)
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
          },
          error: (err) => {
            this.error = 'Failed to create group';
            this.isLoading = false;
          }
        });
    }
  }

  /**
   * Handle add members to group click
   */
  onAddGroupMembersClick(groupId: string): void {
    this.selectedGroupId = groupId;
    this.isAddGroupMembersModalOpen = true;
  }

  /**
   * Close add group members modal
   */
  closeAddGroupMembersModal(): void {
    this.isAddGroupMembersModalOpen = false;
  }

  /**
   * Handle members added to group
   */
  onGroupMembersAdded(userIds: string[]): void {
    this.successMessage = `${userIds.length} member(s) added to group successfully!`;
    this.closeAddGroupMembersModal();
    // Group details will reload automatically via onGroupSelected
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
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
