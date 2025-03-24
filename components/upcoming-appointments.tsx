import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from "lucide-react"

export function UpcomingAppointments() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="mt-1 h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">James Donovan</p>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Badge variant="outline">Watch Valuation</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                <span>10:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="mt-1 h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Emma Mitchell</p>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Badge variant="outline">Repair Consultation</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                <span>2:15 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="mt-1 h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Robert Johnson</p>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Badge variant="outline">VIP Purchase</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>Tomorrow</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                <span>11:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

