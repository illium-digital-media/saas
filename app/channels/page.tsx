import { PageLayout } from "@/components/page-layout"
import { ChannelsKanban } from "@/components/channels-kanban"

export default function ChannelsPage() {
  return (
    <PageLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight">Channels</h1>
          </div>
          <ChannelsKanban />
        </div>
      </div>
    </PageLayout>
  )
}

