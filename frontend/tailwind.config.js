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
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F2',
          200: '#F7F4EC', // Asosiy daftar qog'ozi foni
          300: '#ECE6D8',
          400: '#DCD4C0',
        },
        pitch: {
          light: '#3ea861',
          DEFAULT: '#2d7a46', // Maydon yashili
          dark: '#1d542f',
          deep: '#12381f',
        },
        stadium: {
          night: '#0c1322',
          card: '#161f36',
          floodlight: '#fffae0',
        },
        navy: {
          DEFAULT: '#1E2A5A',
          dark: '#141c3d',
        },
        referee: {
          yellow: '#FACC15',
          red: '#EF4444',
        }
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Caveat"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Impact"', '"Bebas Neue"', 'sans-serif'],
      },
      boxShadow: {
        'scrapbook': '4px 6px 0px rgba(0,0,0,0.85)',
        'scrapbook-lg': '8px 12px 0px rgba(0,0,0,0.85)',
        'scrapbook-sm': '2px 3px 0px rgba(0,0,0,0.85)',
        'floodlight': '0 0 50px 10px rgba(255, 250, 224, 0.25)',
      }
    },
  },
  plugins: [],
}

