import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { PlannerService } from "@/services/backend/planner.service";
import { z } from "zod";

const CreateGoalSchema = z.object({
  agentId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId");
    if (!agentId) return respond.error("agentId is required");

    const goals = await PlannerService.getGoalsByAgent(agentId);
    return respond.success(goals);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateGoalSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const goal = await PlannerService.createGoal(
      parsed.data.agentId,
      parsed.data.title,
      parsed.data.description,
      parsed.data.priority,
    );

    return respond.success(
      goal,
      "Goal registered and decomposed successfully",
      201,
    );
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
