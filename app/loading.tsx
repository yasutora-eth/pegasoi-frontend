import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-8">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-muted-foreground">Loading...</span>
      </div>
    </div>
  )
}
