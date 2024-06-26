import { useCart } from "@/contexts/CartContext";
import { CartProduct } from "@/shared/interfaces/Products";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import CustomIconButton from "../Custom/CustomIconButton";
import Link from "next/link";
export default function CartDrawerCard({ item }: { item: CartProduct }) {
  const { removeFromCart } = useCart();
  return (
    <Card sx={{ width: "100%", minHeight: "160px" }}>
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h3">
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
              <Typography color={"var(--gray)"}>Color:</Typography>
              <CircleIcon
                sx={{
                  color: item.selectedColor,
                  border: "1px solid var(--border-color)",
                  borderRadius: "50%",
                }}
              />
            </Stack>
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
        <Stack position={"absolute"} right={"5%"} top={"5%"}>
          <CustomIconButton
            size="small"
            sx={{ ":hover": { color: "var(--error)" } }}
            onClick={() => removeFromCart(item)}
          >
            <Tooltip title="Remove from cart">
              <DeleteOutlineRoundedIcon />
            </Tooltip>
          </CustomIconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
