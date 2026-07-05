import { NextResponse } from "next/server";
import { restoreMemoryVersion } from "@/services/timeline/replay.service";

export async function POST(req: Request) {
  try {
    const { memoryId, versionId } = await req.json();
    if (!memoryId || !versionId)
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );

    const success = await restoreMemoryVersion(memoryId, versionId);
    if (!success)
      return NextResponse.json(
        { error: "Failed to restore version" },
        { status: 400 },
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Restore error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
