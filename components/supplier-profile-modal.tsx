"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"
import { EditSupplierProfileModal } from "@/components/edit-supplier-profile-modal"
import { SupplierOrderHistory } from "@/components/supplier-order-history"
import { Mail, Phone, MapPin, User, Building, Tag, Clock, Edit, Trash, FileText } from "lucide-react"

interface SupplierProfileModalProps {
  supplierId: string | null
  isOpen: boolean
  onClose: () => void
}

export function SupplierProfileModal({ supplierId, isOpen, onClose }: SupplierProfileModalProps) {
  const { suppliers, getSupplierById, deleteSupplier } = useAppContext()
  const [supplier, setSupplier] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  // Fetch supplier data when supplierId changes
  useEffect(() => {
    if (supplierId) {
      setLoading(true)
      setError(null)
      try {
        const supplierData = getSupplierById(supplierId)
        if (supplierData) {
          setSupplier(supplierData)
        } else {
          setError(`Supplier with ID ${supplierId} not found`)
        }
      } catch (err) {
        setError("Error loading supplier data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    } else {
      setSupplier(null)
    }
  }, [supplierId, getSupplierById, suppliers])

  // Handle supplier deletion
  const handleDeleteSupplier = () => {
    if (!supplier) return

    if (window.confirm("Are you sure you want to delete this supplier? This action cannot be undone.")) {
      try {
        deleteSupplier(supplier.id)
        toast({
          title: "Supplier deleted",
          description: "The supplier has been successfully deleted.",
        })
        onClose()
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-sm text-muted-foreground">Loading supplier information...</p>
            </div>
          ) : error || !supplier ? (
            <div className="py-8 text-center">
              <p className="text-red-500">{error || "Supplier not found"}</p>
              <Button variant="outline" className="mt-4" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{supplier.name}</DialogTitle>
                  <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                    {supplier.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)} Supplier
                </p>
              </DialogHeader>

              <div className="mt-4">
                <Tabs defaultValue="profile">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
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
                  <TabsContent value="orders" className="mt-4">
                    <SupplierOrderHistory supplierId={supplier.id} />
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value="notes" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
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
                                Meeting on 15 June 2023: Discussed new product lines for Q4. {supplier.name} will be
                                introducing a new range of limited edition pieces in September. Follow up with{" "}
                                {supplier.contactPerson || "contact person"} in August for pre-order details.
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

              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleDeleteSupplier}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Supplier Modal */}
      {supplier && (
        <EditSupplierProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          supplier={supplier}
        />
      )}
    </>
  )
}

