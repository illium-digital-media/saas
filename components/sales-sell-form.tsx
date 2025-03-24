"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from "react"
import { CustomerSelectionModal } from "./customer-selection-modal"
import { WatchSelectionModal } from "./watch-selection-modal"
import { Plus, Trash2, CreditCard, Banknote, Building, RotateCcw, AlertCircle, Receipt } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { InvoicePreview } from "@/components/invoice-preview"
import { useAppContext } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function SalesSellForm() {
  const { updateWatch, addSale } = useAppContext()
  const router = useRouter()

  const [customer, setCustomer] = useState<any>(null)
  const [customerContact, setCustomerContact] = useState<string>("")
  const [customerEmail, setCustomerEmail] = useState<string>("")
  const [customerAddress, setCustomerAddress] = useState<string>("")
  const [watch, setWatch] = useState<any>(null)
  const [salePrice, setSalePrice] = useState<string>("")
  const [discount, setDiscount] = useState<string>("")
  const [tax, setTax] = useState<string>("20")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [paymentStatus, setPaymentStatus] = useState<string>("paid")
  const [includeWarranty, setIncludeWarranty] = useState<boolean>(true)
  const [warrantyPeriod, setWarrantyPeriod] = useState<string>("12")
  const [notes, setNotes] = useState<string>("")
  const [partialPayments, setPartialPayments] = useState<Array<{ method: string; amount: string }>>([
    { method: "", amount: "" },
  ])
  const [usePartialPayments, setUsePartialPayments] = useState<boolean>(false)
  const [invoiceItems, setInvoiceItems] = useState<
    Array<{ name: string; description?: string; quantity: number; price: number }>
  >([
    {
      name: watch ? `${watch.brand} ${watch.model}` : "Watch",
      description: watch?.reference || undefined,
      quantity: 1,
      price: Number.parseFloat(salePrice) || 0,
    },
  ])

  useEffect(() => {
    if (watch || salePrice) {
      setInvoiceItems([
        {
          name: watch ? `${watch.brand} ${watch.model}` : "Watch",
          description: watch?.reference || undefined,
          quantity: 1,
          price: Number.parseFloat(salePrice) || 0,
        },
      ])
    }
  }, [watch, salePrice])

  const addPaymentMethod = () => {
    setPartialPayments([...partialPayments, { method: "", amount: "" }])
  }

  const removePaymentMethod = (index: number) => {
    const updatedPayments = [...partialPayments]
    updatedPayments.splice(index, 1)
    setPartialPayments(updatedPayments)
  }

  const updatePaymentMethod = (index: number, field: "method" | "amount", value: string) => {
    const updatedPayments = [...partialPayments]
    updatedPayments[index][field] = value
    setPartialPayments(updatedPayments)
  }

  const calculateTotalPartialPayments = () => {
    return partialPayments.reduce((total, payment) => {
      return total + (Number.parseFloat(payment.amount) || 0)
    }, 0)
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit-card":
        return <CreditCard className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      case "bank-transfer":
        return <Building className="h-4 w-4" />
      case "finance":
        return <Receipt className="h-4 w-4" />
      case "trade-in":
        return <RotateCcw className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSelectCustomer = (selectedCustomer: any) => {
    setCustomer(selectedCustomer)
    setCustomerContact(selectedCustomer.phone)
    setCustomerEmail(selectedCustomer.email)
    // In a real app, you would also set the address
  }

  const handleSelectWatch = (selectedWatch: any) => {
    setWatch(selectedWatch)
    setSalePrice(selectedWatch.price.toString())
    // In a real app, you might set other fields based on the watch
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!customer || !watch || !salePrice) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
      return
    }

    if (!usePartialPayments && !paymentMethod) {
      toast({
        title: "Missing payment method",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      return
    }

    if (usePartialPayments) {
      const isValid = partialPayments.every((payment) => payment.method && payment.amount)
      if (!isValid) {
        toast({
          title: "Invalid payment details",
          description: "Please fill in all payment methods and amounts.",
          variant: "destructive",
        })
        return
      }

      const totalPayment = calculateTotalPartialPayments()
      const priceValue = calculateFinalPrice().total

      if (Math.abs(totalPayment - priceValue) > 0.01) {
        toast({
          title: "Payment amount mismatch",
          description: "The total payments do not match the sale amount.",
          variant: "destructive",
        })
        return
      }
    }

    try {
      console.log("Processing sale...")

      // Update the watch status
      if (watch) {
        updateWatch(watch.id, { status: "Sold" })
      }

      // Record the sale transaction
      const sale = addSale({
        type: "sell",
        customerId: customer.id,
        customerName: customer.name,
        watchId: watch.id,
        watchDetails: {
          brand: watch.brand,
          model: watch.model,
          reference: watch.reference,
        },
        amount: calculateFinalPrice().total,
        paymentMethod: usePartialPayments ? "multiple" : paymentMethod,
        paymentStatus: paymentStatus,
        notes,
      })

      toast({
        title: "Sale successful",
        description: "The sale has been recorded successfully.",
      })

      console.log("Redirecting to transaction complete page...")

      // Redirect to transaction complete page
      router.push(
        `/transaction-complete?type=sell&customerId=${customer.id}&watchId=${watch.id}&amount=${
          calculateFinalPrice().total
        }&transactionId=${sale.id}`,
      )
    } catch (error) {
      console.error("Error processing sale:", error)
      toast({
        title: "Error",
        description: "There was an error processing your sale. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate the final price
  const calculateFinalPrice = () => {
    const price = Number.parseFloat(salePrice) || 0
    const discountAmount = Number.parseFloat(discount) || 0
    const taxRate = Number.parseFloat(tax) / 100

    const priceAfterDiscount = price - discountAmount
    const taxAmount = priceAfterDiscount * taxRate

    return {
      subtotal: price,
      discount: discountAmount,
      priceAfterDiscount,
      tax: taxAmount,
      total: priceAfterDiscount + taxAmount,
    }
  }

  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const pricing = calculateFinalPrice()
  const totalPartialPayments = calculateTotalPartialPayments()
  const paymentDifference = pricing.total - totalPartialPayments
  const isPaymentBalanced = Math.abs(paymentDifference) < 0.01

  return (
    <Tabs defaultValue="sale-form" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sale-form">Sale Form</TabsTrigger>
        <TabsTrigger value="recent-sales">Recent Sales</TabsTrigger>
      </TabsList>

      <TabsContent value="sale-form" className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter details about the customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {customer ? (
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <span className="text-lg font-semibold text-primary">
                        {customer.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground">No customer selected</div>
                )}
                <CustomerSelectionModal
                  onSelectCustomer={handleSelectCustomer}
                  buttonLabel={customer ? "Change Customer" : "Select Customer"}
                />
              </div>

              {customer && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer-contact">Contact Number</Label>
                    <Input
                      id="customer-contact"
                      placeholder="Phone number"
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="Email address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="customer-address">Address</Label>
                    <Input
                      id="customer-address"
                      placeholder="Address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watch Selection</CardTitle>
              <CardDescription>Select the watch being sold</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {watch ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={watch.image || "/placeholder.svg"}
                      alt={`${watch.brand} ${watch.model}`}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        {watch.brand} {watch.model}
                      </div>
                      <div className="text-sm text-muted-foreground">Ref: {watch.reference}</div>
                      <div className="text-sm font-medium">{watch.price}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground">No watch selected</div>
                )}
                <WatchSelectionModal
                  onSelectWatch={handleSelectWatch}
                  buttonLabel={watch ? "Change Watch" : "Select Watch"}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sale Details</CardTitle>
              <CardDescription>Enter pricing and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-base font-medium">Pricing</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sale-price">Sale Price</Label>
                        <Input
                          id="sale-price"
                          placeholder="£0.00"
                          value={salePrice}
                          onChange={(e) => setSalePrice(e.target.value)}
                          required
                          className="text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discount">Discount</Label>
                        <Input
                          id="discount"
                          placeholder="£0.00"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax">Tax Rate (%)</Label>
                        <Input id="tax" placeholder="20" value={tax} onChange={(e) => setTax(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <h3 className="mb-3 text-base font-medium">Sale Summary</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(pricing.subtotal)}</span>
                      </div>
                      {pricing.discount > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Discount:</span>
                          <span className="text-red-500">-{formatCurrency(pricing.discount)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span>Price after discount:</span>
                        <span>{formatCurrency(pricing.priceAfterDiscount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Tax ({tax}%):</span>
                        <span>{formatCurrency(pricing.tax)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(pricing.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="use-partial-payments"
                      checked={usePartialPayments}
                      onCheckedChange={(checked) => setUsePartialPayments(checked as boolean)}
                    />
                    <Label htmlFor="use-partial-payments" className="font-medium">
                      Customer is using multiple payment methods
                    </Label>
                  </div>
                </div>
              </div>

              {!usePartialPayments ? (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-base font-medium">Payment Method</h3>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                        <SelectTrigger id="payment-method" className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              <span>Credit Card</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bank-transfer">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              <span>Bank Transfer</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="cash">
                            <div className="flex items-center gap-2">
                              <Banknote className="h-4 w-4" />
                              <span>Cash</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="finance">
                            <div className="flex items-center gap-2">
                              <Receipt className="h-4 w-4" />
                              <span>Finance</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="trade-in">
                            <div className="flex items-center gap-2">
                              <RotateCcw className="h-4 w-4" />
                              <span>Trade-In</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="mb-3 text-base font-medium">Payment Status</h3>
                      <RadioGroup
                        value={paymentStatus}
                        onValueChange={setPaymentStatus}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid" className="font-normal">
                            Paid in Full
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pending" id="pending" />
                          <Label htmlFor="pending" className="font-normal">
                            Payment Pending
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="deposit" id="deposit" />
                          <Label htmlFor="deposit" className="font-normal">
                            Deposit Paid
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-medium">Split Payment</h3>
                    <Badge variant={isPaymentBalanced ? "outline" : "destructive"} className="ml-auto">
                      {isPaymentBalanced
                        ? "Balanced"
                        : paymentDifference > 0
                          ? `Underpaid by ${formatCurrency(paymentDifference)}`
                          : `Overpaid by ${formatCurrency(Math.abs(paymentDifference))}`}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {partialPayments.map((payment, index) => (
                      <div key={index} className="rounded-md border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Payment {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePaymentMethod(index)}
                            disabled={partialPayments.length === 1}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`payment-method-${index}`}>Method</Label>
                            <Select
                              value={payment.method}
                              onValueChange={(value) => updatePaymentMethod(index, "method", value)}
                              required
                            >
                              <SelectTrigger id={`payment-method-${index}`}>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit-card">
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Credit Card</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="bank-transfer">
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    <span>Bank Transfer</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="cash">
                                  <div className="flex items-center gap-2">
                                    <Banknote className="h-4 w-4" />
                                    <span>Cash</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="finance">
                                  <div className="flex items-center gap-2">
                                    <Receipt className="h-4 w-4" />
                                    <span>Finance</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="trade-in">
                                  <div className="flex items-center gap-2">
                                    <RotateCcw className="h-4 w-4" />
                                    <span>Trade-In</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`payment-amount-${index}`}>Amount</Label>
                            <Input
                              id={`payment-amount-${index}`}
                              placeholder="£0.00"
                              value={payment.amount}
                              onChange={(e) => updatePaymentMethod(index, "amount", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" size="sm" onClick={addPaymentMethod} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Another Payment Method
                    </Button>

                    <div className="mt-4 rounded-md bg-muted p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Sale Amount:</span>
                        <span className="font-medium">{formatCurrency(pricing.total)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Payments:</span>
                        <span className="font-medium">{formatCurrency(totalPartialPayments)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between font-medium">
                        <span>Balance:</span>
                        <span className={paymentDifference !== 0 ? "text-destructive" : ""}>
                          {formatCurrency(paymentDifference)}
                        </span>
                      </div>

                      {!isPaymentBalanced && (
                        <div className="mt-2 flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>
                            {paymentDifference > 0
                              ? "The total payments are less than the sale amount."
                              : "The total payments exceed the sale amount."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-base font-medium">Warranty Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-warranty"
                      checked={includeWarranty}
                      onCheckedChange={(checked) => setIncludeWarranty(checked as boolean)}
                    />
                    <Label htmlFor="include-warranty" className="font-medium">
                      Include Warranty
                    </Label>
                  </div>
                  {includeWarranty && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="warranty-period">Warranty Period</Label>
                      <Select value={warrantyPeriod} onValueChange={setWarrantyPeriod}>
                        <SelectTrigger id="warranty-period" className="w-full max-w-xs">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="36">36 months</SelectItem>
                          <SelectItem value="60">60 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the sale..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <InvoicePreview
                invoiceType="sale"
                customerName={customer?.name}
                items={invoiceItems}
                additionalInfo={{
                  Reference: watch?.reference || "N/A",
                  Condition: watch?.condition || "N/A",
                  Year: watch?.year || "N/A",
                  "Box & Papers": watch?.boxPapers || "N/A",
                  "Serial Number": watch?.serialNumber || "N/A",
                }}
                notes={notes}
              />
              <Button type="submit">Complete Sale</Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="recent-sales">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>View your recent watch sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left font-medium">Date</th>
                    <th className="p-2 text-left font-medium">Customer</th>
                    <th className="p-2 text-left font-medium">Watch</th>
                    <th className="p-2 text-left font-medium">Price</th>
                    <th className="p-2 text-left font-medium">Payment</th>
                    <th className="p-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">May 18, 2023</td>
                    <td className="p-2">James Wilson</td>
                    <td className="p-2">Rolex Submariner</td>
                    <td className="p-2">£12,500.00</td>
                    <td className="p-2">Credit Card</td>
                    <td className="p-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">May 12, 2023</td>
                    <td className="p-2">Sarah Johnson</td>
                    <td className="p-2">Cartier Santos</td>
                    <td className="p-2">£7,200.00</td>
                    <td className="p-2">Bank Transfer</td>
                    <td className="p-2">
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">May 5, 2023</td>
                    <td className="p-2">Michael Chen</td>
                    <td className="p-2">Omega Speedmaster</td>
                    <td className="p-2">£5,800.00</td>
                    <td className="p-2">Finance</td>
                    <td className="p-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

