import { Button, Stack } from "@mui/material";
import SearchAutocomplete from "../Custom/SearchAutocomplete";
import SortProducts from "./SortProducts";
import { useCollection } from "./Product/CollectionController";
import type { FormEvent } from "react";
import { useSearchContext } from "../Custom/SearchContext";
import { where, orderBy, documentId } from "firebase/firestore";
import ProductSearchHit from "./ProductSearchHit";
import { useRouter } from "next/navigation";

export default function SearchProducts() {
  const { formData, handleSetConstraints } = useCollection();
  const { searchHits, inputValue } = useSearchContext();
  const router = useRouter();

  // console.log(formData);
  console.log({ formData, searchHits });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ids =
      inputValue.length > 0 ? searchHits.map((sh) => sh.objectID) : [];
    console.log({ formData, ids, searchHits });
    const orderByFA = [];
    const filterFA = [];
    let obf = "createdAt";
    if (formData.defaultPrice) {
      orderByFA.push(orderBy("defaultPrice", formData.defaultPrice));
      obf = "defaultPrice";
    }
    if (ids.length > 0) {
      filterFA.push(where("id", "in", ids));
    }
    console.log({ filterFA });
    handleSetConstraints(
      obf,
      orderByFA.length > 0 ? orderByFA : undefined,
      filterFA.length > 0 ? filterFA : undefined
    );
  }
  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit}
      direction={"row"}
      width={"100%"}
      gap={1}
      alignItems={"center"}
      sx={{ fontSize: { xl: "1.5rem", lg: "1rem", md: "0.8rem" } }}
      justifyContent={{ xs: "center", sm: "flex-start" }}
      data-aos="fade-left"
      data-aos-once={true}
    >
      <SortProducts />
      <SearchAutocomplete
        HitComponent={ProductSearchHit}
        autocompleteSx={{ width: "21.875rem" }}
        handleHitClick={(option) => {
          router.push(`/product/${option.objectID}`);
        }}
      />

      {(formData.defaultPrice || inputValue.length > 0) && (
        <Button variant="contained" type="submit">
          Search
        </Button>
      )}
    </Stack>
  );
}
