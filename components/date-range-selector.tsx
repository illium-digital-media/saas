"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DateRangeSelectorProps {
  onRangeSelect?: (range: { from: Date; to: Date }) => void
  className?: string
}

export function DateRangeSelector({ onRangeSelect, className }: DateRangeSelectorProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedRange, setSelectedRange] = React.useState<{ from?: Date; to?: Date }>({})

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
        onRangeSelect?.({ from, to })
      } else {
        setSelectedRange({ from: to, to: from })
        onRangeSelect?.({ from: to, to: from })
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

  const renderMonth = (days: Date[], monthDate: Date) => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-center">{format(monthDate, "MMMM yyyy")}</div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-xs text-center text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((date, i) => {
          const isSelected =
            (selectedRange.from && isSameDay(date, selectedRange.from)) ||
            (selectedRange.to && isSameDay(date, selectedRange.to))
          const inRange = isInRange(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={cn(
                "h-8 w-8 text-sm rounded-full flex items-center justify-center",
                !isSameMonth(date, monthDate) && "text-muted-foreground opacity-50",
                isSelected && "bg-blue-600 text-white",
                inRange && !isSelected && "bg-blue-100",
                "hover:bg-blue-50",
              )}
            >
              {format(date, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <Card className={cn("p-4", className)}>
      <div className="relative">
        <div className="flex justify-between space-x-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-0"
            onClick={() => setCurrentDate(addMonths(currentDate, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">{renderMonth(currentMonthDays, currentDate)}</div>
          <div className="flex-1">{renderMonth(nextMonthDays, nextMonth)}</div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={() => setSelectedRange({})}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            if (selectedRange.from && selectedRange.to) {
              onRangeSelect?.(selectedRange as { from: Date; to: Date })
            }
          }}
        >
          Ok
        </Button>
      </div>
    </Card>
  )
}

