import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="table-card">
      <div class="table-card__header">
        <div class="table-card__title-group">
          <h3 class="table-card__title">{{ title }}</h3>
          <p class="table-card__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <a *ngIf="viewAllLink" [routerLink]="viewAllLink" [queryParams]="queryParams" class="table-card__link">
          View All <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <div class="table-card__body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .table-card {
      background: var(--ag-color-layer-01, #ffffff);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border: 1px solid var(--ag-color-border-subtle, #e5e7eb);
      display: flex;
      flex-direction: column;
    }

    .table-card__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .table-card__title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .table-card__title {
      font-size: 16px;
      font-weight: 600;
      color: var(--ag-color-text-primary, #1f2937);
      margin: 0;
    }

    .table-card__subtitle {
      font-size: 13px;
      color: var(--ag-color-text-secondary, #6b7280);
      margin: 0;
    }

    .table-card__link {
      font-size: 13px;
      font-weight: 500;
      color: #2c5f3f;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: color 0.2s;
    }

    .table-card__link:hover {
      color: #1e4620;
    }

    .table-card__link i {
      font-size: 11px;
    }

    .table-card__body {
      max-height: 220px;
      overflow-y: auto;
    }

    /* Scrollbar styling */
    .table-card__body::-webkit-scrollbar {
      width: 6px;
    }

    .table-card__body::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }

    .table-card__body::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    .table-card__body::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCardComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() viewAllLink?: string;
  @Input() queryParams?: { [key: string]: string } | null = null;
}
