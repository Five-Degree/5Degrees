import { NavLinks } from "@/shared/interfaces/Links";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { usePathname } from "next/navigation";
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
      anchorEl={accountOpenAnchor}
      id={id}
      open={accountOpen}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
