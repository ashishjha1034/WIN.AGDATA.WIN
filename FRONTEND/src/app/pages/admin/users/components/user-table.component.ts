import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.models';

export interface UserTableAction {
  type: 'view' | 'edit' | 'points' | 'transactions' | 'reset-password' | 'toggle-status' | 'delete';
  userId: string;
  user: User;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th class="checkbox-col">
              <input
                type="checkbox"
                [checked]="allSelected"
                (change)="toggleSelectAll()"
              />
            </th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Last Active</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="users.length === 0" class="empty-row">
            <td colspan="8" class="empty-message">No users found</td>
          </tr>
          <tr *ngFor="let user of users" class="user-row">
            <td class="checkbox-col">
              <input type="checkbox" [(ngModel)]="selectedUsers[user.id]" />
            </td>
            <td class="user-cell">
              <div class="user-info">
                <div class="user-avatar">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</div>
                <div class="user-details">
                  <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="user-id">{{ user.employeeId }}</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span *ngFor="let role of user.roles" class="role-chip">{{ role }}</span>
            </td>
            <td>
              <span class="status-badge" [class.active]="user.isActive" [class.inactive]="!user.isActive">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="balance-info">
                <div class="balance-amount">{{ getBalance(user) | number }}</div>
                <div class="balance-detail">+{{ getEarned(user) | number }} / -{{ getRedeemed(user) | number }}</div>
              </div>
            </td>
            <td class="last-active">{{ user.lastActive || '—' }}</td>
            <td class="actions-col">
              <div class="action-menu">
                <button class="menu-btn" (click)="toggleMenu(user.id)">⋯</button>
                <div class="menu-dropdown" *ngIf="activeMenuId === user.id" @fadeInOut>
                  <button (click)="onAction('view', user)">View</button>
                  <button (click)="onAction('edit', user)">Edit</button>
                  <button (click)="onAction('points', user)">Adjust Points</button>
                  <button (click)="onAction('transactions', user)">Transactions</button>
                  <button (click)="onAction('reset-password', user)">Reset Password</button>
                  <button class="divider"></button>
                  <button
                    [class.deactivate]="user.isActive"
                    (click)="onAction('toggle-status', user)"
                  >
                    {{ user.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button class="delete" (click)="onAction('delete', user)">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination" *ngIf="totalPages > 1">
        <button
          class="page-btn"
          [disabled]="currentPage === 1"
          (click)="previousPage()"
        >
          ← Previous
        </button>
        <div class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <button
          class="page-btn"
          [disabled]="currentPage === totalPages"
          (click)="nextPage()"
        >
          Next →
        </button>
      </div>
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

    .checkbox-col {
      width: 40px;
      text-align: center;
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

    .last-active {
      color: #9ca3af;
      font-size: 13px;
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
      z-index: 10;
      overflow: hidden;
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

    .menu-dropdown button.divider {
      height: 1px;
      padding: 0;
      margin: 4px 0;
      background: #e5e7eb;
      cursor: default;
    }

    .menu-dropdown button.divider:hover {
      background: #e5e7eb;
    }

    .menu-dropdown button.deactivate {
      color: #dc2626;
    }

    .menu-dropdown button.delete {
      color: #dc2626;
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

    input[type="checkbox"] {
      cursor: pointer;
      accent-color: #4b5563;
    }
  `]
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() userDetails: { [key: string]: any } = {};
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Input() isLoading = false;

  @Output() actionTriggered = new EventEmitter<UserTableAction>();
  @Output() pageChanged = new EventEmitter<number>();

  selectedUsers: { [key: string]: boolean } = {};
  activeMenuId: string | null = null;

  ngOnInit(): void {
    this.users.forEach(user => {
      this.selectedUsers[user.id] = false;
    });
  }

  get allSelected(): boolean {
    return this.users.length > 0 && this.users.every(u => this.selectedUsers[u.id]);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  toggleSelectAll(): void {
    const newState = !this.allSelected;
    this.users.forEach(user => {
      this.selectedUsers[user.id] = newState;
    });
  }

  toggleMenu(userId: string): void {
    this.activeMenuId = this.activeMenuId === userId ? null : userId;
  }

  onAction(type: UserTableAction['type'], user: User): void {
    this.activeMenuId = null;
    this.actionTriggered.emit({
      type,
      userId: user.id,
      user
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  getBalance(user: User): number {
    return this.userDetails[user.id]?.points.current || 0;
  }

  getEarned(user: User): number {
    return this.userDetails[user.id]?.points.earned || 0;
  }

  getRedeemed(user: User): number {
    return this.userDetails[user.id]?.points.redeemed || 0;
  }
}
