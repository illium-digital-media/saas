import { PageLayout } from "@/components/page-layout"
import { InvoiceTracking } from "@/components/invoice-tracking"

export default function InvoiceTrackingPage() {
  return (
    <PageLayout title="Payment Tracking" description="Monitor and manage customer payments.">
      <InvoiceTracking />
    </PageLayout>
  )
}

