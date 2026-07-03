import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const query = searchParams.get("query");
    if (!workspaceId) return respond.error("workspaceId is required");
    if (!query) return respond.error("query is required");

    // Perform query match against memory structures
    const memories = await db.memory.findMany({
      where: {
        workspaceId,
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
    });

    return respond.success(memories);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
