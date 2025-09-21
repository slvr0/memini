import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  typography: {
      fontFamily: `'Plus Jakarta Sans', 'Geiko', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
      //  h1: {
      //   fontSize: '3rem',  
      //   fontWeight: 700,
      // },
      
      // h2: {
      //   fontSize: '2.5rem', 
      //   fontWeight: 600,
      // },
      
      // h3: {
      //   fontSize: '2rem', 
      //   fontWeight: 600,
      // },
      
      // h4: {
      //   fontSize: '1.5rem', 
      //   fontWeight: 600,
      // },
      
 
      
      h6: {
        fontSize: '10px',
        fontWeight: 500,
      },
      
      body1: {
        fontSize: '1rem',    
        fontWeight: 400,
      },
      
      body2: {
        fontSize: '0.875rem',   
        fontWeight: 400,   
      },
      
      subtitle1: {
        fontSize: '13px',     
        fontWeight: 500,       
      },
      
      subtitle2: {
        fontSize: '12px',
        fontWeight: 400,
      },
      
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
      },
      
      caption: {
        fontSize: '12px', 
        fontWeight: 400,
      },
      
      overline: {
        fontSize: '10px',
        fontWeight: 600,
      },
    },

    spacing: (factor : number) => `${0.25 * factor}rem`,

    transitions: {
      
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },

    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

});

export default theme;