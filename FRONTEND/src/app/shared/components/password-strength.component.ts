import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { calculatePasswordStrength, ValidationConstants } from '../validators/custom-validators';

/**
 * Component for displaying password strength indicator and requirements checklist
 */
@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="password-strength" *ngIf="password" role="region" aria-label="Password strength indicator">
      <!-- Strength bar -->
      <div class="strength-bar-container">
        <div class="strength-bar" 
             [style.width.%]="strength.score" 
             [class]="strengthClass"
             role="progressbar"
             [attr.aria-valuenow]="strength.score"
             aria-valuemin="0"
             aria-valuemax="100">
        </div>
      </div>
      <span class="strength-label" [class]="strengthClass">{{ strength.label }}</span>

      <!-- Requirements checklist -->
      <ul class="requirements" *ngIf="showRequirements" aria-live="polite">
        <li *ngFor="let req of strength.requirements" 
            [class.met]="req.met"
            [class.unmet]="!req.met">
          <span class="check">{{ req.met ? '✓' : '○' }}</span>
          {{ req.text }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .password-strength {
      margin-top: 8px;
    }

    .strength-bar-container {
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .strength-bar {
      height: 100%;
      border-radius: 2px;
      transition: width 200ms ease, background-color 200ms ease;
    }

    .strength-bar.weak { background: #dc2626; }
    .strength-bar.fair { background: #f59e0b; }
    .strength-bar.good { background: #22c55e; }
    .strength-bar.strong { background: #16a34a; }
    .strength-bar.excellent { background: #15803d; }

    .strength-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .strength-label.weak { color: #dc2626; }
    .strength-label.fair { color: #f59e0b; }
    .strength-label.good { color: #22c55e; }
    .strength-label.strong { color: #16a34a; }
    .strength-label.excellent { color: #15803d; }

    .requirements {
      list-style: none;
      padding: 0;
      margin: 8px 0 0 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 4px;
    }

    .requirements li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      padding: 2px 0;
      transition: color 150ms ease;
    }

    .requirements li.met {
      color: #16a34a;
    }

    .requirements li.unmet {
      color: #9ca3af;
    }

    .requirements li .check {
      font-size: 12px;
      width: 14px;
      text-align: center;
    }

    .warning {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 8px 12px;
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 4px;
      font-size: 12px;
      color: #92400e;
    }

    .warning .icon {
      font-size: 14px;
    }
  `]
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password = '';
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() employeeId = '';
  @Input() showRequirements = true;

  strength = calculatePasswordStrength('');
  containsPersonalInfo = false;

  get strengthClass(): string {
    return this.strength.label.toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.strength = calculatePasswordStrength(this.password);
    this.checkPersonalInfo();
  }

  private checkPersonalInfo(): void {
    if (!this.password) {
      this.containsPersonalInfo = false;
      return;
    }

    const pwdLower = this.password.toLowerCase();
    
    this.containsPersonalInfo = !!(
      (this.firstName && this.firstName.length > 1 && pwdLower.includes(this.firstName.toLowerCase())) ||
      (this.lastName && this.lastName.length > 1 && pwdLower.includes(this.lastName.toLowerCase())) ||
      (this.employeeId && this.employeeId.length > 1 && pwdLower.includes(this.employeeId.toLowerCase()))
    );
  }
}
