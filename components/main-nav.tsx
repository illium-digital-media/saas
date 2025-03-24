"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  ShoppingCart,
  Clock,
  Package,
  Users,
  Calendar,
  FileText,
  BarChart2,
  UserCog,
  Settings,
  ChevronRight,
  LayoutGrid,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

type NavItem = {
  title: string
  icon: React.ElementType
  href: string
  variant?: "default" | "ghost"
  children?: {
    title: string
    href: string
  }[]
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    variant: "default",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    href: "/sales/sell", // Changed to direct to sell page
    children: [
      { title: "Sell Watches", href: "/sales/sell" }, // Moved to the top
      { title: "Buy Watches", href: "/sales/buy" },
      { title: "Part Exchange", href: "/sales/exchange" },
      { title: "Consignment", href: "/sales/consignment" },
    ],
  },
  {
    title: "Repairs",
    icon: Clock,
    href: "/repairs",
    children: [
      { title: "Repair Requests", href: "/repairs/requests" },
      { title: "Repair Tracking", href: "/repairs/tracking" },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/inventory",
    children: [
      { title: "Stock Overview", href: "/inventory/overview" },
      { title: "Add New Stock", href: "/inventory/add" },
      { title: "Low Stock Alerts", href: "/inventory/alerts" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
    children: [
      { title: "Customer Profiles", href: "/customers/profiles" },
      { title: "Purchase History", href: "/customers/history" },
      { title: "VIP Clients", href: "/customers/vip" },
    ],
  },
  {
    title: "Suppliers",
    icon: Truck,
    href: "/suppliers",
    variant: "ghost",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/appointments",
    children: [
      { title: "Book Appointment", href: "/appointments/book" },
      { title: "Appointment Calendar", href: "/appointments/calendar" },
      { title: "Notifications", href: "/appointments/notifications" },
    ],
  },
  {
    title: "Invoicing",
    icon: FileText,
    href: "/invoicing",
    children: [
      { title: "Generate Invoices", href: "/invoicing/generate" },
      { title: "Payment Tracking", href: "/invoicing/tracking" },
      { title: "Refunds & Returns", href: "/invoicing/refunds" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart2,
    href: "/reports",
    children: [
      { title: "Sales Reports", href: "/reports/sales" },
      { title: "Stock Reports", href: "/reports/stock" },
      { title: "Customer Insights", href: "/reports/customers" },
    ],
  },
  {
    title: "Channels",
    icon: LayoutGrid,
    href: "/channels",
  },
  {
    title: "Team",
    icon: UserCog,
    href: "/team",
    children: [
      { title: "Team Overview", href: "/team" },
      { title: "Manage Members", href: "/team/manage" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    children: [{ title: "Business Information", href: "/settings/business" }],
  },
]

export function MainNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)

  // Set initial open state based on current path and detect mobile
  useEffect(() => {
    const newOpenItems: Record<string, boolean> = {}

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    items.forEach((item) => {
      // Check if current path starts with this item's path (excluding root)
      if (item.href !== "/" && pathname.startsWith(item.href)) {
        newOpenItems[item.title] = true
      }

      // Also check if any child path matches
      if (item.children) {
        item.children.forEach((child) => {
          if (pathname === child.href) {
            newOpenItems[item.title] = true
          }
        })
      }
    })

    setOpenItems((prev) => ({ ...prev, ...newOpenItems }))

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [pathname])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault()
      toggleItem(item.title)
      // If it's the Sales item, navigate to sell page
      if (item.title === "Sales") {
        router.push("/sales/sell")
      }
    } else {
      router.push(item.href)
    }
  }

  const handleParentItemClick = (href: string, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(href)
  }

  // Use larger touch targets on mobile
  const buttonSize = isMobile ? "default" : "sm"

  return (
    <div className="grid gap-1 px-2">
      {items.map((item, index) => (
        <div key={index} className="mb-1">
          <Button
            variant={item.variant || "ghost"}
            size={buttonSize}
            className={cn(
              "w-full gap-2 py-1.5",
              isMobile && "h-11",
              !isMobile && "h-9",
              openItems[item.title] && item.children && "text-primary",
              pathname === item.href && "bg-accent text-accent-foreground",
              collapsed ? "justify-center px-0" : "justify-start px-2",
            )}
            onClick={(e) => handleItemClick(item, e)}
          >
            <div className={cn("flex w-full items-center", collapsed && "justify-center")}>
              {item.children ? (
                <>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={(e) => handleParentItemClick(item.href, e)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="ml-2 text-sm font-medium">{item.title}</span>}
                  </div>
                  {!collapsed && item.children && (
                    <ChevronRight
                      className={cn("ml-auto h-4 w-4 transition-transform", openItems[item.title] && "rotate-90")}
                    />
                  )}
                </>
              ) : (
                <>
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2 text-sm font-medium">{item.title}</span>}
                </>
              )}
            </div>
          </Button>

          {item.children && openItems[item.title] && !collapsed && (
            <div className="ml-6 mt-1 space-y-1">
              {item.children.map((child, childIndex) => (
                <Button
                  key={childIndex}
                  variant={pathname === child.href ? "secondary" : "ghost"}
                  size={isMobile ? "default" : "sm"}
                  asChild
                  className={cn(
                    "w-full justify-start px-2",
                    isMobile && "py-2 h-10",
                    !isMobile && "py-1 h-7",
                    pathname === child.href
                      ? "bg-secondary text-secondary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Link href={child.href}>
                    <span className="text-xs">{child.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

