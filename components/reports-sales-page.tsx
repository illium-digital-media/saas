"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { useState } from "react"

export function ReportsSalesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center">
            <SidebarToggle sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`${sidebarOpen ? "ml-4" : "ml-2"} flex items-center`}>
              <h1 className="text-xl font-bold dark:text-primary-foreground">JewellersCRM</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-sidebar border-r transition-all duration-200 ease-in-out`}>
          <MainNav collapsed={!sidebarOpen} />
        </div>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Sales Reports</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Sales Reports</CardTitle>
                <CardDescription>View detailed sales performance reports.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This page provides detailed reports on sales performance, trends, and revenue.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

