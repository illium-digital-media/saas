import { PageLayout } from "@/components/page-layout"
import { CustomerProfileDetail } from "@/components/customer-profile-detail"

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  return (
    <PageLayout title="Customer Profile" description="View and manage customer details.">
      <CustomerProfileDetail />
    </PageLayout>
  )
}

