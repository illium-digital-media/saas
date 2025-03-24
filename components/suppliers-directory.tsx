"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Mail, Phone, MapPin, User, Eye } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { SupplierProfileModal } from "@/components/supplier-profile-modal"

export function SuppliersDirectory() {
  const { suppliers } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isClient, setIsClient] = useState(false)
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter suppliers based on search term and filters
  const filteredSuppliers = isClient
    ? suppliers.filter((supplier) => {
        const matchesSearch =
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesType = typeFilter === "all" || supplier.type === typeFilter
        const matchesStatus = statusFilter === "all" || supplier.status === statusFilter

        return matchesSearch && matchesType && matchesStatus
      })
    : []

  // Handle view profile click
  const handleViewProfile = (supplierId: string) => {
    setSelectedSupplierId(supplierId)
    setIsProfileModalOpen(true)
  }

  // Handle close profile modal
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedSupplierId(null)
  }

  if (!isClient) {
    return <div>Loading suppliers...</div>
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Suppliers Directory</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Supplier Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="dealer">Dealer</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="service">Service Provider</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="border-b p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                          {supplier.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)}
                      </p>
                    </div>
                    <div className="space-y-2 p-4">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{supplier.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{supplier.phone}</span>
                      </div>
                      {supplier.contactPerson && (
                        <div className="flex items-center text-sm">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{supplier.contactPerson}</span>
                        </div>
                      )}
                      {supplier.address && (
                        <div className="flex items-start text-sm">
                          <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="line-clamp-2">{supplier.address}</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t p-4">
                      <Button variant="outline" className="w-full" onClick={() => handleViewProfile(supplier.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No suppliers found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supplier Profile Modal */}
      <SupplierProfileModal
        supplierId={selectedSupplierId}
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      />
    </>
  )
}

