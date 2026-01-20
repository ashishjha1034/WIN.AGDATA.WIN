import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserDashboardStats, UserTransaction, UserEvent, RedemptionStatusCounts } from '../../../services/user-dashboard.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent]
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  currentUser: any;
  isLoading = true;
  errorMessage: string | null = null;
  public Math = Math;

  // Dashboard data
  stats: UserDashboardStats = {
    currentBalance: 0,
    pointsEarned: 0,
    pointsRedeemed: 0,
    eventsRegistered: 0
  };

  recentTransactions: UserTransaction[] = [];
  upcomingEvents: UserEvent[] = [];
  redemptionCounts: RedemptionStatusCounts = {
    pending: 0,
    approved: 0,
    delivered: 0
  };

  searchQuery = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadDashboardData();
        }
      });
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    console.log('Loading dashboard data...');

    // Load all dashboard data in parallel using forkJoin
    forkJoin({
      stats: this.userDashboardService.getUserStats(),
      transactions: this.userDashboardService.getRecentTransactions(4),
      events: this.userDashboardService.getUpcomingEvents(2),
      redemptionCounts: this.userDashboardService.getRedemptionStatusCounts()
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Use setTimeout to ensure change detection happens after data is set
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }, 0);
        })
      )
      .subscribe({
        next: (results) => {
          console.log('Dashboard data loaded:', results);
          this.stats = results.stats;
          this.recentTransactions = results.transactions;
          this.upcomingEvents = results.events;
          this.redemptionCounts = results.redemptionCounts;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading dashboard data:', error);
          this.errorMessage = 'Failed to load dashboard data. Some information may be unavailable.';
          this.cdr.detectChanges();
        }
      });
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // Implement search functionality if needed
  }

  viewAllTransactions(): void {
    this.router.navigateByUrl('/user/transactions');
  }

  viewAllEvents(): void {
    this.router.navigateByUrl('/user/events');
  }

  browseRewards(): void {
    this.router.navigateByUrl('/user/products');
  }

  viewRedemptions(): void {
    this.router.navigateByUrl('/user/redemptions');
  }

  getTransactionClass(points: number): string {
    return points >= 0 ? 'positive' : 'negative';
  }

  getEventStatusBadgeClass(event: UserEvent): string {
    if (event.registrationStatus === 'Registered') {
      return 'registered';
    }
    if (event.spotsLeft && event.spotsLeft <= 5) {
      return 'spots-left';
    }
    return 'available';
  }

  getEventStatusText(event: UserEvent): string {
    if (event.registrationStatus === 'Registered') {
      return 'Registered';
    }
    if (event.spotsLeft !== undefined) {
      return `${event.spotsLeft} Spots Left`;
    }
    return 'Available';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
