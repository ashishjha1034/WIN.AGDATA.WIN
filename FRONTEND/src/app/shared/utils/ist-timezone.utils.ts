/**
 * IST (Indian Standard Time) utility functions for date/time handling.
 * All UI displays should show IST; API communications use UTC internally.
 * IST is UTC+5:30.
 */

// IST offset in milliseconds (5 hours 30 minutes)
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * Parses a date string ensuring it's treated as UTC.
 * Handles both "2026-02-02T10:00:00Z" and "2026-02-02T10:00:00" formats.
 * If no Z suffix, assumes UTC and adds it.
 */
function parseAsUtc(dateStr: string): Date {
  if (!dateStr) return new Date(NaN);
  
  // If the string doesn't end with Z and looks like ISO format, treat as UTC
  let normalized = dateStr.trim();
  if (!normalized.endsWith('Z') && !normalized.includes('+') && !normalized.includes('-', 10)) {
    // Append Z to treat as UTC
    normalized = normalized + 'Z';
  }
  return new Date(normalized);
}

/**
 * Converts a UTC Date to IST Date for display.
 */
export function utcToIst(utcDate: Date | string): Date {
  const date = typeof utcDate === 'string' ? parseAsUtc(utcDate) : utcDate;
  return new Date(date.getTime() + IST_OFFSET_MS);
}

/**
 * Converts an IST Date to UTC Date for API submission.
 */
export function istToUtc(istDate: Date | string): Date {
  const date = typeof istDate === 'string' ? new Date(istDate) : istDate;
  return new Date(date.getTime() - IST_OFFSET_MS);
}

/**
 * Formats a Date as IST date string (YYYY-MM-DD) for date input fields.
 */
export function formatDateForInputIst(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  // Convert to IST
  const istDate = utcToIst(d);
  
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Formats a Date as IST datetime string (YYYY-MM-DDTHH:mm) for datetime-local input fields.
 */
export function formatDateTimeForInputIst(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  // Convert to IST
  const istDate = utcToIst(d);
  
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Formats a Date for display in IST with explicit "IST" label.
 */
export function formatDateTimeDisplayIst(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  // Convert to IST
  const istDate = utcToIst(d);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  // Format using UTC methods since we've already converted to IST
  const year = istDate.getUTCFullYear();
  const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = istDate.getUTCDate();
  const hours = istDate.getUTCHours();
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  
  return `${month} ${day}, ${year} at ${hours12}:${minutes} ${ampm} IST`;
}

/**
 * Parses a datetime-local input value (IST) and converts to UTC ISO string for API.
 * datetime-local inputs return values like "2026-02-01T15:30" without timezone info.
 * We treat this as IST regardless of the browser's local timezone.
 */
export function parseInputDateTimeToUtcIso(inputValue: string): string {
  if (!inputValue) return '';
  
  // Parse the datetime-local string as IST explicitly
  // Format is "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mm:ss"
  const match = inputValue.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return '';
  
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // JS months are 0-indexed
  const day = parseInt(match[3], 10);
  const hours = parseInt(match[4], 10);
  const minutes = parseInt(match[5], 10);
  const seconds = match[6] ? parseInt(match[6], 10) : 0;
  
  // Create a UTC date representing the IST time, then subtract IST offset
  // IST is UTC+5:30, so IST 15:30 = UTC 10:00
  const istTimeMs = Date.UTC(year, month, day, hours, minutes, seconds);
  const utcTimeMs = istTimeMs - IST_OFFSET_MS;
  
  return new Date(utcTimeMs).toISOString();
}

/**
 * Gets the current date/time in IST.
 */
export function getNowIst(): Date {
  return utcToIst(new Date());
}

/**
 * Gets the minimum date string for datetime-local inputs (current IST time).
 */
export function getMinDateTimeForInput(): string {
  const now = getNowIst();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Checks if a date (in IST) is in the future.
 */
export function isFutureDateIst(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const nowUtc = new Date();
  const dateUtc = istToUtc(d);
  return dateUtc > nowUtc;
}

/**
 * Checks if registrationEnd (IST) is before eventDate (IST).
 */
export function isRegistrationBeforeEvent(registrationEnd: Date | string, eventDate: Date | string): boolean {
  const regEnd = typeof registrationEnd === 'string' ? new Date(registrationEnd) : registrationEnd;
  const event = typeof eventDate === 'string' ? new Date(eventDate) : eventDate;
  return regEnd < event;
}

/**
 * Event validation helper utilities.
 */
export const EventValidationUtils = {
  /**
   * Counts characters in text, excluding spaces.
   */
  countCharsNoSpaces(text: string | null | undefined): number {
    if (!text) return 0;
    return text.trim().replace(/ /g, '').length;
  },

  /**
   * Counts words in text (split by whitespace).
   */
  countWords(text: string | null | undefined): number {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  },

  /**
   * Checks if text contains consecutive spaces.
   */
  hasConsecutiveSpaces(text: string | null | undefined): boolean {
    return text ? text.includes('  ') : false;
  },

  /**
   * Checks if text has leading or trailing spaces.
   */
  hasLeadingTrailingSpaces(text: string | null | undefined): boolean {
    if (!text) return false;
    return text !== text.trim();
  },

  /**
   * Checks if text contains only alphanumeric words.
   */
  isAlphanumericWords(text: string | null | undefined): boolean {
    if (!text || !text.trim()) return false;
    const words = text.trim().split(' ').filter(w => w.length > 0);
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    return words.every(w => alphanumericPattern.test(w));
  }
};
