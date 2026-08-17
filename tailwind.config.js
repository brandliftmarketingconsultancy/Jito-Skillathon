/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      colors: {
  navy: {
    950: '#070D20',
    900: '#0B142F',
    800: '#111D3D',
    700: '#18274A',
    600: '#24345A',
  },

  blue: {
    300: '#8DB8FF',
    400: '#6EA8FF',
    500: '#2F6BFF',
    600: '#2455D6',
    700: '#1D46B8',
  },

  white: {
    100: '#F5F7FF',
    200: '#E1E7F5',
  },

  muted: {
    400: '#AAB5D0',
    500: '#8B98B8',
    600: '#707D9C',
  },
},

      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },

      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },

        rise: {
          '0%': {
            opacity: 0,
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },

        pulseRing: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(47,107,255,0.5)',
          },
          '70%': {
            boxShadow: '0 0 0 14px rgba(47,107,255,0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(47,107,255,0)',
          },
        },

        tickFlip: {
          '0%': {
            transform: 'rotateX(0deg)',
          },
          '100%': {
            transform: 'rotateX(-90deg)',
          },
        },
      },

      animation: {
        flicker: 'flicker 3.5s ease-in-out infinite',
        rise: 'rise 0.7s cubic-bezier(0.16,1,0.3,1) both',
        pulseRing: 'pulseRing 2s infinite',
      },
    },
  },

  plugins: [],
}