import CustomIconButton from "@/components/Custom/CustomIconButton";
import { useCart } from "@/contexts/CartContext";
import capitalize from "@/shared/functions/capitalize";
import useAddToCartModal from "@/shared/hooks/useAddToCartModal";
import Product from "@/shared/interfaces/Products";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PriceComponent from "../Custom/PriceComponent";
import { CheckRounded } from "@mui/icons-material";

export default function ProductCard({
  product,
  ...anime
}: {
  product: Product;
} & IAos) {
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);
  const { cart } = useCart();
  const { showAddToCartModal, addToCartModal, handleAddToCartOpen } =
    useAddToCartModal({ product });

  useEffect(() => {
    // Check if the product is in the cart
    const isProductInCart = cart.findIndex((ci) => ci.id === product.id) !== -1;
    setAddedToCart(isProductInCart);
  }, [cart, product]);
  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "100%",
        }}
        {...anime}
      >
        <Chip
          label={capitalize(product.availability)}
          sx={{
            position: "absolute",
            top: "5%",
            right: "5%",
            color:
              product.availability == "available"
                ? "var(--success)"
                : "var(--error)",
            fontSize: "var(--body2)",
            zIndex: 2,
          }}
        />
        <CardActionArea onClick={() => router.push(`product/${product.id}`)}>
          <Stack width={"100%"} height={"11.125rem"} overflow={"hidden"}>
            <CldImage
              // Responsive
              width={192}
              height={123}
              src={product.mainImage}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Stack>
          <CardContent
          // Responsive
          >
            <Typography variant="h3" width={"20ch"} noWrap>
              {product.name}
            </Typography>
            <PriceComponent
              price={product.defaultPrice}
              discount={product.discount}
            />
            <Typography variant="body2" textTransform={"uppercase"}>
              {product.variants.length ?? 5}{" "}
              <span style={{ fontWeight: "lighter" }}>Variants</span>
            </Typography>
            <Typography variant="body2" textTransform={"uppercase"}>
              {product.colors?.length == 0 ? 1 : product.colors.length}{" "}
              <span style={{ fontWeight: "lighter" }}>Colors</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack
          direction={"row"}
          sx={{ position: "absolute", bottom: "5%", right: "5%" }}
          alignItems={"center"}
        >
          {product.availability == "available" ? (
            <CustomIconButton onClick={handleAddToCartOpen}>
              <Tooltip title={"Add to Cart"}>
                {addedToCart ? (
                  <CheckRounded />
                ) : (
                  <AddShoppingCartRoundedIcon />
                )}
              </Tooltip>
            </CustomIconButton>
          ) : (
            ""
          )}
        </Stack>
      </Card>
      {showAddToCartModal && addToCartModal}
    </>
  );
}
