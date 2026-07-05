import { NextResponse } from "next/server";
import { getCollectionDetails } from "@/services/exchange/collection.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const data = await getCollectionDetails(id);
    if (!data)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
