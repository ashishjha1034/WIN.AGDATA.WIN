import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { EventCreateComponent } from './event-create.component';
import { EventService } from '../../../services/event.service';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let validationServiceSpy: jasmine.SpyObj<ValidationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    eventServiceSpy = jasmine.createSpyObj('EventService', ['createEvent']);
    validationServiceSpy = jasmine.createSpyObj('ValidationService', ['checkEventNameAvailability']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        EventCreateComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: EventService, useValue: eventServiceSpy },
        { provide: ValidationService, useValue: validationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with all required controls', () => {
      expect(component.form).toBeTruthy();
      expect(component.form.get('name')).toBeTruthy();
      expect(component.form.get('description')).toBeTruthy();
      expect(component.form.get('eventDate')).toBeTruthy();
      expect(component.form.get('registrationEndDate')).toBeTruthy();
      expect(component.form.get('location')).toBeTruthy();
      expect(component.form.get('maxParticipants')).toBeTruthy();
      expect(component.form.get('totalPoints')).toBeTruthy();
    });

    it('should initialize counters to zero', () => {
      expect(component.nameCharCount()).toBe(0);
      expect(component.nameWordCount()).toBe(0);
      expect(component.descCharCount()).toBe(0);
      expect(component.descWordCount()).toBe(0);
      expect(component.locationCharCount()).toBe(0);
      expect(component.locationWordCount()).toBe(0);
    });

    it('should have validation constants available', () => {
      expect(component.validationConstants).toBe(ValidationConstants);
      expect(component.validationConstants.EVENT_NAME_MAX_LENGTH).toBe(50);
      expect(component.validationConstants.EVENT_NAME_MAX_WORDS).toBe(7);
    });
  });

  describe('Event Name Validation', () => {
    it('should require event name', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('');
      expect(nameControl.hasError('required')).toBeTrue();
    });

    it('should accept valid event name with alphanumeric words', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('Spring Sales Contest');
      expect(nameControl.valid).toBeTrue();
    });

    it('should reject event name with special characters', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('Spring Sales Contest!');
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name with more than 7 words', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('One Two Three Four Five Six Seven Eight');
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name with consecutive spaces', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('Spring  Sales');
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name with leading/trailing spaces', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue(' Spring Sales ');
      // Note: HTML input typically trims, but validator handles it
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name shorter than 2 characters (excluding spaces)', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('A');
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should reject event name longer than 50 characters (excluding spaces)', () => {
      const nameControl = component.form.get('name')!;
      // Create a name with more than 50 chars excluding spaces
      nameControl.setValue('Abcdefghijklmnopqrstuvwxyz Abcdefghijklmnopqrstuvwxyz Extra');
      expect(nameControl.hasError('eventNameFormat')).toBeTrue();
    });

    it('should update character counter when name changes', fakeAsync(() => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('Spring Sale');
      tick();
      // Char count excludes spaces: "SpringSale" = 10 chars
      expect(component.nameCharCount()).toBe(10);
    }));

    it('should update word counter when name changes', fakeAsync(() => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('Spring Sales Contest');
      tick();
      expect(component.nameWordCount()).toBe(3);
    }));
  });

  describe('Event Name Uniqueness Check', () => {
    it('should check uniqueness when name is valid and debounce completes', fakeAsync(() => {
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: true, message: 'Name is available' })
      );

      const nameControl = component.form.get('name')!;
      nameControl.setValue('Valid Event Name');
      
      tick(500); // Debounce time
      
      expect(validationServiceSpy.checkEventNameAvailability).toHaveBeenCalledWith('Valid Event Name');
      expect(component.nameUniquenessResult()?.isValid).toBeTrue();
    }));

    it('should show taken message when name is not unique', fakeAsync(() => {
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: false, message: 'Event name already exists' })
      );

      const nameControl = component.form.get('name')!;
      nameControl.setValue('Existing Event');
      
      tick(500);
      
      expect(component.nameUniquenessResult()?.isValid).toBeFalse();
      expect(component.nameUniquenessResult()?.message).toBe('Event name already exists');
    }));

    it('should clear uniqueness result when name is invalid', fakeAsync(() => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('A'); // Too short
      tick(500);
      expect(component.nameUniquenessResult()).toBeNull();
    }));

    it('should trigger manual check on button click', fakeAsync(() => {
      validationServiceSpy.checkEventNameAvailability.and.returnValue(
        of({ isValid: true, message: 'Available' })
      );

      const nameControl = component.form.get('name')!;
      nameControl.setValue('Valid Name');
      
      component.checkNameAvailability();
      tick();
      
      expect(validationServiceSpy.checkEventNameAvailability).toHaveBeenCalled();
    }));
  });

  describe('Description Validation', () => {
    it('should require description', () => {
      const descControl = component.form.get('description')!;
      descControl.setValue('');
      expect(descControl.hasError('required')).toBeTrue();
    });

    it('should reject description shorter than 20 characters', () => {
      const descControl = component.form.get('description')!;
      descControl.setValue('Short desc');
      expect(descControl.hasError('eventDescriptionFormat')).toBeTrue();
    });

    it('should reject description with fewer than 3 words', () => {
      const descControl = component.form.get('description')!;
      descControl.setValue('Twoverylongwordsonly');
      expect(descControl.hasError('eventDescriptionFormat')).toBeTrue();
    });

    it('should accept valid description with sufficient length and words', () => {
      const descControl = component.form.get('description')!;
      descControl.setValue('This is a valid event description that has enough words and characters to pass validation.');
      expect(descControl.valid).toBeTrue();
    });

    it('should reject description longer than 500 characters', () => {
      const descControl = component.form.get('description')!;
      const longDesc = 'A'.repeat(501);
      descControl.setValue(longDesc);
      expect(descControl.hasError('eventDescriptionFormat')).toBeTrue();
    });

    it('should update description character counter', fakeAsync(() => {
      const descControl = component.form.get('description')!;
      descControl.setValue('Hello World Test Description');
      tick();
      expect(component.descCharCount()).toBe(28);
    }));

    it('should update description word counter', fakeAsync(() => {
      const descControl = component.form.get('description')!;
      descControl.setValue('Hello World Test Description');
      tick();
      expect(component.descWordCount()).toBe(4);
    }));
  });

  describe('Location Validation (Optional Field)', () => {
    it('should allow empty location', () => {
      const locControl = component.form.get('location')!;
      locControl.setValue('');
      expect(locControl.valid).toBeTrue();
    });

    it('should accept valid location with alphanumeric words', () => {
      const locControl = component.form.get('location')!;
      locControl.setValue('Conference Room A');
      expect(locControl.valid).toBeTrue();
    });

    it('should reject location with special characters', () => {
      const locControl = component.form.get('location')!;
      locControl.setValue('Room A-1');
      expect(locControl.hasError('eventLocationFormat')).toBeTrue();
    });

    it('should reject location with consecutive spaces', () => {
      const locControl = component.form.get('location')!;
      locControl.setValue('Conference  Room');
      expect(locControl.hasError('eventLocationFormat')).toBeTrue();
    });

    it('should reject location with more than 16 words', () => {
      const locControl = component.form.get('location')!;
      locControl.setValue('One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen');
      expect(locControl.hasError('eventLocationFormat')).toBeTrue();
    });

    it('should update location counters', fakeAsync(() => {
      const locControl = component.form.get('location')!;
      locControl.setValue('Main Building Floor 3');
      tick();
      expect(component.locationWordCount()).toBe(4);
      // "MainBuildingFloor3" = 18 chars (excluding spaces)
      expect(component.locationCharCount()).toBe(18);
    }));
  });

  describe('Event Date Validation', () => {
    it('should require event date', () => {
      const dateControl = component.form.get('eventDate')!;
      dateControl.setValue('');
      expect(dateControl.hasError('required')).toBeTrue();
    });

    it('should reject past dates', () => {
      const dateControl = component.form.get('eventDate')!;
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      dateControl.setValue(pastDate.toISOString());
      expect(dateControl.hasError('futureDate')).toBeTrue();
    });

    it('should accept future dates', () => {
      const dateControl = component.form.get('eventDate')!;
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 1);
      dateControl.setValue(futureDate.toISOString().slice(0, 16));
      expect(dateControl.hasError('futureDate')).toBeFalse();
    });
  });

  describe('Registration Deadline Validation', () => {
    it('should require registration deadline', () => {
      const regControl = component.form.get('registrationEndDate')!;
      regControl.setValue('');
      expect(regControl.hasError('required')).toBeTrue();
    });

    it('should reject registration deadline after event date', () => {
      const eventDateControl = component.form.get('eventDate')!;
      const regControl = component.form.get('registrationEndDate')!;

      const eventDate = new Date();
      eventDate.setMonth(eventDate.getMonth() + 1);
      eventDateControl.setValue(eventDate.toISOString().slice(0, 16));

      const regDate = new Date();
      regDate.setMonth(regDate.getMonth() + 2); // After event date
      regControl.setValue(regDate.toISOString().slice(0, 16));

      regControl.updateValueAndValidity();
      expect(regControl.hasError('registrationBeforeEvent')).toBeTrue();
    });

    it('should accept registration deadline before event date', () => {
      const eventDateControl = component.form.get('eventDate')!;
      const regControl = component.form.get('registrationEndDate')!;

      const eventDate = new Date();
      eventDate.setMonth(eventDate.getMonth() + 2);
      eventDateControl.setValue(eventDate.toISOString().slice(0, 16));

      const regDate = new Date();
      regDate.setMonth(regDate.getMonth() + 1); // Before event date
      regControl.setValue(regDate.toISOString().slice(0, 16));

      regControl.updateValueAndValidity();
      expect(regControl.hasError('registrationBeforeEvent')).toBeFalse();
    });
  });

  describe('Max Participants Validation', () => {
    it('should allow empty max participants (optional)', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(null);
      expect(maxControl.valid).toBeTrue();
    });

    it('should accept valid participant count', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(100);
      expect(maxControl.valid).toBeTrue();
    });

    it('should reject zero participants', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(0);
      expect(maxControl.hasError('eventMaxParticipants')).toBeTrue();
    });

    it('should reject negative participants', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(-5);
      expect(maxControl.hasError('eventMaxParticipants')).toBeTrue();
    });

    it('should reject participants exceeding 100,000', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(100001);
      expect(maxControl.hasError('eventMaxParticipants')).toBeTrue();
    });

    it('should reject decimal values', () => {
      const maxControl = component.form.get('maxParticipants')!;
      maxControl.setValue(10.5);
      expect(maxControl.hasError('eventMaxParticipants')).toBeTrue();
    });
  });

  describe('Total Points Pool Validation', () => {
    it('should require total points', () => {
      const pointsControl = component.form.get('totalPoints')!;
      pointsControl.setValue(null);
      pointsControl.markAsTouched();
      expect(pointsControl.hasError('required')).toBeTrue();
    });

    it('should accept valid points value', () => {
      const pointsControl = component.form.get('totalPoints')!;
      pointsControl.setValue(10000);
      expect(pointsControl.valid).toBeTrue();
    });

    it('should reject zero points', () => {
      const pointsControl = component.form.get('totalPoints')!;
      pointsControl.setValue(0);
      expect(pointsControl.hasError('eventPointsPool')).toBeTrue();
    });

    it('should reject points exceeding 1,000,000', () => {
      const pointsControl = component.form.get('totalPoints')!;
      pointsControl.setValue(1000001);
      expect(pointsControl.hasError('eventPointsPool')).toBeTrue();
    });

    it('should reject decimal values', () => {
      const pointsControl = component.form.get('totalPoints')!;
      pointsControl.setValue(100.5);
      expect(pointsControl.hasError('eventPointsPool')).toBeTrue();
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      // Set up a valid form
      const futureEventDate = new Date();
      futureEventDate.setMonth(futureEventDate.getMonth() + 2);
      
      const futureRegDate = new Date();
      futureRegDate.setMonth(futureRegDate.getMonth() + 1);

      component.form.patchValue({
        name: 'Valid Event Name',
        description: 'This is a valid event description with enough words and characters.',
        eventDate: futureEventDate.toISOString().slice(0, 16),
        registrationEndDate: futureRegDate.toISOString().slice(0, 16),
        location: 'Conference Room A',
        maxParticipants: 100,
        totalPoints: 10000
      });
    });

    it('should not allow submission when form is invalid', () => {
      component.form.get('name')!.setValue('');
      expect(component.canSubmit).toBeFalse();
    });

    it('should not allow submission when uniqueness check is in progress', () => {
      component.nameUniquenessChecking.set(true);
      expect(component.canSubmit).toBeFalse();
    });

    it('should not allow submission when name is not unique', () => {
      component.nameUniquenessResult.set({ isValid: false, message: 'Name taken' });
      expect(component.canSubmit).toBeFalse();
    });

    it('should allow submission when form is valid and name is unique', () => {
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });
      expect(component.canSubmit).toBeTrue();
    });

    it('should call event service on valid submission', fakeAsync(() => {
      eventServiceSpy.createEvent.and.returnValue(of({
        id: '123',
        name: 'Test',
        description: 'Test Description',
        status: 'Upcoming' as any,
        eventDate: '2026-03-15T10:00:00Z',
        participantCount: 0,
        totalPointsPool: 10000,
        distributedPoints: 0
      }));
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });
      
      component.onSubmit();
      tick();
      
      expect(eventServiceSpy.createEvent).toHaveBeenCalled();
    }));

    it('should show error message on submission failure', fakeAsync(() => {
      eventServiceSpy.createEvent.and.returnValue(
        throwError(() => ({ error: { message: 'Server error' } }))
      );
      component.nameUniquenessResult.set({ isValid: true, message: 'Available' });
      
      component.onSubmit();
      tick();
      
      expect(component.showErrorAlert).toBeTrue();
      expect(component.errorMessage).toContain('Server error');
    }));
  });

  describe('IST Timezone Handling', () => {
    it('should have minDateTime set', () => {
      expect(component.minDateTime()).toBeTruthy();
      expect(component.minDateTime().length).toBeGreaterThan(0);
    });

    it('should update maxRegistrationDateTime when eventDate changes', fakeAsync(() => {
      const eventDateControl = component.form.get('eventDate')!;
      const futureDate = '2026-03-15T10:00';
      eventDateControl.setValue(futureDate);
      tick();
      
      expect(component.maxRegistrationDateTime()).toBe(futureDate);
    }));
  });

  describe('UI Elements', () => {
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

    it('should disable submit button when form is invalid', () => {
      component.form.get('name')!.setValue('');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const submitBtn = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitBtn?.disabled).toBeTrue();
    });
  });
});

