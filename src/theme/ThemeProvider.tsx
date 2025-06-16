import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
