import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { AgentService } from "@/services/backend/agent.service";
import { PermissionService } from "@/lib/auth/permissions";
import { z } from "zod";

const StatusUpdateSchema = z.object({
  workspaceId: z.string().uuid(),
  status: z.enum([
    "IDLE",
    "THINKING",
    "PLANNING",
    "RUNNING",
    "WAITING",
    "COMPLETED",
    "FAILED",
  ]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = StatusUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    // Enforce basic permissions
    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "read:memory",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const updated = await AgentService.updateAgentStatus(
      id,
      parsed.data.status,
      actorId,
    );
    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
