import { useCart } from "@/contexts/CartContext";
import { useResponsive } from "@/contexts/ResponsiveContext";
import Product from "@/shared/interfaces/Products";
import { CheckRounded } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedProductCard({
  product,
  anime,
  handleActiveProduct,
}: {
  product: Product & { featuredImage: string };
  anime?: IAos;
  handleActiveProduct: (product: Product) => void;
}) {
  const { matchesXL } = useResponsive();
  const { cart, removeFromCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    // Check if the product is in the cart
    const isProductInCart = cart.findIndex((ci) => ci.id === product.id) !== -1;
    setAddedToCart(isProductInCart);
  }, [cart, product]);

  return (
    <Stack
      direction={"row"}
      borderRadius={"var(--border-radius)"}
      border={".0625rem solid var(--border-color)"}
      position={"relative"}
      minHeight={"8.875rem"}
      sx={{ aspectRatio: "0.8 / 0.5" }}
      ml={"15%"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      padding={1}
      marginBlock={1}
      {...anime}
    >
      <CldImage
        src={product.featuredImage}
        alt={product.name}
        // Responsive
        width={152}
        height={91}
        style={{
          position: "absolute",
          left: "-20%",
          bottom: "20%",
          rotate: "-25deg",
          filter: "drop-shadow(var(--shadow))",
          width: "50%",
          height: "auto",
        }}
      />
      <Stack
        // Responsive
        sx={{
          fontSize: { xxl: "1.8rem", xl: "1.3rem", lg: "1.2rem", md: "1rem" },
        }}
        width={"60%"}
      >
        <Tooltip title={product.name}>
          <Link href={`/product/${product.id}`}>
            <Typography variant="h3" noWrap>
              {product.name}
            </Typography>
          </Link>
        </Tooltip>
        <Typography variant="h1">${product.defaultPrice}</Typography>
        <Stack direction={"row"} gap={1}>
          <Typography variant="body2" textTransform={"uppercase"}>
            {product.variants.length ?? 5}{" "}
            <span style={{ fontWeight: "lighter" }}>Variants</span>
          </Typography>
          <Typography variant="body2" textTransform={"uppercase"}>
            {product.colors?.length ?? 1}{" "}
            <span style={{ fontWeight: "lighter" }}>Colors</span>
          </Typography>
        </Stack>
      </Stack>
      <ButtonBase
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          borderTop: "1px solid var(--border-color)",
          borderLeft: "1px solid var(--border-color)",
          borderRadius: "60px 0 0 0",
          padding: "1em 0.5em 0.5em 1em",
          background: "none",
        }}
        aria-label="button"
        component={"button"}
        onClick={() => !addedToCart && handleActiveProduct(product)}
      >
        {addedToCart ? (
          <Tooltip title={"In cart"}>
            <CheckRounded
              sx={{
                // Responsive
                fontSize: { xl: "2em", md: "1.5em" },
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title={"Add to cart"}>
            <AddRoundedIcon
              sx={{
                // Responsive
                fontSize: { xl: "2em", md: "1.5em" },
              }}
            />
          </Tooltip>
        )}
      </ButtonBase>
    </Stack>
  );
}
