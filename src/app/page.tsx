"use client";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        className="center"
        sx={{
          mt: "30px",
          height: "100%",
        }}
      >
        <Typography fontSize="30px">
          PayChad - A Solana Payroll Management System
        </Typography>
      </Box>
    </>
  );
}
