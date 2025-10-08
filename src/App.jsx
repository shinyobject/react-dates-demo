import { useState, useEffect } from 'react'
import moment from 'moment'
import { SingleDatePicker, DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './App.css'

function App() {
  // Single Date Picker state
  const [singleDate, setSingleDate] = useState(null)
  const [singleFocused, setSingleFocused] = useState(false)

  // Date Range Picker state
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [rangeFocusedInput, setRangeFocusedInput] = useState(null)

  // Prevent spacebar from scrolling and fix focus management for calendar navigation
  useEffect(() => {
    let pendingFocusRestore = null
    let focusRestoreAttempts = 0
    const MAX_ATTEMPTS = 10

    const restoreFocusToNavButton = (isNext, isPrev) => {
      focusRestoreAttempts++
      
      if (focusRestoreAttempts > MAX_ATTEMPTS) {
        pendingFocusRestore = null
        focusRestoreAttempts = 0
        return
      }

      let buttonToFocus = null
      if (isNext) {
        buttonToFocus = document.querySelector('[aria-label*="forward"]')
      } else if (isPrev) {
        buttonToFocus = document.querySelector('[aria-label*="backward"]')
      }
      
      if (buttonToFocus && document.activeElement !== buttonToFocus) {
        buttonToFocus.focus()
        // Keep trying if focus was stolen
        setTimeout(() => {
          if (pendingFocusRestore && document.activeElement !== buttonToFocus) {
            restoreFocusToNavButton(isNext, isPrev)
          } else {
            pendingFocusRestore = null
            focusRestoreAttempts = 0
          }
        }, 20)
      } else {
        pendingFocusRestore = null
        focusRestoreAttempts = 0
      }
    }

    const handleKeyDown = (e) => {
      const target = e.target
      
      // Prevent spacebar from scrolling when on navigation buttons
      if (e.key === ' ' || e.key === 'Spacebar') {
        if (
          target.classList.contains('DayPickerNavigation_button') ||
          target.closest('.DayPickerNavigation')
        ) {
          e.preventDefault()
          
          // Store the button that was focused
          const navButton = target.closest('.DayPickerNavigation_button')
          const isNext = navButton?.getAttribute('aria-label')?.includes('forward')
          const isPrev = navButton?.getAttribute('aria-label')?.includes('backward')
          
          // Manually trigger the click since we prevented default
          navButton?.click()
          
          // Start trying to restore focus
          pendingFocusRestore = { isNext, isPrev }
          focusRestoreAttempts = 0
          
          setTimeout(() => {
            restoreFocusToNavButton(isNext, isPrev)
          }, 10)
        }
      }
    }

    const handleClick = (e) => {
      const target = e.target
      const navButton = target.closest('.DayPickerNavigation_button')
      
      if (navButton) {
        // Store which button was clicked
        const isNext = navButton.getAttribute('aria-label')?.includes('forward')
        const isPrev = navButton.getAttribute('aria-label')?.includes('backward')
        
        // Start trying to restore focus
        pendingFocusRestore = { isNext, isPrev }
        focusRestoreAttempts = 0
        
        setTimeout(() => {
          restoreFocusToNavButton(isNext, isPrev)
        }, 10)
      }
    }

    // Use capturing phase to catch events before react-dates handlers
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('click', handleClick)
      pendingFocusRestore = null
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        <h1>React Dates Demo</h1>
        <p className="subtitle">Beautiful date pickers for React</p>

        <div className="demo-section">
          <h2>Single Date Picker</h2>
          <div className="picker-wrapper">
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
              reopenPickerOnClearDate={false}
              keepFocusOnInput={false}
              noBorder={false}
            />
          </div>
          {singleDate && (
            <div className="selected-info">
              <strong>Selected:</strong> {singleDate.format('MMMM D, YYYY')}
            </div>
          )}
        </div>

        <div className="demo-section">
          <h2>Date Range Picker</h2>
          <div className="picker-wrapper">
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
              reopenPickerOnClearDates={false}
              numberOfMonths={2}
              startDatePlaceholderText="Start Date"
              endDatePlaceholderText="End Date"
              keepFocusOnInput={false}
              noBorder={false}
            />
          </div>
          {startDate && endDate && (
            <div className="selected-info">
              <strong>Selected Range:</strong> {startDate.format('MMMM D, YYYY')} - {endDate.format('MMMM D, YYYY')}
              <br />
              <strong>Duration:</strong> {endDate.diff(startDate, 'days')} days
            </div>
          )}
        </div>

        <div className="features">
          <h3>Features</h3>
          <ul>
            <li>📅 Beautiful, accessible date pickers</li>
            <li>🎨 Highly customizable styling</li>
            <li>📱 Mobile-friendly and responsive</li>
            <li>⌨️ Keyboard navigation support</li>
            <li>🌍 Internationalization support via Moment.js</li>
            <li>♿ Screen reader accessible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

