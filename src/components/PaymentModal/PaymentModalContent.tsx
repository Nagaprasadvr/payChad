import { CHARCOAL } from "@/utils/constants";
import { minimizePubkey } from "@/utils/helpers";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { useState, useMemo, useEffect, forwardRef } from "react";
import toast from "react-hot-toast";
import * as solana from "@solana/web3.js";
import CloseIcon from "@mui/icons-material/Close";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";

import React from "react";

interface PaymentModalProps {
  handleClose: () => void;
  name: string;
  payee_pubkey: string;
}

export const TokenIcons = {
  SOL: <Image src="/solana-sol.png" alt="SOL" width={20} height={20} />,
  BTC: (
    <Image src="/bitcoin-cryptocurrency.svg" alt="BTC" width={20} height={20} />
  ),
  ETH: (
    <Image
      src="/ethereum-cryptocurrency.svg"
      alt="ETH"
      width={20}
      height={20}
    />
  ),
  USDC: (
    <Image
      src="/usd-coin-cryptocurrency.svg"
      alt="USDC"
      width={20}
      height={20}
    />
  ),
};

export const PaymentModalContent = React.forwardRef(
  function PaymentModalContent(
    props: PaymentModalProps,
    ref: React.Ref<HTMLDivElement>
  ) {
    const [token, setToken] = useState<string>("SOL");
    const { handleClose, name, payee_pubkey } = props;
    const [solBalance, setSolBalance] = useState<number | undefined>(undefined);
    const conn = useMemo(
      () => new solana.Connection(solana.clusterApiUrl("devnet")),
      []
    );
    const { publicKey, connected, signTransaction, sendTransaction } =
      useWallet();

    const handleChangeToken = (e: any) => {
      setToken(e.target.value);
    };
    useEffect(() => {
      if (!connected) return;
      if (publicKey !== null) {
        conn.getBalance(publicKey).then((res) => {
          console.log("res: ", res);
          setSolBalance(res / solana.LAMPORTS_PER_SOL);
        });
      }
    }, [conn, connected, publicKey]);

    const [tab, setTab] = useState<"web3" | "web2">("web3");
    console.log("tab: ", tab);

    const [amount, setAmount] = useState<number | undefined>(undefined);
    const handleSend = async () => {
      try {
        if (!conn) return;
        if (amount === undefined) {
          toast.error("Please enter an amount");
          return;
        }

        if (!connected || !publicKey) {
          toast.error("Please connect your wallet");
          return;
        }
        const ix = solana.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new solana.PublicKey(payee_pubkey),
          lamports: amount * solana.LAMPORTS_PER_SOL,
        });
        if (!signTransaction || !sendTransaction) return;

        const tx = new solana.Transaction().add(ix);
        const recentBlockhash = await conn.getLatestBlockhash();
        tx.recentBlockhash = recentBlockhash.blockhash;
        tx.feePayer = publicKey;

        const sig = await sendTransaction(tx, conn);

        toast.success("Transaction sent with signature:" + sig);
      } catch (e) {
        console.log("catch");
        toast.error("Transaction failed with error:" + e);
      }
    };

    const handleTabChange = (type: "web3" | "web2") => {
      setTab(type);
    };

    const handleChange = (e: any) => {
      setAmount(e.target.value);
    };
    return (
      <Box
        ref={ref}
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
            height: "fit-content",
            width: "35vw",
            p: "20px",
            flexDirection: "column",
            display: "flex",
            borderRadius: "10px",
            border: "2px solid white",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
              width: "90%",
              mt: "20px",
            }}
          >
            <Typography sx={{ fontSize: "20px" }}>Payment Modal</Typography>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              sx={{
                fontWeight: "bold",
                color: tab === "web3" ? "white" : CHARCOAL,
                cursor: "pointer",
                backgroundColor: "transparent",
                borderBottom:
                  tab === "web3" ? "1px solid white" : "1px solid black",
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
              onClick={() => {
                handleTabChange("web3");
              }}
            >
              Web3
            </Button>
            <Button
              sx={{
                fontWeight: "bold",
                color: tab === "web2" ? "white" : CHARCOAL,
                cursor: "pointer",
                backgroundColor: "transparent",
                borderBottom:
                  tab === "web2" ? "1px solid white" : "1px solid black",
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
              onClick={() => {
                handleTabChange("web2");
              }}
            >
              Web2
            </Button>
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "40px",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "lightblue",
                color: "black",
                padding: "8px",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Pay : {name}
            </Typography>
            <Typography
              sx={{
                backgroundColor: "lightsalmon",
                color: "black",
                p: "8px",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Pubkey : {minimizePubkey(payee_pubkey)}
            </Typography>
            <Typography
              sx={{
                backgroundColor: "lightgreen",
                color: "black",
                p: "8px",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Balance : {solBalance ? solBalance : "Loading..."}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "50%",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Token</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Token"
                    value={token}
                    onChange={handleChangeToken}
                    fullWidth
                    startAdornment={
                      TokenIcons[token as keyof typeof TokenIcons]
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <MenuItem value={"SOL"}>SOL</MenuItem>
                    <MenuItem value={"BTC"}>BTC</MenuItem>
                    <MenuItem value={"ETH"}>ETH</MenuItem>
                    <MenuItem value={"USDC"}>USDC</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="note BTC,ETH etc are wrapped tokens">
                  <InfoIcon
                    sx={{
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Button
            sx={{
              width: "fit-content",
              mb: "20px",
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  }
);
