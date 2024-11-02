import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryStartAtConstraint,
  startAfter,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

export interface UseCollectionProps2<T> {
  coll: string;
  queryLimit?: number;
  initialQueryConstraint: QueryConstraint[];
  initialOrderByField: string;
}

export default function useCollectionController<
  T extends { [key: string]: any }
>({
  coll,
  initialQueryConstraint,
  initialOrderByField,
  queryLimit = 12,
}: UseCollectionProps2<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [lastResult, setLastResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const initialFetch = useRef<boolean>(true);
  const [orderByField, setOrderByField] = useState(initialOrderByField);
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>(
    initialQueryConstraint
  );
  const fetchData = useCallback(
    async (
      startAt: QueryStartAtConstraint[],
      _queryConstraint: QueryConstraint[] = queryConstraint
    ) => {
      setLoading(true);
      console.log({ queryConstraint });
      const q = query(
        collection(db, coll),
        ..._queryConstraint,
        orderBy("createdAt", "desc"),
        limit(queryLimit),
        ...startAt
      );

      console.log({ q });
      const docsSnapshot = await getDocs(q);
      const docs = docsSnapshot.docs.map((doc) => doc.data() as T);
      if (docs.length == queryLimit) {
        setLastResult(docs[docs.length - 1]);
      } else setLastResult(null);
      setLoading(false);
      return docs;
    },
    [queryConstraint]
  );

  async function loadMore() {
    if (!lastResult) return;
    console.log("lastResult[orderByField]", lastResult[orderByField]);
    const docs = await fetchData([startAfter(lastResult[orderByField])]);
    setResults((prev) => [...prev, ...docs]);
  }

  useEffect(() => {
    if (!initialFetch.current) return;
    const initialFetcher = async () => {
      const data = await fetchData([]);
      setResults(data);
    };
    initialFetcher();
    initialFetch.current = false;
  }, []);

  async function refetchDataWithConstraints(
    _queryConstraint?: QueryConstraint[]
  ) {
    const data = await fetchData([], _queryConstraint);
    setResults(data);
  }

  return {
    results,
    lastResult,
    loading,
    loadMore,
    setQueryConstraint,
    setOrderByField,
    refetchDataWithConstraints,
  };
}
