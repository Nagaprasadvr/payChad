"use client";
import { secondsInADay } from "@/utils/constants";
import { getExpiry, getTotalNumberOfDaysInAMonth } from "@/utils/helpers";
import { Box, Skeleton, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import { useTimer } from "react-timer-hook";

export default function Home() {
  const wallet = useWallet();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiry(),
    onExpire: () => console.warn("onExpire"),
  });

  const [displayTimer, setDisplayTimer] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayTimer(true);
    }, 1000);
  });

  return (
    <>
      <Box
        className="center"
        sx={{
          mt: "30px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box>
          <Typography fontSize="30px">
            PayChad - A Solana Payroll Management System
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Typography fontSize={23}>Next Pay due in </Typography>
          <Box
            sx={{
              display: "flex",
              width: "fit-content",
              height: "50px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayTimer ? (
              <Typography fontSize={23} color="skyblue">
                {days} days : {hours} hours : {minutes} minutes : {seconds}{" "}
                seconds
              </Typography>
            ) : (
              <Skeleton
                variant="rectangular"
                width={600}
                height={50}
                sx={{
                  borderRadius: "10px",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "80%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography fontSize={23}>Company Name : X</Typography>
          <Typography fontSize={23}>Company Address : Y</Typography>
          <Typography fontSize={23}>
            Connected Wallet Address : {wallet?.publicKey?.toBase58()}
          </Typography>
          <Typography fontSize={23}>Total Employess : 102</Typography>

          <Typography fontSize={23}>
            Pay Cycle : 10th - 10th of every month
          </Typography>

          <Typography fontSize={23}>
            Total Money Spent on Payroll : 100000 SOL
          </Typography>
        </Box>
      </Box>
    </>
  );
}
