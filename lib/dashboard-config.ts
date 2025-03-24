import { LayoutDashboard, Package, Settings, Users, Layers, BarChart, PlusCircle } from "lucide-react"
import type { SidebarNavItem } from "@/components/sidebar-nav"

interface DashboardConfig {
  mainNav: MainNavConfig
  sidebarNav: SidebarNavConfig
}

interface MainNavConfig {
  items: MainNavItem[]
}

interface SidebarNavConfig {
  items: {
    title: string
    items: SidebarNavItem[]
  }[]
}

interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

export const dashboardConfig: DashboardConfig = {
  mainNav: {
    items: [
      {
        title: "Documentation",
        href: "/docs",
      },
      {
        title: "Support",
        href: "/support",
        disabled: true,
      },
    ],
  },
  sidebarNav: {
    items: [
      {
        title: "General",
        items: [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
        ],
      },
      {
        title: "Management",
        items: [
          {
            name: "Inventory",
            href: "/inventory/overview",
            icon: Package,
            items: [
              {
                name: "Overview",
                href: "/inventory/overview",
                icon: Layers,
              },
              {
                name: "Categories",
                href: "/inventory/categories",
                icon: BarChart,
              },
              {
                name: "Add Item",
                href: "/inventory/add",
                icon: PlusCircle,
              },
            ],
          },
          {
            name: "Customers",
            href: "/customers",
            icon: Users,
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            name: "Settings",
            href: "/settings",
            icon: Settings,
          },
        ],
      },
    ],
  },
}

