import { useCart } from "@/contexts/CartContext";
import Product from "@/shared/interfaces/Products";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Button,
  Card,
  CardContent,
  Modal,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import QuantityInput from "../Custom/CustomQuantityInput";
export default function AddToCartPopover({
  product,
  openAddToCart,
  productRef,
  handleAddToCartClose,
}: {
  product: Product;
  openAddToCart: boolean;
  productRef: React.RefObject<HTMLDivElement>;
  handleAddToCartClose: () => void;
}) {
  const defaultVariant = "normal";
  const defaultColor =
    (product.colors[0] as string) || (product.colors as string);

  const { addToCart } = useCart();
  const [formValues, setFormValues] = useState({
    variant: defaultVariant,
    quantity: 1,
    color: defaultColor,
    unitPrice: product.defaultPrice,
  });

  function handleVariantChange(
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) {
    setFormValues({
      ...formValues,
      variant: value as string,
      unitPrice:
        product.variants.find((v) => v.name == value)?.price ??
        product.defaultPrice,
    });
  }
  function handleColorChange(
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) {
    setFormValues({ ...formValues, color: value as string });
  }
  function handleQuantityChange(
    event: React.SyntheticEvent,
    value: number | undefined
  ) {
    event.preventDefault();
    setFormValues({ ...formValues, quantity: value ?? 0 });
  }
  const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
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
      unitPrice: formValues.unitPrice,
      name: product.name,
      mainImage: product.mainImage,
    });
    handleAddToCartClose();
  }
  return (
    <Modal
      disablePortal
      // disableEnforceFocus
      // disableAutoFocus
      open={openAddToCart}
      aria-labelledby={product.name}
      aria-describedby={product.name}
      onClose={handleAddToCartClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      container={() => productRef.current!}
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
          <Typography variant="h3">Add to cart</Typography>
          <SectionWrapper>
            <Typography variant="body2" width={"100%"}>
              Select Variant:
            </Typography>
            <ToggleButtonGroup
              value={formValues.variant}
              exclusive
              onChange={handleVariantChange}
              id="variant"
              aria-label="variants"
            >
              {product.variants.map((variant) => (
                <ToggleButton
                  key={variant.name}
                  value={variant.name}
                  aria-label={variant.name}
                >
                  {variant.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </SectionWrapper>
          <SectionWrapper>
            <Typography variant="body2" width={"100%"}>
              Select Color:
            </Typography>
            <ToggleButtonGroup
              value={formValues.color}
              exclusive
              id="color"
              onChange={handleColorChange}
              aria-label="color"
            >
              {typeof product.colors != "string" ? (
                product.colors.map((color) => (
                  <ToggleButton
                    key={color}
                    value={color}
                    aria-label={color}
                    sx={{ border: "none", paddingBlock: "0.5em" }}
                  >
                    <CircleIcon
                      sx={{
                        color: color,
                        border: "1px solid var(--border-color)",
                        borderRadius: "50%",
                      }}
                    />
                  </ToggleButton>
                ))
              ) : (
                <Typography>{product.colors}</Typography>
              )}
            </ToggleButtonGroup>
          </SectionWrapper>
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
