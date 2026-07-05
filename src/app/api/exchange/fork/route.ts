import { NextResponse } from "next/server";
import { forkCollection } from "@/services/exchange/fork.service";

export async function POST(req: Request) {
  try {
    const { collectionId } = await req.json();
    if (!collectionId)
      return NextResponse.json(
        { error: "Missing collectionId" },
        { status: 400 },
      );

    const result = await forkCollection(collectionId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
