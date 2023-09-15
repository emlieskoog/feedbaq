"use client";

import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

// Define your custom theme
let theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#353435",
    },
    secondary: {
      main: "#ffe4ec",
    },
    background: {
      default: "white",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Customize the default font family
    button: {
      fontStyle: "bold",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#ff329f", // Specify your hover color
          },
        },
      },
    },
  },
});

export default theme;
