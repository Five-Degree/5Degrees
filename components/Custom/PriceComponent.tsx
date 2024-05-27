import { Stack, Typography } from "@mui/material";
import React from "react";
interface Props {
  price: number;
  discount?: number;
}
export default function PriceComponent({ price, discount }: Props) {
  if (discount)
    return (
      <Stack direction={"row"} gap={1} alignItems={"baseline"}>
        <Typography
          maxWidth={"7ch"}
          variant="h1"
          color={"var(--accent)"}
          noWrap
        >
          ${(price - (price * discount) / 100).toFixed(1)}
        </Typography>
        <Typography
          sx={{ textDecoration: "line-through" }}
          color={"var(--gray)"}
          variant="h3"
          fontFamily={"var(--font-bn)"}
          maxWidth={"7ch"}
          noWrap
        >
          ${price}
        </Typography>
      </Stack>
    );
  return <Typography variant="h1">${price}</Typography>;
}
