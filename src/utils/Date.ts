import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween); 

export default class DateHelper {

  static isValidOffset(offset: string): boolean {
    return /^[+-](?:0[0-9]|1[0-4]):?[0-5][0-9]$/.test(offset);
  };
  /**
   * Get current timestamp in UTC
   */
  static nowUTC(): string {
    return dayjs.utc().format();
  }

  /**
   * Convert a date to UTC
   */
  static toUTC(date: string | Date): string {
    return dayjs(date).utc().format();
  }

  /**
   * Convert UTC to a specific timezone
   */
  static fromUTCToTimezone(dateStr: string | Date, tzOrOffset: string, format: 'dddd, MMMM D, YYYY h:mm A'): string {
    //return dayjs.utc(date).tz(tz).format(format);
    const utcDate = dayjs.utc(dateStr);

    // Check if tzOrOffset is a named timezone or a numeric offset
    if (/^[+-]\d{2}:?\d{2}$/.test(tzOrOffset)) {
      if (!this.isValidOffset(tzOrOffset)) {
        throw new Error("Invalid tz offset");
      }
      // Handle offsets like "+05:30" or "+0530"
      const offset = tzOrOffset.replace(":", ""); // Normalize "+05:30" to "+0530"
      const hours = parseInt(offset.substring(0, 3), 10); // Extract hours
      const minutes = parseInt(offset.substring(3), 10); // Extract minutes
      return utcDate.utcOffset(hours * 60 + minutes).format(format);
    } else {
      // Assume it's a named timezone
      return utcDate.tz(tzOrOffset).format(format);
    }
  }

  /**
   * Convert a date from any timezone to UTC
   */
  static fromTimezoneToUTC(date: string | Date, tz: string): string {
    return dayjs.tz(date, tz).utc().format();
  }

  /**
   * Format a date (default format: YYYY-MM-DD HH:mm:ss)
   */
  static format(date: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(date).format(format);
  }

  /**
   * Get the difference between two dates in a specified unit (e.g., days, hours, minutes)
   */
  static diff(date1: string | Date, date2: string | Date, unit: dayjs.UnitType = 'days'): number {
    return dayjs(date1).diff(dayjs(date2), unit);
  }

  /**
   * Add time to a date (e.g., add 1 hour)
   */
  static add(date: string | Date, value: number, unit: dayjs.ManipulateType): string {
    return dayjs(date).add(value, unit).format();
  }

  /**
   * Subtract time from a date (e.g., subtract 1 day)
   */
  static subtract(date: string | Date, value: number, unit: dayjs.ManipulateType): string {
    return dayjs(date).subtract(value, unit).format();
  }

  /**
   * Check if a date is before another date
   */
  static isBefore(date1: string | Date, date2: string | Date): boolean {
    return dayjs(date1).isBefore(dayjs(date2));
  }

  /**
   * Check if a date is after another date
   */
  static isAfter(date1: string | Date, date2: string | Date): boolean {
    return dayjs(date1).isAfter(dayjs(date2));
  }

  /**
   * Check if a date is between two dates
   */
  static isBetween(date: string | Date, startDate: string | Date, endDate: string | Date): boolean {
    return dayjs(date).isBetween(dayjs(startDate), dayjs(endDate));
  }

  /**
   * Convert date range from user timezone to UTC for DB queries
   * @param startDate - Start date (YYYY-MM-DD HH:mm:ss)
   * @param endDate - End date (YYYY-MM-DD HH:mm:ss)
   * @param userTimezone - User's timezone
   * @returns { startUTC: string, endUTC: string } UTC Date range
   */
  static filterRangeToUTC(startDate: string, endDate: string, userTimezone: string) {
    const startUTC = dayjs.tz(startDate, userTimezone).utc().format();
    const endUTC = dayjs.tz(endDate, userTimezone).utc().format();
    return { startUTC, endUTC };
  }
}