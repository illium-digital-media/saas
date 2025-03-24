"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, ArrowLeft, Building } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext, type Supplier } from "@/lib/context/app-context"

interface NewSupplierData {
  name: string
  type: string
  email: string
  phone: string
  address: string
  contactPerson: string
  status: string
}

const INITIAL_NEW_SUPPLIER: NewSupplierData = {
  name: "",
  type: "dealer",
  email: "",
  phone: "",
  address: "",
  contactPerson: "",
  status: "active",
}

interface SupplierSelectionModalProps {
  onSelectSupplier: (supplier: Supplier) => void
  buttonLabel?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function SupplierSelectionModal({
  onSelectSupplier,
  buttonLabel = "Select Supplier",
  buttonVariant = "default",
}: SupplierSelectionModalProps) {
  const { suppliers, addSupplier } = useAppContext()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false)
  const [newSupplier, setNewSupplier] = useState<NewSupplierData>(INITIAL_NEW_SUPPLIER)

  // Memoize filtered suppliers to avoid recalculation on every render
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone.includes(searchQuery) ||
        (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = typeFilter === "all" || supplier.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [suppliers, searchQuery, typeFilter])

  const handleSelectSupplier = useCallback(
    (supplier: Supplier) => {
      onSelectSupplier(supplier)
      setOpen(false)
    },
    [onSelectSupplier],
  )

  const handleAddNewSupplier = useCallback(() => {
    setShowNewSupplierForm(true)
  }, [])

  const handleBackToList = useCallback(() => {
    setShowNewSupplierForm(false)
    // Reset the form
    setNewSupplier(INITIAL_NEW_SUPPLIER)
  }, [])

  const handleNewSupplierChange = useCallback((field: keyof NewSupplierData, value: string) => {
    setNewSupplier((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleSaveNewSupplier = useCallback(
    (e: React.MouseEvent) => {
      // Prevent the default form submission
      e.preventDefault()
      e.stopPropagation()

      // Validate required fields
      if (!newSupplier.name || !newSupplier.email || !newSupplier.phone) {
        alert("Please fill in all required fields")
        return
      }

      // Create a new supplier
      const createdSupplier = addSupplier({
        name: newSupplier.name,
        type: newSupplier.type,
        email: newSupplier.email,
        phone: newSupplier.phone,
        address: newSupplier.address,
        contactPerson: newSupplier.contactPerson,
        status: newSupplier.status,
      })

      // Select the new supplier
      onSelectSupplier(createdSupplier)

      // Close the modal
      setOpen(false)

      // Reset the form and view
      setShowNewSupplierForm(false)
      setNewSupplier(INITIAL_NEW_SUPPLIER)
    },
    [newSupplier, addSupplier, onSelectSupplier],
  )

  // Handle dialog open/close
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      // Reset state when closing
      setShowNewSupplierForm(false)
      setNewSupplier(INITIAL_NEW_SUPPLIER)
      setSearchQuery("")
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} type="button">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {!showNewSupplierForm ? (
          <>
            <DialogHeader>
              <DialogTitle>Select Supplier</DialogTitle>
              <DialogDescription>Search for an existing supplier or add a new one.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search suppliers"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-secondary" : ""}
                  type="button"
                  aria-label="Toggle filters"
                  aria-expanded={showFilters}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button onClick={handleAddNewSupplier} type="button">
                  <Plus className="mr-2 h-4 w-4" />
                  New Supplier
                </Button>
              </div>

              {showFilters && (
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="type-filter">Supplier Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger id="type-filter">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="dealer">Dealer</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="auction">Auction House</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="max-h-[300px] overflow-y-auto rounded-md border">
                {filteredSuppliers.length > 0 ? (
                  <div className="divide-y">
                    {filteredSuppliers.map((supplier) => (
                      <div
                        key={supplier.id}
                        className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectSupplier(supplier)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectSupplier(supplier)
                          }
                        }}
                        aria-label={`Select ${supplier.name}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-muted-foreground">{supplier.email}</div>
                            {supplier.contactPerson && (
                              <div className="text-sm text-muted-foreground">Contact: {supplier.contactPerson}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {supplier.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No suppliers found. Try adjusting your search or filters.
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={handleBackToList}
                  type="button"
                  aria-label="Back to supplier list"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>Enter the details of the new supplier.</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="supplier-name"
                    value={newSupplier.name}
                    onChange={(e) => handleNewSupplierChange("name", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-type" className="text-right">
                    Type
                  </Label>
                  <Select value={newSupplier.type} onValueChange={(value) => handleNewSupplierChange("type", value)}>
                    <SelectTrigger id="supplier-type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dealer">Dealer</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="auction">Auction House</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="supplier-email"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => handleNewSupplierChange("email", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="supplier-phone"
                    value={newSupplier.phone}
                    onChange={(e) => handleNewSupplierChange("phone", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-address" className="text-right">
                    Address
                  </Label>
                  <Textarea
                    id="supplier-address"
                    value={newSupplier.address}
                    onChange={(e) => handleNewSupplierChange("address", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-contact" className="text-right">
                    Contact Person
                  </Label>
                  <Input
                    id="supplier-contact"
                    value={newSupplier.contactPerson}
                    onChange={(e) => handleNewSupplierChange("contactPerson", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleBackToList}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSaveNewSupplier}>
                  Save Supplier
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

