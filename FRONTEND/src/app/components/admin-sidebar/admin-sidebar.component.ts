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
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  currentUser: any;
  isCollapsed = false;
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: '??',
      path: '/admin/dashboard'
    },
    {
      label: 'Users',
      icon: '??',
      path: '/admin/users'
    },
    {
      label: 'Products',
      icon: '??',
      path: '/admin/products'
    },
    {
      label: 'Events',
      icon: '??',
      path: '/admin/events'
    },
    {
      label: 'Redemptions',
      icon: '??',
      path: '/admin/redemptions'
    },
    {
      label: 'Transactions / Audit',
      icon: '??',
      path: '/admin/transactions'
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
