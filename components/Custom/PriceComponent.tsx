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
        <Typography
          maxWidth={"5ch"}
          variant="h1"
          color={"var(--accent)"}
          noWrap
        >
          ${salePrice}
        </Typography>
        <Typography
          sx={{ textDecoration: "line-through" }}
          color={"var(--gray)"}
          variant="h3"
          fontFamily={"var(--font-bn)"}
          maxWidth={"5ch"}
          noWrap
        >
          ${price}
        </Typography>
      </Stack>
    );
  return <Typography variant="h1">${price}</Typography>;
}
