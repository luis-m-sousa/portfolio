// ============================================================================
// src/components/Contact.tsx
// ============================================================================

// Esta diretiva indica que o componente é "client component".
// É obrigatório porque vamos usar useState (hook do React) e eventos de formulário.
'use client'

import { FormEvent, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
// Ícones para deixar a UI mais rica visualmente
import { Mail, Phone, MapPin, Send, Download, Github, Linkedin } from 'lucide-react'

// ============================================================================
// TIPAGEM DO FORMULÁRIO (TypeScript)
// ============================================================================

// Interface define o formato dos dados do formulário.
// Isso ajuda o editor a sugerir os campos corretos e evita erros de digitação.
interface ContactFormData {
    name: string
    email: string
    message: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Contact() {
    // Hook de tradução: t contém todos os textos no idioma atual.
    const { t, language } = useLanguage()

    // Estado do formulário: guarda o valor de cada campo.
    // useState recebe o valor inicial e retorna [valor, função para atualizar].
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    })

    // Estado para loading (enviando...) e mensagem de feedback (sucesso/erro).
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState<string | null>(null)
    const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)

    // ========================================================================
    // HANDLERS (FUNÇÕES QUE RESPONDEM A EVENTOS DO FORMULÁRIO)
    // ========================================================================

    // handleChange é chamado sempre que o usuário digita em um input/textarea.
    // event.target.name é o atributo "name" do input (name, email, message).
    // event.target.value é o texto que o usuário digitou.
    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target

        // Atualiza o estado de forma imutável:
        // ...formData copia o objeto atual,
        // [name]: value sobrescreve apenas o campo que mudou.
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // handleSubmit é chamado quando o usuário clica em "Enviar".
    // FormEvent<HTMLFormElement> = tipo do evento de submit.
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // Previne o comportamento padrão do HTML (recarregar a página).
        event.preventDefault()

        // Validação simples no front-end: verifica se campos obrigatórios estão preenchidos.
        if (!formData.name || !formData.email || !formData.message) {
            setStatusType('error')
            setStatusMessage(t.contact.error) // texto do JSON de tradução
            return
        }

        try {
            setIsSubmitting(true)
            setStatusMessage(null)
            setStatusType(null)

            // Aqui você poderia chamar uma API real:
            // const response = await fetch('/api/contact', { ... })

            // Como ainda não temos backend, vamos simular um delay:
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Se chegamos aqui, consideramos "sucesso".
            setStatusType('success')
            setStatusMessage(t.contact.success)

            // Limpa os campos do formulário após envio
            setFormData({
                name: '',
                email: '',
                message: '',
            })
        } catch (error) {
            // Em caso de erro na requisição, mostra mensagem de erro.
            setStatusType('error')
            setStatusMessage(t.contact.error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // ========================================================================
    // BOTÕES DE DOWNLOAD DO CV
    // ========================================================================
    // A tag <a> com atributo download é a forma mais simples e recomendada
    // para forçar o download de arquivos estáticos como PDF.[web:57][web:60]

    const cvPtHref = '/cv/curriculo-pt.pdf'
    const cvEnHref = '/cv/resume-en.pdf'

    // ========================================================================
    // JSX - ESTRUTURA VISUAL DA SEÇÃO
    // ========================================================================

    return (
        <section
            id="contact"
            className="relative py-20 md:py-32 px-6 overflow-hidden"
        >
            {/* BACKGROUND DECORATIVO */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* CONTAINER PRINCIPAL */}
            <div className="max-w-6xl mx-auto relative z-10">
                {/* CABEÇALHO DA SEÇÃO */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.contact.title}</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.contact.subtitle}
                    </p>
                </div>

                {/* GRID: INFORMAÇÕES + FORMULÁRIO */}
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* COLUNA ESQUERDA - INFORMAÇÕES DE CONTATO E CV */}
                    <div className="space-y-6">
                        {/* Bloco com email, LinkedIn, GitHub */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                                {language === 'pt' ? 'Informações de contato' : 'Contact info'}
                            </h3>

                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                                    <a
                                        href="mailto:luismigueldesousa2707@gmail.com"
                                        className="hover:underline"
                                    >
                                        luismigueldesousa2707@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Linkedin className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                                    <a
                                        href="https://linkedin.com/in/luis-miguel-0387892a4/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        linkedin.com/in/luis-miguel-0387892a4
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Github className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                                    <a
                                        href="https://github.com/luis-m-sousa/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        github.com/luis-m-sousa
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Bloco de download do CV */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Download className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                                {language === 'pt' ? 'Currículo' : 'Resume'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {language === 'pt'
                                    ? 'Baixe meu currículo em português ou inglês:'
                                    : 'Download my resume in Portuguese or English:'}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {/* CV em Português */}
                                <a
                                    href={cvPtHref}
                                    download
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:scale-105 transition-transform"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>PDF (PT-BR)</span>
                                </a>

                                {/* CV em Inglês */}
                                <a
                                    href={cvEnHref}
                                    download
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium hover:scale-105 transition-transform"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>PDF (EN)</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUNA DIREITA - FORMULÁRIO */}
                    <div className="glass rounded-2xl p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Campo Nome */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                                >
                                    {t.contact.name_label}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/60 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                                    placeholder={
                                        language === 'pt'
                                            ? 'Digite seu nome'
                                            : 'Type your name'
                                    }
                                />
                            </div>

                            {/* Campo E-mail */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                                >
                                    {t.contact.email_label}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/60 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                                    placeholder={
                                        language === 'pt'
                                            ? 'luismigueldesousa2707@gmail.com'
                                            : 'luismigueldesousa2707@gmail.com'
                                    }
                                />
                            </div>

                            {/* Campo Mensagem */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                                >
                                    {t.contact.message_label}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/60 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark resize-none"
                                    placeholder={
                                        language === 'pt'
                                            ? 'Escreva sua mensagem...'
                                            : 'Write your message...'
                                    }
                                />
                            </div>

                            {/* Mensagem de status (sucesso/erro) */}
                            {statusMessage && (
                                <div
                                    className={`text-sm rounded-xl px-4 py-2 ${
                                        statusType === 'success'
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                    }`}
                                >
                                    {statusMessage}
                                </div>
                            )}

                            {/* Botão de envio */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                                {isSubmitting
                                    ? language === 'pt'
                                        ? 'Enviando...'
                                        : 'Sending...'
                                    : t.contact.send_message}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
