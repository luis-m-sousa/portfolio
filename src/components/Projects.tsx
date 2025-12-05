// ============================================================================
// src/components/Projects.tsx - Grid moderno + filtros com animações sutis
// ============================================================================

'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'

import {
    ExternalLink,
    Github,
    Folder,
    ChevronRight,
    Layers,
    Sparkles,
} from 'lucide-react'

// registra plugin
gsap.registerPlugin(ScrollTrigger)

// Tipagem dos projetos
interface Project {
    id: number
    title: string
    description: string
    longDescription: string
    image: string
    technologies: string[]
    category: string
    github?: string
    liveUrl?: string
    featured: boolean
    slug: string
}

export default function Projects() {
    // refs para animar seção, filtros e cards
    const sectionRef = useRef<HTMLElement | null>(null)
    const filtersRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<HTMLDivElement | null>(null)

    const { t, language } = useLanguage()
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // dados dos projetos
    const projects: Project[] = [
        {
            id: 1,
            title: 'StarVault',
            description: 'Sistema de Simulações de Crédito para educação financeira.',
            longDescription:
                'Aplicação web voltada para educação financeira, auxiliando usuários a entenderem o impacto dos empréstimos bancários. Permite simular cenários de crédito, comparar taxas, visualizar custo total e orientar decisões mais conscientes.',
            image: '/projects/starvault.png',
            technologies: ['Laravel', 'JavaScript', 'Bootstrap', 'MySQL', 'HTML', 'CSS'],
            category: 'Web',
            github: 'https://github.com/luis-m-sousa/starvault',
            liveUrl: '',
            featured: true,
            slug: 'starvault',
        },
        /*

        {
            id: 2,
            title: '',
            description: 'Dashboard de análise de vendas com Python e SQL.',
            longDescription:
                'Projeto de análise de dados utilizando Python, Pandas e SQL para explorar métricas de vendas, ticket médio, sazonalidade e segmentação de clientes, com visualizações claras para apoiar decisões de negócio.',
            image: '/projects/data-sales.png',
            technologies: ['Python', 'Pandas', 'NumPy', 'SQL', 'Matplotlib'],
            category: 'Data',
            github: 'https://github.com/luis-m-sousa/sales-analysis',
            featured: false,
            slug: 'analise-vendas',
        },
        {
            id: 3,
            title: 'Web Scraping Financeiro',
            description: 'Coleta automatizada de dados de taxas e indicadores.',
            longDescription:
                'Sistema de web scraping para coletar taxas de juros, índices financeiros e cotações de múltiplas fontes, armazenando os dados em banco para posterior análise e visualização.',
            image: '/projects/webscraping-finance.png',
            technologies: ['Python', 'BeautifulSoup', 'Selenium', 'PostgreSQL'],
            category: 'Data',
            github: 'https://github.com/luis-m-sousa/webscraping-financeiro',
            featured: false,
            slug: 'web-scraping-financeiro',
        },
        {
            id: 4,
            title: 'API de Clientes',
            description: 'API RESTful para gestão de clientes e contratos.',
            longDescription:
                'API REST com autenticação JWT, documentação Swagger e testes automatizados, focada em operações de CRUD de clientes, contratos e integrações com sistemas internos.',
            image: '/projects/client-api.png',
            technologies: ['Node.js', 'Express', 'JWT', 'MongoDB', 'Swagger'],
            category: 'Backend',
            github: 'https://github.com/luis-m-sousa/client-api',
            featured: false,
            slug: 'api-clientes',
        },
        {
            id: 5,
            title: 'Portfolio Data-Driven',
            description: 'Protótipo de portfólio com foco em análise de dados.',
            longDescription:
                'Protótipo de portfólio voltado para área de dados, com cards de projetos, mini dashboards e seções que destacam habilidades em Python, SQL e storytelling com dados.',
            image: '/projects/portfolio-data.png',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
            category: 'Web',
            github: 'https://github.com/luis-m-sousa/portfolio-data',
            featured: false,
            slug: 'portfolio-data-driven',
        },

         */
    ]

    const categories = ['all', 'Web', 'Data', 'Backend' /*, 'Mobile'*/]

    const filteredProjects = projects.filter(
        (project) => selectedCategory === 'all' || project.category === selectedCategory
    )

    // animação de entrada da seção (título + filtros + cards)
    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            // título + subtítulo
            gsap.from('.projects-heading', {
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.projects-heading',
                    start: 'top 85%',
                },
            })

            // filtros
            if (filtersRef.current) {
                gsap.from(filtersRef.current.children, {
                    y: 10,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: filtersRef.current,
                        start: 'top 85%',
                    },
                })
            }

            // cards
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 85%',
                    },
                })
            }
        }, section)

        return () => ctx.revert()
    }, [])

    // animação suave quando muda o filtro (sem ScrollTrigger, só transição)
    useEffect(() => {
        if (!cardsRef.current) return
        const cards = cardsRef.current.children

        gsap.fromTo(
            cards,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
            }
        )
    }, [selectedCategory])

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-20 md:py-32 px-6 overflow-hidden"
        >
            {/* background suave */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* cabeçalho */}
                <div className="text-center mb-10">
                    <h2 className="projects-heading text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.nav.projects}</span>
                    </h2>
                    <p className="projects-heading text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Alguns dos projetos que desenvolvi, ou continuo desenvolvendo, ao longo da minha jornada
                    </p>
                </div>

                {/* filtros em formato pill */}
                <div
                    ref={filtersRef}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {categories.map((category) => {
                        const isActive =
                            selectedCategory === category ||
                            (category === 'all' && selectedCategory === 'all')

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setSelectedCategory(category)}
                                className={[
                                    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                                    isActive
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-lg shadow-purple-500/25'
                                        : 'glass text-slate-400 border-slate-700 hover:scale-105 hover:text-black',
                                ].join(' ')}
                            >
                                {category === 'all' ? 'Todos' : category}
                            </button>
                        )
                    })}
                </div>

                {/* grid moderno de projetos */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className={`
                group glass rounded-2xl overflow-hidden
                hover:translate-y-[-4px] hover:shadow-xl
                transition-all duration-300
                ${project.featured ? 'lg:col-span-2' : ''}
              `}
                        >
                            {/* capa */}
                            <div className="relative h-48 md:h-52 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Folder className="w-14 h-14 text-gray-400 dark:text-gray-600" />
                                </div>

                                {/* overlay hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <div className="flex gap-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                                aria-label="Ver código no GitHub"
                                            >
                                                <Github className="w-5 h-5 text-white" />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                                aria-label="Ver projeto online"
                                            >
                                                <ExternalLink className="w-5 h-5 text-white" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-medium text-white flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Destaque
                                    </div>
                                )}
                            </div>

                            {/* conteúdo */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Layers className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                                    <span className="text-xs font-medium text-primary-light dark:text-primary-dark uppercase tracking-wider">
                    {project.category}
                  </span>
                                </div>

                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                        >
                      {tech}
                    </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* link geral para GitHub */}
                <div className="text-center mt-12">
                    <a
                        href="https://github.com/luis-m-sousa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full font-medium hover:scale-105 transition-transform group"
                    >
                        <Github className="w-5 h-5" />
                        {
                            language === 'pt'
                                ? 'Ver mais no GitHub'
                                : 'See more on GitHub'
                        }
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    )
}
