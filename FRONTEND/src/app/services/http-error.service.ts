import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  constructor() { }

  getErrorMessage(error: HttpErrorResponse | any): string {
    console.error('HTTP Error:', error);

    if (!error) {
      return 'An unknown error occurred';
    }

    // Handle timeout or network errors
    if (error.status === 0 && error.error instanceof ProgressEvent) {
      return 'Network timeout or backend not responding. Ensure backend is running on https://localhost:7113';
    }

    // Handle client-side errors
    if (error.error instanceof ErrorEvent) {
      return error.error.message || 'An error occurred';
    }

    // Handle server-side errors
    if (error.error) {
      // Check for standard error response structures
      if (typeof error.error === 'string') {
        return error.error;
      }
      if (error.error.message) {
        return error.error.message;
      }
      if (error.error.title) {
        return error.error.title;
      }
      if (error.error.error) {
        return error.error.error;
      }
    }

    // Handle by HTTP status code
    switch (error.status) {
      case 0:
        return 'Unable to connect to backend server. Ensure it is running on https://localhost:7113';
      case 400:
        return error.error?.message || 'Bad request. Please check your input.';
      case 401:
        return error.error?.message || 'Invalid email or password';
      case 403:
        return error.error?.message || 'Access denied';
      case 404:
        return error.error?.message || 'Resource not found';
      case 500:
        return error.error?.message || 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Backend may be starting up.';
      default:
        if (error.statusText) {
          return `Error: ${error.status} ${error.statusText}`;
        }
        return 'An error occurred. Please try again.';
    }
  }
}
