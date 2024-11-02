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
  const {
    formData,
    setQueryConstraint,
    refetchDataWithConstraints,
    setOrderByField,
  } = useCollection();
  const { searchHits, inputValue } = useSearchContext();
  const router = useRouter();

  // console.log(formData);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const orderByFA = [];
    const filterFA = [];
    const ids =
      inputValue.length > 0 ? searchHits.map((sh) => sh.objectID) : [];
    if (ids.length > 0) {
      filterFA.push(where("id", "in", ids));
    }
    if (formData.defaultPrice) {
      orderByFA.push(orderBy("defaultPrice", formData.defaultPrice));
      setOrderByField("defaultPrice");
    }
    console.log({ filterFA, orderByFA });
    setQueryConstraint([...filterFA, ...orderByFA]);
    await refetchDataWithConstraints([...filterFA, ...orderByFA]);
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
