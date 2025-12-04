// ============================================================================
// DIRETIVA USE CLIENT
// ============================================================================
// Indica que este componente roda no cliente (navegador)
// Obrigatório quando usamos hooks do React
'use client'

// ============================================================================
// IMPORTS
// ============================================================================

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useLanguage} from '@/contexts/LanguageContext'

// Ícones para representar diferentes tipos de experiência
import {
    Briefcase,       // Ícone de maleta (trabalho)
    GraduationCap,   // Ícone de chapéu de formatura (educação)
    Award,           // Ícone de troféu/prêmio
    Calendar,        // Ícone de calendário
    MapPin,          // Ícone de localização
    ChevronRight     // Seta para direita
} from 'lucide-react'

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// INTERFACES TYPESCRIPT
// ============================================================================

// Define os tipos de item da timeline
// 'work' = experiência profissional
// 'education' = formação acadêmica
// 'achievement' = conquista/certificação
type TimelineType = 'work' | 'education' | 'achievement'

// Interface para cada item da timeline
interface TimelineItem {
    id: number              // ID único
    type: TimelineType      // Tipo do item
    title: string           // Cargo ou curso
    organization: string    // Empresa ou instituição
    location: string        // Localização
    startDate: string       // Data de início
    endDate: string         // Data de fim (ou 'Atual')
    description: string     // Descrição das atividades
    skills?: string[]       // Habilidades desenvolvidas (opcional)
    current?: boolean       // Se é o trabalho/estudo atual (opcional)
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Timeline() {
    // Referência para o elemento da seção
    const sectionRef = useRef<HTMLElement>(null)

    // Hook de traduções
    const {t, language} = useLanguage()

    // ==========================================================================
    // DADOS DA TIMELINE
    // ==========================================================================

    // Array com todos os itens da timeline
    // Ordenados do mais recente para o mais antigo
    const timelineItems: TimelineItem[] = [
        {
            id: 1,
            type: 'work',
            title: 'Analista de Suporte e Implantação',
            organization: 'Minerion',
            location: 'Brasil',
            startDate: 'Dez/2023',
            endDate: 'Atual',
            description: 'Responsável pelo suporte técnico ao cliente e implantação de sistemas. Atuo diretamente com usuários finais, compreendendo suas necessidades e traduzindo-as em soluções técnicas, além de desenvolver relatórios fundamentais para controle de pessoas (Recursos Humanos) e também para processos de encerramento, como CPVs. Experiência com processos empresariais e análise de requisitos.',
            skills: ['Suporte Técnico', 'Implantação', 'Análise de Requisitos', 'SQL', 'Atendimento ao Cliente'],
            current: true  // Indica que é o trabalho atual
        },
        {
            id: 2,
            type: 'education',
            title: 'Bacharelado em Sistemas de Informação',
            organization: 'Faculdade Impacta',
            location: 'Brasil',
            startDate: '2025',
            endDate: 'Em andamento',
            description: 'Formação em desenvolvimento de software, análise de sistemas, banco de dados, engenharia de software e gestão de TI. Foco em análise de dados e desenvolvimento web.',
            skills: ['Programação', 'Banco de Dados', 'Engenharia de Software', 'Análise de Sistemas'],
            current: true
        },
        {
            id: 3,
            type: 'achievement',
            title: 'Defesa de TCC - StarVault',
            organization: 'IFMG - Formiga',
            location: 'Brasil',
            startDate: '2022',
            endDate: '2022',
            description: 'Software voltado à educação financeira. Com análises de simulações de empréstimos com taxas reais e gráficos interativos. Sendo o MVC desenvolvido em Laravel e as funcionalidades em JavaScript, com requisições Ajax.',
            skills: ['Laravel', 'JavaScript', 'Bootstrap', 'MySQL']
        },
        {
            id: 4,
            type: 'education',
            title: 'Técnico em Informática',
            organization: 'IFMG - Formiga',
            location: 'Brasil',
            startDate: '2021',
            endDate: '2023',
            description: 'Formação técnica completa em informática, incluindo programação, redes, banco de dados, sistemas operacionais e suporte técnico.',
            skills: ['Laravel', 'JavaScript', 'Java', 'Redes', 'Bootstrap', 'MySQL']
        },
    ]

    // ==========================================================================
    // FUNÇÃO AUXILIAR - Retorna ícone baseado no tipo
    // ==========================================================================

    // Funções podem ser definidas dentro do componente
    // Esta função recebe um tipo e retorna o ícone correspondente
    const getIcon = (type: TimelineType) => {
        // switch é como múltiplos if/else
        // Verifica o valor de 'type' e retorna o ícone correspondente
        switch (type) {
            case 'work':
                return <Briefcase className="w-5 h-5"/>
            case 'education':
                return <GraduationCap className="w-5 h-5"/>
            case 'achievement':
                return <Award className="w-5 h-5"/>
            default:
                return <Briefcase className="w-5 h-5"/>
        }
    }

    // ==========================================================================
    // FUNÇÃO AUXILIAR - Retorna cor baseada no tipo
    // ==========================================================================

    const getColor = (type: TimelineType) => {
        switch (type) {
            case 'work':
                return 'from-indigo-500 to-purple-500'  // Gradiente roxo para trabalho
            case 'education':
                return 'from-emerald-500 to-teal-500'   // Gradiente verde para educação
            case 'achievement':
                return 'from-amber-500 to-orange-500'   // Gradiente laranja para conquistas
            default:
                return 'from-gray-500 to-gray-600'
        }
    }

    // ==========================================================================
    // useEffect - ANIMAÇÕES
    // ==========================================================================

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            // Animação do título
            gsap.from('.timeline-title', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.timeline-title',
                    start: 'top 85%',
                }
            })

            // Animação da linha central (cresce de cima para baixo)
            gsap.from('.timeline-line', {
                scaleY: 0,              // Começa com escala 0 no eixo Y
                transformOrigin: 'top', // Ponto de origem da transformação (topo)
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 80%',
                }
            })

            // Animação dos itens da timeline
            // Cada item anima individualmente quando entra na viewport
            gsap.utils.toArray('.timeline-item').forEach((item: any, index: number) => {
                // Alterna animação da esquerda/direita baseado no índice
                const xOffset = index % 2 === 0 ? -50 : 50

                gsap.from(item, {
                    opacity: 0,
                    x: xOffset,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                    }
                })
            })

            // Animação dos pontos/dots na linha
            gsap.from('.timeline-dot', {
                scale: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: 'back.out(1.7)',  // Efeito "bounce" ao final
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 80%',
                }
            })

        }, section)

        return () => ctx.revert()
    }, [])

    // ==========================================================================
    // JSX - RENDERIZAÇÃO
    // ==========================================================================

    return (
        <section
            ref={sectionRef}
            id="timeline"
            className="relative py-20 md:py-32 px-6 overflow-hidden"
        >
            {/* BACKGROUND DECORATIVO */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"/>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"/>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* ================================================================
            CABEÇALHO
        ================================================================ */}
                <div className="text-center mb-16">
                    <h2 className="timeline-title text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.nav.timeline}</span>
                    </h2>
                    <p className="timeline-title text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Minha jornada profissional e acadêmica
                    </p>
                </div>

                {/* ================================================================
            CONTAINER DA TIMELINE
        ================================================================ */}
                <div className="timeline-container relative">

                    {/*
            LINHA CENTRAL DA TIMELINE
            Visível apenas em telas médias+ (hidden md:block)
            Posicionada no centro (left-1/2 -translate-x-1/2)
          */}
                    <div
                        className="timeline-line hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"/>

                    {/* ITENS DA TIMELINE */}
                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`
                  timeline-item relative
                  md:flex md:items-center

                  ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
                            >
                                {/*
                  DOT/PONTO NA LINHA
                  Círculo colorido que marca a posição na timeline
                  Só aparece em telas médias+ (hidden md:flex)
                */}
                                <div
                                    className="timeline-dot hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br items-center justify-center text-white shadow-lg z-10"
                                    style={{
                                        // Usa a função getColor para definir o gradiente
                                        background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
                                    }}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColor(item.type)} flex items-center justify-center text-white shadow-lg`}>
                                        {getIcon(item.type)}
                                    </div>
                                </div>

                                {/*
                  CARD DO ITEM
                  Ocupa metade da largura em telas médias+ (md:w-1/2)
                  Padding diferente dependendo do lado (md:pr-16 ou md:pl-16)
                */}
                                <div className={`
                  md:w-1/2
                  ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}
                `}>
                                    <div
                                        className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">

                                        {/* HEADER DO CARD */}
                                        <div className="flex items-start gap-4 mb-4">
                                            {/* Ícone (versão mobile - aparece só em telas pequenas) */}
                                            <div className={`
                        md:hidden w-12 h-12 rounded-xl bg-gradient-to-br ${getColor(item.type)}
                        flex items-center justify-center text-white flex-shrink-0
                      `}>
                                                {getIcon(item.type)}
                                            </div>

                                            <div className="flex-1">
                                                {/* Título/Cargo */}
                                                <h3 className="text-xl font-bold mb-1">
                                                    {item.title}
                                                </h3>

                                                {/* Organização */}
                                                <p className="text-primary-light dark:text-primary-dark font-medium">
                                                    {item.organization}
                                                </p>

                                                {/* Metadados: localização e período */}
                                                <div
                                                    className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {/* Localização */}
                                                    <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4"/>
                                                        {item.location}
                          </span>
                                                    {/* Período */}
                                                    <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4"/>
                                                        {item.startDate} - {item.endDate}
                          </span>
                                                </div>
                                            </div>

                                            {/* Badge "Atual" (só para itens current) */}
                                            {item.current && (
                                                <span
                                                    className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">
                          Atual
                        </span>
                                            )}
                                        </div>

                                        {/* DESCRIÇÃO */}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {/* SKILLS/TECNOLOGIAS */}
                                        {/*
                      Renderização condicional: só renderiza se item.skills existe
                      && é um operador lógico que retorna o segundo valor se o primeiro for true
                    */}
                                        {item.skills && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.skills.map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                                    >
                            {skill}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/*
                  ESPAÇO VAZIO (para alinhar no grid)
                  Necessário para manter o layout alternado
                */}
                                <div className="hidden md:block md:w-1/2"/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================================================================
            LEGENDA DOS TIPOS
        ================================================================ */}
                <div className="flex flex-wrap justify-center gap-6 mt-16">
                    {/* Cada item da legenda */}
                    {[
                        {type: 'work' as TimelineType, label: 'Experiência'},
                        {type: 'education' as TimelineType, label: 'Educação'},
                        {type: 'achievement' as TimelineType, label: 'Conquista'},
                    ].map((item) => (
                        <div key={item.type} className="flex items-center gap-2">
                            {/* Bolinha colorida */}
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColor(item.type)}`}/>
                            {/* Label */}
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
