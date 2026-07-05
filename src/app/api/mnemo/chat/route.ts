import { NextResponse } from "next/server";
import { mnemoAIService } from "@/services/mnemo-ai/mnemo-ai.service";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const reply = await mnemoAIService.chat(message);
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 },
    );
  }
}
