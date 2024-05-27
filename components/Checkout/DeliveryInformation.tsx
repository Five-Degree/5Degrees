import inputs from "@/shared/constants/inputs.json";
import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomSwitch from "../Custom/CustomSwitch";
import FormContainer from "../Custom/FormComponents/FormContainer";
import FormInput, {
  FormCredentials,
  IFormInput,
} from "../Custom/FormComponents/FormInput";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function DeliveryInformation() {
  const {
    deliveryInfo,
    saveInfo,
    handleDeliveryInfoChange: onDeliveryInfoChange,
    handleSaveInfo,
  } = useCheckout();
  const formInputFactory = (input: IFormInput) => (
    <FormInput
      key={input.id}
      {...input}
      // value={deliveryInfo[input.id]}
      onChange={onDeliveryInfoChange}
    />
  );
  // console.log(formValues, saveDetails);
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography variant="h2">Delivery Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            {formInputFactory(inputs.billingInfo[6])}
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
        >
          <Typography>Save shipping details</Typography>
          <CustomSwitch value={saveInfo} onChange={handleSaveInfo} />
        </Stack>
      </AccordionActions>
    </Accordion>
  );
}
