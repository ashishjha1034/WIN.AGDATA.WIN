import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UnauthorizedComponent {
  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    window.location.href = '/login';
  }
}
