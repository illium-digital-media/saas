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
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

interface InventoryItemDeleteDialogProps {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (itemId: string) => void
}

export function InventoryItemDeleteDialog({ item, open, onOpenChange, onDelete }: InventoryItemDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!item) return null

  const handleDelete = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onDelete(item.id)
      setIsLoading(false)
      onOpenChange(false)
      toast({
        title: "Item deleted",
        description: "The inventory item has been deleted successfully.",
      })
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You are about to delete <span className="font-medium text-foreground">{item.name}</span> (SKU: {item.sku}).
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

