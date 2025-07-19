import { createTheme } from '@mui/material/styles';
import { effects, spacing, typography } from './tokens';
import { colors } from './tokens/colors';

export const purpleTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.purple[500],
      light: colors.purple[400],
      dark: colors.purple[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.pink[500],
      light: colors.pink[500],
      dark: colors.pink[600],
      contrastText: '#ffffff',
    },
    background: {
      default: colors.dark[950],
      paper: 'rgba(168, 85, 247, 0.05)',
    },
    text: {
      primary: colors.dark[50],
      secondary: colors.dark[200],
    },
    error: {
      main: colors.semantic.error,
    },
    warning: {
      main: colors.semantic.warning,
    },
    info: {
      main: colors.semantic.info,
    },
    success: {
      main: colors.semantic.success,
    },
    glass: {
      primary: 'rgba(168, 85, 247, 0.08)',
      secondary: 'rgba(168, 85, 247, 0.05)',
      border: 'rgba(168, 85, 247, 0.15)',
    },
  },
  custom: {
    colors,
    spacing,
    effects,
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
    h1: {
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize['4xl'],
    },
    h2: {
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize['3xl'],
    },
    h3: {
      fontWeight: typography.fontWeight.semibold,
      fontSize: typography.fontSize['2xl'],
    },
    body1: {
      fontSize: typography.fontSize.base,
    },
    body2: {
      fontSize: typography.fontSize.sm,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(168, 85, 247, 0.08)', // Fundo translúcido
            backdropFilter: effects.blur.xl,
            color: '#ffffff', // Texto branco
            '& fieldset': {
              borderColor: 'rgba(168, 85, 247, 0.2)',
              transition: 'border-color 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: colors.purple[500],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.purple[500],
              borderWidth: '2px',
            },
            '&.Mui-error fieldset': {
              borderColor: colors.semantic.error,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.purple[500],
            '&.Mui-focused': {
              color: colors.purple[500],
            },
          },
          // Cor do texto de entrada
          '& .MuiOutlinedInput-input': {
            color: '#ffffff', // Garante que o texto seja branco
          },
          // Placeholder
          '& .MuiOutlinedInput-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: effects.blur.lg,
          border: '1px solid rgba(168, 85, 247, 0.1)',
          '&.glass': {
            background: 'rgba(168, 85, 247, 0.08)',
            backdropFilter: effects.blur.xl,
            border: '1px solid rgba(168, 85, 247, 0.15)',
            boxShadow: effects.shadow.glass,
          },
        },
      },
    },
    // Removed duplicate MuiTextField entry
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.base,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: effects.shadow.md,
          '&:hover': {
            boxShadow: effects.shadow.lg,
          },
        },
        containedPrimary: {
          background: effects.gradient.primary,
          '&:hover': {
            background: effects.gradient.primaryHover,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.MuiAlert-standardError': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            backdropFilter: effects.blur.sm,
          },
          '&.MuiAlert-standardSuccess': {
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            backdropFilter: effects.blur.sm,
          },
          '&.MuiAlert-standardWarning': {
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            backdropFilter: effects.blur.sm,
          },
          '&.MuiAlert-standardInfo': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backdropFilter: effects.blur.sm,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            textDecoration: 'underline',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
});
