"use client";
import FormContainer from "@/components/Custom/FormComponents/FormContainer";
import FormInput, {
  FormCredentials,
} from "@/components/Custom/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import inputs from "@/shared/constants/inputs";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";

import { Button, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useErrorHandler } from "../../contexts/ErrorHandlerContext";
import google from "@/public/Logos/Google.svg";
import Image from "next/image";

export default function SignupForm() {
  const { handleError, errorAlert } = useErrorHandler();
  const { signup, sendEV, googleAccess } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const newRegistration = httpsCallable(fun, "newRegistration");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (values.confirmPassword == values.password) {
      setLoading(true);
      signup(values.email, values.password)
        .then((userCred) => {
          sendEV();
        })
        .then(() =>
          router.replace(
            redirectTo
              ? `/verifyEmail?redirectTo=${redirectTo}`
              : "/verifyEmail"
          )
        )
        .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
        .finally(() => setLoading(false));
    } else {
      handleError("Passwords dont match!");
    }
  }

  function handleGoogleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleAccess()
      .then(() => router.replace(redirectTo ?? "/"))
      .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
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
        sx={{ color: "var(--primary-text)", fontWeight: "bold" }}
      >
        Sign up
      </Typography>
      <FormContainer onSubmit={handleGoogleSignup}>
        <Button
          type="submit"
          disabled={loading}
          endIcon={<Image src={google} alt="google logo" />}
          variant="contained"
          fullWidth
        >
          Sign up with Google&nbsp;
        </Button>
      </FormContainer>
      <Divider flexItem>or</Divider>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap="1.25rem"
        width={"100%"}
      >
        <FormContainer onSubmit={handleSignUp}>
          {inputs.signup.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>
        </FormContainer>

        <Stack alignItems={"center"}>
          {errorAlert}
          <Typography>
            Already have an account?{" "}
            <Link
              href={`/auth/login${
                redirectTo ? "?redirectTo=" + redirectTo : ""
              }`}
            >
              Login
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
