import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventManagementComponent } from './event-management.component';
import { EventService } from '../../../services/event.service';
import { of, throwError } from 'rxjs';
import { Event } from '../../../models/event.models';
import { ChangeDetectorRef } from '@angular/core';

describe('EventManagementComponent - Create & Edit Events', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;
  let eventService: jasmine.SpyObj<EventService>;
  let cdr: ChangeDetectorRef;

  const mockEvent: Event = {
    id: '123',
    name: 'Test Event',
    description: 'Test Description',
    eventDate: '2026-02-15T14:00:00Z',
    registrationEndDateUtc: '2026-02-10T12:00:00Z',
    location: 'Test Location',
    status: 'Upcoming' as any,
    totalPointsPool: 1000,
    maxParticipants: 50,
    participantCount: 10,
    bannerImageUrl: undefined,
    distributedPoints: 100
  };

  beforeEach(async () => {
    const eventServiceSpy = jasmine.createSpyObj('EventService', [
      'getEvents',
      'createEvent',
      'updateEvent',
      'getEventById'
    ]);

    await TestBed.configureTestingModule({
      imports: [EventManagementComponent, HttpClientTestingModule],
      providers: [
        { provide: EventService, useValue: eventServiceSpy }
      ]
    }).compileComponents();

    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    
    // Mock getEvents to return empty list
    eventService.getEvents.and.returnValue(of([]));
  });

  describe('Event Form Initialization', () => {
    it('should initialize newEvent form with default values', () => {
      component.resetEventForm();
      
      expect(component.newEvent.name).toBe('');
      expect(component.newEvent.description).toBe('');
      expect(component.newEvent.location).toBe('');
      expect(component.newEvent.totalPointsPool).toBe(0);
      expect(component.newEvent.eventDate).toBeTruthy(); // Should have datetime-local format
    });

    it('should have datetime-local format for eventDate (YYYY-MM-DDTHH:mm)', () => {
      component.resetEventForm();
      
      const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      expect(component.newEvent.eventDate).toMatch(dateFormat);
    });
  });

  describe('Form Validation', () => {
    it('should reject event with name less than 3 characters', () => {
      component.newEvent = {
        name: 'AB',
        description: 'A valid description',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeFalse();
      expect(component.errorMessage).toContain('Event name must be at least 3 characters');
    });

    it('should reject event with description less than 10 characters', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'Short',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeFalse();
      expect(component.errorMessage).toContain('Description must be at least 10 characters');
    });

    it('should reject event with totalPointsPool less than 1', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'A valid description here',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 0
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeFalse();
      expect(component.errorMessage).toContain('Total points pool must be at least 1');
    });

    it('should reject when registration date is after event date', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'A valid description here',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-20T12:00', // After event date
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeFalse();
      expect(component.errorMessage).toContain('Registration deadline must be strictly earlier than event start time');
    });

    it('should reject when registration date equals event date (same date/time)', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'A valid description here',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-15T14:00', // Same as event date
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeFalse();
      expect(component.errorMessage).toContain('Registration deadline must be strictly earlier than event start time');
    });

    it('should accept same-day registration deadline if time is earlier', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'A valid description here',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-15T10:00', // Same day, earlier time
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeTrue();
    });

    it('should accept valid event form', () => {
      component.newEvent = {
        name: 'Valid Event',
        description: 'A valid description here',
        eventDate: '2026-02-15T14:00',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 100
      };

      const isValid = component.validateEventForm();
      
      expect(isValid).toBeTrue();
    });
  });

  describe('Create Event', () => {
    it('should create event with datetime-local conversion to ISO UTC', () => {
      const createdEvent = { ...mockEvent };
      eventService.createEvent.and.returnValue(of(createdEvent));

      component.newEvent = {
        name: 'New Event',
        description: 'A valid description',
        eventDate: '2026-02-15T14:30', // datetime-local format
        registrationEndDateUtc: '2026-02-10T12:00', // datetime-local format
        location: 'Location',
        totalPointsPool: 500
      };

      component.submitNewEvent();

      expect(eventService.createEvent).toHaveBeenCalled();
      const passedPayload = eventService.createEvent.calls.mostRecent().args[0];
      
      // Verify dates are converted to ISO format
      expect(passedPayload.eventDate).toMatch(/Z$/); // Should end with Z for UTC
      expect(passedPayload.registrationEndDateUtc).toMatch(/Z$/);
    });

    it('should show success message after creating event', (done) => {
      const createdEvent = { ...mockEvent, id: '456' };
      eventService.createEvent.and.returnValue(of(createdEvent));
      eventService.getEvents.and.returnValue(of([createdEvent]));

      component.newEvent = {
        name: 'New Event',
        description: 'A valid description',
        eventDate: '2026-02-15T14:30',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 500
      };

      component.submitNewEvent();

      setTimeout(() => {
        expect(component.successMessage).toContain('created successfully');
        done();
      }, 100);
    });

    it('should handle create event error', () => {
      const error = { error: { message: 'Server error' } };
      eventService.createEvent.and.returnValue(throwError(() => error));

      component.newEvent = {
        name: 'New Event',
        description: 'A valid description',
        eventDate: '2026-02-15T14:30',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 500
      };

      component.submitNewEvent();

      expect(component.showErrorAlert).toBeTrue();
      expect(component.errorMessage).toContain('Failed to create event');
    });

    it('should close modal after successful creation', (done) => {
      eventService.createEvent.and.returnValue(of(mockEvent));
      eventService.getEvents.and.returnValue(of([mockEvent]));

      component.newEvent = {
        name: 'New Event',
        description: 'A valid description',
        eventDate: '2026-02-15T14:30',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Location',
        totalPointsPool: 500
      };

      component.submitNewEvent();

      setTimeout(() => {
        expect(component.showCreateEventModal).toBeFalse();
        done();
      }, 100);
    });
  });

  describe('Edit Event', () => {
    it('should load event data into form for editing', () => {
      component.openEditEventModal(mockEvent);

      expect(component.editingEventId).toBe(mockEvent.id);
      expect(component.newEvent.name).toBe(mockEvent.name);
      expect(component.newEvent.description).toBe(mockEvent.description);
      expect(component.newEvent.location).toBe(mockEvent.location);
      expect(component.newEvent.totalPointsPool).toBe(mockEvent.totalPointsPool);
      expect(component.showEditEventModal).toBeTrue();
    });

    it('should format UTC dates to datetime-local format for edit', () => {
      component.openEditEventModal(mockEvent);

      // Should be in YYYY-MM-DDTHH:mm format
      const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      expect(component.newEvent.eventDate).toMatch(dateFormat);
      expect(component.newEvent.registrationEndDateUtc).toMatch(dateFormat);
    });

    it('should update event with datetime-local conversion', () => {
      const updatedEvent = { ...mockEvent, name: 'Updated Event' };
      eventService.updateEvent.and.returnValue(of(updatedEvent));
      eventService.getEvents.and.returnValue(of([updatedEvent]));

      component.editingEventId = mockEvent.id;
      component.newEvent = {
        name: 'Updated Event',
        description: 'Updated description',
        eventDate: '2026-02-20T15:00', // datetime-local format
        registrationEndDateUtc: '2026-02-15T13:00', // datetime-local format
        location: 'New Location',
        totalPointsPool: 750
      };

      component.submitEditEvent();

      expect(eventService.updateEvent).toHaveBeenCalled();
      const callArgs = eventService.updateEvent.calls.mostRecent().args;
      const eventId = callArgs[0];
      const updatePayload = callArgs[1];

      expect(eventId).toBe(mockEvent.id);
      // Verify dates are converted to ISO format
      expect(updatePayload.eventDate).toMatch(/Z$/);
      expect(updatePayload.registrationEndDateUtc).toMatch(/Z$/);
    });

    it('should show success message after updating event', (done) => {
      const updatedEvent = { ...mockEvent, name: 'Updated Event' };
      eventService.updateEvent.and.returnValue(of(updatedEvent));
      eventService.getEvents.and.returnValue(of([updatedEvent]));

      component.editingEventId = mockEvent.id;
      component.newEvent = {
        name: 'Updated Event',
        description: 'Updated description',
        eventDate: '2026-02-20T15:00',
        registrationEndDateUtc: '2026-02-15T13:00',
        location: 'New Location',
        totalPointsPool: 750
      };

      component.submitEditEvent();

      setTimeout(() => {
        expect(component.successMessage).toContain('updated successfully');
        done();
      }, 100);
    });

    it('should handle update event error', () => {
      const error = { error: { message: 'Update failed' } };
      eventService.updateEvent.and.returnValue(throwError(() => error));

      component.editingEventId = mockEvent.id;
      component.newEvent = {
        name: 'Updated Event',
        description: 'Updated description',
        eventDate: '2026-02-20T15:00',
        registrationEndDateUtc: '2026-02-15T13:00',
        location: 'New Location',
        totalPointsPool: 750
      };

      component.submitEditEvent();

      expect(component.showErrorAlert).toBeTrue();
      expect(component.errorMessage).toContain('Failed to update event');
    });

    it('should close modal after successful update', (done) => {
      const updatedEvent = { ...mockEvent, name: 'Updated Event' };
      eventService.updateEvent.and.returnValue(of(updatedEvent));
      eventService.getEvents.and.returnValue(of([updatedEvent]));

      component.editingEventId = mockEvent.id;
      component.newEvent = {
        name: 'Updated Event',
        description: 'Updated description',
        eventDate: '2026-02-20T15:00',
        registrationEndDateUtc: '2026-02-15T13:00',
        location: 'New Location',
        totalPointsPool: 750
      };

      component.submitEditEvent();

      setTimeout(() => {
        expect(component.showEditEventModal).toBeFalse();
        done();
      }, 100);
    });
  });

  describe('Datetime Format Helper', () => {
    it('should format UTC datetime to datetime-local format', () => {
      const utcDate = '2026-02-15T14:30:00Z';
      const result = component.formatDatetimeForInput(utcDate);

      const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      expect(result).toMatch(dateFormat);
    });

    it('should return empty string for empty input', () => {
      const result = component.formatDatetimeForInput('');
      expect(result).toBe('');
    });

    it('should handle null input gracefully', () => {
      const result = component.formatDatetimeForInput(null as any);
      expect(result).toBe('');
    });
  });

  describe('Modal Management', () => {
    it('should close event modal', () => {
      component.showCreateEventModal = true;
      component.showEditEventModal = true;
      component.editingEventId = 'test-id';

      component.closeEventModal();

      expect(component.showCreateEventModal).toBeFalse();
      expect(component.showEditEventModal).toBeFalse();
      expect(component.editingEventId).toBeNull();
    });

    it('should reset form after closing modal', () => {
      component.newEvent = {
        name: 'Test',
        description: 'Test',
        eventDate: '2026-02-15T14:30',
        registrationEndDateUtc: '2026-02-10T12:00',
        location: 'Test',
        totalPointsPool: 100
      };

      component.closeEventModal();

      expect(component.newEvent.name).toBe('');
      expect(component.newEvent.description).toBe('');
      expect(component.newEvent.totalPointsPool).toBe(0);
    });
  });
});
