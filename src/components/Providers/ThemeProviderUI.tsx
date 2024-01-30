"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
    fontWeightRegular: 600,
    fontSize: 15,
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 9999,
          backdropFilter: "blur(5px)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          multiline: {
            fontWeight: "bold",
            fontSize: "20px",
            color: "white",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "black",
          border: "1px solid white",
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "black",
          backgroundColor: "white",
          textTransform: "none",
          fontWeight: 600,
          width: "fit-content",
          minWidth: "fit-content",
          height: "fit-content",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          justifyItems: "center",

          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
          "&:disabled": {
            backgroundColor: "white",
            color: "grey",
          },
        },
      },
    },
  },
});

export const ThemeProviderUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};
