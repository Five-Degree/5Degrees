import { useCart } from "@/contexts/CartContext";
import Product, {
  NonNullColors,
  VariantNames,
} from "@/shared/interfaces/Products";
import {
  Button,
  Card,
  CardContent,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QuantityInput from "../Custom/CustomQuantityInput";
import ColorSelector from "./Selectors/ColorSelector";
import VariantSelector from "./Selectors/VariantSelector";
import useAddToCartForm from "@/shared/hooks/useAddToCartForm";
import SizeSelector from "./Selectors/SizeSelector";
export interface AddToCartForm {
  variant: VariantNames;
  quantity: number;
  color: NonNullColors;
  unitPrice: number;
}
export default function AddToCartModal({
  product,
  openAddToCart,
  handleAddToCartClose,
}: {
  product: Product;
  openAddToCart: boolean;
  handleAddToCartClose: () => void;
}) {
  const { addToCart } = useCart();
  const {
    formValues,
    handleVariantChange,
    handleColorChange,
    handleQuantityChange,
    handleSizeChange,
  } = useAddToCartForm({ product });

  const PartWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Stack
        direction={"row"}
        mt={3}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
        sx={{
          // minWidth: "15.625rem",
          fontSize: { xxl: "1.5rem", xl: "1.3rem", md: "1rem" },
        }}
      >
        {children}
      </Stack>
    );
  };
  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    console.log("formValues", formValues);
    addToCart({
      id: product.id,
      quantity: formValues.quantity,
      selectedVariant: formValues.variant,
      selectedColor: formValues.color,
      selectedSize: formValues.size,
      unitPrice: formValues.unitPrice,
      name: product.name,
      mainImage: product.mainImage,
    });
    handleAddToCartClose();
  }
  return (
    <Modal
      disablePortal
      open={openAddToCart}
      aria-labelledby={product.name}
      aria-describedby={product.name}
      onClose={handleAddToCartClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      container={document.body}
    >
      <Card>
        <CardContent
          component={"form"}
          onSubmit={handleAddToCart}
          sx={{
            // minWidth: "15.625rem",
            fontSize: { xxl: "1.5rem", xl: "1.3rem", md: "1rem" },
          }}
        >
          <Typography variant="h1">Add to cart</Typography>
          <PartWrapper>
            <Typography variant="body2" width={"100%"}>
              Variants:
            </Typography>
            <VariantSelector
              selectedVariant={formValues.variant}
              handleVariantChange={handleVariantChange}
              product={product}
            />
          </PartWrapper>
          <PartWrapper>
            <Typography variant="body2" width={"100%"}>
              Colors:
            </Typography>
            <ColorSelector
              selectedColor={formValues.color}
              handleColorChange={handleColorChange}
              product={product}
            />
          </PartWrapper>
          <PartWrapper>
            <Typography variant="body2" width={"100%"}>
              Sizes:
            </Typography>
            <SizeSelector
              selectedSize={formValues.size}
              handleSizeChange={handleSizeChange}
              product={product}
            />
          </PartWrapper>
          <Stack alignItems={"flex-end"} mt={4}>
            <Typography>Unit Price</Typography>
            <Typography variant="h1">${formValues.unitPrice}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
            <QuantityInput
              handleChange={handleQuantityChange}
              value={formValues.quantity}
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  );
}
