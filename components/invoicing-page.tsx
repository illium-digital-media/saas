"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, PlusCircle, FileText, CreditCard, RefreshCcw, Download, Printer, Mail } from "lucide-react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function InvoicingPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "hidden border-r bg-sidebar shadow-sm lg:block transition-all duration-300 fixed top-0 left-0 h-screen z-30",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-center border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">
              {sidebarCollapsed ? "JCRM" : "JewellersCRM"}
            </span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav collapsed={sidebarCollapsed} />
          </div>
          <div className="border-t p-2 flex justify-center">
            <SidebarToggle isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={toggleMobileSidebar} />}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar shadow-lg transition-transform duration-300 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">JewellersCRM</span>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("flex flex-col w-full", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <button className="lg:hidden" onClick={toggleMobileSidebar}>
            <span className="sr-only">Toggle menu</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="w-full flex-1">
            <Search />
          </div>
          <UserNav />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Invoicing</h1>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </div>
          </div>

          <Tabs defaultValue="generate" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Invoices
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Tracking
              </TabsTrigger>
              <TabsTrigger value="refunds" className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refunds & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Invoice</CardTitle>
                  <CardDescription>Generate a new invoice for a customer.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer</Label>
                        <Select>
                          <SelectTrigger id="customer">
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john-doe">John Doe</SelectItem>
                            <SelectItem value="jane-smith">Jane Smith</SelectItem>
                            <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                            <SelectItem value="new">+ Add New Customer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoice-date">Invoice Date</Label>
                        <Input id="invoice-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="due-date">Due Date</Label>
                        <Input id="due-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoice-number">Invoice Number</Label>
                        <Input id="invoice-number" defaultValue="INV-2023-0042" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-terms">Payment Terms</Label>
                        <Select defaultValue="14">
                          <SelectTrigger id="payment-terms">
                            <SelectValue placeholder="Select terms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Due on Receipt</SelectItem>
                            <SelectItem value="7">Net 7 Days</SelectItem>
                            <SelectItem value="14">Net 14 Days</SelectItem>
                            <SelectItem value="30">Net 30 Days</SelectItem>
                            <SelectItem value="60">Net 60 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Line Items</Label>
                      <div className="rounded-md border">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="p-2 text-left font-medium">Item</th>
                              <th className="p-2 text-left font-medium">Description</th>
                              <th className="p-2 text-left font-medium">Quantity</th>
                              <th className="p-2 text-left font-medium">Unit Price</th>
                              <th className="p-2 text-left font-medium">Total</th>
                              <th className="p-2 text-left font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2">
                                <Input placeholder="Item name" defaultValue="Rolex Submariner" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="Description" defaultValue="Ref: 126610LN" />
                              </td>
                              <td className="p-2">
                                <Input type="number" defaultValue="1" min="1" className="w-16" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="Price" defaultValue="12500.00" className="w-24" />
                              </td>
                              <td className="p-2">
                                <Input readOnly defaultValue="£12,500.00" className="w-24" />
                              </td>
                              <td className="p-2">
                                <Button variant="ghost" size="sm">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                  </svg>
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={6} className="p-2">
                                <Button variant="outline" size="sm">
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Item
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex w-full justify-between sm:w-1/2">
                        <span className="font-medium">Subtotal:</span>
                        <span>£12,500.00</span>
                      </div>
                      <div className="flex w-full justify-between sm:w-1/2">
                        <span className="font-medium">VAT (20%):</span>
                        <span>£2,500.00</span>
                      </div>
                      <div className="flex w-full justify-between sm:w-1/2">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">£15,000.00</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Enter any additional notes or payment instructions..." />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Invoice
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>View and manage recently generated invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left font-medium">Invoice #</th>
                          <th className="p-2 text-left font-medium">Customer</th>
                          <th className="p-2 text-left font-medium">Date</th>
                          <th className="p-2 text-left font-medium">Amount</th>
                          <th className="p-2 text-left font-medium">Status</th>
                          <th className="p-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">INV-2023-0041</td>
                          <td className="p-2">Jane Smith</td>
                          <td className="p-2">May 15, 2023</td>
                          <td className="p-2">£15,000.00</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">INV-2023-0040</td>
                          <td className="p-2">Robert Johnson</td>
                          <td className="p-2">May 12, 2023</td>
                          <td className="p-2">£450.00</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                              Pending
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">INV-2023-0039</td>
                          <td className="p-2">John Doe</td>
                          <td className="p-2">May 10, 2023</td>
                          <td className="p-2">£8,750.00</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Paid
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Tracking</CardTitle>
                  <CardDescription>Monitor and manage customer payments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">£24,850.00</div>
                          <p className="text-xs text-muted-foreground">Across 8 invoices</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-500">£6,200.00</div>
                          <p className="text-xs text-muted-foreground">Across 3 invoices</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-500">£42,750.00</div>
                          <p className="text-xs text-muted-foreground">Across 12 invoices</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Outstanding Invoices</h3>
                      </div>
                      <div className="divide-y">
                        <div className="p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">INV-2023-0040</h4>
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                  Pending
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Robert Johnson • Due: May 26, 2023</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">Amount</p>
                                <p className="font-bold">£450.00</p>
                              </div>
                              <Button size="sm">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>Due in 7 days</span>
                            </div>
                            <Progress value={50} className="h-2" />
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">INV-2023-0038</h4>
                                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                  Overdue
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">William Kim • Due: May 5, 2023</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">Amount</p>
                                <p className="font-bold">£3,200.00</p>
                              </div>
                              <Button size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Reminder
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-red-500">Overdue by 10 days</span>
                            </div>
                            <Progress value={100} className="h-2 bg-muted [&>div]:bg-red-500" />
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">INV-2023-0037</h4>
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                  Partially Paid
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Sophia Davis • Due: May 20, 2023</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">Amount</p>
                                <p className="font-bold">£4,800.00 / £6,800.00</p>
                              </div>
                              <Button size="sm">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>Due in 1 day</span>
                              <span>70% paid</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="refunds" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Refunds & Returns</CardTitle>
                  <CardDescription>Process and manage customer refunds and returns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="refund-customer">Customer</Label>
                        <Select>
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
                        <Select>
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
                        <Input id="refund-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refund-amount">Refund Amount</Label>
                        <Input id="refund-amount" placeholder="£0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refund-method">Refund Method</Label>
                        <Select>
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
                        <Select>
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
                        <Textarea id="refund-notes" placeholder="Enter any additional details about the refund..." />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Process Refund
                      </Button>
                    </div>
                  </div>

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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

