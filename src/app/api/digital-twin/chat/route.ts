import { NextResponse } from "next/server";
import { digitalTwinService } from "@/services/digital-twin/digital-twin.service";

export async function POST(req: Request) {
  try {
    const { message, isTeam } = await req.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const reply = await digitalTwinService.chat(message, isTeam);
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 },
    );
  }
}
