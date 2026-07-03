import { db } from "@/lib/db";
import { WorkspaceRole } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { AuditLogService } from "./audit-log.service";
import crypto from "crypto";

export class InvitationService {
  /**
   * Create workspace invitation
   */
  static async createInvitation(
    workspaceId: string,
    email: string,
    role: WorkspaceRole,
    actorId?: string,
  ) {
    // Generate a secure 32-byte token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    const invitation = await db.workspaceInvitation.create({
      data: {
        workspaceId,
        email,
        role,
        token,
        expiresAt,
      },
    });

    await AuditLogService.log(
      workspaceId,
      actorId || null,
      `Invitation Sent to ${email}`,
      "WorkspaceInvitation",
      invitation.id,
    );
    return invitation;
  }

  /**
   * Accept an invitation using the secure token
   */
  static async acceptInvitation(token: string, userId: string) {
    const invitation = await db.workspaceInvitation.findUnique({
      where: { token },
    });

    if (!invitation) throw new NotFoundError("Invitation token not found");
    if (invitation.expiresAt < new Date()) {
      await db.workspaceInvitation.delete({ where: { token } });
      throw new Error("Invitation has expired");
    }

    // Join member to workspace
    const member = await db.workspaceMember.create({
      data: {
        workspaceId: invitation.workspaceId,
        userId,
        role: invitation.role,
      },
    });

    // Delete token after successful acceptance
    await db.workspaceInvitation.delete({ where: { token } });
    await AuditLogService.log(
      invitation.workspaceId,
      userId,
      "Member Joined via Invitation",
      "User",
      userId,
    );

    return member;
  }

  /**
   * Reject/Delete an invitation
   */
  static async rejectInvitation(token: string) {
    const invitation = await db.workspaceInvitation.findUnique({
      where: { token },
    });
    if (!invitation) throw new NotFoundError("Invitation not found");

    await db.workspaceInvitation.delete({ where: { token } });
    return true;
  }

  /**
   * Get invitations by workspace
   */
  static async getWorkspaceInvitations(workspaceId: string) {
    return db.workspaceInvitation.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }
}
