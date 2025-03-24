import { Suspense } from "react"
import { PageLayout } from "@/components/page-layout"
import { TransactionComplete } from "@/components/transaction-complete"

export default function TransactionCompletePage() {
  return (
    <PageLayout title="Transaction Complete" description="Your transaction has been successfully processed.">
      <Suspense fallback={<TransactionLoadingSkeleton />}>
        <TransactionComplete />
      </Suspense>
    </PageLayout>
  )
}

function TransactionLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading transaction details...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    </div>
  )
}

