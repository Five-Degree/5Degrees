import { MouseEvent, useState } from "react";

export default function useAnchoredDisclosure() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleAnchorClick(e: MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleAnchorRemoval() {
    setAnchorEl(null);
  }
  return { anchorEl, open, handleAnchorClick, handleAnchorRemoval };
}
