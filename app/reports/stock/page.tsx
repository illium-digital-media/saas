import { PageLayout } from "@/components/page-layout"
import { ReportsStockContent } from "@/components/reports-stock-content"

export default function ReportsStockPage() {
  return (
    <PageLayout title="Stock Reports" description="Analyze inventory levels and stock performance.">
      <ReportsStockContent />
    </PageLayout>
  )
}

