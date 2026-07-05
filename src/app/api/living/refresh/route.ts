import { NextResponse } from "next/server";
import { triggerImprovement } from "@/services/living-intelligence.service";

export async function POST() {
  try {
    await triggerImprovement();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to trigger refresh" },
      { status: 500 },
    );
  }
}
