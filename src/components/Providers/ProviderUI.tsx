"use client";
import { ThemeProviderUI } from "./ThemeProviderUI";
import { ToastProviderUI } from "./ToastProvider";
import { WalletProviderUI } from "./WalletProviderUI";

export const ProviderUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProviderUI>
      <ToastProviderUI />
      <WalletProviderUI>{children}</WalletProviderUI>
    </ThemeProviderUI>
  );
};
