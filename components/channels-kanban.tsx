"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Archive, Edit, Trash, CheckCircle2, MoreHorizontal, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getAvatarColor } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

// Define types
type CardStatus = "need-sourcing" | "needs-postage" | "stock-needs-images"
type CardState = "active" | "archived"

type KanbanCard = {
  id: string
  title: string
  description: string
  status: CardStatus
  state: CardState
  createdAt: Date
  updatedAt: Date
  assignedTo?: {
    id: string
    name: string
    avatar?: string
  }
}

type TeamMember = {
  id: string
  name: string
}

// Mock data
const initialCards: KanbanCard[] = [
  {
    id: "card-1",
    title: "Rolex Daytona 116500LN",
    description:
      "Need to source this model for a VIP client. Client is willing to pay up to 10% over retail for this model with white dial.",
    status: "need-sourcing",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    assignedTo: {
      id: "1",
      name: "Alex Johnson",
    },
  },
  {
    id: "card-2",
    title: "Omega Speedmaster to NYC",
    description:
      "Customer needs expedited shipping. Package prepared and scheduled FedEx Priority Overnight pickup for tomorrow morning.",
    status: "needs-postage",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    assignedTo: {
      id: "2",
      name: "Sarah Williams",
    },
  },
  {
    id: "card-3",
    title: "Patek Philippe Nautilus",
    description:
      "Need professional photos for the website. Photos have been taken and uploaded to the website. All 5 angles as requested.",
    status: "stock-needs-images",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    assignedTo: {
      id: "3",
      name: "Michael Brown",
    },
  },
  {
    id: "card-4",
    title: "Tudor Black Bay 58",
    description:
      "Need to source blue dial version. Customer is flexible on delivery timeline but wants to be notified when available.",
    status: "need-sourcing",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
  },
  {
    id: "card-5",
    title: "Cartier Santos to Dubai",
    description: "International shipping required. Customs forms completed, waiting for final insurance confirmation.",
    status: "needs-postage",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    assignedTo: {
      id: "4",
      name: "David Miller",
    },
  },
  {
    id: "card-6",
    title: "New Grand Seiko Collection",
    description:
      "Need lifestyle and detail shots. Photographer scheduled for tomorrow morning. Will focus on dial texture and case finishing.",
    status: "stock-needs-images",
    state: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    assignedTo: {
      id: "5",
      name: "Emma Davis",
    },
  },
  {
    id: "card-7",
    title: "Breitling Navitimer",
    description: "Archived sourcing request. Found through authorized dealer in Manchester.",
    status: "need-sourcing",
    state: "archived",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    assignedTo: {
      id: "1",
      name: "Alex Johnson",
    },
  },
  {
    id: "card-8",
    title: "IWC Portugieser to Paris",
    description: "Archived postage request. Successfully delivered to customer in Paris.",
    status: "needs-postage",
    state: "archived",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
    assignedTo: {
      id: "2",
      name: "Sarah Williams",
    },
  },
]

const teamMembers: TeamMember[] = [
  { id: "1", name: "Alex Johnson" },
  { id: "2", name: "Sarah Williams" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "David Miller" },
  { id: "5", name: "Emma Davis" },
]

