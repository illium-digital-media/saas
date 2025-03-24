"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, RefreshCcw, BarChart3, PlusCircle, Menu, X, User, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shell } from "@/components/shells/shell"

interface InvoiceShellProps {
  children: React.ReactNode
}

export function InvoiceShell({ children }: InvoiceShellProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const routes = [
    {
      title: "Generate Invoice",
      href: "/invoicing/generate",
      icon: PlusCircle,
      active: pathname === "/invoicing/generate",
    },
    {
      title: "Track Invoices",
      href: "/invoicing/tracking",
      icon: BarChart3,
      active: pathname === "/invoicing/tracking",
    },
    {
      title: "Process Refunds",
      href: "/invoicing/refunds",
      icon: RefreshCcw,
      active: pathname === "/invoicing/refunds",
    },
  ]

  return (
    <Shell>
      <div className="flex h-full min-h-screen">
        {/* Mobile sidebar toggle */}
        <div className="fixed left-4 top-4 z-50 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col border-r">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/invoicing" className="flex items-center gap-2 font-semibold">
                <FileText className="h-5 w-5" />
                <span>Invoicing System</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                      route.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    <span>John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">{children}</div>
        </div>
      </div>
    </Shell>
  )
}

