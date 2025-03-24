"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isSameDay } from "date-fns"

interface Appointment {
  id: string
  day: number
  month: number
  year: number
  title: string
  customer: string
  time: string
}

export function AppointmentCalendar() {
  const [view, setView] = useState<"day" | "week" | "month">("month")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  // This would come from an API or database in a real application
  const appointments: Appointment[] = useMemo(
    () => [
      {
        id: "1",
        day: 15,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        title: "Watch Valuation",
        customer: "James Donovan",
        time: "10:30 AM",
      },
      {
        id: "2",
        day: 15,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        title: "Repair Consultation",
        customer: "Emma Mitchell",
        time: "2:15 PM",
      },
      {
        id: "3",
        day: 8,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        title: "VIP Purchase",
        customer: "Jane Smith",
        time: "11:00 AM",
      },
      {
        id: "4",
        day: 22,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        title: "Watch Servicing",
        customer: "Robert Johnson",
        time: "3:30 PM",
      },
    ],
    [currentDate],
  )

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prevDate) => (direction === "prev" ? subMonths(prevDate, 1) : addMonths(prevDate, 1)))
  }, [])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  // Calculate calendar grid data
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getDay(startOfMonth(currentDate))
    const today = new Date()

    // Create array for all cells in the calendar (35 = 5 weeks × 7 days)
    return Array.from({ length: 35 }).map((_, i) => {
      const dayNumber = i - firstDayOfMonth + 1
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
      const isToday = isCurrentMonth && isSameDay(date, today)

      const dayAppointments = appointments.filter(
        (apt) =>
          apt.day === dayNumber && apt.month === currentDate.getMonth() && apt.year === currentDate.getFullYear(),
      )

      return {
        dayNumber,
        isCurrentMonth,
        isToday,
        appointments: dayAppointments,
        date,
      }
    })
  }, [currentDate, appointments])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateMonth("prev")}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateMonth("next")}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-7 border-b text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 divide-x divide-y">
          {calendarDays.map((day, i) => (
            <div
              key={`day-${i}`}
              className={cn(
                "min-h-[100px] p-2",
                !day.isCurrentMonth && "bg-muted/50 text-muted-foreground",
                day.isToday && "bg-blue-50",
              )}
            >
              {day.isCurrentMonth && (
                <>
                  <div className="flex justify-between">
                    <span className={cn("text-sm", day.isToday && "font-bold text-primary")}>{day.dayNumber}</span>
                    {day.appointments.length > 0 && (
                      <span className="flex h-2 w-2 rounded-full bg-primary" aria-hidden="true"></span>
                    )}
                  </div>
                  {day.appointments.length > 0 && (
                    <div className="space-y-1 mt-1">
                      {day.appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="rounded-md bg-primary/10 p-1.5 text-xs"
                          tabIndex={0}
                          role="button"
                          aria-label={`${apt.title} with ${apt.customer} at ${apt.time}`}
                        >
                          <div className="font-medium line-clamp-1">
                            {apt.time} - {apt.title}
                          </div>
                          <div className="text-muted-foreground line-clamp-1">{apt.customer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

