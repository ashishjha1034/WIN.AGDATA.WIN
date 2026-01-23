import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../../../../models/group.models';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group-list-container">
      <!-- Header -->
      <div class="group-list-header">
        <h3>Groups</h3>
      </div>

      <!-- Coming Soon Placeholder -->
      <div class="placeholder-state">
        <div class="placeholder-icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h4>Groups Feature Coming Soon</h4>
        <p>Group management allows you to organize users into teams and apply batch operations.</p>
        <p class="sub-text">This feature is currently under development and will be available in a future release.</p>
      </div>
    </div>
  `,
  styles: [`
    .group-list-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      min-height: 400px;
      display: flex;
      flex-direction: column;
    }

    .group-list-header {
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .group-list-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    .placeholder-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
      color: #6b7280;
    }

    .placeholder-icon {
      margin-bottom: 16px;
      color: #9ca3af;
    }

    .placeholder-state h4 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: #374151;
    }

    .placeholder-state p {
      margin: 0 0 8px;
      font-size: 14px;
      max-width: 280px;
    }

    .placeholder-state .sub-text {
      font-size: 12px;
      color: #9ca3af;
    }
  `]
})
export class GroupListComponent {
  @Input() selectedGroupId: string | null = null;
  @Output() groupSelected = new EventEmitter<Group>();
  @Output() createGroupClick = new EventEmitter<void>();

  // Placeholder - no actual group loading in MVP
  onCreateGroupClick(): void {
    this.createGroupClick.emit();
  }

  selectGroup(group: Group): void {
    this.groupSelected.emit(group);
  }
}
