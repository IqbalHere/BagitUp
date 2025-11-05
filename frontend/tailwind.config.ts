import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      tealgreen: '#016B61',
      coolseablue: '#70B2B2',
      lightblue: '#9ECFD4',
      cream: '#E5E9C5',
      // New glassmorphism accent colors
      skyblue: '#4FC3F7',
      deepblue: '#0288D1',
      mintgreen: '#81C784',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        300: '#fca5a5',
        500: '#ef4444',
        600: '#dc2626',
      },
    },
    fontFamily: {
      serif: ['Domine', 'serif'],
      sans: ['system-ui', 'sans-serif'],
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
