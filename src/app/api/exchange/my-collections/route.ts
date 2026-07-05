import { NextResponse } from "next/server";
import { getMyPublishedCollections } from "@/services/exchange/publish.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMyPublishedCollections();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Get my-collections error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
