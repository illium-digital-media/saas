import { PageLayout } from "@/components/page-layout"
import { InventoryOverview } from "@/components/inventory-overview"

export default function InventoryOverviewPage() {
  return (
    <PageLayout title="Stock Overview" description="View and manage your current watch inventory.">
      <InventoryOverview />
    </PageLayout>
  )
}

