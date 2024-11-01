import useAnchoredDisclosure from "@/shared/hooks/useAnchoredDisclosure";
import CustomIconButton from "../Custom/CustomIconButton";
import {
  Badge,
  Menu,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  AttachMoneyRounded,
  SortRounded,
  TrendingDownRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import { useCollection } from "./Product/CollectionController";

export default function SortProducts() {
  const { handleAnchorClick, handleAnchorRemoval, anchorEl, open } =
    useAnchoredDisclosure();
  const { formData, setFormData } = useCollection();

  const PriceSorter = (
    <Stack direction={"row"} alignItems={"center"} gap={3}>
      <Typography display={"flex"} alignItems={"center"}>
        <AttachMoneyRounded /> Price
      </Typography>
      <ToggleButtonGroup
        onChange={(e, v) => {
          setFormData({ ...formData, defaultPrice: v });
        }}
        exclusive
        value={formData.defaultPrice}
      >
        <ToggleButton value={"asc"}>
          ASC&nbsp;&nbsp;&nbsp; <TrendingUpRounded />
        </ToggleButton>
        <ToggleButton value={"desc"}>
          DESC&nbsp;&nbsp;&nbsp; <TrendingDownRounded />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
  //   console.log({ formData });
  return (
    <>
      <Badge
        variant="dot"
        overlap="circular"
        invisible={!formData.defaultPrice}
      >
        <CustomIconButton onClick={handleAnchorClick}>
          <SortRounded />
        </CustomIconButton>
      </Badge>
      <Menu
        open={open}
        anchorEl={anchorEl}
        disableScrollLock
        onClose={handleAnchorRemoval}
      >
        <Stack p={2} gap={1}>
          <Typography>Sort By</Typography>
          {PriceSorter}
        </Stack>
      </Menu>
    </>
  );
}
