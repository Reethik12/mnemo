import { NextRequest } from "next/server";
import { RealtimeServer } from "@/lib/realtime/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const userId = searchParams.get("userId") || "temp-user-id";

  if (!workspaceId) {
    return new Response("workspaceId is required", { status: 400 });
  }

  let disconnect: () => void = () => {};

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Broadcaster listener
      disconnect = RealtimeServer.register(workspaceId, userId, (event) => {
        try {
          const payload = `data: ${JSON.stringify(event)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (err) {
          console.error("[Realtime SSE Stream] Failed to enqueue event", err);
        }
      });

      // Keepalive heartbeat sent every 15 seconds
      const heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch (err) {
          console.warn("[Realtime SSE Stream] Heartbeat failed", err);
        }
      }, 15000);

      // Save timer cleanup inside req cancel/disconnect handlers
      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeatTimer);
        disconnect();
        try {
          controller.close();
        } catch {}
      });
    },
    cancel() {
      disconnect();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
