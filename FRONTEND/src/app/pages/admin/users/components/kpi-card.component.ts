import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPICard {
  title: string;
  value: number | string;
  icon: string;
  color?: string;
  unit?: string;
}

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [style.border-left-color]="color">
      <div class="kpi-header">
        <h3 class="kpi-title">{{ title }}</h3>
        <span class="kpi-icon">{{ icon }}</span>
      </div>
      <div class="kpi-value">
        {{ value }}
        <span class="kpi-unit" *ngIf="unit">{{ unit }}</span>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: white;
      border-left: 4px solid;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }

    .kpi-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .kpi-title {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      text-transform: capitalize;
    }

    .kpi-icon {
      font-size: 24px;
      opacity: 0.6;
    }

    .kpi-value {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .kpi-unit {
      font-size: 12px;
      font-weight: 400;
      color: #9ca3af;
      margin-left: 4px;
    }
  `]
})
export class KPICardComponent {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() icon: string = '';
  @Input() color: string = '#4b5563';
  @Input() unit?: string;
}
