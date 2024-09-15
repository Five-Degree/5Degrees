import { useAuth } from "@/contexts/AuthContext";
import inputs from "@/shared/constants/inputs";
import useGetCollection from "@/shared/hooks/useGetCollection";
import { DeliveryInfo } from "@/shared/interfaces/Order";
import { ExpandMoreRounded, FactCheckRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomSwitch from "../Custom/CustomSwitch";
import FormInput, { IFormInput } from "../Custom/FormComponents/FormInput";
import { useCheckout } from "./CheckoutContext";
import DeliveryInformationCard from "./DeliveryInformationCard";

export default function DeliveryInformation() {
  const {
    deliveryInfo,
    saveInfo,
    qaulityCheck,
    handleDeliveryInfoChange,
    handleSaveInfoChange,
    handleQualityCheckChange,
    loading,
  } = useCheckout();
  const { user } = useAuth();
  const {
    results,
    loading: loadingDeliveryInfo,
    error,
  } = useGetCollection<DeliveryInfo>({
    queryLimit: 3,
    coll: `users/${user?.uid}/deliveryInformations`,
    includeId: true,
  });
  const formInputFactory = (input: IFormInput) => (
    <FormInput
      key={input.id}
      {...input}
      value={deliveryInfo[input.name as keyof DeliveryInfo] || ""}
      onChange={(e) => handleDeliveryInfoChange(e.target.name, e.target.value)}
      loading={loading || loadingDeliveryInfo}
    />
  );
  // console.log(formValues, saveDetails);
  console.log({ deliveryInfo });
  console.log({ results, error });

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography variant="h2">Delivery Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"row"} overflow={"auto hidden"} gap={"0.5rem"}>
          {results.map((res) => (
            <DeliveryInformationCard
              key={res.email}
              res={res as DeliveryInfo}
            />
          ))}
        </Stack>
        <Stack
          gap={2}
          width={"100%"}
          justifyContent={"center"}
          sx={{
            "& .MuiFormControl-root": {
              mt: 1,
            },
          }}
        >
          <Stack direction={"row"} gap={1}>
            {/* First name */}
            {formInputFactory(inputs.billingInfo[0])}
            {/* Last name */}
            {formInputFactory(inputs.billingInfo[1])}
          </Stack>
          <Stack direction={"row"} gap={1}>
            {/* Email */}
            {formInputFactory(inputs.billingInfo[2])}
            {/* Phone */}
            {formInputFactory(inputs.billingInfo[3])}
          </Stack>
          {/* Address */}
          {formInputFactory(inputs.billingInfo[4])}
          {formInputFactory(inputs.billingInfo[5])}
          <Stack direction={"row"} gap={1}>
            {/* Country */}
            {/* {formInputFactory({})} */}
            <FormInput
              {...inputs.billingInfo[6]}
              onOptionSelect={(o) =>
                handleDeliveryInfoChange("country", o.name)
              }
              onChange={(e) =>
                handleDeliveryInfoChange(e.target.name, e.target.value)
              }
              loading={loading || loadingDeliveryInfo}
              value={deliveryInfo.country}
              renderOption={(o) => {
                return (
                  <Box
                    // component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${o.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${o.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {o.name}
                  </Box>
                );
              }}
            />
            {/* City */}
            {formInputFactory(inputs.billingInfo[7])}
            {/* Postal Code */}
            {formInputFactory(inputs.billingInfo[8])}
          </Stack>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Stack
          direction={"row"}
          marginBlock={1}
          paddingInline={2}
          gap={3}
          alignItems={"center"}
          justifyContent={"flex-end"}
          bgcolor={qaulityCheck ? "var(--accentalpha)" : ""}
          borderRadius={"var(--border-radius)"}
          p={"0.5em"}
        >
          <Typography
            alignItems={"center"}
            display={"flex"}
            gap={"0.25em"}
            color={qaulityCheck ? "var(--accent)" : undefined}
          >
            <FactCheckRounded />
            Quality Checking
          </Typography>
          <CustomSwitch
            disabled={loading || loadingDeliveryInfo}
            value={qaulityCheck}
            onChange={handleQualityCheckChange}
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack
          direction={"row"}
          marginBlock={1}
          paddingInline={2}
          gap={3}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Typography>Save shipping details</Typography>
          <CustomSwitch
            disabled={loading || loadingDeliveryInfo}
            value={saveInfo}
            onChange={handleSaveInfoChange}
          />
        </Stack>
      </AccordionActions>
    </Accordion>
  );
}
