import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminGroupsService } from '../../../../services/admin-groups.service';
import { GroupDetails, GroupMember } from '../../../../models/group.models';
import { DialogService } from '../../../../services/dialog.service';

interface GroupTableAction {
  type: 'remove' | 'role-change';
  member: GroupMember;
  role?: 'Member' | 'Lead';
}

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="group-details-container">
      <div *ngIf="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading group details...</p>
      </div>

      <div *ngIf="!isLoading && groupDetails" class="group-details-content">
        <!-- Header with group name and action buttons -->
        <div class="group-header">
          <h2 class="group-title">{{ groupDetails.name }}</h2>
          <div class="group-actions">
            <button
              class="action-btn primary"
              (click)="onAddMembers()"
              title="Add members to group"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"></path>
              </svg>
              Add Members
            </button>
            <button
              class="action-btn menu-btn"
              (click)="toggleMenu()"
              title="More options"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8a2 2 0 110-4 2 2 0 010 4zM12 14a2 2 0 110-4 2 2 0 010 4zM12 20a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div *ngIf="showMenu" class="dropdown-menu">
              <button class="menu-item" (click)="onRenameGroup()">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.414 2.5a2 2 0 00-1.414.586l-9.828 9.828a2 2 0 000 2.828l1.414 1.414a2 2 0 002.828 0l9.828-9.828a2 2 0 000-2.828l-1.414-1.414c-.39-.39-.902-.586-1.414-.586zm6.364 4.242a2 2 0 00-2.828 0l-1.414 1.414 2.828 2.828 1.414-1.414a2 2 0 000-2.828z"></path>
                </svg>
                <span>Rename Group</span>
              </button>
              <button class="menu-item danger" (click)="onDeleteGroup()">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
                <span>Delete Group</span>
              </button>
              <button class="menu-item" (click)="onExportMembers()">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                </svg>
                <span>Export Members</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Summary section -->
        <div class="group-summary">
          <div class="summary-item">
            <span class="label">Total Members</span>
            <span class="value">{{ groupDetails.memberCount }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Admins</span>
            <span class="value">{{ groupDetails.adminCount || 0 }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Last Updated</span>
            <span class="value">{{ groupDetails.updatedAt | date: 'MMM d, yyyy' }}</span>
          </div>
        </div>

        <!-- Members table -->
        <div class="members-section">
          <h3 class="section-title">Group Members</h3>

          <div *ngIf="groupDetails.members && groupDetails.members.length > 0" class="members-table-wrapper">
            <table class="members-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      [(ngModel)]="selectAllMembers"
                      (change)="toggleSelectAll()"
                    />
                  </th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let member of groupDetails.members" class="table-row">
                  <td>
                    <input
                      type="checkbox"
                      [(ngModel)]="member.selected"
                    />
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar">{{ getInitials(member.firstName, member.lastName) }}</div>
                      <div class="user-info">
                        <div class="user-name">{{ member.firstName }} {{ member.lastName }}</div>
                        <div class="user-id">{{ member.employeeId }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ member.email }}</td>
                  <td>
                    <select
                      [(ngModel)]="member.roleInGroup"
                      (change)="onRoleChange(member)"
                      class="role-select"
                      [disabled]="isUpdating"
                    >
                      <option value="Member">Member</option>
                      <option value="Lead">Lead</option>
                    </select>
                  </td>
                  <td>
                    <span
                      class="status-badge"
                      [class.active]="member.isActive"
                      [class.inactive]="!member.isActive"
                    >
                      {{ member.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>
                    <button
                      class="remove-btn"
                      (click)="onRemoveMember(member)"
                      [disabled]="isUpdating"
                      title="Remove member"
                    >
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="!groupDetails.members || groupDetails.members.length === 0" class="empty-members">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            <p>No members in this group</p>
          </div>
        </div>
      </div>

      <div *ngIf="!isLoading && !groupDetails" class="empty-state">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p>Select a group to view details</p>
      </div>
    </div>
  `,
  styles: [`
    .group-details-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: white;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 12px;
      color: #6b7280;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .group-details-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }

    .group-header {
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: white;
    }

    .group-title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      flex: 1;
    }

    .group-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      position: relative;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background-color: white;
      color: #4b5563;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn.primary {
      background-color: #4b5563;
      color: white;
      border-color: #4b5563;
    }

    .action-btn.primary:hover {
      background-color: #3d4555;
      box-shadow: 0 2px 8px rgba(75, 85, 99, 0.15);
    }

    .action-btn svg {
      width: 16px;
      height: 16px;
    }

    .menu-btn {
      padding: 8px;
      width: 36px;
      justify-content: center;
    }

    .menu-btn:hover {
      background-color: #f3f4f6;
    }

    .dropdown-menu {
      position: absolute;
      top: 40px;
      right: 0;
      background-color: white;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 100;
      min-width: 180px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 16px;
      border: none;
      background-color: transparent;
      color: #4b5563;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }

    .menu-item:hover {
      background-color: #f3f4f6;
    }

    .menu-item.danger:hover {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .menu-item svg {
      width: 16px;
      height: 16px;
    }

    .group-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      padding: 20px;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px;
      background-color: white;
      border-radius: 6px;
    }

    .summary-item .label {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
      text-transform: uppercase;
    }

    .summary-item .value {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    .members-section {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }

    .section-title {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    .members-table-wrapper {
      overflow-x: auto;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .members-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .members-table thead {
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .members-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #4b5563;
    }

    .members-table th:first-child {
      width: 40px;
    }

    .members-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .table-row:hover {
      background-color: #f9fafb;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #4b5563;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .user-name {
      font-weight: 500;
      color: #1f2937;
    }

    .user-id {
      font-size: 11px;
      color: #9ca3af;
    }

    .role-select {
      padding: 6px 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 13px;
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

    .role-select:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.active {
      background-color: #d1fae5;
      color: #065f46;
    }

    .status-badge.inactive {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .remove-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 4px;
      background-color: transparent;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .remove-btn:hover:not(:disabled) {
      background-color: #fee2e2;
    }

    .remove-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .remove-btn svg {
      width: 16px;
      height: 16px;
    }

    .empty-members {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
      color: #6b7280;
      border: 1px dashed #d1d5db;
      border-radius: 8px;
    }

    .empty-members svg {
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #6b7280;
      text-align: center;
      gap: 12px;
    }

    .empty-state svg {
      width: 64px;
      height: 64px;
      opacity: 0.3;
    }

    input[type="checkbox"] {
      cursor: pointer;
      accent-color: #4b5563;
    }
  `]
})
export class GroupDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() groupId: string | null = null;
  @Output() addMembersClick = new EventEmitter<string>();
  @Output() groupUpdated = new EventEmitter<void>();

  groupDetails: GroupDetails | null = null;
  isLoading: boolean = false;
  isUpdating: boolean = false;
  showMenu: boolean = false;
  selectAllMembers: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private groupsService: AdminGroupsService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.groupsService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && this.groupId) {
      this.loadGroupDetails();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadGroupDetails(): void {
    if (!this.groupId) return;

    this.groupsService.getGroupDetails(this.groupId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.groupDetails = response.group;
          // Add a 'selected' property to members for checkbox binding
          if (this.groupDetails?.members) {
            this.groupDetails.members.forEach((m: GroupMember) => (m as any).selected = false);
          }
        },
        error: (error: any) => {
          console.error('Error loading group details:', error);
        }
      });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleSelectAll(): void {
    if (this.groupDetails?.members) {
      this.groupDetails.members.forEach((m: GroupMember) => {
        (m as any).selected = this.selectAllMembers;
      });
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  onAddMembers(): void {
    if (this.groupId) {
      this.addMembersClick.emit(this.groupId);
    }
  }

  onRenameGroup(): void {
    if (!this.groupDetails) return;

    const newName = prompt('Enter new group name:', this.groupDetails.name);
    if (newName && newName !== this.groupDetails.name) {
      this.isUpdating = true;
      this.groupsService.renameGroup(this.groupDetails.id, newName)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            if (this.groupDetails) {
              this.groupDetails.name = newName;
            }
            this.showMenu = false;
            this.isUpdating = false;
            this.groupUpdated.emit();
          },
          error: (error: any) => {
            console.error('Error renaming group:', error);
            this.isUpdating = false;
          }
        });
    }
  }

  onDeleteGroup(): void {
    if (!this.groupDetails) return;

    this.dialogService.confirm(
      `Are you sure you want to delete the group "${this.groupDetails.name}"? This action cannot be undone.`,
      'Delete Group',
      'Delete',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed && this.groupDetails) {
        this.isUpdating = true;
        this.groupsService.deleteGroup(this.groupDetails.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.groupDetails = null;
              this.showMenu = false;
              this.isUpdating = false;
              this.groupUpdated.emit();
            },
            error: (error: any) => {
              console.error('Error deleting group:', error);
              this.isUpdating = false;
            }
          });
      }
    });
  }

  onExportMembers(): void {
    if (!this.groupId) return;

    this.isUpdating = true;
    this.groupsService.exportGroupMembers(this.groupId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.groupDetails?.name || 'group'}-members.xlsx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.isUpdating = false;
          this.showMenu = false;
        },
        error: (error: any) => {
          console.error('Error exporting members:', error);
          this.isUpdating = false;
        }
      });
  }

  onRoleChange(member: GroupMember): void {
    if (!this.groupId) return;

    this.isUpdating = true;
    this.groupsService.updateMemberRole(this.groupId, member.userId, member.roleInGroup)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isUpdating = false;
          this.groupUpdated.emit();
        },
        error: (error: any) => {
          console.error('Error updating member role:', error);
          this.isUpdating = false;
        }
      });
  }

  onRemoveMember(member: GroupMember): void {
    if (!this.groupId) return;

    this.dialogService.confirm(
      `Remove ${member.firstName} ${member.lastName} from this group?`,
      'Remove Member',
      'Remove',
      'Cancel'
    ).subscribe(result => {
      if (result.confirmed) {
        this.isUpdating = true;
        this.groupsService.removeMemberFromGroup(this.groupId!, member.userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.isUpdating = false;
              this.loadGroupDetails();
              this.groupUpdated.emit();
            },
            error: (error: any) => {
              console.error('Error removing member:', error);
              this.isUpdating = false;
            }
          });
      }
    });
  }
}
