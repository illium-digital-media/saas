"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Filter, Search, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Types for customer data
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: string
  customerSince: Date
  totalPurchases: number
  lastPurchase: Date
  preferences: string[]
  createdAt: Date
  address?: string
}

interface NewCustomerFormData {
  name: string
  email: string
  phone: string
  address: string
  status: string
  preferences: string[]
}

// Mock data for customers
const mockCustomers: Customer[] = Array(25)
  .fill(null)
  .map((_, i) => ({
    id: `cust-${i + 1}`,
    name: [
      "John Doe",
      "Jane Smith",
      "Robert Johnson",
      "Emily Davis",
      "Michael Brown",
      "Sarah Wilson",
      "David Taylor",
      "Lisa Anderson",
      "James Martinez",
      "Jennifer Thomas",
      "Richard White",
      "Mary Garcia",
      "Charles Harris",
      "Patricia Lewis",
      "Daniel Clark",
      "Nancy Walker",
      "Paul Hall",
      "Karen Young",
      "Mark Allen",
      "Betty King",
      "Donald Wright",
      "Susan Scott",
      "Jason Green",
      "Margaret Baker",
      "Kevin Nelson",
    ][i],
    email: `customer${i + 1}@example.com`,
    phone: `+44 7${Math.floor(100 + Math.random() * 900)} ${Math.floor(100000 + Math.random() * 900000)}`,
    status: ["Active", "Active", "Active", "Inactive", "VIP"][Math.floor(Math.random() * 5)],
    customerSince: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(1 + Math.random() * 28),
    ),
    totalPurchases: Math.floor(1000 + Math.random() * 100000),
    lastPurchase: new Date(2023, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
    preferences: [
      ["Rolex", "Omega"],
      ["Patek Philippe", "Cartier"],
      ["TAG Heuer", "Tudor"],
      ["Audemars Piguet", "IWC"],
      ["Breitling", "Richard Mille"],
    ][Math.floor(Math.random() * 5)],
    createdAt: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(1 + Math.random() * 28),
    ),
  }))
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

// Watch brands for filtering - updated to include only specified luxury brands
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

const INITIAL_NEW_CUSTOMER: NewCustomerFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "active",
  preferences: [],
}

