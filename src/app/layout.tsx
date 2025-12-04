import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
    title: 'Luis Miguel | Analista de Dados',
    description: 'Portfólio de Analista de Dados',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt" suppressHydrationWarning>
        <body className="antialiased">
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}