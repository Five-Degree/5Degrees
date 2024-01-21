import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
  Skeleton,
  InputProps,
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

export interface FormCredentials {
  [key: string]: string;
}

export interface IFormInput extends InputProps {
  id: string;
  loading?: boolean;
  helperText?: string;
  pattern?: string;
  label?: string;
  width?: string;
}
export default function FormInput(props: IFormInput) {
  const { id, helperText, loading, label, pattern, width, ...inputProps } =
    props;
  const [wrongInput, setWrongInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (pattern) {
      const pat = new RegExp(pattern);
      setWrongInput(!pat.test(e.target.value) && e.target.value != "");
    }
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
      >
        {showPassword ? (
          <VisibilityOutlined sx={{ fontSize: "1em" }} />
        ) : (
          <VisibilityOffOutlined sx={{ fontSize: "1em" }} />
        )}
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormControl sx={{ width: width ?? "100%" }}>
      {label && (
        <InputLabel
          shrink
          htmlFor={id}
          disableAnimation
          sx={{
            color: wrongInput ? "var(--error)" : "var(--primary)",
            fontSize: "1.15em",
            top: "-10%",
          }}
        >
          {label}
          {inputProps.required && wrongInput && "*"}
        </InputLabel>
      )}
      {loading ? (
        <Skeleton height={46} sx={{ mt: "0.6rem", borderRadius: "0.5rem" }} />
      ) : (
        <Input
          {...inputProps}
          disableUnderline
          error={wrongInput}
          onBlur={handleFocus}
          type={
            inputProps.type == "password"
              ? showPassword
                ? "text"
                : inputProps.type
              : inputProps.type
          }
          endAdornment={inputProps.type == "password" ? passwordAdornment : ""}
          color="secondary"
          sx={{
            background: "var(--white)",
            border: wrongInput ? "1px solid var(--error)" : undefined,
          }}
        />
      )}
      <FormHelperText sx={{ color: "var(--error)" }}>
        {wrongInput && helperText}
      </FormHelperText>
    </FormControl>
  );
}
