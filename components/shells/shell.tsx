import type { ReactNode } from "react"

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* This is a placeholder for the common shell structure */}
      {/* The actual implementation would include the common header and sidebar */}
      {children}
    </div>
  )
}

