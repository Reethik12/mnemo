import { NextRequest, NextResponse } from "next/server";
import { RealtimeServer } from "@/lib/realtime/server";
import { type PresenceUser } from "@/lib/realtime/types";

export async function POST(req: NextRequest) {
  try {
    const { workspaceId, presence } = await req.json();

    if (!workspaceId || !presence) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const presenceUser: PresenceUser = {
      userId: presence.userId,
      name: presence.name,
      avatar: presence.avatar || null,
      currentPage: presence.currentPage || "/",
      editingStatus: presence.editingStatus || "idle",
      lastActive: new Date().toISOString(),
      isIdle: presence.isIdle || false,
    };

    RealtimeServer.updatePresence(workspaceId, presenceUser);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Presence Update]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
