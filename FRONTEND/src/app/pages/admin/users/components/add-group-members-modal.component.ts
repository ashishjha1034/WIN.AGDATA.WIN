import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AdminGroupsService } from '../../../../services/admin-groups.service';
import { AdminUsersService } from '../../../../services/admin-users.service';
import { User } from '../../../../models/user.models';

interface UserOption extends User {
  selected?: boolean;
  role?: 'Member' | 'Lead';
}

@Component({
  selector: 'app-add-group-members-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onBackdropClick()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <!-- Modal header -->
        <div class="modal-header">
          <h2 class="modal-title">Add Members to '{{ groupName }}'</h2>
          <button
            class="close-btn"
            (click)="onClose()"
            title="Close modal"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </button>
        </div>

        <!-- Modal content -->
        <div class="modal-body">
          <!-- Search input -->
          <div class="search-section">
            <input
              type="text"
              class="search-input"
              placeholder="Search users by name, email, or employee ID..."
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()"
              [disabled]="isLoading"
            />
            <p class="search-hint">{{ availableUsers.length }} users available</p>
          </div>

          <!-- Users list -->
          <div class="users-list">
            <div *ngIf="isLoading" class="loading-state">
              <div class="spinner"></div>
              <p>Loading available users...</p>
            </div>

            <div *ngIf="!isLoading && filteredUsers.length === 0" class="empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <p>{{ searchQuery ? 'No users found' : 'All available users are already in the group' }}</p>
            </div>

            <div
              *ngFor="let user of filteredUsers"
              class="user-item"
              [class.selected]="user.selected"
            >
              <input
                type="checkbox"
                [(ngModel)]="user.selected"
              />
              <div class="user-details">
                <div class="user-avatar">{{ getInitials(user) }}</div>
                <div class="user-info">
                  <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="user-email">{{ user.email }}</div>
                  <div class="user-id">ID: {{ user.employeeId }}</div>
                </div>
              </div>
              <div class="role-selector">
                <select
                  [(ngModel)]="user.role"
                  class="role-select"
                  (click)="$event.stopPropagation()"
                >
                  <option value="Member">Member</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button
            class="btn secondary"
            (click)="onClose()"
            [disabled]="isSubmitting"
          >
            Cancel
          </button>
          <button
            class="btn primary"
            (click)="onSubmit()"
            [disabled]="!hasSelectedUsers || isSubmitting"
          >
            <span *ngIf="!isSubmitting">Add Selected ({{ getSelectedCount() }})</span>
            <span *ngIf="isSubmitting">
              <span class="mini-spinner"></span>
              Adding...
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 90%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
      background-color: white;
    }

    .modal-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 6px;
      background-color: transparent;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background-color: #f3f4f6;
      color: #1f2937;
    }

    .close-btn svg {
      width: 20px;
      height: 20px;
    }

    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .search-section {
      margin-bottom: 16px;
    }

    .search-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
      margin-bottom: 8px;
    }

    .search-input:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .search-input:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }

    .search-hint {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
    }

    .users-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      max-height: 400px;
      overflow-y: auto;
    }

    .users-list::-webkit-scrollbar {
      width: 6px;
    }

    .users-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .users-list::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    .users-list::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .loading-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
      color: #6b7280;
    }

    .empty-state svg {
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #e5e7eb;
      border-top-color: #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .user-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .user-item:hover {
      background-color: #f9fafb;
    }

    .user-item.selected {
      background-color: #f0f4f8;
    }

    .user-item input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #4b5563;
      margin: 0;
    }

    .user-details {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #4b5563;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .user-name {
      font-weight: 500;
      color: #1f2937;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email {
      font-size: 12px;
      color: #6b7280;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-id {
      font-size: 11px;
      color: #9ca3af;
    }

    .role-selector {
      margin-left: 12px;
    }

    .role-select {
      padding: 6px 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 12px;
      background-color: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .role-select:hover {
      border-color: #9ca3af;
    }

    .role-select:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 2px rgba(75, 85, 99, 0.1);
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      background-color: white;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn.secondary {
      background-color: white;
      color: #4b5563;
      border: 1px solid #d1d5db;
    }

    .btn.secondary:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .btn.primary {
      background-color: #4b5563;
      color: white;
    }

    .btn.primary:hover:not(:disabled) {
      background-color: #3d4555;
      box-shadow: 0 2px 8px rgba(75, 85, 99, 0.15);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .mini-spinner {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }
  `]
})
export class AddGroupMembersModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() groupId: string | null = null;
  @Input() groupName: string = '';
  @Input() currentMembers: string[] = [];
  @Output() closed = new EventEmitter<void>();
  @Output() membersAdded = new EventEmitter<string[]>();

  availableUsers: UserOption[] = [];
  filteredUsers: UserOption[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private groupsService: AdminGroupsService,
    private usersService: AdminUsersService
  ) {}

  ngOnInit(): void {
    // Setup search debouncing
    this.searchSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.filterUsers();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && !this.availableUsers.length) {
      this.loadAvailableUsers();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAvailableUsers(): void {
    this.isLoading = true;
    this.usersService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          // Filter out already-in-group members
          const users = response.users || [];
          this.availableUsers = users
            .filter((u: User) => !this.currentMembers.includes(u.id))
            .map((u: User) => ({
              ...u,
              selected: false,
              role: 'Member' as const
            }));
          this.filterUsers();
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading users:', error);
          this.isLoading = false;
        }
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private filterUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.availableUsers];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.availableUsers.filter((user: UserOption) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.employeeId.toLowerCase().includes(query)
      );
    }
  }

  get hasSelectedUsers(): boolean {
    return this.availableUsers.some(u => u.selected);
  }

  getSelectedCount(): number {
    return this.availableUsers.filter(u => u.selected).length;
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  onBackdropClick(): void {
    this.onClose();
  }

  onClose(): void {
    this.closed.emit();
    this.resetModal();
  }

  onSubmit(): void {
    if (!this.groupId || !this.hasSelectedUsers) return;

    const selectedUsers = this.availableUsers.filter(u => u.selected);
    const userIds = selectedUsers.map((u: UserOption) => u.id);
    const roles = selectedUsers.reduce((acc: Record<string, 'Member' | 'Lead'>, u: UserOption) => {
      if (u.role && u.role !== 'Member') {
        acc[u.id] = u.role;
      }
      return acc;
    }, {} as Record<string, 'Member' | 'Lead'>);

    this.isSubmitting = true;

    this.groupsService.addMembersToGroup({
      groupId: this.groupId,
      userIds,
      roles: Object.keys(roles).length > 0 ? roles : undefined
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.membersAdded.emit(userIds);
          this.onClose();
        },
        error: (error: any) => {
          console.error('Error adding members:', error);
          this.isSubmitting = false;
        }
      });
  }

  private resetModal(): void {
    this.searchQuery = '';
    this.availableUsers = [];
    this.filteredUsers = [];
    this.isLoading = false;
    this.isSubmitting = false;
  }
}
