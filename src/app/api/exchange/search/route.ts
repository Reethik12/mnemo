import { NextResponse } from "next/server";
import { searchCollections } from "@/services/exchange/search.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query)
      return NextResponse.json(
        { error: "Missing query parameter" },
        { status: 400 },
      );

    const results = await searchCollections(query);
    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
