"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, useContext } from "react";

const ResponsiveContext = createContext<any>({});
export const useResponsive = (): IResponsiveContext =>
  useContext(ResponsiveContext);
export default function ResponsiveContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.up("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesXL = useMediaQuery(theme.breakpoints.up("xl"));
  const matchesXXL = useMediaQuery(theme.breakpoints.up("xxl"));
  return (
    <ResponsiveContext.Provider
      value={{
        matchesXS,
        matchesSM,
        matchesMD,
        matchesLG,
        matchesXL,
        matchesXXL,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
interface IResponsiveContext {
  matchesXS: boolean;
  matchesSM: boolean;
  matchesMD: boolean;
  matchesLG: boolean;
  matchesXL: boolean;
  matchesXXL: boolean;
}
