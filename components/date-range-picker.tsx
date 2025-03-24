"use client"

import * as React from "react"
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface CalendarDateRangePickerProps {
  className?: string
  date?: {
    from?: Date
    to?: Date
  }
  setDate?: ({ from, to }: { from?: Date; to?: Date }) => void
}

export function CalendarDateRangePicker({ className }: { className?: string }) {
  return null // Remove the entire date picker functionality
}

interface DateRangePickerProps {
  onChange?: (range: { from: Date; to: Date } | null) => void
  className?: string
}

export function DateRangePicker({ onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentDate, setCurrentDate] = React.useState(new Date(2019, 8, 1)) // September 2019 to match the image
  const [selectedRange, setSelectedRange] = React.useState<{ from?: Date; to?: Date }>({
    from: new Date(2019, 8, 2), // September 2, 2019
    to: new Date(2019, 8, 19), // September 19, 2019
  })

  const nextMonth = addMonths(currentDate, 1)

  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"]

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const currentMonthDays = getDaysInMonth(currentDate)
  const nextMonthDays = getDaysInMonth(nextMonth)

  const handleDateClick = (date: Date) => {
    if (!selectedRange.from) {
      setSelectedRange({ from: date, to: undefined })
    } else if (!selectedRange.to) {
      const from = selectedRange.from
      const to = date
      if (from <= to) {
        setSelectedRange({ from, to })
      } else {
        setSelectedRange({ from: to, to: from })
      }
    } else {
      setSelectedRange({ from: date, to: undefined })
    }
  }

  const isInRange = (date: Date) => {
    if (selectedRange.from && selectedRange.to) {
      return isWithinInterval(date, { start: selectedRange.from, end: selectedRange.to })
    }
    return false
  }

  const handleConfirm = () => {
    if (selectedRange.from && selectedRange.to) {
      onChange?.({ from: selectedRange.from, to: selectedRange.to })
      setIsOpen(false)
    }
  }

  // Function to determine if a date is at the start of a week
  const isStartOfWeek = (index: number) => index % 7 === 0

  // Function to determine if a date is at the end of a week
  const isEndOfWeek = (index: number) => index % 7 === 6

  // Function to determine if a date is the first day in a range within its week
  const isFirstInRangeInWeek = (date: Date, index: number, days: Date[]) => {
    if (!selectedRange.from || !selectedRange.to) return false

    // If it's the start of the range, it's the first in its week
    if (isSameDay(date, selectedRange.from)) return true

    // If it's the start of a week and in range, it's the first in its week
    if (isStartOfWeek(index) && isInRange(date)) return true

    // If the previous day is not in range but this one is, it's the first in its segment
    const prevIndex = index - 1
    if (prevIndex >= 0) {
      const prevDate = days[prevIndex]
      return isInRange(date) && !isInRange(prevDate)
    }

    return false
  }

  // Function to determine if a date is the last day in a range within its week
  const isLastInRangeInWeek = (date: Date, index: number, days: Date[]) => {
    if (!selectedRange.from || !selectedRange.to) return false

    // If it's the end of the range, it's the last in its week
    if (isSameDay(date, selectedRange.to)) return true

    // If it's the end of a week and in range, it's the last in its week
    if (isEndOfWeek(index) && isInRange(date)) return true

    // If the next day is not in range but this one is, it's the last in its segment
    const nextIndex = index + 1
    if (nextIndex < days.length) {
      const nextDate = days[nextIndex]
      return isInRange(date) && !isInRange(nextDate)
    }

    return false
  }

  const renderMonth = (days: Date[], monthDate: Date) => {
    // Create a combined array of all days to handle week boundaries correctly
    const allDays = [...days]

    return (
      <div className="space-y-4">
        <div className="text-sm font-medium text-center">{format(monthDate, "MMMM yyyy")}</div>
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map((day) => (
            <div key={day} className="h-8 text-xs font-medium text-center text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Group days by weeks for proper range styling */}
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => {
            const weekStart = weekIndex * 7
            const weekEnd = Math.min(weekStart + 7, days.length)
            const weekDays = days.slice(weekStart, weekEnd)

            return (
              <div key={`week-${weekIndex}`} className="col-span-7 grid grid-cols-7 relative">
                {/* Render the range background for this week */}
                {weekDays.some((d) => isInRange(d)) && (
                  <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                    {weekDays.map((date, i) => {
                      const dayIndex = weekStart + i
                      const inRange = isInRange(date)
                      const isFirst = isFirstInRangeInWeek(date, dayIndex, allDays)
                      const isLast = isLastInRangeInWeek(date, dayIndex, allDays)

                      return (
                        <div
                          key={`bg-${date.toISOString()}`}
                          className={cn(
                            "h-8",
                            inRange && "bg-blue-100",
                            isFirst && "rounded-l-full",
                            isLast && "rounded-r-full",
                          )}
                        />
                      )
                    })}
                  </div>
                )}

                {/* Render the actual day buttons */}
                {weekDays.map((date, i) => {
                  const dayIndex = weekStart + i
                  const isSelected =
                    (selectedRange.from && isSameDay(date, selectedRange.from)) ||
                    (selectedRange.to && isSameDay(date, selectedRange.to))

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateClick(date)}
                      className={cn(
                        "h-8 w-full flex items-center justify-center text-sm relative z-10",
                        !isSameMonth(date, monthDate) && "text-muted-foreground/50",
                        isSelected && "text-white",
                        isInRange(date) && !isSelected && "text-blue-600",
                      )}
                      disabled={!isSameMonth(date, monthDate)}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                            {format(date, "d")}
                          </span>
                        </span>
                      )}
                      {!isSelected && format(date, "d")}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedRange.from && selectedRange.to
            ? `${format(selectedRange.from, "MMM d")} - ${format(selectedRange.to, "MMM d, yyyy")}`
            : "Select date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 bg-white rounded-lg shadow-lg w-[600px]">
          <div className="relative px-8">
            <Button
              variant="ghost"
              className="absolute left-0 top-0 h-8 w-8 p-0 opacity-50 hover:opacity-100"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-2 gap-8">
              <div>{renderMonth(currentMonthDays, currentDate)}</div>
              <div>{renderMonth(nextMonthDays, nextMonth)}</div>
            </div>
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-8 w-8 p-0 opacity-50 hover:opacity-100"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-end space-x-2 mt-4 border-t pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRange({})
                setIsOpen(false)
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedRange.from || !selectedRange.to}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Ok
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

