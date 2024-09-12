import { useAuth } from "@/contexts/AuthContext";
import { DeliveryInfo } from "@/shared/interfaces/Order";
import { Delete } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import CustomIconButton from "../Custom/CustomIconButton";
import { useCheckout } from "./CheckoutContext";

export default function DeliveryInformationCard({
  res,
}: {
  res: DeliveryInfo;
}) {
  const { user } = useAuth();
  const { deliveryInfo, setDeliveryInfo, deleteDeliveryInfoDocument } =
    useCheckout();

  async function handleDelete(docId: string) {
    if (user) {
      await deleteDeliveryInfoDocument(user, docId);
    }
  }
  function handleClick() {
    setDeliveryInfo(res);
    // (Object.keys(res) as Array<keyof DeliveryInfo>).map((k) => {
    //   if (res[k] && typeof res[k] == "string") {
    //     console.log({ k, value: res[k], deliveryInfo });
    //     handleDeliveryInfoChange(k, res[k]);
    //   }
    // });
  }
  return (
    <Stack
      border={"1px solid var(--border-color)"}
      borderRadius={"var(--border-radius)"}
      minWidth={"30ch"}
      mb={"1rem"}
      p={"0.5rem"}
      position={"relative"}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        background: res.id == deliveryInfo.id ? "var(--border-color)" : "",
        ":hover": {
          background: "var(--border-color)",
        },
        ":active": {
          scale: "0.99",
        },
      }}
    >
      <CustomIconButton
        sx={{ position: "absolute", top: "0.15em", right: "0.15em" }}
        onClick={() => res.id && handleDelete(res.id)}
      >
        <Delete sx={{ fontSize: "var(--body1)" }} />
      </CustomIconButton>
      <Typography>
        {res.firstName} {res.lastName}
      </Typography>
      <Typography fontSize={"0.8rem"} fontWeight={"normal"}>
        {res.email}
      </Typography>
      <Typography fontSize={"0.8rem"} fontWeight={"normal"}>
        {res.whatsappNumber}
      </Typography>
      <Tooltip
        title={`${res.country} ${res.city} ${res.postalCode} ${res.address1} ${res.address2}`}
      >
        <Typography
          fontSize={"0.8rem"}
          fontWeight={"normal"}
          noWrap
          width={"30ch"}
        >
          {res.country} {res.city} {res.postalCode} {res.address1}{" "}
          {res.address2}
        </Typography>
      </Tooltip>
    </Stack>
  );
}
