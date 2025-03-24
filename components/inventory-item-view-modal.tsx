"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface InventoryItemViewModalProps {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InventoryItemViewModal({ item, open, onOpenChange }: InventoryItemViewModalProps) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>Detailed information about this inventory item.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Name:</div>
            <div>{item.name}</div>

            <div className="font-medium">SKU:</div>
            <div>{item.sku}</div>

            <div className="font-medium">Serial Number:</div>
            <div>{item.serialNumber || "N/A"}</div>

            <div className="font-medium">Category:</div>
            <div>{item.category}</div>

            <div className="font-medium">Stock Level:</div>
            <div className="flex items-center gap-2">
              {item.stock}
              {item.stock <= item.lowStockThreshold && <Badge variant="destructive">Low Stock</Badge>}
            </div>

            <div className="font-medium">Price:</div>
            <div>{formatCurrency(item.price)}</div>

            <div className="font-medium">Cost:</div>
            <div>{formatCurrency(item.cost)}</div>

            <div className="font-medium">Supplier:</div>
            <div>{item.supplier}</div>

            <div className="font-medium">Location:</div>
            <div>{item.location}</div>

            <div className="font-medium">Last Updated:</div>
            <div>{new Date(item.lastUpdated).toLocaleDateString()}</div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

