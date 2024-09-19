import { useAuth } from "@/contexts/AuthContext";
import { NavLinks } from "@/shared/interfaces/Links";
import {
  Divider,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
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

  const { user } = useAuth();
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
      <Stack gap={1}>
        <Stack direction={"row"} paddingInline={2} paddingBlock={1} gap={2}>
          <UserAvatar avatar={user?.photoURL} name={user?.email} />
          <Stack flex={"1 0 auto"}>
            <Typography>{user?.displayName ?? user?.email}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Stack>
        </Stack>
        <Divider flexItem />
        <Stack>
          {items.map((menuItem: any) => {
            if (pathname !== menuItem.goto)
              return (
                <MenuItem onClick={menuItem.handler} key={menuItem.name}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  {menuItem.name}
                </MenuItem>
              );
          })}
        </Stack>
      </Stack>
    </Menu>
  );
}
