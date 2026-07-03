import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { WorkspaceService } from "@/services/backend/workspace.service";
import { PermissionService } from "@/lib/auth/permissions";
import { z } from "zod";

const UpdateRoleSchema = z.object({
  memberId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  role: z.enum(["OWNER", "ADMIN", "EDITOR", "VIEWER"]),
});

const RemoveMemberSchema = z.object({
  memberId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const userId = searchParams.get("userId") || "temp-user-id";

    if (!workspaceId) return respond.error("workspaceId is required");

    // Enforce permission context check
    const hasAccess = await PermissionService.hasPermission(
      userId,
      workspaceId,
      "read:memory",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const members = await WorkspaceService.getMembers(workspaceId);
    return respond.success(members);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateRoleSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    // Enforce permission to manage role settings
    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "manage:settings",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const membership = await WorkspaceService.updateMemberRole(
      parsed.data.workspaceId,
      parsed.data.memberId,
      parsed.data.role,
      actorId,
    );
    return respond.success(membership);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");
    const workspaceId = searchParams.get("workspaceId");
    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    const parsed = RemoveMemberSchema.safeParse({ memberId, workspaceId });
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    // Enforce permission
    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "manage:settings",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const membership = await WorkspaceService.removeMember(
      parsed.data.workspaceId,
      parsed.data.memberId,
      actorId,
    );
    return respond.success(membership);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
