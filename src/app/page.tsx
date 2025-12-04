// ============================================================================
// IMPORTS
// ============================================================================

// Importa os componentes que criamos
// Cada componente é uma seção do portfólio
import Navbar from '@/components/Navbar'   // Barra de navegação
import Hero from '@/components/Hero'       // Seção inicial (hero)
import About from '@/components/About'
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";     // Seção sobre mim
import Contact from "@/components/Contact";

// ============================================================================
// COMPONENTE DA PÁGINA
// ============================================================================

// Este é um Server Component por padrão no Next.js 13+
// Não precisa de 'use client' porque não usa hooks
export default function Home() {
    return (
        // <main> é um elemento HTML5 semântico para o conteúdo principal
        // relative = posicionamento relativo (necessário para elementos absolutos filhos)
        <main className="relative pt-16 md:pt-20">
            {/*
        Os componentes são renderizados na ordem em que aparecem
        Navbar fica fixo no topo (position: fixed no CSS)
        Hero é a primeira seção visível
        About vem logo abaixo do Hero
      */}
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Timeline />
            <Contact />

            {/*
        Próximas seções a adicionar:
        <Projects />
        <Timeline />
        <Contact />
      */}
        </main>
    )
}
