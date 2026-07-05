import { NextResponse } from "next/server";
import { getLivingIntelligenceData } from "@/services/living-intelligence.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLivingIntelligenceData();
    return NextResponse.json({
      insights: data.insights,
      patterns: data.patterns,
      topics: data.trendingTopics,
      relationships: data.relationships,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
