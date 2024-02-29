import { useThemeContext } from "@/contexts/ThemeContext";
import { NavLinks } from "@/shared/interfaces/Links";
import { DarkModeRounded } from "@mui/icons-material";
import {
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";
import CustomSwitch from "../Custom/CustomSwitch";
interface NavMenu {
  id: string;
  accountOpenAnchor: null | HTMLElement;
  accountOpen: boolean;
  handleClose: (param: any) => void;
  items: Array<NavLinks>;
}
export default function UserMenu({
  id,
  accountOpenAnchor,
  accountOpen,
  handleClose,
  items,
}: NavMenu) {
  const pathname = usePathname();

  return (
    <Menu
      disableScrollLock
      anchorEl={accountOpenAnchor}
      id={id}
      open={accountOpen}
      onClose={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      slotProps={{
        paper: {
          sx: {
            overflow: "visible",
            mt: 1.5,
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              borderTop: "1px solid var(--border-color)",
              borderLeft: "1px solid var(--border-color)",
              bgcolor: "var(--background)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      {items.map((menuItem: any) => {
        if (pathname !== menuItem.goto)
          return (
            <MenuItem onClick={menuItem.handler} key={menuItem.name}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              {menuItem.name}
            </MenuItem>
          );
      })}
    </Menu>
  );
}
