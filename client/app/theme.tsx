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
    fontFamily: "MDPrimerBlack",
    button: {
      fontFamily: "TrimWebLight",
      fontStyle: "bold",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#ff329f",
          },
        },
      },
    },
  },
});

export default theme;
