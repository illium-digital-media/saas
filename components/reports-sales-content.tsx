"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import { useState } from "react"

export function ReportsSalesContent() {
  const [reportType, setReportType] = useState<string>("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sales</SelectItem>
              <SelectItem value="direct">Direct Sales</SelectItem>
              <SelectItem value="consignment">Consignment Sales</SelectItem>
              <SelectItem value="exchange">Exchange Sales</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker />
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
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£124,750.00</div>
            <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+8.3% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sale Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£4,455.36</div>
            <p className="text-xs text-muted-foreground">+3.8% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-brand">By Brand</TabsTrigger>
          <TabsTrigger value="by-staff">By Staff</TabsTrigger>
          <TabsTrigger value="by-time">By Time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>View sales performance for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/20 flex items-center justify-center text-muted-foreground">
                Sales Chart Visualization
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-brand">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Brand</CardTitle>
              <CardDescription>View sales performance by watch brand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Brand</th>
                      <th className="p-2 text-left font-medium">Units Sold</th>
                      <th className="p-2 text-left font-medium">Total Sales</th>
                      <th className="p-2 text-left font-medium">Avg. Price</th>
                      <th className="p-2 text-left font-medium">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Rolex</td>
                      <td className="p-2">12</td>
                      <td className="p-2">£78,500.00</td>
                      <td className="p-2">£6,541.67</td>
                      <td className="p-2">62.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Omega</td>
                      <td className="p-2">8</td>
                      <td className="p-2">£24,800.00</td>
                      <td className="p-2">£3,100.00</td>
                      <td className="p-2">19.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Tudor</td>
                      <td className="p-2">5</td>
                      <td className="p-2">£12,450.00</td>
                      <td className="p-2">£2,490.00</td>
                      <td className="p-2">10.0%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Cartier</td>
                      <td className="p-2">3</td>
                      <td className="p-2">£9,000.00</td>
                      <td className="p-2">£3,000.00</td>
                      <td className="p-2">7.2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-staff">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Staff</CardTitle>
              <CardDescription>View sales performance by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left font-medium">Staff Member</th>
                      <th className="p-2 text-left font-medium">Units Sold</th>
                      <th className="p-2 text-left font-medium">Total Sales</th>
                      <th className="p-2 text-left font-medium">Avg. Price</th>
                      <th className="p-2 text-left font-medium">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">James Wilson</td>
                      <td className="p-2">10</td>
                      <td className="p-2">£52,300.00</td>
                      <td className="p-2">£5,230.00</td>
                      <td className="p-2">42%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Emma Johnson</td>
                      <td className="p-2">8</td>
                      <td className="p-2">£38,450.00</td>
                      <td className="p-2">£4,806.25</td>
                      <td className="p-2">38%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Michael Chen</td>
                      <td className="p-2">6</td>
                      <td className="p-2">£22,500.00</td>
                      <td className="p-2">£3,750.00</td>
                      <td className="p-2">35%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Sarah Davis</td>
                      <td className="p-2">4</td>
                      <td className="p-2">£11,500.00</td>
                      <td className="p-2">£2,875.00</td>
                      <td className="p-2">30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-time">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Time</CardTitle>
              <CardDescription>View sales performance by time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/20 flex items-center justify-center text-muted-foreground">
                Time-based Sales Chart
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

