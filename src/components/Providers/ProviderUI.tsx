"use client";
import { ThemeProviderUI } from "./ThemeProviderUI";
import { ToastProviderUI } from "./ToastProvider";
import { WalletProviderUI } from "./WalletProviderUI";
import { AppContextProvider } from "../Context/AppContext";

export const ProviderUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProviderUI>
      <ToastProviderUI />
      <WalletProviderUI>
        <AppContextProvider>{children}</AppContextProvider>
      </WalletProviderUI>
    </ThemeProviderUI>
  );
};
