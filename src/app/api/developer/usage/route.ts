import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    return respond.success({
      usageCount: 1204,
      limitQuota: 10000,
      activeKeysCount: 2,
      webhookDeliveries: 42,
    });
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
