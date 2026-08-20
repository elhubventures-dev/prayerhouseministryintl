import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0F2C',
          dark: '#06091A',
          light: '#12184A',
          mid: '#0D1438',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F4A832',
          pale: '#E8C97A',
          dark: '#9E7A28',
        },
        ivory: {
          DEFAULT: '#F5F0E8',
          dark: '#D8D0C0',
        },
        silver: '#A8A8C0',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        garamond: ['var(--font-garamond)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F4A832 50%, #C9A84C 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(6,9,26,0.55) 0%, rgba(6,9,26,0.85) 100%)',
        'gold-ray': 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.25) 0%, transparent 70%)',
        'section-fade': 'linear-gradient(to bottom, #06091A, #0A0F2C, #06091A)',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.15)' },
          '50%': { boxShadow: '0 0 50px rgba(201,168,76,0.45)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201,168,76,0.25)',
        'gold-lg': '0 0 60px rgba(201,168,76,0.35)',
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        card: '0 4px 24px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
