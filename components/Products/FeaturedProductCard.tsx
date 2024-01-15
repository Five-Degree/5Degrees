import { useResponsive } from "@/contexts/ResponsiveContext";
import { FeaturedProducts } from "@/shared/interfaces/Products";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";

export default function FeaturedProductCard({
  product,
  anime,
}: {
  product: FeaturedProducts;
  anime?: IAos;
}) {
  const { matchesXXL, matchesXL } = useResponsive();
  return (
    <Stack
      direction={"row"}
      borderRadius={"var(--border-radius)"}
      border={".0625rem solid var(--border-color)"}
      position={"relative"}
      minHeight={"8.875rem"}
      sx={{ aspectRatio: "1 / 0.5" }}
      ml={"15%"}
      alignItems={"center"}
      padding={1}
      marginBlock={1}
      {...anime}
    >
      <CldImage
        src={product.mainImage}
        alt={product.name}
        // Responsive
        width={matchesXL ? 152 * 1.3 : 152}
        height={matchesXL ? 91 * 1.3 : 91}
        style={{
          position: "absolute",
          left: "-20%",
          bottom: "15%",
          rotate: "-25deg",
          filter: "drop-shadow(var(--shadow))",
        }}
      />
      <Stack
        // Responsive
        sx={{
          fontSize: { xxl: "1.8rem", xl: "1.3rem", lg: "1.2rem", md: "1rem" },
        }}
        ml={{ xl: "9.5rem", lg: "7rem" }}
      >
        <Tooltip title={product.name}>
          <Typography
            variant="h3"
            textOverflow={"ellipsis"}
            width={"8.75em"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {product.name}
          </Typography>
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
      <Tooltip title={"Add to cart"}>
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
        >
          <AddRoundedIcon
            sx={{
              // Responsive
              fontSize: { xl: "2em", md: "1.5em" },
            }}
          />
        </ButtonBase>
      </Tooltip>
    </Stack>
  );
}
