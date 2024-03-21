"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Spinner from "@mui/icons-material/Loop";

export const LoadingIcon = () => {
  return (
    <Box
      className="loader"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        height: "100%",
        padding: "20px",
      }}
    ></Box>
  );
};
