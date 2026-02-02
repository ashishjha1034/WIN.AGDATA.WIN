import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { DialogService, DialogType } from '../../services/dialog.service';

interface DialogItem {
  id: string;
  type: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  isLeaving?: boolean;
}

@Component({
  selector: 'app-dialog-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Toast Notifications (top-right) -->
    <div class="toast-container" *ngIf="toasts.length > 0">
      <div 
        *ngFor="let toast of toasts; trackBy: trackById"
        class="toast-item"
        [class.toast-success]="toast.type === 'success'"
        [class.toast-error]="toast.type === 'error'"
        [class.toast-warning]="toast.type === 'warning'"
        [class.toast-info]="toast.type === 'info'"
        [class.leaving]="toast.isLeaving"
        [@slideIn]="toast.isLeaving ? 'leave' : 'enter'"
      >
        <div class="toast-icon">
          <svg *ngIf="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg *ngIf="toast.type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <svg *ngIf="toast.type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <svg *ngIf="toast.type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div class="toast-content">
          <span class="toast-title" *ngIf="toast.title">{{ toast.title }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button 
          *ngIf="toast.showCloseButton" 
          class="toast-close" 
          (click)="closeDialog(toast.id)"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="toast-progress" [class.paused]="toast.isLeaving"></div>
      </div>
    </div>

    <!-- Confirm Dialog (modal) -->
    <div class="modal-overlay" *ngIf="confirmDialogs.length > 0" (click)="onOverlayClick($event)">
      <div 
        class="confirm-dialog" 
        *ngFor="let dialog of confirmDialogs; trackBy: trackById"
        [@fadeScale]
        (click)="$event.stopPropagation()"
      >
        <div class="dialog-icon" [class]="'icon-' + dialog.type">
          <svg *ngIf="dialog.type === 'confirm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 class="dialog-title">{{ dialog.title }}</h3>
        <p class="dialog-message">{{ dialog.message }}</p>
        <div class="dialog-actions">
          <button class="btn-cancel" (click)="onCancel(dialog.id)">
            {{ dialog.cancelText || 'Cancel' }}
          </button>
          <button class="btn-confirm" (click)="onConfirm(dialog.id)">
            {{ dialog.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Toast Container */
    .toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
      width: 100%;
      pointer-events: none;
    }

    /* Toast Item */
    .toast-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px 20px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
      border-left: 4px solid;
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .toast-item.leaving {
      animation: slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    /* Toast Types */
    .toast-success {
      border-left-color: #10b981;
    }
    .toast-success .toast-icon {
      color: #10b981;
      background: #ecfdf5;
    }

    .toast-error {
      border-left-color: #ef4444;
    }
    .toast-error .toast-icon {
      color: #ef4444;
      background: #fef2f2;
    }

    .toast-warning {
      border-left-color: #f59e0b;
    }
    .toast-warning .toast-icon {
      color: #f59e0b;
      background: #fffbeb;
    }

    .toast-info {
      border-left-color: #3b82f6;
    }
    .toast-info .toast-icon {
      color: #3b82f6;
      background: #eff6ff;
    }

    /* Toast Icon */
    .toast-icon {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .toast-icon svg {
      width: 20px;
      height: 20px;
    }

    /* Toast Content */
    .toast-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .toast-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.4;
    }

    .toast-message {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
      word-wrap: break-word;
    }

    /* Toast Close Button */
    .toast-close {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      transition: all 0.2s ease;
      margin: -4px -8px -4px 0;
    }
    .toast-close:hover {
      background: #f3f4f6;
      color: #6b7280;
    }
    .toast-close svg {
      width: 16px;
      height: 16px;
    }

    /* Toast Progress Bar */
    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: currentColor;
      opacity: 0.3;
      animation: progress 4s linear forwards;
    }
    .toast-success .toast-progress { background: #10b981; }
    .toast-error .toast-progress { background: #ef4444; animation-duration: 6s; }
    .toast-warning .toast-progress { background: #f59e0b; animation-duration: 5s; }
    .toast-info .toast-progress { background: #3b82f6; }

    .toast-progress.paused {
      animation-play-state: paused;
    }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }

    /* Modal Overlay */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Confirm Dialog */
    .confirm-dialog {
      background: #ffffff;
      border-radius: 16px;
      padding: 32px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Dialog Icon */
    .dialog-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-icon svg {
      width: 32px;
      height: 32px;
    }
    .dialog-icon.icon-confirm {
      background: #fef3c7;
      color: #f59e0b;
    }

    /* Dialog Title */
    .dialog-title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 12px;
      line-height: 1.3;
    }

    /* Dialog Message */
    .dialog-message {
      font-size: 15px;
      color: #6b7280;
      margin: 0 0 28px;
      line-height: 1.6;
    }

    /* Dialog Actions */
    .dialog-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .dialog-actions button {
      flex: 1;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #4b5563;
    }
    .btn-cancel:hover {
      background: #e5e7eb;
      color: #374151;
    }

    .btn-confirm {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    }
    .btn-confirm:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .toast-item {
        background: #1f2937;
      }
      .toast-title {
        color: #f9fafb;
      }
      .toast-message {
        color: #9ca3af;
      }
      .toast-close:hover {
        background: #374151;
        color: #d1d5db;
      }
      
      .confirm-dialog {
        background: #1f2937;
      }
      .dialog-title {
        color: #f9fafb;
      }
      .dialog-message {
        color: #9ca3af;
      }
      .btn-cancel {
        background: #374151;
        color: #d1d5db;
      }
      .btn-cancel:hover {
        background: #4b5563;
        color: #f9fafb;
      }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .toast-container {
        top: 12px;
        right: 12px;
        left: 12px;
        max-width: none;
      }
      .toast-item {
        padding: 14px 16px;
      }
      .confirm-dialog {
        padding: 24px;
        margin: 16px;
      }
      .dialog-actions {
        flex-direction: column-reverse;
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      state('enter', style({ opacity: 1, transform: 'translateX(0)' })),
      state('leave', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)')
      ]),
      transition('* => leave', [
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)')
      ])
    ]),
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('250ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class DialogContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  toasts: DialogItem[] = [];
  confirmDialogs: DialogItem[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.dialogs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dialogs => {
        // Separate toasts from confirm dialogs
        this.toasts = dialogs
          .filter(d => d.config.type !== 'confirm')
          .map(d => ({
            id: d.id,
            type: d.config.type,
            title: d.config.title,
            message: d.config.message,
            showCloseButton: d.config.showCloseButton
          }));
        
        this.confirmDialogs = dialogs
          .filter(d => d.config.type === 'confirm')
          .map(d => ({
            id: d.id,
            type: d.config.type,
            title: d.config.title,
            message: d.config.message,
            confirmText: d.config.confirmText,
            cancelText: d.config.cancelText
          }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, item: DialogItem): string {
    return item.id;
  }

  closeDialog(id: string): void {
    // Add leaving animation
    const toast = this.toasts.find(t => t.id === id);
    if (toast) {
      toast.isLeaving = true;
      setTimeout(() => {
        this.dialogService.close(id, false);
      }, 300);
    } else {
      this.dialogService.close(id, false);
    }
  }

  onConfirm(id: string): void {
    this.dialogService.close(id, true);
  }

  onCancel(id: string): void {
    this.dialogService.close(id, false);
  }

  onOverlayClick(event: Event): void {
    // Only close if clicking on the overlay itself, not the dialog
    if (event.target === event.currentTarget && this.confirmDialogs.length > 0) {
      this.onCancel(this.confirmDialogs[this.confirmDialogs.length - 1].id);
    }
  }
}
