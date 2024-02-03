"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import { Person, PersonHeaders } from "../Chads/data";
import { personHeaderColors, validateAddChadData } from "./helpers";
import { useState } from "react";
import toast from "react-hot-toast";

const AddChads = () => {
  const [data, setData] = useState<Person>({} as Person);
  const handleInputChange = (e: any, key: string) => {
    setData({ ...data, [key]: e.target.value });
  };

  const handleAddChad = () => {
    const errors = validateAddChadData(data);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "20px",
          mt: "30px",
        }}
      >
        <Typography>*Fill out all fileds</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          p: "20px",
        }}
      >
        <Box
          sx={{
            p: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid white",
            borderRadius: "10px",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              width: "fit-content",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {PersonHeaders.map((header, idx) => (
              <Box
                key={header}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  width: "500px",
                }}
              >
                <Box
                  sx={{
                    width: "40%",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: personHeaderColors[idx],
                      borderRadius: "10px",
                      padding: "5px",
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {header.toLocaleUpperCase()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Input
                    type={
                      ["salary", "contactnumber"].includes(header.toLowerCase())
                        ? "number"
                        : "text"
                    }
                    fullWidth
                    multiline={header.toLowerCase() === "address"}
                    value={data[header]}
                    onChange={(e) => handleInputChange(e, header)}
                  ></Input>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button onClick={handleAddChad}> Add Chad</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddChads;
