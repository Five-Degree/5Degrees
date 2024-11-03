import { Stack, StackProps } from "@mui/material";

export default function FormContainer({
  children,
  ...props
}: StackProps<"form">) {
  return (
    <Stack
      component={"form"}
      sx={{
        gap: "1.25rem",
        alignItems: "center",
        width: "100%",
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
}
