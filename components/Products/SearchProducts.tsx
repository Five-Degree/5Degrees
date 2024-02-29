import CustomIconButton from "@/components/Custom/CustomIconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { FormControl, Input, Stack } from "@mui/material";
export default function SearchProducts() {
  return (
    <form style={{ width: "100%" }} data-aos="fade-left" data-aos-once={true}>
      <Stack
        direction={"row"}
        width={"100%"}
        gap={1}
        alignItems={"center"}
        sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        <CustomIconButton>
          <SortRoundedIcon />
        </CustomIconButton>
        <CustomIconButton>
          <TuneRoundedIcon />
        </CustomIconButton>
        <FormControl variant="filled">
          <Input
            disableUnderline
            type="search"
            placeholder="Search for products"
            id="search-product"
            startAdornment={<SearchRoundedIcon />}
            sx={{ fontSize: "1em" }}
          />
        </FormControl>
      </Stack>
    </form>
  );
}
