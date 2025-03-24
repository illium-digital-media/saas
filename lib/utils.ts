import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Update the getAvatarColor function to ensure it works consistently
export function getAvatarColor(name: string): string {
  // Use a simple hash function to generate a number from the name
  const hash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)

  // List of Tailwind background colors for avatars
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-lime-500",
  ]

  // Use the hash to select a color
  return colors[hash % colors.length]
}

// Format currency for reports
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date for reports
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

