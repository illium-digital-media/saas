"use client"

import { useAppContext } from "@/lib/context/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DebugCustomersPage() {
  const { customers } = useAppContext()
  const router = useRouter()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Debug Information</CardTitle>
          <CardDescription>Use this page to troubleshoot customer profile issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Customers: {customers.length}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">ID</th>
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Email</th>
                      <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{customer.id}</td>
                        <td className="py-2 px-4">{customer.name}</td>
                        <td className="py-2 px-4">{customer.email}</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/customers/profiles/${customer.id}`)}
                            >
                              Profile
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/customers/${customer.id}`)}
                            >
                              Alt Route
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">URL Format Tests</h3>
              <p className="text-sm text-muted-foreground">
                Click these links to test different URL formats for the first customer
              </p>

              {customers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/customers/profiles/${customers[0].id}`)}
                  >
                    Original ID
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/customers/profiles/cust-${customers[0].id.replace(/\D/g, "")}`)}
                  >
                    cust-ID Format
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/customers/${customers[0].id}`)}>
                    /customers/ID
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

