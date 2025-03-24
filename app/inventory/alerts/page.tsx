import { PageLayout } from "@/components/page-layout"
import { InventoryAlerts } from "@/components/inventory-alerts"

export default function InventoryAlertsPage() {
  return (
    <PageLayout title="Low Stock Alerts" description="Watches that are running low in inventory.">
      <InventoryAlerts />
    </PageLayout>
  )
}

