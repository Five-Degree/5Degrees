"use client";
import FormContainer from "@/components/Custom/FormComponents/FormContainer";
import FormInput, {
  FormCredentials,
} from "@/components/Custom/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import inputs from "@/shared/constants/inputs.json";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useState } from "react";
import { useErrorHandler } from "../../contexts/ErrorHandlerContext";

export default function ForgotPasswordForm() {
  const { handleError, errorAlert } = useErrorHandler();
  const { resetPass } = useAuth();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  function handleResetPass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetPass(values.email)
      .then(() => setEmailSent(true))
      .catch((error: any) => {
        handleError(GetRefinedFirebaseError(error));
      })
      .finally(() => setLoading(false));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Typography
        variant="h1"
        fontSize={"2.25rem"}
        sx={{ color: "var(--black)", fontWeight: "bold" }}
      >
        Reset Password
      </Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap="1.25rem"
        width={"100%"}
      >
        <FormContainer onSubmit={handleResetPass} sx={{ gap: "2.5rem" }}>
          {inputs.resetPass.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <Button
            type="submit"
            disabled={loading || emailSent}
            variant="contained"
            fullWidth
          >
            Send reset email
          </Button>
        </FormContainer>
        <Stack alignItems={"center"}>
          {emailSent && (
            <Typography textAlign={"center"}>
              Please check your email for the password reset link!
            </Typography>
          )}
          {errorAlert}
          <Typography>
            <Link href={"/auth/login"}>Go back to Login!</Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
