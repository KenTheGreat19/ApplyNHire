"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ApplyButtonProps {
  applyUrl: string
  jobTitle: string
}

export function ApplyButton({ applyUrl, jobTitle }: ApplyButtonProps) {
  const handleApplyClick = () => {
    // Track application click (optional analytics)
    console.log(`Application click for: ${jobTitle}`)
    
    // Show toast notification
    toast.success("Redirecting to company website...")

    // Open in new tab
    window.open(applyUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleApplyClick}
        className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white text-lg py-6 font-semibold"
        size="lg"
      >
        <ExternalLink className="h-5 w-5 mr-2" />
        Apply on Company Website
      </Button>
      
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        You will be redirected to the company&apos;s official career site
      </p>
    </div>
  )
}
