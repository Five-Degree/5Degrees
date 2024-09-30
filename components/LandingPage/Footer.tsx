"use client";
import PaymentMethods from "@/public/Images/PaymentMethods.svg";
import Logo from "@/public/Logos/Logo.svg";
import { PhoneRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const FooterSection = ({
  children,
  title,
  ...anime
}: {
  children: React.ReactNode;
  title: string;
} & IAos) => {
  return (
    <Stack
      maxWidth={"21.875rem"}
      alignItems={"center"}
      gap={2}
      {...anime}
      paddingInline={2}
    >
      <Typography
        variant="h2"
        textTransform={"uppercase"}
        color={"var(--gray)"}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
export default function Footer() {
  const iconStyles = {
    ":hover": {
      color: "var(--accent)",
    },
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-around"}
      paddingBlock={5}
      borderTop={"1px solid var(--border-color)"}
      overflow={"hidden"}
      flexWrap={"wrap"}
      paddingInline={3}
      gap={2}
    >
      <Image src={Logo} alt="5 Degrees" />
      <Stack alignItems={"center"} gap={1}>
        <Typography variant="h2">
          <Link
            href={"https://www.reddit.com/r/5degreesstore/ "}
            target="_blank"
          >
            Customer Reviews
          </Link>
        </Typography>
        <Typography variant="h2">
          <Link href={"/aboutUs"}>About Us</Link>
        </Typography>
        {/* <Typography variant="h2">
          <Link href={"/"}>Support</Link>
        </Typography> */}
      </Stack>
      <FooterSection title="What we do">
        <Typography fontSize={"1.125em"} textAlign={"center"}>
          Enter into our spacious arena of endless decision making. you dont
          have any obligation to leave but only at your expense. We welcome you
          to the array of sneaker picking with unorthodox colors and unicorn
          sizes that touch the interiors of your chambers, come have a kick from
          our virtual and into your physical
        </Typography>
      </FooterSection>
      <Button
        href="https://beacons.ai/5degrees"
        variant="contained"
        sx={{ alignSelf: "flex-start" }}
        target="_blank"
        startIcon={<PhoneRounded />}
      >
        Contact Us
      </Button>
      <FooterSection title="We Accept">
        <Image src={PaymentMethods} alt="Payment Methods" />
      </FooterSection>
    </Stack>
  );
}
