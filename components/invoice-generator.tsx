"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Trash2, Calculator, CreditCard, CalendarIcon, Percent, User, Scissors } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoicePreview } from "./invoice-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppContext } from "@/lib/context/app-context"

export function InvoiceGenerator() {
  const { customers, watches } = useAppContext()

  // Basic invoice data
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
  )
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0],
  )
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [notes, setNotes] = useState("")

  // Line items
  const [lineItems, setLineItems] = useState([{ id: "1", description: "", quantity: 1, unitPrice: 0 }])

  // VAT and discount
  const [vatRate, setVatRate] = useState(20)
  const [discountType, setDiscountType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState(0)

  // Add a line item
  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: (lineItems.length + 1).toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ])
  }

  // Remove a line item
  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  // Update a line item
  const updateLineItem = (id: string, field: string, value: string | number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: field === "description" ? value : Number(value) } : item,
      ),
    )
  }

  // Calculate subtotal
  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  // Calculate discount
  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    if (discountType === "percentage") {
      return (subtotal * Number(discountValue)) / 100
    } else {
      return Number(discountValue)
    }
  }

  // Calculate subtotal after discount
  const calculateDiscountedSubtotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  // Calculate VAT
  const calculateVAT = () => {
    return (calculateDiscountedSubtotal() * Number(vatRate)) / 100
  }

  // Calculate total
  const calculateTotal = () => {
    return calculateDiscountedSubtotal() + calculateVAT()
  }

  // Preview invoice data
  const invoiceData = {
    invoiceNumber,
    issueDate,
    dueDate,
    customer: customers.find((c) => c.id === selectedCustomer) || null,
    lineItems,
    subtotal: calculateSubtotal(),
    discount: calculateDiscount(),
    discountType,
    discountValue: Number(discountValue),
    vatRate: Number(vatRate),
    vat: calculateVAT(),
    total: calculateTotal(),
    paymentMethod,
    notes,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    console.log({
      customer: selectedCustomer,
      invoiceDate: issueDate,
      dueDate,
      invoiceNumber,
      paymentTerms: paymentMethod,
      vatRate,
      discountType,
      discountValue,
      lineItems,
      notes,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      discountedSubtotal: calculateDiscountedSubtotal(),
      vat: calculateVAT(),
      total: calculateTotal(),
    })
    alert("Invoice generated successfully!")
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
            <CardDescription>Enter the basic information for this invoice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input id="invoice-number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issue-date">Issue Date</Label>
              <div className="flex">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                <Input id="issue-date" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <div className="flex">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
            <CardDescription>Select the customer for this invoice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Line Items
            </CardTitle>
            <CardDescription>Add the products or services for this invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-1 text-left">Description</th>
                    <th className="py-2 px-1 text-right w-24">Quantity</th>
                    <th className="py-2 px-1 text-right w-40">Unit Price (£)</th>
                    <th className="py-2 px-1 text-right w-40">Amount (£)</th>
                    <th className="py-2 px-1 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="py-2 px-1">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                        />
                      </td>
                      <td className="py-2 px-1">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, "quantity", e.target.value)}
                          className="text-right"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, "unitPrice", e.target.value)}
                          className="text-right"
                        />
                      </td>
                      <td className="py-2 px-1 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
                      <td className="py-2 px-1 text-center">
                        {lineItems.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" size="sm" onClick={addLineItem} className="mt-4">
              <Plus className="mr-1 h-4 w-4" /> Add Item
            </Button>
          </CardContent>
        </Card>

        {/* VAT and Discount */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Taxes & Discounts
            </CardTitle>
            <CardDescription>Configure VAT rate and discounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="vat-rate">VAT Rate (%)</Label>
              <Input
                id="vat-rate"
                type="number"
                min="0"
                max="100"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Discount</Label>
              <div className="flex gap-4 items-center">
                <RadioGroup value={discountType} onValueChange={setDiscountType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage (%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed Amount (£)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="h-4 w-4 opacity-50" />
                <Input
                  type="number"
                  min="0"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  placeholder={discountType === "percentage" ? "Discount %" : "Discount Amount"}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Invoice Summary
            </CardTitle>
            <CardDescription>Review the invoice totals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>£{calculateSubtotal().toFixed(2)}</span>
              </div>

              {discountValue > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Discount {discountType === "percentage" ? `(${discountValue}%)` : ""}:
                    </span>
                    <span className="text-red-500">-£{calculateDiscount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal after discount:</span>
                    <span>£{calculateDiscountedSubtotal().toFixed(2)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT ({vatRate}%):</span>
                <span>£{calculateVAT().toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total:</span>
                <span>£{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Add any additional information for this invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter notes or terms and conditions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>
            <Button>Generate Invoice</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Preview Tab */}
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Edit Form</TabsTrigger>
          <TabsTrigger value="preview">Preview Invoice</TabsTrigger>
        </TabsList>
        <TabsContent value="form">{/* Form is already displayed above */}</TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              <InvoicePreview invoice={invoiceData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

