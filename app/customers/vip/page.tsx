import { PageLayout } from "@/components/page-layout"
import { CustomerVIP } from "@/components/customer-vip"

export default function CustomerVIPPage() {
  return (
    <PageLayout title="VIP Clients" description="Manage your high-value customers and their preferences.">
      <CustomerVIP />
    </PageLayout>
  )
}

