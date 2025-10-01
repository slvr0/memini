import MaterialUITheme1Profile from "./theme-profile";

interface ThemeColors {
  main: string;
  hover: string;
  text: string;
  border: string;
  borderHover: string;
}

interface PaletteProfile {
  light: ThemeColors;
  dark: ThemeColors;
}

interface StatusColorConfig {
  backgroundColor: string;
  hoverColor?: string;
  borderColor?: string;
  borderhoverColor?: string;
  textColor?: string;
}

class PaletteColorProfile {
  static getColorConfig(
    colorProfile: keyof typeof MaterialUITheme1Profile.paletteProfiles, 
    theme: 'light' | 'dark' = 'light'
  ): StatusColorConfig {
    const palette = MaterialUITheme1Profile.paletteProfiles[colorProfile] as PaletteProfile;
    const themeColors = palette[theme];
    
    return {
      backgroundColor: themeColors.main,
      hoverColor: themeColors.hover,
      borderColor: themeColors.border,
      borderhoverColor: themeColors.border,
      textColor: themeColors.text,
    };
  }

  static getBackgroundColor(
    colorProfile: keyof typeof MaterialUITheme1Profile.paletteProfiles, 
    theme: 'light' | 'dark' = 'light'
  ): string {
    const palette = MaterialUITheme1Profile.paletteProfiles[colorProfile] as PaletteProfile;
    return palette[theme].main;
  }

    static getHoverColor(
    colorProfile: keyof typeof MaterialUITheme1Profile.paletteProfiles, 
    theme: 'light' | 'dark' = 'light'
  ): string {
    const palette = MaterialUITheme1Profile.paletteProfiles[colorProfile] as PaletteProfile;
    return palette[theme].hover;
  }

  static getBorderColor(
    colorProfile: keyof typeof MaterialUITheme1Profile.paletteProfiles, 
    theme: 'light' | 'dark' = 'light'
  ): string {
    const palette = MaterialUITheme1Profile.paletteProfiles[colorProfile] as PaletteProfile;
    return palette[theme].border;
  }

    static getBorderHoverColor(
    colorProfile: keyof typeof MaterialUITheme1Profile.paletteProfiles, 
    theme: 'light' | 'dark' = 'light'
  ): string {
    const palette = MaterialUITheme1Profile.paletteProfiles[colorProfile] as PaletteProfile;
    return palette[theme].borderHover;
  }

  static getAllPaletteProfiles(): (keyof typeof MaterialUITheme1Profile.paletteProfiles)[] {
    return Object.keys(MaterialUITheme1Profile.paletteProfiles) as (keyof typeof MaterialUITheme1Profile.paletteProfiles)[];
  }
}

export type PaletteProfileType = keyof typeof MaterialUITheme1Profile.paletteProfiles;
export default PaletteColorProfile;