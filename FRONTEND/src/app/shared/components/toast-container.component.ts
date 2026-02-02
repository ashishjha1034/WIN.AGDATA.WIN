import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  template: `
    <div class="toast-container" role="region" aria-label="Notifications">
      <div
        *ngFor="let toast of toasts; trackBy: trackById"
        class="toast"
        [class.toast-error]="toast.type === 'error'"
        [class.toast-warning]="toast.type === 'warning'"
        [class.toast-success]="toast.type === 'success'"
        [class.toast-info]="toast.type === 'info'"
        @toastAnimation
        role="alert"
        [attr.aria-live]="toast.type === 'error' ? 'assertive' : 'polite'"
      >
        <div class="toast-content">
          <div class="toast-icon">
            <i class="fa-solid" [ngClass]="getIconClass(toast.type)"></i>
          </div>
          <div class="toast-text">
            <div class="toast-title">{{ toast.title }}</div>
            <div class="toast-message" *ngIf="toast.message">{{ toast.message }}</div>
          </div>
          <button
            class="toast-close"
            (click)="dismiss(toast.id)"
            aria-label="Close notification"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div
          class="toast-progress"
          [style.animation-duration.ms]="toast.duration"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
      pointer-events: none;
    }

    .toast {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      pointer-events: auto;
      min-width: 320px;
    }

    .toast-content {
      display: flex;
      align-items: flex-start;
      padding: 14px 16px;
      gap: 12px;
    }

    .toast-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .toast-text {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-weight: 600;
      font-size: 14px;
      color: #1f2937;
      line-height: 1.4;
    }

    .toast-message {
      font-size: 13px;
      color: #6b7280;
      margin-top: 2px;
      line-height: 1.4;
      word-wrap: break-word;
    }

    .toast-close {
      flex-shrink: 0;
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: #9ca3af;
      border-radius: 4px;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toast-close:hover {
      background: #f3f4f6;
      color: #6b7280;
    }

    .toast-close:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .toast-progress {
      height: 3px;
      background: rgba(0, 0, 0, 0.1);
      animation: progressShrink linear forwards;
    }

    @keyframes progressShrink {
      from { width: 100%; }
      to { width: 0%; }
    }

    /* Error toast */
    .toast-error {
      border-left: 4px solid #dc2626;
    }

    .toast-error .toast-icon {
      background: #fee2e2;
      color: #dc2626;
    }

    .toast-error .toast-progress {
      background: #dc2626;
    }

    /* Warning toast */
    .toast-warning {
      border-left: 4px solid #d97706;
    }

    .toast-warning .toast-icon {
      background: #fef3c7;
      color: #d97706;
    }

    .toast-warning .toast-progress {
      background: #d97706;
    }

    /* Success toast */
    .toast-success {
      border-left: 4px solid #16a34a;
    }

    .toast-success .toast-icon {
      background: #dcfce7;
      color: #16a34a;
    }

    .toast-success .toast-progress {
      background: #16a34a;
    }

    /* Info toast */
    .toast-info {
      border-left: 4px solid #2563eb;
    }

    .toast-info .toast-icon {
      background: #dbeafe;
      color: #2563eb;
    }

    .toast-info .toast-progress {
      background: #2563eb;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .toast-container {
        left: 12px;
        right: 12px;
        bottom: 12px;
      }

      .toast {
        min-width: auto;
      }
    }
  `]
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    // Dismiss the most recent toast on Escape
    if (this.toasts.length > 0) {
      this.dismiss(this.toasts[this.toasts.length - 1].id);
    }
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  trackById(index: number, toast: Toast): string {
    return toast.id;
  }

  getIconClass(type: Toast['type']): string {
    switch (type) {
      case 'error':
        return 'fa-circle-exclamation';
      case 'warning':
        return 'fa-triangle-exclamation';
      case 'success':
        return 'fa-circle-check';
      case 'info':
        return 'fa-circle-info';
      default:
        return 'fa-circle-info';
    }
  }
}
