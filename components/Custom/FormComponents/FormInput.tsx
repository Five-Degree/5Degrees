import React, { ReactNode, useState } from "react";
import {
  FormControl,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
  Skeleton,
  InputProps
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import FormSelectInput from "./FormSelectInput";

export interface FormCredentials {
  [key: string]: string;
}

type IFormInputOption = { name: string; [key: string]: any };

export type IFormInput = {
  id: string;
  name: string;
  loading?: boolean;
  helperText?: string;
  pattern?: string;
  label?: string | ReactNode;
  width?: string;
  options?: IFormInputOption[];
  renderOption?: (option: IFormInputOption) => ReactNode;
  onOptionSelect?: (option: IFormInputOption) => void;
} & InputProps;
export default function FormInput(props: IFormInput) {
  const {
    id,
    helperText,
    loading,
    options,
    label,
    pattern,
    width,
    renderOption,
    onOptionSelect,
    ...inputProps
  } = props;
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
            color: wrongInput ? "var(--error)" : "var(--primary-text)",
            fontSize: "1.15em",
            top: "-10%",
          }}
        >
          {label}
          {inputProps.required && wrongInput && "*"}
        </InputLabel>
      )}
      {loading && (
        <Skeleton height={46} sx={{ mt: "0.6rem", borderRadius: "0.5rem" }} />
      )}
      {!loading &&
        (!options ? (
          <Input
            {...inputProps}
            disableUnderline
            id={id}
            error={wrongInput}
            onBlur={handleFocus}
            type={
              inputProps.type == "password"
                ? showPassword
                  ? "text"
                  : inputProps.type
                : inputProps.type
            }
            endAdornment={
              inputProps.type == "password" ? passwordAdornment : ""
            }
            color="secondary"
            sx={{
              border: wrongInput ? "1px solid var(--error)" : undefined,
            }}
          />
        ) : (
          <FormSelectInput
            {...props}
            options={options}
            handleFocus={handleFocus}
            wrongInput={wrongInput}
            renderOption={renderOption}
            onOptionSelect={onOptionSelect}
          />
        ))}
      <FormHelperText sx={{ color: "var(--error)" }}>
        {wrongInput && helperText}
      </FormHelperText>
    </FormControl>
  );
}
