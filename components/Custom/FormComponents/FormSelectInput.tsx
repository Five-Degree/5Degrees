import { MouseEvent, useState } from "react";
import { IFormInput } from "./FormInput";
import { Input, Menu, MenuItem } from "@mui/material";
import CustomIconButton from "../CustomIconButton";
import { ArrowDropDown } from "@mui/icons-material";

type FormSelectInputProps = {
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  wrongInput: boolean;
} & IFormInput;

export default function FormSelectInput({
  id,
  options,
  wrongInput,
  renderOption,
  onOptionSelect,
  handleFocus,
  ...inputProps
}: FormSelectInputProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { onChange, ...rest } = inputProps;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = () => {};
  return (
    <>
      <Input
        {...rest}
        disableUnderline
        error={wrongInput}
        id={id}
        onBlur={handleFocus}
        type={inputProps.type}
        endAdornment={
          <CustomIconButton onClick={handleClick}>
            <ArrowDropDown />
          </CustomIconButton>
        }
        color="secondary"
        sx={{
          border: wrongInput ? "1px solid var(--error)" : undefined,
        }}
      />
      <Menu
        id={`${id}-menu`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": id,
          sx: { width: anchorEl && anchorEl.offsetWidth },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.name}
            onClick={(e) => {
              onOptionSelect && onOptionSelect(option);
              handleClose();
            }}
          >
            {renderOption ? renderOption(option) : option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
