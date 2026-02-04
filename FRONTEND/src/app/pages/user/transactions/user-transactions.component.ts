import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserDashboardStats } from '../../../services/user-dashboard.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { UserPageHeaderComponent } from '../../../components/user-page-header/user-page-header.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { utcToIst } from '../../../shared/utils/ist-timezone.utils';

export interface Transaction {
  id: string;
  type: string;
  description: string;
  points: number;
  amount: number;
  source: string;
  sourceId: string | null;
  balanceAfter: number;
  processedBy: string | null;
  timestamp: string;
}

export interface TransactionFilters {
  type: 'all' | 'earned' | 'redeemed' | 'refunded' | 'adjusted';
  startDate: string | null;
  endDate: string | null;
  searchQuery: string;
}

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent, UserPageHeaderComponent, PaginationComponent]
})
export class UserTransactionsComponent implements OnInit, OnDestroy {
  currentUser: any;
  userPoints = 0;
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  stats: UserDashboardStats | null = null;
  isLoading = true;
  showFilters = true;
  
  // Filters
  filters: TransactionFilters = {
    type: 'all',
    startDate: null,
    endDate: null,
    searchQuery: ''
  };
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalTransactions = 0;
  pageSizeOptions = [10, 20, 50, 100];
  
  // Detail drawer
  selectedTransaction: Transaction | null = null;
  isDrawerOpen = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Subscribe to query params for URL-driven filtering
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        // Apply type filter from URL
        if (params['type']) {
          const typeParam = params['type'].toLowerCase();
          if (['all', 'earned', 'redeemed', 'refunded', 'adjusted'].includes(typeParam)) {
            this.filters.type = typeParam as TransactionFilters['type'];
          }
        }
        // If data is already loaded, re-apply filters
        if (this.transactions.length > 0) {
          this.applyFilters();
        }
      });

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadData();
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

  loadData(): void {
    this.isLoading = true;
    
    forkJoin({
      transactions: this.userDashboardService.getAllTransactions(),
      stats: this.userDashboardService.getUserStats()
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
      next: ({ transactions, stats }) => {
        // Map and calculate balanceAfter for each transaction
        this.transactions = this.processTransactions(transactions, stats.currentBalance);
        this.stats = stats;
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  private processTransactions(transactions: any[], currentBalance: number): Transaction[] {
    // Sort by timestamp descending (newest first)
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.createdAt || b.timestamp).getTime() - new Date(a.createdAt || a.timestamp).getTime()
    );
    
    // Calculate balance after for each transaction (going backwards from current)
    let runningBalance = currentBalance;
    const processed = sorted.map(t => {
      const amount = t.points ?? t.amount ?? 0;
      const balanceAfter = t.balanceAfter ?? runningBalance;
      runningBalance = balanceAfter - amount; // Calculate what balance was before this transaction
      
      return {
        id: t.id,
        type: t.type || 'Transaction',
        description: t.description || t.type || '',
        points: amount,
        amount: amount,
        source: t.source || this.inferSource(t.description || t.type || ''),
        sourceId: t.sourceId || null,
        balanceAfter: balanceAfter,
        processedBy: t.processedBy || null,
        timestamp: t.createdAt || t.timestamp
      };
    });
    
    return processed;
  }

  private inferSource(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('event') || desc.includes('participation') || desc.includes('contest') || 
        desc.includes('challenge') || desc.includes('bonus points') || desc.includes('quarterly')) {
      return 'Event';
    }
    if (desc.includes('redemption') || desc.includes('gift card') || desc.includes('reward')) {
      return 'Product';
    }
    if (desc.includes('admin') || desc.includes('adjustment')) {
      return 'Admin';
    }
    return 'System';
  }

  applyFilters(): void {
    let filtered = [...this.transactions];
    
    // Filter by type
    if (this.filters.type !== 'all') {
      filtered = filtered.filter(t => {
        const type = t.type.toLowerCase();
        if (this.filters.type === 'earned') {
          return type === 'earned';
        } else if (this.filters.type === 'redeemed') {
          return type === 'redeemed';
        } else if (this.filters.type === 'refunded') {
          return type === 'refunded';
        } else if (this.filters.type === 'adjusted') {
          return type === 'adjusted';
        }
        return true;
      });
    }
    
    // Filter by date range
    if (this.filters.startDate) {
      const start = new Date(this.filters.startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter(t => new Date(t.timestamp) >= start);
    }
    
    if (this.filters.endDate) {
      const end = new Date(this.filters.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => new Date(t.timestamp) <= end);
    }
    
    // Filter by search query
    if (this.filters.searchQuery.trim()) {
      const query = this.filters.searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(query) ||
        t.source.toLowerCase().includes(query)
      );
    }
    
    this.totalTransactions = filtered.length;
    this.filteredTransactions = filtered;
    
    // Reset to first page when filters change
    this.currentPage = 1;
  }

  get paginatedTransactions(): Transaction[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredTransactions.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.totalTransactions / this.pageSize);
  }

  get showingFrom(): number {
    if (this.totalTransactions === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingTo(): number {
    const to = this.currentPage * this.pageSize;
    return Math.min(to, this.totalTransactions);
  }

  get hasFiltersApplied(): boolean {
    return this.filters.type !== 'all' ||
           this.filters.startDate !== null ||
           this.filters.endDate !== null ||
           this.filters.searchQuery.trim() !== '';
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (current > 3) {
        pages.push('...');
      }
      
      // Show pages around current
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (current < total - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(total)) {
        pages.push(total);
      }
    }
    
    return pages;
  }

  // Filter actions
  setTypeFilter(type: 'all' | 'earned' | 'redeemed' | 'refunded' | 'adjusted'): void {
    this.filters.type = type;
    // Update URL query params
    const queryParams = type === 'all' ? {} : { type };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: type === 'all' ? '' : 'merge'
    });
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onDateChange(): void {
    this.applyFilters();
  }

  onTypeFilter(type: TransactionFilters['type']): void {
    this.filters.type = type;
    this.currentPage = 1;
    this.applyFilters();
    this.cdr.detectChanges();
  }

  resetFilters(): void {
    this.filters = {
      type: 'all',
      startDate: null,
      endDate: null,
      searchQuery: ''
    };
    // Clear URL query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
    this.applyFilters();
  }

  // Pagination actions
  goToPage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
  }

  // Transaction detail drawer
  openTransactionDetail(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    setTimeout(() => {
      this.selectedTransaction = null;
    }, 300);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('drawer-overlay')) {
      this.closeDrawer();
    }
  }

  // Helper methods
  getTransactionClass(points: number, type?: string): string {
    // If type is provided, use it to determine class
    if (type) {
      const typeLower = type.toLowerCase();
      // Redeemed transactions should always show as negative (red)
      if (typeLower === 'redeemed') return 'negative';
      // Earned and Refunded transactions should show as positive (green)
      if (typeLower === 'earned' || typeLower === 'refunded') return 'positive';
    }
    // Fallback to points-based logic
    return points >= 0 ? 'positive' : 'negative';
  }

  formatPoints(points: number, type?: string): string {
    // Show just 0 if points is zero
    if (points === 0) return '0';
    // Determine the effective sign based on transaction type
    if (type) {
      const typeLower = type.toLowerCase();
      // Redeemed transactions should show as negative
      if (typeLower === 'redeemed') {
        return `-${Math.abs(points).toLocaleString()}`;
      }
      // Earned and Refunded transactions should show as positive
      if (typeLower === 'earned' || typeLower === 'refunded') {
        return `+${Math.abs(points).toLocaleString()}`;
      }
    }
    // Fallback to original logic
    const prefix = points > 0 ? '+' : '';
    return `${prefix}${points.toLocaleString()}`;
  }

  getBalanceBefore(transaction: Transaction): number {
    // Calculate balance before based on transaction type
    // Points are stored as positive values
    const type = transaction.type?.toLowerCase();
    if (type === 'redeemed') {
      // For redeemed, balance before was higher (add back the points)
      return transaction.balanceAfter + Math.abs(transaction.points);
    }
    // For earned/refunded, balance before was lower (subtract the points)
    return transaction.balanceAfter - Math.abs(transaction.points);
  }

  getSourceFontAwesomeClass(source: string): string {
    switch (source.toLowerCase()) {
      case 'event':
        return 'fa-solid fa-calendar-check';
      case 'product':
        return 'fa-solid fa-gift';
      case 'admin':
        return 'fa-solid fa-gear';
      default:
        return 'fa-solid fa-clipboard-list';
    }
  }

  getSourceClass(source: string): string {
    return `source-${source.toLowerCase()}`;
  }

  getTypeLabel(type: string): string {
    const typeLower = type.toLowerCase();
    if (typeLower === 'earned') return 'Earned';
    if (typeLower === 'redeemed') return 'Redeemed';
    if (typeLower === 'refunded') return 'Refunded';
    if (typeLower === 'adjusted') return 'Adjusted';
    return type;
  }

  getTypeBadgeClass(type: string): string {
    const typeLower = type.toLowerCase();
    if (typeLower === 'earned') return 'type-earned';
    if (typeLower === 'redeemed') return 'type-redeemed';
    if (typeLower === 'refunded') return 'type-refunded';
    if (typeLower === 'adjusted') return 'type-adjusted';
    return '';
  }

  getTransactionName(transaction: Transaction): string {
    const type = transaction.type?.toLowerCase();
    const desc = transaction.description?.toLowerCase() || '';
    
    // For refunded transactions
    if (type === 'refunded') {
      return 'Refunded by Admin';
    }
    
    // For event-related transactions
    if (transaction.source?.toLowerCase() === 'event' || desc.includes('event') || 
        desc.includes('participation') || desc.includes('contest')) {
      // Extract event name from description if possible
      const match = transaction.description?.match(/event:?\s*(.+?)(?:\s*-|$)/i);
      if (match && match[1]) {
        return match[1].trim();
      }
      return transaction.description || 'Event Participation';
    }
    
    // For product-related transactions
    if (transaction.source?.toLowerCase() === 'product' || desc.includes('redemption') || 
        desc.includes('gift card') || desc.includes('reward')) {
      // Extract product name from description if possible
      const match = transaction.description?.match(/(?:redeemed?|gift card|reward):?\s*(.+?)(?:\s*-|$)/i);
      if (match && match[1]) {
        return match[1].trim();
      }
      return transaction.description || 'Product Redemption';
    }
    
    // Default to description
    return transaction.description || type || 'Transaction';
  }

  formatFullDate(dateString: string): string {
    if (!dateString) return '';
    // Convert UTC to IST for display
    const istDate = utcToIst(dateString);
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    const weekday = istDate.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${weekday}, ${month} ${day}, ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }

  formatShortDate(dateString: string): string {
    if (!dateString) return '';
    const istDate = utcToIst(dateString);
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    return `${month} ${day}, ${year}`;
  }

  getProcessedByLabel(processedBy: string | null): string {
    if (!processedBy) return 'System';
    return 'Admin';
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
