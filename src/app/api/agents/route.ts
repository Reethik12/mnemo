import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { AgentService } from "@/services/backend/agent.service";
import { PermissionService } from "@/lib/auth/permissions";
import { z } from "zod";

const CreateAgentSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(["PERSONAL", "WORKSPACE", "ASSISTANT", "BACKGROUND", "SYSTEM"]),
  identity: z.string().min(1),
  description: z.string().min(1),
  goals: z.array(z.string()).default([]),
  instructions: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  memoryScope: z.enum(["workspace", "personal", "global"]).default("workspace"),
  modelId: z.string().optional(),
  providerId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const userId = req.headers.get("x-user-id") || "temp-user-id";

    if (!workspaceId) return respond.error("workspaceId is required");

    const hasAccess = await PermissionService.hasPermission(
      userId,
      workspaceId,
      "read:memory",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const agents = await AgentService.getAgentsByWorkspace(workspaceId, userId);
    return respond.success(agents);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateAgentSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "manage:settings",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const agent = await AgentService.createAgent(
      parsed.data.workspaceId,
      {
        ...parsed.data,
        status: "IDLE",
      },
      actorId,
    );
    return respond.success(agent, "Agent registered successfully", 201);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
