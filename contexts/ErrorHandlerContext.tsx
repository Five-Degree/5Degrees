import { Typography } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
const ErrorHandlerContext = createContext<any>({});
export const useErrorHandler = () => useContext(ErrorHandlerContext);
export const ErrorHandlerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleError = (err: any) => {
    if (err == null) return;
    setErrorMsg(err);
    return;
  };

  const errorAlert = <Typography color={"var(--error)"}>{errorMsg}</Typography>;
  return (
    <ErrorHandlerContext.Provider value={{ handleError, errorAlert }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};
