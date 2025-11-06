import type { Theme } from "@mui/material/styles"
import type { SxProps } from "@mui/system"

// Type-safe styles object for Footer component
export const footerStyles = {
  footer: {
    backgroundColor: "#798fa4",
    color: "white",
    padding: "15px 0",
    textAlign: "center",
    marginTop: "auto",
  } as SxProps<Theme>,
} as const
