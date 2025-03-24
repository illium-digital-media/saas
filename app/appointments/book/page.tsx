import { PageLayout } from "@/components/page-layout"
import { AppointmentBookingForm } from "@/components/appointment-booking-form"

export default function AppointmentBookPage() {
  return (
    <PageLayout title="Book Appointment" description="Schedule a new appointment with a customer.">
      <AppointmentBookingForm />
    </PageLayout>
  )
}

