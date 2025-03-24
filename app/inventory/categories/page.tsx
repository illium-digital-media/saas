import type { Metadata } from "next"
import { InventoryCategoriesPage } from "@/components/inventory-categories-page"

export const metadata: Metadata = {
  title: "Inventory Categories",
  description: "Manage your inventory categories and subcategories",
}

export default function CategoriesPage() {
  return <InventoryCategoriesPage />
}

