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
const muiTheme = createTheme({
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
          fontSize: "1.2rem",
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "var(--primary-text)",
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
    MuiDivider: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          fontSize: "13px",
          color: "var(--border-color)",
          borderColor: "var(--border-color)",
          ":before": {
            borderColor: "var(--border-color)",
          },
          ":after": {
            borderColor: "var(--border-color)",
          },
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
          color: "var(--primary-text)",
          background: "var(--background)",
          "& .MuiInputBase-input": {
            background: "var(--background)",
            color: "var(--accent)",
            paddingLeft: "0.5em",
            "::placeholder": {
              color: "var(--primary-text)",
            },
          },
          outline: "1px solid var(--border-color)",
          // boxShadow: "var(--inset-shadow)",
          borderRadius: "var(--border-radius)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          outline: "1px solid var(--border-color)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1em",
          top: "-5%",

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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1.3em",
          "&.Mui-selected": {
            backgroundColor: "var(--accentalpha)",
          },
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
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "var(--primary-text)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
          background: "var(--background)",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        icon: {
          "& .MuiSvgIcon-root": {
            color: "orange",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--accent)",
          },
        },
        select: {
          color: "var(--primary-text)",
          padding: ".3125em .5em",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          fontSize: "var(--body1)",
          background: "var(--primary)",
          borderRadius: "var(--border-radius)",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "var(--gray)",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-bn)",
          color: "var(--primary-text)",
          fontSize: "1.2em",
          "&.Mui-selected": {
            color: "var(--accent)",
          },
          minHeight: 0,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--accent)",
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
          color: "var(--primary-text)",
          border: "1px solid var(--border-color)",
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
      color: "var(--body1-color, #281515)",
      fontFamily: "var(--font-as)",
      fontSize: "var(--body1)",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      letterSpacing: "0.0175rem",
    },
    body2: {
      color: "var(--body2-color, #9B9EAC)",
      fontFamily: "var(--font-as)",
      fontSize: "var(--body2)",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    h1: {
      fontStyle: "normal",
      fontWeight: "600",
      fontFamily: "var(--font-bn)",
      margin: "0",
      fontSize: "var(--h1)",

      color: "var(--h1-color, #281515)",
    },
    h2: {
      color: "var(--h2-color, #281515)",
      fontFamily: "var(--font-as)",
      fontSize: "var(--h2)",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
    },
    h3: {
      color: "var(--h3-color, #281515)",
      fontFamily: "var(--font-bn)",
      fontSize: "var(--h3)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
  },
});

export default muiTheme;
