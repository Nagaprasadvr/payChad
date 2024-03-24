import { HELIUS_RPC_ENDPOINT, TokenDecimals } from "@/utils/constants";
import { Connection } from "@solana/web3.js";
import { createContext, useEffect, useMemo, useState } from "react";
import * as solanaToken from "@solana/spl-token";
import * as solana from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { TokensInfo, TokensBalance } from "@/utils/types";

interface AppContextType {
  connection: Connection;
  tokensInfo: TokensInfo;
  tokensBalance: TokensBalance;
}

const tokensInfoInitialState: TokensInfo = {
  USDC: {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
  },
  SOL: {
    mint: "So11111111111111111111111111111111111111111",
    decimals: 9,
  },
  BTC: {
    mint: "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
    decimals: 8,
  },
  ETH: {
    mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    decimals: 8,
  },
};

const tokensBalanceInitialState: TokensBalance = {
  USDC: {
    balance: 0,
  },
  SOL: {
    balance: 0,
  },
  BTC: {
    balance: 0,
  },
  ETH: {
    balance: 0,
  },
};

export const AppContext = createContext<AppContextType>({
  connection: new Connection(HELIUS_RPC_ENDPOINT),
  tokensInfo: tokensInfoInitialState,
  tokensBalance: tokensBalanceInitialState,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { publicKey } = useWallet();
  const connection = useMemo(() => new Connection(HELIUS_RPC_ENDPOINT), []);
  const [tokensInfo, setTokensInfo] = useState<TokensInfo>(
    tokensInfoInitialState
  );
  const [tokensBalance, setTokensBalance] = useState<TokensBalance>(
    tokensBalanceInitialState
  );
  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!publicKey) return;
      console.log("fetching token info");
      const tokenkeys = Object.keys(tokensInfo);
      for (const key of tokenkeys) {
        try {
          if (key.toLowerCase() === "sol") {
            let bal = await connection.getBalance(publicKey);
            console.log("balance", bal);
            bal = bal / solana.LAMPORTS_PER_SOL;

            setTokensBalance((prev) => ({
              ...prev,
              [key]: {
                balance: bal,
              },
            }));
          } else {
            const associatedAddress = solanaToken.getAssociatedTokenAddressSync(
              new solana.PublicKey(
                tokensInfo[key as keyof typeof tokensInfo].mint
              ),
              publicKey
            );
            const tokenAcc = await solanaToken.getAccount(
              connection,
              associatedAddress
            );
            const bal =
              Number(tokenAcc?.amount) /
              Math.pow(10, tokensInfo[key as keyof typeof tokensInfo].decimals);
            setTokensBalance((prev) => ({
              ...prev,
              [key]: {
                balance: bal,
              },
            }));
          }
        } catch (e) {
          setTokensBalance((prev) => ({
            ...prev,
            [key]: {
              balance: 0,
            },
          }));
        }
      }
    };
    if (connection && publicKey) {
      fetchTokenInfo();
    }
  }, [connection, publicKey, tokensInfo]);

  return (
    <AppContext.Provider value={{ connection, tokensInfo, tokensBalance }}>
      {children}
    </AppContext.Provider>
  );
};
