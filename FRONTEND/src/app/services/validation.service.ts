import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject, timer } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, share, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface UniquenessCheckState {
  checking: boolean;
  result: ValidationResult | null;
}

/**
 * Service for server-side validation checks with debouncing
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private apiUrl = environment.apiUrl;
  private debounceTime = 500; // 500ms debounce

  constructor(private http: HttpClient) {}

  /**
   * Check email availability with debouncing
   */
  checkEmailAvailability(email: string, excludeUserId?: string): Observable<ValidationResult> {
    if (!email || email.trim().length === 0) {
      return of({ isValid: false, message: 'Email is required' });
    }

    let params = new HttpParams().set('email', email.trim());
    if (excludeUserId) {
      params = params.set('excludeUserId', excludeUserId);
    }

    return this.http.get<ValidationResult>(`${this.apiUrl}/validation/check-email`, { params }).pipe(
      catchError(error => {
        console.error('Email validation error:', error);
        return of({ isValid: true, message: '' }); // Fail open - let backend validate
      })
    );
  }

  /**
   * Check employee ID availability with debouncing
   */
  checkEmployeeIdAvailability(employeeId: string, excludeUserId?: string): Observable<ValidationResult> {
    if (!employeeId || employeeId.trim().length === 0) {
      return of({ isValid: false, message: 'Employee ID is required' });
    }

    let params = new HttpParams().set('employeeId', employeeId.trim());
    if (excludeUserId) {
      params = params.set('excludeUserId', excludeUserId);
    }

    return this.http.get<ValidationResult>(`${this.apiUrl}/validation/check-employee-id`, { params }).pipe(
      catchError(error => {
        console.error('Employee ID validation error:', error);
        return of({ isValid: true, message: '' }); // Fail open - let backend validate
      })
    );
  }

  /**
   * Check category name availability with debouncing
   */
  checkCategoryNameAvailability(name: string): Observable<ValidationResult> {
    if (!name || name.trim().length === 0) {
      return of({ isValid: false, message: 'Category name is required' });
    }

    const params = new HttpParams().set('name', name.trim());

    return this.http.get<ValidationResult>(`${this.apiUrl}/validation/check-category-name`, { params }).pipe(
      catchError(error => {
        console.error('Category name validation error:', error);
        return of({ isValid: true, message: '' }); // Fail open - let backend validate
      })
    );
  }

  /**
   * Creates a debounced uniqueness checker that can be used with forms
   * Returns an observable that emits checking state and results
   */
  createDebouncedChecker(
    valueChanges$: Observable<string>,
    checkFn: (value: string) => Observable<ValidationResult>,
    debounceMs: number = this.debounceTime
  ): Observable<UniquenessCheckState> {
    return valueChanges$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.trim().length === 0) {
          return of({ checking: false, result: null });
        }
        
        // Emit checking state, then result
        return new Observable<UniquenessCheckState>(subscriber => {
          subscriber.next({ checking: true, result: null });
          
          checkFn(value).subscribe({
            next: result => {
              subscriber.next({ checking: false, result });
              subscriber.complete();
            },
            error: () => {
              subscriber.next({ checking: false, result: { isValid: true, message: '' } });
              subscriber.complete();
            }
          });
        });
      }),
      share()
    );
  }
}
