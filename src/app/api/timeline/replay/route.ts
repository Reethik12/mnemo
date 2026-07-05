import { NextResponse } from "next/server";
import { getMemoryReplay } from "@/services/timeline/replay.service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "Missing memory ID" }, { status: 400 });

    const replay = await getMemoryReplay(id);
    if (!replay)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(replay);
  } catch (error) {
    console.error("[API] Replay get error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
