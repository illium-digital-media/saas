import { PageLayout } from "@/components/page-layout"
import { SalesExchangeForm } from "@/components/sales-exchange-form"

export default function SalesExchangePage() {
  return (
    <PageLayout title="Exchange Watches" description="Process watch trade-ins and exchanges.">
      <SalesExchangeForm />
    </PageLayout>
  )
}

