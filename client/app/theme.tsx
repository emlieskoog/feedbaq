"use client";

import {
  createTheme,
  responsiveFontSizes,
  Shadows,
  Theme,
} from "@mui/material/styles";

// Define your custom theme
let theme: Theme = createTheme({
  shadows: Array(25).fill("none") as Shadows, // To remove box shadows
  palette: {
    primary: {
      main: "#353435",
    },
    secondary: {
      main: "#ff329f",
    },
    background: {
      default: "white",
    },
  },

  typography: {
    fontFamily: "Franklin Gothic",
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
            color: "white",
            border: "none",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#4a4a4a",
          color: "white",
          "&:hover": {
            backgroundColor: "#ff329f",
            color: "white",
            border: "none",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#ff329f",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ff329f",
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          maxHeight: "200px",
          overflowY: "auto",
        },
      },
    },
  },
});

export default theme;
