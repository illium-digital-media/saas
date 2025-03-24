import { PageLayout } from "@/components/page-layout"
import { AppointmentCalendar } from "@/components/appointment-calendar"

export default function AppointmentCalendarPage() {
  return (
    <PageLayout title="Appointment Calendar" description="View and manage upcoming appointments.">
      <AppointmentCalendar />
    </PageLayout>
  )
}

