'use client'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: '#303633' },
    secondary: { main: '#8be8cb' },
    text: { primary: '#191919' },
    success: { main: '#4caf50' },
    error: { main: '#f44336' },
  },
  typography: {
    fontFamily: 'var(--font-inter)',
    fontSize: 12,
    h1: {
      fontSize: 24,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.43
    },
  },
  
})
