"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function CustomerHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Jane Smith</h3>
            <p className="text-sm text-muted-foreground">VIP Customer</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View Full Profile
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4 bg-muted/40">
          <h3 className="text-sm font-medium">Recent Transactions</h3>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Patek Philippe Nautilus</h4>
                <p className="text-sm text-muted-foreground">Ref: 5711/1A-010</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                Purchase
              </Badge>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p>May 15, 2023</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p>£85,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p>Bank Transfer</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sales Consultant</p>
                <p>Emma Thompson</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Cartier Santos</h4>
                <p className="text-sm text-muted-foreground">Ref: WSSA0018</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                Purchase
              </Badge>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p>February 3, 2023</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p>£6,800</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p>Credit Card</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sales Consultant</p>
                <p>James Wilson</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Rolex Datejust 41</h4>
                <p className="text-sm text-muted-foreground">Ref: 126334</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                Service
              </Badge>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p>November 12, 2022</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p>£450</p>
              </div>
              <div>
                <p className="text-muted-foreground">Service Type</p>
                <p>Full Service</p>
              </div>
              <div>
                <p className="text-muted-foreground">Technician</p>
                <p>Michael Brown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

