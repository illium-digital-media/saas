"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { BellIcon, Building2, ChevronDown, User, CreditCard, Settings, Building, LogOut } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useState, useEffect } from "react"

// Mock companies data
const companies = [
  {
    id: "company-1",
    name: "Luxury Watches Ltd",
    logo: "/placeholder.svg?height=32&width=32",
    initials: "LW",
  },
  {
    id: "company-2",
    name: "Premium Timepieces Inc",
    logo: "/placeholder.svg?height=32&width=32",
    initials: "PT",
  },
]

export function UserNav() {
  const [activeCompany, setActiveCompany] = useState(companies[0])
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={activeCompany.logo} alt={activeCompany.name} />
              <AvatarFallback>{activeCompany.initials}</AvatarFallback>
            </Avatar>
            <span className="max-w-[120px] truncate">{activeCompany.name}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Switch Company</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {companies.map((company) => (
            <DropdownMenuItem
              key={company.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveCompany(company)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback>{company.initials}</AvatarFallback>
              </Avatar>
              <span>{company.name}</span>
              {company.id === activeCompany.id && <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Add Company</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeSwitcher />

      <Button variant="ghost" size="icon" className="relative">
        <BellIcon className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500"></span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Sarah Connor</p>
              <p className="text-xs leading-none text-muted-foreground">s.connor@skynet.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Company</span>
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

