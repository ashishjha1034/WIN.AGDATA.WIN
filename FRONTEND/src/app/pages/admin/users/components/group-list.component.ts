import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AdminGroupsService } from '../../../../services/admin-groups.service';
import { Group } from '../../../../models/group.models';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="group-list-container">
      <!-- Header with search and create button -->
      <div class="group-list-header">
        <div class="search-box">
          <input
            type="text"
            class="search-input"
            placeholder="Search groups..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange()"
          />
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button
          class="create-group-btn"
          (click)="onCreateGroupClick()"
          title="Create new group"
        >
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"></path>
          </svg>
          <span>Create Group</span>
        </button>
      </div>

      <!-- Groups list -->
      <div class="groups-list">
        <div *ngIf="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading groups...</p>
        </div>

        <div *ngIf="!isLoading && filteredGroups.length === 0" class="empty-state">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5H9m6-11H9a6 6 0 016 6v1m0 0a6 6 0 01-6 6m6-6a6 6 0 00-6-6m0 0H3m7 11a1 1 0 110-2 1 1 0 010 2m0-5a1 1 0 110-2 1 1 0 010 2m0-5a1 1 0 110-2 1 1 0 010 2"></path>
          </svg>
          <p>{{ searchQuery ? 'No groups found' : 'No groups yet' }}</p>
        </div>

        <div
          *ngFor="let group of filteredGroups"
          class="group-item"
          [class.selected]="group.id === selectedGroupId"
          (click)="selectGroup(group)"
          role="button"
          tabindex="0"
          (keydown.enter)="selectGroup(group)"
        >
          <div class="group-info">
            <h4 class="group-name">{{ group.name }}</h4>
            <p class="group-meta">
              <span class="member-count">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12a3 3 0 100-6 3 3 0 000 6z"></path>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 6.318 3 12 3s10.268 2.943 11.542 7c-1.274 4.057-5.86 7-11.542 7S1.732 14.057.458 10zM14 12a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {{ group.memberCount }} members
              </span>
              <span *ngIf="group.adminCount" class="admin-count">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                {{ group.adminCount }} admin
              </span>
            </p>
          </div>
          <svg class="chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .group-list-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }

    .group-list-header {
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      background-color: white;
      gap: 12px;
      display: flex;
      flex-direction: column;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #4b5563;
      background-color: #f9fafb;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      width: 16px;
      height: 16px;
      color: #9ca3af;
      pointer-events: none;
    }

    .create-group-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: #4b5563;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .create-group-btn:hover {
      background-color: #3d4555;
      box-shadow: 0 2px 8px rgba(75, 85, 99, 0.15);
    }

    .create-group-btn svg {
      width: 16px;
      height: 16px;
    }

    .groups-list {
      flex: 1;
      overflow-y: auto;
      padding: 0;
    }

    .groups-list::-webkit-scrollbar {
      width: 6px;
    }

    .groups-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .groups-list::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    .groups-list::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .loading-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 12px;
      color: #6b7280;
      text-align: center;
      padding: 24px;
    }

    .empty-state svg {
      width: 48px;
      height: 48px;
      opacity: 0.5;
    }

    .empty-state p {
      font-size: 14px;
      margin: 0;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #4b5563;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .group-item {
      padding: 12px 16px;
      border-bottom: 1px solid #e5e7eb;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
      background-color: white;
    }

    .group-item:hover {
      background-color: #f3f4f6;
    }

    .group-item.selected {
      background-color: #f0f4f8;
      border-left: 3px solid #4b5563;
      padding-left: 13px;
    }

    .group-item.selected .group-name {
      color: #4b5563;
      font-weight: 600;
    }

    .group-info {
      flex: 1;
      min-width: 0;
    }

    .group-name {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .group-meta {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .member-count,
    .admin-count {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .member-count svg,
    .admin-count svg {
      width: 12px;
      height: 12px;
    }

    .chevron {
      width: 16px;
      height: 16px;
      color: #d1d5db;
      flex-shrink: 0;
    }

    .group-item.selected .chevron {
      color: #4b5563;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .group-list-container {
        border-right: none;
      }

      .create-group-btn span {
        display: none;
      }

      .create-group-btn {
        justify-content: center;
      }
    }
  `]
})
export class GroupListComponent implements OnInit, OnDestroy {
  @Input() selectedGroupId: string | null = null;
  @Output() groupSelected = new EventEmitter<Group>();
  @Output() createGroupClick = new EventEmitter<void>();

  groups: Group[] = [];
  filteredGroups: Group[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private groupsService: AdminGroupsService) {}

  ngOnInit(): void {
    this.loadGroups();

    // Setup search debouncing
    this.searchSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.filterGroups();
      });

    // Monitor service loading state
    this.groupsService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadGroups(): void {
    this.groupsService.getAllGroups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.groups = response.groups || [];
          this.filterGroups();
        },
        error: (error: any) => {
          console.error('Error loading groups:', error);
        }
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private filterGroups(): void {
    if (!this.searchQuery.trim()) {
      this.filteredGroups = [...this.groups];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredGroups = this.groups.filter(group =>
        group.name.toLowerCase().includes(query) ||
        group.description?.toLowerCase().includes(query)
      );
    }
  }

  selectGroup(group: Group): void {
    this.groupSelected.emit(group);
  }

  onCreateGroupClick(): void {
    this.createGroupClick.emit();
  }
}
