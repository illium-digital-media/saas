"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Archive } from "lucide-react"
import { getAvatarColor } from "@/lib/utils"

type CardStatus = "request" | "in-progress" | "complete"

interface Card {
  id: string
  title: string
  description: string
  status: string
  assignedTo: string
  createdAt: string
}

interface KanbanCardProps {
  card: Card
  onDragStart: () => void
  onClick: () => void
  onArchive: () => void
}

const channelLabels = {
  "need-sourcing": "Sourcing",
  "needs-postage": "Postage",
  "stock-needs-images": "Images",
}

export function KanbanCard({ card, onDragStart, onClick, onArchive }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="mb-2 p-3 bg-background rounded-md border cursor-pointer hover:border-primary transition-colors relative group"
    >
      <div onClick={onClick}>
        <h4 className="font-medium line-clamp-2 pr-6">{card.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{card.description}</p>
        <div className="flex items-center mt-3">
          <Avatar className={`h-6 w-6 ${getAvatarColor(card.assignedTo ? card.assignedTo.charAt(0) : "U")}`}>
            <AvatarFallback>{card.assignedTo ? card.assignedTo.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onArchive()
        }}
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Archive className="h-4 w-4" />
      </Button>
    </div>
  )
}

