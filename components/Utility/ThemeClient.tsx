"use client";
import muiTheme from "@/shared/themes/theme";
import { ThemeProvider } from "@mui/material";
import React from "react";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
