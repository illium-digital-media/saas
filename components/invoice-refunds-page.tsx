import { Shell } from "@/components/shells/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, RefreshCcw } from "lucide-react"

export function InvoiceRefundsPage() {
  return (
    <Shell>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Process Refunds</h1>
          <p className="text-muted-foreground">Manage and process customer refunds</p>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="new">New Requests</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="denied">Denied</TabsTrigger>
          </TabsList>

          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search refunds..." className="w-full pl-8" />
              </div>
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>New Refund Requests</CardTitle>
                <CardDescription>Review and process new refund requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Request ID</th>
                        <th className="p-3 text-left font-medium">Invoice #</th>
                        <th className="p-3 text-left font-medium">Client</th>
                        <th className="p-3 text-left font-medium">Amount</th>
                        <th className="p-3 text-left font-medium">Date Requested</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">REF-001</td>
                        <td className="p-3">INV-005</td>
                        <td className="p-3">Acme Inc.</td>
                        <td className="p-3">$350.00</td>
                        <td className="p-3">Mar 22, 2023</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Review
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                            >
                              Deny
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">REF-002</td>
                        <td className="p-3">INV-008</td>
                        <td className="p-3">Globex Corp</td>
                        <td className="p-3">$1,200.00</td>
                        <td className="p-3">Mar 23, 2023</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Review
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                            >
                              Deny
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

          <TabsContent value="processing">
            <Card>
              <CardHeader>
                <CardTitle>Processing Refunds</CardTitle>
                <CardDescription>Refunds that are currently being processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Request ID</th>
                        <th className="p-3 text-left font-medium">Invoice #</th>
                        <th className="p-3 text-left font-medium">Client</th>
                        <th className="p-3 text-left font-medium">Amount</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3">REF-003</td>
                        <td className="p-3">INV-012</td>
                        <td className="p-3">Initech LLC</td>
                        <td className="p-3">$750.00</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                          >
                            Processing
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              Update
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

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Refunds</CardTitle>
                <CardDescription>Successfully processed refunds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Request ID</th>
                        <th className="p-3 text-left font-medium">Invoice #</th>
                        <th className="p-3 text-left font-medium">Client</th>
                        <th className="p-3 text-left font-medium">Amount</th>
                        <th className="p-3 text-left font-medium">Completed Date</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3">REF-004</td>
                        <td className="p-3">INV-010</td>
                        <td className="p-3">Acme Inc.</td>
                        <td className="p-3">$500.00</td>
                        <td className="p-3">Mar 18, 2023</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Receipt
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

          <TabsContent value="denied">
            <Card>
              <CardHeader>
                <CardTitle>Denied Refunds</CardTitle>
                <CardDescription>Refund requests that were denied</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Request ID</th>
                        <th className="p-3 text-left font-medium">Invoice #</th>
                        <th className="p-3 text-left font-medium">Client</th>
                        <th className="p-3 text-left font-medium">Amount</th>
                        <th className="p-3 text-left font-medium">Reason</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3">REF-005</td>
                        <td className="p-3">INV-015</td>
                        <td className="p-3">Globex Corp</td>
                        <td className="p-3">$2,500.00</td>
                        <td className="p-3">Outside refund window</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Details
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
        </Tabs>
      </div>
    </Shell>
  )
}

