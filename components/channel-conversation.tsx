"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, ImageIcon, Paperclip, Send, MoreVertical, Edit, Trash, Users, AtSign } from "lucide-react"
import { getAvatarColor } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  attachments?: {
    type: "image" | "file"
    url: string
    name: string
  }[]
  edited?: boolean
}

type ChannelDetails = {
  id: string
  title: string
  description: string
  members: {
    id: string
    name: string
    avatar?: string
  }[]
  messages: Message[]
}

// Mock data for a channel conversation
const getMockChannelDetails = (channelId: string): ChannelDetails => {
  return {
    id: channelId,
    title: channelId.includes("rolex")
      ? "Rolex Daytona 116500LN"
      : channelId.includes("omega")
        ? "Omega Speedmaster to NYC"
        : "New Patek Philippe Arrivals",
    description: channelId.includes("sourcing")
      ? "Need to source this model for a VIP client"
      : channelId.includes("postage")
        ? "Customer needs expedited shipping"
        : "Need professional photos for website",
    members: [
      { id: "1", name: "Alex Johnson" },
      { id: "2", name: "Sarah Williams" },
      { id: "3", name: "Michael Brown" },
      { id: "4", name: "David Miller" },
    ],
    messages: [
      {
        id: "msg1",
        content: channelId.includes("sourcing")
          ? "We have a client looking for a Rolex Daytona 116500LN with white dial. Anyone have leads?"
          : channelId.includes("postage")
            ? "We need to ship this Omega Speedmaster to NYC by Friday. Any recommendations for courier?"
            : "The new Patek Philippe models have arrived but we need professional photos for the website.",
        sender: { id: "1", name: "Alex Johnson" },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      },
      {
        id: "msg2",
        content: channelId.includes("sourcing")
          ? "I might have a contact in Geneva who recently got one in stock. Let me check."
          : channelId.includes("postage")
            ? "I recommend using FedEx Priority Overnight with insurance."
            : "I can schedule our photographer for tomorrow morning if that works?",
        sender: { id: "2", name: "Sarah Williams" },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: "msg3",
        content: channelId.includes("sourcing")
          ? "Great, please let me know ASAP. The client is willing to pay a premium."
          : channelId.includes("postage")
            ? "Sounds good. Can you arrange the pickup?"
            : "Perfect. We need shots of all 5 models with detailed dial close-ups.",
        sender: { id: "1", name: "Alex Johnson" },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      },
      {
        id: "msg4",
        content: channelId.includes("sourcing")
          ? "I just heard back. They have one available but it's the black dial version."
          : channelId.includes("postage")
            ? "Yes, I'll schedule it for tomorrow morning. The package is ready in the safe."
            : "I've briefed the photographer. They'll be here at 9am tomorrow.",
        sender: { id: "3", name: "Michael Brown" },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        attachments: channelId.includes("sourcing")
          ? [{ type: "image", url: "/placeholder.svg?height=300&width=400", name: "daytona_black.jpg" }]
          : channelId.includes("postage")
            ? undefined
            : [{ type: "image", url: "/placeholder.svg?height=300&width=400", name: "photo_sample.jpg" }],
      },
    ],
  }
}

export function ChannelConversation({
  channelType,
  channelId,
}: {
  channelType: string
  channelId: string
}) {
  const router = useRouter()
  const [channel, setChannel] = useState<ChannelDetails>(getMockChannelDetails(channelId))
  const [newMessage, setNewMessage] = useState("")
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return

    const newMsg: Message = {
      id: `msg${Date.now()}`,
      content: newMessage,
      sender: { id: "1", name: "Alex Johnson" }, // Current user
      timestamp: new Date(),
      attachments: selectedFile
        ? [
            {
              type: selectedFile.type.startsWith("image/") ? "image" : "file",
              url: URL.createObjectURL(selectedFile),
              name: selectedFile.name,
            },
          ]
        : undefined,
    }

    setChannel((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }))
    setNewMessage("")
    setSelectedFile(null)
  }

  const handleEditMessage = (messageId: string) => {
    const message = channel.messages.find((msg) => msg.id === messageId)
    if (message) {
      setEditingMessageId(messageId)
      setEditContent(message.content)
    }
  }

  const handleSaveEdit = (messageId: string) => {
    setChannel((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) =>
        msg.id === messageId ? { ...msg, content: editContent, edited: true } : msg,
      ),
    }))
    setEditingMessageId(null)
    setEditContent("")
  }

  const handleDeleteMessage = (messageId: string) => {
    setChannel((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== messageId),
    }))
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{channel.title}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Users className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Members: {channel.members.map((m) => m.name).join(", ")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{channel.description}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {channel.messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={getAvatarColor(message.sender.name)}>
                    {message.sender.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{message.sender.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </span>
                    {message.edited && <span className="text-xs text-muted-foreground">(edited)</span>}
                    {message.sender.id === "1" && ( // Only show for current user's messages
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-0">
                          <Button
                            variant="ghost"
                            className="w-full justify-start pl-2 py-1.5 h-8"
                            onClick={() => handleEditMessage(message.id)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start pl-2 py-1.5 h-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash className="h-3.5 w-3.5 mr-2" />
                            Delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>

                  {editingMessageId === message.id ? (
                    <div className="mt-1">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[60px]"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingMessageId(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSaveEdit(message.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm mt-1">{message.content}</p>
                  )}

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2">
                      {message.attachments.map((attachment, i) => (
                        <div key={i} className="mt-2">
                          {attachment.type === "image" ? (
                            <div className="relative">
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="max-w-xs rounded-md border"
                              />
                              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs">
                                {attachment.name}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 border rounded-md max-w-xs">
                              <Paperclip className="h-4 w-4" />
                              <span className="text-sm truncate">{attachment.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          {selectedFile && (
            <div className="mb-2 p-2 border rounded-md flex items-center gap-2 bg-muted/50">
              {selectedFile.type.startsWith("image/") ? (
                <ImageIcon className="h-4 w-4" />
              ) : (
                <Paperclip className="h-4 w-4" />
              )}
              <span className="text-sm truncate">{selectedFile.name}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => setSelectedFile(null)}>
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className="flex w-full items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleFileSelect} className="shrink-0">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleFileSelect} className="shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <AtSign className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <Textarea
              placeholder="Type your message..."
              className="min-h-[40px] flex-1"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && !selectedFile}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

