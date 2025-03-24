"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Trash, Pencil, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { getAvatarColor } from "@/lib/utils"

interface Card {
  id: string
  title: string
  description: string
  status: string
  assignedTo: string
  createdAt: string
}

interface KanbanCardDetailProps {
  card: Card
  onClose: () => void
  onUpdate: (updatedCard: Card) => void
  onDelete: (cardId: string) => void
  onComplete: (cardId: string) => void
}

export function KanbanCardDetail({ card, onClose, onUpdate, onDelete, onComplete }: KanbanCardDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [assignedTo, setAssignedTo] = useState(card.assignedTo)

  const handleSave = () => {
    onUpdate({
      ...card,
      title,
      description,
      assignedTo,
    })
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Card Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe</SelectItem>
                  <SelectItem value="2">Jane Smith</SelectItem>
                  <SelectItem value="3">Robert Johnson</SelectItem>
                  <SelectItem value="4">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-2">{card.title}</h3>
            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{card.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <Avatar className={`h-6 w-6 ${getAvatarColor(card.assignedTo)}`}>
                <AvatarFallback>{card.assignedTo ? card.assignedTo.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                Assigned to:{" "}
                {card.assignedTo === "1"
                  ? "John Doe"
                  : card.assignedTo === "2"
                    ? "Jane Smith"
                    : card.assignedTo === "3"
                      ? "Robert Johnson"
                      : card.assignedTo === "4"
                        ? "Emily Davis"
                        : "Unassigned"}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-6">
              Created: {new Date(card.createdAt).toLocaleString()}
            </div>

            <div className="flex justify-between">
              <div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="mr-2">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this card?")) {
                      onDelete(card.id)
                    }
                  }}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              <Button variant="default" size="sm" onClick={() => onComplete(card.id)}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

