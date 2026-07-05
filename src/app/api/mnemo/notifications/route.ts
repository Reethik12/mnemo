import { NextResponse } from "next/server";
import { mnemoAIService } from "@/services/mnemo-ai/mnemo-ai.service";

export async function GET() {
  try {
    const notifications = await mnemoAIService.getNotifications();
    return NextResponse.json(notifications);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}
