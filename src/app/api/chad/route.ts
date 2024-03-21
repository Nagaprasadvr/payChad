import { NextRequest, NextResponse } from "next/server";
import { Chad as ChadDataType } from "@/app/Chads/data";
import Chad from "@/app/models/Chad";

export async function GET(req: NextRequest) {
  try {
    const chads = await Chad.find();
    return NextResponse.json({
      status: "success",
      chads,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch chads",
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const chadData = body.chadData as ChadDataType;
  try {
    const chad = await Chad.findOne({
      pubkey: chadData.pubkey,
    });
    if (chad) {
      return NextResponse.json({
        status: "error",
        message: "Chad already exists",
      });
    }
    await Chad.create(chadData);
    return NextResponse.json({
      status: "success",
      message: "Chad added successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to add chad",
    });
  }
}
