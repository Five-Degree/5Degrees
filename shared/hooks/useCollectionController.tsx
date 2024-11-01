import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  getDoc,
  doc,
  type QueryFieldFilterConstraint,
  type QueryOrderByConstraint,
  type DocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import convertToDate from "../functions/convertToDate";

export interface UseCollectionProps<T> {
  coll: string;
  defaultOrderByField: keyof T;
  defaultOrderby: QueryOrderByConstraint;
  initialWhereClause?: QueryFieldFilterConstraint[];
  queryLimit?: number;
}
export type FilterParams = {
  label: string;
  value: any[];
};

export default function useCollectionController<
  T extends { [key: string]: any }
>({
  coll,
  defaultOrderby,
  defaultOrderByField,
  initialWhereClause,
  queryLimit = 12,
}: UseCollectionProps<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [lastResult, setLastResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderByField, setOrderByField] =
    useState<keyof T>(defaultOrderByField);
  const [filterConstraint, setFilterConstraint] = useState<
    QueryFieldFilterConstraint[]
  >(initialWhereClause ?? []);
  const [orderByConstraint, setOrderByConstraint] = useState<
    QueryOrderByConstraint[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, coll),
        ...filterConstraint,
        ...orderByConstraint,
        defaultOrderby,
        limit(queryLimit)
      );
      const docsSnapshot = await getDocs(q);
      const initialDocs = docsSnapshot.docs.map((doc) => doc.data() as T);
      // console.log({ initialDocs, q });
      setResults(initialDocs);
      if (initialDocs.length == queryLimit) {
        setLastResult(initialDocs[initialDocs.length - 1]);
      } else setLastResult(null);
      setLoading(false);
    };
    fetchData();
  }, [orderByConstraint, filterConstraint]);

  const loadMore = () => {
    const fetchNextData = async () => {
      if (!lastResult) return;
      setLoading(true);
      console.log(
        "lastResult[orderByField]",
        { defaultOrderby },
        { orderByConstraint },
        orderByField,
        lastResult[orderByField]
      );

      const q = query(
        collection(db, coll),
        ...filterConstraint,
        ...orderByConstraint,
        defaultOrderby,
        startAfter(lastResult[orderByField]),
        limit(queryLimit)
      );
      const snapshot = await getDocs(q);
      const newResults = snapshot.docs.map((doc) => doc.data() as T);
      console.log("new items:", newResults, lastResult);
      setResults((prev) => [...prev, ...newResults]);
      if (newResults.length == queryLimit) {
        setLastResult(newResults[newResults.length - 1]);
      } else setLastResult(null);
      setLoading(false);
    };
    fetchNextData();
  };

  function handleSetConstraints(
    obf?: string,
    orderBy?: QueryOrderByConstraint[],
    filter?: QueryFieldFilterConstraint[]
  ) {
    if (obf) setOrderByField(obf);
    if (orderBy) setOrderByConstraint(orderBy);
    if (filter) setFilterConstraint(filter);
  }
  return {
    results,
    loading,
    lastResult,
    loadMore,
    handleSetConstraints,
  };
}
