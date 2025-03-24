import { Shell } from "@/components/shells/shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { InvoicePreview } from "@/components/invoice-preview"

export function InvoiceGeneratePage() {
  return (
    <Shell>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Generate Invoice</h1>
          <p className="text-muted-foreground">Create and send invoices to your clients</p>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="items">Line Items</TabsTrigger>
            <TabsTrigger value="preview">Preview & Send</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Enter the client details for this invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="Enter client name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Client Email</Label>
                    <Input id="client-email" type="email" placeholder="client@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-address">Client Address</Label>
                  <Textarea id="client-address" placeholder="Enter client address" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input id="invoice-number" placeholder="INV-001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input id="invoice-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save and Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>Add the items you want to include in this invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Description</th>
                        <th className="p-2 text-left font-medium">Quantity</th>
                        <th className="p-2 text-left font-medium">Price</th>
                        <th className="p-2 text-left font-medium">Total</th>
                        <th className="p-2 text-left font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">
                          <Input placeholder="Item description" />
                        </td>
                        <td className="p-2">
                          <Input type="number" placeholder="1" min="1" />
                        </td>
                        <td className="p-2">
                          <Input type="number" placeholder="0.00" min="0" step="0.01" />
                        </td>
                        <td className="p-2">$0.00</td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button variant="outline">+ Add Item</Button>

                <div className="flex justify-end">
                  <div className="w-72 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (0%):</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Back</Button>
                <Button>Save and Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Preview</CardTitle>
                  <CardDescription>Review your invoice before sending</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoicePreview />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2">
                    Download PDF
                  </Button>
                  <Button>Send Invoice</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Send Options</CardTitle>
                  <CardDescription>Configure how to send this invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="send-to">Send To</Label>
                    <Input id="send-to" type="email" placeholder="client@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc">CC</Label>
                    <Input id="cc" type="email" placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Invoice #INV-001 from Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter a message to the client" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Send Invoice</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  )
}

