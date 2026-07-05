import { NextResponse } from "next/server";
import { mergeCollections } from "@/services/exchange/merge.service";

export async function POST(req: Request) {
  try {
    const { sourceId, targetId } = await req.json();
    if (!sourceId || !targetId)
      return NextResponse.json(
        { error: "Missing sourceId or targetId" },
        { status: 400 },
      );

    const result = await mergeCollections(sourceId, targetId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
