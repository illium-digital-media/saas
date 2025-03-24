"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function InventoryAlerts() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Low Stock Items</h3>
        <Badge variant="destructive" className="text-xs">
          8 Items
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Rolex Datejust 41</h3>
                <Badge variant="destructive">Only 2 left</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Ref: 126334 • Blue Dial</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Order More
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Omega Seamaster 300M</h3>
                <Badge variant="destructive">Only 1 left</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Ref: 210.30.42.20.03.001 • Blue Dial</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Order More
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Tudor Black Bay 58</h3>
                <Badge variant="destructive">Only 3 left</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Ref: M79030N-0001 • Black Dial</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Order More
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Cartier Tank Must</h3>
                <Badge variant="destructive">Only 2 left</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Ref: WSTA0041 • Silver Dial</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Order More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

