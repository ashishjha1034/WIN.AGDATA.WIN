import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, switchMap, tap, of, filter } from 'rxjs';
import { EventService } from '../../../services/event.service';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { EventDetail, UpdateEventRequest } from '../../../models/event.models';
import { ValidationHintComponent } from '../../../shared/components/validation-hint.component';
import { FormErrorsSummaryComponent } from '../../../shared/components/form-errors-summary.component';
import { CustomValidators, ValidationConstants } from '../../../shared/validators/custom-validators';
import { 
  formatDateTimeForInputIst, 
  parseInputDateTimeToUtcIso, 
  getMinDateTimeForInput,
  EventValidationUtils 
} from '../../../shared/utils/ist-timezone.utils';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationHintComponent, FormErrorsSummaryComponent],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  eventDetail: EventDetail | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  showErrorAlert = false;
  pointsLocked = false;

  // Signals for real-time counters
  nameCharCount = signal(0);
  nameWordCount = signal(0);
  descCharCount = signal(0);
  descWordCount = signal(0);
  locationCharCount = signal(0);
  locationWordCount = signal(0);

  // Uniqueness check state
  nameUniquenessChecking = signal(false);
  nameUniquenessResult = signal<ValidationResult | null>(null);

  // Date constraints
  minDateTime = signal(getMinDateTimeForInput());
  maxRegistrationDateTime = signal('');

  // Validation constants for template
  readonly validationConstants = ValidationConstants;

  // Field labels for error summary
  fieldLabels: { [key: string]: string } = {
    name: 'Event Name',
    description: 'Description',
    eventDate: 'Event Date (IST)',
    registrationEndDate: 'Registration Deadline (IST)',
    location: 'Location',
    maxParticipants: 'Max Participants',
    totalPointsPool: 'Total Points Pool'
  };

  private eventId = '';
  private destroy$ = new Subject<void>();
  private nameChange$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChangeListeners();
    this.setupNameUniquenessCheck();
    this.loadEvent();
    this.updateMinDateTime();

    // Update min datetime every minute
    setInterval(() => this.updateMinDateTime(), 60000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        CustomValidators.eventNameFormat()
      ]],
      description: ['', [
        Validators.required,
        CustomValidators.eventDescriptionFormat()
      ]],
      eventDate: ['', [
        Validators.required,
        CustomValidators.futureDate()
      ]],
      registrationEndDate: ['', [
        Validators.required,
        CustomValidators.futureDate(),
        CustomValidators.registrationBeforeEvent('eventDate')
      ]],
      location: ['', [
        CustomValidators.eventLocationFormat()
      ]],
      maxParticipants: [null, [
        CustomValidators.eventMaxParticipants()
      ]],
      totalPointsPool: [null, [
        Validators.required,
        CustomValidators.eventPointsPool()
      ]]
    });

    // Cross-field validation: re-validate registrationEndDate when eventDate changes
    this.form.get('eventDate')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const regEndControl = this.form.get('registrationEndDate');
      if (regEndControl) {
        regEndControl.updateValueAndValidity();
      }
      // Update max datetime for registration
      const eventDate = this.form.get('eventDate')?.value;
      if (eventDate) {
        this.maxRegistrationDateTime.set(eventDate);
      }
    });
  }

  private setupValueChangeListeners(): void {
    // Name counters
    this.form.get('name')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.nameCharCount.set(EventValidationUtils.countCharsNoSpaces(value));
      this.nameWordCount.set(EventValidationUtils.countWords(value));
      // Trigger uniqueness check
      if (value && value.trim().length >= 2) {
        this.nameChange$.next(value);
      } else {
        this.nameUniquenessResult.set(null);
      }
    });

    // Description counters
    this.form.get('description')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.descCharCount.set(value?.trim()?.length || 0);
      this.descWordCount.set(EventValidationUtils.countWords(value));
    });

    // Location counters
    this.form.get('location')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.locationCharCount.set(EventValidationUtils.countCharsNoSpaces(value));
      this.locationWordCount.set(EventValidationUtils.countWords(value));
    });
  }

  private setupNameUniquenessCheck(): void {
    this.nameChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      filter(name => {
        // Only check if name passes format validation
        const nameControl = this.form.get('name');
        return nameControl?.valid ?? false;
      }),
      tap(() => {
        this.nameUniquenessChecking.set(true);
        this.nameUniquenessResult.set(null);
      }),
      switchMap(name => {
        if (!name || name.trim().length < 2) {
          return of(null);
        }
        // Pass excludeEventId for edit scenario
        return this.validationService.checkEventNameAvailability(name, this.eventId);
      })
    ).subscribe({
      next: (result) => {
        this.nameUniquenessChecking.set(false);
        this.nameUniquenessResult.set(result);
      },
      error: () => {
        this.nameUniquenessChecking.set(false);
        this.nameUniquenessResult.set(null);
      }
    });
  }

  private updateMinDateTime(): void {
    this.minDateTime.set(getMinDateTimeForInput());
  }

  private loadEvent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id || '';

    if (!this.eventId) {
      this.router.navigate(['/admin/events']);
      return;
    }

    this.isLoading = true;

    this.eventService
      .getEventDetail(this.eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          console.log('[EventEdit] Event loaded:', event);
          this.eventDetail = event;
          this.isLoading = false;

          // Determine if this event can be edited (only Draft/Upcoming)
          if (event.status !== 'Upcoming' && event.status !== 'Live') {
            this.errorMessage = `Cannot edit event in ${event.status} status`;
            this.showErrorAlert = true;
            setTimeout(() => this.router.navigate(['/admin/events', this.eventId]), 2000);
            return;
          }

          // Determine if points are locked
          this.pointsLocked = event.status === 'Live';

          // Populate form
          this.populateForm(event);
        },
        error: (error) => {
          console.error('[EventEdit] Error loading event:', error);
          this.isLoading = false;
          this.errorMessage = 'Failed to load event. Please try again.';
          this.showErrorAlert = true;
        }
      });
  }

  private populateForm(event: EventDetail): void {
    // Convert UTC dates to IST for display
    const eventDateIst = formatDateTimeForInputIst(event.eventDate);
    
    // Try registrationEndDateUtc first, then fall back to registrationEndDate
    const regEndDateUtc = event.registrationEndDateUtc || event.registrationEndDate;
    const regEndDateIst = regEndDateUtc 
      ? formatDateTimeForInputIst(regEndDateUtc) 
      : '';

    const formValue = {
      name: event.name,
      description: event.description,
      eventDate: eventDateIst,
      registrationEndDate: regEndDateIst,
      location: event.location || '',
      maxParticipants: event.maxParticipants || null,
      totalPointsPool: event.totalPointsPool
    };

    this.form.patchValue(formValue);

    // Update counters
    this.nameCharCount.set(EventValidationUtils.countCharsNoSpaces(event.name));
    this.nameWordCount.set(EventValidationUtils.countWords(event.name));
    this.descCharCount.set(event.description?.trim()?.length || 0);
    this.descWordCount.set(EventValidationUtils.countWords(event.description));
    this.locationCharCount.set(EventValidationUtils.countCharsNoSpaces(event.location));
    this.locationWordCount.set(EventValidationUtils.countWords(event.location));

    // Update max registration datetime
    if (eventDateIst) {
      this.maxRegistrationDateTime.set(eventDateIst);
    }

    // Lock points fields if event is Live
    if (this.pointsLocked) {
      this.form.get('totalPointsPool')?.disable();
    }
  }

  get f() {
    return this.form.controls;
  }

  get eventDate() {
    return this.form.get('eventDate');
  }

  get registrationEndDate() {
    return this.form.get('registrationEndDate');
  }

  /**
   * Check if the form can be submitted
   */
  get canSubmit(): boolean {
    if (!this.form) return false;
    const isFormValid = this.form.valid;
    const isUniquenessResolved = !this.nameUniquenessChecking() && 
      (this.nameUniquenessResult()?.isValid !== false);
    return isFormValid && isUniquenessResolved && !this.isSubmitting;
  }

  /**
   * Manual trigger for name availability check
   */
  checkNameAvailability(): void {
    const name = this.form.get('name')?.value;
    if (name && name.trim().length >= 2) {
      this.nameUniquenessChecking.set(true);
      this.nameUniquenessResult.set(null);
      this.validationService.checkEventNameAvailability(name, this.eventId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result) => {
            this.nameUniquenessChecking.set(false);
            this.nameUniquenessResult.set(result);
          },
          error: () => {
            this.nameUniquenessChecking.set(false);
            this.nameUniquenessResult.set(null);
          }
        });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.showErrorAlert = false;

    // Mark all fields as touched to show validation
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (!this.form.valid) {
      this.errorMessage = 'Please fix the validation errors below';
      this.showErrorAlert = true;
      return;
    }

    // Check uniqueness result
    if (this.nameUniquenessResult()?.isValid === false) {
      this.errorMessage = 'Event name is not available. Please choose a different name.';
      this.showErrorAlert = true;
      return;
    }

    this.isSubmitting = true;

    // Convert IST dates to UTC ISO strings
    const eventDateUtc = parseInputDateTimeToUtcIso(this.form.value.eventDate);
    const registrationEndUtc = parseInputDateTimeToUtcIso(this.form.value.registrationEndDate);

    const request: UpdateEventRequest = {
      name: this.form.value.name.trim(),
      description: this.form.value.description.trim(),
      eventDate: eventDateUtc,
      registrationEndDateUtc: registrationEndUtc,
      location: this.form.value.location?.trim() || '',
      maxParticipants: this.form.value.maxParticipants || undefined,
      totalPointsPool: this.pointsLocked
        ? this.eventDetail?.totalPointsPool || 0
        : this.form.getRawValue().totalPointsPool
    };

    console.log('[EventEdit] Submitting form:', request);

    this.eventService
      .updateEvent(this.eventId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[EventEdit] Event updated successfully');
          this.isSubmitting = false;
          // Navigate back to event detail
          this.router.navigate(['/admin/events', this.eventId]);
        },
        error: (error) => {
          console.error('[EventEdit] Error updating event:', error);
          this.isSubmitting = false;
          
          // Handle validation errors from backend
          if (error.error?.errors) {
            const fieldErrors = Object.entries(error.error.errors)
              .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
              .join('\n');
            this.errorMessage = `Validation failed:\n${fieldErrors}`;
          } else if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Failed to update event. Please try again.';
          }
          this.showErrorAlert = true;
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/admin/events', this.eventId]);
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }
}
