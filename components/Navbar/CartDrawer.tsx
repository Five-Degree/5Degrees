import { Stack, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";

export default function CartDrawer({
  drawerState,
  toggleDrawer,
}: {
  drawerState: boolean;
  toggleDrawer: (
    state: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}) {
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawerState}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Stack
        minWidth={{ lg: "25rem", md: "15.625rem" }}
        paddingInline={3}
        paddingBlock={3}
      >
        <Typography variant="h1">Cart</Typography>
      </Stack>
    </SwipeableDrawer>
  );
}
