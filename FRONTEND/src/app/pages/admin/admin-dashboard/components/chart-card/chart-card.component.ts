import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-card">
      <div class="chart-card__header">
        <h3 class="chart-card__title">{{ title }}</h3>
        <p class="chart-card__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
      </div>
      <div class="chart-card__body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .chart-card {
      background: var(--ag-color-layer-01, #ffffff);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-card__header {
      margin-bottom: 20px;
    }

    .chart-card__title {
      font-size: 16px;
      font-weight: 600;
      color: var(--ag-color-text-primary, #1f2937);
      margin: 0 0 4px 0;
    }

    .chart-card__subtitle {
      font-size: 13px;
      color: var(--ag-color-text-secondary, #6b7280);
      margin: 0;
    }

    .chart-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
