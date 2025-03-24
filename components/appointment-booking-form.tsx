"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function AppointmentBookingForm() {
  const [date, setDate] = useState<string>("")
  const [customer, setCustomer] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [duration, setDuration] = useState<string>("30")
  const [staff, setStaff] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [sendReminder, setSendReminder] = useState<boolean>(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    console.log({ date, customer, appointmentType, time, duration, staff, notes, sendReminder })
    alert("Appointment scheduled successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer</Label>
          <Select value={customer} onValueChange={setCustomer} required>
            <SelectTrigger id="customer">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
              <SelectItem value="new">+ Add New Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appointment-type">Appointment Type</Label>
          <Select value={appointmentType} onValueChange={setAppointmentType} required>
            <SelectTrigger id="appointment-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="valuation">Watch Valuation</SelectItem>
              <SelectItem value="purchase">Purchase Consultation</SelectItem>
              <SelectItem value="repair">Repair Consultation</SelectItem>
              <SelectItem value="service">Service Drop-off/Collection</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Select value={time} onValueChange={setTime} required>
            <SelectTrigger id="time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:00">9:00 AM</SelectItem>
              <SelectItem value="9:30">9:30 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="10:30">10:30 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="11:30">11:30 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="12:30">12:30 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="13:30">1:30 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="14:30">2:30 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="15:30">3:30 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="16:30">4:30 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="staff">Assigned Staff</Label>
          <Select value={staff} onValueChange={setStaff}>
            <SelectTrigger id="staff">
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emma-thompson">Emma Thompson</SelectItem>
              <SelectItem value="james-wilson">James Wilson</SelectItem>
              <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
              <SelectItem value="michael-rodriguez">Michael Rodriguez</SelectItem>
              <SelectItem value="any">Any Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional details or requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="send-reminder"
              checked={sendReminder}
              onCheckedChange={(checked) => setSendReminder(checked as boolean)}
            />
            <Label htmlFor="send-reminder">Send appointment reminder to customer</Label>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Schedule Appointment</Button>
      </div>
    </form>
  )
}

