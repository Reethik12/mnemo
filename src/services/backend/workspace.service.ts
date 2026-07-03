import { WorkspaceRepository } from "@/repositories/workspace.repository";
import { Prisma, WorkspaceRole } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { db } from "@/lib/db";
import { AuditLogService } from "./audit-log.service";

export class WorkspaceService {
  static async createWorkspace(
    userId: string,
    data: Prisma.WorkspaceUncheckedCreateWithoutUserInput,
  ) {
    const workspace = await WorkspaceRepository.create({ ...data, userId });

    // Auto-create owner membership
    await db.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId,
        role: "OWNER" as WorkspaceRole,
      },
    });

    await AuditLogService.log(
      workspace.id,
      userId,
      "Workspace Created",
      "Workspace",
      workspace.id,
    );
    return workspace;
  }

  static async getWorkspace(id: string) {
    const workspace = await WorkspaceRepository.findById(id);
    if (!workspace) throw new NotFoundError("Workspace not found");
    return workspace;
  }

  static async getWorkspacesByUser(userId: string) {
    // Return all workspaces where the user is either the owner or a member
    const memberships = await db.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
    });
    return memberships.map((m) => m.workspace);
  }

  static async updateWorkspace(
    id: string,
    data: Prisma.WorkspaceUpdateInput,
    userId?: string,
  ) {
    const workspace = await WorkspaceRepository.findById(id);
    if (!workspace) throw new NotFoundError("Workspace not found");
    const updated = await WorkspaceRepository.update(id, data);
    await AuditLogService.log(
      id,
      userId || null,
      "Workspace Settings Changed",
      "Workspace",
      id,
    );
    return updated;
  }

  static async deleteWorkspace(id: string, userId?: string) {
    const workspace = await WorkspaceRepository.findById(id);
    if (!workspace) throw new NotFoundError("Workspace not found");
    const deleted = await WorkspaceRepository.delete(id);
    await AuditLogService.log(
      id,
      userId || null,
      "Workspace Deleted",
      "Workspace",
      id,
    );
    return deleted;
  }

  // --- Members ---

  static async getMembers(workspaceId: string) {
    return db.workspaceMember.findMany({
      where: { workspaceId },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });
  }

  static async removeMember(
    workspaceId: string,
    memberId: string,
    actorId?: string,
  ) {
    const membership = await db.workspaceMember.delete({
      where: { id: memberId },
    });
    await AuditLogService.log(
      workspaceId,
      actorId || null,
      "Member Removed",
      "User",
      membership.userId,
    );
    return membership;
  }

  static async updateMemberRole(
    workspaceId: string,
    memberId: string,
    role: WorkspaceRole,
    actorId?: string,
  ) {
    const membership = await db.workspaceMember.update({
      where: { id: memberId },
      data: { role },
    });
    await AuditLogService.log(
      workspaceId,
      actorId || null,
      `Member Role Updated to ${role}`,
      "User",
      membership.userId,
    );
    return membership;
  }
}
