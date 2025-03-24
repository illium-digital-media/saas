"use client"

import { useState } from "react"
import { Download, FileText, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppContext } from "@/lib/context/app-context"
import { generateSalesReport, generateInventoryReport, generateCustomerReport } from "@/lib/utils/pdf-generator"

export function ReportDownload() {
  const { sales, watches, customers } = useAppContext()
  const [open, setOpen] = useState(false)
  const [reportType, setReportType] = useState("sales")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)

    try {
      let doc

      // Generate the appropriate report based on type
      if (reportType === "sales") {
        doc = generateSalesReport(sales)
      } else if (reportType === "inventory") {
        doc = generateInventoryReport(watches)
      } else if (reportType === "customers") {
        doc = generateCustomerReport(customers)
      }

      // Save the PDF
      if (doc) {
        doc.save(`${reportType}-report-${format(new Date(), "yyyy-MM-dd")}.pdf`)
      }

      setOpen(false)
    } catch (error) {
      console.error("Error generating report:", error)
      alert("There was an error generating the report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>Create a customized report for your business data.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="customers">Customer Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-charts"
              checked={includeCharts}
              onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
            />
            <Label htmlFor="include-charts">Include charts and graphs</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={generateReport} disabled={isGenerating} className="flex items-center gap-1">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

