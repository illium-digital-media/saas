"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomerSelectionModal } from "@/components/customer-selection-modal"
import { WatchSelectionModal } from "@/components/watch-selection-modal"
import { useAppContext } from "@/lib/context/app-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewCustomerForm } from "@/components/new-customer-form"
import { toast } from "@/components/ui/use-toast"

export function RepairRequestForm() {
  const router = useRouter()
  const { customers, watches } = useAppContext()
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false)
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const [selectedWatch, setSelectedWatch] = useState<any | null>(null)
  const [repairDetails, setRepairDetails] = useState({
    issueDescription: "",
    priority: "normal",
    estimatedCost: "",
    estimatedCompletionDays: "",
    technician: "",
    additionalNotes: "",
  })

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer)
    setIsCustomerModalOpen(false)
  }

  const handleWatchSelect = (watch: any) => {
    setSelectedWatch(watch)
    setIsWatchModalOpen(false)
  }

  const handleNewCustomerSubmit = (customerData: any) => {
    // In a real app, this would call an API to create a new customer
    const newCustomer = {
      id: `c${customers.length + 1}`,
      ...customerData,
      customerSince: new Date(),
    }

    setSelectedCustomer(newCustomer)
    setIsNewCustomerDialogOpen(false)

    toast({
      title: "Customer added",
      description: "New customer has been added successfully",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRepairDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setRepairDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCustomer) {
      toast({
        title: "Customer required",
        description: "Please select a customer for this repair",
        variant: "destructive",
      })
      return
    }

    if (!selectedWatch) {
      toast({
        title: "Watch required",
        description: "Please select a watch for this repair",
        variant: "destructive",
      })
      return
    }

    if (!repairDetails.issueDescription) {
      toast({
        title: "Description required",
        description: "Please provide a description of the issue",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to create a new repair request
    const repairData = {
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      watchId: selectedWatch.id,
      watchDetails: selectedWatch,
      ...repairDetails,
      dateReceived: new Date(),
      status: "received",
    }

    console.log("Repair request submitted:", repairData)

    toast({
      title: "Repair request created",
      description: "The repair request has been created successfully",
    })

    // Redirect to the repair tracking page
    router.push("/repairs/tracking")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Repair Request</CardTitle>
          <CardDescription>Create a new watch repair or service request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Customer Information</h3>
                <p className="text-sm text-muted-foreground">Select an existing customer or create a new one</p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Customer</Label>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsCustomerModalOpen(true)}>
                      Select Customer
                    </Button>
                    <Dialog open={isNewCustomerDialogOpen} onOpenChange={setIsNewCustomerDialogOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                          New Customer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Add New Customer</DialogTitle>
                          <DialogDescription>Enter the details for the new customer</DialogDescription>
                        </DialogHeader>
                        <NewCustomerForm onSubmit={handleNewCustomerSubmit} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {selectedCustomer ? (
                  <div className="rounded-md border p-4">
                    <div className="font-medium">{selectedCustomer.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedCustomer.email}</div>
                    <div className="text-sm text-muted-foreground">{selectedCustomer.phone}</div>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                    No customer selected
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Watch</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsWatchModalOpen(true)}
                    disabled={!selectedCustomer}
                  >
                    Select Watch
                  </Button>
                </div>

                {selectedWatch ? (
                  <div className="rounded-md border p-4">
                    <div className="font-medium">
                      {selectedWatch.brand} {selectedWatch.model}
                    </div>
                    <div className="text-sm text-muted-foreground">Reference: {selectedWatch.reference}</div>
                    <div className="text-sm text-muted-foreground">Serial: {selectedWatch.serialNumber}</div>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                    {selectedCustomer ? "No watch selected" : "Select a customer first"}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Repair Details</h3>
                <p className="text-sm text-muted-foreground">Provide details about the repair or service needed</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="issueDescription">Issue Description</Label>
                  <Textarea
                    id="issueDescription"
                    name="issueDescription"
                    placeholder="Describe the issue with the watch"
                    value={repairDetails.issueDescription}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <RadioGroup
                      value={repairDetails.priority}
                      onValueChange={(value) => handleSelectChange("priority", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="priority-low" />
                        <Label htmlFor="priority-low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="priority-normal" />
                        <Label htmlFor="priority-normal">Normal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="priority-high" />
                        <Label htmlFor="priority-high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="priority-urgent" />
                        <Label htmlFor="priority-urgent">Urgent</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCost">Estimated Cost (£)</Label>
                      <Input
                        id="estimatedCost"
                        name="estimatedCost"
                        type="number"
                        placeholder="0.00"
                        value={repairDetails.estimatedCost}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCompletionDays">Est. Days to Complete</Label>
                      <Input
                        id="estimatedCompletionDays"
                        name="estimatedCompletionDays"
                        type="number"
                        placeholder="7"
                        value={repairDetails.estimatedCompletionDays}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technician">Assigned Technician</Label>
                    <Select
                      value={repairDetails.technician}
                      onValueChange={(value) => handleSelectChange("technician", value)}
                    >
                      <SelectTrigger id="technician">
                        <SelectValue placeholder="Select a technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="David Wilson">David Wilson</SelectItem>
                        <SelectItem value="Emma Thompson">Emma Thompson</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Any additional information or special instructions"
                  value={repairDetails.additionalNotes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Create Repair Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <CustomerSelectionModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSelect={handleCustomerSelect}
      />

      <WatchSelectionModal
        isOpen={isWatchModalOpen}
        onClose={() => setIsWatchModalOpen(false)}
        onSelect={handleWatchSelect}
        customerId={selectedCustomer?.id}
      />
    </div>
  )
}

