import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { EventEditComponent } from './event-edit.component';
import { EventService } from '../../../services/event.service';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { EventDetail } from '../../../models/event.models';

describe('EventEditComponent', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let validationServiceSpy: jasmine.SpyObj<ValidationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockEventDetail: EventDetail = {
    id: 'test-event-id',
    name: 'Test Event',
    description: 'This is a test event description with enough words and characters.',
    eventDate: '2026-03-15T10:00:00Z',
    registrationEndDateUtc: '2026-03-01T10:00:00Z',
    location: 'Conference Room A',
    maxParticipants: 100,
    totalPointsPool: 10000,
    status: 'Upcoming' as any,
    participantCount: 0,
    distributedPoints: 0,
    registeredCount: 0,
    checkedInCount: 0,
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'admin'
  };

  beforeEach(async () => {
    eventServiceSpy = jasmine.createSpyObj('EventService', ['getEventDetail', 'updateEvent']);
    validationServiceSpy = jasmine.createSpyObj('ValidationService', ['checkEventNameAvailability']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    eventServiceSpy.getEventDetail.and.returnValue(of(mockEventDetail));
    // Default return value for uniqueness check (needed for initial form load)
    validationServiceSpy.checkEventNameAvailability.and.returnValue(of({ isValid: true, message: 'Available' }));

    await TestBed.configureTestingModule({
      imports: [
        EventEditComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: EventService, useValue: eventServiceSpy },
        { provide: ValidationService, useValue: validationServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test-event-id'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load event detail on init', () => {
      expect(eventServiceSpy.getEventDetail).toHaveBeenCalledWith('test-event-id');
    });

    it('should populate form with event data', fakeAsync(() => {
      tick();
      expect(component.form.get('name')!.value).toBe('Test Event');
      expect(component.form.get('description')!.value).toContain('test event');
    }));

    it('should initialize counters based on loaded data', fakeAsync(() => {
      tick();
      expect(component.nameCharCount()).toBeGreaterThan(0);
      expect(component.nameWordCount()).toBeGreaterThan(0);
    }));
  });

  describe('Event Name Validation', () => {
    beforeEach(fakeAsync(() => {
      tick(); // Wait for event to load
    }));

    it('should require event name', () => {
      component.form.get('name')!.setValue('');
      expect(component.form.get('name')!.hasError('required')).toBeTrue();
    });

    it('should accept valid event name', () => {
      component.form.get('name')!.setValue('Updated Event Name');
      expect(component.form.get('name')!.valid).toBeTrue();
    });

    it('should reject event name with special characters', () => {
      component.form.get('name')!.setValue('Event Name!');
      expect(component.form.get('name')!.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name with more than 7 words', () => {
      component.form.get('name')!.setValue('One Two Three Four Five Six Seven Eight');
      expect(component.form.get('name')!.hasError('eventNameFormat')).toBeTrue();
    });
  });

  describe('Event Name Uniqueness Check (Edit Mode)', () => {
    beforeEach(fakeAsync(() => {
      // Clear any pending debounced emissions from initial form load
      tick(600);
      validationServiceSpy.checkEventNameAvailability.calls.reset();
    }));

    it('should pass excludeEventId when checking uniqueness', fakeAsync(() => {
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: true, message: 'Available' })
      );

      // Verify eventId is set
      expect(component['eventId']).toBe('test-event-id');

      // Set a valid name and trigger manual check
      const nameControl = component.form.get('name')!;
      nameControl.setValue('NewEventName');
      fixture.detectChanges();
      
      // Call the manual check method which bypasses debounce
      component.checkNameAvailability();
      tick();
      fixture.detectChanges();

      expect(validationServiceSpy.checkEventNameAvailability).toHaveBeenCalledWith(
        'NewEventName',
        'test-event-id'
      );
    }));

    it('should allow keeping the same name (excluded from uniqueness)', fakeAsync(() => {
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: true, message: 'Available (current event)' })
      );

      // Set a valid name
      const nameControl = component.form.get('name')!;
      nameControl.setValue('AnotherName');
      fixture.detectChanges();
      
      // Call the manual check method
      component.checkNameAvailability();
      tick();
      fixture.detectChanges();

      // The result should be valid
      expect(component.nameUniquenessResult()?.isValid).toBeTrue();
    }));
  });

  describe('Description Validation', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should require description', () => {
      component.form.get('description')!.setValue('');
      expect(component.form.get('description')!.hasError('required')).toBeTrue();
    });

    it('should reject description shorter than 20 characters', () => {
      component.form.get('description')!.setValue('Short');
      expect(component.form.get('description')!.hasError('eventDescriptionFormat')).toBeTrue();
    });

    it('should accept valid description', () => {
      component.form.get('description')!.setValue(
        'This is a valid updated description with enough words and characters to pass.'
      );
      expect(component.form.get('description')!.valid).toBeTrue();
    });
  });

  describe('Location Validation', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should allow empty location', () => {
      component.form.get('location')!.setValue('');
      expect(component.form.get('location')!.valid).toBeTrue();
    });

    it('should accept valid location', () => {
      component.form.get('location')!.setValue('Updated Room B');
      expect(component.form.get('location')!.valid).toBeTrue();
    });

    it('should reject location with special characters', () => {
      component.form.get('location')!.setValue('Room B-2');
      expect(component.form.get('location')!.hasError('eventLocationFormat')).toBeTrue();
    });
  });

  describe('Date Validation', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should require event date', () => {
      component.form.get('eventDate')!.setValue('');
      expect(component.form.get('eventDate')!.hasError('required')).toBeTrue();
    });

    it('should require registration deadline', () => {
      component.form.get('registrationEndDate')!.setValue('');
      expect(component.form.get('registrationEndDate')!.hasError('required')).toBeTrue();
    });

    it('should reject registration deadline after event date', () => {
      const eventDate = new Date();
      eventDate.setMonth(eventDate.getMonth() + 1);
      component.form.get('eventDate')!.setValue(eventDate.toISOString().slice(0, 16));

      const regDate = new Date();
      regDate.setMonth(regDate.getMonth() + 2);
      component.form.get('registrationEndDate')!.setValue(regDate.toISOString().slice(0, 16));
      component.form.get('registrationEndDate')!.updateValueAndValidity();

      expect(component.form.get('registrationEndDate')!.hasError('registrationBeforeEvent')).toBeTrue();
    });
  });

  describe('Max Participants Validation', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should allow null (optional)', () => {
      component.form.get('maxParticipants')!.setValue(null);
      expect(component.form.get('maxParticipants')!.valid).toBeTrue();
    });

    it('should reject zero', () => {
      component.form.get('maxParticipants')!.setValue(0);
      expect(component.form.get('maxParticipants')!.hasError('eventMaxParticipants')).toBeTrue();
    });

    it('should accept valid value', () => {
      component.form.get('maxParticipants')!.setValue(500);
      expect(component.form.get('maxParticipants')!.valid).toBeTrue();
    });
  });

  describe('Total Points Pool Validation', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should require total points', () => {
      component.form.get('totalPointsPool')!.setValue(null);
      component.form.get('totalPointsPool')!.markAsTouched();
      expect(component.form.get('totalPointsPool')!.hasError('required')).toBeTrue();
    });

    it('should reject zero', () => {
      component.form.get('totalPointsPool')!.setValue(0);
      expect(component.form.get('totalPointsPool')!.hasError('eventPointsPool')).toBeTrue();
    });

    it('should accept valid value', () => {
      component.form.get('totalPointsPool')!.setValue(50000);
      expect(component.form.get('totalPointsPool')!.valid).toBeTrue();
    });
  });

  describe('Points Locking for Live Events', () => {
    it('should lock points when event is Live', fakeAsync(() => {
      const liveEvent: EventDetail = { ...mockEventDetail, status: 'Live' };
      eventServiceSpy.getEventDetail.and.returnValue(of(liveEvent));

      fixture = TestBed.createComponent(EventEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(component.pointsLocked).toBeTrue();
      expect(component.form.get('totalPointsPool')!.disabled).toBeTrue();
    }));

    it('should not lock points when event is Upcoming', fakeAsync(() => {
      tick();
      expect(component.pointsLocked).toBeFalse();
      expect(component.form.get('totalPointsPool')!.enabled).toBeTrue();
    }));
  });

  describe('Form Submission', () => {
    beforeEach(fakeAsync(() => {
      tick();
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: true, message: 'Available' })
      );
    }));

    it('should not allow submission when form is invalid', () => {
      component.form.get('name')!.setValue('');
      expect(component.canSubmit).toBeFalse();
    });

    it('should not allow submission when uniqueness check is in progress', () => {
      component.nameUniquenessChecking.set(true);
      expect(component.canSubmit).toBeFalse();
    });

    it('should allow submission when form is valid', () => {
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });
      expect(component.canSubmit).toBeTrue();
    });

    it('should call update service on valid submission', fakeAsync(() => {
      eventServiceSpy.updateEvent.and.returnValue(of({
        id: 'test-event-id',
        name: 'Updated Event',
        description: 'Updated description',
        status: 'Upcoming' as any,
        eventDate: '2026-03-15T10:00:00Z',
        participantCount: 0,
        totalPointsPool: 10000,
        distributedPoints: 0
      }));
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });

      component.onSubmit();
      tick();

      expect(eventServiceSpy.updateEvent).toHaveBeenCalled();
    }));

    it('should handle validation errors from backend', fakeAsync(() => {
      eventServiceSpy.updateEvent.and.returnValue(
        throwError(() => ({
          error: {
            errors: {
              name: ['Name already exists']
            }
          }
        }))
      );
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });

      component.onSubmit();
      tick();

      expect(component.showErrorAlert).toBeTrue();
      expect(component.errorMessage).toContain('name');
    }));
  });

  describe('Event Status Handling', () => {
    it('should redirect when event is not editable', fakeAsync(() => {
      const completedEvent: EventDetail = { ...mockEventDetail, status: 'Completed' };
      eventServiceSpy.getEventDetail.and.returnValue(of(completedEvent));

      fixture = TestBed.createComponent(EventEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(component.showErrorAlert).toBeTrue();
      expect(component.errorMessage).toContain('Cannot edit');
    }));
  });

  describe('Counter Updates', () => {
    beforeEach(fakeAsync(() => {
      tick();
    }));

    it('should update name counters on change', fakeAsync(() => {
      component.form.get('name')!.setValue('New Test Event');
      tick();
      
      // "NewTestEvent" = 12 chars (no spaces)
      expect(component.nameCharCount()).toBe(12);
      expect(component.nameWordCount()).toBe(3);
    }));

    it('should update description counters on change', fakeAsync(() => {
      component.form.get('description')!.setValue('This is the updated description');
      tick();
      
      expect(component.descCharCount()).toBe(31);
      expect(component.descWordCount()).toBe(5);
    }));

    it('should update location counters on change', fakeAsync(() => {
      component.form.get('location')!.setValue('Room B Floor 2');
      tick();
      
      // "RoomBFloor2" = 11 chars (no spaces)
      expect(component.locationCharCount()).toBe(11);
      expect(component.locationWordCount()).toBe(4);
    }));
  });

  describe('UI Elements', () => {
    beforeEach(fakeAsync(() => {
      tick();
      fixture.detectChanges();
    }));

    it('should show event status badge', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.status-badge');
      expect(badge).toBeTruthy();
    });

    it('should show validation hint components', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hints = compiled.querySelectorAll('app-validation-hint');
      expect(hints.length).toBeGreaterThan(0);
    });

    it('should show form errors summary', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const summary = compiled.querySelector('app-form-errors-summary');
      expect(summary).toBeTruthy();
    });
  });
});

// IST Timezone utility tests
describe('IST Timezone Utilities', () => {
  // Import the utilities
  let istUtils: any;

  beforeEach(async () => {
    istUtils = await import('../../../shared/utils/ist-timezone.utils');
  });

  describe('getMinDateTimeForInput', () => {
    it('should return a valid datetime-local format', () => {
      const minDateTime = istUtils.getMinDateTimeForInput();
      expect(minDateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    });
  });

  describe('EventValidationUtils', () => {
    it('should count words correctly', () => {
      expect(istUtils.EventValidationUtils.countWords('One Two Three')).toBe(3);
      expect(istUtils.EventValidationUtils.countWords('')).toBe(0);
      expect(istUtils.EventValidationUtils.countWords('Single')).toBe(1);
    });

    it('should count chars excluding spaces', () => {
      expect(istUtils.EventValidationUtils.countCharsNoSpaces('Hello World')).toBe(10);
      expect(istUtils.EventValidationUtils.countCharsNoSpaces('No Spaces Here')).toBe(12);
    });
  });
});
