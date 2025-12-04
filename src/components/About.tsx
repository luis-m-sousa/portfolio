// ============================================================================
// IMPORTS - Importação de dependências e módulos
// ============================================================================

// 'use client' - Diretiva do Next.js 13+ que indica que este componente
// roda no CLIENTE (navegador), não no servidor.
// Necessário quando usamos hooks como useState, useEffect, useRef, etc.
'use client'

// useEffect - Hook do React para executar efeitos colaterais (side effects)
// Exemplos: chamadas de API, manipulação do DOM, animações
// Executa após o componente ser renderizado

// useRef - Hook do React para criar uma referência mutável
// Usado para acessar elementos do DOM diretamente (como document.getElementById)
// A referência persiste entre re-renderizações
import { useEffect, useRef } from 'react'

// gsap - Biblioteca de animações profissionais
// Permite criar animações suaves e complexas
import { gsap } from 'gsap'

// ScrollTrigger - Plugin do GSAP para animações baseadas em scroll
// Ativa animações quando elementos entram na viewport (área visível)
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// useLanguage - Hook customizado que criamos para gerenciar idiomas
// Retorna o objeto 't' com todas as traduções do idioma atual
import { useLanguage } from '@/contexts/LanguageContext'

// Ícones da biblioteca Lucide React
// São componentes React que renderizam ícones SVG
import {
    Code2,           // Ícone de código
    Database,        // Ícone de banco de dados
    Brain,           // Ícone de cérebro (inteligência)
    Users,           // Ícone de usuários
    TrendingUp,      // Ícone de gráfico subindo
    MessageSquare    // Ícone de mensagem/chat
} from 'lucide-react'

// ============================================================================
// REGISTRO DO PLUGIN - Necessário para usar ScrollTrigger com GSAP
// ============================================================================

// Registra o plugin ScrollTrigger no GSAP
// Isso deve ser feito FORA do componente, apenas uma vez
gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// INTERFACES TYPESCRIPT - Definição de tipos
// ============================================================================

// Interface define a "forma" de um objeto em TypeScript
// Isso ajuda a evitar erros e dá autocomplete no editor

// Interface para definir a estrutura de uma skill (habilidade)
interface Skill {
    icon: React.ReactNode    // ReactNode = qualquer coisa que React pode renderizar
    name: string             // string = texto
    level: number            // number = número (0-100 para porcentagem)
    color: string            // string = cor em formato Tailwind (ex: "indigo")
}

// Interface para definir a estrutura de um card de diferencial
interface DifferentialCard {
    icon: React.ReactNode    // Ícone do card
    title: string            // Título do card
    description: string      // Descrição do card
}

// ============================================================================
// COMPONENTE PRINCIPAL - About
// ============================================================================

// 'export default' significa que este é o componente principal do arquivo
// e pode ser importado em outros arquivos com: import About from './About'

