import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, switchMap, tap, of, filter } from 'rxjs';
import { EventService } from '../../../services/event.service';
import { ValidationService, ValidationResult } from '../../../services/validation.service';
import { CreateEventRequest } from '../../../models/event.models';
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
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationHintComponent, FormErrorsSummaryComponent],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  showErrorAlert = false;

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
    totalPoints: 'Total Points Pool'
  };

  private destroy$ = new Subject<void>();
  private nameChange$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private validationService: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChangeListeners();
    this.setupNameUniquenessCheck();
    this.updateMinDateTime();

    // Update min datetime every minute
    setInterval(() => this.updateMinDateTime(), 60000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    // Get tomorrow's date as default for event date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const defaultEventDate = formatDateTimeForInputIst(tomorrow);

    // Registration end defaults to day before event
    const regEnd = new Date(tomorrow);
    regEnd.setDate(regEnd.getDate() - 1);
    regEnd.setHours(23, 59, 0, 0);
    const defaultRegEndDate = formatDateTimeForInputIst(regEnd);

    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        CustomValidators.eventNameFormat()
      ]],
      description: ['', [
        Validators.required,
        CustomValidators.eventDescriptionFormat()
      ]],
      eventDate: [defaultEventDate, [
        Validators.required,
        CustomValidators.futureDate()
      ]],
      registrationEndDate: [defaultRegEndDate, [
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
      totalPoints: [1000, [
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
        return this.validationService.checkEventNameAvailability(name);
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
      this.validationService.checkEventNameAvailability(name)
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

    const request: CreateEventRequest = {
      name: this.form.value.name.trim(),
      description: this.form.value.description.trim(),
      eventDate: eventDateUtc,
      location: this.form.value.location?.trim() || undefined,
      maxParticipants: this.form.value.maxParticipants || undefined,
      totalPointsPool: this.form.value.totalPoints,
      registrationEndDateUtc: registrationEndUtc
    };

    console.log('[EventCreate] Submitting form:', request);

    this.eventService
      .createEvent(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event: any) => {
          console.log('[EventCreate] Event created successfully:', event);
          this.isSubmitting = false;
          // Navigate to event detail
          this.router.navigate(['/admin/events', event.id]);
        },
        error: (error) => {
          console.error('[EventCreate] Error creating event:', error);
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
            this.errorMessage = 'Failed to create event. Please try again.';
          }
          this.showErrorAlert = true;
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/admin/events']);
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }
}
