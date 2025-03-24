"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Filter, Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for VIP customers
const mockVIPCustomers = Array(15)
  .fill(null)
  .map((_, i) => ({
    id: `vip-${i + 1}`,
    name: [
      "Jane Smith",
      "Richard Williams",
      "Elizabeth Johnson",
      "Thomas Anderson",
      "Margaret Chen",
      "William Davis",
      "Sophia Martinez",
      "Robert Taylor",
      "Olivia Wilson",
      "James Brown",
      "Emma Thompson",
      "Alexander White",
      "Charlotte Harris",
      "Benjamin Clark",
      '  "James Brown',
      "Emma Thompson",
      "Alexander White",
      "Charlotte Harris",
      "Benjamin Clark",
      "Amelia Lewis",
    ][i],
    email: `vip${i + 1}@example.com`,
    phone: `+44 7${Math.floor(100 + Math.random() * 900)} ${Math.floor(100000 + Math.random() * 900000)}`,
    status: ["Platinum", "Gold", "Silver"][Math.floor(Math.random() * 3)],
    lifetimeValue: Math.floor(30000 + Math.random() * 100000),
    lastContact: new Date(2023, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
    assignedTo: ["Emma Thompson", "James Wilson", "Sarah Johnson", "Michael Davis", "Jennifer Roberts"][
      Math.floor(Math.random() * 5)
    ],
    nextFollowup: new Date(2023, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)),
    preferences: [
      ["Patek Philippe", "Cartier"],
      ["Rolex", "Audemars Piguet"],
      ["Richard Mille", "Chopard"],
      ["Franck Muller", "Piaget"],
      ["Breitling", "Tudor"],
    ][Math.floor(Math.random() * 5)],
    notes: [
      "Prefers Patek Philippe and Cartier. Interested in limited editions. Birthday: April 15. Champagne preference: Dom Pérignon. Always looking for investment pieces.",
      "Collector of Rolex sports models. Interested in vintage pieces. Birthday: September 22. Whiskey preference: Macallan. Looking to expand collection with Audemars Piguet.",
      "Focuses on haute horology. Interested in complications. Birthday: July 8. Wine preference: Bordeaux. Attends Basel World annually.",
      "New collector with high budget. Interested in statement pieces. Birthday: December 3. Cognac preference: Hennessy XO. Prefers private viewings.",
      "Third-generation collector. Interested in heritage pieces. Birthday: March 17. Champagne preference: Krug. Particularly interested in minute repeaters.",
    ][Math.floor(Math.random() * 5)],
  }))

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

export function CustomerVIP() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tierFilter, setTierFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const itemsPerPage = 10

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter customers based on search term and filters
  const filteredCustomers = mockVIPCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTier = !tierFilter || customer.status === tierFilter

    const matchesBrand = brandFilter.length === 0 || customer.preferences.some((pref) => brandFilter.includes(pref))

    return matchesSearch && matchesTier && matchesBrand
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Toggle brand filter
  const toggleBrandFilter = (brand: string) => {
    if (brandFilter.includes(brand)) {
      setBrandFilter(brandFilter.filter((b) => b !== brand))
    } else {
      setBrandFilter([...brandFilter, brand])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setTierFilter(null)
    setBrandFilter([])
  }

  // Format currency - safe for SSR
  const formatCurrency = (amount: number) => {
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
  }

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search VIP clients..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {(tierFilter || brandFilter.length > 0) && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1 text-xs">
                    {(tierFilter ? 1 : 0) + (brandFilter.length > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter VIP Clients</SheetTitle>
                <SheetDescription>Narrow down your VIP client list with these filters.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">VIP Tier</h3>
                  <Select value={tierFilter || ""} onValueChange={(value) => setTierFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Tiers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="Platinum">Platinum</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
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
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active filters */}
      {(tierFilter || brandFilter.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {tierFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Tier: {tierFilter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setTierFilter(null)} />
            </Badge>
          )}
          {brandFilter.map((brand) => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              {brand}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrandFilter(brand)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
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
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{customer.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              customer.status === "Platinum" && "bg-amber-50 text-amber-700 hover:bg-amber-50",
                              customer.status === "Gold" && "bg-yellow-50 text-yellow-700 hover:bg-yellow-50",
                              customer.status === "Silver" && "bg-gray-50 text-gray-700 hover:bg-gray-50",
                            )}
                          >
                            {customer.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">Lifetime Value</p>
                        <p className="text-lg font-bold">{formatCurrency(customer.lifetimeValue)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Preferences & Notes</h4>
                    <p className="text-sm text-muted-foreground">{customer.notes}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-muted-foreground">Last Contact</p>
                      <p>{formatRelativeTime(customer.lastContact)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assigned To</p>
                      <p>{customer.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Follow-up</p>
                      <p>{formatDate(customer.nextFollowup)}</p>
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
            <p className="text-sm text-muted-foreground">No VIP clients found matching your filters.</p>
            <Button variant="link" size="sm" onClick={clearFilters}>
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
            {filteredCustomers.length} VIP clients
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
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
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

