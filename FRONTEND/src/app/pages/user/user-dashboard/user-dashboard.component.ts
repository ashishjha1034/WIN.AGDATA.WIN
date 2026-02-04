import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserDashboardStats, UserTransaction, UserEvent, RedemptionStatusCounts, TopProduct } from '../../../services/user-dashboard.service';
import { Subject, forkJoin, interval, Subscription } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { UserPageHeaderComponent } from '../../../components/user-page-header/user-page-header.component';
import { utcToIst } from '../../../shared/utils/ist-timezone.utils';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, UserPageHeaderComponent]
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  currentUser: any;
  userPoints = 0;
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
  topProducts: TopProduct[] = [];
  redemptionCounts: RedemptionStatusCounts = {
    pending: 0,
    approved: 0,
    delivered: 0,
    rejected: 0
  };

  // Carousel state
  carouselIndex = 0;
  carouselPaused = false;
  private carouselSubscription: Subscription | null = null;
  private readonly CAROUSEL_INTERVAL = 2500; // 2.5 seconds between slides
  private readonly CAROUSEL_ITEMS_PER_VIEW = 4; // Items visible at once
  private readonly CAROUSEL_TRANSITION_DURATION = 400; // ms

  searchQuery = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadDashboardData();
          this.loadUserPoints();
        }
      });
  }

  loadUserPoints(): void {
    this.userDashboardService.getUserPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (points) => {
          this.userPoints = points;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error loading user points:', error)
      });
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    console.log('Loading dashboard data...');

    // Load all dashboard data in parallel using forkJoin
    forkJoin({
      stats: this.userDashboardService.getUserStats(),
      transactions: this.userDashboardService.getRecentTransactions(5),
      events: this.userDashboardService.getUpcomingEvents(3),
      redemptionCounts: this.userDashboardService.getRedemptionStatusCounts(),
      topProducts: this.userDashboardService.getTopProducts(12)
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
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
          this.topProducts = results.topProducts;
          
          // Start carousel auto-slide if we have enough products
          if (this.topProducts.length > this.CAROUSEL_ITEMS_PER_VIEW) {
            this.startCarousel();
          }
          
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading dashboard data:', error);
          this.errorMessage = 'Failed to load dashboard data. Some information may be unavailable.';
          this.cdr.detectChanges();
        }
      });
  }

  // ==================== KPI Navigation ====================
  
  navigateToBalance(): void {
    this.router.navigateByUrl('/user/transactions');
  }

  navigateToEarned(): void {
    this.router.navigate(['/user/transactions'], { queryParams: { type: 'earned' } });
  }

  navigateToRedeemed(): void {
    this.router.navigate(['/user/transactions'], { queryParams: { type: 'redeemed' } });
  }

  navigateToEventsRegistered(): void {
    this.router.navigate(['/user/events'], { queryParams: { tab: 'All' } });
  }

  // ==================== Card Navigation ====================

  viewAllTransactions(): void {
    this.router.navigateByUrl('/user/transactions');
  }

  viewAllEvents(): void {
    this.router.navigate(['/user/events'], { queryParams: { status: 'Upcoming' } });
  }

  browseRewards(): void {
    this.router.navigateByUrl('/user/products');
  }

  viewRedemptions(): void {
    this.router.navigateByUrl('/user/redemptions');
  }

  navigateToRedemptions(status: string): void {
    this.router.navigate(['/user/redemptions'], { queryParams: { status } });
  }

  navigateToEvent(event: UserEvent): void {
    this.router.navigate(['/user/events'], { queryParams: { eventId: event.id } });
  }

  // ==================== Carousel Controls ====================

  startCarousel(): void {
    this.stopCarousel();
    this.carouselSubscription = interval(this.CAROUSEL_INTERVAL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.carouselPaused) {
          this.nextSlide();
        }
      });
  }

  stopCarousel(): void {
    if (this.carouselSubscription) {
      this.carouselSubscription.unsubscribe();
      this.carouselSubscription = null;
    }
  }

  onCarouselMouseEnter(): void {
    this.carouselPaused = true;
  }

  onCarouselMouseLeave(): void {
    this.carouselPaused = false;
  }

  nextSlide(): void {
    // Continuously advance through products
    // Since we have topProducts array, just keep incrementing
    this.carouselIndex++;
  }

  prevSlide(): void {
    this.carouselIndex = this.carouselIndex === 0 ? Math.max(0, this.topProducts.length - 1) : this.carouselIndex - 1;
  }

  getCarouselTransform(): string {
    const itemWidth = 100 / this.CAROUSEL_ITEMS_PER_VIEW;
    // Use modulo to create infinite loop effect
    const normalizedIndex = this.carouselIndex % this.topProducts.length;
    return `translateX(-${normalizedIndex * itemWidth}%)`;
  }

  // ==================== Helper Methods ====================

  getTransactionClass(points: number): string {
    return points >= 0 ? 'positive' : 'negative';
  }

  formatTransactionPoints(transaction: UserTransaction): string {
    const points = transaction.points ?? transaction.amount ?? 0;
    const type = (transaction.type || '').toLowerCase();
    
    // Show just 0 if points is zero
    if (points === 0) return '0';
    // Redeemed should show negative
    if (type === 'redeemed') {
      return `-${Math.abs(points).toLocaleString()}`;
    }
    // Earned, Refunded show positive
    return `+${Math.abs(points).toLocaleString()}`;
  }

  getTransactionPointsClass(transaction: UserTransaction): string {
    const type = (transaction.type || '').toLowerCase();
    return type === 'redeemed' ? 'negative' : 'positive';
  }

  getEventStatusBadgeClass(event: UserEvent): string {
    if (event.registrationStatus === 'Registered') {
      return 'registered';
    }
    if (event.spotsLeft !== undefined && event.spotsLeft <= 5) {
      return 'spots-left';
    }
    return 'available';
  }

  getEventStatusText(event: UserEvent): string {
    if (event.registrationStatus === 'Registered') {
      return 'Registered';
    }
    if (event.spotsLeft !== undefined) {
      return `${event.spotsLeft} spots left`;
    }
    return 'Register now';
  }

  formatEventDate(dateStr: string): string {
    if (!dateStr) return '';
    const istDate = utcToIst(dateStr);
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    return `${month} ${day}`;
  }

  // Calculate "Not Delivered" count for redemption status card
  getNotDeliveredCount(): number {
    return this.redemptionCounts.rejected;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
