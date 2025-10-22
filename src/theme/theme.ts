'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#53313cff' },
    text: {primary: "#FFFFFF"},
    success: { main: '#4caf50' },
    error: { main: '#f44336' },
    mode: 'dark'
  },
  typography: {
    fontFamily: 'var(--font-fire-sans)',
  },
});
