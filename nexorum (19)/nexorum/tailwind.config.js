/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        surfaceHover: '#1a1a25',
        border: '#2a2a3a',
        primary: '#6366f1',
        primaryHover: '#818cf8',
        accent: '#22d3ee',
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
        muted: '#6b7280'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(99,102,241,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(99,102,241,0.6)' },
        }
      }
    },
  },
  plugins: [],
}
