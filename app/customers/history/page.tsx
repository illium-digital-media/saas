import { PageLayout } from "@/components/page-layout"
import { CustomerHistory } from "@/components/customer-history"

export default function CustomerHistoryPage() {
  return (
    <PageLayout title="Purchase History" description="View customer purchase history and transactions.">
      <CustomerHistory />
    </PageLayout>
  )
}

