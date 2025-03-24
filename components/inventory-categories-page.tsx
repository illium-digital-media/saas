"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, ChevronRight, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/categories"

export interface Category {
  id: string
  name: string
  parentId: string | null
  description: string
  attributes: CategoryAttribute[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryAttribute {
  id: string
  name: string
  type: "text" | "number" | "boolean" | "select"
  required: boolean
  options?: string[] // For select type
}

export function InventoryCategoriesPage() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("categories")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryParentId, setNewCategoryParentId] = useState<string | null>(null)
  const [newCategoryDescription, setNewCategoryDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        toast({
          title: "Error fetching categories",
          description: "Please try again later",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [toast])

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Category name is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const newCategory: Partial<Category> = {
        name: newCategoryName.trim(),
        parentId: newCategoryParentId,
        description: newCategoryDescription,
        attributes: [],
        isActive: true,
      }

      const addedCategory = await addCategory(newCategory)
      setCategories((prev) => [...prev, addedCategory])
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Category added successfully",
        description: `${newCategoryName} has been added to your categories`,
      })
    } catch (error) {
      toast({
        title: "Failed to add category",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      toast({
        title: "Category name is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const updatedCategory = await updateCategory(editingCategory.id, editingCategory)
      setCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
      setIsEditDialogOpen(false)
      setEditingCategory(null)
      toast({
        title: "Category updated successfully",
        description: `${updatedCategory.name} has been updated`,
      })
    } catch (error) {
      toast({
        title: "Failed to update category",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async () => {
    if (!editingCategory) return

    setIsSubmitting(true)
    try {
      await deleteCategory(editingCategory.id)

      // Remove the category and its children
      const idsToRemove = new Set<string>()

      // Helper function to collect all descendant IDs
      const collectDescendantIds = (parentId: string) => {
        categories.forEach((cat) => {
          if (cat.parentId === parentId) {
            idsToRemove.add(cat.id)
            collectDescendantIds(cat.id)
          }
        })
      }

      idsToRemove.add(editingCategory.id)
      collectDescendantIds(editingCategory.id)

      setCategories((prev) => prev.filter((cat) => !idsToRemove.has(cat.id)))
      setIsDeleteDialogOpen(false)
      setEditingCategory(null)
      toast({
        title: "Category deleted successfully",
        description: `${editingCategory.name} and its subcategories have been removed`,
      })
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setNewCategoryName("")
    setNewCategoryParentId(null)
    setNewCategoryDescription("")
  }

  // Get root categories (those without a parent)
  const rootCategories = categories.filter((cat) => cat.parentId === null)

  // Function to render a category and its children recursively
  const renderCategoryTree = (category: Category, depth = 0) => {
    const hasChildren = categories.some((cat) => cat.parentId === category.id)
    const isExpanded = expandedCategories[category.id] || false
    const childCategories = categories.filter((cat) => cat.parentId === category.id)

    return (
      <div key={category.id} className="category-tree-item">
        <div
          className={`flex items-center py-2 px-2 hover:bg-gray-100 rounded ${depth > 0 ? "ml-6" : ""}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {hasChildren ? (
            <button onClick={() => handleToggleExpand(category.id)} className="mr-1 text-gray-500 hover:text-gray-700">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <div className="w-5 h-5 mr-1"></div>
          )}

          <span className={`flex-grow ${!category.isActive ? "text-gray-400" : ""}`}>{category.name}</span>

          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingCategory(category)
                setIsEditDialogOpen(true)
              }}
              className="h-8 w-8"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingCategory(category)
                setIsDeleteDialogOpen(true)
              }}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="category-children">
            {childCategories.map((childCat) => renderCategoryTree(childCat, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Categories</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Management</CardTitle>
              <CardDescription>Organize your inventory with hierarchical categories and subcategories</CardDescription>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No categories found</p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Create your first category
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-1">{rootCategories.map((category) => renderCategoryTree(category))}</div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Settings</CardTitle>
              <CardDescription>Configure how categories work in your inventory system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-multi-category" className="font-medium">
                    Allow Multiple Categories
                  </Label>
                  <p className="text-sm text-muted-foreground">Items can belong to multiple categories at once</p>
                </div>
                <Switch id="allow-multi-category" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inherit-attributes" className="font-medium">
                    Inherit Parent Attributes
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Subcategories inherit attributes from parent categories
                  </p>
                </div>
                <Switch id="inherit-attributes" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="required-category" className="font-medium">
                    Require Category Assignment
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    All inventory items must be assigned to at least one category
                  </p>
                </div>
                <Switch id="required-category" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category or subcategory for your inventory items</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Rolex, Datejust"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent">Parent Category (Optional)</Label>
              <Select
                value={newCategoryParentId || ""}
                onValueChange={(value) => setNewCategoryParentId(value === "" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Root Category)</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Describe this category..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the details for this category</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-parent">Parent Category</Label>
                <Select
                  value={editingCategory.parentId || ""}
                  onValueChange={(value) =>
                    setEditingCategory({
                      ...editingCategory,
                      parentId: value === "" ? null : value,
                    })
                  }
                  disabled={categories.some((cat) => cat.parentId === editingCategory.id)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Root Category)</SelectItem>
                    {categories
                      .filter(
                        (cat) =>
                          cat.id !== editingCategory.id &&
                          !isCategoryDescendant(categories, cat.id, editingCategory.id),
                      )
                      .map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {categories.some((cat) => cat.parentId === editingCategory.id) && (
                  <p className="text-sm text-muted-foreground">
                    Cannot change parent because this category has subcategories
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingCategory.isActive}
                  onCheckedChange={(checked) =>
                    setEditingCategory({
                      ...editingCategory,
                      isActive: checked,
                    })
                  }
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setEditingCategory(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>Are you sure you want to delete this category?</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <>
              <div className="py-4">
                <Alert variant="destructive">
                  <AlertDescription>
                    This will permanently delete <strong>{editingCategory.name}</strong>
                    {categories.some((cat) => cat.parentId === editingCategory.id) && " and all its subcategories"}.
                    This action cannot be undone.
                  </AlertDescription>
                </Alert>

                {getItemsInCategory(editingCategory.id).length > 0 && (
                  <div className="mt-4 text-amber-600">
                    <p>
                      Warning: {getItemsInCategory(editingCategory.id).length} inventory items are assigned to this
                      category. These items will need to be reassigned.
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDeleteDialogOpen(false)
                    setEditingCategory(null)
                  }}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteCategory} disabled={isSubmitting}>
                  {isSubmitting ? "Deleting..." : "Delete Category"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper function to check if a category is a descendant of another
function isCategoryDescendant(categories: Category[], categoryId: string, potentialAncestorId: string): boolean {
  const category = categories.find((cat) => cat.id === categoryId)
  if (!category || !category.parentId) return false
  if (category.parentId === potentialAncestorId) return true
  return isCategoryDescendant(categories, category.parentId, potentialAncestorId)
}

// Mock function to get items in a category - replace with actual implementation
function getItemsInCategory(categoryId: string): any[] {
  // This would be replaced with actual data fetching
  return []
}

