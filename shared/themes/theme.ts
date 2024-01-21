declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000,
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          ":first-of-type , &:last-of-type": {
            borderRadius: "var(--border-radius)",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
          ":hover": {
            background: "var(--graylight)",
          },
        },
        content: {
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "1em",
          fontFamily: "var(--font-as)",
          color: "var(--accent)",
          borderRadius: "var(--border-radius)",
        },
        contained: {
          background: "var(--primary)",
          color: "var(--white)",
          ":hover": {
            background: "var(--accent)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
          fontFamily: "var(--font-as)",
          fontWeight: "bold",
          background: "var(--white)",
          height: "fit-content",
          paddingBlock: "0.2em",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-as)",
          fontSize: "2em",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-as)",
          fontSize: "1em",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: "1em",
          width: "100%",
          color: "var(--primary)",
          "& .MuiInputBase-input": {
            color: "var(--accent)",
            paddingLeft: "0.5em",
            "::placeholder": {
              color: "var(--primary)",
            },
          },
          outline: "1px solid var(--border-color)",
          // boxShadow: "var(--inset-shadow)",
          borderRadius: "var(--border-radius)",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1em",
          "&.Mui-focused": {
            color: "var(--accent)",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: "1px solid var(--border-color)",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          fontSize: "1em",
          background: "var(--primary)",
          borderRadius: "var(--border-radius)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          paddingInline: "1em",
          paddingBlock: "0",
          fontSize: "1em",
          fontFamily: "var(--font-as)",
          "&.Mui-selected": {
            fontWeight: "700",
            color: "var(--accent)",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Alumni Sans",
      "Bebas Neue",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
    body1: {
      color: "var(--body1, #281515)",
      fontFamily: "var(--font-as)",
      fontSize: "1em",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      letterSpacing: "0.0175rem",
    },
    body2: {
      color: "var(--body2, #9B9EAC)",
      fontFamily: "var(--font-as)",
      fontSize: ".875em",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    h1: {
      fontStyle: "normal",
      fontWeight: "600",
      fontFamily: "var(--font-bn)",
      margin: "0",
      fontSize: "2.1875em",
      color: "var(--h1-color, #281515)",
    },
    h2: {
      color: "var(--h2-color, #281515)",
      fontFamily: "var(--font-as)",
      fontSize: "1.5em",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
    },
    h3: {
      color: "var(--h3-color, #281515)",
      fontFamily: "var(--font-bn)",
      fontSize: "1em",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
  },
});

export default theme;
