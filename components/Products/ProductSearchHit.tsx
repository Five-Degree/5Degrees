import { ProductSearchHitProps } from "@/shared/interfaces/Products";
import { Stack, Tooltip, Typography } from "@mui/material";
import { Hit } from "algoliasearch/lite";
import { CldImage } from "next-cloudinary";

export default function ProductSearchHit({
  hit,
}: {
  hit: Hit<ProductSearchHitProps>;
}) {
  return (
    <Tooltip title={hit.name}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        height="6.25rem"
        maxWidth={"100%"}
      >
        <CldImage
          width={78}
          height={57}
          src={hit.mainImage}
          alt={hit.name}
          style={{
            minWidth: "4.875rem",
            height: "3.5625rem",
            objectFit: "cover",
            borderRadius: "var(--border-radius)",
          }}
        />
        <Stack pl={1} width={"max-content"} overflow={"hidden"}>
          <Typography variant="h3" component="p" noWrap>
            {hit.name}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
            variant="body2"
            color={"var(--secondary-text)"}
          >
            {hit.desc}
          </Typography>
        </Stack>
      </Stack>
    </Tooltip>
  );
}
