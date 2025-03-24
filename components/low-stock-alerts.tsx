import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function LowStockAlerts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Rolex Datejust 41</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-muted-foreground">Ref: 126334</p>
            <Badge variant="destructive" className="ml-2 text-xs">
              Only 2 left
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Order
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Omega Seamaster 300M</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-muted-foreground">Ref: 210.30.42.20.03.001</p>
            <Badge variant="destructive" className="ml-2 text-xs">
              Only 1 left
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Order
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Tudor Black Bay 58</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-muted-foreground">Ref: M79030N-0001</p>
            <Badge variant="destructive" className="ml-2 text-xs">
              Only 3 left
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Order
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Cartier Tank Must</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-muted-foreground">Ref: WSTA0041</p>
            <Badge variant="destructive" className="ml-2 text-xs">
              Only 2 left
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Order
        </Button>
      </div>
    </div>
  )
}

