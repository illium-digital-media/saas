"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, PlusCircle, Clock, ClipboardList } from "lucide-react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function RepairsServicePage() {
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
          "hidden border-r bg-sidebar shadow-sm lg:block transition-all duration-300",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            {!sidebarCollapsed && (
              <span className="font-semibold text-primary dark:text-primary-foreground">JewellersCRM</span>
            )}
            <SidebarToggle isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav />
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
      <div className="flex flex-col w-full">
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
            <h1 className="text-lg font-semibold md:text-2xl">Repairs & Services</h1>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Repair Request
              </Button>
            </div>
          </div>

          <Tabs defaultValue="requests" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Repair Requests
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Repair Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>New Repair Request</CardTitle>
                  <CardDescription>Create a new repair or service request for a customer's watch.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" placeholder="e.g. +1 (555) 123-4567" />
                    </div>
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
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="e.g. Submariner" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serial">Serial Number</Label>
                      <Input id="serial" placeholder="e.g. 7839521" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select>
                        <SelectTrigger id="service-type">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-service">Full Service</SelectItem>
                          <SelectItem value="movement">Movement Repair</SelectItem>
                          <SelectItem value="water-resistance">Water Resistance Test</SelectItem>
                          <SelectItem value="battery">Battery Replacement</SelectItem>
                          <SelectItem value="crystal">Crystal Replacement</SelectItem>
                          <SelectItem value="polishing">Polishing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="issue-description">Issue Description</Label>
                      <Textarea id="issue-description" placeholder="Describe the issue with the watch..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimated-cost">Estimated Cost</Label>
                      <Input id="estimated-cost" placeholder="$0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimated-completion">Estimated Completion</Label>
                      <Input id="estimated-completion" type="date" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Repair Request</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Repairs</CardTitle>
                  <CardDescription>Track and manage ongoing repair and service requests.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Repair Item 1 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Rolex Submariner</h3>
                            <Badge>Full Service</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Customer: John Doe • Ref: #REP-2023-001</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                            In Progress
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="mt-2" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Received</p>
                          <p>May 15, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Completion</p>
                          <p>May 29, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Technician</p>
                          <p>Michael Brown</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Cost</p>
                          <p>$850.00</p>
                        </div>
                      </div>
                    </div>

                    {/* Repair Item 2 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Omega Speedmaster</h3>
                            <Badge>Movement Repair</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Customer: Jane Smith • Ref: #REP-2023-002</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            Diagnosis
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="mt-2" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Received</p>
                          <p>May 18, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Completion</p>
                          <p>June 8, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Technician</p>
                          <p>Sarah Johnson</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Cost</p>
                          <p>$650.00</p>
                        </div>
                      </div>
                    </div>

                    {/* Repair Item 3 */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Cartier Tank</h3>
                            <Badge>Battery Replacement</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Customer: Robert Johnson • Ref: #REP-2023-003</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Completed
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Notify Customer
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="mt-2" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Received</p>
                          <p>May 20, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p>May 21, 2023</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Technician</p>
                          <p>David Wilson</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Final Cost</p>
                          <p>$95.00</p>
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

