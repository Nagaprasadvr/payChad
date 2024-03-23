"use client";
import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PayrollTransaction, generateRandomTransaction } from "./data";
import { SkeletonRows, getRow, reduceSignature } from "@/utils/helpers";
import { paymentTypeColorMap, sourceColorMap, tokenColorMap } from "./helpers";
import { TokenIcons } from "@/utils/constants";

const PayrollHistoryDataPage = () => {
  const [transactions, setTransactions] = useState<PayrollTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        const res = await fetch("/api/payrollTx", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resJson = await res.json();
        if (resJson.status === "success") {
          setTransactions(resJson.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "txId",
      headerName: "Transaction ID",
      width: 150,
      renderCell: (params) => {
        const row = getRow(params);
        return (
          <Tooltip title={row["txId"]}>
            <Typography>{reduceSignature(row["txId"] as string)}</Typography>
          </Tooltip>
        );
      },
    },
    { field: "sentTo", headerName: "Sent To", width: 150 },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
      renderCell: (params) => {
        const row = getRow(params);
        return (
          <Typography>
            {row["amount"].toLocaleString("en", {
              maximumFractionDigits: 9,
            })}
          </Typography>
        );
      },
    },
    {
      field: "tokenName",
      headerName: "Token",
      width: 140,
      renderCell: (params) => {
        const row = getRow(params);
        const token = row["tokenName"] as string;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {TokenIcons[token as keyof typeof TokenIcons]}
            <Typography>{token}</Typography>
          </Box>
        );
      },
    },
    {
      field: "source",
      headerName: "Source",
      width: 140,
      renderCell: (params) => {
        const row = getRow(params);
        const source = row["source"] as string;
        return (
          <Typography
            sx={{
              backgroundColor:
                sourceColorMap[source as keyof typeof sourceColorMap],
              color: "black",
              padding: "3px",
              borderRadius: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {source}
          </Typography>
        );
      },
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      width: 200,
      renderCell: (params) => {
        const row = getRow(params);
        const paymentType = row["paymentType"] as string;
        return (
          <Typography
            sx={{
              backgroundColor:
                paymentTypeColorMap[
                  paymentType as keyof typeof paymentTypeColorMap
                ],
              color: "black",
              padding: "3px",
              borderRadius: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {paymentType}
          </Typography>
        );
      },
    },
    { field: "date", headerName: "Date", width: 140 },
    { field: "time", headerName: "Time", width: 140 },
    { field: "status", headerName: "Status", width: 140 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Box>
        <Typography>Payroll History</Typography>
      </Box>
      <Box
        sx={{
          padding: "20px",
          m: "10px",
          alignItems: "center",
          gap: "20px",
          width: "90%",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <SkeletonRows rows={10} />
        ) : transactions.length > 0 ? (
          <DataGrid
            sx={{
              ".MuiDataGrid-cell": {
                color: "whitesmoke",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
              ".css-t89xny-MuiDataGrid-columnHeaderTitle": {
                color: "whitesmoke",
                fontWeight: "bold",
              },
            }}
            rows={transactions}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        ) : (
          <Typography>No transactions found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PayrollHistoryDataPage;
