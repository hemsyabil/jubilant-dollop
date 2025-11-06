import type { Theme } from "@mui/material/styles"
import type { SxProps } from "@mui/system"

// Type-safe styles object for Header component
export const headerStyles = {
  appBar: (theme: Theme): SxProps<Theme> => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.background.default
        : theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  }),

  toolbar: {
    padding: 0,
    minHeight: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 1,
  } as SxProps<Theme>,

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  } as SxProps<Theme>,

  logo: {
    height: 50,
    borderRadius: 1,
  } as React.CSSProperties,

  navigationBox: {
    display: "flex",
    gap: 4,
    alignItems: "center",
  } as SxProps<Theme>,

  menuLink: (theme: Theme): SxProps<Theme> => ({
    fontFamily: '"Nunito Sans", sans-serif',
    fontWeight: 600,
    fontSize: "1rem",
    color: "inherit",
    textDecoration: "none",
    position: "relative",
    paddingBottom: 0.5,
    transition: "color 0.2s ease",
    borderBottom: "3px solid transparent",

    "&:hover": {
      color: theme.palette.primary.main,
    },

    "&.active": {
      color: theme.palette.primary.main,
      borderBottomColor: theme.palette.primary.main,
    },
  }),

  actionsBox: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  } as SxProps<Theme>,

  actionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as SxProps<Theme>,
} as const