export function ChannelsKanban() {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [showArchived, setShowArchived] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Filter cards based on search query and archived status
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArchiveState = showArchived ? card.state === "archived" : card.state === "active"
    return matchesSearch && matchesArchiveState
  })

  // Group cards by status
  const needSourcingCards = filteredCards.filter((card) => card.status === "need-sourcing")
  const needsPostageCards = filteredCards.filter((card) => card.status === "needs-postage")
  const stockNeedsImagesCards = filteredCards.filter((card) => card.status === "stock-needs-images")

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the card that was dragged
    const card = cards.find((c) => c.id === draggableId)
    if (!card) return

    // Create a new array without the dragged card
    const newCards = cards.filter((c) => c.id !== draggableId)

    // Determine the new status based on the destination droppableId
    let newStatus: CardStatus = "need-sourcing"
    if (destination.droppableId === "needs-postage") {
      newStatus = "needs-postage"
    } else if (destination.droppableId === "stock-needs-images") {
      newStatus = "stock-needs-images"
    }

    // Create an updated card with the new status
    const updatedCard = {
      ...card,
      status: newStatus,
      updatedAt: new Date(),
    }

    // Insert the updated card into the new array
    newCards.push(updatedCard)

    // Update the state
    setCards(newCards)
  }

  const handleCardClick = (card: KanbanCard) => {
    setSelectedCard(card)
    setDetailOpen(true)
  }

  const handleCardUpdate = (updatedCard: KanbanCard) => {
    setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)))
    setSelectedCard(updatedCard)
  }

  const handleAddCard = (status: CardStatus) => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: "New Request",
      description: "Add description here",
      status,
      state: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setCards([...cards, newCard])
    setSelectedCard(newCard)
    setDetailOpen(true)
  }

  const handleArchiveCard = (cardId: string) => {
    setCards(cards.map((card) => (card.id === cardId ? { ...card, state: "archived", updatedAt: new Date() } : card)))
  }

  const handleRestoreCard = (cardId: string) => {
    setCards(cards.map((card) => (card.id === cardId ? { ...card, state: "active", updatedAt: new Date() } : card)))
  }

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId))
    if (selectedCard?.id === cardId) {
      setDetailOpen(false)
      setSelectedCard(null)
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Channels</h2>
          <p className="text-muted-foreground">Track requests and tasks across different channels</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={showArchived ? "default" : "outline"} onClick={() => setShowArchived(!showArchived)}>
            <Archive className="mr-2 h-4 w-4" />
            {showArchived ? "Viewing Archived" : "View Archived"}
          </Button>
          {!showArchived && (
            <Button onClick={() => handleAddCard("need-sourcing")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Request
            </Button>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Need Sourcing Column */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Need Sourcing</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{needSourcingCards.length}</Badge>
                {!showArchived && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAddCard("need-sourcing")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <Droppable droppableId="need-sourcing" isDropDisabled={showArchived}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-muted/40 p-2 rounded-lg min-h-[500px]"
                >
                  {needSourcingCards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={showArchived}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="p-3 pb-0">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleCardClick(card)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    {card.state === "active" ? (
                                      <DropdownMenuItem onClick={() => handleArchiveCard(card.id)}>
                                        <Archive className="mr-2 h-4 w-4" />
                                        Archive
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleRestoreCard(card.id)}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Restore
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCard(card.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardDescription
                                className="text-xs line-clamp-2 mt-1"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.description}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(card.updatedAt, { addSuffix: true })}
                              </div>
                              {card.assignedTo && (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={getAvatarColor(card.assignedTo.name)}>
                                    {card.assignedTo.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Needs Postage Column */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Postage</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{needsPostageCards.length}</Badge>
                {!showArchived && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAddCard("needs-postage")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <Droppable droppableId="needs-postage" isDropDisabled={showArchived}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-muted/40 p-2 rounded-lg min-h-[500px]"
                >
                  {needsPostageCards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={showArchived}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="p-3 pb-0">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleCardClick(card)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    {card.state === "active" ? (
                                      <DropdownMenuItem onClick={() => handleArchiveCard(card.id)}>
                                        <Archive className="mr-2 h-4 w-4" />
                                        Archive
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleRestoreCard(card.id)}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Restore
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCard(card.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardDescription
                                className="text-xs line-clamp-2 mt-1"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.description}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(card.updatedAt, { addSuffix: true })}
                              </div>
                              {card.assignedTo && (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={getAvatarColor(card.assignedTo.name)}>
                                    {card.assignedTo.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Stock Needs Images Column */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Stock Needs Images</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{stockNeedsImagesCards.length}</Badge>
                {!showArchived && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAddCard("stock-needs-images")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <Droppable droppableId="stock-needs-images" isDropDisabled={showArchived}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-muted/40 p-2 rounded-lg min-h-[500px]"
                >
                  {stockNeedsImagesCards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={showArchived}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="p-3 pb-0">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleCardClick(card)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    {card.state === "active" ? (
                                      <DropdownMenuItem onClick={() => handleArchiveCard(card.id)}>
                                        <Archive className="mr-2 h-4 w-4" />
                                        Archive
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleRestoreCard(card.id)}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Restore
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCard(card.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardDescription
                                className="text-xs line-clamp-2 mt-1"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.description}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(card.updatedAt, { addSuffix: true })}
                              </div>
                              {card.assignedTo && (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={getAvatarColor(card.assignedTo.name)}>
                                    {card.assignedTo.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Card Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          {selectedCard && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <DialogTitle>{selectedCard.title}</DialogTitle>
                </div>
              </DialogHeader>

              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={selectedCard.title}
                      onChange={(e) => setSelectedCard({ ...selectedCard, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={selectedCard.description}
                      onChange={(e) => setSelectedCard({ ...selectedCard, description: e.target.value })}
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Assigned To</label>
                    <select
                      value={selectedCard.assignedTo?.id || ""}
                      onChange={(e) => {
                        const teamMember = e.target.value
                          ? {
                              id: e.target.value,
                              name: teamMembers.find((m) => m.id === e.target.value)?.name || "",
                            }
                          : undefined
                        setSelectedCard({ ...selectedCard, assignedTo: teamMember })
                      }}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setDetailOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleCardUpdate({
                        ...selectedCard,
                        updatedAt: new Date(),
                      })
                      setDetailOpen(false)
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

