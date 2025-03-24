"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Edit,
  ArrowLeft,
  ShoppingBag,
  ClipboardList,
  MessageSquare,
  Bell,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { EditCustomerProfileModal } from "./edit-customer-profile-modal"

// Mock customer data
const customerData = {
  id: "cust-1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "+44 7987 654321",
  status: "VIP",
  vipTier: "Platinum",
  address: "123 Park Lane, London, W1K 7TH",
  customerSince: new Date(2021, 0, 15),
  totalPurchases: 78950,
  lastPurchase: new Date(2023, 4, 15),
  preferences: ["Patek Philippe", "Cartier"],
  notes:
    "Prefers Patek Philippe and Cartier. Interested in limited editions. Birthday: April 15. Champagne preference: Dom Pérignon. Always looking for investment pieces.",
  assignedTo: "Emma Thompson",
  nextFollowup: new Date(2023, 5, 10),
  purchases: [
    {
      id: "pur-1",
      item: "Patek Philippe Nautilus",
      reference: "5711/1A-010",
      date: new Date(2023, 4, 15),
      amount: 85000,
      type: "Purchase",
      paymentMethod: "Bank Transfer",
      salesConsultant: "Emma Thompson",
    },
    {
      id: "pur-2",
      item: "Cartier Santos",
      reference: "WSSA0018",
      date: new Date(2023, 1, 3),
      amount: 6800,
      type: "Purchase",
      paymentMethod: "Credit Card",
      salesConsultant: "James Wilson",
    },
    {
      id: "pur-3",
      item: "Rolex Datejust 41",
      reference: "126334",
      date: new Date(2022, 10, 12),
      amount: 450,
      type: "Service",
      serviceType: "Full Service",
      technician: "Michael Brown",
    },
  ],
  appointments: [
    {
      id: "app-1",
      date: new Date(2023, 5, 10),
      time: "14:00",
      type: "Private Viewing",
      status: "Scheduled",
      notes: "Interested in viewing new Patek Philippe collection",
    },
    {
      id: "app-2",
      date: new Date(2023, 2, 5),
      time: "11:30",
      type: "Watch Service",
      status: "Completed",
      notes: "Cartier Santos service and polishing",
    },
  ],
  communications: [
    {
      id: "com-1",
      date: new Date(2023, 4, 20),
      type: "Email",
      subject: "New Patek Philippe Collection",
      summary: "Sent information about the new Patek Philippe collection",
    },
    {
      id: "com-2",
      date: new Date(2023, 3, 10),
      type: "Phone",
      subject: "Birthday Wishes",
      summary: "Called to wish happy birthday and discuss potential interest in new pieces",
    },
  ],
}

