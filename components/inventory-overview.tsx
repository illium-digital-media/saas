"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListFilter, Download, Search, X } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { watchData } from "@/lib/data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Add these imports at the top of the file
import { InventoryItemViewModal } from "./inventory-item-view-modal"
import { InventoryItemEditModal } from "./inventory-item-edit-modal"
import { InventoryItemDeleteDialog } from "./inventory-item-delete-dialog"

// Add this before the component
declare global {
  interface Window {
    viewItem?: (item: any) => void
    editItem?: (item: any) => void
    deleteItem?: (item: any) => void
  }
}

export function InventoryOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filter states
  const [brandFilter, setBrandFilter] = useState<string[]>([])
  const [modelFilter, setModelFilter] = useState("")
  const [yearFilter, setYearFilter] = useState<[number, number]>([2000, 2023])
  const [conditionFilter, setConditionFilter] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [boxPapersFilter, setBoxPapersFilter] = useState<boolean | undefined>(undefined)

  // Add these state variables at the beginning of the component function
  const [inventoryItems, setInventoryItems] = useState(watchData)
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Add this after the state declarations
  useEffect(() => {
    // Define global handlers for the action buttons
    window.viewItem = (item) => {
      setSelectedItem(item)
      setViewModalOpen(true)
    }

    window.editItem = (item) => {
      setSelectedItem(item)
      setEditModalOpen(true)
    }

    window.deleteItem = (item) => {
      setSelectedItem(item)
      setDeleteDialogOpen(true)
    }

    // Cleanup
    return () => {
      window.viewItem = undefined
      window.editItem = undefined
      window.deleteItem = undefined
    }
  }, [])

  // Get unique values for filters
  const brands = Array.from(new Set(watchData.map((watch) => watch.brand)))
  const conditions = ["New", "Excellent", "Very Good", "Good", "Fair", "Poor"]

  const handleAddFilter = (type: string, value: string) => {
    if (!activeFilters.includes(`${type}:${value}`)) {
      setActiveFilters([...activeFilters, `${type}:${value}`])
    }
  }

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Reset the corresponding filter state
    const [type, value] = filter.split(":")
    if (type === "brand") {
      setBrandFilter(brandFilter.filter((b) => b !== value))
    } else if (type === "condition") {
      setConditionFilter(conditionFilter.filter((c) => c !== value))
    } else if (type === "model") {
      setModelFilter("")
    } else if (type === "box-papers") {
      setBoxPapersFilter(undefined)
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setBrandFilter([])
    setModelFilter("")
    setYearFilter([2000, 2023])
    setConditionFilter([])
    setPriceRange([0, 100000])
    setBoxPapersFilter(undefined)
  }

  // Apply filters to data
  const filteredData = watchData.filter((watch) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.reference.toLowerCase().includes(searchQuery.toLowerCase())

    // Brand filter
    const matchesBrand = brandFilter.length === 0 || brandFilter.includes(watch.brand)

    // Model filter
    const matchesModel = modelFilter === "" || watch.model.toLowerCase().includes(modelFilter.toLowerCase())

    // Year filter
    const watchYear = watch.year ? Number.parseInt(watch.year) : null
    const matchesYear = watchYear === null || (watchYear >= yearFilter[0] && watchYear <= yearFilter[1])

    // Condition filter
    const matchesCondition = conditionFilter.length === 0 || conditionFilter.includes(watch.condition)

    // Price filter
    const watchPrice =
      typeof watch.price === "string" ? Number.parseFloat(watch.price.replace(/[^0-9.]/g, "")) : watch.price

    const matchesPrice = watchPrice >= priceRange[0] && watchPrice <= priceRange[1]

    // Box & Papers filter
    const matchesBoxPapers =
      boxPapersFilter === undefined || (watch.boxPapers !== undefined && watch.boxPapers === boxPapersFilter)

    return (
      matchesSearch &&
      matchesBrand &&
      matchesModel &&
      matchesYear &&
      matchesCondition &&
      matchesPrice &&
      matchesBoxPapers
    )
  })

  // Mock function to simulate updating inventory items

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Watches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Across all brands and models</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£1,245,780</div>
            <p className="text-xs text-muted-foreground">Based on retail prices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Items below minimum threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium">Inventory List</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] sm:w-[400px] p-4" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Brand</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.slice(0, 6).map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={brandFilter.includes(brand)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setBrandFilter([...brandFilter, brand])
                                  handleAddFilter("brand", brand)
                                } else {
                                  setBrandFilter(brandFilter.filter((b) => b !== brand))
                                  handleRemoveFilter(`brand:${brand}`)
                                }
                              }}
                            />
                            <Label htmlFor={`brand-${brand}`} className="font-normal">
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Model</h4>
                      <Input
                        placeholder="Search by model..."
                        value={modelFilter}
                        onChange={(e) => {
                          setModelFilter(e.target.value)
                          if (e.target.value && !activeFilters.includes(`model:${e.target.value}`)) {
                            handleAddFilter("model", e.target.value)
                          } else if (!e.target.value) {
                            setActiveFilters(activeFilters.filter((f) => !f.startsWith("model:")))
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Year Range</h4>
                        <span className="text-sm text-muted-foreground">
                          {yearFilter[0]} - {yearFilter[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={yearFilter}
                        min={2000}
                        max={2023}
                        step={1}
                        onValueChange={(value) => setYearFilter(value as [number, number])}
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Condition</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {conditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox
                              id={`condition-${condition}`}
                              checked={conditionFilter.includes(condition)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setConditionFilter([...conditionFilter, condition])
                                  handleAddFilter("condition", condition)
                                } else {
                                  setConditionFilter(conditionFilter.filter((c) => c !== condition))
                                  handleRemoveFilter(`condition:${condition}`)
                                }
                              }}
                            />
                            <Label htmlFor={`condition-${condition}`} className="font-normal">
                              {condition}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Price Range</h4>
                        <span className="text-sm text-muted-foreground">
                          £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={100000}
                        step={1000}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Box & Papers</h4>
                      <Select
                        value={boxPapersFilter === undefined ? "all" : boxPapersFilter ? "yes" : "no"}
                        onValueChange={(value) => {
                          if (value === "all") {
                            setBoxPapersFilter(undefined)
                            setActiveFilters(activeFilters.filter((f) => !f.startsWith("box-papers:")))
                          } else if (value === "yes") {
                            setBoxPapersFilter(true)
                            handleAddFilter("box-papers", "Yes")
                          } else {
                            setBoxPapersFilter(false)
                            handleAddFilter("box-papers", "No")
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="yes">With Box & Papers</SelectItem>
                          <SelectItem value="no">Without Box & Papers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button variant="outline" size="sm" onClick={clearAllFilters}>
                        Reset Filters
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => {
              const [type, value] = filter.split(":")
              return (
                <Badge key={filter} variant="outline" className="flex items-center gap-1">
                  <span>
                    {type}: {value}
                  </span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveFilter(filter)} />
                </Badge>
              )
            })}
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        )}

        <DataTable columns={columns} data={filteredData} />
      </div>
      {/* Modals */}
      {selectedItem && (
        <>
          <InventoryItemViewModal item={selectedItem} open={viewModalOpen} onOpenChange={setViewModalOpen} />

          <InventoryItemEditModal
            item={selectedItem}
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={(updatedItem) => {
              // In a real app, you would update the data in your database
              // For now, we'll just update the local state
              setInventoryItems((prevItems) =>
                prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
              )
            }}
          />

          <InventoryItemDeleteDialog
            item={selectedItem}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onDelete={(itemId) => {
              // In a real app, you would delete the item from your database
              // For now, we'll just update the local state
              setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
            }}
          />
        </>
      )}
    </div>
  )
}

