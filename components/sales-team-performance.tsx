"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Award, TrendingUp, Watch } from "lucide-react"

// Import the getAvatarColor function
import { getAvatarColor } from "@/lib/utils"

// Sample data for sales team members - updated to focus on watch count targets
const salesTeamData = [
  {
    id: 1,
    name: "Emma Thompson",
    initials: "ET",
    role: "Senior Sales Consultant",
    salesAmount: 87500,
    watchesSold: 12,
    watchTarget: 15,
    watchPercentage: 80,
    conversion: 68,
    trend: "+3",
    isTopPerformer: true,
  },
  {
    id: 2,
    name: "James Wilson",
    initials: "JW",
    role: "Sales Consultant",
    salesAmount: 65200,
    watchesSold: 9,
    watchTarget: 12,
    watchPercentage: 75,
    conversion: 62,
    trend: "+2",
    isTopPerformer: false,
  },
  {
    id: 3,
    name: "Sarah Chen",
    initials: "SC",
    role: "Sales Consultant",
    salesAmount: 72800,
    watchesSold: 10,
    watchTarget: 11,
    watchPercentage: 91,
    conversion: 71,
    trend: "+4",
    isTopPerformer: true,
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    initials: "MR",
    role: "Junior Sales Consultant",
    salesAmount: 42500,
    watchesSold: 6,
    watchTarget: 9,
    watchPercentage: 67,
    conversion: 55,
    trend: "+1",
    isTopPerformer: false,
  },
  {
    id: 5,
    name: "Olivia Parker",
    initials: "OP",
    role: "Sales Consultant",
    salesAmount: 58900,
    watchesSold: 8,
    watchTarget: 11,
    watchPercentage: 73,
    conversion: 59,
    trend: "+2",
    isTopPerformer: false,
  },
]

// Remove the local getAvatarColor function and use the imported one instead
export function SalesTeamPerformance() {
  // Calculate team totals
  const totalWatchesSold = salesTeamData.reduce((sum, member) => sum + member.watchesSold, 0)
  const totalWatchTarget = salesTeamData.reduce((sum, member) => sum + member.watchTarget, 0)
  const teamWatchPercentage = (totalWatchesSold / totalWatchTarget) * 100

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Performance</TabsTrigger>
          <TabsTrigger value="targets">Targets & Goals</TabsTrigger>
        </TabsList>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Detailed Reports
        </Button>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Watches Sold</p>
                  <p className="text-2xl font-bold">{totalWatchesSold} units</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Watch className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Monthly Target: {totalWatchTarget} units</span>
                  <span className="font-medium">{teamWatchPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={teamWatchPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Conversion Rate</p>
                  <p className="text-2xl font-bold">63%</p>
                </div>
                <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Target: 60%</span>
                  <span className="font-medium text-green-500">+3%</span>
                </div>
                <Progress value={63} className="h-2 bg-muted [&>div]:bg-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Performer</p>
                  <p className="text-lg font-bold">Sarah Chen</p>
                </div>
                <div className="rounded-full bg-amber-500/10 p-2 text-amber-500">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Target Achievement</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2 bg-muted [&>div]:bg-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-md border">
          <div className="p-4 bg-muted/40">
            <h3 className="text-sm font-medium">Sales Team Members</h3>
          </div>
          <div className="divide-y">
            {salesTeamData.map((member) => (
              <div key={member.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Column 1: Team Member Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-10 w-10 shrink-0 ${getAvatarColor(member.initials)}`}>
                      <AvatarFallback className="text-white">{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium">{member.name}</p>
                        {member.isTopPerformer && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            Top Performer
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>

                  {/* Column 2: Target Progress */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Watch Sales Target</p>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Target: {member.watchTarget} watches</span>
                      <span>{member.watchPercentage}%</span>
                    </div>
                    <Progress value={member.watchPercentage} className="h-2" />
                  </div>

                  {/* Column 3: Watches Sold */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Watches Sold</p>
                    <p className="text-sm font-medium">{member.watchesSold} watches</p>
                    <p className="text-xs text-muted-foreground">£{member.salesAmount.toLocaleString()} in sales</p>
                  </div>

                  {/* Column 4: Conversion Rate */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Conversion Rate</p>
                    <p className="text-sm font-medium">{member.conversion}% conversion</p>
                    <p className="text-xs text-emerald-500">{member.trend} watches this month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="individual" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {salesTeamData.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className={`h-12 w-12 ${getAvatarColor(member.initials)}`}>
                    <AvatarFallback className="text-white">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      {member.isTopPerformer && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          <Award className="mr-1 h-3 w-3" />
                          Top Performer
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 grid gap-3">
                      <div className="w-full">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Watch Sales Target</span>
                          <span className="font-medium">{member.watchPercentage}%</span>
                        </div>
                        <Progress value={member.watchPercentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs mt-1 text-muted-foreground">
                          <span>{member.watchesSold} watches sold</span>
                          <span>Target: {member.watchTarget} watches</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Total Sales Value</p>
                          <p className="text-sm font-medium">£{member.salesAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Conversion Rate</p>
                          <p className="text-sm font-medium">{member.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg. Sale Value</p>
                          <p className="text-sm font-medium">
                            £
                            {(member.salesAmount / member.watchesSold).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Trend</p>
                          <p className="text-sm font-medium text-emerald-500">+{member.trend} watches</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="targets" className="space-y-4">
        <div className="rounded-md border">
          <div className="p-4 bg-muted/40">
            <h3 className="text-sm font-medium">Monthly Watch Sales Targets</h3>
          </div>
          <div className="divide-y">
            {salesTeamData.map((member) => (
              <div key={member.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Team Member Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-10 w-10 shrink-0 ${getAvatarColor(member.initials)}`}>
                      <AvatarFallback className="text-white">{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>

                  {/* Column 2: Target Progress */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Target Progress</p>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Progress: {member.watchesSold} watches</span>
                      <span>Target: {member.watchTarget} watches</span>
                    </div>
                    <Progress value={member.watchPercentage} className="h-2" />
                    <p className="text-xs text-right mt-1 text-muted-foreground">
                      {member.watchPercentage}% of monthly target
                    </p>
                  </div>

                  {/* Column 3: Remaining Amount */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Remaining to Target</p>
                    <p className="text-sm font-medium">{member.watchTarget - member.watchesSold} watches</p>
                    <p className="text-xs text-muted-foreground">remaining to target</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center h-full py-4">
                <div className="text-4xl font-bold text-primary">{totalWatchTarget}</div>
                <p className="text-sm text-muted-foreground mt-1">Team Monthly Target (Watches)</p>
                <Progress value={teamWatchPercentage} className="h-2 w-full mt-4" />
                <p className="text-sm mt-2">
                  <span className="font-medium">{teamWatchPercentage.toFixed(1)}%</span> achieved
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center h-full py-4">
                <div className="text-4xl font-bold text-green-500">{totalWatchesSold}</div>
                <p className="text-sm text-muted-foreground mt-1">Watches Sold This Month</p>
                <Progress value={teamWatchPercentage} className="h-2 w-full mt-4 bg-muted [&>div]:bg-green-500" />
                <p className="text-sm mt-2">
                  <span className="font-medium">{teamWatchPercentage.toFixed(1)}%</span> of monthly goal
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center h-full py-4">
                <div className="text-4xl font-bold text-amber-500">63%</div>
                <p className="text-sm text-muted-foreground mt-1">Average Conversion Rate</p>
                <Progress value={105} className="h-2 w-full mt-4 bg-muted [&>div]:bg-amber-500" />
                <p className="text-sm mt-2">
                  <span className="font-medium">105%</span> of target rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

