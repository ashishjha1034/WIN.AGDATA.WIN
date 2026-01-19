import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetail } from '../../../../models/event.models';

@Component({
  selector: 'app-event-detail-overview',
  templateUrl: './event-detail-overview.component.html',
  styleUrls: ['./event-detail-overview.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EventDetailOverviewComponent {
  @Input() event: EventDetail | null = null;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatDateTime(date: string): string {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    });
  }
}
