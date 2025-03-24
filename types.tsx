import type { LucideIcon } from "lucide-react"

export type MainNavItem = {
  title: string
  href?: string
  disabled?: boolean
  icon?: LucideIcon
  items?: {
    title: string
    href: string
    disabled?: boolean
  }[]
}

