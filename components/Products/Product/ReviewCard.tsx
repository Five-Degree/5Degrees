import { Review } from "@/shared/interfaces/Reviews";
import {
  Avatar,
  Divider,
  Rating,
  Stack,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { CldImage } from "next-cloudinary";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Stack gap={2}>
      <Stack direction={"row"} gap={2}>
        {review.image ? (
          <CldImage
            src={review.image}
            alt={review.name}
            width={35}
            height={35}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Avatar />
        )}
        <Stack gap={3}>
          <Stack gap={1}>
            <Rating
              name="review-rating"
              value={review.rating}
              size="small"
              readOnly
              precision={0.5}
            />
            <Typography maxWidth={"100%"}>{review.review}</Typography>
          </Stack>
          <Stack>
            <Typography textTransform={"uppercase"} fontWeight={700}>
              {review.name}
            </Typography>
            <Typography color={"var(--gray)"}>
              {dayjs(review.date).format("DD/MM/YYYY h:m:s")}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider flexItem />
    </Stack>
  );
}
