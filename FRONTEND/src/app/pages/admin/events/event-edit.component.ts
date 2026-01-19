import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { EventDetail, UpdateEventRequest } from '../../../models/event.models';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  private eventId = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEvent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      eventDate: ['', Validators.required],
      registrationDeadline: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.maxLength(200)],
      maxParticipants: [0, [Validators.required, Validators.min(1)]],
      pointsPerParticipant: [0, [Validators.required, Validators.min(1)]]
    });
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

          // Determine if this event can be edited
          if (event.status !== 'Draft' && event.status !== 'Active') {
            this.errorMessage = `Cannot edit event in ${event.status} status`;
            this.showErrorAlert = true;
            setTimeout(() => this.router.navigate(['/admin/events', this.eventId]), 2000);
            return;
          }

          // Determine if points are locked
          this.pointsLocked = event.status === 'Active';

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
    const formValue = {
      name: event.name,
      description: event.description,
      eventDate: this.formatDateForInput(event.eventDate),
      registrationDeadline: event.registrationDeadline ? this.formatDateForInput(event.registrationDeadline) : '',
      endDate: event.endDate ? this.formatDateForInput(event.endDate) : '',
      location: event.location || '',
      maxParticipants: event.maxParticipants,
      pointsPerParticipant: event.pointsPerParticipant
    };

    this.form.patchValue(formValue);

    // Lock points fields if event is Active
    if (this.pointsLocked) {
      this.form.get('pointsPerParticipant')?.disable();
    }
  }

  private formatDateForInput(dateString: string): string {
    // Convert from ISO string to YYYY-MM-DD format
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  get f() {
    return this.form.controls;
  }

  get eventDate() {
    return this.form.get('eventDate');
  }

  get registrationDeadline() {
    return this.form.get('registrationDeadline');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  /**
   * Validate that dates make sense
   */
  validateDates(): boolean {
    const eventDate = new Date(this.eventDate?.value);
    const regDeadline = new Date(this.registrationDeadline?.value);
    const endDate = new Date(this.endDate?.value);

    // Registration deadline must be before event start
    if (regDeadline >= eventDate) {
      this.errorMessage = 'Registration deadline must be before event start date';
      this.showErrorAlert = true;
      return false;
    }

    // Event end date must be after event start
    if (endDate < eventDate) {
      this.errorMessage = 'Event end date must be after event start date';
      this.showErrorAlert = true;
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.showErrorAlert = false;

    if (!this.form.valid) {
      this.errorMessage = 'Please fill all required fields correctly';
      this.showErrorAlert = true;
      return;
    }

    if (!this.validateDates()) {
      return;
    }

    this.isSubmitting = true;

    const request: UpdateEventRequest = {
      name: this.form.value.name,
      description: this.form.value.description,
      eventDate: this.form.value.eventDate,
      registrationDeadline: this.form.value.registrationDeadline,
      endDate: this.form.value.endDate,
      location: this.form.value.location || '',
      maxParticipants: this.form.value.maxParticipants,
      pointsPerParticipant: this.pointsLocked
        ? this.eventDetail?.pointsPerParticipant || 0
        : this.form.value.pointsPerParticipant
    };

    console.log('[EventEdit] Submitting form:', request);

    this.eventService
      .updateEvent(this.eventId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[EventEdit] Event updated successfully');
          this.isSubmitting = false;
          // Navigate back to event detail, staying on current tab
          this.router.navigate(['/admin/events', this.eventId]);
        },
        error: (error) => {
          console.error('[EventEdit] Error updating event:', error);
          this.isSubmitting = false;
          this.errorMessage = 'Failed to update event. Please try again.';
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