export function CustomerProfiles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [newCustomer, setNewCustomer] = useState<NewCustomerFormData>(INITIAL_NEW_CUSTOMER)

  const itemsPerPage = 10

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter customers based on search term and filters - memoized to avoid recalculation
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = !statusFilter || customer.status === statusFilter

      const matchesBrand = brandFilter.length === 0 || customer.preferences.some((pref) => brandFilter.includes(pref))

      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [customers, searchTerm, statusFilter, brandFilter])

  // Calculate pagination values - memoized
  const { totalPages, startIndex, paginatedCustomers } = useMemo(() => {
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

    return { totalPages, startIndex, paginatedCustomers }
  }, [filteredCustomers, currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, brandFilter])

  // Handle page change
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages],
  )

  // Toggle brand filter
  const toggleBrandFilter = useCallback((brand: string) => {
    setBrandFilter((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand)
      } else {
        return [...prev, brand]
      }
    })
  }, [])

  // Handle new customer form changes
  const handleNewCustomerChange = useCallback((field: keyof NewCustomerFormData, value: string | string[]) => {
    setNewCustomer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Toggle preference in new customer form
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

  // Handle save new customer
  const handleSaveNewCustomer = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      // Validate required fields
      if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
        alert("Please fill in all required fields")
        return
      }

      // Create a new customer object
      const newCustomerId = `cust-${customers.length + 1}`
      const currentDate = new Date()

      const customerToAdd: Customer = {
        id: newCustomerId,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
        status: newCustomer.status,
        preferences: newCustomer.preferences,
        customerSince: currentDate,
        totalPurchases: 0,
        lastPurchase: currentDate,
        createdAt: currentDate,
      }

      // Add the new customer to the list
      setCustomers((prev) => [customerToAdd, ...prev])

      // Close the dialog and reset the form
      setIsAddCustomerOpen(false)
      setNewCustomer(INITIAL_NEW_CUSTOMER)
    },
    [customers, newCustomer],
  )

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setStatusFilter(null)
    setBrandFilter([])
  }, [])

  // Format date to readable string
  const formatDate = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      month: "long",
      year: "numeric",
    }).format(date)
  }, [])

  // Format currency - safe for SSR
  const formatCurrency = useCallback(
    (amount: number) => {
      if (!isClient) {
        return `£${amount.toLocaleString()}`
      }

      try {
        return new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          maximumFractionDigits: 0,
        }).format(amount)
      } catch (error) {
        return `£${amount.toLocaleString()}`
      }
    },
    [isClient],
  )

  // Format relative time
  const formatRelativeTime = useCallback((date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }, [])

  // Handle dialog close - reset form
  const handleDialogOpenChange = useCallback((open: boolean) => {
    setIsAddCustomerOpen(open)
    if (!open) {
      setNewCustomer(INITIAL_NEW_CUSTOMER)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search customers"
          />
        </div>
        <div className="flex gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2" aria-label="Filter customers">
                <Filter className="h-4 w-4" />
                Filter
                {(statusFilter || brandFilter.length > 0) && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1 text-xs">
                    {(statusFilter ? 1 : 0) + (brandFilter.length > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Customers</SheetTitle>
                <SheetDescription>Narrow down your customer list with these filters.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Customer Status</h3>
                  <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Watch Preferences</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {watchBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={brandFilter.includes(brand)}
                          onCheckedChange={() => toggleBrandFilter(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearFilters} type="button">
                    Clear Filters
                  </Button>
                  <Button size="sm" onClick={() => setIsFilterOpen(false)} type="button">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog open={isAddCustomerOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2" type="button" aria-label="Add new customer">
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>Enter the customer details below to create a new profile.</DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="customer-name"
                      className="col-span-3"
                      value={newCustomer.name}
                      onChange={(e) => handleNewCustomerChange("name", e.target.value)}
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
                      className="col-span-3"
                      value={newCustomer.email}
                      onChange={(e) => handleNewCustomerChange("email", e.target.value)}
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
                      type="tel"
                      className="col-span-3"
                      value={newCustomer.phone}
                      onChange={(e) => handleNewCustomerChange("phone", e.target.value)}
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
                      className="col-span-3"
                      value={newCustomer.address}
                      onChange={(e) => handleNewCustomerChange("address", e.target.value)}
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
                    <Label htmlFor="customer-preferences" className="text-right">
                      Preferences
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="customer-preferences"
                            variant="outline"
                            className="w-full justify-start"
                            type="button"
                          >
                            {newCustomer.preferences.length > 0
                              ? `${newCustomer.preferences.length} brand${newCustomer.preferences.length > 1 ? "s" : ""} selected`
                              : "Select watch preferences"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-0" align="start">
                          <div className="p-2 max-h-[300px] overflow-y-auto">
                            {watchBrands.map((brand) => (
                              <div key={brand} className="flex items-center space-x-2 p-1">
                                <Checkbox
                                  id={`pref-${brand}`}
                                  checked={newCustomer.preferences.includes(brand)}
                                  onCheckedChange={() => togglePreference(brand)}
                                />
                                <Label htmlFor={`pref-${brand}`} className="text-sm">
                                  {brand}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSaveNewCustomer}>
                    Create Customer
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active filters */}
      {(statusFilter || brandFilter.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {statusFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {statusFilter}
              <button
                onClick={() => setStatusFilter(null)}
                className="ml-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full"
                aria-label={`Remove ${statusFilter} filter`}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </button>
            </Badge>
          )}
          {brandFilter.map((brand) => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              {brand}
              <button
                onClick={() => toggleBrandFilter(brand)}
                className="ml-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full"
                aria-label={`Remove ${brand} filter`}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters} type="button">
            Clear all
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {paginatedCustomers.length > 0 ? (
          paginatedCustomers.map((customer) => (
            <Card key={customer.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="rounded-lg p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{customer.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{customer.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                      <Badge
                        variant="outline"
                        className={cn(
                          customer.status === "VIP" && "bg-amber-50 text-amber-700 hover:bg-amber-50",
                          customer.status === "Active" && "bg-green-50 text-green-700 hover:bg-green-50",
                          customer.status === "Inactive" && "bg-gray-50 text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        {customer.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/customers/profiles/${customer.id}`}>View Profile</Link>
                        </Button>
                        <Button variant="outline" size="sm" type="button">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-4">
                    <div>
                      <p className="text-muted-foreground">Customer Since</p>
                      <p>{formatDate(customer.customerSince)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Purchases</p>
                      <p>{formatCurrency(customer.totalPurchases)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Purchase</p>
                      <p>{formatRelativeTime(customer.lastPurchase)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preferences</p>
                      <p>{customer.preferences.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">No customers found matching your filters.</p>
            <Button variant="link" size="sm" onClick={clearFilters} type="button">
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
          </p>
          <nav aria-label="Pagination">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1),
                )
                .map((page, i, array) => {
                  // Add ellipsis
                  if (i > 0 && array[i - 1] !== page - 1) {
                    return (
                      <span key={`ellipsis-${page}`} className="flex h-8 w-8 items-center justify-center text-sm">
                        ...
                      </span>
                    )
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => goToPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  )
                })}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

