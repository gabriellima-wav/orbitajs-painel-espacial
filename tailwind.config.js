/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true, 
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        space: {
          dark: '#0f0f23',
          medium: '#1a1a2e',
          light: '#16213e',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        'purple-gradient': 'linear-gradient(45deg, #a855f7, #ec4899)',
        'purple-gradient-hover': 'linear-gradient(45deg, #9333ea, #db2777)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 15px #a855f7' },
          '100%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7' },
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
