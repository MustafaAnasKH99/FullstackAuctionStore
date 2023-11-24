/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily:{
      'sans': ['Raleway', 'sans-serif'],
    },
    colors: {
      dark_black: '#131515', 
      light_black: '#2B2C28',
      dark_green: '#339989',
      light_green: '#7DE2D1',
      white: '#FFFAFB'
    },
  },
  plugins: [],
}
