import { PageLayout } from "@/components/page-layout"
import { ReportsSalesContent } from "@/components/reports-sales-content"
import { DateRangePickerV45 } from "@/components/date-range-picker-v45"
import { ReportDownload } from "@/components/report-download"

export default function ReportsSalesPage() {
  return (
    <PageLayout
      title="Sales Reports"
      description="Analyze sales performance and trends."
      actions={
        <div className="flex items-center space-x-2">
          <DateRangePickerV45 />
          <ReportDownload />
        </div>
      }
    >
      <ReportsSalesContent />
    </PageLayout>
  )
}

