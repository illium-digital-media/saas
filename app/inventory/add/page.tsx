import { PageLayout } from "@/components/page-layout"
import { InventoryAddForm } from "@/components/inventory-add-form"

export default function InventoryAddPage() {
  return (
    <PageLayout title="Add New Stock" description="Add new watches to your inventory.">
      <InventoryAddForm />
    </PageLayout>
  )
}

