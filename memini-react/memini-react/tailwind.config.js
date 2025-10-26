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
   require('@tailwindcss/line-clamp'),
   function({ addUtilities, theme }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(156, 163, 175, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(107, 114, 128, 0.7)',
          },
        },
        '.scrollbar-webkit-blue': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(219, 234, 254, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(59, 130, 246, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(37, 99, 235, 0.7)',
          },
        },
      }
      addUtilities(newUtilities)
    }

  ],
}