'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from 'lucide-react'

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:scale-105 transition-transform duration-300 text-sm font-medium"
            aria-label="Toggle language"
        >
            <Languages className="w-4 h-4" />
            <span className="uppercase">{language}</span>
        </button>
    )
}