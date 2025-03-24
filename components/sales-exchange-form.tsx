"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { CustomerSelectionModal } from "./customer-selection-modal"
import { WatchSelectionModal } from "./watch-selection-modal"
import { InvoicePreview } from "@/components/invoice-preview"
import { useAppContext } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function SalesExchangeForm() {
  const { addWatch, updateWatch, addSale } = useAppContext()
  const router = useRouter()

  const [customer, setCustomer] = useState<any>(null)
  const [customerContact, setCustomerContact] = useState<string>("")
  const [tradeInWatch, setTradeInWatch] = useState<any>(null)
  const [tradeInBrand, setTradeInBrand] = useState<string>("")
  const [tradeInModel, setTradeInModel] = useState<string>("")
  const [tradeInReference, setTradeInReference] = useState<string>("")
  const [tradeInSerial, setTradeInSerial] = useState<string>("")
  const [tradeInCondition, setTradeInCondition] = useState<string>("")
  const [tradeInValue, setTradeInValue] = useState<string>("")
  const [hasBoxPapers, setHasBoxPapers] = useState<boolean>(false)
  const [newWatch, setNewWatch] = useState<any>(null)
  const [newWatchPrice, setNewWatchPrice] = useState<string>("")
  const [balanceDue, setBalanceDue] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const [invoiceItems, setInvoiceItems] = useState<
    Array<{ name: string; description?: string; quantity: number; price: number }>
  >([
    {
      name: newWatch ? `${newWatch.brand} ${newWatch.model}` : "Our Watch",
      description: newWatch?.reference || undefined,
      quantity: 1,
      price: Number.parseFloat(newWatchPrice) || 0,
    },
    {
      name: tradeInBrand ? `${tradeInBrand} ${tradeInModel}` : "Customer's Watch",
      description: tradeInReference || undefined,
      quantity: 1,
      price: -Number.parseFloat(tradeInValue) || 0,
    },
  ])

  const handleSelectCustomer = (selectedCustomer: any) => {
    setCustomer(selectedCustomer)
    setCustomerContact(selectedCustomer.phone)
  }

  const handleSelectNewWatch = (selectedWatch: any) => {
    setNewWatch(selectedWatch)
    setNewWatchPrice(selectedWatch.price.toString())
    updateBalanceDue(selectedWatch.price.toString(), tradeInValue)
  }

  // Calculate balance due when trade-in value or new watch price changes
  const calculateBalanceDue = (newPrice: string, tradeValue: string) => {
    const tradeInAmount = Number.parseFloat(tradeValue) || 0
    const newAmount = Number.parseFloat(newPrice) || 0
    return Math.max(0, newAmount - tradeInAmount)
  }

  // Update balance due when relevant values change
  const updateBalanceDue = (newPrice?: string, tradeValue?: string) => {
    const newPriceToUse = newPrice !== undefined ? newPrice : newWatchPrice
    const tradeValueToUse = tradeValue !== undefined ? tradeValue : tradeInValue
    setBalanceDue(calculateBalanceDue(newPriceToUse, tradeValueToUse).toString())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Exchange form submitted")

    // Validate required fields
    if (
      !customer ||
      !newWatch ||
      !tradeInBrand ||
      !tradeInModel ||
      !tradeInReference ||
      !tradeInSerial ||
      !tradeInCondition ||
      !tradeInValue ||
      !newWatchPrice
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(balanceDue) > 0 && !paymentMethod) {
      toast({
        title: "Missing payment method",
        description: "Please select a payment method for the balance due.",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Processing exchange...")

      // Add the trade-in watch to inventory
      const tradeInWatchData = addWatch({
        brand: tradeInBrand,
        model: tradeInModel,
        reference: tradeInReference,
        serialNumber: tradeInSerial,
        condition: tradeInCondition,
        price: Number.parseFloat(tradeInValue) || 0,
        status: "In Stock",
        boxPapers: hasBoxPapers,
        warranty: false,
        serviceHistory: false,
        year: "",
        image: "/placeholder.svg?height=200&width=200",
      })

      // Update the new watch status
      updateWatch(newWatch.id, { status: "Sold" })

      // Record the exchange transaction
      const sale = addSale({
        type: "exchange",
        customerId: customer.id,
        customerName: customer.name,
        watchId: newWatch.id,
        watchDetails: {
          brand: newWatch.brand,
          model: newWatch.model,
          reference: newWatch.reference,
          serialNumber: newWatch.serialNumber,
        },
        amount: Number.parseFloat(balanceDue) || 0,
        paymentMethod: paymentMethod,
        paymentStatus: "completed",
        notes: `Exchange: Customer traded in ${tradeInBrand} ${tradeInModel} (${tradeInReference}) valued at ${tradeInValue} for ${newWatch.brand} ${newWatch.model} (${newWatch.reference}). ${notes}`,
      })

      toast({
        title: "Exchange successful",
        description: "The exchange has been processed successfully.",
      })

      console.log("Redirecting to transaction complete page...")

      // Redirect to transaction complete page with explicit window.location
      window.location.href = `/transaction-complete?type=exchange&customerId=${customer.id}&watchId=${newWatch.id}&amount=${
        Number.parseFloat(balanceDue) || 0
      }&transactionId=${sale.id}`
    } catch (error) {
      console.error("Error processing exchange:", error)
      toast({
        title: "Error",
        description: "There was an error processing your exchange. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    setInvoiceItems([
      {
        name: newWatch ? `${newWatch.brand} ${newWatch.model}` : "Our Watch",
        description: newWatch?.reference || undefined,
        quantity: 1,
        price: Number.parseFloat(newWatchPrice) || 0,
      },
      {
        name: tradeInBrand ? `${tradeInBrand} ${tradeInModel}` : "Customer's Watch",
        description: tradeInReference || undefined,
        quantity: 1,
        price: -Number.parseFloat(tradeInValue) || 0,
      },
    ])
  }, [newWatch, newWatchPrice, tradeInBrand, tradeInModel, tradeInReference, tradeInValue])

  return (
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
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade-In Watch Details</CardTitle>
          <CardDescription>Enter information about the watch being traded in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="trade-in-brand">Brand</Label>
              <Select value={tradeInBrand} onValueChange={setTradeInBrand} required>
                <SelectTrigger id="trade-in-brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rolex">Rolex</SelectItem>
                  <SelectItem value="omega">Omega</SelectItem>
                  <SelectItem value="patek">Patek Philippe</SelectItem>
                  <SelectItem value="audemars">Audemars Piguet</SelectItem>
                  <SelectItem value="cartier">Cartier</SelectItem>
                  <SelectItem value="iwc">IWC</SelectItem>
                  <SelectItem value="tudor">Tudor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in-model">Model</Label>
              <Input
                id="trade-in-model"
                placeholder="e.g. Submariner, Speedmaster"
                value={tradeInModel}
                onChange={(e) => setTradeInModel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in-reference">Reference Number</Label>
              <Input
                id="trade-in-reference"
                placeholder="e.g. 126610LN"
                value={tradeInReference}
                onChange={(e) => setTradeInReference(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in-serial">Serial Number</Label>
              <Input
                id="trade-in-serial"
                placeholder="Watch serial number"
                value={tradeInSerial}
                onChange={(e) => setTradeInSerial(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in-condition">Condition</Label>
              <Select value={tradeInCondition} onValueChange={setTradeInCondition} required>
                <SelectTrigger id="trade-in-condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New/Unworn</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in-value">Trade-In Value</Label>
              <Input
                id="trade-in-value"
                placeholder="£0.00"
                value={tradeInValue}
                onChange={(e) => {
                  setTradeInValue(e.target.value)
                  updateBalanceDue(undefined, e.target.value)
                }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="box-papers"
                checked={hasBoxPapers}
                onCheckedChange={(checked) => setHasBoxPapers(checked as boolean)}
              />
              <Label htmlFor="box-papers" className="font-normal">
                Includes Original Box & Papers
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Watch Selection</CardTitle>
          <CardDescription>Select the watch the customer is purchasing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            {newWatch ? (
              <div className="flex items-center gap-4">
                <img
                  src={newWatch.image || "/placeholder.svg"}
                  alt={`${newWatch.brand} ${newWatch.model}`}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <div className="font-medium">
                    {newWatch.brand} {newWatch.model}
                  </div>
                  <div className="text-sm text-muted-foreground">Ref: {newWatch.reference}</div>
                  <div className="text-sm font-medium">{newWatch.price}</div>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">No watch selected</div>
            )}
            <WatchSelectionModal
              onSelectWatch={handleSelectNewWatch}
              buttonLabel={newWatch ? "Change Watch" : "Select Watch"}
            />
          </div>

          {newWatch && (
            <div className="space-y-2">
              <Label htmlFor="new-watch-price">New Watch Price</Label>
              <Input
                id="new-watch-price"
                placeholder="£0.00"
                value={newWatchPrice}
                onChange={(e) => {
                  setNewWatchPrice(e.target.value)
                  updateBalanceDue(e.target.value, undefined)
                }}
                required
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exchange Summary</CardTitle>
          <CardDescription>Review and complete the exchange</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>New Watch Price:</span>
                <span>
                  £
                  {Number.parseFloat(newWatchPrice || "0").toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Trade-In Value:</span>
                <span>
                  -£
                  {Number.parseFloat(tradeInValue || "0").toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Balance Due:</span>
                <span>
                  £
                  {Number.parseFloat(balanceDue || "0").toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method for Balance</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the exchange..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <InvoicePreview
          invoiceType="exchange"
          customerName={customer?.name}
          items={invoiceItems}
          additionalInfo={{
            "Balance Due": `£${(Number.parseFloat(newWatchPrice) - Number.parseFloat(tradeInValue)).toFixed(2)}`,
            "Our Watch Condition": newWatch?.condition || "N/A",
            "Customer Watch Condition": tradeInCondition || "N/A",
          }}
          notes={notes}
        />
        <Button type="submit">Complete Exchange</Button>
      </div>
    </form>
  )
}

