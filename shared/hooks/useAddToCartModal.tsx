import React, { useState } from "react";
import Product from "../interfaces/Products";
import AddToCartModal from "@/components/Products/AddToCartModal";

interface Props {
  product: Product;
}

export default function useAddToCartModal({ product }: Props) {
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const handleAddToCartClose = () => {
    setShowAddToCartModal(false);
  };
  const handleAddToCartOpen = () => {
    setShowAddToCartModal(true);
  };
  const addToCartModal = (
    <AddToCartModal
      openAddToCart={showAddToCartModal}
      product={product}
      handleAddToCartClose={handleAddToCartClose}
    />
  );
  return {
    showAddToCartModal,
    addToCartModal,
    handleAddToCartClose,
    handleAddToCartOpen,
  };
}
