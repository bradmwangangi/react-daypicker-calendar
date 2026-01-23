import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import type { CalendarView } from './types'

interface CalendarHeaderProps {
  /** The currently displayed month */
  displayMonth: Date

  /** Current active view */
  currentView: CalendarView

  /** Navigate to previous month */
  onPrevMonth: () => void

  /** Navigate to next month */
  onNextMonth: () => void

  /** Switch to month picker view */
  onMonthClick: () => void

  /** Switch to year picker view */
  onYearClick: () => void

  /** Additional class name */
  className?: string
}

export function CalendarHeader({
  displayMonth,
  currentView,
  onPrevMonth,
  onNextMonth,
  onMonthClick,
  onYearClick,
  className,
}: CalendarHeaderProps) {
  const monthLabel = format(displayMonth, 'MMM')
  const yearLabel = format(displayMonth, 'yyyy')

  return (
    <div className={cn('flex items-center justify-between mb-3', className)}>
      {/* Previous month button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/30"
        onClick={onPrevMonth}
        aria-label="Go to previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {/* Month label */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 px-2 text-sm font-medium',
            'hover:bg-primary/30 hover:text-foreground'
          )}
          onClick={onMonthClick}
          aria-label="Select month"
        >
          {monthLabel}
          <ChevronDown
            className={cn(
              'ml-1 h-3 w-3 transition-transform',
              currentView === 'month' && 'rotate-180'
            )}
          />
        </Button>

        {/* Year label */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 px-2 text-sm font-medium',
            'hover:bg-primary/30 hover:text-foreground'
          )}
          onClick={onYearClick}
          aria-label="Select year"
        >
          {yearLabel}
          <ChevronDown
            className={cn(
              'ml-1 h-3 w-3 transition-transform',
              currentView === 'year' && 'rotate-180'
            )}
          />
        </Button>
      </div>

      {/* Next month button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/30"
        onClick={onNextMonth}
        aria-label="Go to next month"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
