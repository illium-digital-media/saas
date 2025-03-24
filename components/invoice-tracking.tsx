"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Mail } from "lucide-react"

export function InvoiceTracking() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£24,850.00</div>
            <p className="text-xs text-muted-foreground">Across 8 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">£6,200.00</div>
            <p className="text-xs text-muted-foreground">Across 3 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">£42,750.00</div>
            <p className="text-xs text-muted-foreground">Across 12 invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <div className="p-4 bg-muted/40">
          <h3 className="text-sm font-medium">Outstanding Invoices</h3>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">INV-2023-0040</h4>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Pending
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Robert Johnson • Due: May 26, 2023</p>
                <p className="text-xs text-muted-foreground mt-1">Rolex Submariner • S/N: 7839521468</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Amount</p>
                  <p className="font-bold">£450.00</p>
                </div>
                <Button size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Due in 7 days</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">INV-2023-0038</h4>
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                    Overdue
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">William Kim • Due: May 5, 2023</p>
                <p className="text-xs text-muted-foreground mt-1">Patek Philippe Nautilus • S/N: 5927384615</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Amount</p>
                  <p className="font-bold">£3,200.00</p>
                </div>
                <Button size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-red-500">Overdue by 10 days</span>
              </div>
              <Progress value={100} className="h-2 bg-muted [&>div]:bg-red-500" />
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">INV-2023-0037</h4>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Partially Paid
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Sophia Davis • Due: May 20, 2023</p>
                <p className="text-xs text-muted-foreground mt-1">Audemars Piguet Royal Oak • S/N: 3948271605</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Amount</p>
                  <p className="font-bold">£4,800.00 / £6,800.00</p>
                </div>
                <Button size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Due in 1 day</span>
                <span>70% paid</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

