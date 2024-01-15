import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
  Skeleton,
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

export default function FormInput(props: any) {
  const { id, helperText, loading, ...inputProps } = props;
  const [wrongInput, setWrongInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const pattern = new RegExp(inputProps.pattern);
    setWrongInput(!pattern.test(e.target.value) && e.target.value != "");
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
      >
        {showPassword ? (
          <VisibilityOutlined sx={{ fontSize: "16px" }} />
        ) : (
          <VisibilityOffOutlined sx={{ fontSize: "16px" }} />
        )}
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormControl sx={{ width: "100%" }}>
      {inputProps.label && (
        <InputLabel
          shrink
          htmlFor={id}
          disableAnimation
          sx={
            wrongInput
              ? { color: "var(--error)" }
              : { color: "var(--graydarker)" }
          }
        >
          {inputProps.label}
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
            background: "var(--graylighter)",
            border: wrongInput ? "1px solid var(--error)" : "inherit",
          }}
        />
      )}
      <FormHelperText sx={{ color: "var(--error)" }}>
        {wrongInput && helperText}
      </FormHelperText>
    </FormControl>
  );
}
