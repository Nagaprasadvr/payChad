export const minimizePubkey = (pubkey: string) => {
  return pubkey.slice(0, 5) + "..." + pubkey.slice(-5);
};
