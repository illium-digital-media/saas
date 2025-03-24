import { SupplierProfileDetail } from "@/components/supplier-profile-detail"

export default function SupplierProfilePage({ params }: { params: { id: string } }) {
  return <SupplierProfileDetail id={params.id} />
}

