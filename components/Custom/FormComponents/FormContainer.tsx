import { Stack } from "@mui/material";
import React from "react";
export default function FormContainer({
  onSubmit,
  children,
  sx,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  sx?: React.CSSProperties;
}) {
  return (
    <Stack
      component={"form"}
      onSubmit={onSubmit}
      sx={{
        gap: "1.25rem",
        alignItems: "center",
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
}
