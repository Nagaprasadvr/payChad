export type TokensInfo = {
  SOL: {
    decimals: number;
    mint: string;
  };
  USDC: {
    decimals: number;
    mint: string;
  };
  BTC: {
    decimals: number;
    mint: string;
  };
  ETH: {
    decimals: number;
    mint: string;
  };
};

export type TokensBalance = {
  SOL: {
    balance: number;
  };
  USDC: {
    balance: number;
  };
  BTC: {
    balance: number;
  };
  ETH: {
    balance: number;
  };
};

export type Chad = {
  name: string;
  employeeCode: string;
  contactNumber: string;
  designation: string;
  address: string;
  pubkey: string; // Add the "pubkey" field
  salary: number;
  team: string; // Add the "team" field
};
