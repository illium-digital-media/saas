import { PageLayout } from "@/components/page-layout"
import { InvoiceGenerator } from "@/components/invoice-generator"

export default function InvoiceGeneratePage() {
  return (
    <PageLayout title="Generate Invoices" description="Create a new invoice for a customer.">
      <InvoiceGenerator />
    </PageLayout>
  )
}

