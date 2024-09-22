"use client";
import { useAuth } from "@/contexts/AuthContext";
import useGetCollection from "@/shared/hooks/useGetCollection";
import Order from "@/shared/interfaces/Order";
import {
  AutorenewRounded,
  EventNoteRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { where } from "firebase/firestore";
import OrderCard from "./OrderCard";
import Loading from "../Custom/Loading";

export default function Orders() {
  const { user } = useAuth();

  const { results: ongoingOrders, loading: ongoingLoading } =
    useGetCollection<Order>({
      queryLimit: 10,
      coll: "orders",
      initialFilterConstraints: [
        where("userId", "==", user?.uid),
        where("status", "!=", "Delivered"),
      ],
      includeId: true,
    });
  const { results: previousOrders, loading: previousLoading } =
    useGetCollection<Order>({
      queryLimit: 10,
      coll: "orders",
      initialFilterConstraints: [
        where("userId", "==", user?.uid),
        where("status", "==", "Delivered"),
      ],
      includeId: true,
    });

  console.log(ongoingOrders);

  const OrdersSections = [
    {
      icon: <AutorenewRounded sx={{ fontSize: "var(--body1)" }} />,
      title: "Ongoing Orders",
      emptyMessage: "No ongoing orders",
      loading: ongoingLoading,
      items: ongoingOrders,
    },
    {
      icon: <EventNoteRounded sx={{ fontSize: "var(--body1)" }} />,
      title: "Previous Orders",
      emptyMessage: "No previous orders",
      loading: previousLoading,
      items: previousOrders,
    },
  ];
  if (!user) {
    return <></>;
  }
  return (
    <Stack width={"100%"} gap={2}>
      <Typography variant="h1">Orders</Typography>
      {OrdersSections.map((os) => (
        <Accordion key={os.title} sx={{ ":before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography
              fontWeight={"bold"}
              gap={2}
              alignItems={"center"}
              display={"flex"}
            >
              {os.icon} {os.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} position={"relative"}>
              {os.items.length == 0 && (
                <Typography>{os.emptyMessage}</Typography>
              )}
              {os.loading && <Loading />}
              {os.items.length > 0 &&
                os.items.map((o) => <OrderCard key={o.id} order={o} />)}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
