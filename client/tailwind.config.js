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
        // We can define custom SaaS theme names mapping directly to design colors
        primary: {
          DEFAULT: '#2563EB', // Blue 600
          hover: '#1D4ED8',   // Blue 700
          light: '#DBEAFE',   // Blue 100
        },
        bg: {
          light: '#F8FAFC',   // Slate 50
          dark: '#0F172A',    // Slate 900
        },
        card: {
          light: '#FFFFFF',
          dark: '#1E293B',    // Slate 800
        },
        sidebar: {
          light: '#FFFFFF',
          dark: '#111827',    // Gray 950
        },
        border: {
          light: '#E5E7EB',   // Gray 200
          dark: '#334155',    // Slate 700
        }
      },
      borderRadius: {
        'card': '16px',
        'btn': '10px',
        'input': '10px',
        'modal': '20px',
        'badge': '999px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
