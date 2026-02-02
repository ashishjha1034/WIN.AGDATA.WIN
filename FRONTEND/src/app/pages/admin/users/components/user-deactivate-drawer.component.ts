import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeactivateUserWarningData, DeactivateUserBlocked } from '../../../../models/user.models';

@Component({
  selector: 'app-user-deactivate-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="onCancel()"></div>
    <div class="drawer" [class.open]="isOpen">
      <div class="drawer-header">
        <div class="header-icon" [class.blocked]="isBlocked">
          <i class="fa-solid" [ngClass]="isBlocked ? 'fa-ban' : 'fa-triangle-exclamation'"></i>
        </div>
        <h2>{{ isBlocked ? 'Cannot Deactivate' : 'Deactivation Warning' }}</h2>
        <button class="close-btn" (click)="onCancel()" aria-label="Close">✕</button>
      </div>

      <div class="drawer-content">
        <!-- Blocked State -->
        <ng-container *ngIf="isBlocked && blockedData">
          <div class="blocked-section">
            <p class="blocked-intro">
              <strong>{{ userName }}</strong> cannot be deactivated due to the following reasons:
            </p>
            
            <div class="blocked-reasons">
              <div class="reason-item" *ngFor="let reason of blockedData.reasons">
                <i class="fa-solid fa-circle-xmark"></i>
                <span>{{ reason }}</span>
              </div>
            </div>

            <div class="blocked-details" *ngIf="blockedData.pendingRedemptionsCount > 0 || blockedData.approvedRedemptionsCount > 0 || blockedData.activeEventRegistrationsCount > 0">
              <h4>Details:</h4>
              <ul>
                <li *ngIf="blockedData.pendingRedemptionsCount > 0">
                  {{ blockedData.pendingRedemptionsCount }} pending redemption(s)
                </li>
                <li *ngIf="blockedData.approvedRedemptionsCount > 0">
                  {{ blockedData.approvedRedemptionsCount }} approved redemption(s) awaiting pickup
                </li>
                <li *ngIf="blockedData.activeEventRegistrationsCount > 0">
                  {{ blockedData.activeEventRegistrationsCount }} active event registration(s)
                </li>
                <li *ngIf="blockedData.targetIsAdmin">
                  User has Admin role
                </li>
                <li *ngIf="blockedData.selfDeactivation">
                  Self-deactivation is not allowed
                </li>
              </ul>
            </div>
          </div>
        </ng-container>

        <!-- Warning State -->
        <ng-container *ngIf="!isBlocked && warningData">
          <p class="warning-intro">
            You are about to deactivate <strong>{{ warningData.userName }}</strong>.
            Please review the following warnings:
          </p>

          <div class="warning-details">
            <!-- Points Balance Warning -->
            <div class="warning-item" *ngIf="warningData.pointsBalance > 0">
              <i class="fa-solid fa-coins"></i>
              <span>This user has <strong>{{ warningData.pointsBalance | number }} points</strong> remaining.</span>
            </div>

            <!-- Completed Events Warning -->
            <div class="warning-item" *ngIf="warningData.completedEventsCount > 0">
              <i class="fa-solid fa-calendar-check"></i>
              <span>Participated in <strong>{{ warningData.completedEventsCount }} completed event(s)</strong>.</span>
            </div>

            <!-- Completed Redemptions Warning -->
            <div class="warning-item" *ngIf="warningData.completedRedemptionsCount > 0">
              <i class="fa-solid fa-gift"></i>
              <span>Has <strong>{{ warningData.completedRedemptionsCount }} completed redemption(s)</strong>.</span>
            </div>

            <!-- Recent Activity Warning -->
            <div class="warning-item" *ngIf="warningData.daysSinceLastActivity !== undefined">
              <i class="fa-solid fa-clock"></i>
              <span>
                Last activity was <strong>{{ warningData.daysSinceLastActivity }} day(s) ago</strong>
                <ng-container *ngIf="warningData.lastActivityDate">
                  ({{ warningData.lastActivityDate | date:'mediumDate' }})
                </ng-container>.
              </span>
            </div>
          </div>

          <p class="confirmation-text">
            Are you sure you want to deactivate this user? They will no longer be able to access the system.
          </p>
        </ng-container>

        <!-- Loading State -->
        <div class="loading-state" *ngIf="isLoading">
          <div class="spinner"></div>
          <p>Processing deactivation...</p>
        </div>
      </div>

      <div class="drawer-footer">
        <button class="btn btn-secondary" (click)="onCancel()" [disabled]="isLoading">
          {{ isBlocked ? 'Close' : 'Cancel' }}
        </button>
        <button 
          class="btn btn-danger" 
          (click)="onConfirm()" 
          *ngIf="!isBlocked"
          [disabled]="isLoading">
          <i class="fa-solid fa-user-slash"></i>
          {{ isLoading ? 'Deactivating...' : 'Deactivate anyway' }}
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
      right: -420px;
      width: 420px;
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
      align-items: center;
      gap: 12px;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .header-icon {
      width: 40px;
      height: 40px;
      background: #fef3c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
      font-size: 18px;
      flex-shrink: 0;
    }

    .header-icon.blocked {
      background: #fee2e2;
      color: #dc2626;
    }

    .drawer-header h2 {
      flex: 1;
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

    /* Blocked State */
    .blocked-section {
      animation: slideIn 0.2s ease;
    }

    .blocked-intro {
      color: #374151;
      font-size: 15px;
      margin: 0 0 16px;
    }

    .blocked-reasons {
      background: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .reason-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #991b1b;
      font-size: 14px;
      line-height: 1.5;
    }

    .reason-item + .reason-item {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #fecaca;
    }

    .reason-item i {
      margin-top: 2px;
      flex-shrink: 0;
    }

    .blocked-details {
      background: #f9fafb;
      border-radius: 8px;
      padding: 16px;
    }

    .blocked-details h4 {
      margin: 0 0 8px;
      font-size: 13px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .blocked-details ul {
      margin: 0;
      padding-left: 20px;
      color: #374151;
      font-size: 14px;
    }

    .blocked-details li {
      margin-bottom: 4px;
    }

    /* Warning State */
    .warning-intro {
      color: #374151;
      font-size: 15px;
      margin: 0 0 16px;
    }

    .warning-details {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .warning-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #92400e;
      font-size: 14px;
      line-height: 1.5;
    }

    .warning-item + .warning-item {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #fde68a;
    }

    .warning-item i {
      margin-top: 2px;
      flex-shrink: 0;
    }

    .confirmation-text {
      color: #4b5563;
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }

    /* Loading State */
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #6b7280;
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

    @keyframes slideIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Footer */
    .drawer-footer {
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      border: 1px solid #d1d5db;
      color: #374151;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .btn-danger {
      background: #dc2626;
      border: 1px solid #dc2626;
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background: #b91c1c;
      border-color: #b91c1c;
    }

    @media (max-width: 640px) {
      .drawer {
        width: 100%;
        right: -100%;
      }
    }
  `]
})
export class UserDeactivateDrawerComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() isBlocked = false;
  @Input() isLoading = false;
  @Input() warningData: DeactivateUserWarningData | null = null;
  @Input() blockedData: DeactivateUserBlocked | null = null;
  @Input() userName = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    // Set userName from either data source
    if (changes['warningData'] && this.warningData?.userName) {
      this.userName = this.warningData.userName;
    }
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
