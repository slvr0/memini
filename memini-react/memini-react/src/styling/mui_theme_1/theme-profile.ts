const MaterialUITheme1Profile = {    
  paletteProfiles: {
    main: {
      light: { main: '#FFFFFF', hover: '#EDEDED', text: '#171B25', border:'#d8d8d8', borderHover:'#9f9f9f' },
      dark: { main: '#90caf9', hover: '#64b5f6', text: '#000', border:'#E1E7EB', borderHover:'#C1C8CD' }, //dark modes are not configured yet.
    },
    warning: {
      light: { main: '#F8EEE4', hover: '#f57c00', text: '#000', border:'#e5a049', borderHover:'#c97d1d' },
      dark: { main: '#ffb74d', hover: '#ff9800', text: '#000', border:'#E1E7EB', borderHover:'#C1C8CD' },
    },
  },
  borderProfiles: {
    rounded: { 
      borderRadius: 9999, 
      shadow: '0 1px 3px rgba(0,0,0,0.05)',
      borderWidth: '1px',                       
    },
    straight: { 
      borderRadius: '.375rem', 
      shadow: '0 1px 3px rgba(0,0,0,0.05)',  
      borderWidth: '1px',    
    },
    none: {
      borderRadius: '0', 
      shadow: 'none',  
      borderWidth: '0',  
    },
    square: {
      borderRadius: '0', 
      shadow: '0 1px 3px rgba(0,0,0,0.05)',  
      borderWidth: '1px',
    }
  },

  spacingProfiles: {
    tiny: {px: 1.0, py: 0.15, mx: 0 , my: 0},
    compact: { px: 1.5, py: 0.35, mx: 0 , my: 0 },
    medium: { px: 1.5, py: 0.65, mx: 0 , my: 0 },
    roomy: { px: 2, py: 0.75, mx: 4 , my: 4 },
    segmentMini : {px: 1.0, py: 0.15, mx: 0 , my: 0},
    segmentSmall : {px: 1.0, py: 0.15, mx: 0 , my: 0},
    segmentMedium : {px: 1.0, py: 0.65, mx: 0 , my: 0},
    segmentLarge : {px: 1.0, py: 0.15, mx: 0 , my: 0},

  }, 
};

export default MaterialUITheme1Profile;