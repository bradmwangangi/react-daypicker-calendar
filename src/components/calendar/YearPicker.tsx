import { cn } from '@/lib/utils'
import React from 'react'
import { generateYearRange } from './utils'

interface YearPickerProps {
  /** The currently selected year */
  selectedYear: number

  /** Minimum year to display */
  fromYear: number

  /** Maximum year to display */
  toYear: number

  /** Callback when a year is selected */
  onYearSelect: (year: number) => void

  /** Additional class name */
  className?: string
}

export function YearPicker({
  selectedYear,
  fromYear,
  toYear,
  onYearSelect,
  className,
}: YearPickerProps) {
  const selectedRef = React.useRef<HTMLButtonElement>(null)

  const years = React.useMemo(
    () => generateYearRange(fromYear, toYear),
    [fromYear, toYear]
  )

  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (selectedRef.current) {
        const parent =
          selectedRef.current.parentElement?.closest('.overflow-y-auto')
        if (parent) {
          const buttonRect = selectedRef.current.getBoundingClientRect()
          const parentRect = parent.getBoundingClientRect()
          const relativeTop = buttonRect.top - parentRect.top
          parent.scrollTop +=
            relativeTop - parentRect.height / 2 + buttonRect.height / 2
        }
      }
    })
  }, [selectedYear])

  return (
    <div
      className={cn('h-[280px] overflow-y-auto scrollbar-thin py-2', className)}
      role="listbox"
      aria-label="Select year"
    >
      <div className="grid grid-cols-3 gap-2 w-full">
        {years.map((year) => {
          const isSelectedYear = year === selectedYear

          return (
            <button
              key={year}
              ref={isSelectedYear ? selectedRef : undefined}
              type="button"
              role="option"
              aria-selected={isSelectedYear}
              className={cn(
                'h-10 px-2 text-sm font-normal rounded-md transition-colors',
                'hover:bg-primary/30 hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                'text-foreground',
                isSelectedYear && 'bg-primary text-primary-foreground'
              )}
              onClick={() => onYearSelect(year)}
            >
              {year}
            </button>
          )
        })}
      </div>
    </div>
  )
}
