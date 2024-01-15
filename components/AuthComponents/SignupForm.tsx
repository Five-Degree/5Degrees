import FormContainer from "@/components/Custom/FormComponents/FormContainer";
import FormInput from "@/components/Custom/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import inputs from "@/shared/constants/inputs.json";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useErrorHandler } from "../../contexts/ErrorHandlerContext";

export default function SignupForm() {
  const { handleError, errorAlert } = useErrorHandler();
  const { signup, sendEV } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const newRegistration = httpsCallable(fun, "newRegistration");

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (values.confirmPassword == values.password) {
      setLoading(true);
      signup(values.email, values.password)
        .then((userCred) => {
          sendEV();
        })
        .then(() => router.replace("/auth/verifyEmail"))
        .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
        .finally(() => setLoading(false));
    } else {
      handleError("Passwords dont match!");
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Typography
        variant="h1"
        fontSize={"2.25rem"}
        sx={{ color: "var(--primary)", fontWeight: "bold" }}
      >
        Sign up
      </Typography>
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
            Already have an account? <Link href={"/auth/login"}>Login</Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
