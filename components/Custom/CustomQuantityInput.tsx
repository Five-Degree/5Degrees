import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "./CustomIconButton";

const StyledInputRoot = styled("div")`
  font-family: var(--font-bn);
  font-weight: 400;
  color: var(--secondary-text);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled("input")`
  font-size: 1.2em;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: var(--secondary-text);
  background: var(--background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 0.3em 1em;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: var(--accent);
  }

  &:focus {
    border-color: var(--accent);
    // box-shadow: 0 0 0 3px var(--accent);
  }
`;

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: CustomIconButton,
        decrementButton: CustomIconButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          style: { order: 1 },
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
