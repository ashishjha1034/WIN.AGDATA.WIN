import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type KpiIconType = 'users' | 'events' | 'products' | 'low-stock' | 'pending' | 'live' | 'registrations';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a [routerLink]="routerLink" [queryParams]="queryParams" [class.no-link]="!routerLink" class="kpi-card" [class]="'kpi-card--' + iconType">
      <div class="kpi-icon">
        <i [class]="getIconClass()"></i>
      </div>
      <div class="kpi-content">
        <span class="kpi-label">{{ label }}</span>
        <span class="kpi-value">{{ value | number }}</span>
      </div>
    </a>
  `,
  styles: [`
    .kpi-card {
      background: var(--ag-color-layer-01, #ffffff);
      border-radius: 12px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .kpi-card.no-link {
      cursor: default;
    }

    .kpi-card:hover:not(.no-link) {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .kpi-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .kpi-icon i {
      font-size: 24px;
    }

    /* Icon color variants */
    .kpi-card--users .kpi-icon {
      background: rgba(44, 95, 63, 0.12);
      color: #2c5f3f;
    }

    .kpi-card--events .kpi-icon {
      background: rgba(59, 130, 246, 0.12);
      color: #3b82f6;
    }

    .kpi-card--products .kpi-icon {
      background: rgba(139, 92, 246, 0.12);
      color: #8b5cf6;
    }

    .kpi-card--low-stock .kpi-icon {
      background: rgba(245, 158, 11, 0.12);
      color: #f59e0b;
    }

    .kpi-card--pending .kpi-icon {
      background: rgba(236, 72, 153, 0.12);
      color: #ec4899;
    }

    .kpi-card--live .kpi-icon {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
    }

    .kpi-card--registrations .kpi-icon {
      background: rgba(6, 182, 212, 0.12);
      color: #06b6d4;
    }

    .kpi-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .kpi-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--ag-color-text-secondary, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .kpi-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--ag-color-text-primary, #1f2937);
      line-height: 1.2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() iconType: KpiIconType = 'users';
  @Input() routerLink: string | string[] | null = null;
  @Input() queryParams: { [key: string]: string } | null = null;

  getIconClass(): string {
    const iconMap: Record<KpiIconType, string> = {
      'users': 'fa-solid fa-user-group',
      'events': 'fa-solid fa-calendar-days',
      'products': 'fa-solid fa-boxes-stacked',
      'low-stock': 'fa-solid fa-triangle-exclamation',
      'pending': 'fa-solid fa-gift',
      'live': 'fa-solid fa-bolt',
      'registrations': 'fa-solid fa-user-check'
    };
    return iconMap[this.iconType] || 'fa-solid fa-chart-simple';
  }
}
