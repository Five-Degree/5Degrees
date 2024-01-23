import Product from "../interfaces/Products";
import mockReviews from "./mockReviews";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/1/tvycewdsdubwcxdohqup",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    images: [
      "products/mens/shoes/2/qksxbq9bvy8t52gpkdpp",
      "products/mens/shoes/3/blpvzklmbyvtx0pf8wjh",
      "products/mens/shoes/4/sq7nhsboewq3mnq8adui",
      "products/mens/shoes/5/qelpvc8por0uy9b9qufj",
    ],
    reviews: mockReviews,
  },
  {
    id: "2",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 250,
    mainImage: "products/mens/shoes/2/qksxbq9bvy8t52gpkdpp",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: "blue",
    availability: "available",
  },
  {
    id: "3",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 320,
    mainImage: "products/mens/shoes/3/blpvzklmbyvtx0pf8wjh",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
  },
  {
    id: "4",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 180,
    mainImage: "products/mens/shoes/4/sq7nhsboewq3mnq8adui",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
  },
  {
    id: "5",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 160,
    mainImage: "products/mens/shoes/5/qelpvc8por0uy9b9qufj",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "6",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 3250,
    mainImage: "products/mens/shoes/6/hidbvhsasijfcs7m1bk1",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "7",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 650,
    mainImage: "products/mens/shoes/7/qjszhw0wsfjzq2j4mcuh",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "8",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 185,
    mainImage: "products/mens/shoes/8/bvf3dtcxywvil9dregyv",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "9",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 197,
    mainImage: "products/mens/shoes/9/nqvafgnxjpayph9h8yqr",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "10",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 276,
    mainImage: "products/mens/shoes/10/gpoe39p9waifxsmo9per",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
  },
  {
    id: "11",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 435,
    mainImage: "products/mens/shoes/11/p8cv6nz9tmhexddyiwqa",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
  },
  {
    id: "12",
    name: "Air Jordan 2 High Retro",
    defaultPrice: 186,
    mainImage: "products/mens/shoes/12/awslqe0rxsly3oq0hvfd",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "out of stock",
  },
  {
    id: "13",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/13/gfkht9ryl4yi6ukxkurk",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/13/tdv0jzrqj5nfzieejxc7"],
    featuredImage: "products/mens/shoes/13/tdv0jzrqj5nfzieejxc7",
  },
  {
    id: "14",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/14/ajxj9fttrcbfq9inhzln",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/14/cyqz3fdwa9hruaiern1g"],
    featuredImage: "products/mens/shoes/14/cyqz3fdwa9hruaiern1g",
  },
  {
    id: "15",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/15/ftu3toqxtdhlhwqwi8yo",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/15/hay8kbwdisaaq06lfsun"],
    featuredImage: "products/mens/shoes/15/hay8kbwdisaaq06lfsun",
  },
  {
    id: "16",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/16/vjjmcvawv0bgao70zhjc",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/16/nmktcdtdy7gszwibhvdy"],
    featuredImage: "products/mens/shoes/16/nmktcdtdy7gszwibhvdy",
  },
  {
    id: "17",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/16/vjjmcvawv0bgao70zhjc",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/16/nmktcdtdy7gszwibhvdy"],
    featuredImage: "products/mens/shoes/16/nmktcdtdy7gszwibhvdy",
  },
  {
    id: "18",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/16/vjjmcvawv0bgao70zhjc",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/16/nmktcdtdy7gszwibhvdy"],
    featuredImage: "products/mens/shoes/16/nmktcdtdy7gszwibhvdy",
  },
  {
    id: "19",
    name: "Air Jordan 1 High Retro",
    desc: "Duis non libero sodales, blandit mi ac, hendrerit dolor. Fusce ut diam ligula. Donec eu quam non quam tristique fermentum in nec leo. In dapibus justo ut finibus facilisis. Nunc pulvinar blandit enim sed vestibulum. Sed commodo tellus ut massa fermentum, id fringilla justo elementum. Sed ut molestie nunc, condimentum gravida ex.",
    defaultPrice: 190,
    mainImage: "products/mens/shoes/16/vjjmcvawv0bgao70zhjc",
    variants: [
      { name: "normal", price: 450 },
      { name: "high", price: 550 },
      { name: "master", price: 750 },
    ],
    colors: ["black", "red", "white", "blue"],
    availability: "available",
    reviews: mockReviews,
    images: ["products/mens/shoes/16/nmktcdtdy7gszwibhvdy"],
    featuredImage: "products/mens/shoes/16/nmktcdtdy7gszwibhvdy",
  },
];

export default mockProducts;
