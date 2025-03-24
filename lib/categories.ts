import type { Category } from "@/components/inventory-categories-page"

// Mock data for initial categories
const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Rolex",
    parentId: null,
    description: "Luxury Swiss watches",
    attributes: [
      {
        id: "attr-1",
        name: "Movement",
        type: "select",
        required: true,
        options: ["Automatic", "Manual", "Quartz"],
      },
      {
        id: "attr-2",
        name: "Case Material",
        type: "select",
        required: true,
        options: ["Stainless Steel", "Yellow Gold", "White Gold", "Rose Gold", "Platinum"],
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Datejust",
    parentId: "cat-1",
    description: "Classic Rolex model with date function",
    attributes: [
      {
        id: "attr-3",
        name: "Dial Color",
        type: "text",
        required: false,
      },
      {
        id: "attr-4",
        name: "Bezel Type",
        type: "select",
        required: true,
        options: ["Fluted", "Smooth", "Engine Turned"],
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Submariner",
    parentId: "cat-1",
    description: "Professional diving watch",
    attributes: [
      {
        id: "attr-5",
        name: "Water Resistance",
        type: "number",
        required: true,
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Omega",
    parentId: null,
    description: "Swiss luxury watchmaker",
    attributes: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Speedmaster",
    parentId: "cat-4",
    description: "Chronograph watches",
    attributes: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// In a real application, these functions would interact with a database
// For now, we'll use local storage to persist data between page refreshes

// Helper to get categories from storage or use mock data
function getCategoriesFromStorage(): Category[] {
  if (typeof window === "undefined") return mockCategories

  const stored = localStorage.getItem("inventory-categories")
  if (!stored) {
    localStorage.setItem("inventory-categories", JSON.stringify(mockCategories))
    return mockCategories
  }

  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error("Error parsing stored categories", e)
    return mockCategories
  }
}

// Helper to save categories to storage
function saveCategoriestoStorage(categories: Category[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("inventory-categories", JSON.stringify(categories))
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getCategoriesFromStorage()
}

// Add a new category
export async function addCategory(category: Partial<Category>): Promise<Category> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const categories = getCategoriesFromStorage()

  const newCategory: Category = {
    id: `cat-${Date.now()}`,
    name: category.name || "New Category",
    parentId: category.parentId || null,
    description: category.description || "",
    attributes: category.attributes || [],
    isActive: category.isActive !== undefined ? category.isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedCategories = [...categories, newCategory]
  saveCategoriestoStorage(updatedCategories)

  return newCategory
}

// Update an existing category
export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const categories = getCategoriesFromStorage()
  const categoryIndex = categories.findIndex((cat) => cat.id === id)

  if (categoryIndex === -1) {
    throw new Error(`Category with ID ${id} not found`)
  }

  const updatedCategory = {
    ...categories[categoryIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  categories[categoryIndex] = updatedCategory
  saveCategoriestoStorage(categories)

  return updatedCategory
}

// Delete a category
export async function deleteCategory(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const categories = getCategoriesFromStorage()
  const updatedCategories = categories.filter((cat) => cat.id !== id)

  saveCategoriestoStorage(updatedCategories)
}

// Get a single category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const categories = getCategoriesFromStorage()
  const category = categories.find((cat) => cat.id === id)

  return category || null
}

