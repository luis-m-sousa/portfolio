'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const { t } = useLanguage()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo('.hero-greeting',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.8 }
            )
                .fromTo('.hero-name',
                    { opacity: 0, y: 40, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8 },
                    '-=0.3'
                )
                .fromTo('.hero-role',
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.6 },
                    '-=0.4'
                )
                .fromTo('.hero-description',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 },
                    '-=0.3'
                )
                .fromTo('.hero-cta',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
                    '-=0.2'
                )
                .fromTo('.hero-social',
                    { opacity: 0, scale: 0.5 },
                    { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
                    '-=0.3'
                )
                .fromTo('.hero-scroll',
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    '-=0.2'
                )

            gsap.to('.scroll-arrow', {
                y: 8,
                duration: 1,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            })

            gsap.to('.floating-shape', {
                y: -20,
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5
            })

        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="floating-shape absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="floating-shape absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="floating-shape absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <p className="hero-greeting text-lg md:text-xl font-medium text-primary-light dark:text-primary-dark mb-4 font-mono">
                    {t.hero.greeting}
                </p>

                <h1 className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                    <span className="gradient-text">{t.hero.name}</span>
                </h1>

                <div className="hero-role inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm md:text-base font-medium">{t.hero.role}</span>
                </div>

                <p className="hero-description text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t.hero.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <a
                        href="#projects"
                        className="hero-cta group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        <span className="relative z-10">{t.hero.cta_projects}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>

                    <a
                        href="#contact"
                        className="hero-cta px-8 py-4 rounded-xl glass font-semibold hover:scale-105 transition-transform border-2 border-transparent hover:border-primary-light dark:hover:border-primary-dark"
                    >
                        {t.hero.cta_contact}
                    </a>
                </div>

                <div className="flex items-center justify-center gap-4 mb-16">
                    <a
                        href="https://github.com/luis-m-sousa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-social p-3 rounded-xl glass hover:scale-110 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-300"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/luis-miguel-0387892a4/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-social p-3 rounded-xl glass hover:scale-110 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="mailto:luismigueldesousa2707@gmail.com"
                        className="hero-social p-3 rounded-xl glass hover:scale-110 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-300"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>

                <div className="hero-scroll flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span className="text-sm font-medium">{t.hero.scroll}</span>
                    <ArrowDown className="scroll-arrow w-5 h-5" />
                </div>
            </div>
        </section>
    )
}