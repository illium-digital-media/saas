"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, PlusCircle, ShoppingCart, Repeat, ArrowLeftRight, Tag } from "lucide-react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { watchData } from "@/lib/data"

export function SalesManagementPage() {
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
            <h1 className="text-lg font-semibold md:text-2xl">Sales Management</h1>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </div>
          </div>

          <Tabs defaultValue="buy" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="buy" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Buy Watches
              </TabsTrigger>
              <TabsTrigger value="sell" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Sell Watches
              </TabsTrigger>
              <TabsTrigger value="exchange" className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Part Exchange
              </TabsTrigger>
              <TabsTrigger value="consignment" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Consignment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Buy Watches</CardTitle>
                  <CardDescription>
                    Add new watches to your inventory by purchasing from suppliers or customers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rolex">Rolex</SelectItem>
                          <SelectItem value="omega">Omega</SelectItem>
                          <SelectItem value="patek">Patek Philippe</SelectItem>
                          <SelectItem value="cartier">Cartier</SelectItem>
                          <SelectItem value="tag">TAG Heuer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="e.g. Submariner" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference Number</Label>
                      <Input id="reference" placeholder="e.g. 126610LN" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" placeholder="e.g. 2021" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purchase-price">Purchase Price</Label>
                      <Input id="purchase-price" placeholder="£0.00" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter watch details..." />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add to Inventory</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Purchases</CardTitle>
                  <CardDescription>View and manage your recent watch purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={watchData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sell Watches</CardTitle>
                  <CardDescription>Sell watches from your inventory to customers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                        <Label htmlFor="watch">Watch</Label>
                        <Select>
                          <SelectTrigger id="watch">
                            <SelectValue placeholder="Select watch from inventory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rolex-sub">Rolex Submariner (126610LN)</SelectItem>
                            <SelectItem value="omega-speed">Omega Speedmaster (311.30.42.30.01.005)</SelectItem>
                            <SelectItem value="cartier-santos">Cartier Santos (WSSA0018)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="selling-price">Selling Price</Label>
                        <Input id="selling-price" placeholder="£0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Complete Sale</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="exchange" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Part Exchange</CardTitle>
                  <CardDescription>
                    Process part exchange transactions where customers trade in their watches.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Customer's Watch</h3>
                      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="customer-brand">Brand</Label>
                          <Select>
                            <SelectTrigger id="customer-brand">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rolex">Rolex</SelectItem>
                              <SelectItem value="omega">Omega</SelectItem>
                              <SelectItem value="patek">Patek Philippe</SelectItem>
                              <SelectItem value="cartier">Cartier</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customer-model">Model</Label>
                          <Input id="customer-model" placeholder="e.g. Datejust" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customer-condition">Condition</Label>
                          <Select>
                            <SelectTrigger id="customer-condition">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent</SelectItem>
                              <SelectItem value="very-good">Very Good</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="trade-in-value">Trade-in Value</Label>
                          <Input id="trade-in-value" placeholder="£0.00" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Store Watch</h3>
                      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="store-watch">Watch</Label>
                          <Select>
                            <SelectTrigger id="store-watch">
                              <SelectValue placeholder="Select watch from inventory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rolex-sub">Rolex Submariner (126610LN)</SelectItem>
                              <SelectItem value="omega-speed">Omega Speedmaster (311.30.42.30.01.005)</SelectItem>
                              <SelectItem value="cartier-santos">Cartier Santos (WSSA0018)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="selling-price-exchange">Selling Price</Label>
                          <Input id="selling-price-exchange" placeholder="£0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="balance-due">Balance Due</Label>
                          <Input id="balance-due" placeholder="£0.00" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment-method-exchange">Payment Method</Label>
                          <Select>
                            <SelectTrigger id="payment-method-exchange">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="credit-card">Credit Card</SelectItem>
                              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Complete Exchange</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="consignment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Consignment</CardTitle>
                  <CardDescription>Manage watches on consignment from customers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="consignor">Consignor</Label>
                        <Select>
                          <SelectTrigger id="consignor">
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
                        <Label htmlFor="consignment-brand">Brand</Label>
                        <Select>
                          <SelectTrigger id="consignment-brand">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rolex">Rolex</SelectItem>
                            <SelectItem value="omega">Omega</SelectItem>
                            <SelectItem value="patek">Patek Philippe</SelectItem>
                            <SelectItem value="cartier">Cartier</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consignment-model">Model</Label>
                        <Input id="consignment-model" placeholder="e.g. Daytona" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consignment-reference">Reference Number</Label>
                        <Input id="consignment-reference" placeholder="e.g. 116500LN" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="asking-price">Asking Price</Label>
                        <Input id="asking-price" placeholder="£0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                        <Input id="commission-rate" placeholder="e.g. 15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consignment-period">Consignment Period</Label>
                        <Select>
                          <SelectTrigger id="consignment-period">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="60">60 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                            <SelectItem value="custom">Custom Period</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consignment-status">Status</Label>
                        <Select>
                          <SelectTrigger id="consignment-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="returned">Returned to Owner</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Consignment</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

