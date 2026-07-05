import { NextResponse } from "next/server";
import { mnemoAIService } from "@/services/mnemo-ai/mnemo-ai.service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const success = await mnemoAIService.markNotificationRead(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Notification not found" },
      { status: 404 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 },
    );
  }
}
