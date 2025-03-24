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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext, type Customer } from "@/lib/context/app-context"

interface NewCustomerData {
  name: string
  email: string
  phone: string
  address: string
  notes: string
  status: string
  preferences: string[]
}

const INITIAL_NEW_CUSTOMER: NewCustomerData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
  status: "active",
  preferences: [],
}

// Watch brands for preferences
const watchBrands = [
  "Audemars Piguet",
  "Breitling",
  "Cartier",
  "Chanel",
  "Chopard",
  "Franck Muller",
  "IWC",
  "Omega",
  "Panerai",
  "Patek Philippe",
  "Piaget",
  "Richard Mille",
  "Rolex",
  "TAG Heuer",
  "Tudor",
  "Ulysse Nardin",
]

interface CustomerSelectionModalProps {
  onSelectCustomer: (customer: Customer) => void
  buttonLabel?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function CustomerSelectionModal({
  onSelectCustomer,
  buttonLabel = "Select Customer",
  buttonVariant = "default",
}: CustomerSelectionModalProps) {
  const { customers, addCustomer } = useAppContext()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState<NewCustomerData>(INITIAL_NEW_CUSTOMER)

  // Memoize filtered customers to avoid recalculation on every render
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)

      const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [customers, searchQuery, statusFilter])

  const handleSelectCustomer = useCallback(
    (customer: Customer) => {
      onSelectCustomer(customer)
      setOpen(false)
    },
    [onSelectCustomer],
  )

  const handleAddNewCustomer = useCallback(() => {
    setShowNewCustomerForm(true)
  }, [])

  const handleBackToList = useCallback(() => {
    setShowNewCustomerForm(false)
    // Reset the form
    setNewCustomer(INITIAL_NEW_CUSTOMER)
  }, [])

  const handleNewCustomerChange = useCallback((field: keyof NewCustomerData, value: string | string[]) => {
    setNewCustomer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const togglePreference = useCallback((brand: string) => {
    setNewCustomer((prev) => {
      const updatedPreferences = [...prev.preferences]
      const index = updatedPreferences.indexOf(brand)

      if (index > -1) {
        updatedPreferences.splice(index, 1)
      } else {
        updatedPreferences.push(brand)
      }

      return {
        ...prev,
        preferences: updatedPreferences,
      }
    })
  }, [])

  const handleSaveNewCustomer = useCallback(
    (e: React.MouseEvent) => {
      // Prevent the default form submission
      e.preventDefault()
      e.stopPropagation()

      // Validate required fields
      if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
        alert("Please fill in all required fields")
        return
      }

      // Create a new customer
      const createdCustomer = addCustomer({
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
        notes: newCustomer.notes,
        status: newCustomer.status,
        preferences: newCustomer.preferences,
      })

      // Select the new customer
      onSelectCustomer(createdCustomer)

      // Close the modal
      setOpen(false)

      // Reset the form and view
      setShowNewCustomerForm(false)
      setNewCustomer(INITIAL_NEW_CUSTOMER)
    },
    [newCustomer, addCustomer, onSelectCustomer],
  )

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  // Handle dialog open/close
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      // Reset state when closing
      setShowNewCustomerForm(false)
      setNewCustomer(INITIAL_NEW_CUSTOMER)
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
        {!showNewCustomerForm ? (
          <>
            <DialogHeader>
              <DialogTitle>Select Customer</DialogTitle>
              <DialogDescription>Search for an existing customer or add a new one.</DialogDescription>
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
                    aria-label="Search customers"
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
                <Button onClick={handleAddNewCustomer} type="button">
                  <Plus className="mr-2 h-4 w-4" />
                  New Customer
                </Button>
              </div>

              {showFilters && (
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="status-filter">Customer Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="max-h-[300px] overflow-y-auto rounded-md border">
                {filteredCustomers.length > 0 ? (
                  <div className="divide-y">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectCustomer(customer)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectCustomer(customer)
                          }
                        }}
                        aria-label={`Select ${customer.name}`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-right">
                            <div>{formatCurrency(customer.totalSpent)}</div>
                            <div className="text-muted-foreground">
                              Last: {new Date(customer.lastPurchase).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              customer.status.toLowerCase() === "vip"
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                                : customer.status.toLowerCase() === "active"
                                  ? "bg-green-50 text-green-700 hover:bg-green-50"
                                  : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                            }
                          >
                            {customer.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No customers found. Try adjusting your search or filters.
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
                  aria-label="Back to customer list"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Enter the details of the new customer.</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="customer-name"
                    value={newCustomer.name}
                    onChange={(e) => handleNewCustomerChange("name", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="customer-email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => handleNewCustomerChange("email", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="customer-phone"
                    value={newCustomer.phone}
                    onChange={(e) => handleNewCustomerChange("phone", e.target.value)}
                    className="col-span-3"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-address" className="text-right">
                    Address
                  </Label>
                  <Textarea
                    id="customer-address"
                    value={newCustomer.address}
                    onChange={(e) => handleNewCustomerChange("address", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newCustomer.status}
                    onValueChange={(value) => handleNewCustomerChange("status", value)}
                  >
                    <SelectTrigger id="customer-status" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer-notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="customer-notes"
                    value={newCustomer.notes}
                    onChange={(e) => handleNewCustomerChange("notes", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleBackToList}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSaveNewCustomer}>
                  Save Customer
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

