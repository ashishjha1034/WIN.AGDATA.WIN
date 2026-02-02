import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination-container" *ngIf="totalItems > 0">
      <!-- Top Section: Results Info and Quick Navigation -->
      <div class="pagination-top">
        <div class="results-info">
          <span class="results-text">
            Showing <strong>{{ startItem }}</strong>-<strong>{{ endItem }}</strong> of <strong>{{ totalItems }}</strong> {{ itemLabel }}
          </span>
          <span class="page-indicator">
            (Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong>)
          </span>
        </div>
        <div class="quick-nav">
          <button
            class="nav-btn"
            [disabled]="currentPage === 1"
            (click)="onPageChange(currentPage - 1)"
            title="Previous Page"
          >
            <i class="fa-solid fa-chevron-left"></i>
            Previous
          </button>
          <button
            class="nav-btn"
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(currentPage + 1)"
            title="Next Page"
          >
            Next
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Bottom Section: Full Pagination Controls (optional, shows on demand) -->
      <div class="pagination-controls" *ngIf="showFullControls && totalPages > 1">
        <button
          class="page-btn first"
          [disabled]="currentPage === 1"
          (click)="onPageChange(1)"
          title="First Page"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        
        <button
          class="page-btn prev"
          [disabled]="currentPage === 1"
          (click)="onPageChange(currentPage - 1)"
          title="Previous Page"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="page-numbers">
          <button
            *ngFor="let page of visiblePages"
            class="page-number"
            [class.active]="page === currentPage"
            [class.ellipsis]="page === -1"
            [disabled]="page === -1"
            (click)="page !== -1 && onPageChange(page)"
          >
            {{ page === -1 ? '...' : page }}
          </button>
        </div>

        <button
          class="page-btn next"
          [disabled]="currentPage === totalPages"
          (click)="onPageChange(currentPage + 1)"
          title="Next Page"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <button
          class="page-btn last"
          [disabled]="currentPage === totalPages"
          (click)="onPageChange(totalPages)"
          title="Last Page"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pagination-container {
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    /* Top Section */
    .pagination-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #f3f4f6;
      flex-wrap: wrap;
      gap: 12px;
    }

    .results-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .results-text {
      font-size: 14px;
      color: #374151;
    }

    .results-text strong {
      font-weight: 600;
      color: #1f2937;
    }

    .page-indicator {
      font-size: 13px;
      color: #6b7280;
    }

    .page-indicator strong {
      font-weight: 600;
      color: #374151;
    }

    .quick-nav {
      display: flex;
      gap: 8px;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }

    .nav-btn:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #2c5f3f;
      color: #2c5f3f;
    }

    .nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f9fafb;
    }

    .nav-btn i {
      font-size: 12px;
    }

    /* Bottom Section: Full Controls */
    .pagination-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px;
    }

    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-btn:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #2c5f3f;
      color: #2c5f3f;
    }

    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .page-btn i {
      font-size: 12px;
    }

    .page-numbers {
      display: flex;
      gap: 4px;
      margin: 0 8px;
    }

    .page-number {
      min-width: 36px;
      height: 36px;
      padding: 0 8px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-number:hover:not(:disabled):not(.active) {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .page-number.active {
      background: #2c5f3f;
      border-color: #2c5f3f;
      color: #ffffff;
      font-weight: 600;
    }

    .page-number.ellipsis {
      border: none;
      cursor: default;
      color: #9ca3af;
    }

    .page-number.ellipsis:hover {
      background: transparent;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .pagination-top {
        flex-direction: column;
        align-items: flex-start;
      }

      .results-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .quick-nav {
        width: 100%;
      }

      .nav-btn {
        flex: 1;
        justify-content: center;
      }

      .pagination-controls {
        flex-wrap: wrap;
      }

      .page-numbers {
        order: -1;
        width: 100%;
        justify-content: center;
        margin-bottom: 8px;
      }
    }

    @media (max-width: 480px) {
      .pagination-top {
        padding: 12px 16px;
      }

      .results-text,
      .page-indicator {
        font-size: 12px;
      }

      .nav-btn {
        padding: 6px 12px;
        font-size: 13px;
      }

      .page-btn,
      .page-number {
        min-width: 32px;
        height: 32px;
        font-size: 13px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Input() itemLabel: string = 'results';
  @Input() showFullControls: boolean = false;
  @Input() maxVisiblePages: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startItem(): number {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const max = this.maxVisiblePages;
    
    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const half = Math.floor(max / 2);

    // Always show first page
    pages.push(1);

    let start = Math.max(2, current - half);
    let end = Math.min(total - 1, current + half);

    // Adjust if we're near the beginning or end
    if (current <= half + 1) {
      end = max - 1;
    } else if (current >= total - half) {
      start = total - max + 2;
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < total - 1) {
      pages.push(-1);
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
