import { Divider, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export default function SectionWithTitle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Stack gap={1}>
      <Stack gap={1}>
        <Typography variant="h3" ml={1}>
          {title}
        </Typography>
        <Divider flexItem/>
      </Stack>
      <Stack gap={1} paddingInline={2}>
        {children}
      </Stack>
    </Stack>
  );
}
