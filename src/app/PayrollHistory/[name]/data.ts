export type PayrollTransactionIndividual = {
  id: number;
  txId: string;
  date: string;
  amount: number;
  transactionType: string;
  paymentMethod: string;
  taxDeductions: number;
  netAmount: number;
  hoursWorked: number;
  overtimeHours: number;
  deductions: number;
  bonusesAllowances: number;
};

export const PayrollTransactionHeaders = [
  "ID",
  "Tx ID",
  "Date",
  "Amount",
  "Transaction Type",
  "Payment Method",
  "Tax Deductions",
  "Net Amount",
  "Hours Worked",
  "Overtime Hours",
  "Deductions",
  "Bonuses & Allowances",
];

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generatePayrollData = (): PayrollTransactionIndividual[] => {
  const payrollData: PayrollTransactionIndividual[] = [];

  for (let i = 1; i <= 10; i++) {
    const transaction: PayrollTransactionIndividual = {
      id: i,
      txId: `TX${generateRandomNumber(1000, 9999)}`,
      date: `2023-01-${i < 10 ? "0" + i : i}`,
      amount: generateRandomNumber(4000, 8000),
      transactionType: i % 2 === 0 ? "Salary" : "Bonus",
      paymentMethod: i % 2 === 0 ? "Direct Deposit" : "Check",
      taxDeductions: generateRandomNumber(50, 200),
      netAmount: generateRandomNumber(3500, 7500),
      hoursWorked: generateRandomNumber(160, 200),
      overtimeHours: generateRandomNumber(10, 20),
      deductions: generateRandomNumber(20, 100),
      bonusesAllowances: generateRandomNumber(50, 300),
    };

    payrollData.push(transaction);
  }

  return payrollData;
};
