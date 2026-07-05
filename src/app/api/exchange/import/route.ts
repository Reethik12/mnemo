import { NextResponse } from "next/server";
import { importCollection } from "@/services/exchange/collection.service";

export async function POST(req: Request) {
  try {
    const { collectionId } = await req.json();
    if (!collectionId)
      return NextResponse.json(
        { error: "Missing collectionId" },
        { status: 400 },
      );

    const result = await importCollection(collectionId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
