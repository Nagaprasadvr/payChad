import Image from "next/image";
export const CHARCOAL = "#36454F";

export const TokenMints = {
  SOL: "So11111111111111111111111111111111111111111",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  BTC: "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
  ETH: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
  USD: "None",
};

export const TokenDecimals = {
  SOL: 9,
  USDC: 6,
  BTC: 8,
  ETH: 8,
  USD: 6,
};

export const HELIUS_RPC_ENDPOINT =
  "https://mainnet.helius-rpc.com/?api-key=17f7af93-4fe5-409c-b871-6a01323f3760";

export const TokenIcons = {
  SOL: <Image src="/solana-sol.png" alt="SOL" width={20} height={20} />,
  BTC: (
    <Image src="/bitcoin-cryptocurrency.svg" alt="BTC" width={20} height={20} />
  ),
  ETH: (
    <Image
      src="/ethereum-cryptocurrency.svg"
      alt="ETH"
      width={20}
      height={20}
    />
  ),
  USDC: (
    <Image
      src="/usd-coin-cryptocurrency.svg"
      alt="USDC"
      width={20}
      height={20}
    />
  ),
  USD: (
    <Image
      src="/usd-coin-cryptocurrency.svg"
      alt="USD"
      width={20}
      height={20}
    />
  ),
};

export const secondsInADay = 86400;
