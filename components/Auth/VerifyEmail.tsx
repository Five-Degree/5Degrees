"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useRouter, useSearchParams } from "next/navigation";
export default function VerifyEmail() {
  const { sendEV, logout } = useAuth();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const countdownTime = 30;
  const [countdown, setCountdown] = useState(countdownTime);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
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
      width="100%"
      position="absolute"
      className="verify-email-layout"
      top={"50%"}
      sx={{ translate: "0 -50%" }}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      gap={7}
    >
      <MarkEmailReadOutlinedIcon
        sx={{ fontSize: "120px", color: "var(--body1-color)" }}
      />
      <Typography
        variant="h1"
        fontWeight={"bold"}
        color={"var(--accent)"}
        maxWidth={"20ch"}
        textAlign={"center"}
      >
        Verify your email address.
      </Typography>
      <Stack alignItems={"center"} gap={2}>
        <Typography maxWidth={"80%"} textAlign={"center"}>
          Did not recieve a verification email? Please check your spam folder or
          resend the email.
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
        <Button
          variant="text"
          onClick={() => {
            logout();
            router.replace(
              `/auth/login${redirectTo ? "?redirectTo=" + redirectTo : ""}`
            );
          }}
        >
          Already verified your email? Click here.
        </Button>
      </Stack>
    </Stack>
  );
}
