import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { OrchestratorService } from "@/services/backend/orchestrator.service";
import { type WorkflowStep } from "@/types/orchestrator";
import { z } from "zod";

const CreateWorkflowSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1),
  steps: z.array(
    z.object({
      id: z.string(),
      agentId: z.string(),
      action: z.string(),
      dependsOn: z.array(z.string()).optional(),
      status: z
        .enum(["PENDING", "READY", "RUNNING", "WAITING", "COMPLETED", "FAILED"])
        .default("PENDING"),
    }),
  ),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const workflows =
      await OrchestratorService.getWorkflowsByWorkspace(workspaceId);
    return respond.success(workflows);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateWorkflowSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const workflow = await OrchestratorService.createWorkflow(
      parsed.data.workspaceId,
      parsed.data.name,
      parsed.data.steps as WorkflowStep[],
    );

    return respond.success(workflow, "Workflow created successfully", 201);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
