"use client";
import PaymentMethods from "@/public/Images/PaymentMethods.svg";
import Logo from "@/public/Logos/Logo.svg";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomIconButton from "../Custom/CustomIconButton";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "../Utility/CustomIcons";
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
      maxWidth={"13.25rem"}
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
      <Image src={Logo} alt="5 Degrees" data-aos="zoom-in" />
      <Stack
        alignItems={"center"}
        gap={1}
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <Typography variant="h2">
          <Link href={"/"}>Customers</Link>
        </Typography>
        <Typography variant="h2">
          <Link href={"/"}>About Us</Link>
        </Typography>
        <Typography variant="h2">
          <Link href={"/"}>Support</Link>
        </Typography>
      </Stack>
      <FooterSection title="What we do" data-aos="fade-up" data-aos-delay={300}>
        <Typography fontSize={"1.125em"} textAlign={"center"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima
          officiis hic voluptatum in suscipit autem eligendi.
        </Typography>
      </FooterSection>
      <FooterSection title="Contact Us" data-aos="fade-up" data-aos-delay={400}>
        <Typography fontSize={"1.125em"} textAlign={"center"}>
          7711 Old Mountain Towers,
          <br />
          Nightmute, Ohio,
          <br />
          43498-4451
          <br />
          {"("}567{")"} 555-6283
        </Typography>
        <Stack direction={"row"}>
          <CustomIconButton>
            <FacebookIcon />
          </CustomIconButton>
          <CustomIconButton>
            <LinkedInIcon />
          </CustomIconButton>
          <CustomIconButton>
            <InstagramIcon />
          </CustomIconButton>
        </Stack>
      </FooterSection>
      <FooterSection title="We Accept" data-aos="fade-up" data-aos-delay={500}>
        <Image src={PaymentMethods} alt="Payment Methods" />
      </FooterSection>
    </Stack>
  );
}
