import { Box, Skeleton } from "@mui/material";
import {
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridApi,
  GridKeyValue,
} from "@mui/x-data-grid";

export const minimizePubkey = (pubkey: string) => {
  return pubkey.slice(0, 5) + "..." + pubkey.slice(-5);
};

export const getRow = (
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) => {
  const api = params.api as GridApi;
  const thisRow: Record<string, GridKeyValue> = {};

  api
    .getAllColumns()
    .filter((c) => c.field !== "__check__" && !!c)
    .forEach(
      (c) => (thisRow[c.field] = params.api.getCellValue(params.id, c.field))
    );
  return thisRow;
};

export const toUIAmount = (amount: number, decimals: number = 9) => {
  return amount.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
};

export const reduceSignature = (sig: string) => {
  return sig.slice(0, 6) + "..." + sig.slice(sig.length - 6);
};

export const SkeletonRows = ({ rows }: { rows: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          sx={{
            borderRadius: "10px",
            width: "auto",
          }}
          key={index}
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={40}
        />
      ))}
    </Box>
  );
};

export const getTotalNumberOfDaysInAMonth = (month: number, year: number) => {
  switch (month) {
    case 0:
      return 31;
    case 1:
      return year % 4 === 0 ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 0;
  }
};

export const getExpiry = () => {
  const todaysDate = new Date(Date.now()).getDate();
  const month = new Date(Date.now()).getMonth();
  const year = new Date(Date.now()).getFullYear();
  const daysInMonth = getTotalNumberOfDaysInAMonth(month, year);
  let remainingDays = 10 - todaysDate;
  if (remainingDays < 0) {
    remainingDays = daysInMonth + remainingDays;
  } else {
    remainingDays = 10 - todaysDate;
  }
  let date = new Date();
  date.setDate(date.getDate() + remainingDays);
  date.setHours(0, 0, 0, 0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};
