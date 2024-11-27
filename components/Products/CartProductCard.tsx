import { useCart } from "@/contexts/CartContext";
import { CartProduct } from "@/shared/interfaces/Products";
import { Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import CustomIconButton from "../Custom/CustomIconButton";
import Link from "next/link";
import { DeleteOutlineRounded } from "@mui/icons-material";
export default function CartProductCard({
  item,
  readOnly = false,
}: {
  item: CartProduct;
  readOnly?: boolean;
}) {
  const { removeFromCart } = useCart();
  return (
    <Card
      sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          paddingRight={"2rem"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          sx={{ lineClamp: "2", WebkitLineClamp: "2" }}
        >
          <Link href={`/product/${item.id}`}>{item.name}</Link>
        </Typography>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <CldImage
            src={item.mainImage}
            width={192 * 0.5}
            height={123 * 0.5}
            alt={item.name}
            style={{
              borderRadius: "var(--border-radius)",
              border: "1px solid var(--border-color)",
            }}
          />
          <Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography color={"var(--gray)"}>Variant:</Typography>
              <Typography>{item.selectedVariant}</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography color={"var(--gray)"}>Size:</Typography>
              <Typography>{item.selectedSize}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          justifyContent={"flex-end"}
          alignItems={"baseline"}
          gap={1}
          direction={"row"}
        >
          <Typography variant="h2" color={"var(--gray)"} fontSize={"1.3sem"}>
            {item.quantity} x
          </Typography>
          <Typography variant="h1" fontSize={"1.5em"}>
            ${item.unitPrice}
          </Typography>
        </Stack>
        {!readOnly && (
          <Stack position={"absolute"} right={"5%"} top={"5%"}>
            <CustomIconButton onClick={() => removeFromCart(item)}>
              <Tooltip title="Remove from cart">
                <DeleteOutlineRounded fontSize="large" />
              </Tooltip>
            </CustomIconButton>
          </Stack>
        )}{" "}
      </CardContent>
    </Card>
  );
}
