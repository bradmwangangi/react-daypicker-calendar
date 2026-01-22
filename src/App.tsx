import { format } from 'date-fns'
import { Github } from 'lucide-react'
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
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-grow p-4 sm:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">
                react-daypicker-calendar
              </h1>
              <a
                href="https://github.com/bradmwangangi/react-daypicker-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
            <p className="text-muted-foreground">
              A flexible React calendar with advanced selection modes and
              seamless month/year navigation.
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
                  {selectedDates
                    .map((date) => format(date, 'MMM d'))
                    .join(', ')}
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

      <footer className="border-t border-border bg-muted/50 p-4 sm:p-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-muted-foreground">
            Developed by{' '}
            <a
              href="https://github.com/bradmwangangi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-foreground"
            >
              bradmwangangi
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
