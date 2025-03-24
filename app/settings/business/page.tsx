import { PageLayout } from "@/components/page-layout"
import { BusinessInformationForm } from "@/components/business-information-form"

export default function BusinessInformationPage() {
  return (
    <PageLayout
      title="Business Information"
      description="Manage your business details, appearance, and system preferences"
    >
      <BusinessInformationForm />
    </PageLayout>
  )
}

