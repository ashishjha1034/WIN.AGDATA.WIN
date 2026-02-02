import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UnauthorizedComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Close dropdown if it was open
    document.addEventListener('click', (e: any) => {
      if (e.target.closest('.context-dropdown')) {
        return;
      }
    });
  }

  goBack(): void {
    // Check if we can go back in history
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // If no history, go to login
      this.router.navigateByUrl('/login');
    }
  }

  goHome(): void {
    // Clear auth data and redirect to login
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
