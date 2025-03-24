import { SuppliersDirectory } from "@/components/suppliers-directory"
import { PageLayout } from "@/components/page-layout"
import { Suspense } from "react"

export default function SuppliersPage() {
  return (
    <PageLayout title="Suppliers" description="Manage your watch suppliers and track orders.">
      <Suspense fallback={<div>Loading suppliers...</div>}>
        <SuppliersDirectory />
      </Suspense>
    </PageLayout>
  )
}

