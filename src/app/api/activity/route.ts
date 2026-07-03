import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { AuditLogService } from "@/services/backend/audit-log.service";
import { PermissionService } from "@/lib/auth/permissions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const userId = req.headers.get("x-user-id") || "temp-user-id";
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : 50;

    if (!workspaceId) return respond.error("workspaceId is required");

    // Enforce permission context check
    const hasAccess = await PermissionService.hasPermission(
      userId,
      workspaceId,
      "read:memory",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const logs = await AuditLogService.getLogs(workspaceId, limit);
    return respond.success(logs);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
