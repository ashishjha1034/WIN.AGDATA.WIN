import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { CreateEventRequest } from '../../../models/event.models';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  showErrorAlert = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      eventDate: [today, Validators.required],
      location: ['', Validators.maxLength(200)],
      maxParticipants: [0, Validators.min(0)],
      totalPoints: [0, [Validators.required, Validators.min(1)]],
      registrationEndDate: ['', Validators.required]
    });
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
   * Validate that dates make sense
   */
  validateDates(): boolean {
    const eventDate = new Date(this.eventDate?.value);
    const regEndDate = new Date(this.registrationEndDate?.value);

    // Registration deadline must be before or on event start
    if (regEndDate > eventDate) {
      this.errorMessage = 'Registration deadline must be before or on event start date';
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

    const request: CreateEventRequest = {
      name: this.form.value.name,
      description: this.form.value.description,
      eventDate: this.form.value.eventDate,
      location: this.form.value.location || undefined,
      maxParticipants: this.form.value.maxParticipants || undefined,
      totalPointsPool: this.form.value.totalPoints,
      registrationEndDateUtc: this.form.value.registrationEndDate
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
          this.errorMessage = 'Failed to create event. Please try again.';
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
