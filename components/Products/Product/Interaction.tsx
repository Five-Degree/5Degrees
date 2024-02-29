import QuantityInput from "@/components/Custom/CustomQuantityInput";
import { useCart } from "@/contexts/CartContext";
import useAddToCartForm from "@/shared/hooks/useAddToCartForm";
import Product from "@/shared/interfaces/Products";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import { Button, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColorSelector from "@/components/Products/Selectors/ColorSelector";
import VariantSelector from "@/components/Products/Selectors/VariantSelector";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SizeSelector from "../Selectors/SizeSelector";
import PriceComponent from "@/components/Custom/PriceComponent";

export default function ProductInteraction({ product }: { product: Product }) {
  const { addToCart, getFromCart, removeFromCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const prodFromCart = getFromCart(product.id);
  const {
    formValues,
    handleVariantChange,
    handleColorChange,
    handleQuantityChange,
    handleSizeChange,
  } = useAddToCartForm({
    product,
    defaultColor: prodFromCart?.selectedColor,
    defaultVariant: prodFromCart?.selectedVariant,
    defaultQuantity: prodFromCart?.quantity,
    defaultUnitPrice: prodFromCart?.unitPrice,
  });
  const rating = product.reviews
    ? product.reviews?.reduce((acc, cur) => acc + cur.rating, 0) /
      product.reviews?.length
    : 0;
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
        <Typography variant="h1" fontSize={"1.9em"} width={"8.75em"}>
          {product.name}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Rating
            name="product-rating"
            value={rating}
            size="small"
            readOnly
            precision={0.5}
          />
          <Typography>{product.reviews?.length ?? 0} Reviews</Typography>
        </Stack>
      </Stack>
      <PriceComponent
        price={formValues.unitPrice}
        salePrice={product.salePrice}
      />
      <Stack gap={1}>
        <Typography variant="body2">Variants:</Typography>
        <VariantSelector
          selectedVariant={formValues.variant}
          handleVariantChange={handleVariantChange}
          product={product}
        />
      </Stack>
      <Stack gap={1}>
        <Typography variant="body2">Colors:</Typography>
        <ColorSelector
          selectedColor={formValues.color}
          handleColorChange={handleColorChange}
          product={product}
        />
      </Stack>
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
          handleChange={handleQuantityChange}
          value={formValues.quantity}
        />
      </Stack>
      {prodFromCart && (
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography>Item added to cart</Typography>
          <Button
            onClick={() => removeFromCart(prodFromCart)}
            endIcon={<DeleteOutlineRoundedIcon />}
          >
            Remove
          </Button>
        </Stack>
      )}
      <Stack>
        <Button
          variant={addedToCart ? "text" : "contained"}
          endIcon={
            addedToCart ? (
              <CheckRoundedIcon />
            ) : prodFromCart ? (
              <SettingsSuggestRoundedIcon />
            ) : (
              <AddShoppingCartRoundedIcon />
            )
          }
          type="submit"
          disabled={addedToCart}
        >
          {addedToCart
            ? "Item added!"
            : prodFromCart
            ? "Modify cart item"
            : "Add to cart"}
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
