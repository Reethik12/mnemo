import { respond } from "@/lib/api-response";
import { WorkspaceService } from "@/services/backend/workspace.service";
import { WorkspaceCreateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = WorkspaceCreateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());

    // Resolve user from header or fallback
    const userId = req.headers.get("x-user-id") || "temp-user-id";
    const workspace = await WorkspaceService.createWorkspace(
      userId,
      parsed.data,
    );
    return respond.success(workspace, "Workspace created successfully", 201);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId =
      searchParams.get("userId") ||
      req.headers.get("x-user-id") ||
      "temp-user-id";
    const workspaces = await WorkspaceService.getWorkspacesByUser(userId);
    return respond.success(workspaces);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
