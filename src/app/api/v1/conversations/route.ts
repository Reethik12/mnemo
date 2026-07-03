import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const conversations = await db.conversation.findMany({
      where: { workspaceId },
      orderBy: { updatedAt: "desc" },
    });

    return respond.success(conversations);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
