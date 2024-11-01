import { Stack, StackProps } from "@mui/material";
import React, { HTMLProps } from "react";

export type FormContainerProps = {
  sx?: React.CSSProperties;
} & StackProps<"form">;

export default function FormContainer({
  children,
  ...props
}: FormContainerProps) {
  return (
    <Stack
      component={"form"}
      sx={{
        gap: "1.25rem",
        alignItems: "center",
        width: "100%",
        ...props.sx,
      }}
    >
      {children}
    </Stack>
  );
}
