import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Stack
      direction={"row"}
      justifyContent="center"
      alignItems={"flex-start"}
      width="100%"
      className="auth-layout"
    >
      <Stack
        width={"34rem"}
        marginInline={"auto"}
        alignItems={"flex-start"}
        gap={"2.5rem"}
        paddingBlock={"2rem 3rem"}
        paddingInline={{ md: "3rem", xs: "1.5rem" }}
        marginBlock={"auto"}
        sx={{
          borderRadius: "var(--border-radius)",
        }}
        border={"1px solid var(--border-color)"}
      >
        {children}
      </Stack>
    </Stack>
  );
}
