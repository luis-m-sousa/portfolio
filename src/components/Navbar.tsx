'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {useLanguage} from '@/contexts/LanguageContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null)
    const {t} = useLanguage()

    useEffect(() => {
        const nav = navRef.current
        if (!nav) return

        // Animação inicial (Mantida)
        gsap.fromTo(nav,
            {y: -100, opacity: 0},
            {y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5}
        )

        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Verifica se o usuário rolou para baixo E se já passou de 50px do topo
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scroll Down -> Esconde o Navbar
                gsap.to(nav, {
                    y: -100,
                    duration: 0.3,
                    ease: 'power3.out'
                })
            } else {
                // Scroll Up -> Mostra o Navbar
                gsap.to(nav, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power3.out'
                })
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)

        // Limpeza do evento ao desmontar o componente
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navItems = [
        {href: '#home', label: t.nav.home},
        {href: '#about', label: t.nav.about},
        {href: '#projects', label: t.nav.projects},
        {href: '#timeline', label: t.nav.timeline},
        {href: '#contact', label: t.nav.contact},
    ]

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-4"
        >
            <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
                <a href="#" className="font-mono font-bold text-xl gradient-text">
                    {'<Luis/>'}
                </a>

                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="text-sm font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <LanguageToggle/>
                    <ThemeToggle/>
                </div>
            </div>
        </nav>
    )
}