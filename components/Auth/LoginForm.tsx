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
import google from "@/public/Logos/Google.svg";
import Image from "next/image";
import useErrorHandler from "@/shared/hooks/useErrorHandler";

export default function LoginForm() {
  const { handleError, errorAlert } = useErrorHandler();
  const { login, googleAccess } = useAuth();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    login(values.email, values.password)
      .then(() => {
        router.replace(redirectTo ?? "/");
        setLoading(false);
      })
      .catch((error: any) => {
        handleError(GetRefinedFirebaseError(error));
        setLoading(false);
      });
  }
  function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleAccess()
      .then(() => {
        router.replace(redirectTo ?? "/");
        setLoading(false);
      })
      .catch((error: any) => {
        handleError(GetRefinedFirebaseError(error));
        setLoading(false);
      });
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Typography variant="h1" fontSize={"2.25em"}>
        Login
      </Typography>
      <FormContainer onSubmit={handleGoogleLogin}>
        <Button
          type="submit"
          disabled={loading}
          endIcon={<Image src={google} alt="google logo" />}
          variant="contained"
          fullWidth
        >
          Log in with Google&nbsp;
        </Button>
      </FormContainer>
      <Divider flexItem>or</Divider>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={1.25}
        width={"100%"}
      >
        <FormContainer onSubmit={handleEmailLogin}>
          {inputs.login.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Stack alignItems={"flex-end"} width={"100%"}>
            <Link href="/auth/forgotPassword">
              <Typography fontSize={".875em"} lineHeight={1}>
                Forgot password?
              </Typography>
            </Link>
          </Stack>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </FormContainer>
        <Stack alignItems={"center"}>
          {errorAlert}
          <Typography>
            Dont have an account?{" "}
            <Link
              href={`/auth/signup${
                redirectTo ? "?redirectTo=" + redirectTo : ""
              }`}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
