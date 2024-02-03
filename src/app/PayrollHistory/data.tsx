export type PayrollTransaction = {
  id: number;
  txId: string;
  sentTo: string;
  amount: number;
  tokenName: string;
  source: string;
  paymentType: string; // Add more types as needed
  date: string;
  time: string;
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomTransaction = (): PayrollTransaction[] => {
  const transactions: PayrollTransaction[] = [];
  for (let i = 0; i < 10; i++) {
    {
      const randomAmount = generateRandomNumber(2000, 10000);
      const randomDate = `2023-${generateRandomNumber(
        1,
        12
      )}-${generateRandomNumber(1, 28)}`;
      const randomTime = `${generateRandomNumber(0, 23)}:${generateRandomNumber(
        0,
        59
      )}`;

      const random = Math.random();
      const source = generateRandomNumber(0, 1) === 0 ? "fiat" : "crypto";
      const token =
        source === "fiat"
          ? "USD"
          : random > 0.5
          ? "BTC"
          : random > 0.25
          ? "ETH"
          : "SOL";
      const tx = {
        id: i,
        txId: generateRandomNumber(100000, 999999).toString(),
        sentTo: `Person ${generateRandomNumber(1, 20)}`,
        amount: randomAmount,
        tokenName: token,
        source,
        paymentType: ["salary", "bonus", "miscellaneous", "other"][
          generateRandomNumber(0, 3)
        ],
        date: randomDate,
        time: randomTime,
      };
      transactions.push(tx);
    }
  }
  return transactions;
};
