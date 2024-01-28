"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Wallet } from "./Wallet";

const NavLinks = [
  { name: "Home", link: "/" },
  { name: "Chads", link: "/Chads" },
];

export const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "60px",
        zIndex: 1000,
        position: "sticky",
        top: 0,
        backgroundColor: "transparent",
        backdropFilter: "blur(30px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap="10px"
          ml="20px"
          width={"20%"}
          minWidth={"250px"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{
            cursor: "pointer",
          }}
        >
          <Image src="/salary-envelope.png" height={40} width={40} alt="logo" />
          <Typography fontSize={"20px"}>PayChad</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            paddingRight: "20px",
          }}
        >
          {NavLinks.map((nav) => (
            <Link
              href={nav.link}
              key={nav.name}
              style={{
                width: "auto",
              }}
            >
              <Button
                sx={{
                  color: "#929292",
                  backgroundColor: "black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {nav.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          mr: "20px",
          ml: "20px",
        }}
      >
        <Wallet />
      </Box>
    </nav>
  );
};
