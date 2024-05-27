"use client";
import ProductsView from "@/components/Products/ProductsView";
import { db } from "@/firebase/config";
import mockProducts from "@/shared/constants/mockProducts";
import Product from "@/shared/interfaces/Products";
import { Button, Pagination, Stack } from "@mui/material";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const queryLimit = 12;
export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [lastProduct, setLastProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, "products"),
        orderBy("createdAt"),
        limit(queryLimit)
      );
      const productSnapshot = await getDocs(q);
      const initialProducts = productSnapshot.docs.map(
        (doc) => doc.data() as Product
      );
      setProducts(initialProducts);
      if (initialProducts.length == queryLimit)
        setLastProduct(initialProducts[initialProducts.length - 1]);
      else setLastProduct(null);
      setLoading(false);
    };
    fetchData();
  }, []);

  const showNext = () => {
    const fetchNextData = async () => {
      if (!lastProduct) return;
      setLoading(true);
      const q = query(
        collection(db, "products"),
        orderBy("createdAt"),
        startAfter(lastProduct.createdAt),
        limit(queryLimit)
      );
      const productSnapshot = await getDocs(q);
      const newProducts = productSnapshot.docs.map(
        (doc) => doc.data() as Product
      );
      console.log("newProds", newProducts, lastProduct);
      setProducts((prev) => [...prev, ...newProducts]);
      if (newProducts.length == queryLimit)
        setLastProduct(newProducts[newProducts.length - 1]);
      else setLastProduct(null);
      setLoading(false);
    };
    fetchNextData();
  };
  console.log("products", products, "lastProduct", lastProduct);
  return (
    <Stack gap={3}>
      <Stack
        overflow={"hidden"}
        component={"section"}
        id="AllProducts"
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-start" }}
        gap={4}
      >
        {/* <ProductsSidebar /> */}
        <ProductsView
          title="All Products"
          products={products}
          loading={loading}
        />
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"center"}
        data-aos="fade-up"
        data-aos-once={true}
      >
        {!!lastProduct && <Button onClick={showNext}>Load More</Button>}
      </Stack>
    </Stack>
  );
}
