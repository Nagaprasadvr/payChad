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
          width: "fit-content",
          fontFamily: '"GeneralSans",sans-serif',
          fontWeight: "600",
          zIndex: 999999,
        },
      }}
    ></Toaster>
  );
};
