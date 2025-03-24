"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export function ReportsCustomersContent() {
  const [customerFilter, setCustomerFilter] = useState<string>("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Select value={customerFilter} onValueChange={setCustomerFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="repeat">Repeat Customers</SelectItem>
              <SelectItem value="vip">VIP Customers</SelectItem>
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
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">428</div>
            <p className="text-xs text-muted-foreground">+24 from previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Purchase Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£4,850.00</div>
            <p className="text-xs text-muted-foreground">+£320 from previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+2% from previous month</p>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="spending">Spending Patterns</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>How customers are finding your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Referrals</span>
                  </div>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Online Search</span>
                  </div>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2 bg-blue-100" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Social Media</span>
                  </div>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <Progress value={18} className="h-2 bg-green-100" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Walk-in</span>
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <Progress value={12} className="h-2 bg-yellow-100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Age and location distribution of your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">18-24</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">25-34</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">35-44</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">45-54</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">55+</span>
                      <span className="text-sm font-medium">11%</span>
                    </div>
                    <Progress value={11} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Patterns</CardTitle>
              <CardDescription>How customers spend at your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Average Purchase by Category</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Watches</span>
                      <span className="text-sm font-medium">£6,250</span>
                    </div>
                    <Progress value={75} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Jewelry</span>
                      <span className="text-sm font-medium">£3,800</span>
                    </div>
                    <Progress value={45} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Repairs</span>
                      <span className="text-sm font-medium">£450</span>
                    </div>
                    <Progress value={15} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accessories</span>
                      <span className="text-sm font-medium">£180</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

