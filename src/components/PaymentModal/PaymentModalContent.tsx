import {
  CHARCOAL,
  TokenDecimals,
  TokenIcons,
  TokenMints,
} from "@/utils/constants";
import { minimizePubkey, reduceSignature } from "@/utils/helpers";
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
import { useState, useMemo, useEffect, forwardRef, useContext } from "react";
import toast from "react-hot-toast";
import * as solana from "@solana/web3.js";
import CloseIcon from "@mui/icons-material/Close";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import * as solanaToken from "@solana/spl-token";

import React from "react";
import { AppContext } from "../Context/AppContext";
import { PayrollTransaction } from "@/app/PayrollHistory/data";

interface PaymentModalProps {
  handleClose: () => void;
  name: string;
  payee_pubkey: string;
}

export const PaymentModalContent = React.forwardRef(
  function PaymentModalContent(
    props: PaymentModalProps,
    ref: React.Ref<HTMLDivElement>
  ) {
    const [token, setToken] = useState<string>("USDC");
    const { handleClose, name, payee_pubkey } = props;
    const { connection: conn, tokensBalance } = useContext(AppContext);
    const { publicKey, connected, signTransaction, sendTransaction } =
      useWallet();

    const handleChangeToken = (e: any) => {
      setToken(e.target.value);
    };

    const [tab, setTab] = useState<"web3" | "web2">("web3");

    const tokenBalance = useMemo(() => {
      return tokensBalance[token as keyof typeof tokensBalance]?.balance ?? 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const [amount, setAmount] = useState<number | undefined>(undefined);
    const handleSend = async () => {
      const toastId = toast.loading("Transaction in progress...");
      if (Number(amount) > 0 && Number(amount) > tokenBalance) {
        toast.error("Insufficient balance");
        toast.dismiss(toastId);
        return;
      }
      try {
        if (!conn) return;
        if (amount === undefined) {
          toast.error("Please enter an amount");
          toast.dismiss(toastId);
          return;
        }

        if (!connected || !publicKey) {
          toast.dismiss(toastId);
          toast.error("Please connect your wallet");
          return;
        }
        let ixs: solana.TransactionInstruction[] = [];
        const tx = new solana.Transaction();
        if (token === "SOL") {
          const ix = solana.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new solana.PublicKey(payee_pubkey),
            lamports: amount * solana.LAMPORTS_PER_SOL,
          });
          ixs.push(ix);
        } else {
          const mint = new solana.PublicKey(
            TokenMints[token as keyof typeof TokenMints]
          );
          const receiverTokenAccount =
            solanaToken.getAssociatedTokenAddressSync(
              mint,
              new solana.PublicKey(payee_pubkey)
            );
          const senderTokenAccount = solanaToken.getAssociatedTokenAddressSync(
            mint,
            publicKey
          );
          const transferIx = solanaToken.createTransferInstruction(
            senderTokenAccount,
            receiverTokenAccount,
            publicKey,
            amount *
              Math.pow(10, TokenDecimals[token as keyof typeof TokenDecimals])
          );

          const account = await conn.getAccountInfo(receiverTokenAccount);
          if (account === null) {
            const newTokenAccCreateIx =
              solanaToken.createAssociatedTokenAccountInstruction(
                publicKey,
                receiverTokenAccount,
                new solana.PublicKey(payee_pubkey),
                mint
              );
            ixs.push(newTokenAccCreateIx);

            ixs.push(transferIx);
          } else {
            ixs.push(transferIx);
          }
        }
        const recentBlockhash = await conn.getLatestBlockhash();
        ixs.forEach((ix) => {
          tx.add(ix);
        });
        tx.recentBlockhash = recentBlockhash.blockhash;
        tx.feePayer = publicKey;
        if (!sendTransaction) return;
        const sig = await sendTransaction(tx, conn);
        toast.dismiss(toastId);
        toast.success(
          "Transaction sent with signature:" + reduceSignature(sig)
        );
        const txData: PayrollTransaction = {
          id: 1,
          txId: sig,
          sentTo: name,
          amount: amount,
          tokenName: token,
          source: tab === "web3" ? "crypto" : "fiat",
          paymentType: "salary",
          date: new Date().toDateString(),
          time: new Date().toTimeString(),
          status: "success",
        };
        const res = await fetch("/api/payrollTx", {
          method: "POST",
          body: JSON.stringify({ txData: txData }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (e) {
        toast.dismiss(toastId);
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
          {tab === "web3" ? (
            <>
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
                  Balance :
                  {tokenBalance !== undefined
                    ? tokenBalance.toLocaleString() + " " + token.toUpperCase()
                    : "Loading..."}
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
                      fullWidth
                      disabled={tokenBalance === 0}
                      error={Number(amount) > tokenBalance}
                      variant="outlined"
                      label="Amount"
                      type="number"
                      value={amount === undefined ? "" : amount}
                      onChange={handleChange}
                      helperText={
                        Number(amount) > tokenBalance
                          ? "Insufficient balance"
                          : ""
                      }
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
                      <InputLabel id="demo-simple-select-label">
                        Token
                      </InputLabel>
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

              <Tooltip title={getTooltipTitle(amount, tokenBalance)}>
                <Box
                  sx={{
                    width: "fit-content",
                    mb: "20px",
                  }}
                >
                  <Button
                    onClick={handleSend}
                    disabled={
                      Number(amount) === 0 ||
                      Number(amount) > tokenBalance ||
                      amount === undefined
                    }
                  >
                    Send
                  </Button>
                </Box>
              </Tooltip>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
                width: "90%",
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
              <Typography>Coming Soon</Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

const getTooltipTitle = (amount: number | undefined, tokenBalance: number) => {
  if (tokenBalance === 0)
    return "Possibly Token account not found, please create account first";
  if (!amount) return "Enter valid amount";
  if (amount > tokenBalance) return "Insufficient balance";
};
