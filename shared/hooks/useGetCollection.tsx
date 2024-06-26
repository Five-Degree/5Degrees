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
} & (
  | {
      includeAggr: true;
      aggrDoc: string;
    }
  | {
      includeAggr?: false;
      aggrDoc?: never;
    }
);
const useGetCollection = ({ queryLimit, coll }: Props) => {
  const [isMounted, setIsMounted] = useState(false); //for when the component mounts so that initialFetch runs only once when component mounts and again whenever the filterConstraint changes
  const [results, setResults] = useState<Array<DocumentData>>([]);
  const [lastResult, setLastResult] = useState<DocumentData | null>(null);
  const [endOfData, setEndOfData] = useState<boolean>(false);
  const [filterConstraint, setFilterConstraint] = useState<
    Array<QueryFieldFilterConstraint>
  >([]);
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
   * @param {FilterParams} filterParams Object containing label and value
   */
  function handleSetFilter(filterParams: FilterParams) {
    clearAll();
    setFilterConstraint([where(filterParams.label, "in", filterParams.value)]);
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
          var docs = results;
          var docCount = 0;
          console.log("onSnapshot triggered");
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            if (!checkIfObjectExistsInArray(docs, "_id", doc.data())) {
              docs = [...docs, doc.data()];
            }
            docCount++;
          });
          if (docCount < queryLimit) {
            setEndOfData(true);
          }
          setLastResult(docs[docs.length - 1]);
          setResults(docs);
          setLoading(false);
        },
        (error) => {
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
};

export default useGetCollection;
