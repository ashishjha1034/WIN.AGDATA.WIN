import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.css']
})
export class UserPageHeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'Dashboard';
  @Input() showPointsBadge: boolean = false;
  @Input() pointsValue: number = 0;
  
  currentUser: any;
  isAdmin: boolean = false;
  viewingContext: 'admin' | 'employee' = 'employee';
  isContextDropdownOpen: boolean = false;
  
  private destroy$ = new Subject<void>();
  private readonly VIEWING_CONTEXT_KEY = 'agdata_viewing_context';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load saved viewing context
    this.loadViewingContext();
    
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.isAdmin = this.authService.isAdmin();
      });
  }

  private loadViewingContext(): void {
    const savedContext = localStorage.getItem(this.VIEWING_CONTEXT_KEY);
    if (savedContext === 'admin' || savedContext === 'employee') {
      this.viewingContext = savedContext;
    } else {
      // Default to employee for user pages
      this.viewingContext = 'employee';
    }
  }

  toggleContextDropdown(event: Event): void {
    event.stopPropagation();
    this.isContextDropdownOpen = !this.isContextDropdownOpen;
  }

  closeContextDropdown(): void {
    this.isContextDropdownOpen = false;
  }

  switchContext(context: 'admin' | 'employee'): void {
    this.viewingContext = context;
    localStorage.setItem(this.VIEWING_CONTEXT_KEY, context);
    this.isContextDropdownOpen = false;
    
    // Navigate to the appropriate dashboard
    if (context === 'admin') {
      this.router.navigateByUrl('/admin/dashboard');
    } else {
      this.router.navigateByUrl('/user/dashboard');
    }
  }

  getContextIcon(): string {
    return this.viewingContext === 'admin' ? 'fa-shield-halved' : 'fa-user';
  }

  getContextLabel(): string {
    return this.viewingContext === 'admin' ? 'Admin' : 'Employee';
  }

  onDocumentClick(event: Event): void {
    // Close dropdown when clicking outside
    this.isContextDropdownOpen = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
