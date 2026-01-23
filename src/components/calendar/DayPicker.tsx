import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker as RDPDayPicker, type DateRange } from 'react-day-picker'
import { buttonVariants } from '../ui/button'

interface DayPickerBaseProps {
  /** The month to display */
  displayMonth: Date

  /** Callback when the displayed month changes via DayPicker navigation */
  onMonthChange: (month: Date) => void

  /** Show days from adjacent months */
  showOutsideDays?: boolean

  /** Disabled dates - uses react-day-picker Matcher type */
  disabled?: any

  /** Additional class name */
  className?: string
}

interface DayPickerSingleProps extends DayPickerBaseProps {
  mode?: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

interface DayPickerMultipleProps extends DayPickerBaseProps {
  mode: 'multiple'
  selected?: Date[]
  onSelect?: (dates: Date[] | undefined) => void
}

interface DayPickerRangeProps extends DayPickerBaseProps {
  mode: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

export type DayPickerProps =
  | DayPickerSingleProps
  | DayPickerMultipleProps
  | DayPickerRangeProps

const baseClassNames = {
  months: 'flex flex-col sm:flex-row gap-4 sm:gap-4 w-full',
  month: 'space-y-4 w-full',
  month_caption: 'hidden',
  caption_label: 'hidden',
  nav: 'hidden',
  button_previous: 'hidden',
  button_next: 'hidden',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex gap-1 justify-center',
  weekday:
    'text-muted-foreground rounded-md w-9 h-9 flex items-center justify-center font-medium text-xs',
  week: 'flex w-full mt-1 gap-1 justify-center',
  day: cn(
    'h-9 w-9 text-center text-sm p-0 relative',
    '[&:has([aria-selected].day-range-end)]:rounded-r-md',
    '[&:has([aria-selected].day-outside)]:bg-primary/30',
    '[&:has([aria-selected])]:bg-primary/30',
    'first:[&:has([aria-selected])]:rounded-l-md',
    'last:[&:has([aria-selected])]:rounded-r-md',
    'focus-within:relative focus-within:z-20'
  ),
  range_end: 'day-range-end rounded-l-none',
  range_start: 'day-range-start rounded-r-none',
  range_middle:
    'aria-selected:bg-primary/30 aria-selected:text-foreground rounded-none',
  selected: 'bg-primary text-primary-foreground rounded-md hover:bg-primary/30',
  today: 'border-b-2 border-primary hover:bg-primary/30',
  outside:
    'day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/20 aria-selected:text-muted-foreground aria-selected:opacity-50',
  disabled: 'text-muted-foreground opacity-50 cursor-not-allowed',
  hidden: 'invisible',
}

const ChevronComponent = ({
  orientation,
  ...props
}: {
  orientation?: string
}) =>
  orientation === 'left' ? (
    <ChevronLeft {...props} className="h-4 w-4" />
  ) : (
    <ChevronRight {...props} className="h-4 w-4" />
  )

export function DayPicker(props: DayPickerProps) {
  const {
    displayMonth,
    onMonthChange,
    className,
    showOutsideDays = true,
    disabled,
    mode = 'single',
    selected,
    onSelect,
  } = props

  const dayButtonClass = cn(
    buttonVariants({ variant: 'ghost' }),
    'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
    'hover:bg-primary/30 hover:text-foreground',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
  )

  if (mode === 'range') {
    return (
      <RDPDayPicker
        mode="range"
        month={displayMonth}
        onMonthChange={onMonthChange}
        showOutsideDays={showOutsideDays}
        hideNavigation={true}
        disabled={disabled}
        selected={selected as DateRange}
        onSelect={onSelect as (range: DateRange | undefined) => void}
        className={cn('p-0 pointer-events-auto w-full', className)}
        classNames={{ ...baseClassNames, day_button: dayButtonClass }}
        components={{ Chevron: ChevronComponent }}
      />
    )
  }

  if (mode === 'multiple') {
    return (
      <RDPDayPicker
        mode="multiple"
        month={displayMonth}
        onMonthChange={onMonthChange}
        showOutsideDays={showOutsideDays}
        hideNavigation={true}
        disabled={disabled}
        selected={selected as Date[]}
        onSelect={onSelect as (dates: Date[] | undefined) => void}
        className={cn('p-0 pointer-events-auto w-full', className)}
        classNames={{ ...baseClassNames, day_button: dayButtonClass }}
        components={{ Chevron: ChevronComponent }}
      />
    )
  }

  return (
    <RDPDayPicker
      mode="single"
      month={displayMonth}
      onMonthChange={onMonthChange}
      showOutsideDays={showOutsideDays}
      hideNavigation={true}
      disabled={disabled}
      selected={selected as Date}
      onSelect={onSelect as (date: Date | undefined) => void}
      className={cn('p-0 pointer-events-auto w-full', className)}
      classNames={{ ...baseClassNames, day_button: dayButtonClass }}
      components={{ Chevron: ChevronComponent }}
    />
  )
}
