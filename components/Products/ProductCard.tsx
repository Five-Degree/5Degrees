import CustomIconButton from "@/components/Custom/CustomIconButton";
import ImageModal from "@/components/Products/ImageModal";
import { useResponsive } from "@/contexts/ResponsiveContext";
import capitalize from "@/shared/functions/capitalize";
import Product from "@/shared/interfaces/Products";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useRef, useState } from "react";
import AddToCartModal from "./AddToCartModal";
import { useCart } from "@/contexts/CartContext";
export default function ProductCard({
  product,
  ...anime
}: {
  product: Product;
} & IAos) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const handleImageClose = () => {
    setShowImageModal(false);
  };

  const handleAddToCartClose = () => {
    setShowAddToCartModal(false);
  };
  useEffect(() => {
    // Check if the product is in the cart
    const isProductInCart = cart.findIndex((ci) => ci.id === product.id) !== -1;
    setAddedToCart(isProductInCart);
  }, [cart, product]);
  const { matchesXL, matchesLG } = useResponsive();
  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "max-content",
          height: "fit-content",
          fontSize: { xl: "1.5rem", md: "0.8rem" },
        }}
        {...anime}
        ref={productRef}
      >
        <CldImage
          // Responsive
          width={matchesXL ? 192 * 1.6 : matchesLG ? 192 * 1.2 : 192}
          height={matchesXL ? 123 * 1.6 : matchesLG ? 123 * 1.2 : 123}
          src={product.mainImage}
          alt={product.name}
          onClick={() => setShowImageModal(true)}
          style={{ cursor: "pointer" }}
        />
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
            fontSize: "0.8em",
          }}
        />
        <CardActionArea>
          <CardContent
            // Responsive
            sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
          >
            <Typography
              variant="h3"
              textOverflow={"ellipsis"}
              width={"8.75em"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              {product.name}
            </Typography>
            <Typography variant="h1">${product.defaultPrice}</Typography>
            <Typography variant="body2" textTransform={"uppercase"}>
              {product.variants.length ?? 5}{" "}
              <span style={{ fontWeight: "lighter" }}>Variants</span>
            </Typography>
            <Typography variant="body2" textTransform={"uppercase"}>
              {product.colors?.length ?? 1}{" "}
              <span style={{ fontWeight: "lighter" }}>Colors</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        {addedToCart ? (
          <Typography
            sx={{ position: "absolute", bottom: "5%", right: "5%" }}
            color={"var(--accent)"}
          >
            Added to Cart
          </Typography>
        ) : // "check"
        product.availability == "available" ? (
          <CustomIconButton
            sx={{ position: "absolute", bottom: "5%", right: "5%" }}
            onClick={() => setShowAddToCartModal(true)}
          >
            <Tooltip title={"Add to Cart"}>
              <AddShoppingCartRoundedIcon />
            </Tooltip>
          </CustomIconButton>
        ) : (
          ""
        )}
      </Card>
      {showImageModal && (
        <ImageModal
          product={product}
          showImageModal={showImageModal}
          handleClose={handleImageClose}
        />
      )}
      {showAddToCartModal && (
        <AddToCartModal
          openAddToCart={showAddToCartModal}
          product={product}
          productRef={productRef}
          handleAddToCartClose={handleAddToCartClose}
        />
      )}
    </>
  );
}
