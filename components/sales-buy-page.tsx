"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search } from "lucide-react"

export function SalesBuyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center">
            <SidebarToggle sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`${sidebarOpen ? "ml-4" : "ml-2"} flex items-center`}>
              <h1 className="text-xl font-bold dark:text-primary-foreground">JewellersCRM</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-sidebar border-r transition-all duration-200 ease-in-out`}>
          <MainNav collapsed={!sidebarOpen} />
        </div>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Buy Watches</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Buy Watches</CardTitle>
                <CardDescription>Manage your watch purchasing process here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search suppliers or watches..." className="w-full pl-9" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Purchase
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4 font-medium">Recent Supplier Purchases</div>
                    <div className="divide-y">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className={`h-10 w-10 bg-${["blue", "green", "amber", "purple", "rose"][i]}-100`}>
                                <AvatarFallback
                                  className={`text-${["blue", "green", "amber", "purple", "rose"][i]}-700`}
                                >
                                  {["SWD", "LTL", "PWS", "HWT", "GWE"][i]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {
                                    [
                                      "Swiss Watch Distributors",
                                      "Luxury Timepieces Ltd",
                                      "Precision Watch Supply",
                                      "Heritage Watch Traders",
                                      "Global Watch Exchange",
                                    ][i]
                                  }
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {
                                    [
                                      "Rolex, Omega",
                                      "Patek Philippe, Cartier",
                                      "TAG Heuer, Tudor",
                                      "Audemars Piguet, IWC",
                                      "Breitling, Richard Mille",
                                    ][i]
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                {["Active", "Preferred", "Active", "Active", "Preferred"][i]}
                              </Badge>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Order
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Purchases</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`h-9 w-9 rounded-full bg-${["blue", "green", "amber", "purple"][i]}-100 flex items-center justify-center`}
                                  >
                                    <span
                                      className={`text-${["blue", "green", "amber", "purple"][i]}-700 text-sm font-medium`}
                                    >
                                      #{["1234", "1235", "1236", "1237"][i]}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {
                                        [
                                          "Rolex Submariner",
                                          "Patek Philippe Nautilus",
                                          "Omega Speedmaster",
                                          "Cartier Santos",
                                        ][i]
                                      }
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {["2 weeks ago", "1 month ago", "3 days ago", "1 week ago"][i]}
                                    </div>
                                  </div>
                                </div>
                                <div className="font-medium">{["£8,500", "£35,000", "£4,200", "£6,800"][i]}</div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Supplier Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className={`h-9 w-9 bg-${["blue", "green", "amber", "purple"][i]}-100`}>
                                    <AvatarFallback className={`text-${["blue", "green", "amber", "purple"][i]}-700`}>
                                      {["SWD", "LTL", "PWS", "HWT"][i]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {
                                        [
                                          "Swiss Watch Distributors",
                                          "Luxury Timepieces Ltd",
                                          "Precision Watch Supply",
                                          "Heritage Watch Traders",
                                        ][i]
                                      }
                                    </div>
                                    <div className="flex">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, j) => (
                                          <svg
                                            key={j}
                                            className={`h-4 w-4 ${j < [4, 5, 3, 4][i] ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-none"}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                          </svg>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">
                                  {["32 orders", "18 orders", "24 orders", "15 orders"][i]}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

