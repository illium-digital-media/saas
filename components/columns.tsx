"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

export type Watch = {
  id: string
  brand: string
  model: string
  reference: string
  condition: string
  price: number
  status: "In Stock" | "Reserved" | "Sold" | "On Order"
  serialNumber?: string // Add serialNumber as an optional property
}

export const columns: ColumnDef<Watch>[] = [
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center"
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-center"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price)
      return <div className="text-center">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              status === "In Stock"
                ? "bg-green-50 text-green-700 hover:bg-green-50"
                : status === "Reserved"
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                  : status === "Sold"
                    ? "bg-gray-50 text-gray-700 hover:bg-gray-50"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-50"
            }
          >
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
    cell: ({ row }) => <div>{row.getValue("serialNumber") || "N/A"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // These functions will be passed as props from the parent component
              if (typeof window !== "undefined" && window.viewItem) {
                window.viewItem(item)
              }
            }}
          >
            <EyeIcon className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (typeof window !== "undefined" && window.editItem) {
                window.editItem(item)
              }
            }}
          >
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (typeof window !== "undefined" && window.deleteItem) {
                window.deleteItem(item)
              }
            }}
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )
    },
  },
]

