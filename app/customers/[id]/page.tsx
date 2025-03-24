"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function CustomerRedirectPage() {
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    // Redirect to the profiles page
    router.push(`/customers/profiles/${id}`)
  }, [id, router])

  return (
    <div className="container mx-auto py-6">
      <p>Redirecting to customer profile...</p>
    </div>
  )
}

