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
  async function setDocument(
    collection: string,
    docId: string,
    data: DocumentData,
    merge: boolean = false
  ) {
    // setLoading(true);

    try {
      await setDoc(doc(db, collection, docId), data, { merge });
    } catch (error) {
      console.error(error);
      throw Error(
        `Error occured while setting document in ${collection} with ${docId}, reason for error: ${error}`
      );
    }
  }
  async function createDocument(coll: string, data: DocumentData) {
    try {
      const docRef = await addDoc(collection(db, coll), data);
      return docRef;
    } catch (error) {
      console.error(error);
      throw Error(
        `Error occured while setting document in ${coll}, reason for error: ${error}`
      );
    }
  }
  return { setDocument, createDocument };
};
export default useSetDocument;
