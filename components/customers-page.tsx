"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, PlusCircle, Users, History, Crown, Filter, Mail, Phone } from "lucide-react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function CustomersPage() {
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
            <h1 className="text-lg font-semibold md:text-2xl">Customer Management</h1>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Customer
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profiles" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profiles" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer Profiles
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Purchase History
              </TabsTrigger>
              <TabsTrigger value="vip" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                VIP Clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profiles" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Customer Directory</CardTitle>
                    <CardDescription>View and manage your customer profiles.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Customer 1 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">John Doe</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              <span>john.doe@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>+44 7123 456789</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Active
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Customer Since</p>
                          <p>March 2022</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Purchases</p>
                          <p>£32,450</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Purchase</p>
                          <p>2 weeks ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Preferences</p>
                          <p>Rolex, Omega</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer 2 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Jane Smith</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              <span>jane.smith@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>+44 7987 654321</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                            VIP
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Customer Since</p>
                          <p>January 2021</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Purchases</p>
                          <p>£78,950</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Purchase</p>
                          <p>3 days ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Preferences</p>
                          <p>Patek Philippe, Cartier</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer 3 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Robert Johnson</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              <span>robert.johnson@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>+44 7456 123789</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Active
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Customer Since</p>
                          <p>June 2022</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Purchases</p>
                          <p>£12,780</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Purchase</p>
                          <p>1 month ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Preferences</p>
                          <p>TAG Heuer, Tudor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>View customer purchase history and transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">Jane Smith</h3>
                          <p className="text-sm text-muted-foreground">VIP Customer</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Full Profile
                      </Button>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/40">
                        <h3 className="text-sm font-medium">Recent Transactions</h3>
                      </div>
                      <div className="divide-y">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Patek Philippe Nautilus</h4>
                              <p className="text-sm text-muted-foreground">Ref: 5711/1A-010</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Purchase
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p>May 15, 2023</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Amount</p>
                              <p>£85,000</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Payment Method</p>
                              <p>Bank Transfer</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sales Consultant</p>
                              <p>Emma Thompson</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Cartier Santos</h4>
                              <p className="text-sm text-muted-foreground">Ref: WSSA0018</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Purchase
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p>February 3, 2023</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Amount</p>
                              <p>£6,800</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Payment Method</p>
                              <p>Credit Card</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sales Consultant</p>
                              <p>James Wilson</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Rolex Datejust 41</h4>
                              <p className="text-sm text-muted-foreground">Ref: 126334</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                              Service
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p>November 12, 2022</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Amount</p>
                              <p>£450</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Service Type</p>
                              <p>Full Service</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Technician</p>
                              <p>Michael Brown</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vip" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>VIP Clients</CardTitle>
                  <CardDescription>Manage your high-value customers and their preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* VIP Customer 1 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Jane Smith</h3>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                Platinum
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              <span>jane.smith@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>+44 7987 654321</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-sm font-medium">Lifetime Value</p>
                            <p className="text-lg font-bold">£78,950</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">Contact</Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Preferences & Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          Prefers Patek Philippe and Cartier. Interested in limited editions. Birthday: April 15.
                          Champagne preference: Dom Pérignon. Always looking for investment pieces.
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Last Contact</p>
                          <p>3 days ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Assigned To</p>
                          <p>Emma Thompson</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Follow-up</p>
                          <p>June 10, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p>Active</p>
                        </div>
                      </div>
                    </div>

                    {/* VIP Customer 2 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                            <AvatarFallback>RW</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Richard Williams</h3>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                Gold
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              <span>richard.williams@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>+44 7123 987654</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-sm font-medium">Lifetime Value</p>
                            <p className="text-lg font-bold">£52,350</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">Contact</Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Preferences & Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          Collector of Rolex sports models. Interested in vintage pieces. Birthday: September 22.
                          Whiskey preference: Macallan. Looking to expand collection with Audemars Piguet.
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Last Contact</p>
                          <p>1 week ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Assigned To</p>
                          <p>James Wilson</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Follow-up</p>
                          <p>May 28, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p>Active</p>
                        </div>
                      </div>
                    </div>
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

