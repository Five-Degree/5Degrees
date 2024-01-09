"use client";
import Logo from "@/public/Logos/Logo.svg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { Stack, Typography } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CustomIconButton from "../Custom/CustomIconButton";
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
    <Stack direction={"row"} gap={"2.375rem"} height={"100%"}>
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
              color={match ? "var(--accent)" : "var(--primary)"}
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
  return (
    <Stack direction={"row"} gap={3}>
      <CustomIconButton kind="highlight" aria-label="search">
        <SearchRoundedIcon />
      </CustomIconButton>
      <CustomIconButton aria-label="checkout">
        <ShoppingCartCheckoutRoundedIcon />
      </CustomIconButton>
    </Stack>
  );
}

export default function Navbar() {
  const navLinks = useMemo(
    () => [
      { title: "Mens", href: "/" },
      { title: "Womens", href: "/womens" },
      { title: "Kids", href: "/kids" },
      { title: "Custom", href: "/custom" },
    ],
    []
  );
  const [activeLink, setActiveLink] = useState(navLinks[0]);
  const pathname = usePathname();
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
      paddingInline={10}
      width={"100%"}
      height={"5.3125rem"}
      data-aos="fade-down"
    >
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="5 Degrees"
          style={{ maxWidth: "26px", height: "auto" }}
        />
      </Link>
      <NavLinks navLinks={navLinks} activeLink={activeLink} />
      <UserControls />
    </Stack>
  );
}
