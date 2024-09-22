import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function PlainData({
  det,
  value = "-",
}: {
  det: string;
  value?: ReactNode;
}) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography>{det}</Typography>
      <Typography color={"var(--accent)"}>{value}</Typography>
    </Stack>
  );
}
export function PlainDataMapper({ obj }: { obj: any }) {
  return Object.keys(obj).map(
    (od) =>
      // dont show undefined values row
      obj[od as keyof typeof obj] && (
        <PlainData key={od} det={od} value={obj[od as keyof typeof obj]} />
      )
  );
}
