import { useCart } from "@/contexts/CartContext";
import useAddToCartForm from "@/shared/hooks/useAddToCartForm";
import Product, {
  NonNullColors,
  VariantNames,
} from "@/shared/interfaces/Products";
import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import QuantityInput from "../Custom/CustomQuantityInput";
import ProductImages from "./Product/ProductImages";
import ColorSelector from "./Selectors/ColorSelector";
import SizeSelector from "./Selectors/SizeSelector";
import VariantSelector from "./Selectors/VariantSelector";
import CustomIconButton from "../Custom/CustomIconButton";
import { AddShoppingCart, CloseRounded } from "@mui/icons-material";
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
        alignItems={"center"}
        gap={1}
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
      open={openAddToCart}
      aria-labelledby={product.name}
      aria-describedby={product.name}
      container={
        typeof window !== "undefined"
          ? window.document.getElementById("__next")
          : undefined
      }
      // onClose={handleAddToCartClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(10px)",
          },
        },
      }}
      sx={{
        display: "flex",
        // alignItems: "center",
        overflow: "auto",
        height: "95vh",
        marginBlock: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
      // container={document.body}
      // disableEnforceFocus={false}
      // disableScrollLock={false}
    >
      <Stack
        component={"form"}
        bgcolor={"var(--background)"}
        justifyContent={"center"}
        marginBlock={"auto"}
        paddingTop={8}
        paddingBottom={4}
        paddingInline={2}
        borderRadius={"var(--border-radius)"}
        onSubmit={handleAddToCart}
        overflow={"hidden auto"}
        gap={2}
        position={"relative"}
      >
        {/* <Typography variant="h1" marginInline={3}>
          Add to cart
        </Typography> */}
        <CustomIconButton
          sx={{
            position: "absolute",
            top: "5%",
            right: "8%",
            translate: "100% 0%",
            zIndex: 99,
          }}
          onClick={handleAddToCartClose}
        >
          <CloseRounded sx={{ color: "var(--body1-color)" }} />
        </CustomIconButton>
        <Stack width={{ md: "80%", xs: "90%" }} marginInline={"auto"}>
          <ProductImages product={product} />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={{ md: "flex-end", xs: "flex-start" }}
          paddingInline={3}
        >
          <PartWrapper>
            <Typography width={"100%"}>Variants:</Typography>
            <VariantSelector
              selectedVariant={formValues.variant}
              handleVariantChange={handleVariantChange}
              product={product}
            />
          </PartWrapper>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography>Unit Price:</Typography>
            <Typography variant="h1">${formValues.unitPrice}</Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={{ md: "flex-end", xs: "center" }}
          paddingInline={3}
        >
          <Stack direction={"row"} gap={2}>
            {product.colors.length != 0 && (
              <PartWrapper>
                <Typography width={"100%"}>Colors:</Typography>
                <ColorSelector
                  selectedColor={formValues.color}
                  handleColorChange={handleColorChange}
                  product={product}
                />
              </PartWrapper>
            )}
            <PartWrapper>
              <Typography>
                Sizes {"("}EU{")"}:
              </Typography>
              <SizeSelector
                selectedSize={formValues.size}
                handleSizeChange={handleSizeChange}
                product={product}
              />
            </PartWrapper>
          </Stack>
          <Stack direction={{ md: "row", xs: "column" }} gap={1}>
            <QuantityInput
              value={formValues.quantity}
              onChange={handleQuantityChange}
              aria-label="Quantity Input"
              min={1}
              max={99}
            />
            <Button
              variant="contained"
              type="submit"
              endIcon={<AddShoppingCart />}
            >
              Add To Cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}
