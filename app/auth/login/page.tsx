import LoginForm from "@/components/Auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account in 5 Degrees",
};
export default function Page() {
  return <LoginForm />;
}
