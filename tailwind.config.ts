import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './shared/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft-blue': '0 0 17.7px rgba(66, 83, 118, 0.2)',
      },
      fontFamily: {
        sans: ["Gilroy","sans-serif"],
      },
      colors: {
        // Keep existing palette and add aliases matching project usage
        brand: {
          100: '#DDFFEF',
          200: '#B5E4CE',
          300: '#5AD49B',
          400: '#1BAC7E',
          500: '#00A772',
          600: '#009E6C',
          700: '#008F62',
        },
        gray: {
          100: '#F4F5F7',
          200: '#E7EBF2',
          300: '#A5ADBD',
          400: '#3B3B3B'
        },
        muted: {
          100: '#F4F5F7',
          200: '#E7EBF2',
          300: '#A5ADBD',
          400: '#3B3B3B',
        },
        green: {
          100: '#DDFFEF',
          200: '#B5E4CE',
          300: '#5AD49B',
          400: '#1BAC7E',
          500: '#00A772',
          600: '#009E6C',
          700: '#008F62',
        },
        blue: {
          500: '#0D4CD3',
        },
        red: {
          500: '#EE2F53',
        },
        yellow: {
          500: '#FFCC00',
        },
        black: {
          500: '#171717',
        },
        link: {
          black: '#171717',
          white: '#FFFFFF',
        },
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          'xl': "1280px",
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
