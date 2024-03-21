import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

import { NavLinks } from "./Navbar";
import Link from "next/link";
import { CHARCOAL } from "@/utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

export const MobDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = (link: string) => {
    router.push(link);
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 300,
        backgroundColor: "black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pt: "50px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderLeft: `0.5px solid ${CHARCOAL}`,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          width: "100%",
          p: "20px",
          borderBottom: `1px solid ${CHARCOAL}`,
        }}
      >
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Box>
      {NavLinks.map((nav) => (
        <Box
          key={nav.name}
          sx={{
            display: "flex",
            backgroundColor: "transparent",
            p: "15px",
            width: "100%",
            borderBottom: `1px solid ${CHARCOAL}`,
            "&:hover": {
              backgroundColor: CHARCOAL,
            },
          }}
          onClick={() => {
            handleOnClick(nav.link);
          }}
        >
          <Button
            sx={{
              color: nav.color,
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
                color: "white",
                backgroundColor: "transparent",
              },
            }}
          >
            {nav.name}
          </Button>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
};
