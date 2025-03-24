"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppContext } from "@/lib/context/app-context"

export function RecentSales() {
  const { sales } = useAppContext()

  // Get the 5 most recent sales
  const recentSales = [...sales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {recentSales.length > 0 ? (
        recentSales.map((sale) => (
          <div key={sale.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
              <AvatarFallback>
                {sale.customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{sale.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {sale.watchDetails.brand} {sale.watchDetails.model}
              </p>
            </div>
            <div className="ml-auto font-medium">{formatCurrency(sale.amount)}</div>
          </div>
        ))
      ) : (
        <div className="text-center text-sm text-muted-foreground">No recent sales to display</div>
      )}
    </div>
  )
}

