import { NextResponse } from "next/server";
import {
  getTimelineEvents,
  getTimelineStats,
} from "@/services/timeline/timeline.service";
import { getEvolutionData } from "@/services/timeline/evolution.service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;

    const [events, stats, evolution] = await Promise.all([
      getTimelineEvents(q),
      getTimelineStats(),
      getEvolutionData(),
    ]);

    return NextResponse.json({ events, stats, evolution });
  } catch (error) {
    console.error("[API] Timeline get error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
