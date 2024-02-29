import { createTheme, PaletteMode, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import muiTheme from "../themes/theme";
export const useDarkTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    // Add class to the body element
    if (mode == "dark") document.body.classList.add("dark");

    // Clean up function
    return () => {
      // Remove the class when the component unmounts
      document.body.classList.remove("dark");
    };
  }, [mode]);
  const modifiedTheme = React.useMemo(
    () =>
      createTheme({
        ...muiTheme,
        palette: {
          ...muiTheme.palette,
          mode,
        },
      }),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
