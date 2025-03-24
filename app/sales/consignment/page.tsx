import { PageLayout } from "@/components/page-layout"
import { SalesConsignmentForm } from "@/components/sales-consignment-form"

export default function SalesConsignmentPage() {
  return (
    <PageLayout title="Consignment Sales" description="Manage watches sold on behalf of customers.">
      <SalesConsignmentForm />
    </PageLayout>
  )
}

