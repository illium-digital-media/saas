"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DateRangeCalendarProps {
  className?: string
  onRangeSelect?: (range: [Date, Date] | null) => void
}

export function DateRangeCalendar({ className, onRangeSelect }: DateRangeCalendarProps) {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date(2019, 8, 2)) // Sep 2, 2019
  const [endDate, setEndDate] = React.useState<Date | null>(new Date(2019, 8, 19)) // Sep 19, 2019
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2019, 8, 1)) // Sep 2019

  // Days of week headers
  const daysOfWeek = ["S", "T", "Q", "Q", "S", "S", "D"]

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Get month data
  const getMonthData = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const monthName = date.toLocaleString("default", { month: "long", year: "numeric" })

    return { year, month, firstDay, daysInMonth, monthName }
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else {
      if (date < startDate) {
        setEndDate(startDate)
        setStartDate(date)
      } else {
        setEndDate(date)
      }
    }

    if (startDate && !endDate) {
      onRangeSelect?.([startDate, date])
    }
  }

  // Check if date is in selected range
  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false
    return date >= startDate && date <= endDate
  }

  // Check if date is selected (start or end)
  const isSelected = (date: Date) => {
    if (!startDate) return false
    if (startDate.getTime() === date.getTime()) return true
    if (endDate && endDate.getTime() === date.getTime()) return true
    return false
  }

  // Render a month
  const renderMonth = (baseDate: Date) => {
    const { year, month, firstDay, daysInMonth, monthName } = getMonthData(baseDate)

    // Create calendar grid
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const inRange = isInRange(date)
      const selected = isSelected(date)

      days.push(
        <button
          key={`day-${day}`}
          className={cn(
            "w-8 h-8 relative flex items-center justify-center text-sm",
            inRange && "bg-blue-100 rounded-none",
            selected && "text-white z-10",
            !inRange && !selected && "hover:bg-gray-100",
          )}
          onClick={() => handleDateClick(date)}
        >
          {selected ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">{day}</span>
            </span>
          ) : (
            day
          )}
        </button>,
      )
    }

    return (
      <div className="flex-1">
        <h2 className="text-sm font-medium mb-4 text-center">{monthName}</h2>
        <div className="grid grid-cols-7 gap-0">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center text-xs text-gray-500">
              {day}
            </div>
          ))}
          <div className="col-span-7 grid grid-cols-7 gap-0">{days}</div>
        </div>
      </div>
    )
  }

  // Handle cancel button
  const handleCancel = () => {
    setStartDate(null)
    setEndDate(null)
    onRangeSelect?.(null)
  }

  // Handle ok button
  const handleOk = () => {
    if (startDate && endDate) {
      onRangeSelect?.([startDate, endDate])
    }
  }

  // Get next month
  const getNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
  }

  return (
    <Card className={cn("w-full max-w-[600px] p-4 shadow-lg", className)}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-8 flex-1 justify-center">
          {renderMonth(currentMonth)}
          {renderMonth(getNextMonth(currentMonth))}
        </div>

        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-4 border-t pt-4">
        <Button variant="ghost" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="default" onClick={handleOk}>
          Ok
        </Button>
      </div>
    </Card>
  )
}

