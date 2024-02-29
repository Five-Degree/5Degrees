"use client";
import { Button, Grid, Input, Stack, Typography } from "@mui/material";
import React from "react";

export default function ContactForm() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      gap={5}
      component={"section"}
      flexWrap={"wrap"}
      id="ContactForm"
      //   Responsive
      sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
    >
      <Typography
        variant="h1"
        textAlign={{ xs: "center", sm: "right" }}
        data-aos="fade-left"
      >
        For <span style={{ color: "var(--accent)" }}>Custom Orders</span>
        <br />
        Feel Free To Send Us a Message!
      </Typography>
      <Stack gap={2} data-aos="fade-right" alignItems={"center"}>
        <Stack direction={"row"} gap={2}>
          <Input
            type="text"
            disableUnderline
            placeholder="Name"
            sx={{ background: "var(--white)" }}
          />
          <Input
            type="text"
            disableUnderline
            placeholder="Email"
            sx={{ background: "var(--white)" }}
          />
        </Stack>
        <Input
          type="text"
          disableUnderline
          placeholder="Message"
          multiline
          maxRows={5}
          sx={{
            background: "var(--white)",
            minHeight: "9.375rem",
            alignItems: "flex-start",
            pt: 1,
          }}
        />
        <Button>Send</Button>
      </Stack>
    </Stack>
  );
}
