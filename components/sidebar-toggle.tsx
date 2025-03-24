"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftIcon, PanelRightIcon } from "lucide-react"

interface SidebarToggleProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function SidebarToggle({ isCollapsed, onToggle }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full"
      onClick={onToggle}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? <PanelRightIcon className="h-4 w-4" /> : <PanelLeftIcon className="h-4 w-4" />}
    </Button>
  )
}

