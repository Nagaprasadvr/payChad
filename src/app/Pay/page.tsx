"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Person, generatePeopleData } from "../Chads/data";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";

interface Data {
  id: number;
  name: string;
  action: JSX.Element;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "action",
    headerName: "Action",
    renderCell: () => {
      const onClick = (e: any) => {
        e.stopPropagation();
      };
      return <PaymentModal onClick={onClick} />;
    },
  },
];

const Pay = () => {
  const staticData = generatePeopleData().map((d) => ({
    id: d.id,
    name: d.name,
    action: (
      <PaymentModal
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    ),
  }));
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState<Data[]>(staticData);

  useEffect(() => {
    const fetchData = () => {
      const filteredData = data.filter((d) =>
        d.name.toLowerCase().includes(searchString.toLowerCase())
      );
      setData(filteredData);
    };

    if (showSearch && searchString !== "") {
      fetchData();
    }
    if (showSearch == false) {
      setData(staticData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, showSearch]);

  console.log("data", data);
  console.log("loading", loading);

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
      {data.length > 0 && (
        <Box
          sx={{
            padding: "20px",
            m: "10px",
            alignItems: "center",
            gap: "20px",
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
              borderCollapse: "white",
            }}
            rows={data}
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
      )}
    </Box>
  );
};

export default Pay;
