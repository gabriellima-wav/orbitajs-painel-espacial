import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type React from 'react';
import { purpleTheme } from './purpleTheme';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
