import { createTheme } from '@mui/material/styles';

export const purpleTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#0f0f23',
      paper: 'rgba(168, 85, 247, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(168, 85, 247, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#a855f7',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#a855f7',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '&.MuiAlert-standardError': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
  },
});
