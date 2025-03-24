"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Mail, Phone, Globe, MapPin, ArrowUpRight } from "lucide-react"
import { cn, getAvatarColor } from "@/lib/utils"

// Mock data for preferred suppliers
const preferredSuppliers = [
  {
    id: "sup-1",
    name: "Swiss Watch Distributors",
    contactName: "John Smith",
    email: "john@swisswatchdistributors.com",
    phone: "+44 7123 456789",
    website: "www.swisswatchdistributors.com",
    address: "15 Bahnhofstrasse, Zurich",
    country: "Switzerland",
    specialties: ["Rolex", "Omega", "Patek Philippe"],
    rating: 5,
    totalOrders: 87,
    lastOrderDate: new Date(2023, 10, 15),
    notes: "Premium supplier with excellent service and authentic products",
    discounts: "10% on orders over £50,000",
    leadTime: "2-3 weeks",
  },
  {
    id: "sup-2",
    name: "Luxury Timepieces Ltd",
    contactName: "Emma Johnson",
    email: "emma@luxurytimepieces.co.uk",
    phone: "+44 7234 567890",
    website: "www.luxurytimepieces.co.uk",
    address: "42 Bond Street, London",
    country: "United Kingdom",
    specialties: ["Cartier", "TAG Heuer", "Breitling"],
    rating: 4,
    totalOrders: 63,
    lastOrderDate: new Date(2023, 11, 5),
    notes: "Reliable UK supplier with good pricing and fast shipping",
    discounts: "Free shipping on all orders",
    leadTime: "1-2 weeks",
  },
  {
    id: "sup-3",
    name: "Heritage Watch Traders",
    contactName: "Michael Brown",
    email: "michael@heritagewatch.com",
    phone: "+44 7345 678901",
    website: "www.heritagewatch.com",
    address: "8 Watchmaker Lane, Geneva",
    country: "Switzerland",
    specialties: ["Audemars Piguet", "IWC", "Jaeger-LeCoultre"],
    rating: 5,
    totalOrders: 42,
    lastOrderDate: new Date(2023, 9, 28),
    notes: "Specializes in rare and vintage pieces with excellent authentication",
    discounts: "5% on repeat orders",
    leadTime: "3-4 weeks for rare pieces",
  },
  {
    id: "sup-4",
    name: "Precision Watch Supply",
    contactName: "Sarah Davis",
    email: "sarah@precisionwatch.com",
    phone: "+44 7456 789012",
    website: "www.precisionwatch.com",
    address: "23 Uhrmacherstrasse, Bern",
    country: "Switzerland",
    specialties: ["Tudor", "Longines", "Oris"],
    rating: 4,
    totalOrders: 51,
    lastOrderDate: new Date(2023, 11, 12),
    notes: "Great mid-range supplier with consistent quality",
    discounts: "Bulk order discounts available",
    leadTime: "1-2 weeks",
  },
  {
    id: "sup-5",
    name: "Elite Horology Suppliers",
    contactName: "David Wilson",
    email: "david@elitehorology.com",
    phone: "+44 7567 890123",
    website: "www.elitehorology.com",
    address: "17 Luxury Avenue, Paris",
    country: "France",
    specialties: ["Richard Mille", "Hublot", "Franck Muller"],
    rating: 5,
    totalOrders: 29,
    lastOrderDate: new Date(2023, 10, 30),
    notes: "High-end supplier specializing in ultra-luxury brands",
    discounts: "Priority access to limited editions",
    leadTime: "4-6 weeks for custom orders",
  },
]

export function PreferredSuppliers() {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300")}
            />
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferred Suppliers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {preferredSuppliers.map((supplier) => (
            <div key={supplier.id} className="rounded-lg border p-4 transition-all hover:bg-accent/50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Avatar className={cn("h-16 w-16", getAvatarColor(supplier.name))}>
                  <AvatarFallback className="text-lg">
                    {supplier.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                          Preferred
                        </Badge>
                      </div>
                      <div className="mt-1">{renderRating(supplier.rating)}</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Place Order
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <h4 className="text-sm font-medium">Contact Information</h4>
                      <div className="mt-1 space-y-1 text-sm">
                        <p className="font-medium">{supplier.contactName}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Globe className="h-3.5 w-3.5" />
                          <span>{supplier.website}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>
                            {supplier.address}, {supplier.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">Specialties</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {supplier.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="font-normal">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Lead Time:</span> {supplier.leadTime}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">Order Information</h4>
                      <div className="mt-1 space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Total Orders:</span> {supplier.totalOrders}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Last Order:</span>{" "}
                          {formatDate(supplier.lastOrderDate)}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Special Terms:</span> {supplier.discounts}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Notes</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{supplier.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

