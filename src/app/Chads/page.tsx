"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useMemo, useState } from "react";
import { Person, generatePeopleData } from "./data";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { searchFilter } from "./helpers";

const Chads = () => {
  const router = useRouter();
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    const data = generatePeopleData();
    if (data) setPeopleData(data);
  }, []);

  const memoizedData = useMemo(() => {
    if (searchString !== "" && showSearch)
      return searchFilter(peopleData, searchString);

    return peopleData;
  }, [peopleData, searchString, showSearch]);

  return (
    <>
      <Box
        sx={{
          mb: "20px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
          }}
        >
          Chads
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          {showSearch ? (
            <>
              <Input
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value);
                }}
                sx={{
                  color: "white",
                  borderBottomColor: "white",
                }}
              ></Input>

              <Button
                onClick={() => {
                  setSearchString("");
                  setShowSearch(!showSearch);
                }}
              >
                <CloseIcon />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
              >
                <SearchIcon />
              </Button>
            </>
          )}
        </Box>
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
        {memoizedData.map((person) => (
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
                    color: "whitesmoke",
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
              <Button
                sx={{
                  backgroundColor: "aliceblue",
                }}
                onClick={() =>
                  router.push(`/PayrollHistory/${person.name.toLowerCase()}`)
                }
              >
                Open History
              </Button>

              <Button
                sx={{
                  backgroundColor: "aliceblue",
                }}
              >
                generate receipt
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Chads;
