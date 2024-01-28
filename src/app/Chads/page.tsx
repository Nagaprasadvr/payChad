"use client";
import { Box, Button, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { Person, generatePeopleData } from "./data";
import { PayrollHistoryModal } from "@/components/PayrollHistory";

const Chads = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  useEffect(() => {
    const data = generatePeopleData();
    if (data) setPeopleData(data);
  }, []);
  return (
    <>
      <Box
        className="center"
        sx={{
          mb: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
          }}
        >
          Chads
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          mb: "20px",
          width: "100%",
        }}
      >
        {peopleData.map((person) => (
          <Box
            key={person.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid aliceblue",
              width: "80%",
              borderRadius: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "20px",
                width: "100%",
                gap: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "2px",
                    borderRadius: "10px",
                    backgroundColor: "whitesmoke",
                    color: "black",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  Name
                </Typography>
                <Typography>{person.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "2px",
                    borderRadius: "10px",
                    backgroundColor: "coral",
                    color: "black",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  Emp Code
                </Typography>

                <Typography>{person.employeeCode}</Typography>
                <Button
                  variant="text"
                  sx={{
                    width: "fit-content",
                    height: "fit-content",
                    background: "transparent",
                    "&:hover": {
                      background: "white",
                    },
                    color: "white",
                  }}
                >
                  <ContentCopyIcon
                    sx={{
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "2px",
                    borderRadius: "10px",
                    backgroundColor: "lightblue",
                    color: "black",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  Salary
                </Typography>
                <Typography>{person.salary}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "2px",
                    borderRadius: "10px",
                    backgroundColor: "purple",
                    color: "black",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  Designation
                </Typography>
                <Typography>{person.designation}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "2px",
                    borderRadius: "10px",
                    backgroundColor: "yellow",
                    color: "black",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  Team
                </Typography>
                <Typography>{person.team}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "3px",
                backgroundColor: "aliceblue",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              <PayrollHistoryModal />

              <Button
                sx={{
                  backgroundColor: "aliceblue",
                }}
              >
                Pay Chad
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Chads;
