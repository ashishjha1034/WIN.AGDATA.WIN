import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserDeactivateConfirmationDialogComponent } from './user-deactivate-confirmation-dialog.component';
import { DeactivateUserWarningData } from '../../../../models/user.models';

describe('UserDeactivateConfirmationDialogComponent', () => {
  let component: UserDeactivateConfirmationDialogComponent;
  let fixture: ComponentFixture<UserDeactivateConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDeactivateConfirmationDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeactivateConfirmationDialogComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have dialog role and aria-modal attribute', () => {
      component.data = createTestWarningData();
      fixture.detectChanges();
      
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      expect(overlay.attributes['role']).toBe('dialog');
      expect(overlay.attributes['aria-modal']).toBe('true');
    });
  });

  describe('Warning Display', () => {
    it('should display user name in warning text', () => {
      component.data = createTestWarningData({ userName: 'John Smith' });
      fixture.detectChanges();

      const warningText = fixture.debugElement.query(By.css('.warning-text'));
      expect(warningText.nativeElement.textContent).toContain('John Smith');
    });

    it('should display points balance warning when points > 0', () => {
      component.data = createTestWarningData({ pointsBalance: 500 });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      const pointsWarning = warningItems.find(item => 
        item.nativeElement.textContent.includes('500 points'));
      expect(pointsWarning).toBeTruthy();
    });

    it('should NOT display points balance warning when points = 0', () => {
      component.data = createTestWarningData({ pointsBalance: 0 });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      const pointsWarning = warningItems.find(item => 
        item.nativeElement.textContent.includes('points remaining'));
      expect(pointsWarning).toBeFalsy();
    });

    it('should display completed events warning when count > 0', () => {
      component.data = createTestWarningData({ completedEventsCount: 3 });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      const eventsWarning = warningItems.find(item => 
        item.nativeElement.textContent.includes('3 completed event'));
      expect(eventsWarning).toBeTruthy();
    });

    it('should display completed redemptions warning when count > 0', () => {
      component.data = createTestWarningData({ completedRedemptionsCount: 5 });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      const redemptionsWarning = warningItems.find(item => 
        item.nativeElement.textContent.includes('5 completed redemption'));
      expect(redemptionsWarning).toBeTruthy();
    });

    it('should display recent activity warning when daysSinceLastActivity is defined', () => {
      component.data = createTestWarningData({ 
        daysSinceLastActivity: 7,
        lastActivityDate: '2026-01-23T10:00:00Z'
      });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      const activityWarning = warningItems.find(item => 
        item.nativeElement.textContent.includes('7 days ago'));
      expect(activityWarning).toBeTruthy();
    });

    it('should handle singular vs plural correctly', () => {
      component.data = createTestWarningData({ 
        completedEventsCount: 1,
        completedRedemptionsCount: 1,
        daysSinceLastActivity: 1
      });
      fixture.detectChanges();

      const warningItems = fixture.debugElement.queryAll(By.css('.warning-item'));
      // Check that singular forms are used
      expect(warningItems.some(item => 
        item.nativeElement.textContent.includes('1 completed event'))).toBeTruthy();
      expect(warningItems.some(item => 
        item.nativeElement.textContent.includes('1 completed redemption'))).toBeTruthy();
      expect(warningItems.some(item => 
        item.nativeElement.textContent.includes('1 day ago'))).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      component.data = createTestWarningData();
      fixture.detectChanges();
    });

    it('should emit confirm event when confirm button clicked', () => {
      spyOn(component.confirm, 'emit');
      
      const confirmBtn = fixture.debugElement.query(By.css('.btn-danger'));
      confirmBtn.nativeElement.click();
      
      expect(component.confirm.emit).toHaveBeenCalled();
    });

    it('should emit cancel event when cancel button clicked', () => {
      spyOn(component.cancel, 'emit');
      
      const cancelBtn = fixture.debugElement.query(By.css('.btn-secondary'));
      cancelBtn.nativeElement.click();
      
      expect(component.cancel.emit).toHaveBeenCalled();
    });

    it('should emit cancel event when close button clicked', () => {
      spyOn(component.cancel, 'emit');
      
      const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
      closeBtn.nativeElement.click();
      
      expect(component.cancel.emit).toHaveBeenCalled();
    });

    it('should emit cancel event when overlay clicked', () => {
      spyOn(component.cancel, 'emit');
      
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      overlay.triggerEventHandler('click', { target: overlay.nativeElement, currentTarget: overlay.nativeElement });
      
      expect(component.cancel.emit).toHaveBeenCalled();
    });

    it('should NOT emit cancel when clicking inside dialog container', () => {
      spyOn(component.cancel, 'emit');
      
      const container = fixture.debugElement.query(By.css('.dialog-container'));
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      overlay.triggerEventHandler('click', { target: container.nativeElement, currentTarget: overlay.nativeElement });
      
      expect(component.cancel.emit).not.toHaveBeenCalled();
    });

    it('should emit cancel event on Escape key press', () => {
      spyOn(component.cancel, 'emit');
      
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      overlay.triggerEventHandler('keydown', { key: 'Escape', preventDefault: () => {} });
      
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('Computed Properties', () => {
    it('should return true for hasPointsBalance when points > 0', () => {
      component.data = createTestWarningData({ pointsBalance: 100 });
      expect(component.hasPointsBalance).toBe(true);
    });

    it('should return false for hasPointsBalance when points = 0', () => {
      component.data = createTestWarningData({ pointsBalance: 0 });
      expect(component.hasPointsBalance).toBe(false);
    });

    it('should return true for hasCompletedEvents when count > 0', () => {
      component.data = createTestWarningData({ completedEventsCount: 2 });
      expect(component.hasCompletedEvents).toBe(true);
    });

    it('should return false for hasCompletedEvents when count = 0', () => {
      component.data = createTestWarningData({ completedEventsCount: 0 });
      expect(component.hasCompletedEvents).toBe(false);
    });

    it('should return true for hasCompletedRedemptions when count > 0', () => {
      component.data = createTestWarningData({ completedRedemptionsCount: 3 });
      expect(component.hasCompletedRedemptions).toBe(true);
    });

    it('should return true for hasRecentActivity when daysSinceLastActivity is defined', () => {
      component.data = createTestWarningData({ daysSinceLastActivity: 5 });
      expect(component.hasRecentActivity).toBe(true);
    });

    it('should return false for hasRecentActivity when daysSinceLastActivity is undefined', () => {
      component.data = createTestWarningData({ daysSinceLastActivity: undefined });
      expect(component.hasRecentActivity).toBe(false);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.data = createTestWarningData();
      fixture.detectChanges();
    });

    it('should have aria-labelledby pointing to dialog title', () => {
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      expect(overlay.attributes['aria-labelledby']).toBe('dialog-title');
    });

    it('should have aria-describedby pointing to dialog description', () => {
      const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
      expect(overlay.attributes['aria-describedby']).toBe('dialog-description');
    });

    it('should have close button with aria-label', () => {
      const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
      expect(closeBtn.attributes['aria-label']).toBe('Close dialog');
    });

    it('should have live region for announcements', () => {
      const liveRegion = fixture.debugElement.query(By.css('[aria-live="polite"]'));
      expect(liveRegion).toBeTruthy();
    });
  });

  // Helper function to create test data
  function createTestWarningData(overrides: Partial<DeactivateUserWarningData> = {}): DeactivateUserWarningData {
    return {
      userName: 'Test User',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      pointsBalance: 0,
      completedEventsCount: 0,
      completedRedemptionsCount: 0,
      ...overrides
    };
  }
});
