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
  
  PRODUCT_NAME_MAX_WORDS: 4,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 500,
  DESCRIPTION_MIN_WORDS: 3,
  DESCRIPTION_MAX_WORDS: 100,
  
  POINTS_COST_MIN: 0,
  POINTS_COST_MAX: 10_000_000,
  STOCK_MIN: 0,
  STOCK_MAX: 1_000_000,
  IMAGE_URL_MAX_LENGTH: 1000,
  
  DEBOUNCE_TIME_MS: 500
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
   * Validates email ends with corporate domain
   */
  static corporateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = control.value.toLowerCase().endsWith(ValidationConstants.CORPORATE_DOMAIN);
      return valid ? null : { corporateEmail: { message: `Email must end with ${ValidationConstants.CORPORATE_DOMAIN}` } };
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
}

/**
 * Password strength calculator for UI feedback
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  requirements: { met: boolean; text: string }[];
} {
  if (!password) {
    return {
      score: 0,
      label: 'None',
      requirements: getPasswordRequirements(password)
    };
  }

  let score = 0;

  // Length checks
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 10;

  // Character type checks
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 20;

  // Bonus for variety
  const types = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter(r => r.test(password)).length;
  if (types >= 4) score += 10;

  // Cap at 100
  score = Math.min(score, 100);

  let label: string;
  if (score < 30) label = 'Weak';
  else if (score < 50) label = 'Fair';
  else if (score < 70) label = 'Good';
  else if (score < 90) label = 'Strong';
  else label = 'Excellent';

  return {
    score,
    label,
    requirements: getPasswordRequirements(password)
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
