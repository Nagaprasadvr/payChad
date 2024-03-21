"use client";
import {
  Box,
  Button,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Chad, PersonHeaders } from "../Chads/data";
import { personHeaderColors, validateAddChadData } from "./helpers";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const AddChads = () => {
  const { breakpoints } = useTheme();
  const smallScreen = useMediaQuery(breakpoints.down("lg"));
  console.log("smallScreen", smallScreen);
  const [data, setData] = useState<Chad>({} as Chad);
  const handleInputChange = (e: any, key: string) => {
    setData({ ...data, [key]: e.target.value });
  };

  const grids = useMemo(() => {
    if (smallScreen) {
      return "1fr";
    } else {
      return "repeat(2, 1fr)";
    }
  }, [smallScreen]);
  const handleAddChad = () => {
    const errors = validateAddChadData(data);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const id = toast.loading("Adding Chad...");
    // Add Chad to the database
    const url = "/api/chad";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chadData: data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.dismiss(id);
          toast.success(res.message);
        } else {
          toast.dismiss(id);
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.dismiss(id);
        toast.error("Failed to add chad");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        width: "100%",
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
            width: smallScreen ? "70vw" : "80vw",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: grids,
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",

              width: "100%",
            }}
          >
            {PersonHeaders.map((header, idx) => (
              <Box
                key={header}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "40%" },
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
                    value={data[header as keyof Chad]}
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
