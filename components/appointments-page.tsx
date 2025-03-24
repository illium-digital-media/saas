"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, PlusCircle, Calendar, Bell, Clock, CalendarDays, CheckCircle2, XCircle } from "lucide-react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export function AppointmentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "hidden border-r bg-sidebar shadow-sm lg:block transition-all duration-300 fixed top-0 left-0 h-screen z-30",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-center border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">
              {sidebarCollapsed ? "JCRM" : "JewellersCRM"}
            </span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav collapsed={sidebarCollapsed} />
          </div>
          <div className="border-t p-2 flex justify-center">
            <SidebarToggle isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={toggleMobileSidebar} />}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar shadow-lg transition-transform duration-300 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">JewellersCRM</span>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("flex flex-col w-full", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <button className="lg:hidden" onClick={toggleMobileSidebar}>
            <span className="sr-only">Toggle menu</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="w-full flex-1">
            <Search />
          </div>
          <UserNav />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Appointments</h1>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </div>

          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Appointment Calendar
              </TabsTrigger>
              <TabsTrigger value="book" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Book Appointment
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Calendar</CardTitle>
                  <CardDescription>View and manage upcoming appointments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Today
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Button>
                        <h3 className="text-sm font-medium">May 2023</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="day">
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
                        {Array.from({ length: 35 }).map((_, i) => {
                          const day = i - 1 + 1 // Adjust for May starting on Monday
                          const isCurrentMonth = day > 0 && day <= 31
                          const isToday = day === 15
                          const hasAppointment = [3, 8, 15, 22, 27].includes(day)

                          return (
                            <div
                              key={i}
                              className={cn(
                                "min-h-[100px] p-2",
                                !isCurrentMonth && "bg-muted/50 text-muted-foreground",
                                isToday && "bg-blue-50",
                              )}
                            >
                              {isCurrentMonth && (
                                <>
                                  <div className="flex justify-between">
                                    <span className={cn("text-sm", isToday && "font-bold text-primary")}>{day}</span>
                                    {hasAppointment && <span className="flex h-2 w-2 rounded-full bg-primary"></span>}
                                  </div>
                                  {day === 15 && (
                                    <div className="mt-2 rounded-md bg-primary/10 p-1 text-xs">
                                      <div className="font-medium">10:30 AM - Watch Valuation</div>
                                      <div className="text-muted-foreground">James Donovan</div>
                                    </div>
                                  )}
                                  {day === 15 && (
                                    <div className="mt-1 rounded-md bg-primary/10 p-1 text-xs">
                                      <div className="font-medium">2:15 PM - Repair Consultation</div>
                                      <div className="text-muted-foreground">Emma Mitchell</div>
                                    </div>
                                  )}
                                  {day === 8 && (
                                    <div className="mt-2 rounded-md bg-primary/10 p-1 text-xs">
                                      <div className="font-medium">11:00 AM - VIP Purchase</div>
                                      <div className="text-muted-foreground">Jane Smith</div>
                                    </div>
                                  )}
                                  {day === 22 && (
                                    <div className="mt-2 rounded-md bg-primary/10 p-1 text-xs">
                                      <div className="font-medium">3:30 PM - Watch Servicing</div>
                                      <div className="text-muted-foreground">Robert Johnson</div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="book" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book New Appointment</CardTitle>
                  <CardDescription>Schedule a new appointment with a customer.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer</Label>
                        <Select>
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
                        <Select>
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
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Select>
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
                        <Select defaultValue="30">
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
                        <Select>
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
                        <Textarea id="notes" placeholder="Enter any additional details or requirements..." />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="send-reminder" />
                          <Label htmlFor="send-reminder">Send appointment reminder to customer</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Schedule Appointment</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Notifications</CardTitle>
                  <CardDescription>Manage appointment reminders and notifications.</CardDescription>
                </CardHeader>
                <CardContent>
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
                            <p className="text-sm text-muted-foreground">
                              Send automatic reminders to customers before appointments
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="auto-reminders" defaultChecked />
                            <Label htmlFor="auto-reminders">Enabled</Label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Staff Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Notify staff members about their upcoming appointments
                            </p>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

