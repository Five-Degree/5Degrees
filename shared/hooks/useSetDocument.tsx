import { db } from "@/lib/firebase/config";
import {
  DocumentData, addDoc,
  collection,
  doc,
  setDoc
} from "firebase/firestore";

const useSetDocument = () => {
  async function setDocument(
    collection: string,
    docId: string,
    data: DocumentData,
    merge: boolean = false
  ) {
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
        `Error occured while creating document in ${coll}, reason for error: ${error}`
      );
    }
  }
  return { setDocument, createDocument };
};
export default useSetDocument;
