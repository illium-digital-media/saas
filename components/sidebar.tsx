import { LayoutDashboard, Package, Settings, Users } from "lucide-react"
import type { SidebarNavItem } from "@/components/sidebar-nav"

interface DashboardConfig {
  mainNav: MainNavConfig
  sidebarNav: SidebarNavConfig
}

interface MainNavConfig {
  items: MainNavItem[]
}

interface SidebarNavConfig {
  items: SidebarNavItem[]
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
              },
              {
                name: "Categories",
                href: "/inventory/categories",
              },
              {
                name: "Add Item",
                href: "/inventory/add",
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

