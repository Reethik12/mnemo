import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { OrchestratorService } from "@/services/backend/orchestrator.service";
import { z } from "zod";

const StepUpdateSchema = z.object({
  workflowId: z.string().uuid(),
  stepId: z.string(),
  status: z.enum(["PENDING", "READY", "RUNNING", "COMPLETED", "FAILED"]),
  result: z.record(z.string(), z.unknown()).optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = StepUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const updated = await OrchestratorService.updateWorkflowStep(
      parsed.data.workflowId,
      parsed.data.stepId,
      parsed.data.status,
      parsed.data.result,
    );

    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
