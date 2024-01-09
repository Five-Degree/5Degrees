"use client";
import {
  Avatar,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import mockReviews from "@/shared/constants/mockReviews";
import { CldImage } from "next-cloudinary";
export default function Reviews() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      gap={4}
      paddingInline={"10%"}
    >
      {mockReviews.map((review, index) => (
        <Card
          key={review.id}
          sx={{ width: { md: "17rem", lg: "24rem" } }}
          data-aos="zoom-out"
          data-aos-delay={index * 50}
        >
          <CardContent
            sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
          >
            <Stack gap={2}>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                {review.image ? (
                  <CldImage
                    src={review.image}
                    alt={review.name}
                    width={57}
                    height={57}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <Avatar />
                )}
                <Stack>
                  <Typography variant="h2" textTransform={"uppercase"}>
                    {review.name}
                  </Typography>
                  <Typography variant="h3" color={"var(--gray)"}>
                    {review.product}
                  </Typography>
                  <Rating
                    name="review-rating"
                    value={review.rating}
                    size="small"
                    readOnly
                  />
                </Stack>
              </Stack>
              <Typography>{review.review}</Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
