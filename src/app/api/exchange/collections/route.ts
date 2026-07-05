import { NextResponse } from "next/server";
import { getExchangeFeed } from "@/services/exchange/exchange.service";

export async function GET() {
  try {
    const data = await getExchangeFeed();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
