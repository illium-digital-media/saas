"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { getAvatarColor } from "@/lib/utils"

type Channel = {
  id: string
  title: string
  description: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  members: {
    id: string
    name: string
    avatar?: string
  }[]
}

const mockChannels: Channel[] = [
  {
    id: "need-sourcing-1",
    title: "Rolex Daytona 116500LN",
    description: "Need to source this model for a VIP client",
    lastMessage: "I might have a lead from a dealer in Switzerland",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 3,
    members: [
      { id: "1", name: "Alex Johnson" },
      { id: "2", name: "Sarah Williams" },
      { id: "3", name: "Michael Brown" },
    ],
  },
  {
    id: "needs-postage-1",
    title: "Omega Speedmaster to NYC",
    description: "Customer needs expedited shipping",
    lastMessage: "Package is ready for pickup",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    unreadCount: 0,
    members: [
      { id: "2", name: "Sarah Williams" },
      { id: "4", name: "David Miller" },
    ],
  },
  {
    id: "stock-needs-images-1",
    title: "New Patek Philippe Arrivals",
    description: "Need professional photos for website",
    lastMessage: "I've scheduled the photographer for tomorrow",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unreadCount: 2,
    members: [
      { id: "1", name: "Alex Johnson" },
      { id: "5", name: "Emma Davis" },
      { id: "6", name: "James Wilson" },
    ],
  },
  {
    id: "need-sourcing-2",
    title: "AP Royal Oak 15500ST",
    description: "Client looking for specific dial color",
    lastMessage: "I'll check with our contact in Geneva",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    members: [
      { id: "3", name: "Michael Brown" },
      { id: "7", name: "Olivia Taylor" },
    ],
  },
  {
    id: "needs-postage-2",
    title: "Tudor Black Bay to Australia",
    description: "International shipping requirements",
    lastMessage: "Customs forms are completed",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    unreadCount: 1,
    members: [
      { id: "4", name: "David Miller" },
      { id: "8", name: "Sophia Anderson" },
    ],
  },
]

export function ChannelList({ filter = "all" }: { filter?: "all" | "assigned" | "unread" }) {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)

  // Filter channels based on the selected filter
  const filteredChannels = channels.filter((channel) => {
    if (filter === "unread") return channel.unreadCount > 0
    if (filter === "assigned") return channel.members.some((member) => member.id === "1") // Assuming current user is id "1"
    return true
  })

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredChannels.map((channel) => (
        <Link href={`/channels/${channel.id.split("-")[0]}/${channel.id}`} key={channel.id}>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{channel.title}</CardTitle>
                {channel.unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {channel.unreadCount} new
                  </Badge>
                )}
              </div>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-1">{channel.lastMessage}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(channel.lastMessageTime, { addSuffix: true })}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex -space-x-2">
                {channel.members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                    <AvatarFallback className={getAvatarColor(member.name)}>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {channel.members.length > 3 && (
                  <Avatar className="h-7 w-7 border-2 border-background">
                    <AvatarFallback className="bg-muted">+{channel.members.length - 3}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

