import { Button, Stack, Typography, colors, styled } from "@mui/material";
import React, { useState } from "react";

export default function ProductsSidebar() {
  const productCategories = [
    "Nike",
    "Reebok",
    "Adidas",
    "Puma",
    "Converse",
    "HeyDude",
    "New Balance",
    "Vans",
    "Others",
  ];
  const SidebarItem = styled(Button)({
    fontFamily: "var(--font-as)",
    fontSize: "1.5em",
    justifyContent: "flex-end",
    paddingBlock: "0",
    textTransform: "none",
    textAlign: "right",
    color: "var(--primary)",
    width: "100%",
    borderRadius: "var(--border-radius) 0 0 var(--border-radius)",
    ":hover": {
      background: "var(--accent)",
      color: "var(--white)",
    },
  });
  const SelectedSidebarItem = styled(SidebarItem)({
    background: "var(--primary)",
    color: "var(--white)",
  });
  const [selectedItem, setSelectedItem] = useState(productCategories[0]);
  return (
    <Stack
      maxWidth={"20.1875em"}
      gap={"2.75rem"}
      alignItems={"flex-end"}
      ml={"10%"}
      data-aos="fade-right"
      // Responsive
      sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
    >
      <Typography variant="h1">All Products</Typography>
      <Stack gap={"1rem"} alignItems={"flex-end"} width={"100%"}>
        {productCategories.map((category) =>
          selectedItem == category ? (
            <SelectedSidebarItem
              key={category}
              onClick={() => setSelectedItem(category)}
            >
              {category}
            </SelectedSidebarItem>
          ) : (
            <SidebarItem
              key={category}
              onClick={() => setSelectedItem(category)}
            >
              {category}
            </SidebarItem>
          )
        )}
      </Stack>
    </Stack>
  );
}
