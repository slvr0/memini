/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {

      colors: {      
        miLight: '#97bdc3',
        miMedium: '#5d98a2',
        miComplLight: '#c4a99e',
        miComplMedium: '#9e7261',     
        miNegative: '#ec9b89',
        miPositive: '#6855f3',
        miInfo: '#e5e4e4'      
      },

      fontFamily: {
        title: ['"Pacifico"', 'cursive']
      }, 

      screens: {
        '2xl' : '1536px',
        'page-max': '1536px'
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}