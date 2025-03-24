"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Printer, Download } from "lucide-react"

interface InvoiceItem {
  name: string
  description?: string
  serialNumber?: string
  quantity: number
  price: number
}

interface InvoicePreviewProps {
  invoiceType: "purchase" | "sale" | "exchange" | "consignment"
  customerName?: string
  supplierName?: string
  items: InvoiceItem[]
  additionalInfo?: Record<string, string>
  notes?: string
  vatRate?: number
  discountType?: "percentage" | "fixed"
  discountValue?: number
  invoice?: any // Add optional invoice prop
}

export function InvoicePreview({
  invoiceType,
  customerName,
  supplierName,
  items = [],
  additionalInfo = {},
  notes = "",
  vatRate = 20,
  discountType = "percentage",
  discountValue = 0,
  invoice, // Accept the invoice prop
}: InvoicePreviewProps) {
  const [open, setOpen] = useState(false)

  // Use either the invoice object or generate values from props
  const invoiceNumber =
    invoice?.invoiceNumber || `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const invoiceDate = invoice?.issueDate
    ? new Date(invoice.issueDate).toLocaleDateString("en-GB")
    : new Date().toLocaleDateString("en-GB")
  const dueDate = invoice?.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString("en-GB")
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB")

  // Use items from invoice if available, otherwise use the items prop
  const displayItems = invoice?.lineItems || items

  const calculateSubtotal = () => {
    if (invoice?.subtotal !== undefined) {
      return invoice.subtotal
    }
    return displayItems.reduce((sum, item) => {
      const quantity = item.quantity || 0
      const price = item.price || item.unitPrice || 0
      return sum + quantity * price
    }, 0)
  }

  const calculateDiscount = () => {
    if (invoice?.discount !== undefined) {
      return invoice.discount
    }

    const subtotal = calculateSubtotal()
    if (discountType === "percentage") {
      return subtotal * (discountValue / 100)
    } else {
      return discountValue
    }
  }

  const calculateDiscountedSubtotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const calculateVAT = () => {
    if (invoice?.vat !== undefined) {
      return invoice.vat
    }

    const effectiveVatRate = invoice?.vatRate !== undefined ? invoice.vatRate : vatRate
    return calculateDiscountedSubtotal() * (effectiveVatRate / 100)
  }

  const calculateTotal = () => {
    if (invoice?.total !== undefined) {
      return invoice.total
    }
    return calculateDiscountedSubtotal() + calculateVAT()
  }

  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getInvoiceTitle = () => {
    switch (invoiceType) {
      case "purchase":
        return "Purchase Invoice"
      case "sale":
        return "Sales Invoice"
      case "exchange":
        return "Exchange Invoice"
      case "consignment":
        return "Consignment Invoice"
      default:
        return "Invoice"
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("PDF download functionality would be implemented here")
  }

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent form submission
    setOpen(true)
  }

  // Get customer name from either prop or invoice object
  const displayCustomerName = invoice?.customer?.name || customerName

  // Get supplier name from prop
  const displaySupplierName = supplierName

  // Get notes from either prop or invoice object
  const displayNotes = invoice?.notes || notes

  // Get effective VAT rate
  const effectiveVatRate = invoice?.vatRate !== undefined ? invoice.vatRate : vatRate

  // Get effective discount type and value
  const effectiveDiscountType = invoice?.discountType || discountType
  const effectiveDiscountValue = invoice?.discountValue !== undefined ? invoice.discountValue : discountValue

  return (
    <>
      <Button
        variant="outline"
        onClick={handlePreviewClick}
        className="flex items-center gap-2"
        type="button" // Explicitly set type to button to prevent form submission
      >
        <FileText className="h-4 w-4" />
        Preview Invoice
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{getInvoiceTitle()} Preview</DialogTitle>
            <DialogDescription>Review the invoice before finalizing</DialogDescription>
          </DialogHeader>

          <div className="invoice-preview border rounded-md p-6 bg-white text-black print:shadow-none">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold">JewellersCRM</h1>
                <p>123 Luxury Lane</p>
                <p>London, W1 9AB</p>
                <p>United Kingdom</p>
                <p>VAT: GB123456789</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold">{getInvoiceTitle()}</h2>
                <p>
                  <span className="font-medium">Invoice Number:</span> {invoiceNumber}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {invoiceDate}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span> {dueDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {displaySupplierName && (
                <div>
                  <h3 className="font-bold mb-2">Supplier:</h3>
                  <p>{displaySupplierName}</p>
                </div>
              )}

              {displayCustomerName && (
                <div>
                  <h3 className="font-bold mb-2">Customer:</h3>
                  <p>{displayCustomerName}</p>
                </div>
              )}

              {Object.entries(additionalInfo).length > 0 && (
                <div className="col-span-2">
                  <h3 className="font-bold mb-2">Additional Information:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(additionalInfo).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Items:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Serial Number</th>
                    <th className="text-right py-2">Quantity</th>
                    <th className="text-right py-2">Unit Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.name || item.description || "-"}</td>
                      <td className="py-2">{item.description || "-"}</td>
                      <td className="py-2">{item.serialNumber || "-"}</td>
                      <td className="py-2 text-right">{item.quantity || 0}</td>
                      <td className="py-2 text-right">{formatCurrency(item.price || item.unitPrice || 0)}</td>
                      <td className="py-2 text-right">
                        {formatCurrency((item.quantity || 0) * (item.price || item.unitPrice || 0))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                {calculateDiscount() > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="font-medium">
                      Discount {effectiveDiscountType === "percentage" ? `(${effectiveDiscountValue}%)` : ""}:
                    </span>
                    <span className="text-red-600">-{formatCurrency(calculateDiscount())}</span>
                  </div>
                )}
                {calculateDiscount() > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Subtotal after discount:</span>
                    <span>{formatCurrency(calculateDiscountedSubtotal())}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="font-medium">VAT ({effectiveVatRate}%):</span>
                  <span>{formatCurrency(calculateVAT())}</span>
                </div>
                <div className="flex justify-between py-2 border-t font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {displayNotes && (
              <div className="mb-8">
                <h3 className="font-bold mb-2">Notes:</h3>
                <p className="whitespace-pre-line">{displayNotes}</p>
              </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-8">
              <p>Thank you for your business</p>
              <p>Payment terms: 14 days from invoice date</p>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint} type="button">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" onClick={handleDownload} type="button">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={() => setOpen(false)} type="button">
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

