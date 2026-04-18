/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1117',
        surface: '#1a1d27',
        'surface-raised': '#22263a',
        border: '#2e3348',
        accent: '#4f8ef7',
        'accent-green': '#36d399',
        'accent-red': '#f87272',
        'accent-yellow': '#fbbf24',
        text: '#e2e8f0',
        'text-muted': '#8892a4',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}