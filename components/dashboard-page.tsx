"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
// import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { DateRangePickerV45 } from "@/components/date-range-picker-v45"
import { Button } from "@/components/ui/button"
import {
  DownloadIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  WatchIcon,
  ClockIcon,
  CalendarIcon,
  AlertTriangleIcon,
  MenuIcon,
  ShoppingCart,
  Users,
  Package,
  CheckCircle2,
  FileText,
  ChevronDown,
  PoundSterling,
} from "lucide-react"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { LowStockAlerts } from "@/components/low-stock-alerts"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { SalesTeamPerformance } from "@/components/sales-team-performance"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
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
          <button
            className="lg:hidden"
            onClick={toggleMobileSidebar}
            aria-label="Toggle menu"
            aria-expanded={mobileSidebarOpen}
          >
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
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:items-center sm:gap-2">
              <DateRangePickerV45 />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1 whitespace-nowrap">
                    <DownloadIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download Report</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>PDF Report</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Excel Spreadsheet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>CSV Export</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="repairs">Repairs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                    <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£245,678.99</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +18.2%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Watches Sold</CardTitle>
                    <WatchIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +12.5%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Repairs Completed</CardTitle>
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-rose-500 flex items-center">
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                        -5.2%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +3
                      </span>{" "}
                      from yesterday
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>

              {/* Sales Team Performance Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesTeamPerformance />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpcomingAppointments />
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Low Stock Alerts</CardTitle>
                    <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <LowStockAlerts />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Watches Sold (MTD)</CardTitle>
                    <WatchIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45 units</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +12.5%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sales Value</CardTitle>
                    <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£87,432.21</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +3.2%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.8%</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-rose-500 flex items-center">
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                        -1.1%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +7
                      </span>{" "}
                      from last week
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Team Performance Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesTeamPerformance />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top Selling Models</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Rolex Submariner</span>
                            <span className="text-sm text-muted-foreground">12 units</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Omega Speedmaster</span>
                            <span className="text-sm text-muted-foreground">9 units</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Cartier Santos</span>
                            <span className="text-sm text-muted-foreground">7 units</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "50%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Tudor Black Bay</span>
                            <span className="text-sm text-muted-foreground">6 units</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">TAG Heuer Carrera</span>
                            <span className="text-sm text-muted-foreground">5 units</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                    <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£1,245,780</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +5.2%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Watches</CardTitle>
                    <WatchIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +12
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                    <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-rose-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +3
                      </span>{" "}
                      from last week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2x</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +0.4
                      </span>{" "}
                      from last quarter
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Inventory by Brand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Rolex</span>
                            <span className="text-sm text-muted-foreground">42 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Omega</span>
                            <span className="text-sm text-muted-foreground">28 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "23%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">TAG Heuer</span>
                            <span className="text-sm text-muted-foreground">18 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Cartier</span>
                            <span className="text-sm text-muted-foreground">15 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Tudor</span>
                            <span className="text-sm text-muted-foreground">12 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Others</span>
                            <span className="text-sm text-muted-foreground">9 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LowStockAlerts />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="repairs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Repairs</CardTitle>
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +3
                      </span>{" "}
                      from last week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed (MTD)</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +5
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Repair Time</CardTitle>
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12.4 days</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                        -1.2 days
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Repair Revenue</CardTitle>
                    <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£14,320</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        +8.3%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Repair Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Diagnosis</span>
                            <span className="text-sm text-muted-foreground">5 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: "28%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">In Progress</span>
                            <span className="text-sm text-muted-foreground">8 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-amber-500" style={{ width: "44%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Waiting for Parts</span>
                            <span className="text-sm text-muted-foreground">3 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-orange-500" style={{ width: "17%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Quality Check</span>
                            <span className="text-sm text-muted-foreground">2 watches</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-purple-500" style={{ width: "11%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpcomingAppointments />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

