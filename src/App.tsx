import { format } from 'date-fns'
import React from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './components/calendar'

function App() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )
  const [selectedDates, setSelectedDates] = React.useState<Date[] | undefined>()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            react-daypicker-calendar
          </h1>
          <p className="text-muted-foreground">
            A flexible React calendar with advanced selection modes and seamless
            month/year navigation.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Single Date Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Single Date Selection</h2>
            <p className="text-sm text-muted-foreground">
              Click the month or year labels to switch views.
            </p>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              fromYear={1900}
              toYear={2099}
            />
            {selectedDate && (
              <p className="text-sm text-muted-foreground">
                Selected: {format(selectedDate, 'PPP')}
              </p>
            )}
          </div>

          {/* Multiple Date Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Multiple Date Selection</h2>
            <p className="text-sm text-muted-foreground">
              Click dates to select multiple dates.
            </p>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              fromYear={1900}
              toYear={2099}
            />
            {selectedDates && selectedDates.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected ({selectedDates.length}):{' '}
                {selectedDates.map((date) => format(date, 'MMM d')).join(', ')}
              </p>
            )}
          </div>

          {/* Date Range Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Date Range Selection</h2>
            <p className="text-sm text-muted-foreground">
              Select a start and end date.
            </p>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              fromYear={1900}
              toYear={2099}
            />
            {dateRange?.from && (
              <p className="text-sm text-muted-foreground">
                {dateRange.to
                  ? `${format(dateRange.from, 'PPP')} – ${format(dateRange.to, 'PPP')}`
                  : `From: ${format(dateRange.from, 'PPP')}`}
              </p>
            )}
          </div>

          {/* Disabled Dates */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Disabled Dates</h2>
            <p className="text-sm text-muted-foreground">
              Weekends are disabled in this example.
            </p>
            <Calendar
              mode="single"
              disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
              fromYear={1900}
              toYear={2099}
            />
          </div>

          {/* Uncontrolled Default */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Uncontrolled (Default)</h2>
            <p className="text-sm text-muted-foreground">
              No external state – calendar manages itself.
            </p>
            <Calendar fromYear={1900} toYear={2099} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
