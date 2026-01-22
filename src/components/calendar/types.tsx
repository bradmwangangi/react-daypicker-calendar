import type { DateRange, DayPickerProps } from 'react-day-picker'

export type CalendarView = 'day' | 'month' | 'year'

export type SelectionMode = 'single' | 'range' | 'multiple'

export interface CalendarBaseProps {
  /** The currently displayed month */
  month?: Date

  /** Callback when the displayed month changes */
  onMonthChange?: (month: Date) => void

  /** Minimum selectable year in year picker */
  fromYear?: number

  /** Maximum selectable year in year picker */
  toYear?: number

  /** Disabled dates */
  disabled?: DayPickerProps['disabled']

  /** Additional class name */
  className?: string

  /** Show days from adjacent months */
  showOutsideDays?: boolean
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  defaultSelected?: Date
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  mode?: 'multiple'
  selected?: Date[]
  onSelect?: (dates: Date[] | undefined) => void
  defaultSelected?: Date[]
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode?: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  defaultSelected?: DateRange
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

export function isSingleMode(
  props: CalendarProps
): props is CalendarSingleProps {
  return props.mode === 'single' || props.mode === undefined
}

export function isMultipleMode(
  props: CalendarProps
): props is CalendarMultipleProps {
  return props.mode === 'multiple'
}

export function isRangeMode(props: CalendarProps): props is CalendarRangeProps {
  return props.mode === 'range'
}
