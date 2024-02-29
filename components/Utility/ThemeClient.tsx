"use client";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useDarkTheme } from "@/shared/hooks/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import React from "react";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeContext();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
