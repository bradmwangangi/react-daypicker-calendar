import { cn } from '@/lib/utils'
import { getMonthNames } from './utils'

interface MonthPickerProps {
  /** The currently displayed/selected month (0-11) */
  selectedMonth: number

  /** The year context for the month picker */
  year: number

  /** Callback when a month is selected */
  onMonthSelect: (month: number) => void

  /** Additional class name */
  className?: string
}

export function MonthPicker({
  selectedMonth,
  year,
  onMonthSelect,
  className,
}: MonthPickerProps) {
  const months = getMonthNames()
  const today = new Date()
  const currentMonthIndex = today.getMonth()
  const currentYear = today.getFullYear()

  return (
    <div
      className={cn('flex flex-col justify-center py-4', className)}
      role="listbox"
      aria-label="Select month"
    >
      <div className="grid grid-cols-3 gap-2 w-full">
        {months.map((month, monthIndex) => {
          const isSelectedMonth = monthIndex === selectedMonth
          const isThisMonth =
            monthIndex === currentMonthIndex && year === currentYear

          return (
            <button
              key={month}
              type="button"
              role="option"
              aria-selected={isSelectedMonth}
              className={cn(
                'h-10 px-2 text-sm font-normal rounded-md transition-colors',
                'hover:bg-primary/30 hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                !isSelectedMonth && !isThisMonth && 'text-foreground',
                isThisMonth && '!bg-primary text-primary-foreground',
                isSelectedMonth && 'bg-primary/70 text-primary-foreground'
              )}
              onClick={() => onMonthSelect(monthIndex)}
            >
              {month}
            </button>
          )
        })}
      </div>
    </div>
  )
}
