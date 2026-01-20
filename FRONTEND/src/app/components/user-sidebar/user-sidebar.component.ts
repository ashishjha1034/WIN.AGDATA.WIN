import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class UserSidebarComponent implements OnInit, OnDestroy {
  currentUser: any;
  isCollapsed = false;
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      path: '/user/dashboard'
    },
    {
      label: 'Events',
      icon: '📅',
      path: '/user/events'
    },
    {
      label: 'Products',
      icon: '🎁',
      path: '/user/products'
    },
    {
      label: 'Redemptions',
      icon: '💳',
      path: '/user/redemptions'
    },
    {
      label: 'Transactions',
      icon: '📜',
      path: '/user/transactions'
    }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
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
