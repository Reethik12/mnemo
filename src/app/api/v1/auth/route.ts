import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    if (!apiKey) return respond.error("apiKey is required", 400);

    // Simple key prefix match validation
    const keyRecord = await db.aPIKey.findFirst({
      where: { key: apiKey },
    });

    if (!keyRecord) {
      return respond.error("Unauthorized: invalid API key", 401);
    }

    return respond.success({
      authenticated: true,
      workspaceId: keyRecord.workspaceId,
      scope: keyRecord.scope,
    });
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
