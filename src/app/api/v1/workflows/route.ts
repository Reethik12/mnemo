import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const workflows = await db.workflow.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    return respond.success(workflows);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
