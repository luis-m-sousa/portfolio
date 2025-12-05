'use client'

import { useEffect, useRef, useMemo } from 'react' // <--- ADICIONEI useMemo
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'
import { Award, Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react'
import {resolveAny} from "node:dns";

gsap.registerPlugin(ScrollTrigger)

type TimelineType = 'work' | 'education' | 'achievement'

interface TimelineItem {
    id: number
    type: TimelineType
    title: string
    organization: string
    location: string
    startDate: string
    endDate: string
    description: string
    skills?: string[]
    current?: boolean
}

export default function Timeline() {
    const sectionRef = useRef<HTMLElement>(null)
    const { t, language } = useLanguage() // Pegamos o language aqui

    // ==========================================================================
    // DADOS DA TIMELINE
    // ==========================================================================

    // useMemo para recriar a lista apenas quando o idioma mudar
    const timelineItems: TimelineItem[] = useMemo(() => [
        {
            id: 1,
            type: 'work',
            title: language === 'pt' ? 'Analista de Suporte e Implantação' : 'Support and Implementation Analyst',
            organization: 'Minerion',
            location: language === 'pt' ? 'Brasil' : 'Brazil',
            startDate: language === 'pt' ? 'Dez/2023' : 'Dec/2023',
            endDate: language === 'pt' ? 'Atual' : 'Present',
            description: language === 'pt'
                ? 'Responsável pelo suporte técnico ao cliente e implantação de sistemas. Atuo diretamente com usuários finais, compreendendo suas necessidades e traduzindo-as em soluções técnicas, além de desenvolver relatórios fundamentais para controle de pessoas (Recursos Humanos) e também para processos de encerramento, como CPVs. Experiência com processos empresariais e análise de requisitos.'
                : 'Responsible for technical customer support and system implementation. I work directly with end-users, understanding their needs and translating them into technical solutions, in addition to developing essential reports for personnel control (HR) and closing processes, such as CPVs. Experience with business processes and requirements analysis.',
            skills: language === 'pt'
                ? ['Suporte Técnico', 'Implantação', 'Análise de Requisitos', 'SQL', 'Atendimento ao Cliente']
                : ['Tech Support', 'Implementation', 'Requirements Analysis', 'SQL', 'Customer Service'],
            current: true
        },
        {
            id: 2,
            type: 'education',
            title: language === 'pt' ? 'Bacharelado em Sistemas de Informação' : 'Bachelor of Information Systems',
            organization: 'Faculdade Impacta',
            location: language === 'pt' ? 'Brasil' : 'Brazil',
            startDate: '2025',
            endDate: language === 'pt' ? 'Em andamento' : 'In Progress',
            description: language === 'pt'
                ? 'Formação em desenvolvimento de software, análise de sistemas, banco de dados, engenharia de software e gestão de TI. Foco em análise de dados e desenvolvimento web.'
                : 'Degree in software development, systems analysis, databases, software engineering, and IT management. Focus on data analysis and web development.',
            skills: language === 'pt'
                ? ['Programação', 'Banco de Dados', 'Engenharia de Software', 'Análise de Sistemas']
                : ['Programming', 'Databases', 'Software Engineering', 'Systems Analysis'],
            current: true
        },
        {
            id: 3,
            type: 'achievement',
            title: language === 'pt' ? 'Defesa de TCC - StarVault' : 'Capstone Project - StarVault',
            organization: 'IFMG - Formiga',
            location: language === 'pt' ? 'Brasil' : 'Brazil',
            startDate: '2022',
            endDate: '2022',
            description: language === 'pt'
                ? 'Software voltado à educação financeira. Com análises de simulações de empréstimos com taxas reais e gráficos interativos. Sendo o MVC desenvolvido em Laravel e as funcionalidades em JavaScript, com requisições Ajax.'
                : 'Financial education software. Features loan simulation analysis with real rates and interactive charts. MVC developed in Laravel and functionalities in JavaScript using Ajax requests.',
            skills: ['Laravel', 'JavaScript', 'Bootstrap', 'MySQL']
        },
        {
            id: 4,
            type: 'education',
            title: language === 'pt' ? 'Técnico em Informática' : 'IT Technician',
            organization: 'IFMG - Formiga',
            location: language === 'pt' ? 'Brasil' : 'Brazil',
            startDate: '2021',
            endDate: '2023',
            description: language === 'pt'
                ? 'Formação técnica completa em informática, incluindo programação, redes, banco de dados, sistemas operacionais e suporte técnico.'
                : 'Complete technical training in IT, including programming, networking, databases, operating systems, and technical support.',
            skills: ['Laravel', 'JavaScript', 'Java', 'Redes', 'Bootstrap', 'MySQL']
        },
    ], [language]) // <--- Dependência: Recalcula se 'language' mudar

    const getIcon = (type: TimelineType) => {
        switch (type) {
            case 'work': return <Briefcase className="w-5 h-5"/>
            case 'education': return <GraduationCap className="w-5 h-5"/>
            case 'achievement': return <Award className="w-5 h-5"/>
            default: return <Briefcase className="w-5 h-5"/>
        }
    }

    const getColor = (type: TimelineType) => {
        switch (type) {
            case 'work': return 'from-indigo-500 to-purple-500'
            case 'education': return 'from-emerald-500 to-teal-500'
            case 'achievement': return 'from-amber-500 to-orange-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            gsap.from('.timeline-title', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: { trigger: '.timeline-title', start: 'top 85%' }
            })

            gsap.from('.timeline-line', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' }
            })

            gsap.utils.toArray('.timeline-item').forEach((item: any, index: number) => {
                const xOffset = index % 2 === 0 ? -50 : 50
                gsap.from(item, {
                    opacity: 0,
                    x: xOffset,
                    duration: 0.8,
                    scrollTrigger: { trigger: item, start: 'top 85%' }
                })
            })

            gsap.from('.timeline-dot', {
                scale: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' }
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="timeline" className="relative py-20 md:py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"/>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"/>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="timeline-title text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.nav.timeline}</span>
                    </h2>

                    <p className="timeline-title text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {language === 'pt'
                            ? 'Minha jornada profissional e acadêmica'
                            : 'My professional and academic journey'}
                    </p>
                </div>

                <div className="timeline-container relative">
                    <div className="timeline-line hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"/>

                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div key={item.id} className={`timeline-item relative md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="timeline-dot hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br items-center justify-center text-white shadow-lg z-10"
                                     style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColor(item.type)} flex items-center justify-center text-white shadow-lg`}>
                                        {getIcon(item.type)}
                                    </div>
                                </div>

                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                                    <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`md:hidden w-12 h-12 rounded-xl bg-gradient-to-br ${getColor(item.type)} flex items-center justify-center text-white flex-shrink-0`}>
                                                {getIcon(item.type)}
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                                <p className="text-primary-light dark:text-primary-dark font-medium">{item.organization}</p>
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4"/>
                                                        {item.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4"/>
                                                        {item.startDate} - {item.endDate}
                                                    </span>
                                                </div>
                                            </div>

                                            {item.current && (
                                                <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">
                                                    {language === 'pt' ? 'Atual' : 'Present'}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {item.skills && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.skills.map((skill, skillIndex) => (
                                                    <span key={skillIndex} className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="hidden md:block md:w-1/2"/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-16">
                    {[
                        {type: 'work' as TimelineType, label: language === 'pt' ? 'Experiência' : 'Experience'},
                        {type: 'education' as TimelineType, label: language === 'pt' ? 'Educação' : 'Education'},
                        {type: 'achievement' as TimelineType, label: language === 'pt' ? 'Conquista' : 'Achievement'},
                    ].map((item) => (
                        <div key={item.type} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColor(item.type)}`}/>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}