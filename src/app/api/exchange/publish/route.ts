import { NextResponse } from "next/server";
import { publishCollection } from "@/services/exchange/publish.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await publishCollection(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Publish error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