export function CustomerProfileDetail() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [customerState, setCustomerState] = useState(customerData)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Format currency - safe for SSR
  const formatCurrency = (amount: number) => {
    if (!isClient) {
      return `£${amount.toLocaleString()}`
    }

    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(amount)
    } catch (error) {
      return `£${amount.toLocaleString()}`
    }
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Button>
        <Button size="sm" className="flex items-center gap-1" onClick={() => setIsEditModalOpen(true)}>
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer Info Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {customerState.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{customerState.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                  {customerState.vipTier}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {customerState.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customerState.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customerState.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{customerState.address}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Account Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer Since</p>
                  <p>{formatDate(customerState.customerSince)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Spend</p>
                  <p>{formatCurrency(customerState.totalPurchases)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Purchase</p>
                  <p>{formatRelativeTime(customerState.lastPurchase)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned To</p>
                  <p>{customerState.assignedTo}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Preferences</h4>
              <div className="flex flex-wrap gap-1">
                {customerState.preferences.map((pref) => (
                  <Badge key={pref} variant="secondary">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">{customerState.notes}</p>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                Set Reminder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <ClipboardList className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" />
                Purchases
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="communications" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Communications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Summary</CardTitle>
                  <CardDescription>Overview of {customerState.name}'s activity and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Purchase</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="font-medium">{customerState.purchases[0].item}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(customerState.purchases[0].date)}</p>
                        <p className="text-sm font-medium mt-1">{formatCurrency(customerState.purchases[0].amount)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        {customerState.appointments[0] ? (
                          <>
                            <p className="font-medium">{customerState.appointments[0].type}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(customerState.appointments[0].date)} at {customerState.appointments[0].time}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {customerState.appointments[0].status}
                            </Badge>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Next Follow-up</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="font-medium">Scheduled Contact</p>
                        <p className="text-sm text-muted-foreground">{formatDate(customerState.nextFollowup)}</p>
                        <p className="text-sm text-muted-foreground">By {customerState.assignedTo}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-4">
                        {[...customerState.purchases, ...customerState.appointments, ...customerState.communications]
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .slice(0, 5)
                          .map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 rounded-full p-1.5 ${
                                  "type" in activity && activity.type === "Service"
                                    ? "bg-blue-100 text-blue-700"
                                    : "type" in activity && activity.type === "Purchase"
                                      ? "bg-green-100 text-green-700"
                                      : "subject" in activity
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {"type" in activity && activity.type === "Service" ? (
                                  <Clock className="h-4 w-4" />
                                ) : "type" in activity && activity.type === "Purchase" ? (
                                  <ShoppingBag className="h-4 w-4" />
                                ) : "subject" in activity ? (
                                  <MessageSquare className="h-4 w-4" />
                                ) : (
                                  <Calendar className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {"item" in activity
                                    ? activity.item
                                    : "subject" in activity
                                      ? activity.subject
                                      : activity.type}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(activity.date)}
                                  {" • "}
                                  {"amount" in activity
                                    ? formatCurrency(activity.amount)
                                    : "time" in activity
                                      ? activity.time
                                      : "type" in activity && "subject" in activity
                                        ? activity.type
                                        : ""}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>All transactions and services for {customerState.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Transactions</h3>
                      </div>
                      <div className="divide-y">
                        {customerState.purchases.map((purchase) => (
                          <div key={purchase.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{purchase.item}</h4>
                                <p className="text-sm text-muted-foreground">Ref: {purchase.reference}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  purchase.type === "Purchase"
                                    ? "bg-green-50 text-green-700 hover:bg-green-50"
                                    : "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                }
                              >
                                {purchase.type}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p>{formatDate(purchase.date)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p>{formatCurrency(purchase.amount)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  {purchase.type === "Purchase" ? "Payment Method" : "Service Type"}
                                </p>
                                <p>{purchase.type === "Purchase" ? purchase.paymentMethod : purchase.serviceType}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  {purchase.type === "Purchase" ? "Sales Consultant" : "Technician"}
                                </p>
                                <p>{purchase.type === "Purchase" ? purchase.salesConsultant : purchase.technician}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Add Transaction
                      </Button>
                      <Button variant="outline" size="sm">
                        Export History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Scheduled and past appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Upcoming Appointments</h3>
                      </div>
                      <div className="divide-y">
                        {customerState.appointments
                          .filter((app) => new Date(app.date) >= new Date())
                          .map((appointment) => (
                            <div key={appointment.id} className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{appointment.type}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(appointment.date)} at {appointment.time}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    appointment.status === "Scheduled"
                                      ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                      : "bg-green-50 text-green-700 hover:bg-green-50"
                                  }
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Past Appointments</h3>
                      </div>
                      <div className="divide-y">
                        {customerState.appointments
                          .filter((app) => new Date(app.date) < new Date())
                          .map((appointment) => (
                            <div key={appointment.id} className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{appointment.type}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(appointment.date)} at {appointment.time}
                                  </p>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                  {appointment.status}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Schedule Appointment
                      </Button>
                      <Button variant="outline" size="sm">
                        View Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communications</CardTitle>
                  <CardDescription>Email and phone interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Recent Communications</h3>
                      </div>
                      <div className="divide-y">
                        {customerState.communications.map((communication) => (
                          <div key={communication.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{communication.subject}</h4>
                                <p className="text-sm text-muted-foreground">{formatDate(communication.date)}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  communication.type === "Email"
                                    ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                    : "bg-green-50 text-green-700 hover:bg-green-50"
                                }
                              >
                                {communication.type}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">{communication.summary}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Send Email
                      </Button>
                      <Button variant="outline" size="sm">
                        Log Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <EditCustomerProfileModal
        customer={customerState}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={(updatedCustomer) => {
          setCustomerState(updatedCustomer)
          // In a real app, you would save this to your backend
          console.log("Saving updated customer:", updatedCustomer)
        }}
      />
    </div>
  )
}

