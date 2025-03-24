"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTeamMemberNames } from "@/lib/team-data"

interface TeamMemberSelectProps {
  value: string
  onValueChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function TeamMemberSelect({
  value,
  onValueChange,
  label = "Assigned To",
  placeholder = "Select team member",
  required = false,
  disabled = false,
  className,
}: TeamMemberSelectProps) {
  const [teamMembers, setTeamMembers] = useState<Array<{ id: string; name: string }>>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Fetch team members safely
      const members = getTeamMemberNames()
      setTeamMembers(members)
      setError(null)
    } catch (err) {
      console.error("Error loading team members:", err)
      setError("Failed to load team members")
      // Provide fallback data to prevent UI breakage
      setTeamMembers([{ id: "default", name: "Unassigned" }])
    }
  }, [])

  return (
    <div className={className}>
      <Label htmlFor="assigned-to" className="mb-2 block">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled || teamMembers.length === 0}>
        <SelectTrigger id="assigned-to">
          <SelectValue placeholder={error ? "Error loading team members" : placeholder} />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <SelectItem key={member.id} value={member.name}>
                {member.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="loading" disabled>
              {error || "Loading team members..."}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

