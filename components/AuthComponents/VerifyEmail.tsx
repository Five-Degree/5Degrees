import { useAuth } from "@/contexts/AuthContext";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { sendEV } = useAuth();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const countdownTime = 30;
  const [countdown, setCountdown] = useState(countdownTime);
  const { logout } = useAuth();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isButtonDisabled) {
      // Start the countdown when the button is disabled
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isButtonDisabled]);

  function handleResend(e: React.SyntheticEvent) {
    setButtonDisabled(true);
    sendEV();
    setTimeout(() => {
      setButtonDisabled(false);
      setCountdown(countdownTime); // Reset the countdown
    }, countdownTime * 1000);
  }
  return (
    <Stack
      height={"100vh"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Typography
        variant="h2"
        fontWeight={"bold"}
        color={"var(--primary)"}
        maxWidth={"20ch"}
      >
        Verify your email address.
      </Typography>
      <Stack alignItems={"center"} gap={2}>
        <Typography variant="body2" maxWidth={"80%"} textAlign={"center"}>
          Have you not received a verification email? Please check your spam
          folder or resend the email.
        </Typography>
        <Button
          variant="contained"
          disabled={isButtonDisabled}
          onClick={handleResend}
        >
          Resend email
        </Button>
        {isButtonDisabled && (
          <Typography>Resend email in {countdown} seconds</Typography>
        )}
        <Button variant="text">Already verified email? Click here.</Button>
      </Stack>
    </Stack>
  );
}
