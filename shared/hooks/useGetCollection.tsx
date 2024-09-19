import { useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  DocumentData,
  FirestoreError,
  QueryFieldFilterConstraint,
  FieldPath,
  WhereFilterOp,
} from "firebase/firestore";
import checkIfObjectExistsInArray from "@/shared/functions/checkIfObjectExistsInArray";
import { db } from "@/lib/firebase/config";

export type FilterParams = {
  label: string;
  value: Array<any>;
};

type Props = {
  queryLimit: number;
  coll: string;
  initialFilterConstraints?: Array<QueryFieldFilterConstraint>;
} & (
  | {
      includeAggr: true;
      aggrDoc: string;
    }
  | {
      includeAggr?: false;
      aggrDoc?: never;
    }
) &
  (
    | {
        includeId: true;
        idKey?: string;
      }
    | {
        includeId?: false;
        idKey?: never;
      }
  );
export default function useGetCollection<T extends DocumentData>({
  queryLimit,
  coll,
  includeId,
  idKey = "id",
  initialFilterConstraints,
}: Props) {
  const [isMounted, setIsMounted] = useState(false); //for when the component mounts so that initialFetch runs only once when component mounts and again whenever the filterConstraint changes
  const [results, setResults] = useState<Array<T>>([]);
  const [lastResult, setLastResult] = useState<T | null>(null);
  const [endOfData, setEndOfData] = useState<boolean>(false);
  const [filterConstraint, setFilterConstraint] = useState<
    Array<QueryFieldFilterConstraint>
  >(initialFilterConstraints ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    if (isMounted) {
      const q = query(
        collection(db, coll),
        ...filterConstraint,
        orderBy("dateCreated", "desc"),
        limit(queryLimit)
      );
      fetchDocs(q);
    }
  }, [isMounted, filterConstraint]);

  /**
   * Function to fetch more data when intersection observer is activated
   */
  function fetchMoreDataFunction() {
    if (lastResult) {
      const q = query(
        collection(db, coll),
        ...filterConstraint,
        orderBy("dateCreated", "desc"),
        limit(queryLimit),
        startAfter(lastResult.dateCreated)
      );
      fetchDocs(q);
    }
  }
  /**
   * Function that changes the filter constraints when set by the user
   * @param {QueryFieldFilterConstraint} filterParams Object containing label and value
   */
  function handleSetFilter(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: unknown
  ) {
    clearAll();
    setFilterConstraint([where(fieldPath, opStr, value)]);
  }
  /**
   * Function to clear filter constraints
   */
  function handleClearFilter() {
    clearAll();
    setFilterConstraint([]);
  }
  /**
   * Reset hook whenever filter constraint changes
   */
  async function clearAll() {
    console.log("clearedall");
    setResults([]);
    setLastResult(null);
    setEndOfData(false);
  }
  /**
   * Main function that fetches the docs based on the query provided
   * @param {Query<DocumentData>} query Firestore query
   */
  async function fetchDocs(query: Query<DocumentData>) {
    if (!endOfData) {
      setLoading(true);
      const unsubscribe = onSnapshot(
        query,
        (querySnapshot) => {
          var docs: (T | DocumentData)[] = [];
          var docCount = 0;
          console.log("onSnapshot triggered");
          querySnapshot.forEach((doc) => {
            console.log("data", doc.data());
            // console.log(doc.id, "=>", doc.data());
            if (includeId) {
              docs = [...docs, { [idKey]: doc.id, ...doc.data() }];
            } else {
              docs = [...docs, doc.data()];
            }
            docCount++;
          });
          if (docCount < queryLimit) {
            setEndOfData(true);
          }
          setLastResult(docs[docs.length - 1] as T);
          setResults(docs as T[]);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          setError(error);
        }
      );

      // Clean up the listener when the component unmounts or on re-fetch
      return () => {
        unsubscribe();
      };
    }
  }
  return {
    results,
    loading,
    error,
    fetchMoreDataFunction,
    handleSetFilter,
    handleClearFilter,
  };
}
