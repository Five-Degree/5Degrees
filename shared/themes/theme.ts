import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  components: {},
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
      fontSize: ".875rem",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
    },
    body2: {
      color: "var(--body2, #9B9EAC)",
      fontFamily: "var(--font-as)",
      fontSize: ".875rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    h1: {
      fontStyle: "normal",
      fontWeight: "600",
      fontFamily: "var(--font-bn)",
      margin: "0",
      fontSize: "2.1875rem",
      color: "var(--h1-color, #281515)",
    },
    h2: {
      color: "var(--h2-color, #281515)",
      fontFamily: "var(--font-as)",
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
    },
    h3: {
      color: "var(--h3-color, #281515)",
      fontFamily: "var(--font-bn)",
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
  },
});

export default theme;
