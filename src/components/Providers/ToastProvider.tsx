"use client";
import { Toaster } from "react-hot-toast";

export const ToastProviderUI = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          color: "black",
          backgroundColor: "white",
          width: "100x",
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: "600",
          zIndex: 999999,
        },
      }}
    ></Toaster>
  );
};
