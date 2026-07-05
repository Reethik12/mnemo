import { NextResponse } from "next/server";
import { shareCollection } from "@/services/exchange/share.service";

export async function POST(req: Request) {
  try {
    const { collectionId, type } = await req.json();
    if (!collectionId || !type)
      return NextResponse.json(
        { error: "Missing collectionId or type" },
        { status: 400 },
      );

    const result = await shareCollection(collectionId, type);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
