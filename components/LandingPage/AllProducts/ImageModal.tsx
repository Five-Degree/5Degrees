import { useResponsive } from "@/contexts/responsiveContext";
import Product from "@/shared/interfaces/product";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React from "react";

interface Props {
  product: Product;
  showImageModal: boolean;
  handleClose: () => void;
}

export default function ImageModal({
  product,
  showImageModal,
  handleClose,
}: Props) {
  const { matchesXL, matchesLG } = useResponsive();
  return (
    <Dialog
      open={showImageModal}
      onClose={handleClose}
      aria-labelledby={product.name}
      aria-describedby={product.availability}
      maxWidth={matchesXL ? "xl" : matchesLG ? "lg" : "md"}
    >
      <DialogTitle id={product.name}>{product.name}</DialogTitle>
      <DialogContent sx={{ width: "max-content" }}>
        <CldImage
          src={product.mainImage}
          alt={product.name}
          // Responsive
          width={matchesXL ? 192 * 5 : matchesLG ? 192 * 4 : 192 * 2}
          height={matchesXL ? 123 * 5 : matchesLG ? 123 * 4 : 123 * 2}
          loading={"lazy"}
        />
      </DialogContent>
    </Dialog>
  );
}
