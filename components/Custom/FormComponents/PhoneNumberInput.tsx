import { FormControl, InputLabel } from "@mui/material";
import React, { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import PhoneInput, { type CountryData } from "react-phone-input-2";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import "react-phone-input-2/lib/semantic-ui.css";
import { MobilePhoneLocale } from "validator";

const theme = {
  containerStyle: {
    fontFamily: "var(--font-as)",
    height: "fit-content",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--border-radius)",
    padding: "0.25em",
  },
  inputStyle: {
    background: "var(--background)",
    color: "var(--secondary-text)",
    fontFamily: "inherit",
    fontSize: "var(--body1)",
    fontWeight: "600",
    width: "100%",
    borderRadius: "inherit",
    border: "none",
  },
  buttonStyle: {
    border: "none",
    background: "var(--background)",
  },
  dropdownStyle: {
    background: "var(--background)",
    borderRadius: "var(--border-radius)",
    color: "var(--primary-text)",
    fontSize: "1.25rem",
    fontWeight: "bolder",
    border: "1px solid var(--border-color)",
    zIndex: 99,
  },
};
type IPhoneNumberInput = {
  label?: ReactNode;
  onChange(
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ): void;
  value?: string | null;
  name: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

export default function PhoneNumberInput(props: IPhoneNumberInput) {
  const { value, label, onChange, ...rest } = props;
  const [wrongInput, setWrongInput] = useState<boolean>(false);

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement>,
    data: CountryData
  ) {
    const pnum = e.target.value.replaceAll(" ", "").replace("+", "");
    console.log(pnum);
    if (!isMobilePhone(pnum)) {
      setWrongInput(true);
    }
  }
  return (
    <FormControl fullWidth sx={{ justifyContent: "flex-end" }}>
      <InputLabel
        shrink
        htmlFor={"whatsappNumber"}
        disableAnimation
        sx={{
          color: wrongInput ? "var(--error)" : "var(--primary-text)",
          fontSize: "1.15em",
          top: "-10%",
        }}
      >
        {label}
      </InputLabel>
      <PhoneInput
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        inputProps={{
          ...rest,
        }}
        {...theme}
      />
    </FormControl>
  );
}