// Standalone tests for CustomValidators event methods
describe('CustomValidators - Event Validators', () => {
  describe('eventNameFormat', () => {
    const validator = CustomValidators.eventNameFormat();

    it('should return null for valid name', () => {
      const control = { value: 'Spring Sales Contest' } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for consecutive spaces', () => {
      const control = { value: 'Spring  Sales' } as any;
      expect(validator(control)?.['eventNameFormat']).toBeTruthy();
    });

    it('should return error for special characters', () => {
      const control = { value: 'Spring-Sales' } as any;
      expect(validator(control)?.['eventNameFormat']).toBeTruthy();
    });

    it('should return error for too many words', () => {
      const control = { value: 'One Two Three Four Five Six Seven Eight' } as any;
      expect(validator(control)?.['eventNameFormat']).toBeTruthy();
    });

    it('should return error for too few characters', () => {
      const control = { value: 'A' } as any;
      expect(validator(control)?.['eventNameFormat']).toBeTruthy();
    });

    it('should handle empty value', () => {
      const control = { value: '' } as any;
      expect(validator(control)).toBeNull();
    });
  });

  describe('eventDescriptionFormat', () => {
    const validator = CustomValidators.eventDescriptionFormat();

    it('should return null for valid description', () => {
      const control = { value: 'This is a valid description with enough words and characters to pass.' } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for too short', () => {
      const control = { value: 'Too short' } as any;
      expect(validator(control)?.['eventDescriptionFormat']).toBeTruthy();
    });

    it('should return error for too few words', () => {
      const control = { value: 'Oneverylongword' } as any;
      expect(validator(control)?.['eventDescriptionFormat']).toBeTruthy();
    });
  });

  describe('eventLocationFormat', () => {
    const validator = CustomValidators.eventLocationFormat();

    it('should return null for empty (optional)', () => {
      const control = { value: '' } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid location', () => {
      const control = { value: 'Conference Room A' } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for special characters', () => {
      const control = { value: 'Room A-1' } as any;
      expect(validator(control)?.['eventLocationFormat']).toBeTruthy();
    });
  });

  describe('eventMaxParticipants', () => {
    const validator = CustomValidators.eventMaxParticipants();

    it('should return null for valid value', () => {
      const control = { value: 100 } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return null for null (optional)', () => {
      const control = { value: null } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for zero', () => {
      const control = { value: 0 } as any;
      expect(validator(control)?.['eventMaxParticipants']).toBeTruthy();
    });

    it('should return error for exceeding max', () => {
      const control = { value: 100001 } as any;
      expect(validator(control)?.['eventMaxParticipants']).toBeTruthy();
    });

    it('should return error for decimal', () => {
      const control = { value: 10.5 } as any;
      expect(validator(control)?.['eventMaxParticipants']).toBeTruthy();
    });
  });

  describe('eventPointsPool', () => {
    const validator = CustomValidators.eventPointsPool();

    it('should return null for valid value', () => {
      const control = { value: 10000 } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for zero', () => {
      const control = { value: 0 } as any;
      expect(validator(control)?.['eventPointsPool']).toBeTruthy();
    });

    it('should return error for exceeding max', () => {
      const control = { value: 1000001 } as any;
      expect(validator(control)?.['eventPointsPool']).toBeTruthy();
    });

    it('should return error for decimal', () => {
      const control = { value: 100.5 } as any;
      expect(validator(control)?.['eventPointsPool']).toBeTruthy();
    });
  });

  describe('futureDate', () => {
    const validator = CustomValidators.futureDate();

    it('should return null for future date', () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 1);
      const control = { value: futureDate.toISOString() } as any;
      expect(validator(control)).toBeNull();
    });

    it('should return error for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const control = { value: pastDate.toISOString() } as any;
      expect(validator(control)?.['futureDate']).toBeTruthy();
    });

    it('should return null for empty', () => {
      const control = { value: '' } as any;
      expect(validator(control)).toBeNull();
    });
  });
});
