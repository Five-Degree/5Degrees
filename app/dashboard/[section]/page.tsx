"use client";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { section } = useParams();
  return <Typography>dashboard-{section}</Typography>;
}
