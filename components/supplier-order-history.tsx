"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, FileText, Download } from "lucide-react"

interface Order {
  id: string
  date: Date
  orderNumber: string
  amount: number
  status: "pending" | "completed" | "cancelled" | "processing"
  items: number
  paymentStatus: "paid" | "unpaid" | "partial"
}

// Generate mock order data
const generateMockOrders = (supplierId: string): Order[] => {
  return Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `order-${supplierId}-${i + 1}`,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
      orderNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: Math.floor(500 + Math.random() * 10000),
      status: ["pending", "completed", "processing", "cancelled"][Math.floor(Math.random() * 4)] as any,
      items: Math.floor(1 + Math.random() * 20),
      paymentStatus: ["paid", "unpaid", "partial"][Math.floor(Math.random() * 3)] as any,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

interface SupplierOrderHistoryProps {
  supplierId?: string
}

export function SupplierOrderHistory({ supplierId = "default" }: SupplierOrderHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Generate mock orders for this supplier
  const allOrders = generateMockOrders(supplierId)

  // Filter and sort orders
  const filteredOrders = allOrders
    .filter((order) => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
      return matchesSearch && matchesStatus && matchesPayment
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.date.getTime() - a.date.getTime()
      } else if (sortOrder === "oldest") {
        return a.date.getTime() - b.date.getTime()
      } else if (sortOrder === "highest") {
        return b.amount - a.amount
      } else {
        return a.amount - b.amount
      }
    })

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by order #..."
              className="w-full pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{formatCurrency(order.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.status === "completed"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : order.status === "processing"
                              ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                              : order.status === "pending"
                                ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                                : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.paymentStatus === "paid"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : order.paymentStatus === "partial"
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                              : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                        }
                      >
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View order</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No orders found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

