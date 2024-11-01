import { ShoeSize } from "@/shared/constants/shoeSizes";
import Product from "@/shared/interfaces/Products";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React from "react";

export default function SizeSelector({
  selectedSize,
  handleSizeChange,
  product,
}: {
  selectedSize: ShoeSize["EU"];
  handleSizeChange: (event: SelectChangeEvent<ShoeSize["EU"]>) => void;
  product: Product;
}) {
  const formControlFactory = (
    name: "US" | "UK" | "EU" | "Length",
    children: React.ReactNode
  ) => (
    <FormControl sx={{ minWidth: 70 }}>
      {/* <InputLabel id={`${name}-select-label`}>{name}</InputLabel> */}
      {children}
    </FormControl>
  );

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      {/* {formControlFactory(
        "US",
        <Select
          labelId={`us-select-label`}
          id={`us-select`}
          value={selectedSize}
          autoWidth
          label={"US"}
          onChange={handleSizeChange}
        >
          {product.sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      )} */}

      {/* {formControlFactory(
        "UK",
        <Select
          labelId={`uk-select-label`}
          id={`uk-select`}
          value={selectedSize}
          autoWidth
          label={"UK"}
          onChange={handleSizeChange}
        >
          {product.sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {getUKSize(s)}
            </MenuItem>
          ))}
        </Select>
      )} */}

      {formControlFactory(
        "EU",
        <Select
          labelId={`eu-select-label`}
          id={`eu-select`}
          value={selectedSize}
          autoWidth
          label={"EU"}
          onChange={handleSizeChange}
          variant="standard"
          disableUnderline
        >
          {product.sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      )}
      {/* {formControlFactory(
        "Length",
        <Select
          labelId={`length-select-label`}
          id={`length-select`}
          value={selectedSize}
          autoWidth
          label={"Length"}
          onChange={handleSizeChange}
        >
          {product.sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {getLengthSize(s)}cm
            </MenuItem>
          ))}
        </Select>
      )} */}
    </Stack>
  );
}
