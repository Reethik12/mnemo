import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { OrchestratorService } from "@/services/backend/orchestrator.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workflowId = searchParams.get("workflowId");
    if (!workflowId) return respond.error("workflowId is required");

    const history = await OrchestratorService.getHistory(workflowId);
    return respond.success(history);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
