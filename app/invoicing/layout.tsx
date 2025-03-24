import type React from "react"
import type { Metadata } from "next"

import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  title: "Invoicing",
  description: "Manage invoices, payments, and refunds",
}

interface InvoicingLayoutProps {
  children: React.ReactNode
}

export default function InvoicingLayout({ children }: InvoicingLayoutProps) {
  return <Shell>{children}</Shell>
}

