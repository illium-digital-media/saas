"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export type CustomerData = {
  id: string
  name: string
  email: string
  phone: string
  status: string
  vipTier: string
  address: string
  customerSince: Date
  totalPurchases: number
  lastPurchase: Date
  preferences: string[]
  notes: string
  assignedTo: string
  nextFollowup: Date
}

interface EditCustomerProfileModalProps {
  customer: CustomerData
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedCustomer: CustomerData) => void
}

export function EditCustomerProfileModal({ customer, open, onOpenChange, onSave }: EditCustomerProfileModalProps) {
  const [formData, setFormData] = useState<CustomerData>({ ...customer })
  const [newPreference, setNewPreference] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPreference = () => {
    if (newPreference.trim() && !formData.preferences.includes(newPreference.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferences: [...prev.preferences, newPreference.trim()],
      }))
      setNewPreference("")
    }
  }

  const handleRemovePreference = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((p) => p !== preference),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Customer Profile</DialogTitle>
          <DialogDescription>Update customer information and preferences.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vipTier">VIP Tier</Label>
                <Select
                  name="vipTier"
                  value={formData.vipTier}
                  onValueChange={(value) => handleSelectChange("vipTier", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select VIP tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={2} />
            </div>

            <div className="space-y-2">
              <Label>Preferences</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.preferences.map((preference) => (
                  <Badge key={preference} variant="secondary" className="flex items-center gap-1">
                    {preference}
                    <button
                      type="button"
                      onClick={() => handleRemovePreference(preference)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {preference}</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  placeholder="Add preference"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPreference}
                  disabled={!newPreference.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

