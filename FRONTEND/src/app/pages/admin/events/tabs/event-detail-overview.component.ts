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
