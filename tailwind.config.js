module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    // SAFELIST - Classes geradas dinamicamente que precisam ser preservadas
    safelist: [
        // Cores das barras de skill (About)
        'from-indigo-500', 'to-indigo-400',
        'from-purple-500', 'to-purple-400',
        'from-pink-500', 'to-pink-400',
        'from-amber-500', 'to-amber-400',
        // Cores da Timeline
        'from-emerald-500', 'to-emerald-500',
        'from-teal-500', 'to-teal-500',
        'from-orange-500', 'to-orange-500',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6366f1',
                    dark: '#818cf8',
                },
                background: {
                    light: '#f8fafc',
                    dark: '#0f172a',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#1e293b',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}