"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function InventoryAddForm() {
  const [brand, setBrand] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [reference, setReference] = useState<string>("")
  const [serial, setSerial] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [condition, setCondition] = useState<string>("")
  const [cost, setCost] = useState<string>("")
  const [retail, setRetail] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("1")
  const [supplier, setSupplier] = useState<string>("")
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    console.log({ brand, model, reference, serial, year, condition, cost, retail, quantity, supplier, image })
    alert("Watch added to inventory successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Watch Image</h3>
            <p className="text-sm text-muted-foreground">Upload a high-quality image of the watch</p>
          </div>

          <div className="flex items-center gap-6">
            {image ? (
              <div className="relative h-40 w-40 overflow-hidden rounded-md border">
                <Image src={image || "/placeholder.svg"} alt="Watch preview" fill className="object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">No image</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <input
                type="file"
                id="watch-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, WebP</p>
              <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watch Details Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Watch Details</h3>
            <p className="text-sm text-muted-foreground">Enter the specifications of the watch</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={brand} onValueChange={setBrand} required>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rolex">Rolex</SelectItem>
                  <SelectItem value="omega">Omega</SelectItem>
                  <SelectItem value="patek">Patek Philippe</SelectItem>
                  <SelectItem value="cartier">Cartier</SelectItem>
                  <SelectItem value="tag">TAG Heuer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="e.g. Submariner"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="e.g. 126610LN"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serial">Serial Number</Label>
              <Input
                id="serial"
                placeholder="e.g. 7839521"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" placeholder="e.g. 2021" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={condition} onValueChange={setCondition} required>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing and Inventory Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Pricing & Inventory</h3>
            <p className="text-sm text-muted-foreground">Set pricing and inventory details</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost Price</Label>
              <Input id="cost" placeholder="£0.00" value={cost} onChange={(e) => setCost(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retail">Retail Price</Label>
              <Input
                id="retail"
                placeholder="£0.00"
                value={retail}
                onChange={(e) => setRetail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct from Manufacturer</SelectItem>
                  <SelectItem value="distributor">Authorized Distributor</SelectItem>
                  <SelectItem value="grey">Grey Market</SelectItem>
                  <SelectItem value="customer">Customer Trade-in</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Add to Inventory</Button>
      </div>
    </form>
  )
}

