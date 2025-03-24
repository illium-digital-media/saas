"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react"

export function AppointmentNotifications() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="p-4 bg-muted/40">
          <h3 className="text-sm font-medium">Upcoming Appointment Reminders</h3>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">James Donovan</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Today, 10:30 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Watch Valuation</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Arrived
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Emma Mitchell</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Today, 2:15 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Repair Consultation</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Arrived
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Robert Johnson</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Tomorrow, 11:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>VIP Purchase</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="outline" size="sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4 bg-muted/40">
          <h3 className="text-sm font-medium">Notification Settings</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Reminders</h4>
              <p className="text-sm text-muted-foreground">Send automatic reminders to customers before appointments</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-reminders" defaultChecked />
              <Label htmlFor="auto-reminders">Enabled</Label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Staff Notifications</h4>
              <p className="text-sm text-muted-foreground">Notify staff members about their upcoming appointments</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="staff-notifications" defaultChecked />
              <Label htmlFor="staff-notifications">Enabled</Label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Cancellation Alerts</h4>
              <p className="text-sm text-muted-foreground">Send alerts when appointments are cancelled</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="cancellation-alerts" defaultChecked />
              <Label htmlFor="cancellation-alerts">Enabled</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

