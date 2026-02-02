import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogContainerComponent } from './shared/components/dialog-container.component';
import { ToastContainerComponent } from './shared/components/toast-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DialogContainerComponent, ToastContainerComponent]
})
export class AppComponent {
  title = 'WIN.AGDATA - Reward Points Management System';
}
