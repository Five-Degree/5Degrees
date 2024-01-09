interface Reviews {
  id: string;
  name: string;
  image?: string;
  product: string;
  review: string;
  rating: number;
}
const mockReviews: Reviews[] = [
  {
    id: "1",
    name: "Melissa Abdou",
    product: "Air Jordan 1 High Retro",
    rating: 5,
    review:
      "5 degrees is one of the best shoe reseller I've bought shoes from. Highly recommended.",
    image: "reviews/kcvexwn8vvod6cbzc8a0",
  },
  {
    id: "2",
    name: "Yasir Golam",
    product: "Air Jordan 1 High Retro",
    rating: 4.5,
    review: "Trusted and very friendly service, will buy again.",
    image: "reviews/ftodzarcxc8tprviq5u2",
  },
  {
    id: "3",
    name: "MARIUS NIJHUIS",
    product: "Air Jordan 1 High Retro",
    rating: 4.5,
    review:
      "Always has the latest collections, had my doubts in the beginning but the service is amazing.",
    image: "reviews/xggifpfw260ch7bure1u",
  },
  {
    id: "4",
    name: "Allez N'ganou",
    product: "Air Jordan 1 High Retro",
    rating: 4.5,
    review:
      "Finally found a trusted source of the latest and most stylish shoes, best service according to me",
    image: "reviews/gdmafo6h5tz4orzt0ilp",
  },
];
export default mockReviews;
