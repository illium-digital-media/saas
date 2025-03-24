"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { InvoicePreview } from "@/components/invoice-preview"
import { useAppContext } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function SalesConsignmentForm() {
  const { addWatch, addSale, getCustomerById } = useAppContext()
  const router = useRouter()

  const [consignor, setConsignor] = useState<string>("")
  const [consignorContact, setConsignorContact] = useState<string>("")
  const [consignorEmail, setConsignorEmail] = useState<string>("")
  const [brand, setBrand] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [reference, setReference] = useState<string>("")
  const [serialNumber, setSerialNumber] = useState<string>("")
  const [condition, setCondition] = useState<string>("")
  const [boxPapers, setBoxPapers] = useState<boolean>(false)
  const [askingPrice, setAskingPrice] = useState<string>("")
  const [minimumPrice, setMinimumPrice] = useState<string>("")
  const [commissionRate, setCommissionRate] = useState<string>("15")
  const [consignmentPeriod, setConsignmentPeriod] = useState<string>("90")
  const [notes, setNotes] = useState<string>("")
  const [images, setImages] = useState<FileList | null>(null)
  const [invoiceItems, setInvoiceItems] = useState<
    Array<{ name: string; description?: string; quantity: number; price: number }>
  >([
    {
      name: brand ? `${brand} ${model}` : "Consignment Watch",
      description: reference || undefined,
      quantity: 1,
      price: Number.parseFloat(askingPrice) || 0,
    },
  ])
  const [selectedCustomer, setSelectedCustomer] = useState<{ name: string; contact: string; email: string } | null>(
    null,
  )

  const consignmentDetails = {
    watchBrand: brand,
    watchModel: model,
    watchReference: reference,
    estimatedValue: askingPrice,
    minimumPrice: minimumPrice,
    commissionRate: commissionRate,
    consignmentPeriod: consignmentPeriod,
    notes: notes,
  }

  useEffect(() => {
    setInvoiceItems([
      {
        name: consignmentDetails.watchBrand
          ? `${consignmentDetails.watchBrand} ${consignmentDetails.watchModel}`
          : "Consignment Watch",
        description: consignmentDetails.watchReference || undefined,
        quantity: 1,
        price: Number.parseFloat(consignmentDetails.estimatedValue) || 0,
      },
    ])
  }, [
    consignmentDetails.watchBrand,
    consignmentDetails.watchModel,
    consignmentDetails.watchReference,
    consignmentDetails.estimatedValue,
  ])

  useEffect(() => {
    if (consignor) {
      const customer = getCustomerById(consignor)
      if (customer) {
        setSelectedCustomer({
          name: customer.name,
          contact: customer.phone,
          email: customer.email,
        })
        setConsignorContact(customer.phone)
        setConsignorEmail(customer.email)
      }
    }
  }, [consignor, getCustomerById])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Consignment form submitted")

    // Validate required fields
    if (!consignor || !brand || !model || !reference || !serialNumber || !condition || !askingPrice || !minimumPrice) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Processing consignment...")

      // Add the watch to inventory with consignment status
      const newWatch = addWatch({
        brand,
        model,
        reference,
        serialNumber,
        condition,
        price: Number.parseFloat(askingPrice) || 0,
        status: "Consignment",
        boxPapers,
        warranty: false,
        serviceHistory: false,
        year: "",
        image: "/placeholder.svg?height=200&width=200",
      })

      // Record the consignment transaction
      const sale = addSale({
        type: "consignment",
        customerId: consignor,
        customerName: selectedCustomer?.name || "Unknown",
        watchId: newWatch.id,
        watchDetails: {
          brand,
          model,
          reference,
        },
        amount: Number.parseFloat(askingPrice) || 0,
        paymentMethod: "consignment",
        paymentStatus: "pending",
        notes: `Consignment: ${commissionRate}% commission, minimum price ${minimumPrice}, period ${consignmentPeriod} days. ${notes}`,
      })

      toast({
        title: "Consignment created",
        description: "The consignment has been recorded successfully.",
      })

      console.log("Redirecting to transaction complete page...")

      // Redirect to transaction complete page with explicit window.location
      window.location.href = `/transaction-complete?type=consignment&customerId=${consignor}&watchId=${newWatch.id}&amount=${
        Number.parseFloat(askingPrice) || 0
      }&transactionId=${sale.id}`
    } catch (error) {
      console.error("Error processing consignment:", error)
      toast({
        title: "Error",
        description: "There was an error processing your consignment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate commission amount
  const calculateCommission = () => {
    const price = Number.parseFloat(askingPrice) || 0
    const rate = Number.parseFloat(commissionRate) || 0
    return (price * rate) / 100
  }

  // Calculate consignor payout
  const calculatePayout = () => {
    const price = Number.parseFloat(askingPrice) || 0
    const commission = calculateCommission()
    return price - commission
  }

  return (
    <Tabs defaultValue="new-consignment" className="space-y-4">
      <TabsList>
        <TabsTrigger value="new-consignment">New Consignment</TabsTrigger>
        <TabsTrigger value="active-consignments">Active Consignments</TabsTrigger>
      </TabsList>

      <TabsContent value="new-consignment" className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consignor Information</CardTitle>
              <CardDescription>Enter details about the watch owner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="consignor">Consignor</Label>
                  <Select value={consignor} onValueChange={setConsignor} required>
                    <SelectTrigger id="consignor">
                      <SelectValue placeholder="Select consignor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                      <SelectItem value="new">+ Add New Consignor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consignor-contact">Contact Number</Label>
                  <Input
                    id="consignor-contact"
                    placeholder="Phone number"
                    value={consignorContact}
                    onChange={(e) => setConsignorContact(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consignor-email">Email</Label>
                  <Input
                    id="consignor-email"
                    type="email"
                    placeholder="Email address"
                    value={consignorEmail}
                    onChange={(e) => setConsignorEmail(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watch Details</CardTitle>
              <CardDescription>Enter information about the watch being consigned</CardDescription>
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="box-papers"
                    checked={boxPapers}
                    onCheckedChange={(checked) => setBoxPapers(checked as boolean)}
                  />
                  <Label htmlFor="box-papers" className="font-normal">
                    Includes Original Box & Papers
                  </Label>
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
              <CardTitle>Consignment Terms</CardTitle>
              <CardDescription>Set pricing and commission details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="asking-price">Asking Price</Label>
                  <Input
                    id="asking-price"
                    placeholder="£0.00"
                    value={askingPrice}
                    onChange={(e) => setAskingPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum-price">Minimum Acceptable Price</Label>
                  <Input
                    id="minimum-price"
                    placeholder="£0.00"
                    value={minimumPrice}
                    onChange={(e) => setMinimumPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input
                    id="commission-rate"
                    placeholder="15"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consignment-period">Consignment Period (days)</Label>
                  <Select value={consignmentPeriod} onValueChange={setConsignmentPeriod} required>
                    <SelectTrigger id="consignment-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="120">120 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="mb-2 font-medium">Consignment Summary</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Asking Price:</span>
                    <span>
                      £
                      {Number.parseFloat(askingPrice || "0").toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission ({commissionRate}%):</span>
                    <span>
                      £
                      {calculateCommission().toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Consignor Payout:</span>
                    <span>
                      £
                      {calculatePayout().toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the consignment..."
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
              invoiceType="consignment"
              customerName={selectedCustomer?.name}
              items={invoiceItems}
              additionalInfo={{
                "Commission Rate": `${consignmentDetails.commissionRate}%`,
                "Estimated Value": `£${Number.parseFloat(consignmentDetails.estimatedValue).toFixed(2)}`,
                "Minimum Sale Price": `£${Number.parseFloat(consignmentDetails.minimumPrice).toFixed(2)}`,
                "Consignment Period": `${consignmentDetails.consignmentPeriod} days`,
              }}
              notes={consignmentDetails.notes}
            />
            <Button type="submit">Create Consignment</Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="active-consignments">
        <Card>
          <CardHeader>
            <CardTitle>Active Consignments</CardTitle>
            <CardDescription>Manage watches currently on consignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left font-medium">ID</th>
                    <th className="p-2 text-left font-medium">Watch</th>
                    <th className="p-2 text-left font-medium">Consignor</th>
                    <th className="p-2 text-left font-medium">Asking Price</th>
                    <th className="p-2 text-left font-medium">Start Date</th>
                    <th className="p-2 text-left font-medium">Days Left</th>
                    <th className="p-2 text-left font-medium">Status</th>
                    <th className="p-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">CON-2023-0015</td>
                    <td className="p-2">Rolex Datejust 41</td>
                    <td className="p-2">David Miller</td>
                    <td className="p-2">£8,500.00</td>
                    <td className="p-2">Apr 20, 2023</td>
                    <td className="p-2">45</td>
                    <td className="p-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Active
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">CON-2023-0014</td>
                    <td className="p-2">Omega Seamaster 300M</td>
                    <td className="p-2">Sarah Johnson</td>
                    <td className="p-2">£4,200.00</td>
                    <td className="p-2">Apr 15, 2023</td>
                    <td className="p-2">40</td>
                    <td className="p-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Active
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">CON-2023-0012</td>
                    <td className="p-2">Tudor Black Bay 58</td>
                    <td className="p-2">Michael Chen</td>
                    <td className="p-2">£3,100.00</td>
                    <td className="p-2">Apr 5, 2023</td>
                    <td className="p-2">30</td>
                    <td className="p-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        Pending Sale
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
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

