import SignupForm from "@/components/Auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account and register to 5 Degrees",
};

export default function Page() {
  return <SignupForm />;
}
