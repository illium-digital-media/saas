import { PageLayout } from "@/components/page-layout"
import { RepairRequestForm } from "@/components/repair-request-form"

export default function RepairRequestsPage() {
  return (
    <PageLayout title="Repair Requests" description="Create a new repair or service request for a customer's watch.">
      <RepairRequestForm />
    </PageLayout>
  )
}

