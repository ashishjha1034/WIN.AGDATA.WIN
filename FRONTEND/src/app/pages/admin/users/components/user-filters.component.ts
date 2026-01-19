import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserFilterCriteria } from '../../../../models/user.models';

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-container">
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder="Search users..."
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchChange()"
        />
      </div>

      <div class="filter-row">
        <div class="filter-group">
          <label>Status</label>
          <select
            class="filter-select"
            [(ngModel)]="statusFilter"
            (change)="onFilterChange()"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Role</label>
          <select
            class="filter-select"
            [(ngModel)]="roleFilter"
            (change)="onFilterChange()"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Balance Range</label>
          <select
            class="filter-select"
            [(ngModel)]="balanceFilter"
            (change)="onFilterChange()"
          >
            <option value="">All Balance</option>
            <option value="0-1000">0 - 1,000</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000+">5,000+</option>
          </select>
        </div>

        <button class="reset-btn" (click)="resetFilters()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background: white;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .search-bar {
      margin-bottom: 16px;
    }

    .search-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .filter-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    .filter-group {
      flex: 1;
      min-width: 150px;
    }

    .filter-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .filter-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .filter-select:hover {
      border-color: #d1d5db;
    }

    .filter-select:focus {
      outline: none;
      border-color: #4b5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
    }

    .reset-btn {
      padding: 8px 16px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .reset-btn:hover {
      background: #f9fafb;
      border-color: #d1d5db;
      color: #374151;
    }

    .reset-btn:active {
      background: #f3f4f6;
    }
  `]
})
export class UserFiltersComponent implements OnDestroy {
  @Output() filtersChanged = new EventEmitter<UserFilterCriteria>();
  @Output() searchChanged = new EventEmitter<string>();

  searchQuery = '';
  statusFilter = '';
  roleFilter = '';
  balanceFilter = '';

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor() {
    // Debounce search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchChanged.emit(query);
      this.emitFilters();
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFilterChange(): void {
    this.emitFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.balanceFilter = '';
    this.emitFilters();
  }

  private emitFilters(): void {
    const criteria: UserFilterCriteria = {
      search: this.searchQuery || undefined
    };

    if (this.statusFilter) {
      criteria.status = this.statusFilter as 'active' | 'inactive';
    }

    if (this.roleFilter) {
      criteria.role = this.roleFilter;
    }

    if (this.balanceFilter) {
      const [min, max] = this.parseBalanceFilter(this.balanceFilter);
      if (min !== undefined) criteria.balanceMin = min;
      if (max !== undefined) criteria.balanceMax = max;
    }

    this.filtersChanged.emit(criteria);
  }

  private parseBalanceFilter(filter: string): [number | undefined, number | undefined] {
    switch (filter) {
      case '0-1000':
        return [0, 1000];
      case '1000-5000':
        return [1000, 5000];
      case '5000+':
        return [5000, undefined];
      default:
        return [undefined, undefined];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
