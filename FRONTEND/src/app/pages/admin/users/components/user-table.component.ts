import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserListItem } from '../../../../models/user.models';
import { PaginationComponent } from '../../../../shared/components/pagination.component';

export interface UserTableAction {
  type: 'view' | 'edit' | 'reset-password' | 'toggle-status' | 'delete';
  userId: string;
  user: UserListItem;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ])
  ],
  template: `
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Balance</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="isLoading" class="loading-row">
            <td colspan="6" class="loading-message">
              <div class="spinner"></div>
              Loading users...
            </td>
          </tr>
          <tr *ngIf="!isLoading && users.length === 0" class="empty-row">
            <td colspan="6" class="empty-message">No users found</td>
          </tr>
          <tr 
            *ngFor="let user of users" 
            class="user-row"
            (click)="onRowClick(user)"
            tabindex="0"
            (keydown.enter)="onRowClick(user)"
            role="button"
            [attr.aria-label]="'View details for ' + user.firstName + ' ' + user.lastName"
          >
            <td class="user-cell">
              <div class="user-info">
                <div class="user-avatar">{{ getInitials(user) }}</div>
                <div class="user-details">
                  <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="user-id">{{ user.employeeId }}</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span *ngFor="let role of user.roles" class="role-chip">{{ role }}</span>
              <span *ngIf="!user.roles || user.roles.length === 0" class="role-chip">Employee</span>
            </td>
            <td>
              <span class="status-badge" [class.active]="user.isActive" [class.inactive]="!user.isActive">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="balance-info">
                <div class="balance-amount">{{ user.points?.current ?? 0 | number }}</div>
                <div class="balance-detail">
                  <span class="earned">{{ formatPointsValue(user.points?.earned ?? 0, 'earned') }}</span> / 
                  <span class="redeemed">{{ formatPointsValue(user.points?.redeemed ?? 0, 'redeemed') }}</span>
                </div>
              </div>
            </td>
            <td class="actions-col">
              <div class="action-menu">
                <button class="menu-btn" (click)="toggleMenu($event, user.id)">⋯</button>
                <div class="menu-dropdown" *ngIf="activeMenuId === user.id" @fadeInOut [class.open-up]="shouldOpenUp(user)">
                  <button (click)="onAction('view', user)">View Details</button>
                  <button (click)="onAction('edit', user)">Edit</button>
                  <button (click)="onAction('reset-password', user)">Reset Password</button>
                  <div class="menu-divider"></div>
                  <button class="delete" (click)="onAction('delete', user)">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <app-pagination
        [currentPage]="currentPage"
        [pageSize]="pageSize"
        [totalItems]="totalItems"
        [itemLabel]="'users'"
        (pageChange)="onPageChange($event)"
      ></app-pagination>
    </div>
  `,
  styles: [`
    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    thead {
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.5px;
    }

    .actions-col {
      width: 50px;
      text-align: center;
    }

    tbody tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.15s ease;
    }

    tbody tr:hover {
      background-color: #f9fafb;
    }

    td {
      padding: 12px 16px;
      color: #1f2937;
    }

    .empty-row {
      background: #f9fafb;
    }

    .empty-message {
      text-align: center;
      color: #9ca3af;
      padding: 32px 16px;
      font-size: 14px;
    }

    .user-cell {
      padding: 12px 16px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #4b5563;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .user-name {
      font-weight: 500;
      color: #1f2937;
    }

    .user-id {
      font-size: 12px;
      color: #9ca3af;
    }

    .role-chip {
      display: inline-block;
      padding: 4px 8px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      margin-right: 4px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.active {
      background: #d1fae5;
      color: #047857;
    }

    .status-badge.inactive {
      background: #fee2e2;
      color: #dc2626;
    }

    .balance-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .balance-amount {
      font-weight: 600;
      color: #1f2937;
    }

    .balance-detail {
      font-size: 12px;
      color: #9ca3af;
    }

    .action-menu {
      position: relative;
      display: inline-block;
    }

    .menu-btn {
      padding: 6px 8px;
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #6b7280;
      transition: color 0.2s ease;
    }

    .menu-btn:hover {
      color: #1f2937;
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 160px;
      z-index: 1000;
      overflow: visible;
    }

    /* Open upward for bottom rows to prevent clipping */
    .menu-dropdown.open-up {
      top: auto;
      bottom: 100%;
      margin-bottom: 4px;
    }

    .menu-dropdown button {
      display: block;
      width: 100%;
      padding: 10px 16px;
      border: none;
      background: white;
      text-align: left;
      font-size: 13px;
      color: #374151;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .menu-dropdown button:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .menu-dropdown .menu-divider {
      height: 1px;
      padding: 0;
      margin: 4px 0;
      background: #e5e7eb;
    }

    .menu-dropdown button.deactivate,
    .menu-dropdown button.delete {
      color: #dc2626;
    }

    .menu-dropdown button.deactivate:hover,
    .menu-dropdown button.delete:hover {
      background: #fee2e2;
    }

    .loading-row {
      background: #f9fafb;
    }

    .loading-message {
      text-align: center;
      color: #6b7280;
      padding: 32px 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e5e7eb;
      border-top-color: #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .balance-detail .earned {
      color: #10b981;
    }

    .balance-detail .redeemed {
      color: #ef4444;
    }

    .user-row {
      cursor: pointer;
    }

    .user-row:focus {
      outline: none;
      background-color: #f0fdf4;
      box-shadow: inset 0 0 0 2px #2c5f3f;
    }

    .user-row:focus-visible {
      outline: 2px solid #2c5f3f;
      outline-offset: -2px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .page-btn {
      padding: 8px 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .page-btn:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #d1d5db;
      color: #374151;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }
  `]
})
export class UserTableComponent {
  @Input() users: UserListItem[] = [];
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Input() isLoading = false;

  @Output() actionTriggered = new EventEmitter<UserTableAction>();
  @Output() pageChanged = new EventEmitter<number>();
  @Output() rowDoubleClicked = new EventEmitter<UserListItem>();
  @Output() rowClicked = new EventEmitter<UserListItem>();

  activeMenuId: string | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close menu when clicking outside
    if (this.activeMenuId && !(event.target as HTMLElement).closest('.action-menu')) {
      this.activeMenuId = null;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  getInitials(user: UserListItem): string {
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  }

  toggleMenu(event: Event, userId: string): void {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === userId ? null : userId;
  }

  onRowDoubleClick(user: UserListItem): void {
    this.rowDoubleClicked.emit(user);
  }

  onRowClick(user: UserListItem): void {
    this.rowClicked.emit(user);
  }

  onAction(type: UserTableAction['type'], user: UserListItem): void {
    this.activeMenuId = null;
    this.actionTriggered.emit({
      type,
      userId: user.id,
      user
    });
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }

  /**
   * Format points value with proper sign, show just 0 if zero
   */
  formatPointsValue(value: number, type: 'earned' | 'redeemed'): string {
    const num = value ?? 0;
    // Show just 0 if zero
    if (num === 0) return '0';
    // Add sign prefix
    if (type === 'earned') {
      return `+${num.toLocaleString()}`;
    } else {
      return `-${Math.abs(num).toLocaleString()}`;
    }
  }

  /**
   * Determine if dropdown should open upward to prevent clipping
   * Returns true for the last 2 rows in the table
   */
  shouldOpenUp(user: UserListItem): boolean {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    const totalUsers = this.users.length;
    // Open upward for the last 2 rows to prevent viewport clipping
    return userIndex >= totalUsers - 2;
  }
}
