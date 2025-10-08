# React Dates Demo

A simple demo application showcasing the react-dates library for building beautiful datepickers in React.

## Features

- **Single Date Picker**: Select a single date with an intuitive interface
- **Date Range Picker**: Select a range of dates with start and end dates
- Beautiful, responsive design
- Mobile-friendly
- Keyboard navigation support
- Customizable styling

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- react-dates (Airbnb's date picker library)
- Moment.js (for date manipulation)

## Usage Examples

### Single Date Picker

```jsx
<SingleDatePicker
  date={singleDate}
  onDateChange={(date) => setSingleDate(date)}
  focused={singleFocused}
  onFocusChange={({ focused }) => setSingleFocused(focused)}
  id="single_date_picker"
  numberOfMonths={1}
  placeholder="Select a date"
  displayFormat="MMMM D, YYYY"
  showClearDate={true}
/>
```

### Date Range Picker

```jsx
<DateRangePicker
  startDate={startDate}
  startDateId="start_date_id"
  endDate={endDate}
  endDateId="end_date_id"
  onDatesChange={({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }}
  focusedInput={rangeFocusedInput}
  onFocusChange={(focusedInput) => setRangeFocusedInput(focusedInput)}
  displayFormat="MMMM D, YYYY"
  showClearDates={true}
  numberOfMonths={2}
/>
```

## Keyboard Navigation Fixes & Known Limitations

This demo includes partial fixes for keyboard navigation issues with react-dates, along with documentation of limitations:

### ✅ Spacebar Scroll Prevention (FIXED)

The spacebar key now triggers navigation buttons WITHOUT scrolling the page. This is achieved by preventing the default spacebar behavior:

```jsx
if (e.key === ' ') {
  if (target.classList.contains('DayPickerNavigation_button')) {
    e.preventDefault()
    // Manually trigger click
    navButton?.click()
  }
}
```

### ❌ Focus Management After Month Change (LIMITATION)

**Known Issue:** After pressing spacebar on a navigation button, focus moves into the calendar grid instead of staying on the button.

**Why This Happens:** This is **intentional behavior by react-dates**. The library is designed to move focus into the calendar dates after month navigation so keyboard users can immediately navigate dates with arrow keys.

**Attempts Made:**
- ✗ Using `keepFocusOnInput` prop - doesn't affect this behavior  
- ✗ JavaScript focus restoration with timeouts - overridden by library
- ✗ Persistent focus fighting (10 retry attempts) - library still wins

**The Root Cause:** React-dates uses internal refs and lifecycle methods to aggressively manage focus. The library calls `.focus()` on calendar day elements after rendering new months, and this happens AFTER any external JavaScript attempts to restore focus.

### Potential Workarounds

1. **Fork react-dates** - Modify the library source to add a prop like `keepFocusOnNavButtons`
2. **Use a different library** - Consider `react-day-picker` or `@mui/x-date-pickers` which may have different focus behavior
3. **Accept the behavior** - This is actually considered good UX by many (focus follows the user's intent to navigate dates)
4. **Custom implementation** - Build your own datepicker with full control over focus management

### ✅ Improved Focus Indicators (FIXED)

Custom CSS provides clear visual focus indicators:

```css
.DayPickerNavigation_button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

## License

MIT

