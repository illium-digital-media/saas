"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, UserPlus, Mail, Phone, Shield, Calendar, Clock, Trash2, Edit, UserCog, MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAvatarColor } from "@/lib/utils"

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Emma Thompson",
    initials: "ET",
    role: "Store Manager",
    department: "Management",
    email: "emma.thompson@jewellercrm.com",
    phone: "+44 7700 900123",
    status: "Active",
    joinDate: "15 Mar 2020",
    permissions: "Admin",
    performance: "Excellent",
    lastActive: "Today, 10:23 AM",
  },
  {
    id: 2,
    name: "James Wilson",
    initials: "JW",
    role: "Sales Consultant",
    department: "Sales",
    email: "james.wilson@jewellercrm.com",
    phone: "+44 7700 900124",
    status: "Active",
    joinDate: "3 Jun 2021",
    permissions: "Sales",
    performance: "Good",
    lastActive: "Today, 9:45 AM",
  },
  {
    id: 3,
    name: "Sarah Chen",
    initials: "SC",
    role: "Sales Consultant",
    department: "Sales",
    email: "sarah.chen@jewellercrm.com",
    phone: "+44 7700 900125",
    status: "Active",
    joinDate: "12 Jan 2022",
    permissions: "Sales",
    performance: "Excellent",
    lastActive: "Today, 11:30 AM",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    initials: "MR",
    role: "Junior Sales Consultant",
    department: "Sales",
    email: "michael.rodriguez@jewellercrm.com",
    phone: "+44 7700 900126",
    status: "Active",
    joinDate: "5 Sep 2022",
    permissions: "Sales",
    performance: "Average",
    lastActive: "Yesterday, 4:15 PM",
  },
]

