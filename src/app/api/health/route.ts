import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CacheManager } from "@/lib/cache/cache-manager";

export async function GET() {
  try {
    const dbStart = Date.now();
    await db.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - dbStart;

    const cacheStats = CacheManager.getStats();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: "connected",
          latencyMs: dbLatency,
        },
        cache: {
          status: "active",
          size: cacheStats.size,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
