import { db } from "@/lib/firebase/config";
import {
  collection,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props<T> {
  coll: string;
  orderby: { fieldPath: string | FieldPath; directionStr?: OrderByDirection };
  queryLimit?: number;
}
export default function useCollectionController<
  T extends { [key: string]: any }
>({ coll, orderby, queryLimit = 12 }: Props<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [lastResult, setLastResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, coll),
        orderBy(orderby.fieldPath, orderby.directionStr),
        limit(queryLimit)
      );
      const docsSnapshot = await getDocs(q);
      const initialDocs = docsSnapshot.docs.map((doc) => doc.data() as T);
      setResults(initialDocs);
      if (initialDocs.length == queryLimit)
        setLastResult(initialDocs[initialDocs.length - 1]);
      else setLastResult(null);
      setLoading(false);
    };
    fetchData();
  }, []);

  const showNext = () => {
    const fetchNextData = async () => {
      if (!lastResult) return;
      setLoading(true);
      const q = query(
        collection(db, "products"),
        orderBy(orderby.fieldPath, orderby.directionStr),
        startAfter(lastResult[orderby.fieldPath as keyof T]),
        limit(queryLimit)
      );
      const productSnapshot = await getDocs(q);
      const newProducts = productSnapshot.docs.map((doc) => doc.data() as T);
      console.log("newProds", newProducts, lastResult);
      setResults((prev) => [...prev, ...newProducts]);
      if (newProducts.length == queryLimit)
        setLastResult(newProducts[newProducts.length - 1]);
      else setLastResult(null);
      setLoading(false);
    };
    fetchNextData();
  };
  return { results, loading, lastResult, showNext };
}
