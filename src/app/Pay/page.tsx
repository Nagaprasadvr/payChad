"use client";
import { Box, Button, Input, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useMemo } from "react";
import { generatePeopleData } from "../Chads/data";
import { DataGrid, GridColDef, GridKeyValue } from "@mui/x-data-grid";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { SkeletonRows, getRow, minimizePubkey } from "@/utils/helpers";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingIcon } from "@/components/LoadingIcon";

interface Data {
  id: number;
  name: string;
  pubkey: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      const thisRow: Record<string, GridKeyValue> = getRow(params);
      return (
        <Typography
          fontSize={"15px"}
          sx={{
            backgroundColor: "lightcyan",
            color: "black",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          {thisRow["name"]}
        </Typography>
      );
    },
  },
  {
    field: "pubkey",
    headerName: "Wallet Address",
    width: 200,
    renderCell: (params) => {
      const thisRow: Record<string, GridKeyValue> = getRow(params);
      return (
        <Tooltip title={thisRow["pubkey"] as string}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={"15px"}
              sx={{
                backgroundColor: "lightblue",
                color: "black",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {minimizePubkey(thisRow["pubkey"] as string)}
            </Typography>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CopyIcon
                sx={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </Button>
          </Box>
        </Tooltip>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation();
      };
      const thisRow: Record<string, GridKeyValue> = getRow(params);
      return (
        <PaymentModal
          onClick={onClick}
          name={thisRow["name"] as string}
          payee_pubkey={thisRow["pubkey"] as string}
        />
      );
    },
  },
];

const Pay = () => {
  const staticData = generatePeopleData().map((d) => ({
    id: d.id,
    name: d.name,
    pubkey: d.pubkey,
  }));
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/chad");
        const data = await res.json();
        setData(data.chads);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const dataToDisplay = useMemo(() => {
    if (showSearch && searchString !== "") {
      const filteredData = data.filter((d) =>
        d.name.toLowerCase().includes(searchString.toLowerCase())
      );
      return filteredData;
    }
    return data;
  }, [showSearch, searchString, data]);

  return (
    <Box
      className="center"
      sx={{
        gap: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>Pay Chad</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Search Chad</Typography>
        {showSearch ? (
          <>
            <Input
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              sx={{
                color: "white",
                borderBottomColor: "white",
              }}
            ></Input>

            <Button
              onClick={() => {
                setSearchString("");
                setShowSearch(!showSearch);
              }}
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <SearchIcon />
            </Button>
          </>
        )}
      </Box>

      <Box
        sx={{
          padding: "20px",
          m: "10px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!loading && data.length > 0 ? (
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
              borderCollapse: "white",
            }}
            rows={dataToDisplay}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        ) : !loading && data.length === 0 ? (
          <Typography>No chads found</Typography>
        ) : (
          <SkeletonRows rows={12} />
        )}
      </Box>
    </Box>
  );
};

export default Pay;
