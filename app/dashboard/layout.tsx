import Sidebar from "@/components/Dashboard/Sidebar";
import { Stack } from "@mui/material";
import React, { ReactNode } from "react";

export default function layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <Stack
      direction={"row"}
      paddingInline={"3%"}
      height={"85vh"}
      marginInline={"auto"}
      alignItems={"stretch"}
    >
      {/* <Sidebar /> */}
      <Stack width={"100%"}>{children}</Stack>
    </Stack>
  );
}
