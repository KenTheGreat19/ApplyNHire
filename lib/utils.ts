import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
  CAD: "C$", CHF: "Fr", CNY: "¥", INR: "₹", PHP: "₱",
  SGD: "S$", HKD: "HK$"
}

export function formatSalary(min?: number | null, max?: number | null, currency: string = "USD"): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency + " "
  if (!min && !max) return ''
  if (min && max) return `${symbol}${(min / 1000).toFixed(0)}K–${symbol}${(max / 1000).toFixed(0)}K`
  if (min) return `From ${symbol}${(min / 1000).toFixed(0)}K`
  if (max) return `Up to ${symbol}${(max / 1000).toFixed(0)}K`
  return ''
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
