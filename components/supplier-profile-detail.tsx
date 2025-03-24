"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"
import { EditSupplierProfileModal } from "@/components/edit-supplier-profile-modal"
import { SupplierOrderHistory } from "@/components/supplier-order-history"
import { FileText, Mail, Phone, MapPin, User, Building, Tag, Clock, ArrowLeft, Edit, Trash } from "lucide-react"

export function SupplierProfileDetail({ id }: { id: string }) {
  const { suppliers, getSupplierById, deleteSupplier } = useAppContext()
  const [supplier, setSupplier] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Fetch supplier data
  useEffect(() => {
    try {
      const supplierData = getSupplierById(id)
      if (supplierData) {
        setSupplier(supplierData)
      } else {
        setError(`Supplier with ID ${id} not found`)
      }
    } catch (err) {
      setError("Error loading supplier data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [id, getSupplierById, suppliers])

  // Handle supplier deletion
  const handleDeleteSupplier = () => {
    if (window.confirm("Are you sure you want to delete this supplier? This action cannot be undone.")) {
      try {
        deleteSupplier(id)
        toast({
          title: "Supplier deleted",
          description: "The supplier has been successfully deleted.",
        })
        router.push("/suppliers/directory")
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to delete supplier. Please try again.",
          variant: "destructive",
        })
        console.error(err)
      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="mt-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="h-6 w-48 animate-pulse rounded bg-muted"></CardTitle>
              <CardDescription className="h-4 w-32 animate-pulse rounded bg-muted"></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !supplier) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Could not load supplier profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error || "Supplier not found"}</p>
            <div className="mt-4">
              <Button onClick={() => router.push("/suppliers/directory")}>Return to Suppliers Directory</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDeleteSupplier}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.type} Supplier</CardDescription>
                  </div>
                  <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                    {supplier.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{supplier.phone}</span>
                    </div>
                    {supplier.address && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span>{supplier.address}</span>
                      </div>
                    )}
                    {supplier.contactPerson && (
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span>Contact: {supplier.contactPerson}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <span>Type: {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <span>ID: {supplier.id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>Status: {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Products & Services</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Luxury Watches</Badge>
                    <Badge variant="outline">Watch Parts</Badge>
                    <Badge variant="outline">Watch Accessories</Badge>
                    <Badge variant="outline">Display Items</Badge>
                    <Badge variant="outline">Packaging</Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Payment Terms</h3>
                  <p className="text-muted-foreground">Net 30 days, 2% discount for early payment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <SupplierOrderHistory />
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Documents</CardTitle>
                <CardDescription>Important information and files related to this supplier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-medium">Supplier Agreement</h3>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-blue-600 hover:underline">supplier_agreement_2023.pdf</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium">Meeting Notes</h3>
                    <div className="rounded-md border p-4">
                      <p className="text-sm text-muted-foreground">
                        Meeting on 15 June 2023: Discussed new product lines for Q4. {supplier.name} will be introducing
                        a new range of limited edition pieces in September. Follow up with {supplier.contactPerson} in
                        August for pre-order details.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium">Price List</h3>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-blue-600 hover:underline">price_list_q3_2023.xlsx</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button>Add New Note</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Supplier Modal */}
      <EditSupplierProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        supplier={supplier}
      />
    </div>
  )
}

