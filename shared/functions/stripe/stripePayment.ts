import { auth, db, fun } from "@/firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
export type CheckoutSessionData = {
  mode?: "payment" | "subscription" | "setup";
  price: string;
  success_url: string;
  cancel_url: string;
};
export const getCheckoutUrl = async (
  checkoutSessionData: CheckoutSessionData
): Promise<string> => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const checkoutSessionRef = collection(
    db,
    "users",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    ...checkoutSessionData,
    payment_method_types: ["card", "ideal", "bancontact"],
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (): Promise<string> => {
  const user = auth.currentUser;

  let dataWithUrl: any;
  try {
    const functionRef = httpsCallable(
      fun,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: `${window.location.origin}/dashboard`,
    });

    // Add a type to the data
    dataWithUrl = data as { url: string };
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise<string>((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};

export interface SubscriptionStatus {
  current_period_end: Timestamp;
  role: "standard" | "premium";
  // Add other properties if needed
}

export const getSubscriptionStatus = async (
  userUid: string
): Promise<SubscriptionStatus[]> => {
  const paymentsRef = collection(db, `users/${userUid}/subscriptions`);
  const paymentsQuery = query(paymentsRef, orderBy("created"), limit(2)); // Limit to 2 documents

  try {
    const snapshot = await getDocs(paymentsQuery);

    const createdValues: SubscriptionStatus[] = [];
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      const paymentData = doc.data() as SubscriptionStatus;
      createdValues.push(paymentData);
    });

    return createdValues;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
