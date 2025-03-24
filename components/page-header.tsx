import type React from "react"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  heading: string
  subheading?: string
  children?: React.ReactNode
}

export function PageHeader({ heading, subheading, children, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
      {subheading && <p className="text-muted-foreground">{subheading}</p>}
      {children}
    </div>
  )
}

