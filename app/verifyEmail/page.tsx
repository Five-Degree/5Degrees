import VerifyEmail from "@/components/Auth/VerifyEmail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Email",
  description: "Verify your email address before you start using the features",
};
export default function Page() {
  return <VerifyEmail />;
}
