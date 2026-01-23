import { cn } from '@/lib/utils'
import { addMonths, setMonth, setYear, subMonths } from 'date-fns'
import * as React from 'react'
import { CalendarHeader } from './CalendarHeader'
import { DayPicker } from './DayPicker'
import { MonthPicker } from './MonthPicker'
import { YearPicker } from './YearPicker'
import type { CalendarProps, CalendarView } from './types'
import { isMultipleMode, isRangeMode, isSingleMode } from './types'

const DEFAULT_FROM_YEAR = 1900
const DEFAULT_TO_YEAR = 2100

export function Calendar(props: CalendarProps) {
  const {
    month: controlledMonth,
    onMonthChange,
    fromYear = DEFAULT_FROM_YEAR,
    toYear = DEFAULT_TO_YEAR,
    className,
    showOutsideDays = true,
    disabled,
  } = props

  // Determine the initial display month based on selection or today
  const getInitialMonth = (): Date => {
    let selected: Date | undefined

    if (isSingleMode(props)) {
      selected = props.selected || props.defaultSelected
    } else if (isMultipleMode(props)) {
      selected = props.selected?.[0] || props.defaultSelected?.[0]
    } else if (isRangeMode(props)) {
      selected = props.selected?.from || props.defaultSelected?.from
    }

    return selected || new Date()
  }

  // State for current view
  const [currentView, setCurrentView] = React.useState<CalendarView>('day')

  // State for displayed month (controlled or uncontrolled)
  const [internalMonth, setInternalMonth] =
    React.useState<Date>(getInitialMonth)

  const displayMonth = controlledMonth || internalMonth

  const handleMonthChange = (newMonth: Date) => {
    if (onMonthChange) {
      onMonthChange(newMonth)
    }
    if (!controlledMonth) {
      setInternalMonth(newMonth)
    }
  }

  const handlePrevMonth = () => {
    handleMonthChange(subMonths(displayMonth, 1))
  }
  const handleNextMonth = () => {
    handleMonthChange(addMonths(displayMonth, 1))
  }

  const handleMonthClick = () => {
    setCurrentView(currentView === 'month' ? 'day' : 'month')
  }
  const handleYearClick = () => {
    setCurrentView(currentView === 'year' ? 'day' : 'year')
  }

  const handleMonthSelect = (monthIndex: number) => {
    const newMonth = setMonth(displayMonth, monthIndex)
    handleMonthChange(newMonth)
    setCurrentView('day')
  }

  const handleYearSelect = (year: number) => {
    const newMonth = setYear(displayMonth, year)
    handleMonthChange(newMonth)
    setCurrentView('month')
  }

  const getMode = () => {
    if (isRangeMode(props)) return 'range'
    if (isMultipleMode(props)) return 'multiple'
    return 'single'
  }

  const getSelected = () => {
    if (isRangeMode(props)) return props.selected
    if (isMultipleMode(props)) return props.selected
    if (isSingleMode(props)) return props.selected
    return undefined
  }

  const getOnSelect = () => {
    if (isRangeMode(props)) return props.onSelect
    if (isMultipleMode(props)) return props.onSelect
    if (isSingleMode(props)) return props.onSelect
    return undefined
  }

  return (
    <div
      className={cn(
        'inline-flex flex-col rounded-lg border bg-popover p-3 text-popover-foreground shadow-md',
        className
      )}
    >
      {/* Fixed width container to prevent layout shifts */}
      <div className="w-[280px]">
        <CalendarHeader
          displayMonth={displayMonth}
          currentView={currentView}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onMonthClick={handleMonthClick}
          onYearClick={handleYearClick}
        />

        {/* Content area with fixed minimum height for 6-week month */}
        <div className="h-[280px]">
          {currentView === 'day' && (
            <DayPicker
              displayMonth={displayMonth}
              onMonthChange={handleMonthChange}
              showOutsideDays={showOutsideDays}
              disabled={disabled as any}
              mode={getMode() as any}
              selected={getSelected() as any}
              onSelect={getOnSelect() as any}
            />
          )}

          {currentView === 'month' && (
            <MonthPicker
              selectedMonth={displayMonth.getMonth()}
              onMonthSelect={handleMonthSelect}
            />
          )}

          {currentView === 'year' && (
            <YearPicker
              selectedYear={displayMonth.getFullYear()}
              fromYear={fromYear}
              toYear={toYear}
              onYearSelect={handleYearSelect}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = 'Calendar'

export type {
  CalendarMultipleProps,
  CalendarProps,
  CalendarRangeProps,
  CalendarSingleProps,
  CalendarView,
} from './types'
