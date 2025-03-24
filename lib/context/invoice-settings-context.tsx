"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface InvoiceSettings {
  companyName: string
  companyLogo: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  companyWebsite: string
  vatNumber: string
  registrationNumber: string
  bankDetails: string
  termsAndConditions: string
  footerText: string
  primaryColor: string
  secondaryColor: string
  showLogo: boolean
  showSignature: boolean
  showWatermark: boolean
  dateFormat: string
  currencySymbol: string
  invoicePrefix: string
}

const defaultSettings: InvoiceSettings = {
  companyName: "Jewellers CRM",
  companyLogo: "/logo.png",
  companyAddress: "123 Jewellery Lane, London, UK",
  companyPhone: "+44 20 1234 5678",
  companyEmail: "info@jewellerscrm.com",
  companyWebsite: "www.jewellerscrm.com",
  vatNumber: "GB123456789",
  registrationNumber: "12345678",
  bankDetails: "Bank: Example Bank\nAccount: 12345678\nSort Code: 12-34-56",
  termsAndConditions:
    "1. All items remain the property of the seller until paid in full.\n2. Returns accepted within 14 days with original receipt.\n3. Special orders are non-refundable.",
  footerText: "Thank you for your business!",
  primaryColor: "#1e40af",
  secondaryColor: "#6b7280",
  showLogo: true,
  showSignature: true,
  showWatermark: false,
  dateFormat: "DD/MM/YYYY",
  currencySymbol: "£",
  invoicePrefix: "INV-",
}

interface InvoiceSettingsContextType {
  settings: InvoiceSettings
  updateSettings: (newSettings: Partial<InvoiceSettings>) => void
  resetSettings: () => void
}

const InvoiceSettingsContext = createContext<InvoiceSettingsContextType | undefined>(undefined)

export function InvoiceSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<InvoiceSettings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("invoiceSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSettings = (newSettings: Partial<InvoiceSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem("invoiceSettings", JSON.stringify(updatedSettings))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem("invoiceSettings")
  }

  return (
    <InvoiceSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </InvoiceSettingsContext.Provider>
  )
}

export function useInvoiceSettings() {
  const context = useContext(InvoiceSettingsContext)
  if (context === undefined) {
    throw new Error("useInvoiceSettings must be used within an InvoiceSettingsProvider")
  }
  return context
}

