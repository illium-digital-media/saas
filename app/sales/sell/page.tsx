import { PageLayout } from "@/components/page-layout"
import { SalesSellForm } from "@/components/sales-sell-form"

export default function SalesSellPage() {
  return (
    <PageLayout title="Sell Watches" description="Sell watches from your inventory to customers.">
      <SalesSellForm />
    </PageLayout>
  )
}

