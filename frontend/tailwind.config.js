/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                premium: {
                    bg: '#0f172a',
                    card: 'rgba(30, 41, 59, 0.7)',
                    accent: '#38bdf8',
                    text: '#f8fafc',
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
