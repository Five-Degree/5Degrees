import { useState } from "react";
import { DocumentData, FirestoreError, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const useSetDocument = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();
  const setDocument = async (
    collection: string,
    docId: string,
    data: DocumentData
  ) => {
    setLoading(true);
    await setDoc(doc(db, collection, docId), data)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  return { setDocument, loading, error };
};
export default useSetDocument;
