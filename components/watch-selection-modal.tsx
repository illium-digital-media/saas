"use client"

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
import { Search, Filter } from "lucide-react"
import { useAppContext, type Watch } from "@/lib/context/app-context"

interface WatchSelectionModalProps {
  onSelectWatch: (watch: Watch) => void
  buttonLabel?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  excludeIds?: string[]
}

export function WatchSelectionModal({
  onSelectWatch,
  buttonLabel = "Select Watch",
  buttonVariant = "default",
  excludeIds = [],
}: WatchSelectionModalProps) {
  const { watches } = useAppContext()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique brands for filtering
  const uniqueBrands = useMemo(() => {
    const brands = new Set(watches.map((watch) => watch.brand))
    return Array.from(brands).sort()
  }, [watches])

  // Filter watches
  const filteredWatches = useMemo(() => {
    return watches.filter((watch) => {
      // Exclude watches by ID if specified
      if (excludeIds.includes(watch.id)) return false

      // Search query filter
      const matchesSearch =
        watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        watch.reference.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || watch.status === statusFilter

      // Brand filter
      const matchesBrand = brandFilter === "all" || watch.brand === brandFilter

      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [watches, searchQuery, statusFilter, brandFilter, excludeIds])

  const handleSelectWatch = useCallback(
    (watch: Watch) => {
      onSelectWatch(watch)
      setOpen(false)
    },
    [onSelectWatch],
  )

  // Format price as currency
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} type="button">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Watch</DialogTitle>
          <DialogDescription>Choose a watch from your inventory.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by brand, model, or reference..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search watches"
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
          </div>

          {showFilters && (
            <div className="rounded-md border p-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="On Order">On Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-filter">Brand</Label>
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger id="brand-filter">
                    <SelectValue placeholder="Filter by brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {uniqueBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="max-h-[300px] overflow-y-auto rounded-md border">
            {filteredWatches.length > 0 ? (
              <div className="divide-y">
                {filteredWatches.map((watch) => (
                  <div
                    key={watch.id}
                    className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectWatch(watch)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSelectWatch(watch)
                      }
                    }}
                    aria-label={`Select ${watch.brand} ${watch.model}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        {watch.image ? (
                          <img
                            src={watch.image || "/placeholder.svg"}
                            alt={`${watch.brand} ${watch.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-xs text-center text-muted-foreground">No Image</div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {watch.brand} {watch.model}
                        </div>
                        <div className="text-sm text-muted-foreground">Ref: {watch.reference}</div>
                        <div className="text-sm font-medium">{formatPrice(watch.price)}</div>
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          watch.status === "In Stock"
                            ? "bg-green-50 text-green-700 hover:bg-green-50"
                            : watch.status === "Reserved"
                              ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                              : watch.status === "Sold"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                        }
                      >
                        {watch.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No watches found. Try adjusting your search or filters.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} type="button">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

