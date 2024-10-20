import { Timestamp } from "firebase/firestore";

export default function convertToDate(jsonTimestamp?: {
  _seconds?: number;
  _nanoseconds?: number;
  seconds?: number;
  nanoseconds?: number;
}) {
  if (jsonTimestamp) {
    const seconds = jsonTimestamp._seconds ?? jsonTimestamp.seconds;
    const nanoseconds = jsonTimestamp._nanoseconds ?? jsonTimestamp.nanoseconds;

    if (seconds !== undefined && nanoseconds !== undefined) {
      return new Timestamp(seconds, nanoseconds).toDate();
    }
  }
}
