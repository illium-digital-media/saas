"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { SupplierSelectionModal } from "./supplier-selection-modal"
import { Plus, Trash2, CreditCard, Banknote, Building, CheckSquare, RotateCcw, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { InvoicePreview } from "@/components/invoice-preview"
import { useAppContext, type Supplier } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function SalesBuyForm() {
  const { addWatch, addSale, suppliers } = useAppContext()
  const router = useRouter()

  const [supplierType, setSupplierType] = useState<string>("business")
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [sellerContact, setSellerContact] = useState<string>("")
  const [sellerEmail, setSellerEmail] = useState<string>("")
  const [sellerAddress, setSellerAddress] = useState<string>("")
  const [brand, setBrand] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [reference, setReference] = useState<string>("")
  const [serialNumber, setSerialNumber] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [condition, setCondition] = useState<string>("")
  const [boxPapers, setBoxPapers] = useState<boolean>(false)
  const [serviceHistory, setServiceHistory] = useState<boolean>(false)
  const [warranty, setWarranty] = useState<boolean>(false)
  const [purchasePrice, setPurchasePrice] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [images, setImages] = useState<FileList | null>(null)
  const [partialPayments, setPartialPayments] = useState<Array<{ method: string; amount: string }>>([
    { method: "", amount: "" },
  ])
  const [usePartialPayments, setUsePartialPayments] = useState<boolean>(false)
  const [invoiceItems, setInvoiceItems] = useState<
    Array<{ name: string; description?: string; quantity: number; price: number }>
  >([
    {
      name: brand ? `${brand} ${model}` : "Watch",
      description: reference || undefined,
      quantity: 1,
      price: Number.parseFloat(purchasePrice) || 0,
    },
  ])

  const [watchDetails, setWatchDetails] = useState({
    brand: "",
    model: "",
    reference: "",
    purchasePrice: "",
  })

  useEffect(() => {
    setWatchDetails({
      brand: brand,
      model: model,
      reference: reference,
      purchasePrice: purchasePrice,
    })
  }, [brand, model, reference, purchasePrice])

  useEffect(() => {
    if (watchDetails.brand || watchDetails.model || watchDetails.purchasePrice) {
      setInvoiceItems([
        {
          name: watchDetails.brand && watchDetails.model ? `${watchDetails.brand} ${watchDetails.model}` : "Watch",
          description: watchDetails.reference || undefined,
          quantity: 1,
          price: Number.parseFloat(watchDetails.purchasePrice) || 0,
        },
      ])
    }
  }, [watchDetails.brand, watchDetails.model, watchDetails.reference, watchDetails.purchasePrice])

  const handleSelectSupplier = (selectedSupplier: Supplier) => {
    setSupplier(selectedSupplier)
    setSellerContact(selectedSupplier.phone)
    setSellerEmail(selectedSupplier.email)
    setSellerAddress(selectedSupplier.address || "")
  }

  const resetSupplier = () => {
    setSupplier(null)
    setSellerContact("")
    setSellerEmail("")
    setSellerAddress("")
  }

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
      case "check":
        return <CheckSquare className="h-4 w-4" />
      case "trade-in":
        return <RotateCcw className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === "string" ? Number.parseFloat(amount) || 0 : amount
    return `£${numAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")

    // Validate required fields
    if (!brand || !model || !reference || !serialNumber || !condition || !purchasePrice) {
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
      const priceValue = Number.parseFloat(purchasePrice) || 0

      if (Math.abs(totalPayment - priceValue) > 0.01) {
        toast({
          title: "Payment amount mismatch",
          description: "The total payment amount does not match the purchase price.",
          variant: "destructive",
        })
        return
      }
    }

    try {
      console.log("Processing purchase...")

      // Add the watch to inventory
      const newWatch = addWatch({
        brand,
        model,
        reference,
        serialNumber,
        condition,
        price: Number.parseFloat(purchasePrice) || 0,
        status: "In Stock",
        boxPapers,
        warranty,
        serviceHistory,
        year,
        image: "/placeholder.svg?height=200&width=200",
      })

      // Record the purchase transaction
      const sale = addSale({
        type: "buy",
        customerId: supplier?.id || "unknown",
        customerName: supplier?.name || "Unknown Supplier",
        watchId: newWatch.id,
        watchDetails: {
          brand,
          model,
          reference,
        },
        amount: Number.parseFloat(purchasePrice) || 0,
        paymentMethod: usePartialPayments ? "multiple" : paymentMethod,
        paymentStatus: "completed",
        notes,
      })

      toast({
        title: "Purchase successful",
        description: "The watch has been added to your inventory.",
      })

      console.log("Redirecting to transaction complete page...")

      // Redirect to transaction complete page with explicit window.location
      window.location.href = `/transaction-complete?type=buy&customerId=${supplier?.id || "unknown"}&watchId=${newWatch.id}&amount=${
        Number.parseFloat(purchasePrice) || 0
      }&transactionId=${sale.id}`
    } catch (error) {
      console.error("Error processing purchase:", error)
      toast({
        title: "Error",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      })
    }
  }

  const purchasePriceValue = Number.parseFloat(purchasePrice) || 0
  const totalPartialPayments = calculateTotalPartialPayments()
  const paymentDifference = purchasePriceValue - totalPartialPayments
  const isPaymentBalanced = Math.abs(paymentDifference) < 0.01
  const selectedSupplier = supplier

  return (
    <Tabs defaultValue="purchase-form" className="space-y-4">
      <TabsList>
        <TabsTrigger value="purchase-form">Purchase Form</TabsTrigger>
        <TabsTrigger value="recent-purchases">Recent Purchases</TabsTrigger>
      </TabsList>

      <TabsContent value="purchase-form" className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>Enter details about the supplier you're buying from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier-type">Supplier Type</Label>
                <Select value={supplierType} onValueChange={setSupplierType} required>
                  <SelectTrigger id="supplier-type">
                    <SelectValue placeholder="Select supplier type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="dealer">Dealer</SelectItem>
                    <SelectItem value="auction">Auction House</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                {supplier ? (
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <span className="text-lg font-semibold text-primary">
                        {supplier.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground">No supplier selected</div>
                )}
                <div className="flex gap-2">
                  <SupplierSelectionModal
                    onSelectSupplier={handleSelectSupplier}
                    buttonLabel={supplier ? "Change Supplier" : "Select Supplier"}
                  />
                  {supplier && (
                    <Button variant="outline" onClick={resetSupplier} type="button">
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {!supplier && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="seller-contact">Contact Number</Label>
                    <Input
                      id="seller-contact"
                      placeholder="Phone number"
                      value={sellerContact}
                      onChange={(e) => setSellerContact(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seller-email">Email</Label>
                    <Input
                      id="seller-email"
                      type="email"
                      placeholder="Email address"
                      value={sellerEmail}
                      onChange={(e) => setSellerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seller-address">Address</Label>
                    <Input
                      id="seller-address"
                      placeholder="Address"
                      value={sellerAddress}
                      onChange={(e) => setSellerAddress(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watch Details</CardTitle>
              <CardDescription>Enter information about the watch you're purchasing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={brand} onValueChange={setBrand} required>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audemars">Audemars Piguet</SelectItem>
                      <SelectItem value="breitling">Breitling</SelectItem>
                      <SelectItem value="cartier">Cartier</SelectItem>
                      <SelectItem value="chanel">Chanel</SelectItem>
                      <SelectItem value="chopard">Chopard</SelectItem>
                      <SelectItem value="franck-muller">Franck Muller</SelectItem>
                      <SelectItem value="iwc">IWC</SelectItem>
                      <SelectItem value="omega">Omega</SelectItem>
                      <SelectItem value="panerai">Panerai</SelectItem>
                      <SelectItem value="patek">Patek Philippe</SelectItem>
                      <SelectItem value="piaget">Piaget</SelectItem>
                      <SelectItem value="richard-mille">Richard Mille</SelectItem>
                      <SelectItem value="rolex">Rolex</SelectItem>
                      <SelectItem value="tag-heuer">TAG Heuer</SelectItem>
                      <SelectItem value="tudor">Tudor</SelectItem>
                      <SelectItem value="ulysse-nardin">Ulysse Nardin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g. Submariner, Speedmaster"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input
                    id="reference"
                    placeholder="e.g. 126610LN"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serial-number">Serial Number</Label>
                  <Input
                    id="serial-number"
                    placeholder="Watch serial number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="Year of manufacture"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={condition} onValueChange={setCondition} required>
                    <SelectTrigger id="condition">
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
              </div>

              <div className="space-y-2">
                <Label>Accessories</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="box-papers"
                      checked={boxPapers}
                      onCheckedChange={(checked) => setBoxPapers(checked as boolean)}
                    />
                    <Label htmlFor="box-papers" className="font-normal">
                      Original Box & Papers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="service-history"
                      checked={serviceHistory}
                      onCheckedChange={(checked) => setServiceHistory(checked as boolean)}
                    />
                    <Label htmlFor="service-history" className="font-normal">
                      Service History
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="warranty"
                      checked={warranty}
                      onCheckedChange={(checked) => setWarranty(checked as boolean)}
                    />
                    <Label htmlFor="warranty" className="font-normal">
                      Warranty Card
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input id="images" type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
                <p className="text-xs text-muted-foreground">
                  Upload multiple images of the watch, including dial, case, movement, and accessories.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Details</CardTitle>
              <CardDescription>Enter purchase price and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Purchase Summary</h3>
                  <div className="text-2xl font-bold">{formatCurrency(purchasePrice)}</div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase-price">Purchase Price</Label>
                    <Input
                      id="purchase-price"
                      placeholder="£0.00"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="use-partial-payments"
                      checked={usePartialPayments}
                      onCheckedChange={(checked) => setUsePartialPayments(checked as boolean)}
                    />
                    <Label htmlFor="use-partial-payments" className="font-medium">
                      Split payment across multiple methods
                    </Label>
                  </div>
                </div>
              </div>

              {!usePartialPayments ? (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-medium">Payment Method</h3>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger id="payment-method" className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>Bank Transfer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="credit-card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit Card</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          <span>Cash</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="check">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          <span>Check</span>
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
                                <SelectItem value="bank-transfer">
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    <span>Bank Transfer</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="credit-card">
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Credit Card</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="cash">
                                  <div className="flex items-center gap-2">
                                    <Banknote className="h-4 w-4" />
                                    <span>Cash</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="check">
                                  <div className="flex items-center gap-2">
                                    <CheckSquare className="h-4 w-4" />
                                    <span>Check</span>
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
                        <span>Total Purchase Price:</span>
                        <span className="font-medium">{formatCurrency(purchasePrice)}</span>
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
                              ? "The total payments are less than the purchase price."
                              : "The total payments exceed the purchase price."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the purchase..."
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
                invoiceType="purchase"
                supplierName={selectedSupplier?.name || ""}
                items={invoiceItems || []}
                additionalInfo={{
                  Reference: watchDetails.reference || "N/A",
                  Condition: condition || "N/A",
                  Year: year || "N/A",
                  "Box & Papers": boxPapers ? "Yes" : "No",
                }}
                notes={notes || ""}
              />
              <Button type="submit">Complete Purchase</Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="recent-purchases">
        <RecentPurchases />
      </TabsContent>
    </Tabs>
  )
}

// Recent Purchases component
function RecentPurchases() {
  const { sales } = useAppContext()

  // Filter to only show "buy" type sales, sorted by date (newest first)
  const recentPurchases = sales
    .filter((sale) => sale.type === "buy")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Purchases</CardTitle>
        <CardDescription>View your recent watch acquisitions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Date</th>
                <th className="p-2 text-left font-medium">Brand</th>
                <th className="p-2 text-left font-medium">Model</th>
                <th className="p-2 text-left font-medium">Reference</th>
                <th className="p-2 text-left font-medium">Seller</th>
                <th className="p-2 text-left font-medium">Price</th>
                <th className="p-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.length > 0 ? (
                recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b">
                    <td className="p-2">{formatDate(purchase.date)}</td>
                    <td className="p-2">{purchase.watchDetails.brand}</td>
                    <td className="p-2">{purchase.watchDetails.model}</td>
                    <td className="p-2">{purchase.watchDetails.reference}</td>
                    <td className="p-2">{purchase.customerName}</td>
                    <td className="p-2">{formatCurrency(purchase.amount)}</td>
                    <td className="p-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {purchase.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    No purchase records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

