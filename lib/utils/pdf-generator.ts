import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { Sale, Watch, Customer } from "@/lib/context/app-context"

// Format currency for reports
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date for reports
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Generate sales report
export const generateSalesReport = (sales: Sale[], title = "Sales Report"): jsPDF => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(title, 14, 22)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${formatDate(new Date())}`, 14, 30)

  // Add summary
  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0)

  doc.setFontSize(12)
  doc.text(`Total Sales: ${totalSales}`, 14, 40)
  doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 14, 48)

  // Add sales table
  const tableData = sales.map((sale) => [
    formatDate(new Date(sale.date)),
    sale.type.charAt(0).toUpperCase() + sale.type.slice(1),
    sale.customerName,
    `${sale.watchDetails.brand} ${sale.watchDetails.model}`,
    formatCurrency(sale.amount),
    sale.paymentStatus,
  ])

  autoTable(doc, {
    startY: 55,
    head: [["Date", "Type", "Customer", "Watch", "Amount", "Status"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [51, 51, 51] },
  })

  return doc
}

// Generate inventory report
export const generateInventoryReport = (watches: Watch[], title = "Inventory Report"): jsPDF => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(title, 14, 22)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${formatDate(new Date())}`, 14, 30)

  // Add summary
  const totalWatches = watches.length
  const totalValue = watches.reduce((sum, watch) => sum + watch.price, 0)
  const inStockWatches = watches.filter((watch) => watch.status === "In Stock").length

  doc.setFontSize(12)
  doc.text(`Total Watches: ${totalWatches}`, 14, 40)
  doc.text(`In Stock: ${inStockWatches}`, 14, 48)
  doc.text(`Total Value: ${formatCurrency(totalValue)}`, 14, 56)

  // Add inventory table
  const tableData = watches.map((watch) => [
    watch.brand,
    watch.model,
    watch.reference,
    watch.serialNumber || "N/A",
    watch.condition,
    formatCurrency(watch.price),
    watch.status,
  ])

  autoTable(doc, {
    startY: 65,
    head: [["Brand", "Model", "Reference", "Serial Number", "Condition", "Price", "Status"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [51, 51, 51] },
  })

  return doc
}

// Generate customer report
export const generateCustomerReport = (customers: Customer[], title = "Customer Report"): jsPDF => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(title, 14, 22)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${formatDate(new Date())}`, 14, 30)

  // Add summary
  const totalCustomers = customers.length
  const vipCustomers = customers.filter((customer) => customer.status.toLowerCase() === "vip").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)

  doc.setFontSize(12)
  doc.text(`Total Customers: ${totalCustomers}`, 14, 40)
  doc.text(`VIP Customers: ${vipCustomers}`, 14, 48)
  doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 14, 56)

  // Add customer table
  const tableData = customers.map((customer) => [
    customer.name,
    customer.email,
    customer.phone || "N/A",
    formatCurrency(customer.totalSpent),
    customer.lastPurchase ? formatDate(new Date(customer.lastPurchase)) : "N/A",
    customer.status,
  ])

  autoTable(doc, {
    startY: 65,
    head: [["Name", "Email", "Phone", "Total Spent", "Last Purchase", "Status"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [51, 51, 51] },
  })

  return doc
}

// Generate a custom report
export const generateCustomReport = (
  title: string,
  summary: { label: string; value: string }[],
  headers: string[],
  data: string[][],
): jsPDF => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(title, 14, 22)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${formatDate(new Date())}`, 14, 30)

  // Add summary
  let yPos = 40
  doc.setFontSize(12)

  summary.forEach((item) => {
    doc.text(`${item.label}: ${item.value}`, 14, yPos)
    yPos += 8
  })

  // Add table
  autoTable(doc, {
    startY: yPos + 5,
    head: [headers],
    body: data,
    theme: "striped",
    headStyles: { fillColor: [51, 51, 51] },
  })

  return doc
}

