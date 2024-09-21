import { Timestamp } from "firebase/firestore";

export default function timestampToDate(
  timestamp?: Timestamp | { _seconds: number; _nanoseconds: number }
) {
  if (!timestamp) return;
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  } else {
    return new Timestamp(timestamp._seconds, timestamp._nanoseconds).toDate();
  }
}
