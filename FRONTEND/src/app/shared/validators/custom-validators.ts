import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

/**
 * Validation constants - must match backend rules
 */
export const ValidationConstants = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMPLOYEE_ID_LENGTH: 9,
  PASSWORD_MIN_LENGTH: 12,
  CORPORATE_DOMAIN: '@agdata.com',
  CORPORATE_EMAIL_LOCAL_MIN: 5, // Minimum characters before @
  
  PRODUCT_NAME_MAX_WORDS: 4,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 500,
  DESCRIPTION_MIN_WORDS: 3,
  DESCRIPTION_MAX_WORDS: 100,
  
  POINTS_COST_MIN: 1,  // Changed from 0 to 1 - must be positive
  POINTS_COST_MAX: 10_000_000,
  STOCK_MIN: 1,  // Changed from 0 to 1
  STOCK_MAX: 1_000_000,
  IMAGE_URL_MAX_LENGTH: 1000,
  
  DEBOUNCE_TIME_MS: 500,
  
  // =============================================
  // EVENT VALIDATION CONSTANTS (matching backend)
  // =============================================
  EVENT_NAME_MIN_LENGTH: 2,
  EVENT_NAME_MAX_LENGTH: 50,
  EVENT_NAME_MIN_WORDS: 1,
  EVENT_NAME_MAX_WORDS: 7,
  
  EVENT_DESCRIPTION_MIN_LENGTH: 20,
  EVENT_DESCRIPTION_MAX_LENGTH: 500,
  EVENT_DESCRIPTION_MIN_WORDS: 3,
  EVENT_DESCRIPTION_MAX_WORDS: 100,
  
  EVENT_LOCATION_MIN_LENGTH: 2,
  EVENT_LOCATION_MAX_LENGTH: 100,
  EVENT_LOCATION_MAX_WORDS: 16,
  
  EVENT_MAX_PARTICIPANTS_MIN: 1,
  EVENT_MAX_PARTICIPANTS_MAX: 100_000,
  
  EVENT_POINTS_POOL_MIN: 1,
  EVENT_POINTS_POOL_MAX: 1_000_000,
  
  // IST Timezone offset in hours (UTC+5:30)
  IST_OFFSET_HOURS: 5.5
};

/**
 * Custom validators for WIN.AGDATA.WIN forms
 */
export class CustomValidators {
  
