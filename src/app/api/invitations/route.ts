import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { InvitationService } from "@/services/backend/invitation.service";
import { PermissionService } from "@/lib/auth/permissions";
import { z } from "zod";

const InviteUserSchema = z.object({
  workspaceId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["OWNER", "ADMIN", "EDITOR", "VIEWER"]),
});

const ResolveInviteSchema = z.object({
  token: z.string().min(10),
  action: z.enum(["accept", "reject"]),
  userId: z.string().uuid().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const userId = req.headers.get("x-user-id") || "temp-user-id";

    if (!workspaceId) return respond.error("workspaceId is required");

    const hasAccess = await PermissionService.hasPermission(
      userId,
      workspaceId,
      "invite:members",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const invitations =
      await InvitationService.getWorkspaceInvitations(workspaceId);
    return respond.success(invitations);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InviteUserSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const actorId = req.headers.get("x-user-id") || "temp-user-id";

    const hasAccess = await PermissionService.hasPermission(
      actorId,
      parsed.data.workspaceId,
      "invite:members",
    );
    if (!hasAccess) return respond.error("Unauthorized", 403);

    const invitation = await InvitationService.createInvitation(
      parsed.data.workspaceId,
      parsed.data.email,
      parsed.data.role,
      actorId,
    );

    return respond.success(
      invitation,
      "Invitation generated successfully",
      201,
    );
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ResolveInviteSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const userId =
      parsed.data.userId || req.headers.get("x-user-id") || "temp-user-id";

    if (parsed.data.action === "accept") {
      const membership = await InvitationService.acceptInvitation(
        parsed.data.token,
        userId,
      );
      return respond.success(membership, "Invitation accepted successfully");
    } else {
      await InvitationService.rejectInvitation(parsed.data.token);
      return respond.success(null, "Invitation rejected successfully");
    }
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
