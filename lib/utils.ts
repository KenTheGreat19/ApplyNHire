import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return ''
  if (min && max) return `$${(min / 1000).toFixed(0)}K–$${(max / 1000).toFixed(0)}K`
  if (min) return `From $${(min / 1000).toFixed(0)}K`
  if (max) return `Up to $${(max / 1000).toFixed(0)}K`
  return ''
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
