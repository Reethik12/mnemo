import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { PlannerService } from "@/services/backend/planner.service";
import { z } from "zod";

const UpdateTaskStatusSchema = z.object({
  taskId: z.string().uuid(),
  status: z.enum([
    "PENDING",
    "READY",
    "RUNNING",
    "WAITING",
    "COMPLETED",
    "CANCELLED",
    "FAILED",
  ]),
  errorLogs: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateTaskStatusSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const updated = await PlannerService.updateTaskStatus(
      parsed.data.taskId,
      parsed.data.status,
      parsed.data.errorLogs,
    );

    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
