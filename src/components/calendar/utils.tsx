import { isSameDay, isSameMonth, isSameYear, startOfMonth } from 'date-fns'

/**
 * Get the current date (today)
 */
export function getToday(): Date {
  return new Date()
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, getToday())
}

/**
 * Check if a month matches the current month
 */
export function isCurrentMonth(date: Date): boolean {
  return isSameMonth(date, getToday())
}

/**
 * Check if a year matches the current year
 */
export function isCurrentYear(date: Date): boolean {
  return isSameYear(date, getToday())
}

/**
 * Generate an array of years for the year picker
 */
export function generateYearRange(fromYear: number, toYear: number): number[] {
  const years: number[] = []
  for (let year = fromYear; year <= toYear; year++) {
    years.push(year)
  }

  return years
}

/**
 * Get month names array
 */
export function getMonthNames(): string[] {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
}

/**
 * Get the start month for a given date
 */
export function getMonthStart(date: Date): Date {
  return startOfMonth(date)
}
