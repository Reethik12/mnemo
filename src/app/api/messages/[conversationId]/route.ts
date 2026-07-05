import { NextResponse } from "next/server";
import { MOCK_MESSAGES, addMessage } from "@/services/messages/mock-data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  try {
    const { conversationId } = await params;
    return NextResponse.json(MOCK_MESSAGES[conversationId] || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  try {
    const { conversationId } = await params;
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "user-1",
      senderName: "Current User",
      text,
      timestamp: new Date().toISOString(),
      status: "sent" as const,
    };
    addMessage(newMsg);
    return NextResponse.json(newMsg);
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
