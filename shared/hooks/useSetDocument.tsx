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
    try {
      const docRef = await addDoc(collection(db, coll), data);
      setLoading(false);
      return docRef;
    } catch (error) {
      if (error instanceof FirestoreError) setError(error);
    }
  };
  return { setDocument, createDocument, loading, error };
};
export default useSetDocument;
