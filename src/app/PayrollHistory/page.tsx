"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generatePeopleData } from "../Chads/data";
import toast from "react-hot-toast";

const PayrollHistoryDataPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const isNameValid = (name: string) => {
    const data = generatePeopleData();
    return Boolean(data.find((d) => d.name.toLowerCase() === name));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "fit-content",
          p: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <Typography fontWeight="bold" fontSize={"20px"} color="white">
          Please enter name
        </Typography>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>

        <Button
          sx={{
            width: "100%",
          }}
          onClick={() => {
            if (!isNameValid(name)) {
              toast.error("Name does not exits in database");
              return;
            }
            router.push(`/PayrollHistory/${name}`);
          }}
        >
          Submit
        </Button>
      </Box> */}
      <Typography>Payroll History</Typography>
    </Box>
  );
};

export default PayrollHistoryDataPage;
