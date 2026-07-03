import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { OrchestratorService } from "@/services/backend/orchestrator.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const workflow = await OrchestratorService.getWorkflow(id);
    return respond.success(workflow);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
