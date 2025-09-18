// import { createTheme } from '@mui/material/styles';
// import MuiTheme1ProfileMap from './mui_theme_1/theme-profile';
// const profileMap = MuiTheme1ProfileMap;

// type PaletteProfileKey = keyof typeof profileMap.paletteProfiles;
// type BorderProfileKey = keyof typeof profileMap.borderProfiles;
// type TypographyProfileKey = keyof typeof profileMap.typographyProfiles;
// type SpacingProfileKey = keyof typeof profileMap.spacingProfiles;

// type PaletteProfileValue = typeof profileMap.paletteProfiles[PaletteProfileKey]; 
// type BorderProfileValue = typeof profileMap.borderProfiles[BorderProfileKey];
// type TypographyProfileValue = typeof profileMap.typographyProfiles[TypographyProfileKey];
// type SpacingProfileValue = typeof profileMap.spacingProfiles[SpacingProfileKey];

// declare module '@mui/material/styles' {
//   interface Theme {
//     custom: {
//       activeProfiles: {
//         palette: PaletteProfileKey;
//         border: BorderProfileKey;
//         typography: TypographyProfileKey;
//         spacing: SpacingProfileKey;
//       };
//       tokens: {
//         paletteProfile: PaletteProfileValue;
//         borderProfile: BorderProfileValue;
//         typographyProfile: TypographyProfileValue;
//         spacingProfile: SpacingProfileValue;
//       };
//     };
//   }

//   interface ThemeOptions {
//     custom?: Theme['custom'];
//   }
// }

// export interface ProfileSelection {
//   palette: keyof typeof profileMap.paletteProfiles;
//   border: keyof typeof profileMap.borderProfiles;
//   typography: keyof typeof profileMap.typographyProfiles;
//   spacing: keyof typeof profileMap.spacingProfiles;
// }

// export function buildTheme(selection: ProfileSelection) {
//   const paletteProfile = profileMap.paletteProfiles[selection.palette];
//   const borderProfile = profileMap.borderProfiles[selection.border];
//   const typographyProfile = profileMap.typographyProfiles[selection.typography];
//   const spacingProfile = profileMap.spacingProfiles[selection.spacing];

//   return createTheme({
//     palette: {
//       mode: 'light', // or dynamic if you want
//       primary: { main: paletteProfile.light.main },
//       text: { primary: paletteProfile.light.text },
//     },
//     shape: {
//       borderRadius: borderProfile.borderRadius,
//     },
//     typography: {
//       fontFamily: `'Inter', sans-serif`,
//       button: typographyProfile,
//     },
//     custom: {
//       activeProfiles: selection,
//       tokens: {
//         paletteProfile,
//         borderProfile,
//         typographyProfile,
//         spacingProfile,
//       },
//     },
//   } as const);
// }