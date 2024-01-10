import CustomIconButton from "@/components/Custom/CustomIconButton";
import { useResponsive } from "@/contexts/responsiveContext";
import capitalize from "@/shared/functions/capitalize";
import Product from "@/shared/interfaces/product";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
  Typography
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import ImageModal from "./ImageModal";
export default function ProductCard({
  product,
  ...anime
}: {
  product: Product;
} & IAos) {
  const [showImageModal, setShowImageModal] = useState(false);
  const handleImageClick = (e: React.SyntheticEvent) => {
    setShowImageModal(true);
  };
  const handleClose = () => {
    setShowImageModal(false);
  };
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
      >
        <CldImage
          // Responsive
          width={matchesXL ? 192 * 1.6 : matchesLG ? 192 * 1.2 : 192}
          height={matchesXL ? 123 * 1.6 : matchesLG ? 123 * 1.2 : 123}
          src={product.mainImage}
          alt={product.name}
          onClick={handleImageClick}
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
            <Typography variant="h1">${product.price}</Typography>
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
        <CustomIconButton
          sx={{ position: "absolute", bottom: "5%", right: "5%" }}
        >
          <Tooltip title={"Add to Cart"}>
            <AddShoppingCartRoundedIcon />
          </Tooltip>
        </CustomIconButton>
      </Card>
      {showImageModal && (
        <ImageModal
          product={product}
          showImageModal={showImageModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
