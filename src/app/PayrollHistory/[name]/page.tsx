"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PayrollTransactionIndividual, generatePayrollData } from "./data";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "next/navigation";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "txId", headerName: "Transaction ID", width: 150 },
  { field: "date", headerName: "Date", width: 140 },
  { field: "amount", headerName: "Amount", width: 140 },
  { field: "transactionType", headerName: "Transaction Type", width: 200 },
  { field: "paymentMethod", headerName: "Payment Method", width: 200 },
  { field: "taxDeductions", headerName: "Tax Deductions", width: 150 },
  { field: "netAmount", headerName: "Net Amount", width: 140 },
  { field: "hoursWorked", headerName: "Hours Worked", width: 100 },
  { field: "overtimeHours", headerName: "Overtime Hours", width: 100 },
  { field: "deductions", headerName: "Deductions", width: 150 },
  {
    field: "bonusesAllowances",
    headerName: "Bonuses & Allowances",
    width: 200,
  },
];

const PayrollHistory = () => {
  const [history, setHistory] = useState<PayrollTransactionIndividual[]>([]);

  const params = useParams();
  const { name } = params;

  useEffect(() => {
    const data = generatePayrollData();
    if (data) setHistory(data);
  }, []);

  if (!name) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white">
          Please select a user
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: "10px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Typography
            fontSize="20px"
            fontWeight={"bold"}
            sx={{
              backgroundColor: "aliceblue",
              color: "black",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Payroll History
          </Typography>
          <Typography fontSize="20px" fontWeight={"bold"}>
            -
          </Typography>
          <Typography
            fontSize="20px"
            fontWeight={"bold"}
            sx={{
              backgroundColor: "lightblue",
              color: "black",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "20px",
            m: "10px",
            alignItems: "center",
            gap: "20px",
            width: "90%",
          }}
        >
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
            rows={history}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PayrollHistory;
