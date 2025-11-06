import type { PaletteMode } from "@mui/material"
import { createTheme } from "@mui/material/styles"

const getCSSVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
    h1: { fontSize: 42, fontWeight: 400 },
    h2: { fontSize: 32, fontWeight: 400 },
    h3: { fontSize: 24, fontWeight: 400 },
    body1: { fontSize: 14, fontWeight: 400 },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: getCSSVar("--turquoise-color") || "#48E5C2",
          },
          secondary: {
            main: getCSSVar("--highlight-color") || "#F66247",
          },
          background: {
            default: "#f9f9f9", // From globals.css
            paper: "#ffffff",
          },
          text: {
            primary: getCSSVar("--jet-color") || "#333333",
            secondary: getCSSVar("--davys-gray-color") || "#5E5E5E",
          },
        }
      : {
          primary: {
            main: getCSSVar("--highlight-color") || "#F66247",
          },
          secondary: {
            main: getCSSVar("--turquoise-color") || "#48E5C2",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
          },
        }),
  },
  components: {
    // Global component styles
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          fontFamily: '"Nunito Sans", sans-serif',
        },
      },
    },
  },
})

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode))
