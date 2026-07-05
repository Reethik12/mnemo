import { NextResponse } from "next/server";
import { askEvolutionAssistant } from "@/services/timeline/assistant.service";

export async function POST(req: Request) {
  try {
    const { memoryId, query } = await req.json();
    if (!memoryId || !query)
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );

    const response = await askEvolutionAssistant(memoryId, query);
    return NextResponse.json(response);
  } catch (error) {
    console.error("[API] Assistant error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
