"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface NewCustomerFormProps {
  onSubmit: (data: any) => void
}

export function NewCustomerForm({ onSubmit }: NewCustomerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
    dateOfBirth: undefined as Date | undefined,
    preferredContact: "email",
    vipStatus: "none",
    marketingConsent: false,
    notes: "",
    preferences: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: checked ? [...prev.preferences, preference] : prev.preferences.filter((p) => p !== preference),
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+44 7700 900123"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateOfBirth && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={formData.dateOfBirth} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Watch Street"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="London" value={formData.city} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="SW1A 1AA"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Switzerland">Switzerland</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredContact">Preferred Contact Method</Label>
          <Select
            value={formData.preferredContact}
            onValueChange={(value) => handleSelectChange("preferredContact", value)}
          >
            <SelectTrigger id="preferredContact">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="post">Post</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vipStatus">VIP Status</Label>
          <RadioGroup value={formData.vipStatus} onValueChange={(value) => handleSelectChange("vipStatus", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="vip-none" />
              <Label htmlFor="vip-none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bronze" id="vip-bronze" />
              <Label htmlFor="vip-bronze">Bronze</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="silver" id="vip-silver" />
              <Label htmlFor="vip-silver">Silver</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gold" id="vip-gold" />
              <Label htmlFor="vip-gold">Gold</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferences</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pref-luxury"
              checked={formData.preferences.includes("Luxury Watches")}
              onCheckedChange={(checked) => handlePreferenceChange("Luxury Watches", checked as boolean)}
            />
            <Label htmlFor="pref-luxury">Luxury Watches</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pref-vintage"
              checked={formData.preferences.includes("Vintage Watches")}
              onCheckedChange={(checked) => handlePreferenceChange("Vintage Watches", checked as boolean)}
            />
            <Label htmlFor="pref-vintage">Vintage Watches</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pref-sports"
              checked={formData.preferences.includes("Sports Watches")}
              onCheckedChange={(checked) => handlePreferenceChange("Sports Watches", checked as boolean)}
            />
            <Label htmlFor="pref-sports">Sports Watches</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pref-dress"
              checked={formData.preferences.includes("Dress Watches")}
              onCheckedChange={(checked) => handlePreferenceChange("Dress Watches", checked as boolean)}
            />
            <Label htmlFor="pref-dress">Dress Watches</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any additional information about the customer"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketingConsent"
          checked={formData.marketingConsent}
          onCheckedChange={(checked) => handleCheckboxChange("marketingConsent", checked as boolean)}
        />
        <Label htmlFor="marketingConsent">Customer consents to receive marketing communications</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Add Customer</Button>
      </div>
    </form>
  )
}

