"use client";

import Account from "@/components/Dashboard/Account";
import Orders from "@/components/Dashboard/Orders";
import { notFound, useParams } from "next/navigation";

export default function DashboardSectionPage() {
  const { section } = useParams();

  switch (section) {
    case "account":
      return <Account />;
      break;

    case "orders":
      return <Orders />;
      break;

    default:
      return notFound();
      break;
  }
}
