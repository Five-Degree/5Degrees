"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import Logo from "@/public/Logos/Logo.svg";
import { homeNavHrefMap, homeNavLinks } from "@/shared/constants/Links";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import {
  Badge,
  ClickAwayListener,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CustomIconButton from "../Custom/CustomIconButton";
import CartDrawer from "./CartDrawer";
import UserMenuControls from "./UserMenuControls";
import NavbarSearch from "./NavbarSearch";
interface NavLink {
  title: string;
  href: Url;
}
function NavLinks({
  navLinks,
  activeLink,
}: {
  navLinks: NavLink[];
  activeLink: NavLink;
}) {
  return (
    <Stack
      direction={"row"}
      gap={"2.375rem"}
      height={"100%"}
      display={{ xs: "none", md: "flex" }}
    >
      {navLinks.map((link) => {
        const match = link.title == activeLink.title;
        return (
          <Stack
            key={link.title}
            borderTop={match ? "5px solid var(--accent)" : "none"}
            justifyContent={"center"}
            height={"100%"}
            // Responsive
            fontSize={{ xl: "2rem", lg: "1.5rem", md: "1rem" }}
          >
            <Typography
              fontSize={"0.8em"}
              fontWeight={match ? "600" : "400"}
              color={match ? "var(--accent)" : "var(--primary-text)"}
              textTransform={"uppercase"}
            >
              <Link href={link.href}>{link.title}</Link>
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

function UserControls() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { cart } = useCart();
  const { toggleColorMode, mode } = useThemeContext();

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer =
    (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(state);
    };
  function handleCheckoutAction() {
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/auth/login?redirectTo=/checkout");
    }
    setDrawerState(false);
  }
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      <CustomIconButton onClick={toggleColorMode}>
        {mode == "dark" ? <LightModeRounded /> : <DarkModeRounded />}
      </CustomIconButton>
      <NavbarSearch />

      {user && <UserMenuControls />}

      {pathname != "/checkout" && (
        <>
          <CustomIconButton aria-label="checkout" onClick={toggleDrawer(true)}>
            <Badge badgeContent={cart.length ?? 0} color="error">
              <ShoppingCartCheckoutRoundedIcon />
            </Badge>
          </CustomIconButton>
          {drawerState && (
            <CartDrawer
              drawerState={drawerState}
              toggleDrawer={toggleDrawer}
              handleCheckoutAction={handleCheckoutAction}
            />
          )}
        </>
      )}
    </Stack>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = useMemo(
    () => (homeNavHrefMap.includes(pathname) ? homeNavLinks : []),
    [pathname]
  );
  const [activeLink, setActiveLink] = useState({ title: "", href: "" });
  useEffect(() => {
    const currentLink = navLinks.find((l) => l.href == pathname);
    if (currentLink) setActiveLink(currentLink);
  }, [pathname, navLinks]);
  return (
    <Stack
      direction={"row"}
      component={"nav"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingInline={"3%"}
      width={"100%"}
      height={"8vh"}
      data-aos="fade-down"
      minHeight={"5.3125rem"}
      maxHeight={"6.25rem"}
    >
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="5 Degrees"
          style={{ maxWidth: "26px", height: "auto" }}
        />
      </Link>
      {/* <NavLinks navLinks={navLinks} activeLink={activeLink} /> */}
      <UserControls />
    </Stack>
  );
}
