import { Box, Button, Modal, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";

export const PayrollHistoryModal = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <Box>
      <Button
        sx={{
          backgroundColor: "aliceblue",
        }}
        onClick={() => setOpen(true)}
      >
        Open History
      </Button>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            padding: "10px",
            alignItems: "center",
            justifyItems: "center",
            p: "20px",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
              justifyItems: "center",
              height: "fit-content",
              width: "fit-content",
              p: "50px",
              background: "black",
              borderRadius: "1rem",
              border: "2px solid white",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={onClose}>
                <CloseIcon />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                height: "80px",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
                width: "100%",
              }}
            >
              <Typography fontWeight={"bold"}>Payroll History</Typography>
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
                  backgroundColor: "whitesmoke",
                  color: "black",
                  width: "120px",
                  textAlign: "center",
                }}
              >
                Date
              </Typography>
              <Typography>10-03-2023</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
