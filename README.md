# react-daypicker-calendar

A flexible React calendar component with advanced selection modes and seamless month/year navigation. Built with React DayPicker, Tailwind CSS, and Radix UI.

## Features

- Single date selection
- Multiple date selection
- Date range selection
- Disabled date support
- Month and year picker navigation
- Responsive design
- Fully styled with Tailwind CSS
- Type-safe with TypeScript

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Usage

The Calendar component supports multiple selection modes:

```tsx
import { Calendar } from './components/calendar'

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
/>
```

## License

MIT
