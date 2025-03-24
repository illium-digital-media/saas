"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { watchData } from "@/lib/data"

// Types for our data models
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: string
  totalSpent: number
  lastPurchase: Date
  avatar?: string
  address?: string
  notes?: string
  preferences?: string[]
  customerSince: Date
}

export interface Watch {
  id: string
  brand: string
  model: string
  reference: string
  serialNumber?: string
  condition: string
  price: number
  status: string
  boxPapers?: boolean
  warranty?: boolean
  serviceHistory?: boolean
  year?: string
  image?: string
}

export interface Sale {
  id: string
  type: "buy" | "sell" | "exchange" | "consignment"
  date: Date
  customerId: string
  customerName: string
  watchId: string
  watchDetails: {
    brand: string
    model: string
    reference: string
  }
  amount: number
  paymentMethod: string
  paymentStatus: string
  assignedTo?: string // Make this optional for backward compatibility
  notes?: string
}

export interface Repair {
  id: string
  customerId: string
  customerName: string
  watchId: string
  watchDetails: {
    brand: string
    model: string
    reference: string
  }
  repairType: string
  description: string
  estimatedCost?: number
  estimatedCompletionDate?: Date | null
  actualCompletionDate?: Date | null
  priority: string
  status: string
  assignedTo?: string
  notes?: string
  createdAt: Date
  updatedAt?: Date
}

export interface Supplier {
  id: string
  name: string
  type: string
  email: string
  phone: string
  address?: string
  contactPerson?: string
  status: string
}

interface AppContextType {
  // Data
  customers: Customer[]
  watches: Watch[]
  sales: Sale[]
  suppliers: Supplier[]
  repairs: Repair[]

  // CRUD operations
  addCustomer: (customer: Omit<Customer, "id" | "customerSince" | "totalSpent" | "lastPurchase">) => Customer
  updateCustomer: (id: string, data: Partial<Customer>) => void
  deleteCustomer: (id: string) => void

  addWatch: (watch: Omit<Watch, "id">) => Watch
  updateWatch: (id: string, data: Partial<Watch>) => void
  deleteWatch: (id: string) => void

  addSale: (sale: Omit<Sale, "id" | "date">) => Sale
  updateSale: (id: string, data: Partial<Sale>) => void
  deleteSale: (id: string) => void

  addSupplier: (supplier: Omit<Supplier, "id">) => Supplier
  updateSupplier: (id: string, data: Partial<Supplier>) => void
  deleteSupplier: (id: string) => void

  addRepair: (repair: Omit<Repair, "id" | "createdAt" | "updatedAt">) => Repair
  updateRepair: (id: string, data: Partial<Repair>) => void
  deleteRepair: (id: string) => void

  // Utility functions
  getCustomerById: (id: string) => Customer | undefined
  getWatchById: (id: string) => Watch | undefined
  getSaleById: (id: string) => Sale | undefined
  getSupplierById: (id: string) => Supplier | undefined
  getRepairById: (id: string) => Repair | undefined

  // Filtering and searching
  filterWatchesByStatus: (status: string) => Watch[]
  searchCustomers: (query: string) => Customer[]
  searchWatches: (query: string) => Watch[]
}

// Sample data
const initialCustomers: Customer[] = [
  {
    id: "c1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+44 7123 456789",
    status: "active",
    totalSpent: 32450,
    lastPurchase: new Date(2023, 4, 15),
    customerSince: new Date(2021, 2, 10),
    preferences: ["Rolex", "Omega"],
    address: "123 Main St, London, UK",
  },
  {
    id: "c2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+44 7987 654321",
    status: "vip",
    totalSpent: 78950,
    lastPurchase: new Date(2023, 5, 2),
    customerSince: new Date(2020, 6, 15),
    preferences: ["Patek Philippe", "Audemars Piguet"],
    address: "456 High St, Manchester, UK",
  },
  {
    id: "c3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+44 7456 123789",
    status: "active",
    totalSpent: 12780,
    lastPurchase: new Date(2023, 3, 20),
    customerSince: new Date(2022, 1, 5),
    preferences: ["TAG Heuer", "Tudor"],
    address: "789 Park Lane, Birmingham, UK",
  },
  {
    id: "c4",
    name: "Emily Williams",
    email: "emily.williams@example.com",
    phone: "+44 7789 123456",
    status: "inactive",
    totalSpent: 5230,
    lastPurchase: new Date(2022, 11, 10),
    customerSince: new Date(2021, 9, 18),
    preferences: ["Cartier", "Omega"],
    address: "321 Queen St, Edinburgh, UK",
  },
  {
    id: "c5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+44 7321 987654",
    status: "vip",
    totalSpent: 45670,
    lastPurchase: new Date(2023, 5, 8),
    customerSince: new Date(2020, 3, 22),
    preferences: ["Rolex", "Patek Philippe"],
    address: "654 King Rd, Glasgow, UK",
  },
]

