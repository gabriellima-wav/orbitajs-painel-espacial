// src/theme/types.ts
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      colors: typeof import('./tokens/colors').colors;
      spacing: typeof import('./tokens/spacing').spacing;
      effects: typeof import('./tokens/effects').effects;
    };
  }

  interface ThemeOptions {
    custom?: {
      colors?: typeof import('./tokens/colors').colors;
      spacing?: typeof import('./tokens/spacing').spacing;
      effects?: typeof import('./tokens/effects').effects;
    };
  }

  interface Palette {
    glass: {
      primary: string;
      secondary: string;
      border: string;
    };
  }

  interface PaletteOptions {
    glass?: {
      primary?: string;
      secondary?: string;
      border?: string;
    };
  }
}
