import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        cyber: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
          yellow: '#f59e0b',
        },
        web3: {
          orange: '#ff6b35',
          mint: '#00d4aa',
          violet: '#8b5cf6',
          rose: '#f43f5e',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'cyber-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
          },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'data-flow': 'data-flow 3s linear infinite',
      },
      backgroundImage: {
        'cyber-gradient':
          'linear-gradient(135deg, hsl(220, 13%, 8%) 0%, hsl(260, 30%, 12%) 25%, hsl(280, 40%, 10%) 50%, hsl(260, 30%, 12%) 75%, hsl(220, 13%, 8%) 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(30, 30, 40, 0.9) 0%, rgba(40, 30, 50, 0.8) 50%, rgba(30, 30, 40, 0.9) 100%)',
        'button-gradient':
          'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(139, 92, 246, 0.9) 50%, rgba(168, 85, 247, 0.8) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
