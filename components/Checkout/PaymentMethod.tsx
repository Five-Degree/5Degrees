import { useCheckout } from "@/contexts/CheckoutContext";
import { CreditCard, ExpandMoreRounded } from "@mui/icons-material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SafeCheckout from "../Utility/SafeCheckout";

export default function PaymentMethod() {
  const { paymentMethod, handleSetPaymentMethod } = useCheckout();
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography variant="h2">Payment Method</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={handleSetPaymentMethod}
          aria-label="payment method"
          sx={{
            width: "100%",
            "& .MuiToggleButton-root": {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5em",
              paddingBlock: 2,
              width: "100%",
            },
          }}
        >
          <ToggleButton value="card" aria-label="card">
            <CreditCard sx={{ fontSize: "2.8125rem" }} />
            Card
          </ToggleButton>
          <ToggleButton value="online" aria-label="online">
            <AccountBalanceRoundedIcon sx={{ fontSize: "2.8125rem" }} />
            Online
          </ToggleButton>
          {/* <ToggleButton value="cod" aria-label="cash on delivery">
            <LocalShippingRoundedIcon sx={{ fontSize: "2.8125rem" }} />
            Cash on Delivery
          </ToggleButton> */}
        </ToggleButtonGroup>
        <SafeCheckout />
      </AccordionDetails>
    </Accordion>
  );
}
