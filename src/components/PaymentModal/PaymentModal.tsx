import { Box, Button, Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { PaymentModalContent } from "./PaymentModalContent";
import DialogContent from "@mui/material/DialogContent";

interface PaymentModalProps {
  onClick: (e: any) => void;
  name: string;
  payee_pubkey: string;
}

export const PaymentModal = ({
  onClick,
  name,
  payee_pubkey,
}: PaymentModalProps) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PaymentModalContentRef = (
    <PaymentModalContent
      handleClose={handleClose}
      name={name}
      payee_pubkey={payee_pubkey}
    />
  );

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
        ref={modalRef}
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal"
        aria-describedby="modal-modal-description"
      >
        <DialogContent
          sx={{
            overflow: "hidden",
          }}
        >
          {PaymentModalContentRef}
        </DialogContent>
      </Modal>
    </Box>
  );
};
function useTheme(): { breakpoints: any } {
  throw new Error("Function not implemented.");
}

function useMediaQuery(arg0: any) {
  throw new Error("Function not implemented.");
}
