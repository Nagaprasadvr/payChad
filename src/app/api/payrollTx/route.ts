import { NextRequest, NextResponse } from "next/server";
import PayrollTransactionDB from "@/app/models/PayrollTransaction";
import { PayrollTransaction as PayrollTransactionDataType } from "@/app/PayrollHistory/data";

export async function GET(req: NextRequest) {
  try {
    const transactions = await PayrollTransactionDB.find();
    return NextResponse.json({
      status: "success",
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch transactions",
      data: [],
    });
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const txData: PayrollTransactionDataType = body.txData;

  try {
    await PayrollTransactionDB.create(txData);
    return NextResponse.json({
      status: "success",
      message: "Transaction added successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to add transaction",
    });
  }
}
