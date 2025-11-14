"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = {
  code: string
  name: string
  flagIcon: string
}

export const languages: Language[] = [
  { code: "en", name: "English", flagIcon: "/flags/uk.png" },
  { code: "vi", name: "Tiếng Việt", flagIcon: "/flags/vietnam.png" },
  { code: "pt", name: "Português", flagIcon: "/flags/brazil.png" },
  { code: "zh", name: "中文", flagIcon: "/flags/china.png" },
  { code: "fr", name: "Français", flagIcon: "/flags/france.png" },
  { code: "de", name: "Deutsch", flagIcon: "/flags/germany.png" },
  { code: "zh-HK", name: "繁體中文", flagIcon: "/flags/hongkong.png" },
  { code: "id", name: "Bahasa Indonesia", flagIcon: "/flags/indonesia.png" },
  { code: "ja", name: "日本語", flagIcon: "/flags/japan.png" },
  { code: "ms", name: "Bahasa Melayu", flagIcon: "/flags/malaysia.png" },
  { code: "fil", name: "Filipino", flagIcon: "/flags/philippines.png" },
  { code: "ko", name: "한국어", flagIcon: "/flags/korea.png" },
  { code: "th", name: "ไทย", flagIcon: "/flags/thailand.png" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage")
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("preferredLanguage", language.code)
  }

  // Simple translation function (can be enhanced with actual translations)
  const t = (key: string) => {
    // For now, just return the key - you can add translation dictionaries later
    return key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
