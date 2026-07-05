import { NextResponse } from "next/server";
import { chatWithCollection } from "@/services/exchange/chat.service";

export async function POST(req: Request) {
  try {
    const { collectionId, query } = await req.json();
    if (!collectionId || !query)
      return NextResponse.json(
        { error: "Missing collectionId or query" },
        { status: 400 },
      );

    const response = await chatWithCollection(collectionId, query);
    return NextResponse.json({ text: response });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
