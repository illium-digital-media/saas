"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SidebarNavItem {
  name: string
  href: string
  icon?: LucideIcon
  items?: SidebarNavItem[]
  disabled?: boolean
}

interface SidebarNavProps {
  items: {
    title: string
    items: SidebarNavItem[]
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {items.map((group, groupIndex) => (
        <div key={groupIndex} className="pb-4">
          <h4 className="mb-1 px-2 py-1 text-sm font-semibold tracking-tight">{group.title}</h4>
          <div className="grid grid-flow-row auto-rows-max">
            {group.items.map((item, itemIndex) => (
              <NavItem key={itemIndex} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface NavItemProps {
  item: SidebarNavItem
  pathname: string
  depth?: number
}

function NavItem({ item, pathname, depth = 0 }: NavItemProps) {
  const Icon = item.icon
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const hasChildren = item.items && item.items.length > 0

  return (
    <div className="flex flex-col">
      <Link
        href={item.disabled ? "#" : item.href}
        className={cn(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          isActive ? "bg-accent text-accent-foreground" : "transparent hover:bg-accent hover:text-accent-foreground",
          item.disabled && "cursor-not-allowed opacity-60",
          depth > 0 && "pl-8 text-xs",
        )}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{item.name}</span>
      </Link>

      {hasChildren && (
        <div className="ml-4 border-l pl-2 mt-1">
          {item.items?.map((child, index) => (
            <NavItem key={index} item={child} pathname={pathname} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

