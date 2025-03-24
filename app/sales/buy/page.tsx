import { PageLayout } from "@/components/page-layout"
import { SalesBuyForm } from "@/components/sales-buy-form"

export default function SalesBuyPage() {
  return (
    <PageLayout title="Buy Watches" description="Purchase watches from customers or suppliers for your inventory.">
      <SalesBuyForm />
    </PageLayout>
  )
}

