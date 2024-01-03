"use client";
import React from "react";
import Logo from "@/public/Logos/Logo.svg";
import Image from "next/image";
import { IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { CartIcon, SearchIcon } from "../Utility/CustomIcons";
interface NavLinks {
  title: string;
  href: Url;
}
function NavLinks({ navLinks }: { navLinks: NavLinks[] }) {
  return (
    <Stack direction={"row"} gap={"2.375rem"}>
      {navLinks.map((link) => (
        <Typography
          key={link.title}
          fontSize={"1.5rem"}
          fontWeight={"400"}
          textTransform={"uppercase"}
        >
          <Link href={link.href}>{link.title}</Link>
        </Typography>
      ))}
    </Stack>
  );
}

function UserControls() {
  return (
    <Stack direction={"row"} gap={3}>
      <IconButton aria-label="search" sx={{ background: "var(--accent)" }}>
        <SearchIcon
          sx={{ color: "var(--white)", ":hover": { color: "var(--accent)" } }}
        />
      </IconButton>
      <IconButton aria-label="search">
        <CartIcon />
      </IconButton>
    </Stack>
  );
}

export default function Navbar() {
  const navLinks: NavLinks[] = [
    { title: "Mens", href: "/" },
    { title: "Womens", href: "/" },
    { title: "Kids", href: "/" },
    { title: "Custom", href: "/" },
  ];
  return (
    <Stack
      direction={"row"}
      component={"nav"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingInline={10}
      width={"100%"}
      height={"5.3125rem"}
    >
      <Image
        src={Logo}
        alt="5 Degrees"
        style={{ maxWidth: "26px", height: "auto" }}
      />
      <NavLinks navLinks={navLinks} />
      <UserControls />
    </Stack>
  );
}
