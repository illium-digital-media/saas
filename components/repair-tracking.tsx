"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePickerV45 } from "@/components/date-range-picker-v45"
import { InvoicePreview } from "@/components/invoice-preview"
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  MoreVertical,
  FileText,
  Phone,
  Mail,
  ArrowUpDown,
  ChevronDown,
  Download,
  Printer,
  Plus,
  RefreshCw,
  XCircle,
  PauseCircle,
  User,
  MessageSquare,
  Pencil,
} from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { toast } from "@/components/ui/use-toast"

// Types
interface RepairNote {
  id: string
  date: Date
  author: string
  content: string
  isInternal: boolean
}

interface RepairPart {
  id: string
  name: string
  partNumber: string
  status: "needed" | "ordered" | "received" | "installed"
  cost: number
  orderDate?: Date
  receivedDate?: Date
}

interface Repair {
  id: string
  customerId: string
  customerName: string
  itemType: string
  brand: string
  model: string
  serialNumber: string
  issueDescription: string
  status: "received" | "diagnosed" | "in_progress" | "waiting_parts" | "ready" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  dateReceived: Date
  estimatedCompletionDate: Date | null
  actualCompletionDate: Date | null
  technician: string
  cost: number
  notes: RepairNote[]
  partsRequired: RepairPart[]
}

// Mock data
const mockRepairs: Repair[] = [
  {
    id: "REP-2023-001",
    customerId: "c1",
    customerName: "John Doe",
    itemType: "Watch",
    brand: "Rolex",
    model: "Submariner",
    serialNumber: "SN12345678",
    issueDescription: "Watch stops running after 2 hours of wear. Possible mainspring issue.",
    status: "in_progress",
    priority: "high",
    dateReceived: new Date(2023, 5, 15),
    estimatedCompletionDate: new Date(2023, 5, 25),
    actualCompletionDate: null,
    technician: "Michael Brown",
    cost: 450,
    notes: [
      {
        id: "note-1",
        date: new Date(2023, 5, 15),
        author: "Emma Thompson",
        content: "Customer mentioned the watch was recently dropped.",
        isInternal: true,
      },
      {
        id: "note-2",
        date: new Date(2023, 5, 16),
        author: "Michael Brown",
        content: "Initial diagnosis confirms mainspring damage. Will need replacement.",
        isInternal: true,
      },
    ],
    partsRequired: [
      {
        id: "part-1",
        name: "Rolex Caliber 3135 Mainspring",
        partNumber: "3135-180",
        status: "ordered",
        cost: 120,
        orderDate: new Date(2023, 5, 16),
      },
    ],
  },
  {
    id: "REP-2023-002",
    customerId: "c2",
    customerName: "Jane Smith",
    itemType: "Watch",
    brand: "Omega",
    model: "Speedmaster",
    serialNumber: "OM78901234",
    issueDescription: "Chronograph function not working. Second hand sticks at 30 seconds.",
    status: "waiting_parts",
    priority: "medium",
    dateReceived: new Date(2023, 5, 10),
    estimatedCompletionDate: new Date(2023, 5, 30),
    actualCompletionDate: null,
    technician: "David Wilson",
    cost: 380,
    notes: [
      {
        id: "note-3",
        date: new Date(2023, 5, 10),
        author: "James Wilson",
        content: "Customer requested expedited service if possible.",
        isInternal: true,
      },
      {
        id: "note-4",
        date: new Date(2023, 5, 12),
        author: "David Wilson",
        content: "Chronograph module needs replacement. Parts ordered.",
        isInternal: true,
      },
    ],
    partsRequired: [
      {
        id: "part-2",
        name: "Omega Chronograph Module",
        partNumber: "OM-CHR-321",
        status: "ordered",
        cost: 210,
        orderDate: new Date(2023, 5, 12),
      },
    ],
  },
  {
    id: "REP-2023-003",
    customerId: "c3",
    customerName: "Robert Johnson",
    itemType: "Watch",
    brand: "TAG Heuer",
    model: "Carrera",
    serialNumber: "TH56789012",
    issueDescription: "Water damage after swimming. Condensation visible under crystal.",
    status: "diagnosed",
    priority: "urgent",
    dateReceived: new Date(2023, 5, 18),
    estimatedCompletionDate: new Date(2023, 5, 28),
    actualCompletionDate: null,
    technician: "Michael Brown",
    cost: 520,
    notes: [
      {
        id: "note-5",
        date: new Date(2023, 5, 18),
        author: "Emma Thompson",
        content: "Customer very concerned about potential damage to movement.",
        isInternal: true,
      },
      {
        id: "note-6",
        date: new Date(2023, 5, 19),
        author: "Michael Brown",
        content: "Significant water damage to movement. Full service required with multiple part replacements.",
        isInternal: true,
      },
    ],
    partsRequired: [
      {
        id: "part-3",
        name: "TAG Heuer Gasket Set",
        partNumber: "TH-GSK-001",
        status: "needed",
        cost: 45,
      },
      {
        id: "part-4",
        name: "TAG Heuer Movement Parts",
        partNumber: "TH-MVT-123",
        status: "needed",
        cost: 180,
      },
    ],
  },
  {
    id: "REP-2023-004",
    customerId: "c4",
    customerName: "Emily Williams",
    itemType: "Watch",
    brand: "Cartier",
    model: "Tank",
    serialNumber: "CT34567890",
    issueDescription: "Battery replacement and general service.",
    status: "completed",
    priority: "low",
    dateReceived: new Date(2023, 5, 5),
    estimatedCompletionDate: new Date(2023, 5, 8),
    actualCompletionDate: new Date(2023, 5, 7),
    technician: "Sarah Johnson",
    cost: 120,
    notes: [
      {
        id: "note-7",
        date: new Date(2023, 5, 5),
        author: "James Wilson",
        content: "Customer requested case polishing as well.",
        isInternal: true,
      },
      {
        id: "note-8",
        date: new Date(2023, 5, 7),
        author: "Sarah Johnson",
        content: "Battery replaced and case polished. Watch running perfectly.",
        isInternal: true,
      },
    ],
    partsRequired: [
      {
        id: "part-5",
        name: "Cartier Battery",
        partNumber: "CT-BAT-001",
        status: "installed",
        cost: 25,
        orderDate: new Date(2023, 5, 5),
        receivedDate: new Date(2023, 5, 5),
      },
    ],
  },
  {
    id: "REP-2023-005",
    customerId: "c5",
    customerName: "Michael Brown",
    itemType: "Watch",
    brand: "Patek Philippe",
    model: "Calatrava",
    serialNumber: "PP90123456",
    issueDescription: "Full service and movement overhaul.",
    status: "received",
    priority: "medium",
    dateReceived: new Date(2023, 5, 20),
    estimatedCompletionDate: new Date(2023, 6, 20),
    actualCompletionDate: null,
    technician: "Unassigned",
    cost: 1200,
    notes: [
      {
        id: "note-9",
        date: new Date(2023, 5, 20),
        author: "Emma Thompson",
        content: "Customer is a VIP. Watch has high sentimental value as it was inherited.",
        isInternal: true,
      },
    ],
    partsRequired: [],
  },
]

