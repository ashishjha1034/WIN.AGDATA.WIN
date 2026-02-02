import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetail, getRemainingPoints } from '../../../../models/event.models';

@Component({
  selector: 'app-event-detail-overview',
  templateUrl: './event-detail-overview.component.html',
  styleUrls: ['./event-detail-overview.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EventDetailOverviewComponent {
  // Public properties for template access
  public Math = Math;

  @Input() event: EventDetail | null = null;

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatDateTime(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format datetime with IST timezone and 12-hour AM/PM format
   */
  formatDateTimeIst(dateStr: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffset);
    
    const day = istDate.getUTCDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = istDate.getUTCFullYear();
    
    // Convert to 12-hour format with AM/PM
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hoursStr}:${minutes} ${ampm}`;
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'Active': '#16A34A',
      'Draft': '#F59E0B',
      'Completed': '#EC4899',
      'Cancelled': '#EF4444'
    };
    return colors[status] || '#6B7280';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'Draft': 'Upcoming',
      'Active': 'Live',
      'Completed': 'Completed',
      'Cancelled': 'Cancelled'
    };
    return labels[status] || status;
  }

  getRemainingPoints(): number {
    if (!this.event) return 0;
    return getRemainingPoints(this.event);
  }

  getDistributionPercentage(): number {
    if (!this.event || !this.event.totalPointsPool || this.event.totalPointsPool === 0) return 0;
    return Math.round((this.event.distributedPoints / this.event.totalPointsPool) * 100);
  }
}
