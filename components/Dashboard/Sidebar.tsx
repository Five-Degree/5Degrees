"use client";
import { dashboardLinks } from "@/shared/constants/Links";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Stack borderRight={"1px solid var(--border-color)"} width={"25%"}>
      <List>
        {dashboardLinks.map((ds) => {
          return (
            <ListItem key={ds.path}>
              <ListItemButton
                sx={{
                  borderTopLeftRadius: "var(--border-radius)",
                  borderBottomLeftRadius: "var(--border-radius)",
                }}
                selected={pathname == ds.path}
                onClick={() => router.push(ds.path)}
              >
                <ListItemText>{ds.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
