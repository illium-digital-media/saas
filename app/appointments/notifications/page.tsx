import { PageLayout } from "@/components/page-layout"
import { AppointmentNotifications } from "@/components/appointment-notifications"

export default function AppointmentNotificationsPage() {
  return (
    <PageLayout title="Appointment Notifications" description="Manage appointment reminders and notifications.">
      <AppointmentNotifications />
    </PageLayout>
  )
}