const initialWatches: Watch[] = watchData.map((watch) => ({
  ...watch,
  serialNumber: `SN${Math.floor(Math.random() * 1000000)}`,
  price: typeof watch.price === "number" ? watch.price : Number.parseInt(watch.price.replace(/[^0-9]/g, "")),
  boxPapers: Math.random() > 0.5,
  warranty: Math.random() > 0.5,
  serviceHistory: Math.random() > 0.3,
  year: `20${Math.floor(Math.random() * 23)}`,
  image: "/placeholder.svg?height=200&width=200",
}))

const initialSales: Sale[] = [
  {
    id: "s1",
    type: "sell",
    date: new Date(2023, 4, 18),
    customerId: "c1",
    customerName: "John Doe",
    watchId: "1",
    watchDetails: {
      brand: "Rolex",
      model: "Submariner",
      reference: "126610LN",
    },
    amount: 12500,
    paymentMethod: "credit-card",
    paymentStatus: "completed",
  },
  {
    id: "s2",
    type: "buy",
    date: new Date(2023, 4, 15),
    customerId: "c2",
    customerName: "Jane Smith",
    watchId: "3",
    watchDetails: {
      brand: "Cartier",
      model: "Santos",
      reference: "WSSA0018",
    },
    amount: 6800,
    paymentMethod: "bank-transfer",
    paymentStatus: "completed",
  },
  {
    id: "s3",
    type: "exchange",
    date: new Date(2023, 4, 10),
    customerId: "c3",
    customerName: "Robert Johnson",
    watchId: "2",
    watchDetails: {
      brand: "Omega",
      model: "Speedmaster",
      reference: "311.30.42.30.01.005",
    },
    amount: 3500,
    paymentMethod: "trade-in",
    paymentStatus: "completed",
  },
]

const initialSuppliers: Supplier[] = [
  {
    id: "sup1",
    name: "Luxury Watch Distributors",
    type: "distributor",
    email: "info@luxurywatchdist.com",
    phone: "+44 20 1234 5678",
    address: "1 Commercial St, London, UK",
    contactPerson: "David Wilson",
    status: "active",
  },
  {
    id: "sup2",
    name: "Swiss Watch Imports",
    type: "dealer",
    email: "contact@swissimports.com",
    phone: "+44 20 8765 4321",
    address: "25 Market St, Manchester, UK",
    contactPerson: "Sarah Thompson",
    status: "active",
  },
  {
    id: "sup3",
    name: "Vintage Timepieces",
    type: "dealer",
    email: "info@vintagetimepieces.com",
    phone: "+44 20 5555 9999",
    address: "8 Antique Row, Edinburgh, UK",
    contactPerson: "James Anderson",
    status: "active",
  },
]

