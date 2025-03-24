"use client"

import { useState } from "react"
import { DateRangeCalendar } from "@/components/date-range-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample appointment data
const appointments = [
  { id: 1, title: "Watch Valuation", customer: "James Donovan", date: new Date(2019, 8, 15), time: "10:30 AM" },
  { id: 2, title: "Repair Consultation", customer: "Emma Mitchell", date: new Date(2019, 8, 15), time: "2:15 PM" },
  { id: 3, title: "VIP Purchase", customer: "Jane Smith", date: new Date(2019, 8, 8), time: "11:00 AM" },
  { id: 4, title: "Watch Servicing", customer: "Robert Johnson", date: new Date(2019, 8, 22), time: "3:30 PM" },
]

export function AppointmentView() {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null)

  // Filter appointments based on selected range
  const filteredAppointments = selectedRange
    ? appointments.filter((apt) => apt.date >= selectedRange[0] && apt.date <= selectedRange[1])
    : appointments

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <DateRangeCalendar onRangeSelect={setSelectedRange} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedRange
              ? `Appointments (${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()})`
              : "All Appointments"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{appointment.title}</h3>
                    <Badge variant="outline">{appointment.time}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.customer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{appointment.date.toLocaleDateString()}</p>
                </div>
              </div>
            ))}

            {filteredAppointments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No appointments found in the selected date range.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

