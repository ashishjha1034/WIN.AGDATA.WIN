import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDashboardService, UserTransaction } from '../../../services/user-dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent]
})
export class UserTransactionsComponent implements OnInit, OnDestroy {
  currentUser: any;
  transactions: UserTransaction[] = [];
  isLoading = true;
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
          this.loadTransactions();
        }
      });
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.userDashboardService.getAllTransactions()
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
        next: (transactions) => {
          this.transactions = transactions;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
        }
      });
  }

  getTransactionClass(points: number): string {
    return points >= 0 ? 'positive' : 'negative';
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
