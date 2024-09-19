export const homeNavLinks = [
  { title: "Mens", href: "/" },
  { title: "Womens", href: "/womens" },
  { title: "Kids", href: "/kids" },
  { title: "Custom", href: "/custom" },
];
export const homeNavHrefMap = homeNavLinks.map((l) => l.href);
export const dashboardLinks = [
  // { label: "Account", path: "/dashboard/account" },
  { title: "Your Orders", label: "orders", path: "/dashboard/orders" },
];
