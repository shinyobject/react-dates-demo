import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/style.css'
import './ReactDayPickerDemo.css'

export function ReactDayPickerDemo() {
  // Single Date Picker
  const [singleDate, setSingleDate] = useState()
  
  // Date Range Picker
  const [dateRange, setDateRange] = useState()
  
  // Handle spacebar on nav buttons to prevent page scroll and maintain focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' && e.target.closest('.rdp-nav_button')) {
        e.preventDefault() // Prevent page scroll
        const button = e.target.closest('.rdp-nav_button')
        // Trigger the click
        button.click()
        // Restore focus after react-day-picker updates
        setTimeout(() => button.focus(), 10)
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  return (
    <div className="rdp-demo">
      <div className="rdp-section">
        <h2>react-day-picker: Single Date</h2>
        <div className="rdp-wrapper">
          <DayPicker
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
            footer={
              singleDate && (
                <div className="rdp-footer">
                  <strong>Selected:</strong> {format(singleDate, 'MMMM d, yyyy')}
                </div>
              )
            }
          />
        </div>
      </div>

      <div className="rdp-section">
        <h2>react-day-picker: Date Range</h2>
        <div className="rdp-wrapper">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            footer={
              dateRange?.from && dateRange?.to && (
                <div className="rdp-footer">
                  <strong>Selected Range:</strong>{' '}
                  {format(dateRange.from, 'MMM d, yyyy')} -{' '}
                  {format(dateRange.to, 'MMM d, yyyy')}
                  <br />
                  <strong>Duration:</strong>{' '}
                  {Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))} days
                </div>
              )
            }
          />
        </div>
      </div>

      <div className="rdp-benefits">
        <h3>✅ react-day-picker Benefits</h3>
        <ul>
          <li>🎯 <strong>Full focus control</strong> - Navigation buttons keep focus after month change!</li>
          <li>🚫 <strong>No page scrolling</strong> - Spacebar handled properly</li>
          <li>⚛️ <strong>React 18 compatible</strong> - No peer dependency warnings</li>
          <li>📦 <strong>15KB</strong> vs 167KB (react-dates)</li>
          <li>🔧 <strong>Fully customizable</strong> - Replace any component</li>
          <li>🆕 <strong>Actively maintained</strong> - Updated regularly</li>
          <li>📝 <strong>TypeScript native</strong> - Full type safety</li>
          <li>♿ <strong>Accessible by default</strong> - WCAG 2.1 AA compliant</li>
        </ul>
      </div>
    </div>
  )
}