// Function to get status badge variant
function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "On Leave":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "Inactive":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export function TeamManagePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showEditMemberDialog, setShowEditMemberDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const handleEditMember = (member: any) => {
    setSelectedMember(member)
    setShowEditMemberDialog(true)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "hidden border-r bg-sidebar shadow-sm lg:block transition-all duration-300 fixed top-0 left-0 h-screen z-30",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-center border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">
              {sidebarCollapsed ? "JCRM" : "JewellersCRM"}
            </span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav collapsed={sidebarCollapsed} />
          </div>
          <div className="border-t p-2 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("h-4 w-4 transition-transform", sidebarCollapsed ? "rotate-180" : "")}
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={toggleMobileSidebar} />}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar shadow-lg transition-transform duration-300 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="font-semibold text-primary dark:text-primary-foreground">JewellersCRM</span>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <MainNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("flex flex-col w-full", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <button
            className="lg:hidden"
            onClick={toggleMobileSidebar}
            aria-label="Toggle menu"
            aria-expanded={mobileSidebarOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="w-full flex-1">
            <Search />
          </div>
          <UserNav />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Manage Team</h1>
              <p className="text-muted-foreground">Add, edit, and manage team members and their permissions</p>
            </div>
            <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new team member. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input id="role" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="repairs">Repairs</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="permissions" className="text-right">
                      Permissions
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select permissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="repairs">Repairs</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="readonly">Read Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setShowAddMemberDialog(false)}>
                    Save Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members, their roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 bg-muted/40 flex justify-between items-center">
                  <h3 className="text-sm font-medium">Current Team Members</h3>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="repairs">Repairs</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="divide-y">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* Column 1: Team Member Info */}
                        <div className="flex items-center gap-4">
                          <Avatar className={`h-10 w-10 shrink-0 ${getAvatarColor(member.name)}`}>
                            <AvatarFallback className="text-white">{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-medium">{member.name}</p>
                              <Badge variant="secondary" className={getStatusBadge(member.status)}>
                                {member.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>

                        {/* Column 2: Contact Info */}
                        <div className="md:col-span-1">
                          <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Contact</p>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Department */}
                        <div className="md:col-span-1">
                          <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Department</p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{member.department}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Joined: {member.joinDate}</span>
                          </div>
                        </div>

                        {/* Column 4: Permissions */}
                        <div className="md:col-span-1">
                          <p className="text-xs font-medium mb-1 text-muted-foreground md:hidden">Access Level</p>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{member.permissions} access</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Last active: {member.lastActive}</span>
                          </div>
                        </div>

                        {/* Column 5: Actions */}
                        <div className="md:col-span-1 flex items-center justify-end">
                          <Dialog
                            open={showEditMemberDialog && selectedMember?.id === member.id}
                            onOpenChange={(open) => {
                              if (!open) setSelectedMember(null)
                              setShowEditMemberDialog(open)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleEditMember(member)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Team Member</DialogTitle>
                                <DialogDescription>
                                  Update the details for {selectedMember?.name}. Click save when you're done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">
                                    Name
                                  </Label>
                                  <Input id="edit-name" defaultValue={selectedMember?.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-email" className="text-right">
                                    Email
                                  </Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    defaultValue={selectedMember?.email}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-phone" className="text-right">
                                    Phone
                                  </Label>
                                  <Input
                                    id="edit-phone"
                                    type="tel"
                                    defaultValue={selectedMember?.phone}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-role" className="text-right">
                                    Role
                                  </Label>
                                  <Input id="edit-role" defaultValue={selectedMember?.role} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-status" className="text-right">
                                    Status
                                  </Label>
                                  <Select defaultValue={selectedMember?.status.toLowerCase()}>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="on leave">On Leave</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-permissions" className="text-right">
                                    Permissions
                                  </Label>
                                  <Select defaultValue={selectedMember?.permissions.toLowerCase()}>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Admin</SelectItem>
                                      <SelectItem value="sales">Sales</SelectItem>
                                      <SelectItem value="repairs">Repairs</SelectItem>
                                      <SelectItem value="support">Support</SelectItem>
                                      <SelectItem value="inventory">Inventory</SelectItem>
                                      <SelectItem value="readonly">Read Only</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" className="mr-2">
                                  Reset Password
                                </Button>
                                <Button type="submit" onClick={() => setShowEditMemberDialog(false)}>
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCog className="mr-2 h-5 w-5" />
                  Role Management
                </CardTitle>
                <CardDescription>Define and manage roles and their associated permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Admin</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Full access to all system features and settings
                    </p>
                    <div className="flex mt-2">
                      <Badge variant="outline" className="mr-1">
                        All Permissions
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Sales</h3>
                    <p className="text-sm text-muted-foreground mt-1">Access to sales, customers, and inventory</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline">Sales</Badge>
                      <Badge variant="outline">Customers</Badge>
                      <Badge variant="outline">Inventory (View)</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Repairs</h3>
                    <p className="text-sm text-muted-foreground mt-1">Access to repair requests and tracking</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline">Repairs</Badge>
                      <Badge variant="outline">Customers (View)</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Roles
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Team Activity
                </CardTitle>
                <CardDescription>Recent team member activity and system access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-8 w-8 ${getAvatarColor("Emma Thompson")}`}>
                      <AvatarFallback className="text-white">ET</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">Emma Thompson logged in</p>
                      <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-8 w-8 ${getAvatarColor("James Wilson")}`}>
                      <AvatarFallback className="text-white">JW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">James Wilson updated customer profile #1234</p>
                      <p className="text-xs text-muted-foreground">Today, 9:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-8 w-8 ${getAvatarColor("Sarah Chen")}`}>
                      <AvatarFallback className="text-white">SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">Sarah Chen completed a sale transaction</p>
                      <p className="text-xs text-muted-foreground">Today, 9:12 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-8 w-8 ${getAvatarColor("Michael Rodriguez")}`}>
                      <AvatarFallback className="text-white">MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">Michael Rodriguez created a repair request</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 4:15 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

