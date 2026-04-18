/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0B0E',
        surface: '#141619',
        'surface-raised': '#1C1F26',
        'surface-glass': 'rgba(28, 31, 38, 0.7)',
        border: '#2A2F3A',
        'border-light': 'rgba(255, 255, 255, 0.08)',
        accent: '#0052FF',
        'accent-secondary': '#8B5CF6',
        'accent-gradient': 'linear-gradient(135deg, #0052FF 0%, #8B5CF6 100%)',
        'accent-green': '#00D68F',
        'accent-red': '#FF4757',
        'accent-yellow': '#FFB800',
        'mastercard-red': '#EB001B',
        'mastercard-orange': '#F79E1B',
        text: '#F7F8FA',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 82, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}