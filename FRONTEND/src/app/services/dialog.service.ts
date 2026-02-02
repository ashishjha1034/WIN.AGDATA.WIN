import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface DialogConfig {
  type: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  duration?: number; // Auto-close duration in ms (0 = no auto-close)
  showCloseButton?: boolean;
}

export interface DialogResult {
  confirmed: boolean;
}

interface ActiveDialog {
  id: string;
  config: DialogConfig;
  result$: Subject<DialogResult>;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogs: ActiveDialog[] = [];
  private dialogSubject = new Subject<ActiveDialog[]>();
  
  dialogs$ = this.dialogSubject.asObservable();

  constructor() {}

  /**
   * Show a success notification
   */
  success(message: string, title?: string, duration: number = 4000): void {
    this.show({
      type: 'success',
      title: title || 'Success',
      message,
      duration,
      showCloseButton: true
    });
  }

  /**
   * Show an error notification
   */
  error(message: string, title?: string, duration: number = 6000): void {
    this.show({
      type: 'error',
      title: title || 'Error',
      message,
      duration,
      showCloseButton: true
    });
  }

  /**
   * Show a warning notification
   */
  warning(message: string, title?: string, duration: number = 5000): void {
    this.show({
      type: 'warning',
      title: title || 'Warning',
      message,
      duration,
      showCloseButton: true
    });
  }

  /**
   * Show an info notification
   */
  info(message: string, title?: string, duration: number = 4000): void {
    this.show({
      type: 'info',
      title: title || 'Information',
      message,
      duration,
      showCloseButton: true
    });
  }

  /**
   * Show a confirmation dialog and return result
   */
  confirm(message: string, title?: string, confirmText: string = 'Confirm', cancelText: string = 'Cancel'): Observable<DialogResult> {
    const result$ = new Subject<DialogResult>();
    
    const dialog: ActiveDialog = {
      id: this.generateId(),
      config: {
        type: 'confirm',
        title: title || 'Confirm Action',
        message,
        confirmText,
        cancelText,
        duration: 0, // No auto-close for confirm dialogs
        showCloseButton: false
      },
      result$
    };

    this.dialogs.push(dialog);
    this.dialogSubject.next([...this.dialogs]);

    return result$.asObservable();
  }

  /**
   * Show a dialog with custom configuration
   */
  show(config: DialogConfig): string {
    const result$ = new Subject<DialogResult>();
    
    const dialog: ActiveDialog = {
      id: this.generateId(),
      config: {
        ...config,
        showCloseButton: config.showCloseButton ?? true
      },
      result$
    };

    this.dialogs.push(dialog);
    this.dialogSubject.next([...this.dialogs]);

    // Auto-close if duration is set
    if (config.duration && config.duration > 0) {
      setTimeout(() => {
        this.close(dialog.id);
      }, config.duration);
    }

    return dialog.id;
  }

  /**
   * Close a specific dialog
   */
  close(id: string, confirmed: boolean = false): void {
    const index = this.dialogs.findIndex(d => d.id === id);
    if (index !== -1) {
      const dialog = this.dialogs[index];
      dialog.result$.next({ confirmed });
      dialog.result$.complete();
      this.dialogs.splice(index, 1);
      this.dialogSubject.next([...this.dialogs]);
    }
  }

  /**
   * Close all dialogs
   */
  closeAll(): void {
    this.dialogs.forEach(dialog => {
      dialog.result$.next({ confirmed: false });
      dialog.result$.complete();
    });
    this.dialogs = [];
    this.dialogSubject.next([]);
  }

  /**
   * Get all active dialogs
   */
  getDialogs(): ActiveDialog[] {
    return [...this.dialogs];
  }

  private generateId(): string {
    return `dialog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
