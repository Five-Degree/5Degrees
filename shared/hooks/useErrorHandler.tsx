"use client";
import { Typography } from "@mui/material";
import { ReactNode, useState } from "react";

export default function useErrorHandler() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleError = (err: any) => {
    if (err == null) return;
    setErrorMsg(err);
    return;
  };

  const errorAlert: ReactNode = (
    <Typography color={"var(--error)"}>{errorMsg}</Typography>
  );
  return { errorAlert, errorMsg, handleError };
}
