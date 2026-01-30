import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeactivateUserWarningData } from '../../../../models/user.models';

@Component({
  selector: 'app-user-deactivate-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="dialog-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      (click)="onOverlayClick($event)"
      (keydown)="onKeyDown($event)">
      
      <div class="dialog-container" #dialogContainer tabindex="-1">
        <!-- Header -->
        <div class="dialog-header">
          <div class="warning-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h2 id="dialog-title" class="dialog-title">Deactivation Warning</h2>
          <button 
            type="button" 
            class="close-btn" 
            (click)="onCancel()"
            aria-label="Close dialog">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="dialog-body" id="dialog-description">
          <p class="warning-text">
            You are about to deactivate <strong>{{ data?.userName }}</strong>.
          </p>
          
          <div class="warning-details">
            <!-- Points Balance Warning -->
            <div class="warning-item" *ngIf="hasPointsBalance">
              <i class="fa-solid fa-coins warning-icon-sm"></i>
              <span>This user has <strong>{{ data?.pointsBalance | number }} points</strong> remaining in their account.</span>
            </div>

            <!-- Completed Events Warning -->
            <div class="warning-item" *ngIf="hasCompletedEvents">
              <i class="fa-solid fa-calendar-check warning-icon-sm"></i>
              <span>
                Participated in <strong>{{ data?.completedEventsCount }} completed event{{ data?.completedEventsCount !== 1 ? 's' : '' }}</strong>.
              </span>
            </div>

            <!-- Completed Redemptions Warning -->
            <div class="warning-item" *ngIf="hasCompletedRedemptions">
              <i class="fa-solid fa-gift warning-icon-sm"></i>
              <span>
                Has <strong>{{ data?.completedRedemptionsCount }} completed redemption{{ data?.completedRedemptionsCount !== 1 ? 's' : '' }}</strong>.
              </span>
            </div>

            <!-- Recent Activity Warning -->
            <div class="warning-item" *ngIf="hasRecentActivity">
              <i class="fa-solid fa-clock warning-icon-sm"></i>
              <span>
                Last activity was <strong>{{ data?.daysSinceLastActivity }} day{{ data?.daysSinceLastActivity !== 1 ? 's' : '' }} ago</strong>
                <ng-container *ngIf="data?.lastActivityDate">
                  ({{ data?.lastActivityDate | date:'mediumDate' }})
                </ng-container>.
              </span>
            </div>
          </div>

          <p class="confirmation-question">
            Are you sure you want to deactivate this user? They will no longer be able to access the system.
          </p>
        </div>

        <!-- Footer -->
        <div class="dialog-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            (click)="onCancel()"
            #cancelButton>
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-danger" 
            (click)="onConfirm()"
            #confirmButton>
            <i class="fa-solid fa-user-slash"></i>
            Deactivate anyway
          </button>
        </div>
      </div>

      <!-- Live region for screen readers -->
      <div class="sr-only" aria-live="polite" aria-atomic="true">
        {{ announcement }}
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      max-width: 480px;
      width: 90%;
      max-height: 90vh;
      overflow: hidden;
      animation: slideIn 0.2s ease-out;
    }

    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .dialog-header {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
      gap: 12px;
    }

    .warning-icon {
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

    .dialog-title {
      flex: 1;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: #6b7280;
      border-radius: 6px;
      transition: all 0.15s;
    }

    .close-btn:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .close-btn:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .dialog-body {
      padding: 20px;
    }

    .warning-text {
      margin: 0 0 16px 0;
      color: #374151;
      font-size: 15px;
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

    .warning-icon-sm {
      margin-top: 2px;
      flex-shrink: 0;
      width: 16px;
    }

    .confirmation-question {
      margin: 0;
      color: #4b5563;
      font-size: 14px;
      font-weight: 500;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
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

    .btn:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .btn-secondary {
      background: white;
      border: 1px solid #d1d5db;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .btn-danger {
      background: #dc2626;
      border: 1px solid #dc2626;
      color: white;
    }

    .btn-danger:hover {
      background: #b91c1c;
      border-color: #b91c1c;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class UserDeactivateConfirmationDialogComponent implements AfterViewInit, OnDestroy {
  @Input() data: DeactivateUserWarningData | null = null;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('dialogContainer') dialogContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('cancelButton') cancelButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('confirmButton') confirmButton!: ElementRef<HTMLButtonElement>;

  // Computed properties for null-safe template conditions
  get hasPointsBalance(): boolean {
    return !!this.data?.pointsBalance && this.data.pointsBalance > 0;
  }

  get hasCompletedEvents(): boolean {
    return !!this.data?.completedEventsCount && this.data.completedEventsCount > 0;
  }

  get hasCompletedRedemptions(): boolean {
    return !!this.data?.completedRedemptionsCount && this.data.completedRedemptionsCount > 0;
  }

  get hasRecentActivity(): boolean {
    return this.data?.daysSinceLastActivity !== undefined && this.data.daysSinceLastActivity !== null;
  }

  announcement = '';
  private previousActiveElement: Element | null = null;
  private focusableElements: HTMLElement[] = [];

  ngAfterViewInit(): void {
    this.previousActiveElement = document.activeElement;
    setTimeout(() => {
      if (this.cancelButton) {
        this.cancelButton.nativeElement.focus();
      }
      this.setupFocusTrap();
      this.announce('User deactivation warning dialog opened. Review the warnings and choose an action.');
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus();
    }
  }

  private setupFocusTrap(): void {
    if (!this.dialogContainer) return;
    const container = this.dialogContainer.nativeElement;
    this.focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.onCancel();
      return;
    }
    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
    if (event.key === 'Enter' && event.target === this.confirmButton?.nativeElement) {
      event.preventDefault();
      this.onConfirm();
    }
  }

  private handleTabKey(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  onConfirm(): void {
    this.announce('Deactivating user...');
    this.confirm.emit();
  }

  onCancel(): void {
    this.announce('Deactivation cancelled.');
    this.cancel.emit();
  }

  private announce(message: string): void {
    this.announcement = '';
    setTimeout(() => {
      this.announcement = message;
    }, 100);
  }
}