  /**
   * Validates that a name contains only letters (no spaces, digits, or symbols)
   */
  static alphabetOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[a-zA-Z]+$/.test(control.value);
      return valid ? null : { alphabetOnly: { message: 'Only letters allowed (no spaces, digits, or symbols)' } };
    };
  }

  /**
   * Validates Employee ID: exactly 9 alphanumeric characters
   */
  static employeeIdFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[a-zA-Z0-9]{9}$/.test(control.value);
      return valid ? null : { employeeIdFormat: { message: 'Must be exactly 9 alphanumeric characters' } };
    };
  }

  /**
   * Validates email ends with corporate domain AND has local-part >= 5 chars
   */
  static corporateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const email = control.value.toLowerCase();
      const atIndex = email.lastIndexOf('@');
      
      // Check domain
      if (!email.endsWith(ValidationConstants.CORPORATE_DOMAIN)) {
        return { corporateEmail: { message: `Email must end with ${ValidationConstants.CORPORATE_DOMAIN}` } };
      }
      
      // Check local-part length (before @)
      const localPart = email.substring(0, atIndex);
      if (localPart.length < ValidationConstants.CORPORATE_EMAIL_LOCAL_MIN) {
        return { corporateEmailLocalPart: { message: `Use your corporate email. At least ${ValidationConstants.CORPORATE_EMAIL_LOCAL_MIN} characters before ${ValidationConstants.CORPORATE_DOMAIN}.` } };
      }
      
      return null;
    };
  }

  /**
   * Validates name with real-time feedback for non-alpha characters.
   * Returns exactly ONE error in priority order: spaces > digits > symbols > min-length > max-length
   * This enables dynamic, context-aware inline validation messages.
   */
  static liveNameValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      // Priority 1: Check for spaces (highest priority - most common mistake)
      if (/\s/.test(value)) {
        return { nameHasSpace: { message: 'No spaces allowed' } };
      }
      
      // Priority 2: Check for digits
      if (/\d/.test(value)) {
        return { nameHasDigit: { message: 'Numbers are not allowed' } };
      }
      
      // Priority 3: Check for any other non-alpha characters (symbols)
      if (!/^[a-zA-Z]*$/.test(value)) {
        return { nameHasSymbol: { message: 'Symbols are not allowed' } };
      }
      
      // Priority 4: Check minimum length with specific message
      if (value.length < ValidationConstants.NAME_MIN_LENGTH) {
        const needed = ValidationConstants.NAME_MIN_LENGTH - value.length;
        if (needed === 1) {
          return { nameMinLength: { message: 'Enter 1 more character' } };
        }
        return { nameMinLength: { message: `At least ${ValidationConstants.NAME_MIN_LENGTH} characters required` } };
      }
      
      // Priority 5: Check maximum length
      if (value.length > ValidationConstants.NAME_MAX_LENGTH) {
        return { nameMaxLength: { message: `Maximum ${ValidationConstants.NAME_MAX_LENGTH} characters allowed` } };
      }
      
      return null;
    };
  }

  /**
   * Strong password validator with detailed checks
   */
  static strongPassword(firstNameControl?: AbstractControl, lastNameControl?: AbstractControl, employeeIdControl?: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (!password) return null;

      const errors: string[] = [];

      if (password.length < ValidationConstants.PASSWORD_MIN_LENGTH) {
        errors.push(`At least ${ValidationConstants.PASSWORD_MIN_LENGTH} characters`);
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('One uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('One lowercase letter');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('One digit');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('One special character');
      }
      if (/\s/.test(password)) {
        errors.push('No spaces allowed');
      }

      // Check for personal info
      const firstName = firstNameControl?.value?.toLowerCase();
      const lastName = lastNameControl?.value?.toLowerCase();
      const employeeId = employeeIdControl?.value?.toLowerCase();
      const passwordLower = password.toLowerCase();

      if (firstName && firstName.length > 1 && passwordLower.includes(firstName)) {
        errors.push('Cannot contain first name');
      }
      if (lastName && lastName.length > 1 && passwordLower.includes(lastName)) {
        errors.push('Cannot contain last name');
      }
      if (employeeId && employeeId.length > 1 && passwordLower.includes(employeeId)) {
        errors.push('Cannot contain employee ID');
      }

      return errors.length > 0 ? { strongPassword: { requirements: errors } } : null;
    };
  }

  /**
   * Validates product name: 1-4 words, alphanumeric only, single spaces
   */
  static productNameFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;
      if (!name) return null;

      // Check for consecutive spaces
      if (name.includes('  ')) {
        return { productNameFormat: { message: 'Only single spaces between words allowed' } };
      }

      const words = name.split(' ').filter((w: string) => w.length > 0);
      
      if (words.length < 1 || words.length > ValidationConstants.PRODUCT_NAME_MAX_WORDS) {
        return { productNameFormat: { message: `Must contain 1-${ValidationConstants.PRODUCT_NAME_MAX_WORDS} words` } };
      }

      const alphanumericPattern = /^[a-zA-Z0-9]+$/;
      for (const word of words) {
        if (!alphanumericPattern.test(word)) {
          return { productNameFormat: { message: 'Each word must be alphanumeric only' } };
        }
      }

      return null;
    };
  }

  /**
   * Validates description word count
   */
  static wordCount(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const text = control.value;
      if (!text) return null;

      const words = text.split(/\s+/).filter((w: string) => w.length > 0);
      
      if (words.length < min) {
        return { wordCount: { message: `At least ${min} words required (currently ${words.length})` } };
      }
      if (words.length > max) {
        return { wordCount: { message: `Maximum ${max} words allowed (currently ${words.length})` } };
      }

      return null;
    };
  }

  /**
   * Validates HTTPS URL format
   */
  static httpsUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const url = control.value;
      if (!url) return null;

      try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:') {
          return { httpsUrl: { message: 'URL must use HTTPS protocol' } };
        }
        return null;
      } catch {
        return { httpsUrl: { message: 'Invalid URL format' } };
      }
    };
  }

  /**
   * Integer validator (no decimals)
   */
  static integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') return null;
      
      const valid = Number.isInteger(Number(value));
      return valid ? null : { integer: { message: 'Must be a whole number' } };
    };
  }

  // =============================================
  // EVENT VALIDATORS
  // =============================================

  /**
   * Validates event name: 1-7 alphanumeric words, single spaces only, no consecutive/leading/trailing spaces.
   * Characters are counted after trimming (excluding spaces); words are counted by spaces.
   * Returns specific error messages in priority order for live validation feedback.
   */
  static eventNameFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;
      if (!name) return null;

      const trimmed = name.trim();

      // Priority 1: Check for leading/trailing spaces
      if (name !== trimmed && trimmed.length > 0) {
        return { eventNameFormat: { message: 'Event name cannot have leading or trailing spaces' } };
      }

      // Priority 2: Check for consecutive spaces
      if (name.includes('  ')) {
        return { eventNameFormat: { message: 'Use single spaces only. Remove consecutive spaces.' } };
      }

      // Priority 3: Check for special symbols FIRST (most common user error)
      const words = trimmed.split(' ').filter((w: string) => w.length > 0);
      const alphanumericPattern = /^[a-zA-Z0-9]+$/;
      for (const word of words) {
        if (!alphanumericPattern.test(word)) {
          // Determine the specific character issue
          if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~`-]/.test(word)) {
            return { eventNameFormat: { message: 'No special symbols allowed' } };
          }
          return { eventNameFormat: { message: 'Each word must be alphanumeric only (letters and numbers)' } };
        }
      }

      // Priority 4: Count characters (excluding spaces)
      const charCountNoSpaces = trimmed.replace(/ /g, '').length;
      if (charCountNoSpaces < ValidationConstants.EVENT_NAME_MIN_LENGTH) {
        return { eventNameFormat: { message: `At least ${ValidationConstants.EVENT_NAME_MIN_LENGTH} characters required (excluding spaces). Currently: ${charCountNoSpaces}` } };
      }
      if (charCountNoSpaces > ValidationConstants.EVENT_NAME_MAX_LENGTH) {
        return { eventNameFormat: { message: `Maximum ${ValidationConstants.EVENT_NAME_MAX_LENGTH} characters (excluding spaces). Currently: ${charCountNoSpaces}` } };
      }

      // Priority 5: Count words
      if (words.length < ValidationConstants.EVENT_NAME_MIN_WORDS) {
        return { eventNameFormat: { message: `At least ${ValidationConstants.EVENT_NAME_MIN_WORDS} word required` } };
      }
      if (words.length > ValidationConstants.EVENT_NAME_MAX_WORDS) {
        return { eventNameFormat: { message: `Maximum ${ValidationConstants.EVENT_NAME_MAX_WORDS} words allowed. Currently: ${words.length}. Remove extra words or abbreviate.` } };
      }

      return null;
    };
  }

  /**
   * Validates event description: required, min/max chars and words.
   */
  static eventDescriptionFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const desc = control.value;
      if (!desc) return null;

      const trimmed = desc.trim();

      // Count characters
      if (trimmed.length < ValidationConstants.EVENT_DESCRIPTION_MIN_LENGTH) {
        return { eventDescriptionFormat: { message: `At least ${ValidationConstants.EVENT_DESCRIPTION_MIN_LENGTH} characters required. Currently: ${trimmed.length}` } };
      }
      if (trimmed.length > ValidationConstants.EVENT_DESCRIPTION_MAX_LENGTH) {
        return { eventDescriptionFormat: { message: `Maximum ${ValidationConstants.EVENT_DESCRIPTION_MAX_LENGTH} characters allowed. Currently: ${trimmed.length}` } };
      }

      // Count words
      const words = trimmed.split(/\s+/).filter((w: string) => w.length > 0);
      if (words.length < ValidationConstants.EVENT_DESCRIPTION_MIN_WORDS) {
        return { eventDescriptionFormat: { message: `At least ${ValidationConstants.EVENT_DESCRIPTION_MIN_WORDS} words required. Currently: ${words.length}` } };
      }
      if (words.length > ValidationConstants.EVENT_DESCRIPTION_MAX_WORDS) {
        return { eventDescriptionFormat: { message: `Maximum ${ValidationConstants.EVENT_DESCRIPTION_MAX_WORDS} words allowed. Currently: ${words.length}` } };
      }

      return null;
    };
  }

  /**
   * Validates event location: alphanumeric words with single spaces, min/max chars, max 16 words.
   */
  static eventLocationFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const loc = control.value;
      if (!loc || !loc.trim()) return null; // Optional field

      const trimmed = loc.trim();

      // Check for leading/trailing spaces
      if (loc !== trimmed) {
        return { eventLocationFormat: { message: 'Location cannot have leading or trailing spaces' } };
      }

      // Check for consecutive spaces
      if (loc.includes('  ')) {
        return { eventLocationFormat: { message: 'Use single spaces only. Remove consecutive spaces.' } };
      }

      // Count characters (excluding spaces)
      const charCountNoSpaces = trimmed.replace(/ /g, '').length;
      if (charCountNoSpaces < ValidationConstants.EVENT_LOCATION_MIN_LENGTH) {
        return { eventLocationFormat: { message: `At least ${ValidationConstants.EVENT_LOCATION_MIN_LENGTH} characters required (excluding spaces)` } };
      }
      if (charCountNoSpaces > ValidationConstants.EVENT_LOCATION_MAX_LENGTH) {
        return { eventLocationFormat: { message: `Maximum ${ValidationConstants.EVENT_LOCATION_MAX_LENGTH} characters (excluding spaces). Currently: ${charCountNoSpaces}` } };
      }

      // Count words
      const words = trimmed.split(' ').filter((w: string) => w.length > 0);
      if (words.length > ValidationConstants.EVENT_LOCATION_MAX_WORDS) {
        return { eventLocationFormat: { message: `Maximum ${ValidationConstants.EVENT_LOCATION_MAX_WORDS} words allowed. Currently: ${words.length}` } };
      }

      // Each word must be alphanumeric only
      const alphanumericPattern = /^[a-zA-Z0-9]+$/;
      for (const word of words) {
        if (!alphanumericPattern.test(word)) {
          return { eventLocationFormat: { message: `Each word must be alphanumeric only. Invalid: "${word}"` } };
        }
      }

      return null;
    };
  }

  /**
   * Validates max participants: integer only, 1-100,000.
   */
  static eventMaxParticipants(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') return null;

      const numValue = Number(value);

      if (!Number.isInteger(numValue)) {
        return { eventMaxParticipants: { message: 'Must be a whole number (no decimals)' } };
      }

      if (numValue < ValidationConstants.EVENT_MAX_PARTICIPANTS_MIN) {
        return { eventMaxParticipants: { message: `Minimum ${ValidationConstants.EVENT_MAX_PARTICIPANTS_MIN}. Zero is not allowed.` } };
      }

      if (numValue > ValidationConstants.EVENT_MAX_PARTICIPANTS_MAX) {
        return { eventMaxParticipants: { message: `Maximum ${ValidationConstants.EVENT_MAX_PARTICIPANTS_MAX.toLocaleString()}` } };
      }

      return null;
    };
  }

  /**
   * Validates total points pool: integer only, 1-1,000,000.
   */
  static eventPointsPool(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') return null;

      const numValue = Number(value);

      if (!Number.isInteger(numValue)) {
        return { eventPointsPool: { message: 'Must be a whole number (no decimals)' } };
      }

      if (numValue < ValidationConstants.EVENT_POINTS_POOL_MIN) {
        return { eventPointsPool: { message: `Minimum ${ValidationConstants.EVENT_POINTS_POOL_MIN}. Zero is not allowed.` } };
      }

      if (numValue > ValidationConstants.EVENT_POINTS_POOL_MAX) {
        return { eventPointsPool: { message: `Maximum ${ValidationConstants.EVENT_POINTS_POOL_MAX.toLocaleString()}` } };
      }

      return null;
    };
  }

  /**
   * Validates that a date is in the future.
   * Allows a 1-minute buffer to account for timing differences.
   */
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const date = new Date(value);
      const now = new Date();
      
      // Add 1-minute buffer to avoid timing issues
      const nowMinusBuffer = new Date(now.getTime() - 60000); // 1 minute ago

      if (date <= nowMinusBuffer) {
        return { futureDate: { message: 'Date must be in the future' } };
      }

      return null;
    };
  }

  /**
   * Validates that registration deadline is before event date.
   * @param eventDateControlName The name of the event date form control
   */
  static registrationBeforeEvent(eventDateControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regEndValue = control.value;
      if (!regEndValue) return null;

      const parent = control.parent;
      if (!parent) return null;

      const eventDateControl = parent.get(eventDateControlName);
      if (!eventDateControl || !eventDateControl.value) return null;

      const regEndDate = new Date(regEndValue);
      const eventDate = new Date(eventDateControl.value);

      if (regEndDate >= eventDate) {
        return { registrationBeforeEvent: { message: 'Registration deadline must be before event date' } };
      }

      return null;
    };
  }
}

/**
 * Password strength calculator for UI feedback
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  requirements: { met: boolean; text: string }[];
} {
  const pwd = password || '';

  // Base score from length (cap at 40)
  let score = Math.min(40, pwd.length * 3);

  // Character variety bonuses
  if (/[A-Z]/.test(pwd)) score += 10;
  if (/[a-z]/.test(pwd)) score += 10;
  if (/[0-9]/.test(pwd)) score += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 10;

  // Penalty for spaces
  if (/\s/.test(pwd)) score -= 15;

  // Ensure score stays within 0-100
  score = Math.max(0, Math.min(100, score));

  let label: string;
  if (score < 30) label = 'Weak';
  else if (score < 50) label = 'Fair';
  else if (score < 70) label = 'Good';
  else if (score < 90) label = 'Strong';
  else label = 'Excellent';

  return {
    score,
    label,
    requirements: getPasswordRequirements(pwd)
  };
}

function getPasswordRequirements(password: string): { met: boolean; text: string }[] {
  const pwd = password || '';
  return [
    { met: pwd.length >= ValidationConstants.PASSWORD_MIN_LENGTH, text: `At least ${ValidationConstants.PASSWORD_MIN_LENGTH} characters` },
    { met: /[A-Z]/.test(pwd), text: 'One uppercase letter' },
    { met: /[a-z]/.test(pwd), text: 'One lowercase letter' },
    { met: /[0-9]/.test(pwd), text: 'One digit' },
    { met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd), text: 'One special character' },
    { met: !/\s/.test(pwd), text: 'No spaces' }
  ];
}
