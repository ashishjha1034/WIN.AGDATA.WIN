import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserWithDetails, User } from '../../../../models/user.models';
import { AdminUsersService } from '../../../../services/admin-users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface DrawerAction {
  type: 'adjust-points' | 'assign-roles' | 'deactivate' | 'close';
}

@Component({
  selector: 'app-user-detail-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="closeDrawer()"></div>
    <div class="drawer" [class.open]="isOpen">
      <div class="drawer-header">
        <h2>User Details</h2>
        <button class="close-btn" (click)="closeDrawer()">✕</button>
      </div>

      <div class="drawer-content" *ngIf="userDetails && !isLoading">
        <!-- User Profile Section -->
        <div class="profile-section">
          <div class="avatar-large">{{ userDetails.user.firstName.charAt(0) }}{{ userDetails.user.lastName.charAt(0) }}</div>
          <div class="profile-info">
            <h3>{{ userDetails.user.firstName }} {{ userDetails.user.lastName }}</h3>
            <p class="email">{{ userDetails.user.email }}</p>
            <p class="employee-id">ID: {{ userDetails.user.employeeId }}</p>
          </div>
          <button class="edit-btn">✎ Edit</button>
        </div>

        <!-- Roles and Status -->
        <div class="meta-section">
          <div class="meta-row">
            <span class="label">Roles:</span>
            <div class="roles">
              <span *ngFor="let role of userDetails.user.roles" class="role-chip">{{ role }}</span>
            </div>
          </div>
          <div class="meta-row">
            <span class="label">Status:</span>
            <div class="status-toggle">
              <span class="status-badge" [class.active]="userDetails.user.isActive" [class.inactive]="!userDetails.user.isActive">
                {{ userDetails.user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="stats-section">
          <h4>Points Account</h4>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Current Balance</div>
              <div class="stat-value">{{ userDetails.points.current | number }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Total Earned</div>
              <div class="stat-value earned">+{{ userDetails.points.earned | number }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Total Redeemed</div>
              <div class="stat-value redeemed">-{{ userDetails.points.redeemed | number }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Transactions</div>
              <div class="stat-value">{{ userDetails.transactionCount }}</div>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="tabs-section">
          <div class="tabs-header">
            <button
              class="tab-btn"
              [class.active]="activeTab === 'profile'"
              (click)="activeTab = 'profile'"
            >
              Profile
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'points'"
              (click)="activeTab = 'points'"
            >
              Points
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'activity'"
              (click)="activeTab = 'activity'"
            >
              Activity
            </button>
          </div>

          <!-- Profile Tab -->
          <div *ngIf="activeTab === 'profile'" class="tab-content">
            <div class="info-group">
              <label>First Name</label>
              <p>{{ userDetails.user.firstName }}</p>
            </div>
            <div class="info-group">
              <label>Last Name</label>
              <p>{{ userDetails.user.lastName }}</p>
            </div>
            <div class="info-group">
              <label>Email Address</label>
              <p>{{ userDetails.user.email }}</p>
            </div>
            <div class="info-group">
              <label>Employee ID</label>
              <p>{{ userDetails.user.employeeId }}</p>
            </div>
            <div class="info-group" *ngIf="userDetails.user.createdAt">
              <label>Created</label>
              <p>{{ userDetails.user.createdAt | date: 'medium' }}</p>
            </div>
          </div>

          <!-- Points Tab -->
          <div *ngIf="activeTab === 'points'" class="tab-content">
            <div class="info-group">
              <label>Current Balance</label>
              <p>{{ userDetails.points.current | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Earned</label>
              <p>{{ userDetails.points.earned | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Redeemed</label>
              <p>{{ userDetails.points.redeemed | number }} points</p>
            </div>
            <div class="info-group">
              <label>Net Points</label>
              <p>{{ (userDetails.points.earned - userDetails.points.redeemed) | number }} points</p>
            </div>
          </div>

          <!-- Activity Tab -->
          <div *ngIf="activeTab === 'activity'" class="tab-content">
            <div class="info-group">
              <label>Last Active</label>
              <p>{{ userDetails.user.lastActive || 'Never' }}</p>
            </div>
            <div class="info-group">
              <label>Total Transactions</label>
              <p>{{ userDetails.transactionCount }}</p>
            </div>
            <p class="placeholder">Transaction history would appear here</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="drawer-loading" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading user details...</p>
      </div>

      <!-- Error State -->
      <div class="drawer-error" *ngIf="error">
        <p>{{ error }}</p>
        <button (click)="closeDrawer()">Close</button>
      </div>

      <!-- Footer Actions -->
      <div class="drawer-footer" *ngIf="userDetails && !isLoading">
        <button class="btn-primary" (click)="onAction('adjust-points')">Adjust Points</button>
        <button class="btn-secondary" (click)="onAction('assign-roles')">Assign Roles</button>
        <button
          class="btn-danger"
          (click)="onAction('deactivate')"
          *ngIf="userDetails.user.isActive"
        >
          Deactivate User
        </button>
      </div>
    </div>
  `,
  styles: [`
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .drawer {
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      z-index: 100;
      display: flex;
      flex-direction: column;
      transition: right 0.3s ease;
    }

    .drawer.open {
      right: 0;
    }

    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .drawer-header h2 {
      margin: 0;
      font-size: 18px;
      color: #1f2937;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }

    .close-btn:hover {
      color: #1f2937;
    }

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .profile-section {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 20px;
    }

    .avatar-large {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #4b5563;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 700;
      margin: 0 auto 12px;
    }

    .profile-info h3 {
      margin: 0 0 4px;
      font-size: 16px;
      color: #1f2937;
    }

    .profile-info p {
      margin: 0;
      font-size: 13px;
      color: #6b7280;
    }

    .email {
      font-weight: 500;
    }

    .employee-id {
      color: #9ca3af;
    }

    .edit-btn {
      margin-top: 12px;
      padding: 8px 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .edit-btn:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    .meta-section {
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 20px;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;
    }

    .meta-row:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      min-width: 60px;
    }

    .roles {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      flex: 1;
    }

    .role-chip {
      display: inline-block;
      padding: 4px 8px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
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

    .stats-section {
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 20px;
    }

    .stats-section h4 {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 600;
      color: #1f2937;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .stat-item {
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
    }

    .stat-label {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
    }

    .stat-value.earned {
      color: #047857;
    }

    .stat-value.redeemed {
      color: #dc2626;
    }

    .tabs-section {
      padding-bottom: 20px;
    }

    .tabs-header {
      display: flex;
      gap: 0;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 16px;
    }

    .tab-btn {
      flex: 1;
      padding: 12px 16px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #1f2937;
    }

    .tab-btn.active {
      color: #4b5563;
      border-bottom-color: #4b5563;
    }

    .tab-content {
      animation: slideIn 0.2s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .info-group {
      margin-bottom: 16px;
    }

    .info-group:last-child {
      margin-bottom: 0;
    }

    .info-group label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-group p {
      margin: 0;
      font-size: 14px;
      color: #1f2937;
    }

    .placeholder {
      color: #9ca3af;
      font-size: 13px;
      text-align: center;
      padding: 20px;
    }

    .drawer-loading,
    .drawer-error {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #f3f4f6;
      border-top: 3px solid #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 12px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .drawer-error p {
      margin: 0 0 12px;
      color: #dc2626;
      text-align: center;
    }

    .drawer-footer {
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .btn-primary,
    .btn-secondary,
    .btn-danger {
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #4b5563;
      color: white;
    }

    .btn-primary:hover {
      background: #3a4251;
    }

    .btn-secondary {
      background: white;
      border: 1px solid #e5e7eb;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    .btn-danger {
      background: #fee2e2;
      color: #dc2626;
    }

    .btn-danger:hover {
      background: #fecaca;
    }

    @media (max-width: 640px) {
      .drawer {
        width: 100%;
        right: -100%;
      }
    }
  `]
})
export class UserDetailDrawerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() userId: string | null = null;

  @Output() actionTriggered = new EventEmitter<DrawerAction>();
  @Output() closed = new EventEmitter<void>();

  userDetails: UserWithDetails | null = null;
  isLoading = false;
  error: string | null = null;
  activeTab: 'profile' | 'points' | 'activity' = 'profile';

  private destroy$ = new Subject<void>();

  constructor(private adminUsersService: AdminUsersService) {}

  ngOnInit(): void {
    if (this.isOpen && this.userId) {
      this.loadUserDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && this.userId) {
      this.loadUserDetails();
    }
  }

  private loadUserDetails(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.error = null;

    this.adminUsersService.getUserDetails(this.userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.userDetails = response.user;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }

  closeDrawer(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  onAction(type: DrawerAction['type']): void {
    this.actionTriggered.emit({ type });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