const initialRepairs: Repair[] = [
  {
    id: "r1",
    customerId: "c1",
    customerName: "John Doe",
    watchId: "1",
    watchDetails: {
      brand: "Rolex",
      model: "Datejust",
      reference: "126234",
    },
    repairType: "service",
    description: "Full service and water resistance test",
    estimatedCost: 450,
    estimatedCompletionDate: new Date(2023, 5, 30),
    priority: "normal",
    status: "in_progress",
    assignedTo: "Michael Davis",
    createdAt: new Date(2023, 4, 20),
  },
  {
    id: "r2",
    customerId: "c2",
    customerName: "Jane Smith",
    watchId: "3",
    watchDetails: {
      brand: "Omega",
      model: "Seamaster",
      reference: "210.30.42.20.01.001",
    },
    repairType: "battery",
    description: "Battery replacement and pressure test",
    estimatedCost: 120,
    estimatedCompletionDate: new Date(2023, 4, 25),
    priority: "normal",
    status: "completed",
    assignedTo: "Sarah Johnson",
    actualCompletionDate: new Date(2023, 4, 24),
    createdAt: new Date(2023, 4, 18),
  },
]

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [watches, setWatches] = useState<Watch[]>(initialWatches)
  const [sales, setSales] = useState<Sale[]>(initialSales)
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [repairs, setRepairs] = useState<Repair[]>(initialRepairs)

  // Customer CRUD operations
  const addCustomer = (customer: Omit<Customer, "id" | "customerSince" | "totalSpent" | "lastPurchase">) => {
    const newCustomer: Customer = {
      ...customer,
      id: `c${customers.length + 1}`,
      customerSince: new Date(),
      totalSpent: 0,
      lastPurchase: new Date(),
    }

    setCustomers((prev) => [...prev, newCustomer])
    return newCustomer
  }

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    setCustomers((prev) => prev.map((customer) => (customer.id === id ? { ...customer, ...data } : customer)))
  }

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id))
  }

  // Watch CRUD operations
  const addWatch = (watch: Omit<Watch, "id">) => {
    const newWatch: Watch = {
      ...watch,
      id: `w${watches.length + 1}`,
    }

    setWatches((prev) => [...prev, newWatch])
    return newWatch
  }

  const updateWatch = (id: string, data: Partial<Watch>) => {
    setWatches((prev) => prev.map((watch) => (watch.id === id ? { ...watch, ...data } : watch)))
  }

  const deleteWatch = (id: string) => {
    setWatches((prev) => prev.filter((watch) => watch.id !== id))
  }

  // Sale CRUD operations
  const addSale = (sale: Omit<Sale, "id" | "date">) => {
    const newSale: Sale = {
      ...sale,
      id: `s${sales.length + 1}`,
      date: new Date(),
    }

    setSales((prev) => [...prev, newSale])
    return newSale
  }

  const updateSale = (id: string, data: Partial<Sale>) => {
    setSales((prev) => prev.map((sale) => (sale.id === id ? { ...sale, ...data } : sale)))
  }

  const deleteSale = (id: string) => {
    setSales((prev) => prev.filter((sale) => sale.id !== id))
  }

  // Supplier CRUD operations
  const addSupplier = (supplier: Omit<Supplier, "id">) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: `sup${suppliers.length + 1}`,
    }

    setSuppliers((prev) => [...prev, newSupplier])
    return newSupplier
  }

  const updateSupplier = (id: string, data: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((supplier) => (supplier.id === id ? { ...supplier, ...data } : supplier)))
  }

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id))
  }

  // Repair CRUD operations
  const addRepair = (repair: Omit<Repair, "id" | "createdAt" | "updatedAt">) => {
    const newRepair: Repair = {
      ...repair,
      id: `r${repairs.length + 1}`,
      createdAt: new Date(),
    }

    setRepairs((prev) => [...prev, newRepair])
    return newRepair
  }

  const updateRepair = (id: string, data: Partial<Repair>) => {
    setRepairs((prev) =>
      prev.map((repair) =>
        repair.id === id
          ? {
              ...repair,
              ...data,
              updatedAt: new Date(),
            }
          : repair,
      ),
    )
  }

  const deleteRepair = (id: string) => {
    setRepairs((prev) => prev.filter((repair) => repair.id === id))
  }

  // Utility functions
  const getCustomerById = (id: string) => {
    return customers.find((customer) => customer.id === id)
  }

  const getWatchById = (id: string) => {
    return watches.find((watch) => watch.id === id)
  }

  const getSaleById = (id: string) => {
    return sales.find((sale) => sale.id === id)
  }

  const getSupplierById = (id: string) => {
    return suppliers.find((supplier) => supplier.id === id)
  }

  // Utility function
  const getRepairById = (id: string) => {
    return repairs.find((repair) => repair.id === id)
  }

  // Filtering and searching
  const filterWatchesByStatus = (status: string) => {
    if (status === "all") return watches
    return watches.filter((watch) => watch.status === status)
  }

  const searchCustomers = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowerQuery) ||
        customer.email.toLowerCase().includes(lowerQuery) ||
        customer.phone.includes(query),
    )
  }

  const searchWatches = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return watches.filter(
      (watch) =>
        watch.brand.toLowerCase().includes(lowerQuery) ||
        watch.model.toLowerCase().includes(lowerQuery) ||
        watch.reference.toLowerCase().includes(lowerQuery),
    )
  }

  const value = {
    customers,
    watches,
    sales,
    suppliers,
    repairs,

    addCustomer,
    updateCustomer,
    deleteCustomer,

    addWatch,
    updateWatch,
    deleteWatch,

    addSale,
    updateSale,
    deleteSale,

    addSupplier,
    updateSupplier,
    deleteSupplier,

    addRepair,
    updateRepair,
    deleteRepair,

    getCustomerById,
    getWatchById,
    getSaleById,
    getSupplierById,
    getRepairById,

    filterWatchesByStatus,
    searchCustomers,
    searchWatches,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