// Componentes React são funções que retornam JSX (HTML-like syntax)
export default function About() {

    // ==========================================================================
    // HOOKS - Funções especiais do React
    // ==========================================================================

    // useRef cria uma referência para o elemento <section>
    // Inicializamos com null porque o elemento ainda não existe
    // O tipo <HTMLElement> indica que será um elemento HTML genérico
    const sectionRef = useRef<HTMLElement>(null)

    // useLanguage() retorna um objeto, e usamos destructuring { t }
    // para extrair apenas a propriedade 't' (translations/traduções)
    const { t } = useLanguage()

    // ==========================================================================
    // DADOS - Arrays com informações para renderizar
    // ==========================================================================

    // Array de skills com tipagem TypeScript (: Skill[])
    // O ': Skill[]' indica que é um array de objetos do tipo Skill
    const skills: Skill[] = [
        {
            icon: <Code2 className="w-6 h-6" />,  // JSX dentro de objeto
            name: 'Python',
            level: 85,      // 85% de proficiência
            color: 'indigo' // Cor para a barra de progresso
        },
        {
            icon: <Database className="w-6 h-6" />,
            name: 'SQL',
            level: 80,
            color: 'purple'
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            name: 'Laravel',
            level: 90,
            color: 'pink'
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            name: 'JavaScript',
            level: 75,
            color: 'amber'
        },
    ]

    // Array de cards de diferenciais


    const differentials: DifferentialCard[] = [
        {
            icon: <Users className="w-8 h-8" />,
            title: t.differentials.client_vision,
            description: t.differentials.client_vision_text
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: t.differentials.analyst_thinking,
            description: t.differentials.analyst_thinking_text
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: t.differentials.business_process,
            description: t.differentials.business_process_text
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: t.differentials.communication,
            description: t.differentials.communication_text
        },
    ]



    // ==========================================================================
    // useEffect - Executa código após o componente renderizar
    // ==========================================================================

    // useEffect recebe dois argumentos:
    // 1. Uma função callback (o código a executar)
    // 2. Um array de dependências (quando re-executar)

    // [] vazio = executa apenas UMA vez, quando o componente monta
    // [variavel] = executa toda vez que 'variavel' mudar

    useEffect(() => {
        // Pega o elemento atual da referência
        // sectionRef.current pode ser null se o elemento não existir
        const section = sectionRef.current

        // Guard clause - Se não existe, sai da função
        // Isso evita erros de "cannot read property of null"
        if (!section) return

        // gsap.context() cria um contexto de animação
        // Isso facilita limpar todas as animações quando o componente desmontar
        const ctx = gsap.context(() => {

            // gsap.from() - Anima DE um estado PARA o estado atual
            // O elemento começa invisível (opacity: 0) e move para cima (y: 50)
            // Depois anima para o estado normal (opacity: 1, y: 0)

            gsap.from('.about-title', {
                opacity: 0,           // Começa invisível
                y: 50,                // Começa 50px abaixo
                duration: 0.8,        // Duração de 0.8 segundos
                scrollTrigger: {      // Configuração do ScrollTrigger
                    trigger: '.about-title',  // Elemento que dispara a animação
                    start: 'top 80%',         // Inicia quando o topo do elemento atinge 80% da viewport
                    // 'top 80%' significa: topo do elemento + 80% da altura da tela
                }
            })

            // Anima os cards de skill com stagger (um após o outro)
            gsap.from('.skill-card', {
                opacity: 0,
                x: -30,               // Começa 30px à esquerda
                duration: 0.6,
                stagger: 0.1,         // 0.1s de delay entre cada card
                scrollTrigger: {
                    trigger: '.skills-container',
                    start: 'top 80%',
                }
            })

            // Anima as barras de progresso das skills
            gsap.from('.skill-bar', {
                width: 0,             // Começa com largura 0
                duration: 1,          // 1 segundo para preencher
                ease: 'power2.out',   // Função de easing (desaceleração)
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.skills-container',
                    start: 'top 80%',
                }
            })

            // Anima os cards de diferencial
            gsap.from('.differential-card', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.differentials-container',
                    start: 'top 80%',
                }
            })

        }, section) // Passa o elemento section como escopo

        // Cleanup function - Executada quando o componente desmonta
        // Isso é MUITO importante para evitar memory leaks
        // ctx.revert() remove todas as animações e ScrollTriggers criados
        return () => ctx.revert()

    }, []) // Array vazio = executa apenas na montagem

    // ==========================================================================
    // JSX - O que o componente renderiza (retorna)
    // ==========================================================================

    // JSX parece HTML mas é JavaScript
    // Diferenças: className ao invés de class, camelCase para atributos

    return (
        // section é um elemento HTML5 semântico para seções de conteúdo
        // ref={sectionRef} conecta este elemento à nossa referência useRef
        // id="about" permite navegação com links âncora (#about)
        <section
            ref={sectionRef}
            id="about"
            className="relative py-20 md:py-32 px-6 overflow-hidden"
            // py-20 = padding vertical de 5rem (80px)
            // md:py-32 = em telas médias+, padding vertical de 8rem (128px)
            // px-6 = padding horizontal de 1.5rem (24px)
            // overflow-hidden = esconde conteúdo que ultrapassa os limites
        >
            {/*
        BACKGROUND DECORATIVO
        Elementos visuais que ficam atrás do conteúdo
        pointer-events-none = não interfere em cliques
      */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Orb decorativo com gradiente e blur */}
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/*
        CONTAINER PRINCIPAL
        max-w-6xl = largura máxima de 72rem (1152px)
        mx-auto = margin horizontal auto (centraliza)
        relative = posicionamento relativo para z-index funcionar
        z-10 = fica acima dos elementos decorativos (z-index: 10)
      */}
            <div className="max-w-6xl mx-auto relative z-10">

                {/* ================================================================
            CABEÇALHO DA SEÇÃO
        ================================================================ */}
                <div className="text-center mb-16">
                    {/*
            Título com classe para animação GSAP
            about-title é usado como seletor no gsap.from()
          */}
                    <h2 className="about-title text-4xl md:text-5xl font-bold mb-4">
                        {/*
              Renderização condicional com operador &&
              Se t.about existe, renderiza o título
              {t.about.title} insere o valor da tradução
            */}
                        <span className="gradient-text">{t.about.title}</span>
                    </h2>

                    {/* Subtítulo */}
                    <p className="about-title text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.about.subtitle}
                    </p>
                </div>

                {/* ================================================================
            GRID DE CONTEÚDO - 2 colunas em telas grandes
        ================================================================ */}
                {/*
          grid = display grid
          md:grid-cols-2 = 2 colunas em telas médias+
          gap-12 = espaço de 3rem entre itens
        */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">

                    {/* ============================================================
              COLUNA ESQUERDA - Sobre mim + Skills
          ============================================================ */}
                    <div>
                        {/* Card "Sobre Mim" */}
                        <div className="glass rounded-2xl p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
                                {t.about.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t.about.description}
                            </p>
                        </div>

                        {/* Container de Skills */}
                        <div className="skills-container space-y-4">
                            {/*
                Título da seção de skills
                flex = display flex
                items-center = alinha verticalmente ao centro
                gap-2 = espaço de 0.5rem entre itens
              */}
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                                Skills
                            </h3>

                            {/*
                .map() - Método de array que transforma cada item
                Para cada skill no array, cria um elemento JSX

                Sintaxe: array.map((item, index) => JSX)
                - item = o objeto atual do array
                - index = posição no array (0, 1, 2...)

                key={index} é OBRIGATÓRIO em listas React
                Ajuda o React a identificar qual item mudou
              */}
                            {skills.map((skill, index) => (
                                // Fragment (<></>) agrupa elementos sem criar DOM extra
                                // Ou podemos usar <div key={index}>
                                <div key={index} className="skill-card">
                                    {/*
                    Cabeçalho do skill
                    justify-between = espaço entre os itens (nome | porcentagem)
                  */}
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            {/*
                        Renderiza o ícone armazenado em skill.icon
                        Como skill.icon já é JSX, basta inserir diretamente
                      */}
                                            <span className="text-gray-500 dark:text-gray-400">
                        {skill.icon}
                      </span>
                                            <span className="font-medium">{skill.name}</span>
                                        </div>
                                        {/* Porcentagem */}
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                                    </div>

                                    {/* Barra de progresso */}
                                    {/*
                    h-2 = altura de 0.5rem (8px)
                    bg-gray-200 = cor de fundo cinza claro
                    dark:bg-gray-700 = no modo escuro, cinza mais escuro
                    rounded-full = bordas completamente arredondadas
                  */}
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        {/*
                      Barra preenchida
                      style={{ width: ... }} - Estilo inline para largura dinâmica
                      Template literal: `${variavel}%` = "85%"
                    */}
                                        <div
                                            className={`skill-bar h-full rounded-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-400`}
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ============================================================
              COLUNA DIREITA - Cards de Diferenciais
          ============================================================ */}
                    <div className="differentials-container">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                            {t.about.differential}
                        </h3>

                        {/* Grid 2x2 para os cards de diferencial */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/*
                Mapeia o array de diferenciais
                Cada item vira um card
              */}
                            {differentials.map((item, index) => (
                                <div
                                    key={index}
                                    className="differential-card glass rounded-xl p-5 hover:scale-105 transition-transform duration-300"
                                    // hover:scale-105 = aumenta 5% no hover
                                    // transition-transform = anima a transformação
                                    // duration-300 = 300ms de duração
                                >
                                    {/* Ícone com fundo colorido */}
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-3 text-primary-light dark:text-primary-dark">
                                        {item.icon}
                                    </div>

                                    {/* Título do card */}
                                    <h4 className="font-semibold mb-2">{item.title}</h4>

                                    {/* Descrição */}
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================================================================
            CITAÇÃO/DESTAQUE
        ================================================================ */}
                <div className="about-title glass rounded-2xl p-8 text-center">
                    <p className="text-lg md:text-xl italic text-gray-600 dark:text-gray-400">
                        "{t.about.differential_text}"
                    </p>
                </div>
            </div>
        </section>
    )
}

