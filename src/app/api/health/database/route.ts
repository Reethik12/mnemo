import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    return NextResponse.json({
      status: "healthy",
      database: "connected",
      latencyMs: latency,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "unhealthy", error: (err as Error).message },
      { status: 500 },
    );
  }
}
