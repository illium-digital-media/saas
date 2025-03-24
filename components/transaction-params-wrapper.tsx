"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"

export function TransactionParamsWrapper({ children }: { children: React.ReactNode }) {
  // This component exists solely to access the search params
  // and pass them down to children via context if needed
  const searchParams = useSearchParams()

  return <>{children}</>
}

