import {
  Box,
  Button,
  Input,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface PaymentModalProps {
  onClick: (e: any) => void;
}

export const PaymentModal = ({ onClick }: PaymentModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  return (
    <Box>
      <Button
        onClick={(e) => {
          onClick(e);
          handleOpen();
        }}
      >
        Pay
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "30px",
            p: "10px",
            mt: "100px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "black",
              height: "60vh",
              width: "50vw",
              p: "20px",
              flexDirection: "column",
              display: "flex",
              borderRadius: "10px",
              border: "2px solid white",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "40px",
                width: "80%",
                mt: "20px",
              }}
            >
              <Typography>Payment Modal</Typography>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Box>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <TextField
                variant="outlined"
                label="Amount"
                type="number"
                value={amount}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
