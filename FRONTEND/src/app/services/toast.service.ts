import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  message?: string;
  duration: number;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  private readonly DEFAULT_DURATION = 6000; // 6 seconds
  private readonly MAX_TOASTS = 5;

  constructor() {}

  /**
   * Show an error toast
   */
  error(title: string, message?: string, duration?: number): void {
    this.addToast('error', title, message, duration);
  }

  /**
   * Show a warning toast
   */
  warning(title: string, message?: string, duration?: number): void {
    this.addToast('warning', title, message, duration);
  }

  /**
   * Show a success toast
   */
  success(title: string, message?: string, duration?: number): void {
    this.addToast('success', title, message, duration);
  }

  /**
   * Show an info toast
   */
  info(title: string, message?: string, duration?: number): void {
    this.addToast('info', title, message, duration);
  }

  /**
   * Parse and show error from HTTP response
   */
  showHttpError(error: any): void {
    let title = 'Error';
    let message = 'An unexpected error occurred';

    if (error?.error) {
      // Handle structured error responses
      if (error.error.message) {
        message = error.error.message;
      } else if (error.error.title) {
        title = error.error.title;
        message = error.error.detail || error.error.message || '';
      } else if (typeof error.error === 'string') {
        message = error.error;
      } else if (error.error.errors) {
        // Validation errors
        const errors = error.error.errors;
        const errorMessages: string[] = [];
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errorMessages.push(...errors[field]);
          }
        }
        message = errorMessages.join('. ') || 'Validation failed';
      }
    } else if (error?.message) {
      message = error.message;
    }

    // Map status codes to user-friendly titles
    if (error?.status) {
      switch (error.status) {
        case 400:
          title = 'Invalid Request';
          break;
        case 401:
          title = 'Unauthorized';
          message = message || 'Please log in again';
          break;
        case 403:
          title = 'Access Denied';
          message = message || 'You do not have permission for this action';
          break;
        case 404:
          title = 'Not Found';
          message = message || 'The requested resource was not found';
          break;
        case 409:
          title = 'Conflict';
          break;
        case 422:
          title = 'Cannot Process';
          break;
        case 429:
          title = 'Too Many Requests';
          message = 'Please wait before trying again';
          break;
        case 500:
          title = 'Server Error';
          message = message || 'Something went wrong on our end';
          break;
        case 0:
          title = 'Connection Error';
          message = 'Unable to connect to server';
          break;
      }
    }

    this.error(title, message);
  }

  /**
   * Dismiss a specific toast
   */
  dismiss(id: string): void {
    const current = this.toastsSubject.value;
    this.toastsSubject.next(current.filter(t => t.id !== id));
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.toastsSubject.next([]);
  }

  private addToast(type: Toast['type'], title: string, message?: string, duration?: number): void {
    const toast: Toast = {
      id: this.generateId(),
      type,
      title,
      message,
      duration: duration ?? this.DEFAULT_DURATION,
      createdAt: Date.now()
    };

    let current = this.toastsSubject.value;

    // Limit max toasts to prevent overflow
    if (current.length >= this.MAX_TOASTS) {
      current = current.slice(1);
    }

    this.toastsSubject.next([...current, toast]);

    // Auto-dismiss after duration
    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
