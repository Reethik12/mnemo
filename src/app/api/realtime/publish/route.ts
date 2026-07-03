import { NextRequest, NextResponse } from "next/server";
import { RealtimeServer } from "@/lib/realtime/server";
import { type RealtimeEvent } from "@/lib/realtime/types";

export async function POST(req: NextRequest) {
  try {
    const { workspaceId, type, payload } = await req.json();

    if (!workspaceId || !type || !payload) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const event: RealtimeEvent = {
      type,
      workspaceId,
      payload,
      timestamp: new Date().toISOString(),
    };

    // Broadcast event to active workspace clients
    RealtimeServer.broadcast(event);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Realtime Publish]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
