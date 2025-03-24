"use client"

import * as React from "react"
import {
  addDays,
  format,
  isBefore,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DateRangePickerV45Props {
  onChange?: (range: { from: Date; to: Date } | null) => void
  className?: string
  align?: "start" | "center" | "end"
  defaultValue?: { from: Date; to: Date }
}

type DateRange = { from: Date; to: Date } | null

type PresetRange = {
  name: string
  label: string
  value: () => DateRange
}

export function DateRangePickerV45({ onChange, className, align = "end", defaultValue }: DateRangePickerV45Props) {
  const [selectedRange, setSelectedRange] = React.useState<DateRange>(defaultValue || null)
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null)
  const [rangeSelectMode, setRangeSelectMode] = React.useState<"start" | "end">("start")
  const [isOpen, setIsOpen] = React.useState(false)

  // Predefined date ranges
  const presets: PresetRange[] = [
    {
      name: "today",
      label: "Today",
      value: () => {
        const today = new Date()
        return { from: today, to: today }
      },
    },
    {
      name: "yesterday",
      label: "Yesterday",
      value: () => {
        const yesterday = addDays(new Date(), -1)
        return { from: yesterday, to: yesterday }
      },
    },
    {
      name: "last7",
      label: "Last 7 days",
      value: () => {
        const today = new Date()
        const last7 = addDays(today, -6)
        return { from: last7, to: today }
      },
    },
    {
      name: "last30",
      label: "Last 30 days",
      value: () => {
        const today = new Date()
        const last30 = addDays(today, -29)
        return { from: last30, to: today }
      },
    },
    {
      name: "thisMonth",
      label: "This month",
      value: () => {
        const today = new Date()
        return {
          from: startOfMonth(today),
          to: endOfMonth(today),
        }
      },
    },
    {
      name: "lastMonth",
      label: "Last month",
      value: () => {
        const today = new Date()
        const lastMonth = subMonths(today, 1)
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth),
        }
      },
    },
  ]

  const nextMonth = addMonths(currentDate, 1)

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const currentMonthDays = getDaysInMonth(currentDate)
  const nextMonthDays = getDaysInMonth(nextMonth)

  const handleDateClick = (date: Date) => {
    if (rangeSelectMode === "start") {
      setSelectedRange({ from: date, to: date })
      setRangeSelectMode("end")
    } else {
      if (selectedRange?.from && isBefore(date, selectedRange.from)) {
        setSelectedRange({ from: date, to: selectedRange.from })
      } else if (selectedRange?.from) {
        setSelectedRange({ from: selectedRange.from, to: date })
      }
      setRangeSelectMode("start")
    }
  }

  const handleDateHover = (date: Date) => {
    setHoverDate(date)
  }

  const getPreviewRange = () => {
    if (rangeSelectMode === "end" && selectedRange?.from && hoverDate) {
      if (isBefore(hoverDate, selectedRange.from)) {
        return { from: hoverDate, to: selectedRange.from }
      } else {
        return { from: selectedRange.from, to: hoverDate }
      }
    }
    return null
  }

  const previewRange = getPreviewRange()

  const isInRange = (date: Date) => {
    if (selectedRange?.from && selectedRange.to) {
      return isWithinInterval(date, { start: selectedRange.from, end: selectedRange.to })
    }

    if (previewRange?.from && previewRange.to) {
      return isWithinInterval(date, { start: previewRange.from, end: previewRange.to })
    }

    return false
  }

  const isRangeStart = (date: Date) => {
    return (
      (selectedRange?.from && isSameDay(date, selectedRange.from)) ||
      (previewRange?.from && isSameDay(date, previewRange.from))
    )
  }

  const isRangeEnd = (date: Date) => {
    return (
      (selectedRange?.to && isSameDay(date, selectedRange.to)) || (previewRange?.to && isSameDay(date, previewRange.to))
    )
  }

  const handlePresetClick = (preset: PresetRange) => {
    const range = preset.value()
    setSelectedRange(range)
    onChange?.(range)
    setIsOpen(false)
  }

  const handleClear = () => {
    setSelectedRange(null)
    onChange?.(null)
  }

  const handleApply = () => {
    if (selectedRange?.from && selectedRange.to) {
      onChange?.(selectedRange)
      setIsOpen(false)
    }
  }

  const formatDisplayDate = () => {
    if (!selectedRange) return "Select date range"

    const { from, to } = selectedRange

    if (isSameDay(from, to)) {
      return format(from, "MMMM d, yyyy")
    }

    return `${format(from, "MMM d")} - ${format(to, "MMM d, yyyy")}`
  }

  const renderDay = (date: Date, monthDate: Date) => {
    const isSelected =
      (selectedRange?.from && isSameDay(date, selectedRange.from)) ||
      (selectedRange?.to && isSameDay(date, selectedRange.to))
    const inRange = isInRange(date)
    const isStart = isRangeStart(date)
    const isEnd = isRangeEnd(date)
    const isCurrentMonth = isSameDay(startOfMonth(date), startOfMonth(monthDate))

    return (
      <div key={date.toISOString()} className={cn("relative h-10 w-10 p-0", !isCurrentMonth && "opacity-50")}>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            inRange && "bg-primary/10",
            isStart && "rounded-l-full",
            isEnd && "rounded-r-full",
          )}
        />
        <button
          type="button"
          className={cn(
            "relative z-10 h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors",
            isToday(date) && !isSelected && "border border-primary/50",
            isSelected && "bg-primary text-primary-foreground font-medium",
            !isSelected && inRange && "text-primary-foreground/80",
            !isSelected && !inRange && !isCurrentMonth && "text-muted-foreground",
            !isSelected && !inRange && isCurrentMonth && "text-foreground hover:bg-primary/10",
          )}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleDateHover(date)}
          disabled={!isCurrentMonth}
        >
          {format(date, "d")}
        </button>
      </div>
    )
  }

  const renderMonth = (days: Date[], monthDate: Date) => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-center">{format(monthDate, "MMMM yyyy")}</div>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div
            key={day}
            className="h-10 w-10 text-xs font-medium text-center text-muted-foreground flex items-center justify-center"
          >
            {day}
          </div>
        ))}
        {days.map((date) => renderDay(date, monthDate))}
      </div>
    </div>
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[260px] justify-start text-left font-normal", className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">{formatDisplayDate()}</span>
          {selectedRange && (
            <X
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="bg-background rounded-md border shadow-lg w-[760px] overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select date range</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentDate(subMonths(currentDate, 12))}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentDate(addMonths(currentDate, 12))}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="calendar" className="w-full">
            <div className="px-4 py-2 border-b">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="calendar" className="p-0">
              <div className="grid grid-cols-2 gap-4 p-4">
                {renderMonth(currentMonthDays, currentDate)}
                {renderMonth(nextMonthDays, nextMonth)}
              </div>
            </TabsContent>

            <TabsContent value="presets" className="p-0">
              <div className="grid grid-cols-3 gap-2 p-4">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="justify-start font-normal"
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center space-x-2">
              {selectedRange && (
                <Badge variant="outline" className="text-xs font-normal">
                  {selectedRange.from && selectedRange.to
                    ? `${format(selectedRange.from, "MMM d, yyyy")} - ${format(selectedRange.to, "MMM d, yyyy")}`
                    : "Select end date"}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button size="sm" onClick={handleApply} disabled={!selectedRange?.from || !selectedRange?.to}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

