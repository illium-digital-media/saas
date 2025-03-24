import { PageLayout } from "@/components/page-layout"
import { RepairTracking } from "@/components/repair-tracking"

export default function RepairTrackingPage() {
  return (
    <PageLayout title="Repair Tracking" description="Track and manage ongoing repair and service requests.">
      <RepairTracking />
    </PageLayout>
  )
}

