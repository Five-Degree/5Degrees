import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorHandlerProvider>
      <Stack
        direction={"row"}
        justifyContent="center"
        alignItems={"flex-start"}
        height="100vh"
        maxWidth="100%"
        position="relative"
        sx={{ overflowY: "scroll", background: "var(--graylighter)" }}
      >
        <Stack
          width={"34rem"}
          marginInline={"auto"}
          alignItems={"flex-start"}
          gap={"2.5rem"}
          paddingBlock={"3rem 4rem"}
          paddingInline={"3rem"}
          marginBlock={"auto"}
          sx={{
            background: "var(--white)",
            borderRadius: "var(--border-radius)",
          }}
        >
          {children}
        </Stack>
      </Stack>
    </ErrorHandlerProvider>
  );
}
