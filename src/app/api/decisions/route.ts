import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { DecisionService } from "@/services/backend/decision.service";
import { z } from "zod";

const DecisionActionSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["APPROVED", "REJECTED"]),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const decisions = await DecisionService.getDecisions(workspaceId);
    return respond.success(decisions);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DecisionActionSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const updated =
      parsed.data.status === "APPROVED"
        ? await DecisionService.approveDecision(parsed.data.id)
        : await DecisionService.rejectDecision(parsed.data.id);

    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
