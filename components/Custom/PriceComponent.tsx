import { Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  price: number;
  salePrice?: number;
}
export default function PriceComponent({ price, salePrice }: Props) {
  if (salePrice)
    return (
      <Stack direction={"row"} gap={1} alignItems={"baseline"}>
        <Typography variant="h1" color={"var(--accent)"}>
          ${salePrice}
        </Typography>
        <Typography
          variant="h3"
          fontFamily={"var(--font-bn)"}
          color={"var(--accent)"}
        >
          -{(((price - salePrice) / price) * 100).toFixed(0)}%
        </Typography>
        <Typography
          sx={{ textDecoration: "line-through" }}
          color={"var(--gray)"}
          variant="h3"
          fontFamily={"var(--font-bn)"}
        >
          ${price}
        </Typography>
      </Stack>
    );
  return <Typography variant="h1">${price}</Typography>;
}
