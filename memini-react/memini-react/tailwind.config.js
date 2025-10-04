/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {

      colors: {      
        miTask: '#e3f2fd',    
        miTaskHL: '#bbdefb',
        miTaskHBR: '#42a5f5'      
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
   require('@tailwindcss/line-clamp')

  ],
}