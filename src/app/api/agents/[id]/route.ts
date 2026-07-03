import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { AgentService } from "@/services/backend/agent.service";
import { PermissionService } from "@/lib/auth/permissions";
import { z } from "zod";

const UpdateAgentSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100).optional(),
  identity: z.string().optional(),
  description: z.string().optional(),
  goals: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  status: z
    .enum([
      "IDLE",
      "THINKING",
      "PLANNING",
      "RUNNING",
      "WAITING",
      "COMPLETED",
      "FAILED",
    ])
    .optional(),
  memoryScope: z.enum(["workspace", "personal", "global"]).optional(),
  modelId: z.string().optional(),
  providerId: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const agent = await AgentService.getAgent(id);
    const userId = req.headers.get("x-user-id") || "temp-user-id";

    // Verify workspace access permissions
    const hasAccess = await PermissionService.hasPermission(
      userId,
      agent.workspaceId,
      "read:memory",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    return respond.success(agent);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = UpdateAgentSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "manage:settings",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const updated = await AgentService.updateAgent(id, parsed.data, actorId);
    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    if (!workspaceId) return respond.error("workspaceId is required");

    const hasAccess = await PermissionService.hasPermission(
      actorId,
      workspaceId,
      "manage:settings",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const deleted = await AgentService.deleteAgent(id, actorId);
    return respond.success(deleted, "Agent deleted successfully");
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
