import { respond } from "@/lib/api-response";
import { WorkspaceService } from "@/services/backend/workspace.service";
import { WorkspaceUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const workspace = await WorkspaceService.getWorkspace(id);
    return respond.success(workspace);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = WorkspaceUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());
    const workspace = await WorkspaceService.updateWorkspace(id, parsed.data);
    return respond.success(workspace);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await WorkspaceService.deleteWorkspace(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}
