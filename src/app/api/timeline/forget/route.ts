import { NextResponse } from "next/server";
import { forgetMemory } from "@/services/timeline/replay.service";

export async function POST(req: Request) {
  try {
    const { memoryId } = await req.json();
    if (!memoryId)
      return NextResponse.json({ error: "Missing memoryId" }, { status: 400 });

    const success = await forgetMemory(memoryId);
    if (!success)
      return NextResponse.json(
        { error: "Failed to forget memory" },
        { status: 400 },
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Forget error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
