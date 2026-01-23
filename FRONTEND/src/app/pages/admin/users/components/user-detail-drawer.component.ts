import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailsResponse, UpdateUserRequest } from '../../../../models/user.models';
import { AdminUsersService } from '../../../../services/admin-users.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

export interface DrawerAction {
  type: 'assign-roles' | 'deactivate' | 'close' | 'edit' | 'user-updated';
  data?: any;
}

@Component({
  selector: 'app-user-detail-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="closeDrawer()"></div>
    <div class="drawer" [class.open]="isOpen">
      <div class="drawer-header">
        <h2>{{ isEditMode ? 'Edit User' : 'User Details' }}</h2>
        <button class="close-btn" (click)="closeDrawer()">✕</button>
      </div>

      <!-- View Mode -->
      <ng-container *ngIf="!isLoading && !error && userDetails && !isEditMode">
        <div class="drawer-content">
          <!-- User Profile Section -->
          <div class="profile-section">
            <div class="avatar-large">{{ getInitials() }}</div>
            <div class="profile-info">
              <h3>{{ userDetails.user?.firstName || '' }} {{ userDetails.user?.lastName || '' }}</h3>
              <p class="email">{{ userDetails.user?.email || '' }}</p>
              <p class="employee-id">ID: {{ userDetails.user?.employeeId || '' }}</p>
            </div>
            <button class="edit-btn" (click)="enterEditMode()">✎ Edit</button>
          </div>

          <!-- Roles and Status -->
          <div class="meta-section">
            <div class="meta-row">
              <span class="label">Roles:</span>
              <div class="roles">
                <span *ngFor="let role of userDetails.user?.roles || []" class="role-chip">{{ role }}</span>
                <span *ngIf="!userDetails.user?.roles?.length" class="no-roles">No roles assigned</span>
              </div>
            </div>
            <div class="meta-row">
              <span class="label">Status:</span>
              <div class="status-toggle">
                <span class="status-badge" [class.active]="userDetails.user?.isActive" [class.inactive]="!userDetails.user?.isActive">
                  {{ userDetails.user?.isActive ? 'Active' : 'Inactive' }}
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
                <div class="stat-value">{{ userDetails.points?.current ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Total Earned</div>
                <div class="stat-value earned">+{{ userDetails.points?.earned ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Total Redeemed</div>
                <div class="stat-value redeemed">-{{ userDetails.points?.redeemed ?? 0 | number }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Transactions</div>
                <div class="stat-value">{{ userDetails.transactionCount ?? 0 }}</div>
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
              <p>{{ userDetails.user?.firstName || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Last Name</label>
              <p>{{ userDetails.user?.lastName || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Email Address</label>
              <p>{{ userDetails.user?.email || '-' }}</p>
            </div>
            <div class="info-group">
              <label>Employee ID</label>
              <p>{{ userDetails.user?.employeeId || '-' }}</p>
            </div>
            <div class="info-group" *ngIf="userDetails.user?.createdAt">
              <label>Created</label>
              <p>{{ userDetails.user?.createdAt | date: 'medium' }}</p>
            </div>
          </div>

          <!-- Points Tab -->
          <div *ngIf="activeTab === 'points'" class="tab-content">
            <div class="info-group">
              <label>Current Balance</label>
              <p>{{ userDetails.points?.current ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Earned</label>
              <p>{{ userDetails.points?.earned ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Total Redeemed</label>
              <p>{{ userDetails.points?.redeemed ?? 0 | number }} points</p>
            </div>
            <div class="info-group">
              <label>Net Points</label>
              <p>{{ ((userDetails.points?.earned ?? 0) - (userDetails.points?.redeemed ?? 0)) | number }} points</p>
            </div>
          </div>

          <!-- Activity Tab -->
          <div *ngIf="activeTab === 'activity'" class="tab-content">
            <div class="info-group">
              <label>Total Transactions</label>
              <p>{{ userDetails.transactionCount ?? 0 }}</p>
            </div>
            
            <div *ngIf="isLoadingTransactions" class="loading-transactions">
              <div class="spinner-small"></div>
              <p>Loading transactions...</p>
            </div>

            <div *ngIf="!isLoadingTransactions && transactions.length === 0" class="no-transactions">
              <p>No transactions found</p>
            </div>

            <div *ngIf="!isLoadingTransactions && transactions.length > 0" class="transactions-list">
              <div *ngFor="let transaction of transactions" class="transaction-item">
                <div class="transaction-header">
                  <span class="transaction-type" [class.positive]="transaction.amount > 0" [class.negative]="transaction.amount < 0">
                    {{ transaction.transactionType || transaction.type }}
                  </span>
                  <span class="transaction-amount" [class.positive]="transaction.amount > 0" [class.negative]="transaction.amount < 0">
                    {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount }}
                  </span>
                </div>
                <div class="transaction-details">
                  <p class="transaction-reason">{{ transaction.reason || transaction.description || 'No description' }}</p>
                  <p class="transaction-date">{{ transaction.createdAt || transaction.timestamp | date:'medium' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ng-container>

      <!-- Edit Mode -->
      <ng-container *ngIf="!isLoading && !error && userDetails && isEditMode">
        <div class="drawer-content">
          <form [formGroup]="editForm" (ngSubmit)="saveEdit()" class="edit-form">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" formControlName="firstName" class="form-input" />
              <div *ngIf="editForm.get('firstName')?.invalid && editForm.get('firstName')?.touched" class="error-text">
                First name is required
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" formControlName="lastName" class="form-input" />
              <div *ngIf="editForm.get('lastName')?.invalid && editForm.get('lastName')?.touched" class="error-text">
                Last name is required
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" formControlName="email" class="form-input" />
              <div *ngIf="editForm.get('email')?.invalid && editForm.get('email')?.touched" class="error-text">
                Valid email is required
              </div>
            </div>
            <div class="form-group">
              <label for="employeeId">Employee ID *</label>
              <input type="text" id="employeeId" formControlName="employeeId" class="form-input" />
              <div *ngIf="editForm.get('employeeId')?.invalid && editForm.get('employeeId')?.touched" class="error-text">
                Employee ID is required
              </div>
            </div>

            <div *ngIf="editError" class="edit-error">{{ editError }}</div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="cancelEdit()" [disabled]="isSaving">Cancel</button>
              <button type="submit" class="btn-primary" [disabled]="editForm.invalid || isSaving">
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </ng-container>

      <!-- Loading State -->
      <div class="drawer-loading" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading user details...</p>
      </div>

      <!-- Error State -->
      <div class="drawer-error" *ngIf="error && !isLoading">
        <p>{{ error }}</p>
        <button class="btn-secondary" (click)="retryLoad()">Retry</button>
        <button class="btn-secondary" (click)="closeDrawer()">Close</button>
      </div>

      <!-- Footer Actions -->
      <div class="drawer-footer" *ngIf="userDetails && !isLoading && !isEditMode">
        <button class="btn-secondary" (click)="onAction('assign-roles')">Assign Roles</button>
        <button
          class="btn-danger"
          (click)="onAction('deactivate')"
          *ngIf="userDetails.user?.isActive"
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

    .role-chip:has-text('Employee') {
      background: #dbeafe;
      color: #1e40af;
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

    /* Transaction Styles */
    .loading-transactions,
    .no-transactions {
      text-align: center;
      padding: 20px;
      color: #6b7280;
    }

    .spinner-small {
      width: 24px;
      height: 24px;
      border: 2px solid #f3f4f6;
      border-top: 2px solid #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 8px;
    }

    .transactions-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .transaction-item {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      transition: background 0.2s ease;
    }

    .transaction-item:hover {
      background: #f9fafb;
    }

    .transaction-item:last-child {
      border-bottom: none;
    }

    .transaction-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .transaction-type {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .transaction-amount {
      font-size: 14px;
      font-weight: 700;
    }

    .transaction-amount.positive {
      color: #047857;
    }

    .transaction-amount.negative {
      color: #dc2626;
    }

    .transaction-details p {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
    }

    .transaction-reason {
      margin-bottom: 2px !important;
      color: #374151 !important;
    }

    .transaction-date {
      color: #9ca3af !important;
    }

    .drawer-loading,
    .drawer-error {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      gap: 12px;
    }

    .drawer-error {
      color: #dc2626;
    }

    .drawer-error p {
      margin: 0;
      text-align: center;
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

    /* Edit Form Styles */
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-group label {
      font-size: 12px;
      font-weight: 600;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input {
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 2px rgba(75, 85, 99, 0.1);
    }

    .form-input:disabled {
      background: #f3f4f6;
      color: #6b7280;
      cursor: not-allowed;
    }

    .error-text {
      font-size: 12px;
      color: #dc2626;
    }

    .edit-error {
      padding: 10px 12px;
      background: #fee2e2;
      color: #dc2626;
      border-radius: 6px;
      font-size: 13px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 12px;
    }

    .form-actions button {
      flex: 1;
    }

    .no-roles {
      color: #9ca3af;
      font-size: 12px;
      font-style: italic;
    }

    .btn-primary:disabled,
    .btn-secondary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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

  userDetails: UserDetailsResponse | null = null;
  transactions: any[] = [];
  isLoading = false;
  isLoadingTransactions = false;
  error: string | null = null;
  activeTab: 'profile' | 'points' | 'activity' = 'profile';

  // Edit mode state
  isEditMode = false;
  isSaving = false;
  editError: string | null = null;
  editForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private adminUsersService: AdminUsersService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      employeeId: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    // Initial load if already open with userId
    if (this.isOpen && this.userId) {
      this.loadUserDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to isOpen or userId changes
    if (changes['isOpen'] || changes['userId']) {
      if (this.isOpen && this.userId) {
        this.loadUserDetails();
      } else if (!this.isOpen) {
        // Reset state when drawer closes
        this.resetState();
      }
    }
  }

  private resetState(): void {
    this.userDetails = null;
    this.transactions = [];
    this.error = null;
    this.activeTab = 'profile';
    this.isEditMode = false;
    this.editError = null;
    this.isSaving = false;
    this.editForm.reset();
  }

  private loadUserDetails(): void {
    if (!this.userId) {
      this.error = 'No user selected';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.userDetails = null;
    this.cdr.detectChanges();

    this.adminUsersService.getUserDetails(this.userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          // API returns { user: {...}, points: {...}, transactionCount: N }
          this.userDetails = response;
          this.error = null;
          // Load transactions
          this.loadTransactions();
          // Use setTimeout(0) to ensure change detection runs after state update
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }, 0);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Failed to load user details:', err);
          this.error = err.message || 'Failed to load user details';
          this.userDetails = null;
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }, 0);
        });
      }
    });
  }

  /** Get user initials safely */
  getInitials(): string {
    if (!this.userDetails?.user) return '?';
    const first = this.userDetails.user.firstName?.charAt(0) || '';
    const last = this.userDetails.user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || '?';
  }

  /** Load user transactions */
  private loadTransactions(): void {
    if (!this.userId) return;

    this.isLoadingTransactions = true;
    this.adminUsersService.getUserTransactions(this.userId, 1, 50).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.transactions = response.data || [];
          this.isLoadingTransactions = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Failed to load transactions:', err);
          this.transactions = [];
          this.isLoadingTransactions = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  retryLoad(): void {
    this.loadUserDetails();
  }

  closeDrawer(): void {
    this.closed.emit();
  }

  onAction(type: DrawerAction['type']): void {
    this.actionTriggered.emit({ type });
  }

  /** Enter edit mode and populate form */
  enterEditMode(): void {
    if (!this.userDetails?.user) return;
    
    this.editForm.patchValue({
      firstName: this.userDetails.user.firstName || '',
      lastName: this.userDetails.user.lastName || '',
      email: this.userDetails.user.email || '',
      employeeId: this.userDetails.user.employeeId || ''
    });
    this.isEditMode = true;
    this.editError = null;
    this.cdr.detectChanges();
  }

  /** Cancel edit mode */
  cancelEdit(): void {
    this.isEditMode = false;
    this.editError = null;
    this.editForm.reset();
    this.cdr.detectChanges();
  }

  /** Save edit changes */
  saveEdit(): void {
    if (this.editForm.invalid || !this.userId) return;

    this.isSaving = true;
    this.editError = null;
    this.cdr.detectChanges();

    // Send all fields to backend (admin can edit email and employeeId)
    const request: UpdateUserRequest = {
      firstName: this.editForm.value.firstName?.trim(),
      lastName: this.editForm.value.lastName?.trim(),
      email: this.editForm.value.email?.trim(),
      employeeId: this.editForm.value.employeeId?.trim() || null
    };

    this.adminUsersService.updateUser(this.userId, request).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.isSaving = false;
          this.isEditMode = false;
          // Reload user details to show updated data
          this.loadUserDetails();
          // Notify parent that user was updated
          this.actionTriggered.emit({ type: 'user-updated', data: { userId: this.userId } });
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isSaving = false;
          this.editError = err.message || 'Failed to update user';
          this.cdr.detectChanges();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
