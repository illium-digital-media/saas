"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { SalesSellForm } from "@/components/sales-sell-form"

export default function SalesSellPage() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
      .then((res) => res.text())
      .then(setMessage)
      .catch((err) => {
        console.error("API error:", err)
        setMessage("Failed to load backend message.")
      })
  }, [])

  return (
    <PageLayout title="Sell Watches" description="Sell watches from your inventory to customers.">
      <p className="mb-4 text-sm text-muted-foreground">{message}</p>
      <SalesSellForm />
    </PageLayout>
  )
}
