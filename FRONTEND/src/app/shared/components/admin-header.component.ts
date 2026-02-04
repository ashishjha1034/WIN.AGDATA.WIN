import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

type ViewingContext = 'admin' | 'employee';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">{{ title }}</h1>
      </div>
      <div class="header-right">
        <div class="user-info" *ngIf="currentUser">
          <span class="user-name">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
          
          <!-- Context Switch Dropdown -->
          <div class="context-switch-container">
            <button 
              class="user-role context-switch-trigger"
              (click)="toggleContextDropdown($event)"
              [attr.aria-expanded]="isContextDropdownOpen"
              aria-haspopup="listbox"
              aria-label="Switch viewing context">
              <i class="fa-solid fa-shield-halved"></i>
              <span>{{ viewingContext === 'admin' ? 'Admin' : 'Employee' }}</span>
              <i class="fa-solid fa-chevron-down dropdown-arrow" [class.rotated]="isContextDropdownOpen"></i>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              class="context-dropdown" 
              *ngIf="isContextDropdownOpen"
              role="listbox"
              aria-label="Viewing context options">
              <button 
                class="context-option"
                [class.active]="viewingContext === 'admin'"
                (click)="switchContext('admin')"
                role="option"
                [attr.aria-selected]="viewingContext === 'admin'">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Admin View</span>
                <i class="fa-solid fa-check check-icon" *ngIf="viewingContext === 'admin'"></i>
              </button>
              <button 
                class="context-option"
                [class.active]="viewingContext === 'employee'"
                (click)="switchContext('employee')"
                role="option"
                [attr.aria-selected]="viewingContext === 'employee'">
                <i class="fa-solid fa-user"></i>
                <span>Employee View</span>
                <i class="fa-solid fa-check check-icon" *ngIf="viewingContext === 'employee'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 32px;
      background: var(--ag-color-layer-01);
      border-bottom: 1px solid var(--ag-color-border-subtle);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .page-title {
      font: var(--ag-typo-h3);
      color: var(--ag-color-text-primary);
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-name {
      font: var(--ag-typo-body-02);
      color: var(--ag-color-text-primary);
      font-weight: 500;
    }

    /* Context Switch Dropdown */
    .context-switch-container {
      position: relative;
    }

    .context-switch-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--ag-color-background-brand);
      color: var(--ag-color-text-on-color);
      border: none;
      border-radius: 6px;
      font: var(--ag-typo-body-02);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .context-switch-trigger:hover {
      background: var(--ag-button-primary-hover);
    }

    .context-switch-trigger:focus {
      outline: 2px solid var(--ag-color-focus);
      outline-offset: 2px;
    }

    .dropdown-arrow {
      font-size: 10px;
      transition: transform 0.2s;
    }

    .dropdown-arrow.rotated {
      transform: rotate(180deg);
    }

    .context-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: 180px;
      background: var(--ag-color-layer-01);
      border: 1px solid var(--ag-color-border-subtle);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 4px;
      z-index: 100;
      animation: dropdownFadeIn 0.15s ease-out;
    }

    @keyframes dropdownFadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .context-option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      background: transparent;
      border: none;
      border-radius: 6px;
      font: var(--ag-typo-body-02);
      color: var(--ag-color-text-primary);
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
    }

    .context-option:hover {
      background: var(--ag-color-background-hover);
    }

    .context-option.active {
      background: var(--ag-color-background-selected);
      font-weight: 500;
    }

    .context-option .check-icon {
      margin-left: auto;
      color: var(--ag-color-background-brand);
      font-size: 12px;
    }

    @media (max-width: 768px) {
      .page-header {
        padding: 16px 20px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .page-title {
        font: var(--ag-typo-h4);
      }

      .user-name {
        display: none;
      }
    }
  `]
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  @Input() title = 'Dashboard';
  
  currentUser: any;
  viewingContext: ViewingContext = 'admin';
  isContextDropdownOpen = false;
  
  private readonly VIEWING_CONTEXT_KEY = 'agdata_viewing_context';
  private readonly RETURN_PATH_KEY = 'agdata_admin_return_path';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load saved viewing context
    const savedContext = localStorage.getItem(this.VIEWING_CONTEXT_KEY) as ViewingContext;
    if (savedContext === 'admin' || savedContext === 'employee') {
      this.viewingContext = savedContext;
    }

    // Subscribe to current user
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.context-switch-container')) {
      this.isContextDropdownOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isContextDropdownOpen = false;
  }

  toggleContextDropdown(event: Event): void {
    event.stopPropagation();
    this.isContextDropdownOpen = !this.isContextDropdownOpen;
  }

  switchContext(context: ViewingContext): void {
    if (context === this.viewingContext) {
      this.isContextDropdownOpen = false;
      return;
    }

    // Save current path before switching
    const currentPath = this.router.url;
    
    this.viewingContext = context;
    localStorage.setItem(this.VIEWING_CONTEXT_KEY, context);
    this.isContextDropdownOpen = false;

    if (context === 'employee') {
      // Save current admin path for return
      localStorage.setItem(this.RETURN_PATH_KEY, currentPath);
      // Navigate to employee dashboard
      this.router.navigateByUrl('/user/dashboard');
    } else {
      // Return to saved admin path or default dashboard
      const returnPath = localStorage.getItem(this.RETURN_PATH_KEY) || '/admin/dashboard';
      localStorage.removeItem(this.RETURN_PATH_KEY);
      this.router.navigateByUrl(returnPath);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
