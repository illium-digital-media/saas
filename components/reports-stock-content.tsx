"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export function ReportsStockContent() {
  const [stockFilter, setStockFilter] = useState<string>("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="new">New Arrivals</SelectItem>
              <SelectItem value="aged">Aged Inventory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£1,245,800.00</div>
            <p className="text-xs text-muted-foreground">Across 142 watches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Days in Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">-5 days from previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Turnover Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">Annual rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-brand">By Brand</TabsTrigger>
          <TabsTrigger value="by-age">By Age</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>View current inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/20 flex items-center justify-center text-muted-foreground">
                Inventory Overview Chart
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-brand">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Brand</CardTitle>
              <CardDescription>View inventory distribution by brand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Rolex</span>
                    <span>42 units (£580,000)</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Omega</span>
                    <span>35 units (£245,000)</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tudor</span>
                    <span>28 units (£168,000)</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cartier</span>
                    <span>18 units (£126,000)</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">TAG Heuer</span>
                    <span>12 units (£72,000)</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Other</span>
                    <span>7 units (£54,800)</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-age">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Age</CardTitle>
              <CardDescription>View inventory age distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Age</th>
                      <th className="p-2 text-left font-medium">Units</th>
                      <th className="p-2 text-left font-medium">Value</th>
                      <th className="p-2 text-left font-medium">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">0-30 days</td>
                      <td className="p-2">38</td>
                      <td className="p-2">£345,000</td>
                      <td className="p-2">27.7%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">31-60 days</td>
                      <td className="p-2">45</td>
                      <td className="p-2">£412,500</td>
                      <td className="p-2">33.1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">61-90 days</td>
                      <td className="p-2">32</td>
                      <td className="p-2">£285,300</td>
                      <td className="p-2">22.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">91-120 days</td>
                      <td className="p-2">18</td>
                      <td className="p-2">£142,000</td>
                      <td className="p-2">11.4%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">120+ days</td>
                      <td className="p-2">9</td>
                      <td className="p-2">£61,000</td>
                      <td className="p-2">4.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be restocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Watch</th>
                      <th className="p-2 text-left font-medium">Reference</th>
                      <th className="p-2 text-left font-medium">Current Stock</th>
                      <th className="p-2 text-left font-medium">Reorder Level</th>
                      <th className="p-2 text-left font-medium">Last 30 Day Sales</th>
                      <th className="p-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Rolex Submariner</td>
                      <td className="p-2">126610LN</td>
                      <td className="p-2">1</td>
                      <td className="p-2">3</td>
                      <td className="p-2">4</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Critical
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Omega Speedmaster</td>
                      <td className="p-2">310.30.42.50.01.001</td>
                      <td className="p-2">2</td>
                      <td className="p-2">3</td>
                      <td className="p-2">3</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Tudor Black Bay 58</td>
                      <td className="p-2">M79030N-0001</td>
                      <td className="p-2">2</td>
                      <td className="p-2">4</td>
                      <td className="p-2">5</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Critical
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Cartier Santos Medium</td>
                      <td className="p-2">WSSA0010</td>
                      <td className="p-2">2</td>
                      <td className="p-2">2</td>
                      <td className="p-2">1</td>
                      <td className="p-2">
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          Low
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

