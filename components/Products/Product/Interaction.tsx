import QuantityInput from "@/components/Custom/CustomQuantityInput";
import PriceComponent from "@/components/Custom/PriceComponent";
import ColorSelector from "@/components/Products/Selectors/ColorSelector";
import VariantSelector from "@/components/Products/Selectors/VariantSelector";
import { useCart } from "@/contexts/CartContext";
import useAddToCartForm from "@/shared/hooks/useAddToCartForm";
import Product from "@/shared/interfaces/Products";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SizeSelector from "../Selectors/SizeSelector";

export default function ProductInteraction({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const {
    formValues,
    handleVariantChange,
    handleQuantityChange,
    handleSizeChange,
    handleColorChange,
  } = useAddToCartForm({
    product,
  });

  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
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
    setAddedToCart(true);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (addedToCart) {
      timer = setTimeout(() => {
        setAddedToCart(false);
      }, 6000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [addedToCart]);
  return (
    <Stack
      gap={2}
      sx={{
        fontSize: { xxl: "1.5rem", xl: "1.3rem", md: "1rem" },
      }}
      paddingInline={3}
      component={"form"}
      onSubmit={handleAddToCart}
    >
      <Stack>
        <Typography variant="h1" fontSize={"1.9em"} width={"100%"}>
          {product.name}
        </Typography>
      </Stack>
      <PriceComponent
        price={formValues.unitPrice}
        discount={product.discount}
      />
      <Stack gap={1}>
        <Typography variant="body2">Variants:</Typography>
        <VariantSelector
          selectedVariant={formValues.variant}
          handleVariantChange={handleVariantChange}
          product={product}
        />
      </Stack>
      {product.colors && product.colors.length != 0 && (
        <Stack gap={1}>
          <Typography variant="body2">Colors:</Typography>
          <ColorSelector
            selectedColor={formValues.color}
            handleColorChange={handleColorChange}
            product={product}
          />
        </Stack>
      )}
      <Stack gap={1}>
        <Typography variant="body2">Sizes:</Typography>
        <SizeSelector
          selectedSize={formValues.size}
          handleSizeChange={handleSizeChange}
          product={product}
        />
      </Stack>
      <Stack alignItems={"flex-start"} gap={1}>
        <Typography variant="body2">Quantity:</Typography>
        <QuantityInput
          value={formValues.quantity}
          onChange={handleQuantityChange}
          aria-label="Quantity Input"
          min={1}
          max={99}
        />
      </Stack>
      <Stack>
        <Button
          variant={addedToCart ? "text" : "contained"}
          endIcon={
            addedToCart ? <CheckRoundedIcon /> : <AddShoppingCartRoundedIcon />
          }
          type="submit"
          disabled={addedToCart}
        >
          {addedToCart ? "Item added!" : "Add to cart"}
        </Button>
      </Stack>
      <Stack gap={1}>
        <Stack direction={"row"}>
          <Typography>Ships Worldwide</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
