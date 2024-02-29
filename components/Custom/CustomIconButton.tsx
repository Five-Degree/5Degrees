import React, { forwardRef } from "react";
import { IconButton, IconButtonProps, styled } from "@mui/material";

type Props = {
  children: React.ReactNode;
  kind?: "shadow" | "plain" | "highlight";
} & IconButtonProps;

const CustomIconButton = forwardRef<HTMLButtonElement, Props>(function (
  { children, kind, ...iconButtonProps },
  ref
) {
  const Highlight = styled(IconButton)({
    background: "var(--accent)",
    "& .MuiSvgIcon-root": { color: "var(--white)" },
    ":hover": { "& .MuiSvgIcon-root": { color: "var(--accent)" } },
    aspectRatio: "1 / 1",
  });
  const Shadow = styled(IconButton)({
    background: "var(--background)",
    color: "var(--primary-text)",
    boxShadow: "var(--shadow)",
    ":hover": {
      background: "var(--accent)",
      "& .MuiSvgIcon-root": {
        color: "var(--white)",
      },
    },
    aspectRatio: "1 / 1",
  });
  const Default = styled(IconButton)({
    "& .MuiSvgIcon-root": {
      color: "var(--primary-text)",
    },
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
      return (
        <Shadow ref={ref} {...iconButtonProps}>
          {children}
        </Shadow>
      );
    case "highlight":
      return (
        <Highlight ref={ref} {...iconButtonProps}>
          {children}
        </Highlight>
      );
    default:
      return (
        <IconButton
          {...iconButtonProps}
          sx={{
            "& .MuiSvgIcon-root": {
              color: "var(--primary-text)",
            },
            ":hover": {
              background: "var(--accent)",
              "& .MuiSvgIcon-root": {
                color: "var(--white)",
              },
            },
            ...iconButtonProps.sx,
          }}
        >
          {children}
        </IconButton>
      );
  }
});

export default CustomIconButton;
