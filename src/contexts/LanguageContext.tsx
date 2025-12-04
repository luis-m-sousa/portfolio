'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import ptLocale from '@/locales/pt.json'
import enLocale from '@/locales/en.json'

type Language = 'pt' | 'en'
type Translations = typeof ptLocale

interface LanguageContextType {
    language: Language
    toggleLanguage: () => void
    t: Translations
}

const locales = { pt: ptLocale, en: enLocale }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang) setLanguage(savedLang)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('language', language)
            document.documentElement.lang = language
        }
    }, [language, mounted])

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'pt' ? 'en' : 'pt')
    }

    const t = locales[language]

    if (!mounted) return null

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within LanguageProvider')
    return context
}