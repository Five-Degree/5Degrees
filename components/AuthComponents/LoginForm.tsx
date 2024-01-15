import FormContainer from "@/components/Custom/FormComponents/FormContainer";
import FormInput from "@/components/Custom/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import inputs from "@/shared/constants/inputs.json";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useErrorHandler } from "../../contexts/ErrorHandlerContext";

export default function LoginForm() {
  const { handleError, errorAlert } = useErrorHandler();
  const { login, googleAccess } = useAuth();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    login(values.email, values.password)
      .then(() => {
        router.replace("/dashboard");
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
      <Typography
        variant="h1"
        fontSize={"2.25rem"}
        sx={{ color: "var(--black)", fontWeight: "bold" }}
      >
        Login
      </Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap="1.25rem"
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
              <Typography fontSize={".875rem"} lineHeight={1}>
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
            Dont have an account? <Link href={"/auth/signup"}>Sign up</Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
