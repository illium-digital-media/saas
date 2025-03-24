"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { ChannelList } from "@/components/channel-list"

type ChannelType = "need-sourcing" | "needs-postage" | "stock-needs-images"

const channelTitles: Record<ChannelType, string> = {
  "need-sourcing": "Need Sourcing",
  "needs-postage": "Needs Postage",
  "stock-needs-images": "Stock Needs Images",
}

const channelDescriptions: Record<ChannelType, string> = {
  "need-sourcing": "Discussions about watches that need to be sourced for clients",
  "needs-postage": "Coordinate shipping and postage for sold items",
  "stock-needs-images": "Identify stock items that need professional photography",
}

export function ChannelContent({ channelType }: { channelType: ChannelType }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{channelTitles[channelType]}</h2>
          <p className="text-muted-foreground">{channelDescriptions[channelType]}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search conversations..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" size="icon" variant="secondary">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChannelList />
      </div>
    </div>
  )
}

