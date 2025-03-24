import { PageLayout } from "@/components/page-layout"
import { ReportsCustomersContent } from "@/components/reports-customers-content"

export default function ReportsCustomersPage() {
  return (
    <PageLayout title="Customer Reports" description="Analyze customer behavior and purchasing patterns.">
      <ReportsCustomersContent />
    </PageLayout>
  )
}

