import { db } from "@/lib/firebase/config";
import {
  DocumentData,
  FirestoreError,
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";

const useSetDocument = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();
  const setDocument = async (
    collection: string,
    docId: string,
    data: DocumentData,
    merge: boolean = false
  ) => {
    setLoading(true);
    await setDoc(doc(db, collection, docId), data, { merge })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  const createDocument = async (coll: string, data: DocumentData) => {
    setLoading(true);
    await addDoc(collection(db, coll), data)
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  return { setDocument, createDocument, loading, error };
};
export default useSetDocument;
