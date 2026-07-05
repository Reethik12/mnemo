import { NextResponse } from "next/server";
import { getLivingIntelligenceData } from "@/services/living-intelligence.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLivingIntelligenceData();
    return NextResponse.json({ score: data.score, growth: data.growth });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
