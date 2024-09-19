import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CustomSwitch from "../Custom/CustomSwitch";
import { useCheckout } from "./CheckoutContext";
export default function DeliverySchedule() {
  const {
    scheduleDelivery,
    rapidDelivery,
    scheduledDeliveryDate,
    handleScheduledDeliveryDate,
    handleScheduleDelivery,
    handleRapidDelivery,
  } = useCheckout();
  const rowFactory = (children: React.ReactNode) => (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={3}
      justifyContent={"space-between"}
    >
      {children}
    </Stack>
  );
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography
            variant="h2"
            color={scheduleDelivery ? "var(--accent)" : "var(--gray)"}
          >
            Schedule Delivery
          </Typography>
          <CustomSwitch
            value={scheduleDelivery}
            onChange={handleScheduleDelivery}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack paddingInline={1} gap={3}>
          <Typography>
            You can select the date on which you want your order to be
            delivered. This option is only available for Local deliveries.
          </Typography>
          <Typography>
            Minimum delivery time can take around{" "}
            <span style={{ color: "var(--accent)" }}>3-5 business days</span>.
          </Typography>
          <Divider />
          {/* {rowFactory(
            <>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Fast Delivery</Typography>
                <FastForwardRoundedIcon />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <CustomSwitch
                  value={rapidDelivery}
                  onChange={handleRapidDelivery}
                  disabled={!scheduleDelivery || !!scheduledDeliveryDate}
                />
                <Typography>Deliver in 3 days</Typography>
              </Stack>
            </>
          )} */}

          {rowFactory(
            <>
              <Typography>Select Date of delivery</Typography>
              <Stack maxWidth={"60%"}>
                <DatePicker
                  views={["month", "day"]}
                  disabled={!scheduleDelivery}
                  defaultValue={scheduledDeliveryDate}
                  minDate={scheduledDeliveryDate}
                  onChange={(e) => e && handleScheduledDeliveryDate(e)}
                />
              </Stack>
            </>
          )}

          <Typography>Delivery Note</Typography>
          <Input
            type="text"
            id="deliveryNote"
            disableUnderline
            placeholder="Note"
            multiline
            maxRows={5}
            sx={{
              minHeight: "9.375rem",
              alignItems: "flex-start",
              pt: 1,
            }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
