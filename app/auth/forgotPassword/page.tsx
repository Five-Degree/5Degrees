import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "If you forget your password you can reset your password here",
};
export default function Page() {
  return <ForgotPasswordForm />;
}
