import { SvgIconProps } from "@mui/material";
export interface SimpleLink {
  name: string;
  goto: string;
  children?: { [key: string]: SimpleLink };
}
export interface NavLinks extends SimpleLink {
  handler?: (param: any) => void;
  icon?: React.ReactElement<SvgIconProps>;
  badge?: boolean;
}
export interface SideBarLinks extends NavLinks {
  expanded?: boolean;
}
