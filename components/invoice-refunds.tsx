"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RefreshCcw } from "lucide-react"
import { useState } from "react"

export function InvoiceRefunds() {
  const [customer, setCustomer] = useState<string>("")
  const [originalInvoice, setOriginalInvoice] = useState<string>("")
  const [refundDate, setRefundDate] = useState<string>("")
  const [refundAmount, setRefundAmount] = useState<string>("")
  const [refundMethod, setRefundMethod] = useState<string>("")
  const [refundReason, setRefundReason] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    console.log({ customer, originalInvoice, refundDate, refundAmount, refundMethod, refundReason, notes })
    alert("Refund processed successfully!")
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="refund-customer">Customer</Label>
            <Select value={customer} onValueChange={setCustomer} required>
              <SelectTrigger id="refund-customer">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="original-invoice">Original Invoice</Label>
            <Select value={originalInvoice} onValueChange={setOriginalInvoice} required>
              <SelectTrigger id="original-invoice">
                <SelectValue placeholder="Select invoice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inv-2023-0041">INV-2023-0041</SelectItem>
                <SelectItem value="inv-2023-0039">INV-2023-0039</SelectItem>
                <SelectItem value="inv-2023-0035">INV-2023-0035</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund-date">Refund Date</Label>
            <Input
              id="refund-date"
              type="date"
              value={refundDate}
              onChange={(e) => setRefundDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund-amount">Refund Amount</Label>
            <Input
              id="refund-amount"
              placeholder="£0.00"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund-method">Refund Method</Label>
            <Select value={refundMethod} onValueChange={setRefundMethod} required>
              <SelectTrigger id="refund-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="store-credit">Store Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund-reason">Reason for Refund</Label>
            <Select value={refundReason} onValueChange={setRefundReason} required>
              <SelectTrigger id="refund-reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defective">Defective Product</SelectItem>
                <SelectItem value="wrong-item">Wrong Item</SelectItem>
                <SelectItem value="not-as-described">Not as Described</SelectItem>
                <SelectItem value="customer-dissatisfied">Customer Dissatisfied</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="refund-notes">Notes</Label>
            <Textarea
              id="refund-notes"
              placeholder="Enter any additional details about the refund..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Process Refund
          </Button>
        </div>
      </form>

      <div className="mt-8 rounded-md border">
        <div className="p-4 bg-muted/40">
          <h3 className="text-sm font-medium">Recent Refunds</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left font-medium">Refund #</th>
              <th className="p-2 text-left font-medium">Customer</th>
              <th className="p-2 text-left font-medium">Original Invoice</th>
              <th className="p-2 text-left font-medium">Item</th>
              <th className="p-2 text-left font-medium">Serial Number</th>
              <th className="p-2 text-left font-medium">Date</th>
              <th className="p-2 text-left font-medium">Amount</th>
              <th className="p-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">REF-2023-0012</td>
              <td className="p-2">Michael Johnson</td>
              <td className="p-2">INV-2023-0032</td>
              <td className="p-2">Rolex Datejust</td>
              <td className="p-2">9283746501</td>
              <td className="p-2">May 8, 2023</td>
              <td className="p-2">£1,250.00</td>
              <td className="p-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Completed
                </Badge>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">REF-2023-0011</td>
              <td className="p-2">Emma Wilson</td>
              <td className="p-2">INV-2023-0028</td>
              <td className="p-2">Omega Seamaster</td>
              <td className="p-2">6574839201</td>
              <td className="p-2">May 3, 2023</td>
              <td className="p-2">£3,500.00</td>
              <td className="p-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                  Processing
                </Badge>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">REF-2023-0010</td>
              <td className="p-2">David Chen</td>
              <td className="p-2">INV-2023-0025</td>
              <td className="p-2">Tudor Black Bay</td>
              <td className="p-2">1029384756</td>
              <td className="p-2">April 28, 2023</td>
              <td className="p-2">£750.00</td>
              <td className="p-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Completed
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

