'use client'

import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';

// Define your custom theme
let theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#352c3c', 
    },
    secondary: {
      main: '#ed2da6',
    },
    background: {
      default: '#e6e3e5'
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize the default font family
    button: {
      fontStyle: 'bold'
    },
  },

});


export default theme;