import { IconButton, IconButtonProps, styled } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  kind?: "shadow" | "plain" | "highlight";
} & IconButtonProps;
export default function CustomIconButton({
  children,
  kind,
  ...iconButtonProps
}: Props) {
  const Highlight = styled(IconButton)({
    background: "var(--accent)",
    "& .MuiSvgIcon-root": { color: "var(--white)" },
    ":hover": { "& .MuiSvgIcon-root": { color: "var(--accent)" } },
    aspectRatio: "1 / 1",
  });
  const Shadow = styled(IconButton)({
    background: "var(--white)",
    boxShadow: "var(--shadow)",
    ":hover": {
      background: "var(--accent)",
      "& .MuiSvgIcon-root": {
        color: "var(--white)",
      },
    },
    aspectRatio: "1 / 1",
  });
  switch (kind) {
    case "shadow":
      return <Shadow {...iconButtonProps}>{children}</Shadow>;
      break;
    case "highlight":
      return <Highlight {...iconButtonProps}>{children}</Highlight>;
      break;
    default:
      return <IconButton {...iconButtonProps}>{children}</IconButton>;
      break;
  }
}