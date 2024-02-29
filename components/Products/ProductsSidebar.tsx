import { useResponsive } from "@/contexts/ResponsiveContext";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Button, Collapse, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";

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
  const { matchesSM } = useResponsive();
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(productCategories[0]);
  const SidebarItem = styled(Button)({
    fontFamily: "var(--font-as)",
    fontSize: "1.5em",
    justifyContent: matchesSM ? "flex-end" : "center",
    paddingBlock: "0",
    textTransform: "none",
    textAlign: matchesSM ? "right" : "center",
    color: "var(--primary)",
    width: "100%",
    borderRadius: !matchesSM
      ? "var(--border-radius)"
      : "var(--border-radius) 0 0 var(--border-radius)",
    ":hover": {
      background: "var(--accent)",
      color: "var(--white)",
    },
    marginTop: "1rem",
  });
  const SelectedSidebarItem = styled(SidebarItem)({
    background: "var(--primary)",
    color: "var(--white)",
  });

  return (
    <Stack
      gap={1}
      alignItems={{ xs: "center", md: "flex-end" }}
      width={matchesSM ? "50%" : "100%"}
      ml={{ xs: 0, sm: "10%" }}
      data-aos="fade-right"
      // Responsive
      sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
    >
      <Typography variant="h1">All Products</Typography>
      <Button
        endIcon={<ExpandMoreRounded />}
        onClick={() => setActive(!active)}
        fullWidth
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        Categories
      </Button>
      <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} width={"100%"}>
        <Collapse in={matchesSM || active} sx={{ width: "100%" }}>
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
        </Collapse>
      </Stack>
    </Stack>
  );
}
