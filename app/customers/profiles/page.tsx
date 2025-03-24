import { PageLayout } from "@/components/page-layout"
import { CustomerProfiles } from "@/components/customer-profiles"

export default function CustomerProfilesPage() {
  return (
    <PageLayout title="Customer Profiles" description="View and manage your customer profiles.">
      <CustomerProfiles />
    </PageLayout>
  )
}

