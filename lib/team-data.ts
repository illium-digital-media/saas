// Team member data
type TeamMember = {
  id: string
  name: string
  role: string
  email: string
}

// Mock team data - in a real app, this would come from an API or database
const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Emma Thompson",
    role: "Sales Manager",
    email: "emma.thompson@example.com",
  },
  {
    id: "tm2",
    name: "James Wilson",
    role: "Sales Associate",
    email: "james.wilson@example.com",
  },
  {
    id: "tm3",
    name: "Sarah Johnson",
    role: "Watch Specialist",
    email: "sarah.johnson@example.com",
  },
  {
    id: "tm4",
    name: "Michael Davis",
    role: "Service Technician",
    email: "michael.davis@example.com",
  },
  {
    id: "tm5",
    name: "Jennifer Roberts",
    role: "Customer Relations",
    email: "jennifer.roberts@example.com",
  },
]

/**
 * Get all team members
 * @returns Array of team members
 */
export function getTeamMembers(): TeamMember[] {
  try {
    return [...teamMembers]
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

/**
 * Get team member names for dropdown selection
 * @returns Array of team member IDs and names
 */
export function getTeamMemberNames(): Array<{ id: string; name: string }> {
  try {
    return teamMembers.map((member) => ({
      id: member.id,
      name: member.name,
    }))
  } catch (error) {
    console.error("Error getting team member names:", error)
    return []
  }
}

/**
 * Get a team member by ID
 * @param id Team member ID
 * @returns Team member or undefined if not found
 */
export function getTeamMemberById(id: string): TeamMember | undefined {
  try {
    return teamMembers.find((member) => member.id === id)
  } catch (error) {
    console.error(`Error getting team member with ID ${id}:`, error)
    return undefined
  }
}

