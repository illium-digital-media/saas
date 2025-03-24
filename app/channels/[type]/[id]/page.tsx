import { PageLayout } from "@/components/page-layout"
import { ChannelConversation } from "@/components/channel-conversation"

export default function ChannelPage({ params }: { params: { type: string; id: string } }) {
  return (
    <PageLayout>
      <ChannelConversation channelType={params.type} channelId={params.id} />
    </PageLayout>
  )
}

