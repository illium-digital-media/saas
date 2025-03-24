"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, User, FileText, Mail, ArrowLeft, ExternalLink } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { InvoicePreview } from "@/components/invoice-preview"
import { toast } from "@/components/ui/use-toast"

export function TransactionComplete() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getCustomerById, getWatchById } = useAppContext()

  const [transactionData, setTransactionData] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [watch, setWatch] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!searchParams) return

    // Get transaction data from URL params
    const type = searchParams.get("type")
    const customerId = searchParams.get("customerId")
    const watchId = searchParams.get("watchId")
    const amount = searchParams.get("amount")
    const transactionId = searchParams.get("transactionId")

    console.log("Transaction params:", { type, customerId, watchId, amount, transactionId })

    if (!type || !customerId || !amount) {
      // If missing required params, redirect to dashboard
      console.log("Missing required params, redirecting to dashboard")
      router.push("/")
      return
    }

    // Get customer and watch data
    const customerData = getCustomerById(customerId)
    let watchData = null
    if (watchId) {
      watchData = getWatchById(watchId)
    }

    console.log("Customer data:", customerData)
    console.log("Watch data:", watchData)

    // Set state
    setCustomer(customerData)
    setWatch(watchData)
    setTransactionData({
      type,
      customerId,
      watchId,
      amount: Number.parseFloat(amount),
      transactionId,
      date: new Date().toISOString(),
    })
    setLoading(false)
  }, [searchParams, getCustomerById, getWatchById, router])

  const handleViewCustomerProfile = () => {
    if (customer) {
      router.push(`/customers/profiles/${customer.id}`)
    }
  }

  const handleSendInvoice = () => {
    // In a real app, this would send the invoice via email
    toast({
      title: "Invoice sent",
      description: `Invoice has been sent to ${customer?.email}`,
    })
  }

  const handleReturnToDashboard = () => {
    router.push("/")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "buy":
        return "Purchase"
      case "sell":
        return "Sale"
      case "exchange":
        return "Exchange"
      case "consignment":
        return "Consignment"
      case "repair":
        return "Repair"
      default:
        return "Transaction"
    }
  }

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading transaction details...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    )
  }

  if (!transactionData || !customer) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Transaction details not found</div>
          <div className="text-sm text-muted-foreground">
            <Button variant="link" onClick={handleReturnToDashboard}>
              Return to dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Prepare invoice items based on transaction type
  const invoiceItems = [
    {
      name: watch ? `${watch.brand} ${watch.model}` : "Watch",
      description: watch?.reference || undefined,
      quantity: 1,
      price: transactionData.amount,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handleReturnToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold">Transaction Complete</h2>
        <p className="mt-2 text-muted-foreground">
          Your {getTransactionTypeLabel(transactionData.type).toLowerCase()} has been successfully processed.
        </p>
        <div className="mt-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            {transactionData.transactionId || `TRX-${Date.now().toString().slice(-6)}`}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details of the customer involved in this transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">{customer.email}</div>
                <div className="text-sm text-muted-foreground">{customer.phone}</div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Customer Since</p>
                <p>{new Date(customer.customerSince).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Spend</p>
                <p>{formatCurrency(customer.totalSpent)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge
                  variant="outline"
                  className={
                    customer.status === "vip"
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                      : "bg-green-50 text-green-700 hover:bg-green-50"
                  }
                >
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleViewCustomerProfile}>
              <User className="mr-2 h-4 w-4" />
              View Customer Profile
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Details of the completed transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-medium">{getTransactionTypeLabel(transactionData.type)}</div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  {new Date(transactionData.date).toLocaleDateString()}
                </Badge>
              </div>

              {watch && (
                <div className="mb-4 flex items-start gap-3">
                  <img
                    src={watch.image || "/placeholder.svg?height=60&width=60"}
                    alt={`${watch.brand} ${watch.model}`}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium">
                      {watch.brand} {watch.model}
                    </div>
                    <div className="text-sm text-muted-foreground">Ref: {watch.reference}</div>
                    <div className="text-sm text-muted-foreground">
                      Condition: {watch.condition.charAt(0).toUpperCase() + watch.condition.slice(1)}
                    </div>
                  </div>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Transaction Type:</span>
                  <span className="font-medium">{getTransactionTypeLabel(transactionData.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatCurrency(transactionData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{new Date(transactionData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-medium">
                    {transactionData.transactionId || `TRX-${Date.now().toString().slice(-6)}`}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <InvoicePreview
              invoiceType={transactionData.type}
              customerName={customer.name}
              items={invoiceItems}
              additionalInfo={{
                "Transaction ID": transactionData.transactionId || `TRX-${Date.now().toString().slice(-6)}`,
                "Transaction Date": new Date(transactionData.date).toLocaleDateString(),
                Reference: watch?.reference || "N/A",
              }}
              notes=""
              className="w-full"
            />
            <Button variant="outline" className="w-full" onClick={handleSendInvoice}>
              <Mail className="mr-2 h-4 w-4" />
              Email Invoice to Customer
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Options for proceeding after this transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 text-center">
              <FileText className="mb-2 h-6 w-6" />
              <div className="font-medium">Create New Transaction</div>
              <div className="mt-1 text-xs text-muted-foreground">Process another sale or purchase</div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 text-center">
              <User className="mb-2 h-6 w-6" />
              <div className="font-medium">Update Customer Details</div>
              <div className="mt-1 text-xs text-muted-foreground">Edit customer information</div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 text-center">
              <ExternalLink className="mb-2 h-6 w-6" />
              <div className="font-medium">View All Transactions</div>
              <div className="mt-1 text-xs text-muted-foreground">See transaction history</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

