import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { DecisionService } from "@/services/backend/decision.service";
import { z } from "zod";

const CreateScheduleSchema = z.object({
  workspaceId: z.string().uuid(),
  agentId: z.string().uuid(),
  cron: z.string(),
  taskType: z.string(),
});

const ToggleScheduleSchema = z.object({
  id: z.string().uuid(),
  isActive: z.boolean(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const schedules = await DecisionService.getSchedules(workspaceId);
    return respond.success(schedules);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateScheduleSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const schedule = await DecisionService.createSchedule(
      parsed.data.workspaceId,
      parsed.data.agentId,
      parsed.data.cron,
      parsed.data.taskType,
    );

    return respond.success(schedule, "Schedule created successfully", 201);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ToggleScheduleSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const updated = await DecisionService.toggleSchedule(
      parsed.data.id,
      parsed.data.isActive,
    );
    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return respond.error("id is required");

    const deleted = await DecisionService.deleteSchedule(id);
    return respond.success(deleted, "Schedule deleted successfully");
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
