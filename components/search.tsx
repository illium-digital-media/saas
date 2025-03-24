import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="relative w-full max-w-[600px]">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search..." className="w-full pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]" />
    </div>
  )
}

