import { PageLayout } from "@/components/page-layout"
import { InvoiceRefunds } from "@/components/invoice-refunds"

export default function InvoiceRefundsPage() {
  return (
    <PageLayout title="Refunds & Returns" description="Process and manage customer refunds and returns.">
      <InvoiceRefunds />
    </PageLayout>
  )
}

