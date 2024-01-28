"use client";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Box } from "@mui/material";
import { ProviderUI } from "@/components/Providers/ProviderUI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderUI>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />

            <Box>{children}</Box>
          </Box>
        </ProviderUI>
      </body>
    </html>
  );
}