// Status mapping for display
const statusMap = {
  received: { label: "Received", color: "bg-blue-100 text-blue-800", icon: Clock },
  diagnosed: { label: "Diagnosed", color: "bg-purple-100 text-purple-800", icon: Search },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-800", icon: RefreshCw },
  waiting_parts: { label: "Waiting for Parts", color: "bg-orange-100 text-orange-800", icon: PauseCircle },
  ready: { label: "Ready for Collection", color: "bg-green-100 text-green-800", icon: CheckCircle },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

const priorityMap = {
  low: { label: "Low", color: "bg-slate-100 text-slate-800" },
  medium: { label: "Medium", color: "bg-blue-100 text-blue-800" },
  high: { label: "High", color: "bg-amber-100 text-amber-800" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
}

export function RepairTracking() {
  const router = useRouter()
  const { customers, getCustomerById } = useAppContext()
  const [repairs, setRepairs] = useState<Repair[]>(mockRepairs)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [technicianFilter, setTechnicianFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Repair>("dateReceived")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [newNote, setNewNote] = useState("")
  const [isNoteInternal, setIsNoteInternal] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  // Add a new state for the repair detail dialog
  const [isRepairDetailOpen, setIsRepairDetailOpen] = useState(false)

  // Get unique technicians for filter
  const technicians = useMemo(() => {
    const techSet = new Set<string>()
    repairs.forEach((repair) => {
      if (repair.technician && repair.technician !== "Unassigned") {
        techSet.add(repair.technician)
      }
    })
    return Array.from(techSet)
  }, [repairs])

  // Filter and sort repairs
  const filteredRepairs = useMemo(() => {
    return repairs
      .filter((repair) => {
        // Status filter
        if (statusFilter !== "all" && repair.status !== statusFilter) {
          return false
        }

        // Priority filter
        if (priorityFilter !== "all" && repair.priority !== priorityFilter) {
          return false
        }

        // Technician filter
        if (technicianFilter !== "all" && repair.technician !== technicianFilter) {
          return false
        }

        // Tab filter
        if (activeTab === "in_progress" && repair.status === "completed") {
          return false
        }
        if (activeTab === "completed" && repair.status !== "completed") {
          return false
        }

        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            repair.id.toLowerCase().includes(query) ||
            repair.customerName.toLowerCase().includes(query) ||
            repair.brand.toLowerCase().includes(query) ||
            repair.model.toLowerCase().includes(query) ||
            repair.serialNumber.toLowerCase().includes(query) ||
            repair.issueDescription.toLowerCase().includes(query)
          )
        }

        return true
      })
      .sort((a, b) => {
        // Handle date sorting
        if (
          sortField === "dateReceived" ||
          sortField === "estimatedCompletionDate" ||
          sortField === "actualCompletionDate"
        ) {
          const aDate = a[sortField] ? new Date(a[sortField] as Date).getTime() : 0
          const bDate = b[sortField] ? new Date(b[sortField] as Date).getTime() : 0
          return sortDirection === "asc" ? aDate - bDate : bDate - aDate
        }

        // Handle string sorting
        if (typeof a[sortField] === "string" && typeof b[sortField] === "string") {
          const aString = (a[sortField] as string).toLowerCase()
          const bString = (b[sortField] as string).toLowerCase()
          return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString)
        }

        // Handle number sorting
        if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
          return sortDirection === "asc"
            ? (a[sortField] as number) - (b[sortField] as number)
            : (b[sortField] as number) - (a[sortField] as number)
        }

        return 0
      })
  }, [repairs, searchQuery, statusFilter, priorityFilter, technicianFilter, sortField, sortDirection, activeTab])

  // Get customer details for the selected repair
  const customerDetails = useMemo(() => {
    if (!selectedRepair) return null
    return getCustomerById(selectedRepair.customerId)
  }, [selectedRepair, getCustomerById])

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Handle sort toggle
  const handleSort = (field: keyof Repair) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle adding a new note
  const handleAddNote = () => {
    if (!selectedRepair || !newNote.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to add the note
    const newNoteObj: RepairNote = {
      id: `note-${Date.now()}`,
      date: new Date(),
      author: "Current User", // Would come from auth context in a real app
      content: newNote,
      isInternal: isNoteInternal,
    }

    // Update the selected repair with the new note
    const updatedRepair = { ...selectedRepair }
    updatedRepair.notes.push(newNoteObj)

    // Update the repairs array
    const updatedRepairs = repairs.map((repair) => (repair.id === selectedRepair.id ? updatedRepair : repair))

    setRepairs(updatedRepairs)
    setSelectedRepair(updatedRepair)
    setNewNote("")
    setIsNoteDialogOpen(false)

    toast({
      title: "Note added",
      description: "The note has been added successfully",
    })
  }

  // Handle status update
  const handleStatusUpdate = (newStatus: Repair["status"]) => {
    if (!selectedRepair) return

    // In a real app, this would call an API to update the status
    const updatedRepair = { ...selectedRepair, status: newStatus }

    // If status is completed, set the actual completion date
    if (newStatus === "completed" && !updatedRepair.actualCompletionDate) {
      updatedRepair.actualCompletionDate = new Date()
    }

    // Update the repairs array
    const updatedRepairs = repairs.map((repair) => (repair.id === selectedRepair.id ? updatedRepair : repair))

    setRepairs(updatedRepairs)
    setSelectedRepair(updatedRepair)

    toast({
      title: "Status updated",
      description: `Repair status changed to ${statusMap[newStatus].label}`,
    })
  }

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Invoice downloaded",
      description: `Invoice has been downloaded`,
    })
  }

  // Function to render status icon
  const renderStatusIcon = (status: string) => {
    const StatusIcon = statusMap[status as keyof typeof statusMap]?.icon
    return StatusIcon ? <StatusIcon className="h-3 w-3" /> : null
  }

  // Make sure the handleEmailCustomer function is properly closed
  const handleEmailCustomer = () => {
    if (!selectedRepair || !customerDetails) return

    // In a real app, this would open an email composer or send an email
    const emailSubject = `Repair ${selectedRepair.id} - ${selectedRepair.brand} ${selectedRepair.model}`
    window.location.href = `mailto:${customerDetails.email}?subject=${encodeURIComponent(emailSubject)}`

    toast({
      title: "Email prepared",
      description: "Email client opened with customer details",
    })
  }

  // Make sure the handleNewRepair function is properly closed
  const handleNewRepair = () => {
    // Redirect to the repair requests page
    router.push("/repairs/requests")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Repair Tracking</CardTitle>
              <CardDescription>Track and manage ongoing repair and service requests.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DateRangePickerV45 />
              <Button onClick={handleNewRepair}>
                <Plus className="mr-2 h-4 w-4" />
                New Repair
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-1">
                  All Repairs
                </TabsTrigger>
                <TabsTrigger value="in_progress" className="flex items-center gap-1">
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-1">
                  Completed
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search repairs..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filters
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter Repairs</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <div className="p-2">
                      <Label htmlFor="status-filter" className="text-xs">
                        Status
                      </Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter" className="mt-1">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          {Object.entries(statusMap).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-2">
                      <Label htmlFor="priority-filter" className="text-xs">
                        Priority
                      </Label>
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger id="priority-filter" className="mt-1">
                          <SelectValue placeholder="All Priorities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          {Object.entries(priorityMap).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-2">
                      <Label htmlFor="technician-filter" className="text-xs">
                        Technician
                      </Label>
                      <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
                        <SelectTrigger id="technician-filter" className="mt-1">
                          <SelectValue placeholder="All Technicians" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Technicians</SelectItem>
                          <SelectItem value="Unassigned">Unassigned</SelectItem>
                          {technicians.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                              {tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setStatusFilter("all")
                        setPriorityFilter("all")
                        setTechnicianFilter("all")
                      }}
                    >
                      Reset Filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("id")}
                        >
                          <div className="flex items-center gap-1">
                            ID
                            {sortField === "id" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("customerName")}
                        >
                          <div className="flex items-center gap-1">
                            Customer
                            {sortField === "customerName" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("brand")}
                        >
                          <div className="flex items-center gap-1">
                            Item
                            {sortField === "brand" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("priority")}
                        >
                          <div className="flex items-center gap-1">
                            Priority
                            {sortField === "priority" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("dateReceived")}
                        >
                          <div className="flex items-center gap-1">
                            Received
                            {sortField === "dateReceived" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("estimatedCompletionDate")}
                        >
                          <div className="flex items-center gap-1">
                            Est. Completion
                            {sortField === "estimatedCompletionDate" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("technician")}
                        >
                          <div className="flex items-center gap-1">
                            Technician
                            {sortField === "technician" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredRepairs.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-4 text-center text-muted-foreground">
                            No repairs found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredRepairs.map((repair) => {
                          const StatusIcon = statusMap[repair.status].icon
                          return (
                            <tr
                              key={repair.id}
                              className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                              onClick={() => {
                                setSelectedRepair(repair)
                                setIsRepairDetailOpen(true)
                              }}
                            >
                              <td className="p-4 align-middle">{repair.id}</td>
                              <td className="p-4 align-middle">{repair.customerName}</td>
                              <td className="p-4 align-middle">
                                <div>
                                  <p className="font-medium">{repair.brand}</p>
                                  <p className="text-xs text-muted-foreground">{repair.model}</p>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <Badge
                                  variant="outline"
                                  className={`${statusMap[repair.status].color} flex items-center gap-1`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  {statusMap[repair.status].label}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">
                                <Badge variant="outline" className={priorityMap[repair.priority].color}>
                                  {priorityMap[repair.priority].label}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">{formatDate(repair.dateReceived)}</td>
                              <td className="p-4 align-middle">{formatDate(repair.estimatedCompletionDate)}</td>
                              <td className="p-4 align-middle">{repair.technician}</td>
                              <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        setIsRepairDetailOpen(true)
                                      }}
                                    >
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        document.getElementById("status-dropdown-trigger")?.click()
                                      }}
                                    >
                                      Update Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        setIsNoteDialogOpen(true)
                                      }}
                                    >
                                      Add Note
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        document.getElementById("invoice-button")?.click()
                                      }}
                                    >
                                      Generate Invoice
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-4">
              {/* Same table structure as "all" tab but with filtered data */}
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            ID
                            {sortField === "id" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Customer
                            {sortField === "customerName" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Item
                            {sortField === "brand" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Priority
                            {sortField === "priority" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Received
                            {sortField === "dateReceived" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Est. Completion
                            {sortField === "estimatedCompletionDate" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Technician
                            {sortField === "technician" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredRepairs.filter((repair) => repair.status !== "completed").length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-4 text-center text-muted-foreground">
                            No in-progress repairs found.
                          </td>
                        </tr>
                      ) : (
                        filteredRepairs
                          .filter((repair) => repair.status !== "completed")
                          .map((repair) => {
                            const StatusIcon = statusMap[repair.status].icon
                            return (
                              <tr
                                key={repair.id}
                                className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                                onClick={() => {
                                  setSelectedRepair(repair)
                                  setIsRepairDetailOpen(true)
                                }}
                              >
                                <td className="p-4 align-middle">{repair.id}</td>
                                <td className="p-4 align-middle">{repair.customerName}</td>
                                <td className="p-4 align-middle">
                                  <div>
                                    <p className="font-medium">{repair.brand}</p>
                                    <p className="text-xs text-muted-foreground">{repair.model}</p>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge
                                    variant="outline"
                                    className={`${statusMap[repair.status].color} flex items-center gap-1`}
                                  >
                                    <StatusIcon className="h-3 w-3" />
                                    {statusMap[repair.status].label}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge variant="outline" className={priorityMap[repair.priority].color}>
                                    {priorityMap[repair.priority].label}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">{formatDate(repair.dateReceived)}</td>
                                <td className="p-4 align-middle">{formatDate(repair.estimatedCompletionDate)}</td>
                                <td className="p-4 align-middle">{repair.technician}</td>
                                <td className="p-4 align-middle text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedRepair(repair)
                                          setIsRepairDetailOpen(true)
                                        }}
                                      >
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedRepair(repair)
                                          document.getElementById("status-dropdown-trigger")?.click()
                                        }}
                                      >
                                        Update Status
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedRepair(repair)
                                          setIsNoteDialogOpen(true)
                                        }}
                                      >
                                        Add Note
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedRepair(repair)
                                          document.getElementById("invoice-button")?.click()
                                        }}
                                      >
                                        Generate Invoice
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            )
                          })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            ID
                            {sortField === "id" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Customer
                            {sortField === "customerName" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Item
                            {sortField === "brand" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Completed Date
                            {sortField === "actualCompletionDate" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Technician
                            {sortField === "technician" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                          <div className="flex items-center gap-1">
                            Cost
                            {sortField === "cost" && <ArrowUpDown className="h-4 w-4" />}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredRepairs.filter((repair) => repair.status === "completed").length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-muted-foreground">
                            No completed repairs found.
                          </td>
                        </tr>
                      ) : (
                        filteredRepairs
                          .filter((repair) => repair.status === "completed")
                          .map((repair) => (
                            <tr
                              key={repair.id}
                              className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                              onClick={() => {
                                setSelectedRepair(repair)
                                setIsRepairDetailOpen(true)
                              }}
                            >
                              <td className="p-4 align-middle">{repair.id}</td>
                              <td className="p-4 align-middle">{repair.customerName}</td>
                              <td className="p-4 align-middle">
                                <div>
                                  <p className="font-medium">{repair.brand}</p>
                                  <p className="text-xs text-muted-foreground">{repair.model}</p>
                                </div>
                              </td>
                              <td className="p-4 align-middle">{formatDate(repair.actualCompletionDate)}</td>
                              <td className="p-4 align-middle">{repair.technician}</td>
                              <td className="p-4 align-middle">£{repair.cost.toLocaleString()}</td>
                              <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        setIsRepairDetailOpen(true)
                                      }}
                                    >
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRepair(repair)
                                        document.getElementById("invoice-button")?.click()
                                      }}
                                    >
                                      Download Invoice
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleEmailCustomer()
                                      }}
                                    >
                                      Email Customer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Repair Detail Dialog */}
      <Dialog open={isRepairDetailOpen} onOpenChange={setIsRepairDetailOpen}>
        <DialogContent className="max-w-4xl p-0">
          {selectedRepair && (
            <div className="flex flex-col">
              {/* Header with status banner */}
              <div className={`px-4 py-3 ${statusMap[selectedRepair.status].color} border-b`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      Repair #{selectedRepair.id}
                      <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                        {statusMap[selectedRepair.status].label}
                      </Badge>
                    </h2>
                    <p className="text-xs opacity-90 mt-1">
                      {selectedRepair.brand} {selectedRepair.model} - {selectedRepair.serialNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${priorityMap[selectedRepair.priority].color} border-none px-2 py-0.5`}
                    >
                      {priorityMap[selectedRepair.priority].label} Priority
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-4">
                {/* Action buttons */}
                <div className="flex flex-wrap justify-end gap-2 mb-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <FileText className="mr-2 h-3.5 w-3.5" />
                        Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Repair Invoice</DialogTitle>
                        <DialogDescription>Invoice for repair #{selectedRepair.id}</DialogDescription>
                      </DialogHeader>
                      <InvoicePreview
                        invoiceType="sale"
                        customerName={selectedRepair.customerName}
                        items={[
                          {
                            name: `${selectedRepair.brand} ${selectedRepair.model} Repair`,
                            description: selectedRepair.issueDescription,
                            quantity: 1,
                            price: selectedRepair.cost,
                          },
                          ...selectedRepair.partsRequired.map((part) => ({
                            name: part.name,
                            description: `Part #${part.partNumber}`,
                            quantity: 1,
                            price: part.cost,
                          })),
                        ]}
                        additionalInfo={{
                          "Repair ID": selectedRepair.id,
                          "Date Received": formatDate(selectedRepair.dateReceived),
                          "Completion Date": formatDate(
                            selectedRepair.actualCompletionDate || selectedRepair.estimatedCompletionDate,
                          ),
                        }}
                        notes="Thank you for choosing our repair services. All repairs include a 12-month warranty on parts and labor."
                      />
                      <DialogFooter>
                        <Button variant="outline" onClick={handleDownloadInvoice}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                        <Button variant="outline" onClick={handleDownloadInvoice}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" onClick={handleEmailCustomer}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email to Customer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <RefreshCw className="mr-2 h-3.5 w-3.5" />
                        Update Status
                        <ChevronDown className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.entries(statusMap).map(([key, { label, icon: StatusIcon }]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => handleStatusUpdate(key as Repair["status"])}
                          disabled={key === selectedRepair.status}
                          className="flex items-center gap-2"
                        >
                          {StatusIcon && <StatusIcon className="h-4 w-4" />}
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      setIsRepairDetailOpen(false)
                      setIsNoteDialogOpen(true)
                    }}
                  >
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add Note
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left column - Repair Details */}
                  <div>
                    <div className="bg-card rounded-lg border shadow-sm p-3 mb-3">
                      <h3 className="text-sm font-semibold mb-2 flex items-center">
                        <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                        Repair Details
                      </h3>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Item Type:</span>
                          <span className="font-medium">{selectedRepair.itemType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand & Model:</span>
                          <span className="font-medium">
                            {selectedRepair.brand} {selectedRepair.model}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Serial Number:</span>
                          <span className="font-medium">{selectedRepair.serialNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Technician:</span>
                          <span className="font-medium">{selectedRepair.technician}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date Received:</span>
                          <span className="font-medium">{formatDate(selectedRepair.dateReceived)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Est. Completion:</span>
                          <span className="font-medium">{formatDate(selectedRepair.estimatedCompletionDate)}</span>
                        </div>
                        {selectedRepair.actualCompletionDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Actual Completion:</span>
                            <span className="font-medium">{formatDate(selectedRepair.actualCompletionDate)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Repair Cost:</span>
                          <span className="font-medium">£{selectedRepair.cost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Issue Description */}
                    <div className="bg-card rounded-lg border shadow-sm p-3">
                      <h3 className="text-sm font-semibold mb-2">Issue Description</h3>
                      <p className="text-xs">{selectedRepair.issueDescription}</p>
                    </div>
                  </div>

                  {/* Middle column - Customer Information */}
                  <div>
                    <div className="bg-card rounded-lg border shadow-sm p-3">
                      <h3 className="text-sm font-semibold mb-2 flex items-center">
                        <User className="mr-1.5 h-4 w-4 text-muted-foreground" />
                        Customer Information
                      </h3>
                      {customerDetails ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {customerDetails.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{customerDetails.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Customer since {formatDate(customerDetails.customerSince)}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-1.5 mt-2 text-xs">
                            <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/50">
                              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{customerDetails.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/50">
                              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{customerDetails.phone}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-1">
                            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                              <Phone className="mr-1.5 h-3.5 w-3.5" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                              <Mail className="mr-1.5 h-3.5 w-3.5" />
                              Email
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <p className="text-xs text-muted-foreground">Customer details not found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right column - Parts and Notes */}
                  <div>
                    {/* Parts Required */}
                    <div className="bg-card rounded-lg border shadow-sm p-3 mb-3">
                      <h3 className="text-sm font-semibold mb-2 flex items-center">
                        <FileText className="mr-1.5 h-4 w-4 text-muted-foreground" />
                        Parts Required
                      </h3>
                      {selectedRepair.partsRequired.length === 0 ? (
                        <div className="text-center py-2 bg-muted/30 rounded-md">
                          <p className="text-xs text-muted-foreground">No parts required</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedRepair.partsRequired.map((part) => (
                            <div
                              key={part.id}
                              className="flex items-center justify-between p-2 rounded-md bg-muted/30 border-l-2 border-primary/70 text-xs"
                            >
                              <div>
                                <p className="font-medium">{part.name}</p>
                                <p className="text-xs text-muted-foreground">#{part.partNumber}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <Badge
                                  variant="outline"
                                  className={
                                    part.status === "needed"
                                      ? "bg-blue-100 text-blue-800"
                                      : part.status === "ordered"
                                        ? "bg-amber-100 text-amber-800"
                                        : part.status === "received"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-green-100 text-green-800"
                                  }
                                >
                                  {part.status.charAt(0).toUpperCase() + part.status.slice(1)}
                                </Badge>
                                <p className="font-semibold mt-1">£{part.cost.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Notes & Communication */}
                    <div className="bg-card rounded-lg border shadow-sm p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold flex items-center">
                          <MessageSquare className="mr-1.5 h-4 w-4 text-muted-foreground" />
                          Notes
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => {
                            setIsRepairDetailOpen(false)
                            setIsNoteDialogOpen(true)
                          }}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                        {selectedRepair.notes.length === 0 ? (
                          <div className="text-center py-2 bg-muted/30 rounded-md">
                            <p className="text-xs text-muted-foreground">No notes</p>
                          </div>
                        ) : (
                          selectedRepair.notes.map((note) => (
                            <div key={note.id} className="rounded-md border p-2 bg-muted/20 text-xs">
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-1.5">
                                  <Avatar className="h-5 w-5 border">
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                      {note.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-xs">{note.author}</p>
                                    <p className="text-[10px] text-muted-foreground">{formatDate(note.date)}</p>
                                  </div>
                                </div>
                                {note.isInternal && (
                                  <Badge
                                    variant="outline"
                                    className="bg-slate-100 text-slate-800 text-[10px] px-1 py-0"
                                  >
                                    Internal
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs mt-1">{note.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-3 bg-muted/20 flex justify-between items-center mt-3">
                <Button variant="outline" size="sm" onClick={() => setIsRepairDetailOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  {customerDetails && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        if (selectedRepair && customerDetails) {
                          window.location.href = `/customers/profiles/${selectedRepair.customerId}`
                        }
                      }}
                    >
                      <User className="mr-1.5 h-3.5 w-3.5" />
                      View Profile
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => {
                      // In a real app, this would navigate to the edit page
                      toast({
                        title: "Edit Repair",
                        description: `Editing repair ${selectedRepair.id}`,
                      })
                    }}
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit Repair
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Add a note to this repair record.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Enter your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="internal-note"
                checked={isNoteInternal}
                onChange={(e) => setIsNoteInternal(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="internal-note">Internal Note (not visible to customer)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

